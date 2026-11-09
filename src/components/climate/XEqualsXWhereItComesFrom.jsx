import React from 'react';
import { MarkEqual } from './RecordFootMarks';
import '@/components/climate/x-equals-x-field.css';

// ── WHERE THIS CAME FROM ───────────────────────────────────────────────────────
// The page argued for six sections about why a record matters and never once said
// where it came from — which is the one question a reader actually has. A mark that
// arrives with no story behind it is a logo, and a logo asking to be trusted is a
// brand. So: the conversation it started in, the hand it is printed with, and the one
// colour on it that belongs to somebody else.
//
// The first line is the whole point of the section. It began in a conversation about
// Yale. No pass from Yale is asked for here, and none is offered. An institution
// agreeing with you has never once made a thing true — and a record that borrowed a
// letterhead to look serious would be doing exactly what this one exists to refuse.
const NOTES = [
  {
    term: 'The conversation',
    body: (
      <>
        It started with a message about Yale. No pass from Yale is asked for here, and none is
        offered — nor from any other university, funder or letterhead. An institution agreeing with
        you has never once made a thing true. A source is a source. A name on a crest is not.
      </>
    ),
  },
  {
    term: 'The hand',
    body: (
      <>
        Beadie — warm paper, ink, one signal red. Every mark on this record is cut by hand rather
        than licensed from a set, which is why it looks like nothing else and belongs to nobody
        else. That is the whole of the brand: a hand, a stock, a red, and no logo telling you what
        to think.
      </>
    ),
  },
  {
    term: 'The borrowed red',
    body: (
      <>
        <span className="font-mono text-[13px] text-record-mark">#CC2D2A</span> is Laurie Anderson’s.
        It was measured off the sleeve of <em>O Superman</em>, and “the record of the time” is her
        phrase too, from <em>From the Air</em>. If she asks, both come off the same day, and the
        removal is printed here rather than done quietly.
      </>
    ),
  },
];

export default function XEqualsXWhereItComesFrom() {
  return (
    <section aria-labelledby="where-it-comes-from" className="my-10 border-t border-record-ink/25 pt-7">
      <div className="flex items-baseline gap-3">
        <MarkEqual size={22} className="shrink-0 translate-y-[3px] text-record-ink" />
        <h2
          id="where-it-comes-from"
          className="text-[22px] leading-[1.15] text-record-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Where this came from
        </h2>
      </div>

      <dl className="mt-6 space-y-5">
        {NOTES.map(({ term, body }) => (
          <div key={term} className="xc-note">
            <dt className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-record-muted">{term}</dt>
            <dd className="max-w-[54ch] text-[15.5px] leading-[1.62] text-record-ink">{body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}