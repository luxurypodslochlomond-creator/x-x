import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import { Link } from 'react-router-dom';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import { COVENANT } from '@/components/climate/xEqualsXCopy';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import '@/components/climate/x-equals-x-page.css';

// The principle is the short reading; the evidence stays intact on its linked notes page.
export default function XEqualsX() {
  return (
    <ClimateRecordShell compact returnTo="/TogetherChangeClimate" returnLabel="Back to the record">
      <article id="x-equals-x" className="x-equals-x-page" aria-label="x = x — the principle">
        <XEqualsXOpening />
        <div className="covenant-body">
          <XEqualsXWhatItAsks />
          <div className="covenant-actions">
            <Link to="/XEqualsXNotes" className="covenant-working">Read the working <span aria-hidden="true">→</span></Link>
            <div className="covenant-share">
              <ShareCardButton entry={{ id: 'x-equals-x', title: 'x = x' }} build={buildCovenantCard} label="Pass it on" />
            </div>
          </div>
          <XEqualsXThanks />
          <p className="covenant-caption covenant-dedication"><Link to="/ClimateFounder">{COVENANT.dedication}</Link></p>
        </div>
      </article>
    </ClimateRecordShell>
  );
}