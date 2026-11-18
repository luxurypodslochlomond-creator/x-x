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

export default function ClimateMapPage() {
  const { data } = useClimateImpactStats();
  const lights = useMemo(() => reachPlaces(data), [data]);
  return (
    <div className="record-map-page record-unified-map text-record-ink">
      <RecordBackBar eyebrow="Map · entries & reach" />
      <header className="bg-record-paper px-4 pb-4 pt-5 lg:px-8 lg:pt-7">
        <h1 className="text-[32px] font-bold leading-none tracking-tight lg:text-5xl">One world. One record.</h1>
        <p className="mb-5 mt-3 max-w-2xl text-[15px] leading-relaxed text-record-muted">Where things are happening, and how far the record is being read. Entries and reach, together.</p>
        <ImpactSignal stats={data} />
      </header>
      <section id="reading-map" aria-label="Entries and readership on one world map" className="scroll-mt-36">
        <RecordWorldMap lights={lights} />
      </section>
      <div className="record-reading-panel record-map-near"><NextActionNear /></div>
      <section id="reach-details" aria-labelledby="map-reach-title" className="scroll-mt-36">
        <div className="bg-record-paper px-4 pb-1 pt-6 lg:px-8">
          <h2 id="map-reach-title" className="text-2xl font-bold">The reach, in the open</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-record-muted">The places, the entries being opened and the actions coming up. Readership is not proof that the climate has improved.</p>
        </div>
        <ClimateImpact embedded />
      </section>
      <p className="bg-record-paper px-4 py-6 text-[14px] leading-relaxed text-record-muted lg:px-8">Entry locations are approximate. An entry without a place stays on the record, but is not guessed onto the map. <Link to="/ClimateMethod" className="font-bold text-record-red underline underline-offset-4">Method & corrections →</Link></p>
    </div>
  );
}