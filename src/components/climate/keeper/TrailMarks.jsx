import React from 'react';

// ── THE MARKS A KEEPER READS OFF A LINE ────────────────────────────────────────
// Every one of these answers a question a keeper actually asks about a name on the list:
// did the letter reach them, did they ever turn up, whose word put them there, and what
// am I about to do to them. They are drawn here, as strokes, for the same reason the
// room's four doors are drawn here — a stock set says "dashboard", and this is a register.
//
// Same rules as KeeperMarks: 40-unit box, one weight, currentColor, no fills except the
// single solid mass that makes each mark an object rather than a diagram. They read at
// 13px in a line of small type and carry at 76px on a door.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// The letter. state="sent" puts a line of writing inside it; state="failed" strikes it
// through, because a letter that did not go is the one thing that must never look sent.
export function MarkLetter({ size = 18, className = '', state = 'sent' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true" opacity={state === 'none' ? 0.45 : 1}>
      <path d="M5.6 11.8h28.8v17.4H5.6z" />
      <path d="M5.6 12.8 20 23l14.4-10.2" />
      {state === 'sent' && <path d="M19.4 25.4h7.2" />}
      {state === 'failed' && <path d="M12.6 34.2 27.4 6.6" />}
    </svg>
  );
}

// They came in. A threshold crossed, arriving at the solid point that is the record.
export function MarkStep({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4.4 33.4h31.2" />
      <path d="M7.6 24.2h11.6" />
      <path d="M14.6 18.4l5.8 5.8-5.8 5.8" />
      <circle cx="31" cy="24.2" r="3.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Whose word. Two keys crossing: the one that asked and the one that agreed.
export function MarkAgreed({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="11.4" cy="10.2" r="4.4" />
      <path d="M13.8 13.8 27.4 33.4" />
      <circle cx="28.6" cy="10.2" r="4.4" />
      <path d="M26.2 13.8 12.6 33.4" />
    </svg>
  );
}

// Held. A barrier across the page: stopped, not erased.
export function MarkHold({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M6.4 13h27.2" />
      <path d="M13.2 13v19.4" />
      <path d="M26.8 13v19.4" />
      <path d="M4.8 33.4h30.4" />
    </svg>
  );
}

// Struck off. A line taken out of the register rather than hidden from it.
export function MarkStrike({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M9.4 12.6h21.2" />
      <path d="M9.4 20h21.2" />
      <path d="M9.4 27.4h21.2" />
      <path d="M30.6 7.4 9.4 32.6" />
    </svg>
  );
}

// Ask again. One turn of the page, and the arrowhead is the solid.
export function MarkAgain({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M31.4 20a11.4 11.4 0 1 1-4.2-8.8" />
      <path d="M33.2 6.4v6.6h-6.6" />
    </svg>
  );
}

// A note they signed. A nib over a ruled line.
export function MarkNote({ size = 18, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M6.4 33.4h27.2" />
      <path d="M12.4 26.6 27.6 11.4a3.6 3.6 0 0 1 5.1 5.1L17.5 31.7" />
      <circle cx="15" cy="29.1" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}