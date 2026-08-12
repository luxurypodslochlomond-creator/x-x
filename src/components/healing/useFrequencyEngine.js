import { useState, useRef, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { createAudioGraph } from '@/components/healing/frequencySynthesis';

/**
 * useFrequencyEngine — React state + lifecycle for Frequency Chamber.
 * Audio synthesis lives in frequencySynthesis.js.
 * Visualizer canvas logic lives inline (small).
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
  const sweepIntervalRef = useRef(null);
  const wakeLockRef = useRef(null);
  const timerTargetRef = useRef(null);
  const isPlayingRef = useRef(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying && animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, [isPlaying]);

  useEffect(() => {
    nodesRef.current.forEach(node => {
      if (node?.gain && audioCtxRef.current) {
        try { node.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1); } catch (e) {}
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

    let time = 0, breathingTime = 0;

    const draw = () => {
      if (!isPlayingRef.current) return;
      animFrameRef.current = requestAnimationFrame(draw);
      time += 0.02;
      breathingTime += 0.015;

      const breathCycle = 20;
      const breathProgress = (breathingTime % breathCycle) / breathCycle;
      let breathPhase, breathColor, breathIntensity;

      if (breathProgress < 0.2) { breathPhase = 'inhale'; breathIntensity = breathProgress / 0.2; breathColor = '#06b6d4'; }
      else if (breathProgress < 0.5) { breathPhase = 'hold'; breathIntensity = 1; breathColor = '#fbbf24'; }
      else if (breathProgress < 0.9) { breathPhase = 'exhale'; breathIntensity = 1 - ((breathProgress - 0.5) / 0.4); breathColor = '#ec4899'; }
      else { breathPhase = 'pause'; breathIntensity = 0.3; breathColor = '#10b981'; }

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
      ctx.fillText(
        breathPhase === 'inhale' ? 'BREATHE IN' : breathPhase === 'hold' ? 'HOLD' : breathPhase === 'exhale' ? 'BREATHE OUT' : 'REST',
        centerX, centerY + (isMobile ? 30 : 60)
      );
    };
    draw();
  }, [selected]);

  useEffect(() => {
    if (isPlaying && selected) drawVisualizer();
  }, [isPlaying, selected, drawVisualizer]);

  // === STOP ===
  const stop = useCallback(async () => {
    isPlayingRef.current = false;
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null; }
    if (wakeLockRef.current) { try { await wakeLockRef.current.release(); wakeLockRef.current = null; } catch (e) {} }
    if (sweepIntervalRef.current) { clearInterval(sweepIntervalRef.current); sweepIntervalRef.current = null; }

    if (selected) {
      try {
        const sessions = JSON.parse(localStorage.getItem('uf51_sessions') || '[]');
        sessions.push({
          frequency_id: selected.id,
          session_duration: timer,
          expected_duration: selected.timer,
          completed: timer >= parseInt(selected.timer) * 60 * 0.8,
          timestamp: new Date().toISOString()
        });
        if (sessions.length > 50) sessions.shift();
        localStorage.setItem('uf51_sessions', JSON.stringify(sessions));
      } catch (e) {}
    }

    nodesRef.current.forEach(n => { try { n.stop?.(); n.disconnect?.(); } catch(e) {} });
    nodesRef.current = [];
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (hapticIntervalRef.current) { clearInterval(hapticIntervalRef.current); hapticIntervalRef.current = null; }

    analyserRef.current = null;
    timerTargetRef.current = null;
    setIsPlaying(false);
    setTimer(0);
    setTimerTarget(null);
    setCurrentSweepFreq(20);
  }, [selected, timer]);

  // === PLAY ===
  const play = useCallback(async (freq) => {
    stop();

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

      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      const { nodes, sweepInterval, earlyReturn } = createAudioGraph(ctx, freq, masterGain, setCurrentSweepFreq);
      if (sweepInterval) sweepIntervalRef.current = sweepInterval;
      nodesRef.current = nodes;

      setIsPlaying(true);
      setSelected(freq);
      setTimer(0);

      if (earlyReturn) {
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        drawVisualizer();
        return;
      }

      timerRef.current = setInterval(() => {
        setTimer(t => {
          const newTime = t + 1;
          if (timerTargetRef.current && newTime >= timerTargetRef.current) { stop(); return newTime; }
          return newTime;
        });
      }, 1000);

      // AI51 learning (non-blocking)
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

  useEffect(() => { return () => stop(); }, [stop]);

  return {
    isPlaying, selected, timer, volume, setVolume,
    currentSweepFreq, timerTarget, setTimerTarget, timerTargetRef,
    play, stop, formatTime, canvasRef
  };
}