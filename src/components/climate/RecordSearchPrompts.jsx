import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowUpRight } from 'lucide-react';

// ── SOMETHING TO TOUCH ──────────────────────────────────────────────────────────
// The front of the search used to be a page about the search: five bordered cards
// explaining what a solution and a crisis are, which is a spec sheet, and a spec sheet
// has never made anybody want to type. The reader's real question is not "how does this
// work" — it is "what is in here", and the honest answer is the record's own subjects.
//
// So these are read from the published entries themselves, not invented to make a front
// page look busy: a subject offered here is a subject that actually holds something, which
// is the only kind of suggestion worth making. Nothing is hardcoded and nothing is ranked.
//
// 17 November: they spent an hour as hand-cut points of different colours floating at
// different heights. Brian's correction — "look more like us" — applies here too, so they
// are what this record actually prints: squared chips, ink rule, the mark's red on the
// bullet, the subject in mono caps. Still buttons, still one tap, still the same six
// subjects drawn from the same query.
const pretty = (slug) =>
  String(slug || '')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function RecordSearchPrompts({ onPick, disabled }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    let alive = true;
    base44.entities.ClimateSolution
      .filter({ status: 'published' }, { limit: 60, sort: '-created_date' })
      .then((page) => {
        if (!alive) return;
        const rows = page?.items || [];
        const seen = [];
        for (const row of rows) {
          const name = pretty(row?.category);
          if (name && !seen.includes(name)) seen.push(name);
        }
        setSubjects(seen.slice(0, 6));
      })
      // A suggestion list is a courtesy, not the search: if it cannot be read the page
      // still works, so this one failure stays quiet rather than taking the door down.
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (subjects.length === 0) return null;

  return (
    <div className="record-search-prompts mt-4">
      <p className="record-search-prompts-label font-mono text-[9px] font-black uppercase tracking-[0.22em] text-record-muted">
        <span className="lg:hidden">In the record</span>
        <span className="hidden lg:inline">Try a subject the record keeps</span>
      </p>
      <div className="record-search-subjects mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {subjects.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            disabled={disabled}
            className="record-search-prompt flex items-center gap-2 border-2 border-record-ink bg-record-paper px-2.5 py-2 text-left font-mono text-[9.5px] font-black uppercase leading-tight tracking-[0.1em] text-record-ink transition-colors active:bg-cartoon-sun active:text-record-ink disabled:opacity-60"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-record-red" />
            <span className="min-w-0 flex-1">{name}</span>
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-60 lg:hidden" />
          </button>
        ))}
      </div>
    </div>
  );
}