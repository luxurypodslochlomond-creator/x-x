import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import Transmission from '@/components/climate/Transmission';

// ── THE RECORD'S MUSIC ───────────────────────────────────────────────────────────
// The band at the foot of the record now has a door of its own, because a track given
// to the record is not something to be hunted for: a visitor, a host or a funder can
// reach it from the bar at the top of any page.
//
// It is the same band, not a copy of it — one component, drawn in both places — so
// when the next artist gives the record a track, it stands here the same way: their
// name on it, credited, whole, and free. Nothing here is for sale, and nothing here
// charges the artist for being heard.

export default function ClimateMusic() {
  return (
    <ClimateRecordShell
      eyebrow="The record's music"
      marker="Given to the record · the artist's name kept on it · never sold"
      title="Music"
      statement="A track made for the record and given to it. Free to listen, the master whole, and his name stays on it."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="This track stands here because Dillon Squire gave it to the record: credited by name, free to listen, nothing to buy and no ad. Anything else that arrives is kept the same way — the artist keeps their name, and the record never charges for the music."
    >
      <Transmission />
    </ClimateRecordShell>
  );
}