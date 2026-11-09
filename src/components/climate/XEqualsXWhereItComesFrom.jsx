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
// The first line is the whole point of the section. It began in one conversation, with
// one research institute, and that institute is not its audience. No pass is asked for
// here and none is offered. An institution agreeing with you has never once made a thing
// true — and a record that borrowed a letterhead to look serious would be doing exactly
// what this one exists to refuse.
const NOTES = [
  {
    term: 'The conversation',
    body: (
      <>
        It started with one message, from one person at one research institute. No pass from it is
        asked for here, and none is offered — nor from any other university, funder or letterhead.
        It is written for anyone who reads, not for the people who might approve it. An institution
        agreeing with you has never once made a thing true. A source is a source. A name on a crest
        is not.
      </>
    ),
  },
  {
    term: 'What it owes her',
    body: (
      <>
        “The record of the time” is Laurie Anderson’s phrase, from <em>From the Air</em>, and the
        red on this page was taken from the sleeve of <em>O Superman</em>. She has not read this and
        has not agreed to it. If she asks, both come off the same day, and the removal is printed
        here rather than done quietly.
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