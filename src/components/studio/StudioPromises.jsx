import React from 'react';

// ── WHAT THE STUDIO NEVER ASKS FOR ────────────────────────────────────────────
// Said as a list of rules on the page, not as a badge of honour: a parent reading this
// should be able to check each line and find it true.
const PROMISES = [
  'No account and no password. There is nothing here to sign into.',
  'No name, no age, no email, no school.',
  'What you make stays in your own browser, on your own device.',
  'Everything that appears on screen is checked before it is shown.',
  'Nothing is sold, ranked, or shown to strangers.',
];

export default function StudioPromises() {
  return (
    <section className="mt-9 border-t-2 border-[#1a1612] pt-4">
      <h2
        className="text-[#1a1612]"
        style={{ fontFamily: 'var(--record-display)', fontSize: 21, letterSpacing: '-0.01em' }}
      >
        What is never asked for
      </h2>

      <ul className="mt-2">
        {PROMISES.map((promise) => (
          <li
            key={promise}
            className="flex gap-2.5 border-b border-[#1a1612]/15 py-2 leading-relaxed"
            style={{ fontFamily: 'var(--font-record-reading)', fontSize: 13.5 }}
          >
            <span aria-hidden="true" className="font-mono font-black text-[#b3261e]">—</span>
            <span>{promise}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-l-4 border-l-[#e2602a] bg-[#efe7d6] px-3.5 py-3 font-mono text-[10.5px] leading-relaxed text-[#1a1612]">
        Every thing built here carries one line and no more:{' '}
        <span className="font-black">
          an AI made this, it can be wrong — check with a grown-up if it matters.
        </span>
      </p>
    </section>
  );
}