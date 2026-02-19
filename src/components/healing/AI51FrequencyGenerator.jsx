/**
 * AI51 FREQUENCY GENERATOR
 * Creates NEW healing frequencies in the background using AI.
 * AI51 synthesizes the exact Hz, waveform, harmonics, and duration
 * based on what the person tells it they need.
 * Gets better as LLMs improve — zero hardcoded frequencies needed.
 * ♾️❤️
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Loader2, Play, Pause, X, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Generate a frequency protocol via AI
async function generateFrequencyProtocol(condition) {
  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `You are AI51's frequency synthesis engine. 
    
A person needs healing for: "${condition}"

Using your knowledge of:
- Cymatics and acoustic physics
- Solfeggio frequencies and their documented effects  
- Brainwave entrainment (delta, theta, alpha, beta, gamma)
- Schumann resonance (7.83Hz base) and its harmonics
- Vagus nerve stimulation frequencies
- Peer-reviewed vibroacoustic therapy research
- NASA pain gate theory (square waves for nerve pain)

Design the OPTIMAL frequency protocol. Be specific and scientific.

Rules:
- primary_hz: the main healing frequency (1-999 Hz range, stay in audible range)
- waveform: "sine" (smooth/gentle), "square" (penetrating/nerve), "triangle" (balanced/muscle), or "sawtooth" (cutting/inflammation)
- harmonics: array of 2-4 supporting frequencies (multiplies or fractions of primary)
- duration_minutes: recommended session length (5-30)
- description: ONE sentence, what this physically does
- mechanism: the actual biological mechanism (vagus nerve / cymatics / brainwave etc)
- psychology: a short phrase to say to the person while it plays

Respond with valid JSON only.`,
    response_json_schema: {
      type: "object",
      properties: {
        primary_hz: { type: "number" },
        waveform: { type: "string" },
        harmonics: { type: "array", items: { type: "number" } },
        duration_minutes: { type: "number" },
        description: { type: "string" },
        mechanism: { type: "string" },
        psychology: { type: "string" },
        name: { type: "string" }
      },
      required: ["primary_hz", "waveform", "harmonics", "duration_minutes", "description", "mechanism", "psychology", "name"]
    }
  });
  return result;
}

// Play a synthesized frequency using Web Audio API
function useFrequencySynth() {
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const play = useCallback((protocol) => {
    // Stop any existing
    stop();

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);
    masterGain.connect(ctx.destination);

    const waveMap = { sine: 'sine', square: 'square', triangle: 'triangle', sawtooth: 'sawtooth' };
    const wave = waveMap[protocol.waveform] || 'sine';

    // Primary oscillator
    const primary = ctx.createOscillator();
    primary.type = wave;
    primary.frequency.setValueAtTime(protocol.primary_hz, ctx.currentTime);
    const primaryGain = ctx.createGain();
    primaryGain.gain.value = 0.7;
    primary.connect(primaryGain);
    primaryGain.connect(masterGain);
    primary.start();

    // Harmonics — sine always, quieter
    const harmonicNodes = (protocol.harmonics || []).slice(0, 3).map((hz, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, ctx.currentTime);
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      return osc;
    });

    nodesRef.current = [primary, ...harmonicNodes];
    return ctx;
  }, []);

  const stop = useCallback(() => {
    nodesRef.current.forEach(n => { try { n.stop(); } catch (_) {} });
    nodesRef.current = [];
    if (audioCtxRef.current) {
      try {
        // Fade out gracefully
        const ctx = audioCtxRef.current;
        const g = ctx.createGain();
        ctx.close();
      } catch (_) {}
      audioCtxRef.current = null;
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { play, stop };
}

/**
 * AI51FrequencyGenerator
 * Props:
 *   condition {string} - what the person needs healing for (from AI51 conversation)
 *   onClose {function} - dismiss
 */
export default function AI51FrequencyGenerator({ condition, onClose }) {
  const [phase, setPhase] = useState('generating'); // generating | ready | playing | done
  const [protocol, setProtocol] = useState(null);
  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const { play, stop } = useFrequencySynth();

  // Generate on mount
  useEffect(() => {
    let cancelled = false;
    generateFrequencyProtocol(condition)
      .then(p => {
        if (!cancelled) {
          setProtocol(p);
          setPhase('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not generate frequency. Try again.');
      });
    return () => { cancelled = true; };
  }, [condition]);

  // Timer when playing
  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsed(e => {
          const limit = (protocol?.duration_minutes || 10) * 60;
          if (e + 1 >= limit) {
            handleStop();
            return limit;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, protocol]);

  const handlePlay = () => {
    if (!protocol) return;
    play(protocol);
    setPhase('playing');
    setElapsed(0);
  };

  const handleStop = () => {
    stop();
    setPhase('done');
    clearInterval(timerRef.current);
  };

  const handleClose = () => {
    stop();
    onClose?.();
  };

  const progressPct = protocol
    ? Math.min(100, (elapsed / ((protocol.duration_minutes || 10) * 60)) * 100)
    : 0;

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const remaining = protocol ? Math.max(0, (protocol.duration_minutes || 10) * 60 - elapsed) : 0;

  const waveColor = {
    sine: '#ec4899',
    square: '#f59e0b',
    triangle: '#10b981',
    sawtooth: '#ef4444',
  }[protocol?.waveform] || '#a855f7';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(8, 4, 20, 0.95)',
        border: `1px solid ${waveColor}40`,
        boxShadow: `0 0 40px ${waveColor}20`,
        backdropFilter: 'blur(20px)',
        maxWidth: 320,
        width: '100%',
      }}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: waveColor }} />
          <span className="text-white/60 font-sans text-xs tracking-[0.2em] uppercase">
            AI51 Frequency Synthesis
          </span>
        </div>

        {/* Generating state */}
        {phase === 'generating' && !error && (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: waveColor }} />
            <p className="text-white/50 font-sans text-xs text-center">
              Designing your frequency protocol...
            </p>
            <p className="text-white/25 font-sans text-xs text-center italic">
              "{condition}"
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <p className="text-red-400 font-sans text-xs text-center py-4">{error}</p>
        )}

        {/* Ready / Playing / Done state */}
        {protocol && phase !== 'generating' && (
          <>
            {/* Frequency name */}
            <div>
              <p className="text-white font-sans font-bold text-base leading-snug">{protocol.name}</p>
              <p className="text-white/40 font-sans text-xs mt-1 leading-relaxed">{protocol.description}</p>
            </div>

            {/* Hz display */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-black text-3xl" style={{ color: waveColor }}>
                {protocol.primary_hz}
              </span>
              <span className="text-white/30 font-mono text-sm">Hz</span>
              <span className="text-white/20 font-mono text-xs ml-2">{protocol.waveform}</span>
            </div>

            {/* Harmonics */}
            <div className="flex gap-1.5 flex-wrap">
              {protocol.harmonics.map(h => (
                <span key={h} className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${waveColor}15`, color: `${waveColor}80`, border: `1px solid ${waveColor}20` }}>
                  {h}Hz
                </span>
              ))}
            </div>

            {/* Mechanism */}
            <p className="text-white/25 font-sans text-xs leading-relaxed">
              {protocol.mechanism}
            </p>

            {/* Psychology / affirmation while playing */}
            {phase === 'playing' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="font-sans text-sm text-center leading-relaxed"
                style={{ color: waveColor }}
              >
                {protocol.psychology}
              </motion.p>
            )}

            {/* Progress bar */}
            {phase === 'playing' && (
              <div className="space-y-1">
                <div className="w-full h-1 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: waveColor, width: `${progressPct}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-white/20 font-mono text-xs">{formatTime(elapsed)}</span>
                  <span className="text-white/20 font-mono text-xs">{formatTime(remaining)} left</span>
                </div>
              </div>
            )}

            {/* Done message */}
            {phase === 'done' && (
              <p className="text-white/50 font-sans text-xs text-center py-1">
                Session complete. ♾️❤️
              </p>
            )}

            {/* Controls */}
            <div className="flex gap-2 justify-center pt-1">
              {phase === 'ready' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-bold text-sm text-black"
                  style={{ background: waveColor }}
                >
                  <Play className="w-4 h-4" />
                  Play {protocol.duration_minutes} min
                </motion.button>
              )}
              {phase === 'playing' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStop}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-bold text-sm border"
                  style={{ borderColor: `${waveColor}50`, color: waveColor }}
                >
                  <Pause className="w-4 h-4" />
                  Stop
                </motion.button>
              )}
              {phase === 'done' && (
                <button
                  onClick={handleClose}
                  className="text-white/40 font-sans text-xs hover:text-white/70 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}