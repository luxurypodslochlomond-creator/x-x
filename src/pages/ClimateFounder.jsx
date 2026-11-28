import React from 'react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import FounderOpening from '@/components/climate/founder/FounderOpening';
import FounderColumn from '@/components/climate/founder/FounderColumn';
import FounderNumbers from '@/components/climate/founder/FounderNumbers';
import FounderSolutions from '@/components/climate/founder/FounderSolutions';
import FounderWork from '@/components/climate/founder/FounderWork';
import FounderDoors from '@/components/climate/founder/FounderDoors';
import FounderRule from '@/components/climate/founder/FounderRule';
import FounderWhereItGoes from '@/components/climate/founder/FounderWhereItGoes';
import FounderClosing from '@/components/climate/founder/FounderClosing';
import '@/components/climate/founder/founder-page.css';
import '@/components/climate/founder/founder-mobile.css';

// Janine's voice, a dated primary-source evidence ledger, and the work behind it.
// This page does not make the independent evidence compilation her words.
export default function ClimateFounder() {
  return (
    <div id="record-founder" className="record-founder-page relative min-h-screen font-body text-record-ink">
      <RecordBackBar eyebrow="The Founder" />
      {/* ── THE ORDER, AND WHY IT IS THIS ORDER ────────────────────────────────
          It read as a pile of bands rather than an argument, because the method note
          came last, after the reader had already decided whether to trust the figures,
          and the doors to the rest of the record came before it. So: her voice, her
          argument, the harm, the rule that says how the harm is counted, the doors it
          leads to, what is already working, the record of her work, her own links, her
          line. Each band now hands the next one something. */}
      <FounderOpening />
      <FounderColumn />
      <FounderNumbers />
      <FounderRule />
      <FounderWhereItGoes />
      <FounderSolutions />
      <FounderWork />
      <FounderDoors />
      <FounderClosing />
    </div>
  );
}