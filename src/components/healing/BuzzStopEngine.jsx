import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BUZZSTOP ENGINE V4
 *
 * WARM/COLD logic:
 * - "Warmer" = the current tone IS close to your tinnitus → ZOOM IN around it
 * - "Colder" = the current tone is NOT like your tinnitus → ELIMINATE this half, play the other half
 *
 * Binary search: always split the current range in half (log scale).
 * - Colder: discard the half containing current tone, play midpoint of other half
 * - Warmer: zoom into the half containing current tone (narrower search window)
 */

const SHIMMER = [
  { semitones: -1.5, lfoHz: 0.061 },
  { semitones: -0.7, lfoHz: 0.083 },
  { semitones:  0.5, lfoHz: 0.097 },
  { semitones:  1.2, lfoHz: 0.112 },
  { semitones:  2.1, lfoHz: 0.073 },
];

// Geometric midpoint (log scale)
const getMid = (min, max) =>
  Math.round(Math.pow(10, (Math.log10(Math.max(1, min)) + Math.log10(Math.max(1, max))) / 2));

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function BuzzStopEngine({ onStop }) {
  const [phase, setPhase] = useState('start');
  const [rangeMin, setRangeMin] = useState(20);
  const [rangeMax, setRangeMax] = useState(16000);
  const [currentHz, setCurrentHz] = useState(0);
  const [lockedHz, setLockedHz] = useState(null);
  const [volume, setVolume] = useState(0.3);
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [hasHeadphones, setHasHeadphones] = useState(null); // null = not asked yet

  const ctx = useRef(null);
  const masterGain = useRef(null);
  const primaryOsc = useRef(null);
  const cancelNodes = useRef([]);
  const timerRef = useRef(null);
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
    const safeHz = Math.max(20, Math.min(16000, Math.round(hz)));
    if (!ctx.current || ctx.current.state === 'closed' || !primaryOsc.current) {
      await startPrimary(safeHz);
    } else {
      primaryOsc.current.frequency.setTargetAtTime(safeHz, ctx.current.currentTime, 0.06);
    }
    setCurrentHz(safeHz);
  }, [stopCancelLayer, startPrimary]);

  const startRadar = useCallback(async () => {
    stopAll();
    const min = 20, max = 16000;
    setRangeMin(min); setRangeMax(max);
    rangeRef.current = { min, max };
    setHistory([]);
    setPhase('radar');
    const hz = getMid(min, max);
    await startPrimary(hz);
    setCurrentHz(hz);
  }, [stopAll, startPrimary]);

  // WARMER = this tone IS close → zoom in around the current tone
  const warmer = useCallback(() => {
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logHz = Math.log10(Math.max(1, currentHz));
    const logSpan = logMax - logMin;

    // Zoom in: keep current tone roughly centred, shrink span by ~50%
    const newHalfSpan = logSpan * 0.25;
    const nLogMin = Math.max(logMin, logHz - newHalfSpan);
    const nLogMax = Math.min(logMax, logHz + newHalfSpan);

    const safeMin = Math.max(20, Math.round(Math.pow(10, nLogMin)));
    const safeMax = Math.min(16000, Math.round(Math.pow(10, nLogMax)));

    if (safeMax - safeMin < 40) { setPhase('fine'); return; }

    const next = getMid(safeMin, safeMax);
    setHistory(h => [...h, { min, max }]);
    setRangeMin(safeMin); setRangeMax(safeMax);
    rangeRef.current = { min: safeMin, max: safeMax };
    playHz(next);
    if (safeMax - safeMin < 60) setTimeout(() => setPhase('fine'), 50);
  }, [currentHz, playHz]);

  // COLDER = this tone is NOT it → split range, discard the half with current tone, play other half
  const colder = useCallback(() => {
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logMid = (logMin + logMax) / 2;
    const logHz = Math.log10(Math.max(1, currentHz));

    // Current tone is in the lower half → explore upper half
    // Current tone is in the upper half → explore lower half
    let nLogMin, nLogMax;
    if (logHz <= logMid) {
      // tone is in lower half → discard lower, go upper
      nLogMin = logMid;
      nLogMax = logMax;
    } else {
      // tone is in upper half → discard upper, go lower
      nLogMin = logMin;
      nLogMax = logMid;
    }

    const safeMin = Math.max(20, Math.round(Math.pow(10, nLogMin)));
    const safeMax = Math.min(16000, Math.round(Math.pow(10, nLogMax)));
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

    // 2. Alpha cortex calming — binaural beat only works with headphones
    if (hasHeadphones) {
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
    }

    // 3. Pattern break (0.08Hz amplitude tremolo) — connect to a separate gain node
    const modOsc = actx.createOscillator();
    modOsc.type = 'sine';
    modOsc.frequency.value = 0.08;
    const modDepth = actx.createGain();
    modDepth.gain.value = 0.15;
    // Use a dedicated gain node so modulation doesn't fight the cancel layer
    const modTarget = actx.createGain();
    modTarget.gain.value = 1.0;
    modTarget.connect(masterGain.current);
    modOsc.connect(modDepth);
    modDepth.connect(modTarget.gain);
    modOsc.start();
    nodes.push(modOsc, modDepth, modTarget);

    // 4. Cross-frequency de-correlation shimmer
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

  useEffect(() => {
    if (masterGain.current && ctx.current) {
      masterGain.current.gain.setTargetAtTime(volume, ctx.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => { return () => stopAll(); }, [stopAll]);

  const narrowed = Math.max(0, Math.round(
    100 - (Math.log10(Math.max(1, rangeMax - rangeMin)) / Math.log10(15980)) * 100
  ));

  // ── COLOUR SYSTEM: cyan/teal — precision instrument feel ──
  const C = {
    primary: '#06b6d4',       // cyan-500
    primaryDim: 'rgba(6,182,212,0.15)',
    primaryBorder: 'rgba(6,182,212,0.4)',
    warm: '#f97316',          // orange — fire
    warmDim: 'rgba(249,115,22,0.12)',
    warmBorder: 'rgba(249,115,22,0.4)',
    cold: '#38bdf8',          // sky blue — ice
    coldDim: 'rgba(56,189,248,0.1)',
    coldBorder: 'rgba(56,189,248,0.35)',
    lock: '#10b981',          // emerald
    lockDim: 'rgba(16,185,129,0.15)',
    lockBorder: 'rgba(16,185,129,0.4)',
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-sm">

        <AnimatePresence mode="wait">

          {/* ── START ── */}
          {phase === 'start' && (
            <motion.div key="start"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-8 pt-6">

              <div>
                <div className="text-6xl font-black text-white tracking-tighter mb-2">
                  BUZZ<span style={{ color: C.primary }}>STOP</span>
                </div>
                <p className="text-gray-500 text-sm">Find your tinnitus frequency.<br/>Cancel it with AI.</p>
              </div>

              {/* Headphones check */}
              {hasHeadphones === null ? (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm font-mono tracking-wide">Are you wearing headphones?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setHasHeadphones(true)}
                      className="py-5 rounded-2xl font-black text-base text-white"
                      style={{ background: C.primaryDim, border: `1.5px solid ${C.primaryBorder}` }}>
                      🎧 Yes
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setHasHeadphones(false)}
                      className="py-5 rounded-2xl font-black text-base text-gray-300"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                      🔊 No
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {!hasHeadphones && (
                    <div className="px-4 py-3 rounded-xl text-left" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>
                      <p className="text-orange-400 text-xs font-mono font-bold mb-1">⚠ SPEAKER MODE</p>
                      <p className="text-orange-300/70 text-xs">Works but binaural beats won't function — for best results use headphones. The destructive interference + shimmer will still help.</p>
                    </div>
                  )}

                  <div className="space-y-2 text-left">
                    {[
                      { dot: C.primary, text: 'A tone plays — listen carefully' },
                      { dot: C.warm,   text: '🔥 Warmer = yes, that\'s the zone — homes in' },
                      { dot: '#38bdf8', text: '❄️ Colder = no, not that one — jumps away' },
                      { dot: C.lock,   text: 'Lock it — AI layers cancel the signal' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 border border-gray-800 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                        <p className="text-gray-400 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={startRadar}
                    className="w-full py-5 rounded-2xl font-black text-xl tracking-wide text-white transition-all"
                    style={{ background: `linear-gradient(135deg, #0891b2, ${C.primary})`, boxShadow: `0 0 40px rgba(6,182,212,0.35)` }}>
                    START
                  </motion.button>

                  <button onClick={async () => { await startPrimary(8000); setCurrentHz(8000); setPhase('fine'); }}
                    className="text-gray-700 text-xs font-mono hover:text-gray-500 transition-colors">
                    I know my frequency already →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── RADAR ── */}
          {phase === 'radar' && (
            <motion.div key="radar"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-8">

              <div className="text-center pt-4">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-6xl font-black tabular-nums"
                  style={{ color: C.primary, fontVariantNumeric: 'tabular-nums', letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 text-xs mt-1 font-mono tracking-widest">HZ — PLAYING NOW</p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: C.primary }}
                    animate={{ width: `${narrowed}%` }}
                    transition={{ duration: 0.4 }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-700 mt-1">
                  <span>20 Hz</span>
                  <span style={{ color: C.primary }}>{narrowed}% narrowed</span>
                  <span>16 kHz</span>
                </div>
              </div>

              <p className="text-center text-gray-300 text-base">Does this tone sound like your buzz?</p>

              {/* WARM / COLD — big clear buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button whileTap={{ scale: 0.95 }} onClick={warmer}
                  className="py-10 rounded-2xl flex flex-col items-center gap-2 transition-all"
                  style={{ background: C.warmDim, border: `1.5px solid ${C.warmBorder}` }}>
                  <span className="text-4xl">🔥</span>
                  <span className="font-black text-lg" style={{ color: C.warm }}>WARMER</span>
                  <span className="text-xs text-center leading-snug" style={{ color: 'rgba(249,115,22,0.6)' }}>yes, that's the zone</span>
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={colder}
                  className="py-10 rounded-2xl flex flex-col items-center gap-2 transition-all"
                  style={{ background: C.coldDim, border: `1.5px solid ${C.coldBorder}` }}>
                  <span className="text-4xl">❄️</span>
                  <span className="font-black text-lg" style={{ color: C.cold }}>COLDER</span>
                  <span className="text-xs text-center leading-snug" style={{ color: 'rgba(56,189,248,0.6)' }}>no, not that one</span>
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.primary }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <div className="flex justify-between items-center">
                {history.length > 0
                  ? <button onClick={undo} className="text-gray-700 text-xs font-mono hover:text-gray-400 transition-colors">← undo</button>
                  : <span />}
                <button onClick={() => setPhase('fine')} className="text-xs font-mono hover:opacity-70 transition-opacity" style={{ color: C.primary }}>
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
                  className="text-6xl font-black tabular-nums"
                  style={{ color: C.lock, letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 text-xs mt-1 font-mono tracking-widest">HZ</p>
              </div>

              <p className="text-center text-gray-400 text-sm">Nudge until this tone sounds exactly like your tinnitus</p>

              <div>
                <p className="text-gray-700 text-[10px] font-mono text-center mb-2 tracking-widest">COARSE</p>
                <div className="grid grid-cols-4 gap-2">
                  {[[-1000,'−1k'],[-100,'−100'],[100,'+100'],[1000,'+1k']].map(([d, l]) => (
                    <motion.button key={d} whileTap={{ scale: 0.95 }} onClick={() => nudge(d)}
                      className="py-4 rounded-xl text-gray-300 font-bold text-xs transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

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

              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.lock }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={lock}
                className="w-full py-5 rounded-2xl font-black text-xl text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
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
                  className="text-xs font-mono tracking-widest mb-3"
                  style={{ color: C.lock }}>
                  CANCELLING
                </motion.div>
                <div className="text-7xl font-black tabular-nums"
                  style={{ color: C.lock, letterSpacing: '-3px', textShadow: `0 0 40px rgba(16,185,129,0.4)` }}>
                  {lockedHz.toLocaleString()}
                </div>
                <p className="text-gray-600 text-xs font-mono tracking-widest mt-1">HZ LOCKED</p>
                <p className="text-gray-500 text-2xl font-mono mt-4">{fmt(elapsed)}</p>
              </div>

              <p className="text-gray-500 text-sm">Relax. Close your eyes.<br/>Let it run 5–15 minutes.</p>

              <div className="flex justify-center gap-4">
                {[
                  { color: C.primary, label: 'Interference', delay: 0 },
                  { color: '#818cf8', label: 'Cortex', delay: 0.4 },
                  { color: C.lock,   label: 'Pattern', delay: 0.8 },
                  { color: C.warm,   label: 'Shimmer', delay: 1.2 },
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

              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.lock }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={restart}
                  className="py-4 rounded-xl font-bold text-sm transition-all"
                  style={{ color: C.primary, background: C.primaryDim, border: `1px solid ${C.primaryBorder}` }}>
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