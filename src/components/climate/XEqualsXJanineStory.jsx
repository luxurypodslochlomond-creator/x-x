import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXJanineStory() {
  return (
    <section className="covenant-origin" aria-labelledby="janines-work">
      <div className="covenant-origin-inner">
        <p className="covenant-kicker">Janine Selendy · Horizon International</p>
        <h2 id="janines-work">The work this builds on.</h2>
        <p>In Janine Selendy’s own account, a dive in Beirut harbour became her first awareness of damage to Earth.</p>
        <p>Her work through Horizon International brought together health, the environment and practical responses. This record follows that approach: document the damage, examine responses and make the source material accessible.</p>
        <p>The Wall carries cartoonists’ work as commentary and witness, not as decoration or scientific evidence. The artist’s name, context and rights stay with the work. A drawing can stand on its own or be linked to an entry.</p>
        <div className="covenant-inline-links">
          <Link to="/ClimateFounder">Janine’s account and work →</Link>
          <Link to="/ClimateCartoons">Meet the hands on the Wall →</Link>
        </div>
        <details className="covenant-provenance">
          <summary>Trace the connection to her published work</summary>
          <div>
            <p>Wiley lists Janine M. H. Selendy as an editor of <em>Water and Sanitation-Related Diseases and the Changing Environment</em>, and identifies her with Horizon International at Yale University. Its chapters connect water, health, climate and practical interventions.</p>
            <a href="https://onlinelibrary.wiley.com/doi/book/10.1002/9781119415961" target="_blank" rel="noopener noreferrer">Wiley · the book and editor’s biography ↗<span className="sr-only"> (opens a new tab)</span></a>
            <p>This documents her work. It does not claim university endorsement of this platform. The Wall carries each artist’s own credit; it is not the CartoonAFRICA Biennial itself.</p>
            <Link to="/ClimateCartoons/CAIB">The Wall and CartoonAFRICA: the distinction →</Link>
          </div>
        </details>
      </div>
    </section>
  );
}