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
      statement="Not a pitch. Every tool, paper and promise on this page opens, and the numbers are read from the record itself rather than typed in."
      returnTo="/TogetherChangeClimate"
      returnLabel="Open the record"
      footer="Nothing here is a plan. If a line could not be opened from this page, it was left out."
    >
      <WorkBody />
    </ClimateRecordShell>
  );
}