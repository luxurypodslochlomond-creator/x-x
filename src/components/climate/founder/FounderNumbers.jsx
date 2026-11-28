import React from 'react';

// Checked against the linked reports. Different periods and overlapping populations;
// the Mokwa estimate includes people believed dead, not only confirmed deaths.
const FIGURES = [
  { value: '700+', label: 'believed dead after the Mokwa floods, Nigeria, May 2025.', source: 'BBC · 2 June 2025', href: 'https://www.bbc.com/news/articles/c071jz90pj8o' },
  { value: '23m', label: 'without reliable food and water in Ethiopia, Kenya and Somalia, in the appeal cited by Janine.', source: 'Islamic Relief Canada · 2023 appeal', href: 'https://fundraise.islamicreliefcanada.org/campaign/garage-sale-for-sudan-330' },
  { value: '≥13m', label: 'affected across Africa in 2025; over 3,000 reported deaths from extreme weather and climate events.', source: 'WMO · 18 June 2026', href: 'https://wmo.int/news/media-centre/extreme-weather-and-climate-events-impact-millions-africa-2025' },
];

export default function FounderNumbers() {
  return (
    <section className="record-founder-numbers" aria-label="What her column reported">
      <div className="record-founder-numbers-inner">
        <p className="record-founder-kicker">The harm · reported figures</p>
        <dl className="record-founder-figures">
          {FIGURES.map(({ value, label, source, href }) => (
            <div key={value}>
              <dt>{value}</dt>
              <dd>{label}<a className="record-founder-figure-source" href={href} target="_blank" rel="noopener noreferrer">{source} ↗</a></dd>
            </div>
          ))}
        </dl>
        <p className="record-founder-numbers-source">Different periods. Overlapping populations. Not live counts, and not figures to add together.</p>
      </div>
    </section>
  );
}