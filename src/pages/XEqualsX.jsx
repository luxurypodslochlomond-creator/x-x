import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXSignalBand from '@/components/climate/XEqualsXSignalBand';
import XEqualsXWhyTheName from '@/components/climate/XEqualsXWhyTheName';
import XEqualsXStand from '@/components/climate/XEqualsXStand';
import XEqualsXPromises from '@/components/climate/XEqualsXPromises';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXClosing from '@/components/climate/XEqualsXClosing';
import XEqualsXPhoneBar from '@/components/climate/XEqualsXPhoneBar';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_ENTRY, COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';
import '@/components/climate/x-equals-x-page.css';

export default function XEqualsX() {
  return (
    <div id="x-equals-x" className="covenant-page" data-record-technical>
      <XEqualsXOpening />
      <XEqualsXSignalBand />
      <XEqualsXWhyTheName />
      <XEqualsXStand />
      <XEqualsXPromises />
      <XEqualsXCheck />
      <XEqualsXClosing />
      <div className="covenant-close">
        <Link to="/TogetherChangeClimate" className="covenant-btn">Open the record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        <div className="covenant-share"><ShareCardButton instant entry={COVENANT_ENTRY} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share x=x" /></div>
      </div>
      <XEqualsXPhoneBar />
    </div>
  );
}