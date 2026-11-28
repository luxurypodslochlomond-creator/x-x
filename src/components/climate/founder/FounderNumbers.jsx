import React from 'react';

// ── WHAT SHE WAS TALKING ABOUT, IN HER OWN NUMBERS ─────────────────────────────
// Every figure here is one she printed in that column, with the source she gave for it.
// Nothing has been re-searched, re-scaled or dramatised: a founder's page that inflates the
// case she made would be the first place her argument breaks.
const FIGURES = [
  { value: '700+', label: 'killed in the Mokwa floods, Nigeria, 2025' },
  { value: '23m', label: 'left without reliable food and water by drought in Ethiopia, Kenya and Somalia' },
  { value: '13m', label: 'affected by extreme weather across Africa in 2025 — and more than 3,000 deaths' },
];

export default function FounderNumbers() {
  return (
    <section className="record-founder-numbers" aria-label="What her column reported">
      <div className="record-founder-numbers-inner">
        <dl className="record-founder-figures">
          {FIGURES.map(({ value, label }) => (
            <div key={value}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <p className="record-founder-numbers-source">As she reported them, with her sources: the Mokwa flood toll; Islamic Relief Canada; the World Meteorological Organization.</p>
      </div>
    </section>
  );
}