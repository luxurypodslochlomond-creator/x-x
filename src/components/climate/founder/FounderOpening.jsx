import React from 'react';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

export default function FounderOpening() {
  return (
    <>
      <div className="record-continuous-band border-b border-record-paper/20 px-5 py-4 text-center">
        <p className="record-header-type mx-auto text-xs text-record-paper">A life spent finding what works</p>
        <div className="mt-2 text-xs tracking-widest text-record-mark">x = x</div>
      </div>
      <RecordPaintedBand continuous>
        <div className="relative px-5 py-10 lg:px-12 lg:py-14">
          <p className="record-header-type text-xs text-record-signal">Beirut · 1956</p>
          <div className="mt-6 flex justify-center"><SignalBeacon size={40} color="rgb(var(--record-signal))" /></div>
          {/* Her own words are set as the record sets every voice it quotes: the reading
              face, sentence case, no tracking added. Wide-tracked capitals were turning the
              one sentence on this page that has to land into lettering on a shipping label. */}
          <blockquote className="record-founder-quote mx-auto mt-6 max-w-3xl text-center text-record-paper">
            “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
          </blockquote>
          <p className="record-header-type mx-auto mt-6 text-center text-xs text-record-signal">— Janine M. H. Selendy, 1956</p>
        </div>
        <div className="relative bg-record-signal px-5 py-5 text-center text-record-ink">
          <p className="record-header-type mx-auto text-xs">One moment of clarity became forty years of work</p>
        </div>
      </RecordPaintedBand>
    </>
  );
}