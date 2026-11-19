import React from 'react';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

// The masthead, introduction and catalogue form one spread on desktop.
// The original cover and its credit remain together, uncropped and unaltered.
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <header className="press-opening-masthead">
          <p className="press-eyebrow">The record · the cartoon room</p>
          {/* "The Big Picture" was a phrase institutes, books and foundations all use — a
              borrowed word on a record whose whole argument is that nothing is borrowed.
              "The Real Picture" is the room's own, and it is the truer thing to say: a
              drawing is not a summary of the climate, it is what somebody actually saw. */}
          <h1 id="press-room-title" className="press-title">The Real Picture</h1>
          <p className="press-standfirst">Cartoons for a changing world.</p>
          <CartoonSignal />
        </header>
        <p className="press-scope">
          The climate, drawn. The cartoons chosen for the 29 November workshop, the people who
          made them, and a wall with room on it for yours.
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
        {/* The contents are in the order the room is actually set: the wall, the goals it is
            read against, the argument for cartoons, the lineage, the book, and the desk. A
            contents list that disagrees with the page it belongs to is the first place a
            reader learns not to trust the rest of it — and the door to the fiction that used
            to sit here was still being offered long after the fiction came off the record. */}
        <nav className="press-contents" aria-label="Find your way through the cartoon room">
          <a href="#press-wall">The wall</a>
          <a href="#cartoon-goals">The goals</a>
          <a href="#cartoon-why-title">Why cartoons</a>
          <a href="#press-world">Across the world</a>
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