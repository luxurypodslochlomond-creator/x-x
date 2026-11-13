import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

// ── THE RECORD'S THEME ─────────────────────────────────────────────────────────────
// One piece stands as the record's own signal. It is a signal, not a prize: marking it
// gives that track no rank, no count and no higher place in the list, and every other
// piece on the page is its equal.
//
// It is also never played at anyone. There is no autoplay here and no preloaded audio —
// the file is not even fetched until a hand presses play — so a reader meets the theme
// the way they meet every other master on this record: by choosing to hear it.
//
// Before the theme exists, the place says so plainly, in one line, rather than standing
// empty or pretending something is on its way that is not.

const fmt = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function ThemeSignal({ track }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(track?.seconds || 0);

  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setLength(track?.seconds || 0);
  }, [track?.id, track?.seconds]);

  if (!track) {
    return (
      <p className="mb-4 border-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-3 text-[10px] font-mono leading-relaxed text-[#5a5246]">
        <span className="text-[#e2602a] font-black uppercase tracking-widest">The theme is being made by Dillon Squire. </span>
        It will stand here, pressed to play.
      </p>
    );
  }

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <section className="mb-4 border-2 border-[#141210] bg-[#141210]">
      <audio
        ref={audioRef}
        src={track.audio_url}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { if (Number.isFinite(e.currentTarget.duration)) setLength(e.currentTarget.duration); }}
      />

      <div className="flex items-center gap-1.5 px-4 pt-4 text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#e2602a]">
        <COOLASFUCKTuningFork size={12} tone="signal" /> The record's theme
      </div>

      <div className="px-4 pt-2 pb-4 flex items-start gap-3">
        <button
          onClick={toggle}
          aria-label={playing ? `Pause the theme, ${track.title}` : `Play the theme, ${track.title}`}
          className="w-14 h-14 flex-shrink-0 border-2 border-[#e2602a] flex items-center justify-center active:bg-[#e2602a]/20 transition-colors"
        >
          {playing
            ? <Pause className="w-6 h-6 text-[#e2602a]" strokeWidth={2.5} />
            : <Play className="w-6 h-6 text-[#e2602a] ml-0.5" strokeWidth={2.5} />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[16px] leading-tight font-black font-mono uppercase text-[#efe7d6] break-words">{track.title}</p>
          <p className="mt-0.5 text-[11px] font-mono text-[#efe7d6]/60 break-words">{track.artist_name}</p>
          <p className="mt-1 text-[10px] font-mono text-[#efe7d6]/45">
            {playing || time > 0
              ? `${fmt(time)} of ${fmt(length || track.seconds || 0)}`
              : 'Pressed to play · never played at you · nothing counted'}
          </p>
        </div>
      </div>

      <p className="px-4 pb-4 text-[10px] font-mono leading-relaxed text-[#efe7d6]/45 border-t border-[#efe7d6]/10 pt-3">
        The theme stands as the record's own signal, not above the music: it takes no rank and no count, and every other
        piece on this page is its equal.
      </p>
    </section>
  );
}