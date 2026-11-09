import React from 'react';
import { MarkBrief, MarkCorrection, MarkCheckers } from './RecordFootMarks';

// ── WHAT IS LOST, IN THREE MARKS ──────────────────────────────────────────────
// This argument used to be three paragraphs with a heading each, which is a memo.
// It is three marks now, each one drawn for exactly this, and one line under it.
//
// A page that has to explain why a record matters has already lost the argument to the
// explaining. A page that shows a folded sheet, an insertion mark and two pairs of eyes
// has made it, and said nothing.
const LOST = [
  { Mark: MarkBrief, line: 'A solution nobody wrote down has to be invented twice.' },
  { Mark: MarkCorrection, line: 'A crisis nobody recorded can be denied later.' },
  { Mark: MarkCheckers, line: 'A promise nobody can check is not a promise.' },
];

export default function XEqualsXLostMarks() {
  return (
    <section aria-label="Why this had to be written down" className="my-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
      {LOST.map(({ Mark, line }) => (
        <div key={line} className="flex items-start gap-3 border-t border-record-ink/25 pt-4 sm:block">
          <Mark size={30} className="shrink-0 text-record-ink sm:mb-3" />
          <p className="text-[15px] leading-[1.55] text-record-ink">{line}</p>
        </div>
      ))}
    </section>
  );
}