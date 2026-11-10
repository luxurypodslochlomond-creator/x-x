import React from 'react';

// ── THE OPENING IS THE PAGE ────────────────────────────────────────────────────
// The shell used to print the eyebrow, the title and the statement, and then the page
// printed the mark underneath them — so the first screen said the same thing twice and
// arrived as three centred blocks stacked in the middle of a column. That is what "out of
// balance" looked like: no weight anywhere, nothing leading.
//
// It is one sheet now. Small label, the mark at the size a mark deserves, her red hairline
// drawn as the reader arrives, the line, then one paragraph that says what x = x actually
// is — a decision, and then machinery built to hold it. The three promises at the foot are
// the technology, said before any mechanism is explained.
const PROMISES = [
  'Every entry with its source',
  'Every correction in the open',
  'No funder’s name on the door',
];

export default function XEqualsXOpening() {
  return (
    <section
      aria-labelledby="the-terms"
      className="relative -mx-4 border-b border-record-ink/25 px-4 pb-8 pt-5 lg:-mx-10 lg:px-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-record-muted">
        The terms of this record
      </p>

      <h1
        id="the-terms"
        className="mt-4 max-w-[18ch] text-[34px] leading-[1.02] text-record-ink lg:text-[44px]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Nobody above anybody.
      </h1>

      {/* The mark, after the sentence rather than above it. At 172px it was the loudest
          thing on the platform and it was the page's own title said back to the person who
          had just tapped it, with the meaning pushed off the first screen. A mark should
          sit where it can be read, not where it can shout: three characters at the size a
          mark takes, breathing at nine seconds so a reader notices it has moved rather than
          watches it move. */}
      <div
        role="img"
        aria-label="x equals x"
        className="x-equals-x-light mt-3 select-none text-record-mark"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 16vw, 88px)',
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
        }}
      >
        x&nbsp;=&nbsp;x
      </div>

      <div aria-hidden="true" className="x-open-rule mt-4 h-[2px] w-full bg-record-mark" />

      <p className="mt-4 max-w-[46ch] text-record-ink">
        Nothing above the line and nothing hidden below it. Nobody takes more than they give,
        and the record is bound by the same rule it asks of everyone else. Every part of it
        below can be checked by a stranger, without asking us.
      </p>

      <ul className="mt-7 space-y-2 border-t border-record-ink/15 pt-4">
        {PROMISES.map((line, i) => (
          <li
            key={line}
            className="flex items-baseline gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-record-ink"
          >
            <span aria-hidden="true" className="text-record-mark">
              {String(i + 1).padStart(2, '0')}
            </span>
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}