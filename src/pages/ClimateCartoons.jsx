import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ComicMasthead from '@/components/climate/cartoons/ComicMasthead';
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
      {/* ── A PICTURE PAGE, IN THE ORDER A PICTURE PAGE IS READ ─────────────────
          This page has been reordered twice and both times for the same complaint: the
          drawings were not what you met first. The last version opened on a dateline about
          the 29th, then the record's own AI strip, and put thirteen real drawings by What
          On Earth!® for CEEW third — behind a notice and behind somebody else's work.
          Brian, 18 November: "why not picture page… doesn't feel coolasfuck… needs to be
          better than their sites."

          So: the room's name, then the drawings — the newest one hung large and edge to
          edge, the rest as the wall — then the dateline that explains what they are for,
          then the record's own strip, then the book they become, then the argument, then
          the way to send one in. Nothing was deleted and nothing was reordered for taste:
          the pictures simply come first, because that is the whole reason anybody opens
          this room. */}
      <ComicMasthead />
      <CartoonWall />
      <CartoonSessionBand />
      <ComicReader />
      <CartoonAnthology />
      <CartoonWhy />
      <CartoonRoomActions />
      <CartoonSources />
    </ClimateRecordShell>
  );
}