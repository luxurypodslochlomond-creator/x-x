import React from 'react';
import { Check, X } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';
import SubjectIndexItem from '@/components/climate/SubjectIndexItem';

// The same drawn, captioned language as the record's navigation, in the page's flow.
export default function SubjectIndexSheet({ open, onClose, filled, empty, totalEntries, selected, allLabel, onSelect, onAdd }) {
  if (!open) return null;
  const close = () => {
    onClose();
    document.getElementById('record-subject-toggle')?.focus({ preventScroll: true });
  };
  return (
    <section id="record-subject-index" aria-label="Subjects" className="pb-3 font-body text-record-ink" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      <div className="flex items-center justify-between gap-3 pt-3">
        <span className="text-[13px] text-record-muted">{filled.length + empty.length} subjects · {totalEntries} entries</span>
        <button type="button" onClick={close} aria-label="Close subjects" className="flex h-11 w-11 shrink-0 items-center justify-center text-record-ocean active:bg-record-paper">
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <button type="button" onClick={() => onSelect('all')} aria-pressed={selected === 'all'} className={`mb-5 flex min-h-[60px] w-full items-center gap-3 border-b border-record-ink/20 py-2 text-left ${selected === 'all' ? 'text-record-ocean' : 'text-record-ink'}`}>
        <SubjectMark subject="all" size={36} />
        <span className="flex-1 text-[16px]">{allLabel}</span>
        <span className="font-mono text-[13px] tabular-nums">{totalEntries}</span>
        {selected === 'all' && <Check aria-hidden="true" className="h-4 w-4" />}
      </button>
      <div className="mb-1 border-b border-record-ink/20 pb-2 text-[13px]">On the record</div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-1">
        {filled.map(subject => <SubjectIndexItem key={subject.id} subject={subject} selected={selected === subject.id} onClick={() => onSelect(subject.id)} />)}
      </div>
      {empty.length > 0 && <>
        <div className="mb-1 mt-6 border-b border-record-ink/20 pb-2 text-[13px]">Nothing yet · {empty.length}</div>
        <div className="py-2 text-[13px] leading-relaxed text-record-muted">Where the record is thinnest. Each one opens the form with its subject already set.</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {empty.map(subject => <SubjectIndexItem key={subject.id} subject={subject} empty onClick={() => onAdd(subject)} />)}
        </div>
      </>}
      <div className="mt-4 border-t border-record-ink/20 pt-4 text-[13px] leading-relaxed text-record-muted">
        A subject is on this list whether or not the record holds anything under it — the taxonomy was given, not built from what we happened to have. Every entry still needs its source and a person to sign it.
      </div>
    </section>
  );
}