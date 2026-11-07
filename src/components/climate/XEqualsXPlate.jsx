import React from 'react';

// ── THE PLATE ──────────────────────────────────────────────────────────────────
// The first version of this plate was a failure, and it is worth writing down why so
// nobody rebuilds it: it was a red field with one white rule and a mark in paper. That
// is not a tribute to a sleeve, it is the sleeve, redrawn in CSS by somebody who should
// have known better. A record that promises it takes nothing from a person cannot open
// by imitating an artist's artwork and calling the imitation a colour.
//
// So the plate is paper and ink now, and the only borrowed thing left is one measured
// number, used once: a short stretch of red where the line speaks. Everything else is
// drawn here, by hand, in the record's own voice.
//
// What the line says is the argument. It runs flat, drops where the record is quiet,
// and comes back where somebody speaks. A frequency is only saved if somebody keeps it
// exactly as it was given to them. That is the whole of it.

export default function XEqualsXPlate() {
  return (
    <section aria-labelledby="the-plate" className="pb-7 border-b-2 border-[#141210]">
      <div className="border-2 border-[#141210] bg-[#f7f1e5] shadow-[5px_5px_0_0_rgba(20,18,16,0.14)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#141210]/20 px-3.5 py-2">
          <h2
            id="the-plate"
            className="text-[8.5px] font-black font-mono uppercase tracking-[0.28em] text-[#5a5246]"
          >
            The frequency
          </h2>
          <span className="text-[8.5px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
            Kept, not copied
          </span>
        </div>

        {/* Drawn by hand: one line, ink, with one stretch of red where it speaks. */}
        <figure className="px-3 pt-6 pb-4">
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
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M352 60 L366 16 L380 106 L394 60"
              fill="none"
              style={{ stroke: 'rgb(var(--record-mark))' }}
              strokeWidth="2.4"
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
              opacity="0.28"
            />
          </svg>
          <figcaption className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#5a5246]">
            Drawn here · ink and one measure of red · nothing traced
          </figcaption>
        </figure>

        <div className="border-t border-[#141210]/20 px-4 py-4 space-y-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
          <p>
            The line drops where the record is quiet, and comes back up where somebody
            speaks. That is the whole promise in a shape: nothing about a place or a person
            is allowed to stay flattened because nobody was looking at the time.
          </p>
          <p className="text-[11px] text-[#5a5246]">
            A frequency is only saved if somebody keeps it exactly as it was handed over.
            Not improved, not tidied, not made to sound more like what people already
            agree with.
          </p>
        </div>

        <div className="border-t border-[#141210]/20 px-4 py-3">
          <p className="font-mono text-[11px] leading-relaxed text-[#141210]">
            <span className="font-black uppercase tracking-[0.14em] text-[#b3261e]">
              What is borrowed.
            </span>{' '}
            One number: #CC2D2A, Laurie Anderson’s red, measured and named — the reason the mark on this
            page is the colour it is. Nothing else came from her, or from anybody. If she
            ever asks for that red to come off, it comes off the same day, and the removal is
            printed here rather than done quietly.
          </p>
        </div>
      </div>
    </section>
  );
}