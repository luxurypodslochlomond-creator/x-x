import React from 'react';
import { recordOrigin } from '@/components/climate/recordAddress';

// ── THE FIRST SHEET OF A PRINTED SHOW ──────────────────────────────────────────
// A show pinned to a wall needs one sheet that says what it is, when it was printed and
// whose hands are on it, because the person reading it is standing in a corridor with no
// screen in front of them. So the first page is the show's own contents: every plate, in
// the order it hangs, with the artist's name and the work's name beside it — a hanging
// list a teacher can tick off as each one goes up.
export default function ExhibitionTitleSheet({ showName, printedOn, cartoons }) {
  const count = cartoons.length;
  return (
    <article className="ex-sheet ex-title-sheet">
      <div className="ex-title-band">
        <p className="ex-kicker">Together We Can Change Climate · the cartoon room</p>
        <h1 className="ex-title">{showName || `An exhibition of ${count} ${count === 1 ? 'drawing' : 'drawings'}`}</h1>
        <p className="ex-title-when">Printed from the record on {printedOn}</p>
      </div>

      <ol className="ex-contents">
        {cartoons.map((cartoon, i) => (
          <li key={cartoon.id}>
            <span className="ex-c-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="ex-c-name">{cartoon.artist_name}</span>
            <span className="ex-c-title">{cartoon.title || 'Untitled'}</span>
          </li>
        ))}
      </ol>

      <p className="ex-note">
        Every drawing in this show was given to the record by the hand that made it, and is shown with permission.
        The artist keeps the drawing and its rights. Nothing in this show was drawn by a machine.
      </p>

      <p className="ex-address">{recordOrigin().replace(/^https?:\/\//, '')}/ClimateCartoons</p>
    </article>
  );
}