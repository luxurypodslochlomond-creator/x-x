import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

// ── THE DECK ────────────────────────────────────────────────────────────────────
// One tap, and the artist's own master is playing. No account, no sign-in, no waiting
// on a scan, no conversion, nothing to accept first. What is on the deck is the file
// the artist handed over — whole — so the reason to press play is simply that you want
// to hear it.
//
// The artist's own words stand beside the play button, because a piece of music given
// to help somebody is found by what it was given for, not by what a machine guesses.

const fmt = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const BARS = [0, 1, 2, 3, 4];

export default function MusicDeck({ track }) {
  const audioRef = useRef(null);
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

  if (!track.audio_url) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const seekTo = (event) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Number(event.target.value);
    setTime(el.currentTime);
  };

  const pct = length > 0 ? Math.min(100, (time / length) * 100) : 0;
  const kind = track.kind && track.kind !== 'other' ? track.kind.replaceAll('_', ' ') : '';
  const meta = [kind, track.spec].filter(Boolean).join(' · ');

  return (
    <section className="bg-[#efe7d6] border-b-2 border-[#141210]">
      <style>{`
        @keyframes deck-bars { 0%, 100% { transform: scaleY(.2); } 50% { transform: scaleY(1); } }
        .deck-groove { -webkit-appearance: none; appearance: none; width: 100%; height: 36px; background-color: transparent; }
        .deck-groove::-webkit-slider-runnable-track { height: 6px; background: transparent; }
        .deck-groove::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; margin-top: -7px; background: #e2602a; border: 2px solid #141210; }
        .deck-groove::-moz-range-track { height: 6px; background: transparent; }
        .deck-groove::-moz-range-thumb { width: 16px; height: 16px; border-radius: 0; background: #e2602a; border: 2px solid #141210; }
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

      <div className="px-5 lg:px-10 pt-5 pb-3 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#e2602a]">
            <COOLASFUCKTuningFork size={12} tone="signal" /> On the record
          </p>
          <h2 className="mt-1 text-[22px] leading-tight font-black font-mono uppercase text-[#141210] break-words">{track.title}</h2>
          <p className="mt-1 text-[12px] font-mono text-[#5a5246] break-words">{track.artist_name}</p>
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Turn the sound back on' : 'Turn the sound off'}
          className="w-11 h-11 flex items-center justify-center border-2 border-[#141210]/25 text-[#141210] active:bg-[#141210]/10 transition-colors flex-shrink-0"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-5 lg:px-10 pb-2">
        {broken ? (
          <p className="border-2 border-[#141210]/25 px-3 py-3 text-[11px] font-mono text-[#141210] leading-relaxed">
            This device will not read this master's own format. The file is printed below, whole and untouched —
            nothing was converted to make it play.
          </p>
        ) : (
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 bg-[#141210] text-[#efe7d6] px-4 min-h-[84px] active:bg-[#1e3a2b] transition-colors"
          >
            <span className="w-14 h-14 flex-shrink-0 border-2 border-[#e2602a] flex items-center justify-center">
              {playing
                ? <Pause className="w-6 h-6 text-[#e2602a]" strokeWidth={2.5} />
                : <Play className="w-6 h-6 text-[#e2602a] ml-0.5" strokeWidth={2.5} />}
            </span>
            <span className="flex-1 min-w-0 text-left">
              <span className="block text-[13px] font-black font-mono uppercase tracking-[0.15em]">
                {playing ? 'Playing' : 'Play the master'}
              </span>
              <span className="block mt-0.5 text-[10px] font-mono text-[#efe7d6]/55">
                {playing ? `${fmt(time)} of ${fmt(length)}` : `Free to hear · ${fmt(length)} · no account, nothing counted`}
              </span>
            </span>
            <span className="flex items-end gap-[3px] h-6 flex-shrink-0" aria-hidden="true">
              {BARS.map((i) => (
                <span
                  key={i}
                  className="w-[3px] bg-[#e2602a] origin-bottom"
                  style={{
                    height: '100%',
                    animation: playing ? `deck-bars ${0.7 + i * 0.12}s ease-in-out ${i * 0.08}s infinite` : 'none',
                    transform: playing ? undefined : 'scaleY(0.2)',
                  }}
                />
              ))}
            </span>
          </button>
        )}
      </div>

      {!broken && (
        <div className="px-4 lg:px-9">
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
              backgroundImage: `linear-gradient(to right, #e2602a ${pct}%, #141210 ${pct}%)`,
              backgroundSize: '100% 6px',
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

      {track.statement && (
        <div className="mx-5 lg:mx-10 mt-3 mb-3 border-l-4 border-[#e2602a] pl-3">
          <p className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#5a5246]">The giver's own words</p>
          <p className="mt-1 text-[14px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{track.statement}</p>
        </div>
      )}

      <p className="px-5 lg:px-10 pb-4 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        {meta ? `${meta} · ` : ''}the master itself, whole. Nothing was converted, cut or re-encoded to make it play.
      </p>
    </section>
  );
}