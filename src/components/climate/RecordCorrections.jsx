import React from 'react';
import CorrectionRow from '@/components/climate/CorrectionRow';
import useCorrections from '@/components/climate/useCorrections';

// ── THE ERRATA SHEET ────────────────────────────────────────────────────────────
// Brian, 19 November: "read corrections don't look old, not coolasfuck, like proper
// record of time — you sure pass a research panel at Yale, Bri?"
//
// He was right about the look, and the look was the point. A stack of rounded cards
// reads as a product update. What a panel, a funder or a sceptical reader is actually
// being shown here is an errata sheet: a numbered register of every change the record
// has made to itself, each line dated, each line naming the entry it belongs to, each
// line in the keeper's own words. So it is set the way a printed register is set —
// a red rule, letterspaced labels, hairlines between the lines, numbers down the left,
// and not one rounded corner on it.
//
// Nothing about the data changed: same corrections, same sources, same order. Only the
// sheet they are printed on.
export default function RecordCorrections() {
  const corrections = useCorrections();
  return (
    <section
      id="corrections"
      className="record-method-wide scroll-mt-36 border-t-4 border-record-red bg-record-bone px-4 pb-6 pt-4 lg:px-6 lg:pt-5"
      aria-labelledby="corrections-title"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-record-ink/25 pb-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#b3261e]">Errata</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5a5246]">
          Kept in the open · every change, dated
        </p>
      </div>

      <h2 id="corrections-title" className="mt-4 font-display text-[27px] leading-[1.1] text-record-ink lg:text-[31px]">
        Corrections, in daylight
      </h2>
      <p className="mb-4 mt-3 max-w-2xl text-[14.5px] leading-[1.7] text-record-muted">
        Method is how an entry is checked. This is what changed afterwards: the correction in the signer's own
        words, the entry it belongs to, and the day it was made. The entry keeps its own correction note, so the
        sheet and the entry can always be held against each other.
      </p>

      {!corrections && <p role="status" className="py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5246]">Reading the sheet…</p>}

      {corrections?.length === 0 && (
        <p className="max-w-2xl text-[15px] leading-[1.7] text-record-ink">
          Nothing has needed correcting yet. That is not a claim of perfection — it means the first line on this
          sheet has not been written. When it is, it is printed here with the entry it belongs to and the day it
          was made.
        </p>
      )}

      {corrections?.length > 0 && (
        <ol className="border-t border-record-ink/40">
          {corrections.map((correction, i) => (
            <CorrectionRow key={correction.key} correction={correction} n={String(i + 1).padStart(2, '0')} />
          ))}
        </ol>
      )}

      <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-record-muted">
        Any reader may check every line above against the entry it names. A correction that cannot be checked is
        not a correction.
      </p>
      <a href="#say" className="mt-3 inline-flex min-h-11 items-center border-b border-record-red text-sm font-bold text-record-red">
        Report a mistake or ask for a removal →
      </a>
    </section>
  );
}