import React from 'react';

// ── THE MARKS AT THE FOOT ──────────────────────────────────────────────────────
// The foot of the record used to be a list of links with a sentence under each, and a
// sentence under a link is a menu explaining itself. It is nine doors now, and each one
// is a word beside a mark drawn for that door and nothing else.
//
// Same hand as the shed's marks: one weight, currentColor, no second colour, one solid
// mass in each so the mark is an object rather than a diagram. They are read at 26px on
// a phone, which is why nothing here has a line thinner than the stroke.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// An open folio, its leaves and spine drawn as separate ink gestures.
export function MarkBrief({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M19.8 10.7C15.6 6.9 9.2 5.8 3.5 7.2L5.1 29.8c5.2-1.4 10.1-.3 14.6 3.7" />
      <path d="M20.1 10.7c4.3-4 10.7-5.2 16.3-3.3l-1.7 22.4c-5.1-1.5-10.4-.2-14.6 3.7" />
      <path d="M7.1 12.4c3.2-.3 6.2.5 8.5 2.2M7.8 17.2c2.7-.1 5.4.5 7.9 2.2M8.2 22c2.9-.1 5.1.5 7.2 1.9M24.1 14.4c2.2-1.6 5.1-2.4 8-2M24 19.4c2.1-1.5 4.6-2.2 7.7-2" />
      <path d="M20 10.4c-.9 7.1.8 15.8-.1 23.1" className="text-record-mark" strokeWidth="2.1" />
      <path d="M3.2 32.9c6.8-1.2 11.9.3 16.5 3.2 5-3 10.2-4.4 16.8-3" opacity=".45" />
    </svg>
  );
}

// A continuous-line human profile, not a generic account badge.
export function MarkPortrait({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M7.2 34.8c1.9-3.2 5.6-5.4 9.9-6.5l.6-4.5c-3.1-2.6-4.3-6.3-3.6-10.1C14.8 8.2 18.8 4.1 23.7 5c4.3.8 6.2 3.7 5.1 8.2l3.2 4.1-3.4 1.3c.5 2.3-.2 4.4-2.4 5l-3.3-.2-.1 5.2c4.3 1.6 7.8 3.6 10 6.4" />
      <path d="M14.3 10.5C10.6 16.9 9.8 22 12 26M19.2 7.4c-6 .6-9.9 4.4-10.6 10.6M24.9 14.3l1.2-.1M26 20.6l2 .2" />
      <path d="M9.1 30.8c-4.5-6.3-4.2-13 .1-18.8" className="text-record-mark" strokeWidth="1.8" />
    </svg>
  );
}

// How it is made. A pair of dividers set to the page.
export function MarkMethod({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M18.7 9.2 8 35M21 9.5l10.3 25.1M13 24c4.2 1.3 9.5 1.1 14.1-.5M6.7 31.8c7.6 4 18.6 4.4 26.4-.4" />
      <circle cx="20" cy="7.4" r="3" className="text-record-mark" fill="currentColor" stroke="none" />
      <path d="M20 2v2M5.1 25.4l2.7 1.2M32.4 25.8l2.5-1" opacity=".5" />
    </svg>
  );
}

// A correction, in proofreader's hand: the line as it stands, and the insertion rising
// to its point. Nothing is quietly deleted on this record.
export function MarkCorrection({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M4.2 12.7c9.4-.6 21.6.7 31.1-.2M5.3 19.9l9.2-.2M25.5 20.1l9.1-.3M5 31.2c6.9-.6 13.1.3 19.8-.1" />
      <path d="M13.1 25.8l6.8-9.5 7.3 9.1M20 5.2l-.1 6.1" className="text-record-mark" strokeWidth="1.9" />
      <path d="M29.9 32.5l2 1.7 4.1-5.2" />
    </svg>
  );
}

// The people who check. Two pairs of eyes, set to the same page.
export function MarkCheckers({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="13" cy="22.4" r="6.2" />
      <circle cx="27" cy="22.4" r="6.2" />
      <path d="M19.2 22.4h1.6" />
      <path d="M6.8 22.4H4.4M33.2 22.4h2.4" />
    </svg>
  );
}

// What changes hands. One set of hands to another, and the direction said out loud.
export function MarkHandover({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="8.2" cy="30.2" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="31.8" cy="10.4" r="3.2" fill="currentColor" stroke="none" />
      <path d="M10.6 27.4C15.4 17 23.6 13.2 28.4 12.6" />
      <path d="M24.2 8.8l4.6 3.8-3.6 4.4" />
    </svg>
  );
}

// The music given to the record. A fork, struck once.
export function MarkMusic({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M14.4 6.4v12.2a5.6 5.6 0 0 0 11.2 0V6.4" />
      <path d="M20 24.2v10.4" />
      <path d="M15.6 34.6h8.8" />
    </svg>
  );
}

// What travels. A message going out in dots and dashes — the oldest way anyone found
// to send a thing further than a voice reaches.
export function MarkSignal({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M19.6 16.8l-6.7 18M20.3 16.8l7 18M16.3 26.7l8.2-.4M11.2 35l18.5-.3" />
      <path d="M12.7 11.1c-3 2.9-3.2 6.8-.2 9.9M27.1 10.8c3.3 3.1 3.5 7.4.5 10.2M7.2 5.4c-6.3 6.1-6 14.5-.7 20M32.2 5.2c6.3 6.4 6.1 14.4 1 20.1" />
      <path d="M19.8 4.1l-.2 8.1" className="text-record-mark" strokeWidth="2" />
      <circle cx="20" cy="16" r="2.8" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Where a thing is. A world drawn in three lines: the rim, the equator, one meridian.
export function MarkHorizon({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M33.4 15.1C31.8 7.6 23.2 3.1 15.5 6 7.6 8.7 3.6 17.2 6.6 25.1c2.8 7.4 11.5 11.1 18.9 7.7 4.2-1.8 7.1-5.5 8.1-9.7" />
      <path d="M14.4 7.6l-2.5 7.2 4.8 2.6-1 5.1 4.4 2.2 1.5 7M25.2 7.1l-3.4 5.7 4.3 3.1 5.4-.6M7.1 23c7.4-4.8 17.6-5.1 25.1-1.9" />
      <path d="M3 30.1c-1.9 6.2 9.2 6.3 19.9 1.2 11.6-5.6 17.9-14.4 14-16.5" opacity=".5" />
      <path d="M28.3 19.3l2-2" className="text-record-mark" />
      <circle cx="32.5" cy="14.9" r="3" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Looking for something in particular. One lens, one hairline handle, nothing else.
export function MarkLens({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M26.7 8.7C22.8 3.2 14.1 2.8 8.7 7.6 3.4 12.3 3.8 20.7 8.5 25.3c4.7 4.5 12.2 4.5 17 .2 4.7-4.3 5-11.3 1.2-16.8Z" />
      <path d="M22.3 7.8c-4.7-2.2-10.6-.4-13 4.1M6.9 18.7c.8 4.2 4.2 7.1 8.8 7.3M25.8 25.4l9.9 10.3 2-2-10.1-9.9" />
      <path d="M17.1 11.4l.1 9.3M12.5 16.1l9.4-.2" className="text-record-mark" strokeWidth="1.8" />
    </svg>
  );
}

// ── THE MARKS BEYOND THE MASTHEAD ─────────────────────────────────────────────
// Only five doors ever had a mark. Every other page on the record — why it exists,
// how an entry is checked, the corrections, the seals, the music, the keeper's own
// door — was a line of plain text in a list. That is why the record looked like it
// had a drawn front and a typed back: one hand for the way in, another for everything
// behind it. These are drawn in the same hand, for exactly those doors.
//
// The same rules hold: one weight, currentColor, one solid mass at most, nothing
// thinner than the stroke, and each mark drawn for one door and no other. A mark
// that could sit beside any word is an illustration, not a door.

// The mark itself, at the size of a word. Two strokes of exactly the same length,
// standing on one line.
//
// It used to be drawn as two crossing diagonals with a red bar through the middle,
// which at twenty-six pixels read as a four-pointed star — and a star is the one thing
// this mark must never be. Nothing here is a flourish: two uprights, one ground, and
// the equals between them. It cannot be mistaken for a badge, an award or a logo.
export function MarkEqual({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M10.5 8.6c-.5 6.3-.7 13.2-.4 20.1M29.3 8.4c.5 6.2.7 13.1.4 20" />
      <path d="M6.4 28.7h27.2" opacity=".5" strokeWidth="1" />
      <path d="M16.4 16.2h7.4M16.3 21.2h7.6" className="text-record-mark" strokeWidth="2.2" />
    </svg>
  );
}

// Every way through the record. A contents page: dots against their lines.
export function MarkContents({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M20 17.3 7.6 6.2M20.4 17.5l12.9-11M20.2 22.1l-12.5 12M20.6 22.1l13 11.7M17.5 20l-14.2.2M23 20l14-.1" />
      <path d="M5.6 12.4l2-6.5 6.4.5M27 6.6l6.6-.4.4 6.4M6.8 27.6l.5 6.8 6.1-.2M27.5 34.2l6.7-.3-.2-6.3" />
      <circle cx="20.2" cy="20" r="3.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Who is reading. A tally, not an eye: four strokes and one across them, which is
// how people counted things long before anything was counted for them.
export function MarkReadership({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M3.2 21.1C8 13 14.1 9.4 20.1 10.5c7 .7 11.1 5.7 16.7 10.3-5.4 6.4-11.8 9.6-18.4 8.3C11.4 28 7 25.3 3.2 21.1Z" />
      <path d="M20.8 11.1c-5.7-.7-9.3 3.6-8.9 8.8.3 5.6 4.5 9 9.8 8.1 4.9-.8 7.4-5.4 6.1-9.9" />
      <path d="M6 10.2l2.8 3.1M15.1 4.6l1 4.1M26.9 5.5l-1.8 4M34.1 11.4l-2.4 2.5" />
      <circle cx="20.2" cy="20" r="3.4" className="text-record-mark" fill="currentColor" stroke="none" />
      <path d="M8.8 33.6l-1.5 1.6M30.8 32.2l1.8 2" opacity=".5" />
    </svg>
  );
}

// An entry's fingerprint. A seal, with its ribbon still on it.
export function MarkSeal({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="17.6" r="9.6" />
      <path d="M15.4 26.2 13.6 35.4l6.4-3.4 6.4 3.4-1.8-9.2" />
    </svg>
  );
}

// The person who agrees to carry the record. A key handed over, not a crown.
export function MarkHost({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12.6" cy="12.6" r="4.6" />
      <path d="M16 16l15.8 15.8" />
      <path d="M26.2 26.2l3.4-3.4M30.8 30.8l3.4-3.4" />
    </svg>
  );
}

// What is offered and shared. A bowl held out — a plate, not a pocket.
export function MarkSupport({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M8.6 18.6h22.8" />
      <path d="M11.4 18.6c0 8.8 3.8 15.2 8.6 15.2s8.6-6.4 8.6-15.2" />
    </svg>
  );
}

// The terms the record is shared under. A lock with its shackle open, said once.
export function MarkCovenant({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M11 19.4h18v14.2H11Z" />
      <path d="M15.2 19.4v-5.2a5 5 0 0 1 9.4-2.4" />
      <circle cx="20" cy="26.4" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── THE TWO DOORS THAT HAD NO MARK ────────────────────────────────────────────
// Terms and Privacy sat in the foot as a pair of typed words, which is how the record's
// own promises ended up looking like the small print they are instead of like the two
// doors they are. Both are drawn here, and both had to be told apart from everything
// already on the sheet: a folio, a lock, a seal, an open lock. So neither is an object.

// The terms: a page of clauses with one line signed at the foot. A sheet, not a book,
// and a signature rather than a stamp — the record is offered on terms a person agreed
// to, which is why the nib's stroke crosses the ruled line instead of sitting on it.
export function MarkTerms({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M9.6 5.4h14.6L30.4 11.6V34.6H9.6Z" />
      <path d="M23.9 5.6v6.2h6.3" />
      <path d="M13.4 15.6h13M13.4 20.2h13M13.4 24.6h8.2" opacity=".55" />
      <path d="M13 31.6c2.6-2.6 4.6-1.4 5.7-.2 1 1.1 2.4.9 3.9-.7 1.2-1.3 2.4-1.4 3.6-.4" className="text-record-mark" strokeWidth="1.9" />
    </svg>
  );
}

// What is not shown: three lines of print with one taken out. Not an eye, not a lock, and
// not a shield — the record does not promise to defend you, it promises not to print you.
// A solid bar where a line should be says exactly that, and nothing else, at any size.
export function MarkPrivacy({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M8.6 11.2h22.8M8.6 16.9h14.2M12.4 30.4h19M8.6 35h10" opacity=".55" />
      <rect x="8.4" y="21.4" width="23.2" height="4.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The room where something is made rather than read.
export function MarkStudio({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M20 3.8c0 9.4 4.4 13.8 13.8 13.8C24.4 17.6 20 22 20 31.4 20 22 15.6 17.6 6.2 17.6 15.6 17.6 20 13.2 20 3.8Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M20 35.4v1.2" />
    </svg>
  );
}