import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import WorldPlate from './WorldPlate';
import { reachPlaces } from './reachPlaces';

// ── THE WORLD, LIT WHERE IT HAS ACTUALLY BEEN READ ──────────────────────────────────────
// The record's cover painting is Earth from space, and it is one specific view: a cyclone
// over North America, the aurora above it. Lighting countries on that picture was the first
// idea and it is a bad one — half the planet is facing away, and a dot for Germany would
// have to be invented on a place in the painting that is not Germany. That is the difference
// between a picture and a lie, and a record about honesty cannot start with one.
//
// So the earth that lights up is the record's own plate: the ink stipple of every coast,
// drawn from Natural Earth's public-domain land layer, in equirectangular projection, poles
// included. It is the same plate the Map page and the Reach page already use, so the three
// cannot disagree about the shape of the world.
//
// Each light is a real place a real read came from — the same counts the Reach page shows,
// from the same server call, which is asked once for the whole site. Nothing here is
// animated into being, nothing is weighted to look busier than it is, and a country with no
// reads is dark. It says "reads", never "people": the record does not know who anybody is,
// and a plate that implied it did would be the gimmick.
//
// It stands at the foot of every page of the record, in the same place every time. It was
// drawn small and quiet on the reasoning that an instrument should not shout — and the
// result was a dark rectangle at the bottom of a page that read as nothing at all. An
// instrument you cannot read is not modest, it is absent. So it is a proper band now: the
// figures said in the record's own voice, the plate big enough to see a coast, and the
// lights given room to glow.
const LIGHT = '#e2602a';

export default function RecordReachEarth() {
  const { data } = useClimateImpactStats();

  // Which place on the plate has been pressed, if any. One press opens it, a second press
  // on the same light puts it down — the same act the Map page uses for its marks.
  const [picked, setPicked] = useState(null);
  const pickLight = (l) => setPicked((prev) => (prev?.id === l.id ? null : l));

  // The same places, the same curve and the same names the reach page uses — worked out
  // once, in reachPlaces, so the foot of a page and the page itself cannot disagree about
  // one count. Each light gets its own delay so seven of them breathe out of step, which
  // reads as a world turning rather than a strip of lights switching on together.
  const lights = useMemo(
    () => reachPlaces(data).map((p, i) => ({ ...p, delay: `${(i % 7) * 1.4}s` })),
    [data]
  );

  const unavailable = data?.counts_unavailable === true;
  const countries = data?.unique_countries || 0;
  const reads = data?.total_views || 0;

  // The footnote says what the plate is counting, in evidence rather than in boast, and it
  // never rounds a failed count into a zero.
  const footnote = unavailable
    ? 'The count could not be reached just now. The plate stays dark rather than guess.'
    : reads === 0
      ? 'The planet is here. The first read lights it.'
      : `A read is one entry opened. No account, no cookie, no address, no name.`;

  return (
    <section
      aria-labelledby="record-reach-earth-heading"
      className="relative w-full overflow-hidden border-t-2 border-record-signal bg-record-ink px-4 pb-7 pt-7 text-record-bone lg:px-10 lg:pb-10 lg:pt-10"
    >
      {/* A faint warm halo under the plate, so the ink band is a lit room rather than a
          black slab. It is the same red the mark is printed in, at a whisper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        style={{ background: `radial-gradient(circle at 50% 50%, ${LIGHT} 0%, transparent 62%)` }}
      />

      {/* Brian, 19 November: "the map is coolasfuck, think we could make same width to the
          red." It was a narrow column — 720px of plate inside a band that runs the whole
          screen — so the world sat in the middle of its own room like a picture on a wall.
          It is the record's own wide measure now, the same one the reading pages use, and
          the plate is as wide as the band it stands in. The sentences stay at reading
          measure, because a line of type is not a map. */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-signal">
          The record&rsquo;s reach
        </p>

        {/* The figures, in the record's own voice, above the plate. A reader who never
            looks at a map still learns the one fact that matters: how far this has gone.
            A failed count is not a zero, so it is not printed as one. */}
        <h2
          id="record-reach-earth-heading"
          className="mt-2 max-w-[30ch] text-[26px] leading-[1.08] text-record-bone sm:text-[38px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {unavailable ? (
            'The count is not answering.'
          ) : reads === 0 ? (
            'The world, waiting for its first light.'
          ) : (
            <>
              <span className="text-record-signal">{reads.toLocaleString()}</span>
              {reads === 1 ? ' read in ' : ' reads in '}
              <span className="text-record-signal">{countries.toLocaleString()}</span>
              {countries === 1 ? ' country or nation' : ' countries and nations'}
            </>
          )}
        </h2>

        {/* One plate, in ink. It used to draw its own copy of the coastlines here — a
            second Earth that could drift from the first. It is the same plate the Map page
            and the Reach page use, on the dark ground: same stipple, same projection, same
            graticule, so the foot of every page and the page it points at are one picture. */}
        <div className="mt-4 border border-record-bone/25">
          <WorldPlate
            tone="ink"
            lights={lights}
            onLight={pickLight}
            selectedLightId={picked?.id}
            label={`The world, with ${lights.length} ${lights.length === 1 ? 'place' : 'places'} reading the record`}
          />
        </div>

        {/* ── WHAT A LIGHT SAYS WHEN IT IS PRESSED ─────────────────────────────────
            Brian, 19 November: "show real readership when tap the icon — see info for
            right reasons." So the count for that place, at full size, with the one thing
            the record will not let a number pretend: a read is one entry opened by nobody
            the record knows. It is not a person, not a proof that a particular story was
            read there, and not evidence the climate improved. */}
        {picked ? (
          <div className="mt-3 border border-record-signal/50 bg-record-signal/[0.07] px-3 py-3 sm:px-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-bone/70">
              {picked.kind === 'nation' ? 'Self-identified nation' : 'Country'} · {picked.name}
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono text-[34px] font-black leading-none tabular-nums text-record-signal sm:text-[44px]">
                {(picked.views || 0).toLocaleString()}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-record-bone/70">
                {picked.views === 1 ? 'read' : 'reads'}
              </span>
            </p>
            <p className="mt-1 max-w-[62ch] font-mono text-[10px] leading-relaxed text-record-bone/60">
              A read is one entry opened. No account, no cookie, no address, no name. The
              place is where a reader’s own device or their own words say they are — never
              a precise location, and never proof of what a particular reader thought.
            </p>
          </div>
        ) : (
          !unavailable && reads > 0 && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-record-bone/55">
              Press a light to read that place’s count.
            </p>
          )
        )}

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <p className="max-w-[46ch] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-record-bone/65">
            {footnote}
          </p>
          <Link
            to="/ClimateMap#reach"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-record-signal underline decoration-dotted underline-offset-4 transition-colors hover:text-record-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-signal"
          >
            Map & reach
          </Link>
        </div>
      </div>
    </section>
  );
}