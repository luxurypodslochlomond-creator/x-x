import React from 'react';

// ── FOUR BEHAVIOURS OF ONE LINE, EACH IN ITS OWN ROOM'S COLOUR ─────────────────
// The four marks are not four icons. They are one line doing the four things this record
// asks a line to do, drawn in the same hand: the body of the gesture in ink, and the part
// that carries the meaning in the room's own colour.
//
// Brian, 19 November: "crisis and solution is subtler red for crisis beyond x = x red, and
// solutions must be coolasfuck green… what colour actions and groups?" The old marks were
// all red, which meant the four rooms looked like one room and the covenant's red was
// spent four times over. So each room now owns one colour, and the four are far enough
// apart to be told at a glance:
//
//   Crises     a dustier red than x = x — the line that breaks
//   Solutions  the record's botanical green — the line that joins
//   Actions    the record's sea blue — the line that climbs
//   Groups     the record's ochre — the line that returns
//
// Groups was three uprights crossed by a band, and Brian said it plainly: "groups icon
// looks crafty." He was right — that drawing was a weave, the mark of a craft fair. So
// Groups is a single line coming back round to meet itself, closed in ochre: people
// arriving at the same place, with no knot and no basket about it.
const FRAME = { viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': 'true' };
const INK = { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

const SOLUTION = 'rgb(var(--record-botanical))';
const CRISIS = 'rgb(var(--record-crisis))';
const ACTION = 'rgb(var(--record-ocean))';
const GROUPS = 'rgb(var(--record-ochre))';

// Solutions — two limbs meet and are tied. What works, holding.
export function RoomMarkSolution({ size = 32, className = '', accent = SOLUTION }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="6.5" d="M9 53C16 45 24 36 31 25" />
      <path {...INK} strokeWidth="5.5" d="M57 48C49 40 42 32 34 23" />
      <circle cx="32.5" cy="24" r="4.6" fill={accent} />
    </svg>
  );
}

// Crises — the line breaks, and the break is the quiet red part.
export function RoomMarkCrisis({ size = 32, className = '', accent = CRISIS }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="7" d="M8 56C14 48 21 41 28 34" />
      <path {...INK} strokeWidth="3.2" d="M38 26C44 20 51 13 57 7" />
      <path stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" d="M29 24L38 35" />
    </svg>
  );
}

// Actions — the line climbs, one step at a time, and the next step is the room's blue.
export function RoomMarkAction({ size = 32, className = '', accent = ACTION }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="6" d="M9 55C14 55 19 55 23 54C23 50 23 45 23 41C28 41 33 41 37 41C37 36 37 31 37 27" />
      <path stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M37 27C43 26 49 27 55 27" />
    </svg>
  );
}

// Groups — one line comes back round to meet itself, and the meeting is ochre.
// Not three strands and a band: that was a weave, and a weave is a craft stall.
export function RoomMarkGroups({ size = 32, className = '', accent = GROUPS }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...INK} strokeWidth="6" d="M32 12A20 20 0 1 1 49.3 22" />
      <path stroke={accent} strokeLinecap="round" strokeWidth="6" d="M49.3 22A20 20 0 0 0 32 12" />
    </svg>
  );
}