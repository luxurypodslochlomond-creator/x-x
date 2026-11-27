import React from 'react';
import { recordOrigin } from '@/components/climate/recordAddress';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';

// ── ONE DRAWING, ONE PAGE, TO BE PINNED TO A WALL ──────────────────────────────
// The picture whole and nothing over it, and then the three things a cartoon must never
// travel without: the hand that made it, the drawer's own line, and the address that
// brings a reader back to the record. The permission is printed on the sheet rather than
// assumed, because a photocopied cartoon with no sentence on it becomes a cartoon with no
// owner.
export default function ExhibitionSheet({ cartoon, plate }) {
  // The address printed on a sheet pinned to a wall is the short one: it is read out and
  // typed in by hand, off paper, by someone who has no link to tap.
  const address = `${recordOrigin().replace(/^https?:\/\//, '')}/w/${cartoonSlug(cartoon)}`;
  return (
    <article className="ex-sheet">
      <header className="ex-head">
        <span className="ex-plate">{String(plate).padStart(2, '0')}</span>
        <span className="ex-head-line">Together We Can Change Climate · the cartoon room</span>
      </header>

      <div className="ex-pic">
        <img
          src={cartoon.display_image_url}
          alt={cartoon.title ? `${cartoon.title}, by ${cartoon.artist_name}` : `A drawing by ${cartoon.artist_name}`}
        />
      </div>

      <div className="ex-body">
        <h2 className="ex-artist">{cartoon.artist_name}</h2>
        {cartoon.title && <p className="ex-work">{cartoon.title}</p>}
        {cartoon.for_line && <blockquote className="ex-words" dir="auto">{cartoon.for_line}</blockquote>}

        <dl className="ex-facts">
          {cartoon.origin && (<><dt>Where it came from</dt><dd>{cartoon.origin}</dd></>)}
          {cartoon.country && (<><dt>Drawn in</dt><dd>{cartoon.country}</dd></>)}
          {cartoon.credit && (<><dt>Credit</dt><dd>{cartoon.credit}</dd></>)}
        </dl>

        <p className="ex-permission">Shown with permission. The artist keeps the drawing and its rights.</p>
        <p className="ex-address">{address}</p>
      </div>
    </article>
  );
}