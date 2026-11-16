import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';

// One hand, one weight, and the red cut only where the reader is standing.
// The borrowed red is the record's "you are here" ink; spending it on all thirty-two
// drawings at once would be the over-cooking. Ink is the drawing. Red is the place.
export default function SubjectMark({ subject = 'all', size = 30, active = false, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d={drawing} />
      <path
        d={detail}
        strokeWidth="1.9"
        className={active ? 'text-record-mark' : ''}
        opacity={active ? 1 : 0.55}
      />
    </svg>
  );
}