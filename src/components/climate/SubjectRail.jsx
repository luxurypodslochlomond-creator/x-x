import React from 'react';
import { ChevronDown } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// One drawn door, below the entry kinds. The whole row opens the subject index.
export default function SubjectRail({ subjects, totalEntries, allLabel, selected, expanded, onOpenIndex }) {
  const subject = subjects.find(item => item.id === selected);
  return (
    <button
      id="record-subject-toggle"
      type="button"
      onClick={onOpenIndex}
      aria-expanded={expanded}
      aria-controls="record-subject-index"
      className="flex min-h-[76px] w-full items-center gap-3 border-y border-record-ink/35 py-3 text-left font-body text-record-ink active:bg-record-paper focus-visible:outline-record-ocean"
    >
      <SubjectMark subject={subject?.id || 'all'} size={42} className="shrink-0" />
      <span className="min-w-0 flex-1 text-[18px] leading-snug">{subject?.label || allLabel}</span>
      <span className="shrink-0 text-right">
        <span className="block font-mono text-[14px] tabular-nums">{subject?.count ?? totalEntries}</span>
        <span className="block text-[12px] text-record-muted">entries</span>
      </span>
      <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-record-ocean ${expanded ? 'rotate-180' : ''}`} />
    </button>
  );
}