import React from 'react';
import PageBand from './PageBand';
import { SquirrelMark, DeerMark, PawMark, OtterMark, BirdMark, MyceliumMark } from './StoneymollanIcons';
import TheSquirrelsNote from './TheSquirrelsNote';
import TheWoodBirdsNote from './TheWoodBirdsNote';
import TheMyceliumNote from './TheMyceliumNote';

const READING = { fontFamily: 'var(--font-record-reading)' };

/* What is actually here. Squirrels, deer, the field edges at night, the birds the
   west-coast oakwoods are the last refuge for, and the fungal threads under all of
   it — with the argument about the threads left standing, because it genuinely is
   still an argument. */
/* Each mark is set down on its own plate, a little off true and straightening under a
   finger — the same stamped tilt the doors use, so the animals belong to the same sheet
   as the history instead of sitting in a list of bullet points. The tilt is a literal
   class string, never built from a variable, or the build would strip it. */
const LIFE = [
  {
    Mark: SquirrelMark,
    name: 'Red squirrel',
    tilt: '-rotate-[1.6deg]',
    line: 'Back in Balloch park after more than fifty years away. You hear one before you see it — scrabbling in the canopy, then a russet blur going round the far side of a trunk.',
  },
  {
    Mark: DeerMark,
    name: 'Roe deer',
    tilt: 'rotate-[1.2deg]',
    line: 'In the long grass at the top, at first and last light. Usually a shape you half-see and then doubt.',
  },
  {
    Mark: PawMark,
    name: 'Badger and fox',
    tilt: '-rotate-[0.8deg]',
    line: 'The field edges, after dark. The wood is at its busiest when there is nothing to see.',
  },
  {
    Mark: OtterMark,
    name: 'Otter',
    tilt: 'rotate-[1.8deg]',
    line: 'The Leven below the loch, and the shallows at the foot of it.',
  },
  {
    Mark: BirdMark,
    name: 'Osprey',
    tilt: '-rotate-[1.3deg]',
    /* The month list says the last week of March, so this says the same thing. Two
       slightly different spring dates on one sheet is the kind of smear a reader
       notices even when neither of them is wrong. */
    line: 'Over the loch from the last week of March into September, fishing. Big, slow wingbeats, and then a dive. The park authority’s own window, not a guess.',
  },
];

export default function Wildlife() {
  return (
    <section id="wildlife" className="scroll-mt-[116px] border-t border-record-ink/25 bg-record-bone md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[44rem] px-6 py-10">
        <PageBand first label="The wood is not empty" title="What lives here">
          <p className="mx-auto max-w-[46ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
            This hill is not quiet. It is busy at a smaller size.
          </p>

          <ul className="mx-auto mt-5 max-w-[46ch] divide-y divide-record-ink/15 border-y border-record-ink/25">
            {LIFE.map(({ Mark, name, line, tilt }) => (
              <li key={name} className="flex items-start gap-4 py-4 text-left">
                <span
                  className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center border border-record-ink/30 bg-record-paper transition-transform duration-200 ease-out hover:rotate-0 active:rotate-0 ${tilt}`}
                >
                  <Mark className="h-8 w-8 text-record-ink" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-record-ink">
                    {name}
                  </p>
                  <p className="mt-1 text-[15.5px] leading-[1.6] text-record-ink/90" style={READING}>
                    {line}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* The one line here likely to be repeated by a reader is the fifty years,
              so it gets a door: what is published, and which part is memory. */}
          <div className="mt-3 text-center">
            <TheSquirrelsNote />
          </div>

          <p className="mx-auto mt-5 max-w-[46ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
            In summer the west-coast oakwoods fill with wood warbler, redstart and pied
            flycatcher — birds that have almost nowhere else left in Britain. Loch Lomond’s
            woods are among the most important in Europe for mosses and lichens, this wet
            west-coast woodland being as rare a thing as it is unglamorous. That wood is
            this hill: the loch straight below it, and the rain that makes it what it is.
          </p>

          {/* The oakwoods paragraph carries a count and a superlative, so it gets a
              door of its own: who counted the birds, and whose words the "among the
              most important in Europe" belongs to. */}
          <div className="mt-3 text-center">
            <TheWoodBirdsNote />
          </div>

          <div className="mx-auto mt-7 max-w-[46ch] border-t border-record-ink/20 pt-6">
            <MyceliumMark className="mx-auto h-12 w-12 text-record-mark" />
            <p className="mt-3 text-center font-mono text-[11.5px] uppercase tracking-[0.14em] text-record-ink">
              Underneath
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
              Almost every tree on this hill is in partnership with a fungus. Threads finer
              than a hair run out through the soil into the roots, and trade water and
              minerals for the sugar the tree makes in the sun. The trees really are joined
              up — that part is settled. Whether the old ones are deliberately feeding the
              young ones through it is still being argued over by the people who study it,
              so this page won’t tell you they are.
            </p>
            <div className="mt-3 text-center">
              <TheMyceliumNote />
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-[40ch] font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/85">
            Scottish Wildlife Trust &middot; RSPB Scotland Loch Lomond &middot; NatureScot &middot; Loch Lomond
            &amp; Trossachs National Park Authority &middot; The Clydesider, 2022
          </p>
        </PageBand>
      </div>
    </section>
  );
}