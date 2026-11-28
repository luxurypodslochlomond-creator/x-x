import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import WorkBody from '@/components/climate/work/WorkBody';

// The page Janine asked for, on 28 November 2026: what the last couple of years of work
// actually were. It wears the record's own painted opening, because it is a room of the
// record and not a brochure standing beside it.
export default function WhatWeBuilt() {
  return (
    <ClimateRecordShell
      painted
      className="work-page"
      eyebrow="The work"
      marker="For Janine · what the last two years were"
      title="What we built"
      statement="Two years. One family. An asset-locked company one year old. A record nobody can buy a line of, and every line of it openable."
      returnTo="/TogetherChangeClimate"
      returnLabel="Open the record"
      footer="Nothing here is a plan. If a line could not be opened from this page, it was left out."
    >
      <WorkBody />
    </ClimateRecordShell>
  );
}