import React from 'react';
import FounderEvidenceRow from '@/components/climate/founder/FounderEvidenceRow';
import FounderCompactLedger from '@/components/climate/founder/FounderCompactLedger';
import { GLOBAL_EVIDENCE, HUMANITARIAN_EVIDENCE, POVERTY_EVIDENCE, WOMEN_EVIDENCE, MONEY_EVIDENCE, CHINA_INDIA_EVIDENCE } from '@/components/climate/founder/founderEvidence';

export default function FounderNumbers() {
  return (
    <section className="record-founder-numbers" aria-labelledby="founder-harm">
      <div className="record-founder-numbers-inner">
        <header className="record-founder-evidence-head">
          <p className="record-founder-kicker record-founder-kicker-light">The harm · evidence checked 28 November 2026</p>
          <h2 id="founder-harm" className="record-founder-h2">This is not a future crisis.</h2>
          <p>Hunger. Unsafe water. Poverty. A heating planet. The connected concerns her life’s work confronts, at the scale the primary reports record.</p>
          <p className="record-founder-order"><strong>The order is the argument.</strong> The world’s totals. Then the two largest countries, because they are always named first and are usually left out. Then the wars. Then poverty. Then the women and girls, who are counted last everywhere. Then what the money bought instead.</p>
        </header>
        <dl className="record-founder-evidence">
          {GLOBAL_EVIDENCE.map(item => <FounderEvidenceRow key={item.id} item={item} />)}
        </dl>
        <FounderCompactLedger
          kicker="The ledger · the two largest countries"
          title="The harm is not only in the small places."
          intro="Two countries, 2.8 billion people, and the figures that belong to each. What is printed is what each one reports — not what is assumed about it, and not what would make the page easier to write."
          rows={CHINA_INDIA_EVIDENCE}
        />
        <div className="record-founder-humanitarian-head">
          <p className="record-founder-kicker">People, not collateral</p>
          <h3>War is not a weather event.</h3>
          <p>Palestine, Sudan, Ukraine, Yemen, Syria, the Democratic Republic of the Congo and Afghanistan must not disappear into a global average. These crises have distinct histories and causes. Climate stress does not explain away war, attacks on civilians, the targeting of women and girls, or the denial of rights. Nor does a war explain away a drought.</p>
        </div>
        <dl className="record-founder-evidence">
          {HUMANITARIAN_EVIDENCE.map(item => <FounderEvidenceRow key={item.id} item={item} />)}
        </dl>
        <FounderCompactLedger
          kicker="The ledger · poverty"
          title="Poverty is not only elsewhere."
          intro="Not a developing-world problem, and not a weather event. It is a decision about who is allowed to have enough, taken again every year, in every country."
          rows={POVERTY_EVIDENCE}
        />
        <FounderCompactLedger
          kicker="The ledger · women and girls"
          title="Half of humanity is not a footnote."
          intro="The violence is counted, named and dated. What is missing is not evidence. It is the will to act on it."
          rows={WOMEN_EVIDENCE}
          tone="ink"
        />
        <FounderCompactLedger
          kicker="The ledger · what was spent instead"
          title="The money was never missing."
          intro="Nothing on this page is a shortage of resources. It is a decision about what the resources are for."
          rows={MONEY_EVIDENCE}
        />
        <p className="record-founder-evidence-note">Not only these. The 2026 humanitarian appeal also names Haiti, Myanmar, South Sudan, Somalia, Lebanon, Chad, Mali, Burkina Faso and the Sahel. This page lists a few of the largest and best documented, not a ranking of who suffers most, and leaving a country out here does not mean it has been counted as safe.</p>
        <p className="record-founder-evidence-note"><strong>And where the record will not guess.</strong> No figure is printed here for the Democratic People’s Republic of Korea, Eritrea or Turkmenistan, because no figure for 2026 exists that this record can check. That is not the same as nothing happening there. A blank is not a zero.</p>
        <p className="record-founder-evidence-note">A dated evidence record, not a live counter. Reference years differ; populations overlap. Do not add these figures together or read them all as deaths caused by climate change. Estimates, projections, assistance targets and verified minimums are labelled separately.</p>
        <p className="record-founder-evidence-note">Compiled for this page, not quotations from Janine or claims of endorsement by the organisations cited. Each link opens the original report or its issuing agency’s account. Where a figure has been revised, the later figure is named rather than swapped in silently.</p>
      </div>
    </section>
  );
}