import React from 'react';

// ── THE MARK ───────────────────────────────────────────────────────────────────
// Janine read this page and said it was too confusing because we were talking too much.
// She was right, and it is worth writing down why: the mark was inside a box, at the top
// of an essay that explained it twice, and the explanation had grown to ninety words
// saying what the three words above it already said.
//
// So the box is gone and most of the prose with it. What is left is the mark, larger than
// anything else on the page, one line saying what it means, one line saying what it is not,
// and the one limit that keeps it honest. Everything else this page used to say is still
// said — in the limits at the foot, kept as records, where it can be checked.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b border-[#141210]/15">
      <h2 id="the-mark" className="sr-only">
        The mark
      </h2>

      <div className="pt-2 pb-6 text-center">
        <p
          className="select-none text-record-mark"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(84px, 27vw, 236px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          x = x
        </p>

        <p
          className="mt-4 text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '20px', lineHeight: 1.25 }}
        >
          Equal human worth.
        </p>
        <p className="mx-auto mt-1 max-w-[26ch] font-mono text-[12.5px] leading-relaxed text-[#5a5246]">
          A decision, taken on purpose. Not a discovery, not a slogan.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 border border-[#141210]/40"
            style={{ background: 'rgb(var(--record-mark))' }}
          />
          <span className="font-mono text-[12.5px] text-[#5a5246]">
            #CC2D2A · the O Superman sleeve, 1982
          </span>
        </div>
      </div>

      <p className="mt-1 border-t border-[#141210]/20 pt-4">
        Equal worth is not equal size. A crisis of millions is still larger, and we count that
        honestly. What we refuse is the smaller one being treated as though it never happened.
      </p>
    </section>
  );
}