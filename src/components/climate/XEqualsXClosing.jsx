import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXClosing() {
  return (
    <section className="covenant-future" aria-labelledby="who-comes-after">
      <div className="covenant-future-inner">
        <p className="covenant-kicker">Why it matters</p>
        <h2 id="who-comes-after">For the people<br />who come after us.</h2>
        <p>They deserve more than a history of what we scrolled past. They deserve the evidence, the warnings, and the work people did to change things.</p>
        <p className="covenant-future-strong"><strong>A platform cannot do that work for us. It can help us do it together.</strong></p>
        <p className="covenant-future-origin">
          The record began with Janine Selendy’s lifetime of work on climate solutions. It is not a monument to it: it is built so the work outlives any one person.
          <Link to="/ClimateFounder"> Her page →</Link>
        </p>
        <div className="covenant-inline-links">
          <Link to="/ClimateMethod">How the record works →</Link>
          <Link to="/ClimateSeals">Check a seal →</Link>
        </div>
      </div>
      <div className="covenant-small-print">
        <p>AI assists screening and translation; it can be wrong. A seal checks a saved version, not whether a claim is true. This is not a confidential whistleblowing service.</p>
        <nav className="covenant-inline-links" aria-label="Accountability and origins">
          <Link to="/ClimatePrivacy">What we keep</Link>
          <Link to="/ExtractionProofCovenant">Our commitments</Link>
          <Link to="/ClimateRoll">The people checking</Link>
          <a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noopener noreferrer">Public code ↗<span className="sr-only"> (opens a new tab)</span></a>
        </nav>
        <p>Our own words: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 ↗</a>. Code: <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer">AGPL-3.0 ↗</a>. Other people’s work keeps its own rights and credits.</p>
      </div>
    </section>
  );
}