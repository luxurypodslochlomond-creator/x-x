import React from 'react';
import { Link } from 'react-router-dom';

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
  //   • "Every published entry is fingerprinted." It is not. Of the 65 published
  //     entries on the record, 83 seals cover the solutions, the actions, the wire and
  //     the gatherings — and the 21 tracks have no seal at all. So the line names what
  //     is sealed, and says the music is not sealed yet.
  //
  //   • "Every change to the guest list needs two different keepers." It does not. The
  //     function carries one stated exception — an administrator, who can already reach
  //     that table directly — and it writes that the decision stood alone. Saying so is
  //     stronger than pretending otherwise, because the exception is visible in the
  //     audit trail either way.
  {
    title: 'The seals',
    body: 'Published solutions, actions, entries on the wire and gatherings are fingerprinted with SHA-256, each chained to the one before it. The record gives you the hash and your own browser recomputes it from the entry itself: change a word without resealing it and the check fails in public. The music is not sealed yet, and the seals page says so plainly.',
    to: '/ClimateSeals',
    cta: 'Check a seal',
  },
  {
    title: 'The keys',
    body: 'A keeper cannot add, pause, restore or remove anybody alone: a change to the guest list needs a second, different keeper, and both names are written into the audit trail with the date. The one exception is an administrator, who can already reach that table directly — and when they act alone, the audit line records that the decision stood alone.',
    to: '/ClimateHandover',
    cta: 'Who holds the keys',
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
    <section aria-labelledby="checkable" className="py-10 border-b border-[#141210]/15">
      <div
        id="checkable"
        role="heading"
        aria-level={2}
        className="text-[#141210]"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(21px, 4.6vw, 25px)', lineHeight: 1.2 }}
      >
        What you can check without trusting us
      </div>
      <p className="mt-2 max-w-[46ch] text-[#5a5246]">
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
    </section>
  );
}