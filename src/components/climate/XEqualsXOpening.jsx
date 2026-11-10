import React from 'react';
import { COVENANT } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <header aria-labelledby="the-principle" className="covenant-opening">
      <p className="covenant-label">Our principle · our covenant</p>
      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
      </h1>
      <h2>{COVENANT.title}</h2>
      <p className="covenant-purpose">Here to help each other and the planet, not take from either.</p>
      <p className="covenant-caption covenant-evidence-standard">{COVENANT.distinction} {COVENANT.meaning}</p>
    </header>
  );
}