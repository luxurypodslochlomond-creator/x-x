import React, { useMemo } from 'react';

/* ── THE PLATE'S GAZETTEER ────────────────────────────────────────────────────────
   A stipple plate can say where, but it cannot say what: a dot on West Africa is mute
   until a thumb happens to land on it, and on a phone the whole plate is the width of
   a palm. So the places the record actually stands in are named underneath the
   engraving, the way an atlas plate carries its index, each with how many entries
   stand there. Pressing a name is the same act as pressing the dot — it opens the
   first entry standing there, and one more press puts it down.

   Nothing is listed that has no mark, and no place is named that the record cannot
   honestly put on its plate: this is the plate's own contents, read out, not a
   gazetteer borrowed from anywhere. */
export default function PlatePlaceIndex({ marks = [], selectedId, onPick }) {
  const places = useMemo(() => {
    const by = new Map();
    marks.forEach((m) => {
      const name = (m.country || '').trim();
      if (!name) return;
      if (!by.has(name)) by.set(name, { name, count: 0, first: m });
      by.get(name).count += 1;
    });
    return [...by.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [marks]);

  if (places.length === 0) return null;

  const openPlace = marks.find((m) => m.id === selectedId)?.country;

  return (
    <div className="record-map-places border-t border-[#141210]/20 bg-[#f7f1e5] px-3 py-2.5">
      <p className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#5a5246] mb-1.5">
        Where the marks stand
      </p>
      <div className="flex flex-wrap gap-1.5">
        {places.map((p) => {
          const on = p.name === openPlace;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => onPick && onPick(p.first)}
              aria-pressed={on}
              className={`text-[9px] font-mono uppercase tracking-[0.08em] px-1.5 py-1 border transition-colors ${
                on
                  ? 'bg-[#141210] text-[#efe7d6] border-[#141210]'
                  : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/25 active:bg-[#efe7d6]'
              }`}
            >
              {p.name}{' '}
              <span className={on ? 'text-[#efe7d6]/60' : 'text-[#5a5246]'}>{p.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}