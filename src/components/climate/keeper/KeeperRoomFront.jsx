import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

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
              Yes or not yet, one entry at a time. The record signs your name, seals the words and
              keeps the line — nothing else in this room is more urgent than that.
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

      {/* The quieter doors. */}
      {isKeeper && (
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t-2 border-[#141210]">
          {isChecker && (
            <Door
              Mark={MarkEye}
              label="A second look"
              count={toCheck}
              note="Open the source, say what you find"
              onClick={() => onGo('check')}
            />
          )}
          <Door
            Mark={MarkLedger}
            label="What the record holds"
            note="The counts, and who holds the keys"
            onClick={() => onGo('desk')}
          />
          <Door
            Mark={MarkRoot}
            label="Where it came from"
            note="Sourcing, and entries with no origin"
            onClick={() => onGo('score')}
          />
        </div>
      )}

      <p className="px-4 lg:px-6 py-3 border-t border-[#141210]/20 text-[9.5px] font-mono uppercase tracking-[0.12em] text-[#5a5246] leading-relaxed">
        One decision at a time, in daylight, signed with a name — that is the part that will still be readable in a thousand years.
      </p>
    </section>
  );
}

function Door({ Mark, label, count, note, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 px-4 py-3.5 text-left min-h-[62px] border-b-2 sm:border-b-0 sm:border-r-2 border-[#141210]/20 last:border-b-0 sm:last:border-r-0 hover:bg-[#141210]/5 active:bg-[#141210]/10 transition-colors"
    >
      <Mark size={24} className="text-[#141210] flex-shrink-0 mt-0.5" />
      <span className="min-w-0">
        <span className="flex items-baseline gap-2">
          <span className="text-[9.5px] font-black font-mono uppercase tracking-[0.14em] text-[#141210]">{label}</span>
          {typeof count === 'number' && (
            <span className="text-[10px] font-black font-mono text-[#b3261e] leading-none">{count}</span>
          )}
        </span>
        <span className="block text-[10px] font-mono text-[#5a5246] leading-snug mt-1">{note}</span>
      </span>
    </button>
  );
}