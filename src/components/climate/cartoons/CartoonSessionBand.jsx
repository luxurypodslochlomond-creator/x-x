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
      {/* ── EIGHT EDITIONS, AND NOT ONE GUESSED ─────────────────────────────────────
          Brian, 25 November: "how many do you think we need? imagine we had one covering the
          1st–8th cartoon festival… make sure the content of all 8 years is spot on bro."

          Spot on is the whole instruction, and it rules out the tidy version. A biennial
          table with eight filled rows would look better and would be invented: the record
          holds the first, the second, the seventh and the eighth, and it does not hold the
          years and themes in between. So the middle is not filled with arithmetic — it is
          named as missing and handed back to the man who ran all eight, who can correct any
          line here with one email. A gap that says it is a gap is worth more than a guess
          that Francis would spot across a room. */}
      <details className="comic-session-who">
        <summary>Eight editions · and the four the record will not guess</summary>
        <dl className="comic-session-facts">
          <div>
            <dt>1st · November 2012</dt>
            <dd>
              Started in Benin City by Francis Umendu Odupute. The programme’s own reason, in
              its own words: to bring cartoonists, comic artists, illustrators, animators and
              photographers together “to lend their voices and draw attention to vital
              development issues and concerns not given the attention they deserved, in favour
              of Africa’s productivity and sustainable development.”
            </dd>
          </div>
          <div>
            <dt>2nd · 2014</dt>
            <dd>
              Hosted by the Edo State Ministry of Arts, arguing that the biennial would
              fast-track public awareness of the post-2015 development agenda.
            </dd>
          </div>
          <div>
            <dt>2019 · not an edition</dt>
            <dd>
              The travelling SDG cartoon campaign carried the biennial’s drawings to the UN SDG
              Global Festival of Action in Bonn, 2–4 May 2019 — the work leaving the room.
            </dd>
          </div>
          <div>
            <dt>7th · counted as the seventh</dt>
            <dd>Held, and named as the seventh edition by the programme itself.</dd>
          </div>
          <div>
            <dt>8th · 28–30 November 2026</dt>
            <dd>National Museum, Benin City. The theme is the climate, and this room is what the record does with it.</dd>
          </div>
          <div>
            <dt>3rd to 6th · missing on purpose</dt>
            <dd>
              The record does not hold those four years’ dates or themes, so it prints neither.
              Francis Odupute has them; one email fills every gap in this list, and until then
              the gap stays visible rather than plausible.
            </dd>
          </div>
        </dl>
        <p className="comic-session-attrib record-meta">
          From the programme’s own history and reporting of the 2012 and 2014 editions.
        </p>
      </details>
      <details className="comic-session-who">
        <summary>Who you’ll hear · Alina Sen, CEEW</summary>
        <p className="record-meta">{ALINA}</p>
        <p className="comic-session-attrib record-meta">In CEEW’s own words, written to introduce her at the workshop.</p>
      </details>
      <Link to="/ClimateWorkshop" className="comic-session-link">
        The hour itself, written down <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}