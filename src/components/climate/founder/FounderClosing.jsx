import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

export default function FounderClosing() {
  return (
    <>
      <RecordPaintedBand continuous className="px-5 py-10 text-center lg:px-10 lg:py-14">
        <div className="relative">
          <div className="mb-5 flex justify-center"><SignalBeacon size={34} color="rgb(var(--record-signal))" /></div>
          <blockquote className="record-founder-quote mx-auto max-w-2xl text-record-paper">“Together we can change the course of climate change.”</blockquote>
        </div>
      </RecordPaintedBand>
      <div className="bg-record-signal px-5 py-6 text-center lg:px-10">
        <Link to="/TogetherChangeClimate" className="inline-flex min-h-11 items-center gap-3 bg-record-ink px-5 py-4 font-display text-xs font-bold uppercase text-record-paper hover:bg-record-red">
          Return to the record <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
      <div className="record-continuous-band px-5 py-6 text-center">
        <p className="record-header-type mx-auto text-xs leading-relaxed text-record-paper">In honour of her life's work.<br />Horizon International · Yale University</p>
      </div>
    </>
  );
}