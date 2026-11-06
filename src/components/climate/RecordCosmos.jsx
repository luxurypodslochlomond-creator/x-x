import React from 'react';

// ── THE SMALLEST DETAIL ──────────────────────────────────────────────────────────────
// Every page of the record ends on a strip of the painting. Stand at the foot of the page
// and there is one thing there, 28 pixels wide, that no reader will notice on the way past:
// a drawn solar system — the plate's hairline edge rules, three orbits, the sun, and the
// world turning on its own orbit with a thin ring around it.
//
// This is the answer to "the smallest detail, for infinite zoom". Not another picture: the
// record already carries one painting, and a second image would fight it and cost a phone
// a download. This is geometry — four circles and a dot — so it is still drawn when you zoom
// to ten thousand per cent, and it weighs nothing at all because it is already in the page.
// It is the same mark on every page, in every tongue, at the same size, which is what makes
// it a mark rather than decoration: the sky the whole book is written under.
//
// It moves, and the moving is the point: the world takes four minutes to come round, and the
// sun brightens and dims over nine seconds the way breath does — one cycle, never a pulse.
// Two elements animate; nothing repaints, nothing re-renders, nothing downloads. A reader who
// has told their device that movement makes them ill gets it perfectly still, because the
// record's own reduce-motion rule already stops every animation on the page.
//
// Deliberately unlabelled and hidden from a screen reader: a page's foot does not need to
// announce a decoration. If it ever needs to say something, it says it somewhere else.

export default function RecordCosmos({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* The plate's edge — the ticks of an instrument, so the eye reads measurement
          rather than ornament even when the thing is only a few pixels across. */}
      <g stroke="#efe7d6" strokeWidth="0.75" opacity="0.34" strokeLinecap="round">
        <line x1="1" y1="32" x2="6" y2="32" />
        <line x1="58" y1="32" x2="63" y2="32" />
        <line x1="32" y1="1" x2="32" y2="6" />
        <line x1="32" y1="58" x2="32" y2="63" />
      </g>

      {/* Three orbits. The outermost is a hairline you only find if you go looking. */}
      <g fill="none" stroke="#efe7d6" strokeWidth="0.6">
        <circle cx="32" cy="32" r="9" opacity="0.3" />
        <circle cx="32" cy="32" r="17" opacity="0.2" />
        <circle cx="32" cy="32" r="25" opacity="0.12" />
      </g>

      {/* The sun — the one warm thing in the whole foot of the record. */}
      <circle className="record-cosmos-breathe" cx="32" cy="32" r="2.4" fill="#e2602a" />

      {/* The world, on its orbit, with its own thin ring: at 28px it is a speck, at 10000%
          it is a planet. This is the thing the zoom is for. */}
      <g className="record-cosmos-turn" style={{ transformOrigin: '32px 32px' }}>
        <circle cx="32" cy="15" r="1.9" fill="none" stroke="#e2602a" strokeWidth="0.5" opacity="0.75" />
        <circle cx="32" cy="15" r="1.3" fill="#efe7d6" />
      </g>
    </svg>
  );
}