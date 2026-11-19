import React from 'react';

// ── FOUR BEHAVIOURS OF ONE LINE ────────────────────────────────────────────────
// Brian, 19 November: "the crisis icon and solution and action and groups can't be like
// anything else… has to resonate to all of us coolers fuck even after 100 years bro and
// beyond but not be bullshit."
//
// Every earlier attempt failed the same way: they were four drawings of four different
// things, so each one had to invent its own vocabulary and each one ended up looking like
// a symbol from a set. A set of symbols is a product. A mark that lasts a hundred years is
// not cleverer than that, it is simpler: it is a gesture somebody made with a pen.
//
// So these four are not four icons. They are ONE LINE, doing the four things this record
// actually asks a line to do, and each is drawn in the same hand, with the same ink and one
// red part — the record's own red, never a colour of the mark's choosing.
//
//   Crises     the line that breaks — and the break is red
//   Solutions  the line that joins — two limbs tied at one red knot
//   Actions    the line that climbs — a step taken, and the next one in red
//   Groups     the line that ties — three strands bound by one red band
//
// Nothing here is a letter, an arrow, a globe, a leaf, a gear or a pin. There is no
// enclosure, no symmetry and no grid. A line breaking, joining, climbing and tying is as
// legible in 2126 as it was in the first cave, because it is not a style — it is a verb.
const FRAME = { viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': 'true' };
const INK = { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };
const RED = { stroke: 'rgb(var(--record-mark))', strokeLinecap: 'round', strokeLinejoin: 'round' };

// Solutions — two limbs meet and are tied. What works, holding.
export function RoomMarkSolution({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="6.5" d="M9 53C16 45 24 36 31 25" />
      <path {...INK} strokeWidth="5.5" d="M57 48C49 40 42 32 34 23" />
      <circle cx="32.5" cy="24" r="4.6" fill="rgb(var(--record-mark))" />
    </svg>
  );
}

// Crises — the line breaks, and the break is the red part.
export function RoomMarkCrisis({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="7" d="M8 56C14 48 21 41 28 34" />
      <path {...INK} strokeWidth="3.2" d="M38 26C44 20 51 13 57 7" />
      <path {...RED} strokeWidth="3.4" d="M29 24L38 35" />
    </svg>
  );
}

// Actions — the line climbs, one step at a time, and the next step is red.
export function RoomMarkAction({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="6" d="M9 55C14 55 19 55 23 54C23 50 23 45 23 41C28 41 33 41 37 41C37 36 37 31 37 27" />
      <path {...RED} strokeWidth="6" d="M37 27C43 26 49 27 55 27" />
    </svg>
  );
}

// Groups — many strands, tied into one. People holding the same thing.
export function RoomMarkGroups({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="4.6" d="M14 9C16 23 17 39 18 55" />
      <path {...INK} strokeWidth="4.6" d="M28 8C29 22 30 40 31 56" />
      <path {...INK} strokeWidth="4.6" d="M42 10C43 24 44 40 45 54" />
      <path {...RED} strokeWidth="4.6" d="M8 31C22 33 34 30 52 33" />
    </svg>
  );
}