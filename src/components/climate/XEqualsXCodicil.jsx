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
    title: 'What was left out, on purpose',
    text: 'Every argument that would have made the mark easier to like — borrowed physics, borrowed poetry, a phrase that sounds like a revelation. A decision dressed as a discovery stops being either. Anyone adding to this page has to add to its limits in the same breath.',
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
    <section aria-labelledby="the-limits" className="py-7">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="the-limits"
          className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#5a5246]"
        >
          The limits
        </h2>
        <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#e2602a]">
          Read with the mark
        </p>
      </div>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Attached to the covenant above, so that it cannot be quoted without them.
      </p>

      <div className="mt-5">
        {LIMITS.map(({ n, title, text }) => (
          <div
            key={n}
            className="grid grid-cols-[26px_1fr] gap-x-1 border-t border-[#141210]/25 pt-3 pb-4"
          >
            <p className="font-mono text-[10.5px] font-black text-[#e2602a]">{n}</p>
            <div>
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#141210]">
                {title}
              </p>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-[#141210]">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-2 border-t-2 border-[#141210] pt-4 space-y-3 font-mono">
        <div>
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#5a5246]">
            Placed on the record
          </dt>
          <dd className="text-[11.5px] text-[#141210]">2 November 2026</dd>
        </div>
        <div>
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#5a5246]">
            Signed
          </dt>
          <dd className="text-[11.5px] text-[#141210]">
            Not yet. A machine cannot sign, and no person has typed a name here. So this page
            is unsigned, and says so, rather than leaving a blank line where a person should
            be.
          </dd>
        </div>
        <div>
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#5a5246]">
            To check the rules, correct a line, or take it up
          </dt>
          <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]">
            <Link to="/ClimateMethod" className="underline decoration-[#e2602a] decoration-2 underline-offset-2">
              How the record works
            </Link>
            <Link to="/ClimateCorrections" className="underline decoration-[#e2602a] decoration-2 underline-offset-2">
              Corrections, in the open
            </Link>
            <Link to="/ClimateHandover" className="underline decoration-[#e2602a] decoration-2 underline-offset-2">
              Who holds the keys
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}