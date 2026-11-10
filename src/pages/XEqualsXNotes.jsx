import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import '@/components/climate/x-equals-x-page.css';

export default function XEqualsXNotes() {
  return (
    <ClimateRecordShell compact eyebrow="x = x · the working" returnTo="/XEqualsX" returnLabel="Back to the principle">
      <article id="x-equals-x" aria-labelledby="principle-working">
        <h1 id="principle-working" className="text-[34px]">The working.</h1>
        <XEqualsXFounderNote />
        <RecordInPractice />
        <XEqualsXLimits />
        <XEqualsXResearchPanel />
      </article>
    </ClimateRecordShell>
  );
}