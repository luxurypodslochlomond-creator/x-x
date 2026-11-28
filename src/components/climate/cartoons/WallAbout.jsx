import React from 'react';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonHumour from '@/components/climate/cartoons/CartoonHumour';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonWallSessions from '@/components/climate/cartoons/CartoonWallSessions';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonProgramme from '@/components/climate/cartoons/CartoonProgramme';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonLongRead from '@/components/climate/cartoons/CartoonLongRead';
import CartoonRoomNavigation from '@/components/climate/cartoons/CartoonRoomNavigation';

export default function WallAbout() {
  return <section className="wall-about" id="wall-about" aria-labelledby="wall-about-title">
    <h2 className="comic-section-title" id="wall-about-title">What holds the wall up</h2>
    <p>The drawings are the argument. This is the rest of it: why a pen does what a graph cannot, whose book this is, the hands that drew power before any of us were in the room — and the rule that keeps the work whole and the money printed.</p>
    <details className="wall-background" id="wall-purpose">
      <summary>Why cartoons, and what humour can do</summary>
      <CartoonWhy />
      <CartoonHumour />
    </details>
    <details className="wall-background" id="press-book">
      <summary>The biennial, the climate hour and the book</summary>
      <div className="wall-event-spread"><CartoonCatalogueBand /><CartoonWallSessions /></div>
      <div className="press-facing"><CartoonSessionBand /><CartoonProgramme /><CartoonAnthology /></div>
    </details>
    <details className="wall-background" id="wall-credits">
      <summary>Credits and the cartoonists who came before</summary>
      <CartoonSources />
      <CartoonLongRead />
    </details>
    <CartoonRoomNavigation />
  </section>;
}