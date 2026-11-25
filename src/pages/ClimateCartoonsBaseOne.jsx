import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import BaseOneRoom from '@/components/climate/cartoons/baseone/BaseOneRoom';
import '@/components/climate/cartoons/baseone/base-one.css';

// The machine's own hand, hung inside the cartoon room. Not a separate product and not a
// rival to the wall: one more hand in the same room, and the only one that cannot go and
// look at what it draws — which is exactly why it points at the people who can.
export default function ClimateCartoonsBaseOne() {
  return (
    <ClimateRecordShell
      compact
      eyebrow="The cartoon room · unsigned"
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="Every drawing here was made by BASE 1 on 25 November 2026. Nothing in this room is sold, ranked, sponsored or signed up to, and no drawing carries a word in any tongue."
    >
      <BaseOneRoom />
    </ClimateRecordShell>
  );
}