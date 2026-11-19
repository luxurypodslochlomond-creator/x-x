import React from 'react';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';
import PressRoomNote from '@/components/climate/cartoons/press/PressRoomNote';

// The masthead, introduction and catalogue form one spread on desktop.
// The original cover and its credit remain together, uncropped and unaltered.
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <header className="press-opening-masthead">
          <p className="press-eyebrow">The record · the cartoon room</p>

          <h1 id="press-room-title" className="press-title">The Real Picture</h1>
          <p className="press-standfirst">Cartoons for a changing world.</p>
          <CartoonSignal />
        </header>
        <PressRoomNote label="About this room" className="press-room-context">
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
          </PressRoomNote>
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