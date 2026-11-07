import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { MarkKey } from './KeeperMarks';
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
        ? 'Nothing wants your yes.'
        : `${n} ${n === 1 ? 'thing wants' : 'things want'} your yes.`;

  return (
    <section className="mb-5 border-2 border-[#141210] bg-[#efe7d6]">
      <div className="px-4 lg:px-6 pt-4 pb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-[#b3261e] leading-none">
            The shed{name ? ` · ${name}` : ''}
          </p>
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-[9px] font-black font-mono uppercase tracking-[0.14em] text-[#5a5246] hover:text-[#b3261e] transition-colors min-h-[28px]"
          >
            <RefreshCw className="w-3 h-3" /> {failed ? 'count again' : 'recount'}
          </button>
        </div>

        {/* The one thing. Everything below it is deliberately smaller. */}
        <div className="mt-3 flex items-start gap-3.5">
          <MarkKey size={38} className="text-[#b3261e] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p
              className="font-black text-[#141210] leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(23px, 5vw, 32px)' }}
            >
              {headline}
            </p>
            <p
              className="mt-2 text-[12.5px] leading-relaxed text-[#3a342c]"
              style={{ fontFamily: 'var(--font-reading)' }}
            >
              Yes or not yet, one entry at a time. Nothing else in this room is more urgent.
            </p>
          </div>
        </div>

        <button
          onClick={() => onGo('decide')}
          className="mt-4 w-full flex items-center justify-between gap-3 min-h-[54px] px-4 bg-[#141210] text-[#f4efe4] border-2 border-[#141210] active:bg-[#b3261e] active:border-[#b3261e] transition-colors"
        >
          <span className="text-[10.5px] font-black font-mono uppercase tracking-[0.16em]">
            {n > 0 ? 'Take them one at a time' : 'Open the queue'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Every other door, in one square: the work, then the record it answers to. */}
      {isKeeper && (
        <ShedIndex waiting={waiting} toCheck={toCheck} isChecker={isChecker} onGo={onGo} />
      )}

      <p className="px-4 lg:px-6 py-3 border-t border-[#141210]/20 text-[9.5px] font-mono uppercase tracking-[0.12em] text-[#5a5246] leading-relaxed">
        One decision at a time, in daylight, signed with a name — that is the part that will still be readable in a thousand years.
      </p>
    </section>
  );
}