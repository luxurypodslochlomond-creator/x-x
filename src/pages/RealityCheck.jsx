import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Floating Light Orbs ───────────────────────────────────────
const LightOrbs = () => {
  const orbs = useRef([
    { x: 25, y: 30, s: 300, r: 0.06, g: 0.1, b: 0.18, d: 18 },
    { x: 75, y: 60, s: 250, r: 0.12, g: 0.06, b: 0.02, d: 22 },
    { x: 50, y: 70, s: 200, r: 0.05, g: 0.08, b: 0.12, d: 14 },
  ]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.current.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${o.x}%`, top: `${o.y}%`,
            width: o.s, height: o.s,
            background: `radial-gradient(circle, rgba(${Math.round(o.r*255)},${Math.round(o.g*255)},${Math.round(o.b*255)},0.15) 0%, transparent 70%)`,
          }}
          animate={{
            x: [-20, 20, -20],
            y: [-15, 15, -15],
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
        />
      ))}
    </div>
  );
};

// ── Organic Breathing Orb ─────────────────────────────────────
const BreathingOrb = ({ phase, progress, size = 200, standalone = false }) => {
  const s = phase === 'in' ? 1 + progress * 0.45 : phase === 'hold' ? 1.45 : 1.45 - progress * 0.45;
  const glow = phase === 'in' ? 0.1 + progress * 0.6 : phase === 'hold' ? 0.7 : 0.7 - progress * 0.6;

  return (
    <div className="flex items-center justify-center relative" style={{ height: standalone ? '16rem' : size * 1.2 }}>
      {/* Deep inner glow */}
      <motion.div
        animate={{ scale: s, opacity: glow * 0.6 }}
        transition={{ duration: 0.12, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: size, height: size,
          background: 'radial-gradient(circle at 50% 50%, rgba(20,80,120,0.3) 0%, rgba(10,30,60,0.1) 50%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />

      {/* The orb itself — soft gradient sphere */}
      <motion.div
        animate={{ scale: s, opacity: glow }}
        transition={{ duration: 0.12, ease: 'linear' }}
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: size, height: size,
          background: 'radial-gradient(circle at 40% 40%, rgba(30,100,160,0.25) 0%, rgba(10,40,70,0.15) 40%, rgba(5,15,30,0.3) 100%)',
          boxShadow: `0 0 ${80 * glow}px rgba(20,100,180,${0.15 * glow}), 0 0 ${40 * glow}px rgba(160,120,60,${0.08 * glow}), inset 0 0 ${60 * glow}px rgba(20,100,180,${0.1 * glow})`,
          border: '1px solid rgba(30,100,160,0.12)',
        }}
      >
        <span className="text-cyan-300/50 text-[11px] font-mono tracking-[0.25em] uppercase select-none">
          {phase === 'in' ? 'in' : phase === 'hold' ? 'hold' : 'out'}
        </span>
      </motion.div>

      {/* Ghost outer ring */}
      <motion.div
        animate={{ scale: s * 1.4, opacity: glow * 0.15 }}
        transition={{ duration: 0.12, ease: 'linear', delay: 0.05 }}
        className="absolute rounded-full border border-cyan-400/8"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

// ── Warm Audio Engine (no harsh noise) ────────────────────────
const useWarmAudio = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const start = useCallback(() => {
    if (nodesRef.current.length > 0) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    const all = [];

    // Master — gentle fade in
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 4);
    master.connect(ctx.destination);
    all.push(master);

    // 1 — Deep 55Hz drone (fundamental grounding, near alpha-theta boundary)
    const d1 = ctx.createOscillator();
    d1.type = 'sine'; d1.frequency.value = 55;
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3);
    d1.connect(g1); g1.connect(master); d1.start(0);
    all.push(d1, g1);

    // 2 — 110Hz (octave, adds warmth and body)
    const d2 = ctx.createOscillator();
    d2.type = 'sine'; d2.frequency.value = 110;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, ctx.currentTime);
    g2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3.5);
    d2.connect(g2); g2.connect(master); d2.start(0);
    all.push(d2, g2);

    // 3 — 220Hz (second octave, adds presence without harshness)
    const d3 = ctx.createOscillator();
    d3.type = 'sine'; d3.frequency.value = 220;
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0, ctx.currentTime);
    g3.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 4);
    d3.connect(g3); g3.connect(master); d3.start(0);
    all.push(d3, g3);

    // 4 — 432Hz (very subtle, the "musical" overtone)
    const d4 = ctx.createOscillator();
    d4.type = 'sine'; d4.frequency.value = 432;
    const g4 = ctx.createGain();
    g4.gain.setValueAtTime(0, ctx.currentTime);
    g4.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 5);
    d4.connect(g4); g4.connect(master); d4.start(0);
    all.push(d4, g4);

    // 5 — Gentle 6Hz LFO modulating the low drones for entrainment
    const lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 6;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.04;
    lfo.connect(lfoG); lfoG.connect(g1.gain); // modulate the 55Hz drone
    lfo.start(0);
    all.push(lfo, lfoG);

    // 6 — Ultra-quiet, heavily filtered noise (ocean-floor rumble, not static)
    const buf = ctx.createBuffer(1, 2 * ctx.sampleRate, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      d[i] = ((last + 0.008 * (Math.random() * 2 - 1)) / 1.008) * 1.5;
      last = d[i];
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = buf; noiseSrc.loop = true;
    // Very steep low-pass at 200Hz — removes all hiss
    const lp1 = ctx.createBiquadFilter();
    lp1.type = 'lowpass'; lp1.frequency.value = 200; lp1.Q.value = 0.5;
    const lp2 = ctx.createBiquadFilter();
    lp2.type = 'lowpass'; lp2.frequency.value = 180; lp2.Q.value = 0.5;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0, ctx.currentTime);
    nGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 4);
    noiseSrc.connect(lp1); lp1.connect(lp2); lp2.connect(nGain); nGain.connect(master);
    noiseSrc.start(0);
    all.push(noiseSrc, lp1, lp2, nGain);

    nodesRef.current = all;
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || nodesRef.current.length === 0) return;
    const ctx = ctxRef.current;
    nodesRef.current.forEach(n => {
      try { if (n instanceof GainNode) n.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 3); } catch (_) {}
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

// ── Questions ─────────────────────────────────────────────────
const QUESTIONS = [
  { q: "Are you in physical danger right now?", pause: 4 },
  { q: "Do you have a roof over your head tonight?", pause: 3 },
  { q: "Is there food in the house?", pause: 3 },
  { q: "Do you have people who love you?", pause: 4 },
  { q: "Is the story your brain is telling you — the failure story — actually true? Or just loud?", pause: 6 },
  { q: "You've survived every bad day so far. That's 100% success rate. What does that tell you?", pause: 5 },
];

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function RealityCheckPage() {
  const [mode, setMode] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [qVisible, setQVisible] = useState(false);
  const [qProgress, setQProgress] = useState(0);
  const [showAffirmation, setShowAffirmation] = useState(false);

  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('in');
  const [breathProgress, setBreathProgress] = useState(0);
  const [breathPhaseStart, setBreathPhaseStart] = useState(0);
  const breathTimerRef = useRef(null);

  const [sitActive, setSitActive] = useState(false);
  const [sitTimer, setSitTimer] = useState(300);
  const sitIntervalRef = useRef(null);

  const { start: startAudio, stop: stopAudio } = useWarmAudio();

  useEffect(() => {
    if (!breathActive) return;
    const tick = () => {
      const e = (Date.now() - breathPhaseStart) / 1000;
      const D = { in: 4, hold: 4, out: 6 };
      if (e >= D[breathPhase]) {
        const next = breathPhase === 'in' ? 'hold' : breathPhase === 'hold' ? 'out' : 'in';
        setBreathPhase(next); setBreathPhaseStart(Date.now()); setBreathProgress(0);
      } else { setBreathProgress(e / D[breathPhase]); }
    };
    breathTimerRef.current = setInterval(tick, 50);
    return () => clearInterval(breathTimerRef.current);
  }, [breathActive, breathPhase, breathPhaseStart]);

  useEffect(() => {
    if (mode !== 'reality') return;
    if (qIdx >= QUESTIONS.length) { setShowAffirmation(true); return; }
    setQVisible(true); setQProgress(0);
    const dur = QUESTIONS[qIdx].pause * 1000;
    const t0 = Date.now();
    const iv = setInterval(() => setQProgress(Math.min((Date.now() - t0) / dur, 1)), 50);
    const t = setTimeout(() => {
      setQVisible(false); clearInterval(iv);
      setTimeout(() => { setQIdx(p => p + 1); setQProgress(0); }, 600);
    }, dur);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [mode, qIdx]);

  useEffect(() => {
    if (!sitActive) return;
    sitIntervalRef.current = setInterval(() => {
      setSitTimer(p => { if (p <= 1) { clearInterval(sitIntervalRef.current); setSitActive(false); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(sitIntervalRef.current);
  }, [sitActive]);

  const reality = () => {
    setMode('reality'); setQIdx(0); setQVisible(false); setShowAffirmation(false);
    setBreathActive(true); setBreathPhase('in'); setBreathPhaseStart(Date.now()); setBreathProgress(0);
    startAudio();
  };
  const reset = () => {
    setMode('reset'); setSitActive(true); setSitTimer(300);
    setBreathActive(true); setBreathPhase('in'); setBreathPhaseStart(Date.now()); setBreathProgress(0);
    startAudio();
  };
  const stop = () => {
    setMode(null); setBreathActive(false); setSitActive(false); setShowAffirmation(false);
    setQIdx(0); clearInterval(breathTimerRef.current); clearInterval(sitIntervalRef.current);
    stopAudio();
  };

  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ═══════════════════════════════════════════════════════════
  // HOME SCREEN — single orb, organic shapes, no blocky buttons
  // ═══════════════════════════════════════════════════════════
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#040b16] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <LightOrbs />

        {/* Central breathing orb — the only visual anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center max-w-sm w-full"
        >
          {/* The orb */}
          <motion.div
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-44 h-44 rounded-full flex items-center justify-center mb-12"
            style={{
              background: 'radial-gradient(circle at 45% 40%, rgba(25,90,150,0.25) 0%, rgba(8,30,55,0.2) 50%, rgba(3,10,20,0.4) 100%)',
              boxShadow: '0 0 120px rgba(20,100,180,0.1), 0 0 50px rgba(160,120,50,0.05), inset 0 0 80px rgba(20,100,180,0.06)',
              border: '1px solid rgba(25,90,150,0.1)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-cyan-400/50"
              style={{ boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
            />
          </motion.div>

          {/* Whisper text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-cyan-400/35 text-[11px] font-mono tracking-[0.3em] uppercase mb-8"
          >
            you're not broken. you're overwhelmed.
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-[3.25rem] font-light text-white mb-4 tracking-tight leading-none"
          >
            Safe Harbour
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-slate-400/70 text-sm mb-16 leading-relaxed"
          >
            When everything is too loud. Help.
          </motion.p>

          {/* Single prominent action — organically shaped */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            onClick={reality}
            className="w-full max-w-xs py-5 rounded-3xl bg-gradient-to-b from-[#0d2a4a]/60 to-[#06101e]/60 border border-[#1a4a6e]/25 text-cyan-200 text-base font-light tracking-wide hover:border-[#1a4a6e]/45 hover:from-[#0f3055]/60 transition-all duration-700"
            style={{ boxShadow: '0 0 40px rgba(20,100,180,0.06)' }}
          >
            Reality Check
          </motion.button>

          {/* Secondary — a quiet text link, NOT a matching block */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={reset}
            className="mt-5 text-slate-400 text-sm font-light hover:text-slate-300 transition-colors duration-500"
          >
            or, just sit here for 5 minutes
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-slate-600 text-xs mt-12"
          >
            No signup. No data stored. Just help.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // REALITY CHECK — questions with breathing orb above
  // ═══════════════════════════════════════════════════════════
  if (mode === 'reality') {
    return (
      <div className="min-h-screen bg-[#040b16] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <LightOrbs />

        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Breathing orb at top */}
          <BreathingOrb phase={breathPhase} progress={breathProgress} size={140} standalone />

          <AnimatePresence mode="wait">
            {showAffirmation ? (
              <motion.div
                key="affirmation"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mt-8 space-y-7 text-center"
              >
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="text-cyan-200/90 text-2xl font-light leading-relaxed">
                    You're still here.
                  </p>
                  <p className="text-white/60 text-xl font-light mt-2">You're still fighting.</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-400/70 text-sm"
                >
                  That's not failure — that's grit.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-500 text-xs"
                >
                  The noise in your head is loud. But it's not the truth.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 flex flex-col items-center gap-3"
                >
                  <button
                    onClick={reset}
                    className="py-3.5 px-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] text-slate-300/80 text-sm font-light hover:bg-white/[0.06] transition-all duration-500"
                  >
                    Sit with this for 5 minutes
                  </button>
                  <button onClick={stop} className="text-slate-500 hover:text-slate-400 text-sm font-light transition-colors duration-500">
                    I'm okay now. Thank you.
                  </button>
                </motion.div>
              </motion.div>
            ) : qVisible ? (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-8 text-center w-full"
              >
                <p className="text-white text-xl font-light leading-relaxed px-6">
                  {QUESTIONS[qIdx]?.q}
                </p>

                {/* Soft glow progress */}
                <motion.div
                  className="h-px rounded-full mx-auto mt-10"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }}
                  animate={{ width: `${qProgress * 10}rem`, opacity: 0.25 + qProgress * 0.4 }}
                  transition={{ duration: 0.05 }}
                />

                <div className="flex items-center justify-center gap-2 mt-5">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-500 ${
                        i === qIdx ? 'w-3 h-1.5 bg-cyan-400/70' : i < qIdx ? 'w-1.5 h-1.5 bg-cyan-500/20' : 'w-1.5 h-1.5 bg-white/4'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-600/70 text-xs mt-6">just breathe. the question is enough.</p>
              </motion.div>
            ) : (
              <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} className="mt-8">
                <p className="text-slate-500 text-sm">...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAffirmation && (
            <button onClick={stop} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600/60 hover:text-slate-400 text-xs transition-colors tracking-wide">
              I need to stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 5 MINUTE RESET — large orb, nothing else matters
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#040b16] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <LightOrbs />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Large breathing orb — the only thing to look at */}
        <BreathingOrb phase={breathPhase} progress={breathProgress} size={220} standalone />

        {/* Timer */}
        <motion.p
          key={sitTimer}
          initial={{ opacity: 0.5, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-slate-400/80 text-5xl font-light font-mono tracking-[0.15em] mt-4 tabular-nums"
        >
          {sitActive ? fmt(sitTimer) : 'done'}
        </motion.p>

        <p className="text-slate-500/50 text-xs mt-6 leading-relaxed max-w-[16rem] mx-auto text-center">
          {sitActive
            ? "Nothing to do. Nowhere to be. Just breathe."
            : "Five minutes of just being here. How do you feel?"}
        </p>

        {!sitActive && (
          <div className="mt-12 flex flex-col items-center gap-3 w-full">
            <button
              onClick={() => { setSitActive(true); setSitTimer(300); }}
              className="py-3.5 px-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] text-slate-300/80 text-sm font-light hover:bg-white/[0.06] transition-all duration-500"
            >
              Another 5 minutes
            </button>
            <button onClick={stop} className="text-slate-500 hover:text-slate-400 text-sm font-light transition-colors duration-500">
              I'm good now
            </button>
          </div>
        )}
      </div>

      {sitActive && (
        <button onClick={stop} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600/60 hover:text-slate-400 text-xs transition-colors tracking-wide">
          stop
        </button>
      )}
    </div>
  );
}