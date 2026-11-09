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
// The first line is the whole point of the section: one conversation, one research
// institute, and that institute is not its audience.
//
// What was cut from it, and why it stays cut: three sentences arguing with a reviewer
// who had not arrived — "no pass is asked for here", "an institution agreeing with you
// has never once made a thing true", "a name on a crest is not one". All true, all
// defensive, and all of it addressed to the one reader who was already going to say no.
// A page that answers an objection before it is made looks as though it expects one, and
// a reviewer laughs at that. The facts do the work: it began there, they have not agreed,
// and that is the whole of it.
const NOTES = [
  {
    term: 'The conversation',
    body: (
      <>
        It began with one message, from one person at one research institute. That institute has not
        read this and has not agreed to it, and nothing here is written to win its approval. The
        same holds for every other university, funder and letterhead: this is written for whoever
        reads it.
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