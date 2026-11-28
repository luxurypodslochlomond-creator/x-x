import React from 'react';
import { Link } from 'react-router-dom';

// Her published argument and the record's response are deliberately separate.
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
      <p className="record-founder-plain">Her argument is practical: make the emergencies known, make the responses known, so people can act. Not another audience to build. Knowledge people can use.</p>
      <p className="record-founder-plain">This record puts technology and AI to that work. A machine’s answer is not proof: the source, the uncertainty and the correction must stay visible. The point is to make the harm harder to hide, not to make the reader easier to watch.</p>
      <p className="record-founder-plain"><strong>Intelligence is not a licence to extract.</strong> A tool that learns from a person to sell them back to themselves is the same greed in a newer coat. Here, love outranks money, the record outranks the ranking, and nothing on this page is for sale.</p>
      <p className="record-founder-thread">
        <Link to="/ClimateCartoons/Francis">Francis Odupute</Link>, of the same paper, brings his drawings to the wall.
      </p>
    </section>
  );
}