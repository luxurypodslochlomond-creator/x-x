import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXCovenantField from '@/components/climate/XEqualsXCovenantField';
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
import XEqualsXLightPlate from '@/components/climate/XEqualsXLightPlate';
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
      eyebrow="The terms of this record"
      title="Nobody above anybody."
      statement="Kept in Scotland. Every entry with its source, every correction in the open, no funder's name on the door — and nobody above anybody in it."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Built in honour of Janine M. H. Selendy and Horizon International. The phrase ‘the record of the time’ is Laurie Anderson’s, from From the Air, Big Science, 1982. No endorsement is claimed."
    >
      <XEqualsXCut />

      {/* ── THE PAGE OPENS ON A DRAWING, NOT ON A SENTENCE ────────────────────────
          Two plates were drawn for this page and then never printed: the mark itself,
          two upright strokes held at exactly the same height, and the light leaving a
          small source in widening waves. Both are here now, at the top, because a reader
          decides in about a second and that decision is made by light rather than by
          argument. Nothing is claimed by them that the page does not go on to check. */}
      <XEqualsXMarkPlate />

      {/* One plate, and the reader's arrival is what draws it. It runs past the reading
          measure on purpose: the page's drawing is printed bigger than its type, and it
          breaks the column so the page stops reading as a form. */}
      <XEqualsXCovenantField />

      {/* ── THE MESSAGE IS THE TERMS, NOT THE CASE FOR THEM ────────────────────────
          "Why this had to be written down" was printed here for one draft, and it was
          the wrong thing on this page: an argument invites a counter-argument, and a
          counter-argument is a conversation — not an art object. What a tight reader
          wants from a covenant is the terms and where they run out, in lines short
          enough to check against the record while standing up. The argument is folded
          below, where the proof already sits. */}
      <XEqualsXWhatItAsks />

      {/* The case that gives the mark teeth, and the only evidence on the spine.
          Somebody built the thing; somebody else's name went on it. That is the oldest
          grievance in art, in science and in every workshop on earth, and it needs no
          cosmology to be felt — only the sources, which sit under it. */}
      <XEqualsXWhoIsCredited />

      {/* Light, then the record itself — not a description of it, an entry out of it that
          a reader can follow to its source. The connection to the climate platform is the
          thing being proved, so it comes before the argument for it. */}
      <XEqualsXLightPlate />
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
        {/* ── THE PAGE PUT THROUGH THE SIX HARDEST READERS ─────────────────────────
            Folded because six questions and six answers is an interrogation, not an art
            object — and it is the proof the summary line promises. The readers most
            likely to refuse the mark are handed the floor: a research institute, an art
            critic, the person whose red was borrowed, a physicist, the founder, and the
            machine. Each gets their real question, and the answer includes where it runs
            out. */}
        <XEqualsXSurvives />
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