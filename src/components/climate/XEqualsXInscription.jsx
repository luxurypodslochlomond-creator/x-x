import React from 'react';

// The mark — printed, not projected.
//
// Cobalt belongs to x = x and to nothing else on the record: the record's own signal is
// orange, and the mark is the line it rests on. But it is ink ON PAPER, not a blue field.
// A solid cobalt slab was the one thing on the record that looked like a different website,
// and a mark has to be printed in the reader's own language or it reads as an advert.
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
            className="select-none font-black leading-[0.82] text-[#b3261e]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(62px, 17vw, 96px)', letterSpacing: '-0.045em' }}
          >
            x = x
          </p>

          <div className="mx-auto mt-6 h-[2px] w-14 bg-[#e2602a]" />

          <p className="mt-5 text-[12.5px] font-black font-mono uppercase tracking-[0.1em] text-[#141210]">
            Equal human worth.
          </p>
          <p className="mx-auto mt-2 max-w-[26ch] text-[11px] font-mono leading-relaxed text-[#5a5246]">
            A decision, taken on purpose. Not a discovery, and not a slogan.
          </p>
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