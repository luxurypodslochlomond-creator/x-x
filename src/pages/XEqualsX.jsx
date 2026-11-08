import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXPlate from '@/components/climate/XEqualsXPlate';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXWhy from '@/components/climate/XEqualsXWhy';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';

// x = x — the covenant.
//
// ── WHAT WAS TAKEN OFF THIS PAGE, AND WHY ─────────────────────────────────────
// The founder read it back and said it was weird, out of context, talking about
// Laurie Anderson and Lou Reed, pointing at a colour and at a song, and that it looked
// like a machine had written it. He was right on every count, and the reason is simple:
// the page was explaining its own references instead of making its point.
//
// Three whole sections are gone.
//
//   • The quotation. Two lines of her song, set at thirty-one pixels, with a paragraph
//     underneath explaining what they meant — on a page whose eyebrow already says
//     "Record of the Time". A quote that needs a footnote to land is a password, not a
//     quotation. The name it gave us is credited in one line at the foot instead.
//
//   • "What is owed". Two names, each with a reason. Laurie Anderson's was at least a
//     real debt — a colour and a phrase. Lou Reed's said he was "the reason this page
//     says a thing in ordinary words and then stops", which is a claim nobody on earth
//     can verify and a reviewer would rightly laugh at. A page about not saying more
//     than you can stand behind cannot open with a sentence like that.
//
//   • The machine's note about itself. A machine writing careful prose about its own
//     limits is the single most machine-like thing on the platform. The covenant is
//     stronger for not making room for it.
//
// What is left is five things, in order, and the mark first:
//
//   1. what the mark means, and the one limit that keeps it honest;
//   2. why a record has to exist at all — what is lost when nobody writes it down;
//   3. the line, drawn;
//   4. what a reader can verify without trusting us, which is the whole claim;
//   5. what the record promises, each with its own limit;
//   6. the limits — what the mark does NOT claim.
//
// Nothing here is borrowed poetry, and nothing here points at a sleeve.

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Record of the Time · The covenant"
      marker="The rule this record is held to"
      title="Nobody above anybody."
      statement="Equal human worth — a decision, taken on purpose, and the rule every page is kept to."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="The covenant the climate record is held to. The record is built in honour of Janine M. H. Selendy and Horizon International. The phrase 'the record of the time' is Laurie Anderson's, from O Superman; she has not read this page and does not endorse it."
    >
      <XEqualsXCut />

      <XEqualsXInscription />

      <XEqualsXWhy />

      <XEqualsXPlate />

      <XEqualsXCheck />

      <XEqualsXResearchPanel />

      <XEqualsXCodicil />
    </ClimateRecordShell>
  );
}