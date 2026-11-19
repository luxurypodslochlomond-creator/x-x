import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import RecordWorldMap from '@/components/climate/RecordWorldMap';
import NextActionNear from '@/components/climate/NextActionNear';
import ImpactSignal from '@/components/climate/ImpactSignal';
import ClimateImpact from '@/pages/ClimateImpact';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import { reachPlaces } from '@/components/climate/reachPlaces';
import '@/components/climate/unified-map.css';

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
          </div>
        </div>
      </section>

      {/* The shell owns the one painting. This section draws geography, not another cover. */}
      <section className="record-map-band w-full" aria-label="Entries and readership on the world map">
        <div className="relative z-10 mx-auto max-w-[1640px] px-2 py-4 lg:px-6 lg:py-6">
          <div className="record-map-frame p-1 lg:p-2">
            <RecordWorldMap lights={lights} alive tone="ink" />
          </div>
        </div>
      </section>

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