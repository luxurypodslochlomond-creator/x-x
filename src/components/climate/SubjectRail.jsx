import React from 'react';
import { ChevronDown } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// On a phone, the device owns the picker: no expanding page or competing scroll.
export default function SubjectRail({ current = null, totalEntries, allLabel, expanded, onOpenIndex, onOpenPicker }) {
  const label = current?.label || allLabel;
  const count = current?.count ?? totalEntries;
  return (
    <div className="font-body text-record-ink">
      {/* ── THE PHONE ASKS THE RECORD, NOT THE OPERATING SYSTEM ──────────────────
          The device's own picker was a plain list of words: no marks, and the one place a
          reader chooses a theme was the one place the record's printed hand was missing.
          The row now opens the record's own sheet, where every theme keeps its mark. */}
      <div className="relative flex min-h-14 items-center border-y border-record-ink/35 py-2 lg:hidden">
        <button
          id="record-theme-select"
          type="button"
          onClick={onOpenPicker}
          aria-expanded={expanded}
          aria-controls="record-theme-sheet"
          className="flex min-h-12 w-full items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-mark"
        >
          <SubjectMark subject={current?.id || 'all'} size={32} className="shrink-0" />
          <span className="min-w-0 flex-1 text-base font-bold leading-snug">{label}</span>
          <span className="shrink-0 text-xs tabular-nums text-record-muted">{count} {count === 1 ? 'entry' : 'entries'}</span>
          <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-record-mark ${expanded ? 'rotate-180' : ''}`} />
        </button>
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