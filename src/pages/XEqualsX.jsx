import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXTechnology from '@/components/climate/XEqualsXTechnology';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import '@/components/climate/x-equals-x-page.css';

export default function XEqualsX() {
  return (
    <ClimateRecordShell compact returnTo="/TogetherChangeClimate" returnLabel="Back to the record">
      <article className="x-equals-x-page" aria-label="The x equals x covenant">
        <XEqualsXOpening />
        <XEqualsXFounderNote />
        <XEqualsXWhatItAsks />
        <div className="pb-9 pt-7">
          <ShareCardButton
            entry={{ id: 'x-equals-x', title: 'x = x' }}
            build={buildCovenantCard}
            label="Pass the covenant on"
          />
          <p className="record-meta mt-3 text-record-muted">Not yet signed by a person.</p>
        </div>
        <details className="covenant-detail" id="mechanisms">
          <summary>How to check the record</summary>
          <XEqualsXTechnology />
          <XEqualsXResearchPanel />
        </details>
        <details className="covenant-detail" id="where-it-comes-from">
          <summary>Context and credits</summary>
          <XEqualsXThanks />
        </details>
      </article>
    </ClimateRecordShell>
  );
}