import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import WallRoom from '@/components/climate/cartoons/WallRoom';
// Shared ink and phone treatments; the desktop layout is declared once, last.
import '@/components/climate/cartoons/press/press.css';
import '@/components/climate/cartoons/press/press-mobile-ground.css';
import '@/components/climate/cartoons/press/press-ink.css';
import '@/components/climate/cartoons/cartoon-lineage.css';
import '@/components/climate/cartoons/press/press-record-ink.css';
import '@/components/climate/cartoons/press/press-signal.css';
import '@/components/climate/cartoons/press/press-field.css';
import '@/components/climate/cartoons/press/press-phone.css';
import '@/components/climate/cartoons/press/press-workshop.css';
import '@/components/climate/cartoons/baseone/base-one.css';
import '@/components/climate/cartoons/press/press-desktop-ground.css';
// The desk treatment of the wall itself — the drawings hanging on the painting, two across.
// Last, so it is the rule that wins over the chapter-sheet geometry above it.
import '@/components/climate/cartoons/press/press-wall-wide.css';
// The room's chapters named the way x = x names its bands: red caps, yellow chip.
import '@/components/climate/cartoons/press/press-band-heads.css';
import '@/components/climate/cartoons/wall-room.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell
      painted
      className="cartoon-room press-room"
      eyebrow="The Wall"
      marker="The record · the cartoon room"
      title="The Wall"
      statement="Drawn by the people it’s happening to. Aimed at the people doing it."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up."
    >
      <WallRoom />
    </ClimateRecordShell>
  );
}