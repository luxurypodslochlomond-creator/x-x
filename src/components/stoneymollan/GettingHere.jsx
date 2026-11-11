import React from 'react';
import PageBand from '@/components/stoneymollan/PageBand';
import { RouteMark } from '@/components/stoneymollan/BandMarks';
import WayInStrip from '@/components/stoneymollan/WayInStrip';
import WhyThisWay from '@/components/stoneymollan/WhyThisWay';
import TheHillDrawn from '@/components/stoneymollan/TheHillDrawn';
import WayInMachine from '@/components/stoneymollan/WayInMachine';
import OnTheLastMile from '@/components/stoneymollan/OnTheLastMile';
import TheRoadNote from '@/components/stoneymollan/TheRoadNote';

/* ── THE WAY IN ─────────────────────────────────────────────────────────────────
   This began as two paragraphs and a Google box: the shape of every holiday-let page
   on the internet, and it read like a form to be filled in rather than a place being
   handed over. Then it swung the other way and read like an undertaker's travel agent
   — every line a warning, every paragraph bracing somebody for bad news.

   It is four things now, in the order a traveller actually wants them:

     1. the strip map — every stop from the airport to the door, honest times, read
        once at a glance standing up;
     2. why this way — three reasons, each a fact, so nobody has to take our word
        that the train is the easy one;
     3. the machine — where you are and when, and it reads today's timetables;
     4. the last mile and a half — the plain things worth knowing once the way in is
        picked.

   Then the walk, for anyone with the legs and the light for it, with a pop-up for
   the road under their feet. Short sentences throughout, because every word of this
   is read in whatever tongue the reader picked at the top of the page. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

const JMW = 'https://johnmuirway.org/';

export default function GettingHere() {
  return (
    <div id="getting-here" className="mx-auto w-full max-w-[44rem] scroll-mt-[116px] px-6 pb-12 md:scroll-mt-20">
      <PageBand label="Getting here" mark={RouteMark}>
        <p
          className="mx-auto mt-1 max-w-[38ch] text-center text-[15.5px] leading-[1.55] text-record-ink/90"
          style={READING}
        >
          Two ways up. The train to Balloch and a lift for the last mile and a half — or nine
          miles over the muir on the John Muir Way, with the whole loch under you at the end.
        </p>

        <div className="mt-6">
          <WayInStrip />
        </div>

        <div className="mt-7">
          <WhyThisWay />
        </div>

        <div className="mt-7 border-t border-record-ink/25 pt-6">
          <WayInMachine />
        </div>

        <div className="mt-7">
          <OnTheLastMile />
        </div>

        <div className="mt-8 border-t border-record-ink/20 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">
            The way that earns it
          </p>
          <h3 className="mt-1.5 text-[21px] leading-tight text-record-ink" style={SERIF}>
            Over the muir, on foot
          </h3>
          <div className="mt-2 space-y-2 text-[15px] leading-[1.55] text-record-ink/90" style={READING}>
            <p>
              The path leaves the road at the end of our tree-lined drive — the John Muir Way
              and the Three Lochs Way running together over the muir above the cabins.
            </p>
            <p>
              Helensburgh to Balloch is nine miles, about four hours, and it comes down off the
              muir by the old coffin road with the loch under you the whole way down. A better
              way to see it than through a windscreen.
            </p>
          </div>

          <TheRoadNote />
        </div>

        <div className="mt-8">
          <TheHillDrawn />
        </div>

        <p className="mx-auto mt-6 max-w-[38ch] text-center font-mono text-[10px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/75">
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