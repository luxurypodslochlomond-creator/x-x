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
    <div className="record-search-prompts mt-5">
      <p className="record-search-prompts-label text-[10px] font-black font-mono uppercase tracking-[0.16em] text-record-muted">
        <span className="lg:hidden">In the record</span>
        <span className="hidden lg:inline">Try a subject the record keeps</span>
      </p>
      <div className="record-search-subjects mt-2 flex flex-wrap gap-1.5">
        {subjects.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            disabled={disabled}
            className="record-search-prompt border border-record-ink/30 px-3 py-1.5 text-[12.5px] leading-none text-record-ink transition-colors active:border-record-red active:text-record-red"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            <span>{name}</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 lg:hidden" />
          </button>
        ))}
      </div>
    </div>
  );
}