import React from 'react';
import { MONTHS, CURRENT_MONTH } from './monthsHere';

/* ── WHAT YOU MIGHT SEE THIS MONTH ─────────────────────────────────────────────
   One line at the masthead, for the month the reader is actually in. It changes by
   itself as the calendar turns — nobody has to edit the page in February — and it
   points down to the full year for anybody who wants to know what October looks like
   before they book October. */
export default function ThisMonth() {
  const month = MONTHS[CURRENT_MONTH()] || MONTHS[0];

  return (
    <div className="mt-4 border-t border-record-ink/20 pt-3">
      <p className="text-center font-mono text-[10.5px] uppercase leading-[1.8] tracking-[0.13em] text-record-ink/75">
        <span className="text-record-red">{month.name}</span>
        <span className="px-1.5 text-record-ink/25">/</span>
        what you might see
      </p>
      <p
        className="mx-auto mt-1 max-w-[40ch] text-center text-[14.5px] leading-[1.62] text-record-ink"
        style={{ fontFamily: 'var(--font-record-reading)' }}
      >
        {month.see}
      </p>
      <p className="mt-2 text-center">
        <a
          href="#year"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-ink/75 underline decoration-record-ink/25 underline-offset-4 hover:text-record-ink"
        >
          the whole year &darr;
        </a>
      </p>
    </div>
  );
}