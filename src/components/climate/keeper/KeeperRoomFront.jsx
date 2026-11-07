import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { RefreshCw } from 'lucide-react';
import ShedPortal from './ShedPortal';

// ── THE FRONT IS A BOARD, NOT A PARAGRAPH ───────────────────────────────────────
// This room used to open with a headline, a line of explanation, a button for the one
// job, then a folded-away list of doors, then a row of tabs to reach the same doors a
// second way. Every one of those was reasonable and together they were a corridor:
// to get anywhere you had to read the room first.
//
// So the front says one thing — how much wants you — and then it is a board of marks.
// A tap lands in the room; the number wanting you sits on the mark itself; the room you
// are in wears the red line. Nothing is folded away, because a door you cannot see is a
// door you have to remember.
//
// Nothing here decides anything. These are marks on a wall, and the work happens in the
// room behind them, where the name is signed and the seal is taken.
export default function KeeperRoomFront({ name, isKeeper, isChecker, active, onGo }) {
  const [waiting, setWaiting] = useState(null);
  const [toCheck, setToCheck] = useState(null);
  const [asks, setAsks] = useState(null);
  const [failed, setFailed] = useState(false);

  const load = async () => {
    setFailed(false);
    try {
      if (isKeeper) {
        const q = await base44.functions
          .invoke('climateKeeperRoom', { action: 'queue' })
          .catch(() => null);
        if (!q) setFailed(true);
        else setWaiting((q.data?.waiting || []).length);

        // Somebody asking to be put on the list is the quietest thing in the shed and the
        // most time-sensitive: a person is waiting at a door. It gets a number of its own.
        const r = await base44.functions
          .invoke('climateAccessChange', { action: 'roster' })
          .catch(() => null);
        if (r?.data?.waiting) setAsks(r.data.waiting.length);
      }
      if (isChecker) {
        const res = await base44.functions.invoke('checkerQueue', {});
        setToCheck((res.data?.entries || []).length);
      }
    } catch (e) {
      setFailed(true);
    }
  };

  useEffect(() => { load(); }, []);

  const known = typeof waiting === 'number';
  const n = waiting ?? 0;
  const checks = typeof toCheck === 'number' ? toCheck : 0;

  const headline = !known
    ? 'Looking at what wants you…'
    : n > 0
    ? n === 1
      ? 'One entry wants your yes.'
      : `${n} entries want your yes.`
    : checks > 0
    ? checks === 1
      ? 'One source is waiting to be read.'
      : `${checks} sources are waiting to be read.`
    : 'Nothing is waiting on you.';

  const under = !known
    ? 'One second.'
    : n > 0
    ? 'Yes puts it on the record, sealed and signed with your name. Not yet leaves it waiting, untouched.'
    : checks > 0
    ? 'Open where it is claimed from and say what you find. Your note is signed in your name; nothing is published or changed.'
    : 'Nothing needs your name today. Everything else is one tap away below.';

  return (
    <section className="mb-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
          The shed{name ? ` · ${name}` : ''}
        </p>
        <button
          onClick={load}
          className="flex items-center gap-1.5 min-h-[32px] text-[12px] text-[#6b5f4f] active:text-[#b3261e] transition-colors"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          <RefreshCw className="w-3 h-3" /> {failed ? 'count again' : 'recount'}
        </button>
      </div>

      <h2
        className="mt-2 text-[#1a1612] font-semibold"
        style={{ fontFamily: 'var(--font-reading)', fontSize: '21px', lineHeight: 1.3, letterSpacing: '0' }}
      >
        {headline}
      </h2>
      <p className="mt-1.5 mb-4 text-[14px] leading-[1.6] text-[#2b2622]" style={{ fontFamily: 'var(--font-reading)' }}>
        {under}
      </p>

      <ShedPortal
        counts={{ decide: waiting, check: toCheck, asks }}
        isChecker={isChecker}
        active={active}
        onGo={onGo}
      />
    </section>
  );
}