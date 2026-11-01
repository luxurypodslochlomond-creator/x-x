import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXDeepTime from '@/components/climate/XEqualsXDeepTime';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXContext from '@/components/climate/XEqualsXContext';
import XEqualsXPrinciples from '@/components/climate/XEqualsXPrinciples';
import XEqualsXEvidence from '@/components/climate/XEqualsXEvidence';

// The meaning of the mark, said in the record's own voice. It wears the same cold
// bands as the Founder and Support pages, so x = x reads as part of one place —
// paper, ink, one orange signal.

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Record of the Time · The meaning of the mark"
      marker="The mark · equal worth on the record"
      title="Nobody above anybody."
      statement="x = x. Equal human worth — read the record, act beyond the screen, and nothing here needs you to stay."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="x = x is the record's covenant: an emergency does not matter less because fewer people are watching. The record is built in honour of Janine M. H. Selendy and Horizon International."
    >
      <XEqualsXCut />

      <XEqualsXInscription />

      <XEqualsXDeepTime />

      <XEqualsXResearchPanel />

      <XEqualsXCodicil />

      <section className="py-6 border-b-2 border-[#141210]">
        <p className="bg-[#f7f1e5] border-2 border-[#141210] border-l-8 border-l-[#e2602a] px-4 py-4 text-[12.5px] font-mono leading-relaxed text-[#141210]">
          On this climate record, x = x means equal human worth. An emergency does not matter less because fewer people are watching. Equal worth is not equal size: a crisis affecting millions is still a larger crisis, and we count that honestly. What we refuse is the smaller one being treated as though it never happened.
        </p>
      </section>

      <div className="space-y-6 pt-6">
        <XEqualsXContext />
        <XEqualsXPrinciples />
        <XEqualsXEvidence />
      </div>
    </ClimateRecordShell>
  );
}