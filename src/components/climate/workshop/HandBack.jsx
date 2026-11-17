import React from 'react';

// ── THE LAST TWO MINUTES, WHICH ARE NOT A CONCLUSION ────────────────────────────
// She does not wrap up: she closes on the blank panel and hands the hour back to the room.
// That is the whole of it. There is no speech after it — an eight-minute slot for the record
// used to sit in this hour, and a passage here about somebody answering a question over the
// drawings. Both are gone. A room that has just spent nineteen minutes drawing does not need
// to be told what it made, least of all by whoever is keeping the record.
//
// What survives is the one condition that makes the hand-back honest rather than a stunt:
// nothing is interpreted over anybody's drawing. If the drawer says it meant something else,
// the drawer is right, and that is printed so nobody can quietly drop it on the day.

const TERMS = [
  [
    'She stops.',
    'No wrap-up slide, no thank-you list, no “and so in conclusion”. She says the last panel belongs to the room, and she stops talking.',
  ],
  [
    'Nothing is explained over the drawings.',
    'No commentary, no reading of what a panel means, nobody standing up to tell the room what it just did. The drawings are held up, and then they are simply there.',
  ],
  [
    'The drawing stays the drawer’s.',
    'If it meant something else to the hand that drew it, they are right and everybody else is guessing — the name on the panel is the only reading that counts.',
  ],
];

export default function HandBack() {
  return (
    <section className="mt-8 border-2 border-record-ink bg-cartoon-sun/25">
      <div className="border-b-2 border-record-ink bg-record-red px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cartoon-sun">02 · The last two minutes</p>
        <h2
          className="mt-1 text-[24px] leading-[1.08] text-record-paper lg:text-[34px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          She hands it back.
        </h2>
      </div>

      <div className="px-4 py-5 lg:px-6 lg:py-6">
        <p className="max-w-[58ch] text-[13.5px] leading-relaxed lg:text-[15.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          Janine’s hour does not end on a summary. It ends on an empty frame — and then the room gets its own hour back.
        </p>

        <ol className="mt-4 space-y-3">
          {TERMS.map(([head, body], i) => (
            <li key={head} className="grid grid-cols-[1.6rem_1fr] gap-3 border-t border-record-ink/25 pt-3">
              <span className="font-mono text-[13px] font-black tabular-nums text-record-red">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-mono text-[11.5px] font-black uppercase leading-tight tracking-wide lg:text-[12.5px]">{head}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[14px]">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 font-mono text-[10.5px] leading-relaxed uppercase tracking-[0.12em] text-record-ink/70">
          If she would rather use those two minutes herself, she takes them from anywhere in the hour. It is hers.
        </p>
      </div>
    </section>
  );
}