import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';

// One drawing on the wall, and the three things that travel with it: who drew it, where
// it came from, and the drawer's own line on what it is for. The credit, where there is
// one, is set apart in the machine's small face because it is a fact about the drawing
// rather than part of what the drawing says.
//
// ── THE CAPTION WAS OUTWEIGHING THE DRAWING ────────────────────────────────────
// Five stacked blocks of text sat under every frame: title, drawn-by, the drawer's line,
// the full credit, and a link. Thirteen of those down a phone is a page of prose with
// pictures in the gaps, which is exactly what made the room read as old — a caption does
// not have to be that loud to be complete. The credit and the link are now one quiet line
// under a rule, so the drawing and the two things that identify it are what you see first.
const reading = { fontFamily: 'var(--font-reading)' };

export default function CartoonPlate({ cartoon, lead = false, index = 0 }) {
  const { image_url, title, artist_name, origin, for_line, credit, source_url, crisis_id, crisis_title } = cartoon || {};

  return (
    <figure className={`record-cartoon-plate record-media-mount bg-record-paper comic-plate-tone-${index % 3} ${lead ? 'comic-plate-lead' : ''}`}>
      {/* The plate follows the drawing’s original dimensions; never crop the artist’s work. */}
      <CartoonArtwork cartoon={cartoon} lead={lead} />
      <figcaption className="border-t-4 border-record-signal bg-record-bone px-3 py-2.5 lg:px-4 lg:py-3.5">
        {title && (
          <p className={`font-black leading-[1.18] tracking-[-.015em] text-record-ink ${lead ? 'text-[19px]' : 'text-[15.5px]'}`} style={reading}>
            {title}
          </p>
        )}
        {/* ── THE NUMBER IS WHAT MAKES IT A WALL ──────────────────────────────────
            Thirteen drawings, each on its own sheet, with air between them, read as thirteen
            separate pictures — Brian's word for it was "not connected". A plate number, in the
            same sun block and ink as everything else in this room, is the thread: the eye
            knows it is on one wall, in one order, and that the wall continues below. It counts
            the drawing's place on the wall and says nothing about its merit — no ranking, no
            score, and the drawings are never altered to fit it. */}
        <p className={`flex items-baseline gap-2 text-[12px] leading-[1.4] text-record-muted ${title ? 'mt-1' : ''}`} style={reading}>
          {index ? <span className="comic-plate-index">{String(index).padStart(2, '0')}</span> : null}
          <span>
            Drawn by <span className="font-bold text-record-ink">{artist_name}</span>
            {origin ? ` · ${origin}` : ''}
          </span>
        </p>
        {for_line && (
          <p className={`mt-2 text-record-ink ${lead ? 'text-[14.5px] leading-[1.55]' : 'text-[13.5px] leading-[1.5]'}`} style={reading}>
            {for_line}
          </p>
        )}
        {/* ── A DRAWING THAT ANSWERS SOMETHING ────────────────────────────────────
            Where the person who offered the drawing said which entry it is about, the plate
            says so and points at that entry — so a drawing is not just a picture on a wall
            but an answer to something the record has already written down, and a reader can
            go from the drawing to the crisis and back. The headline is the entry's own,
            copied by the record's server, never a sentence the sender typed. */}
        {crisis_id && (
          <Link
            to={`/ClimateDetail/climate_crisis/${crisis_id}`}
            className="mt-2 inline-flex items-start gap-1 text-[12px] font-semibold leading-[1.45] text-record-ink underline decoration-record-red decoration-2 underline-offset-2"
            style={reading}
          >
            <span>Drawn about: {crisis_title || 'an entry on the record'}</span>
            <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={2} />
          </Link>
        )}
        {(credit || source_url) && (
          <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-record-ink/15 pt-2">
            {credit && (
              <p className="font-mono text-[9.5px] uppercase leading-[1.5] tracking-[0.07em] text-record-muted">
                {credit}
              </p>
            )}
            {source_url && (
              <a
                href={source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.07em] text-record-ink underline decoration-dotted underline-offset-2 hover:text-record-red"
              >
                Where it came from <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
              </a>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}