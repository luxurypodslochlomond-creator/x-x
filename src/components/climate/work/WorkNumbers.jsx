import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── THE RECORD, COUNTED AS THE PAGE OPENS ──────────────────────────────────────
// These are not typed in. If a drawing is added tonight the number on this page is
// different tomorrow, which is the difference between a record and a brochure. If the
// count cannot be read the figure is simply not shown: a number that failed is not zero.
const FIELDS = [
  { key: 'cartoons', label: 'drawings on the wall', to: '/ClimateCartoons' },
  { key: 'hands', label: 'hands that drew them', to: '/ClimateCartoons' },
  { key: 'solutions', label: 'solutions on the record', to: '/TogetherChangeClimate' },
  { key: 'actions', label: 'actions people can take', to: '/TogetherChangeClimate' },
  { key: 'wire', label: 'wire entries, sourced', to: '/ClimateWire' },
  { key: 'groups', label: 'gatherings started', to: '/TogetherChangeClimate' },
];

export default function WorkNumbers() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const read = async (fn) => {
        try { return await fn(); } catch { return null; }
      };
      const [cartoons, solutions, actions, wire, groups] = await Promise.all([
        read(() => base44.entities.ClimateCartoon.filter({ status: 'published' })),
        read(() => base44.entities.ClimateSolution.count({})),
        read(() => base44.entities.ClimateAction.count({})),
        read(() => base44.entities.ClimateNews.count({})),
        read(() => base44.entities.ClimateGroup.count({})),
      ]);
      const hands = cartoons ? new Set(cartoons.map((c) => c.artist_name).filter(Boolean)).size : null;
      if (live) {
        setCounts({
          cartoons: cartoons ? cartoons.length : null,
          hands,
          solutions,
          actions,
          wire,
          groups,
        });
      }
    })();
    return () => { live = false; };
  }, []);

  return (
    <div className="work-numbers" aria-live="polite">
      {FIELDS.map((f) => (
        <a key={f.key} className="work-number" href={f.to}>
          <b>{counts && counts[f.key] != null ? counts[f.key] : '—'}</b>
          <span>{f.label}</span>
        </a>
      ))}
    </div>
  );
}