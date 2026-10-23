import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// ── THE QUANTUM EQUALISER ──
// Deep house beyond quantum graphic equaliser.
// Real FFT when audio exists · generative 122 BPM deep house when it doesn't.
// Beadie Signal palette, in the ocean key: ink #141210 · paper #efe7d6 · signal #7fc9e4 · green #1e3a2b
// (the record's own colours, retinted once in src/climate-palette.css at Janine's asking)

const BPM = 122;
const BEAT_MS = 60000 / BPM;

// Module-level audio singletons (createMediaElementSource can only be called once per element)
let _audioCtx = null;
let _analyser = null;
let _source = null;

export default function TransmissionVisualizer({ audioUrl, artistName, trackTitle, dedication, onClose }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const particlesRef = useRef([]);
  const waterfallRef = useRef([]);
  const startTimeRef = useRef(performance.now());

  const hasAudio = !!audioUrl;

  const ensureAnalyser = useCallback(() => {
    if (!hasAudio || !audioRef.current || _analyser) return _analyser;
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      _analyser = _audioCtx.createAnalyser();
      _analyser.fftSize = 256;
      _analyser.smoothingTimeConstant = 0.82;
      _source = _audioCtx.createMediaElementSource(audioRef.current);
      _source.connect(_analyser);
      _analyser.connect(_audioCtx.destination);
    } catch { /* already connected or blocked */ }
    return _analyser;
  }, [hasAudio]);

  const toggle = async () => {
    if (hasAudio && audioRef.current) {
      if (playing) { audioRef.current.pause(); setPlaying(false); }
      else {
        try {
          ensureAnalyser();
          if (_audioCtx?.state === 'suspended') await _audioCtx.resume();
          await audioRef.current.play();
          setPlaying(true);
        } catch { /* autoplay blocked */ }
      }
    } else {
      setPlaying(!playing);
    }
  };

  // Audio event listeners
  useEffect(() => {
    if (!hasAudio || !audioRef.current) return;
    const a = audioRef.current;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
    };
  }, [hasAudio]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      try { _source?.disconnect(); } catch {}
      try { _analyser?.disconnect(); } catch {}
      try { _audioCtx?.close(); } catch {}
      _source = null; _analyser = null; _audioCtx = null;
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

    const freqArr = new Uint8Array(128);
    const waveArr = new Uint8Array(128);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2 - 20;
      const t = performance.now() - startTimeRef.current;
      const minDim = Math.min(w, h);

      // Get frequency data (real or synthetic)
      let freq, wave;
      if (_analyser && playing && hasAudio) {
        _analyser.getByteFrequencyData(freqArr);
        _analyser.getByteTimeDomainData(waveArr);
        freq = freqArr;
        wave = waveArr;
      } else {
        freq = synthFreq(t, playing);
        wave = synthWave(t, playing);
      }

      // 1. Clear
      ctx.fillStyle = '#141210';
      ctx.fillRect(0, 0, w, h);

      // 2. Scanlines
      ctx.fillStyle = 'rgba(233,238,236,0.025)';
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

      // 3. Radial grid
      const maxR = Math.max(60, minDim / 2 - 50);
      ctx.strokeStyle = 'rgba(233,238,236,0.04)';
      ctx.lineWidth = 1;
      for (let r = 50; r < maxR; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Frequency bars (radial) + collect tips for quantum threads
      const numBars = 64;
      const innerR = Math.max(35, minDim * 0.07);
      const maxBarLen = Math.max(20, maxR - innerR);
      const tips = [];

      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
        const value = freq[i * 2] / 255;
        const barLen = Math.max(2, value * maxBarLen);
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * (innerR + barLen);
        const y2 = cy + Math.sin(angle) * (innerR + barLen);
        tips.push({ x: x2, y: y2, value });

        let color;
        if (i < 12) color = '#1e3a2b';
        else if (i < 36) color = '#7fc9e4';
        else color = '#efe7d6';

        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.35 + value * 0.65;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Particle emission on peaks
        if (value > 0.75 && Math.random() < 0.08) {
          particlesRef.current.push({
            x: x2, y: y2,
            vx: Math.cos(angle) * (1 + value * 4),
            vy: Math.sin(angle) * (1 + value * 4),
            life: 1, color,
          });
        }
      }
      ctx.globalAlpha = 1;

      // 4b. Quantum threads — connect tips of high-energy adjacent bars
      ctx.strokeStyle = 'rgba(127,201,228,0.12)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < tips.length; i++) {
        const a = tips[i];
        const b = tips[(i + 1) % tips.length];
        if (a.value > 0.3 && b.value > 0.3) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // 5. Waveform ring (circular oscilloscope)
      ctx.strokeStyle = '#7fc9e4';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      for (let i = 0; i < 128; i++) {
        const angle = (i / 128) * Math.PI * 2 - Math.PI / 2;
        const v = (wave[i] - 128) / 128;
        const r = Math.max(10, innerR - 8 + v * 18);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = 1;

      // 6. Center heart (bass reactive)
      const bass = (freq[0] + freq[1] + freq[2] + freq[3]) / 4 / 255;
      const heartR = Math.max(8, 18 + bass * 35);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, heartR);
      grad.addColorStop(0, 'rgba(127,201,228,0.85)');
      grad.addColorStop(0.4, 'rgba(127,201,228,0.25)');
      grad.addColorStop(1, 'rgba(127,201,228,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, heartR, 0, Math.PI * 2);
      ctx.fill();

      // 7. Inner core
      ctx.fillStyle = '#efe7d6';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2, 3 + bass * 5), 0, Math.PI * 2);
      ctx.fill();

      // 8. Particles
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
      ctx.globalAlpha = 1;

      // 9. Frequency labels
      ctx.fillStyle = 'rgba(233,238,236,0.25)';
      ctx.font = '8px ui-monospace, SFMono-Regular, monospace';
      ctx.textAlign = 'center';
      const labels = ['20Hz', '100Hz', '500Hz', '2kHz', '8kHz', '20kHz'];
      for (let i = 0; i < labels.length; i++) {
        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
        const r = maxR + 14;
        ctx.fillText(labels[i], cx + Math.cos(angle) * r, cy + Math.sin(angle) * r + 3);
      }

      // 10. Spectrum waterfall (scrolling frequency history at bottom)
      waterfallRef.current.push(new Uint8Array(freq));
      if (waterfallRef.current.length > 120) waterfallRef.current.shift();
      const wfH = 36;
      const wfY = h - wfH;
      const colW = w / 120;
      for (let x = 0; x < waterfallRef.current.length; x++) {
        const frame = waterfallRef.current[x];
        const xPos = w - (waterfallRef.current.length - x) * colW;
        for (let f = 0; f < 64; f++) {
          const v = frame[f * 2] / 255;
          if (v < 0.05) continue;
          const y = wfY + wfH - (f / 64) * wfH;
          if (v > 0.6) ctx.fillStyle = `rgba(127,201,228,${v})`;
          else if (v > 0.3) ctx.fillStyle = `rgba(30,58,43,${v})`;
          else ctx.fillStyle = `rgba(233,238,236,${v * 0.4})`;
          ctx.fillRect(xPos, y, colW + 1, 2);
        }
      }

      // 11. Beat indicator
      const beatNum = Math.floor((t / BEAT_MS) % 4) + 1;
      ctx.fillStyle = 'rgba(233,238,236,0.3)';
      ctx.font = 'bold 9px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`\u25C6 ${beatNum}/4 \u00B7 ${BPM} BPM`, 16, 24);

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [playing, hasAudio]);

  const pct = duration ? (progress / duration) * 100 : 0;
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#141210]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette — pulls you into the signal */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(20,18,16,0.75) 100%)' }} />

      {/* Edge frame — transmission screen, not a modal */}
      <div className="absolute inset-0 pointer-events-none border-2 border-[#e2602a]/15" />

      {hasAudio && <audio ref={audioRef} src={audioUrl} loop preload="metadata" />}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">
            {hasAudio ? 'Transmission' : 'Generating'}
          </span>
        </div>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[#efe7d6]/20 text-[#efe7d6]/60 active:text-[#e2602a] active:border-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-[#141210] via-[#141210]/85 to-transparent">
        <div className="flex items-center gap-4 mb-3">
          <button onClick={toggle} className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-[#e2602a] flex items-center justify-center bg-[#141210] active:scale-95 transition-transform">
            {playing ? <Pause className="w-6 h-6 text-[#e2602a]" fill="currentColor" /> : <Play className="w-6 h-6 text-[#e2602a] ml-1" fill="currentColor" />}
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-black font-mono uppercase text-[#efe7d6] truncate">{trackTitle}</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#efe7d6]/50 truncate">
              {hasAudio ? artistName : 'Quantum \u00B7 Generative'}
            </p>
          </div>
          {hasAudio && (
            <button onClick={() => { if (audioRef.current) { audioRef.current.muted = !audioRef.current.muted; setMuted(audioRef.current.muted); } }} className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#efe7d6]/50 active:text-[#e2602a]">
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
        </div>
        <div className="h-1 bg-[#efe7d6]/10 overflow-hidden">
          {hasAudio && <div className="h-full bg-[#e2602a]" style={{ width: `${pct}%` }} />}
          {!hasAudio && playing && (
            <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#e2602a]/40 to-transparent" style={{ animation: 'qe-scan 2.4s linear infinite' }} />
          )}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[9px] font-mono text-[#efe7d6]/40">{hasAudio ? fmt(progress) : '\u221E'}</span>
          <span className="text-[9px] font-mono text-[#efe7d6]/40">{hasAudio ? fmt(duration) : '\u221E'}</span>
        </div>
        {dedication && <p className="mt-3 text-[10px] font-mono text-[#efe7d6]/30 italic text-center">{dedication}</p>}
      </div>

      <style>{`@keyframes qe-scan { from { transform: translateX(-100%); } to { transform: translateX(100vw); } }`}</style>
    </div>
  );
}

// ── Generative deep house frequency data ──
function synthFreq(t, isPlaying) {
  const data = new Uint8Array(128);
  const beatPos = (t % (BEAT_MS * 4)) / BEAT_MS;
  const beat = Math.floor(beatPos) % 4;
  const frac = beatPos % 1;

  for (let i = 0; i < 128; i++) {
    let v = 0;
    if (isPlaying) {
      // Kick (four on the floor)
      v += Math.exp(-frac * 7) * 200 * Math.exp(-i / 6);
      // Bass line
      const bassPat = [1, 0.3, 0.6, 0.3][beat] || 0;
      v += bassPat * Math.exp(-frac * 2) * 80 * Math.exp(-i / 18) * (1 + Math.sin(t * 0.003) * 0.2);
      // Hi-hats on offbeats
      v += Math.exp(-Math.pow((frac - 0.5) * 12, 2)) * 70 * (i / 128);
      // Pad
      v += (Math.sin(t * 0.0006 + i * 0.03) * 0.5 + 0.5) * 25 * Math.exp(-Math.abs(i - 35) / 25);
      // Noise floor
      v += Math.random() * 6;
    } else {
      // Idle breathing
      v = Math.sin(t * 0.0008 + i * 0.04) * 6 + 8;
    }
    data[i] = Math.max(0, Math.min(255, v));
  }
  return data;
}

function synthWave(t, isPlaying) {
  const data = new Uint8Array(128);
  for (let i = 0; i < 128; i++) {
    let v = 128;
    if (isPlaying) {
      v += Math.sin(t * 0.005 + i * 0.1) * 18;
      v += Math.sin(t * 0.011 + i * 0.05) * 8;
    } else {
      v += Math.sin(t * 0.001 + i * 0.1) * 4;
    }
    data[i] = Math.max(0, Math.min(255, v));
  }
  return data;
}