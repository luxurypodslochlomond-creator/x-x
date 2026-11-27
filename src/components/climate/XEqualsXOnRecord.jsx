import React from 'react';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';

// ── THE ANSWER TO "WHO ARE YOU?" IS WHAT IS ACTUALLY THERE ────────────────────
// A page can say anything about itself. This band says the only thing worth saying on a
// record: what has been made. The counts come from the record itself, and they are the
// work rather than the audience — entries and drawings, never a tally of readers. Nobody
// is asked to be impressed by an audience here.
//
// If the count cannot be reached the band does not render at all. A failed count is not a
// zero, and this page is the last place that should ever print one.
export default function XEqualsXOnRecord() {
  const { data } = useClimateImpactStats();
  if (!data || data.counts_unavailable) return null;

  const drawings = Number(data.published_cartoons) || 0;
  const entries = Math.max((Number(data.published_entries) || 0) - drawings, 0);
  if (!entries && !drawings) return null;

  return (
    <section className="covenant-onrecord" aria-labelledby="on-the-record">
      <div className="covenant-onrecord-inner">
        <p className="covenant-kicker">Not a promise. What is on it.</p>
        <h2 id="on-the-record" className="sr-only">What is on the record now</h2>
        <dl className="covenant-onrecord-figures">
          <div><dt>Entries</dt><dd>{entries}</dd></div>
          <div><dt>Drawings</dt><dd>{drawings}</dd></div>
          <div><dt>Adverts or paid placements</dt><dd>0</dd></div>
        </dl>
        <p className="covenant-onrecord-line">Every one with a source or an artist named beside it. Counted from the record itself, not from us.</p>
      </div>
    </section>
  );
}