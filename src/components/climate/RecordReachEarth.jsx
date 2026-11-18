import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import { landDots, projectPct, PLATE_W, PLATE_H } from './worldPlate';
import { resolveCoords } from './countryCentroids';
import { createPageUrl } from '@/utils';
import '@/components/climate/record-reach.css';

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
const SIGNAL = '#ffd447';

// A light grows with the reads counted there, on a gentle log curve so a country with a
// thousand reads does not swallow one with two. Same curve as the Reach page.
function lightSize(views) {
  if (!views || views < 1) return 4;
  return Math.min(11, Math.max(4.5, 3.2 + Math.log2(views + 1) * 1.4));
}

function placeName(code) {
  if (!code) return '';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

export default function RecordReachEarth() {
  const { data } = useClimateImpactStats();
  const land = useMemo(() => landDots(), []);

  const lights = useMemo(() => {
    const rows = [
      ...(data?.countries || []).map((r) => ({ label: placeName(r.country), coord: resolveCoords(placeName(r.country), r.country), views: r.views })),
      ...(data?.regions || []).map((r) => ({ label: r.region, coord: resolveCoords(r.region, r.region), views: r.views })),
    ];
    return rows
      .filter((r) => r.coord && r.views > 0)
      .map((r, i) => {
        const { left, top } = projectPct(r.coord[0], r.coord[1]);
        return { ...r, left, top, size: lightSize(r.views), delay: `${(i % 7) * 1.4}s` };
      });
  }, [data]);

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
      className="relative w-full overflow-hidden bg-record-ink px-4 pb-7 pt-8 text-record-bone lg:px-10 lg:pb-10 lg:pt-11"
    >
      {/* A faint warm halo under the plate, so the ink band is a lit room rather than a
          black slab. It is the same red the mark is printed in, at a whisper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        style={{ background: `radial-gradient(circle at 50% 50%, ${LIGHT} 0%, transparent 62%)` }}
      />

      <div className="relative mx-auto w-full max-w-[720px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-signal">
          The record&rsquo;s reach
        </p>

        {/* The figures, in the record's own voice, above the plate. A reader who never
            looks at a map still learns the one fact that matters: how far this has gone.
            A failed count is not a zero, so it is not printed as one. */}
        <h2
          id="record-reach-earth-heading"
          className="mt-2 text-[22px] leading-[1.15] text-record-bone sm:text-[28px]"
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

        <div
          className="relative mt-4 w-full overflow-hidden border border-record-bone/25"
          style={{ aspectRatio: '2 / 1', background: 'radial-gradient(ellipse at 50% 46%, rgba(226,96,42,0.10) 0%, rgba(20,18,16,0) 68%)' }}
        >
          <svg
            viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* The graticule, so the eye can find a latitude and know the plate is a
                measurement rather than a drawing of a mood. */}
            <g stroke={LIGHT} strokeWidth="0.5" opacity="0.12" vectorEffect="non-scaling-stroke">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map((x) => (
                <line key={`lon-${x}`} x1={x} y1={0} x2={x} y2={PLATE_H} />
              ))}
              {[10, 20, 40, 50].map((y) => (
                <line key={`lat-${y}`} x1={0} y1={y} x2={PLATE_W} y2={y} />
              ))}
            </g>
            <line x1={0} y1={30} x2={PLATE_W} y2={30} stroke={SIGNAL} strokeWidth="0.6" opacity="0.35" vectorEffect="non-scaling-stroke" />

            {/* Every coast on Earth, as the record has always drawn it. Faint enough that
                the lights are what the eye goes to, strong enough that a reader can find
                their own country with a finger. */}
            <path
              d={land}
              stroke="#efe7d6"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* The lights. Positioned by real latitude and longitude, so the plate cannot
              put a country where it is not. */}
          {lights.map((l) => (
            <span
              key={`${l.label}-${l.left}`}
              aria-hidden="true"
              className="record-reach-light absolute rounded-full"
              style={{
                left: `${l.left}%`,
                top: `${l.top}%`,
                width: `${l.size}px`,
                height: `${l.size}px`,
                transform: 'translate(-50%, -50%)',
                background: SIGNAL,
                boxShadow: `0 0 ${l.size * 2.4}px ${l.size * 0.8}px rgba(226, 96, 42, 0.85), 0 0 ${l.size * 5}px ${l.size * 1.6}px rgba(255, 212, 71, 0.28)`,
                animationDelay: l.delay,
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <p className="max-w-[46ch] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-record-bone/65">
            {footnote}
          </p>
          <Link
            to={createPageUrl('ClimateImpact')}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-record-signal underline decoration-dotted underline-offset-4 transition-colors hover:text-record-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-signal"
          >
            See the reach
          </Link>
        </div>
      </div>
    </section>
  );
}