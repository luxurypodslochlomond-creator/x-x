import React from 'react';

// ── THE MARK ───────────────────────────────────────────────────────────────────
// This plate used to be a framed box with a two-pixel black border, a hard offset shadow,
// two all-caps labels in track-spaced capitals at each end, and one more all-caps line at
// the foot. Every one of those was a shout, and four shouts around one sentence is not a
// covenant, it is a poster.
//
// So the plate is quiet now, and only three things carry weight: the mark itself, the line
// that says what it means, and the red. Nothing is framed twice, nothing is capitalised at
// the reader, and the one accent — the measured red — appears in exactly two places: the
// mark and the swatch that names where it came from.
//
// The mark is set in the record's own cut at regular weight rather than black. It is cut,
// not bellowed, and at that weight it still holds the centre of the page.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-9 border-b border-[#141210]/15">
      <h2 id="the-mark" className="sr-only">
        The mark
      </h2>

      <div className="border border-[#141210]/20 bg-[#f7f1e5] px-5 py-10 text-center">
        <p
          className="select-none text-record-mark"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(52px, 14vw, 78px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          x = x
        </p>

        <div className="mx-auto mt-6 h-[2px] w-9 bg-record-mark" />

        <div
          className="mt-5 text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '19px', lineHeight: 1.3 }}
        >
          Equal human worth.
        </div>
        <p className="mx-auto mt-1.5 max-w-[30ch] font-mono text-[13px] leading-relaxed text-[#5a5246]">
          A decision, taken on purpose. Not a discovery, and not a slogan.
        </p>

        {/* Where the red comes from. Kept because a borrowed colour is only worth
            borrowing if the borrowing is stated — and stated quietly, at the size a
            footnote is read at, not as a badge. */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 border border-[#141210]/40"
            style={{ background: 'rgb(var(--record-mark))' }}
          />
          <span className="font-mono text-[12.5px] leading-relaxed text-[#5a5246]">
            #CC2D2A, the red of the O Superman sleeve, 1982
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <p>
          On this record the mark means one thing: every person at the far end of an entry is
          worth the same as the person reading it. Nobody’s emergency is smaller because nobody
          is filming it.
        </p>
        <p>
          Nothing in the world obliges anyone to hold that. We hold it because the alternative
          is a record where the loudest emergency wins, and that record is no use to the people
          who need it.
        </p>
      </div>

      {/* The one limit that keeps the sentence honest, said once, in the same voice as
          everything else on the page. It was a boxed block in black with a thick orange
          bar down one side; the bar was doing the arguing, not the words. */}
      <p className="mt-6 border-t border-[#141210]/20 pt-4">
        Equal worth is not equal size. A crisis affecting millions is still a larger crisis,
        and we count that honestly. What we refuse is the smaller one being treated as though
        it never happened.
      </p>
    </section>
  );
}