import React from 'react';
import { ChevronDown } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// On a phone, the device owns the picker: no expanding page or competing scroll.
export default function SubjectRail({ subjects = [], current = null, totalEntries, allLabel, selected, expanded, onOpenIndex, onSelect }) {
  const label = current?.label || allLabel;
  const count = current?.count ?? totalEntries;
  return (
    <div className="font-body text-record-ink">
      <div className="relative flex min-h-14 items-center gap-3 border-y border-record-ink/35 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-record-mark lg:hidden">
        <SubjectMark subject={current?.id || 'all'} size={30} className="shrink-0" />
        <span aria-hidden="true" className="min-w-0 flex-1 text-base font-bold leading-snug">{label}</span>
        <span aria-hidden="true" className="shrink-0 text-xs tabular-nums text-record-muted">{count} {count === 1 ? 'entry' : 'entries'}</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-record-mark" />
        <select
          id="record-theme-select"
          aria-label="Explore by theme"
          value={selected}
          onChange={event => onSelect(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer text-base opacity-0"
        >
          <option value="all">Every theme · {totalEntries} entries</option>
          {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.label} · {subject.count} {subject.count === 1 ? 'entry' : 'entries'}</option>)}
        </select>
      </div>
      <button
        id="record-subject-toggle"
        type="button"
        onClick={onOpenIndex}
        aria-expanded={expanded}
        aria-controls="record-subject-index"
        className="hidden min-h-14 w-full items-center gap-3 border-y border-record-ink/35 py-2 text-left focus-visible:outline-record-mark lg:flex"
      >
        <SubjectMark subject={current?.id || 'all'} size={30} className="shrink-0" />
        <span className="min-w-0 flex-1 text-base font-bold leading-snug">{label}</span>
        <span className="shrink-0 text-xs tabular-nums text-record-muted">{count} {count === 1 ? 'entry' : 'entries'}</span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-record-mark ${expanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}