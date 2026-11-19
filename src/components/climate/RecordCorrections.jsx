import React from 'react';
import CorrectionRow from '@/components/climate/CorrectionRow';
import useCorrections from '@/components/climate/useCorrections';
import '@/components/climate/corrections-sheet.css';

// ── THE ERRATA SHEET ────────────────────────────────────────────────────────────
// Brian, 19 November: the corrections read clunky, and not like a record of time.
//
// The first answer was cards, then ruled lines with a red edge — both still a stack of
// blocks with a title on top. What a printed register does instead is put every fact in
// a fixed column and hold that column down the whole page: a number, a date, the entry,
// the words. Nothing on the sheet is decoration; the alignment is the whole effect.
//
// So: one grid (corrections-sheet.css), column labels that sit on the same axis as the
// lines below them, a rule between lines and no rule anywhere else. The data is
// untouched — same corrections, same sources, same order, same words.
export default function RecordCorrections() {
  const corrections = useCorrections();
  const count = corrections?.length || 0;

  return (
    <section
      id="corrections"
      className="record-method-wide scroll-mt-36 border-t-4 border-record-red bg-record-bone px-4 pb-6 pt-4 lg:px-6 lg:pt-5"
      aria-labelledby="corrections-title"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#b3261e]">Errata</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#5a5246]">
          Kept in the open{count > 0 ? ` · ${count} ${count === 1 ? 'line' : 'lines'}` : ''}
        </p>
      </div>

      <h2 id="corrections-title" className="mt-3 font-display text-[26px] leading-[1.1] text-record-ink lg:text-[30px]">
        Corrections, in daylight
      </h2>
      <p className="mb-4 mt-2.5 max-w-2xl text-[14.5px] leading-[1.7] text-record-muted">
        Method is how an entry is checked. This is what changed afterwards: the correction in the signer's own
        words, the entry it belongs to, and the day it was made. The entry keeps its own correction note, so the
        sheet and the entry can always be held against each other.
      </p>

      {!corrections && (
        <p role="status" className="py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5246]">
          Reading the sheet…
        </p>
      )}

      {corrections?.length === 0 && (
        <p className="max-w-2xl text-[15px] leading-[1.7] text-record-ink">
          Nothing has needed correcting yet. That is not a claim of perfection — it means the first line on this
          sheet has not been written. When it is, it is printed here with the entry it belongs to and the day it
          was made.
        </p>
      )}

      {count > 0 && (
        <div className="corr-sheet border-t-2 border-record-ink/60">
          <div className="corr-row corr-head py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#5a5246]">
            <span>No.</span>
            <span>Date</span>
            <span>The correction, and the entry it belongs to</span>
          </div>
          <ol>
            {corrections.map((correction, i) => (
              <CorrectionRow key={correction.key} correction={correction} n={String(i + 1).padStart(2, '0')} />
            ))}
          </ol>
        </div>
      )}

      <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-record-muted">
        Any reader may check every line above against the entry it names. A correction that cannot be checked is
        not a correction.
      </p>
      <a
        href="#say"
        className="mt-3 inline-flex min-h-11 items-center border-b border-record-red text-sm font-bold text-record-red"
      >
        Report a mistake or ask for a removal →
      </a>
    </section>
  );
}