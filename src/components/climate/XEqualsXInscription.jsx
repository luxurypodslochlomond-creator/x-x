import React from 'react';

// The mark — printed, not projected.
//
// The mark has its own red and to nothing else on the record: the record's own signal is
// orange, its warnings are --record-red, and the mark is the line it rests on. It is the red
// of Laurie Anderson's O Superman sleeve, measured off the artwork (#CC2D2A) — not chosen by
// taste, and not the cobalt it wore for a while, which read as a different website's colour.
// It is ink ON PAPER either way: a mark has to be printed in the reader's own language or it
// reads as an advert.
// A plate: one colour, one rule, one signal. No engraving, no stone, no poem.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-7 border-b-2 border-[#141210]">
      <div className="border-2 border-[#141210] bg-[#f7f1e5] shadow-[5px_5px_0_0_rgba(20,18,16,0.14)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#141210]/20 px-3.5 py-2">
          <h2
            id="the-mark"
            className="text-[8.5px] font-black font-mono uppercase tracking-[0.28em] text-[#5a5246]"
          >
            The mark
          </h2>
          <span className="text-[8.5px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
            The covenant
          </span>
        </div>

        <div className="px-4 py-9 text-center">
          <p
            className="select-none font-black leading-[0.82] text-record-mark"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(62px, 17vw, 96px)', letterSpacing: '-0.045em' }}
          >
            x = x
          </p>

          <div className="mx-auto mt-6 h-[2px] w-14 bg-record-mark" />

          <p className="mt-5 text-[12.5px] font-black font-mono uppercase tracking-[0.1em] text-[#141210]">
            Equal human worth.
          </p>
          <p className="mx-auto mt-2 max-w-[26ch] text-[11px] font-mono leading-relaxed text-[#5a5246]">
            A decision, taken on purpose. Not a discovery, and not a slogan.
          </p>

          {/* ── WHERE THE RED COMES FROM ────────────────────────────────────────────
              The finest detail on this page is the ink, so it is named rather than
              assumed. The mark is printed in the red of Laurie Anderson's sleeve for
              O Superman — the single at the heart of Big Science — measured off the
              artwork: the mean of the reds that carry that sleeve, #CC2D2A. The album's
              own cover is monochrome, which is why this says the sleeve and not the
              cover: a borrowed colour is only worth borrowing if the borrowing is
              stated. Anyone can sample the sleeve and check this number. */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="h-3 w-3 border border-[#141210]"
              style={{ background: 'rgb(var(--record-mark))' }}
            />
            <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.14em] text-[#5a5246]">
              #CC2D2A · the red of the O Superman sleeve, 1982
            </span>
          </div>
        </div>

        <div className="border-t border-[#141210]/20 px-3.5 py-2">
          <p className="text-[8.5px] font-mono uppercase tracking-[0.16em] text-[#5a5246]">
            Applies to every entry · every person · every page
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 font-mono text-[12.5px] leading-relaxed text-[#141210]">
        <p>
          On this record, x = x means one thing: every person at the far end of an entry is
          worth the same as the person reading it. Nobody’s emergency is smaller because nobody
          is filming it.
        </p>
        <p>
          Nothing in the world obliges anyone to hold that. We hold it because the alternative
          is a record where the loudest emergency wins — and that record is no use to the people
          who need it.
        </p>
      </div>

      <p className="mt-4 bg-[#f7f1e5] border-2 border-[#141210] border-l-8 border-l-[#e2602a] px-4 py-3 font-mono text-[12px] font-black leading-relaxed text-[#141210]">
        Equal worth is not equal size. A crisis affecting millions is still a larger crisis, and
        we count that honestly. What we refuse is the smaller one being treated as though it
        never happened.
      </p>
    </section>
  );
}