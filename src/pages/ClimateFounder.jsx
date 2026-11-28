import React from 'react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import FounderOpening from '@/components/climate/founder/FounderOpening';
import FounderWhy from '@/components/climate/founder/FounderWhy';
import FounderWork from '@/components/climate/founder/FounderWork';
import FounderHandover from '@/components/climate/founder/FounderHandover';
import FounderSignature from '@/components/climate/founder/FounderSignature';
import FounderClosing from '@/components/climate/founder/FounderClosing';
import '@/components/climate/founder/founder-page.css';

// Her page, in the record's order: the moment, the argument, the work, the handover, her own
// doors, and the sentence she is quoted on. Nothing here is a portfolio; it is a case for why
// the record exists and who answers for it.
export default function ClimateFounder() {
  return (
    <div className="record-founder-page relative min-h-screen font-body text-record-ink">
      <RecordBackBar eyebrow="The Founder" />
      <FounderOpening />
      <FounderWhy />
      <FounderWork />
      <FounderHandover />
      <FounderSignature />
      <FounderClosing />
    </div>
  );
}