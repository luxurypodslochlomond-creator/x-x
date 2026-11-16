import React from 'react';
import { Check } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

export default function SubjectIndexItem({ subject, selected, onClick, empty = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={empty ? undefined : selected}
      aria-label={empty ? `${subject.label}, no entries yet. Send one in.` : `${subject.label}, ${subject.count} entries`}
      className={`relative flex min-h-[56px] min-w-0 flex-col items-center justify-start gap-0.5 px-0.5 py-1 text-center font-body active:bg-record-paper ${selected ? 'bg-record-paper text-record-ocean' : 'text-record-ink'}`}
    >
      {selected && <Check aria-hidden="true" className="absolute right-0.5 top-1 h-3 w-3 text-record-ocean" />}
      <span className="flex items-center justify-center gap-1">
        <SubjectMark subject={subject.id} size={20} active={selected} className="shrink-0" />
        <span className="font-mono text-[11px] leading-none tabular-nums text-record-muted">{subject.count}</span>
      </span>
      <span className="w-full break-words text-[11px] leading-[1.15]">{subject.label}</span>
    </button>
  );
}