import React from 'react';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

// ── THE ROOM OPENS ON THE WORK, AND SAYS WHAT IT IS IN ONE BREATH ──────────────
// The old front put the room's name on a black plate with the cover behind it, tilted
// the title, slapped a yellow word into it and dropped a red rule under everything. That
// is a costume: it says "comic" the way a novelty shop says "comic", and a cartoonist
// reads it as a page that does not trust the drawings to carry the room.
//
// So the opening is an editorial page and nothing more: the name, one line of standfirst,
// the count the record actually keeps, three paragraphs of plain scope, a contents line,
// and then Francis's cover — whole, uncropped, at the largest size the glass will take,
// with his name under it. No plate, no tilt, no shadow, no second background picture.
// The only colour on the page is the colour the artists put there.
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <p className="press-eyebrow">The record · the cartoon room</p>
        <h1 id="press-room-title" className="press-title">The Big Picture</h1>
        <p className="press-standfirst">Cartoons for a changing world.</p>
        <CartoonSignal />
        <p className="press-scope">
          The climate, drawn. The cartoons chosen for the 29 November workshop, the record’s own
          strip of AI-illustrated fiction, and a wall with room on it for yours.
        </p>
        <p className="press-scope">
          The wall opens with drawings by What On Earth!®, the cartoon series at CEEW — the
          Council on Energy, Environment and Water, in India — shown with their permission while
          the workshop’s own pages arrive.
        </p>
        <p className="press-scope">
          Gathered for CartoonAFRICA. Edited by Francis Umendu Odupute and Janine Selendy.
          Catalogue prepared by African Press Cartoon Services.
        </p>
        <nav className="press-contents" aria-label="Find your way through the cartoon room">
          <a href="#cartoon-why-title">Why cartoons</a>
          <a href="#press-wall">The wall</a>
          <a href="#cartoon-strip">The little things</a>
          <a href="#press-book">The book</a>
          <a href="#cartoon-your-turn">Add your drawing</a>
        </nav>
      </div>
      <div className="press-opening-cover">
        <CartoonCatalogueBand />
      </div>
    </section>
  );
}