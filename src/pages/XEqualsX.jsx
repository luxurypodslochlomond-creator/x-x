import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXPlate from '@/components/climate/XEqualsXPlate';
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
// This page was pared back to a heading and two paragraphs, and that was the wrong
// instinct: a covenant is not a summary. What it lost was the plate it is printed on,
// the drawing that says what it is for, the argument for why any of it had to be
// written down, the note from the machine that helped type it, and the page that names
// whose words and whose colour this record borrowed. Take those out and what is left
// is a policy page with good type — which is exactly what a reviewer opens, reads
// once, and closes.
//
// So the whole of it is here, in the order a stranger meets it: the mark, the
// statement, one real entry they can follow to its source, why it had to be written
// down, what can be checked without trusting us, what it owes, what it cannot do, and
// then the promises and limits in full. Nothing is claimed that is not also limited,
// and the seam between borrowed and own is visible everywhere it happens.
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
      {/* The incision down the edge of the page, drawn by the hand holding the phone. */}
      <XEqualsXCut />

      <XEqualsXInscription />

      {/* The one drawing on the page, and the reason there is only one. */}
      <XEqualsXPlate />

      {/* A real entry, not a screenshot of one. Follow it to its source and decide. */}
      <RecordInPractice />

      <XEqualsXWhy />

      <XEqualsXCheck />

      {/* Her words, her red, her name — and the limit said under them. */}
      <RecordEpigraph />

      <details className="mb-5 border-b border-record-ink/25 pb-5">
        <summary className="cursor-pointer py-3 font-body text-lg text-record-ink marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
          Read the promises and their limits
        </summary>
        <XEqualsXResearchPanel />
        <XEqualsXCodicil />
      </details>

      <XEqualsXMachine />
      <XEqualsXThanks />

      <p className="record-meta text-record-muted">This covenant is not yet signed by a person.</p>
    </ClimateRecordShell>
  );
}