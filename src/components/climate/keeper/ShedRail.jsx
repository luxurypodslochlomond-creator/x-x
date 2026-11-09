import React from 'react';

// ── THE SHED'S ONE ROW OF DOORS, IN WORDS ──────────────────────────────────────
// A drawn mark only works if the thing behind it is obvious, and behind these doors it
// is not: a stamp, an eye, a keyhole and a ledger are four pictures nobody has to read,
// which is exactly what makes them slower than four words. So the pictures are gone and
// the doors say what they open — "Say yes", "Read", "People", "Counts", "Sources" — with
// one line of plain English under each, so a keeper never has to remember which door a
// drawing meant.
//
// Two lines and a number, five across a handset, nothing folded away and nothing to
// scroll: the whole room in the space one icon used to take.
const ROOMS = [
  { key: 'decide', label: 'Say yes', under: 'entries waiting', count: 'yes' },
  { key: 'check', label: 'Read', under: 'sources sent', count: 'read' },
  { key: 'people', label: 'People', under: 'who comes in', count: 'asks' },
  { key: 'counts', label: 'Counts', under: 'what is held' },
  { key: 'sourcing', label: 'Sources', under: 'where from' },
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
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onGo(r.key)}
              aria-current={on ? 'true' : undefined}
              className={`relative flex min-w-[72px] flex-1 flex-col items-start justify-start gap-0.5 border-b-2 px-2.5 pb-2.5 pt-3 text-left transition-colors ${
                on
                  ? 'border-[#b3261e] text-[#141210]'
                  : 'border-transparent text-[#4a4238] active:text-[#141210]'
              }`}
            >
              <span
                className="text-[13px] leading-[1.1]"
                style={{ fontFamily: 'var(--font-reading)', fontWeight: on ? 600 : 500 }}
              >
                {r.label}
              </span>
              <span
                className="text-[9.5px] leading-[1.25]"
                style={{ fontFamily: 'var(--font-reading)', color: '#8a7f6d' }}
              >
                {r.under}
              </span>
              {typeof n === 'number' && n > 0 && (
                <span
                  className="absolute right-1.5 top-1.5 text-[11px] font-semibold leading-none text-[#b3261e]"
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