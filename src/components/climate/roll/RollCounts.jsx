import React from 'react';

// ── WHAT THE ROLL COUNTS, SET THE WAY THE SEAL COUNTS IT ────────────────────────
// Brian, 28 November: "seals roll etc bro feel not connected know what I mean bro?"
//
// He was right, and the fault was here. The seal opens on its numbers — three figures in
// the record's display face, each one ruled beside the next — and the roll opened on a
// single grey line of monospace: "3 people hold a place on this list · 1 holds the keys ·
// 0 entries signed". Same facts, and the page read as a printout beside a room that had
// been composed.
//
// So the roll counts itself the same way the seal does: the same face, the same rule
// between the numbers, the same small caps under each one. The figure in the record's
// yellow, because on this record a count is the signal line. Nothing is added that was not
// already being counted, and nothing is dressed up: three numbers, and the words that say
// exactly what each one is.
export default function RollCounts({ totals = {} }) {
  const cells = [
    { n: totals.on_list || 0, label: totals.on_list === 1 ? 'person on the list' : 'people on the list' },
    { n: totals.keepers || 0, label: totals.keepers === 1 ? 'holds the keys' : 'hold the keys' },
    { n: totals.signed || 0, label: totals.signed === 1 ? 'entry signed' : 'entries signed' },
  ];

  return (
    <div
      className="grid grid-cols-3 border-y-2 border-record-ink/15 divide-x divide-record-ink/15"
      aria-label="What the roll counts"
    >
      {cells.map((c) => (
        <div key={c.label} className="px-3 py-3">
          <p className="text-[30px] font-black leading-none text-record-signal" style={{ fontFamily: 'var(--font-display)' }}>
            {c.n}
          </p>
          <p className="mt-1.5 font-mono text-[9.5px] font-bold uppercase leading-snug tracking-wide text-record-ink">
            {c.label}
          </p>
        </div>
      ))}
    </div>
  );
}