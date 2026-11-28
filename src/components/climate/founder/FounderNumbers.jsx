import React from 'react';

// Checked against the linked reports. Different periods and overlapping populations;
// the Mokwa estimate includes people believed dead, not only confirmed deaths.
const FIGURES = [
  { value: '700+', label: 'believed dead in the Mokwa floods, Nigeria, 2025. The confirmed toll at the time was over 200, with 500 missing.', source: 'BBC · June 2025', href: 'https://www.bbc.com/news/articles/c071jz90pj8o' },
  { value: '23m', label: 'without reliable food and water in Ethiopia, Kenya and Somalia, in the appeal her column cited.', source: 'Islamic Relief Canada', href: 'https://fundraise.islamicreliefcanada.org/campaign/garage-sale-for-sudan-330' },
  { value: '13m+', label: 'affected across Africa in 2025, with over 3,000 reported deaths from extreme weather and climate events.', source: 'WMO · 18 June 2026', href: 'https://wmo.int/news/media-centre/extreme-weather-and-climate-events-impact-millions-africa-2025' },
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