import React from 'react';
import PageBand from '@/components/stoneymollan/PageBand';
import { RouteMark } from '@/components/stoneymollan/BandMarks';

/* ── HOW TO GET HERE ──────────────────────────────────────────────────────────
   Two ways, said plainly: the one that gets you here without a thought, and the
   one that earns the arrival. Both are true of this hill — the road up from
   Balloch, and the old coffin road over the muir that the John Muir Way and the
   Three Lochs Way now share, which leaves the tarmac at the end of the tree-lined
   drive.

   Short sentences on purpose. Every word of this is read in whatever tongue the
   reader chose at the top of the page, and a long clause translates into a mess.

   Nothing here is guessed. The driving times are the ones the house itself gives
   its guests; the nine miles and the four hours are the John Muir Way's own
   figures for the Helensburgh to Balloch section. */

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Stoneymollan%2C+Balloch%2C+Loch+Lomond';
const MAP_EMBED =
  'https://maps.google.com/maps?q=Stoneymollan%2C+Balloch%2C+Loch+Lomond&z=13&output=embed';
const JMW = 'https://johnmuirway.org/';

function Way({ kicker, title, children }) {
  return (
    <div className="border-t border-record-ink/15 pt-4 text-left first:border-t-0 first:pt-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-record-red">{kicker}</p>
      <h3 className="mt-1.5 text-[19px] leading-tight text-record-ink" style={SERIF}>
        {title}
      </h3>
      <div
        className="mt-2 space-y-2 text-[16px] leading-[1.68] text-record-ink/90"
        style={READING}
      >
        {children}
      </div>
    </div>
  );
}

export default function GettingHere() {
  return (
    <div id="getting-here" className="mx-auto w-full max-w-[44rem] scroll-mt-20 px-6 pb-12">
      <PageBand label="Getting here" mark={RouteMark}>
        <div className="mx-auto mt-2 max-w-[40ch] space-y-5">
          <Way kicker="The easy way" title="Into Balloch, then up the hill">
            <p>
              Balloch sits at the south end of the loch. The cabins are on the hill above it, and
              one road climbs from the village to the top.
            </p>
            <p>
              By car: the A82, then Balloch. About twenty-five minutes from Glasgow airport, an
              hour and a quarter from Edinburgh.
            </p>
            <p>
              By train: Balloch has its own station at the end of the line from Glasgow. From
              there a taxi takes minutes — easier than walking the road up in the dark.
            </p>
          </Way>

          <Way kicker="The beautiful way" title="Over the muir, on foot">
            <p>
              The John Muir Way crosses the muir above the cabins, and the Three Lochs Way runs
              with it. The path leaves the road at the end of our tree-lined drive.
            </p>
            <p>
              Helensburgh to Balloch is nine miles — about four hours walking — and it comes down
              onto Stoneymollan by the old coffin road.
            </p>
            <p>
              You arrive at the top with the whole loch under you, which is a better way to see it
              than through a windscreen.
            </p>
          </Way>

          <p className="pt-1 font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink">
            No car needed &middot; train to Balloch, then the hill
          </p>
        </div>

        <a
          href={MAPS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-[48px] w-full items-center justify-center border-2 border-record-ink px-4 font-mono text-[11.5px] uppercase tracking-[0.13em] text-record-ink active:bg-record-ink active:text-record-paper"
        >
          Open the map
        </a>

        <div className="mt-5 border border-record-ink/25 bg-record-bone">
          <iframe
            title="Stoneymollan, on the hill above Balloch"
            src={MAP_EMBED}
            loading="lazy"
            className="block h-[260px] w-full sm:h-[320px]"
            style={{ border: 0 }}
          />
          <p className="border-t border-record-ink/20 px-3 py-2 font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.1em] text-record-ink/85">
            Stoneymollan &middot; the hill above Balloch
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-[40ch] font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/85">
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