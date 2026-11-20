import React from 'react';

// ── FOUR ROOMS, CUT BY THE SAME HAND AS EVERY OTHER MARK ───────────────────────
// Brian, 20 November: "can you look at our complete set of marks symbols please... the ones
// for crises solutions actions and groups dont feel like us bro. have we properly thought
// about why we have them and need them bro."
//
// He was looking at two sets drawn by two different hands. The record's twenty-four door
// marks are PRINTED MASSES: rectangles and blocks, one part in the record's red, drawn to
// survive nineteen pixels on a phone's second row. These four were organic cut shapes —
// a broken rock, a shoot, a waving flag — drawn at fifty-two pixels for the front page.
// Neither set was wrong. They simply were not the same hand, which is exactly the feeling
// of something not being us, and no amount of re-drawing one of them would have fixed it.
//
// WHY THESE FOUR EXIST AT ALL, since he asked. The twenty-four are doors: tap one and you
// go somewhere. These four are not doors — they filter the entries on the page you are
// already standing on. So they are right to look different from a door; a reader who takes
// a filter for a door is disappointed. But different job does not mean different hand.
//
// So they are now built the way the doors are built, and the rule is the doors' rule:
// solid masses, nothing thinner than the mass, no second colour, and exactly one part in
// the record's red — the part that is the point. Nothing here is drawn in a line.
//
// One thing was also taken away. Actions used to be a pole with a flag on it, and MarkSignal
// — the wire — is a pole with bars beside it. Two doors away, two marks read as the same
// object. An action is now a spade stood in the ground with its edge in red: a tool laid out
// ready, which is what an action on this record actually is — something already happening
// that you can pick up and join.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { className: 'text-record-mark', fill: 'currentColor', stroke: 'none' };

// Crises — the ground, broken, the record's red standing in the gap. What is at risk.
export function RoomMarkCrisis({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="17" width="13" height="19" {...MASS} />
      <rect x="24" y="19" width="13" height="17" {...MASS} />
      <path d="M16 17 H24 L26 36 H14 Z" {...RED} />
    </svg>
  );
}

// Solutions — the same ground as the crisis, whole, with something standing up out of it.
// The growth is the red part and the ground is ink, which is the pairing the crisis makes
// the other way round: there the ground is what is broken, here the ground is fine and the
// living thing is what the record is pointing at. It is also the honest size — a red seed
// chip in the soil was five pixels on a tablet, and a mark whose one red part cannot be
// seen at the size it is drawn is a mark with no point in it.
export function RoomMarkSolution({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="29" width="34" height="7" {...MASS} />
      <rect x="18.4" y="13.4" width="3.6" height="15.6" {...RED} />
      <path d="M19 15.4C19 9.4 14.2 5.6 8.8 6.6 8.6 11.6 13.2 15.8 19 15.4Z" {...RED} />
      <path d="M21.2 12.6C21.6 7.4 26.4 4.2 31.6 5 31.8 9.8 27.2 13.4 21.2 12.6Z" {...RED} />
    </svg>
  );
}

// Actions — a spade stood in the ground, its edge in red. A tool laid out ready to be
// picked up, which is what an action on this record is: something already happening.
export function RoomMarkAction({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="13.6" y="2.8" width="12.8" height="3.6" {...MASS} />
      <rect x="17.8" y="6.4" width="4.4" height="11.4" {...MASS} />
      <path d="M13.2 17.8 H26.8 L25.4 27.6 20 34.6 14.6 27.6 Z" {...RED} />
    </svg>
  );
}

// Groups — four of them stood round a space, seen from above. The one in red is the one
// who has not joined yet.
export function RoomMarkGroups({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="15.4" y="3.6" width="9.2" height="6.4" {...MASS} />
      <rect x="15.4" y="30" width="9.2" height="6.4" {...MASS} />
      <rect x="3.6" y="15.4" width="6.4" height="9.2" {...MASS} />
      <rect x="30" y="15.4" width="6.4" height="9.2" {...RED} />
    </svg>
  );
}