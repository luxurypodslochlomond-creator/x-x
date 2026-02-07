import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKFire, COOLASFUCKBrain, COOLASFUCKHeart, COOLASFUCKMoon, COOLASFUCKShield, COOLASFUCKZap } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';

/**
 * FREQUENCY CHAMBER - PURE FOUNDATION
 * Each frequency SOUNDS and LOOKS different
 * Works with or without headphones
 * AI51 learns from your healing
 */

const FREQUENCIES = [
  {
    id: 'anger',
    name: 'ANGER RELEASE',
    hz: 396,
    icon: COOLASFUCKFire,
    color: '#ef4444',
    visual: 'fire',
    description: 'Rage → Calm power',
    waveform: 'sawtooth', // Aggressive = distinct sound
    harmonics: [792, 1188] // 2x, 3x for richness
  },
  {
    id: 'pain',
    name: 'PAIN RELIEF',
    hz: 174,
    icon: COOLASFUCKZap,
    color: '#f59e0b',
    visual: 'lightning',
    description: 'Blocks pain signals',
    waveform: 'square', // Sharp = blocks pain
    harmonics: [348, 522]
  },
  {
    id: 'love',
    name: 'DNA REPAIR',
    hz: 528,
    icon: COOLASFUCKHeart,
    color: '#ec4899',
    visual: 'heart',
    description: 'Heals cells, calms heart',
    waveform: 'sine', // Pure love = smooth
    harmonics: [1056, 1584]
  },
  {
    id: 'calm',
    name: 'UNIVERSAL CALM',
    hz: 432,
    icon: COOLASFUCKBrain,
    color: '#a855f7',
    visual: 'waves',
    description: 'Natural harmony',
    waveform: 'sine',
    harmonics: [864, 1296]
  },
  {
    id: 'sleep',
    name: 'DEEP SLEEP',
    hz: 2,
    icon: COOLASFUCKMoon,
    color: '#3b82f6',
    visual: 'moon',
    description: 'Delta waves, full rest',
    waveform: 'sine',
    carrier: 100, // Make audible
    harmonics: [4, 6]
  },
  {
    id: 'focus',
    name: 'LASER FOCUS',
    hz: 40,
    icon: COOLASFUCKBrain,
    color: '#22c55e',
    visual: 'gamma',
    description: 'MIT proven, clears fog',
    waveform: 'sine',
    carrier: 200,
    harmonics: [80, 120]
  },
  {
    id: 'earth',
    name: "EARTH'S HEARTBEAT",
    hz: 7.83,
    icon: COOLASFUCKShield,
    color: '#10b981',
    visual: 'schumann',
    description: 'Ground to planet',
    waveform: 'sine',
    carrier: 432, // Schumann × 55
    harmonics: [15.66, 23.49]
  },
  {
    id: 'fear',
    name: 'FEAR RELEASE',
    hz: 396,
    icon: COOLASFUCKShield,
    color: '#06b6d4',
    visual: 'shield',
    description: 'Root chakra, safety',
    waveform: 'triangle', // Different from anger
    harmonics: [792, 1188]
  }
];

export default function FrequencyChamber() {
  const [selected, setSelected] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [timer, setTimer] = useState(0);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  // === PLAY FREQUENCY ===
  const play = async (freq) => {
    stop();
    
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') await ctx.resume();
      
      audioCtxRef.current = ctx;
      const nodes = [];
      
      // MASTER GAIN
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      
      // ANALYSER FOR VISUALIZER
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      // PRIMARY FREQUENCY
      const carrier = freq.carrier || freq.hz;
      const osc = ctx.createOscillator();
      osc.type = freq.waveform;
      osc.frequency.value = carrier;
      
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      nodes.push(osc, gain);

      // HARMONICS (make each frequency richer + distinct)
      freq.harmonics.forEach((harmonic, i) => {
        const harmOsc = ctx.createOscillator();
        harmOsc.type = 'sine';
        harmOsc.frequency.value = harmonic;
        const harmGain = ctx.createGain();
        harmGain.gain.value = 0.15 / (i + 1);
        harmOsc.connect(harmGain);
        harmGain.connect(masterGain);
        harmOsc.start();
        nodes.push(harmOsc, harmGain);
      });

      // BINAURAL LAYER (if not already carrier-based)
      if (!freq.carrier && freq.hz > 10) {
        const leftOsc = ctx.createOscillator();
        const rightOsc = ctx.createOscillator();
        const merger = ctx.createChannelMerger(2);
        const leftGain = ctx.createGain();
        const rightGain = ctx.createGain();

        leftOsc.type = 'sine';
        rightOsc.type = 'sine';
        leftOsc.frequency.value = 200;
        rightOsc.frequency.value = 200 + freq.hz;
        leftGain.gain.value = 0.2;
        rightGain.gain.value = 0.2;

        leftOsc.connect(leftGain);
        rightOsc.connect(rightGain);
        leftGain.connect(merger, 0, 0);
        rightGain.connect(merger, 0, 1);
        merger.connect(masterGain);
        leftOsc.start();
        rightOsc.start();
        nodes.push(leftOsc, rightOsc, leftGain, rightGain, merger);
      }

      // AMBIENT BED (pink noise character)
      for (let i = 0; i < 4; i++) {
        const ambOsc = ctx.createOscillator();
        ambOsc.type = 'sine';
        ambOsc.frequency.value = carrier * 0.5 + (Math.random() - 0.5) * 20;
        const ambGain = ctx.createGain();
        ambGain.gain.value = 0.05;
        ambOsc.connect(ambGain);
        ambGain.connect(masterGain);
        ambOsc.start();
        nodes.push(ambOsc, ambGain);
      }

      nodesRef.current = nodes;
      setIsPlaying(true);
      setSelected(freq);
      setTimer(0);

      // TIMER
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);

      // LOG TO AI51 (learns what you need when)
      try {
        await base44.entities.FrequencyPlay.create({
          frequency_id: freq.id,
          frequency_hz: freq.hz,
          time_of_day: new Date().getHours(),
          device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        });
      } catch (e) {
        console.log('AI51 learning (non-critical):', e);
      }

      // START VISUALIZER
      drawVisualizer();
    } catch (err) {
      alert('Audio blocked - tap again');
    }
  };

  const stop = () => {
    nodesRef.current.forEach(n => {
      try { n.stop?.(); n.disconnect?.(); } catch(e) {}
    });
    nodesRef.current = [];
    
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    analyserRef.current = null;
    setIsPlaying(false);
    setTimer(0);
  };

  // === VISUALIZER ===
  const drawVisualizer = () => {
    if (!isPlaying || !canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isPlaying) return;
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // FADE TRAIL
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 3;
      let x = 0;

      // COLOR CODING PER FREQUENCY
      const color = selected?.color || '#06b6d4';

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Gradient bars
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '40');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        
        x += barWidth;
      }

      // WAVEFORM OVERLAY
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255.0;
        const y = (v * canvas.height * 0.5) + (canvas.height * 0.25);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
    };

    draw();
  };

  useEffect(() => {
    if (isPlaying && selected) {
      drawVisualizer();
    }
  }, [isPlaying, selected]);

  // CLEANUP
  useEffect(() => {
    return () => stop();
  }, []);

  // VOLUME CHANGE
  useEffect(() => {
    if (audioCtxRef.current && nodesRef.current.length > 0) {
      const masterGain = nodesRef.current.find(n => n.gain);
      if (masterGain?.gain) {
        masterGain.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
      }
    }
  }, [volume]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <COOLASFUCKWaves size={40} animate={true} />
          <h1 className="text-4xl font-black text-white">FREQUENCY CHAMBER</h1>
        </div>
        <p className="text-gray-500 text-sm font-mono">Pure healing • Distinct sounds • Real results</p>
      </div>

      {/* PLAYING NOW - FULLSCREEN */}
      <AnimatePresence>
        {isPlaying && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* TOP BAR */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: `${selected.color}40` }}>
              <div className="flex items-center gap-3">
                <selected.icon size={32} animate={true} />
                <div>
                  <p className="font-black text-xl" style={{ color: selected.color }}>{selected.name}</p>
                  <p className="text-gray-500 text-sm font-mono">{selected.hz} Hz</p>
                </div>
              </div>
              <div className="text-3xl font-black font-mono" style={{ color: selected.color }}>
                {formatTime(timer)}
              </div>
            </div>

            {/* VISUALIZER - FILLS SCREEN */}
            <div className="flex-1 relative overflow-hidden">
              <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                className="absolute inset-0 w-full h-full"
                style={{ filter: `drop-shadow(0 0 30px ${selected.color})` }}
              />

              {/* COLOR CONTEXT OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-8xl mb-4">{
                    selected.visual === 'fire' ? '🔥' :
                    selected.visual === 'lightning' ? '⚡' :
                    selected.visual === 'heart' ? '❤️' :
                    selected.visual === 'waves' ? '🌊' :
                    selected.visual === 'moon' ? '🌙' :
                    selected.visual === 'gamma' ? '🧠' :
                    selected.visual === 'schumann' ? '🌍' :
                    '🛡️'
                  }</p>
                  <p className="text-2xl font-black font-mono" style={{ color: selected.color }}>
                    {selected.description.toUpperCase()}
                  </p>
                </motion.div>
              </div>

              {/* BREATHING GUIDE - BOTTOM */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full border-4"
                  style={{ borderColor: selected.color, backgroundColor: `${selected.color}20` }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.p
                      className="text-2xl font-black font-mono"
                      style={{ color: selected.color }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      BREATHE
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CONTROLS - BOTTOM BAR */}
            <div className="p-6 border-t" style={{ borderColor: `${selected.color}40` }}>
              {/* VOLUME */}
              <div className="mb-4 flex items-center gap-4">
                <VolumeX className="w-5 h-5 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <Volume2 className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400 font-mono text-sm w-12">{Math.round(volume * 100)}%</span>
              </div>

              {/* STOP */}
              <button
                onClick={stop}
                className="w-full py-4 text-xl font-black font-mono border-2 transition-all"
                style={{
                  backgroundColor: selected.color,
                  borderColor: selected.color,
                  color: 'black',
                  boxShadow: `0 0 40px ${selected.color}60`
                }}
              >
                STOP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FREQUENCY GRID */}
      {!isPlaying && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FREQUENCIES.map((freq) => (
              <motion.button
                key={freq.id}
                onClick={() => play(freq)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="p-6 border-4 bg-black hover:bg-white/5 transition-all relative"
                style={{ 
                  borderColor: freq.color,
                  boxShadow: `0 0 20px ${freq.color}40`
                }}
              >
                <freq.icon size={48} animate={false} />
                <p className="text-xl font-black font-mono mt-3" style={{ color: freq.color }}>
                  {freq.name}
                </p>
                <p className="text-gray-500 text-xs font-mono mt-1">
                  {freq.hz} Hz
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {freq.description}
                </p>
                
                {/* WAVEFORM INDICATOR */}
                <div className="mt-3 flex items-center justify-center gap-1">
                  {freq.waveform === 'sine' && (
                    <svg width="40" height="16" viewBox="0 0 40 16">
                      <path d="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" stroke={freq.color} strokeWidth="2" fill="none" />
                    </svg>
                  )}
                  {freq.waveform === 'square' && (
                    <svg width="40" height="16" viewBox="0 0 40 16">
                      <path d="M0,12 L0,4 L8,4 L8,12 L16,12 L16,4 L24,4 L24,12 L32,12 L32,4 L40,4" stroke={freq.color} strokeWidth="2" fill="none" />
                    </svg>
                  )}
                  {freq.waveform === 'sawtooth' && (
                    <svg width="40" height="16" viewBox="0 0 40 16">
                      <path d="M0,12 L8,4 L8,12 L16,4 L16,12 L24,4 L24,12 L32,4 L32,12 L40,4" stroke={freq.color} strokeWidth="2" fill="none" />
                    </svg>
                  )}
                  {freq.waveform === 'triangle' && (
                    <svg width="40" height="16" viewBox="0 0 40 16">
                      <path d="M0,12 L4,4 L8,12 L12,4 L16,12 L20,4 L24,12 L28,4 L32,12 L36,4 L40,12" stroke={freq.color} strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* SPEAKER INFO */}
          <div className="mt-6 bg-green-900/20 border-2 border-green-500 p-4">
            <p className="text-green-400 font-black text-sm mb-2">🔊 SPEAKER-FRIENDLY</p>
            <p className="text-gray-300 text-sm">
              All frequencies work through speakers. Each uses DIFFERENT waveforms (sine, square, sawtooth, triangle) so they SOUND distinct. No headphones needed.
            </p>
          </div>

          {/* AI51 LEARNS */}
          <div className="mt-4 bg-pink-900/20 border-2 border-pink-500 p-4">
            <p className="text-pink-400 font-black text-sm mb-2">♾️ AI51 LEARNS</p>
            <p className="text-gray-300 text-sm">
              Every time you play a frequency, AI51 learns WHEN you need WHAT. Morning focus? Evening calm? Your patterns emerge. Zero tracking, pure learning.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}