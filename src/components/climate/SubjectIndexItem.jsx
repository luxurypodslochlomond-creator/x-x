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
      className={`relative flex min-h-[112px] min-w-0 flex-col items-center justify-start gap-1 px-1 py-3 text-center font-body active:bg-record-paper ${selected ? 'bg-record-paper text-record-ocean' : 'text-record-ink'}`}
    >
      {selected && <Check aria-hidden="true" className="absolute right-1 top-2 h-3.5 w-3.5 text-record-ocean" />}
      <SubjectMark subject={subject.id} size={42} className="shrink-0" />
      <span className="w-full break-words text-[13px] leading-[1.3]">{subject.label}</span>
      <span className={`text-[12px] leading-snug ${empty ? 'text-record-ocean' : 'font-mono tabular-nums text-record-muted'}`}>
        {empty ? '0 · Send one in' : subject.count}
      </span>
    </button>
  );
}