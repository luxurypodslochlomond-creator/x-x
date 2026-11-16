import React from 'react';
import { Link } from 'react-router-dom';

// ── THE 29TH, ON THE ROOM'S FRONT ───────────────────────────────────────────────
// A dateline, not a poster. The record is not exhibiting, and this band never says it
// is: it prints the festival's own facts, the workshop's own title, and the introduction
// CEEW wrote for the room, in their words. Nothing here is paraphrased, because a
// paraphrase of somebody else's theme or of somebody's own introduction is a claim
// dressed up as a courtesy.
//
// Two things are deliberately absent. The workshop's joining link, which is Janine's to
// give out and not a public door to paste on a page. And her guests' contact details,
// which are theirs: a byline is a name and a role, and the rest stays in the inbox.

const ALINA = 'Alina Sen is a proud dog mom. And the founder of the sustainability cartoon series What On Earth! from the Council on Energy, Environment and Water (CEEW). CEEW is one of Asia’s leading climate and sustainability think tanks. Since 2021, Alina and her team have been working with cartoonists to deliver a new cartoon on sustainability every fortnight. She is a Communications Fellow at CEEW, publishing its research studies and also using cartoons, songs, films and public workshops to translate climate research findings into more fun and shareable cultural and art products for the wider public to engage with.';

export default function CartoonSessionBand() {
  return (
    <section className="comic-session" aria-labelledby="cartoon-session-title">
      <p className="comic-session-eyebrow">28–30 November 2026 · National Museum, Benin City</p>
      <h2 id="cartoon-session-title" className="comic-session-title">The 8th CartoonAFRICA International Biennial</h2>
      <p className="comic-session-theme">
        The festival’s theme, in its own words: “SDG, African Youths and Democracy through Humour Lenses.”
      </p>
      <dl className="comic-session-facts">
        <div>
          <dt>Where</dt>
          <dd>National Museum, Benin City, Edo State, Nigeria</dd>
        </div>
        <div>
          <dt>Format</dt>
          <dd>Hybrid — in the room and online</dd>
        </div>
        <div>
          <dt>Workshop</dt>
          <dd>
            “Climate Change and the power of collective actions and creative interventions” —{' '}
            <Link to="/ClimateFounder">Janine Selendy</Link>, Sunday 29 November, 3pm West Africa (2pm here).
          </dd>
        </div>
      </dl>
      <div className="comic-session-who">
        <h3>Who you’ll hear</h3>
        <p>{ALINA}</p>
        <p className="comic-session-attrib">In CEEW’s own words, written to introduce her at the workshop.</p>
      </div>
      <Link to="/ClimateWorkshop" className="comic-session-link">
        The hour itself, written down <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}