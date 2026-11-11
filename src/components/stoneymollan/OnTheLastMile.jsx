import React from 'react';
import { CALL_NUMBER, CALL_TEL } from '@/components/stoneymollan/links';

/* ── THE LAST MILE, AND THE PERSON DOING IT ALONE ────────────────────────────────
   Two things belong together, and neither is a map.

   The first is the telephone. There is no taxi card here any more: somebody who has just
   got off a train at Balloch does not need a firm's name, they need the two people who
   live at the top of the road. So the number is ours, written in full international form
   — +44 and no trunk zero — so it dials on one tap from a phone in Balloch, in Bordeaux
   or in Boston, and reads aloud as something a stranger abroad can actually dial.

   The second is for whoever arrives on their own. Not a warning box, not a lecture —
   four plain facts about the last two miles that somebody should have told them before
   they set off in the dark. The road has no pavement and no lights for the last of it,
   the hill postcode covers a lot of hillside, and a message is easier to send from the
   village than from the top of it. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

export default function OnTheLastMile() {
  return (
    <div className="mx-auto w-full max-w-[38rem] text-left">
      <div className="border border-record-ink/25 bg-record-bone px-4 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
          The last two miles
        </p>

        {/* The number is the loudest thing in the block, on its own line, because a
            number set beside a label is a number a nervous person misreads. One shape,
            one tap, and it dials from a phone in any country. */}
        <a
          href={CALL_TEL}
          className="mt-3 block border border-record-ink bg-record-paper px-4 py-3 text-center active:bg-record-ink active:text-record-paper"
        >
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
            Ring us &mdash; we are at the top of the road
          </span>
          <span className="mt-1 block font-mono text-[21px] font-black leading-none tracking-[0.02em]">
            {CALL_NUMBER}
          </span>
        </a>

        <p className="mt-3 text-[15px] leading-[1.6] text-record-ink/85" style={READING}>
          Ring before you leave the station. If we can come down for you, we will. If we
          cannot, we will say so straight and tell you what to do instead.
        </p>
      </div>

      <div className="mt-4 border border-record-ink/25 bg-record-paper px-4 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
          If you are coming on your own
        </p>
        <h3 className="mt-1.5 text-[20px] leading-tight text-record-ink" style={SERIF}>
          Nobody up here will trouble you.
        </h3>

        <ul className="mt-3 space-y-2.5 text-[15.5px] leading-[1.62] text-record-ink/90" style={READING}>
          <li>
            After dark, get a lift up from the station rather than walking it. The last of the
            road has no pavement and no lights, and it is uphill the whole way.
          </li>
          <li>
            Ask for Stoneymollan Road and &ldquo;all the way to the top&rdquo; rather than the
            postcode &mdash; one hill postcode covers a great deal of hillside.
          </li>
          <li>
            Send your &ldquo;I&rsquo;m here&rdquo; message from the village, and tell somebody at home
            you have got in. Easier from the foot of the hill than the top of it.
          </li>
          <li>
            The place is yours once you are in it. Nobody comes to the door unannounced, whatever
            time you arrive.
          </li>
        </ul>
      </div>
    </div>
  );
}