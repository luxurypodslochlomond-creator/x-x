import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

export default function FounderClosing() {
  return (
    <>
      <RecordPaintedBand continuous className="record-founder-close-band">
        <div className="record-founder-close-inner">
          <blockquote className="record-founder-quote">“Together we can change the course of climate change.”</blockquote>
          <div className="record-founder-plate-signal">
            <span>Janine M. H. Selendy</span>
            <span>Horizon International</span>
          </div>
        </div>
      </RecordPaintedBand>
      <div className="record-founder-cta">
        <Link to="/TogetherChangeClimate" className="record-founder-cta-button">
          Read the record <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <p>Free to read. No account needed. Nothing for sale.</p>
      </div>
      {/* ── WHO HOLDS IT, SAID ONCE, AND WHAT HER YALE WORK IS NOT ────────────────
          The platform's name belongs here and nowhere higher up the page: her name is the
          page, and a company set beside it would read as though her forty years were the
          introduction to our product. One line, in the record's own words, then the one
          sentence that matters to her: her work at Yale is hers, and this record is not a
          Yale publication and claims no endorsement from Yale or anyone named here. */}
      <div className="record-founder-imprint">
        <p className="record-founder-imprint-honour">In honour of her life’s work.</p>
        <span aria-hidden="true" className="record-founder-imprint-rule" />
        <p className="record-founder-imprint-role">A platform built for the planet · Universal Frequency 51 CIC · Scotland</p>
        <p className="record-founder-imprint-note">Horizon International’s work at Yale is her own. This record is not a Yale publication and claims no endorsement from Yale or from any institution named on this page.</p>
        <a href="mailto:family@uf51.love" className="record-founder-imprint-contact">Contact Universal Frequency 51</a>
      </div>
    </>
  );
}