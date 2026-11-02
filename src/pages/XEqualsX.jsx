import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXPrinciples from '@/components/climate/XEqualsXPrinciples';
import XEqualsXRefuses from '@/components/climate/XEqualsXRefuses';
import XEqualsXRule from '@/components/climate/XEqualsXRule';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXPlatform from '@/components/climate/XEqualsXPlatform';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';

// x = x — the covenant.
//
// One page, one job: say what x = x means on this record, state the rules the record
// actually keeps, and show where those rules came from. No essay, no borrowed physics,
// no allusion. Anything a reader cannot check against the record itself does not live here.

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Record of the Time · The covenant"
      marker="The rule this record is held to"
      title="Nobody above anybody."
      statement="x = x. Equal human worth — a decision, taken on purpose, and the rule every page of this record is kept to."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="x = x is the covenant the climate record is held to. The record is built in honour of Janine M. H. Selendy and Horizon International."
    >
      <XEqualsXCut />

      <XEqualsXInscription />

      <XEqualsXPrinciples />

      <XEqualsXRefuses />

      <XEqualsXRule />

      <XEqualsXResearchPanel />

      <XEqualsXPlatform />

      <XEqualsXCodicil />
    </ClimateRecordShell>
  );
}