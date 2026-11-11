import React, { useState } from 'react';
import PageBand from './PageBand';
import { MONTHS, CURRENT_MONTH } from './monthsHere';

const READING = { fontFamily: 'var(--font-record-reading)' };

/* ── THE YEAR, MONTH BY MONTH ─────────────────────────────────────────────────
   The masthead shows the month you are standing in. This is the whole year, and you
   can walk it: pick October in June and find out whether it is worth coming then.
   The month you are in is marked with a red dot, so the calendar and the hill are
   always telling you the same thing. */
export default function TheYear() {
  const current = CURRENT_MONTH();
  const [chosen, setChosen] = useState(current);
  const month = MONTHS[chosen];

  return (
    <div id="year" className="mx-auto w-full max-w-[44rem] scroll-mt-20 px-6 pb-10">
      <PageBand label="The year here" title="Twelve months on this hill">
        <p
          className="mx-auto max-w-[42ch] text-center text-[15.5px] leading-[1.65] text-record-ink/85"
          style={READING}
        >
          What a normal month looks like up here, from the people who live on it. Pick a
          month and read what it does.
        </p>

        <div
          role="group"
          aria-label="Choose a month"
          className="mx-auto mt-5 grid max-w-[26rem] grid-cols-6 gap-1.5"
        >
          {MONTHS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setChosen(i)}
              aria-pressed={chosen === i}
              className={`relative border py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                chosen === i
                  ? 'border-record-ink bg-record-ink text-record-paper'
                  : 'border-record-ink/30 text-record-ink/85 hover:border-record-ink/60 hover:text-record-ink'
              }`}
            >
              {m.short}
              {i === current && (
                <span
                  aria-hidden="true"
                  className={`absolute right-[3px] top-[3px] block h-[3px] w-[3px] rounded-full ${
                    chosen === i ? 'bg-record-paper' : 'bg-record-mark'
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-[42ch] space-y-4 border-t border-record-ink/20 pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
              {month.name} &middot; on the hill
            </p>
            <p className="mt-1 text-[16px] leading-[1.65]" style={READING}>
              {month.see}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink/75">
              Underfoot
            </p>
            <p className="mt-1 text-[16px] leading-[1.65]" style={READING}>
              {month.under}
            </p>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[40ch] text-center font-mono text-[10px] uppercase leading-[1.9] tracking-[0.14em] text-record-ink/70">
          A normal month, not a promise. The hill does not read the calendar, a warm week
          moves everything by a fortnight, and a lot of this is one animal on a good
          morning. You can walk the whole hill and see none of it.
        </p>
      </PageBand>
    </div>
  );
}