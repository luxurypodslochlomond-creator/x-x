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
// It sits at the foot of every page of the record, small, on ink — an instrument that is
// always in the same place, rather than a show that happens once at the door.
const LIGHT = '#e2602a';

// A light grows with the reads counted there, on a gentle log curve so a country with a
// thousand reads does not swallow one with two. Same curve as the Reach page.
function lightSize(views) {
  if (!views || views < 1) return 3.2;
  return Math.min(9, Math.max(3.6, 2.6 + Math.log2(views + 1) * 1.1));
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

  // The line under the plate says what the plate is counting. It is written as evidence,
  // not as a boast, and it never rounds a failed count into a zero.
  const line = unavailable
    ? 'The count could not be reached just now. The plate stays dark rather than guess.'
    : reads === 0
      ? 'The planet is here. The first read lights it.'
      : `Read in ${countries} ${countries === 1 ? 'country or nation' : 'countries and nations'} · ${reads.toLocaleString()} ${reads === 1 ? 'read' : 'reads'} · not one person named`;

  return (
    <section
      aria-labelledby="record-reach-earth-line"
      className="relative w-full bg-record-ink px-4 py-6 text-record-bone lg:px-10 lg:py-8"
    >
      <div className="mx-auto w-full max-w-[560px]">
        <div className="relative w-full overflow-hidden border border-record-bone/20" style={{ aspectRatio: '2 / 1' }}>
          <svg
            viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* The graticule, so the eye can find a latitude and know the plate is a
                measurement rather than a drawing of a mood. */}
            <g stroke={LIGHT} strokeWidth="0.5" opacity="0.1" vectorEffect="non-scaling-stroke">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map((x) => (
                <line key={`lon-${x}`} x1={x} y1={0} x2={x} y2={PLATE_H} />
              ))}
              {[10, 20, 40, 50].map((y) => (
                <line key={`lat-${y}`} x1={0} y1={y} x2={PLATE_W} y2={y} />
              ))}
            </g>
            <line x1={0} y1={30} x2={PLATE_W} y2={30} stroke={LIGHT} strokeWidth="0.5" opacity="0.2" vectorEffect="non-scaling-stroke" />

            {/* Every coast on Earth, as the record has always drawn it. Faint enough that
                the lights are what the eye goes to. */}
            <path
              d={land}
              stroke="#efe7d6"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
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
                background: LIGHT,
                boxShadow: `0 0 ${l.size * 2.6}px ${l.size * 0.9}px rgba(226, 96, 42, 0.55)`,
                animationDelay: l.delay,
              }}
            />
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p id="record-reach-earth-line" className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-record-bone/70">
            {line}
          </p>
          <Link
            to={createPageUrl('ClimateImpact')}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-record-signal underline decoration-dotted underline-offset-4 transition-colors hover:text-record-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-signal"
          >
            Reach
          </Link>
        </div>
      </div>
    </section>
  );
}