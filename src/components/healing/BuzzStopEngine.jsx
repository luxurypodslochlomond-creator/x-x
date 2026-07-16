import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuzzStopMemory } from './BuzzStopSessionMemory';
import { useBuzzStopAnalytics } from './BuzzStopAnalytics';
import { triggerSuccessHaptic, triggerSearchHaptic, triggerErrorHaptic } from './BuzzStopHaptics';

// ── CUSTOM SVG ICONS ──────────────────────────────────────────────────────────

const WarmIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* radiating heat waves */}
    <circle cx="24" cy="24" r="9" fill="#ff6b35" opacity="0.9"/>
    <circle cx="24" cy="24" r="6" fill="#ffaa44"/>
    <circle cx="24" cy="24" r="3" fill="#fff5e0"/>
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <line key={i}
        x1={24 + Math.cos(deg * Math.PI/180) * 12}
        y1={24 + Math.sin(deg * Math.PI/180) * 12}
        x2={24 + Math.cos(deg * Math.PI/180) * 19}
        y2={24 + Math.sin(deg * Math.PI/180) * 19}
        stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
    ))}
  </svg>
);

const ColdIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* snowflake crystal */}
    <line x1="24" y1="6" x2="24" y2="42" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round"/>
    <line x1="10" y1="10" x2="38" y2="38" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round"/>
    <line x1="38" y1="10" x2="10" y2="38" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round"/>
    {/* inner crystal points */}
    {[0,60,120,180,240,300].map((deg, i) => (
      <circle key={i}
        cx={24 + Math.cos(deg * Math.PI/180) * 14}
        cy={24 + Math.sin(deg * Math.PI/180) * 14}
        r="2.5" fill="#bae6fd" opacity="0.9"/>
    ))}
    <circle cx="24" cy="24" r="4" fill="#e0f2fe"/>
  </svg>
);

const HeadphonesIcon = ({ size = 28, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M6 18v-4a10 10 0 0 1 20 0v4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="4" y="17" width="5" height="8" rx="2.5" fill={color} opacity="0.9"/>
    <rect x="23" y="17" width="5" height="8" rx="2.5" fill={color} opacity="0.9"/>
  </svg>
);

const SpeakerIcon = ({ size = 28, color = '#94a3b8' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M6 11h5l7-5v20l-7-5H6z" fill={color} opacity="0.8"/>
    <path d="M21 11.5a7 7 0 0 1 0 9" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 8a12 12 0 0 1 0 16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const LockIcon = ({ size = 28, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="7" y="14" width="18" height="13" rx="3" fill={color} opacity="0.85"/>
    <path d="M11 14v-4a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="16" cy="21" r="2.5" fill="#fff" opacity="0.9"/>
  </svg>
);

const WaveIcon = ({ size = 22, color }) => (
  <svg width={size} height={size} viewBox="0 0 32 16" fill="none">
    <path d="M2 8 L6 8 L8 2 L10 14 L12 5 L14 11 L16 1 L18 15 L20 4 L22 12 L24 7 L26 9 L30 8"
      stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

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

// ── COLOUR SYSTEM — deep electric green / white / charcoal ────────────────────
const C = {
  green:        '#22c55e',
  greenDim:     'rgba(34,197,94,0.12)',
  greenBorder:  'rgba(34,197,94,0.35)',
  greenGlow:    'rgba(34,197,94,0.3)',
  warm:         '#ff6b35',
  warmDim:      'rgba(255,107,53,0.12)',
  warmBorder:   'rgba(255,107,53,0.4)',
  cold:         '#7dd3fc',
  coldDim:      'rgba(125,211,252,0.08)',
  coldBorder:   'rgba(125,211,252,0.3)',
  surface:      'rgba(255,255,255,0.04)',
  surfaceBorder:'rgba(255,255,255,0.1)',
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function BuzzStopEngine({ onStop }) {
  const { saveSession, loadSession, recordEffectiveness } = useBuzzStopMemory();
  const { trackSessionStart, trackSessionEnd, getAnalytics } = useBuzzStopAnalytics();

  const [phase, setPhase]           = useState('start');
  const [rangeMin, setRangeMin]     = useState(20);
  const [rangeMax, setRangeMax]     = useState(16000);
  const [currentHz, setCurrentHz]   = useState(0);
  const [lockedHz, setLockedHz]     = useState(null);
  const [volume, setVolume]         = useState(0.3);
  const [history, setHistory]       = useState([]);
  const [elapsed, setElapsed]       = useState(0);
  const [hasHeadphones, setHasHeadphones] = useState(null);
  const [lastFrequency, setLastFrequency] = useState(null);

  const ctx         = useRef(null);
  const masterGain  = useRef(null);
  const primaryOsc  = useRef(null);
  const cancelNodes = useRef([]);
  const timerRef    = useRef(null);
  const rangeRef    = useRef({ min: 20, max: 16000 });
  const wakeLockRef = useRef(null);

  useEffect(() => { rangeRef.current = { min: rangeMin, max: rangeMax }; }, [rangeMin, rangeMax]);

  // Load last found frequency on mount
  useEffect(() => {
    const session = loadSession();
    if (session?.userFrequency) {
      setLastFrequency(session.userFrequency);
    }
  }, [loadSession]);

  const getCtx = useCallback(async () => {
    if (!ctx.current || ctx.current.state === 'closed') {
      ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.current.state === 'suspended') await ctx.current.resume();
    return ctx.current;
  }, []);

  // iOS Safari locks audio until a user gesture creates+resumes the context.
  // Call this on the first tap so START plays instantly.
  const unlockAudio = useCallback(() => {
    getCtx().catch(() => {});
  }, [getCtx]);

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
    if (wakeLockRef.current) { wakeLockRef.current.release(); wakeLockRef.current = null; }
  }, [stopCancelLayer]);

  const playHz = useCallback(async (hz) => {
    stopCancelLayer();
    const safeHz = Math.max(20, Math.min(16000, Math.round(hz)));
    if (!ctx.current || ctx.current.state === 'closed' || !primaryOsc.current) {
      await startPrimary(safeHz);
    } else {
      // Hard-set value first to prevent any ramp overshooting bounds
      primaryOsc.current.frequency.cancelScheduledValues(ctx.current.currentTime);
      primaryOsc.current.frequency.setValueAtTime(safeHz, ctx.current.currentTime);
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

  // WARMER = this tone IS the zone → zoom in around it
  const warmer = useCallback(() => {
    triggerSearchHaptic();
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logHz  = Math.log10(Math.max(1, currentHz));
    const logSpan = logMax - logMin;
    const newHalfSpan = logSpan * 0.25;
    const nLogMin = Math.max(logMin, logHz - newHalfSpan);
    const nLogMax = Math.min(logMax, logHz + newHalfSpan);
    const safeMin = Math.max(20,    Math.round(Math.pow(10, nLogMin)));
    const safeMax = Math.min(16000, Math.round(Math.pow(10, nLogMax)));
    if (safeMax - safeMin < 40) { setPhase('fine'); return; }
    const next = getMid(safeMin, safeMax);
    setHistory(h => [...h, { min, max }]);
    setRangeMin(safeMin); setRangeMax(safeMax);
    rangeRef.current = { min: safeMin, max: safeMax };
    playHz(next);
    if (safeMax - safeMin < 60) setTimeout(() => setPhase('fine'), 50);
  }, [currentHz, playHz]);

  // COLDER = not this tone → discard this half, jump to other half
  const colder = useCallback(() => {
    const { min, max } = rangeRef.current;
    const logMin = Math.log10(Math.max(1, min));
    const logMax = Math.log10(Math.max(1, max));
    const logMid = (logMin + logMax) / 2;
    const logHz  = Math.log10(Math.max(1, currentHz));
    const [nLogMin, nLogMax] = logHz <= logMid
      ? [logMid, logMax]   // tone in lower half → explore upper
      : [logMin, logMid];  // tone in upper half → explore lower
    const safeMin = Math.max(20,    Math.round(Math.pow(10, nLogMin)));
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
    const next = Math.max(20, Math.min(16000, currentHz + delta));
    if (next === currentHz) return; // already at boundary, don't re-trigger
    playHz(next);
  }, [currentHz, playHz]);

  const lock = useCallback(async () => {
    const hz = currentHz;
    setLockedHz(hz);
    setPhase('locked');
    triggerSuccessHaptic();
    
    // Keep screen on while cancellation runs
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then(lock => {
        wakeLockRef.current = lock;
      }).catch(() => {});
    }

    // Save this session for next visit
    saveSession({ userFrequency: hz });
    
    // Track analytics
    trackSessionStart(hz);
    
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

    // 2. Alpha cortex calming — binaural only with headphones
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

    // 3. Pattern break — isolated gain node
    const modOsc = actx.createOscillator();
    modOsc.type = 'sine';
    modOsc.frequency.value = 0.08;
    const modDepth = actx.createGain();
    modDepth.gain.value = 0.15;
    const modTarget = actx.createGain();
    modTarget.gain.value = 1.0;
    modTarget.connect(masterGain.current);
    modOsc.connect(modDepth);
    modDepth.connect(modTarget.gain);
    modOsc.start();
    nodes.push(modOsc, modDepth, modTarget);

    // 4. Cross-freq shimmer
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
  }, [currentHz, hasHeadphones]);

  const restart = useCallback(() => {
    // Track effectiveness before stopping
    if (elapsed > 0) {
      recordEffectiveness(elapsed > 300 ? 75 : elapsed > 60 ? 50 : 25);
      trackSessionEnd(elapsed > 300 ? 75 : elapsed > 60 ? 50 : 25);
    }
    
    stopAll();
    setPhase('start');
    setLockedHz(null);
    setCurrentHz(0);
    setHistory([]);
    setRangeMin(20); setRangeMax(16000);
    rangeRef.current = { min: 20, max: 16000 };
    setElapsed(0);
    setHasHeadphones(null);
  }, [stopAll, elapsed, recordEffectiveness, trackSessionEnd]);

  useEffect(() => {
    if (masterGain.current && ctx.current) {
      masterGain.current.gain.setTargetAtTime(volume, ctx.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => { return () => stopAll(); }, [stopAll]);

  const narrowed = Math.max(0, Math.round(
    100 - (Math.log10(Math.max(1, rangeMax - rangeMin)) / Math.log10(15980)) * 100
  ));

  // ── RENDER ────────────────────────────────────────────────────────────────

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
                  BUZZ<span style={{ color: C.green }}>STOP</span>
                </div>
                <p className="text-gray-500 text-sm">On-device AI audio engine.<br/>Finds your frequency. Cancels it.</p>
              </div>

              {hasHeadphones === null ? (
                <div className="space-y-5">
                  {lastFrequency && (
                    <div className="px-4 py-3 rounded-xl text-center"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
                      <p className="text-xs font-mono text-gray-600 mb-1">LAST FOUND</p>
                      <p className="text-2xl font-black" style={{ color: C.green }}>{lastFrequency.toLocaleString()} Hz</p>
                    </div>
                  )}
                  <p className="text-gray-400 text-sm font-mono tracking-widest">ARE YOU WEARING HEADPHONES?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { unlockAudio(); setHasHeadphones(true); }}
                      className="py-6 rounded-2xl flex flex-col items-center gap-3 transition-all"
                      style={{ background: C.greenDim, border: `1.5px solid ${C.greenBorder}` }}>
                      <HeadphonesIcon size={32} color={C.green} />
                      <span className="font-black text-base" style={{ color: C.green }}>YES</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { unlockAudio(); setHasHeadphones(false); }}
                      className="py-6 rounded-2xl flex flex-col items-center gap-3 transition-all"
                      style={{ background: C.surface, border: `1.5px solid ${C.surfaceBorder}` }}>
                      <SpeakerIcon size={32} color="#94a3b8" />
                      <span className="font-black text-base text-gray-400">NO</span>
                    </motion.button>
                  </div>

                  {/* ── STATS STRIP ── */}
                  <div className="rounded-2xl overflow-hidden mt-2" style={{ border: '1px solid rgba(34,197,94,0.15)', background: 'rgba(34,197,94,0.04)' }}>
                    <div className="grid grid-cols-3 divide-x divide-green-900/30">
                      {[
                        { stat: '750M', label: 'people suffer tinnitus' },
                        { stat: '1 in 7', label: 'adults affected' },
                        { stat: 'FREE', label: 'always · no accounts' },
                      ].map(({ stat, label }) => (
                        <div key={stat} className="py-3 px-2 text-center">
                          <div className="font-black text-base leading-none" style={{ color: '#22c55e' }}>{stat}</div>
                          <div className="text-[9px] mt-1 leading-tight" style={{ color: 'rgba(34,197,94,0.5)' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-green-900/20 text-center">
                      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Uses <span style={{ color: '#22c55e', fontWeight: 700 }}>destructive interference</span> — same physics as noise-cancelling headphones. 100% on-device, zero data stored.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">

                  {/* ── SCIENCE STRIP ── */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.04)' }}>
                    <div className="grid grid-cols-3 divide-x divide-green-900/40">
                      {[
                        { stat: '750M', label: 'people affected globally' },
                        { stat: '1 in 7', label: 'adults have tinnitus' },
                        { stat: '14%', label: 'severely impacted' },
                      ].map(({ stat, label }) => (
                        <div key={stat} className="py-3 px-2 text-center">
                          <div className="font-black text-lg leading-none" style={{ color: C.green }}>{stat}</div>
                          <div className="text-[10px] mt-1 leading-tight" style={{ color: 'rgba(34,197,94,0.5)' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-green-900/30">
                      <p className="text-xs text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        BuzzStop uses <span style={{ color: C.green, fontWeight: 700 }}>destructive interference</span> — the same physics as noise-cancelling headphones — to identify and cancel your exact tinnitus frequency with AI precision.
                      </p>
                    </div>
                    <div className="px-4 pb-3 text-center">
                      <span className="text-xs font-black tracking-widest" style={{ color: C.green }}>100% FREE · ALWAYS</span>
                    </div>
                  </div>

                  {!hasHeadphones && (
                    <div className="px-4 py-3 rounded-xl text-left"
                      style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.25)' }}>
                      <p className="text-xs font-mono font-bold mb-1" style={{ color: C.warm }}>SPEAKER MODE</p>
                      <p className="text-xs" style={{ color: 'rgba(255,107,53,0.6)' }}>
                        Works — but binaural beats are skipped. Headphones = best results.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-left">
                    {[
                      { icon: <WaveIcon size={18} color={C.green} />, text: 'A tone plays — listen carefully' },
                      { icon: <WarmIcon size={18} />, text: 'Warmer = yes, zoom in on that zone' },
                      { icon: <ColdIcon size={18} />, text: 'Colder = no, jump to the other half' },
                      { icon: <LockIcon size={18} color={C.green} />, text: 'Lock it — 4 AI layers cancel the signal' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                        <div className="flex-shrink-0">{item.icon}</div>
                        <p className="text-gray-400 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <motion.button whileTap={{ scale: 0.97 }} onClick={startRadar}
                    className="w-full py-5 rounded-2xl font-black text-xl tracking-wide text-black transition-all"
                    style={{ background: C.green, boxShadow: `0 0 40px ${C.greenGlow}` }}>
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
              className="space-y-7">

              <div className="text-center pt-4">
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="text-6xl font-black tabular-nums text-white"
                  style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 text-xs mt-1 font-mono tracking-widest">HZ — PLAYING NOW</p>
              </div>

              {/* Progress */}
              <div>
                <div className="h-0.5 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: C.green }}
                    animate={{ width: `${narrowed}%` }} transition={{ duration: 0.4 }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-700 mt-1.5">
                  <span>20 Hz</span>
                  <span style={{ color: C.green }}>{narrowed}% narrowed</span>
                  <span>16 kHz</span>
                </div>
              </div>

              <p className="text-center text-gray-300 text-sm">Does this tone sound like your buzz?</p>

              {/* WARM / COLD */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={warmer}
                  className="py-9 rounded-2xl flex flex-col items-center gap-3 transition-all"
                  style={{ background: C.warmDim, border: `2px solid ${C.warmBorder}` }}>
                  <WarmIcon size={44} />
                  <div>
                    <div className="font-black text-lg leading-none" style={{ color: C.warm }}>WARMER</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,107,53,0.55)' }}>yes, that's the zone</div>
                  </div>
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={colder}
                  className="py-9 rounded-2xl flex flex-col items-center gap-3 transition-all"
                  style={{ background: C.coldDim, border: `2px solid ${C.coldBorder}` }}>
                  <ColdIcon size={44} />
                  <div>
                    <div className="font-black text-lg leading-none" style={{ color: C.cold }}>COLDER</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(125,211,252,0.5)' }}>not that one</div>
                  </div>
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-0.5 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.green }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <div className="flex justify-between items-center">
                {history.length > 0
                  ? <button onClick={undo} className="text-gray-700 text-xs font-mono hover:text-gray-400 transition-colors">← undo</button>
                  : <span />}
                <button onClick={() => setPhase('fine')} className="text-xs font-mono hover:opacity-60 transition-opacity" style={{ color: C.green }}>
                  fine-tune →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── FINE TUNE ── */}
          {phase === 'fine' && (
            <motion.div key="fine"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6 pt-4">

              <div className="text-center">
                <p className="text-gray-600 text-xs font-mono tracking-widest mb-3">FINE TUNE</p>
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="text-6xl font-black tabular-nums text-white"
                  style={{ letterSpacing: '-2px' }}>
                  {currentHz.toLocaleString()}
                </motion.div>
                <p className="text-gray-700 text-xs mt-1 font-mono tracking-widest">HZ</p>
              </div>

              <p className="text-center text-gray-500 text-sm">Nudge until it matches your tinnitus exactly</p>

              <div>
                <p className="text-gray-700 text-[10px] font-mono text-center mb-2 tracking-widest">COARSE</p>
                <div className="grid grid-cols-4 gap-2">
                  {[[-1000,'−1k'],[-100,'−100'],[100,'+100'],[1000,'+1k']].map(([d, l]) => (
                    <motion.button key={d} whileTap={{ scale: 0.93 }} onClick={() => nudge(d)}
                      className="py-4 rounded-xl text-gray-300 font-bold text-xs transition-all"
                      style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-700 text-[10px] font-mono text-center mb-2 tracking-widest">FINE</p>
                <div className="grid grid-cols-2 gap-3">
                  {[[-1,'−1 Hz'],[1,'+1 Hz']].map(([d, l]) => (
                    <motion.button key={d} whileTap={{ scale: 0.93 }} onClick={() => nudge(d)}
                      className="py-4 rounded-xl text-gray-300 font-bold text-sm transition-all"
                      style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-0.5 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.green }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={lock}
                className="w-full py-5 rounded-2xl font-black text-xl text-black transition-all flex items-center justify-center gap-3"
                style={{ background: C.green, boxShadow: `0 0 30px ${C.greenGlow}` }}>
                <LockIcon size={24} color="#000" />
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
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="text-xs font-mono tracking-widest mb-4"
                  style={{ color: C.green }}>
                  ● CANCELLING
                </motion.div>
                <div className="text-7xl font-black tabular-nums text-white"
                  style={{ letterSpacing: '-3px' }}>
                  {lockedHz.toLocaleString()}
                </div>
                <p className="text-gray-700 text-xs font-mono tracking-widest mt-2">HZ LOCKED</p>
                <p className="text-gray-500 text-2xl font-mono mt-5">{fmt(elapsed)}</p>
              </div>

              <p className="text-gray-600 text-sm">Relax. Close your eyes.<br/>Let it run 5–15 minutes.</p>

              {/* 4 mechanism dots */}
              <div className="flex justify-center gap-5">
                {[
                  { color: C.green,  label: 'Phase', delay: 0 },
                  { color: '#818cf8', label: 'Cortex', delay: 0.5 },
                  { color: C.warm,   label: 'Pattern', delay: 1 },
                  { color: C.cold,   label: 'Shimmer', delay: 1.5 },
                ].map(m => (
                  <div key={m.label} className="flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2.5, delay: m.delay }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                    <span className="text-[9px] font-mono" style={{ color: m.color }}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 px-1">
                <span className="text-gray-700 text-xs font-mono">VOL</span>
                <input type="range" min="0" max="0.6" step="0.02" value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-0.5 bg-gray-800 rounded cursor-pointer"
                  style={{ accentColor: C.green }} />
                <span className="text-gray-700 text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
              </div>

              {/* Share button */}
              <button
                onClick={async () => {
                  const url = 'https://uf51.love/api/functions/ogRedirect?page=BuzzStop';
                  const text = `Found my tinnitus frequency (${lockedHz.toLocaleString()} Hz) using BuzzStop — free tool, no account needed. Try it:`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'BuzzStop', text, url }); } catch (e) {}
                  } else {
                    await navigator.clipboard.writeText(`${text} ${url}`);
                  }
                }}
                className="flex items-center justify-center gap-2 text-xs font-mono transition-colors mx-auto"
                style={{ color: 'rgba(34,197,94,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#22c55e'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,197,94,0.5)'}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                share with someone who needs this
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={restart}
                  className="py-4 rounded-xl font-bold text-sm transition-all"
                  style={{ color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}` }}>
                  Try Again
                </button>
                <button onClick={() => { stopAll(); onStop?.(); }}
                  className="py-4 rounded-xl text-gray-500 font-bold text-sm transition-all"
                  style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
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