import React from 'react';

// The mark, in its own colour, and nothing else.
//
// Cobalt belongs to x = x and to nothing else on the record: the record's own signal is
// orange, and the mark is the line the record rests on. A letterform and two hairlines.
// No engraving, no stone, no poem — a thing that has to look ancient is asking to be
// believed, which is the opposite of what this page is for.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b-2 border-[#141210]">
      <div className="relative bg-record-mark overflow-hidden -mx-4 px-5 py-14">
        <div className="absolute inset-x-0 top-0 h-px bg-[#efe7d6]/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#efe7d6]/25" />

        <div className="relative flex flex-col items-center text-center">
          <h2
            id="the-mark"
            className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#efe7d6]/70"
          >
            The mark
          </h2>

          <p className="mt-6 select-none font-mono font-black text-[78px] leading-[0.8] tracking-[-0.06em] text-[#efe7d6]">
            x = x
          </p>

          <p className="mt-7 max-w-[27ch] font-mono text-[11.5px] leading-relaxed text-[#efe7d6]/85">
            Equal human worth. A decision, taken on purpose — not a discovery, and not a slogan.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3 font-mono text-[12.5px] leading-relaxed text-[#141210]">
        <p>
          On this record, x = x means one thing: every person on the far end of an entry is
          worth the same as the person reading it. Nobody’s emergency is smaller because fewer
          people are watching.
        </p>
        <p>
          Nothing in the world obliges anyone to hold that. We hold it because the alternative
          is a record where the loudest emergency wins — and that record is no use to the
          people who need it.
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