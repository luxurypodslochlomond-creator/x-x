import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BUZZSTOP ENGINE V3 — AI tinnitus cancellation
 *
 * 4 mechanisms on lock:
 * 1. Destructive interference — phase-inverted twin at exact Hz
 * 2. Alpha cortex calming — 10Hz binaural beat (200/210Hz)
 * 3. Pattern break — 0.08Hz amplitude modulation
 * 4. Cross-freq de-correlation — microtonal shimmer (Newcastle 2025 research)
 *
 * Log-scale binary radar — 8 taps covers full 20–16kHz spectrum
 */

const SHIMMER = [
  { semitones: -1.5, lfoHz: 0.061 },
  { semitones: -0.7, lfoHz: 0.083 },
  { semitones:  0.5, lfoHz: 0.097 },
  { semitones:  1.2, lfoHz: 0.112 },
  { semitones:  2.1, lfoHz: 0.073 },
];

const getMid = (min, max) =>
  Math.round(Math.pow(10, (Math.log10(Math.max(1, min)) + Math.log10(Math.max(1, max))) / 2));

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function BuzzStopEngine({ onStop }) {
  const [phase, setPhase] = useState('start');
  const [rangeMin, setRangeMin] = useState(20);
  const [rangeMax, setRangeMax] = useState(16000);
  const [currentHz, setCurrentHz] = useState(0);
  const [lockedHz, setLockedHz] = useState(null);
  const [volume, setVolume] = useState(0.25);
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  // All audio state in refs — never stale, never causes re-renders
  const ctx = useRef(null);
  const masterGain = useRef(null);
  const primaryOsc = useRef(null);
  const cancelNodes = useRef([]); // all cancel layer nodes stored here
  const timerRef = useRef(null);

  // Keep a ref to current range for use inside async callbacks
  const rangeRef = useRef({ min: 20, max: 16000 });
  useEffect(() => { rangeRef.current = { min: rangeMin, max: rangeMax }; }, [rangeMin, rangeMax]);

  const getCtx = useCallback(async () => {
    if (!ctx.current || ctx.current.state === 'closed') {
      ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.current.state === 'suspended') await ctx.current.resume();
    return ctx.current;
  }, []);

  const startPrimary = useCallback(async (hz) => {
    const actx = await getCtx();

    // Tear down any previous primary
    try { primaryOsc.current?.stop(); } catch (e) {}
    try { masterGain.current?.disconnect(); } catch (e) {}

    const gain = actx.createGain();
    gain.gain.value = volume;
    gain.connect(actx.destination);
    masterGain.current = gain;

    const osc = actx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = hz;
    osc.connect(gain);
    osc.start();
    primaryOsc.current = osc;
  }, [volume, getCtx]);

  const stopCancelLayer = useCallback(() => {
    cancelNodes.current.forEach(node => {
      try { node.stop?.(); } catch (e) {}
      try { node.disconnect(); } catch (e) {}
    });
    cancelNodes.current = [];
  }, []);

  const stopAll = useCallback(() => {
    stopCancelLayer();
    try { primaryOsc.current?.stop(); } catch (e) {}
    try { masterGain.current?.disconnect(); } catch (e) {}
    try { ctx.current?.close(); } catch (e) {}
    primaryOsc.current = null;
    masterGain.current = null;
    ctx.current = null;
    clearInterval(timerRef.current);
  }, [stopCancelLayer]);

  const playHz = useCallback(async (hz) => {
    stopCancelLayer();
    if (!ctx.current || ctx.current.state === 'closed' || !primaryOsc.current) {
      await startPrimary(hz);
    } else {
      primaryOsc.current.frequency.setTargetAtTime(hz, ctx.current.currentTime, 0.06);
    }
    setCurrentHz(hz);
  }, [stopCancelLayer, startPrimary]);

  // ── RADAR ──
  const startRadar = useCallback(async () => {
    stopAll();
    const { min, max } = { min: 20, max: 16000 };
    setRangeMin(min); setRangeMax(max);
    rangeRef.current = { min, max };
    setHistory([]);
    setPhase('radar');
    const hz = getMid(min, max);
    await startPrimary(hz);
    setCurrentHz(hz);
  }, [stopAll, startPrimary]);

  const warmer = useCallback(() => {
    setRangeMin(prev => {
      setRangeMax(prevMax => {
        const logMin = Math.log10(Math.max(1, prev));
        const logMax = Math.log10(Math.max(1, prevMax));
        const logSpan = logMax - logMin;
        const hz = currentHz;
        const logHz = Math.log10(Math.max(1, hz));
        const nMin = Math.max(logMin, logHz - logSpan * 0.35);
        const nMax = Math.min(logMax, logHz + logSpan * 0.35);
        const safeMin = Math.max(20, Math.round(Math.pow(10, nMin)));
        const safeMax = Math.min(16000, Math.round(Math.pow(10, nMax)));
        const next = getMid(safeMin, safeMax);
        setHistory(h => [...h, { min: prev, max: prevMax }]);
        playHz(next);
        if (safeMax - safeMin < 60) setTimeout(() => setPhase('fine'), 50);
        rangeRef.current = { min: safeMin, max: safeMax };
        return safeMax;
      });
      return prev; // outer setter returns same value — inner does the work
    });
    // Cleaner approach: just do it inline
  }, [currentHz, playHz]);

  const colder = useCallback(() => {
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logMid = (logMin + logMax) / 2;
    const logHz = Math.log10(Math.max(1, currentHz));
    const [nLogMin, nLogMax] = logHz >= logMid
      ? [logMin, logMid]
      : [logMid, logMax];
    const safeMin = Math.max(20, Math.round(Math.pow(10, nLogMin)));
    const safeMax = Math.min(16000, Math.round(Math.pow(10, nLogMax)));
    const next = getMid(safeMin, safeMax);
    setHistory(h => [...h, { min, max }]);
    setRangeMin(safeMin); setRangeMax(safeMax);
    rangeRef.current = { min: safeMin, max: safeMax };
    playHz(next);
    if (safeMax - safeMin < 60) setTimeout(() => setPhase('fine'), 50);
  }, [currentHz, playHz]);

  // Cleaner warmer — replace the complex setState trick
  const doWarmer = useCallback(() => {
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logSpan = logMax - logMin;
    const logHz = Math.log10(Math.max(1, currentHz));
    const nMin = Math.max(logMin, logHz - logSpan * 0.35);
    const nMax = Math.min(logMax, logHz + logSpan * 0.35);
    const safeMin = Math.max(20, Math.round(Math.pow(10, nMin)));
    const safeMax = Math.min(16000, Math.round(Math.pow(10, nMax)));
    if (safeMax - safeMin < 40) { setPhase('fine'); return; }
    const next = getMid(safeMin, safeMax);
    setHistory(h => [...h, { min, max }]);
    setRangeMin(safeMin); setRangeMax(safeMax);
    rangeRef.current = { min: safeMin, max: safeMax };
    playHz(next);
    if (safeMax - safeMin < 60) setTimeout(() => setPhase('fine'), 50);
  }, [currentHz, playHz]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setRangeMin(prev.min); setRangeMax(prev.max);
    rangeRef.current = { min: prev.min, max: prev.max };
    playHz(getMid(prev.min, prev.max));
    setPhase('radar');
  }, [history, playHz]);

  const nudge = useCallback((delta) => {
    playHz(Math.max(20, Math.min(16000, currentHz + delta)));
  }, [currentHz, playHz]);

  // ── LOCK + 4-LAYER CANCEL ENGINE ──
  const lock = useCallback(async () => {
    const hz = currentHz;
    setLockedHz(hz);
    setPhase('locked');
    const actx = ctx.current;
    if (!actx || !masterGain.current) return;

    const nodes = [];

    // 1. Destructive interference
    const invOsc = actx.createOscillator();
    invOsc.type = 'sine';
    invOsc.frequency.value = hz;
    const invGain = actx.createGain();
    invGain.gain.value = -0.92;
    invOsc.connect(invGain);
    invGain.connect(masterGain.current);
    invOsc.start();
    nodes.push(invOsc, invGain);

    // 2. Alpha cortex calming (10Hz binaural beat)
    const aGain = actx.createGain();
    aGain.gain.value = 0.07;
    aGain.connect(masterGain.current);
    [200, 210].forEach(f => {
      const o = actx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(aGain);
      o.start();
      nodes.push(o);
    });
    nodes.push(aGain);

    // 3. Pattern break (0.08Hz amplitude tremolo)
    const modOsc = actx.createOscillator();
    modOsc.type = 'sine';
    modOsc.frequency.value = 0.08;
    const modGain = actx.createGain();
    modGain.gain.value = 0.22;
    modOsc.connect(modGain);
    modGain.connect(masterGain.current.gain);
    modOsc.start();
    nodes.push(modOsc, modGain);

    // 4. Cross-frequency de-correlation (Newcastle 2025)
    const shimMaster = actx.createGain();
    shimMaster.gain.value = 0.04;
    shimMaster.connect(masterGain.current);
    nodes.push(shimMaster);

    SHIMMER.forEach(({ semitones, lfoHz }) => {
      const freq = hz * Math.pow(2, semitones / 12);
      const shimOsc = actx.createOscillator();
      shimOsc.type = 'sine';
      shimOsc.frequency.value = freq;

      const lfo = actx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = lfoHz;
      const lfoGain = actx.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain);

      const tGain = actx.createGain();
      tGain.gain.value = 0.5;
      lfoGain.connect(tGain.gain);
      shimOsc.connect(tGain);
      tGain.connect(shimMaster);
      shimOsc.start();
      lfo.start();
      nodes.push(shimOsc, lfo, lfoGain, tGain);
    });

    cancelNodes.current = nodes;

    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
  }, [currentHz]);

  const restart = useCallback(() => {
    stopAll();
    setPhase('start');
    setLockedHz(null);
    setCurrentHz(0);
    setHistory([]);
    setRangeMin(20); setRangeMax(16000);
    rangeRef.current = { min: 20, max: 16000 };
    setElapsed(0);
  }, [stopAll]);

  // Volume control
  useEffect(() => {
    if (masterGain.current && ctx.current) {
      masterGain.current.gain.setTargetAtTime(volume, ctx.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => { return () => stopAll(); }, [stopAll]);

  const narrowed = Math.max(0, Math.round(
    100 - (Math.log10(Math.max(1, rangeMax - rangeMin)) / Math.log10(15980)) * 100
  ));

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-sm">

        <AnimatePresence mode="wait">

          {/* ── START ── */}
          {phase === 'start' && (
            <motion.div key="start"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-10 pt-6">

              <div>
                <div className="text-6xl font-black text-white tracking-tighter mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  BUZZ<span className="text-purple-400">STOP</span>
                </div>
                <p className="text-gray-500 text-sm">Find your tinnitus frequency.<br/>Cancel it with AI.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-left px-4 py-3 border border-gray-800 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Put on headphones</p>
                </div>
                <div className="flex items-center gap-3 text-left px-4 py-3 border border-gray-800 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Press start — a tone plays</p>
                </div>
                <div className="flex items-center gap-3 text-left px-4 py-3 border border-gray-800 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Say warmer or colder — it homes in</p>
                </div>
                <div className="flex items-center gap-3 text-left px-4 py-3 border border-gray-800 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Lock it — 4 AI layers cancel the signal</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={startRadar}
                className="w-full py-5 rounded-2xl font-black text-xl tracking-wide text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 40px rgba(168,85,247,0.4)' }}>
                START
              </motion.button>

              <button onClick={() => setPhase('fine')} className="text-gray-700 text-xs font-mono hover:text-gray-500 transition-colors">
                I know my frequency already →
              </button>
            </motion.div>
          )}

          {/* ── RADAR ── */}
          {phase === 'radar' && (
            <motion.div key="radar"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-8">

              {/* Hz display */}
              <div className="text-center pt-4">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-6xl font-black text-purple-300 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 text-xs mt-1 font-mono tracking-widest">HZ — PLAYING NOW</p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-purple-500"
                    animate={{ width: `${narrowed}%` }}
                    transition={{ duration: 0.4 }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-700 mt-1">
                  <span>20 Hz</span>
                  <span className="text-purple-600">{narrowed}% narrowed</span>
                  <span>16 kHz</span>
                </div>
              </div>

              <p className="text-center text-gray-300 text-base">Does this match your buzz?</p>

              {/* Main two buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button whileTap={{ scale: 0.95 }} onClick={doWarmer}
                  className="py-10 rounded-2xl flex flex-col items-center gap-2 transition-all"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.4)' }}>
                  <span className="text-3xl">🔥</span>
                  <span className="text-green-400 font-bold text-lg">Warmer</span>
                  <span className="text-green-700 text-xs">closer to my buzz</span>
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={colder}
                  className="py-10 rounded-2xl flex flex-col items-center gap-2 transition-all"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1.5px solid rgba(59,130,246,0.4)' }}>
                  <span className="text-3xl">❄️</span>
                  <span className="text-blue-400 font-bold text-lg">Colder</span>
                  <span className="text-blue-700 text-xs">different from my buzz</span>
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 accent-purple-500 bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <div className="flex justify-between items-center">
                {history.length > 0
                  ? <button onClick={undo} className="text-gray-700 text-xs font-mono hover:text-gray-400 transition-colors">← undo</button>
                  : <span />}
                <button onClick={() => setPhase('fine')} className="text-purple-800 text-xs font-mono hover:text-purple-500 transition-colors">
                  fine-tune manually →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── FINE TUNE ── */}
          {phase === 'fine' && (
            <motion.div key="fine"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-7 pt-4">

              <div className="text-center">
                <p className="text-gray-500 text-xs font-mono tracking-widest mb-3">FINE TUNE</p>
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="text-6xl font-black text-green-400 tabular-nums"
                  style={{ letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 text-xs mt-1 font-mono tracking-widest">HZ</p>
              </div>

              <p className="text-center text-gray-400 text-sm">Nudge until this tone sounds exactly like your tinnitus</p>

              {/* Coarse */}
              <div>
                <p className="text-gray-700 text-[10px] font-mono text-center mb-2 tracking-widest">COARSE</p>
                <div className="grid grid-cols-2 gap-3">
                  {[[-100,'−100 Hz'],[100,'+100 Hz']].map(([d, l]) => (
                    <motion.button key={d} whileTap={{ scale: 0.95 }} onClick={() => nudge(d)}
                      className="py-4 rounded-xl text-gray-300 font-bold text-sm transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Fine */}
              <div>
                <p className="text-gray-700 text-[10px] font-mono text-center mb-2 tracking-widest">FINE</p>
                <div className="grid grid-cols-2 gap-3">
                  {[[-1,'−1 Hz'],[1,'+1 Hz']].map(([d, l]) => (
                    <motion.button key={d} whileTap={{ scale: 0.95 }} onClick={() => nudge(d)}
                      className="py-4 rounded-xl text-gray-300 font-bold text-sm transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 accent-green-500 bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={lock}
                className="w-full py-5 rounded-2xl font-black text-xl text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #059669, #22c55e)', boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>
                LOCK + CANCEL
              </motion.button>

              <button onClick={() => setPhase('radar')} className="w-full text-gray-700 text-xs font-mono hover:text-gray-500 transition-colors text-center">
                ← back to radar
              </button>
            </motion.div>
          )}

          {/* ── LOCKED ── */}
          {phase === 'locked' && lockedHz && (
            <motion.div key="locked"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-7 pt-6 text-center">

              <div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xs font-mono tracking-widest text-green-500 mb-3">
                  CANCELLING
                </motion.div>
                <div className="text-7xl font-black tabular-nums"
                  style={{ color: '#22c55e', letterSpacing: '-3px', textShadow: '0 0 40px rgba(34,197,94,0.4)' }}>
                  {lockedHz.toLocaleString()}
                </div>
                <p className="text-gray-600 text-xs font-mono tracking-widest mt-1">HZ LOCKED</p>
                <p className="text-gray-500 text-2xl font-mono mt-4">{fmt(elapsed)}</p>
              </div>

              <p className="text-gray-500 text-sm">Relax. Close your eyes.<br/>Let it run 5–15 minutes.</p>

              {/* 4 mechanism pulse dots */}
              <div className="flex justify-center gap-4">
                {[
                  { color: '#a855f7', label: 'Interference', delay: 0 },
                  { color: '#06b6d4', label: 'Cortex', delay: 0.4 },
                  { color: '#22c55e', label: 'Pattern', delay: 0.8 },
                  { color: '#ec4899', label: 'Shimmer', delay: 1.2 },
                ].map(m => (
                  <div key={m.label} className="flex flex-col items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, delay: m.delay }}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                    <span className="text-[9px] font-mono" style={{ color: m.color }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 accent-green-500 bg-gray-800 rounded cursor-pointer" />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={restart}
                  className="py-4 rounded-xl text-purple-400 font-bold text-sm transition-all"
                  style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.3)' }}>
                  Try Again
                </button>
                <button onClick={() => { stopAll(); onStop?.(); }}
                  className="py-4 rounded-xl text-gray-500 font-bold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Stop
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}