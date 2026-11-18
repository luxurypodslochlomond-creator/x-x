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
      <p id="cartoon-opening-title" className="comic-opening-eyebrow record-meta">What this room is</p>
      <p className="comic-opening-line">
        A room of climate cartoons — drawings from Africa, Asia and beyond, gathered for
        CartoonAFRICA and edited by Francis Umendu Odupute and Janine Selendy.
      </p>
      <p className="comic-opening-sub">
        Every drawing on the wall is a person’s, with their name and its source. The record’s
        own strip is separate, and labelled as AI-illustrated fiction.
      </p>

      <CartoonPageMap />

      <p className="comic-opening-line comic-opening-open">
        The wall is open. Send a drawing and it goes up with your name on it, once a person has looked.
      </p>
    </section>
  );
}