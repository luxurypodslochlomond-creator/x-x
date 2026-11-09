import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXTechnology from '@/components/climate/XEqualsXTechnology';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import XEqualsXLostMarks from '@/components/climate/XEqualsXLostMarks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXFounderNote from '@/components/climate/XEqualsXFounderNote';
import RecordEpigraph from '@/components/climate/RecordEpigraph';
import XEqualsXWhereItComesFrom from '@/components/climate/XEqualsXWhereItComesFrom';
import XEqualsXWhoIsCredited from '@/components/climate/XEqualsXWhoIsCredited';
import XEqualsXWhy from '@/components/climate/XEqualsXWhy';
import XEqualsXSurvives from '@/components/climate/XEqualsXSurvives';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXMachine from '@/components/climate/XEqualsXMachine';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import RecordBand from '@/components/climate/RecordBand';

// ── THE TERMS OF THIS RECORD ───────────────────────────────────────────────────
// The page reads in one movement now, and the movement is the point: the mark, what it
// actually is, the machinery that holds it, the promises kept as records, the terms, what
// is lost without it, one entry a reader can follow, whose record it is, her words, and
// then the debts and the case they rest on.
//
// Three things were wrong, and all three were structural.
//
// FIRST — the opening said itself twice. The shell printed the title and the statement,
// then the page printed the mark and the statement again, so the first screen was three
// centred blocks in the middle of a column: no weight, nothing leading, and nothing to
// look at. It is one sheet now, running the full width of the page.
//
// SECOND — the technology was at the foot, inside a collapsed section. x = x is not only
// a sentence about people; it is the rule the seals, the second key and the log are built
// to hold. Those three come before the argument for them, because the first question a
// research institute asks is not "is this beautiful", it is "what stops you lying, and can
// I confirm it without you".
//
// THIRD — the 1844 telegraph case was carrying the middle of the page on its own. It is
// the best documented instance of the thing the page is about, and it is still here, still
// cited rather than thanked — but at the end, under the debts, as the case the argument
// rests on rather than as the argument itself. The dots are not the subject of this record.
// They are one proof that a name can come off the work that made it, and that the machinery
// of a record is how it stays on.
export default function XEqualsX() {
  return (
    <ClimateRecordShell
      compact
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
    >
      <XEqualsXCut />

      <XEqualsXOpening />

      <XEqualsXInscription />

      <XEqualsXTechnology />

      <XEqualsXResearchPanel />

      <XEqualsXWhatItAsks />

      <XEqualsXLostMarks />

      {/* Not a description of the record — an entry out of it, with a link to its origin. */}
      <RecordInPractice />

      <XEqualsXFounderNote />

      <div className="my-10">
        <RecordEpigraph />
      </div>

      <XEqualsXWhereItComesFrom />

      {/* The case, and the debts the case rests on, together at the end. */}
      <XEqualsXWhoIsCredited />

      <RecordBand id="long-version" label="For the record" title="The long version">
        <details className="border-t border-record-ink/15 pt-1">
          <summary className="cursor-pointer py-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-record-muted marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
            The argument, the six readers, what can be checked, the limits
          </summary>
          <div className="pt-2">
            <XEqualsXWhy />
            <XEqualsXSurvives />
            <XEqualsXCheck />
            <XEqualsXCodicil />
            <XEqualsXMachine />
            <XEqualsXThanks />
          </div>
        </details>
      </RecordBand>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-record-muted">
        Not yet signed by a person.
      </p>
    </ClimateRecordShell>
  );
}