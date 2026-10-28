import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';
import useMusicGlobe from './useMusicGlobe';
import PresenceMark from './PresenceMark';

// ── THE DECK ────────────────────────────────────────────────────────────────────
// The sphere is the player, and it stands at the head of the page: the first thing a
// listener meets is a world made of light turning with the sound, not a list asking to
// be searched.
//
// It is not decoration moving on a timer. The browser reads the master as it plays and
// the sphere answers it band by band — near points bright, far points dim, so it reads
// as depth rather than as a drawing, and the whole thing breathes with what you hear.
// That is how you tell whether a piece resonates before you have the words for it.
//
// One tap anywhere starts it: no account, nothing counted, nothing converted, the file
// whole and untouched. Where a device or a file will not be read for the picture, the
// sound still plays plainly — the listening is never traded for the looking.

const fmt = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const RING = 2 * Math.PI * 48;

export default function MusicDeck({ track }) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const playingRef = useRef(false);
  const pctRef = useRef(0);
  const graphRef = useRef(null);
  const levelRef = useRef({ bass: 0, mid: 0, treble: 0 });

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(track.seconds || 0);
  const [broken, setBroken] = useState(false);
  // A file that will not be read for the picture is still played plainly: the visual
  // gives way before the listening ever does.
  const [plain, setPlain] = useState(false);

  // A different track starts from its own beginning: nothing half-heard is carried over.
  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setBroken(false);
    setLength(track.seconds || 0);
    levelRef.current = { bass: 0, mid: 0, treble: 0 };
  }, [track.id, track.seconds]);

  useEffect(() => { playingRef.current = playing; }, [playing]);

  const pct = length > 0 ? Math.min(1, time / length) : 0;
  useEffect(() => { pctRef.current = pct; }, [pct]);

  // The sound itself, handed to the eye. Built on the first press of play, because a
  // browser will not open sound without a hand behind it.
  const openGraph = () => {
    const existing = graphRef.current;
    if (existing) {
      existing.ctx.resume?.();
      return;
    }
    const el = audioRef.current;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!el || plain || !Ctx) return;
    try {
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      graphRef.current = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
    } catch (err) {
      graphRef.current = null;
    }
  };

  useEffect(() => () => {
    const graph = graphRef.current;
    if (graph) graph.ctx.close?.();
    graphRef.current = null;
  }, []);

  useMusicGlobe({ canvasRef, graphRef, playingRef, levelRef });

  if (!track.audio_url) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el || broken) return;
    if (el.paused) {
      openGraph();
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekTo = (event) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Number(event.target.value);
    setTime(el.currentTime);
  };

  const handleError = () => {
    if (!plain) {
      // Play it plainly rather than lose it: the picture gives way, the music does not.
      graphRef.current = null;
      setPlaying(false);
      setTime(0);
      setPlain(true);
      return;
    }
    setBroken(true);
    setPlaying(false);
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
        key={plain ? 'plain' : 'heard'}
        ref={audioRef}
        src={track.audio_url}
        crossOrigin={plain ? undefined : 'anonymous'}
        preload="metadata"
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { if (Number.isFinite(e.currentTarget.duration)) setLength(e.currentTarget.duration); }}
        onError={handleError}
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
          style={{ background: 'radial-gradient(ellipse at center, rgba(226,96,42,0.08) 0%, transparent 60%)' }}
        />

        {/* The piece's place in the whole, worn as the sphere's own outer ring. */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 100 100" className="h-[80%] aspect-square" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(239,231,214,0.14)" strokeWidth="1.2" />
            {pct > 0 && (
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#e2602a"
                strokeWidth="1.6"
                strokeDasharray={RING}
                strokeDashoffset={RING * (1 - pct)}
                transform="rotate(-90 50 50)"
              />
            )}
          </svg>
        </span>

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

      {/* Whether anyone else is here — a mark, no words. Nothing about a listener
          leaves their device: it says only that the room is not empty. */}
      <span className="absolute top-[62px] right-[22px] z-10">
        <PresenceMark />
      </span>

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