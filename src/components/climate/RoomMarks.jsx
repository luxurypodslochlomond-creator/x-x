import React from 'react';

// ── FOUR ROOMS, CUT BY HAND ────────────────────────────────────────────────────
// These four have been drawn three times: as thin lines, as bars, and as a ring and a
// broken ring. Each time the fault was the same — they were diagrams. Brian, 19 November:
// "need art… coolasfuck always". A diagram is a thing a machine would draw; the masthead,
// the door marks and the subject drawings are things a hand would cut.
//
// So these are cut, not plotted. No perfect circles, no equal spacing, no right angles:
// every edge is a little off, the way a knife goes, and the whole drawing leans the way a
// cut block leans. Nothing is smaller than a thumbnail, so each reads on a phone.
//
//   Crises    — one rock, broken in two, the red half slipped down. What is at risk.
//   Solutions — three blocks stacked into steps, the top one red. The way that works.
//   Actions   — a stone on a lever, the red wedge under it. A hand can move it.
//   Groups    — three people standing together, the middle one red. The same thing, shared.
//
// The rule of the whole record holds: solid masses, nothing thinner than the mass, and
// exactly one part in the record's red — the part that is the point.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { fill: 'rgb(var(--record-mark))', stroke: 'none' };

// Crises — one rock split, the red half slipped a little further down than the other.
export function RoomMarkCrisis({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M3 6.5 16.5 4.5 15.4 14.2 17.6 23.5 15.2 33.6 4.2 35.4Z" />
      <path {...RED} d="M25.4 9.4 37 6.8 36.2 35.2 26.2 33.4 28.4 23.2 25.8 14.4Z" />
    </svg>
  );
}

// Solutions — three cut blocks stacked into steps, the top one red.
export function RoomMarkSolution({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M3.4 26.6 13.2 25.1 13.6 35.4 3.8 35.9Z" />
      <path {...MASS} d="M15.4 18.4 25.2 16.6 25.6 35.6 15.8 35.9Z" />
      <path {...RED} d="M27.2 9.4 36.8 7.6 36.6 35.4 27.4 35.8Z" />
    </svg>
  );
}

// Actions — a stone on the long end, a lever through it, the red wedge under the lever.
export function RoomMarkAction({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M4.4 8.6 12.6 6.8 15.6 12.4 12.6 19.4 4.8 20.2 2.4 14.2Z" />
      <path {...MASS} d="M3 23.2 35.2 12.6 35.9 16.8 3.9 27.2Z" />
      <path {...RED} d="M21 21.4 26.4 36 14.8 36.2Z" />
    </svg>
  );
}

// Groups — three people standing together, the middle one red.
export function RoomMarkGroups({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M5.2 7.2 9.4 6.4 10.6 10.2 7 11.4Z" />
      <path {...MASS} d="M4 13 10.8 11.9 11.6 35.2 3.6 35.6Z" />
      <path {...MASS} d="M29.4 7.8 33.4 7 34.6 10.8 31 12Z" />
      <path {...MASS} d="M28.4 13.4 35.2 12.2 35.8 35.4 27.8 35.7Z" />
      <path {...RED} d="M17.2 4.4 21.8 3.8 22.8 8 18 9.2Z" />
      <path {...RED} d="M15.4 10.6 23.2 9.4 23.6 35.2 15 35.6Z" />
    </svg>
  );
}