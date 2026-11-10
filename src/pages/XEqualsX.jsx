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
        {/* The hand-off sits under the mark, centred, because the page now opens centred and
            passing it on is the page's own last word rather than a widget at the side. */}
        <div className="pb-9 pt-7 text-center">
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

        {/* Who made it, said plainly and centred, in the same breath as the dedication at the
            top — a record that asks for no letterhead still owes the reader the names of the
            people who built it. */}
        <p className="mt-8 border-t border-record-ink/15 pt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
          Built by Brian Hughes and Jake · UF51 CIC · Scotland
        </p>
      </article>
    </ClimateRecordShell>
  );
}