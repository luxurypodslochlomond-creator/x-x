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
import '@/components/climate/founder/founder-mobile.css';

// Janine's voice, a dated primary-source evidence ledger, and the work behind it.
// This page does not make the independent evidence compilation her words.
export default function ClimateFounder() {
  return (
    <div id="record-founder" className="record-founder-page relative min-h-screen font-body text-record-ink">
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