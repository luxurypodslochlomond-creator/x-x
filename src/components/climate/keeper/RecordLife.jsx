import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { formatDistanceToNow } from 'date-fns';

// ── THE RECORD, BREATHING ─────────────────────────────────────────────────────
// Janine's question was never "how do I use this" — it was "how do I know anything is
// happening". A room that only ever shows you what is still to do tells a keeper she is
// behind, and tells her nothing about whether the record is alive. So the foot of the
// room answers the other half: three things that have actually gone on, in the order
// they happened, with the kind of entry and how long ago.
//
// Facts only. It reads what is published, so it can never flatter the record by counting
// something that is only a draft, and it names nothing that a reader could not open.
const SOURCES = [
  { entity: 'ClimateSolution', label: 'entry', text: (r) => r.title },
  { entity: 'ClimateAction', label: 'action', text: (r) => r.title },
  { entity: 'ClimateNews', label: 'wire', text: (r) => r.headline },
];

export default function RecordLife() {
  const [lines, setLines] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.allSettled(
        SOURCES.map((s) =>
          base44.entities[s.entity].filter({ status: 'published' }, { sort: '-created_date', limit: 3 })
        )
      );
      const gathered = [];
      results.forEach((r, i) => {
        if (r.status !== 'fulfilled') return;
        for (const record of r.value?.items || []) {
          const text = SOURCES[i].text(record);
          if (!text || !record.created_date) continue;
          gathered.push({ id: record.id, text, label: SOURCES[i].label, at: record.created_date });
        }
      });
      gathered.sort((a, b) => new Date(b.at) - new Date(a.at));
      if (alive) setLines(gathered.slice(0, 3));
    })();
    return () => { alive = false; };
  }, []);

  if (!lines) return null;

  return (
    <section className="mt-7 border-t border-[#141210]/20 pt-3">
      <p className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#b3261e] mb-1.5">
        Latest on the record
      </p>
      {lines.length === 0 ? (
        <p className="text-[13px] leading-[1.6] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
          Nothing has gone on the record yet. The first thing you say yes to will appear here.
        </p>
      ) : (
        <ul className="space-y-1">
          {lines.map((l) => (
            <li key={`${l.label}-${l.id}`} className="flex flex-wrap items-baseline gap-x-2 text-[13px] leading-[1.5]">
              <span className="text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>{l.text}</span>
              <span className="text-[10.5px] font-mono uppercase tracking-wide text-[#6b5f4f]">
                {l.label} · {formatDistanceToNow(new Date(l.at), { addSuffix: true })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}