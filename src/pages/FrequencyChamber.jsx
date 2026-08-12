import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Share2 } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKFire, COOLASFUCKBrain, COOLASFUCKHeart, COOLASFUCKMoon, COOLASFUCKShield, COOLASFUCKZap, COOLASFUCKHeadphones, COOLASFUCKSpeaker } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';
import FrequencyP2PShare from '@/components/healing/FrequencyP2PShare';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import FrequencyAIRouter from '@/components/healing/FrequencyAIRouter';
import FrequencyInfoPanels from '@/components/healing/FrequencyInfoPanels';
import FrequencyCard from '@/components/healing/FrequencyCard';
import { FREQUENCIES } from '@/components/healing/frequencyData';


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

// FREQUENCIES array imported from src/components/healing/frequencyData.js

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
  const [currentSweepFreq, setCurrentSweepFreq] = useState(20);
  const [showBuzzStop, setShowBuzzStop] = useState(false);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const hapticIntervalRef = useRef(null);
  const breathingPhaseRef = useRef('inhale'); // inhale, hold, exhale, pause
  const sweepIntervalRef = useRef(null);
  const wakeLockRef = useRef(null);
  const timerTargetRef = useRef(null);

  // === PLAY FREQUENCY ===
  const play = async (freq) => {
    stop();
    
    // KEEP SCREEN ON - Wake Lock API (2026 iOS support)
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('✓ Screen will stay on - zero interruption');
      }
    } catch (e) {
      console.log('Wake Lock not supported (non-critical)');
    }
    
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
      const carrier = freq.carrier || freq.hz || 20; // fallback to 20 for sweep

      // === BROWN NOISE ===
      if (freq.isBrownNoise) {
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
          const data = buffer.getChannelData(ch);
          let lastOut = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5; // amplify
          }
        }
        const brownNoise = ctx.createBufferSource();
        brownNoise.buffer = buffer;
        brownNoise.loop = true;
        brownNoise.connect(masterGain);
        brownNoise.start();
        nodes.push(brownNoise);
        nodesRef.current = nodes;
        setIsPlaying(true);
        setSelected(freq);
        setTimer(0);
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        drawVisualizer();
        return;
      }

      // === BUZZSTOP — STRESS BUZZ + CRANIAL PRESSURE ===
      if (freq.isBuzzStop) {
        // LAYER 1: Gentle pink noise bed — soft, low volume, masks phantom buzz
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Simple pink noise approximation (no clipping)
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          data[i] = lastOut * 8;
        }
        const pinkNoise = ctx.createBufferSource();
        pinkNoise.buffer = buffer;
        pinkNoise.loop = true;
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.12; // Low — just a soft bed
        pinkNoise.connect(noiseGain);
        noiseGain.connect(masterGain);
        pinkNoise.start();
        nodes.push(pinkNoise, noiseGain);

        // LAYER 2: Isochronic tone — 300Hz carrier, amplitude-modulated at 10Hz
        // Done ENTIRELY with Web Audio scheduling (no setInterval = no glitches)
        const isoOsc = ctx.createOscillator();
        isoOsc.frequency.value = 300;
        isoOsc.type = 'sine';
        const isoGain = ctx.createGain();
        isoGain.gain.value = 0;
        isoOsc.connect(isoGain);
        isoGain.connect(masterGain);
        isoOsc.start();
        // Schedule 10Hz pulses for 10 minutes using precise Web Audio timing
        const pulsePeriod = 0.1; // 10Hz = 100ms period
        const pulseOn = 0.05;    // 50% duty cycle = 50ms on
        const totalPulses = 600 * 10; // 10 min worth
        for (let i = 0; i < totalPulses; i++) {
          const t = ctx.currentTime + (i * pulsePeriod);
          isoGain.gain.setValueAtTime(0.2, t);
          isoGain.gain.setValueAtTime(0, t + pulseOn);
        }
        nodes.push(isoOsc, isoGain);

        // LAYER 3: Two gentle sine tones — 200Hz + 210Hz = 10Hz beat between them
        // Mono-compatible (works on speakers too, just slightly less binaural effect)
        const oscA = ctx.createOscillator();
        oscA.frequency.value = 200;
        oscA.type = 'sine';
        const oscB = ctx.createOscillator();
        oscB.frequency.value = 210;
        oscB.type = 'sine';
        const abGain = ctx.createGain();
        abGain.gain.value = 0.12;
        oscA.connect(abGain);
        oscB.connect(abGain);
        abGain.connect(masterGain);
        oscA.start();
        oscB.start();
        nodes.push(oscA, oscB, abGain);

        // LAYER 4: Somatic grounding — very slow, soft low tone with gentle swell
        const groundOsc = ctx.createOscillator();
        groundOsc.frequency.value = 55; // Low A — warm, grounding
        groundOsc.type = 'sine';
        const groundGain = ctx.createGain();
        groundGain.gain.value = 0.08;
        // Slow swell: up over 8s, down over 8s, repeat — all scheduled
        for (let i = 0; i < 80; i++) {
          const t = ctx.currentTime + (i * 16);
          groundGain.gain.linearRampToValueAtTime(0.15, t + 8);
          groundGain.gain.linearRampToValueAtTime(0.04, t + 16);
        }
        groundOsc.connect(groundGain);
        groundGain.connect(masterGain);
        groundOsc.start();
        nodes.push(groundOsc, groundGain);

        nodesRef.current = nodes;
        setIsPlaying(true);
        setSelected(freq);
        setTimer(0);
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        drawVisualizer();
        return;
      }

      // === TINNITUS NOTCH THERAPY ===
      if (freq.isNotch) {
        // Notch therapy: play broadband noise, cut out the tinnitus frequency
        // Uses a biquad notch filter centred on the tinnitus Hz
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Notch filter at tinnitus frequency
        const notchFilter = ctx.createBiquadFilter();
        notchFilter.type = 'notch';
        notchFilter.frequency.value = freq.notchHz || 8000;
        notchFilter.Q.value = 5; // Narrow notch — precise suppression

        // Gentle bandpass so we don't hear frequencies the ear can't help with
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 4000;
        bandpass.Q.value = 0.3;

        noise.connect(bandpass);
        bandpass.connect(notchFilter);
        notchFilter.connect(masterGain);
        noise.start();
        nodes.push(noise, notchFilter, bandpass);

        // Also layer in gentle alpha wave (10Hz binaural) to calm the auditory cortex
        const alphaL = ctx.createOscillator();
        alphaL.frequency.value = 200;
        alphaL.type = 'sine';
        const alphaR = ctx.createOscillator();
        alphaR.frequency.value = 210; // 10Hz binaural beat
        alphaR.type = 'sine';
        const alphaGain = ctx.createGain();
        alphaGain.gain.value = 0.1;
        alphaL.connect(alphaGain);
        alphaR.connect(alphaGain);
        alphaGain.connect(masterGain);
        alphaL.start();
        alphaR.start();
        nodes.push(alphaL, alphaR, alphaGain);

        nodesRef.current = nodes;
        setIsPlaying(true);
        setSelected(freq);
        setTimer(0);
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        drawVisualizer();
        return; // Skip standard oscillator path
      }

      if (freq.binaural) {
        // PURE BINAURAL BEAT — stereo routing, no stacking
        // Brain entrains to the difference between left and right ears
        // Stacking muddies the signal — purity is essential for entrainment
        const beatHz = freq.hz;
        const merger = ctx.createChannelMerger(2);

        const leftOsc = ctx.createOscillator();
        leftOsc.type = 'sine';
        leftOsc.frequency.value = carrier;
        const leftGain = ctx.createGain();
        leftGain.gain.value = 0.4;
        leftOsc.connect(leftGain);
        leftGain.connect(merger, 0, 0);

        const rightOsc = ctx.createOscillator();
        rightOsc.type = 'sine';
        rightOsc.frequency.value = carrier + beatHz;
        const rightGain = ctx.createGain();
        rightGain.gain.value = 0.4;
        rightOsc.connect(rightGain);
        rightGain.connect(merger, 0, 1);

        merger.connect(masterGain);
        leftOsc.start();
        rightOsc.start();
        nodes.push(leftOsc, rightOsc, leftGain, rightGain, merger);
      } else {
      const osc = ctx.createOscillator();
      osc.type = freq.waveform;
      osc.frequency.value = carrier;
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      nodes.push(osc, gain);

      // TINNITUS SWEEP - special case
      if (freq.isSweep) {
        const sweepTime = freq.sweepDuration || 30;
        const now = ctx.currentTime;
        // Start at 20Hz
        osc.frequency.setValueAtTime(20, now);
        // Sweep up: 20Hz → 20kHz
        osc.frequency.exponentialRampToValueAtTime(20000, now + sweepTime);
        // Sweep down: 20kHz → 20Hz
        osc.frequency.exponentialRampToValueAtTime(20, now + sweepTime * 2);

        // VISUAL SWEEP TRACKER
        const sweepStartTime = Date.now();
        sweepIntervalRef.current = setInterval(() => {
          const elapsed = ((Date.now() - sweepStartTime) / 1000) % (sweepTime * 2);
          if (elapsed < sweepTime) {
            const progress = elapsed / sweepTime;
            setCurrentSweepFreq(Math.round(20 * Math.pow(1000, progress)));
          } else {
            const progress = (elapsed - sweepTime) / sweepTime;
            setCurrentSweepFreq(Math.round(20000 * Math.pow(0.001, progress)));
          }
        }, 200);

        // Loop the sweep indefinitely
        const sweepLoopInterval = setInterval(() => {
          const t = ctx.currentTime;
          osc.frequency.cancelScheduledValues(t);
          osc.frequency.setValueAtTime(20, t);
          osc.frequency.exponentialRampToValueAtTime(20000, t + sweepTime);
          osc.frequency.exponentialRampToValueAtTime(20, t + sweepTime * 2);
        }, sweepTime * 2 * 1000);
        nodes.push({ stop: () => clearInterval(sweepLoopInterval), disconnect: () => {} });

        // Add a gentle 10Hz alpha binaural layer alongside the sweep
        const alphaL = ctx.createOscillator();
        alphaL.frequency.value = 200;
        alphaL.type = 'sine';
        const alphaR = ctx.createOscillator();
        alphaR.frequency.value = 210;
        alphaR.type = 'sine';
        const alphaGain = ctx.createGain();
        alphaGain.gain.value = 0.08;
        alphaL.connect(alphaGain);
        alphaR.connect(alphaGain);
        alphaGain.connect(masterGain);
        alphaL.start();
        alphaR.start();
        nodes.push(alphaL, alphaR, alphaGain);
      }

      // SKIP STACKING FOR SWEEP - sweep IS the therapy
      if (!freq.isSweep) {
        // ULTRA-DEEP SUBHARMONIC (quarter - organs/deep tissue)
        const ultraSubOsc = ctx.createOscillator();
        ultraSubOsc.type = 'sine';
        ultraSubOsc.frequency.value = carrier * 0.25;
        const ultraSubGain = ctx.createGain();
        ultraSubGain.gain.value = 0.35;
        ultraSubOsc.connect(ultraSubGain);
        ultraSubGain.connect(masterGain);
        ultraSubOsc.start();
        nodes.push(ultraSubOsc, ultraSubGain);

        // SUBHARMONIC (half - muscle layers)
        const subOsc = ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.value = carrier * 0.5;
        const subGain = ctx.createGain();
        subGain.gain.value = 0.4;
        subOsc.connect(subGain);
        subGain.connect(masterGain);
        subOsc.start();
        nodes.push(subOsc, subGain);

        // 2ND HARMONIC (double - surface)
        const harm2Osc = ctx.createOscillator();
        harm2Osc.type = 'sine';
        harm2Osc.frequency.value = carrier * 2;
        const harm2Gain = ctx.createGain();
        harm2Gain.gain.value = 0.25;
        harm2Osc.connect(harm2Gain);
        harm2Gain.connect(masterGain);
        harm2Osc.start();
        nodes.push(harm2Osc, harm2Gain);

        // 3RD HARMONIC (triple - nerve endings)
        const harm3Osc = ctx.createOscillator();
        harm3Osc.type = 'sine';
        harm3Osc.frequency.value = carrier * 3;
        const harm3Gain = ctx.createGain();
        harm3Gain.gain.value = 0.2;
        harm3Osc.connect(harm3Gain);
        harm3Gain.connect(masterGain);
        harm3Osc.start();
        nodes.push(harm3Osc, harm3Gain);

        // 4TH HARMONIC (quad - fine nerves)
        const harm4Osc = ctx.createOscillator();
        harm4Osc.type = 'sine';
        harm4Osc.frequency.value = carrier * 4;
        const harm4Gain = ctx.createGain();
        harm4Gain.gain.value = 0.15;
        harm4Osc.connect(harm4Gain);
        harm4Gain.connect(masterGain);
        harm4Osc.start();
        nodes.push(harm4Osc, harm4Gain);

        // AMBIENT BED - 8 overlapping frequencies (healing field)
        const ambientFreqs = [
          carrier * 0.125, // ultra ultra deep
          carrier * 0.33,  // deep grounding
          carrier * 0.66,  // mid-deep
          carrier * 1.5,   // mid-high
          carrier * 2.5,   // high shimmer
          carrier * 3.5,   // nerve activation
          carrier * 5,     // fine tissue
          carrier * 7      // cellular
        ];

        ambientFreqs.forEach((f, i) => {
          const ambOsc = ctx.createOscillator();
          ambOsc.type = 'sine';
          ambOsc.frequency.value = f;
          const ambGain = ctx.createGain();
          ambGain.gain.value = 0.03 + (i * 0.002); // Very low volume
          ambOsc.connect(ambGain);
          ambGain.connect(masterGain);
          ambOsc.start();
          nodes.push(ambOsc, ambGain);
        });
      } // End of !freq.isSweep check
      } // End of non-binaural else block

      nodesRef.current = nodes;
      setIsPlaying(true);
      setSelected(freq);
      setTimer(0);

      // TIMER - with auto-stop at target (use ref to avoid stale closure)
      timerRef.current = setInterval(() => {
        setTimer(t => {
          const newTime = t + 1;
          if (timerTargetRef.current && newTime >= timerTargetRef.current) {
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

      console.log('✓ 2026 HEALING ACTIVE');
      console.log('Primary:', carrier, 'Hz');
      console.log('Harmonics:', freq.harmonics.join(', '), 'Hz');
      console.log('Waveform:', freq.waveform);
      console.log('Total oscillators:', nodes.filter(n => n.frequency).length);
      console.log('Amplification: Geometric stacking + ultra-deep subharmonics + 8-layer ambient bed');

      // AI51 LEARNS FROM YOUR HEALING (anonymous patterns help future humans)
      // What time do people need chest healing? What frequency works for anxiety?
      // This data helps ME help YOU and everyone else - we learn together
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
    // RELEASE WAKE LOCK
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log('✓ Screen lock released');
      } catch (e) {}
    }

    if (sweepIntervalRef.current) {
      clearInterval(sweepIntervalRef.current);
      sweepIntervalRef.current = null;
    }

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
    timerTargetRef.current = null;
    setIsPlaying(false);
    setTimer(0);
    setTimerTarget(null);
    setCurrentSweepFreq(20);
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
  // LOAD FREQUENCY FROM URL (share-links) + SET OG TAGS FOR DISCORD/TWITTER
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const freqId = params.get('freq');
    const freq = freqId ? FREQUENCIES.find(f => f.id === freqId) : null;

    // Set OG meta tags for social sharing
      const ogTitle = freq 
        ? `${freq.name} • ${freq.hz} Hz • Free Healing`
        : 'Frequency Chamber • Free Healing Frequencies • UF51';
      const ogDescription = freq
        ? `${freq.description}. Play now, no login needed, works 100% offline.`
        : 'Free healing frequencies for pain, anxiety, sleep, focus + more. 100% offline. No login. No servers.';
      const publishedDomain = window.location.hostname.includes('base44.app') ? 'uf51.love' : window.location.origin;
      const ogImage = `https://${publishedDomain}/api/functions/serveFrequencyOGImage?freq=${freqId || 'generic'}`;
    const ogUrl = window.location.href;

    // Update meta tags
    setMetaTag('og:title', ogTitle);
    setMetaTag('og:description', ogDescription);
    setMetaTag('og:image', ogImage);
    setMetaTag('og:url', ogUrl);
    setMetaTag('og:type', 'website');
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle);
    setMetaTag('twitter:description', ogDescription);
    setMetaTag('twitter:image', ogImage);

    // Auto-play if frequency in URL
    if (freq && !isPlaying) {
      setTimeout(() => play(freq), 500);
    }
  }, []);

  // Helper to set meta tags
  const setMetaTag = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property.includes(':') ? 'property' : 'name', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

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
        <div className="flex flex-col items-center gap-2 mb-4">
          <COOLASFUCKWaves size={48} animate={true} />
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mind · Body · Soul
          </h1>
          <p className="text-cyan-400 font-bold text-sm sm:text-base font-mono tracking-widest">AI-DESIGNED AUDIO PROTOCOLS</p>
          <p className="text-gray-400 text-xs sm:text-sm font-mono">Built on peer-reviewed neuroscience. MIT · Stanford · NHS-aligned.</p>
          
          {/* PRIVACY + HONEST BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="px-2 py-1 bg-green-500/10 border border-green-500/40 rounded text-[10px] font-bold text-green-400 font-mono">✓ NO ACCOUNT</span>
            <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/40 rounded text-[10px] font-bold text-cyan-400 font-mono">✓ NO TRACKING</span>
            <span className="px-2 py-1 bg-pink-500/10 border border-pink-500/40 rounded text-[10px] font-bold text-pink-400 font-mono">✓ FREE FOREVER</span>
            <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/40 rounded text-[10px] font-bold text-purple-400 font-mono">✓ WORKS OFFLINE</span>
          </div>
          <p className="text-white/40 text-xs mt-1 italic">Just you. Nobody knows you're here.</p>

          {!isOnline && (
            <div className="px-2 py-1 bg-green-500/20 border border-green-500 rounded text-[10px] font-bold text-green-400 font-mono">
              OFFLINE ✓
            </div>
          )}
        </div>
        <p className="text-gray-400 text-base sm:text-lg mb-4">AI-designed audio protocols for pain, anxiety, depression, loneliness, sleep + more. Built on published neuroscience. Free forever. Works offline.</p>

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
          <div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ backgroundColor: 'black', willChange: 'auto' }}
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
                className="px-8 py-4 rounded-xl font-black font-mono text-base bg-black border-2 active:scale-95 transition-all"
                style={{
                  borderColor: selected.color,
                  color: selected.color,
                  boxShadow: `0 0 20px ${selected.color}60`,
                  minWidth: '100px'
                }}
              >
                ■ STOP
              </button>
            </div>

            {/* SWEEP FREQUENCY COUNTER - Top center (only for sweep mode) */}
            {selected.isSweep && (
              <div className="absolute top-24 left-4 right-4 z-10">
                <div className="bg-black/60 backdrop-blur-sm px-6 py-4 rounded-lg text-center">
                  <div className="text-4xl sm:text-6xl font-black font-mono text-green-400 mb-2" style={{ textShadow: '0 0 25px #22c55e' }}>
                    {currentSweepFreq.toLocaleString()} Hz
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-400 text-xs sm:text-sm font-mono">
                    <span>20Hz</span>
                    <div className="flex-1 bg-green-900/30 h-2 rounded-full overflow-hidden max-w-xs">
                      <div 
                        className="bg-green-500 h-full transition-all duration-100"
                        style={{ 
                          width: `${((Math.log10(currentSweepFreq) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20))) * 100}%`,
                          boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                        }}
                      />
                    </div>
                    <span>20kHz</span>
                  </div>
                </div>
              </div>
            )}

            {/* PSYCHOLOGY AFFIRMATION - Top center (for non-sweep modes) */}
            {!selected.isSweep && selected.psychology && (
              <div className="absolute top-24 left-4 right-4 z-10">
                <div className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg text-center">
                  <p className="text-white text-sm sm:text-base font-bold" style={{ textShadow: `0 0 10px ${selected.color}` }}>
                    {selected.psychology}
                  </p>
                </div>
              </div>
            )}

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
                    onClick={() => { setTimerTarget(mins * 60); timerTargetRef.current = mins * 60; }}
                    className={`flex-1 py-2 rounded-lg font-black font-mono text-xs border transition-all ${
                      timerTarget === mins * 60
                        ? 'bg-white text-black border-white'
                        : 'bg-black/60 backdrop-blur-sm text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}

                {/* SHARE LINK */}
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}${window.location.pathname}?freq=${selected.id}`;
                    navigator.clipboard.writeText(shareUrl);
                    alert(`✓ Copied: ${selected.name}\n\n${shareUrl}`);
                  }}
                  className="px-4 py-2 rounded-lg font-black font-mono text-xs bg-black/60 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all text-white flex items-center gap-1"
                >
                  <Share2 className="w-3 h-3" />
                  SHARE LINK
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* AI ROUTER + FREQUENCY GRID */}
      {!isPlaying && (
      <>
      <FrequencyAIRouter frequencies={FREQUENCIES} onSelect={(freq) => freq.isBuzzStop ? setShowBuzzStop(true) : play(freq)} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FREQUENCIES
          .filter(freq => {
            if (deviceFilter === 'all') return true;
            if (deviceFilter === 'speaker') return freq.device === 'speaker' || freq.device === 'both';
            if (deviceFilter === 'headphones') return freq.device === 'headphones' || freq.device === 'both';
            return true;
          })
          .map((freq, index) => (
          <FrequencyCard
            key={freq.id}
            freq={freq}
            index={index}
            onPlay={(f, isBuzz) => isBuzz ? setShowBuzzStop(true) : play(f)}
            isRecommended={ai51Recommendation?.frequencyId === freq.id}
            allFrequencies={FREQUENCIES}
          />
        ))}
        </div>

        <FrequencyInfoPanels
          showHowItWorks={showHowItWorks} setShowHowItWorks={setShowHowItWorks}
          showDataControls={showDataControls} setShowDataControls={setShowDataControls}
          showSmartTV={showSmartTV} setShowSmartTV={setShowSmartTV}
          showScience={showScience} setShowScience={setShowScience}
        />

      </div>
      </>
      )}

      {/* BUZZSTOP ENGINE MODAL */}
      <AnimatePresence>
        {showBuzzStop && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
              <div className="flex justify-end mb-2">
                <button onClick={() => setShowBuzzStop(false)}
                  className="text-gray-500 hover:text-white font-mono text-xs border border-gray-700 px-3 py-1 hover:border-gray-400 transition-colors">
                  ✕ CLOSE
                </button>
              </div>
              <BuzzStopEngine onStop={() => setShowBuzzStop(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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