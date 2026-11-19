import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PressOpening from '@/components/climate/cartoons/press/PressOpening';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonGoals from '@/components/climate/cartoons/CartoonGoals';
import CartoonWorld from '@/components/climate/cartoons/CartoonWorld';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
// Human drawings lead, and everything after them is about those drawings.
// Desktop is a newspaper spread. Original artwork, sources and controls stay intact.
import '@/components/climate/cartoons/press/press.css';
import '@/components/climate/cartoons/press/press-desktop-ground.css';
// Loaded last: the second ink goes down on top of the laid-out sheet, never under it.
import '@/components/climate/cartoons/press/press-ink.css';
import '@/components/climate/cartoons/cartoon-lineage.css';
// The record's own signal — yellow plate, black words, red label — laid over the room.
import '@/components/climate/cartoons/press/press-record-ink.css';
// Last: the cover takes the left leaf, and the wall gives each drawing its own measure.
import '@/components/climate/cartoons/press/press-balance.css';
// And last of all, the record's inks carried the whole length of the room: one paper, a
// red opening line to every part, red numbers down the goals, a red rule on the line the
// wall's permission stands on. Nothing in it touches a drawing.
import '@/components/climate/cartoons/press/press-signal.css';
// Last of all, the ground itself: this room is printed on the signal plate, with its
// drawings and its words on clean paper laid over it. Scoped to this room only.
import '@/components/climate/cartoons/press/press-field.css';
// One smaller-screen layout, not successive mobile overrides. Desktop stays a spread.
import '@/components/climate/cartoons/press/press-workshop.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell
      compact
      className="cartoon-room press-room"
      eyebrow="The record · the cartoon room"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up."
    >
      <div className="press-room-inner">
        <PressOpening />

        <PressWall />
        {/* The wall read against the seventeen goals, with the blank ones left blank. It
            follows the drawings because it is about them, and it comes before the argument
            because a cartoonist reads the count before they read the essay. */}
        <CartoonGoals />
        <CartoonWhy />
        {/* Human work, and the sourced lineage it belongs to. No machine-drawn fiction sits
            in this room: a wall of real hands does not need pictures nobody drew. */}
        <CartoonWorld />

        <div className="press-facing" id="press-book">
          <CartoonSessionBand />
          <CartoonAnthology />
        </div>

        <CartoonRoomActions />
        <CartoonSources />
      </div>
    </ClimateRecordShell>
  );
}