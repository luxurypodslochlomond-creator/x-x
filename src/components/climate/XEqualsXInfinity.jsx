import React from 'react';

// Infinity, said without any comfort in it.
//
// It is not a very large number. It is a direction: there is no largest number, because
// add one and there is another. That is arithmetic, and it cuts both ways — it means no
// score is the last word, and it also means no system of counting ever closes.
//
// The limit matters more than the grandeur: a count cannot hold a person, and the line
// that says so is the plainest one on the page. Every name on any scorecard was carried
// by someone who is not on the scorecard.

export default function XEqualsXInfinity() {
  return (
    <section aria-labelledby="infinity" className="py-8 border-b-2 border-[#141210]">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="infinity"
          className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#6b6258]"
        >
          Infinity
        </h2>
        <span aria-hidden="true" className="font-mono font-black text-[30px] leading-none text-record-mark">
          ∞
        </span>
      </div>

      <p className="mt-3 font-mono font-black text-[21px] leading-[1.15] tracking-[-0.02em] text-[#141210]">
        You never arrive.<br />You can always add one.
      </p>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Infinity is a direction, not a number. There is no largest number, because add one and
        there is another. That is the whole of it, and it holds on a phone and on a blackboard.
      </p>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        So nothing is finished. That is not comfort, it is arithmetic: every score can take
        another round, every record another entry, every person another day. Nobody is the last
        word — including whoever is winning.
      </p>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        And it cannot count a mother. Every name on every scorecard was carried by one person who
        is not on the scorecard. The count cannot see her. That is the edge of counting, not the
        edge of her.
      </p>

      <p className="mt-4 border-2 border-[#141210] border-l-8 border-l-record-mark bg-[#f7f1e5] px-4 py-3 font-mono text-[11.5px] font-black leading-relaxed text-[#141210]">
        It cuts the other way too. “There is always more time” is how a thing gets left undone.
        This page ends. One action now is worth more than another number later.
      </p>
    </section>
  );
}