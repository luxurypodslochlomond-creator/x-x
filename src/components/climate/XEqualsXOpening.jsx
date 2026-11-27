import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import XEqualsXRooms from '@/components/climate/XEqualsXRooms';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT, COVENANT_ENTRY, COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

// The invitation and room entrances belong to the opening, not a separate sales strip.
export default function XEqualsXOpening() {
  return (
    <section className="covenant-hero" aria-labelledby="why-this-record">
      <div className="covenant-hero-inner">
        <p className="covenant-kicker">{COVENANT.kicker}</p>
        <h1 id="why-this-record" className="covenant-title" translate="no" aria-label="x equals x">x=x</h1>
        <p className="covenant-front-line">
          {COVENANT.titleLead} <span className="covenant-front-line-mark">{COVENANT.titleMark}</span>
        </p>
        <p className="covenant-purpose-line">{COVENANT.distinction}</p>
        <div className="covenant-hero-context">
          <div className="covenant-hero-statement">
            <blockquote className="covenant-voice">“Together we can change the course of climate change.”</blockquote>
            <div className="covenant-voice-plate">
              <p className="covenant-voice-name">Janine M. H. Selendy</p>
              <Link to="/ClimateFounder" className="covenant-voice-link">Horizon International</Link>
            </div>
          </div>
          <div className="covenant-hero-invitation">
            <p className="covenant-purpose">{COVENANT.meaning}</p>
            <div className="covenant-hero-actions">
              <Link to="/TogetherChangeClimate" className="covenant-btn">Open the record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <div className="covenant-share"><ShareCardButton instant entry={COVENANT_ENTRY} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share x=x" /></div>
            </div>
            <p className="covenant-access">Free to read. No account needed.</p>
          </div>
        </div>
        <p className="covenant-cover-credit">Painting made for the record with BASE 1 (AI).</p>
      </div>
      <XEqualsXRooms />
    </section>
  );
}