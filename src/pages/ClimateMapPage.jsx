import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import RecordWorldMap from '@/components/climate/RecordWorldMap';
import NextActionNear from '@/components/climate/NextActionNear';
import ImpactSignal from '@/components/climate/ImpactSignal';
import WhyThisPlate from '@/components/climate/map/WhyThisPlate';
import FounderGestures from '@/components/climate/map/FounderGestures';
import MapArtworkView from '@/components/climate/map/MapArtworkView';
import ClimateImpact from '@/pages/ClimateImpact';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import { reachPlaces } from '@/components/climate/reachPlaces';
import '@/components/climate/unified-map.css';
import '@/components/climate/map/map-workspace.css';

// Entry locations and readership places are independent observations.
// No connecting line is drawn without evidence that those two observations are linked.
export default function ClimateMapPage() {
  const { data } = useClimateImpactStats();
  const lights = useMemo(() => reachPlaces(data), [data]);

  return (
    <div className="record-map-page record-unified-map text-record-ink">
      <RecordBackBar eyebrow="Map · entries & reach" />

      <section className="record-map-opening">
        <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-9 lg:px-10 lg:py-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b3261e]">
            Where it stands · where it is read
          </p>
          <h1
            className="mt-4 max-w-[24ch] leading-[1.03] text-[#141210]"
            style={{ fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-0.02em' }}
          >
            One world. One record.
          </h1>
          <p
            className="mt-4 max-w-[62ch] text-[14px] leading-[1.7] text-[#3a342c] lg:text-[16px]"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            Entries where their sources place them. Readership where readers’ devices or their own
            words state a place. Two separate observations, not proof that a particular story was
            read there. Approximate locations only.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            <Link to="/ClimateFounder" className="inline-flex min-h-11 items-center border-b border-[#b3261e]/60 text-[#b3261e] transition-colors hover:text-[#141210]">
              The record Janine asked for →
            </Link>
            <a href="#reach-details" className="inline-flex min-h-11 items-center border-b border-[#141210]/25 text-[#3a342c] transition-colors hover:text-[#141210]">
              Who is reading ↓
            </a>
            <MapArtworkView />
          </div>
        </div>
      </section>

      {/* The shell owns the one painting. This section draws geography, not another cover. */}
      {/* The anchor the founder page points at. The figures are a reading of this plate
          now, so a link that says "the figures, set where they happen" must land on the
          plate itself — not on a second world that no longer exists. */}
      <section id="founder-figures" className="record-map-band w-full scroll-mt-36" aria-label="Entries, readership and the founder's figures on the one world map">
        <div className="relative z-10 mx-auto max-w-[1640px] px-2 py-4 lg:px-6 lg:py-6">
          <div className="record-map-frame p-1 lg:p-2">
            <RecordWorldMap lights={lights} alive tone="ink" />
          </div>
        </div>
      </section>

      {/* What the plate is for, said under it, so a reader never has to infer the argument
          from a legend. */}
      <div className="mx-auto max-w-[1640px] px-2 lg:px-0">
        <WhyThisPlate />
        {/* ── ONE WORLD, THREE READINGS, ONE PLATE ────────────────────────────────
            Brian, 28 November: "do we need two maps bro im sure we have three cant we
            unify into single coolasfuck map". He was right, and the second world was one
            I had put there myself the day before: the founder's figures were drawn on a
            plate of their own under the record's, so the page asked a reader to look at
            two planets and work out which one was the map.
            There is one plate now. It holds where the record stands, where it is opened
            and where the harm is counted — chosen in its own key, never layered on top of
            each other, because a mark must never mean two things at once. The figures'
            line opens in the same place every other mark's line opens: under the planet. */}
        {/* Harm at the top, the size a person can start at the foot: Janine's own five,
            read from the same list the record's home prints. */}
        <FounderGestures />
      </div>

      <div className="record-map-desk">
      <ImpactSignal stats={data} />
      <div className="record-reading-panel record-map-near"><NextActionNear /></div>

      <section id="reach-details" aria-labelledby="map-reach-title" className="scroll-mt-36">
        <div className="record-map-reach-heading bg-record-paper px-4 pb-1 pt-6 lg:px-8">
          <h2 id="map-reach-title" className="text-2xl font-bold">The reach, in the open</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-record-muted">
            The places, the entries being opened and the actions coming up. Readership is not proof
            that the climate has improved.
          </p>
        </div>
        <ClimateImpact embedded />
      </section>

      <p className="record-map-note bg-record-paper px-4 py-6 text-[14px] leading-relaxed text-record-muted lg:px-8">
        Entry locations are approximate. An entry without a place stays on the record, but is not
        guessed onto the plate.{' '}
        <Link to="/ClimateMethod" className="font-bold text-record-red underline underline-offset-4">
          Method &amp; corrections →
        </Link>
      </p>
      </div>
    </div>
  );
}