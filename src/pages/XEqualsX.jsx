import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXTechnology from '@/components/climate/XEqualsXTechnology';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import '@/components/climate/x-equals-x-page.css';

export default function XEqualsX() {
  return (
    <ClimateRecordShell compact returnTo="/TogetherChangeClimate" returnLabel="Back to the record">
      <article id="x-equals-x" className="x-equals-x-page" aria-label="The x equals x covenant">
        <XEqualsXOpening />
        <div className="covenant-body">
          <XEqualsXFounderNote />
          <XEqualsXWhatItAsks />
          <RecordInPractice />
          <details className="covenant-detail" id="mechanisms">
            <summary>The technology and its limits</summary>
            <XEqualsXTechnology />
          </details>
          <details className="covenant-detail" id="recorded-commitments">
            <summary>Recorded commitments</summary>
            <XEqualsXResearchPanel />
          </details>
          <XEqualsXThanks />
          <div className="covenant-share">
            <ShareCardButton
              entry={{ id: 'x-equals-x', title: 'x = x' }}
              build={buildCovenantCard}
              label="Pass the principle on"
            />
            <p className="covenant-caption">Not yet signed by a person.</p>
          </div>
        </div>
      </article>
    </ClimateRecordShell>
  );
}