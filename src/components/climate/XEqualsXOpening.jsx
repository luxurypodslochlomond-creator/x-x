import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordCover from '@/components/climate/RecordCover';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

export default function XEqualsXOpening() {
  return (
    <section className="covenant-hero" aria-labelledby="why-this-record">
      <RecordCover position="center 30%" strength={1} />
      <div className="covenant-hero-veil" aria-hidden="true" />
      <div className="covenant-hero-inner">
        <p className="covenant-front-note">Together we can change the course of climate change</p>
        <h1 id="why-this-record" className="covenant-title">For the planet.<br />For all of us.</h1>
        <p className="covenant-purpose">A public record of what is happening to our climate, what people are doing to help, and actions others can take.</p>
        <p className="covenant-hero-detail">So useful work is easier to find, learn from and pass on. Free to read. No account needed.</p>
        <div className="covenant-hero-actions">
          <Link to="/TogetherChangeClimate" className="covenant-btn">Explore the record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <div className="covenant-share">
            <ShareCardButton instant entry={{ id: 'x-equals-x', title: 'For the planet. For all of us.' }} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share why this record exists" />
          </div>
        </div>
      </div>
    </section>
  );
}