import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXJanineStory from '@/components/climate/XEqualsXJanineStory';
import XEqualsXPromises from '@/components/climate/XEqualsXPromises';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
import XEqualsXWhyTheName from '@/components/climate/XEqualsXWhyTheName';
import CovenantLicence from '@/components/climate/CovenantLicence';
import XEqualsXPhoneBar from '@/components/climate/XEqualsXPhoneBar';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';
import '@/components/climate/x-equals-x-page.css';

export default function XEqualsX() {
  return (
    <div id="x-equals-x" className="covenant-page" data-record-technical>
      <RecordBackBar eyebrow="Why this record exists" />
      <XEqualsXOpening />
      <div className="covenant-band covenant-band--centre"><XEqualsXJanineStory /></div>
      <div className="covenant-stack">
        <div className="covenant-card covenant-card--ocean"><RecordInPractice /></div>
        <div className="covenant-card"><XEqualsXPromises /></div>
        <div className="covenant-card"><XEqualsXCheck /></div>
        <div className="covenant-card"><XEqualsXLimits /></div>
        <div className="covenant-card"><XEqualsXWhyTheName /></div>
      </div>
      <div className="covenant-close">
        <div className="covenant-actions">
          <Link to="/ExtractionProofCovenant" className="covenant-btn">Read our commitments <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <div className="covenant-share"><ShareCardButton instant entry={{ id: 'x-equals-x', title: 'For the planet. For all of us.' }} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share why this record exists" /></div>
        </div>
      </div>
      <CovenantLicence />
      <XEqualsXPhoneBar />
    </div>
  );
}