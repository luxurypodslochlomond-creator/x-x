import React from 'react';
import { Check } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// The words name the theme; the mark is a companion, not a puzzle to solve.
export default function SubjectIndexItem({ subject, selected, onClick, empty = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${subject.label}, ${empty ? 'no entries yet' : `${subject.count} entries`}`}
      className={`flex min-h-14 min-w-0 items-center gap-2.5 py-2 text-left font-body outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark active:bg-record-paper ${selected ? 'text-record-mark' : 'text-record-ink'}`}
    >
      <SubjectMark subject={subject.id} size={30} className="shrink-0" />
      <span className="min-w-0 flex-1 break-normal text-sm leading-snug">{subject.label}</span>
      <span className="shrink-0 text-xs tabular-nums text-record-muted">{subject.count}</span>
      {selected && <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-record-mark" />}
    </button>
  );
}