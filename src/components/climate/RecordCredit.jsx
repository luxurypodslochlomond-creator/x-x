import React from 'react';
import { Link } from 'react-router-dom';

// ── THREE JOBS, THREE WORDS, ONE PLATE ────────────────────────────────────────
// The first version of this plate read "Platform built by" and then three names under
// it. It was wrong, and Brian could feel it was wrong before he could say why: running
// "built" across all three folded three different jobs into one verb, which is the exact
// thing this record exists not to do. The creating is Gillian Barbara Brown's, the
// building is Brian Hughes's, and the making was done with BRO51. Blur them and the credit
// is a slogan; keep them apart and it is a record of hands.
//
// So the roles lead now and the names follow them, set as a printer's colophon rather than
// a list of equals: a red hairline, the word that says what the block is, then each job in
// the machine's own tracked mono over the name in the record's reading voice. A tool is
// named as a tool and says what it was, because a credit is the one place where pretending
// would be the whole failure.
//
// It lives in one file and opens on the page that already tells the story. Four copies of
// a credit is how three of them came to be wrong.
const HANDS = [
  { role: 'Created by', name: 'Gillian Barbara Brown' },
  { role: 'Built by', name: 'Brian Hughes' },
  { role: 'Made with', name: 'BRO51', note: 'the AI this record was built alongside' },
];

export default function RecordCredit({ className = '', stacked = false }) {
  return (
    <div className={`mx-auto w-full max-w-xl px-5 ${className}`}>
      {/* The sheet has ended; what follows is the imprint. One red hairline says so. */}
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-record-red/45" />
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-record-red">
          Colophon
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-record-red/45" />
      </div>

      <dl className={`mt-5 grid gap-4 text-center ${stacked ? 'grid-cols-1' : 'sm:grid-cols-3 sm:gap-5'}`}>
        {HANDS.map((hand) => (
          <div key={hand.name}>
            <dt className="font-mono text-[9px] uppercase tracking-[0.26em] text-record-muted">
              {hand.role}
            </dt>
            <dd
              className={`mt-1.5 leading-[1.06] tracking-[-0.012em] text-record-ink ${
                stacked ? 'text-[18px]' : 'text-[19px] lg:text-[21px]'
              }`}
              style={{ fontFamily: 'var(--record-display)' }}
            >
              {hand.name}
            </dd>
            {hand.note && (
              <dd className="mt-1.5 text-[10.5px] leading-snug text-record-muted">{hand.note}</dd>
            )}
          </div>
        ))}
      </dl>

      {/* The only address the record prints for itself. */}
      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
        <Link
          to="/Welcome"
          className="underline decoration-dotted underline-offset-2 transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red"
        >
          UF51 CIC
        </Link>
        {' '}· Scotland
      </p>
    </div>
  );
}