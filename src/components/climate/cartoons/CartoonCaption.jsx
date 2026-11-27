import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildDrawingShareCard, drawingShareLine } from '@/components/climate/cartoons/drawingCard';
import { recordOrigin } from '@/components/climate/recordAddress';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';
import entryHref from '@/components/climate/cartoons/entryHref';
import { goalByNumber } from '@/components/climate/cartoons/cartoonGoals';

export default function CartoonCaption({ cartoon, instant = false }) {
  const { title, artist_name, origin, for_line, who_line, credit, source_url, crisis_id, crisis_title, goal } = cartoon;
  // A drawing offered from a goal's own panel says so where it hangs, in the goal's own name,
  // and points at the goal's own page — the same shape as the line above it for a crisis.
  const goalEntry = goal ? goalByNumber(goal) : null;
  return (
    <figcaption className="cartoon-caption">
      <p className="cartoon-byline record-meta">{artist_name}{origin && <span> · {origin}</span>}</p>
      {title && <h3>{title}</h3>}
      {/* Who the hand is, in the sender's own words, where the sender gave one. A line under
          one picture, never a profile page: most hands send nothing here, and the wall then
          says nothing rather than writing a biography nobody gave it. */}
      {who_line && <p className="cartoon-who-line record-meta" dir="auto">{who_line}</p>}
      {for_line && <p className="cartoon-own-words record-meta" dir="auto">{for_line}</p>}
      {entryHref(cartoon) && <Link className="cartoon-source" to={entryHref(cartoon)}>Drawn about: {crisis_title || 'an entry on the record'} ↗</Link>}
      {goalEntry && (
        <a className="cartoon-source" href={goalEntry.url} target="_blank" rel="noopener noreferrer">
          Offered for Goal {goalEntry.n} · {goalEntry.name} ↗
        </a>
      )}
      <div className="cartoon-provenance">
        {credit && <p className="record-meta">{credit}</p>}
        {source_url && <a className="cartoon-source" href={source_url} target="_blank" rel="noopener noreferrer">At its source ↗</a>}
        {/* ── A DRAWING IS PASSED ON THE SAME WAY THE RECORD IS ────────────────────
            Brian, 27 November: "cartoons should work the same way… we could replace our
            record image with the cartoons and description credit etc… people know exactly
            what they're going on about, what they're sending."

            So this is now the record's own share window, carrying the drawing instead of
            the painting: the picture whole, the drawer's name and their own line, the
            credit, the code and every named door — the same one door everywhere. Three
            things were missing from it before: the words (they were not travelling, so a
            copy handed over a bare link), the credit line (it looked for the record's field,
            not the drawing's), and an address a person can say out loud — /w/<name> rather
            than a row of hex nobody types. */}
        <ShareCardButton
          inline
          instant={instant}
          entry={cartoon}
          build={buildDrawingShareCard}
          label="Share this drawing"
          description={drawingShareLine(cartoon)}
          includeMessage
          windowTitle="Share this drawing"
          alt={cartoon.title ? `${cartoon.title}, drawn by ${cartoon.artist_name}` : `A drawing by ${cartoon.artist_name}`}
          link={`${recordOrigin()}/w/${cartoonSlug(cartoon)}`}
        />
      </div>
    </figcaption>
  );
}