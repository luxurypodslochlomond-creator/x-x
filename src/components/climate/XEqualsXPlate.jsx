import React from 'react';

// ── THE FREQUENCY ─────────────────────────────────────────────────────────────
// One drawing, one sentence. It used to carry four paragraphs — the shape explained, then
// explained again, then the borrowed red explained a third time before the section that
// exists to state debts. A drawing that needs that much talking is being argued for rather
// than shown. The frame is gone too: the line is the mark.
//
// What the line says is the argument. It runs flat, drops where the record is quiet, and
// comes back where somebody speaks.

export default function XEqualsXPlate() {
  return (
    <section aria-labelledby="the-plate" className="py-8 border-b border-[#141210]/15">
      <h2 id="the-plate" className="sr-only">
        The frequency
      </h2>

      <figure>
        <svg
          viewBox="0 0 600 120"
          role="img"
          aria-label="A thin hand-drawn line running flat, dipping low, and rising again, with one short stretch of it in the record's red."
          className="w-full h-auto"
          style={{ display: 'block' }}
        >
          <path
            d="M0 60 L118 60 L132 24 L146 98 L160 60 L228 60 L242 46 L256 74 L270 60 L352 60 L366 16 L380 106 L394 60 L466 60 L480 50 L494 70 L508 60 L600 60"
            fill="none"
            stroke="#141210"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M352 60 L366 16 L380 106 L394 60"
            fill="none"
            style={{ stroke: 'rgb(var(--record-mark))' }}
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="0"
            y1="60"
            x2="600"
            y2="60"
            stroke="#141210"
            strokeWidth="0.6"
            strokeDasharray="2 5"
            opacity="0.22"
          />
        </svg>
        <figcaption className="mt-3 font-mono text-[12.5px] text-[#5a5246]">
          Drawn here, in ink. One measure of red. Nothing traced.
        </figcaption>
      </figure>

      <p className="mt-5">
        The line drops where the record is quiet, and comes back where somebody speaks. Nothing
        is allowed to stay flattened because nobody was looking at the time.
      </p>
    </section>
  );
}