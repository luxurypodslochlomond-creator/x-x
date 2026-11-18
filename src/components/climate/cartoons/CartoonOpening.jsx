import React from 'react';
import CartoonPageMap from '@/components/climate/cartoons/CartoonPageMap';
import '@/components/climate/cartoons/cartoon-pagemap.css';

// ── WHAT THIS ROOM IS, SAID ONCE, ON THE WALL ─────────────────────────────────
// A gallery prints one short paragraph on the wall before the work: what the exhibition is,
// who put it together, and where the drawings came from. That is all this is — three lines
// and then the work.
//
// Two names belong on that wall and were missing from it. Janine brought this room into
// being and Francis Umendu Odupute edits the book it feeds; the cover the room opens on is
// Francis's own drawing. A gallery that does not name its curators has not understood what
// a gallery is for. And the scope is said plainly, because the room is not only African and
// not only Western: drawings come from Africa, from Asia and from everywhere else.
//
// The one line that has to stay is the honest one: the wall holds human drawings, and the
// record's own strip is AI-illustrated fiction, kept apart and labelled as such.
export default function CartoonOpening() {
  return (
    <section className="comic-opening" aria-labelledby="cartoon-opening-title">
      <p id="cartoon-opening-title" className="comic-opening-line record-meta">
        The climate, seen differently. Human drawings from What On Earth!® at CEEW,
        a little AI-illustrated fiction, and a wall waiting for your own way of seeing.
      </p>
      <p className="comic-opening-sub record-meta">
        Gathered for CartoonAFRICA. Edited by Francis Umendu Odupute and Janine Selendy.
      </p>
      <CartoonPageMap />
    </section>
  );
}