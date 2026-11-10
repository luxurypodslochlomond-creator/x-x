import React from 'react';
import { COVENANT } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <section aria-labelledby="the-principle" className="covenant-signal">
      <div className="covenant-signal-top covenant-kicker">
        <span>The principle</span>
        <span>Record of the Time</span>
      </div>
      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span>
        <span aria-hidden="true">=</span>
        <span aria-hidden="true">x</span>
      </h1>
      <h2>{COVENANT.title}<br />{COVENANT.distinction}</h2>
      <p className="covenant-signal-copy">{COVENANT.meaning}</p>
      <p className="covenant-caption covenant-limit">{COVENANT.limit}</p>
      <p className="covenant-caption covenant-dedication">{COVENANT.dedication}</p>
    </section>
  );
}