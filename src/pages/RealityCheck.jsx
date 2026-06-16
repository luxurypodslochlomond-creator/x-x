import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════
// Warm synth pads — tones phone speakers CAN reproduce
// ═══════════════════════════════════════════════════════════════
const useWarmAudio = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const start = useCallback(() => {
    if (nodesRef.current.length > 0) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    const all = [];

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4);
    master.connect(ctx.destination);
    all.push(master);

    // Warm pad: layered sine waves with slow detune — like a meditation bowl
    const freqs = [220, 277, 330, 440]; // A3, C#4, E4, A4 — a warm A major chord
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.detune.value = i % 2 === 0 ? -3 : 3; // subtle stereo-like detune

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04 - i * 0.008, ctx.currentTime + 3 + i * 0.5);

      osc.connect(gain);
      gain.connect(master);
      osc.start(0);
      all.push(osc, gain);
    });

    // Gentle amplitude breathing at 0.1Hz (6 breaths/min) — the rhythm of calm
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // 10-second cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start(0);
    all.push(lfo, lfoGain);

    nodesRef.current = all;
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || nodesRef.current.length === 0) return;
    const ct = ctxRef.current.currentTime;
    nodesRef.current.forEach(n => {
      try { if (n instanceof GainNode) n.gain.linearRampToValueAtTime(0.0001, ct + 3); } catch (_) {}
    });
    setTimeout(() => {
      nodesRef.current.forEach(n => { try { n.stop?.(); } catch (_) {} });
      nodesRef.current = [];
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 3200);
  }, []);

  return { start, stop };
};

// ── Single Focus Orb ──────────────────────────────────────────
const BreathOrb = ({ phase, progress, size = 220 }) => {
  const s = phase === 'in' ? 1 + progress * 0.35 : phase === 'holdIn' ? 1.35 : phase === 'out' ? 1.35 - progress * 0.35 : 1;
  const glow = phase === 'in' ? 0.2 + progress * 0.5 : phase === 'holdIn' ? 0.7 : phase === 'out' ? 0.7 - progress * 0.5 : 0.2;

  return (
    <div className="flex items-center justify-center relative" style={{ height: size * 1.15 }}>
      {/* Soft ambient glow behind the orb */}
      <motion.div
        animate={{ scale: s * 1.15, opacity: glow * 0.3 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="absolute rounded-full blur-2xl"
        style={{
          width: size, height: size,
          background: 'radial-gradient(circle, rgba(30,90,140,0.25) 0%, transparent 65%)',
        }}
      />

      {/* The orb */}
      <motion.div
        animate={{ scale: s, opacity: 0.5 + glow * 0.5 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: size, height: size,
          background: 'radial-gradient(circle at 42% 38%, rgba(25,85,140,0.3) 0%, rgba(8,28,50,0.2) 55%, rgba(4,12,22,0.5) 100%)',
          boxShadow: `0 0 ${100 * glow}px rgba(20,90,160,${0.10 * glow}), 
                      0 0 ${50 * glow}px rgba(140,100,50,${0.04 * glow}), 
                      inset 0 0 ${70 * glow}px rgba(20,90,160,${0.08 * glow})`,
          border: '1px solid rgba(25,85,140,0.1)',
        }}
      >
        {/* Inner dot — centre of calm */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-full bg-cyan-400/30"
          style={{ width: 3, height: 3, boxShadow: '0 0 15px rgba(6,182,212,0.3)' }}
        />
      </motion.div>

      {/* Phase label below */}
      <motion.p
        animate={{ opacity: 0.3 + glow * 0.4 }}
        className="absolute text-cyan-400/40 text-xs font-mono tracking-[0.2em] uppercase select-none"
        style={{ top: '58%' }}
      >
        {phase === 'in' ? 'in' : phase === 'holdIn' ? 'hold' : phase === 'out' ? 'out' : 'hold'}
      </motion.p>
    </div>
  );
};

// ── Box Breathing (4-4-4-4) controller ────────────────────────
const useBoxBreathing = (active) => {
  const [phase, setPhase] = useState('in');
  const [progress, setProgress] = useState(0);
  const [phaseStart, setPhaseStart] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    setPhase('in'); setProgress(0); setPhaseStart(Date.now());

    const tick = () => {
      const elapsed = (Date.now() - phaseStart) / 1000;
      // Box breathing: 4-4-4-4 (in, hold, out, hold)
      const cycle = [
        { phase: 'in', dur: 4 },
        { phase: 'holdIn', dur: 4 },
        { phase: 'out', dur: 4 },
        { phase: 'holdOut', dur: 4 },
      ];

      setPhase(prev => {
        const idx = cycle.findIndex(c => c.phase === prev);
        if (elapsed >= cycle[idx].dur) {
          const next = cycle[(idx + 1) % 4];
          setPhaseStart(Date.now());
          setProgress(0);
          return next.phase;
        }
        setProgress(elapsed / cycle[idx].dur);
        return prev;
      });
    };

    timerRef.current = setInterval(tick, 50);
    return () => clearInterval(timerRef.current);
  }, [active, phaseStart]);

  return { phase, progress };
};

// ── Ambient light orbs (gentle background) ────────────────────
const AmbientLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: '20%', y: '25%', s: 350, d: 20, r: 0.04, g: 0.08, b: 0.16 },
      { x: '70%', y: '55%', s: 280, d: 25, r: 0.08, g: 0.04, b: 0.02 },
    ].map((o, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full blur-3xl"
        style={{
          left: o.x, top: o.y, width: o.s, height: o.s,
          background: `radial-gradient(circle, rgba(${Math.round(o.r*255)},${Math.round(o.g*255)},${Math.round(o.b*255)},0.1) 0%, transparent 70%)`,
        }}
        animate={{ x: [-25, 25, -25], y: [-15, 15, -15], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 4 }}
      />
    ))}
  </div>
);

// ── 5-4-3-2-1 Grounding ──────────────────────────────────────
const SENSORY_STEPS = [
  { prompt: "Name 5 things you can see", count: 5, icon: '👁' },
  { prompt: "Touch 4 things around you", count: 4, icon: '✋' },
  { prompt: "Listen — 3 things you can hear", count: 3, icon: '👂' },
  { prompt: "What are 2 things you can smell?", count: 2, icon: '👃' },
  { prompt: "One thing you can taste", count: 1, icon: '👄' },
];

// ── MAIN ──────────────────────────────────────────────────────
export default function RealityCheckPage() {
  const [mode, setMode] = useState(null); // null | 'breath' | 'sit' | '54321'
  const [breathActive, setBreathActive] = useState(false);
  const { phase, progress } = useBoxBreathing(breathActive);

  // 5-min sit timer
  const [sitTimer, setSitTimer] = useState(300);
  const [sitActive, setSitActive] = useState(false);
  const sitRef = useRef(null);

  // 5-4-3-2-1 state
  const [sensoryStep, setSensoryStep] = useState(0);
  const [sensoryDone, setSensoryDone] = useState(false);

  const { start: startAudio, stop: stopAudio } = useWarmAudio();

  // Sit timer
  useEffect(() => {
    if (!sitActive) return;
    sitRef.current = setInterval(() => {
      setSitTimer(p => { if (p <= 1) { setSitActive(false); clearInterval(sitRef.current); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(sitRef.current);
  }, [sitActive]);

  const beginBreath = () => {
    setMode('breath'); setBreathActive(true); startAudio();
  };
  const beginSit = () => {
    setMode('sit'); setBreathActive(true); setSitActive(true); setSitTimer(300); startAudio();
  };
  const begin54321 = () => {
    setMode('54321'); setSensoryStep(0); setSensoryDone(false); startAudio();
  };
  const stopAll = () => {
    setMode(null); setBreathActive(false); setSitActive(false);
    setSensoryStep(0); setSensoryDone(false);
    clearInterval(sitRef.current); stopAudio();
  };

  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ═══════════════════════════════════════════════════════════
  // HOME
  // ═══════════════════════════════════════════════════════════
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#040914] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <AmbientLight />

        <div className="relative z-10 flex flex-col items-center max-w-xs w-full">
          {/* The orb — central anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-40 h-40 rounded-full flex items-center justify-center mb-14"
            style={{
              background: 'radial-gradient(circle at 45% 40%, rgba(22,80,130,0.25) 0%, rgba(6,26,45,0.2) 55%, rgba(3,8,18,0.5) 100%)',
              boxShadow: '0 0 100px rgba(18,80,140,0.09), 0 0 40px rgba(130,90,40,0.04), inset 0 0 60px rgba(18,80,140,0.05)',
              border: '1px solid rgba(22,80,130,0.08)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-cyan-400/40"
              style={{ boxShadow: '0 0 18px rgba(6,182,212,0.25)' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cyan-400/30 text-[11px] font-mono tracking-[0.25em] uppercase mb-8"
          >
            you're not broken. you're overwhelmed.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[2.75rem] font-light text-white mb-3 tracking-tight leading-none"
          >
            Safe Harbour
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-slate-400/60 text-sm mb-16"
          >
            When it's all too much.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full flex flex-col items-center gap-3"
          >
            <button
              onClick={beginBreath}
              className="w-full py-4 rounded-3xl bg-gradient-to-b from-[#0c2845]/50 to-[#040e1a]/50 border border-[#1a4770]/20 text-cyan-200 text-base font-light tracking-wide hover:border-[#1a4770]/35 transition-all duration-500"
            >
              Box breathing
            </button>

            <button
              onClick={begin54321}
              className="w-full py-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-slate-300/80 text-base font-light tracking-wide hover:bg-white/[0.04] transition-all duration-500"
            >
              5-4-3-2-1 grounding
            </button>

            <button
              onClick={beginSit}
              className="text-slate-500 text-sm font-light mt-2 hover:text-slate-400 transition-colors duration-500"
            >
              or, just sit quietly for 5 minutes
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.1 }}
            className="text-slate-600 text-xs mt-14"
          >
            No signup. No data. Just help.
          </motion.p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // BOX BREATHING
  // ═══════════════════════════════════════════════════════════
  if (mode === 'breath') {
    return (
      <div className="min-h-screen bg-[#040914] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <AmbientLight />
        <div className="relative z-10 flex flex-col items-center">
          <BreathOrb phase={phase} progress={progress} size={200} />

          <div className="mt-10 text-center space-y-2">
            <p className="text-slate-400/50 text-xs font-mono tracking-[0.15em] uppercase">
              4 in · 4 hold · 4 out · 4 hold
            </p>
            <p className="text-slate-600/60 text-xs">Navy SEAL box breathing</p>
          </div>

          <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600/50 hover:text-slate-400 text-xs transition-colors tracking-wide">
            done
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 5-4-3-2-1 GROUNDING
  // ═══════════════════════════════════════════════════════════
  if (mode === '54321') {
    return (
      <div className="min-h-screen bg-[#040914] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <AmbientLight />
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
          {sensoryDone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 45% 40%, rgba(22,80,130,0.2) 0%, rgba(6,20,40,0.15) 60%, transparent 100%)',
                  boxShadow: '0 0 60px rgba(18,80,140,0.08)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-cyan-400/40"
                />
              </motion.div>
              <p className="text-cyan-200/80 text-xl font-light">You're here. You're safe.</p>
              <p className="text-slate-400/60 text-sm">Take a breath. The world can wait.</p>

              <div className="mt-8 flex flex-col gap-3">
                <button onClick={beginBreath} className="py-3.5 px-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] text-slate-300/80 text-sm font-light hover:bg-white/[0.06] transition-all duration-500">
                  Follow with box breathing
                </button>
                <button onClick={stopAll} className="text-slate-500 hover:text-slate-400 text-sm font-light transition-colors duration-500">
                  I'm okay now
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex gap-1.5 mb-10">
                {SENSORY_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === sensoryStep ? 'w-8 bg-cyan-400/60' : i < sensoryStep ? 'w-4 bg-cyan-500/20' : 'w-4 bg-white/4'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={sensoryStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <p className="text-white text-2xl font-light leading-relaxed">
                    {SENSORY_STEPS[sensoryStep].prompt}
                  </p>
                  <p className="text-slate-500/60 text-sm">take your time with this</p>

                  <button
                    onClick={() => {
                      if (sensoryStep < SENSORY_STEPS.length - 1) {
                        setSensoryStep(s => s + 1);
                      } else {
                        setSensoryDone(true);
                      }
                    }}
                    className="py-3 px-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] text-slate-300/80 text-sm font-light hover:bg-white/[0.06] transition-all duration-500"
                  >
                    {sensoryStep < SENSORY_STEPS.length - 1 ? 'next' : 'done'}
                  </button>
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {!sensoryDone && (
            <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600/50 hover:text-slate-400 text-xs transition-colors tracking-wide">
              I need to stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 5 MINUTE SIT
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#040914] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <AmbientLight />
      <div className="relative z-10 flex flex-col items-center">
        <BreathOrb phase={phase} progress={progress} size={240} />

        <motion.p
          key={sitTimer}
          initial={{ opacity: 0.5, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-slate-400/70 text-5xl font-light font-mono tracking-[0.12em] mt-4 tabular-nums"
        >
          {sitActive ? fmt(sitTimer) : 'done'}
        </motion.p>

        <p className="text-slate-500/50 text-xs mt-6 max-w-[16rem] text-center leading-relaxed">
          {sitActive ? "Nothing to do. Nowhere to be. Just breathe." : "How do you feel?"}
        </p>

        {!sitActive && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={() => { setSitActive(true); setSitTimer(300); }}
              className="py-3.5 px-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] text-slate-300/80 text-sm font-light hover:bg-white/[0.06] transition-all duration-500"
            >
              Another 5 minutes
            </button>
            <button onClick={stopAll} className="text-slate-500 hover:text-slate-400 text-sm font-light transition-colors duration-500">
              I'm good now
            </button>
          </div>
        )}
      </div>

      {sitActive && (
        <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600/50 hover:text-slate-400 text-xs transition-colors tracking-wide">
          stop
        </button>
      )}
    </div>
  );
}