import React from 'react';
import { Link } from 'react-router-dom';

// The limits, attached to the covenant.
//
// A mark without a date, a limit and a signature is a poster. This is what makes the page
// quotable without being lieable: every limit the mark has is written underneath it, in the
// same plain hand, and left visible.
//
// Called the limits, not a codicil: the word "codicil" is what a lawyer calls this, and a
// reader should not have to ask what a heading means.
//
// It was set in tracked capitals with orange numerals and three all-caps labels — five
// headings shouting at five paragraphs that were only trying to be read. The numerals stay,
// because they are how a limit is cited. Everything else is now spoken, not announced.
//
// It ends unsigned because no person has typed a name into it yet. That is the record's own
// rule for every entry, and there is no reason this page should be the exception.

const LIMITS = [
  {
    n: '01',
    title: 'What is claimed',
    text: 'One thing only: that equal human worth is a decision this record takes, on purpose, and holds itself to. Everything else on this page describes what the record does. That part can be checked by using it.',
  },
  {
    n: '02',
    title: 'What is not claimed',
    text: 'That every claim on the record is equally true. That a crisis affecting millions is the same size as one affecting a few. That the record knows you, or is conscious, or that anything here makes anybody safer. None of that is claimed, and none of it is true.',
  },
  {
    n: '03',
    title: 'What must not be added',
    text: 'No borrowed physics, no borrowed poetry, and no sentence that sounds like a revelation. A decision dressed up as a discovery stops being either. Anyone adding to this page has to add to these limits in the same breath.',
  },
  {
    n: '04',
    title: 'What must not be lost',
    text: 'The date, the name of whoever took responsibility, and the link to how the record works. A reader arriving years from now should be able to check the rules, doubt the sentence, and still find a person. If any of the three goes missing, the page has failed even where every line on it is true.',
  },
  {
    n: '05',
    title: 'If this is wrong',
    text: 'Say so in public, with the correction standing beside the original. This record corrects in daylight; a thing quietly fixed is a thing nobody can audit. No line on it is above being taken apart, this one included.',
  },
];

export default function XEqualsXCodicil() {
  return (
    <section aria-labelledby="the-limits" className="pt-9">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div
          id="the-limits"
          role="heading"
          aria-level={2}
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '21px', lineHeight: 1.25 }}
        >
          The limits
        </div>
        <p className="font-mono text-[12.5px] text-[#5a5246]">Read with the mark</p>
      </div>

      <p className="mt-3">
        Attached to the covenant above, so that it cannot be quoted without them.
      </p>

      <div className="mt-6">
        {LIMITS.map(({ n, title, text }) => (
          <div key={n} className="grid grid-cols-[28px_1fr] gap-x-3 border-t border-[#141210]/20 pt-4 pb-5">
            <p className="font-mono text-[12.5px] text-[#5a5246]">{n}</p>
            <div>
              <div
                className="text-[#141210]"
                style={{ fontFamily: 'var(--font-display)', fontSize: '17px', lineHeight: 1.3 }}
              >
                {title}
              </div>
              <p className="mt-1.5">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-1 border-t border-[#141210]/20 pt-5 space-y-4">
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">Placed on the record</dt>
          <dd className="mt-1">2 November 2026</dd>
        </div>
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">Signed</dt>
          <dd className="mt-1">
            Not yet. A machine cannot sign, and no person has typed a name here. So this page is
            unsigned, and says so, rather than leaving a blank line where a person should be.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">
            To check the rules, correct a line, or take it up
          </dt>
          <dd className="mt-1.5 flex flex-col gap-1.5">
            <Link to="/ClimateMethod" className="underline decoration-[#e2602a] underline-offset-2">
              How the record works
            </Link>
            <Link to="/ClimateCorrections" className="underline decoration-[#e2602a] underline-offset-2">
              Corrections, in the open
            </Link>
            <Link to="/ClimateHandover" className="underline decoration-[#e2602a] underline-offset-2">
              Who holds the keys
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}