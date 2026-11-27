import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT, COVENANT_ENTRY, COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <section className="covenant-hero" aria-labelledby="why-this-record">
      <div className="covenant-hero-heading">
        <h1 id="why-this-record" className="covenant-title" translate="no" aria-label="x equals x">x=x</h1>
        <div className="covenant-hero-voice">
          <p className="covenant-kicker">A public climate record</p>
          <p className="covenant-front-line">{COVENANT.title}<br />{COVENANT.distinction}</p>
          <p className="covenant-purpose">{COVENANT.meaning}</p>
        </div>
      </div>
      <figure className="covenant-painting">
        <img src={RECORD_COVER_SCREEN} width="1600" height="901" alt="The record’s cover painting: the living Earth beneath a luminous sky." loading="eager" decoding="async" />
        <figcaption>Cover painting · made for this record with AI</figcaption>
      </figure>
      <div className="covenant-hero-actions">
        <Link to="/TogetherChangeClimate" className="covenant-btn">Open the record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        <div className="covenant-share">
          <ShareCardButton instant entry={COVENANT_ENTRY} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share x=x" />
        </div>
        <p className="covenant-access">Free to read. No account needed.</p>
      </div>
    </section>
  );
}