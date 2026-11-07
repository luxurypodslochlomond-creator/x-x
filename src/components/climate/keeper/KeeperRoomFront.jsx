import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, RefreshCw, ChevronDown } from 'lucide-react';
import ShedIndex from './ShedIndex';
import ShedPlate from './ShedPlate';

// ── ONE THING, AND THE REST PUT AWAY ────────────────────────────────────────────
// This room used to open with a headline, a line of explanation, a button, three groups of
// doors and four more links before the work itself — correct, and too much to hold at once
// on a phone. A room that explains itself is a room you have to read before you can work in.
//
// So the front does one thing: it names the single job in front of you, in a sentence, and
// puts one finger on it. Everything else in the shed still exists and is one tap away under
// "the rest of the shed", which is open by itself on the quiet days when there is no job to
// point at — a dead end is worse than a list.
//
// Nothing here decides anything. These are doors, and the work happens in the room behind
// them, where the name is signed and the seal is taken.
export default function KeeperRoomFront({ name, isKeeper, isChecker, onGo }) {
  const [waiting, setWaiting] = useState(null);
  const [toCheck, setToCheck] = useState(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

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

  const known = typeof waiting === 'number';
  const n = waiting ?? 0;
  const checks = typeof toCheck === 'number' ? toCheck : 0;

  const job =
    n > 0
      ? { go: 'decide', label: 'Take them one at a time', to: 'Yes or not yet' }
      : checks > 0
      ? { go: 'check', label: 'Open a source, write a note', to: 'Read & note' }
      : null;

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
    : job && job.go === 'decide'
    ? 'Yes puts it on the record, sealed and signed with your name. Not yet leaves it waiting, untouched.'
    : job
    ? 'Open where it is claimed from and say what you find. Your note is signed in your name; nothing is published or changed.'
    : 'The queue is clear. Nothing needs your name today — the rest of the shed is below.';

  const showIndex = open || (!job && known);

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

      {/* The plate: the room's one picture, and the only red mark on it. */}
      <div className="border-y border-[#141210]/20 py-4 my-4 flex justify-center">
        <ShedPlate height={96} className="text-[#141210]" />
      </div>

      <h2
        className="text-[#1a1612] font-semibold"
        style={{ fontFamily: 'var(--font-reading)', fontSize: '21px', lineHeight: 1.35, letterSpacing: '0' }}
      >
        {headline}
      </h2>
      <p className="mt-2 text-[15px] leading-[1.7] text-[#2b2622]" style={{ fontFamily: 'var(--font-reading)' }}>
        {under}
      </p>

      {job && (
        <button
          onClick={() => onGo(job.go)}
          className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[13.5px] font-semibold text-[#141210] border-b-2 border-[#b3261e] active:text-[#b3261e] transition-colors"
        >
          {job.label}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={showIndex ? 'true' : 'false'}
        className="mt-5 w-full min-h-[44px] flex items-center justify-between gap-2 border-t border-[#141210]/20 pt-3 text-[13px] text-[#6b5f4f] active:text-[#141210] transition-colors"
        style={{ fontFamily: 'var(--font-reading)' }}
      >
        <span>{showIndex ? 'Put the rest of the shed away' : 'The rest of the shed'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showIndex ? 'rotate-180' : ''}`} />
      </button>

      {showIndex && (
        <div className="mt-3">
          <ShedIndex waiting={waiting} toCheck={toCheck} isChecker={isChecker} onGo={onGo} />
        </div>
      )}
    </section>
  );
}