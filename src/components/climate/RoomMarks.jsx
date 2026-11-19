import React from 'react';

// ── FOUR DRAWINGS, CUT RATHER THAN DRAWN ───────────────────────────────────────
// These are the first thing a reader meets on the record, so they have to say what the
// record is made of without a label under them. They are cut the way one hand would cut
// them — a knife line with round ends, weight where the blade pressed, one part of each
// in the record's red — rather than assembled from a set of geometry, which is what made
// the last four read like a professional website's icons.
//
// Two of them are us: a hand raised (the thing you do), and two people standing together
// (the thing you join). Two are what is going on: a thing growing out of its own roots,
// and a house standing in rising water. The record is only worth anything if it carries
// both, and it carries them equally — so neither pair is quieter than the other, and the
// red is spent on the same one part of each.
const CUT = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// Solutions — a thing growing, held by its own roots. What works, and how.
export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 8.5c-.7 4.8-1 9.6-.9 14.2" />
      <path fill="currentColor" stroke="none" d="M19.5 13.4c-3.5-.4-5.8-2.5-6.2-5.9 3.5.2 5.8 2.3 6.2 5.9Z" />
      <path fill="currentColor" stroke="none" d="M19.9 17.8c3.3-.9 5.3-3.1 5.5-6.4-3.3.7-5.4 2.9-5.5 6.4Z" />
      <path className="text-record-mark" d="M19.4 22.4c-2.7 1.5-4.7 3.5-5.9 5.9" />
      <path className="text-record-mark" d="M19.4 22.4c2.7 1.5 4.7 3.5 5.9 5.9" />
      <path className="text-record-mark" d="M19.4 22.4c-.5 2.5-.5 4.7.1 6.8" />
    </svg>
  );
}

// Crises — a house standing in water that has already come over the door. What is
// happening, and where.
export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="M6.5 18 20 6.8 33.5 18" />
      <path d="M9.8 17.4v14.2h20.4V17.4" />
      <path d="M17.4 31.6v-5.4h5.2v5.4" />
      <path className="text-record-mark" d="M2.6 26.2c2.9-2.7 5.5.6 8.4.4 2.9-.2 4.6-2.6 7.4-2.4 2.9.2 4.6 2.6 7.5 2.4 2.9-.2 5.4-3.1 8.5-.4" />
    </svg>
  );
}

// Actions — a hand up, saying yes, I am in. Things to do and join.
export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path className="text-record-mark" fill="currentColor" stroke="none" d="M13.8 20.6h12.4v8.9a3.1 3.1 0 0 1-3.1 3.1h-6.2a3.1 3.1 0 0 1-3.1-3.1Z" />
      <path d="M15.4 20.2v-7.6" />
      <path d="M20 20.2V10" />
      <path d="M24.6 20.2v-8.2" />
      <path d="M13.4 23.6c-2.7-.4-3.7-2.3-3-4.6" />
    </svg>
  );
}

// Groups — two people standing together, one of them in the record's red. People
// working together.
export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="4.5" fill="currentColor" stroke="none" />
      <path d="M5.2 31.8c0-6.2 3.3-10.2 7.8-10.2s7.8 4 7.8 10.2" />
      <circle className="text-record-mark" cx="27" cy="13" r="4.5" fill="currentColor" stroke="none" />
      <path className="text-record-mark" d="M19.2 31.8c0-6.2 3.3-10.2 7.8-10.2s7.8 4 7.8 10.2" />
    </svg>
  );
}