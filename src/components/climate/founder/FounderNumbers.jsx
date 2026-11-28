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
          <p>Palestine, Sudan, Ukraine, Yemen, Syria, the Democratic Republic of the Congo and Afghanistan must not disappear into a global average. These crises have distinct histories and causes. Climate stress does not explain away war, attacks on civilians, the targeting of women and girls, or the denial of rights. Nor does a war explain away a drought.</p>
        </div>
        <dl className="record-founder-evidence">
          {HUMANITARIAN_EVIDENCE.map(item => <FounderEvidenceRow key={item.id} item={item} />)}
        </dl>
        <p className="record-founder-evidence-note">Not only these. The 2026 humanitarian appeal also names Haiti, Myanmar, South Sudan, Somalia, Lebanon, Chad, Mali, Burkina Faso and the Sahel. This page lists a few of the largest and best documented, not a ranking of who suffers most, and leaving a country out here does not mean it has been counted as safe.</p>
        <p className="record-founder-evidence-note">A dated evidence record, not a live counter. Reference years differ; populations overlap. Do not add these figures together or read them all as deaths caused by climate change. Estimates, projections, assistance targets and verified minimums are labelled separately.</p>
        <p className="record-founder-evidence-note">Compiled for this page, not quotations from Janine or claims of endorsement by the organisations cited. Each link opens the original report or its issuing agency’s account. Where a figure has been revised, the later figure is named rather than swapped in silently.</p>
      </div>
    </section>
  );
}