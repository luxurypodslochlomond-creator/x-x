import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import TransmissionConsole from './TransmissionConsole';
import TransmissionRecord from './TransmissionRecord';
import TransmissionFilm, { FILM_POSTER } from './TransmissionFilm';
import ShareCardButton from './ShareCardButton';
import { buildTransmissionShareCard } from './shareCardImage';

// ── THE TRANSMISSION ──
// This panel used to BE one track: Dillon Squire's "X-Ray Girl" was written into the code
// itself — the file, the title, the spec, the share card, the film credit. So when the
// track was taken off the record at Janine's asking, the panel went on playing it, because
// nothing that plays music should have been naming a song in its own source.
//
// Now the panel asks the record which piece stands as the theme, and plays that one. No
// theme, no panel at all: the room does not carry an empty instrument and does not say the
// same thing twice, because the line above it already says the theme is being made. The
// moment a piece is marked as the theme, the console, the film, the gift and the provenance
// all stand again, driven by the record itself — nothing here needs touching when it lands.
//
// The console still pulls the file only when a hand presses play, and its scope and falling
// spectrogram are driven by the sound, so the graphics are the music's and nobody else's.
const DEDICATION = 'For the planet · for all of us';

export default function Transmission() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    base44.entities.ClimateTrack.filter({ status: 'published', theme: true }, { limit: 1 })
      .then((page) => setTrack(page.items?.[0] || null))
      .catch(() => setTrack(null));
  }, []);

  if (!track) return null;

  const card = {
    id: track.id,
    headline: `${track.title} — ${track.artist_name}, given free to the record`,
    title: track.title,
    artist: track.artist_name,
    dedication: DEDICATION,
    spec: track.spec || 'WAV · 44.1 kHz · 16-bit',
    body: 'Made for the record and given to it. Free to listen — nothing to buy, no paywall, no ad. The name stays on it, and the record never charges for it.',
    image_url: track.cover_url || FILM_POSTER,
    image_credit: track.cover_url ? '' : "Frame from Dillon Squire's film · Stoneymollan, Loch Lomond, Scotland",
    url_path: '/ClimateMusic',
  };

  return (
    <div className="border-t-4 border-[#e2602a]">
      {/* ── THE INSTRUMENT ── the art and the transport in one panel: press play, the picture stays ── */}
      <TransmissionConsole
        audioUrl={track.audio_url}
        artistName={track.artist_name}
        trackTitle={track.title}
        dedication={DEDICATION}
      />

      {/* ── THE FILM ── Dillon's film from Stoneymollan, the ground this is all for ── */}
      <TransmissionFilm />

      {/* ── THE GIFT ── said out loud, so nobody has to wonder what it costs ── */}
      <div className="bg-[#1e3a2b] text-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t-2 border-[#141210] flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-1.5">Given, not sold</p>
          <p className="text-[13px] leading-relaxed text-[#efe7d6]/90">
            {track.artist_name} made this for the record and gave it to it. Free to listen, nothing
            to buy, no paywall, no ad. The name stays on it, and the record never charges for it.
          </p>
        </div>
        <ShareCardButton entry={card} build={buildTransmissionShareCard} compact />
      </div>

      {/* ── ON THE RECORD ── provenance and a citation, so the work can be checked and quoted ── */}
      <TransmissionRecord />
    </div>
  );
}