import React from 'react';
import SubjectMark from '@/components/climate/SubjectMark';
import RecordKindStamp from '@/components/climate/RecordKindStamp';

// The record page's own kind label wears the same stamp as the cards and the Wire, so a
// crisis is printed the same way whether it is met in a list, on a plate or on an entry.
export default function RecordEntryKind({ item }) {
  const solution = item.entry_type === 'solution';
  return (
    <span className="inline-flex items-center gap-2">
      <RecordKindStamp kind={solution ? 'solution' : 'crisis'} />
      {item.category && <SubjectMark subject={item.category} size={16} />}
    </span>
  );
}