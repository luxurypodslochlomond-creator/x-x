import React from 'react';

/* ── THE STRIP MAP ───────────────────────────────────────────────────────────────
   A road-book, not a diagram. Before anybody had a phone, the way to a place was
   written as a line down a page: every stop on it, and the honest distance between
   them. That is what this is — and it is the one map form that fits a phone, because
   it runs down the sheet instead of across it.

   Every figure here is one the house or the path's own authority gives, and the two
   that are somebody else's are said to be theirs. Nothing is rounded down to make the
   hill sound easier: the walk up is uphill, most of it, and the last stretch is a
   narrow road with no pavement. */
const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

const STOPS = [
  {
    tag: 'Air',
    name: 'Glasgow airport',
    fact: 'Twenty-five minutes by car, then the A82 up the side of the loch.',
  },
  {
    tag: 'Air',
    name: 'Edinburgh airport',
    fact: 'An hour and a quarter by car. The longer way, and the prettier one once the road reaches the water.',
  },
  {
    tag: 'Rail',
    name: 'Glasgow Queen Street',
    fact: 'About fifty minutes on the North Clyde line. Balloch is the end of it — you cannot overshoot.',
  },
  {
    tag: 'Rail',
    name: 'Balloch',
    fact: 'The last stop on the line. The village is behind you and the loch in front of you.',
  },
  {
    tag: 'Road',
    name: 'The roundabout',
    fact: 'Turn left here, up Stoneymollan Road. Straight on takes you up the side of the loch and away from the hill.',
  },
  {
    tag: 'Road',
    name: 'All the way up',
    fact: 'The best part of two miles of climbing: past the last houses, then narrow between the trees. Keep going — the cabins are at the top of it. There is no pavement and no lighting on the last stretch.',
  },
  {
    tag: 'Here',
    name: 'Stoneymollan',
    fact: 'The cabins, the fire pit, and the whole loch under you.',
  },
];

export default function WayInStrip() {
  return (
    <div className="mx-auto w-full max-w-[38rem] text-left">
      <ol className="relative ml-1.5 border-l border-record-ink/30 pl-5">
        {STOPS.map((stop) => (
          <li key={stop.name} className="relative pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[26px] top-[7px] h-2.5 w-2.5 rounded-full border ${
                stop.tag === 'Here'
                  ? 'border-record-mark bg-record-mark'
                  : 'border-record-ink/60 bg-record-paper'
              }`}
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-red">
              {stop.tag}
            </p>
            <p className="mt-0.5 text-[18px] leading-tight text-record-ink" style={SERIF}>
              {stop.name}
            </p>
            <p className="mt-1 text-[15.5px] leading-[1.6] text-record-ink/90" style={READING}>
              {stop.fact}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-5 border-t border-record-ink/20 pt-4 font-mono text-[10.5px] uppercase leading-[1.9] tracking-[0.1em] text-record-ink/85">
        Driving times are the house&rsquo;s own. The walking figures are the John Muir Way&rsquo;s
        own. Timetables change — the machine below checks today&rsquo;s for you.
      </p>
    </div>
  );
}