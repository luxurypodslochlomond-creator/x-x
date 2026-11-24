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
// ── SECOND PASS, 24 NOVEMBER: NO PICTURES OF TOOLS ─────────────────────────────
// Brian: "crises and solutions and actions and groups are weird now bro… icons bit cheesy…
// shovel for action is weird." He was right, and the reason is the rule this record already
// set for its twenty-four subject marks: draw the idea, never the object. A spade says
// gardening. A shoot says gardening. Four blocks round a table says a meeting. All three
// are pictures of things, which is exactly what looks like clip art in fifty years.
//
// So the four are one mass, cut four ways, and the cut IS the meaning:
//   crisis   — the mass broken, the break standing open in red.
//   solution — the same mass, the same cut, closed: the break repaired in red. Kintsugi,
//              which is what a solution on this record actually is — not a new object, a
//              mended one, with the repair left visible.
//   action   — the mass stepped up. The ground has moved, and the riser is the red.
//   group    — the same mass in four, stood round a space, the fourth in red.
// Nothing here is a picture of an object. All four are the same ink and the same red.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
// ── ONE RED, AS THERE HAS ALWAYS BEEN ──────────────────────────────────────────
// One part of each mark is the record's red: the part that is the point. Four rooms in
// four hues was the fault — "colour weird now bro" — because a row of four colours is a
// legend for a chart, and this record has one red. A room may still hand a pigment down
// where a dark ground needs one (the night plate does, at fourteen pixels), and that is
// the only place the accent is ever anything but red.
const ACCENT = { fill: 'var(--room-accent, rgb(var(--record-red)))', stroke: 'none' };

// Crises — the ground, broken, the record's red standing in the gap. What is at risk.
export function RoomMarkCrisis({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="17" width="13" height="19" {...MASS} />
      <rect x="24" y="19" width="13" height="17" {...MASS} />
      <path d="M16 17 H24 L26 36 H14 Z" {...ACCENT} />
    </svg>
  );
}

// Solutions — the same mass as the crisis, the same cut, closed. The break is repaired in
// the record's red and the repair is left showing, because a solution here is never a clean
// new thing: it is the same ground, mended, and the mending is what the record is pointing
// at. Read the two together and the argument is the pair: one open, one closed.
export function RoomMarkSolution({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="17" width="34" height="19" {...MASS} />
      <path d="M18.4 17 H21.6 L22.4 36 H17.6 Z" {...ACCENT} />
    </svg>
  );
}

// Actions — the mass stepped up. Not a spade, not a flag, not a hand: the ground has moved,
// and the riser between the two levels is the red. A deed is a change of level — something
// that was not true before and is true now — which is what this record means by an action,
// and it is the one idea here that needs no object at all.
export function RoomMarkAction({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="24" width="16" height="12" {...MASS} />
      <rect x="22" y="10" width="15" height="14" {...MASS} />
      <rect x="19" y="10" width="3" height="26" {...ACCENT} />
    </svg>
  );
}

// Groups — the same mass, cut in four. It used to be four blocks stood round a space, seen
// from above, which is a picture of a meeting table: legible, and clip art in fifty years.
// Quartered, it is the mass itself divided — the one room on this record whose subject is
// other people rather than an idea, so one part of it is red.
export function RoomMarkGroups({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="3" y="3" width="15" height="15" {...MASS} />
      <rect x="22" y="3" width="15" height="15" {...MASS} />
      <rect x="3" y="22" width="15" height="15" {...MASS} />
      <rect x="22" y="22" width="15" height="15" {...ACCENT} />
    </svg>
  );
}