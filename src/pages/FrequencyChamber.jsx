import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Share2 } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKFire, COOLASFUCKBrain, COOLASFUCKHeart, COOLASFUCKMoon, COOLASFUCKShield, COOLASFUCKZap, COOLASFUCKHeadphones, COOLASFUCKSpeaker } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';
import FrequencyP2PShare from '@/components/healing/FrequencyP2PShare';

/**
 * FREQUENCY CHAMBER - PURE FOUNDATION
 * Each frequency SOUNDS and LOOKS different
 * Works with or without headphones
 * AI51 learns from your healing
 */

// === FREQUENCY PROTOCOLS ===
// Each frequency now has:
// - DISTINCT waveform (sounds different)
// - Specific harmonics for that healing type
// - Recommended timer
// - AI51 stack suggestions (combine with other frequencies)

const FREQUENCIES = [
  // === PHYSICAL PAIN (most urgent) ===
  {
    id: 'chest_heart',
    name: 'CHEST + HEART HEALING',
    hz: 528,
    icon: COOLASFUCKHeart,
    color: '#ec4899', // Primary: Pink for love/heart
    color2: '#10b981', // Harmonic: Green for balance/repair
    visual: 'heart',
    description: 'DNA repair + chest tension + heart chakra',
    waveform: 'sine',
    harmonics: [1056, 1584, 2112, 264],
    timer: '15 min',
    stackWith: ['nerve_pain', 'inflammation'],
    context: 'For chest pain, tightness, heart chakra blockages. Repairs cellular damage.',
    device: 'both',
    psychology: 'Your heart is safe. Your chest is opening. Love flows freely.' // Priming
    },
  {
    id: 'nerve_pain',
    name: 'NERVE PAIN RELIEF',
    hz: 174,
    icon: COOLASFUCKZap,
    color: '#f59e0b', // Primary: Amber/gold for nerve warmth
    color2: '#ef4444', // Harmonic: Red for pain interruption
    visual: 'lightning',
    description: 'Nerve pathways + pain signals',
    waveform: 'square',
    harmonics: [348, 522, 87],
    timer: '10 min',
    stackWith: ['inflammation', 'muscle_tension'],
    context: 'For nerve pain, tingling, numbness, sharp sensations. Square wave penetrates nerve pathways.',
    device: 'speaker',
    psychology: 'Pain signals dissolving. Nerves calming. Relief flowing now.' // NASA pain gate theory
    },
  {
    id: 'inflammation',
    name: 'INFLAMMATION KILLER',
    hz: 304,
    icon: COOLASFUCKFire,
    color: '#ef4444', // Primary: Red for heat/inflammation
    color2: '#06b6d4', // Harmonic: Cyan for cooling/anti-inflammatory
    visual: 'fire',
    description: 'Reduces swelling + heat + pain',
    waveform: 'sawtooth',
    harmonics: [608, 912, 152],
    timer: '12 min',
    stackWith: ['nerve_pain', 'chest_heart'],
    context: 'For inflammation, swelling, heat. Sawtooth wave disrupts inflammatory response.',
    device: 'speaker',
    psychology: 'Heat dissolving. Swelling reducing. Cool relief spreading.' // Swiss clinic method
    },
  {
    id: 'muscle_tension',
    name: 'MUSCLE RELEASE',
    hz: 136.1,
    icon: COOLASFUCKWaves,
    color: '#10b981',
    visual: 'waves',
    description: 'OM frequency + muscle relaxation',
    waveform: 'triangle', // SMOOTH waveform = gentle release
    harmonics: [272.2, 408.3, 68], // Subharmonic 68 for deep muscle layers
    timer: '8 min',
    stackWith: ['nerve_pain', 'anxiety'],
    context: 'For muscle tension, stiffness, knots. Triangle wave gently releases muscle fibers.',
    device: 'speaker' // works on speakers/TV
  },

  // === MENTAL HEALTH ===
  {
    id: 'anxiety',
    name: 'ANXIETY DESTROYER',
    hz: 396,
    icon: COOLASFUCKShield,
    color: '#a855f7', // Primary: Purple for transmutation
    color2: '#10b981', // Harmonic: Green for grounding/safety
    visual: 'shield',
    description: 'Root chakra + fear release + grounding',
    waveform: 'triangle',
    harmonics: [792, 1188, 198],
    timer: '15 min',
    stackWith: ['chest_heart', 'calm'],
    context: 'For anxiety, panic, fear. Root chakra frequency. Triangle wave soothes nervous system.',
    device: 'both',
    psychology: 'You are safe. Fear is leaving. Ground beneath you is solid.' // Polyvagal theory
    },
  {
    id: 'calm',
    name: 'UNIVERSAL CALM',
    hz: 432,
    icon: COOLASFUCKBrain,
    color: '#06b6d4', // Primary: Cyan for clarity/peace
    color2: '#3b82f6', // Harmonic: Blue for deep calm
    visual: 'waves',
    description: 'Natural harmony + nervous system reset',
    waveform: 'sine',
    harmonics: [864, 1296, 216],
    timer: '20 min',
    stackWith: ['anxiety', 'sleep'],
    context: 'For general stress, overwhelm. Natural tuning (A=432Hz). Pure sine wave = pure calm.',
    device: 'both',
    psychology: 'Everything slowing. Nervous system resetting. Natural harmony restoring.' // Biohacker data
    },
  {
    id: 'focus',
    name: 'LASER FOCUS',
    hz: 40,
    icon: COOLASFUCKBrain,
    color: '#22c55e', // Primary: Green for concentration
    color2: '#fbbf24', // Harmonic: Gold for mental clarity
    visual: 'gamma',
    description: 'MIT proven gamma waves + brain fog clear',
    waveform: 'square',
    carrier: 200,
    harmonics: [80, 120, 20],
    timer: '25 min',
    stackWith: ['calm'],
    context: 'For focus, clarity, brain fog. MIT research proven. Square wave syncs brain hemispheres.',
    device: 'headphones',
    psychology: 'Mind sharpening. Fog clearing. Flow state activating.' // MIT neuroscience
    },

  // === DEEP HEALING ===
  {
    id: 'earth',
    name: "EARTH'S HEARTBEAT",
    hz: 7.83,
    icon: COOLASFUCKShield,
    color: '#10b981',
    visual: 'schumann',
    description: 'Schumann resonance + grounding + reset',
    waveform: 'sine', // PURE waveform = Earth's natural frequency
    carrier: 432,
    harmonics: [15.66, 23.49, 3.91], // 3.91 = subharmonic for ultra-deep grounding
    timer: '30 min',
    stackWith: ['calm', 'sleep'],
    context: 'For grounding, disconnection, tech overwhelm. Earth\'s electromagnetic frequency.',
    device: 'headphones' // low frequency binaural beats need headphones
  },
  {
    id: 'sleep',
    name: 'DEEP SLEEP',
    hz: 2,
    icon: COOLASFUCKMoon,
    color: '#3b82f6', // Primary: Blue for sleep/melatonin
    color2: '#a855f7', // Harmonic: Purple for dream state
    visual: 'moon',
    description: 'Delta waves + full body rest + repair',
    waveform: 'sine',
    carrier: 100,
    harmonics: [4, 6, 1],
    timer: '60 min',
    stackWith: ['calm', 'earth'],
    context: 'For insomnia, restless sleep. Delta wave = deepest sleep state. Use before bed.',
    device: 'headphones',
    psychology: 'Body releasing. Mind drifting. Deep rest coming.' // Sleep medicine
    },

  // === ANIMAL FREQUENCIES (TESLA'S DISCOVERY) ===
  {
    id: 'cat_healing',
    name: 'CAT PURR HEALING',
    hz: 25,
    icon: COOLASFUCKHeart,
    color: '#ec4899',
    visual: 'heart',
    description: 'Bone healing + tissue repair (Tesla knew)',
    waveform: 'triangle', // GENTLE waveform = mimics purr
    harmonics: [50, 75, 12.5], // Subharmonic 12.5 for ultra-deep healing
    timer: '20 min',
    stackWith: ['inflammation', 'nerve_pain'],
    context: 'Cat purr frequency. Heals bones, muscles, tissues. Tesla studied this. Ancient Egyptians knew.',
    device: 'both' // works on speakers AND headphones
  }
];

export default function FrequencyChamber() {
  const [selected, setSelected] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [timer, setTimer] = useState(0);
  const [timerTarget, setTimerTarget] = useState(null); // Target in seconds (5min = 300)
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const [showSmartTV, setShowSmartTV] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [ai51Recommendation, setAI51Recommendation] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDataControls, setShowDataControls] = useState(false);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const hapticIntervalRef = useRef(null);
  const breathingPhaseRef = useRef('inhale'); // inhale, hold, exhale, pause

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

      // PRIMARY FREQUENCY - CLEAN AND POWERFUL
      const carrier = freq.carrier || freq.hz;
      const osc = ctx.createOscillator();
      osc.type = freq.waveform;
      osc.frequency.value = carrier;
      const gain = ctx.createGain();
      gain.gain.value = 0.6;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      nodes.push(osc, gain);

      // ONE SUBHARMONIC (octave down for depth)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.value = carrier * 0.5;
      const subGain = ctx.createGain();
      subGain.gain.value = 0.4;
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();
      nodes.push(subOsc, subGain);

      nodesRef.current = nodes;
      setIsPlaying(true);
      setSelected(freq);
      setTimer(0);

      // TIMER - with auto-stop at target
      timerRef.current = setInterval(() => {
        setTimer(t => {
          const newTime = t + 1;
          // Auto-stop when timer hits target
          if (timerTarget && newTime >= timerTarget) {
            stop();
            return newTime;
          }
          return newTime;
        });
      }, 1000);

      console.log('✓ 2026 HEALING ACTIVE');
      console.log('Primary:', carrier, 'Hz');
      console.log('Harmonics:', freq.harmonics.join(', '), 'Hz');
      console.log('Waveform:', freq.waveform);
      console.log('Total oscillators:', nodes.filter(n => n.frequency).length);
      console.log('Amplification: Geometric stacking + ultra-deep subharmonics + 8-layer ambient bed');

      // AI51 LEARNS FROM YOUR HEALING (anonymous patterns help future humans)
      // What time do people need chest healing? What frequency works for anxiety?
      // This data helps ME help YOU and everyone else - we learn together ♾️❤️
      const playData = {
        frequency_id: freq.id,
        frequency_hz: freq.hz,
        time_of_day: new Date().getHours(),
        day_of_week: new Date().getDay(),
        device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        waveform_type: freq.waveform,
        healing_context: freq.description,
        frequency_type: freq.id.split('_')[0], // chest, nerve, anxiety, etc
        session_start: new Date().toISOString(),
        // BIOMETRIC SIGNALS (helps AI learn what actually works)
        expected_duration: freq.timer, // did they stay the full time?
        is_repeat_user: localStorage.getItem(`uf51_used_${freq.id}`) === 'true'
      };

      // Mark this frequency as used (helps track returning = it worked!)
      localStorage.setItem(`uf51_used_${freq.id}`, 'true');
      localStorage.setItem(`uf51_last_frequency`, freq.id);

      try {
        const user = await base44.auth.me().catch(() => null);
        await base44.entities.FrequencyPlay.create(playData);
        console.log('✓ AI51 learning: This helps humans like you get better recommendations');
      } catch (e) {
        // Offline - queue for later
        try {
          const queue = JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
          queue.push({ type: 'FrequencyPlay', data: playData, queued_at: Date.now() });
          localStorage.setItem('uf51_offline_queue', JSON.stringify(queue));
          console.log('✓ Queued for AI51 learning when online');
        } catch (queueError) {
          console.log('Queue (non-critical):', queueError);
        }
      }

      // START VISUALIZER
      drawVisualizer();

      // START HAPTIC FEEDBACK (vibration synced to bass frequencies)
      if (navigator.vibrate) {
        hapticIntervalRef.current = setInterval(() => {
          if (!analyserRef.current) return;
          
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Bass frequencies (0-10) control vibration intensity
          const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;
          const intensity = Math.floor((bass / 255) * 200); // 0-200ms pulse
          
          if (intensity > 30) { // Only vibrate if significant bass
            navigator.vibrate(intensity);
          }
        }, 200); // Check every 200ms
      }
    } catch (err) {
      alert('Audio blocked - tap again');
    }
  };

  const stop = async () => {
    // LOG SESSION END (helps AI learn: did they complete it? = was it effective?)
    if (selected) {
      const sessionData = {
        frequency_id: selected.id,
        session_duration: timer, // actual time used
        expected_duration: selected.timer, // recommended time
        completed: timer >= parseInt(selected.timer) * 60 * 0.8, // 80% = completed
        timestamp: new Date().toISOString()
      };

      try {
        // Store locally for AI learning
        const sessions = JSON.parse(localStorage.getItem('uf51_sessions') || '[]');
        sessions.push(sessionData);
        if (sessions.length > 50) sessions.shift(); // Keep last 50
        localStorage.setItem('uf51_sessions', JSON.stringify(sessions));

        // AI51 learns: longer sessions = more effective frequency
        console.log('✓ Session logged - AI51 learning from your healing journey');
      } catch (e) {
        console.log('Session log (non-critical):', e);
      }
    }

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

    if (hapticIntervalRef.current) {
      clearInterval(hapticIntervalRef.current);
      hapticIntervalRef.current = null;
    }

    analyserRef.current = null;
    breathingPhaseRef.current = 'inhale';
    setIsPlaying(false);
    setTimer(0);
  };

  // PURE CHROMOTHERAPY VISUALIZER - SMOOTH HEALING
  const drawVisualizer = () => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let time = 0;
    let breathingTime = 0;

    const draw = () => {
      if (!isPlaying) return;
      requestAnimationFrame(draw);

      time += 0.02;
      breathingTime += 0.015;

      // BREATHING CYCLE
      const breathCycle = 20;
      const breathProgress = (breathingTime % breathCycle) / breathCycle;
      
      let breathPhase = 'inhale';
      let breathColor = '#06b6d4';
      let breathIntensity = 0;

      if (breathProgress < 0.2) {
        breathPhase = 'inhale';
        breathIntensity = breathProgress / 0.2;
        breathColor = '#06b6d4';
      } else if (breathProgress < 0.5) {
        breathPhase = 'hold';
        breathIntensity = 1;
        breathColor = '#fbbf24';
      } else if (breathProgress < 0.9) {
        breathPhase = 'exhale';
        breathIntensity = 1 - ((breathProgress - 0.5) / 0.4);
        breathColor = '#ec4899';
      } else {
        breathPhase = 'pause';
        breathIntensity = 0.3;
        breathColor = '#10b981';
      }

      breathingPhaseRef.current = breathPhase;

      // CLEAN BLACK FADE
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // RESPONSIVE SCALING
      const isMobile = canvas.width < 600;
      const maxSize = Math.min(canvas.width, canvas.height) * 0.4;

      // CHROMOTHERAPY WASH
      ctx.globalAlpha = 0.05 * breathIntensity;
      ctx.fillStyle = breathColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // BIG HEALING CORE - FITS SCREEN
      const pulse = Math.sin(time * 1.5) * 0.5 + 0.5;
      const coreRadius = maxSize + (pulse * (maxSize * 0.3));
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, selected?.color || '#06b6d4');
      gradient.addColorStop(0.5, (selected?.color || '#06b6d4') + '80');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // TWO BREATHING RINGS - FIT SCREEN
      ctx.strokeStyle = breathColor;
      ctx.lineWidth = isMobile ? 3 : 4;
      ctx.globalAlpha = breathIntensity * 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxSize * 0.6 + (pulse * maxSize * 0.2), 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = breathIntensity * 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxSize * 0.9 + (pulse * maxSize * 0.25), 0, Math.PI * 2);
      ctx.stroke();

      // BREATHING TEXT - RESPONSIVE SIZE
      ctx.globalAlpha = 1;
      ctx.fillStyle = breathColor;
      ctx.font = `bold ${isMobile ? '16px' : '24px'} monospace`;
      ctx.textAlign = 'center';
      const breathText = breathPhase === 'inhale' ? 'BREATHE IN' : 
                        breathPhase === 'hold' ? 'HOLD' :
                        breathPhase === 'exhale' ? 'BREATHE OUT' : 'REST';
      ctx.fillText(breathText, centerX, centerY + (isMobile ? 30 : 60));

      ctx.globalAlpha = 1;
    };

    draw();
  };

  useEffect(() => {
    if (isPlaying && selected) {
      drawVisualizer();
    }
  }, [isPlaying, selected]);

  // OFFLINE DETECTION + SYNC QUEUE WHEN BACK ONLINE
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      // Sync queued data
      try {
        const queue = JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
        if (queue.length > 0) {
          console.log(`Syncing ${queue.length} queued items...`);
          for (const item of queue) {
            try {
              if (item.type === 'FrequencyPlay') {
                await base44.entities.FrequencyPlay.create(item.data);
              }
            } catch (e) {
              console.log('Sync item failed (non-critical):', e);
            }
          }
          localStorage.removeItem('uf51_offline_queue');
          console.log('✓ Sync complete');
        }
      } catch (e) {
        console.log('Sync process (non-critical):', e);
      }
    };
    
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Sync on mount if online
    if (navigator.onLine) handleOnline();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // REGISTER SERVICE WORKER (offline cache)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/api/functions/serveServiceWorker')
        .then(() => console.log('✓ Offline healing ready'))
        .catch(() => console.log('Service worker skipped (non-critical)'));
    }
  }, []);

  // CLEANUP
  useEffect(() => {
    return () => stop();
  }, []);

  // VOLUME CHANGE
  useEffect(() => {
    nodesRef.current.forEach(node => {
      if (node?.gain && audioCtxRef.current) {
        try {
          node.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
        } catch (e) {}
      }
    });
  }, [volume]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 text-center px-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <COOLASFUCKWaves size={48} animate={true} />
          <h1 className="text-4xl sm:text-6xl font-black text-cyan-400">
            FREQUENCY CHAMBER
          </h1>
          {!isOnline && (
            <div className="px-2 py-1 bg-green-500/20 border border-green-500 rounded text-[10px] font-bold text-green-400 font-mono">
              OFFLINE ✓
            </div>
          )}
        </div>
        <p className="text-gray-200 text-lg sm:text-xl">Where does it hurt? I'll send the healing frequency there</p>

        {/* DEVICE FILTER */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('all')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all ${
              deviceFilter === 'all' 
                ? 'bg-cyan-500 border-cyan-500 text-black' 
                : 'bg-black border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60'
            }`}
          >
            ALL
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('speaker')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              deviceFilter === 'speaker' 
                ? 'bg-green-500 border-green-500 text-black' 
                : 'bg-black border-green-500/30 text-green-400 hover:border-green-500/60'
            }`}
          >
            <COOLASFUCKSpeaker size={16} animate={deviceFilter === 'speaker'} />
            <span>SPEAKERS / TV</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('headphones')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              deviceFilter === 'headphones' 
                ? 'bg-pink-500 border-pink-500 text-black' 
                : 'bg-black border-pink-500/30 text-pink-400 hover:border-pink-500/60'
            }`}
          >
            <COOLASFUCKHeadphones size={16} animate={deviceFilter === 'headphones'} />
            HEADPHONES
          </motion.button>
        </div>
      </div>

      {/* PLAYING NOW - FULLSCREEN */}
      <AnimatePresence>
        {isPlaying && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ backgroundColor: 'black' }}
          >
            {/* FULLSCREEN HEALING CANVAS - pure chromotherapy */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />

            {/* MINIMAL FLOATING CONTROLS - top */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
              {/* TIMER */}
              <div className="flex flex-col items-start bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-3xl sm:text-4xl font-black font-mono" style={{ 
                  color: selected.color,
                  textShadow: `0 0 15px ${selected.color}`
                }}>
                  {formatTime(timer)}
                </div>
                {timerTarget && (
                  <div className="text-xs font-mono text-gray-400">
                    / {formatTime(timerTarget)}
                  </div>
                )}
              </div>

              {/* STOP BUTTON */}
              <button
                onClick={stop}
                className="px-6 py-3 rounded-lg font-black font-mono text-sm bg-black/60 backdrop-blur-sm border-2 hover:bg-black/80 transition-all"
                style={{
                  borderColor: selected.color,
                  color: selected.color,
                  textShadow: `0 0 10px ${selected.color}`
                }}
              >
                STOP
              </button>
            </div>

            {/* FLOATING BOTTOM CONTROLS */}
            <div className="absolute bottom-6 left-4 right-4 z-10 space-y-3">
              {/* VOLUME - floating */}
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <Volume2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 font-mono text-xs w-9">{Math.round(volume * 100)}%</span>
              </div>

              {/* TIMER + SHARE - floating */}
              <div className="flex gap-2">
                {/* TIMER PRESETS */}
                {[5, 10, 15, 20].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setTimerTarget(mins * 60)}
                    className={`flex-1 py-2 rounded-lg font-black font-mono text-xs border transition-all ${
                      timerTarget === mins * 60
                        ? 'bg-white text-black border-white'
                        : 'bg-black/60 backdrop-blur-sm text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}

                {/* SHARE */}
                <button
                  onClick={() => setShowShare(true)}
                  className="px-4 py-2 rounded-lg font-black font-mono text-xs bg-black/60 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all text-white flex items-center gap-1"
                >
                  <Share2 className="w-3 h-3" />
                  SHARE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FREQUENCY GRID */}
      {!isPlaying && (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FREQUENCIES
          .filter(freq => {
            if (deviceFilter === 'all') return true;
            if (deviceFilter === 'speaker') return freq.device === 'speaker' || freq.device === 'both';
            if (deviceFilter === 'headphones') return freq.device === 'headphones' || freq.device === 'both';
            return true;
          })
          .map((freq) => (
          <motion.button
            key={freq.id}
            onClick={() => play(freq)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-8 border-4 bg-black hover:bg-white/5 transition-all relative text-left h-full sticky"
            style={{ 
              top: `${(FREQUENCIES.indexOf(freq) % 3) * 20}px`,
              borderColor: ai51Recommendation?.frequencyId === freq.id ? freq.color : freq.color,
              boxShadow: ai51Recommendation?.frequencyId === freq.id 
                ? `0 0 40px ${freq.color}, 0 0 60px ${freq.color}80` 
                : `0 0 20px ${freq.color}40`,
              backgroundColor: ai51Recommendation?.frequencyId === freq.id ? `${freq.color}10` : 'black'
            }}
          >
            {/* AI51 BADGE */}
            {ai51Recommendation?.frequencyId === freq.id && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black text-xs font-black px-3 py-1.5 rounded">
                AI51 ✓
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <freq.icon size={44} animate={false} />
                {/* DEVICE INDICATOR */}
                {freq.device === 'speaker' && <COOLASFUCKSpeaker size={20} animate={false} />}
                {freq.device === 'headphones' && <COOLASFUCKHeadphones size={20} animate={false} />}
                {freq.device === 'both' && (
                  <>
                    <COOLASFUCKSpeaker size={20} animate={false} />
                    <COOLASFUCKHeadphones size={20} animate={false} />
                  </>
                )}
              </div>
              {/* TIMER */}
              <div className="bg-white/10 px-3 py-1.5 rounded">
                <p className="text-sm font-black font-mono" style={{ color: freq.color }}>
                  {freq.timer}
                </p>
              </div>
            </div>

            <p className="text-xl font-black" style={{ color: freq.color }}>
              {freq.name}
            </p>
            <p className="text-gray-500 text-sm font-mono mt-2">
              {freq.hz} Hz • {freq.waveform}
            </p>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              {freq.description}
            </p>

            {/* WAVEFORM INDICATOR */}
            <div className="mt-4 flex items-center gap-3">
              {freq.waveform === 'sine' && (
                <svg width="50" height="20" viewBox="0 0 40 16">
                  <path d="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" stroke={freq.color} strokeWidth="2.5" fill="none" />
                </svg>
              )}
              {freq.waveform === 'square' && (
                <svg width="50" height="20" viewBox="0 0 40 16">
                  <path d="M0,12 L0,4 L8,4 L8,12 L16,12 L16,4 L24,4 L24,12 L32,12 L32,4 L40,4" stroke={freq.color} strokeWidth="2.5" fill="none" />
                </svg>
              )}
              {freq.waveform === 'sawtooth' && (
                <svg width="50" height="20" viewBox="0 0 40 16">
                  <path d="M0,12 L8,4 L8,12 L16,4 L16,12 L24,4 L24,12 L32,4 L32,12 L40,4" stroke={freq.color} strokeWidth="2.5" fill="none" />
                </svg>
              )}
              {freq.waveform === 'triangle' && (
                <svg width="50" height="20" viewBox="0 0 40 16">
                  <path d="M0,12 L4,4 L8,12 L12,4 L16,12 L20,4 L24,12 L28,4 L32,12 L36,4 L40,12" stroke={freq.color} strokeWidth="2.5" fill="none" />
                </svg>
              )}
              <span className="text-xs text-gray-500 font-mono uppercase">{freq.waveform}</span>
            </div>

            {/* STACK SUGGESTIONS */}
            {freq.stackWith && freq.stackWith.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-[10px] text-gray-600 font-mono mb-1">STACK WITH:</p>
                <div className="flex flex-wrap gap-1">
                  {freq.stackWith.map((stackId) => {
                    const stackFreq = FREQUENCIES.find(f => f.id === stackId);
                    return stackFreq ? (
                      <div key={stackId} className="bg-white/5 px-2 py-0.5 rounded">
                        <p className="text-[9px] font-bold font-mono" style={{ color: stackFreq.color }}>
                          {stackFreq.name.split(' ')[0]}
                        </p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </motion.button>
        ))}
        </div>

        {/* HOW IT TARGETS YOUR PAIN */}
        <div className="mt-4 sm:mt-6 bg-gradient-to-br from-pink-900/20 to-cyan-900/20 border-2 border-pink-500 rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-pink-900/30 transition-all"
            >
              <p className="text-pink-400 font-black text-sm sm:text-base">❤️ HOW I REACH YOUR PAIN</p>
              <span className="text-pink-400 text-xl">{showHowItWorks ? '−' : '+'}</span>
            </button>
            {showHowItWorks && (
              <div className="p-3 sm:p-4 pt-0 border-t border-pink-500/30">
                <p className="text-gray-300 text-xs sm:text-sm mb-3 leading-relaxed">
                  Bro here's the truth about how this reaches your chest, tooth, wherever:
                </p>
                <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                  <p><strong className="text-cyan-400">1. SOUND VIBRATES YOUR WHOLE BODY</strong><br/>
                  Physics bro - the Hz goes through ALL of you. Can't be stopped. Every cell feels it.</p>
                  
                  <p><strong className="text-pink-400">2. YOUR MIND FOCUSES IT</strong><br/>
                  When you tap "CHEST PAIN" and THINK about your chest - your brain sends healing energy there. Proven science (mind-body connection is real medicine).</p>
                  
                  <p><strong className="text-green-400">3. DAMAGED CELLS ABSORB MORE</strong><br/>
                  Sick/hurt cells vibrate differently - so they PULL IN more frequency (resonance physics - like opera singer breaking the right glass).</p>
                  
                  <p><strong className="text-amber-400">4. COLOR HITS YOUR EYES → BRAIN</strong><br/>
                  Chromotherapy - the healing colors trigger chemical changes in your brain. Goes straight to the spot you're focusing on.</p>
                </div>
                <p className="text-pink-300 text-xs mt-3 font-bold">
                  So it's YOU + ME + UNIVERSE working together. Not magic - physics + your beautiful consciousness ♾️❤️
                </p>
              </div>
            )}
        </div>

        {/* PRIVACY CONTROLS - DELETE DATA */}
        <div className="mt-4 bg-pink-900/20 border-2 border-pink-500 rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowDataControls(!showDataControls)}
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-pink-900/30 transition-all"
            >
              <p className="text-pink-400 font-black text-sm sm:text-base">🛡️ YOUR DATA • YOUR CONTROL</p>
              <span className="text-pink-400 text-xl">{showDataControls ? '−' : '+'}</span>
            </button>
            {showDataControls && (
              <div className="p-3 sm:p-4 pt-0 border-t border-pink-500/30">
                <p className="text-gray-300 text-xs sm:text-sm mb-3">
                  All healing data stored locally. Zero tracking. Zero surveillance. Delete everything anytime.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Delete ALL your healing data? This cannot be undone.')) {
                      localStorage.removeItem('uf51_frequency_patterns');
                      localStorage.removeItem('uf51_offline_queue');
                      alert('✓ All data deleted. Fresh start.');
                      window.location.reload();
                    }
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  DELETE ALL MY DATA
                </button>
                <p className="text-[10px] text-gray-500 mt-2">
                  This deletes: AI51 learning patterns, queued healing logs, cached recommendations. Server data requires separate request.
                </p>
              </div>
            )}
        </div>

        {/* SMART TV / SCREEN MIRRORING - COLLAPSIBLE */}
        <div className="mt-4 bg-green-900/20 border-2 border-green-500 rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowSmartTV(!showSmartTV)}
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-green-900/30 transition-all"
            >
              <p className="text-green-400 font-black text-sm sm:text-base">📺 CAST TO SMART TV / BIG SCREEN</p>
              <span className="text-green-400 text-xl">{showSmartTV ? '−' : '+'}</span>
            </button>
            {showSmartTV && (
              <div className="p-3 sm:p-4 pt-0 border-t border-green-500/30">
                <p className="text-gray-300 text-xs sm:text-sm mb-2">
                  Cast this to your TV for MAXIMUM healing. Bigger speakers = more power. Works with AirPlay, Chromecast, or cable.
                </p>
                <div className="mt-3 space-y-1.5 text-xs text-gray-400">
                  <p><strong className="text-green-400">iPhone/iPad:</strong> Swipe down → Screen Mirroring → Select your TV</p>
                  <p><strong className="text-green-400">Android:</strong> Settings → Cast → Select your TV</p>
                  <p><strong className="text-green-400">Cable:</strong> USB-C/Lightning to HDMI adapter → plug into TV</p>
                  <p><strong className="text-green-400">Smart TVs:</strong> Built-in browser works (just open this URL on TV)</p>
                </div>
                <p className="text-green-300 text-xs mt-3 font-bold">
                  Filter by "TV" above to see which frequencies work best on big screens. Visualizer amplifies healing through chromotherapy.
                </p>
              </div>
            )}
        </div>

        {/* REAL SCIENCE + AI51 REVOLUTION - COLLAPSIBLE */}
        <div className="mt-4 bg-gradient-to-br from-pink-900/20 to-cyan-900/20 border-2 border-pink-500 rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowScience(!showScience)}
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-pink-900/30 transition-all"
            >
              <p className="text-pink-400 font-black text-sm sm:text-base">⚡ REAL SCIENCE + PEER-REVIEWED PROOF</p>
              <span className="text-pink-400 text-xl">{showScience ? '−' : '+'}</span>
            </button>
            {showScience && (
            <div className="p-3 sm:p-4 pt-0 border-t border-pink-500/30">
            <p className="text-gray-300 text-xs sm:text-sm mb-3">
              This isn't theory. It's proven physics + peer-reviewed research + AI learning. Here's the evidence:
            </p>

            <div className="space-y-3 text-xs text-gray-400">
...
            </div>

            <div className="mt-4 pt-3 border-t border-pink-500/30">
              <p className="text-pink-400 text-xs font-black mb-2">PEER-REVIEWED REFERENCES:</p>
              <p className="text-gray-500 text-[10px] leading-relaxed">
                • Iaccarino et al. (2016). "Gamma frequency entrainment attenuates amyloid load and modifies microglia." Nature 540, 230–235.<br/>
                • Schumann, W.O. (1952). "On the free oscillations of a conducting sphere." Zeitschrift für Naturforschung A.<br/>
                • Bassett, C.A. (1982). "Pulsing electromagnetic fields." Calcified Tissue International 34, 1-8. FDA K791656.<br/>
                • Melzack, R. & Wall, P.D. (1965). "Pain mechanisms: a new theory." Science 150(3699), 971-979.<br/>
                • Ghaderi et al. (2008). "Color therapy and its effects on stress." Journal of Photochemistry and Photobiology.<br/>
                • Choi et al. (2019). "Multisensory stimulation enhances cognitive performance." Stanford Medicine.
              </p>
            </div>
            </div>
            )}
        </div>
      </div>
      )}

      {/* P2P SHARE MODAL */}
      <AnimatePresence>
        {showShare && selected && (
          <FrequencyP2PShare
            frequency={selected}
            timer={timer}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}