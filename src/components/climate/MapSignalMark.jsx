import React from 'react';

/* ── THE RECORD'S OWN SIGNALS ───────────────────────────────────────────────────────
   Five meanings, five marks, drawn in the record's four colours and no others: signal red
   for what burns, ink for what answers and for what is reported, paper for what was done
   and what was drawn.

   Every mark carries a paper ring inside an ink ring, so the same file reads on the painted
   planet, on warm paper, and on the black key — no second palette for a second ground.

   The shapes are not decoration, they are the legend:
     crisis   — a filled red disc with a paper eye: solid, loud, and looking at you.
     solution — a paper disc with an ink tick: an answer, signed.
     action   — a diamond: a deed, cut out and done.
     wire     — a dash: a line of text going out.
     drawing  — a page with a folded corner: a picture, hung. */
const GLYPH = {
  crisis: (
    <>
      <circle cx="10" cy="10" r="4.9" fill="#b3261e" />
      <circle cx="10" cy="10" r="1.7" fill="#f4efe4" />
    </>
  ),
  solution: (
    <>
      <circle cx="10" cy="10" r="5" fill="#f4efe4" />
      <path
        d="M7.2 10.3l2 2 3.6-4.1"
        fill="none"
        stroke="#141210"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  action: (
    <>
      <rect x="6.3" y="6.3" width="7.4" height="7.4" transform="rotate(45 10 10)" fill="#f4efe4" stroke="#141210" strokeWidth="1.2" />
      <rect x="8.5" y="8.5" width="3" height="3" transform="rotate(45 10 10)" fill="#141210" />
    </>
  ),
  wire: (
    <>
      <rect x="4.2" y="8.2" width="11.6" height="3.6" fill="#141210" />
      <rect x="4.2" y="8.2" width="11.6" height="3.6" fill="none" stroke="#f4efe4" strokeWidth="0.9" />
    </>
  ),
  cartoon: (
    <>
      <rect x="5.9" y="5.9" width="8.2" height="8.2" fill="#f4efe4" stroke="#141210" strokeWidth="1.2" />
      <path d="M10.8 5.9h3.3v3.3z" fill="#141210" />
    </>
  ),
};

export default function MapSignalMark({ kind, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      data-kind={kind}
      viewBox="0 0 20 20"
      className={`record-map-symbol ${className}`}
      focusable="false"
    >
      <circle cx="10" cy="10" r="8.6" fill="none" stroke="#f4efe4" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="9.4" fill="none" stroke="#141210" strokeWidth="0.9" opacity="0.65" />
      {GLYPH[kind] || GLYPH.solution}
    </svg>
  );
}