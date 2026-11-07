import React from 'react';

// ── THE SHED'S PLATE ────────────────────────────────────────────────────────────
// One engraved object for the whole room: a key whose bow is an eye. That is the job
// said in a single image — the person who holds the key is also the person who looks —
// and it is drawn, not borrowed, so the room reads as a page of the record rather than a
// control panel.
//
// Engraved, not illustrated: one hairline weight, ink on paper, no fill, no gradient, and
// exactly one red mark in the whole picture — the pupil. A plate with two reds in it is a
// poster; a plate with one is a stamp.
export default function ShedPlate({ height = 104, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 150"
      height={height}
      width={(height * 100) / 150}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* The ground: two rings, barely there, so the key sits in a field instead of floating. */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.16">
        <circle cx="50" cy="62" r="46" />
        <circle cx="50" cy="62" r="33" />
      </g>

      {/* The key. */} 
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 32C40 16 60 16 72 32 60 48 40 48 28 32Z" />
        <circle cx="50" cy="32" r="8.5" />
        <path d="M45 48v70h10v-6h11v-8H55v-4h17v-10H55V48Z" />
      </g>

      {/* The one red mark on the page. */}
      <circle cx="50" cy="32" r="2.6" fill="#b3261e" />

      {/* The plate's baseline. */}
      <path d="M31 144h38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}