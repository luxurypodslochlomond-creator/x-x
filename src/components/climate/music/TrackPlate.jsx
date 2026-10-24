import React from 'react';
import TransmissionConsole from '../TransmissionConsole';
import ShareCardButton from '../ShareCardButton';
import { buildTransmissionShareCard } from '../shareCardImage';
import { clock } from './audioSpec';
import { givenStamp } from './stamp';
import ListenerWords from './ListenerWords';

// ── ONE TRACK, STANDING THE SAME WAY AS EVERY OTHER ─────────────────────────────
// Dillon's track and an artist's track uploaded this morning are drawn by this same
// component from the same fields: no track is more featured than another, nobody pays
// for placement, and the order is the order they were given. That is the whole promise
// the page makes, so it is worth it being one component rather than two.
//
// The picture, if the artist gave one, travels with its credit on the card — the
// record's oldest rule, and it holds for music exactly as it holds for a photograph.

export default function TrackPlate({ track }) {
  if (!track) return null;

  const given = givenStamp(track.created_date);
  // A set is one continuous work by a selector. It is described as a set and not as a track,
  // because the first words a reader meets about a piece should be the true ones.
  const isSet = track.kind === 'set';

  const card = {
    id: track.id,
    headline: `${track.title} — ${track.artist_name}, given free to the record`,
    title: track.title,
    artist: track.artist_name,
    dedication: track.statement || '',
    spec: track.spec || '',
    body: `${track.artist_name} gave this to the record${given ? ` on ${given}` : ''}: free to listen, the master whole, nothing to buy.`,
    image_url: track.cover_url || '',
    image_credit: track.cover_url ? `Picture given by ${track.artist_name}` : '',
    url_path: '/ClimateMusic',
  };

  const meta = [
    track.kind && track.kind !== 'other' ? track.kind.replaceAll('_', ' ') : '',
    track.spec,
    track.seconds ? clock(track.seconds) : '',
  ].filter(Boolean);

  return (
    <div className="border-t-4 border-[#e2602a]">
      {/* A statement printed under the player with no attribution reads as the record
          saying it — and the record only ever says what it can stand behind. A giver's
          line stays their line, so it is named as theirs, in the place it is shown. */}
      <TransmissionConsole
        audioUrl={track.audio_url}
        artistName={track.artist_name}
        trackTitle={track.title}
        dedication={track.statement ? `The giver's own words · ${track.statement}` : ''}
      />

      <div className="bg-[#1e3a2b] text-[#efe7d6] px-5 lg:px-10 py-4 border-t-2 border-[#141210] flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e2602a] mb-1.5">
            Given, not sold · {isSet ? 'a set by ' : ''}{track.artist_name}
          </p>
          {given && (
            <p className="text-[10px] font-mono text-[#efe7d6]/55 mb-1.5">
              Taken into the record on {given}. The stamp is the record's own — nobody types it.
            </p>
          )}
          {/* Read out of the master's own header, never typed in by anyone. */}
          <p className="text-[11px] font-mono text-[#efe7d6]/80 leading-relaxed">{meta.join(' · ')}</p>
          {/* Zero loss, zero barrier: the master's own file, whole. If the player above cannot
              read this format on your device, the file is still here to take — nothing was ever
              converted, so what you take is exactly what the artist handed over. */}
          {track.audio_url && (
            <p className="mt-2">
              <a
                href={track.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-[#efe7d6]/55 underline decoration-dotted underline-offset-2"
              >
                The master's own file, whole — take it and play it anywhere. Nothing has been converted.
              </a>
            </p>
          )}
          {track.artist_link && (
            <a
              href={track.artist_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[10px] font-black font-mono uppercase tracking-widest text-[#e2602a] underline decoration-dotted underline-offset-2"
            >
              The artist's own page ↗
            </a>
          )}
        </div>
        <ShareCardButton entry={card} build={buildTransmissionShareCard} compact />
      </div>

      {track.master_sha256 && (
        <details className="bg-[#efe7d6] px-5 lg:px-10 py-4 border-t-2 border-[#141210]">
          <summary className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#141210] min-h-[44px] flex items-center cursor-pointer">
            The master's own fingerprint, in full
          </summary>
          <p className="mt-3 text-[11px] font-mono text-[#141210] leading-relaxed break-all">{track.master_sha256}</p>
          <p className="mt-2 text-[10px] font-mono text-[#5a5246] leading-relaxed">
            SHA-256, read from the master on the artist's own device before the file was sent — not taken afterwards, and not touched since.
            It is the record's receipt for the file: the bytes kept here are the bytes handed over, and that can be checked instead of trusted.
          </p>
        </details>
      )}

      {isSet && track.tracklist && (
        <details className="bg-[#efe7d6] px-5 lg:px-10 py-4 border-t-2 border-[#141210]">
          <summary className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#141210] min-h-[44px] flex items-center cursor-pointer">
            The works inside it, as the selector listed them
          </summary>
          <p className="mt-3 text-[13px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{track.tracklist}</p>
          <p className="mt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
            Written by the selector, kept as their text, in their order and their spelling. The record takes this list
            on their word: it does not check another person's tracklist, it does not cut the set into chapters or
            timings, and it never moves a work to a name they did not give. The set itself is served whole — the arc is
            the work.
          </p>
        </details>
      )}

      {track.lyric && (
        <details className="bg-[#efe7d6] px-5 lg:px-10 py-4 border-t-2 border-[#141210]">
          <summary className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#141210] min-h-[44px] flex items-center cursor-pointer">
            The words, as the artist wrote them
          </summary>
          <p className="mt-3 text-[13px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{track.lyric}</p>
        </details>
      )}

      {/* Keyed on the track, so switching tracks clears the half-written line and loads
          that track's own — a line is never left under the wrong piece of work. */}
      <ListenerWords key={track.id} track={track} />
    </div>
  );
}