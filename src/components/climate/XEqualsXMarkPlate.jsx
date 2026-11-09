import React from 'react';

// ── THE MARK IS THE MARK ───────────────────────────────────────────────────────
// Two drafts went past this plate and neither was the mark. The first drew two upright
// strokes with an equal sign between them; the second added eight arcs leaving the space,
// meant as light, which read as a signal fault. The founder's verdict on both: "I don't
// know what the mark is, it's confusing."
//
// He is right, and the mistake was mine: x = x does not need a diagram. It is three
// characters, and it is the whole covenant. So it is set as type — the record's own serif,
// at the size a mark deserves, in the red measured off her sleeve — and nothing is drawn
// round it. No strokes, no labels, no arcs. If a reader can read, they have the mark.
export default function XEqualsXMarkPlate() {
  return (
    <figure className="my-8 border-y border-record-ink/25 py-8">
      <div
        role="img"
        aria-label="x equals x"
        className="select-none text-center text-record-mark"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(62px, 21vw, 108px)',
          lineHeight: 0.95,
          letterSpacing: '0.01em',
        }}
      >
        x&nbsp;=&nbsp;x
      </div>

      <figcaption className="mx-auto mt-6 max-w-[36ch] text-center">
        <span className="block text-[15.5px] leading-[1.5] text-record-ink">
          The covenant, in full. Everything else on this page comes from it.
        </span>
        <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
          Nobody above anybody
        </span>
      </figcaption>
    </figure>
  );
}