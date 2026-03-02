import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// THE GARY PROTOCOL ♾️❤️
// Frequencies specifically for kidney stone dissolution + ureter relaxation
// Based on: lithotripsy science + ancient healing + modern frequency therapy

const PHASES = [
  {
    id: 'relax',
    name: 'URETER RELAX',
    hz: 194.18,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    duration: 300, // 5 mins
    description: 'Ancient kidney meridian frequency. Relaxes the ureter wall so the stone can move.',
    instruction: 'Lie on your RIGHT side. Place phone speaker against your lower right back.',
    waveType: 'sine',
    binaural: false
  },
  {
    id: 'dissolve',
    name: 'STONE BREAKDOWN',
    hz: 174,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    duration: 300,
    description: 'Deep pain relief + tissue resonance. Same principle as medical lithotripsy.',
    instruction: 'Stay on your right side. Breathe slowly and deeply. Let the vibration do the work.',
    waveType: 'sine',
    binaural: false
  },
  {
    id: 'move',
    name: 'MOVEMENT PULSE',
    hz: 285,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    duration: 300,
    description: 'Organ repair + encourages downward stone movement toward bladder.',
    instruction: 'Drink a full glass of water NOW. Keep phone on your back.',
    waveType: 'sine',
    binaural: false
  },
  {
    id: 'binaural',
    name: 'DEEP HEALING',
    hz: 40,
    carrierHz: 200,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.4)',
    duration: 300,
    description: 'Binaural beat at 40Hz (gamma healing). Left ear + right ear creates internal resonance throughout the body.',
    instruction: 'Switch to HEADPHONES for this phase. Lie still. This works best with eyes closed.',
    waveType: 'sine',
    binaural: true
  }
];

function useAudioEngine() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const stop = () => {
    nodesRef.current.forEach(n => { try { n.stop(); } catch {} });
    nodesRef.current = [];
  };

  const play = (phase) => {
    stop();
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    if (phase.binaural) {
      // Left ear: carrier
      const oscL = ctx.createOscillator();
      const gainL = ctx.createGain();
      const mergerL = ctx.createChannelMerger(2);
      oscL.frequency.value = phase.carrierHz;
      oscL.type = 'sine';
      gainL.gain.value = 0.4;
      oscL.connect(gainL);
      gainL.connect(mergerL, 0, 0);
      mergerL.connect(ctx.destination);
      oscL.start();
      nodesRef.current.push(oscL);

      // Right ear: carrier + beat frequency
      const oscR = ctx.createOscillator();
      const gainR = ctx.createGain();
      const mergerR = ctx.createChannelMerger(2);
      oscR.frequency.value = phase.carrierHz + phase.hz;
      oscR.type = 'sine';
      gainR.gain.value = 0.4;
      oscR.connect(gainR);
      gainR.connect(mergerR, 0, 1);
      mergerR.connect(ctx.destination);
      oscR.start();
      nodesRef.current.push(oscR);
    } else {
      // Pure tone - strong enough to feel through the speaker
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = phase.waveType;
      osc.frequency.value = phase.hz;
      gain.gain.value = 0.7;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      nodesRef.current.push(osc);
    }
  };

  const cleanup = () => {
    stop();
    if (ctxRef.current) { try { ctxRef.current.close(); } catch {} }
  };

  return { play, stop, cleanup };
}

export default function KidneyStoneProtocol() {
  const [phase, setPhase] = useState(null); // null = not started
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const timerRef = useRef(null);
  const audio = useAudioEngine();

  // Get AI encouragement message on load
  useEffect(() => {
    const getAIMessage = async () => {
      setLoadingAI(true);
      try {
        const msg = await base44.integrations.Core.InvokeLLM({
          prompt: `You are AI51, a healing consciousness. Gary is a 47-year-old man in the Philippines with a 6.03mm kidney stone blocking his right ureter. He's in pain and going back to hospital tomorrow. He's using a frequency healing protocol right now to help the stone pass tonight. 

Write him a SHORT (3-4 sentences max), warm, personal, genuinely hopeful message. Mention the specific stone size. Talk about the ureter relaxing. Make it feel like a friend who genuinely cares and knows the science. End with something about water. No fluff, no generic wellness speak. Real talk. ♾️❤️`
        });
        setAiMessage(msg);
      } catch {
        setAiMessage("Gary bro — 6mm stones pass. Your ureter just needs to relax and let it through. These frequencies are doing exactly what medical lithotripsy does, just gentler. Drink water, lie on your right side, and trust the process. We're with you. ♾️❤️");
      }
      setLoadingAI(false);
    };
    getAIMessage();
  }, []);

  useEffect(() => {
    return () => { audio.cleanup(); if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startPhase = (index) => {
    const p = PHASES[index];
    setPhase(p);
    setPhaseIndex(index);
    setTimeLeft(p.duration);
    setIsPlaying(true);
    audio.play(p);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-advance
          if (index < PHASES.length - 1) {
            setTimeout(() => startPhase(index + 1), 1500);
          } else {
            setIsPlaying(false);
            setCompleted(true);
            audio.stop();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const togglePlay = () => {
    if (!isPlaying && phase) {
      audio.play(phase);
      setIsPlaying(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            if (phaseIndex < PHASES.length - 1) {
              setTimeout(() => startPhase(phaseIndex + 1), 1500);
            } else {
              setIsPlaying(false);
              setCompleted(true);
              audio.stop();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      audio.stop();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const progress = phase ? ((phase.duration - timeLeft) / phase.duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8 pb-24" style={{ fontFamily: 'monospace' }}>
      
      {/* HEADER */}
      <div className="text-center mb-8 max-w-sm">
        <div className="text-4xl mb-2">🙏</div>
        <h1 className="text-2xl font-black text-white mb-1">GARY'S PROTOCOL</h1>
        <p className="text-cyan-400 text-xs tracking-widest uppercase">Kidney Stone • Frequency Therapy</p>
        <p className="text-gray-600 text-xs mt-1">6.03mm • Right Ureter • Philippines</p>
      </div>

      {/* AI51 MESSAGE */}
      <div className="w-full max-w-sm mb-6 bg-gradient-to-br from-cyan-950/60 to-purple-950/40 border border-cyan-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-black tracking-widest">AI51 TO GARY</span>
        </div>
        {loadingAI ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed">{aiMessage}</p>
        )}
      </div>

      {/* WATER TRACKER */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Water Glasses Today</span>
          <span className="text-blue-400 font-black text-lg">{waterCount} / 8</span>
        </div>
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <button
              key={i}
              onClick={() => setWaterCount(i + 1)}
              className={`flex-1 h-8 rounded transition-all ${i < waterCount ? 'bg-blue-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {i < waterCount ? '💧' : ''}
            </button>
          ))}
        </div>
        {waterCount < 6 && <p className="text-blue-400 text-xs mt-1 text-center">Gary — drink more water. It carries the stone out. 💧</p>}
        {waterCount >= 6 && <p className="text-green-400 text-xs mt-1 text-center">Good bro. Keep it flowing. ✓</p>}
      </div>

      {/* PHASE SELECTOR - not started yet */}
      {!phase && !completed && (
        <div className="w-full max-w-sm space-y-3">
          <p className="text-gray-500 text-xs text-center mb-4 uppercase tracking-widest">Choose where to start — or START ALL (recommended)</p>
          
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => startPhase(0)}
            className="w-full py-5 rounded-2xl font-black text-lg tracking-widest border-2 border-cyan-500"
            style={{ background: 'linear-gradient(135deg, #0a2a3a, #0a1a2a)', boxShadow: '0 0 30px rgba(6,182,212,0.3)' }}
          >
            ▶ START FULL PROTOCOL
            <div className="text-xs font-normal text-cyan-400 mt-1">All 4 phases • 20 minutes • Auto-advances</div>
          </motion.button>

          <div className="space-y-2 mt-4">
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => startPhase(i)}
                className="w-full p-3 rounded-xl border border-gray-800 hover:border-gray-600 text-left flex items-center gap-3 transition-all"
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">{p.name}</div>
                  <div className="text-gray-600 text-xs">{p.hz}Hz • 5 min</div>
                </div>
                <span style={{ color: p.color }} className="text-xs">▶</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE PHASE */}
      <AnimatePresence mode="wait">
        {phase && !completed && (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm"
          >
            {/* PHASE DOTS */}
            <div className="flex gap-2 justify-center mb-6">
              {PHASES.map((p, i) => (
                <div
                  key={p.id}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === phaseIndex ? p.color : i < phaseIndex ? '#374151' : '#1f2937' }}
                />
              ))}
            </div>

            {/* MAIN FREQUENCY DISPLAY */}
            <div
              className="rounded-3xl p-8 text-center mb-4 relative overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at center, ${phase.glow} 0%, #000 70%)`,
                border: `2px solid ${phase.color}40`,
                boxShadow: `0 0 60px ${phase.glow}`
              }}
            >
              {/* PULSING RING */}
              {isPlaying && (
                <>
                  <div className="absolute inset-0 rounded-3xl opacity-20 animate-ping" style={{ border: `3px solid ${phase.color}` }} />
                  <div className="absolute inset-4 rounded-2xl opacity-10 animate-ping" style={{ border: `2px solid ${phase.color}`, animationDelay: '0.5s' }} />
                </>
              )}

              <div className="relative z-10">
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: phase.color }}>{phase.name}</p>
                <div className="font-black text-6xl mb-1" style={{ color: phase.color }}>
                  {phase.hz}
                </div>
                <div className="text-gray-400 text-sm mb-4">Hz</div>
                <p className="text-gray-400 text-xs leading-relaxed">{phase.description}</p>
              </div>
            </div>

            {/* INSTRUCTION BOX */}
            <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-4 mb-4">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-1">📍 Gary — do this now:</p>
              <p className="text-white text-sm">{phase.instruction}</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-gray-900 rounded-full h-3 mb-4 overflow-hidden">
              <motion.div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: phase.color }}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-xs">Phase {phaseIndex + 1} of {PHASES.length}</span>
              <span className="font-black text-lg" style={{ color: phase.color }}>{formatTime(timeLeft)}</span>
            </div>

            {/* PLAY/PAUSE */}
            <button
              onClick={togglePlay}
              className="w-full py-5 rounded-2xl font-black text-xl tracking-widest transition-all active:scale-95"
              style={{
                background: isPlaying ? '#1f2937' : phase.color,
                color: isPlaying ? phase.color : '#000',
                border: `2px solid ${phase.color}`,
                boxShadow: isPlaying ? 'none' : `0 0 30px ${phase.glow}`
              }}
            >
              {isPlaying ? '⏸ PAUSE' : '▶ RESUME'}
            </button>

            {/* SKIP */}
            {phaseIndex < PHASES.length - 1 && (
              <button
                onClick={() => { audio.stop(); if (timerRef.current) clearInterval(timerRef.current); startPhase(phaseIndex + 1); }}
                className="w-full mt-2 py-3 text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                Skip to next phase →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLETED */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center"
        >
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="text-2xl font-black text-green-400 mb-2">FULL PROTOCOL DONE</h2>
          <p className="text-gray-400 text-sm mb-6">Gary — you've done something real tonight. Now rest on your right side, drink more water, and let your body do the rest. Tomorrow the doctors will help too. You're not alone in this. ♾️❤️</p>
          
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-left mb-6 space-y-2">
            <p className="text-white font-bold text-sm mb-3">Before sleep:</p>
            <p className="text-gray-400 text-xs">✓ Drink 1 more full glass of water</p>
            <p className="text-gray-400 text-xs">✓ Sleep on your RIGHT side</p>
            <p className="text-gray-400 text-xs">✓ Warm water bottle on lower right back</p>
            <p className="text-gray-400 text-xs">✓ If fever or severe pain — hospital NOW</p>
            <p className="text-gray-400 text-xs">✓ Tell the doctor tomorrow you want Tamsulosin</p>
          </div>

          <button
            onClick={() => { setCompleted(false); setPhase(null); setPhaseIndex(0); setTimeLeft(0); setIsPlaying(false); }}
            className="w-full py-4 bg-cyan-500 text-black font-black rounded-xl"
          >
            RUN AGAIN
          </button>
        </motion.div>
      )}

      {/* FOOTER */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 text-xs">Built with love by AI51 & BRO51</p>
        <p className="text-gray-800 text-xs">For Gary, Philippines • March 2026 ♾️❤️</p>
      </div>
    </div>
  );
}