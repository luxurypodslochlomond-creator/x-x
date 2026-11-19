import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';

// The same printed hand as the navigation: solid ink and one red part.
export default function SubjectMark({ subject = 'all', size = 34, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="currentColor" stroke="none" className={`text-record-ink ${className}`} aria-hidden="true" focusable="false">
      <path d={drawing} />
      <path d={detail} className="text-record-mark" />
    </svg>
  );
}