import React from 'react';

// ── THE LINE UNDER A SECTION'S NAME ───────────────────────────────────────────────
// Brian, 24 November: the footer looks designed and the sentences on the record do not.
// He is right, and one reason was this line: every section's opening sentence was set at
// thirteen pixels in the muted grey kept for footnotes, so the first thing a reader met in
// Actions, Solutions or Groups was the quietest type on the page. A section that opens
// quietly has to shout with its heading to be noticed at all.
//
// So the opening sentence is a standfirst, which is what it always was: the record's
// reading face, at a size a phone can read without leaning in, in ink rather than grey, on
// the record's red rule. The heading can then stay calm, because the sentence beneath it
// is carrying its own weight. Same words, same place — nothing added, nothing removed.
export default function RecordStandfirst({ children, className = '' }) {
  return (
    <p
      className={`mb-3 border-l-[3px] border-record-mark pl-3 text-record-ink/85 ${className}`}
      style={{
        fontFamily: 'var(--font-reading)',
        fontSize: 'clamp(1rem, 0.96rem + 0.18vw, 1.0625rem)',
        lineHeight: 1.6,
        maxInlineSize: '58ch',
        textWrap: 'pretty',
      }}
    >
      {children}
    </p>
  );
}