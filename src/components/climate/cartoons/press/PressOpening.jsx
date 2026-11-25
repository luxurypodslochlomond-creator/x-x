import React from 'react';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

// ── THE ROOM OPENS ON A DRAWING, NOT ON A CONTENTS PAGE ────────────────────────
// Brian, 25 November: "fuck bro it feels corporate now… what would make Francis etc all go
// this is truly coolasfuck?"
//
// He was right, and the fault was in this file. The doorway carried an eyebrow, a standfirst,
// a count, two paragraphs of provenance and a twelve-item numbered set list — every one of
// them true, and every one of them asking to be read before a single drawing was. That is the
// shape of a funding report, and it was shaped that way because each element here has to
// justify itself to be trusted. The honesty is the record's spine; the ORDER was the fault.
// A wall does not brief you at the door.
//
// So the doorway is now the name of the room, one line, the count, and the cover — Francis's
// cover, at size, with his name on it. Nothing was softened. The provenance sits at the foot
// of the room in CartoonSources and the book's editors and credits in CartoonAnthology, which
// is where they always were; the twelve doors are the room's own navigation. (A ledger holding
// all of it was tried here on 25 November and removed within the hour: it repeated both
// sections, and a room a reader is already complaining is too long does not need another
// paragraph. It needed fewer.)
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <header className="press-opening-masthead">
          <h1 id="press-room-title" className="press-title">The Wall</h1>
          <p className="press-standfirst">Drawn by hand. Hung on the wall.</p>
          <CartoonSignal />
        </header>
      </div>
      <div className="press-opening-cover">
        <CartoonCatalogueBand />
      </div>
    </section>
  );
}