import React from 'react';

/* ── WHY THIS WAY ──────────────────────────────────────────────────────────────
   A traveller does not need a menu of everything that exists between them and a
   hill. They need the reason one way in is the right one, said once, short enough
   to still remember on a platform with a bag in each hand.

   So three answers, and each of them is a fact rather than a flourish: the North
   Clyde line really does stop at Balloch, so the train cannot be overshot; only one
   road climbs this hill, and it is about a mile and a half of it; and the first
   section of the John Muir Way, which the Three Lochs Way shares, walks right past
   the foot of the drive. Nine miles and four hours are the trail's own figures.
   Nothing here is a superlative invented to sell a bed. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

const REASONS = [
  {
    tag: 'Rail',
    name: 'Balloch',
    why: 'The end of the line, which is the whole argument. Queen Street in about fifty minutes, then the rails stop at the water — there is nothing to miss and nowhere to overshoot.',
  },
  {
    tag: 'Road',
    name: 'The hill road',
    why: 'Only one goes up. Off the roundabout onto Stoneymollan Road and climb: a mile and a half, past the last houses, then narrow between the trees.',
  },
  {
    tag: 'Foot',
    name: 'Over the muir',
    why: 'The first nine miles of the John Muir Way run past the foot of the drive, the Three Lochs Way alongside. Four hours from Helensburgh, and the whole loch under you the way up.',
  },
];

export default function WhyThisWay() {
  return (
    <div className="mx-auto w-full max-w-[38rem] text-left">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">
        Why this way
      </p>

      <ul className="mt-2.5 border-y border-record-ink/20">
        {REASONS.map((reason) => (
          <li key={reason.tag} className="border-b border-record-ink/15 py-3 last:border-b-0">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[17.5px] leading-[1.2] text-record-ink" style={SERIF}>
                {reason.name}
              </p>
              <p className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-record-ink/55">
                {reason.tag}
              </p>
            </div>
            <p
              className="mt-1 text-[14.5px] leading-[1.5] text-record-ink/85"
              style={READING}
            >
              {reason.why}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}