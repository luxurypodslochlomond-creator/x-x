import React from 'react';
import FounderEvidenceRow from '@/components/climate/founder/FounderEvidenceRow';
import { GLOBAL_EVIDENCE, HUMANITARIAN_EVIDENCE } from '@/components/climate/founder/founderEvidence';

export default function FounderNumbers() {
  return (
    <section className="record-founder-numbers" aria-labelledby="founder-harm">
      <div className="record-founder-numbers-inner">
        <header className="record-founder-evidence-head">
          <p className="record-founder-kicker record-founder-kicker-light">The harm · evidence checked 28 November 2026</p>
          <h2 id="founder-harm" className="record-founder-h2">This is not a future crisis.</h2>
          <p>Hunger. Unsafe water. Poverty. A heating planet. The connected concerns her life’s work confronts, at the scale the primary reports record.</p>
        </header>
        <dl className="record-founder-evidence">
          {GLOBAL_EVIDENCE.map(item => <FounderEvidenceRow key={item.id} item={item} />)}
        </dl>
        <div className="record-founder-humanitarian-head">
          <p className="record-founder-kicker">People, not collateral</p>
          <h3>War is not a weather event.</h3>
          <p>Palestine, Sudan and Afghanistan must not disappear into a global average. These crises have distinct histories and causes. Climate stress does not explain away war, attacks on civilians or the denial of rights.</p>
        </div>
        <dl className="record-founder-evidence">
          {HUMANITARIAN_EVIDENCE.map(item => <FounderEvidenceRow key={item.id} item={item} />)}
        </dl>
        <p className="record-founder-evidence-note">A dated evidence record, not a live counter. Reference years differ; populations overlap. Do not add these figures together or read them all as deaths caused by climate change. Estimates, projections and assistance targets are labelled separately.</p>
        <p className="record-founder-evidence-note">Compiled for this page, not quotations from Janine or claims of endorsement by the organisations cited. Each link opens the original report or its issuing agency’s account.</p>
      </div>
    </section>
  );
}