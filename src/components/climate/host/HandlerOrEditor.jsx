import React from 'react';

// ── TWO JOBS, ONE WORD ────────────────────────────────────────────────────────
// "Is the custodian the same as the editor?" is the question everyone asks, and it is
// difference the whole record rests on: one decides what is true, the other keeps
// it standing. They can sit inside the same organisation. They must not be the same
// single person with nobody checking — that is the only arrangement in which a
// record can be quietly bent without anyone outside noticing.

const ROLES = [
  {
    title: 'The custodian who signs',
    line: 'Decides what goes on the record.',
    accent: '#b3261e',
    items: [
      'Signs each entry with their own name, or it shows as unsigned',
      'Says how well something is known, and never guesses',
      'Corrects in daylight, with the date, where anyone can see it',
      'Can be challenged by any reader, by name',
    ],
  },
  {
    title: 'The custodian who runs it',
    line: 'Keeps the record running.',
    accent: '#1e3a2b',
    items: [
      'Answers the queue, the corrections, the held-back lines',
      'Keeps both addresses and the plan alive',
      'Publishes what was really spent, once a year',
      'Proves the export works, so nobody is trapped',
    ],
  },
];

export default function HandlerOrEditor() {
  return (
    <div className="border-2 border-[#141210] mt-4">
      <div className="bg-[#141210] px-3 py-2">
        <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#efe7d6]">
          Two custodians — not the same job
        </p>
      </div>

      <div className="bg-[#f7f1e5] px-3 py-3">
        <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
          <strong>No. They are two custodians, and one does not decide what is true.</strong> Both jobs are safe
          because neither can do the other&rsquo;s work alone: the custodian who signs cannot take the record
          offline, and the custodian who runs it cannot put a claim on it.
        </p>

        <div className="grid gap-2 mt-3 sm:grid-cols-2">
          {ROLES.map((r) => (
            <div key={r.title} className="border border-[#141210]/25 bg-[#fbf7ee]">
              <p
                className="px-3 py-1.5 text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#f7f1e5]"
                style={{ backgroundColor: r.accent }}
              >
                {r.title}
              </p>
              <div className="px-3 py-2">
                <p className="text-[11px] font-black font-mono text-[#141210] leading-snug">{r.line}</p>
                <ul className="mt-1.5 space-y-1">
                  {r.items.map((i) => (
                    <li key={i} className="text-[10.5px] font-mono text-[#5a5246] leading-snug flex gap-1.5">
                      <span aria-hidden="true" style={{ color: r.accent }}>·</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210]">
          <strong>The one rule.</strong> They can sit in the same organisation. They must never be the same
          single person with nobody checking — that is the arrangement that lets a record be bent quietly,
          and it is the thing to refuse even when it is convenient.
        </p>
      </div>
    </div>
  );
}