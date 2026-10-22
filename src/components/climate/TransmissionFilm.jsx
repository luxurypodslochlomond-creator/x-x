import React from 'react';
import TapToPlayFilm from './TapToPlayFilm';

// ── THE FILM ── Dillon's film from Stoneymollan, the old coffin road above Loch
// Lomond. That ground is ours, so the credit says so. It opens on a tap and never by
// itself, and it carries its own honest label: this is a rough cut. A research panel
// must never mistake a work in progress for a finished work, and the day the finished
// film arrives it replaces this one and the label comes off.
const FILM_URL =
  'https://media.base44.com/videos/public/6889f31e76713b9cd47e043c/8a086126e_390fb315-feef-4d97-a1dd-e9643073c781.MP4';
const FILM_TITLE = 'Stoneymollan — the transmission film';
// The cover is a real frame cut from his own footage — never a picture of something
// that is not in the film.
const FILM_POSTER =
  'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/52c6264c9_IMG_2858.jpeg';
const FILM_CREDIT =
  'Filmed at Stoneymollan, Loch Lomond, Scotland · 14 October 2026 · Film: Dillon Squire · Rough cut, still being finished';

export default function TransmissionFilm() {
  return (
    <div className="bg-[#efe7d6] px-5 py-5 border-t-2 border-[#141210]">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b3261e] mb-1.5">
        The film
      </p>
      <p className="text-[12px] font-mono text-[#1a1612]/70 leading-relaxed">
        Stoneymollan, above Loch Lomond — our ground, on the record. Ten seconds of it, so far.
      </p>
      <TapToPlayFilm url={FILM_URL} title={FILM_TITLE} credit={FILM_CREDIT} poster={FILM_POSTER} />
    </div>
  );
}