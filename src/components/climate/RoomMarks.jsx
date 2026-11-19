import React from 'react';

// ── A DRAWING FOR EACH OF THE FOUR ROOMS ───────────────────────────────────────
// Brian, 19 November: "can have coolasfuck icon when go in room". The four plates were
// typographic only — a label, a figure, a rule and a line — so the backbone of the record
// was four coloured rectangles with words on them. A record whose every other door has a
// mark drawn for it had none at the one place a reader is asked to choose.
//
// Same hand as RecordFootMarks, with one deliberate difference: no red. These are printed
// on the room's own ground — green, red, yellow, orange — and a red element on the red
// plate would vanish, and on the others would be a second signal competing with the plate
// itself. On a coloured door the drawing is the door's own ink, and the colour is already
// the point.
//
// Solid masses, nothing thinner than the mass, legible at twenty-four pixels on a phone:
// a seedling for what works, a flame for what is burning, three heads on one ground for
// the people gathered, a spade in the ground for what is being done.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'currentColor',
  stroke: 'none',
};

export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="18.6" y="13.4" width="2.8" height="20.8" rx="1.4" />
      <path d="M20 21.2c-2.4-4.8-6.4-7-10.6-6.2-.2 4.8 3.2 7.2 8.6 7.4z" />
      <path d="M20 21.2c2.4-4.8 6.4-7 10.6-6.2.2 4.8-3.2 7.2-8.6 7.4z" />
      <rect x="10.4" y="31.4" width="19.2" height="3.4" rx="1.7" />
    </svg>
  );
}

export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 4.6c4.9 6.5 9 10.8 9 16.2a9 9 0 1 1-18 0c0-5.4 4.1-9.7 9-16.2z" />
      <rect x="14.6" y="30.4" width="10.8" height="3.4" rx="1.7" />
    </svg>
  );
}

export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="10.4" cy="16.2" r="4.8" />
      <circle cx="20" cy="12.6" r="5.4" />
      <circle cx="29.6" cy="16.2" r="4.8" />
      <rect x="6" y="25" width="28" height="3.6" rx="1.8" />
    </svg>
  );
}

export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="18.4" y="4.6" width="3.2" height="13.4" rx="1.6" />
      <rect x="15.6" y="16.6" width="8.8" height="3.6" rx="1.8" />
      <path d="M13.4 20.4h13.2l-1.6 10.8c-.4 2.5-2.5 4.3-5 4.3s-4.6-1.8-5-4.3z" />
    </svg>
  );
}