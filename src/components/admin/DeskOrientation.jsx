import React from 'react';

// The desk is a window, and a window is only useful to someone who knows what they are
// looking at. This is the desk's own instruction card: what each number means, what to do
// when it is not zero, and who is allowed to do what. It stays closed until it is asked
// for, so the numbers keep the top of the page where the glance belongs — but it is
// always here, because a page that only makes sense to the person who built it is a page
// that quietly stops being used the first time somebody else is handed the keys.
const ROWS = [
  ['waiting', 'Entries held for a person. Nothing goes on the record until someone has read it and decided. When this is not zero, this is where you start.'],
  ['unopened', 'On the record, but nobody has opened its source yet. When this grows, add a checker — they read the source, you read their note, and you decide.'],
  ['checks / 7d', 'Notes written by checkers in the last seven days. Zero means the pair of eyes has stopped, not that the record is clean.'],
];

export default function DeskOrientation() {
  return (
    <details className="border-2 border-record-ink/20 bg-record-bone mb-6">
      <summary className="px-3 py-2.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink cursor-pointer">
        first time here · what these numbers mean
      </summary>
      <div className="px-3 pb-3 border-t border-record-ink/10">
        <ol className="mt-2.5 space-y-2">
          {ROWS.map(([label, text], i) => (
            <li key={label} className="flex gap-2">
              <span className="text-[10px] font-mono font-black text-record-red flex-shrink-0">{i + 1}</span>
              <p className="text-[11px] font-mono text-record-ink/80 leading-snug">
                <span className="font-black text-record-ink uppercase tracking-[0.1em]">{label}</span> — {text}
              </p>
            </li>
          ))}
        </ol>

        <p className="text-[9px] font-mono font-black uppercase tracking-[0.15em] text-record-ink mt-4 mb-1.5">who does what</p>
        <p className="text-[11px] font-mono text-record-ink/80 leading-snug">
          A <span className="font-black text-record-ink">keeper</span> reads a decision, publishes or holds it, and signs their own name to it. Keepers are admins.
        </p>
        <p className="text-[11px] font-mono text-record-ink/80 leading-snug mt-1.5">
          A <span className="font-black text-record-ink">checker</span> opens a source and writes down what they found. They cannot publish, change or delete anything, and they never see who sent an entry.
        </p>
        <p className="text-[11px] font-mono text-record-ink/80 leading-snug mt-1.5">
          To bring someone in: add them on the guest list and they get an invitation and a way in. Anyone who will handle entries themselves, not only check them, is made an admin in App Users.
        </p>
      </div>
    </details>
  );
}