import React from 'react';
import { Link } from 'react-router-dom';
import { MarkSeal, MarkMethod, MarkCorrection } from '@/components/climate/RecordFootMarks';

// ── THE LIMITS, GIVEN A DOOR EACH ────────────────────────────────────────────────
// These three lines used to be a drop-down: six paragraphs folded behind a summary,
// each with a link buried at the end of it. That is why the section felt bolted on —
// nothing in it was part of the page, it was a drawer beside the page.
//
// They are three drawn doors now, in the same hand as the masthead, because the record
// already had a drawing for every one of them and was not using them here. The sentence
// stays short enough to hold in the head, and the limit is the sentence: a seal proves
// the words have not moved, not that they are true. A reader who wants the working goes
// through the mark, and the mark is the same one that stands on the page it opens.
const LIMITS = [
  {
    to: '/ClimateSeals',
    Mark: MarkSeal,
    where: 'Check a seal',
    says: 'A seal shows the words have not moved. It cannot show that they are true.',
  },
  {
    to: '/ClimateMethod',
    Mark: MarkMethod,
    where: 'How the record is kept',
    says: 'Two keepers must agree before anyone joins the guest list or leaves it. Whoever runs the app can still reach the record.',
  },
  {
    to: '/ClimateCorrections',
    Mark: MarkCorrection,
    where: 'What was corrected',
    says: 'Every correction is dated and public. Holding an entry back is not a correction, and is never counted as one.',
  },
];

export default function XEqualsXLimits() {
  return (
    <section aria-labelledby="limits" className="covenant-limits-section">
      <p className="covenant-label">For anyone checking</p>
      <h2 id="limits">What it cannot do.</h2>
      <ul className="covenant-limits">
        {LIMITS.map(({ to, Mark, where, says }) => (
          <li key={to} className="covenant-limit">
            <Link to={to}>
              <span className="covenant-limit-mark" aria-hidden="true"><Mark size={30} /></span>
              <span className="covenant-limit-text">
                <span className="covenant-limit-says">{says}</span>
                <span className="covenant-limit-where covenant-label">{where}</span>
              </span>
              <span className="covenant-limit-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}