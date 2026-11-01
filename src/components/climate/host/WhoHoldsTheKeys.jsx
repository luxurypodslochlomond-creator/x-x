import React from 'react';

// ── NOBODY HOLDS THE KEYS ALONE ───────────────────────────────────────────────
// The role can be a person or an entity, and either way it must be able to change
// hands without the record dying or being captured. Four things make that true.
// Said plainly, because a world record that depends on one person's inbox is not
// a record — it is a hostage.

const RULES = [
  ['The role outlives the holder', 'A holder is replaced by transfer, with a name and a date written down — not by a password being handed over in a message.'],
  ['Two admins, in different hands', 'Two accounts, on different devices, held by different people. Not two logins with one person.'],
  ['The workspace belongs to the host', 'The accounts sit in the host’s own workspace, never in a personal account that walks out with someone.'],
  ['The keys are never a lock', 'The whole record exports, and the export is tested once a year. Anyone who can read it can carry it away.'],
];

export default function WhoHoldsTheKeys() {
  return (
    <div className="border-2 border-[#141210] mt-4">
      <div className="bg-[#141210] px-3 py-2">
        <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#efe7d6]">
          Nobody holds the keys alone
        </p>
      </div>

      <div className="bg-[#f7f1e5] px-3 py-3">
        <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
          <strong>An entity can hold the role — and that is the safer answer.</strong> A library, a university
          centre, a trust, or a body the founder already works with keeps the record further from any one
          person&rsquo;s inbox. What matters is not whether the holder is a person or an institution, but that
          the role can change hands without the record dying or being captured.
        </p>

        <div className="mt-3 border border-[#141210]/25">
          {RULES.map(([title, detail], i) => (
            <div key={title} className={`px-3 py-2 ${i > 0 ? 'border-t border-[#141210]/15' : ''}`}>
              <p className="text-[10.5px] font-black font-mono text-[#141210] leading-snug">{title}</p>
              <p className="text-[10.5px] font-mono text-[#5a5246] leading-snug mt-0.5">{detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210]">
          <strong>Which means:</strong> no one person can take this record down, sell it, or quietly rewrite it,
          and no one person&rsquo;s silence can end it. Those are different failures, and these four rules are
          what stop both.
        </p>
      </div>
    </div>
  );
}