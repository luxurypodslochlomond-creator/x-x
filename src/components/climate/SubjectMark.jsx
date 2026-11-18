import React from 'react';
import subjectMarkPaths from '@/components/climate/subjectMarkPaths';

// ── THE SUBJECTS WEAR THE SAME MARK AS THE DOORS ──────────────────────────────
// Brian, 18 November: "love desktop new explorer, think we need to use same style for
// icons in subjects too."
//
// He is right, and the difference was a whole argument this file used to make. The subject
// marks were colour plates: the drawing in the record's red, a wash of the same red inside
// it, and one stroke of a pigment on top — water blue, living green, sun yellow, heat clay.
// That was a defensible idea and it was the wrong one, for the reason he spotted by eye
// before anybody said it out loud: every other mark on this record — the five on the
// masthead, the ones in the explorer, the ones at the foot — is one ink drawing with a
// single red accent, and thirty subjects in a second alphabet made the subject index look
// like a different publication's chart.
//
// So there is one alphabet now. The line is the record's ink, the drawing is the drawing,
// and the accent is the record's red — exactly what a door in the explorer wears. The
// selected subject goes red all through, which is what the explorer does with the page you
// are standing on, so "here" reads the same in both places.
//
// Sizes: 20 beside a name on a phone, 22 on a desk, 26–30 where it stands alone in a rail.
// Below about eighteen the accent stroke closes up against the line, which is why nothing
// here is asked to draw smaller than twenty.
export default function SubjectMark({ subject = 'all', size = 34, active = false, className = '' }) {
  const [drawing, detail] = subjectMarkPaths[subject] || subjectMarkPaths.other;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${active ? 'text-record-mark' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={drawing} />
      {/* The one accent, in the record's red: the same single colour of its own that every
          door in the explorer carries, and never a second palette. */}
      <path d={detail} strokeWidth="2.1" className="text-record-mark" />
    </svg>
  );
}