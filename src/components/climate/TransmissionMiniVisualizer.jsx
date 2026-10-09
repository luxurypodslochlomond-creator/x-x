import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';

// ── THE MINI QUANTUM EQUALISER ──
// Small inline canvas that lives inside the Transmission player.
// Beadie Signal palette: ink #141210 · bone #efe7d6 · signal #e2602a · green #1e3a2b
// The soul can feel it — a heartbeat, a signal, a pulse.

const BPM = 122;
const BEAT_MS = 60000 / BPM;

export default function TransmissionMiniVisualizer({ audioUrl }) {
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const startTimeRef = useRef(performance.now());

  // Module-level audio singletons
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioElRef = useRef(null);
  const hasAudio = !!audioUrl;

  const toggle = async () => {
    if (hasAudio && audioElRef.current) {
      if (playing) {
        audioElRef.current.pause();
        setPlaying(false);
      } else {
        try {
          if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioCtxRef.current.createAnalyser();
            analyserRef.current.fftSize = 128;
            analyserRef.current.smoothingTimeConstant = 0.82;
            sourceRef.current = audioCtxRef.current.createMediaElementSource(audioElRef.current);
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.connect(audioCtxRef.current.destination);
          }
          if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
          await audioElRef.current.play();
          setPlaying(true);
        } catch { /* autoplay blocked */ }
      }
    } else {
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    return () => {
      try { sourceRef.current?.disconnect(); } catch {}
      try { analyserRef.current?.disconnect(); } catch {}
      try { audioCtxRef.current?.close(); } catch {}
    };
  }, []);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const freqArr = new Uint8Array(64);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const t = performance.now() - startTimeRef.current;
      const minDim = Math.min(w, h);

      // Get frequency data
      let freq;
      if (analyserRef.current && playing && hasAudio) {
        analyserRef.current.getByteFrequencyData(freqArr);
        freq = freqArr;
      } else {
        freq = synthFreq(t, playing);
      }

      // Clear
      ctx.fillStyle = '#141210';
      ctx.fillRect(0, 0, w, h);

      // Scanlines
      ctx.fillStyle = 'rgba(239,231,214,0.03)';
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

      // Radial frequency bars
      const numBars = 48;
      const innerR = Math.max(8, minDim * 0.08);
      const maxR = Math.max(20, minDim / 2 - 6);
      const maxBarLen = Math.max(10, maxR - innerR);

      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
        const value = freq[i] / 255;
        const barLen = Math.max(1.5, value * maxBarLen);
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * (innerR + barLen);
        const y2 = cy + Math.sin(angle) * (innerR + barLen);

        let color;
        if (i < 9) color = '#1e3a2b';
        else if (i < 27) color = '#e2602a';
        else color = '#efe7d6';

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.3 + value * 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Quantum threads — connect high-energy tips
      ctx.strokeStyle = 'rgba(226,96,42,0.1)';
      ctx.lineWidth = 0.4;
      const tips = [];
      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
        const value = freq[i] / 255;
        tips.push({ x: cx + Math.cos(angle) * (innerR + value * maxBarLen), y: cy + Math.sin(angle) * (innerR + value * maxBarLen), value });
      }
      for (let i = 0; i < tips.length; i++) {
        const a = tips[i];
        const b = tips[(i + 1) % tips.length];
        if (a.value > 0.25 && b.value > 0.25) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Center heart — bass reactive
      const bass = (freq[0] + freq[1] + freq[2]) / 3 / 255;
      const heartR = Math.max(4, 6 + bass * 14);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, heartR);
      grad.addColorStop(0, 'rgba(226,96,42,0.8)');
      grad.addColorStop(0.5, 'rgba(226,96,42,0.2)');
      grad.addColorStop(1, 'rgba(226,96,42,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, heartR, 0, Math.PI * 2);
      ctx.fill();

      // Inner core
      ctx.fillStyle = '#efe7d6';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1, 1.5 + bass * 3), 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [playing, hasAudio]);

  return (
    <div className="relative w-full h-[120px] bg-[#141210] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {hasAudio && <audio ref={audioElRef} src={audioUrl} loop preload="metadata" />}
      {/* Play/pause overlay */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause transmission' : 'Play transmission'}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <span className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#e2602a] bg-[#141210]/80 backdrop-blur-sm transition-transform group-active:scale-90 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {playing ? <Pause className="w-5 h-5 text-[#e2602a]" fill="currentColor" /> : <Play className="w-5 h-5 text-[#e2602a] ml-0.5" fill="currentColor" />}
        </span>
      </button>
      {/* Beat indicator */}
      <span className="absolute top-2 left-2 text-[8px] font-mono text-[#efe7d6]/30 pointer-events-none">
        {playing ? `\u25C6 ${BPM} BPM` : 'standby'}
      </span>
    </div>
  );
}

// ── Generative frequency data ──
function synthFreq(t, isPlaying) {
  const data = new Uint8Array(64);
  const beatPos = (t % (BEAT_MS * 4)) / BEAT_MS;
  const beat = Math.floor(beatPos) % 4;
  const frac = beatPos % 1;

  for (let i = 0; i < 64; i++) {
    let v = 0;
    if (isPlaying) {
      v += Math.exp(-frac * 7) * 200 * Math.exp(-i / 5);
      const bassPat = [1, 0.3, 0.6, 0.3][beat] || 0;
      v += bassPat * Math.exp(-frac * 2) * 80 * Math.exp(-i / 14) * (1 + Math.sin(t * 0.003) * 0.2);
      v += Math.exp(-Math.pow((frac - 0.5) * 12, 2)) * 70 * (i / 64);
      v += (Math.sin(t * 0.0006 + i * 0.03) * 0.5 + 0.5) * 25 * Math.exp(-Math.abs(i - 18) / 20);
      v += Math.random() * 5;
    } else {
      v = Math.sin(t * 0.0008 + i * 0.04) * 5 + 6;
    }
    data[i] = Math.max(0, Math.min(255, v));
  }
  return data;
}