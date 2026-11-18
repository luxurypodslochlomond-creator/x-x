import React from 'react';

// ── THE ROOM'S SIX DOORS, DRAWN ────────────────────────────────────────────────
// Brian, 18 November: "could have coolasfuck cartoon icons for the wall the 29th the strip
// etc bro … still not sure what's going on sorry bro."
//
// The list of six links was true and it was invisible: small underlined words at the end of
// a paragraph, which is a footnote, not a way into a room. So each part of this room now has
// a drawing of its own, and under the drawing a plain line saying what the part actually is.
// That is the whole fix — a reader who does not yet know what the page is can read the six
// drawings and know.
//
// Drawn on the record's own forty-unit sheet with the record's own ink line, so they belong
// to the same alphabet as every other mark here. The difference is deliberate and it is the
// room's: these are filled in the cartoon palette — sun, sky, mint, clay — because this is
// the room of cartoons, and a wall of ink outlines with one red accent would be the room
// apologising for itself.
const INK = 2;

function Mark({ children, size = 40 }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke="rgb(var(--record-ink))"
      strokeWidth={INK}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="comic-part-mark"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const MARKS = {
  // A framed drawing on a nail: the wall itself.
  wall: (
    <Mark>
      <path d="M20 2v6" />
      <rect x="6" y="9" width="28" height="24" className="cmark-sky" />
      <circle cx="14" cy="17" r="3" className="cmark-sun" />
      <path d="M8 30l6-7 5 4 6-7 7 10" className="cmark-mint" />
      <path d="M6 9h28v24H6Z" />
    </Mark>
  ),
  // A calendar with the day circled, and somebody talking beside it.
  day: (
    <Mark>
      <rect x="4" y="9" width="21" height="20" className="cmark-paper" />
      <path d="M4 15h21" />
      <path d="M9 5v6M20 5v6" />
      <circle cx="14.5" cy="23" r="4" className="cmark-sun" />
      <path d="M28 17h9v8h-4l-2 3v-3h-3Z" className="cmark-mint" />
    </Mark>
  ),
  // Three panels in a row with a face in the middle one: a strip.
  strip: (
    <Mark>
      <rect x="2" y="11" width="11" height="17" className="cmark-sky" />
      <rect x="15" y="11" width="11" height="17" className="cmark-sun" />
      <rect x="28" y="11" width="11" height="17" className="cmark-mint" />
      <path d="M18.5 18h1M22 18h1M18.5 22c1.5 1 3.5 1 5 0" />
      <path d="M6 37h29" />
    </Mark>
  ),
  // An open book: the anthology.
  book: (
    <Mark>
      <path d="M20 12c-4-3-9-3-13-1v19c4-2 9-2 13 1" className="cmark-paper" />
      <path d="M20 12c4-3 9-3 13-1v19c-4-2-9-2-13 1" className="cmark-paper" />
      <path d="M20 12v19" />
      <path d="M11 18h5M11 22h5M24 18h5M24 22h5" strokeWidth="1.4" />
      <circle cx="27" cy="28" r="2.4" className="cmark-sun" />
    </Mark>
  ),
  // A pencil and a balloon: your turn.
  yours: (
    <Mark>
      <path d="M22 3h12v8h-5l-3 3v-3h-4Z" className="cmark-mint" />
      <path d="M9 26l3-1 11-11-2-2L10 23Z" className="cmark-sun" />
      <path d="M23 12l2 2" />
      <path d="M9 26l-2 5 5-2" />
      <path d="M4 35c6-2 12-2 18 0" />
    </Mark>
  ),
  // A balloon carrying a heart: why drawings land where words do not.
  why: (
    <Mark>
      <path d="M7 7h26a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H19l-6 6v-6H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" className="cmark-sun" />
      <path d="M20 20c-2.6-1.9-4.4-3.5-4.4-5.4a2.7 2.7 0 0 1 4.4-2 2.7 2.7 0 0 1 4.4 2c0 1.9-1.8 3.5-4.4 5.4Z" className="cmark-clay" />
    </Mark>
  ),
};

// The six parts, in the order they appear on the page. `caption` is the line that answers
// "what is this?" for somebody who has just landed and does not know yet.
export const CARTOON_PARTS = [
  { key: 'wall', label: 'The wall', caption: 'Every drawing, numbered', href: '#cartoon-wall-title' },
  { key: 'day', label: 'The 29th', caption: 'Janine’s workshop day', href: '#cartoon-session-title' },
  { key: 'strip', label: 'The strip', caption: 'The record’s own cartoon', href: '#cartoon-strip' },
  { key: 'book', label: 'The book', caption: 'The free anthology', href: '#cartoon-anthology' },
  { key: 'yours', label: 'Your turn', caption: 'Send a drawing', href: '#cartoon-your-turn' },
  { key: 'why', label: 'Why cartoons', caption: 'Why drawings land', href: '#cartoon-why-title' },
];

export default function CartoonPartMark({ part }) {
  return MARKS[part] || MARKS.wall;
}