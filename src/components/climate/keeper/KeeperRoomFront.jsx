import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, RefreshCw } from 'lucide-react';
import ShedIndex from './ShedIndex';

// ── WHAT WANTS YOU FIRST ─────────────────────────────────────────────────────────
// A keeper opens this room and the room answers one question before any other: what
// wants your yes. Everything else stands below that and quieter than it, because a
// person who has to work out where to start will start in the wrong place on a bad
// morning, and the record cannot afford that.
//
// The counts are asked for when the page opens and never remembered from yesterday.
// Nothing here decides anything: these are doors, and the work happens in the room
// behind them, where the name is signed and the seal is taken.
//
// Set as a page of the record and nothing more: paper, hairline, one red number. The
// shape it wore before — warm card, round seals, a pill to press — was colour doing the
// work type should do, and it dated the room. A keeper does not need to be charmed into
// the work; they need to see what is waiting.
export default function KeeperRoomFront({ name, isKeeper, isChecker, onGo }) {
  const [waiting, setWaiting] = useState(null);
  const [toCheck, setToCheck] = useState(null);
  const [failed, setFailed] = useState(false);

  const load = async () => {
    setFailed(false);
    try {
      if (isKeeper) {
        const res = await base44.functions.invoke('climateKeeperRoom', { action: 'queue' });
        if (res.data?.error) setFailed(true);
        else setWaiting((res.data?.waiting || []).length);
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

  const n = waiting ?? 0;
  const headline =
    waiting === null
      ? 'Looking at what wants you…'
      : n === 0
      ? 'Nothing is waiting on you.'
      : `${n} ${n === 1 ? 'entry is' : 'entries are'} waiting for a keeper.`;

  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between gap-3 border-b border-[#141210]/20 pb-2">
        <p className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#6b5f4f]">
          Keeper{name ? ` · ${name}` : ''}
        </p>
        <button
          onClick={load}
          className="flex items-center gap-1.5 text-[11.5px] text-[#6b5f4f] active:text-[#b3261e] transition-colors min-h-[32px]"
        >
          <RefreshCw className="w-3 h-3" /> {failed ? 'count again' : 'recount'}
        </button>
      </div>

      {/* The one thing, and everything below it smaller than it. */}
      <p
        className="mt-4 text-[#141210] font-semibold"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 5.4vw, 31px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
      >
        {headline}
      </p>
      <p className="mt-2 text-[14.5px] leading-[1.65] text-[#3a342c]" style={{ fontFamily: 'var(--font-reading)' }}>
        Yes or not yet, one entry at a time. Nothing else in this room is more urgent.
      </p>

      <button
        onClick={() => onGo('decide')}
        className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[13.5px] font-semibold text-[#141210] border-b-2 border-[#b3261e] active:text-[#b3261e] transition-colors"
      >
        {n > 0 ? 'Take them one at a time' : 'Open the queue'}
        <ArrowRight className="w-4 h-4" />
      </button>

      {isKeeper && (
        <div className="mt-6">
          <ShedIndex waiting={waiting} toCheck={toCheck} isChecker={isChecker} onGo={onGo} />
        </div>
      )}

      <p className="mt-6 pt-3 border-t border-[#141210]/12 text-[12.5px] leading-relaxed text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
        One decision at a time, in daylight, signed with a name — that is the part that will still be readable in a thousand years.
      </p>
    </section>
  );
}