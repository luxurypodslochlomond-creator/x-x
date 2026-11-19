import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import RecordWorldMap from '@/components/climate/RecordWorldMap';
import NextActionNear from '@/components/climate/NextActionNear';
import ImpactSignal from '@/components/climate/ImpactSignal';
import ClimateImpact from '@/pages/ClimateImpact';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import { reachPlaces } from '@/components/climate/reachPlaces';
import '@/components/climate/unified-map.css';

/* ── ONE PLATE, AND IT IS ALIVE ────────────────────────────────────────────────────
   Brian, 18 November: "why go into map doesn't feel coolasfuck connected to everything
   that Janine gave me as a letter and across all platform… not linear bro but coolasfuck
   art."

   He is describing the one thing a map of a record can do that a list of a record cannot:
   hold the whole argument in a single picture. So this page is not a page with a map on
   it — the plate is the page. Every entry set where it says it is, every place that has
   read it, and a drawn thread between the two, so the picture says what the numbers
   cannot: this was read there, and that entry stands here.

   Nothing on the plate is decoration. The threads are real pairs from the real counts,
   the marks are real entries, and a mark that cannot be placed honestly is not drawn at
   all. The movement is the record being read, not an effect. */
export default function ClimateMapPage() {
  const { data } = useClimateImpactStats();
  const lights = useMemo(() => reachPlaces(data), [data]);

  return (
    <div className="record-map-page record-unified-map text-record-ink">
      <RecordBackBar eyebrow="Map · entries & reach" />

      <RecordPaintedBand continuous>
        <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-9 text-center lg:px-10 lg:py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e2602a]">
            Where it stands · where it is read
          </p>
          <h1
            className="mx-auto mt-4 max-w-[16ch] leading-[1.03] text-[#efe7d6]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-0.02em' }}
          >
            One world. One record.
          </h1>
          <p
            className="mx-auto mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-[#efe7d6]/80 lg:text-[16px]"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            Every entry set where it says it is, and every place the record has been read, on one
            plate — with a drawn thread between them. Region only. Never a person, never a precise
            location.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            <Link to="/ClimateFounder" className="inline-flex min-h-11 items-center border-b border-[#e2602a]/60 text-[#e2602a] transition-colors hover:text-[#efe7d6]">
              The record Janine asked for →
            </Link>
            <a href="#reach-details" className="inline-flex min-h-11 items-center border-b border-[#efe7d6]/25 text-[#efe7d6]/70 transition-colors hover:text-[#efe7d6]">
              Who is reading ↓
            </a>
          </div>
        </div>
      </RecordPaintedBand>

      <ImpactSignal stats={data} />

      {/* The plate carries the painting itself, at the full width of the glass, so the map is
          never waiting on a room it cannot see. One painting, the world drawn on it in light
          ink: the page a reader opens to see the planet is standing on the planet. */}
      <RecordPaintedBand soft className="record-map-band w-full">
        <div className="relative z-10 mx-auto max-w-[1640px] px-2 py-4 lg:px-6 lg:py-6">
          <div className="record-map-frame p-1 lg:p-2">
            <RecordWorldMap lights={lights} alive tone="ink" />
          </div>
        </div>
      </RecordPaintedBand>

      <div className="record-reading-panel record-map-near"><NextActionNear /></div>

      <section id="reach-details" aria-labelledby="map-reach-title" className="scroll-mt-36">
        <div className="bg-record-paper px-4 pb-1 pt-6 lg:px-8">
          <h2 id="map-reach-title" className="text-2xl font-bold">The reach, in the open</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-record-muted">
            The places, the entries being opened and the actions coming up. Readership is not proof
            that the climate has improved.
          </p>
        </div>
        <ClimateImpact embedded />
      </section>

      <p className="bg-record-paper px-4 py-6 text-[14px] leading-relaxed text-record-muted lg:px-8">
        Entry locations are approximate. An entry without a place stays on the record, but is not
        guessed onto the plate.{' '}
        <Link to="/ClimateMethod" className="font-bold text-record-red underline underline-offset-4">
          Method &amp; corrections →
        </Link>
      </p>
    </div>
  );
}