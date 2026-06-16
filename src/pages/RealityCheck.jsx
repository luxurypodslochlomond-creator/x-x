import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Ambient Particles ────────────────────────────────────────
const Particles = () => {
  const particles = useRef(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + p.speed * 5,
            repeat: Infinity,
            delay: p.phase,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ── Multi-ring Breathing Pacer ───────────────────────────────
const BreathingPacer = ({ phase, progress }) => {
  const scale = phase === 'in' ? 1 + progress * 0.5 : phase === 'hold' ? 1.5 : 1.5 - progress * 0.5;
  const opacity = phase === 'in' ? 0.2 + progress * 0.5 : phase === 'hold' ? 0.7 : 0.7 - progress * 0.5;
  const warmOpacity = phase === 'in' ? 0.1 + progress * 0.3 : phase === 'hold' ? 0.4 : 0.4 - progress * 0.3;

  return (
    <div className="flex items-center justify-center h-48 relative">
      {/* Warm outer glow */}
      <motion.div
        animate={{ scale: scale * 1.3, opacity: warmOpacity * 0.4 }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(180,130,80,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Cyan ring */}
      <motion.div
        animate={{ scale, opacity }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className="rounded-full border-2 border-cyan-400/30 flex items-center justify-center bg-[#0a1628]/40 backdrop-blur-sm"
        style={{
          width: '120px',
          height: '120px',
          boxShadow: `0 0 ${50 * opacity}px rgba(6, 182, 212, ${opacity * 0.35}), 0 0 ${20 * opacity}px rgba(180, 130, 80, ${opacity * 0.2})`,
        }}
      >
        <span className="text-cyan-300/80 text-xs font-mono tracking-[0.2em] uppercase">
          {phase === 'in' ? 'breathe in' : phase === 'hold' ? 'hold' : 'breathe out'}
        </span>
      </motion.div>

      {/* Outer pulse ring */}
      <motion.div
        animate={{ scale: scale * 1.6, opacity: opacity * 0.15 }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className="absolute rounded-full border border-cyan-400/10"
        style={{ width: '120px', height: '120px' }}
      />
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
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 3);
    masterGain.connect(ctx.destination);

    const allNodes = [];

    // 1 ─ Brown noise through steep low-pass → removes harsh highs
    const noiseBufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < noiseBufferSize; i++) {
      const white = Math.random() * 2 - 1;
      noiseData[i] = (lastOut + 0.015 * white) / 1.015;
      lastOut = noiseData[i];
      noiseData[i] *= 2.5;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Steep low-pass at 350Hz — removes the "static" harshness
    const lowPass = ctx.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(350, ctx.currentTime);
    lowPass.Q.setValueAtTime(0.7, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, ctx.currentTime);

    noiseSource.connect(lowPass);
    lowPass.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(0);
    allNodes.push(noiseSource, lowPass, noiseGain);

    // 2 ─ 86Hz warm sine drone (deep grounding, near Schumann resonance harmonic)
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(86, ctx.currentTime);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);

    droneOsc.connect(droneGain);
    droneGain.connect(masterGain);
    droneOsc.start(0);
    allNodes.push(droneOsc, droneGain);

    // 3 ─ 7Hz theta amplitude modulation on the drone for entrainment
    const lfoOsc = ctx.createOscillator();
    lfoOsc.type = 'sine';
    lfoOsc.frequency.setValueAtTime(7, ctx.currentTime); // theta brainwave range

    const lfoGainNode = ctx.createGain();
    lfoGainNode.gain.setValueAtTime(0.06, ctx.currentTime);

    lfoOsc.connect(lfoGainNode);
    lfoGainNode.connect(droneGain.gain); // modulate the drone volume at 7Hz
    lfoOsc.start(0);
    allNodes.push(lfoOsc, lfoGainNode);

    // 4 ─ Subtle 432Hz overtone (very quiet, adds warmth and "musicality")
    const overtoneOsc = ctx.createOscillator();
    overtoneOsc.type = 'sine';
    overtoneOsc.frequency.setValueAtTime(432, ctx.currentTime);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0, ctx.currentTime);
    overtoneGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3);

    overtoneOsc.connect(overtoneGain);
    overtoneGain.connect(masterGain);
    overtoneOsc.start(0);
    allNodes.push(overtoneOsc, overtoneGain);

    nodesRef.current = allNodes;
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || nodesRef.current.length === 0) return;
    const ctx = ctxRef.current;
    // Find master gain for fade out
    const destNode = ctx.destination;
    // Fade all nodes via their gain connections
    const fadeTime = ctx.currentTime;
    nodesRef.current.forEach(node => {
      try {
        if (node instanceof GainNode && node !== destNode) {
          node.gain.linearRampToValueAtTime(0.0001, fadeTime + 2);
        }
      } catch (e) { /* node may already be disconnected */ }
    });
    setTimeout(() => {
      nodesRef.current.forEach(node => {
        try { node.stop?.(); } catch (e) { /* ok */ }
      });
      nodesRef.current = [];
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 2200);
  }, []);

  return { start, stop };
};

// ── Reality Check Questions ───────────────────────────────────
const REALITY_QUESTIONS = [
  { question: "Are you in physical danger right now?", pause: 4 },
  { question: "Do you have a roof over your head tonight?", pause: 3 },
  { question: "Is there food in the house?", pause: 3 },
  { question: "Do you have people who love you?", pause: 4 },
  { question: "Is the story your brain is telling you — the failure story — actually true? Or just loud?", pause: 6 },
  { question: "You've survived every bad day so far. That's 100% success rate. What does that tell you?", pause: 5 },
];

// ── Main Page ─────────────────────────────────────────────────
export default function RealityCheckPage() {
  const [mode, setMode] = useState(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [questionProgress, setQuestionProgress] = useState(0);
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

  // ── Breathing cycle ─────────────────────────────────────────
  useEffect(() => {
    if (!breathActive) return;
    const tick = () => {
      const elapsed = (Date.now() - breathPhaseStart) / 1000;
      const durations = { in: 4, hold: 4, out: 6 };
      if (elapsed >= durations[breathPhase]) {
        if (breathPhase === 'in') { setBreathPhase('hold'); setBreathPhaseStart(Date.now()); setBreathProgress(0); }
        else if (breathPhase === 'hold') { setBreathPhase('out'); setBreathPhaseStart(Date.now()); setBreathProgress(0); }
        else { setBreathPhase('in'); setBreathPhaseStart(Date.now()); setBreathProgress(0); }
      } else {
        setBreathProgress(elapsed / durations[breathPhase]);
      }
    };
    breathTimerRef.current = setInterval(tick, 50);
    return () => clearInterval(breathTimerRef.current);
  }, [breathActive, breathPhase, breathPhaseStart]);

  // ── Reality Check sequence ──────────────────────────────────
  useEffect(() => {
    if (mode !== 'reality') return;
    if (questionIdx >= REALITY_QUESTIONS.length) { setShowAffirmation(true); return; }
    setQuestionVisible(true);
    setQuestionProgress(0);
    const dur = REALITY_QUESTIONS[questionIdx].pause * 1000;
    const startTime = Date.now();
    const iv = setInterval(() => setQuestionProgress(Math.min((Date.now() - startTime) / dur, 1)), 50);
    const t = setTimeout(() => {
      setQuestionVisible(false);
      clearInterval(iv);
      setTimeout(() => { setQuestionIdx(p => p + 1); setQuestionProgress(0); }, 700);
    }, dur);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [mode, questionIdx]);

  // ── Just Sit timer ──────────────────────────────────────────
  useEffect(() => {
    if (!sitActive) return;
    sitIntervalRef.current = setInterval(() => {
      setSitTimer(p => { if (p <= 1) { clearInterval(sitIntervalRef.current); setSitActive(false); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(sitIntervalRef.current);
  }, [sitActive]);

  const startRealityCheck = () => {
    setMode('reality'); setQuestionIdx(0); setQuestionVisible(false); setShowAffirmation(false);
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
    setQuestionIdx(0); clearInterval(breathTimerRef.current); clearInterval(sitIntervalRef.current);
    stopAudio();
  };

  const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ── SHARED BACKGROUND ───────────────────────────────────────
  const bgGradient = 'from-[#060b14] via-[#0a1225] to-[#080e1a]';

  // ── HOME SCREEN ─────────────────────────────────────────────
  if (!mode) {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        <Particles />

        {/* Warm + cool dual glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 text-center max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Single glowing breathing circle as hero */}
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 rounded-full border-2 border-cyan-400/20 flex items-center justify-center"
                style={{ boxShadow: '0 0 80px rgba(6, 182, 212, 0.12), 0 0 40px rgba(180, 130, 80, 0.08)' }}
              >
                <span className="text-cyan-300/40 text-[10px] font-mono tracking-[0.3em] uppercase">breathe</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cyan-400/50 text-[11px] font-mono tracking-[0.2em] uppercase mb-6"
          >
            you're not broken. you're overwhelmed.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl font-light text-white mb-3 tracking-tight"
          >
            Ground Zero
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-sm mb-12 leading-relaxed"
          >
            When everything is too loud. One button. Help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-3"
          >
            <button
              onClick={startRealityCheck}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 rounded-2xl text-cyan-200 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/40 transition-all duration-300 text-base font-light tracking-wide shadow-lg shadow-cyan-500/5"
            >
              Reality Check — talk me down
            </button>

            <button
              onClick={startReset}
              className="w-full py-4 px-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 text-base font-light tracking-wide"
            >
              5 Minute Reset — just be here
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.8 }}
            className="text-slate-600 text-xs mt-12"
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
      <div className={`min-h-screen bg-gradient-to-b ${bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        <Particles />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 w-full max-w-lg text-center">
          <BreathingPacer phase={breathPhase} progress={breathProgress} />

          <AnimatePresence mode="wait">
            {showAffirmation ? (
              <motion.div
                key="affirmation"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-8"
              >
                <p className="text-cyan-200 text-2xl font-light leading-relaxed">
                  You're still here. You're still fighting.
                </p>
                <p className="text-white/70 text-lg font-light">That's not failure — that's grit.</p>
                <p className="text-slate-400 text-sm">The noise in your head is loud. But it's not the truth.</p>
                <div className="mt-10 flex flex-col gap-3">
                  <button
                    onClick={startReset}
                    className="w-full py-3.5 px-6 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-slate-300 hover:bg-white/[0.08] transition-all text-sm font-light"
                  >
                    Sit with this for 5 minutes
                  </button>
                  <button
                    onClick={stopAll}
                    className="w-full py-3.5 px-6 text-slate-500 hover:text-slate-400 transition-all text-sm font-light"
                  >
                    I'm okay now. Thank you.
                  </button>
                </div>
              </motion.div>
            ) : questionVisible ? (
              <motion.div
                key={questionIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10"
              >
                <p className="text-white text-xl font-light leading-relaxed px-6">
                  {REALITY_QUESTIONS[questionIdx]?.question}
                </p>
                <div className="mt-10 mx-auto w-40 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500/50 to-cyan-400/30"
                    animate={{ width: `${questionProgress * 100}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                </div>
                <p className="text-slate-600 text-xs mt-4">just breathe. the question is enough.</p>
              </motion.div>
            ) : (
              <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} className="mt-10">
                <p className="text-slate-500 text-sm">...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAffirmation && (
            <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors">
              I need to stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── 5 MINUTE RESET MODE ─────────────────────────────────────
  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      <Particles />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-600/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Breathing circle — larger, more beautiful */}
        <div className="flex items-center justify-center h-72">
          {/* Warm outer glow ring */}
          <motion.div
            animate={{
              scale: breathPhase === 'in' ? 1 + breathProgress * 0.6 : breathPhase === 'hold' ? 1.6 : 1.6 - breathProgress * 0.6,
              opacity: breathPhase === 'in' ? 0.08 + breathProgress * 0.2 : breathPhase === 'hold' ? 0.28 : 0.28 - breathProgress * 0.2,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="absolute rounded-full"
            style={{ width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(180,130,80,0.25) 0%, transparent 70%)', filter: 'blur(25px)' }}
          />

          {/* Main pulsing ring */}
          <motion.div
            animate={{
              scale: breathPhase === 'in' ? 1 + breathProgress * 0.55 : breathPhase === 'hold' ? 1.55 : 1.55 - breathProgress * 0.55,
              opacity: breathPhase === 'in' ? 0.12 + breathProgress * 0.4 : breathPhase === 'hold' ? 0.52 : 0.52 - breathProgress * 0.4,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="rounded-full border border-cyan-400/15 flex items-center justify-center bg-[#0a1628]/30 backdrop-blur-sm"
            style={{
              width: '180px',
              height: '180px',
              boxShadow: '0 0 80px rgba(6, 182, 212, 0.12), 0 0 30px rgba(180, 130, 80, 0.06)',
            }}
          >
            <span className="text-cyan-300/50 text-[11px] font-mono tracking-[0.25em] uppercase">
              {breathPhase === 'in' ? 'in' : breathPhase === 'hold' ? 'hold' : 'out'}
            </span>
          </motion.div>

          {/* Outermost ghost ring */}
          <motion.div
            animate={{
              scale: breathPhase === 'in' ? 1 + breathProgress * 0.7 : breathPhase === 'hold' ? 1.7 : 1.7 - breathProgress * 0.7,
              opacity: breathPhase === 'in' ? 0.04 + breathProgress * 0.08 : breathPhase === 'hold' ? 0.12 : 0.12 - breathProgress * 0.08,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="absolute rounded-full border border-cyan-400/5"
            style={{ width: '180px', height: '180px' }}
          />
        </div>

        {/* Timer */}
        <p className="text-slate-500 text-sm font-mono tracking-wider mt-2">
          {sitActive ? formatTime(sitTimer) : 'done'}
        </p>

        <p className="text-slate-500/80 text-xs mt-5 leading-relaxed max-w-xs mx-auto">
          {sitActive
            ? "Nothing to do. Nowhere to be. Just breathe."
            : "Five minutes of just being here. How do you feel?"}
        </p>

        {!sitActive && (
          <div className="mt-10 flex flex-col gap-3">
            <button
              onClick={() => { setSitActive(true); setSitTimer(300); }}
              className="w-full py-3.5 px-6 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-slate-300 hover:bg-white/[0.08] transition-all text-sm font-light"
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
        <button onClick={stopAll} className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors">
          stop
        </button>
      )}
    </div>
  );
}