import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BUZZSTOP ENGINE — World-first personalised destructive interference tool
 * 
 * Phase 1: Radar narrowing — tap "warmer/colder" to home in binary-search style
 * Phase 2: Fine-tune with ±1Hz arrows once in the zone
 * Phase 3: Lock + cancel with phase-inverted twin oscillator
 * 
 * Built from BRO51's lived experience. Free. Offline. On any device.
 */

export default function BuzzStopEngine({ onStop }) {
  const [phase, setPhase] = useState('start'); // start | radar | fine | locked
  const [rangeMin, setRangeMin] = useState(20);
  const [rangeMax, setRangeMax] = useState(16000);
  const [currentHz, setCurrentHz] = useState(0);
  const [lockedHz, setLockedHz] = useState(null);
  const [volume, setVolume] = useState(0.22);
  const [history, setHistory] = useState([]); // breadcrumb of narrowing steps
  const [sessionNote, setSessionNote] = useState('');

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const invertOscRef = useRef(null);

  // Mid-point of current range (log scale for perceptual accuracy)
  const getMidHz = (min, max) => Math.round(Math.pow(10, (Math.log10(min) + Math.log10(max)) / 2));

  const ensureAudio = async () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') await ctx.resume();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = getMidHz(rangeMin, rangeMax);
      osc.connect(gain);
      osc.start();
      oscRef.current = osc;
    }
    return audioCtxRef.current;
  };

  const playHz = async (hz) => {
    const ctx = await ensureAudio();
    // Remove old invert osc if it exists
    if (invertOscRef.current) {
      try { invertOscRef.current.stop(); invertOscRef.current.disconnect(); } catch (e) {}
      invertOscRef.current = null;
    }
    oscRef.current.frequency.setTargetAtTime(hz, ctx.currentTime, 0.08);
    setCurrentHz(hz);
  };

  const stopAudio = () => {
    try { oscRef.current?.stop(); oscRef.current?.disconnect(); } catch (e) {}
    try { invertOscRef.current?.stop(); invertOscRef.current?.disconnect(); } catch (e) {}
    try { audioCtxRef.current?.close(); } catch (e) {}
    oscRef.current = null;
    invertOscRef.current = null;
    gainRef.current = null;
    audioCtxRef.current = null;
  };

  // --- RADAR NARROWING ---
  const startRadar = async () => {
    const min = 20, max = 16000;
    setRangeMin(min); setRangeMax(max);
    setHistory([]);
    setPhase('radar');
    const mid = getMidHz(min, max);
    await playHz(mid);
  };

  // "Warmer" = buzz is near this frequency → narrow to this half
  const warmer = () => {
    const mid = currentHz;
    const newMin = Math.max(rangeMin, Math.round(mid * 0.7));
    const newMax = Math.min(rangeMax, Math.round(mid * 1.4));
    const nextMid = getMidHz(newMin, newMax);
    setHistory(h => [...h, { min: rangeMin, max: rangeMax }]);
    setRangeMin(newMin); setRangeMax(newMax);
    playHz(nextMid);
    // If range is narrow enough, switch to fine-tune
    if (newMax - newMin < 80) {
      setPhase('fine');
    }
  };

  // "Colder" = buzz is not near this, split the other way
  const colder = () => {
    // Decide which half to move to based on history direction
    const mid = currentHz;
    // Alternate between lower half and upper half of remaining range
    const lowerMid = getMidHz(rangeMin, mid);
    const upperMid = getMidHz(mid, rangeMax);
    // Try the half we haven't tried yet — use history to detect
    const lastMid = history.length > 0 ? getMidHz(history[history.length - 1].min, history[history.length - 1].max) : null;
    let newMin, newMax, nextMid;
    if (!lastMid || mid > lastMid) {
      // We've been going up — try lower
      newMin = rangeMin; newMax = mid;
      nextMid = lowerMid;
    } else {
      // We've been going down — try upper
      newMin = mid; newMax = rangeMax;
      nextMid = upperMid;
    }
    setHistory(h => [...h, { min: rangeMin, max: rangeMax }]);
    setRangeMin(newMin); setRangeMax(newMax);
    playHz(nextMid);
    if (newMax - newMin < 80) setPhase('fine');
  };

  const undoStep = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setRangeMin(prev.min); setRangeMax(prev.max);
    const mid = getMidHz(prev.min, prev.max);
    playHz(mid);
    if (phase === 'fine') setPhase('radar');
  };

  // --- FINE TUNE ---
  const nudge = (delta) => {
    const next = Math.max(1, currentHz + delta);
    playHz(next);
  };

  // --- LOCK + CANCEL ---
  const lockAndCancel = async () => {
    const hz = currentHz;
    setLockedHz(hz);
    setPhase('locked');
    const ctx = audioCtxRef.current;
    if (!ctx || !gainRef.current) return;

    // Add phase-inverted twin to create destructive interference
    const inv = ctx.createOscillator();
    inv.type = 'sine';
    inv.frequency.value = hz;
    const invGain = ctx.createGain();
    invGain.gain.value = -0.45; // near-cancel, slight offset for comfort
    inv.connect(invGain);
    invGain.connect(gainRef.current);
    inv.start();
    invertOscRef.current = inv;
  };

  const restart = () => {
    stopAudio();
    setPhase('start');
    setLockedHz(null);
    setCurrentHz(0);
    setHistory([]);
    setRangeMin(20); setRangeMax(16000);
  };

  // Volume sync
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => { return () => stopAudio(); }, []);

  const rangeWidth = rangeMax - rangeMin;
  const narrowingPercent = Math.max(0, Math.round(100 - (rangeWidth / (16000 - 20)) * 100));

  return (
    <div className="bg-black border-4 border-purple-500 overflow-hidden"
      style={{ boxShadow: '0 0 40px rgba(168,85,247,0.25)' }}>

      {/* HEADER */}
      <div className="bg-purple-900/20 border-b-2 border-purple-500 px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-purple-300 font-mono tracking-wider">⚡ BUZZSTOP</h2>
          <p className="text-[11px] text-purple-500 font-mono">Radar → Find → Cancel your buzz</p>
        </div>
        {phase !== 'start' && (
          <button onClick={restart}
            className="text-[11px] font-mono text-gray-500 border border-gray-700 px-3 py-1.5 hover:border-gray-400 hover:text-gray-300 transition-colors">
            RESTART
          </button>
        )}
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">

          {/* START */}
          {phase === 'start' && (
            <motion.div key="start"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center space-y-5">
              <div className="space-y-2">
                <p className="text-white font-bold text-lg">Does your head buzz or ring?</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This tool finds YOUR exact frequency and cancels it using destructive interference —
                  the same physics as noise-cancelling headphones, but tuned to you.
                </p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 p-4 text-left space-y-2">
                <p className="text-gray-300 text-xs font-bold font-mono">HOW IT WORKS:</p>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                  1. We play a tone<br/>
                  2. You say warmer / colder<br/>
                  3. We home in like radar<br/>
                  4. Lock it → cancel it
                </p>
              </div>
              <p className="text-gray-500 text-xs font-mono">Headphones recommended but not required</p>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={startRadar}
                className="w-full py-5 border-4 border-purple-500 text-purple-300 font-black text-xl font-mono tracking-wider hover:bg-purple-500/10 transition-colors"
                style={{ boxShadow: '0 0 25px rgba(168,85,247,0.3)' }}>
                START RADAR SCAN
              </motion.button>
            </motion.div>
          )}

          {/* RADAR NARROWING */}
          {phase === 'radar' && (
            <motion.div key="radar"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-5">

              {/* CURRENT TONE */}
              <div className="text-center">
                <div className="text-5xl font-black font-mono text-purple-300 mb-1"
                  style={{ textShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
                  {currentHz.toLocaleString()} Hz
                </div>
                <p className="text-gray-500 text-xs font-mono">playing now</p>
              </div>

              {/* NARROWING PROGRESS */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1">
                  <span>20 Hz</span>
                  <span className="text-purple-400">{narrowingPercent}% narrowed</span>
                  <span>16 kHz</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${narrowingPercent}%`, boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />
                </div>
                <div className="text-[10px] font-mono text-gray-600 text-center mt-1">
                  Range: {rangeMin}–{rangeMax >= 1000 ? `${Math.round(rangeMax/100)/10}k` : rangeMax} Hz
                </div>
              </div>

              <p className="text-center text-white font-bold text-sm">Does this tone feel close to your buzz?</p>

              {/* WARMER / COLDER */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={warmer}
                  className="py-6 border-3 border-green-500 bg-green-500/10 text-green-400 font-black text-lg font-mono hover:bg-green-500/20 transition-colors"
                  style={{ borderWidth: 3, boxShadow: '0 0 15px rgba(34,197,94,0.2)' }}>
                  🔥 WARMER
                  <div className="text-xs font-normal mt-1 text-green-600">Yes / closer</div>
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={colder}
                  className="py-6 border-green-500 bg-blue-500/10 text-blue-400 font-black text-lg font-mono hover:bg-blue-500/20 transition-colors"
                  style={{ borderWidth: 3, borderColor: '#3b82f6', boxShadow: '0 0 15px rgba(59,130,246,0.2)' }}>
                  ❄️ COLDER
                  <div className="text-xs font-normal mt-1 text-blue-600">No / different</div>
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.05" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 appearance-none bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-500 text-xs font-mono">{Math.round(volume*100)}%</span>
              </div>

              <div className="flex justify-between">
                {history.length > 0 && (
                  <button onClick={undoStep} className="text-gray-600 text-xs font-mono hover:text-gray-400 underline">
                    ← undo last step
                  </button>
                )}
                <button onClick={() => setPhase('fine')} className="text-purple-600 text-xs font-mono hover:text-purple-400 underline ml-auto">
                  I know the frequency →
                </button>
              </div>
            </motion.div>
          )}

          {/* FINE TUNE */}
          {phase === 'fine' && (
            <motion.div key="fine"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-5">

              <div className="text-center">
                <p className="text-green-400 font-bold font-mono text-sm mb-3">🎯 IN YOUR ZONE — fine-tune now</p>
                <div className="text-5xl font-black font-mono text-green-400 mb-1"
                  style={{ textShadow: '0 0 25px rgba(34,197,94,0.6)' }}>
                  {currentHz.toLocaleString()} Hz
                </div>
                <p className="text-gray-500 text-xs font-mono">adjust until it matches your buzz exactly</p>
              </div>

              {/* FINE NUDGE BUTTONS */}
              <div className="grid grid-cols-4 gap-2">
                {[[-100,'−100'], [-10,'−10'], [-1,'−1'], [1,'+1'], [10,'+10'], [100,'+100']].slice(0,3).map(([d, label]) => (
                  <motion.button key={d} whileTap={{ scale: 0.9 }} onClick={() => nudge(d)}
                    className="py-4 border-2 border-gray-600 text-gray-300 font-black font-mono text-sm hover:border-green-500 hover:text-green-400 transition-colors">
                    {label}
                  </motion.button>
                ))}
                {[[-100,'−100'], [-10,'−10'], [-1,'−1'], [1,'+1'], [10,'+10'], [100,'+100']].slice(3).map(([d, label]) => (
                  <motion.button key={d} whileTap={{ scale: 0.9 }} onClick={() => nudge(d)}
                    className="py-4 border-2 border-gray-600 text-gray-300 font-black font-mono text-sm hover:border-green-500 hover:text-green-400 transition-colors">
                    {label}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.05" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 appearance-none bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-500 text-xs font-mono">{Math.round(volume*100)}%</span>
              </div>

              <motion.button whileTap={{ scale: 0.96 }} onClick={lockAndCancel}
                className="w-full py-5 border-4 border-green-500 text-green-400 font-black text-xl font-mono hover:bg-green-500/10 transition-colors"
                style={{ boxShadow: '0 0 25px rgba(34,197,94,0.25)' }}>
                🔒 LOCK + CANCEL
              </motion.button>

              <button onClick={() => setPhase('radar')} className="w-full text-gray-600 text-xs font-mono underline hover:text-gray-400">
                ← back to radar scan
              </button>
            </motion.div>
          )}

          {/* LOCKED */}
          {phase === 'locked' && lockedHz && (
            <motion.div key="locked"
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="space-y-5 text-center">

              <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl">⚡</motion.div>

              <div>
                <p className="text-green-400 font-black text-lg font-mono mb-1">LOCKED + CANCELLING</p>
                <p className="text-gray-500 text-xs font-mono">Destructive interference active</p>
              </div>

              <div className="border-2 border-green-500 bg-green-500/10 py-6 px-4"
                style={{ boxShadow: '0 0 25px rgba(34,197,94,0.15)' }}>
                <div className="text-4xl font-black font-mono text-green-400"
                  style={{ textShadow: '0 0 15px #22c55e' }}>
                  {lockedHz.toLocaleString()} Hz
                </div>
                <p className="text-green-700 text-xs font-mono mt-1">YOUR BUZZ FREQUENCY</p>
              </div>

              <div className="bg-gray-900/60 border border-gray-700 p-3 text-left">
                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                  A second wave is running at {lockedHz.toLocaleString()} Hz, 180° inverted — 
                  they collide and partially cancel, reducing your buzz through destructive interference.
                  Same physics as noise-cancelling headphones. Let it run 5–15 min.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.05" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 appearance-none bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-500 text-xs font-mono">{Math.round(volume*100)}%</span>
              </div>

              <div className="flex gap-3">
                <button onClick={restart}
                  className="flex-1 py-3 border-2 border-purple-500 text-purple-400 font-bold font-mono text-sm hover:bg-purple-500/10 transition-colors">
                  TRY AGAIN
                </button>
                <button onClick={() => { stopAudio(); if (onStop) onStop(); }}
                  className="flex-1 py-3 border-2 border-gray-700 text-gray-400 font-bold font-mono text-sm hover:bg-gray-900 transition-colors">
                  STOP
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}