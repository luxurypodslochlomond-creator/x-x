import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

// ── THE DECK ────────────────────────────────────────────────────────────────────
// The sphere is the player. It fills the top of the plate, so the first thing a
// listener sees is the sound turning — not a bar, not a block of text, not something
// to scroll past. One tap anywhere on it, and the artist's own master is playing.
// Nothing to accept, no account, nothing counted, no conversion: the file stays whole.
//
// The progress lives on the sphere's own outer ring, so the whole player is one picture.

const fmt = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const FRONT = 'rgba(239, 231, 214, 0.42)';
const BACK = 'rgba(239, 231, 214, 0.12)';
const SIGNAL = '#e2602a';

export default function MusicDeck({ track }) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const playingRef = useRef(false);
  const pctRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(track.seconds || 0);
  const [broken, setBroken] = useState(false);

  // A different track starts from its own beginning: nothing half-heard is carried over.
  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setBroken(false);
    setLength(track.seconds || 0);
  }, [track.id, track.seconds]);

  useEffect(() => { playingRef.current = playing; }, [playing]);

  const pct = length > 0 ? Math.min(1, time / length) : 0;
  useEffect(() => { pctRef.current = pct; }, [pct]);

  // The sphere: it turns while the master plays, and holds still when it stops.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let spin = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w * 0.33, h * 0.33);
      spin += playingRef.current ? 0.0055 : 0.0012;

      // longitudes that turn with the sound
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i += 1) {
        const lon = spin + (i * Math.PI) / 6;
        let prev = null;
        for (let s = 0; s <= 44; s += 1) {
          const lat = (s / 44) * Math.PI * 2;
          const px = R * Math.cos(lat) * Math.cos(lon);
          const pz = R * Math.cos(lat) * Math.sin(lon);
          const py = R * Math.sin(lat);
          const persp = 1 + (0.26 * pz) / R;
          const sx = cx + px * persp;
          const sy = cy + py * persp;
          if (prev) {
            ctx.strokeStyle = pz > 0 ? FRONT : BACK;
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          }
          prev = [sx, sy];
        }
      }

      // latitudes that hold
      ctx.strokeStyle = 'rgba(239, 231, 214, 0.17)';
      for (let j = 1; j < 6; j += 1) {
        const lat = -Math.PI / 2 + (j / 6) * Math.PI;
        const ring = Math.abs(R * Math.cos(lat));
        ctx.beginPath();
        ctx.ellipse(cx, cy + R * Math.sin(lat), ring, ring * 0.26, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(239, 231, 214, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // the progress, worn as the sphere's own outer ring
      const rr = R * 1.19;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(239, 231, 214, 0.14)';
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.stroke();

      const head = -Math.PI / 2 + Math.PI * 2 * pctRef.current;
      if (pctRef.current > 0) {
        ctx.strokeStyle = SIGNAL;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, -Math.PI / 2, head);
        ctx.stroke();
        ctx.fillStyle = SIGNAL;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(head) * rr, cy + Math.sin(head) * rr, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // the centre: the stylus, breathing with the sound
      const beat = playingRef.current ? 0.55 + 0.45 * Math.sin(Date.now() / 240) : 0.3;
      ctx.fillStyle = `rgba(226, 96, 42, ${beat})`;
      ctx.beginPath();
      ctx.arc(cx, cy, playingRef.current ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!track.audio_url) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el || broken) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const seekTo = (event) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Number(event.target.value);
    setTime(el.currentTime);
  };

  const kind = track.kind && track.kind !== 'other' ? track.kind.replaceAll('_', ' ') : '';
  const meta = [kind, track.spec].filter(Boolean).join(' · ');

  return (
    <section className="relative bg-[#141210] border-b-2 border-[#141210]">
      <style>{`
        .deck-groove { -webkit-appearance: none; appearance: none; width: 100%; height: 34px; background-color: transparent; }
        .deck-groove::-webkit-slider-runnable-track { height: 5px; background: transparent; }
        .deck-groove::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6.5px; background: #e2602a; border: 2px solid #efe7d6; }
        .deck-groove::-moz-range-track { height: 5px; background: transparent; }
        .deck-groove::-moz-range-thumb { width: 16px; height: 16px; border-radius: 0; background: #e2602a; border: 2px solid #efe7d6; }
      `}</style>

      <audio
        ref={audioRef}
        src={track.audio_url}
        preload="metadata"
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { if (Number.isFinite(e.currentTarget.duration)) setLength(e.currentTarget.duration); }}
        onError={() => { setBroken(true); setPlaying(false); }}
      />

      {/* ── THE SPHERE IS THE PLAYER — one tap, anywhere on it ── */}
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        className="relative block w-full text-left h-[min(104vw,430px)] lg:h-[470px] select-none touch-manipulation"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

        <span
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(226,96,42,0.07) 0%, transparent 62%)' }}
        />
        <span
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)' }}
        />

        <span className="absolute left-4 right-16 top-4 block">
          <span className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#e2602a]">
            <COOLASFUCKTuningFork size={12} tone="signal" /> On the record
          </span>
          <span className="mt-1 block text-[20px] leading-tight font-black font-mono uppercase text-[#efe7d6] break-words">
            {track.title}
          </span>
          <span className="mt-0.5 block text-[11px] font-mono text-[#efe7d6]/55 break-words">{track.artist_name}</span>
        </span>

        <span className="absolute inset-x-4 bottom-4 flex items-center gap-3 border-2 border-[#e2602a]/70 bg-[#141210]/85 px-3 py-2.5">
          <span className="w-10 h-10 flex-shrink-0 border-2 border-[#e2602a] flex items-center justify-center">
            {playing
              ? <Pause className="w-5 h-5 text-[#e2602a]" strokeWidth={2.5} />
              : <Play className="w-5 h-5 text-[#e2602a] ml-0.5" strokeWidth={2.5} />}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[12px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]">
              {broken ? 'This device will not read it' : playing ? 'Playing' : 'Play the master'}
            </span>
            <span className="block mt-0.5 text-[10px] font-mono text-[#efe7d6]/55">
              {broken ? 'The file is below, whole and untouched' : `${fmt(time)} of ${fmt(length)} · free · nothing counted`}
            </span>
          </span>
        </span>
      </button>

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Turn the sound back on' : 'Turn the sound off'}
        className="absolute top-3.5 right-3.5 z-10 w-10 h-10 flex items-center justify-center border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6]/10 transition-colors"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {!broken && (
        <div className="px-4 lg:px-9 bg-[#efe7d6] pt-1">
          <input
            type="range"
            className="deck-groove"
            min={0}
            max={Math.max(1, Math.floor(length))}
            step={1}
            value={Math.floor(time)}
            onChange={seekTo}
            aria-label="Where in the track"
            style={{
              backgroundImage: `linear-gradient(to right, #e2602a ${pct * 100}%, #141210 ${pct * 100}%)`,
              backgroundSize: '100% 5px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-[#5a5246]">{fmt(time)}</span>
            <span className="text-[10px] font-mono text-[#5a5246]">{fmt(length)}</span>
          </div>
        </div>
      )}

      <div className="bg-[#efe7d6]">
        {track.statement && (
          <div className="mx-5 lg:mx-10 mt-2 mb-3 border-l-4 border-[#e2602a] pl-3">
            <p className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#5a5246]">The giver's own words</p>
            <p className="mt-1 text-[14px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{track.statement}</p>
          </div>
        )}

        <p className="px-5 lg:px-10 pb-4 text-[10px] font-mono text-[#5a5246] leading-relaxed">
          {meta ? `${meta} · ` : ''}the master itself, whole. Nothing was converted, cut or re-encoded to make it play.
        </p>
      </div>
    </section>
  );
}