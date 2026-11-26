import React from 'react';
import SubjectMark from '@/components/climate/SubjectMark';

// ── THE HAND, WHERE THE CHOICE IS MADE ────────────────────────────────────────
// Brian, 26 November: "they look out of place on main record page and I don't think they're
// connected — the subjects."
//
// He is half right, and the half he is right about is worth fixing. Nothing is missing: every
// subject on the record already has its own drawn mark and its own reason, thirty-three of
// each, and they come from the same place the subjects do — one list, one drawing per
// subject, no borrowing. What was wrong is that the front page showed ONE mark at a time: the
// mark of whatever subject you were standing in, alone, beside a word. A single glyph with
// nothing to compare it to does not read as a hand — it reads as decoration, which is exactly
// how it felt.
//
// So the marks that actually carry something stand here, together, under the theme line. Not
// all thirty-three: the ones with entries in them, because those are the record's real
// subjects today, and a mark with a nought under it is a promise nobody has kept yet. Each
// one is the way into its subject, and the count under it is the same count the rail says.
// The full plate — every mark, including the ones still waiting — is one tap away in the
// picker, where each mark also says why it is drawn that way.
export default function SubjectHand({ subjects = [], selected = 'all', onSelect }) {
  if (!subjects.length) return null;
  return (
    <div className="mt-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">
        The hand · {subjects.length} {subjects.length === 1 ? 'subject carries' : 'subjects carry'} something
      </p>
      <ul className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {subjects.map((subject) => {
          const on = subject.id === selected;
          return (
            <li key={subject.id}>
              <button
                type="button"
                onClick={() => onSelect(subject.id)}
                aria-pressed={on}
                title={`${subject.label} · ${subject.count} ${subject.count === 1 ? 'entry' : 'entries'}`}
                className={`flex min-h-12 w-14 flex-col items-center justify-start gap-0.5 border-t-2 pt-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-mark ${
                  on ? 'border-record-mark' : 'border-transparent hover:border-record-ink/25'
                }`}
              >
                <SubjectMark subject={subject.id} size={26} />
                <span className="font-mono text-[10px] tabular-nums leading-none text-record-muted">{subject.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}