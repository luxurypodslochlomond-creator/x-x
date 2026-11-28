import React from 'react';

// A short ledger: a heading, one line of context, then the figures with their source
// attached. Used for the harm that is usually left out of a climate page — poverty in
// rich countries, and violence against women — so the page stays a record, not an essay.
export default function FounderCompactLedger({ kicker, title, intro, rows, tone = 'paper' }) {
  return (
    <section className={`record-founder-ledger record-founder-ledger-${tone}`} aria-labelledby={`ledger-${kicker.replace(/\W+/g, '-')}`}>
      <p className="record-founder-kicker">{kicker}</p>
      <h3 id={`ledger-${kicker.replace(/\W+/g, '-')}`} className="record-founder-ledger-title">{title}</h3>
      {intro && <p className="record-founder-ledger-intro">{intro}</p>}
      <dl className="record-founder-ledger-rows">
        {rows.map(({ id, value, unit, title: rowTitle, claim, source, href }) => (
          <div key={id} className="record-founder-ledger-row">
            <dt><strong>{value}</strong><span>{unit}</span></dt>
            <dd>
              <p className="record-founder-ledger-claim"><strong>{rowTitle}</strong> {claim}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="record-founder-evidence-source">
                {source} ↗<span className="sr-only"> (opens a new tab)</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}