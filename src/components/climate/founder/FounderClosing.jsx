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
      {/* ── THE PAGE ENDS ON WHO HOLDS IT ────────────────────────────────────────
          The honour line used to be the last thing printed, so the page closed on two
          institutions and never said who keeps it — the same fault as the missing contact
          under her name. The imprint goes underneath, in the foot's own words, so a reader
          who has just finished her record knows exactly whose it is and where it is made. */}
      <div className="record-founder-imprint px-5 py-9 text-center lg:px-10">
        <p className="record-founder-imprint-honour">In honour of her life's work.<br />Horizon International · Yale University</p>
        <span aria-hidden="true" className="record-founder-imprint-rule" />
        <p className="record-founder-imprint-role">Held and published by Universal Frequency 51 CIC · Made in Scotland from photons</p>
      </div>
    </>
  );
}