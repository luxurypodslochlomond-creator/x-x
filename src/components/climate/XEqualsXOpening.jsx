import React from 'react';
import { COVENANT } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <header aria-labelledby="the-principle" className="covenant-opening">
      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
      </h1>
      <h2>{COVENANT.title}<br />{COVENANT.distinction}</h2>
    </header>
  );
}