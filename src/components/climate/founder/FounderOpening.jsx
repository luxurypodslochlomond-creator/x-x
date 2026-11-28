import React from 'react';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

// Her recollection stays her words. The painting is revealed by the page's own
// transparent book, rather than buried under the shared paper and two ink veils.
export default function FounderOpening() {
  return (
    <RecordPaintedBand continuous className="record-founder-hero">
      <div className="record-founder-hero-inner">
        <div className="record-founder-nameplate">
          <p className="record-founder-kicker record-founder-kicker-light">The founder · in defence of life</p>
          <h1 className="record-founder-name"><span>Janine M. H.</span><span>Selendy</span></h1>
          <p className="record-founder-credit">Founder, Horizon International</p>
        </div>
        <figure className="record-founder-first-voice">
          <blockquote className="record-founder-quote">
            “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
          </blockquote>
          <figcaption>Janine’s recollection · Beirut, aged fifteen</figcaption>
        </figure>
        <p className="record-founder-painting-credit">Painting made for the record with BASE 1 (AI).</p>
      </div>
    </RecordPaintedBand>
  );
}