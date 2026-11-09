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

// What this is. A sheet, folded at the corner, already numbered.
export function MarkBrief({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M10.6 4.6h12.8L30.4 11.6v23.8H10.6Z" />
      <path d="M23 4.6v7h7.4" />
      <path d="M15 19.6h10.6M15 24.6h10.6M15 29.6h6.4" />
    </svg>
  );
}

// Whose record this is. A bust on its plinth, not a logo.
export function MarkPortrait({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="14.4" r="6.4" />
      <path d="M8.4 32.4c0-6.4 5.2-11.6 11.6-11.6s11.6 5.2 11.6 11.6" />
      <path d="M8.4 35.4h23.2" />
    </svg>
  );
}

// How it is made. A pair of dividers set to the page.
export function MarkMethod({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="7.2" r="2.6" fill="currentColor" stroke="none" />
      <path d="M18.8 9.6L10.4 33.4" />
      <path d="M21.2 9.6l8.4 23.8" />
      <path d="M14.4 23.4h11.2" />
    </svg>
  );
}

// A correction, in proofreader's hand: the line as it stands, and the insertion rising
// to its point. Nothing is quietly deleted on this record.
export function MarkCorrection({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M5.6 14.6h28.8" />
      <path d="M20 33.4l-6.6-8.4" />
      <path d="M20 33.4l6.6-8.4" />
      <path d="M20 6.6v6.4" />
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
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="7.4" cy="14.4" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="14.4" r="2.2" fill="currentColor" stroke="none" />
      <path d="M21.6 14.4h10.8" />
      <path d="M7.4 25.6h9.4M21.6 25.6h4.4" />
    </svg>
  );
}

// Where a thing is. A world drawn in three lines: the rim, the equator, one meridian.
export function MarkHorizon({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="12.6" />
      <path d="M7.4 20h25.2" />
      <path d="M20 7.4c4.8 6.2 4.8 19 0 25.2" />
      <circle cx="20" cy="20" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Looking for something in particular. One lens, one hairline handle, nothing else.
export function MarkLens({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="17.6" cy="17.6" r="9.4" />
      <path d="M24.4 24.6 32.4 32.6" />
      <path d="M13.2 17.6h8.8" />
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

// The mark itself, at the size of a word. Two strokes of exactly the same length.
export function MarkEqual({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M9.6 15.4h20.8M9.6 24.6h20.8" />
    </svg>
  );
}

// Every way through the record. A contents page: dots against their lines.
export function MarkContents({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M10.6 4.6h18.8v30.8H10.6Z" />
      <circle cx="15.4" cy="13.6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="26.4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M19.8 13.6h5.6M19.8 20h5.6M19.8 26.4h5.6" />
    </svg>
  );
}

// Who is reading. A tally, not an eye: four strokes and one across them, which is
// how people counted things long before anything was counted for them.
export function MarkReadership({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M11.4 12v16M16.6 12v16M21.8 12v16M27 12v16" />
      <path d="M8.4 20h21.2" />
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