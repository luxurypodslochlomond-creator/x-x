import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
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
// theme, no playback: while the theme is being made the panel says so in a line and the
// instrument stays dark. Nothing here plays at a reader who has not pressed it, and there
// is no hard-coded track for anybody to forget about again.
//
// The console still pulls the file only when a hand presses play, so nothing is spent
// until someone chooses to listen, and the music still drives the picture.
const DEDICATION = 'For the planet · for all of us';

export default function Transmission() {
  const [track, setTrack] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    base44.entities.ClimateTrack.filter({ status: 'published', theme: true }, { limit: 1 })
      .then((page) => setTrack(page.items?.[0] || null))
      .catch(() => setTrack(null))
      .finally(() => setLoaded(true));
  }, []);

  const card = track && {
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
      {/* ── THE NAME ON IT ── the music sat here with no word above it, so a reader meeting
             it did not know it was the record's music. Named plainly, with the way through
             to everything given so far. No glow, no player started, nothing asked for. */}
      <div id="music" className="bg-[#141210] text-[#efe7d6] px-5 lg:px-10 py-3 lg:py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 28px)', letterSpacing: '-0.02em' }}>
            Music
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mt-0.5">
            Given to the record · free · nothing to buy
          </p>
        </div>
        <Link
          to={createPageUrl('ClimateMusic')}
          className="shrink-0 px-3 py-2 border border-[#efe7d6]/40 hover:border-[#e2602a] hover:text-[#e2602a] text-[10px] font-black font-mono uppercase whitespace-nowrap transition-colors"
        >
          All the music →
        </Link>
      </div>

      {!loaded ? (
        <div className="bg-[#141210] px-5 lg:px-10 py-10 text-center">
          <p className="text-[11px] font-mono text-[#efe7d6]/45">Bringing the theme through…</p>
        </div>
      ) : !track ? (
        /* No theme yet. The instrument is dark rather than playing somebody else's piece. */
        <div className="bg-[#141210] text-[#efe7d6] px-5 lg:px-10 py-8 border-t border-[#efe7d6]/10">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-2">The theme</p>
          <p className="text-[13px] leading-relaxed text-[#efe7d6]/85">
            The record's theme is being made by Dillon Squire. It will stand here, pressed to play.
          </p>
        </div>
      ) : (
        <>
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
            {card && <ShareCardButton entry={card} build={buildTransmissionShareCard} compact />}
          </div>

          {/* ── ON THE RECORD ── provenance and a citation, so the work can be checked and quoted ── */}
          <TransmissionRecord />
        </>
      )}

      {/* ── NOTHING FOR SALE, AND NOBODY ASKED ──
          A statement, and it asks for nothing — the honest thing to say while giving is shut. */}
      <div className="bg-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t-2 border-[#141210]">
        <p className="text-[11px] font-black font-mono uppercase tracking-wide text-[#141210]">Free to read. Free to listen. Nothing for sale.</p>
        <p className="text-[11px] font-mono text-[#5a5246] mt-1 leading-relaxed">
          No ads, no sponsorship, and nothing to buy. How the record is paid for is a question
          for whoever carries it next, and it is not asked of you here.
        </p>
      </div>
    </div>
  );
}