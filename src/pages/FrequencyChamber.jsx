import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Brain, Zap, Shield, Wind, Sun, Volume2, VolumeX, Clock, Info, X, Camera, Activity, Ear, Share2, Music } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKBrain, COOLASFUCKHeart, COOLASFUCKMoon, COOLASFUCKShield } from '@/components/shared/COOLASFUCKIcon';
import BiometricHealing from '@/components/radio/BiometricHealing';

/**
 * UF51 FREQUENCY CHAMBER
 * Evidence-based healing frequencies - zero boggle factor
 */

// === PROTOCOL DEFINITIONS - ORGANIZED BY HEALING CATEGORY ===
const PROTOCOL_SECTIONS = [
  {
    id: 'mental',
    name: 'MENTAL HEALTH',
    color: '#22d3ee',
    description: 'Anxiety, depression, PTSD, ADHD',
    protocols: ['anxiety', 'depression', 'trauma', 'focus']
  },
  {
    id: 'addiction',
    name: 'ADDICTION & COMPULSION',
    color: '#f59e0b',
    description: 'Cravings, impulse control',
    protocols: ['addiction', 'emotional_eating']
  },
  {
    id: 'physical',
    name: 'PHYSICAL HEALING',
    color: '#ef4444',
    description: 'Pain, immunity, vitality, tinnitus',
    protocols: ['pain', 'tinnitus', 'immune', 'menopause']
  },
  {
    id: 'rest',
    name: 'REST & RECOVERY',
    color: '#8b5cf6',
    description: 'Sleep, energy, burnout',
    protocols: ['sleep', 'morning', 'burnout']
  },
  {
    id: 'emotional',
    name: 'EMOTIONAL HEALING',
    color: '#ec4899',
    description: 'Grief, anger, self-compassion',
    protocols: ['grief', 'anger']
  }
];

const PROTOCOLS = {
  anxiety: {
    id: 'anxiety',
    name: 'Anxiety Relief',
    icon: Shield,
    color: '#8B5CF6',
    description: 'Activates parasympathetic nervous system',
    science: 'Alpha waves (10Hz) + slow breathing (0.1Hz) proven to reduce cortisol and activate vagal tone',
    sources: ['HeartMath Institute', 'Porges Polyvagal Theory'],
    ancientWisdom: 'This 10Hz frequency matches Tibetan singing bowls used for 2,500+ years. The breathing pattern is pranayama from Vedic tradition.',
    config: {
      primary: 10,
      secondary: 7.83,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.08,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  sleep: {
    id: 'sleep',
    name: 'Deep Sleep',
    icon: Moon,
    color: '#3B82F6',
    description: 'Delta waves for restorative sleep',
    science: 'Delta (2Hz) + pink noise enhances slow-wave sleep and memory consolidation',
    sources: ['Northwestern University, Nature 2017', 'Sleep Research Society'],
    ancientWisdom: 'Delta rhythms mirror the drumming patterns of indigenous sleep ceremonies.',
    config: {
      primary: 2,
      secondary: 0.5,
      carrier: 100,
      breathRate: 4,
      noiseType: 'pink',
      noiseLevel: 0.15
    }
  },
  focus: {
    id: 'focus',
    name: 'Focus & Flow (ADHD)',
    icon: Brain,
    color: '#10B981',
    description: '40Hz gamma for focus, clarity, ADHD support',
    science: 'MIT research shows 40Hz entrainment increases neuroplasticity, clears brain inflammation, and improves attention span',
    sources: ['MIT Tsai Lab, Nature 2016-2023', 'ADHD gamma wave studies'],
    ancientWisdom: '40Hz is the frequency Buddhist monks reach during deep meditation - pure focus.',
    config: {
      primary: 40,
      secondary: 14,
      carrier: 400,
      breathRate: 12,
      noiseType: 'brown',
      noiseLevel: 0.05
    }
  },
  trauma: {
    id: 'trauma',
    name: 'PTSD & Trauma',
    icon: Shield,
    color: '#06B6D4',
    description: 'Vagal toning for nervous system reset',
    science: 'Bilateral stimulation + theta waves used in EMDR and somatic therapies',
    sources: ['Porges Polyvagal Theory', 'Van der Kolk trauma research'],
    ancientWisdom: 'Bilateral stimulation mirrors shamanic drumming traditions.',
    config: {
      primary: 6,
      secondary: 7.83,
      carrier: 150,
      breathRate: 5,
      noiseType: 'pink',
      noiseLevel: 0.1,
      bilateral: true,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  pain: {
    id: 'pain',
    name: 'Pain Management',
    icon: Zap,
    color: '#F59E0B',
    description: 'Endorphin release through specific frequencies',
    science: 'Low-frequency stimulation (2-4Hz) triggers endogenous opioid release',
    sources: ['Gate Control Theory', 'TENS research meta-analysis'],
    ancientWisdom: 'Acupuncture points vibrate at 2-4Hz when stimulated.',
    config: {
      primary: 4,
      secondary: 10,
      carrier: 180,
      breathRate: 6,
      noiseType: 'brown',
      noiseLevel: 0.12,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  morning: {
    id: 'morning',
    name: 'Morning Energize',
    icon: Sun,
    color: '#F97316',
    description: 'Beta/Gamma activation for alertness',
    science: 'Higher frequencies (15-40Hz) increase alertness and cognitive performance',
    sources: ['Chronobiology research', 'Nobel Prize 2017 circadian rhythms'],
    ancientWisdom: 'Dawn chanting in every temple tradition uses rising tones.',
    config: {
      primary: 20,
      secondary: 40,
      carrier: 300,
      breathRate: 15,
      noiseType: 'white',
      noiseLevel: 0.03
    }
  },
  tinnitus: {
    id: 'tinnitus',
    name: 'Tinnitus Relief',
    icon: Ear,
    color: '#06B6D4',
    description: 'Phase-inverted sweep cancellation',
    science: 'Destructive interference + notch-filtered pink noise retrains auditory cortex',
    sources: ['Acoustic neuroscience', 'Notched sound therapy research'],
    ancientWisdom: 'The Schumann resonance (7.83Hz) calms the overactive auditory cortex.',
    config: {
      primary: 7.83,
      secondary: 200,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.15,
      tinnitusSweep: true
    }
  },
  depression: {
    id: 'depression',
    name: 'Depression Relief',
    icon: Heart,
    color: '#14B8A6',
    description: 'Serotonin boost via alpha-theta',
    science: '10Hz alpha + 6Hz theta proven to increase serotonin and reduce depressive symptoms',
    sources: ['Alpha-theta neurofeedback research', 'Harvard Medical School mood studies'],
    ancientWisdom: 'This frequency range matches the chanting rhythms used in depression healing ceremonies across indigenous cultures.',
    config: {
      primary: 10,
      secondary: 6,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.1,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  addiction: {
    id: 'addiction',
    name: 'Addiction Support',
    icon: Shield,
    color: '#F59E0B',
    description: 'Craving reduction & reset',
    science: '2Hz delta + 7.83Hz Schumann resonance shown to reduce cravings and support dopamine regulation',
    sources: ['Addiction neuroscience research', 'Delta wave therapy studies'],
    ancientWisdom: 'Sacred plant medicine ceremonies use 2-4Hz drumming for addiction recovery and neural reset.',
    config: {
      primary: 2,
      secondary: 7.83,
      carrier: 150,
      breathRate: 5,
      noiseType: 'brown',
      noiseLevel: 0.12,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  burnout: {
    id: 'burnout',
    name: 'Burnout Recovery',
    icon: Sun,
    color: '#8B5CF6',
    description: 'Parasympathetic restoration',
    science: '8Hz alpha + vagal activation proven to restore nervous system balance and reduce cortisol',
    sources: ['Burnout recovery research', 'Parasympathetic nervous system studies'],
    ancientWisdom: '8Hz is the frequency of deep rest states in traditional healing practices worldwide.',
    config: {
      primary: 8,
      secondary: 7.83,
      carrier: 180,
      breathRate: 5,
      noiseType: 'pink',
      noiseLevel: 0.1,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  immune: {
    id: 'immune',
    name: 'Immune Boost',
    icon: Shield,
    color: '#22C55E',
    description: 'Natural killer cell activation',
    science: '7.83Hz Schumann + 111Hz proven to increase white blood cell production and reduce inflammation',
    sources: ['Psychoneuroimmunology research', 'Frequency therapy immune studies'],
    ancientWisdom: '111Hz is the resonant frequency found in sacred healing sites worldwide - Malta temples, Newgrange, Egyptian pyramids.',
    config: {
      primary: 7.83,
      secondary: 111,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.1,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  emotional_eating: {
    id: 'emotional_eating',
    name: 'Emotional Eating',
    icon: Heart,
    color: '#F59E0B',
    description: 'Impulse control & emotional regulation',
    science: '10Hz alpha + 4Hz theta proven to reduce compulsive eating and regulate appetite hormones',
    sources: ['Eating disorder neurofeedback studies', 'Impulse control research'],
    ancientWisdom: 'Fasting traditions worldwide use meditation at these frequencies to master hunger and emotional balance.',
    config: {
      primary: 10,
      secondary: 4,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.1,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  grief: {
    id: 'grief',
    name: 'Grief & Loss',
    icon: Heart,
    color: '#EC4899',
    description: 'Heart healing for loss & heartbreak',
    science: '6Hz theta + heart coherence breathing proven to process grief and reduce emotional pain',
    sources: ['Grief neuroscience research', 'Theta wave emotional processing studies'],
    ancientWisdom: 'Mourning ceremonies worldwide use 6Hz drumming and chanting to release grief from the body.',
    config: {
      primary: 6,
      secondary: 7.83,
      carrier: 200,
      breathRate: 5,
      noiseType: 'pink',
      noiseLevel: 0.12,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  anger: {
    id: 'anger',
    name: 'Anger & Rage',
    icon: Zap,
    color: '#F97316',
    description: 'Transmute fire into calm power',
    science: '9Hz alpha + slow breathing proven to reduce aggression and activate prefrontal cortex for impulse control',
    sources: ['Anger management neurofeedback', 'Aggression reduction studies'],
    ancientWisdom: 'Warrior cultures use 9Hz chanting and controlled breathing to channel rage into focused strength without violence.',
    config: {
      primary: 9,
      secondary: 7.83,
      carrier: 200,
      breathRate: 4,
      noiseType: 'brown',
      noiseLevel: 0.15,
      isBinaural: true,
      visualEntrainment: true
    }
  },
  menopause: {
    id: 'menopause',
    name: 'Balance & Flow',
    icon: Sun,
    color: '#F97316',
    description: 'Natural vitality as you age',
    science: '10Hz alpha + 7.83Hz Schumann proven to regulate autonomic nervous system, reducing hot flushes and supporting healthy blood flow',
    sources: ['Autonomic regulation research', 'Healthy aging studies'],
    ancientWisdom: 'Elders in traditional cultures use breathwork and earth frequencies to age with grace, strength and vitality.',
    config: {
      primary: 10,
      secondary: 7.83,
      carrier: 200,
      breathRate: 6,
      noiseType: 'pink',
      noiseLevel: 0.1,
      isBinaural: true,
      visualEntrainment: true
    }
  }
};

// === 8-BIT PIXEL ART ICON COMPONENT ===
const PixelIcon = ({ icon: Icon, color, size = 48, animate = false }) => (
  <div 
    className="relative"
    style={{ filter: `drop-shadow(0 0 ${animate ? '15px' : '8px'} ${color}50)` }}
  >
    <Icon size={size} color={color} strokeWidth={2.5} className={animate ? 'animate-pulse' : ''} />
  </div>
);

// === BREATHING PACER COMPONENT ===
const BreathingPacer = ({ breathRate, isActive, color }) => {
  const [phase, setPhase] = useState(0);
  const [instruction, setInstruction] = useState('BREATHE IN');
  
  useEffect(() => {
    if (!isActive) return;
    
    const cycleDuration = 60 / breathRate;
    let startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const cyclePos = elapsed % cycleDuration;
      const cycleProgress = cyclePos / cycleDuration;
      const smoothPhase = (Math.sin(cycleProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      setPhase(smoothPhase);

      // Natural breathing cycle: IN → HOLD TOP → OUT → REST BOTTOM
      if (cycleProgress < 0.4) {
        setInstruction('BREATHE IN');
      } else if (cycleProgress < 0.5) {
        setInstruction('HOLD');
      } else if (cycleProgress < 0.9) {
        setInstruction('BREATHE OUT');
      } else {
        setInstruction('REST');
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [isActive, breathRate]);
  
  if (!isActive) return null;
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="rounded-full border-4 transition-all duration-300 flex items-center justify-center"
        style={{
          width: 80 + phase * 60,
          height: 80 + phase * 60,
          borderColor: color,
          backgroundColor: `${color}20`,
          boxShadow: `0 0 ${20 + phase * 30}px ${color}40`
        }}
      >
        <Wind size={32 + phase * 16} color={color} className="transition-all duration-300" />
      </div>
      <p className="text-lg font-mono font-bold tracking-widest" style={{ color }}>
        {instruction}
      </p>
    </div>
  );
};

// === HRV BIOFEEDBACK COMPONENT ===
const HRVBiofeedback = ({ isActive, onHRVUpdate, color }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [bpm, setBpm] = useState(null);
  const [coherence, setCoherence] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const samplesRef = useRef([]);
  const lastBeatRef = useRef(null);
  const beatsRef = useRef([]);
  
  useEffect(() => {
    if (!isActive) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      setBpm(null);
      setCoherence(null);
      setIsCalibrating(true);
      samplesRef.current = [];
      beatsRef.current = [];
      return;
    }
    
    let animationId;
    let stream;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 64 }, height: { ideal: 64 } }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities?.();
          if (capabilities?.torch) {
            await track.applyConstraints({ advanced: [{ torch: true }] });
          }
          
          setTimeout(() => setIsCalibrating(false), 3000);
          analyzeFrame();
        }
      } catch (err) {
        setCameraError('Cover camera with finger for pulse reading');
      }
    };
    
    const analyzeFrame = () => {
      if (!videoRef.current || !canvasRef.current || !isActive) return;
      
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 64, 64);
      const frame = ctx.getImageData(0, 0, 64, 64);
      
      let redSum = 0;
      for (let i = 0; i < frame.data.length; i += 4) {
        redSum += frame.data[i];
      }
      const redAvg = redSum / (frame.data.length / 4);
      
      samplesRef.current.push({ time: Date.now(), value: redAvg });
      const now = Date.now();
      samplesRef.current = samplesRef.current.filter(s => now - s.time < 5000);
      
      if (samplesRef.current.length > 30) {
        const recent = samplesRef.current.slice(-30);
        const values = recent.map(s => s.value);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const current = values[values.length - 1];
        const prev = values[values.length - 2];
        const prevPrev = values[values.length - 3] || prev;
        
        if (prev > prevPrev && prev > current && prev > avg * 1.01) {
          const beatTime = recent[recent.length - 2].time;
          if (!lastBeatRef.current || beatTime - lastBeatRef.current > 400) {
            beatsRef.current.push(beatTime);
            lastBeatRef.current = beatTime;
            beatsRef.current = beatsRef.current.slice(-10);
            
            if (beatsRef.current.length >= 3) {
              const intervals = [];
              for (let i = 1; i < beatsRef.current.length; i++) {
                intervals.push(beatsRef.current[i] - beatsRef.current[i - 1]);
              }
              const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
              const calculatedBpm = Math.round(60000 / avgInterval);
              
              if (calculatedBpm >= 40 && calculatedBpm <= 180) {
                setBpm(calculatedBpm);
                const variance = intervals.reduce((sum, i) => sum + Math.pow(i - avgInterval, 2), 0) / intervals.length;
                const stdDev = Math.sqrt(variance);
                const coherenceScore = Math.max(0, Math.min(100, 100 - (stdDev / 10)));
                setCoherence(Math.round(coherenceScore));
                onHRVUpdate?.({ bpm: calculatedBpm, coherence: coherenceScore });
              }
            }
          }
        }
      }
      
      animationId = requestAnimationFrame(analyzeFrame);
    };
    
    startCamera();
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [isActive, onHRVUpdate]);
  
  if (!isActive) return null;
  
  return (
    <div className="bg-black/60 border-2 rounded-xl p-4 mb-6" style={{ borderColor: color }}>
      <div className="flex items-center gap-3 mb-3">
        <Activity className="w-5 h-5" style={{ color }} />
        <p className="font-mono font-bold text-sm" style={{ color }}>HRV BIOFEEDBACK</p>
        <span className="text-xs text-gray-500">(Cover camera with finger)</span>
      </div>
      
      <video ref={videoRef} className="hidden" playsInline muted />
      <canvas ref={canvasRef} width={64} height={64} className="hidden" />
      
      {cameraError ? (
        <p className="text-amber-400 text-sm">{cameraError}</p>
      ) : isCalibrating ? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <p className="text-gray-400 text-sm">Calibrating... place finger over camera</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
            <p className="text-gray-500 text-xs font-mono">HEART RATE</p>
            <p className="text-3xl font-black font-mono" style={{ color }}>
              {bpm || '--'} <span className="text-sm">BPM</span>
            </p>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
            <p className="text-gray-500 text-xs font-mono">COHERENCE</p>
            <p className="text-3xl font-black font-mono" style={{ 
              color: coherence > 70 ? '#22c55e' : coherence > 40 ? '#eab308' : '#ef4444' 
            }}>
              {coherence || '--'}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// === EVIDENCE MODAL - FULL SCIENCE ===
const EvidenceModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/95 z-[9999] overflow-y-scroll" onClick={onClose}>
    <div className="min-h-screen p-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-black border-4 border-cyan-500 p-4 max-w-2xl mx-auto"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4 sticky top-0 bg-black pb-2 border-b-2 border-cyan-500/30">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-black font-mono text-cyan-400">THE SCIENCE</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white -mt-1">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4">
          {/* MIT RESEARCH */}
          <div className="bg-black border-2 border-green-500/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <COOLASFUCKBrain size={20} animate={false} />
              <h4 className="text-green-400 font-black font-mono text-sm">MIT RESEARCH • 40Hz GAMMA</h4>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <p><strong className="text-white">What it does:</strong> 40Hz gamma waves increase neuroplasticity (brain's ability to rewire itself) and reduce inflammation in the brain.</p>
              <p><strong className="text-white">The studies:</strong> MIT Tsai Lab published in Nature (2016-2023) showing 40Hz light/sound reduces Alzheimer's markers and improves memory.</p>
              <p><strong className="text-white">Why it works:</strong> Gamma oscillations synchronize neurons, clearing toxic proteins and enhancing cognitive function.</p>
              <p className="text-cyan-400 text-xs font-mono">Source: Nature, MIT Picower Institute</p>
            </div>
          </div>

          {/* HEARTMATH */}
          <div className="bg-black border-2 border-pink-500/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <COOLASFUCKHeart size={20} animate={false} />
              <h4 className="text-pink-400 font-black font-mono text-sm">HEARTMATH • VAGAL TONE</h4>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <p><strong className="text-white">What it does:</strong> 10Hz alpha waves + slow breathing (6 breaths/min) activates your vagus nerve, reducing stress hormones.</p>
              <p><strong className="text-white">What's "vagal"?</strong> The vagus nerve is your body's natural calming system - like a reset button for anxiety. It controls your heart rate, digestion, and stress response.</p>
              <p><strong className="text-white">The studies:</strong> HeartMath Institute research shows coherent breathing at 0.1Hz (6 breaths/min) maximizes heart rate variability (HRV) - a key marker of nervous system health.</p>
              <p><strong className="text-white">Why it works:</strong> Slow breathing synchronizes your heart and brain rhythms, triggering the parasympathetic nervous system (rest & digest mode).</p>
              <p className="text-cyan-400 text-xs font-mono">Source: HeartMath Institute, Porges Polyvagal Theory</p>
            </div>
          </div>

          {/* SLEEP SCIENCE */}
          <div className="bg-black border-2 border-purple-500/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <COOLASFUCKMoon size={20} animate={false} />
              <h4 className="text-purple-400 font-black font-mono text-sm">SLEEP SCIENCE • DELTA WAVES</h4>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <p><strong className="text-white">What it does:</strong> 2Hz delta waves + pink noise enhance deep sleep (slow-wave sleep) where your brain consolidates memories and repairs tissue.</p>
              <p><strong className="text-white">What's "delta"?</strong> Delta waves (0.5-4Hz) are the slowest brain waves, only present in deep sleep. They're essential for physical restoration and memory.</p>
              <p><strong className="text-white">The studies:</strong> Northwestern University (Nature, 2017) found pink noise synchronized with delta waves increased deep sleep by 75% and improved memory by 2x.</p>
              <p><strong className="text-white">Why it works:</strong> Pink noise mimics natural sounds (rain, wind) that our brains evolved to find calming. Delta entrainment guides your brain into deep sleep states.</p>
              <p className="text-cyan-400 text-xs font-mono">Source: Nature, Northwestern University, Sleep Research Society</p>
            </div>
          </div>

          {/* ANCIENT WISDOM */}
          <div className="bg-black border-2 border-amber-500/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <COOLASFUCKShield size={20} animate={false} />
              <h4 className="text-amber-400 font-black font-mono text-sm">ANCIENT WISDOM • 2,500+ YEARS</h4>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <p><strong className="text-white">Tibetan singing bowls:</strong> Used for 2,500+ years in meditation, these bowls naturally produce frequencies around 10Hz (alpha waves) - same as our anxiety protocol.</p>
              <p><strong className="text-white">Buddhist meditation:</strong> Brain scans of monks show they naturally enter 40Hz gamma states during deep meditation - the same frequency MIT proved reduces brain inflammation.</p>
              <p><strong className="text-white">Shamanic drumming:</strong> Indigenous traditions worldwide use 4-7Hz drumming (theta waves) for healing ceremonies - same range as our trauma protocol.</p>
              <p><strong className="text-white">Why it matters:</strong> These traditions discovered through experience what science now proves with instruments. The frequencies work because they're tuned to our nervous system.</p>
              <p className="text-cyan-400 text-xs font-mono">Sources: Ethnomusicology journals, neuroscience of meditation</p>
            </div>
          </div>

          {/* HOW TO USE */}
          <div className="bg-cyan-900/20 border-2 border-cyan-500/50 p-3 mb-8">
            <h4 className="text-cyan-400 font-black font-mono text-sm mb-2">HOW TO USE THIS</h4>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Start with 10-15 minutes daily</li>
              <li>• Use headphones for best results</li>
              <li>• Follow the breathing pacer</li>
              <li>• Consistency matters more than duration</li>
              <li>• Trust the process - effects build over time</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// === INFO MODAL ===
const InfoModal = ({ protocol, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto"
    onClick={onClose}
  >
    <div className="min-h-screen flex items-center justify-center p-4 py-20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-black border-4 p-6 max-w-md w-full"
        style={{ borderColor: protocol.color }}
      >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <PixelIcon icon={protocol.icon} color={protocol.color} size={32} />
          <h3 className="text-xl font-black text-white">{protocol.name}</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-xs font-mono mb-1">THE SCIENCE:</p>
          <p className="text-white text-sm">{protocol.science}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-xs font-mono mb-1">SOURCES:</p>
          <ul className="space-y-1">
            {protocol.sources.map((source, i) => (
              <li key={i} className="text-cyan-400 text-sm font-mono">• {source}</li>
            ))}
          </ul>
        </div>
        
        {protocol.ancientWisdom && (
          <div>
            <p className="text-gray-400 text-xs font-mono mb-1">ANCIENT WISDOM:</p>
            <p className="text-amber-400 text-sm italic">{protocol.ancientWisdom}</p>
          </div>
        )}
        
        <div>
          <p className="text-gray-400 text-xs font-mono mb-1">FREQUENCIES:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white/5 p-2 border border-white/10">
              <span className="text-gray-400">Primary:</span>
              <span className="text-white font-mono ml-2">{protocol.config.primary}Hz</span>
            </div>
            <div className="bg-white/5 p-2 border border-white/10">
              <span className="text-gray-400">Secondary:</span>
              <span className="text-white font-mono ml-2">{protocol.config.secondary}Hz</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  </motion.div>
);

// === MAIN COMPONENT ===
export default function FrequencyChamber() {
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showInfo, setShowInfo] = useState(null);
    const [showEvidenceModal, setShowEvidenceModal] = useState(false);
    const [currentHz, setCurrentHz] = useState(0);
    const [sessionTime, setSessionTime] = useState(0);
    const [hrvEnabled, setHrvEnabled] = useState(false);
    const [currentHRV, setCurrentHRV] = useState(null);
    const [hasHeadphones, setHasHeadphones] = useState(false);
    const [showHeadphonePrompt, setShowHeadphonePrompt] = useState(false);
    const [visualEntrainment, setVisualEntrainment] = useState(true);
    const [breathHapticActive, setBreathHapticActive] = useState(true);

    // SEO
    useEffect(() => {
        document.title = 'Free Healing Frequencies | UF51 Frequency Chamber';
        const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = 'Evidence-based healing frequencies for anxiety, sleep, focus, pain relief. MIT research, zero pseudo-science. Free forever.';
        if (!metaDesc.parentNode) document.head.appendChild(metaDesc);

        const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Free Healing Frequencies - UF51';
        if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

        const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        ogDesc.content = 'Evidence-based sound therapy for anxiety, sleep, focus, pain. Free forever. No ads. No extraction.';
        if (!ogDesc.parentNode) document.head.appendChild(ogDesc);
    }, []);
  
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const masterGainRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const breathHapticIntervalRef = useRef(null);
  const visualEntrainmentIntervalRef = useRef(null);
  
  const getTimeSuggestion = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return 'morning';
    if (hour >= 9 && hour < 17) return 'focus';
    if (hour >= 17 && hour < 21) return 'anxiety';
    return 'sleep';
  };
  
  const [suggestedProtocol] = useState(getTimeSuggestion());
  
  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.1);
    }
  }, [volume]);
  
  // Detect headphones
  useEffect(() => {
    const detectHeadphones = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputs = devices.filter(d => d.kind === 'audiooutput');
        const hasHeadphoneDevice = audioOutputs.some(d => 
          d.label.toLowerCase().includes('headphone') || 
          d.label.toLowerCase().includes('headset') ||
          d.label.toLowerCase().includes('airpod') ||
          d.label.toLowerCase().includes('earbud')
        );
        setHasHeadphones(hasHeadphoneDevice);
      } catch (e) {
        // Can't detect, assume no headphones
        setHasHeadphones(false);
      }
    };
    detectHeadphones();
  }, []);
  
  // Start audio
  const startAudio = async (protocol) => {
    try {
      // Warn about headphones for binaural but don't block
      if (protocol.config.isBinaural && !hasHeadphones) {
        setShowHeadphonePrompt(true);
      }
      
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;
      
      const nodes = [];
      const config = protocol.config;
      
      // PRIMARY FREQUENCY - Binaural or Isochronic
      if (config.isBinaural) {
        // BINAURAL BEATS - Left/Right ear different frequencies
        const leftOsc = ctx.createOscillator();
        const rightOsc = ctx.createOscillator();
        const leftGain = ctx.createGain();
        const rightGain = ctx.createGain();
        const merger = ctx.createChannelMerger(2);
        
        leftOsc.type = 'sine';
        rightOsc.type = 'sine';
        leftOsc.frequency.value = config.carrier;
        rightOsc.frequency.value = config.carrier + config.primary;
        
        leftGain.gain.value = 0.25;
        rightGain.gain.value = 0.25;
        
        leftOsc.connect(leftGain);
        rightOsc.connect(rightGain);
        leftGain.connect(merger, 0, 0);
        rightGain.connect(merger, 0, 1);
        merger.connect(masterGain);
        
        leftOsc.start();
        rightOsc.start();
        nodes.push(leftOsc, rightOsc, leftGain, rightGain, merger);
      } else {
        // ISOCHRONIC TONES - Pulsing on/off
        const primaryOsc = ctx.createOscillator();
        primaryOsc.type = 'sine';
        primaryOsc.frequency.value = config.carrier;
        
        const primaryGain = ctx.createGain();
        primaryGain.gain.value = 0;
        
        primaryOsc.connect(primaryGain);
        primaryGain.connect(masterGain);
        primaryOsc.start();
        nodes.push(primaryOsc, primaryGain);
        
        const modulateIsochronic = () => {
          const now = ctx.currentTime;
          const period = 1 / config.primary;
          for (let i = 0; i < 100; i++) {
            primaryGain.gain.setValueAtTime(0.3, now + i * period);
            primaryGain.gain.setValueAtTime(0, now + i * period + period * 0.5);
          }
        };
        modulateIsochronic();
        const isochronicInterval = setInterval(modulateIsochronic, 10000);
        nodes.push({ stop: () => clearInterval(isochronicInterval) });
      }
      
      // SECONDARY & HARMONIC FREQUENCIES - Richer stack
      const harmonics = [config.secondary, config.secondary * 1.5, config.secondary * 2];
      harmonics.forEach((harmonic, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = config.carrier + harmonic;
        
        const gain = ctx.createGain();
        gain.gain.value = 0.15 / (i + 1); // Decreasing volume for higher harmonics
        
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        nodes.push(osc, gain);
      });
      
      // AMBIENT BED
      const ambientNodes = [];
      const baseFreq = config.carrier * 0.5;
      
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = baseFreq + (Math.random() - 0.5) * 15;
        
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05 + Math.random() * 0.1;
        
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 2;
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        const gain = ctx.createGain();
        gain.gain.value = config.noiseLevel * 0.25;
        
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        lfo.start();
        
        ambientNodes.push(osc, lfo, lfoGain, gain);
      }
      
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.value = 55;
      const subGain = ctx.createGain();
      subGain.gain.value = config.noiseLevel * 0.15;
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();
      ambientNodes.push(subOsc, subGain);
      
      nodes.push(...ambientNodes);
      
      // TINNITUS SWEEP
      if (config.tinnitusSweep) {
        const sweepOsc = ctx.createOscillator();
        sweepOsc.type = 'sine';
        sweepOsc.frequency.value = 500;
        
        const invertedOsc = ctx.createOscillator();
        invertedOsc.type = 'sine';
        invertedOsc.frequency.value = 500;
        
        const sweepGain = ctx.createGain();
        sweepGain.gain.value = 0.3;
        
        const invertedGain = ctx.createGain();
        invertedGain.gain.value = -0.3;
        
        sweepOsc.connect(sweepGain);
        invertedOsc.connect(invertedGain);
        sweepGain.connect(masterGain);
        invertedGain.connect(masterGain);
        sweepOsc.start();
        invertedOsc.start();
        
        let sweepDir = 1;
        let sweepStart = Date.now();
        const sweepInterval = setInterval(() => {
          const elapsed = (Date.now() - sweepStart) / 1000;
          let t = Math.min(elapsed / 30, 1);
          if (t >= 1) { sweepStart = Date.now(); sweepDir *= -1; t = 0; }
          const progress = sweepDir === 1 ? t : 1 - t;
          const hz = 500 * Math.pow(14000 / 500, progress);
          sweepOsc.frequency.setTargetAtTime(hz, ctx.currentTime, 0.1);
          invertedOsc.frequency.setTargetAtTime(hz, ctx.currentTime, 0.1);
          setCurrentHz(Math.round(hz));
        }, 50);
        
        nodes.push(sweepOsc, invertedOsc, sweepGain, invertedGain, { stop: () => clearInterval(sweepInterval) });
      }
      
      // BILATERAL STIMULATION
      if (config.bilateral) {
        const pannerL = ctx.createStereoPanner();
        pannerL.pan.value = -1;
        
        const bilateralOsc = ctx.createOscillator();
        bilateralOsc.type = 'sine';
        bilateralOsc.frequency.value = 200;
        
        const bilateralGain = ctx.createGain();
        bilateralGain.gain.value = 0.1;
        
        const panInterval = setInterval(() => {
          const pan = Math.sin(Date.now() / 500);
          pannerL.pan.setValueAtTime(pan, ctx.currentTime);
        }, 50);
        
        bilateralOsc.connect(bilateralGain);
        bilateralGain.connect(pannerL);
        pannerL.connect(masterGain);
        bilateralOsc.start();
        nodes.push(bilateralOsc, bilateralGain, pannerL, { stop: () => clearInterval(panInterval) });
      }
      
      const displayInterval = setInterval(() => {
        setCurrentHz(config.primary);
      }, 100);
      
      nodesRef.current = [...nodes, 
        { stop: () => clearInterval(displayInterval) }
      ];
      
      setSessionTime(0);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(t => t + 1);
      }, 1000);
      
      // BREATH-SYNCED HAPTIC FEEDBACK
      if (breathHapticActive && 'vibrate' in navigator) {
        const breathCycleDuration = (60 / config.breathRate) * 1000; // ms
        const startBreathHaptic = () => {
          // Pulse at start of inhale
          navigator.vibrate([50, 100, 50]);
        };
        startBreathHaptic();
        breathHapticIntervalRef.current = setInterval(startBreathHaptic, breathCycleDuration);
      }
      
      // VISUAL ENTRAINMENT (border flash at frequency)
      if (visualEntrainment && config.visualEntrainment) {
        const flashPeriod = 1000 / config.primary; // ms
        let flashOn = true;
        visualEntrainmentIntervalRef.current = setInterval(() => {
          flashOn = !flashOn;
          document.body.style.outline = flashOn ? `4px solid ${protocol.color}40` : 'none';
        }, flashPeriod);
      }
      
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio start error:', err);
    }
  };
  
  const stopAudio = () => {
    nodesRef.current.forEach(node => {
      try {
        node.stop?.();
        node.disconnect?.();
      } catch(e) {}
    });
    nodesRef.current = [];
    
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    
    if (breathHapticIntervalRef.current) {
      clearInterval(breathHapticIntervalRef.current);
      breathHapticIntervalRef.current = null;
    }
    
    if (visualEntrainmentIntervalRef.current) {
      clearInterval(visualEntrainmentIntervalRef.current);
      visualEntrainmentIntervalRef.current = null;
      document.body.style.outline = 'none';
    }
    
    masterGainRef.current = null;
    setIsPlaying(false);
    setCurrentHz(0);
  };
  
  const handleProtocolSelect = (protocolId) => {
    if (isPlaying) {
      stopAudio();
    }
    
    if (selectedProtocol?.id === protocolId) {
      setSelectedProtocol(null);
    } else {
      setSelectedProtocol(PROTOCOLS[protocolId]);
    }
  };
  
  const handlePlayPause = () => {
    if (isPlaying) {
      stopAudio();
    } else if (selectedProtocol) {
      startAudio(selectedProtocol);
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let wakeLock = null;
    
    const requestWakeLock = async () => {
      if (isPlaying && 'wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
        } catch(e) {}
      }
    };
    
    if (isPlaying) requestWakeLock();
    
    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [isPlaying]);
  
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);
  
  const handleHRVUpdate = useCallback(({ bpm, coherence }) => {
    setCurrentHRV({ bpm, coherence });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HEADER */}
      <div className="border-b-4 border-cyan-500 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <COOLASFUCKWaves size={56} animate={true} />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-mono text-white text-center mb-3 tracking-wider">
            FREQUENCY CHAMBER
          </h1>
          <p className="text-gray-400 font-mono text-sm text-center">
            Evidence-based healing frequencies • Zero pseudo-science
          </p>
        </div>
      </div>
      
      {/* WHY THIS WORKS - EVIDENCE */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="border-4 border-cyan-500 bg-black p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-400 font-black font-mono text-sm">EVIDENCE-BASED</h3>
            </div>
            <button 
              onClick={() => setShowEvidenceModal(true)}
              className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline"
            >
              Why?
            </button>
          </div>
          <div className="space-y-2 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <COOLASFUCKBrain size={16} animate={false} />
              <span>MIT research • 40Hz neuroplasticity</span>
            </div>
            <div className="flex items-center gap-2">
              <COOLASFUCKHeart size={16} animate={false} />
              <span>HeartMath • Vagal tone activation</span>
            </div>
            <div className="flex items-center gap-2">
              <COOLASFUCKMoon size={16} animate={false} />
              <span>Sleep science • Delta wave studies</span>
            </div>
            <div className="flex items-center gap-2">
              <COOLASFUCKShield size={16} animate={false} />
              <span>Ancient wisdom • 2,500+ years proven</span>
            </div>
          </div>
        </div>

        {/* YOUR DEVICE = HEALING CHAMBER */}
        <div className="mt-4 border-4 border-pink-500 bg-black p-4">
          <div className="flex items-center gap-2 mb-2">
            <COOLASFUCKWaves size={20} animate={true} />
            <h3 className="text-pink-400 font-black font-mono text-sm">YOUR DEVICE = HEALING CHAMBER</h3>
          </div>
          <div className="space-y-1 text-xs font-mono text-gray-400">
            <p>✓ Binaural beats (different Hz each ear)</p>
            <p>✓ Visual entrainment (border pulses at healing Hz)</p>
            <p>✓ Haptic feedback (synced to breath)</p>
            <p>✓ HRV biofeedback (watch yourself heal)</p>
            <p className="text-pink-400 mt-2">Every phone → Free healing center</p>
          </div>
        </div>
      </div>

      {/* HEADPHONE PROMPT */}
      {showHeadphonePrompt && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-amber-900/20 border-4 border-amber-500 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 className="w-6 h-6 text-amber-400" />
              <h3 className="text-amber-400 font-black font-mono">HEADPHONES NEEDED</h3>
            </div>
            <p className="text-amber-200 text-sm mb-3">
              This protocol uses binaural beats (different frequencies in each ear). Headphones are required for it to work.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowHeadphonePrompt(false)}
                className="px-4 py-2 bg-amber-600 border-2 border-amber-400 text-white font-black font-mono text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIME SUGGESTION */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-cyan-900/20 border-2 border-cyan-500/50 p-3 flex items-center gap-3">
          <Clock className="w-5 h-5 text-cyan-400" />
          <p className="text-cyan-300 text-sm font-mono">
            Based on time of day, we suggest: <strong className="text-white">{PROTOCOLS[suggestedProtocol].name}</strong>
          </p>
        </div>
      </div>
      
      {/* PROTOCOL GRID - ORGANIZED BY CATEGORY */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {PROTOCOL_SECTIONS.map((section) => (
          <div key={section.id}>
            <div className="mb-4 border-l-4 pl-4" style={{ borderColor: section.color }}>
              <h3 className="text-xl font-black font-mono" style={{ color: section.color }}>
                {section.name}
              </h3>
              <p className="text-gray-500 text-sm font-mono">{section.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {section.protocols.map((protocolId) => {
                const protocol = PROTOCOLS[protocolId];
                if (!protocol) return null;
                return (
            <motion.button
              key={protocol.id}
              onClick={() => handleProtocolSelect(protocol.id)}
              className={`relative p-6 border-4 transition-all ${
                selectedProtocol?.id === protocol.id ? 'bg-white/10' : 'bg-black hover:bg-white/5'
              }`}
              style={{
                borderColor: selectedProtocol?.id === protocol.id ? protocol.color : '#333',
                boxShadow: selectedProtocol?.id === protocol.id ? `0 0 30px ${protocol.color}40` : 'none'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setShowInfo(protocol); }}
                className="absolute top-2 right-2 text-gray-500 hover:text-white"
              >
                <Info size={16} />
              </button>
              
              <div className="flex flex-col items-center gap-3">
                <PixelIcon 
                  icon={protocol.icon} 
                  color={selectedProtocol?.id === protocol.id ? protocol.color : '#666'} 
                  size={40}
                  animate={selectedProtocol?.id === protocol.id && isPlaying}
                />
                <p 
                  className="font-black font-mono text-sm"
                  style={{ color: selectedProtocol?.id === protocol.id ? protocol.color : '#888' }}
                >
                  {protocol.name}
                </p>
                <p className="text-gray-500 text-xs text-center">
                  {protocol.description}
                </p>
              </div>
              
              {protocol.id === suggestedProtocol && (
                <div 
                  className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold"
                  style={{ backgroundColor: protocol.color, color: 'black' }}
                >
                  NOW
                </div>
                )}
                </motion.button>
                );
                })}
                </div>
                </div>
                ))}
                </div>
      
      {/* ACTIVE SESSION */}
      <AnimatePresence>
        {selectedProtocol && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-4xl mx-auto p-4"
          >
            <div 
              className="border-4 p-8"
              style={{ borderColor: selectedProtocol.color, backgroundColor: `${selectedProtocol.color}10` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <PixelIcon icon={selectedProtocol.icon} color={selectedProtocol.color} size={48} animate={isPlaying} />
                  <div>
                    <h2 className="text-2xl font-black" style={{ color: selectedProtocol.color }}>
                      {selectedProtocol.name}
                    </h2>
                    <p className="text-gray-400 text-sm font-mono">
                      {selectedProtocol.config.primary}Hz primary • {selectedProtocol.config.noiseType} noise
                    </p>
                  </div>
                </div>
                
                {isPlaying && (
                  <div className="text-right">
                    <p className="text-4xl font-black font-mono" style={{ color: selectedProtocol.color }}>
                      {formatTime(sessionTime)}
                    </p>
                    <p className="text-gray-500 text-xs font-mono">SESSION TIME</p>
                  </div>
                )}
              </div>
              
              {/* HRV Toggle */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setHrvEnabled(!hrvEnabled)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    hrvEnabled ? 'border-green-500 bg-green-900/30 text-green-400' : 'border-gray-600 bg-black/40 text-gray-400'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    {hrvEnabled ? 'HRV BIOFEEDBACK ON' : 'Enable HRV Biofeedback'}
                  </span>
                </button>
              </div>
              
              <HRVBiofeedback isActive={hrvEnabled && isPlaying} onHRVUpdate={handleHRVUpdate} color={selectedProtocol.color} />

              {/* PROTOCOL ENHANCEMENTS */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedProtocol.config.isBinaural && (
                  <div className="bg-black/40 border border-cyan-500/30 p-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-cyan-400 font-mono">BINAURAL ACTIVE</span>
                  </div>
                )}
                {selectedProtocol.config.visualEntrainment && (
                  <div className="bg-black/40 border border-purple-500/30 p-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-purple-400 font-mono">VISUAL SYNC</span>
                  </div>
                )}
                {breathHapticActive && (
                  <div className="bg-black/40 border border-pink-500/30 p-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-pink-400 font-mono">HAPTIC BREATH</span>
                  </div>
                )}
                {selectedProtocol.config.bilateral && (
                  <div className="bg-black/40 border border-green-500/30 p-2 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400 font-mono">BILATERAL</span>
                  </div>
                )}
              </div>
              
              {currentHRV && hrvEnabled && isPlaying && (
                <div 
                  className="mb-4 p-3 rounded-lg border-2 text-center"
                  style={{ 
                    borderColor: currentHRV.coherence > 70 ? '#22c55e' : currentHRV.coherence > 40 ? '#eab308' : '#ef4444',
                    backgroundColor: currentHRV.coherence > 70 ? '#22c55e10' : currentHRV.coherence > 40 ? '#eab30810' : '#ef444410'
                  }}
                >
                  <p className="font-mono text-sm" style={{
                    color: currentHRV.coherence > 70 ? '#22c55e' : currentHRV.coherence > 40 ? '#eab308' : '#ef4444'
                  }}>
                    {currentHRV.coherence > 70 
                      ? '✓ HIGH COHERENCE - You\'re in sync with the frequency' 
                      : currentHRV.coherence > 40 
                        ? '◐ MODERATE - Breathe slower, follow the pacer'
                        : '○ LOW COHERENCE - Slow deep breaths, you\'ll get there'}
                  </p>
                </div>
              )}
              
              <div className="flex justify-center mb-8">
                <BreathingPacer 
                  breathRate={currentHRV && currentHRV.coherence < 40 
                    ? Math.max(4, selectedProtocol.config.breathRate - 2) 
                    : selectedProtocol.config.breathRate}
                  isActive={isPlaying}
                  color={selectedProtocol.color}
                />
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: selectedProtocol.color }}
                  />
                  <Volume2 className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-400 font-mono text-sm w-12">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
              
              <button
                onClick={handlePlayPause}
                className="w-full py-6 text-2xl font-black font-mono transition-all border-4"
                style={{
                  backgroundColor: isPlaying ? selectedProtocol.color : 'transparent',
                  borderColor: selectedProtocol.color,
                  color: isPlaying ? 'black' : selectedProtocol.color,
                  boxShadow: isPlaying ? `0 0 40px ${selectedProtocol.color}60` : 'none'
                }}
              >
                {isPlaying ? '■ STOP' : '▶ START SESSION'}
              </button>
              
              {isPlaying && (
                <>
                  {/* 8-BIT VISUALIZER */}
                  <div className="mt-6 flex justify-center items-end gap-1 h-24">
                    {[...Array(16)].map((_, i) => {
                      const height = 20 + Math.sin((Date.now() / 100) + i) * 30 + Math.random() * 20;
                      return (
                        <motion.div
                          key={i}
                          className="w-3 md:w-4"
                          style={{ 
                            backgroundColor: selectedProtocol.color,
                            boxShadow: `0 0 10px ${selectedProtocol.color}`,
                            imageRendering: 'pixelated'
                          }}
                          animate={{
                            height: `${height}%`,
                          }}
                          transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-6 text-center">
                    <p 
                      className="text-5xl font-black font-mono"
                      style={{ color: selectedProtocol.color, textShadow: `0 0 20px ${selectedProtocol.color}` }}
                    >
                      {currentHz} Hz
                    </p>
                    <p className="text-gray-500 text-sm font-mono mt-2">
                      {selectedProtocol.config.breathRate} breaths/min • {selectedProtocol.config.noiseType} noise bed
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* BIOMETRIC HEALING */}
      <div className="max-w-4xl mx-auto p-4">
        <BiometricHealing />
      </div>

      {/* 8-BIT SHARE BUTTON */}
      <div className="max-w-4xl mx-auto p-4">
        <motion.button
          onClick={async () => {
            const shareText = `🎵 FREE HEALING FREQUENCIES

💚 Evidence-based sound therapy
🧠 Anxiety, sleep, focus, pain relief
🔬 MIT research, zero pseudo-science
💸 Free forever. No ads. No bullshit.

Try it: https://uf51.love/FrequencyChamber`;

            try {
              if (navigator.share) {
                await navigator.share({
                  title: 'Free Healing Frequencies - UF51',
                  text: shareText,
                  url: 'https://uf51.love/FrequencyChamber'
                });
              } else {
                throw new Error('Share not supported');
              }
            } catch (e) {
              if (e.name !== 'AbortError') {
                try {
                  await navigator.clipboard.writeText(shareText);
                  alert('✓ COPIED! Share with someone you love 💚');
                } catch {
                  alert('Share: uf51.love/FrequencyChamber');
                }
              }
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-black border-4 border-pink-500 hover:border-pink-400 p-8 transition-all"
          style={{ 
            boxShadow: '8px 8px 0px rgba(236, 72, 153, 0.5)',
            imageRendering: 'pixelated'
          }}
        >
          <div className="flex items-center justify-center gap-6">
            <div className="relative">
              <Share2 className="w-12 h-12 text-pink-400" strokeWidth={3} style={{ filter: 'drop-shadow(0 0 8px #ec4899)' }} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black font-mono text-pink-400 tracking-wider" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
                SHARE HEALING
              </p>
              <p className="text-sm text-pink-300 font-mono tracking-wide mt-1">
                SEND TO SOMEONE YOU LOVE
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-gray-600 text-sm font-mono">Free forever • No extraction • Just healing</p>
      </div>
      
      <AnimatePresence>
        {showInfo && <InfoModal protocol={showInfo} onClose={() => setShowInfo(null)} />}
        {showEvidenceModal && <EvidenceModal onClose={() => setShowEvidenceModal(false)} />}
      </AnimatePresence>
    </div>
  );
}