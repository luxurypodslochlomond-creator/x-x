import React from 'react';
import { MarkStamp, MarkEye, MarkGate } from './KeeperMarks';

// ── THE ROOM'S MASTHEAD ────────────────────────────────────────────────────────
// The record has a masthead at the top of every page; the room where the work is done
// did not, so a keeper arrived at a sentence and a scroll and had to work out from the
// prose where she was and what was owed. This is the same idea one storey down: three
// marks across the top, each saying one job in a word, and under each one the only
// number that matters — has anything come in for it.
//
// Why marks and not just words: an eye, a stamp and a gateway are read in one glance on
// a phone, before any label is read at all, and they are the record's own engravings
// rather than a stock icon set — which is the difference between a page of this book and
// a page of any dashboard on earth. Why words as well: a mark nobody can name is a
// puzzle, and a puzzle at eleven at night is a headache. So both, always, in that order.
//
// Nothing here is a notification badge. A number means a piece of work exists, never
// that something is unread or unclicked — a count that can only be cleared by clicking
// is a slot machine, and this room is a desk.
const ROOMS = [
  {
    id: 'sources',
    Mark: MarkEye,
    word: 'Sources',
    unit: 'to read',
    line: 'Open a source and say what you found. Nothing on this side decides anything.',
  },
  {
    id: 'decide',
    Mark: MarkStamp,
    word: 'Decide',
    unit: 'to decide',
    line: 'One entry at a time: on the record, or not yet. Both are written down in your name.',
    keeperOnly: true,
  },
  {
    id: 'access',
    Mark: MarkGate,
    word: 'Access',
    unit: 'asking in',
    line: 'Who holds a key, and who is asking for one. Nothing here moves on one hand alone.',
    keeperOnly: true,
  },
];

export default function RoomMasthead({ counts, keeper, view, onView, failed }) {
  const rooms = ROOMS.filter((room) => keeper || !room.keeperOnly);
  const chosen = rooms.find((room) => room.id === view) || rooms[0];

  return (
    <div className="mt-4">
      <div
        className={`grid border-y border-[#141210]/20 ${rooms.length > 1 ? 'grid-cols-3' : 'grid-cols-1'}`}
      >
        {rooms.map(({ id, Mark, word, unit }, i) => {
          // A failed count is not a zero. When the question did not come back, the cell
          // says nothing rather than saying "clear" — the one lie this room cannot afford.
          const n = failed ? null : counts?.[id] ?? null;
          const on = chosen?.id === id;
          const waiting = (n || 0) > 0;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onView(id)}
              aria-pressed={on}
              className={`flex min-h-[76px] flex-col items-center justify-center gap-1.5 px-1 py-2.5 transition-colors ${
                i < rooms.length - 1 ? 'border-r border-[#141210]/20' : ''
              } ${on ? 'bg-[#efe7d6]' : 'bg-transparent active:bg-[#efe7d6]/60'}`}
            >
              <Mark size={22} className={waiting ? 'text-[#b3261e]' : 'text-[#3a342c]'} />
              <span
                className="text-[12px] font-semibold leading-none text-[#141210]"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {word}
              </span>
              <span
                className="font-mono text-[10.5px] uppercase leading-none tracking-[0.08em]"
                style={{ color: waiting ? '#b3261e' : '#8a7f6d' }}
              >
                {n === null ? '—' : n === 0 ? 'clear' : `${n} ${unit}`}
              </span>
              <span className={`block h-[2px] w-7 ${on ? 'bg-[#b3261e]' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>

      {/* What this particular job is, said once, under the mark you just chose. */}
      {chosen?.line && (
        <p
          className="mt-3 text-[13px] leading-[1.55] text-[#3a342c]"
          style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
        >
          {chosen.line}
        </p>
      )}
    </div>
  );
}