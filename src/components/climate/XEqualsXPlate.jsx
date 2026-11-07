import React from 'react';

// ── THE FREQUENCY ─────────────────────────────────────────────────────────────
// The first version of this plate was a failure, and it is worth writing down why so
// nobody rebuilds it: it was a red field with one white rule and a mark in paper. That is
// not a tribute to a sleeve, it is the sleeve, redrawn in CSS by somebody who should have
// known better.
//
// The second version over-corrected the other way: no art, but a heavy black frame, two
// all-caps labels and a hard shadow, so the quietest thing on the page was set in the
// loudest frame on it. The frame is a hairline now and the drawing does the talking.
//
// What the line says is the argument. It runs flat, drops where the record is quiet, and
// comes back where somebody speaks. A frequency is only saved if somebody keeps it exactly
// as it was given to them. That is the whole of it.

export default function XEqualsXPlate() {
  return (
    <section aria-labelledby="the-plate" className="pb-9 border-b border-[#141210]/15">
      <h2 id="the-plate" className="sr-only">
        The frequency
      </h2>

      <figure className="border border-[#141210]/20 bg-[#f7f1e5] px-4 pt-7 pb-4">
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
        <figcaption className="mt-4 font-mono text-[12.5px] leading-relaxed text-[#5a5246]">
          Drawn here, in ink. One measure of red. Nothing traced.
        </figcaption>
      </figure>

      <div className="mt-6 space-y-4">
        <p>
          The line drops where the record is quiet, and comes back up where somebody speaks.
          That is the whole promise in a shape: nothing about a place or a person is allowed to
          stay flattened because nobody was looking at the time.
        </p>
        <p>
          A frequency is only saved if somebody keeps it exactly as it was handed over. Not
          improved, not tidied, not made to sound more like what people already agree with.
        </p>
        <p className="text-[#5a5246]">
          <span className="font-mono text-[12.5px] tracking-[0.06em] text-[#141210]">
            What is borrowed.{' '}
          </span>
          One number: #CC2D2A, Laurie Anderson’s red, measured and named, the reason the mark on
          this page is the colour it is. Nothing else came from her, or from anybody. If she ever
          asks for that red to come off, it comes off the same day, and the removal is printed
          here rather than done quietly.
        </p>
      </div>
    </section>
  );
}