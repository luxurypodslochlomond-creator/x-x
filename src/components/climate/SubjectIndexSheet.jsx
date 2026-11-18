import React from 'react';
import { Check } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';
import SubjectIndexItem from '@/components/climate/SubjectIndexItem';

// One specimen plate, not two tall galleries. Counts stay with their drawings.
export default function SubjectIndexSheet({ open, onClose, filled, empty, totalEntries, selected, allLabel, onSelect, onAdd }) {
  if (!open) return null;
  const close = () => {
    onClose();
    document.getElementById('record-subject-toggle')?.focus({ preventScroll: true });
  };
  return (
    <section id="record-subject-index" aria-label={`${filled.length + empty.length} subjects`} className="pb-1 font-body text-record-ink" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      <button type="button" onClick={() => onSelect('all')} aria-pressed={selected === 'all'} className={`flex min-h-11 w-full items-center gap-2 border-b border-record-ink/20 text-left ${selected === 'all' ? 'bg-cartoon-sun text-record-ink' : 'text-record-ink'}`}>
        <SubjectMark subject="all" size={30} />
        <span className="flex-1 text-[13px]">{allLabel}</span>
        <span className="font-mono text-[11px] tabular-nums">{totalEntries}</span>
        {selected === 'all' && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
      </button>
      <div className="grid grid-cols-2 gap-x-3 pb-1 pt-2 sm:grid-cols-3">
        {filled.map(subject => <SubjectIndexItem key={subject.id} subject={subject} selected={selected === subject.id} onClick={() => onSelect(subject.id)} />)}
        {empty.map(subject => <SubjectIndexItem key={subject.id} subject={subject} empty onClick={() => onAdd(subject)} />)}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-2 border-t border-record-ink/20 pt-2 text-[11px] leading-snug text-record-muted">
        <span>{filled.length + empty.length} subjects · 0 opens the entry form</span>
        <details>
          <summary className="cursor-pointer text-record-mark">About this index</summary>
          <div className="max-w-[32ch] py-2 leading-relaxed">A subject is on this list whether or not the record holds anything under it — the taxonomy was given, not built from what we happened to have. Every entry still needs its source and a person to sign it.</div>
        </details>
      </div>
    </section>
  );
}