import React from 'react';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonHumour from '@/components/climate/cartoons/CartoonHumour';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonWallSessions from '@/components/climate/cartoons/CartoonWallSessions';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonProgramme from '@/components/climate/cartoons/CartoonProgramme';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import WallPeople from '@/components/climate/cartoons/WallPeople';
import '@/components/climate/cartoons/wall-credits.css';
import CartoonLongRead from '@/components/climate/cartoons/CartoonLongRead';
import CartoonRoomNavigation from '@/components/climate/cartoons/CartoonRoomNavigation';

export default function WallAbout() {
  return <section className="wall-about" id="wall-about" aria-labelledby="wall-about-title">
    <h2 className="comic-section-title" id="wall-about-title">Nothing without the people.</h2>
    <p>Janine’s climate work. Francis’s biennial. Every drawing on this wall came from somebody. Their name stays on it, their source stays beside it, and the link to where it was first published is never dropped.</p>
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
      <summary>Whose work is on this wall, and where it came from</summary>
      <div className="wall-credits-plate">
        <WallPeople />
        <CartoonSources />
      </div>
      <CartoonLongRead />
    </details>
    <CartoonRoomNavigation />
  </section>;
}