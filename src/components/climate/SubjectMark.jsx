import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';
import subjectMarkPigments from '@/components/climate/subjectMarkPigments';

// Restrained pigment inside the ink, never a coloured tile behind it.
export default function SubjectMark({ subject = 'all', size = 20, active = false, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  const [pigment, wash] = subjectMarkPigments[subject] || subjectMarkPigments.other;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d={wash} fill="currentColor" stroke="none" className={pigment} opacity={active ? 0.4 : 0.28} />
      <path d={drawing} className="text-record-ink" />
      <path d={detail} strokeWidth="2" className={pigment} />
    </svg>
  );
}