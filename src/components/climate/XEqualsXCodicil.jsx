import React from 'react';
import { Link } from 'react-router-dom';

// The limits, attached to the covenant.
//
// A mark without a date, a limit and a signature is a poster. These five stay, because a
// covenant anyone can quote has to be quotable without being lieable — but each is now one
// sentence. They were written at two and three, which is how a page of five rules came to
// read like a terms and conditions.
//
// It ends unsigned because no person has typed a name into it yet. That is the record's own
// rule for every entry, and there is no reason this page should be the exception.

const LIMITS = [
  {
    n: '01',
    title: 'What is claimed',
    text: 'One thing: equal human worth is a decision this record takes, on purpose, and holds itself to.',
  },
  {
    n: '02',
    title: 'What is not claimed',
    text: 'That every claim here is equally true. That a crisis of millions is the same size as one of a few. That the record knows you, or is conscious, or makes anybody safer.',
  },
  {
    n: '03',
    title: 'What must not be added',
    text: 'No borrowed physics, no borrowed poetry, no sentence that sounds like a revelation. Anyone adding to this page adds to these limits in the same breath.',
  },
  {
    n: '04',
    title: 'What must not be lost',
    text: 'The date, the name of whoever took responsibility, and the link to how the record works. Lose any one and the page has failed, even where every line on it is true.',
  },
  {
    n: '05',
    title: 'If this is wrong',
    text: 'Say so in public, with the correction standing beside the original. Nothing here is above being taken apart, this sentence included.',
  },
];

export default function XEqualsXCodicil() {
  return (
    <section aria-labelledby="the-limits" className="pt-8">
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

      <div className="mt-4">
        {LIMITS.map(({ n, title, text }) => (
          <div key={n} className="grid grid-cols-[28px_1fr] gap-x-3 border-t border-[#141210]/20 pt-3.5 pb-4">
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

      <dl className="mt-1 border-t border-[#141210]/20 pt-4 space-y-3.5">
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">Placed on the record</dt>
          <dd className="mt-1">2 November 2026</dd>
        </div>
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">Signed</dt>
          <dd className="mt-1">
            Not yet. A machine cannot sign, and no person has typed a name here — so the page
            says so instead of leaving a blank line.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[12.5px] text-[#5a5246]">To check, correct or take it up</dt>
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