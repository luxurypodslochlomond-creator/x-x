import React from 'react';

const TERMS = [
  {
    title: 'The source stays with the work.',
    plain: 'Name who did it and where the claim comes from. A familiar name is not a substitute for evidence.',
  },
  {
    title: 'Corrections stay visible.',
    plain: 'Say what changed and when. If something is uncertain, say that too.',
  },
  {
    title: 'Money does not buy authority.',
    plain: 'No paid placement. No funder’s name on the door. The same source standard applies to everyone.',
  },
];

export default function XEqualsXWhatItAsks() {
  return (
    <section id="terms" aria-labelledby="covenant-in-practice">
      <h2 id="covenant-in-practice" className="font-display text-[27px] text-record-ink">What that changes here</h2>
      <dl className="mt-6 space-y-6">
        {TERMS.map(({ title, plain }) => (
          <div key={title}>
            <dt className="text-[16px] font-semibold leading-relaxed text-record-ink">{title}</dt>
            <dd className="mt-1 text-[16px] leading-relaxed text-record-ink">{plain}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-record-muted">
        These are commitments to be held to, not proof that we always meet them.
      </p>
    </section>
  );
}