import React from 'react';
import { Link } from 'react-router-dom';

// Her published words and original work, not borrowed institutional authority.
export default function XEqualsXFounderNote() {
  return (
    <section id="whose-record" className="covenant-founder" aria-labelledby="janines-work">
      <p className="covenant-kicker">More than forty years of work</p>
      <h2 id="janines-work"><Link to="/ClimateFounder">Janine M. H. Selendy</Link></h2>
      <p>
        <strong>Founder of Horizon International.</strong> Four decades bringing together work on health,
        the environment and poverty, through the Solutions Site, books and documentaries.
      </p>
      <blockquote className="covenant-founder-words">
        “Together we can change the course of climate change.”
      </blockquote>
      <p>
        Her request is the purpose of this record: share climate emergencies and positive
        actions internationally, so others can learn from the work and act.
      </p>
      <p className="covenant-caption covenant-founder-source">
        Her words, in{' '}
        <a href="https://www.solutions-site.org/node/1648" target="_blank" rel="noopener noreferrer">
          <cite>The Changing Course of Climate Change</cite> · 2026 ↗
          <span className="sr-only"> (opens a new tab)</span>
        </a>
        <span className="covenant-source-name">Horizon International Solutions Site</span>
      </p>
    </section>
  );
}