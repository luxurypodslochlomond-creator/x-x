import React from 'react';
import PageBand from '@/components/stoneymollan/PageBand';
import { RouteMark } from '@/components/stoneymollan/BandMarks';
import WayInStrip from '@/components/stoneymollan/WayInStrip';
import TheHillDrawn from '@/components/stoneymollan/TheHillDrawn';
import WayInMachine from '@/components/stoneymollan/WayInMachine';
import OnTheLastMile from '@/components/stoneymollan/OnTheLastMile';

/* ── THE WAY IN ─────────────────────────────────────────────────────────────────
   This used to be two paragraphs and a Google box, which is the shape of every
   holiday-let page on the internet and reads like a form to be filled in rather than
   a place being handed over.

   Now it is three things, in the order a traveller actually needs them: the strip map
   — every stop from the airport to the door, with the honest times; the hill drawn,
   with a real map underneath it that is not Google and does not want an account; and
   the machine, which takes where you are and when, and works the journey out.

   Short sentences still, because every word of this is read in whatever tongue the
   reader chose at the top of the page. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

const JMW = 'https://johnmuirway.org/';

export default function GettingHere() {
  return (
    <div id="getting-here" className="mx-auto w-full max-w-[44rem] scroll-mt-[116px] px-6 pb-12 md:scroll-mt-20">
      <PageBand label="Getting here" mark={RouteMark}>
        <p
          className="mx-auto mt-1 max-w-[40ch] text-center text-[15.5px] leading-[1.65] text-record-ink/90"
          style={READING}
        >
          Two ways in — the one that gets you here without a thought, and the one that earns
          the arrival. Both are true of this hill.
        </p>

        <div className="mt-7">
          <WayInStrip />
        </div>

        <div className="mt-8">
          <OnTheLastMile />
        </div>

        <div className="mt-8 border-t border-record-ink/20 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
            The way that earns it
          </p>
          <h3 className="mt-1.5 text-[21px] leading-tight text-record-ink" style={SERIF}>
            Over the muir, on foot
          </h3>
          <div className="mt-2 space-y-2 text-[16px] leading-[1.68] text-record-ink/90" style={READING}>
            <p>
              The John Muir Way crosses the muir above the cabins, and the Three Lochs Way runs
              with it. The path leaves the road at the end of our tree-lined drive.
            </p>
            <p>
              Helensburgh to Balloch is nine miles — about four hours walking — and it comes down
              onto Stoneymollan by the old coffin road. You arrive at the top with the whole loch
              under you, which is a better way to see it than through a windscreen.
            </p>
          </div>
        </div>

        <div className="mt-9">
          <TheHillDrawn />
        </div>

        <div className="mt-9 border-t border-record-ink/25 pt-7">
          <WayInMachine />
        </div>

        <p className="mx-auto mt-7 max-w-[40ch] text-center font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/85">
          Every word here reads in your own language — the tongue button at the top of the page.
          <a
            href={JMW}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block underline decoration-record-ink/30 underline-offset-4"
          >
            johnmuirway.org
          </a>
        </p>
      </PageBand>
    </div>
  );
}