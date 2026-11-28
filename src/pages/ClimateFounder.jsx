import React from 'react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import FounderOpening from '@/components/climate/founder/FounderOpening';
import FounderColumn from '@/components/climate/founder/FounderColumn';
import FounderNumbers from '@/components/climate/founder/FounderNumbers';
import FounderSolutions from '@/components/climate/founder/FounderSolutions';
import FounderWork from '@/components/climate/founder/FounderWork';
import FounderDoors from '@/components/climate/founder/FounderDoors';
import FounderClosing from '@/components/climate/founder/FounderClosing';
import '@/components/climate/founder/founder-page.css';

// Her page in six beats: the moment, her own argument, what it costs, what is already
// working, what she built, and her own doors. Her voice carries it; our name appears once,
// at the foot, where a credit belongs.
export default function ClimateFounder() {
  return (
    <div className="record-founder-page relative min-h-screen font-body text-record-ink">
      <RecordBackBar eyebrow="The Founder" />
      <FounderOpening />
      <FounderColumn />
      <FounderNumbers />
      <FounderSolutions />
      <FounderWork />
      <FounderDoors />
      <FounderClosing />
    </div>
  );
}