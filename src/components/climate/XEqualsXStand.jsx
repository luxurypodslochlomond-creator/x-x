import React from 'react';

const CASE_SOURCE = 'https://www.selendygay.com/news/general/2026-06-25-meta-sued-over-surveillance-and-gag-order-silencing-whistleblower-sarah-wynn-williams';

export default function XEqualsXStand() {
  return (
    <section className="covenant-stand" aria-labelledby="not-raw-material">
      <p className="covenant-kicker">What we stand against</p>
      <h2 id="not-raw-material">Our attention is not<br />raw material.</h2>
      <p>An internet built to keep us scrolling is not built around the planet’s needs. A crisis is not content. A solution should not disappear down a feed.</p>
      <p><strong>Keep the evidence. Name the people. Make the work useful to the next person.</strong> That is what we’re building this record for.</p>
      <aside className="covenant-source-note" aria-label="A sourced example">
        <p>Power over speech is already being challenged: Sarah Wynn-Williams sued Meta over alleged efforts to silence her, represented by Selendy Gay and Katz Banks Kumin.</p>
        <a href={CASE_SOURCE} target="_blank" rel="noopener noreferrer">Case announcement · 25 June 2026 ↗<span className="sr-only"> (opens a new tab)</span></a>
        <p>Allegations, not a finding of wrongdoing. This record is independent of that case.</p>
      </aside>
    </section>
  );
}