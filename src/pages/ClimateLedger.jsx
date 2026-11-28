import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ContributionAccordion from '@/components/climate/solidarity/ContributionAccordion';
import ContributionOffer from '@/components/climate/solidarity/ContributionOffer';
import SupportPrinciples from '@/components/climate/solidarity/SupportPrinciples';
import PublicPaymentLedger from '@/components/climate/solidarity/PublicPaymentLedger';
import SupportSources from '@/components/climate/solidarity/SupportSources';

export default function ClimateLedger() {
  const [offer, setOffer] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const artist = (params.get('artist') || '').slice(0, 200);
    return artist ? { subject: 'Paid support for an artist', artist, work: (params.get('work') || '').slice(0, 200) } : null;
  });
  return <ClimateRecordShell painted wide className="stand-page" eyebrow="Stand with the work" marker="x = x · artists, people, planet"
    title="Stand behind the work."
    statement="Pay an artist. Give the work a place. Bring a skill. Nothing here buys control."
    returnTo="/ClimateCartoons" returnLabel="Back to the drawings"
    footer="The artists keep their rights. Every offer needs consent. Every recorded payment stays open to scrutiny.">
    <p className="stand-principle">Free to see. <span>Not free to make.</span></p>
    <nav className="stand-links" aria-label="Support and accountability"><a href="#stand-contribute">Ways to help</a><a href="#offer-help">Make an offer</a><a href="#ledger-lines">The money, in public</a></nav>
    <ContributionAccordion onOffer={subject => setOffer({ subject })} />
    <ContributionOffer selected={offer} />
    <SupportPrinciples />
    <PublicPaymentLedger />
    <SupportSources />
    <p className="text-base leading-relaxed"><Link to="/ClimateFounder" className="underline text-record-red">Janine’s work</Link> · <Link to="/ClimateCartoons/Francis" className="underline text-record-red">Francis and CartoonAFRICA</Link> · <Link to="/ClimateCartoons#wall-credits" className="underline text-record-red">The artists and sources</Link></p>
  </ClimateRecordShell>;
}