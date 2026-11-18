import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ComicMasthead from '@/components/climate/cartoons/ComicMasthead';
import CartoonOpening from '@/components/climate/cartoons/CartoonOpening';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import ComicReader from '@/components/climate/cartoons/ComicReader';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonWall from '@/components/climate/cartoons/CartoonWall';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import '@/components/climate/cartoons/cartoon-room.css';
import '@/components/climate/cartoons/cartoon-room-layout.css';
import '@/components/climate/cartoons/cartoon-gallery.css';
import '@/components/climate/cartoons/comic-page.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell
      compact
      className="cartoon-room"
      eyebrow="The record · the cartoon room"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up."
    >
      {/* ── THE ROOM OPENS ON A COVER ───────────────────────────────────────────
          Brian, 18 November: "it looks generic, not fun or intriguing or coolasfuck."
          He was looking at the top of the page, and he was right about what was there:
          an event cover, a caption, a share button and a table of contents with three
          thumbnails. That is a landing page, and everything is a landing page. A comic
          opens on a cover — a black plate, the name of the book enormous — and then on a
          picture that runs off both edges of the glass. The catalogue of the book this
          room feeds now waits below the strip, where somebody who has just enjoyed a
          drawing might actually want it. Nothing was removed; the order changed. */}
      <ComicMasthead />
      <ComicReader />
      <div className="comic-event-opening">
        <CartoonCatalogueBand />
        <div className="comic-event-context">
          <CartoonOpening />
        </div>
      </div>
      <CartoonWall />
      <div className="cartoon-room-notes">
        <CartoonSessionBand />
        <CartoonAnthology />
      </div>
      <CartoonWhy />
      <CartoonRoomActions />
      <CartoonSources />
    </ClimateRecordShell>
  );
}