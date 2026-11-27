import React from 'react';

const CASE_SOURCE = 'https://www.selendygay.com/news/general/2026-06-25-meta-sued-over-surveillance-and-gag-order-silencing-whistleblower-sarah-wynn-williams';

// ── THE WORLD WE ARE IN, SAID WITHOUT A LECTURE ────────────────────────────────
// This section used to explain the record's rules to a reader who had not yet been given
// a reason to care. Activists do not need the rules first. They need the world named: a
// system that extracts attention and evidence, and a planet losing the argument because
// the evidence does not reach the people who could act on it.
//
// The case is named carefully, because a real person is in it. She is a named whistleblower
// in a live case, so the page says what she alleges, says plainly that these are allegations,
// and does not put words in her mouth or turn her into a poster.
export default function XEqualsXStand() {
  return (
    <section className="covenant-world" aria-labelledby="the-world">
      <p className="covenant-kicker">The world we are in</p>
      <h2 id="the-world">The planet is not short of information.<br />It is short of a record.</h2>
      <ul className="covenant-world-lines">
        <li>
          <strong>Feeds reward what holds you, not what changes anything.</strong>
          A crisis becomes a clip. A working solution is gone by Thursday. The people best placed to act never see the work that already exists.
        </li>
        <li>
          <strong>Extraction is not only of forests and water.</strong>
          It is of attention, of evidence, and of the time people need to act on either.
        </li>
        <li>
          <strong>Nobody is coming to fix it for us.</strong>
          Not a platform, not a court, not a funder. What is left is what people build and keep together, in the open.
        </li>
      </ul>
      <aside className="covenant-case" aria-label="A named example, in the open">
        <p className="covenant-case-label">What speaking up can cost</p>
        <p>Sarah Wynn-Williams, a former Facebook public-policy director, sued Meta in June 2026. She alleges the company surveilled her and used a private arbitration gag order to silence her. She is represented by Selendy Gay and Katz Banks Kumin.</p>
        <a href={CASE_SOURCE} target="_blank" rel="noopener noreferrer">Read the announcement, 25 June 2026 ↗<span className="sr-only"> (opens a new tab)</span></a>
        <p className="covenant-case-small">These are allegations in a live case, not findings. We name the case because it shows the scale of what people are up against — not to speak for her.</p>
      </aside>
    </section>
  );
}