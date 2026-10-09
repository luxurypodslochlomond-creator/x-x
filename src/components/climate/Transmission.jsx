import React from 'react';
import TransmissionMiniVisualizer from './TransmissionMiniVisualizer';

// ── THE TRANSMISSION ──
// Drop the artist's delivered track URL here when ready.
// Until then, the visualizer runs in generative mode.
const TRANSMISSION_URL = ''; // ← swap with ASLOVE's delivered audio URL
const ARTIST_NAME = 'ASLOVE';
const TRACK_TITLE = 'Transmission';
const DEDICATION = 'For Janine · for the planet · for all of us';

export default function Transmission() {
  const awaiting = !TRANSMISSION_URL;

  return (
    <section className="relative bg-[#141210] text-[#efe7d6] overflow-hidden border-b-2 border-[#141210]">
      <style>{`
        @keyframes tx-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
      `}</style>

      {/* Label */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-2" style={{ animation: 'tx-flicker 7s linear infinite' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">Transmission</span>
        <div className="flex-1 h-px bg-[#efe7d6]/15" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#efe7d6]/40">{awaiting ? 'standby' : 'live'}</span>
      </div>

      {/* Mini visualizer — small, inline, coolasfuck */}
      <div className="px-5">
        <TransmissionMiniVisualizer audioUrl={TRANSMISSION_URL} />
      </div>

      {/* Track info */}
      <div className="px-5 py-3">
        <h3 className="text-[15px] font-black font-mono uppercase leading-none text-[#efe7d6] truncate" style={{ letterSpacing: '-0.01em' }}>
          {TRACK_TITLE}
        </h3>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#efe7d6]/50 mt-1 truncate">
          {awaiting ? 'Tap the circle · feel the signal' : ARTIST_NAME}
        </p>
      </div>

      {/* Dedication */}
      <p className="px-5 pb-4 text-[10px] font-mono text-[#efe7d6]/40 leading-relaxed italic">{DEDICATION}</p>
    </section>
  );
}