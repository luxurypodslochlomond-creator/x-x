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
      {/* ── THE MARK IS THE RECORD'S RED NOW ────────────────────────────────────
          It was ink with a mute pigment inside — ocean blue, botanical green, ochre,
          clay — and on a page of warm paper those four read as brown and dusty, so
          thirty of them together looked like a faded chart instead of a set of marks.
          They also said the wrong thing: a colour used on a subject is a colour that
          means something else on this record, where red means the emergency and orange
          means the action.
          So the line is the record's red, the body is the same red held back, and each
          drawing keeps exactly one stroke of its own pigment — the single accent that
          tells you what the mark is about without pretending to be a legend. */}
      <path d={wash} fill="currentColor" stroke="none" className="text-record-mark" opacity={active ? 0.24 : 0.14} />
      <path d={drawing} className="text-record-mark" />
      <path d={detail} strokeWidth="2.4" className={pigment} />
    </svg>
  );
}