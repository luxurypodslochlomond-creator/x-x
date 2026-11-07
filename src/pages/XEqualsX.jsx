import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordEpigraph from '@/components/climate/RecordEpigraph';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXPlate from '@/components/climate/XEqualsXPlate';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';

// x = x — the covenant.
//
// Three moves, in this order, and nothing else:
//   1. what the mark means;
//   2. what the record promises — held as records, so a keeper can correct them in daylight;
//   3. the limits — what the mark does NOT claim.
//
// How an entry is actually made (where it comes from, how well it is known, who signs it) is
// the record's protocol, and it lives on How the record works. Repeating it here made this
// page a manual, and a manual read a second time is how a covenant turns into noise. The
// platform's other tools are not on this page either: this is the climate record's covenant,
// and their promises belong to them.

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Record of the Time · The covenant"
      marker="The rule this record is held to"
      title="Nobody above anybody."
      /* The mark is not dropped into either sentence. It stands on its own line, in its own
         red, in the band above — and the words refer to it. */
      statement="Equal human worth — a decision, taken on purpose, and the rule every page of this record is kept to."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="The covenant the climate record is held to. The record is built in honour of Janine M. H. Selendy and Horizon International."
    >
      {/* Her line opens the page, because the thought this covenant is kept to was said
          out loud by somebody else first, in 1982, and pretending otherwise would be the
          first lie on a page about not lying. */}
      <section className="mb-10">
        <RecordEpigraph />
      </section>

      <XEqualsXCut />

      <XEqualsXInscription />

      <XEqualsXPlate />

      {/* Right after "what is borrowed", because a debt named and a person thanked belong
          beside each other — and never as a general thank-you list. */}
      <XEqualsXThanks />

      <XEqualsXResearchPanel />

      <XEqualsXCodicil />
    </ClimateRecordShell>
  );
}