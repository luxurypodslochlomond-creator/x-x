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
    <TransmissionConsole
      audioUrl={TRANSMISSION_URL}
      artistName={ARTIST_NAME}
      trackTitle={TRACK_TITLE}
      dedication={DEDICATION}
    />
  );
}