import React from 'react';
import PageBand from './PageBand';
import { SquirrelMark, DeerMark, PawMark, OtterMark, BirdMark, MyceliumMark } from './StoneymollanIcons';

const READING = { fontFamily: 'var(--font-record-reading)' };

/* What is actually here. Squirrels, deer, the field edges at night, the birds the
   west-coast oakwoods are the last refuge for, and the fungal threads under all of
   it — with the argument about the threads left standing, because it genuinely is
   still an argument. */
const LIFE = [
  {
    Mark: SquirrelMark,
    name: 'Red squirrel',
    line: 'Back in Balloch park after more than fifty years away. You hear one before you see it — scrabbling in the canopy, then a russet blur going round the far side of a trunk.',
  },
  {
    Mark: DeerMark,
    name: 'Roe deer',
    line: 'In the long grass at the top, at first and last light. Usually a shape you half-see and then doubt.',
  },
  {
    Mark: PawMark,
    name: 'Badger and fox',
    line: 'The field edges, after dark. The wood is at its busiest when there is nothing to see.',
  },
  {
    Mark: OtterMark,
    name: 'Otter',
    line: 'The Leven below the loch, and the shallows at the foot of it.',
  },
  {
    Mark: BirdMark,
    name: 'Osprey',
    line: 'Over the loch from mid-March into September, fishing. Big, slow wingbeats, and then a dive. The park authority’s own window, not a guess.',
  },
];

export default function Wildlife() {
  return (
    <section id="wildlife" className="scroll-mt-20 border-t border-record-ink/25 bg-record-bone">
      <div className="mx-auto w-full max-w-[44rem] px-6 py-10">
        <PageBand first label="The wood is not empty" title="What lives here">
          <p className="mx-auto max-w-[46ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
            This hill is not quiet. It is busy at a smaller size.
          </p>

          <ul className="mx-auto mt-5 max-w-[46ch] divide-y divide-record-ink/15 border-y border-record-ink/25">
            {LIFE.map(({ Mark, name, line }) => (
              <li key={name} className="flex items-start gap-3 py-3.5 text-left">
                <Mark className="mt-0.5 h-6 w-6 shrink-0 text-record-ink/70" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-record-ink">
                    {name}
                  </p>
                  <p className="mt-1 text-[15px] leading-[1.6] text-record-ink/80" style={READING}>
                    {line}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-5 max-w-[46ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
            In summer the west-coast oakwoods fill with wood warbler, redstart and pied
            flycatcher — birds that have almost nowhere else left in Britain. Loch Lomond’s
            woods are among the most important in Europe for mosses and lichens, this wet
            west-coast woodland being as rare a thing as it is unglamorous. This hill is the
            same rain, the same coast, a few miles down the road.
          </p>

          <div className="mx-auto mt-7 max-w-[46ch] border-t border-record-ink/20 pt-6">
            <MyceliumMark className="mx-auto h-9 w-9 text-record-mark" />
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
          </div>

          <p className="mx-auto mt-5 max-w-[40ch] font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/85">
            Scottish Wildlife Trust &middot; RSPB Scotland Loch Lomond &middot; NatureScot &middot; The Clydesider, 2022
          </p>
        </PageBand>
      </div>
    </section>
  );
}