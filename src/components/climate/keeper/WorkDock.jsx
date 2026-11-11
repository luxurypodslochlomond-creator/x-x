import React from 'react';
import { MarkStamp, MarkEye, MarkGate, MarkLedger } from './KeeperMarks';

// ── THE ROOM'S THUMB DOCK ──────────────────────────────────────────────────────
// Three jobs used to be a row of cells at the top of the page, which cost a keeper the
// first screen before she had seen a single entry — and on a phone the top of the glass
// is the worst place to put the only way between jobs. So the same marks sit where a
// thumb already is, and the work starts at the top of the page.
//
// The marks are the record's own engravings, not a stock icon set: that is the difference
// between a page of this book and a page of any dashboard on earth.
//
// ── ONE RED, NOT FOUR ─────────────────────────────────────────────────────────
// There are four numbers here and only ever one thing to do next. When every waiting
// number was printed in signal red, the dock said "22 to decide, 22 to read" at the same
// volume as the warning red the record keeps for a danger — and it left a keeper choosing
// between two identical alarms. Now the room chooses: the door she is standing in is the
// one that carries the red, and the rest are stated quietly in ink so she can still see
// they exist. Nothing is hidden; nothing competes.
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#141210]/20 bg-[#efe7d6] pb-[env(safe-area-inset-bottom)] lg:static lg:mt-3 lg:border-y lg:pb-0"
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
              className={`relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-[3px] px-1 py-1.5 transition-colors ${
                i < tabs.length - 1 ? 'border-r border-[#141210]/15' : ''
              } ${on ? 'bg-[#f4efe4]' : 'active:bg-[#f4efe4]/70'}`}
            >
              <Mark size={19} className={on ? 'text-[#1e3a2b]' : waiting ? 'text-[#b3261e]' : 'text-[#4a443a]'} />
              <span
                className="text-[10.5px] font-semibold leading-none"
                style={{ fontFamily: 'var(--font-reading)', color: on ? '#1e3a2b' : '#141210' }}
              >
                {word}
              </span>
              {/* ── ONLY THE DOOR YOU ARE IN PRINTS A NUMBER ──────────────────────────
                  There are two queues here that hold the same twenty-two entries, so the
                  dock was saying "22 to decide" beside "22 to read" — two alarms, one pile,
                  and a keeper left choosing between them without being told which was hers.
                  Now the door she is standing in says the number out loud, and the rest only
                  say whether anything is behind them, with one small red mark. Quiet, and it
                  cannot lie about how much work exists. */}
              <span
                className="font-mono text-[9.5px] uppercase leading-none tracking-[0.05em]"
                style={{ color: on && waiting ? '#b3261e' : '#8a7f6d' }}
              >
                {on ? (
                  n === null ? '\u00a0' : n === 0 ? 'clear' : unit ? `${n} ${unit}` : `${n}`
                ) : waiting ? (
                  <span aria-label="work waiting" className="block h-[5px] w-[5px] rounded-full bg-[#b3261e]" />
                ) : (
                  '\u00a0'
                )}
              </span>
              <span className={`absolute inset-x-0 top-0 h-[2px] ${on ? 'bg-[#1e3a2b]' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}