import React from 'react';

// ── FOUR ROOMS, FOUR DIFFERENT SHAPES ──────────────────────────────────────────
// These four were drawn once in thin strokes and once as four compositions of bars — and
// a bar, a beam, a lever and two uprights all read as the same drawing at forty pixels.
// Brian, 19 November: "get coolasfuck please". The fault was variety, not weight: a set
// only reads as a set when the four are clearly four different things.
//
// So the shapes are different on purpose, and the idea behind them is one idea:
//   Solutions — a closed ring. The method that works, going round and round.
//   Crises    — the same ring, broken open, the piece in red coming away.
//   Actions   — a lever on its red fulcrum. A hand can move a heavy thing.
//   Groups    — two uprights carrying one red beam. Together they hold it up.
// Solutions and Crises are one drawing in two states, which is what they are on the
// record: the same world, working or failing.
//
// The rule stays as it has always been: solid masses, nothing thinner than the mass, and
// exactly one part in the record's red — the part that is the point.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { fill: 'rgb(var(--record-mark))', stroke: 'none' };

// Solutions — a closed ring with one red segment. A loop is a method that repeats and
// holds; the red is the part that closes it.
export function RoomMarkSolution({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="7" />
      <path d="M25.5 8.2A13 13 0 0 1 31.8 14.5" fill="none" stroke="rgb(var(--record-mark))" strokeWidth="7" strokeLinecap="butt" />
    </svg>
  );
}

// Crises — the same ring, open, with the piece that came away in red above the gap.
export function RoomMarkCrisis({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path d="M25.5 8.2A13 13 0 1 1 14.5 8.2" fill="none" stroke="currentColor" strokeWidth="7" />
      <path d="M15.6 4.4 25.2 1.2" fill="none" stroke="rgb(var(--record-mark))" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

// Actions — a lever resting on its red fulcrum. An arrow says "go", which is a sign on a
// wall; a lever says a hand can move a thing that is far too heavy.
export function RoomMarkAction({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M4 22 33 14l1.6 6L5.6 28Z" />
      <path {...RED} d="M21 24l7 12H14Z" />
    </svg>
  );
}

// Groups — two uprights and the one beam they are carrying between them. The beam is the
// red, because the beam is the reason they are a group.
export function RoomMarkGroups({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M6 14h7v22H6zM27 14h7v22h-7z" />
      <path {...RED} d="M3 6h34v7H3z" />
    </svg>
  );
}