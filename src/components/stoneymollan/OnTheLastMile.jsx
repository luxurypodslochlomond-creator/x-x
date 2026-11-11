import React from 'react';
import { TAXI_NUMBER, TAXI_TEL } from '@/components/stoneymollan/links';

/* ── THE LAST MILE, AND THE PERSON DOING IT ALONE ────────────────────────────────
   Two things belong together, and neither is a map.

   The first is the taxi, and it is here for one honest reason: the house likes to
   collect a guest when it can, but looking after the people already up the hill comes
   first, so a lift is a maybe and a taxi is a certainty. Saying that out loud is the
   point. A page that quietly leaves the collection out leaves a guest standing at a
   station wondering why nobody came.

   The number is Wright's own, off their own site and their own shop front on Main
   Street in Alexandria — 01389 721020, twenty-four hours. It is not a guess and it is
   not a partner link: it is the firm a person in that village would ring.

   The second is for whoever arrives on their own. Not a warning box, not a lecture —
   three plain facts about the last two miles that somebody should have told them
   before they set off in the dark. The road has no pavement and no lights for the last
   of it, the hill postcode covers a lot of hillside, and a message is easier to send
   from the village than from the top. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

export default function OnTheLastMile() {
  return (
    <div className="mx-auto w-full max-w-[38rem] text-left">
      <div className="border border-record-ink/25 bg-record-bone px-4 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
          The last two miles
        </p>

        <p className="mt-2 text-[16px] leading-[1.68] text-record-ink/90" style={READING}>
          We will come and get you if we can — but we cannot always manage it, because looking
          after the people already here comes first. So do not bank on the lift. Wright&rsquo;s is
          the sure thing, and the climb is worth it either way.
        </p>

        <a
          href={TAXI_TEL}
          className="mt-4 flex min-h-[52px] items-center justify-between gap-3 border border-record-ink bg-record-paper px-4 active:bg-record-ink active:text-record-paper"
        >
          <span className="font-mono text-[11px] uppercase leading-tight tracking-[0.14em]">
            Wright&rsquo;s Taxis
            <span className="mt-1 block text-[10px] tracking-[0.1em] opacity-70">
              Alexandria &middot; twenty-four hours
            </span>
          </span>
          <span className="font-mono text-[15px] font-black tracking-[0.04em]">{TAXI_NUMBER}</span>
        </a>

        <p className="mt-3 text-[15px] leading-[1.6] text-record-ink/85" style={READING}>
          Tell the driver <strong className="font-normal">Stoneymollan Road, all the way to the top
          of the hill</strong>. Not the loch road — that one takes you up the water and away from us.
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
            After dark, take the taxi up from the station rather than walking it. The last of the
            road has no pavement and no lights, and it is uphill the whole way.
          </li>
          <li>
            Give the driver the road and &ldquo;all the way up&rdquo; rather than the postcode — one
            hill postcode covers a great deal of hillside.
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