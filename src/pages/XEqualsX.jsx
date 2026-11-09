import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXCovenantField from '@/components/climate/XEqualsXCovenantField';
import XEqualsXWhereItComesFrom from '@/components/climate/XEqualsXWhereItComesFrom';
import XEqualsXNoteFromTheBuilder from '@/components/climate/XEqualsXNoteFromTheBuilder';
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
      statement="Kept in Scotland. Every entry with its source, every correction in the open, no funder's name on the door — and nobody above anybody in it."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Built in honour of Janine M. H. Selendy and Horizon International. The phrase ‘the record of the time’ is Laurie Anderson’s, from From the Air, Big Science, 1982. No endorsement is claimed."
    >
      <XEqualsXCut />

      {/* One plate, and the reader's arrival is what draws it. It runs past the reading
          measure on purpose: the page's only drawing is printed bigger than its type,
          and it breaks the column so the page stops reading as a form. */}
      <XEqualsXCovenantField />

      {/* Him. The page had a section for the founder and none for the person who made
          it, which is why it read as a document about a principle rather than something
          somebody did. First person, signed, and no credential asked for. */}
      <XEqualsXNoteFromTheBuilder />

      {/* The case that gives the mark teeth, and the reason it stands this high on the page.
          Somebody built the thing; somebody else's name went on it. That is the oldest
          grievance in art, in science and in every workshop on earth, and it needs no
          cosmology to be felt — only the sources, which are attached below. */}
      <XEqualsXWhoIsCredited />

      {/* And then the record itself, straight away — not a description of it, an entry
          out of it that a reader can follow to its source. The connection to the climate
          platform is the thing being proved, so it comes before the argument for it. */}
      <RecordInPractice />

      {/* Two columns rather than two more blocks in a stack: what the covenant is, and
          whose record it is, read side by side instead of one after the other. */}
      <div className="grid gap-8 sm:grid-cols-[1.1fr_.9fr] sm:gap-10">
        <XEqualsXInscription />
        {/* Whose record this is, before any argument about why it exists. */}
        <XEqualsXFounderNote />
      </div>

      {/* The context the page never had: the conversation, the hand, the borrowed red. */}
      <XEqualsXWhereItComesFrom />

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