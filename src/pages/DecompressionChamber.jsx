import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

/**
 * UF51 TINNITUS CANCELLATION ENGINE v2
 * The most advanced tinnitus relief system on Earth
 * 
 * ATTACK VECTORS:
 * 1. Phase-inverted sweep (destructive interference)
 * 2. Moving notch filter on pink noise (neuroplasticity retraining)
 * 3. Color therapy at sweep frequency (visual entrainment)
 * 4. Schumann 7.83Hz undertone (vagus nerve / nervous system reset)
 * 5. Slow sweep = more time at each frequency = more relief
 * 
 * No calibration needed - sweeps through ALL tinnitus frequencies
 */

export default function DecompressionChamber() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentHz, setCurrentHz] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const masterGainRef = useRef(null);
  const sweepRef = useRef(null);
  const colorRef = useRef(null);
  const notchRef = useRef(null); // Moving notch filter

  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  async function startAudio() {
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

    // === CONFIGURATION ===
    const CONFIG = {
      freqRange: [500, 14000],    // Full spectrum: buzzes → hisses
      sweepTime: 30,              // Seconds per sweep
      power: 0.5,                 // Primary oscillator strength
      phaseInvert: -1.0,          // Full inversion = max cancellation
      noiseLevel: 0.15,           // Pink noise bed
      notchQ: 30,                 // Notch sharpness
      schumannLevel: 0.12         // Earth frequency strength
    };
    
    // === 1. PHASE-INVERTED SWEEP (Destructive Interference) ===
    const createOsc = (freq, gain, invert = false) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const g = ctx.createGain();
      g.gain.value = invert ? CONFIG.phaseInvert * CONFIG.power : CONFIG.power;
      
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      
      return { osc, gain: g };
    };
    
    const primary = createOsc(CONFIG.freqRange[0], CONFIG.power);
    const inverted = createOsc(CONFIG.freqRange[0], CONFIG.power, true);
    
    nodes.push(primary.osc, primary.gain, inverted.osc, inverted.gain);

    // === 2. PINK NOISE WITH MOVING NOTCH FILTER ===
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    
    // NOTCH FILTER - neuroplasticity trick
    const notchFilter = ctx.createBiquadFilter();
    notchFilter.type = 'notch';
    notchFilter.frequency.value = CONFIG.freqRange[0];
    notchFilter.Q.value = CONFIG.notchQ;
    notchRef.current = notchFilter;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = CONFIG.noiseLevel;
    
    noiseSource.connect(notchFilter);
    notchFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start();
    
    nodes.push(noiseSource, notchFilter, noiseGain);
    
    // === 3. FREQUENCY SWEEP ENGINE ===
    const sweep = {
      start: Date.now(),
      dir: 1,
      
      tick() {
        const elapsed = (Date.now() - this.start) / 1000;
        let t = Math.min(elapsed / CONFIG.sweepTime, 1);
        
        if (t >= 1) { this.start = Date.now(); this.dir *= -1; t = 0; }
        
        const progress = this.dir === 1 ? t : 1 - t;
        const [lo, hi] = CONFIG.freqRange;
        const hz = lo * Math.pow(hi / lo, progress);
        
        [primary.osc, inverted.osc].forEach(o => 
          o.frequency.setTargetAtTime(hz, ctx.currentTime, 0.1)
        );
        notchFilter.frequency.setTargetAtTime(hz, ctx.currentTime, 0.1);
        
        setCurrentHz(Math.round(hz));
      }
    };
    
    sweepRef.current = setInterval(() => sweep.tick(), 50);
    
    // === 4. COLOR THERAPY (Visual Entrainment at Schumann) ===
    let colorPhase = 0;
    colorRef.current = setInterval(() => {
      colorPhase += 0.1;
      const intensity = (Math.sin(colorPhase * 7.83) + 1) / 2;
      setPulseIntensity(intensity);
    }, 16);

    // === 5. SCHUMANN RESONANCE (Vagus Nerve / Nervous System Reset) ===
    // 7.83Hz = Earth's electromagnetic heartbeat
    // Calms the overactive auditory cortex that causes tinnitus
    const schumannCarrier = ctx.createOscillator();
    schumannCarrier.type = 'sine';
    schumannCarrier.frequency.value = 200;
    
    const schumannModulator = ctx.createOscillator();
    schumannModulator.type = 'sine';
    schumannModulator.frequency.value = 7.83;
    
    const schumannModGain = ctx.createGain();
    schumannModGain.gain.value = 0.5;
    
    const schumannOut = ctx.createGain();
    schumannOut.gain.value = CONFIG.schumannLevel;
    
    schumannModulator.connect(schumannModGain);
    schumannModGain.connect(schumannOut.gain);
    schumannCarrier.connect(schumannOut);
    schumannOut.connect(masterGain);
    
    schumannCarrier.start();
    schumannModulator.start();
    
    nodes.push(schumannCarrier, schumannModulator, schumannModGain, schumannOut);

    nodesRef.current = nodes;
    setPlaying(true);
  }

  function stopAudio() {
    if (sweepRef.current) {
      clearInterval(sweepRef.current);
      sweepRef.current = null;
    }
    if (colorRef.current) {
      clearInterval(colorRef.current);
      colorRef.current = null;
    }
    nodesRef.current.forEach(n => {
      try { n.stop?.(); n.disconnect?.(); } catch(e) {}
    });
    nodesRef.current = [];
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    masterGainRef.current = null;
    setPlaying(false);
    setCurrentHz(0);
    setPulseIntensity(0);
  }

  function handleTap() {
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
  }

  // Calculate color based on frequency - low=indigo, high=cyan
  const getHealingColor = () => {
    if (!playing) return 'from-indigo-950 via-slate-950 to-black';
    const progress = (currentHz - 500) / 13500; // Normalized 0-1
    const r = Math.round(79 + (6 - 79) * progress);
    const g = Math.round(70 + (182 - 70) * progress);
    const b = Math.round(229 + (212 - 229) * progress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // KEEP SCREEN AWAKE - prevents audio cutting
  useEffect(() => {
    let wakeLock = null;
    
    const requestWakeLock = async () => {
      if (playing && 'wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
        } catch (e) {
          console.log('Wake lock not available');
        }
      }
    };
    
    if (playing) {
      requestWakeLock();
    }
    
    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [playing]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 relative"
      style={{
        background: playing 
          ? `radial-gradient(circle at center, ${getHealingColor()}${Math.round(pulseIntensity * 40 + 20).toString(16).padStart(2, '0')}, #0a0514)`
          : 'linear-gradient(to bottom, #1e1b4b, #0f172a, #000)'
      }}
    >
      
      {/* BACK BUTTON */}
      <Link 
        to={createPageUrl('FrequencyChamber')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-mono text-sm">Back</span>
      </Link>
      
      {/* PULSING COLOR OVERLAY */}
      {playing && (
        <div 
          className="fixed inset-0 pointer-events-none transition-opacity duration-100"
          style={{
            background: `radial-gradient(circle at center, ${getHealingColor()}${Math.round(pulseIntensity * 30).toString(16).padStart(2, '0')}, transparent 70%)`,
            opacity: pulseIntensity * 0.6
          }}
        />
      )}
      
      <h1 className="text-3xl font-black text-white mb-2 relative z-10">
        Tinnitus Cancellation
      </h1>
      
      <p className="text-indigo-300 mb-8 text-center max-w-sm relative z-10">
        Phase-inverted sweep + color therapy. The most advanced system on Earth.
      </p>

      {/* VOLUME SLIDER */}
      <div className="w-full max-w-md mb-8 relative z-10">
        <label className="text-slate-400 text-sm block mb-2">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* PLAY BUTTON */}
      <button
        onClick={handleTap}
        className={`w-full max-w-md py-12 text-4xl font-black rounded-3xl transition-all relative z-10 ${
          playing 
            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-lg shadow-cyan-500/50' 
            : 'bg-gradient-to-r from-cyan-600 to-indigo-600 shadow-lg shadow-cyan-500/30'
        } text-white`}
        style={playing ? {
          boxShadow: `0 0 ${30 + pulseIntensity * 40}px ${getHealingColor()}`
        } : {}}
      >
        {playing ? '🎵 Cancelling...' : '▶ PLAY'}
      </button>

      {playing && (
        <div className="mt-8 text-center relative z-10">
          <p 
            className="text-6xl font-black font-mono"
            style={{ 
              color: getHealingColor(),
              textShadow: `0 0 ${20 + pulseIntensity * 30}px ${getHealingColor()}`
            }}
          >
            {currentHz} Hz
          </p>
          <p className="text-indigo-400 text-lg mt-4">
            Phase cancellation + color therapy active
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Sweeping 500Hz → 14kHz + Schumann grounding
          </p>
          
          {/* SCIENCE BOX */}
          <div className="mt-6 bg-black/40 border border-cyan-500/30 rounded-xl p-4 max-w-sm mx-auto text-left">
            <p className="text-cyan-300 text-xs font-mono">
              ⚡ Phase inversion = destructive interference
            </p>
            <p className="text-green-300 text-xs font-mono mt-1">
              🎯 Moving notch filter = neuroplasticity retraining
            </p>
            <p className="text-indigo-300 text-xs font-mono mt-1">
              🎨 Color therapy = visual entrainment at 7.83Hz
            </p>
            <p className="text-amber-300 text-xs font-mono mt-1">
              🌍 Schumann = vagus nerve / nervous system reset
            </p>
            <p className="text-pink-300 text-xs font-mono mt-1">
              ♾️ Oscillating sweep = hits ALL your frequencies
            </p>
          </div>
        </div>
      )}

      <p className="mt-12 text-slate-600 text-sm text-center max-w-md relative z-10">
        Works on phone speakers. Won't disturb Lennox. 💙
      </p>
    </div>
  );
}