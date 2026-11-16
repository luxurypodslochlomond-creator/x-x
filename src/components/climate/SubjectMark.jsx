import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';

export default function SubjectMark({ subject = 'all', size = 40, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d={drawing} />
      <path d={detail} className="text-record-mark" strokeWidth="1.9" />
    </svg>
  );
}