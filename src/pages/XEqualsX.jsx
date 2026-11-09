import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXWhereItComesFrom from '@/components/climate/XEqualsXWhereItComesFrom';
import XEqualsXSurvives from '@/components/climate/XEqualsXSurvives';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXLostMarks from '@/components/climate/XEqualsXLostMarks';
import XEqualsXWhoIsCredited from '@/components/climate/XEqualsXWhoIsCredited';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXWhy from '@/components/climate/XEqualsXWhy';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXMachine from '@/components/climate/XEqualsXMachine';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXMarkPlate from '@/components/climate/XEqualsXMarkPlate';
import RecordEpigraph from '@/components/climate/RecordEpigraph';

// ── THE TERMS OF THIS RECORD ───────────────────────────────────────────────────
// The page reads in one line now, and the line is: the mark, what it means, what it
// binds, what is lost without it, the case that proves the point, an entry a reader can
// follow, whose record it is, where the mark came from, her words, then the dossier.
//
// Two things were wrong before this and both were structural rather than editorial.
//
// FIRST: two plates of the same mark, one above the other, the second with eight arcs
// leaving it that read as a signal fault rather than as light. A reader arriving cold
// asked what the two drawn things were meant to be — which is the whole review, in one
// question. There is one plate now and it names its own parts: one, and another.
//
// SECOND: her quote sat four bands away from the band that explains what was borrowed
// from her, so the same debt was told twice in two places and the page seemed to repeat
// itself. Provenance and the quotation are one movement now: the phrase, the red, her
// name, her words, and the limit under them.
//
// The institutional footer is gone from the shell on this page. It named a research
// institute and a founder and then said "no endorsement is claimed" — a disclaimer under
// a name is the shape of a claim, and the page already states both debts in its own body,
// in full, where they can be read as debts.
export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="The terms of this record"
      title="Nobody above anybody."
      statement="Every entry with its source. Every correction in the open. No funder’s name on the door."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
    >
      <XEqualsXCut />

      <XEqualsXMarkPlate />

      <XEqualsXInscription />

      <XEqualsXWhatItAsks />

      <XEqualsXLostMarks />

      <XEqualsXWhoIsCredited />

      {/* Not a description of the record — an entry out of it, with a link to its origin. */}
      <RecordInPractice />

      <XEqualsXFounderNote />

      <XEqualsXWhereItComesFrom />

      <div className="my-10">
        <RecordEpigraph />
      </div>

      <details className="mb-5 border-y border-record-ink/25 py-1">
        <summary className="cursor-pointer py-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-record-muted marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
          The long version — the argument, the six readers, the limits
        </summary>
        <XEqualsXWhy />
        <XEqualsXSurvives />
        <XEqualsXCheck />
        <XEqualsXResearchPanel />
        <XEqualsXCodicil />
        <XEqualsXMachine />
        <XEqualsXThanks />
      </details>

      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
        Not yet signed by a person.
      </p>
    </ClimateRecordShell>
  );
}