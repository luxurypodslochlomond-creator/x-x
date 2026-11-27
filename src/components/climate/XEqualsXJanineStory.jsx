import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXJanineStory() {
  return (
    <section aria-labelledby="janines-work">
      <p className="covenant-kicker">Where this begins</p>
      <h2 id="janines-work">A lifetime of looking for what helps.</h2>
      <p>At fifteen, Janine Selendy surfaced from a dive in Beirut harbour covered in oil. She has described that moment as her first awareness of damage to Earth.</p>
      <p>Through four decades of Horizon International, she brought people’s practical answers to problems of health, poverty and the environment into books, films and the Solutions Site.</p>
      <p><strong>This record grows from that work.</strong> Not just a place to look back, but somewhere to keep finding, questioning and sharing what can help.</p>
      <Link to="/ClimateFounder" className="covenant-text-link">Meet Janine and her work <span aria-hidden="true">→</span></Link>
    </section>
  );
}