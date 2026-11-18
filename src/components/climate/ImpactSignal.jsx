import React from 'react';

export default function ImpactSignal({ stats }) {
  const num = (value) => typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString() : '—';
  const facts = [
    { label: 'Reads', value: stats?.total_views, href: '#reach-details' },
    { label: 'Countries', value: Array.isArray(stats?.countries) ? stats.countries.length : undefined, href: '#countries' },
    { label: 'Named nations', value: Array.isArray(stats?.regions) ? stats.regions.length : undefined, href: '#nations' },
  ];
  return (
    <section id="reach" aria-label="The record's reach" className="scroll-mt-36 border-y border-record-ink/20 bg-record-paper">
      <dl className="grid grid-cols-3 divide-x divide-record-ink/15">
        {facts.map(({ label, value, href }) => (
          <div key={label} className="min-w-0">
            <a href={href} className="flex min-h-20 flex-col justify-center px-3 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red lg:px-6">
              <dt className="order-2 mt-1 text-[11px] text-record-muted">{label}</dt>
              <dd className="text-[28px] font-bold leading-none tabular-nums text-record-ink lg:text-4xl">{num(value)}</dd>
            </a>
          </div>
        ))}
      </dl>
      <p className="border-t border-record-ink/10 px-3 py-2 text-xs leading-relaxed text-record-muted lg:px-6">Reads measure openings, not people or environmental impact. A missing count is shown as —, never zero.</p>
    </section>
  );
}