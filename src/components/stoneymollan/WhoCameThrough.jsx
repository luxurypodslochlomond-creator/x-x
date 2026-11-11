import React from 'react';

// ── WHO CAME THROUGH ──
// A dated list rather than a paragraph, because a date is the thing a reader checks.
// Name in the record's display face, dates in the machine's small voice, and one line
// of what it has to do with this hill. Left-aligned on the centred sheet: a list of
// people reads down, not out from a middle line.
export default function WhoCameThrough({ people }) {
  return (
    <ul className="mx-auto mt-1 max-w-[46ch] divide-y divide-record-ink/15 border-y border-record-ink/25">
      {people.map((person) => (
        <li key={person.name} className="py-3.5 text-left">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <span className="text-[18px] leading-tight" style={{ fontFamily: 'var(--record-display)' }}>
              {person.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">
              {person.dates}
            </span>
          </div>
          <p
            className="mt-1.5 text-[15.5px] leading-[1.62] text-record-ink/85"
            style={{ fontFamily: 'var(--font-record-reading)' }}
          >
            {person.line}
          </p>
        </li>
      ))}
    </ul>
  );
}