import React from 'react';
import { Link } from 'react-router-dom';
import RecordBand from './RecordBand';

// ── THE MARK IS A SPECIFICATION ────────────────────────────────────────────────
// The founder's correction, and it was the right one: x = x is not only a sentence about
// people, it is the rule the machinery is built to hold. The page had been arguing its
// philosophy at a reader and leaving the engineering to a collapsed section at the foot —
// which is exactly backwards for the one institution most likely to ask "what stops you
// lying, and can I confirm it without you".
//
// So the three mechanisms come before the argument. Each one is real, each one is on this
// record today, and each one is stated with the limit that keeps it honest: the music is
// not sealed yet, and an administrator can reach the guest list alone.
const MECHANISMS = [
  {
    n: '01',
    title: 'The seal',
    plain:
      'Published solutions, actions, entries on the wire and gatherings are fingerprinted with SHA-256, each seal chained to the one before it.',
    held:
      'The hash is taken by the record and recomputed in your own browser from the entry itself. Change a word without resealing it and the check fails in public. The music is not sealed yet, and the seals page says so plainly.',
    to: '/ClimateSeals',
    cta: 'Check a seal',
  },
  {
    n: '02',
    title: 'The second key',
    plain:
      'Nobody gets onto the guest list alone. A change needs a second, different keeper, and both names are written into the log with the date.',
    held:
      'The one exception is an administrator, who can already reach that table directly — and when they act alone, the line records that the decision stood alone.',
    to: '/ClimateMethod',
    cta: 'Where the rule is written',
  },
  {
    n: '03',
    title: 'The log',
    plain:
      'Publishing an entry and holding one back are each a row in the log, with the name of the person who took the decision.',
    held:
      'Corrections stand beside the originals with the date they were made. Nothing on this record is quietly overwritten.',
    to: '/ClimateCorrections',
    cta: 'Corrections, in the open',
  },
];

export default function XEqualsXTechnology() {
  return (
    <RecordBand id="mechanisms" label="The technology" title="The mark is a specification">
      <p className="max-w-[48ch] text-record-ink">
        Equal worth is a decision, so it needs machinery that will not quietly break it. Three
        parts of this record do that work, and a reader can test all three from a phone.
      </p>

      <ol className="mt-7">
        {MECHANISMS.map(({ n, title, plain, held, to, cta }) => (
          <li key={n} className="grid grid-cols-[28px_1fr] gap-x-3 border-t border-record-ink/15 py-5">
            <span aria-hidden="true" className="font-mono text-[12px] leading-[1.7] text-record-mark">
              {n}
            </span>
            <div>
              <h3
                className="text-[20px] leading-[1.15] text-record-ink"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h3>
              <p className="mt-2 max-w-[50ch] text-record-ink">{plain}</p>
              <p className="mt-2 max-w-[50ch] border-l border-record-mark/55 pl-3 text-record-muted">
                {held}
              </p>
              <Link
                to={to}
                className="mt-3 inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.14em] text-record-red underline decoration-record-mark/50 underline-offset-4 transition-colors hover:text-record-ink"
              >
                {cta} →
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </RecordBand>
  );
}