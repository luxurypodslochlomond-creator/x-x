import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PressOpening from '@/components/climate/cartoons/press/PressOpening';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import ComicReader from '@/components/climate/cartoons/ComicReader';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
// ── THE ROOM IS SET, NOT DRESSED ───────────────────────────────────────────────
// Brian, 18 November: "too kew and old batman … imagine when Marty McFly goes into the
// future and picks up a comic". He is right, and the fault was structural rather than
// decorative: the room was wearing the *signs* of a comic — black plates, halftone,
// a tilted yellow title, caption bars, alternating tilt, an orbiting light — instead of
// behaving like one. A cartoonist reads that as a page that does not trust the drawings.
//
// So the room now works the way a cartoon works: it makes an argument, in beats, and then
// it gets out of the way of the pictures. The order is the argument — what this is, why
// cartoons are here at all, the drawings themselves, the fiction kept honestly apart, the
// book that comes out of the 29th, the desk where you answer, and the sources last.
//
// Nothing was removed. Every drawing, credit, share control, drawer, link and source is
// still on the page and still works; what has gone is the costume around them.
import '@/components/climate/cartoons/press/press.css';

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

        {/* Why the drawings are on a climate record at all, told as three beats before the
            wall — the argument first, the evidence after. */}
        <CartoonWhy />

        <PressWall />
        <ComicReader />

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