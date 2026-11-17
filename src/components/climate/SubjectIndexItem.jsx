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
      className={`relative flex min-h-[92px] min-w-0 flex-col items-center justify-start gap-1 px-1 py-2 text-center font-body active:bg-record-paper ${selected ? 'bg-cartoon-sun text-record-ink' : 'text-record-ink'}`}
    >
      {selected && <Check aria-hidden="true" className="absolute right-1 top-1.5 h-3.5 w-3.5 text-record-mark" />}
      <SubjectMark subject={subject.id} size={38} active={selected} className="shrink-0" />
      <span className="w-full break-words text-[12px] leading-[1.2]">{subject.label}</span>
      <span className="font-mono text-[10px] leading-none tabular-nums text-record-muted">{subject.count}</span>
    </button>
  );
}