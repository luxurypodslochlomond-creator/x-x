import React from 'react';

// ── THE MARK, AND NOTHING ELSE ─────────────────────────────────────────────────
// There were two plates here for the same mark, one above the other: a small one, then a
// wide one with eight arcs leaving the space between the strokes. Two drawings of one
// glyph read as a mistake, and the arcs read as a signal or a fault — nobody arriving
// cold could tell they were meant to be light. The founder's own words were the verdict:
// "what are the two drawn things… make sense to me?"
//
// So there is one plate, and it names its own parts. Two upright strokes, set level with
// a hairline across their tops, standing on one line, with the record's red equals between
// them. Under the left stroke the word "one". Under the right, "another". Nothing else is
// drawn, because nothing else is claimed: x = x is not a formula and not a diagram of one.
//
// The strokes are not ruled straight. They lean and they thicken slightly, because a hand
// made them, and a hand is the only honest way to draw a decision.
export default function XEqualsXMarkPlate() {
  return (
    <figure className="my-8 border-y border-record-ink/25 py-7">
      <svg
        viewBox="0 0 400 258"
        role="img"
        aria-label="Two hand-drawn upright strokes of exactly the same height, standing on one line, with a red equal sign between them. Labelled: one, and another."
        className="mx-auto block h-auto w-full max-w-[330px]"
      >
        {/* the level they are held at */}
        <line x1="94" y1="46" x2="306" y2="46" stroke="rgb(var(--record-mark))" strokeWidth="1" strokeDasharray="2 6" opacity="0.55" />

        {/* one earth, drawn once */}
        <line x1="12" y1="200" x2="388" y2="200" stroke="#141210" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.3" />

        {/* two, standing, neither taller */}
        <path d="M126 46c-2.4 40-3 92-2 154" fill="none" stroke="#141210" strokeWidth="3" strokeLinecap="round" />
        <path d="M274 46c2.2 39 2.8 91 1.8 154" fill="none" stroke="#141210" strokeWidth="3" strokeLinecap="round" />

        {/* the mark itself, at the height of a chest */}
        <g stroke="rgb(var(--record-mark))" strokeWidth="6" strokeLinecap="round">
          <line x1="170" y1="107" x2="230" y2="107" />
          <line x1="170" y1="143" x2="230" y2="143" />
        </g>

        {/* what the two things are called, so nobody has to guess */}
        <g fill="rgb(var(--record-muted))" fontFamily="ui-monospace, Menlo, monospace" fontSize="9.5" letterSpacing="2.2" textAnchor="middle">
          <text x="126" y="226">ONE</text>
          <text x="274" y="226">ANOTHER</text>
        </g>
      </svg>

      <figcaption className="mx-auto mt-5 max-w-[34ch] text-center">
        <span className="block text-[15.5px] leading-[1.5] text-record-ink">Two, at the same height.</span>
        <span className="mt-1.5 block font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-record-muted">
          Neither above the other. Everything else here follows from that.
        </span>
      </figcaption>
    </figure>
  );
}