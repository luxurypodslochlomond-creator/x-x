import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import { Link } from 'react-router-dom';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import { COVENANT } from '@/components/climate/xEqualsXCopy';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import '@/components/climate/x-equals-x-page.css';

// The principle, Janine's context and the full supporting record belong together.
export default function XEqualsX() {
  return (
    <ClimateRecordShell compact returnTo="/TogetherChangeClimate" returnLabel="Back to the record">
      <article id="x-equals-x" className="x-equals-x-page" aria-label="x = x — the principle">
        <XEqualsXOpening />
        <div className="covenant-body">
          <XEqualsXFounderNote />
          <XEqualsXWhatItAsks />
          <RecordInPractice />
          <XEqualsXLimits />
          <XEqualsXResearchPanel />
          <XEqualsXThanks />
          <div className="covenant-actions">
            <Link to="/ExtractionProofCovenant" className="covenant-working">The full covenant <span aria-hidden="true">→</span></Link>
            <div className="covenant-share">
              <ShareCardButton entry={{ id: 'x-equals-x', title: 'x = x' }} build={buildCovenantCard} label="Pass it on" />
            </div>
          </div>
          <p className="covenant-caption covenant-dedication"><Link to="/ClimateFounder">{COVENANT.dedication}</Link></p>
        </div>
      </article>
    </ClimateRecordShell>
  );
}