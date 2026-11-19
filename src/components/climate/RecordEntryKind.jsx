import React from 'react';
import SubjectMark from '@/components/climate/SubjectMark';

export default function RecordEntryKind({ item }) {
  const solution = item.entry_type === 'solution';
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`text-[11px] font-bold ${solution ? 'text-record-botanical' : 'text-record-red'}`}>
        {solution ? 'Solution' : 'Crisis'}
      </span>
      {item.category && <SubjectMark subject={item.category} size={16} />}
    </span>
  );
}