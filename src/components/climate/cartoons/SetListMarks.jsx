import React from 'react';
import { Mark } from '@/components/climate/cartoons/CartoonInkIcons';

// ── THE SET LIST'S OWN ALPHABET ───────────────────────────────────────────────
// Brian, 25 November: "icons aren't coolasfuck symbols bro know what I mean."
//
// He does mean, and the fault is the same one he caught in the four room marks and again
// in the three doors: a starburst, a crowd of heads, a pinned note, a pot of ink, a
// photograph of a sheet. Every one was a picture of an OBJECT standing in for an IDEA, and
// an object at twenty-two pixels has to be drawn in detail to be recognised — which is
// exactly how a mark starts looking stuck on the page instead of printed on it.
//
// So these twelve say the idea and nothing else: one ink line, one red stroke, no fill, no
// object. A ring of marks around a centre is many hands and one wall. A stair is one thing
// after another. A box with a gap is a room with a door in it. Nothing here is a picture of
// something you could pick up.
const RED = 'rgb(var(--record-red))';

// 01 · Drawings — marks standing on a line, the way work stands on a wall.
export function MarkDrawings({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M8 31V15M17 31V9M26 31V19M35 31V12" />
      <path d="M4 35h32" strokeWidth="1.5" />
      <path d="M26 31V19" style={{ stroke: RED }} />
    </Mark>
  );
}

// 02 · Take part — a ring that does not close, and the stroke that would close it.
export function MarkTakePart({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M32 10.5A13.5 13.5 0 1 0 34.5 23" />
      <path d="M25 16l6.5-5.5" strokeWidth="3" style={{ stroke: RED }} />
    </Mark>
  );
}

// 03 · The book — a bound edge with sheets gathering into it.
export function MarkBook({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M11 6v28" />
      <path d="M11 10h23M11 17h19M11 24h15" strokeWidth="2" />
      <path d="M11 31h9" strokeWidth="2" style={{ stroke: RED }} />
    </Mark>
  );
}

// 04 · Why cartoons — a line that keeps going, and kinks: an argument interrupting.
export function MarkArgument({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M4 30h13l4-15 5 9h10" />
      <path d="M17 30l4-15" style={{ stroke: RED }} />
    </Mark>
  );
}

// 05 · Cartoonists around the world — a ring of marks about one centre. Not a globe:
// a globe would be a picture of the world, and this is a picture of who is drawing.
export function MarkRing({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M20 5v5M35 20h-5M20 35v-5M5 20h5M30.6 9.4l-3.5 3.5M30.6 30.6l-3.5-3.5M9.4 30.6l3.5-3.5M9.4 9.4l3.5 3.5" />
      <circle cx="20" cy="20" r="4.5" style={{ stroke: RED }} />
    </Mark>
  );
}

// 06 · The seventeen goals — a counted mass, with the count not yet complete.
export function MarkCounted({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.4}>
      <path d="M7 13v9M14 13v9M21 13v9M28 13v9M35 13v9" />
      <path d="M7 26v9M14 26v9M21 26v9M35 26v9" />
      <path d="M28 26v9" style={{ stroke: RED }} />
    </Mark>
  );
}

// 07 · Unsigned — the mark, the pen lifted, and the rule where a signature would go.
export function MarkUnsigned({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.8}>
      <path d="M4 12h26" />
      <circle cx="34" cy="12" r="2.2" strokeWidth="2" style={{ stroke: RED, fill: RED }} />
      <path d="M7 29h26" strokeWidth="1.4" strokeDasharray="0" />
    </Mark>
  );
}

// 08 · Print a show — a contact sheet: the same frame again and again, one of them live.
export function MarkContactSheet({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.2}>
      <rect x="5" y="5" width="13" height="13" />
      <rect x="22" y="5" width="13" height="13" />
      <rect x="5" y="22" width="13" height="13" />
      <rect x="22" y="22" width="13" height="13" style={{ stroke: RED }} />
    </Mark>
  );
}

// 09 · Read them in order — a stair: one thing, then the next, then the next.
export function MarkInOrder({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M5 34h10V24h10V14h10" />
      <path d="M35 14v-6" style={{ stroke: RED }} />
    </Mark>
  );
}

// 10 · One hand's own page — a stroke that turns in on itself, which is what a hand does
// when it signs something. No name in it, because the name is written beside the mark.
export function MarkOneHand({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M35 7c-16 0-25 7-25 15 0 6 5 10 11 8" />
      <path d="M21 30l-2.5-5" style={{ stroke: RED }} />
    </Mark>
  );
}

// 11 · Where this stands — two edges, and the line drawn between them in the open.
export function MarkTwoEdges({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M7 6v28" />
      <path d="M33 6v28" style={{ stroke: RED }} />
      <path d="M20 9v22" strokeWidth="1.4" strokeDasharray="3 4" />
    </Mark>
  );
}

// 12 · What this is — a room with one gap in it, and the gap is the way in.
export function MarkRoom({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M7 33V7h26v26H20" />
      <path d="M20 33h-6" style={{ stroke: RED }} />
    </Mark>
  );
}

// 13 · Where they were drawn — the edge of the world, with the wall's own strokes standing
// inside it. Not a globe with continents on it: a map mark at twenty-two pixels is a smudge,
// and the idea here is only that these drawings have a ground under them.
export function MarkWhere({ size = 22 }) {
  return (
    <Mark size={size} stroke={2.6}>
      <path d="M5 21a15 8.5 0 1 0 30 0a15 8.5 0 1 0 -30 0" />
      <path d="M14 25V20M26 25V22" strokeWidth="1.8" />
      <path d="M20 25V16" style={{ stroke: RED }} />
    </Mark>
  );
}