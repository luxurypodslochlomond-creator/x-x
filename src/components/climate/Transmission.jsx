import React from 'react';
import TransmissionConsole from './TransmissionConsole';

// ── THE TRANSMISSION ──
// Dillon Squire's track, given to the record and credited to him by name. Served
// lossless: the master exactly as it left the studio, nothing thrown away between
// the desk and the listener. The console only pulls the file when a person presses
// play, so nothing is spent until someone chooses to listen. The music drives the
// picture — the scope and the falling spectrogram move to his sound, not a synth.
const TRANSMISSION_URL = 'https://media.base44.com/files/public/6889f31e76713b9cd47e043c/06f236f63_DS_XRAYGIRL_MSTGB2_44_16.wav';
const TRACK_TITLE = 'X-Ray Girl';
const DEDICATION = 'For the planet · for all of us';

export default function Transmission() {
  return (
    <div className="border-t-4 border-[#e2602a]">
      {/* ── THE INSTRUMENT ── the art and the transport in one panel: press play, the picture stays ── */}
      <TransmissionConsole
        audioUrl={TRANSMISSION_URL}
        artistName="Dillon Squire"
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
          Resonance is real physics: when a frequency matches a system's natural
          frequency, the amplitude increases. That is not mysticism, it is how
          resonance works. And what you hear is Dillon Squire's master, served
          exactly as it left him — nothing compressed, nothing thrown away.
        </p>
      </div>
    </div>
  );
}