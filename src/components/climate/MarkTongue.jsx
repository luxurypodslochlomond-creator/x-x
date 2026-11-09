import React from 'react';

// ── THE TONGUE HAS A MARK OF ITS OWN ───────────────────────────────────────────
// Every other way through the record is drawn: the six doors at the foot, the four
// terms in the imprint, the shed's own hand. The language control was the one line of
// the masthead made of nothing but a word and a chevron, which is why it read as a form
// control that had wandered into a printed page.
//
// So it is drawn in the same hand as the rest: a mouth, cut as two lips meeting at the
// corners, and a tongue in the record's red. Not a globe (a globe says "foreign"), not a
// letter A (a letter says the alphabet you happen to be reading), and not a speech
// bubble (a bubble says "chat with us"). A mouth is the plainest true thing that can be
// said about a tongue, and it is funny, which is the point.
//
// Same one weight, same currentColor, one red gesture — nothing thinner than the stroke,
// because this is read at sixteen pixels beside a word, not at poster size.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export default function MarkTongue({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* the upper lip */}
      <path d="M6 14.6c6.2-6 21.8-6 28 0" />
      {/* the lower lip, opening the mouth */}
      <path d="M6 14.6c6.2 11 21.8 11 28 0" />
      {/* the tongue, the one gesture in the mark's red */}
      <path d="M13.6 20.6c2.4 5.4 10.4 5.6 13 .2" className="text-record-mark" strokeWidth="2.5" />
      {/* and what comes out of it, held back so it never competes with the mouth */}
      <path d="M34.6 10.6c1.8 2 1.8 4.4 0 6.6" strokeWidth="1.6" opacity=".55" />
    </svg>
  );
}