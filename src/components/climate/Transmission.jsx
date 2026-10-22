import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TransmissionConsole from './TransmissionConsole';
import TransmissionRecord from './TransmissionRecord';
import TransmissionFilm, { FILM_POSTER } from './TransmissionFilm';
import ShareCardButton from './ShareCardButton';
import { buildTransmissionShareCard } from './shareCardImage';

// ── THE TRANSMISSION ──
// Dillon Squire's track, given free to the record and credited to him by name.
// It is not a stream and not for sale: nothing here charges for it, and the page
// says so, so nobody has to wonder. Served lossless — the master exactly as it
// left the studio, nothing thrown away between the desk and the listener. The console only pulls the file when a person presses
// play, so nothing is spent until someone chooses to listen. The music drives the
// picture — the scope and the falling spectrogram move to his sound, not a synth.
const TRANSMISSION_URL = 'https://media.base44.com/files/public/6889f31e76713b9cd47e043c/06f236f63_DS_XRAYGIRL_MSTGB2_44_16.wav';
const TRACK_TITLE = 'X-Ray Girl';
const DEDICATION = 'For the planet · for all of us';

// ── PASS IT ON ── the track leaves as the same kind of card the wire entries do: who made
// it, that it was given and not sold, the master's real spec, and where it lives. The card
// is drawn on the reader's own device, so a share needs no server and nobody is tracked.
const TRACK_CARD = {
  id: 'dillon-squire-x-ray-girl',
  headline: 'X-Ray Girl — Dillon Squire, given free to the record',
  title: TRACK_TITLE,
  artist: 'Dillon Squire',
  dedication: DEDICATION,
  spec: 'WAV · 44.1 kHz · 16-bit',
  body: 'Made for the record and given to it. Free to listen — nothing to buy, no paywall, no ad. His name stays on it, and the record never charges for it.',
  image_url: FILM_POSTER,
  image_credit: "Frame from Dillon Squire's film · Stoneymollan, Loch Lomond, Scotland",
  url_path: '/TogetherChangeClimate',
};

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

      {/* ── THE FILM ── Dillon's film from Stoneymollan, the ground this is all for ── */}
      <TransmissionFilm />

      {/* ── THE GIFT ── said out loud, so nobody has to wonder what it costs ── */}
      <div className="bg-[#1e3a2b] text-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t-2 border-[#141210] flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-1.5">Given, not sold</p>
          <p className="text-[13px] leading-relaxed text-[#efe7d6]/90">
            Dillon Squire made this for the record and gave it to it. Free to listen, nothing
            to buy, no paywall, no ad. His name stays on it, and the record never charges for it.
          </p>
        </div>
        <ShareCardButton entry={TRACK_CARD} build={buildTransmissionShareCard} compact />
      </div>

      {/* ── HONEST CAPTION ── passes the panel, feels the truth ── */}
      <div className="bg-[#141210] text-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t border-[#efe7d6]/10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-2">
          The signal
        </p>
        <p className="text-[13px] leading-relaxed text-[#efe7d6]/80">
          The transmission is tuned to the Earth's resonance — 7.83 Hz, the cavity
          between the planet's surface and the ionosphere, measured since 1952.
          Resonance is real physics: when a frequency matches a system's natural
          frequency, the amplitude increases. That is not mysticism, it is how
          resonance works.
        </p>
        <p className="text-[13px] leading-relaxed text-[#efe7d6]/80 mt-3">
          Zero loss means one thing, exactly: nothing is thrown away between Dillon's
          desk and your ears. Every streaming service discards most of a file to save
          bandwidth. This does not — what arrives is the master, whole.
        </p>
        <p className="text-[12px] leading-relaxed text-[#efe7d6]/55 mt-2">
          It is not a promise of magic from a phone speaker. A master is only as good
          as what it comes out of — headphones, a stereo, a car. Give it one of those
          and you hear the record he actually made.
        </p>
      </div>

      {/* ── ON THE RECORD ── provenance and a citation, so the work can be checked and quoted ── */}
      <TransmissionRecord />

      {/* ── KEPT BY PEOPLE ── the honest moment to ask is the moment someone has just listened ── */}
      <div className="bg-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t-2 border-[#141210] flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black font-mono uppercase tracking-wide text-[#141210]">Free to read. Free to listen. Nothing for sale.</p>
          <p className="text-[11px] font-mono text-[#5a5246] mt-1 leading-relaxed">The record is kept online by the people who read it — not by ads, and never by selling the music.</p>
        </div>
        <Link
          to={createPageUrl('ClimateSupport')}
          className="flex-shrink-0 px-3 py-2.5 bg-[#e2602a] text-[#141210] text-[10px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
        >
          Keep it going →
        </Link>
      </div>
    </div>
  );
}