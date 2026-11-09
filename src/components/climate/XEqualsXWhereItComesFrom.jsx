import React from 'react';
import RecordBand from './RecordBand';
import { MarkEqual } from './RecordFootMarks';

// ── WHERE IT CAME FROM, SAID ONCE ──────────────────────────────────────────────
// Two debts, and nothing else: the conversation it began in, and the two things it took
// from a stranger's sleeve — her phrase and her red. Both are stated as facts and both
// have a way out attached, which is what separates a debt from a claim.
//
// Cut from this band, and staying cut: three sentences arguing with a reviewer who had not
// arrived ("no pass is asked for here", "an institution agreeing with you has never once
// made a thing true"). All true, all defensive, and all of it addressed to the one reader
// who had already decided to say no. A page that answers an objection before it is made
// looks as though it expects one.
const NOTES = [
  {
    term: 'The conversation',
    body: (
      <>
        It began with one message, from one person at one research institute. That institute has
        not read this and has not agreed to it, and nothing here is written to win its approval.
        The same holds for every other university, funder and letterhead: this is written for
        whoever reads it.
      </>
    ),
  },
  {
    term: 'What it owes her',
    body: (
      <>
        “The record of the time” is Laurie Anderson’s phrase, from <em>From the Air</em>. The red
        on this page is measured off the sleeve of <em>O Superman</em>. She has not read this and
        has not agreed to it. If she asks, both come off the same day, and the removal is printed
        here rather than done quietly.
      </>
    ),
  },
];

export default function XEqualsXWhereItComesFrom() {
  return (
    <RecordBand id="where-it-comes-from" label="Provenance" title="Where this came from" icon={MarkEqual}>
      <dl className="space-y-5">
        {NOTES.map(({ term, body }) => (
          <div key={term}>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">{term}</dt>
            <dd className="mt-1.5 max-w-[52ch] text-[15.5px] leading-[1.6] text-record-ink">{body}</dd>
          </div>
        ))}
      </dl>
    </RecordBand>
  );
}