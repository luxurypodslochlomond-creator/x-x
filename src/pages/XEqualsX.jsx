import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import '@/components/climate/x-equals-x-page.css';

// ── ONE ARGUMENT, READ STRAIGHT DOWN ────────────────────────────────────────────
// Nothing on this page is folded away any more. The two drop-downs held the whole of the
// page's evidence behind a summary line, so a reader who never opened one read a poster
// and a reader who opened one got a filing cabinet: the drawers were the reason the page
// felt like it had been assembled rather than written.
//
// What is left is the order a sceptic reads in. What the principle is. What it asks of
// this record. What it looks like on one real entry. What it still cannot do, with a
// drawn door to the working for each limit. What has been promised. What to read next.
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