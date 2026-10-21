import React from 'react';
import TransmissionConsole from './TransmissionConsole';

// ── THE TRANSMISSION ──
// Drop the artist's delivered track URL here when ready.
// Until then, the console runs on its own generative signal.
const TRANSMISSION_URL = ''; // ← swap with ASLOVE's delivered audio URL
const ARTIST_NAME = 'ASLOVE';
const TRACK_TITLE = 'Transmission';
const DEDICATION = 'For Janine · for the planet · for all of us';

export default function Transmission() {
  return (
    <div className="border-t-4 border-[#e2602a]">
      {/* ── THE INSTRUMENT ── the art and the transport in one panel: press play, the picture stays ── */}
      <TransmissionConsole
        audioUrl={TRANSMISSION_URL}
        artistName={ARTIST_NAME}
        trackTitle={TRACK_TITLE}
        dedication={DEDICATION}
      />

      {/* ── HONEST CAPTION ── passes the panel, feels the truth ── */}
      <div className="bg-[#141210] text-[#efe7d6] px-5 py-4 border-t border-[#efe7d6]/10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-2">
          The signal
        </p>
        <p className="text-[13px] leading-relaxed text-[#efe7d6]/80">
          The transmission is tuned to the Earth's resonance — 7.83 Hz, the cavity
          between the planet's surface and the ionosphere, measured since 1952.
          The beat is the human heartbeat — 60 BPM. The groove doubles it — the pace
          your body walks. Resonance is real physics — when a frequency matches a
          system's natural frequency, the amplitude increases. That is not
          mysticism. It is how resonance works.
        </p>
      </div>
    </div>
  );
}