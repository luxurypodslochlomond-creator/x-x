import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, PenLine } from 'lucide-react';

// ── WHOSE WORDS ARE THESE ──────────────────────────────────────────────────────
// Brian, 24 November: "we need to make sure The Wire doesn't mess with Francis or Janine
// and their responsibilities to the world."
//
// He is right to ask, and the answer belongs on the page rather than in a conversation,
// because the risk is not that the record lies. The risk is that a reader sees a name on a
// record and assumes that person wrote it. Janine's brief is what this record was built to.
// Francis's drawings are Francis's. Neither of them signs a signal. The keeper who does has
// their name printed on the entry, and an entry with no name says so out loud instead of
// leaving the space looking filled.
//
// Kept to three short lines on purpose. A paragraph of reassurance is the thing nobody reads.

const PEOPLE = [
  {
    who: 'Janine Selendy',
    role: 'The brief',
    line: 'This record is built to her brief. The words on each Wire entry are the record’s own, signed by whoever checked it — she is not asked to answer for them, and nothing here is put in her mouth.',
  },
  {
    who: 'Francis Umendu Odupute',
    role: 'The drawings',
    line: 'The drawings in the cartoon room are his and other cartoonists’ work. The record holds them, credits them and never speaks for them. A drawing is shown as it was given.',
    to: '/ClimateCartoons/Francis',
  },
  {
    who: 'The keeper who signed it',
    role: 'The entry',
    line: 'Every published Wire entry carries the name of the person who signed it onto the record, beside its source. Where there is no name, the entry says it is unsigned.',
    to: '/ClimateMethod',
  },
];

export default function SignalsWhoAnswers() {
  return (
    <details className="news-authorship" aria-label="Who signs what on the record">
      <summary><h2><PenLine size={17} aria-hidden="true" /> Whose words these are</h2><ChevronDown size={17} aria-hidden="true" /></summary>
      <div className="news-authorship-people">{PEOPLE.map(person => <details key={person.who}>
        <summary><span><strong>{person.who}</strong><small>{person.role}</small></span><ChevronDown size={17} aria-hidden="true" /></summary>
        <p>{person.line}</p>
        {person.to && <Link to={person.to}>Read more <ArrowUpRight size={15} aria-hidden="true" /></Link>}
      </details>)}</div>
    </details>
  );
}