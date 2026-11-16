import React from 'react';
import { ChevronDown } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// ── THE SUBJECT LINE, AND THE MARKS BESIDE IT ─────────────────────────────────
// Two things, one door. The line above opens the full contents; the strip below puts the
// worlds themselves on the glass, in the record's own hand, so a reader can see them
// without tapping anything. Neither is a filter bar: there are no boxes, no chips, no
// fills — a drawing, a name and a count, divided by a hairline the way a thumb index is.
export default function SubjectRail({ strip = [], current = null, totalEntries, allLabel, selected, expanded, onOpenIndex, onSelect }) {
  return (
    <div className="font-body text-record-ink">
      <button
        id="record-subject-toggle"
        type="button"
        onClick={onOpenIndex}
        aria-expanded={expanded}
        aria-controls="record-subject-index"
        className="flex min-h-[64px] w-full items-center gap-3 border-y border-record-ink/35 py-2 text-left active:bg-record-paper focus-visible:outline-record-ocean"
      >
        <SubjectMark subject={current?.id || selected} size={34} active={!!current} className="shrink-0" />
        <span className="min-w-0 flex-1 text-[17px] leading-snug">{current?.label || allLabel}</span>
        <span className="shrink-0 text-right">
          <span className="block font-mono text-[13px] tabular-nums">{current?.count ?? totalEntries}</span>
          <span className="block text-[11px] text-record-muted">entries</span>
        </span>
        <ChevronDown aria-hidden="true" className={`h-[18px] w-[18px] shrink-0 text-record-ocean ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {strip.length > 0 && (
        <div
          className="climate-nav-rail flex gap-0 border-b border-record-ink/20 overflow-x-auto"
          style={{ scrollSnapType: 'x proximity' }}
          aria-label="Subjects on the record"
        >
          {strip.map(subject => (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelect(subject.id)}
              aria-pressed={selected === subject.id}
              className={`snap-start flex w-[74px] flex-none flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-center active:bg-record-paper ${selected === subject.id ? 'text-record-ocean' : 'text-record-ink'}`}
            >
              <SubjectMark subject={subject.id} size={28} active={selected === subject.id} />
              <span className="line-clamp-2 text-[11px] leading-[1.25]">{subject.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}