import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXMarkPlate from '@/components/climate/XEqualsXMarkPlate';
import XEqualsXLightPlate from '@/components/climate/XEqualsXLightPlate';
import XEqualsXLostMarks from '@/components/climate/XEqualsXLostMarks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXWhy from '@/components/climate/XEqualsXWhy';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXMachine from '@/components/climate/XEqualsXMachine';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import RecordEpigraph from '@/components/climate/RecordEpigraph';

// ── WHY THIS RECORD ────────────────────────────────────────────────────────────
// A reader decides whether a page is worth their eye in about a second, and that
// decision is made by light, not by argument. So the argument has moved down the page
// and the drawings have moved up: the mark, then the light, then a real entry they can
// follow to its source, then three objects that carry the reason in a single line each.
//
// Nothing has been removed from the record to do this. The full argument, the three
// things a reader can check without trusting us, the promises, the limits, the note
// from the machine and the debt owed to a borrowed colour are all still here, gathered
// in one place a reviewer can open when they want the paper trail rather than the page.
//
// Art first. Evidence one touch away. That is the order a stranger actually reads in.
export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Why this record"
      title="Nobody above anybody."
      statement="Equal human worth, held as a decision this record takes on purpose — and the limits it holds itself to, said in the open."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Built in honour of Janine M. H. Selendy and Horizon International. The phrase ‘the record of the time’ is Laurie Anderson’s, from From the Air, Big Science, 1982. No endorsement is claimed."
    >
      <XEqualsXCut />

      <XEqualsXInscription />

      {/* The covenant, drawn. */}
      <XEqualsXMarkPlate />

      {/* What a reader meets before a word of it: light. */}
      <XEqualsXLightPlate />

      {/* One real entry, not a screenshot of one. */}
      <RecordInPractice />

      {/* The reason, in three marks and three lines. */}
      <XEqualsXLostMarks />

      {/* Her words, her red, her name — and the limit said under them. */}
      <RecordEpigraph />

      <details className="mb-5 border-y border-record-ink/25 py-1">
        <summary className="cursor-pointer py-4 font-body text-lg text-record-ink marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
          The argument, the proof, and the limits
        </summary>
        <XEqualsXWhy />
        <XEqualsXCheck />
        <XEqualsXResearchPanel />
        <XEqualsXCodicil />
        <XEqualsXMachine />
        <XEqualsXThanks />
      </details>

      <p className="record-meta text-record-muted">This covenant is not yet signed by a person.</p>
    </ClimateRecordShell>
  );
}