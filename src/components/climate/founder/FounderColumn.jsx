import React from 'react';
import { Link } from 'react-router-dom';

// ── HER OWN WORDS, WHICH WERE ALWAYS THE BRIEF ──────────────────────────────────
// Brian, 28 November: "her August article in Nigerian Observer is the key she said… don't
// make about us about her bro."
//
// He is right, and it is the difference between a founder's page and a company page. In that
// column she wrote the specification herself: spread knowledge of the emergencies AND of the
// work being done, on the phones already in everybody's hands, so people gain hope and do
// what they can. That is not our idea borrowed. It is hers, in print, in August 2026.
//
// So the quote is the heading. No preamble, no adjectives, no "our mission". One line under
// it says the only thing worth adding: the harm travels at the speed of a phone, so the
// evidence and the answers must travel at that speed too.
const COLUMN = 'https://nigerianobservernews.com/2026/08/the-changing-course-of-climate-change/';

export default function FounderColumn() {
  return (
    <section className="record-founder-sheet" aria-labelledby="founder-column">
      <p className="record-founder-kicker">Her words · August 2026</p>
      <blockquote id="founder-column" className="record-founder-pull">
        “We can share immediate knowledge of climate emergencies and of positive actions on an international scale.”
      </blockquote>
      <p className="record-founder-attrib">
        <span>Janine M. H. Selendy</span>
        <a href={COLUMN} target="_blank" rel="noopener noreferrer">Read the column ↗<span className="sr-only"> (opens a new tab)</span></a>
      </p>
      <p className="record-founder-plain">Climate emergencies. Work that responds. Knowledge people can use and pass on.</p>
      <p className="record-founder-thread">
        The Nigerian Observer published her column. <Link to="/ClimateCartoons/Francis">Francis Odupute</Link>, of the same paper, brings his drawings to the wall.
      </p>
    </section>
  );
}