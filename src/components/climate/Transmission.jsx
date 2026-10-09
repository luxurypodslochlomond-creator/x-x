import React from 'react';
import TransmissionConsole from './TransmissionConsole';

// ── THE TRANSMISSION ──
// Drop the artist's delivered track URL here when ready.
// Until then, the console runs on its own generative signal.
const TRANSMISSION_URL = ''; // ← swap with ASLOVE's delivered audio URL
const ARTIST_NAME = 'ASLOVE';
const TRACK_TITLE = 'Transmission';
const DEDICATION = 'For Janine · for the planet · for all of us';

// Honest, panel-safe framing — every word defensible.
const TRANSMISSION_ART =
  'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/e013dfb7b_generated_image.png';

export default function Transmission() {
  return (
    <div className="border-t-4 border-[#e2602a]">
      {/* ── THE ART ── the sound of the earth and universe, made visible ── */}
      <div className="relative bg-[#141210] overflow-hidden">
        <img
          src={TRANSMISSION_ART}
          alt="Earth's electromagnetic resonance — the Schumann cavity visualised"
          className="w-full h-auto block"
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)' }} />
      </div>

      {/* ── HONEST CAPTION ── passes the panel, feels the truth ── */}
      <div className="bg-[#141210] text-[#efe7d6] px-5 py-4 border-b border-[#efe7d6]/10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-2">
          The signal
        </p>
        <p className="text-[13px] leading-relaxed text-[#efe7d6]/80">
          The transmission is tuned to the Earth's resonance — 7.83 Hz, the cavity
          between the planet's surface and the ionosphere, measured since 1952.
          The beat is the human heartbeat — 60 BPM. The groove doubles it — the pace
          your body walks. When many tune in, the field strengthens. That is not
          mysticism. It is how resonance works.
        </p>
      </div>

      {/* ── THE CONSOLE ── tap the planet, feel the signal ── */}
      <TransmissionConsole
        audioUrl={TRANSMISSION_URL}
        artistName={ARTIST_NAME}
        trackTitle={TRACK_TITLE}
        dedication={DEDICATION}
      />
    </div>
  );
}