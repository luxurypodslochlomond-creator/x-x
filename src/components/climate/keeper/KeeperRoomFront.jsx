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
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const load = async () => {
    setFailed(false);
    setLoaded(false);
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
    } finally {
      // A checker has no decision queue, so its count is never a number. Without this the
      // room would tell a checker "Looking at what wants you…" for as long as it stayed open.
      setLoaded(true);
    }
  };

  useEffect(() => { load(); }, []);

  const n = waiting ?? 0;
  const checks = typeof toCheck === 'number' ? toCheck : 0;

  const headline = !loaded
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

  const under = !loaded
    ? 'One second.'
    : n > 0
    ? 'Yes puts it on the record, sealed and signed with your name. Not yet leaves it waiting, untouched.'
    : checks > 0
    ? isKeeper
      ? 'Open where it is claimed from and say what you find. Your note is signed in your name; nothing is published or changed.'
      : 'Open where each entry is claimed from and say what you find. Your note is signed in your name; nothing here publishes, edits or deletes anything.'
    : isKeeper
    ? 'Nothing needs your name today. Everything else is one tap away below.'
    : 'Nothing needs your eyes today. Every door on the board still opens.';

  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[12px] text-[#8a7f6d]" style={{ fontFamily: 'var(--font-reading)' }}>
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

      {/* The one thing the room has to say, said as the biggest thing in it. It used to be
          nineteen pixels under a label and a recount button — the same weight as the small
          print around it — which is how a room tells you nothing much is happening. */}
      <h2
        className="mt-2 text-[#141210]"
        style={{
          fontFamily: 'var(--font-reading)',
          fontSize: '27px',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          textWrap: 'pretty',
        }}
      >
        {headline}
      </h2>
      <p
        className="mt-2 text-[14px] leading-[1.55] text-[#2b2622]"
        style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
      >
        {under}
      </p>

      {/* ── SOMEBODY BESIDE YOU ────────────────────────────────────────────────
          A keeper doing this alone at eleven at night is how a record gets abandoned, and
          this one is kept by one person. So the room says out loud that the sorting is a
          conversation rather than an exam: the AI sits beside her, reads the source with
          her, and never holds the pen.
          One line, not a chat window — a chatbot bolted onto the front of the shed would
          put a second, softer voice in front of the record's own rules, and the rules are
          the whole point of the room. */}
      <div className="mb-5 mt-5 border-l-2 border-[#b3261e] pl-3.5">
        <p
          className="text-[14px] leading-[1.6] text-[#2b2622]"
          style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic', textWrap: 'pretty' }}
        >
          I'm sitting here with you. Push a door and we'll go through it line by line — I'll
          fetch the source and read it beside you, you say the yes.
        </p>
      </div>

      <ShedPortal
        counts={{ decide: waiting, check: toCheck, asks }}
        isKeeper={isKeeper}
        isChecker={isChecker}
        active={active}
        onGo={onGo}
      />
    </section>
  );
}