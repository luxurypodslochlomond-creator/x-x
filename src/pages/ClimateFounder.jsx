import React from 'react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import FounderOpening from '@/components/climate/founder/FounderOpening';
import FounderName from '@/components/climate/founder/FounderName';
import FounderWork from '@/components/climate/founder/FounderWork';
import FounderSignature from '@/components/climate/founder/FounderSignature';
import FounderClosing from '@/components/climate/founder/FounderClosing';

export default function ClimateFounder() {
  return (
    <div className="record-founder-page relative min-h-screen font-body text-record-ink">
      <RecordBackBar eyebrow="The Founder" />
      <FounderOpening />
      <div className="px-5 lg:px-10">
        <FounderName />
        <FounderWork />
        <FounderSignature />
      </div>
      <FounderClosing />
    </div>
  );
}