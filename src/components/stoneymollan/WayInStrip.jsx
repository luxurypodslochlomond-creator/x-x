import React from 'react';

/* ── THE STRIP MAP ───────────────────────────────────────────────────────────────
   A road-book, not a diagram. Before anybody had a phone, the way to a place was
   written as a line down a page: every stop on it, and the honest distance between
   them. That is what this is — and it is the one map form that fits a phone, because
   it runs down the sheet instead of across it.

   Two corrections, on the founder's challenge: "you sure two miles up hill?" The
   climb from the village to the cabins measures about a mile and a half along the
   road, not the best part of two, so that is what it says now. And "turn left at the
   roundabout" was a direction only true if you were facing the way we happened to be
   facing when we wrote it, so it just says turn off here.

   Each line is written to be read once, at a glance, standing up. Every figure is
   one the house or the trail's own authority gives. Nothing is rounded down to make
   the hill sound easier: it climbs the whole way, and the last stretch is narrow,
   unlit in places, with no pavement. */

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

const STOPS = [
  {
    tag: 'Air',
    name: 'Glasgow airport',
    fact: 'About twenty-five minutes by car, then the A82 up the side of the loch.',
  },
  {
    tag: 'Air',
    name: 'Edinburgh airport',
    fact: 'About an hour and a quarter. The longer road, and the better one once it reaches water.',
  },
  {
    tag: 'Rail',
    name: 'Glasgow Queen Street',
    fact: 'About fifty minutes on the North Clyde line. Balloch is where the rails run out.',
  },
  {
    tag: 'Rail',
    name: 'Balloch',
    fact: 'The last stop. Village behind you, the loch in front of you.',
  },
  {
    tag: 'Road',
    name: 'The roundabout',
    fact: 'Turn off here onto Stoneymollan Road. Straight on takes you up the loch and away from the hill.',
  },
  {
    tag: 'Road',
    name: 'The climb',
    fact: 'A mile and a half, and it climbs the whole way: past the last houses, then narrow between the trees. No pavement up here, and no lights on the last of it.',
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
          <li key={stop.name} className="relative pb-4 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[26px] top-[6px] h-2.5 w-2.5 rounded-full border ${
                stop.tag === 'Here'
                  ? 'border-record-mark bg-record-mark'
                  : 'border-record-ink/60 bg-record-paper'
              }`}
            />
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-record-red">
              {stop.tag}
            </p>
            <p className="mt-0.5 text-[17px] leading-[1.2] text-record-ink" style={SERIF}>
              {stop.name}
            </p>
            <p className="mt-1 text-[14.5px] leading-[1.5] text-record-ink/90" style={READING}>
              {stop.fact}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 border-t border-record-ink/20 pt-3 font-mono text-[9.5px] uppercase leading-[1.9] tracking-[0.1em] text-record-ink/70">
        Driving times are the house&rsquo;s own. Nine miles and four hours are the John Muir
        Way&rsquo;s. The mile and a half is the road&rsquo;s own measure. Timetables move — the
        machine below reads today&rsquo;s.
      </p>
    </div>
  );
}