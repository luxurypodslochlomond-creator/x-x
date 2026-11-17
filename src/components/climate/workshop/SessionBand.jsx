import React from 'react';
import { Link } from 'react-router-dom';

// ── THE SAME RED, ON EVERY PAGE THAT BELONGS TO THE HOUR ───────────────────────
// The workshop page is a poster: the record's red, the festival's yellow. The pages it
// hands you used to drop you into ordinary record paper without a word of explanation,
// which read as leaving the room and arriving at a filing cabinet.
//
// This is the four lines that keep you in it: whose hour it is, the topic she was given,
// when it is, and the way back to the minute-by-minute. Nothing else — it is a band, not
// a second masthead, and the page underneath still has to do its own job.
export default function SessionBand() {
  return (
    <section className="mt-4 bg-record-red px-4 py-3 text-record-paper lg:px-6 lg:py-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cartoon-sun lg:text-[10.5px]">
        Janine M. H. Selendy · her hour
      </p>
      <p className="mt-1.5 text-[15px] leading-snug lg:text-[19px]" style={{ fontFamily: 'var(--font-display)' }}>
        “Climate change &amp; the power of collective actions / creative interventions”
      </p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-cartoon-sun pt-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-record-paper/80">
          Sunday 29 November 2026 · 8th CartoonAFRICA Biennial, Benin City · online
        </p>
        <Link
          to="/ClimateWorkshop"
          className="font-mono text-[10.5px] font-black uppercase tracking-wide underline decoration-cartoon-sun decoration-2 underline-offset-4"
        >
          The hour, to the minute →
        </Link>
      </div>
    </section>
  );
}