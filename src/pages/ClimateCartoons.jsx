import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import ComicReader from '@/components/climate/cartoons/ComicReader';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonWall from '@/components/climate/cartoons/CartoonWall';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import '@/components/climate/cartoons/cartoon-room.css';

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
      {/* ── THE HANG ────────────────────────────────────────────────────────────
          The room used to lead with the anthology, then the record's own strip, and put the
          wall of drawings at the very bottom — under the explanation of why drawings matter
          and the form for sending one in. A visitor walked past a book that is not finished,
          past a strip, past two blocks of argument, and reached the actual drawings last.
          That is the one thing a room of cartoons cannot do.
          Now it hangs the way a gallery hangs: the dateline for the 29th, the strip that
          opens the room, then the wall itself — thirteen drawings by What On Earth!® for
          CEEW, with their names, their origin and their own words on them. The book those
          drawings become comes after the drawings, which is the order they will be read in. */}
      <CartoonSessionBand />
      <ComicReader />
      <CartoonWall />
      <CartoonAnthology />
      <CartoonWhy />
      <CartoonRoomActions />
      <CartoonSources />
    </ClimateRecordShell>
  );
}