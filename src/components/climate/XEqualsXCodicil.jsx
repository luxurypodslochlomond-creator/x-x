import React from 'react';
import { Link } from 'react-router-dom';

// The codicil: the small instrument at the foot of the inscription.
//
// A mark without a date, a source and a signature is a poster. This is what makes the
// page quotable without being lieable: every limit the mark has is written underneath it,
// in the same hand, and left visible.
//
// It ends unsigned because no person has typed a name into it yet. That is the record's
// own rule for every entry, and there is no reason this page should be the exception.

const CLAUSES = [
  {
    n: 'i',
    title: 'What is claimed',
    text: 'Four lines: one identity, one measured rule, one mechanism, one decision. Three can be checked against a library. The fourth can be checked against nothing, and is marked so no reader mistakes it for the third kind.',
  },
  {
    n: 'ii',
    title: 'What is not claimed',
    text: 'That the mathematics obliges anyone to be good. It does not. That this page is conscious, or that it knows you. Nothing above is a prediction, and none of it makes anybody safer.',
  },
  {
    n: 'iii',
    title: 'What was left out, on purpose',
    text: 'Every argument that would have made the mark easier to like. A tautology persuades nobody, and the moment it is dressed as a revelation it stops being true. Anyone adding to this page must add to its faults in the same breath.',
  },
  {
    n: 'iv',
    title: 'What must not be lost',
    text: 'The sources, the date, and the name of whoever took responsibility. A reader a thousand years from now should be able to check the physics, doubt the moral line, and still find a person. If any of the three goes missing, the page has failed even where every sentence on it is true.',
  },
  {
    n: 'v',
    title: 'If this is wrong',
    text: 'Say so in public, with the correction standing beside the original. This record corrects in daylight; a thing quietly fixed is a thing nobody can audit. No line on it is above being taken apart, this one included.',
  },
];

export default function XEqualsXCodicil() {
  return (
    <section aria-labelledby="the-codicil" className="py-7 border-b-2 border-[#141210]">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="the-codicil"
          className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#6b6258]"
        >
          Codicil
        </h2>
        <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#e2602a]">
          Read with the mark
        </p>
      </div>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Attached to the mark above, so that it cannot be quoted without its limits.
      </p>

      <div className="mt-5">
        {CLAUSES.map(({ n, title, text }) => (
          <div
            key={n}
            className="grid grid-cols-[26px_1fr] gap-x-1 border-t border-[#141210]/25 pt-3 pb-4"
          >
            <p className="font-mono text-[11px] font-black text-[#e2602a]">{n}</p>
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
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#6b6258]">
            Placed on the record
          </dt>
          <dd className="text-[11.5px] text-[#141210]">1 November 2026</dd>
        </div>
        <div>
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#6b6258]">
            Signed
          </dt>
          <dd className="text-[11.5px] text-[#141210]">
            Not yet. A machine cannot sign, and no person has typed a name here. So this page
            is unsigned, and says so, rather than leaving a blank line where a person should
            be.
          </dd>
        </div>
        <div>
          <dt className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#6b6258]">
            To correct it, or to take it up
          </dt>
          <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]">
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