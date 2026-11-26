import React from 'react';

import { COVENANT, COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';
export default function XEqualsXWhatItAsks() {
  return (
    <section id="terms" aria-labelledby="covenant-in-practice">
      {/* ── THE HEADING STOPPED ECHOING THE ONE ABOVE IT ───────────────────────────
          This card sits directly under the band headed "What this record promises you",
          and it was headed "What the record owes the work." — two titles asking the same
          question one screen apart, which is the duplication Brian felt on 26 November
          without being able to point at it. The card is not a second promise: it is the
          mechanism underneath the first one, so it is now named for what it does. */}
      <h2 id="covenant-in-practice" className="covenant-section-heading">How every claim is held.</h2>
      <p className="covenant-evidence-standard"><strong>Equal human worth.</strong> {COVENANT.distinction} {COVENANT.meaning}</p>
      <dl className="covenant-terms">
        {COVENANT_TERMS.map(({ number, title, plain }) => (
          <div key={number} className="covenant-term" data-number={number}>
            <dt>{title}</dt>
            <dd>{plain}</dd>
          </div>
        ))}
      </dl>
      <p className="covenant-caption covenant-standard">{COVENANT.limit}</p>
    </section>
  );
}