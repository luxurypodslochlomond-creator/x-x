import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXLimits() {
  return (
    <section aria-labelledby="limits">
      <h2 id="limits">Still a work in progress.</h2>
      <p>This is a growing record, not the whole story of the planet. AI helps with screening and translation; it can get things wrong. A named source is somewhere to begin checking, not a guarantee.</p>
      <p>Some entries carry a digital seal. It lets you compare their words with a saved version, not prove they are true.</p>
      <div className="covenant-inline-links">
        <Link to="/ClimateSeals" className="covenant-text-link">Check a seal →</Link>
        <Link to="/ClimateRoll" className="covenant-text-link">Meet the people checking →</Link>
      </div>
    </section>
  );
}