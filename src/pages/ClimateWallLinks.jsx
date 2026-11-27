import React from 'react';
import WallLinks from '@/components/climate/cartoons/keeper/WallLinks';

// The keeper's own desk for the join between the wall and the record's three doors. Behind
// the record's key, not the building's: a keeper holds the record's keys and none of the
// app's, and this is the record's work.
export default function ClimateWallLinks() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-8 lg:px-8 lg:py-12">
      <WallLinks />
    </div>
  );
}