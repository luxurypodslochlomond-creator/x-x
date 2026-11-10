import React from 'react';

import { COVENANT, COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';
export default function XEqualsXWhatItAsks() {
  return (
    <section id="terms" aria-labelledby="covenant-in-practice">
      <h2 id="covenant-in-practice" className="covenant-section-heading">Our covenant in practice.</h2>
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