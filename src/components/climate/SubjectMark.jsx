import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';
import subjectMarkPigments from '@/components/climate/subjectMarkPigments';

// A drawing, not a symbol: at 34px the colour plate reads as colour and the ink
// line stays one confident weight. Under about 26px both turn to mush, which is
// what made a hand-drawn mark look like a broken icon.
export default function SubjectMark({ subject = 'all', size = 34, active = false, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  const [pigment, wash] = subjectMarkPigments[subject] || subjectMarkPigments.other;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d={wash} fill="currentColor" stroke="none" className={pigment} opacity={active ? 0.85 : 0.72} />
      <path d={drawing} className="text-record-ink" />
      <path d={detail} strokeWidth="2.4" className={pigment} />
    </svg>
  );
}