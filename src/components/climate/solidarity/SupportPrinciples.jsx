import React from 'react';
import { Link } from 'react-router-dom';

export default function SupportPrinciples() {
  return <section className="my-12 border-t-2 border-record-ink pt-6" id="ledger-rule" aria-labelledby="ledger-rule-title">
    <span id="ledger-promise" /><p className="stand-kicker">The terms remain visible</p><h2 className="stand-section-title mt-2" id="ledger-rule-title">Support is not ownership.</h2>
    <div className="mt-5 grid gap-6 md:grid-cols-2 text-base leading-relaxed">
      <p><strong className="block mb-1">The artist keeps their rights.</strong>A contribution gives this record no right to sell someone’s work. A new commission needs its own agreement with the artist. A gift buys no editorial influence, ranking or reader data.</p>
      <p><strong className="block mb-1">The published gift rule.</strong>Unearmarked gifts are split equally between the artists who contributed drawings in the preceding twelve months. A share that cannot be paid remains marked owed. Processor fees are printed; the record takes no commission.</p>
    </div>
    <p className="mt-5 text-sm leading-relaxed text-record-muted">This is the rule published by the record, not an automated distribution service. Funding the platform’s costs is a separate purpose and must be named as such. Sending an offer does not move money.</p>
    <nav className="stand-links" aria-label="Check the principles"><Link to="/ClimateCartoons/WhatThisIs">Your work and your rights</Link><Link to="/ExtractionProofCovenant">The covenant</Link><a href="#ledger-lines">Read the payments</a></nav>
  </section>;
}