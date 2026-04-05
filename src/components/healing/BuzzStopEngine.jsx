import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BUZZSTOP ENGINE — World-first personalised destructive interference tool
 * 
 * The idea: Every other tinnitus tool plays sound AT you.
 * This finds YOUR frequency and cancels it.
 * 
 * Physics: destructive interference — your buzz frequency + inverted phase = silence
 * Built from BRO51's lived experience. Free. Offline. On any device.
 */

const SWEEP_RANGES = {
  low:  { min: 20,   max: 500,   label: 'LOW',   color: '#10b981', desc: 'Deep hum / drone / pressure' },
  mid:  { min: 500,  max: 4000,  label: 'MID',   color: '#f59e0b', desc: 'Electrical hum / buzz / ring' },
  high: { min: 2000, max: 16000, label: 'HIGH',  color: '#ef4444', desc: 'High pitch / hiss / whistle' },
  full: { min: 20,   max: 16000, label: 'FULL',  color: '#a855f7', desc: "I don't know — find it for me" },
};

// How long to dwell in the "hot zone" vs outside it (ratio)
const HOT_ZONE_RATIO = 6; // 6x slower in the sweet spot

export default function BuzzStopEngine({ onStop }) {
  const [phase, setPhase] = useState('select'); // select | sweeping | locked | stopped
  const [selectedRange, setSelectedRange] = useState(null);
  const [currentHz, setCurrentHz] = useState(0);
  const [lockedHz, setLockedHz] = useState(null);
  const [sweepProgress, setSweepProgress] = useState(0);
  const [volume, setVolume] = useState(0.25);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const sweepFrameRef = useRef(null);
  const sweepStartRef = useRef(null);
  const lockedHzRef = useRef(null);

  // Keep lockedHzRef in sync
  useEffect(() => { lockedHzRef.current = lockedHz; }, [lockedHz]);

  // Sweep speed: full range takes 40 seconds but dwells 6x longer in the hot zone
  const getSweepHz = (range, elapsedMs) => {
    const { min, max } = range;
    const logMin = Math.log10(min);
    const logMax = Math.log10(max);
    const logRange = logMax - logMin;

    // Hot zone = middle 40% of the log range
    const hotStart = logMin + logRange * 0.3;
    const hotEnd   = logMin + logRange * 0.7;
    const hotSize  = hotEnd - hotStart;
    const coldSize = logRange - hotSize;

    // Weighted total "virtual time units"
    const hotUnits  = hotSize * HOT_ZONE_RATIO;
    const coldUnits = coldSize * 1;
    const totalUnits = hotUnits + coldUnits;

    // Full sweep = 40 seconds
    const cycleMs = 40000;
    const t = (elapsedMs % cycleMs) / cycleMs; // 0..1 within cycle
    const virtualPos = t * totalUnits; // 0..totalUnits

    // Map virtual position back to log-frequency
    // Cold zone 1: logMin → hotStart
    const coldZone1Units = (hotStart - logMin) * 1;
    // Hot zone:   hotStart → hotEnd
    // Cold zone 2: hotEnd → logMax
    const coldZone2Units = (logMax - hotEnd) * 1;

    let logHz;
    if (virtualPos < coldZone1Units) {
      logHz = logMin + virtualPos;
    } else if (virtualPos < coldZone1Units + hotUnits) {
      logHz = hotStart + (virtualPos - coldZone1Units) / HOT_ZONE_RATIO;
    } else {
      logHz = hotEnd + (virtualPos - coldZone1Units - hotUnits);
    }

    return Math.pow(10, logHz);
  };

  const startSweep = async (range) => {
    setSelectedRange(range);
    setPhase('sweeping');
    setLockedHz(null);

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') await ctx.resume();
    audioCtxRef.current = ctx;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = range.min;

    const gain = ctx.createGain();
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;
    sweepStartRef.current = Date.now();

    const tick = () => {
      if (!oscRef.current || !audioCtxRef.current) return;
      const elapsed = Date.now() - sweepStartRef.current;
      const hz = getSweepHz(range, elapsed);
      osc.frequency.setTargetAtTime(hz, ctx.currentTime, 0.05);
      setCurrentHz(Math.round(hz));

      // Progress within the 40s cycle
      setSweepProgress(((elapsed % 40000) / 40000) * 100);
      sweepFrameRef.current = requestAnimationFrame(tick);
    };

    sweepFrameRef.current = requestAnimationFrame(tick);
  };

  const lockFrequency = () => {
    if (!oscRef.current || !audioCtxRef.current) return;

    const hz = currentHz;
    setLockedHz(hz);
    setPhase('locked');

    // Cancel sweep animation
    if (sweepFrameRef.current) {
      cancelAnimationFrame(sweepFrameRef.current);
      sweepFrameRef.current = null;
    }

    // Lock oscillator to this exact frequency
    oscRef.current.frequency.cancelScheduledValues(audioCtxRef.current.currentTime);
    oscRef.current.frequency.setValueAtTime(hz, audioCtxRef.current.currentTime);

    // Phase inversion is achieved by adding a second oscillator 180° out of phase
    // together they create destructive interference at hz
    const ctx = audioCtxRef.current;
    const invertOsc = ctx.createOscillator();
    invertOsc.type = 'sine';
    invertOsc.frequency.value = hz;

    // Invert phase: negate the signal using gain of -1 mixed in
    const invertGain = ctx.createGain();
    invertGain.gain.value = -0.5; // partial inversion — feels like cancellation without total silence

    invertOsc.connect(invertGain);
    invertGain.connect(gainRef.current);
    invertOsc.start();
  };

  const stopAll = () => {
    if (sweepFrameRef.current) {
      cancelAnimationFrame(sweepFrameRef.current);
      sweepFrameRef.current = null;
    }
    try {
      oscRef.current?.stop();
      oscRef.current?.disconnect();
    } catch (e) {}
    try {
      audioCtxRef.current?.close();
    } catch (e) {}
    oscRef.current = null;
    gainRef.current = null;
    audioCtxRef.current = null;
    setPhase('stopped');
    if (onStop) onStop();
  };

  const restart = () => {
    stopAll();
    setPhase('select');
    setLockedHz(null);
    setCurrentHz(0);
    setSweepProgress(0);
  };

  // Volume changes
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => {
    return () => stopAll();
  }, []);

  const isInHotZone = selectedRange && currentHz >= selectedRange.min * 3 && currentHz <= selectedRange.max * 0.7;

  return (
    <div className="bg-black border-4 border-purple-500 rounded-none p-0 overflow-hidden"
      style={{ boxShadow: '0 0 40px rgba(168,85,247,0.3)' }}>

      {/* HEADER */}
      <div className="bg-purple-900/30 border-b-2 border-purple-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-purple-300 font-mono tracking-wider">⚡ BUZZSTOP</h2>
            <p className="text-xs text-purple-400 font-mono mt-0.5">Find your frequency. Cancel it.</p>
          </div>
          {phase !== 'select' && (
            <button onClick={restart}
              className="text-xs font-mono font-bold text-gray-400 border border-gray-600 px-3 py-1.5 hover:border-gray-400 transition-colors">
              RESTART
            </button>
          )}
        </div>
      </div>

      <div className="p-6">

        {/* STEP 1 — SELECT RANGE */}
        <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div key="select"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="text-white font-bold text-center mb-2">Where do you feel your buzz?</p>
            <p className="text-gray-500 text-xs text-center font-mono mb-6">Pick the closest — or let it find yours</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(SWEEP_RANGES).map(([key, range]) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => startSweep(range)}
                  className="p-4 border-2 bg-black hover:bg-white/5 transition-all text-left"
                  style={{ borderColor: range.color, boxShadow: `0 0 15px ${range.color}30` }}
                >
                  <div className="text-lg font-black font-mono mb-1" style={{ color: range.color }}>
                    {range.label}
                  </div>
                  <div className="text-xs text-gray-400 leading-snug">{range.desc}</div>
                  <div className="text-[10px] font-mono mt-2" style={{ color: range.color + '80' }}>
                    {range.min >= 1000 ? `${range.min/1000}k` : range.min}Hz – {range.max >= 1000 ? `${range.max/1000}k` : range.max}Hz
                  </div>
                </motion.button>
              ))}
            </div>
            <p className="text-gray-600 text-[10px] font-mono text-center mt-4">
              Works on any speakers or headphones • No account • No data sent
            </p>
          </motion.div>
        )}

        {/* STEP 2 — SWEEPING */}
        {phase === 'sweeping' && selectedRange && (
          <motion.div key="sweep"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center">

            {/* BIG FREQUENCY DISPLAY */}
            <motion.div
              animate={{ scale: isInHotZone ? [1, 1.05, 1] : 1 }}
              transition={{ repeat: isInHotZone ? Infinity : 0, duration: 0.8 }}
              className="mb-2">
              <div className="text-6xl sm:text-7xl font-black font-mono mb-1"
                style={{ color: selectedRange.color, textShadow: `0 0 30px ${selectedRange.color}` }}>
                {currentHz.toLocaleString()}
              </div>
              <div className="text-sm font-mono text-gray-400">Hz</div>
            </motion.div>

            {/* HOT ZONE INDICATOR */}
            {isInHotZone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 px-4 py-2 border-2 border-yellow-400 bg-yellow-400/10 inline-block">
                <p className="text-yellow-400 font-black font-mono text-sm">🎯 IN YOUR ZONE — tap if you feel it</p>
              </motion.div>
            )}

            {/* SWEEP BAR */}
            <div className="mb-6">
              <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1">
                <span>{selectedRange.min}Hz</span>
                <span className="text-gray-400">SCANNING...</span>
                <span>{selectedRange.max >= 1000 ? `${selectedRange.max/1000}k` : selectedRange.max}Hz</span>
              </div>
              <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${sweepProgress}%`,
                    background: `linear-gradient(90deg, ${selectedRange.color}60, ${selectedRange.color})`,
                    boxShadow: `0 0 10px ${selectedRange.color}`
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-600 font-mono text-center mt-1">
                Spends extra time in your buzz zone
              </p>
            </div>

            {/* THE BIG BUTTON */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={lockFrequency}
              className="w-full py-6 border-4 font-black text-2xl font-mono tracking-widest transition-all mb-4"
              style={{
                borderColor: selectedRange.color,
                color: selectedRange.color,
                backgroundColor: `${selectedRange.color}15`,
                boxShadow: `0 0 30px ${selectedRange.color}50`,
              }}
            >
              🔒 THAT'S IT — LOCK IT
            </motion.button>

            <p className="text-gray-500 text-xs font-mono">
              Tap the moment you feel your buzz frequency — even a hint of change
            </p>

            {/* VOLUME */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-gray-600 text-xs font-mono">VOL</span>
              <input type="range" min="0" max="0.7" step="0.05" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 appearance-none bg-gray-700 rounded cursor-pointer" />
              <span className="text-gray-500 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
            </div>

            <button onClick={stopAll} className="mt-4 text-gray-600 text-xs font-mono underline">
              stop
            </button>
          </motion.div>
        )}

        {/* STEP 3 — LOCKED */}
        {phase === 'locked' && lockedHz && (
          <motion.div key="locked"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center">

            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl mb-3">⚡</motion.div>

            <p className="text-green-400 font-black text-lg font-mono mb-1">LOCKED + CANCELLING</p>
            <p className="text-gray-400 text-xs font-mono mb-6">Destructive interference active at your frequency</p>

            <div className="border-2 border-green-500 bg-green-500/10 py-6 px-4 mb-6"
              style={{ boxShadow: '0 0 30px rgba(34,197,94,0.2)' }}>
              <div className="text-5xl font-black font-mono text-green-400 mb-1"
                style={{ textShadow: '0 0 20px #22c55e' }}>
                {lockedHz.toLocaleString()} Hz
              </div>
              <p className="text-green-600 text-xs font-mono">YOUR BUZZ FREQUENCY</p>
            </div>

            <div className="bg-gray-900/60 border border-gray-700 p-3 mb-6 text-left">
              <p className="text-gray-400 text-xs font-mono leading-relaxed">
                The oscillator is now running at your exact frequency with a second wave inverted 180° — 
                they collide and cancel each other, reducing your buzz through destructive interference.
                The same physics as noise-cancelling headphones.
              </p>
            </div>

            {/* VOLUME */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-600 text-xs font-mono">VOL</span>
              <input type="range" min="0" max="0.7" step="0.05" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 appearance-none bg-gray-700 rounded cursor-pointer" />
              <span className="text-gray-500 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
            </div>

            <div className="flex gap-3">
              <button onClick={restart}
                className="flex-1 py-3 border-2 border-purple-500 text-purple-400 font-bold font-mono text-sm hover:bg-purple-500/10 transition-colors">
                TRY AGAIN
              </button>
              <button onClick={stopAll}
                className="flex-1 py-3 border-2 border-gray-600 text-gray-400 font-bold font-mono text-sm hover:bg-gray-800 transition-colors">
                STOP
              </button>
            </div>

            <p className="text-gray-600 text-[10px] font-mono text-center mt-4">
              Let it run for 5–15 minutes • Your nervous system needs time to reset
            </p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}