import React from 'react';

// ── THE ROOM'S SECOND ALPHABET ─────────────────────────────────────────────────
// Brian, 18 November: "you sure can do better and add more coolasfuck custom cartoons
// icons bro … for add your drawings, the book, etc and wherever else."
//
// The six part-marks answer "which part of the room is this". These answer a smaller and
// more useful question: "what am I about to do?" A pencil in a hand, a photograph of a
// sheet of paper, a book with a ribbon in it, a note pinned to a board. Drawn on the same
// forty-unit sheet with the same ink line as everything else on the record, and filled from
// the cartoon palette — sun, sky, mint, clay — because this is the room of cartoons and a
// wall of ink outlines with one red accent would be the room apologising for itself.
//
// Nothing here is a badge or a decoration for its own sake: each one replaces a small
// generic line-icon in a place where the reader is being asked to do something, so the
// thing they are being asked to do is drawn rather than signposted.
const INK = 'rgb(var(--record-ink))';

export function Mark({ size = 26, className = '', stroke = 2, children }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke={INK}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// A pencil in a fist, and the line it has just drawn. "Draw a strip."
export function HandPencil({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <g transform="rotate(45 20 20)">
        <rect x="16" y="3" width="8" height="25" className="cmark-sun" />
        <path d="M16 28h8l-4 9Z" className="cmark-paper" />
        <path d="M18.6 33.2l1.4 3.4 1.4-3.4" strokeWidth="1.3" />
        <path d="M16 8h8" strokeWidth="1.3" />
      </g>
      <path d="M4 35c4-3 7 1 11-1" strokeWidth="1.8" />
      <path d="M33 3l2-1.6M36 8l2-.6" strokeWidth="1.3" />
    </Mark>
  );
}

// A photograph of a sheet of paper: the sheet, the drawing on it, the crop marks round it.
// "Bring a paper drawing."
export function PaperPhoto({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <rect x="4" y="7" width="32" height="27" strokeWidth="1.2" strokeDasharray="3 3.5" />
      <path d="M11 11h13l5 5v16H11Z" className="cmark-paper" />
      <path d="M24 11v5h5" strokeWidth="1.3" />
      <circle cx="17.5" cy="19.5" r="2.4" className="cmark-sun" />
      <path d="M12 30l4.5-6 3.5 3 3-2.5 3.5 5.5" className="cmark-mint" />
    </Mark>
  );
}

// A closed book with a ribbon in it. The anthology.
export function BookRibbon({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <rect x="7" y="6" width="26" height="24" className="cmark-mint" />
      <path d="M12 6v24" />
      <path d="M17 12h12M17 16h12M17 20h8" strokeWidth="1.4" />
      <path d="M22 30v6l-3-2.4-3 2.4v-6" className="cmark-clay" />
    </Mark>
  );
}

// The room's own sun, with a face on it. Warm, and never a logo.
export function SunFace({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <circle cx="20" cy="20" r="9" className="cmark-sun" />
      <path d="M20 3v4M20 33v4M3 20h4M33 20h4M8 8l2.8 2.8M29.2 29.2L32 32M32 8l-2.8 2.8M10.8 29.2L8 32" strokeWidth="1.7" />
      <path d="M16.8 18.4h.01M23.2 18.4h.01" strokeWidth="2.8" />
      <path d="M16.8 23c1.7 1.9 4.7 1.9 6.4 0" strokeWidth="1.7" />
    </Mark>
  );
}

// A note pinned to a board: a page waiting for a drawing.
export function PinnedNote({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <g transform="rotate(-6 20 24)">
        <rect x="9" y="12" width="23" height="24" className="cmark-paper" />
        <path d="M13 19h15M13 23h15M13 27h9" strokeWidth="1.4" />
      </g>
      <circle cx="20" cy="10" r="3" className="cmark-clay" />
      <path d="M20 13v3" strokeWidth="1.6" />
    </Mark>
  );
}

// A balloon with a star in it: somebody has said something back.
export function BalloonStar({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <path d="M6 7h28v16H20l-6 6v-6H6Z" style={{ fill: 'rgb(var(--cartoon-sky))' }} />
      <path
        d="M20 10.6l1.7 3.5 3.8.5-2.8 2.7.7 3.8-3.4-1.9-3.4 1.9.7-3.8-2.8-2.7 3.8-.5Z"
        style={{ fill: 'rgb(var(--cartoon-sun))' }}
        strokeWidth="1.5"
      />
    </Mark>
  );
}

// Three heads, drawn: everybody's pages, not one person's.
export function TinyCrowd({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <circle cx="9" cy="18" r="4.2" className="cmark-paper" />
      <circle cx="20" cy="15" r="4.8" className="cmark-sun" />
      <circle cx="31" cy="18" r="4.2" className="cmark-mint" />
      <path d="M2 33c0-4 3.1-6.4 7-6.4s7 2.4 7 6.4" />
      <path d="M12 34c0-4.6 3.6-7.4 8-7.4s8 2.8 8 7.4" />
      <path d="M24 33c0-4 3.1-6.4 7-6.4s7 2.4 7 6.4" />
    </Mark>
  );
}

// A starburst, the way a comic shouts a word: what a strip is for, said once and loudly.
export function BurstMark({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <path
        d="M20 3l3 10 10-5-7 9 11 3-11 3 7 9-10-5-3 10-3-10-10 5 7-9L3 20l11-3-7-9 10 5Z"
        className="cmark-sun"
        strokeWidth="1.6"
      />
    </Mark>
  );
}

// A drawn arrow, for turning a page. A chevron is a piece of interface; this is a line
// somebody pressed into the paper.
export function InkArrow({ size = 22, className = '', dir = 'right' }) {
  return (
    <Mark size={size} className={className}>
      <g transform={dir === 'left' ? 'scale(-1,1) translate(-40,0)' : undefined}>
        <path d="M4 20h27" strokeWidth="2.6" />
        <path d="M23 11.5l9.5 8.5-9.5 8.5" strokeWidth="2.6" />
        <path d="M9 16.2c3 .5 5.4 2 6.6 4.2" strokeWidth="1.1" />
      </g>
    </Mark>
  );
}

// A pot of ink with a nib in it. The record's own mark, for a page that is being written.
export function InkPot({ size = 26, className = '' }) {
  return (
    <Mark size={size} className={className}>
      <path d="M13 21h14l-2 13H15Z" className="cmark-clay" />
      <path d="M13 21c2-1.6 12-1.6 14 0" />
      <path d="M24 22l9-14" strokeWidth="2.1" />
      <path d="M33 8l-3.4 1.2 1.2 3.4Z" className="cmark-sun" strokeWidth="1.6" />
      <path d="M4 36h9" strokeWidth="1.6" />
    </Mark>
  );
}