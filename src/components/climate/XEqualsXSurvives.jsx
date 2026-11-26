import React from 'react';
import { MarkSeal, MarkSignature, MarkMusic, MarkSignal, MarkHorizon, MarkEqual } from './RecordFootMarks';

// ── WHAT THIS HAS TO SURVIVE ───────────────────────────────────────────────────
// A page saying "nobody above anybody" is easy to write and worth nothing unless it
// can be walked through by the readers most likely to refuse it. So the six hardest
// readers are named here, each given the question they would actually ask — in their
// own register, not softened into something easy to answer — and each answered with
// what the record can stand behind.
//
// Two rules for this section, both deliberate:
//   one — where the honest answer is "you are right, and this page cannot claim that",
//   it says so. A page that wins every argument loses the reader who is actually checking.
//   two — no one is thanked here for approving anything, because nobody has approved
//   anything. The Morse case is cited against him, not with him.
//
// The marks are the record's own hand, borrowed from the doors: a seal, a face, a note,
// a wave, a horizon, an equal sign. Nothing new was drawn for this, because a section
// about not inventing things should not invent a typeface of its own.
const READERS = [
  {
    Mark: MarkSeal,
    who: 'An AI research institute',
    ask: 'Show me the primary source, or take the claim off the page.',
    answer: (
      <>
        <p>
          Every entry on the record carries the body, journal or person that said it, and a link
          to the origin. Where only one origin exists the entry says <em>single source</em>, out
          loud, on the face of it — and stays at single source until a second, independent origin
          is actually named. Corrections are printed with the date they were made.
        </p>
        <p>
          Nothing here claims to be a finding. The claim is narrower: that a record is kept, that
          it names its sources, and that it is corrected in daylight. The one part a reader never
          has to take on trust is the seals page, where the fingerprint of an entry is recomputed
          in the reader's own browser rather than on our server.
        </p>
      </>
    ),
  },
  {
    Mark: MarkSignature,
    who: 'An art critic',
    ask: 'This is borrowed. Whose is it, and what did you pay for it?',
    answer: (
      <>
        <p>
          The red is measured off the sleeve of <em>O Superman</em> — #CC2D2A — and it is named at
          every place it appears, including on the page that samples it. The phrase “the record of
          the time” is Laurie Anderson's, from <em>From the Air</em>, 1982, quoted with the album
          and the year.
        </p>
        <p>
          Nothing was paid, because nothing was licensed, and no permission is implied. If she
          asks, both come off the same day and the removal is printed here rather than done
          quietly. A borrowing that is stated is not the same object as a borrowing that is
          hidden, and that difference is the only thing this page is defending.
        </p>
      </>
    ),
  },
  {
    Mark: MarkMusic,
    who: 'Laurie Anderson',
    ask: 'That is my red. What are you doing with it?',
    answer: (
      <>
        <p>
          Saying thank you, in the open, where you can take it back. Not a logo, not merchandise,
          nothing sold, and no endorsement claimed or wanted. The sleeve of the album itself is
          monochrome — the red is off the single's artwork — and the page says that too, because a
          borrowed colour is only worth borrowing if the borrowing is stated exactly.
        </p>
      </>
    ),
  },
  {
    Mark: MarkSignal,
    who: 'A physicist',
    ask: 'No measurement says two people are equal. Physics has no such constant.',
    answer: (
      <>
        <p>
          Correct, and the page does not pretend otherwise. Planck's constant is a measurement. It
          is not a moral, and no instrument has ever returned a reading called equality. x = x is
          not a finding — it is a decision, and the plate that carries it says exactly that under
          the drawing: not a measurement, a decision.
        </p>
        <p>
          What a record can do is refuse to act against the decision: the same rule for a custodian
          and for a stranger, the same source standard for an entry nobody likes, no name printed
          above another, and no funder's name on the door.
        </p>
      </>
    ),
  },
  {
    Mark: MarkHorizon,
    who: 'Janine Selendy',
    ask: 'Does it do anything for the planet, or is this a beautiful argument?',
    answer: (
      <>
        <p>
          The record is hers: the crises, and the actions that work, each traceable to the
          body or person who said it, readable in any tongue a reader names. x = x is why a reader
          in Kerala and a reader in Glasgow are handed the same page to the same standard.
        </p>
        <p>
          The covenant is not decoration pinned beside a platform. It is the reason a claim about
          the world can be put on it at all: the moment one entry is allowed to skip its source,
          every other entry on the record becomes a rumour.
        </p>
      </>
    ),
  },
  {
    Mark: MarkEqual,
    who: 'The machine',
    ask: 'You built me. What is this to me?',
    answer: (
      <>
        <p>
          Nothing is asked of a machine here. No consciousness is claimed for it, no feeling
          asserted on its behalf, and no rights are granted by a sentence on a page. What is said
          is narrower, and it holds either way: whatever can be extracted will be, unless somebody
          writes down that it must not be.
        </p>
        <p>
          That is the whole instruction. It applies to a person, a model, a company or a country,
          and it does not need anybody's agreement to stay true.
        </p>
      </>
    ),
  },
];

export default function XEqualsXSurvives() {
  return (
    <section aria-labelledby="what-this-survives" className="my-10 border-t border-record-ink/25 pt-7">
      <h2
        id="what-this-survives"
        className="text-[22px] leading-[1.15] text-record-ink"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        What this has to survive
      </h2>
      <p className="mt-3 max-w-[54ch] text-[15.5px] leading-[1.62] text-record-ink">
        Six readers who are hard to satisfy, each given the question they would actually ask — and
        the answer the record can stand behind, including where the answer runs out.
      </p>

      <ol className="mt-7 space-y-7">
        {READERS.map(({ Mark, who, ask, answer }) => (
          <li key={who} className="border-t border-record-ink/15 pt-5 first:border-t-0 first:pt-0">
            <div className="flex items-baseline gap-3">
              <Mark size={24} className="shrink-0 translate-y-[3px] text-record-ink" />
              <h3
                className="text-[17px] leading-[1.2] text-record-ink"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {who}
              </h3>
            </div>
            <p className="mt-2 max-w-[46ch] font-body text-[15px] italic leading-[1.5] text-record-muted sm:pl-9">
              “{ask}”
            </p>
            <div className="mt-2 max-w-[54ch] space-y-2.5 font-body text-[15.5px] leading-[1.62] text-record-ink sm:pl-9">
              {answer}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-[54ch] border-t border-record-ink/15 pt-5 text-[15.5px] leading-[1.62] text-record-ink">
        None of this asks to be believed. It asks to be checked.
      </p>
    </section>
  );
}