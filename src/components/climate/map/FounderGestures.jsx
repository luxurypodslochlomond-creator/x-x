import React from 'react';
import { Link } from 'react-router-dom';
import useGestureDoors from '@/components/climate/useGestureDoors';

/* ── THE SIZE A PERSON CAN START ────────────────────────────────────────────────────
   The plate above this prints 33.7 million people in need in one country and 840 million
   women beaten or violated in the world, and a reader finishing it had nothing to do. A
   figure with no next act is a mood. So Janine's own five sit directly under it, in her
   words, joined to the same sheet — the smallest size of the only thing that has ever
   moved a number like that.

   It is not a new list and it is not a summary of hers: it is the same five the record's
   home prints, read from one file, so the two pages cannot drift apart. */
export default function FounderGestures() {
  const doors = useGestureDoors();
  return (
    <section
      aria-labelledby="founder-gestures"
      className="border-2 border-t-0 border-[#141210] bg-[#f7f1e5] px-4 py-4 lg:px-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b3261e]">The smallest gestures</p>
      <h2 id="founder-gestures" className="mt-2 text-[18px] font-bold leading-tight text-[#141210] lg:text-[21px]">
        The numbers are the reason. This is the size a person can start.
      </h2>
      <p className="mt-2 max-w-[64ch] text-[13px] leading-relaxed text-[#3a342c]">
        Janine’s own five, in her words — small enough to start today, and free. Each one opens what
        the record actually holds on it, and says so plainly where it holds nothing.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {doors.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="border-2 border-record-ink bg-record-signal px-3 py-2 font-display text-xs font-bold uppercase tracking-wide text-record-ink underline decoration-transparent transition-colors hover:decoration-record-ink active:translate-y-px active:bg-record-ink active:text-record-paper"
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}