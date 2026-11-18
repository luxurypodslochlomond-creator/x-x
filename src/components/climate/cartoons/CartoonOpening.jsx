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
      {/* Brian, 18 November: "still not middle class bro saying a little mischief weird
          to me … tiny bit right there." He was reading "a little AI-illustrated fiction"
          and "a wall waiting for your own way of seeing" — cushion words. A room that
          exists to say a hard thing plainly should not hedge in its own first sentence. */}
      <p id="cartoon-opening-title" className="comic-opening-line record-meta">
        The climate, drawn. The cartoons chosen for the 29 November workshop, the record’s
        own strip of AI-illustrated fiction, and a wall with room on it for yours.
      </p>
      {/* ── WHY THOSE OTHER DRAWINGS ARE HERE, AND WHOSE THEY ARE ─────────────────
          Brian, 18 November: "why do we have more CEEW or whatever they're called bro,
          what's purpose of this?" — asked on behalf of a reader who had met thirteen
          drawings from an Indian research institute on a page about an African biennial
          with nothing on the page explaining why. A credit is not an explanation.

          So the wall says it plainly: those are the wall's opening drawings, made by
          What On Earth!®, the cartoon series at CEEW (the Council on Energy, Environment
          and Water, in India), shown with their permission — and the cartoonists' pages
          from the workshop take their place on the same wall as they arrive. CEEW is a
          source on this wall, never the subject of the room. */}
      <p className="comic-opening-sub record-meta">
        The wall opens with drawings by What On Earth!®, the cartoon series at CEEW — the
        Council on Energy, Environment and Water, in India — shown with their permission
        while the workshop’s own pages arrive.
      </p>
      <p className="comic-opening-sub record-meta">
        Gathered for CartoonAFRICA. Edited by Francis Umendu Odupute and Janine Selendy.
        Catalogue prepared by African Press Cartoon Services.
      </p>
      <CartoonPageMap />
    </section>
  );
}