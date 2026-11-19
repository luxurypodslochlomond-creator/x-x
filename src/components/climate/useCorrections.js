import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── EVERY CORRECTION THE RECORD HAS MADE TO ITSELF ────────────────────────────
// Each entry carries its own correction, written by a keeper, printed on the entry in
// the open. This gathers them into one place so a reader does not have to open every
// entry to find out whether the record has ever been wrong — it has, and this is the list.
//
// Only what exists is fetched, and only what was actually written is shown: a note that
// is present but empty is not a correction, so it is dropped rather than printed as one.
const SOURCES = [
  { entity: 'ClimateSolution', kind: 'Record entry', to: (e) => `/ClimateDetail/${e.entry_type || 'solution'}/${e.id}` },
  { entity: 'ClimateAction', kind: 'Action', to: (e) => `/ClimateDetail/action/${e.id}` },
  { entity: 'ClimateNews', kind: 'News', to: (e) => `/ClimateWireEntry/${e.id}` },
];

export default function useCorrections() {
  const [corrections, setCorrections] = useState(null);

  useEffect(() => {
    let live = true;
    Promise.all(
      SOURCES.map(async (source) => {
        const page = await base44.entities[source.entity].filter(
          { status: 'published', correction_note: { $exists: true } },
          { sort: '-updated_date', limit: 200 }
        );
        return page.items
          .filter((entry) => (entry.correction_note || '').trim())
          .map((entry) => ({
            key: `${source.entity}-${entry.id}`,
            kind: source.kind,
            title: entry.title || entry.headline || 'Untitled entry',
            note: entry.correction_note.trim(),
            changed: entry.updated_date,
            to: source.to(entry),
          }));
      })
    ).then((groups) => {
      if (!live) return;
      const merged = groups
        .flat()
        .sort((a, b) => new Date(b.changed || 0) - new Date(a.changed || 0));
      setCorrections(merged);
    });
    return () => { live = false; };
  }, []);

  return corrections;
}