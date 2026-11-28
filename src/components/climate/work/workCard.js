import buildRecordPlate from '@/components/climate/recordPlate';
import { RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';
import { recordAddress, recordOrigin } from '@/components/climate/recordAddress';

// ── THE CARD THAT ANSWERS HER QUESTION ────────────────────────────────────────
// She asked what the last two years were. This is the same answer as the page, on one
// picture: the record's own painting, the promise, and the figures the page reads live.
// It is drawn on the reader's own device and nothing of theirs leaves it.
//
// The line under the title carries only what can be counted. No adjective, no claim that
// cannot be checked from the page it points at — because a card is the thing that gets
// forwarded without the page beside it.

export const WORK_CARD_TITLE = 'What we built';

export const WORK_CARD_LINK = recordAddress('/WhatWeBuilt');

// The address as a person would type it, so the card can be read with no signal at all.
export const WORK_CARD_ADDRESS = `${recordOrigin().replace(/^https?:\/\//, '').replace(/\/+$/, '')}/WhatWeBuilt`;

export function workCardLine(counts) {
  const wall = counts && counts.cartoons
    ? `${counts.cartoons} drawings by ${counts.hands} hands`
    : 'a wall of drawings by working cartoonists';
  return [
    wall,
    'a public record of the climate nobody can buy a line of',
    'nothing sold, nothing ranked',
  ].join(' · ');
}

export async function buildWorkShareCard(entry = {}) {
  return buildRecordPlate(RECORD_COVER_SCREEN, {
    promise: entry.title || WORK_CARD_TITLE,
    whatItIs: entry.description || workCardLine(null),
    address: WORK_CARD_ADDRESS,
  });
}