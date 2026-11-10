import React from 'react';
import { Link } from 'react-router-dom';
import { COVENANT } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <header aria-labelledby="the-principle" className="covenant-opening">
      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
      </h1>
      <h2>{COVENANT.title}</h2>
      <p className="covenant-purpose">Here to help each other and the planet, not take from either.</p>
      <Link className="covenant-open" to="/TogetherChangeClimate">Read the record <span aria-hidden="true">→</span></Link>
    </header>
  );
}