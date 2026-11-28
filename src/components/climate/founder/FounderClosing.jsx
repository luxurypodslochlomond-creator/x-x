import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

export default function FounderClosing() {
  return (
    <>
      <RecordPaintedBand continuous className="record-founder-close-band">
        <div className="record-founder-close-inner">
          <p className="record-founder-kicker record-founder-kicker-light">Her sentence · and the whole of it</p>
          <blockquote className="record-founder-quote">“Together we can change the course of climate change.”</blockquote>
          <div className="record-founder-plate-signal">
            <span>Janine M. H. Selendy</span>
            <span>Horizon International</span>
          </div>
        </div>
      </RecordPaintedBand>
      <div className="record-founder-cta">
        <Link to="/TogetherChangeClimate" className="record-founder-cta-button">
          Open the record <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <p>Free to read. No account needed. Nothing for sale.</p>
      </div>
      {/* ── WHO HOLDS IT, AND WHAT HER YALE WORK IS NOT ────────────────────────────
          The honour line used to be the last thing printed, so the page closed on two
          institutions and never said who keeps it. It closes on both now, and on one
          sentence that matters to her: her work at Yale is hers, and this record is not a
          Yale publication and claims no endorsement from Yale or from anyone named here.
          A page that borrows a name without that line is not being honest about what it is. */}
      <div className="record-founder-imprint">
        <p className="record-founder-imprint-honour">In honour of her life’s work.<br />Horizon International · Yale University</p>
        <span aria-hidden="true" className="record-founder-imprint-rule" />
        <p className="record-founder-imprint-role">Held and published by Universal Frequency 51 CIC · Made in Scotland from photons</p>
        <p className="record-founder-imprint-note">Horizon International’s work at Yale is her own. This record is not a Yale publication and claims no endorsement from Yale or from any institution named on this page.</p>
        <a href="mailto:family@uf51.love" className="record-founder-imprint-contact">Contact Universal Frequency 51</a>
      </div>
    </>
  );
}