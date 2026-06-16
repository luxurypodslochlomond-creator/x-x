import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Organic Particles ─────────────────────────────────────────
const Particles = () => {
  const particlesRef = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: 0.5 + Math.random() * 1.5,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * 10,
      hue: Math.random() > 0.6 ? 190 : 35, // mostly cyan, some warm
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particlesRef.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.hue === 190
              ? 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(200,160,100,0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, p.driftX, 0, -p.driftX * 0.7, 0],
            y: [0, p.driftY, 0, -p.driftY * 0.7, 0],
            opacity: [0, 0.5, 0.1, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ── Concentric Breathing Rings ────────────────────────────────
const BreathingRings = ({ phase, progress, size = 120, large = false }) => {
  const baseScale = phase === 'in' ? 1 + progress * 0.5 : phase === 'hold' ? 1.5 : 1.5 - progress * 0.5;
  const breathAlpha = phase === 'in' ? 0.15 + progress * 0.55 : phase === 'hold' ? 0.7 : 0.7 - progress * 0.55;
  const s = large ? size * 1.5 : size;

  const rings = [
    { scale: 1, border: 'border-cyan-400/20', blur: 60, alpha: breathAlpha * 0.9, delay: 0 },
    { scale: 1.25, border: 'border-cyan-400/10', blur: 30, alpha: breathAlpha * 0.4, delay: 0.08 },
    { scale: 1.55, border: 'border-cyan-400/5', blur: 0, alpha: breathAlpha * 0.2, delay: 0.16 },
  ];

  return (
    <div className="flex items-center justify-center relative" style={{ height: large ? '18rem' : '12rem' }}>
      {/* Warm diffused glow behind everything */}
      <motion.div
        animate={{
          scale: baseScale * 1.2,
          opacity: breathAlpha * 0.25,
        }}
        transition={{ duration: 0.12, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: s,
          height: s,
          background: 'radial-gradient(circle, rgba(200,150,100,0.2) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {rings.map((ring, i) => (
        <motion.div
          key={i}
          animate={{
            scale: baseScale * ring.scale,
            opacity: ring.alpha,
          }}
          transition={{ duration: 0.12, ease: 'linear', delay: ring.delay }}
          className={`absolute rounded-full ${ring.border} flex items-center justify-center`}
          style={{
            width: s,
            height: s,
            boxShadow: i === 0 ? `0 0 ${ring.blur}px rgba(6,182,212,${breathAlpha * 0.15})` : 'none',
          }}
        >
          {i === 0 && (
            <span className="text-cyan-300/60 text-[11px] font-mono tracking-[0.25em] uppercase select-none">
              {phase === 'in' ? 'breathe in' : phase === 'hold' ? 'hold' : 'breathe out'}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ── Immersive Audio Engine ────────────────────────────────────
const useImmersiveAudio = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const start = useCallback(() => {
    if (nodesRef.current.length > 0) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    const allNodes = [];

    // Master chain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3.5);
    masterGain.connect(ctx.destination);
    allNodes.push(masterGain);

    // 1 — Brown noise → steep low-pass (cuts the static hiss)
    const noiseBuf = ctx.createBuffer(1, 2 * ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      data[i] = ((last + 0.012 * (Math.random() * 2 - 1)) / 1.012) * 2.2;
      last = data[i];
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf; noiseSrc.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 320; lp.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.55;
    noiseSrc.connect(lp); lp.connect(noiseGain); noiseGain.connect(masterGain);
    noiseSrc.start(0);
    allNodes.push(noiseSrc, lp, noiseGain);

    // 2 — 86Hz warm drone (Schumann harmonic, grounding)
    const drone = ctx.createOscillator();
    drone.type = 'sine'; drone.frequency.value = 86;
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2.5);
    drone.connect(droneGain); droneGain.connect(masterGain);
    drone.start(0);
    allNodes.push(drone, droneGain);

    // 3 — 7Hz theta LFO modulating the drone
    const lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 7;
    const lfoAmp = ctx.createGain();
    lfoAmp.gain.value = 0.05;
    lfo.connect(lfoAmp); lfoAmp.connect(droneGain.gain);
    lfo.start(0);
    allNodes.push(lfo, lfoAmp);

    // 4 — 432Hz subtle overtone
    const overtone = ctx.createOscillator();
    overtone.type = 'sine'; overtone.frequency.value = 432;
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0, ctx.currentTime);
    overtoneGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 4);
    overtone.connect(overtoneGain); overtoneGain.connect(masterGain);
    overtone.start(0);
    allNodes.push(overtone, overtoneGain);

    nodesRef.current = allNodes;
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || nodesRef.current.length === 0) return;
    const ctx = ctxRef.current;
    nodesRef.current.forEach(n => {
      try { if (n instanceof GainNode) n.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 2.5); } catch (_) {}
    });
    setTimeout(() => {
      nodesRef.current.forEach(n => { try { n.stop?.(); } catch (_) {} });
      nodesRef.current = [];
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 2700);
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

// ── Question Counter ──────────────────────────────────────────
const QuestionDot = ({ active, done }) => (
  <div
    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
      active ? 'bg-cyan-400 w-3' : done ? 'bg-cyan-500/30' : 'bg-white/5'
    }`}
  />
);

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

  const { start: startAudio, stop: stopAudio } = useImmersiveAudio();

  // ── Breathing cycle tick ────────────────────────────────────
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

  // ── Question sequence ───────────────────────────────────────
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

  // ── Sit timer ───────────────────────────────────────────────
  useEffect(() => {
    if (!sitActive) return;
    sitIntervalRef.current = setInterval(() => {
      setSitTimer(p => { if (p <= 1) { clearInterval(sitIntervalRef.current); setSitActive(false); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(sitIntervalRef.current);
  }, [sitActive]);

  const startRealityCheck = () => {
    setMode('reality'); setQIdx(0); setQVisible(false); setShowAffirmation(false);
    setBreathActive(true); setBreathPhase('in'); setBreathPhaseStart(Date.now()); setBreathProgress(0);
    startAudio();
  };
  const startReset = () => {
    setMode('reset'); setSitActive(true); setSitTimer(300);
    setBreathActive(true); setBreathPhase('in'); setBreathPhaseStart(Date.now()); setBreathProgress(0);
    startAudio();
  };
  const stopAll = () => {
    setMode(null); setBreathActive(false); setSitActive(false); setShowAffirmation(false);
    setQIdx(0); clearInterval(breathTimerRef.current); clearInterval(sitIntervalRef.current);
    stopAudio();
  };

  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ── HOME ────────────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#050a14] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <Particles />
        {/* Slow morphing ambience */}
        <motion.div
          animate={{ opacity: [0.06, 0.1, 0.05, 0.09, 0.06] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full"
          style={{ background: 'radial-gradient(circle at 50% 45%, rgba(6,182,212,0.08) 0%, rgba(180,120,60,0.04) 40%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center max-w-md w-full">
          {/* Hero breathing circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 flex justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1], borderColor: ['rgba(6,182,212,0.15)', 'rgba(6,182,212,0.25)', 'rgba(6,182,212,0.15)'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 h-36 rounded-full border-2 flex items-center justify-center bg-[#0a1628]/20"
              style={{ boxShadow: '0 0 120px rgba(6,182,212,0.08), 0 0 60px rgba(180,130,80,0.05)' }}
            >
              {/* Inner dot - the center of calm */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-cyan-400/40"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cyan-400/40 text-[11px] font-mono tracking-[0.25em] uppercase mb-8"
          >
            you're not broken. you're overwhelmed.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-6xl font-light text-white mb-5 tracking-tight"
          >
            Ground Zero
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400/80 text-sm mb-16 leading-relaxed"
          >
            When everything is too loud. One button. Help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-3.5"
          >
            <button
              onClick={startRealityCheck}
              className="w-full py-4.5 px-6 bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl text-cyan-200 hover:border-cyan-500/35 hover:from-cyan-500/15 transition-all duration-500 text-base font-light tracking-wide"
            >
              Reality Check — talk me down
            </button>

            <button
              onClick={startReset}
              className="w-full py-4.5 px-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-slate-300/80 hover:bg-white/[0.05] hover:border-white/[0.08] transition-all duration-500 text-base font-light tracking-wide"
            >
              5 Minute Reset — just be here
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-slate-600 text-xs mt-14"
          >
            No signup. No data stored. Just help.
          </motion.p>
        </div>
      </div>
    );
  }

  // ── REALITY CHECK MODE ──────────────────────────────────────
  if (mode === 'reality') {
    return (
      <div className="min-h-screen bg-[#050a14] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <Particles />
        <motion.div
          animate={{ opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center">
          {/* Breathing rings at top */}
          <BreathingRings phase={breathPhase} progress={breathProgress} size={110} />

          {/* Question area */}
          <AnimatePresence mode="wait">
            {showAffirmation ? (
              <motion.div
                key="affirmation"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-10 space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-cyan-200 text-2xl font-light leading-relaxed">
                    You're still here.
                  </p>
                  <p className="text-white/70 text-xl font-light mt-2">You're still fighting.</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-400 text-sm"
                >
                  That's not failure — that's grit.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-500 text-xs"
                >
                  The noise in your head is loud. But it's not the truth.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 flex flex-col gap-3"
                >
                  <button
                    onClick={startReset}
                    className="w-full py-3.5 px-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-slate-300/80 hover:bg-white/[0.06] transition-all duration-500 text-sm font-light"
                  >
                    Sit with this for 5 minutes
                  </button>
                  <button
                    onClick={stopAll}
                    className="w-full py-3.5 px-6 text-slate-500 hover:text-slate-400 transition-all text-sm font-light"
                  >
                    I'm okay now. Thank you.
                  </button>
                </motion.div>
              </motion.div>
            ) : qVisible ? (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-10 w-full"
              >
                <p className="text-white text-2xl font-light leading-relaxed px-8">
                  {QUESTIONS[qIdx]?.q}
                </p>

                {/* Glow progress indicator instead of bar */}
                <div className="mt-12 mb-2 flex items-center justify-center">
                  <motion.div
                    className="h-0.5 rounded-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                    animate={{ width: `${qProgress * 12}rem`, opacity: 0.3 + qProgress * 0.5 }}
                    transition={{ duration: 0.05 }}
                  />
                </div>

                {/* Dot track */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {QUESTIONS.map((_, i) => (
                    <QuestionDot key={i} active={i === qIdx} done={i < qIdx} />
                  ))}
                </div>

                <p className="text-slate-600 text-xs mt-6">just breathe. the question is enough.</p>
              </motion.div>
            ) : (
              <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} className="mt-10">
                <p className="text-slate-500 text-sm">...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAffirmation && (
            <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors tracking-wide">
              I need to stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── 5 MINUTE RESET MODE ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050a14] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Particles />
      <motion.div
        animate={{ opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.06) 0%, rgba(180,130,80,0.03) 40%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-md w-full flex flex-col items-center">
        {/* Breathing rings — large, the star */}
        <BreathingRings phase={breathPhase} progress={breathProgress} size={180} large />

        {/* Timer */}
        <motion.p
          key={sitTimer}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-slate-400 text-4xl font-light font-mono tracking-widest mt-4 tabular-nums"
        >
          {sitActive ? fmt(sitTimer) : 'done'}
        </motion.p>

        <p className="text-slate-500/60 text-xs mt-6 leading-relaxed max-w-xs mx-auto">
          {sitActive
            ? "Nothing to do. Nowhere to be. Just breathe."
            : "Five minutes of just being here. How do you feel?"}
        </p>

        {!sitActive && (
          <div className="mt-12 flex flex-col gap-3 w-full px-4">
            <button
              onClick={() => { setSitActive(true); setSitTimer(300); }}
              className="w-full py-3.5 px-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-slate-300/80 hover:bg-white/[0.06] transition-all duration-500 text-sm font-light"
            >
              Another 5 minutes
            </button>
            <button onClick={stopAll} className="w-full py-3.5 px-6 text-slate-500 hover:text-slate-400 transition-all text-sm font-light">
              I'm good now
            </button>
          </div>
        )}
      </div>

      {sitActive && (
        <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors tracking-wide">
          stop
        </button>
      )}
    </div>
  );
}