import React from 'react';

// ── WHAT KEEPING IT ALIVE COSTS ───────────────────────────────────────────────
// The number a host asks for on day one, and the one this record kept saying was
// "being worked out". It is published here instead, as the keeper's own model
// rather than a vendor quote, because a figure nobody can check is worth nothing.
//
// The rule behind it: reading is cheap. What is expensive is what the record
// keeps — a copy of every cited source, every picture, every master, and every
// tongue already translated. Cost follows storage, not popularity.
//
// Nothing here buys a place on the record. A gift keeps it alive; it never moves
// an entry, and the ladder is published so anyone can see that no amount of money
// turns a small record into a big one.

const RUNGS = [
  { reads: '10,000', cost: '£1,000', what: 'Today. One keeper, one plan, the pictures and tracks already here.' },
  { reads: '100,000', cost: '£3,000', what: 'Every kept copy grows. A tongue is translated once and then served, so readers cost almost nothing.' },
  { reads: '1 million', cost: '£12,000', what: 'Pictures and music are the weight now, and a second person is needed on the record.' },
  { reads: '10 million', cost: '£60,000', what: 'Serving the record stays cheap. Serving every copy and every tongue quickly does not.' },
  { reads: '100 million', cost: '£300,000', what: 'Real hosting contracts, real staff, and a reserve kept for moving the record if it has to move.' },
  { reads: '1 billion', cost: '£2,500,000', what: 'No longer one keeper’s work. This is the rung where it has to belong to an institution or a library.' },
];

export default function CostLadder() {
  return (
    <section className="my-8 lg:my-10 border-2 border-[#141210]">
      <div className="bg-[#141210] px-3 lg:px-4 py-2.5">
        <p className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#efe7d6]">
          What keeping it alive costs
        </p>
      </div>

      <div className="bg-[#f7f1e5] px-3 lg:px-4 py-4 lg:py-5">
        <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
          A year, at today&rsquo;s size: <strong>£1,000</strong>. That is the keeper&rsquo;s own figure, not a
          vendor&rsquo;s quote, and it is the number to put in a letter.
        </p>
        <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] mt-2">
          Reading is cheap. What is expensive is what the record keeps: a copy of every cited source, every
          picture, every master given to the music room, and every tongue already translated. So cost
          follows storage, not popularity.
        </p>

        <div className="mt-4 border border-[#141210]/25">
          {RUNGS.map((r, i) => (
            <div
              key={r.reads}
              className={`px-3 py-2.5 grid grid-cols-[auto,auto,1fr] gap-x-3 gap-y-1 items-baseline ${i > 0 ? 'border-t border-[#141210]/15' : ''}`}
            >
              <span className="text-[10px] font-black font-mono uppercase tracking-wide text-[#5a5246] tabular-nums">
                {r.reads}
              </span>
              <span className="text-[11.5px] lg:text-[12.5px] font-black font-mono text-[#141210] tabular-nums">
                {r.cost}
              </span>
              <span className="text-[10.5px] lg:text-[11.5px] font-mono text-[#5a5246] leading-snug">
                {r.what}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-black font-mono uppercase tracking-[0.1em] text-[#5a5246] mt-2">
          Reads a year · annual cost · what changes
        </p>

        <div className="mt-4 pt-3 border-t-2 border-[#141210]/20">
          <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
            <strong>Ten years, at today&rsquo;s size: £10,000.</strong> That is the honest figure for keeping
            the record alive for a decade without it growing — and it is what a funder is actually being
            asked for, rather than an open-ended promise.
          </p>
          <p className="text-[10.5px] lg:text-[11.5px] font-mono leading-relaxed text-[#5a5246] mt-2">
            If the record grows, the rung moves and the real figure is published here each year, with what
            was actually spent. A cost that is stated once and never checked is a claim, not a number.
          </p>
        </div>

        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-4 text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210]">
          A gift keeps the record alive. It never buys a place on it: no entry is ranked, moved, or shown
          first for money, and nothing is advertised. That is why the ladder is published — so a reader can
          see for themselves that paying in changes nothing but the record&rsquo;s ability to keep going.
        </p>
      </div>
    </section>
  );
}