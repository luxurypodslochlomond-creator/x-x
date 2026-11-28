import React from 'react';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

// ── HER PAGE OPENS THE WAY THE RECORD DOES ──────────────────────────────────────
// Brian, 28 November: "founder page lifeless bro… doesn't do Janine any justice… needs to be
// coolasfuck like record and x=x". He was right, and the fault was that the page opened with
// a filing label and a 40-pixel beacon instead of the one thing that makes her undeniable:
// a fifteen-year-old coming up through oil and never once looking away from it.
//
// So the opening is the record's own opening: the painting, her name set at the size a name
// is set, one hard line underneath it, and her sentence quoted in her own words with the
// yellow plate under it the way the record plates a voice it is quoting. No adjectives about
// her. The fact is louder than any adjective could be.
export default function FounderOpening() {
  return (
    <RecordPaintedBand continuous className="record-founder-hero">
      <div className="record-founder-hero-inner">
        <p className="record-founder-kicker">The founder · Beirut, 1956</p>
        <h1 className="record-founder-name">Janine M.<br />H. Selendy</h1>
        <p className="record-founder-hardline">Fifteen years old, surfacing through oil. She has been answering it ever since.</p>
        <blockquote className="record-founder-quote">
          “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
        </blockquote>
        <div className="record-founder-plate-signal">
          <span>Janine M. H. Selendy</span>
          <span>1956</span>
        </div>
        <p className="record-founder-credit">Horizon International · at Yale University</p>
      </div>
    </RecordPaintedBand>
  );
}