import React from 'react';

// ── THE FOUR ROOMS, IN THE MASTHEAD'S OWN HAND ──────────────────────────────────
// These four were drawn in thin strokes: a limb meeting a limb, a line broken by a
// diagonal, a step climbing, four strands crossed by a rule. Beside the record's own
// navigation they looked like a different publication's icon set, because they were drawn
// by a different rule — lines at six and a half units against marks built out of masses.
//
// Brian, 19 November: "don't like crises and solution icons, not coolasfuck art… nothing
// like top coolasfuck nav." So the four rooms are drawn the way every mark on the masthead
// is drawn, which is the only rule this record has ever needed:
//   solid masses only, nothing thinner than the mass,
//   two or three shapes and no more,
//   and exactly one part in the record's red — the part that is the point.
// Same forty-unit square as the doors, so a room's drawing and a door's drawing sit at the
// same weight wherever they meet.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { fill: 'rgb(var(--record-mark))', stroke: 'none' };

// Solutions — two parts that hold each other. A keyed joint: the tab is the red, because
// the tab is the whole of why the thing stands up. The method that works, as one object.
export function RoomMarkSolution({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M4 12h12v16H4zM23 8h13v6H23zM23 26h13v6H23zM30 8h6v24h-6z" />
      <path {...RED} d="M16 16l7-2v12l-7-2z" />
    </svg>
  );
}

// Crises — a wall, and one side of it slipped. The red is the fault between them: the
// break is the news, and nothing else on the mark is coloured.
export function RoomMarkCrisis({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M4 14h13v20H4zM23 6h13v20H23z" />
      <path {...RED} d="M20 4l3 16-3 16-3-16z" />
    </svg>
  );
}

// Actions — the direction you can take, and the point of it in red. A thing you can join
// or do is a way forward; it does not need a picture of a person doing it.
export function RoomMarkAction({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M4 17h20v6H4z" />
      <path {...RED} d="M24 10l12 10-12 10v-7h-5v-6h5z" />
    </svg>
  );
}

// Groups — several uprights and the one band they are all holding. People working on the
// same thing: the shared thing is the red, because that is what makes them a group.
export function RoomMarkGroups({ size = 32, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M6 10h6v22H6zM17 6h6v26h-6zM28 12h6v20h-6z" />
      <path {...RED} d="M3 23h34v5H3z" />
    </svg>
  );
}