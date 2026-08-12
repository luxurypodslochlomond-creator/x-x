import { useState, useRef, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * useFrequencyEngine — all Web Audio synthesis + visualizer logic.
 * Extracted from FrequencyChamber.jsx so the page component stays small
 * and compiles reliably in the Base44 builder.
 *
 * Returns everything the UI needs: state + play/stop + canvasRef.
 */
export default function useFrequencyEngine() {
  const [selected, setSelected] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [timer, setTimer] = useState(0);
  const [timerTarget, setTimerTarget] = useState(null);
  const [currentSweepFreq, setCurrentSweepFreq] = useState(20);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const hapticIntervalRef = useRef(null);
  const breathingPhaseRef = useRef('inhale');
  const sweepIntervalRef = useRef(null);
  const wakeLockRef = useRef(null);
  const timerTargetRef = useRef(null);
  const isPlayingRef = useRef(false);
  const animFrameRef = useRef(null);

  // Keep isPlayingRef in sync + cancel animation frame on stop
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying && animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, [isPlaying]);

  // Volume changes — update all live gain nodes
  useEffect(() => {
    nodesRef.current.forEach(node => {
      if (node?.gain && audioCtxRef.current) {
        try {
          node.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
        } catch (e) {}
      }
    });
  }, [volume]);

  const formatTime = useCallback((s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // === CHROMOTHERAPY VISUALIZER ===
  const drawVisualizer = useCallback(() => {
    if (!isPlayingRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let time = 0;
    let breathingTime = 0;

    const draw = () => {
      if (!isPlayingRef.current) return;
      animFrameRef.current = requestAnimationFrame(draw);

      time += 0.02;
      breathingTime += 0.015;

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

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const isMobile = canvas.width < 600;
      const maxSize = Math.min(canvas.width, canvas.height) * 0.4;

      ctx.globalAlpha = 0.05 * breathIntensity;
      ctx.fillStyle = breathColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

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
  }, [selected]);

  // Trigger visualizer when playback starts
  useEffect(() => {
    if (isPlaying && selected) {
      drawVisualizer();
    }
  }, [isPlaying, selected, drawVisualizer]);

  // === STOP ===
  const stop = useCallback(async () => {
    isPlayingRef.current = false;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      } catch (e) {}
    }

    if (sweepIntervalRef.current) {
      clearInterval(sweepIntervalRef.current);
      sweepIntervalRef.current = null;
    }

    // LOG SESSION
    if (selected) {
      try {
        const sessionData = {
          frequency_id: selected.id,
          session_duration: timer,
          expected_duration: selected.timer,
          completed: timer >= parseInt(selected.timer) * 60 * 0.8,
          timestamp: new Date().toISOString()
        };
        const sessions = JSON.parse(localStorage.getItem('uf51_sessions') || '[]');
        sessions.push(sessionData);
        if (sessions.length > 50) sessions.shift();
        localStorage.setItem('uf51_sessions', JSON.stringify(sessions));
      } catch (e) {}
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
  }, [selected, timer]);

  // === PLAY ===
  const play = useCallback(async (freq) => {
    stop();

    // WAKE LOCK
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (e) {}

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') await ctx.resume();

      audioCtxRef.current = ctx;
      isPlayingRef.current = true;
      const nodes = [];

      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      const carrier = freq.carrier || freq.hz || 20;

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
            data[i] *= 3.5;
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

      // === BUZZSTOP ===
      if (freq.isBuzzStop) {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          data[i] = lastOut * 8;
        }
        const pinkNoise = ctx.createBufferSource();
        pinkNoise.buffer = buffer;
        pinkNoise.loop = true;
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.12;
        pinkNoise.connect(noiseGain);
        noiseGain.connect(masterGain);
        pinkNoise.start();
        nodes.push(pinkNoise, noiseGain);

        const isoOsc = ctx.createOscillator();
        isoOsc.frequency.value = 300;
        isoOsc.type = 'sine';
        const isoGain = ctx.createGain();
        isoGain.gain.value = 0;
        isoOsc.connect(isoGain);
        isoGain.connect(masterGain);
        isoOsc.start();
        const pulsePeriod = 0.1;
        const pulseOn = 0.05;
        const totalPulses = 600 * 10;
        for (let i = 0; i < totalPulses; i++) {
          const t = ctx.currentTime + (i * pulsePeriod);
          isoGain.gain.setValueAtTime(0.2, t);
          isoGain.gain.setValueAtTime(0, t + pulseOn);
        }
        nodes.push(isoOsc, isoGain);

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

        const groundOsc = ctx.createOscillator();
        groundOsc.frequency.value = 55;
        groundOsc.type = 'sine';
        const groundGain = ctx.createGain();
        groundGain.gain.value = 0.08;
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

      // === TINNITUS NOTCH ===
      if (freq.isNotch) {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const notchFilter = ctx.createBiquadFilter();
        notchFilter.type = 'notch';
        notchFilter.frequency.value = freq.notchHz || 8000;
        notchFilter.Q.value = 5;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 4000;
        bandpass.Q.value = 0.3;

        noise.connect(bandpass);
        bandpass.connect(notchFilter);
        notchFilter.connect(masterGain);
        noise.start();
        nodes.push(noise, notchFilter, bandpass);

        const alphaL = ctx.createOscillator();
        alphaL.frequency.value = 200;
        alphaL.type = 'sine';
        const alphaR = ctx.createOscillator();
        alphaR.frequency.value = 210;
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
        return;
      }

      // === BINAURAL ===
      if (freq.binaural) {
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

        // === SWEEP ===
        if (freq.isSweep) {
          const sweepTime = freq.sweepDuration || 30;
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(20, now);
          osc.frequency.exponentialRampToValueAtTime(20000, now + sweepTime);
          osc.frequency.exponentialRampToValueAtTime(20, now + sweepTime * 2);

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

          const sweepLoopInterval = setInterval(() => {
            const t = ctx.currentTime;
            osc.frequency.cancelScheduledValues(t);
            osc.frequency.setValueAtTime(20, t);
            osc.frequency.exponentialRampToValueAtTime(20000, t + sweepTime);
            osc.frequency.exponentialRampToValueAtTime(20, t + sweepTime * 2);
          }, sweepTime * 2 * 1000);
          nodes.push({ stop: () => clearInterval(sweepLoopInterval), disconnect: () => {} });

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

        if (!freq.isSweep) {
          // Subharmonics + harmonics + ambient bed
          const harmonics = [
            { mult: 0.25, vol: 0.35 },
            { mult: 0.5, vol: 0.4 },
            { mult: 2, vol: 0.25 },
            { mult: 3, vol: 0.2 },
            { mult: 4, vol: 0.15 },
          ];
          harmonics.forEach(({ mult, vol }) => {
            const o = ctx.createOscillator();
            o.type = 'sine';
            o.frequency.value = carrier * mult;
            const g = ctx.createGain();
            g.gain.value = vol;
            o.connect(g);
            g.connect(masterGain);
            o.start();
            nodes.push(o, g);
          });

          const ambientFreqs = [
            carrier * 0.125, carrier * 0.33, carrier * 0.66,
            carrier * 1.5, carrier * 2.5, carrier * 3.5,
            carrier * 5, carrier * 7
          ];
          ambientFreqs.forEach((f, i) => {
            const o = ctx.createOscillator();
            o.type = 'sine';
            o.frequency.value = f;
            const g = ctx.createGain();
            g.gain.value = 0.03 + (i * 0.002);
            o.connect(g);
            g.connect(masterGain);
            o.start();
            nodes.push(o, g);
          });
        }
      }

      nodesRef.current = nodes;
      setIsPlaying(true);
      setSelected(freq);
      setTimer(0);

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

      // AI51 learning (anonymous, non-blocking)
      const playData = {
        frequency_id: freq.id,
        frequency_hz: freq.hz,
        time_of_day: new Date().getHours(),
        day_of_week: new Date().getDay(),
        device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        waveform_type: freq.waveform,
        healing_context: freq.description,
        frequency_type: freq.id.split('_')[0],
        session_start: new Date().toISOString(),
        expected_duration: freq.timer,
        is_repeat_user: localStorage.getItem(`uf51_used_${freq.id}`) === 'true'
      };

      localStorage.setItem(`uf51_used_${freq.id}`, 'true');
      localStorage.setItem('uf51_last_frequency', freq.id);

      try {
        await base44.entities.FrequencyPlay.create(playData);
      } catch (e) {
        try {
          const queue = JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
          queue.push({ type: 'FrequencyPlay', data: playData, queued_at: Date.now() });
          localStorage.setItem('uf51_offline_queue', JSON.stringify(queue));
        } catch (qe) {}
      }

      drawVisualizer();

      // HAPTIC FEEDBACK
      if (navigator.vibrate) {
        hapticIntervalRef.current = setInterval(() => {
          if (!analyserRef.current) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;
          const intensity = Math.floor((bass / 255) * 200);
          if (intensity > 30) navigator.vibrate(intensity);
        }, 200);
      }
    } catch (err) {
      isPlayingRef.current = false;
      alert('Audio blocked - tap again');
    }
  }, [stop, volume, drawVisualizer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    isPlaying, selected, timer, volume, setVolume,
    currentSweepFreq, timerTarget, setTimerTarget,
    timerTargetRef,
    play, stop, formatTime, canvasRef
  };
}