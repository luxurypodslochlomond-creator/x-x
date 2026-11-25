import React from 'react';
import { Link } from 'react-router-dom';
import RecordBand from './RecordBand';

// ── WHAT CAN BE CHECKED WITHOUT TRUSTING US ───────────────────────────────────
// The page has said a promise is worth nothing unless it can be checked. This is where it
// names the three things that make it checkable, and points at the page where a reader does
// the checking themselves. Deliberately short: a pointer, not a manual.
//
// This is also the answer to the question a technical reader arrives with. Not "are you
// honest", but "what stops you lying, and can I confirm it without you". Three mechanisms,
// all three verifiable from the outside.

const PROOF = [
  // ── THESE TWO PARAGRAPHS WERE CHECKED AGAINST THE CODE, AND CORRECTED ─────────
  // Both were overclaiming, and both would have been caught by anyone who read the
  // seals page or the guest list after reading this one. The covenant cannot survive
  // being caught in a sentence like that, so the sentences now say what the code does:
  //
  //   • "Every published entry is fingerprinted." It is not. Of the 44 published
  //     entries on the record (counted 25 November), 93 seals cover the solutions, the
  //     actions, the wire and the groups — and the music has no seal at all. So the line
  //     names what is sealed, and says the music is not sealed yet.
  //
  //   • "Every change to the guest list needs two different keepers." It does not, and
  //     there are two honest exceptions rather than one: a WITNESS (a pair of eyes, not a
  //     set of keys) moves on a single custodian's word, and only the keys themselves need
  //     two — plus an administrator, who can already reach that table directly. All three
  //     are written into the audit line. Saying so is stronger than pretending otherwise.
  {
    title: 'The seals',
    body: 'Published solutions, actions, entries on the wire and groups are fingerprinted with SHA-256, each chained to the one before it. The record gives you the hash and your own browser recomputes it from the entry itself: change a word without resealing it and the check fails in public. The music is not sealed yet, and the seals page says so plainly.',
    to: '/ClimateSeals',
    cta: 'Check a seal',
  },
  {
    title: 'The keys',
    body: 'Handing over the keys takes two: one custodian asks, a different custodian agrees, and both names go into the audit trail with the date. A witness — a pair of eyes, not a set of keys — joins or leaves on one custodian\u2019s word, and the line records whose word it was. An administrator can already reach that table directly; when they act alone, the record says so.',
    to: '/ClimateMethod',
    cta: 'Where the rule is written',
  },
  {
    title: 'The record of decisions',
    body: 'Publishing an entry and holding one back are each a row in the log, with the name of the person who decided it. Corrections stand beside the originals, with the date they were made.',
    to: '/ClimateCorrections',
    cta: 'Corrections, in the open',
  },
];

export default function XEqualsXCheck() {
  return (
    <RecordBand id="checkable" label="Checkable" title="What you can check without trusting us">
      <p className="max-w-[46ch] text-record-muted">
        Three things on this record can be verified by a reader rather than taken on our word.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {PROOF.map(({ title, body, to, cta }) => (
          <div key={title} className="border-t border-[#141210]/20 pt-3.5">
            <p
              className="text-[#141210]"
              style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', lineHeight: 1.25 }}
            >
              {title}
            </p>
            <p className="mt-2 text-[#141210]/85">{body}</p>
            <Link
              to={to}
              className="mt-3 inline-block font-mono text-[12px] text-[#b3261e] underline decoration-[#e2602a] underline-offset-2 hover:text-[#e2602a] transition-colors"
            >
              {cta}
            </Link>
          </div>
        ))}
      </div>
    </RecordBand>
  );
}