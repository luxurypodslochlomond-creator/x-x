import React from 'react';
import { Link } from 'react-router-dom';

// ── WHOSE WORDS ARE THESE ──────────────────────────────────────────────────────
// Brian, 24 November: "we need to make sure The Wire doesn't mess with Francis or Janine
// and their responsibilities to the world."
//
// He is right to ask, and the answer belongs on the page rather than in a conversation,
// because the risk is not that the record lies. The risk is that a reader sees a name on a
// record and assumes that person wrote it. Janine's brief is what this record was built to.
// Francis's drawings are Francis's. Neither of them signs a signal. The keeper who does has
// their name printed on the entry, and an entry with no name says so out loud instead of
// leaving the space looking filled.
//
// Kept to three short lines on purpose. A paragraph of reassurance is the thing nobody reads.

const PEOPLE = [
  {
    who: 'Janine Selendy',
    role: 'The brief',
    line: 'This record is built to her brief. The words on each signal are the record’s own, signed by whoever checked it — she is not asked to answer for them, and nothing here is put in her mouth.',
  },
  {
    who: 'Francis Umendu Odupute',
    role: 'The drawings',
    line: 'The drawings in the cartoon room are his and other cartoonists’ work. The record holds them, credits them and never speaks for them. A drawing is shown as it was given.',
    to: '/ClimateCartoons/Francis',
  },
  {
    who: 'The keeper who signed it',
    role: 'The signal',
    line: 'Every published signal carries the name of the person who signed it onto the record, beside its source. Where there is no name, the entry says it is unsigned.',
    to: '/ClimateMethod',
  },
];

export default function SignalsWhoAnswers() {
  return (
    <section className="mt-5 border-y-2 border-record-ink py-3" aria-label="Who signs what on the record">
      <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
        Whose words these are
      </h2>
      <dl className="mt-2 space-y-2">
        {PEOPLE.map((p) => (
          <div key={p.who} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2 border-l-2 border-record-ink/25 pl-2.5">
            <div>
              <dt className="text-[12.5px] font-bold leading-tight text-record-ink">{p.who}</dt>
              <dd className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-record-muted">{p.role}</dd>
            </div>
            <dd className="text-[12.5px] leading-snug text-record-ink/75">
              {p.line}
              {p.to && (
                <Link to={p.to} className="ml-1 whitespace-nowrap font-mono text-[10px] font-black uppercase tracking-wide text-record-red underline decoration-record-red/40 underline-offset-2">
                  see →
                </Link>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}