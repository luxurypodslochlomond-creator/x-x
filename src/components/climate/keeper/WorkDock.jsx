import React from 'react';
import { MarkStamp, MarkEye, MarkGate, MarkLedger } from './KeeperMarks';

// Four marks and one word per job. The phone keeps its index above the work;
// only the overview carries a count, so one queue never looks like two.
const TABS = [
  { id: 'decide', Mark: MarkStamp, word: 'Decide', unit: 'to decide', keeperOnly: true },
  { id: 'check', Mark: MarkEye, word: 'Check', unit: 'to read' },
  { id: 'people', Mark: MarkGate, word: 'People', unit: 'need attention', keeperOnly: true },
  { id: 'record', Mark: MarkLedger, word: 'Record', unit: '', keeperOnly: true },
];

export default function WorkDock({ counts, keeper, view, onView, failed }) {
  const tabs = TABS.filter((tab) => keeper || !tab.keeperOnly);

  return (
    <nav
      aria-label="The room's jobs"
      className="room-work-nav border-t border-record-ink/20 bg-record-bone lg:mt-3 lg:border-y"
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
              <span className="room-nav-mark"><Mark size={19} className={on ? 'text-[#1e3a2b]' : waiting ? 'text-[#b3261e]' : 'text-[#4a443a]'} /></span>
              <span
                className="room-nav-word text-[10.5px] font-semibold leading-none"
                style={{ fontFamily: 'var(--font-reading)', color: on ? '#1e3a2b' : '#141210' }}
              >
                {/* One name per job, on the phone and on the desk. The phone used to call the
                    same two doors "Review" and "Sources" while the desk called them "Decide" and
                    "Check", so a keeper moving between the two had to work out that they were
                    the same room. Same word everywhere: Decide, Check, People, Record. */}
                {word}
              </span>
              {!on && waiting && <span className="room-nav-dot hidden" aria-label="Work waiting" />}
              {/* ── ONLY THE DOOR YOU ARE IN PRINTS A NUMBER ──────────────────────────
                  There are two queues here that hold the same twenty-two entries, so the
                  dock was saying "22 to decide" beside "22 to read" — two alarms, one pile,
                  and a keeper left choosing between them without being told which was hers.
                  Now the door she is standing in says the number out loud, and the rest only
                  say whether anything is behind them, with one small red mark. Quiet, and it
                  cannot lie about how much work exists. */}
              <span
                className="room-nav-detail font-mono text-[9.5px] uppercase leading-none tracking-[0.05em]"
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
              <span className={`room-nav-indicator absolute inset-x-0 top-0 h-[2px] ${on ? 'bg-[#1e3a2b]' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}