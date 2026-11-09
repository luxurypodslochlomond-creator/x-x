import React from 'react';

// ── THE MARK, DRAWN RATHER THAN EXPLAINED ─────────────────────────────────────
// x = x is not a slogan and it is not a diagram of a formula. It is two people, and
// neither one is taller than the other. So the page shows two upright strokes, the
// same height to the millimetre, with the record's own equal sign set between them at
// the height of a chest — not above the pair, not below them.
//
// The hairlines are the only red on the page here: one across the tops, to show the
// two heads are level, and one along the ground, to show they stand on the same earth.
// Nothing else is measured, because nothing else about a person is up for measuring.
//
// The strokes are not ruled. They lean a little and they thicken and thin, because a
// hand made them — and a hand is the only honest way to draw a decision.
export default function XEqualsXMarkPlate() {
  return (
    <figure className="my-10 border-y border-record-ink/20 py-9">
      <svg
        viewBox="0 0 260 214"
        role="img"
        aria-label="Two upright strokes of exactly the same height, drawn by hand, with an equal sign set between them."
        className="mx-auto block h-auto w-full max-w-[248px]"
      >
        {/* the same earth, drawn once */}
        <line x1="34" y1="184" x2="226" y2="184" stroke="#141210" strokeWidth=".8" opacity=".3" />

        {/* two, standing */}
        <path d="M64 58c-2.6 40-3.4 84-2.2 121.5" fill="none" stroke="#141210" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M196 58c2.2 39.6 3 83.4 1.8 121.5" fill="none" stroke="#141210" strokeWidth="2.6" strokeLinecap="round" />

        {/* the level they are held at */}
        <line x1="55" y1="58" x2="205" y2="58" stroke="rgb(var(--record-mark))" strokeWidth="1" strokeDasharray="2 6" opacity=".85" />

        {/* the mark itself, set where a chest would be */}
        <g stroke="rgb(var(--record-mark))" strokeWidth="3.4" strokeLinecap="round" className="x-equals-x-light">
          <line x1="113" y1="104" x2="147" y2="104" />
          <line x1="113" y1="134" x2="147" y2="134" />
        </g>
      </svg>

      <figcaption className="mx-auto mt-6 max-w-[36ch] text-center text-[15px] leading-[1.6] text-record-ink">
        Two, at the same height.
        <span className="mt-1 block text-record-muted">Not a measurement. A decision.</span>
      </figcaption>
    </figure>
  );
}