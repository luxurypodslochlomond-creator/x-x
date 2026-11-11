import React from 'react';
import { MarkStamp, MarkEye, MarkGate, MarkLedger } from './KeeperMarks';

// ── THE ROOM'S THUMB DOCK ──────────────────────────────────────────────────────
// Three jobs used to be a row of cells at the top of the page, which cost a keeper the
// first screen before she had seen a single entry — and on a phone the top of the glass
// is the worst place to put the only way between jobs. So the same marks sit where a
// thumb already is, and the work starts at the top of the page.
//
// The marks are the record's own engravings, not a stock icon set: that is the difference
// between a page of this book and a page of any dashboard on earth. A word sits under each
// one, because a mark nobody can name is a puzzle, and a puzzle at eleven at night is a
// headache.
//
// Green, not red, for "you are here": on this record red means a warning or a mark, and a
// keeper who is simply standing in the right room should not be told something is wrong.
// Red stays for the thing that actually wants her: a number above zero.
//
// Nothing here is a notification badge. A number means a piece of work exists, never that
// something is unread or unclicked — a count that can only be cleared by clicking is a
// slot machine, and this room is a desk.
const TABS = [
  { id: 'decide', Mark: MarkStamp, word: 'Decide', unit: 'to decide', keeperOnly: true },
  { id: 'check', Mark: MarkEye, word: 'Check', unit: 'to read' },
  { id: 'people', Mark: MarkGate, word: 'People', unit: 'asking in', keeperOnly: true },
  { id: 'record', Mark: MarkLedger, word: 'Record', unit: '', keeperOnly: true },
];

export default function WorkDock({ counts, keeper, view, onView, failed }) {
  const tabs = TABS.filter((tab) => keeper || !tab.keeperOnly);

  return (
    <nav
      aria-label="The room's jobs"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#141210]/20 bg-[#efe7d6] pb-[env(safe-area-inset-bottom)] lg:static lg:mt-4 lg:border-y lg:pb-0"
    >
      <div className="mx-auto flex max-w-[520px]">
        {tabs.map(({ id, Mark, word, unit }, i) => {
          // A failed count is not a zero. When the question did not come back, the cell
          // says nothing rather than saying "clear" — the one lie this room cannot afford.
          const n = failed ? null : counts?.[id] ?? null;
          const on = view === id;
          const waiting = (n || 0) > 0;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onView(id)}
              aria-pressed={on}
              className={`relative flex min-h-[62px] flex-1 flex-col items-center justify-center gap-1 px-1 py-2 transition-colors ${
                i < tabs.length - 1 ? 'border-r border-[#141210]/15' : ''
              } ${on ? 'bg-[#f4efe4]' : 'active:bg-[#f4efe4]/70'}`}
            >
              <Mark size={21} className={on ? 'text-[#1e3a2b]' : waiting ? 'text-[#b3261e]' : 'text-[#4a443a]'} />
              <span
                className="text-[11px] font-semibold leading-none"
                style={{ fontFamily: 'var(--font-reading)', color: on ? '#1e3a2b' : '#141210' }}
              >
                {word}
              </span>
              <span
                className="font-mono text-[10px] uppercase leading-none tracking-[0.06em]"
                style={{ color: waiting ? '#b3261e' : '#8a7f6d' }}
              >
                {n === null ? '\u00a0' : n === 0 ? 'clear' : unit ? `${n} ${unit}` : `${n}`}
              </span>
              <span className={`absolute inset-x-0 top-0 h-[2px] ${on ? 'bg-[#1e3a2b]' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}