import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// ── THE TRANSMISSION ──
// Drop the artist's delivered track URL here when ready.
// Until then, the player shows an honest "awaiting signal" state.
const TRANSMISSION_URL = ''; // ← swap with ASLOVE's delivered audio URL
const ARTIST_NAME = 'ASLOVE';
const TRACK_TITLE = 'Transmission';
const DEDICATION = 'For Janine · for the planet · for all of us';

export default function Transmission() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [awaiting, setAwaiting] = useState(!TRANSMISSION_URL);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = async () => {
    if (awaiting) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { try { await audio.play(); setPlaying(true); } catch { /* autoplay blocked */ } }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const pct = duration ? (progress / duration) * 100 : 0;
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative bg-[#141210] text-[#efe7d6] overflow-hidden border-b-2 border-[#141210]">
      <style>{`
        @keyframes tx-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(226,96,42,0.5); } 50% { box-shadow: 0 0 0 14px rgba(226,96,42,0); } }
        @keyframes tx-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
        @keyframes tx-scan { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
      `}</style>

      {/* Scanline sweep — raw signal feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)' }} />

      <div className="relative px-5 py-8">
        {/* Label */}
        <div className="flex items-center gap-2 mb-5" style={{ animation: 'tx-flicker 7s linear infinite' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">Transmission</span>
          <div className="flex-1 h-px bg-[#efe7d6]/15" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#efe7d6]/40">{awaiting ? 'standby' : 'live'}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Play button — the stamp */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.94 }}
            disabled={awaiting}
            aria-label={playing ? 'Pause transmission' : 'Play transmission'}
            className="relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#e2602a] flex items-center justify-center bg-[#141210] disabled:opacity-40 disabled:cursor-not-allowed"
            style={!awaiting && playing ? { animation: 'tx-pulse 2s ease-in-out infinite' } : {}}
          >
            {awaiting ? (
              <span className="text-[#e2602a] text-[20px] font-black">⋯</span>
            ) : playing ? (
              <Pause className="w-6 h-6 text-[#e2602a]" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-[#e2602a] ml-1" fill="currentColor" />
            )}
          </motion.button>

          {/* Track info + waveform */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-black font-mono uppercase leading-none text-[#efe7d6] truncate" style={{ letterSpacing: '-0.01em' }}>
              {TRACK_TITLE}
            </h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#efe7d6]/50 mt-1 truncate">
              {awaiting ? 'Awaiting artist signal' : ARTIST_NAME}
            </p>

            {/* Progress as a raw signal bar */}
            <div className="mt-3 relative h-1 bg-[#efe7d6]/10 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[#e2602a]" style={{ width: `${pct}%` }} />
              {!awaiting && playing && (
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#efe7d6]/30 to-transparent" style={{ animation: 'tx-scan 2.4s linear infinite' }} />
              )}
            </div>

            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[9px] font-mono text-[#efe7d6]/40">{awaiting ? '--:--' : fmt(progress)}</span>
              <span className="text-[9px] font-mono text-[#efe7d6]/40">{awaiting ? '--:--' : fmt(duration)}</span>
            </div>
          </div>

          {/* Mute toggle */}
          {!awaiting && (
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-[#efe7d6]/50 active:text-[#e2602a] transition-colors">
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Dedication */}
        <p className="mt-5 text-[10px] font-mono text-[#efe7d6]/40 leading-relaxed italic">{DEDICATION}</p>
      </div>

      {!awaiting && (
        <audio ref={audioRef} src={TRANSMISSION_URL} loop preload="metadata" />
      )}
    </section>
  );
}