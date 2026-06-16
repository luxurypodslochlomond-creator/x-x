import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Breathing Pacer ──────────────────────────────────────────
const BreathingPacer = ({ phase, progress }) => {
  const scale = phase === 'in' ? 1 + progress * 0.5 : phase === 'hold' ? 1.5 : 1.5 - progress * 0.5;
  const opacity = phase === 'in' ? 0.3 + progress * 0.5 : phase === 'hold' ? 0.8 : 0.8 - progress * 0.5;

  return (
    <div className="flex items-center justify-center h-48">
      <motion.div
        animate={{ scale, opacity }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className="rounded-full border-2 border-cyan-400/40 flex items-center justify-center"
        style={{
          width: '120px',
          height: '120px',
          boxShadow: `0 0 ${40 * opacity}px rgba(6, 182, 212, ${opacity * 0.5})`,
        }}
      >
        <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">
          {phase === 'in' ? 'breathe in' : phase === 'hold' ? 'hold' : 'breathe out'}
        </span>
      </motion.div>
    </div>
  );
};

// ── Brown Noise Generator ─────────────────────────────────────
const useBrownNoise = () => {
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  const start = useCallback(() => {
    if (noiseNodeRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;

    // Brown noise: integrate white noise → -6dB/octave
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // volume
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2); // fade in

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    noiseNodeRef.current = source;
    gainNodeRef.current = gain;
  }, []);

  const stop = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        noiseNodeRef.current?.stop();
        noiseNodeRef.current = null;
        gainNodeRef.current = null;
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 1100);
    }
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
  const [mode, setMode] = useState(null); // null | 'reality' | 'reset'
  const [questionIdx, setQuestionIdx] = useState(0);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [showAffirmation, setShowAffirmation] = useState(false);

  // Breathing state
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('in');
  const [breathProgress, setBreathProgress] = useState(0);
  const [breathPhaseStart, setBreathPhaseStart] = useState(0);
  const breathTimerRef = useRef(null);

  // Just sit state
  const [sitActive, setSitActive] = useState(false);
  const [sitTimer, setSitTimer] = useState(300); // 5 min countdown
  const sitIntervalRef = useRef(null);

  const { start: startNoise, stop: stopNoise } = useBrownNoise();

  // ── Breathing cycle ─────────────────────────────────────────
  useEffect(() => {
    if (!breathActive) return;

    const tick = () => {
      const elapsed = (Date.now() - breathPhaseStart) / 1000;
      const phaseDurations = { in: 4, hold: 4, out: 6 };

      if (elapsed >= phaseDurations[breathPhase]) {
        // Transition to next phase
        if (breathPhase === 'in') {
          setBreathPhase('hold');
          setBreathPhaseStart(Date.now());
          setBreathProgress(0);
        } else if (breathPhase === 'hold') {
          setBreathPhase('out');
          setBreathPhaseStart(Date.now());
          setBreathProgress(0);
        } else {
          setBreathPhase('in');
          setBreathPhaseStart(Date.now());
          setBreathProgress(0);
        }
      } else {
        setBreathProgress(elapsed / phaseDurations[breathPhase]);
      }
    };

    breathTimerRef.current = setInterval(tick, 50);
    return () => clearInterval(breathTimerRef.current);
  }, [breathActive, breathPhase, breathPhaseStart]);

  // ── Reality Check sequence ──────────────────────────────────
  useEffect(() => {
    if (mode !== 'reality') return;

    if (questionIdx >= REALITY_QUESTIONS.length) {
      setShowAffirmation(true);
      return;
    }

    // Show question
    setQuestionVisible(true);
    setQuestionProgress(0);

    const questionDuration = REALITY_QUESTIONS[questionIdx].pause * 1000;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setQuestionProgress(Math.min(elapsed / questionDuration, 1));
    }, 50);

    const timeout = setTimeout(() => {
      setQuestionVisible(false);
      clearInterval(progressInterval);
      setTimeout(() => {
        setQuestionIdx(prev => prev + 1);
        setQuestionProgress(0);
      }, 800);
    }, questionDuration);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [mode, questionIdx]);

  // ── Just Sit timer ──────────────────────────────────────────
  useEffect(() => {
    if (!sitActive) return;
    sitIntervalRef.current = setInterval(() => {
      setSitTimer(prev => {
        if (prev <= 1) {
          clearInterval(sitIntervalRef.current);
          setSitActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(sitIntervalRef.current);
  }, [sitActive]);

  const startRealityCheck = () => {
    setMode('reality');
    setQuestionIdx(0);
    setQuestionVisible(false);
    setShowAffirmation(false);
    setBreathActive(true);
    setBreathPhase('in');
    setBreathPhaseStart(Date.now());
    setBreathProgress(0);
    startNoise();
  };

  const startReset = () => {
    setMode('reset');
    setSitActive(true);
    setSitTimer(300);
    setBreathActive(true);
    setBreathPhase('in');
    setBreathPhaseStart(Date.now());
    setBreathProgress(0);
    startNoise();
  };

  const stopAll = () => {
    setMode(null);
    setBreathActive(false);
    setSitActive(false);
    setShowAffirmation(false);
    setQuestionIdx(0);
    clearInterval(breathTimerRef.current);
    clearInterval(sitIntervalRef.current);
    stopNoise();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ── Home screen ─────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#05080f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background pulse */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500 blur-3xl"
          />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400/60 text-xs font-mono tracking-widest uppercase mb-6"
          >
            you're not broken. you're overwhelmed.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-light text-white mb-3 tracking-tight"
          >
            Ground Zero
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-slate-400 text-sm mb-10 leading-relaxed"
          >
            When everything is too loud. One button. Help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={startRealityCheck}
              className="w-full py-4 px-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-lg font-light tracking-wide"
            >
              Reality Check — talk me down
            </button>

            <button
              onClick={startReset}
              className="w-full py-4 px-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800 hover:border-slate-600/50 transition-all text-lg font-light tracking-wide"
            >
              5 Minute Reset — just be here
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            className="text-slate-600 text-xs mt-10"
          >
            No signup. No data stored. Just help.
          </motion.p>
        </div>
      </div>
    );
  }

  // ── Reality Check mode ──────────────────────────────────────
  if (mode === 'reality') {
    return (
      <div className="min-h-screen bg-[#05080f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient pulse */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500 blur-3xl"
          />
        </div>

        <div className="relative z-10 w-full max-w-lg text-center">
          {/* Breathing pacer at top */}
          <BreathingPacer phase={breathPhase} progress={breathProgress} />

          {/* Question area */}
          <AnimatePresence mode="wait">
            {showAffirmation ? (
              <motion.div
                key="affirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-6"
              >
                <p className="text-cyan-300 text-2xl font-light leading-relaxed">
                  You're still here. You're still fighting. That's not failure — that's grit.
                </p>
                <p className="text-slate-400 text-sm">
                  The noise in your head is loud. But it's not the truth.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={startReset}
                    className="w-full py-3 px-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800 transition-all text-sm"
                  >
                    Sit with this for 5 minutes
                  </button>
                  <button
                    onClick={stopAll}
                    className="w-full py-3 px-6 text-slate-500 hover:text-slate-400 transition-all text-sm"
                  >
                    I'm okay now. Thank you.
                  </button>
                </div>
              </motion.div>
            ) : questionVisible ? (
              <motion.div
                key={questionIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8"
              >
                <p className="text-white text-xl font-light leading-relaxed px-4">
                  {REALITY_QUESTIONS[questionIdx]?.question}
                </p>
                {/* Progress bar */}
                <div className="mt-8 mx-auto w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500/60"
                    animate={{ width: `${questionProgress * 100}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                </div>
                <p className="text-slate-600 text-xs mt-3">just breathe. the question is enough.</p>
              </motion.div>
            ) : (
              <motion.div
                key="pause"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="mt-8"
              >
                <p className="text-slate-500 text-sm">...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          {!showAffirmation && (
            <button
              onClick={stopAll}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors"
            >
              I need to stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Reset mode (5 min sit) ──────────────────────────────────
  return (
    <div className="min-h-screen bg-[#05080f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500 blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Large breathing circle */}
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{
              scale: breathPhase === 'in' ? 1 + breathProgress * 0.6 : breathPhase === 'hold' ? 1.6 : 1.6 - breathProgress * 0.6,
              opacity: breathPhase === 'in' ? 0.15 + breathProgress * 0.35 : breathPhase === 'hold' ? 0.5 : 0.5 - breathProgress * 0.35,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="rounded-full border border-cyan-400/20 flex items-center justify-center"
            style={{
              width: '160px',
              height: '160px',
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.15)',
            }}
          >
            <span className="text-cyan-300/60 text-xs font-mono tracking-widest uppercase">
              {breathPhase === 'in' ? 'in' : breathPhase === 'hold' ? 'pause' : 'out'}
            </span>
          </motion.div>
        </div>

        {/* Timer */}
        <p className="text-slate-500 text-sm mt-6 font-mono">
          {sitActive ? formatTime(sitTimer) : 'done'}
        </p>

        <p className="text-slate-600 text-xs mt-4 leading-relaxed max-w-xs mx-auto">
          {sitActive
            ? "Nothing to do. Nowhere to be. Just breathe. The world can wait."
            : "Five minutes of just being here. How do you feel?"}
        </p>

        {!sitActive && (
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => { setSitActive(true); setSitTimer(300); }}
              className="w-full py-3 px-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800 transition-all text-sm"
            >
              Another 5 minutes
            </button>
            <button
              onClick={stopAll}
              className="w-full py-3 px-6 text-slate-500 hover:text-slate-400 transition-all text-sm"
            >
              I'm good now
            </button>
          </div>
        )}
      </div>

      {sitActive && (
        <button
          onClick={stopAll}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-xs transition-colors"
        >
          stop
        </button>
      )}
    </div>
  );
}