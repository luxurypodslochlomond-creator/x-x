import React from 'react';
import { MarkStamp, MarkEye, MarkGate, MarkLedger, MarkRoot } from './KeeperMarks';

// ── THE SHED'S ONE ROW OF DOORS ────────────────────────────────────────────────
// The room used to open with a headline, a line of explanation, a big board of plates,
// then a second set of names underneath that reached the same places again — and only
// then the work. Four things to read before anything could be done, on a phone.
//
// This is one row of doors, sitting directly above the room it opens. All five fit a
// handset at once, so nothing is folded away and nothing has to be remembered; the count
// sits on the door it belongs to, so the number and the way to act on it are one thing.
//
// The marks are the shed's own (see KeeperMarks): a stamp for the yes, an eye for the
// second look, a door for who may come in, a ledger for what is held, a root for where a
// claim came from. One weight, one colour, no second set of icons anywhere.
const ROOMS = [
  { key: 'decide', Mark: MarkStamp, label: 'Say yes', count: 'yes' },
  { key: 'check', Mark: MarkEye, label: 'Read', count: 'read' },
  { key: 'people', Mark: MarkGate, label: 'People', count: 'asks' },
  { key: 'counts', Mark: MarkLedger, label: 'Counts' },
  { key: 'sourcing', Mark: MarkRoot, label: 'Sources' },
];

export default function ShedRail({ isKeeper, active, counts = {}, onGo }) {
  // A checker is a pair of eyes and nothing else, so their row is the one door they hold.
  const rooms = isKeeper ? ROOMS : ROOMS.filter((r) => r.key === 'check');

  return (
    <div className="climate-nav-rail -mx-4 mt-4 overflow-x-auto border-y border-[#141210]/15">
      <div className="flex w-max min-w-full items-stretch">
        {rooms.map((r) => {
          const on = active === r.key;
          const n = r.count ? counts[r.count] : null;
          const Mark = r.Mark;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onGo(r.key)}
              aria-current={on ? 'true' : undefined}
              className={`relative flex min-w-[64px] flex-1 flex-col items-center justify-center gap-1.5 border-b-2 px-2 py-3 transition-colors ${
                on
                  ? 'border-[#b3261e] text-[#141210]'
                  : 'border-transparent text-[#6b5f4f] active:text-[#141210]'
              }`}
            >
              <Mark size={24} />
              <span
                className="whitespace-nowrap text-[12px] leading-none"
                style={{ fontFamily: 'var(--font-reading)', fontWeight: on ? 600 : 500 }}
              >
                {r.label}
              </span>
              {typeof n === 'number' && n > 0 && (
                <span
                  className="absolute right-1 top-1 text-[11px] font-semibold leading-none text-[#b3261e]"
                  style={{ fontFamily: 'var(--font-reading)' }}
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}