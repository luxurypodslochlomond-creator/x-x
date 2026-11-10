import React from 'react';

import { COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';

// The three things the record can actually be held to. The copy is unchanged because it
// was already the strongest on the page; what changed is the setting — a heavy rule to
// open, one number per commitment set large in the borrowed red, and one edge for all
// three titles and all three sentences, so the block reads as a plate rather than a list
// of items with gaps between them.
export default function XEqualsXWhatItAsks() {
  return (
    <section id="terms" aria-labelledby="covenant-in-practice">
      <p className="covenant-label">What it asks</p>
      <h2 id="covenant-in-practice">Three commitments.</h2>
      <dl className="covenant-terms">
        {COVENANT_TERMS.map(({ number, title, plain }) => (
          <div key={number} className="covenant-term" data-number={number}>
            <dt>{title}</dt>
            <dd>{plain}</dd>
          </div>
        ))}
      </dl>
      <p className="covenant-caption text-record-muted mt-3">
        Standards to hold this record to. Not a claim of perfection.
      </p>
    </section>
  );
}