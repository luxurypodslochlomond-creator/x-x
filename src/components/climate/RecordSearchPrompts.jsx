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
// 17 November: they were a wrapped row of identical chips under a label, which is a tag
// cloud and a tag cloud is the most linear thing ever drawn. Now each one is a point in
// the field with its own colour and its own height, cut by hand, so the eye travels
// across them instead of reading down a list. Still buttons, still one tap, still exactly
// the same six subjects drawn from exactly the same query.
const PIGMENTS = ['#b3261e', 'rgb(20 18 16)', '#0f5f7a', '#9b6f28', '#b3261e', 'rgb(20 18 16)'];

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
      <div className="record-search-subjects mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5 sm:grid-cols-3">
        {subjects.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            disabled={disabled}
            style={{
              fontFamily: 'var(--font-reading)',
              borderRadius: '14px 4px 12px 5px',
              marginTop: i % 2 === 1 ? 7 : 0,
            }}
            className="record-search-prompt flex items-center gap-2 border border-record-ink/30 px-2.5 py-2 text-left text-[12.5px] leading-tight text-record-ink transition-colors active:border-record-red active:text-record-red disabled:opacity-60"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: PIGMENTS[i % PIGMENTS.length] }}
            />
            <span className="min-w-0 flex-1">{name}</span>
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-70 lg:hidden" />
          </button>
        ))}
      </div>
    </div>
  );
}