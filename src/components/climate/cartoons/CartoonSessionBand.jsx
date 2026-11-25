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

          Spot on is the whole instruction, and it rules out the tidy version. So this list
          was not built from arithmetic: it was searched for. "CAN'T YOU LOOK UP SEARCH
          INTERNET BRO AS THIS IS 8YJ ON 29TH MUST BE INFO OUT THERE" — Brian, 25 November,
          and he was right. What the search found is below, each line with the place it came
          from: the 2012 theme in Lagos, "Africa of the Future" in 2014, the fourth in 2018,
          the seventh at this same museum, and the 2019 Bonn campaign that was not an edition
          at all. What it did not find is the 3rd, 5th and 6th themes, so those three rows say
          so. A gap that names itself is worth more than a guess Francis would spot across a
          room, and three named gaps are a shorter list than four invented ones. */}
      <details className="comic-session-who">
        <summary>Eight editions, 2012 to 2026 · and the three themes the record will not guess</summary>
        <dl className="comic-session-facts">
          <div>
            <dt>1st · 2012 · Lagos</dt>
            <dd>
              Theme: “United States of Africa: Matters Arising.” Started by Francis Umendu
              Odupute, and the programme’s own reason, in its own words: to bring cartoonists,
              comic artists, illustrators, animators and photographers together “to lend their
              voices and draw attention to vital development issues and concerns not given the
              attention they deserved, in favour of Africa’s productivity and sustainable
              development.”
            </dd>
          </div>
          <div>
            <dt>2nd · 2014</dt>
            <dd>
              Hosted by the Edo State Ministry of Arts, Culture and Tourism, on the theme
              “Africa of the Future” — argued, in the reporting of the day, as a way to
              fast-track public awareness of the post-2015 development agenda.
            </dd>
          </div>
          <div>
            <dt>3rd · 2016 · theme missing</dt>
            <dd>
              Held — every other year from 2012, and the fourth lands in 2018. The record has
              not found this year’s theme, so it prints the year and not a guess.
            </dd>
          </div>
          <div>
            <dt>4th · 2018</dt>
            <dd>
              The CAIB 2018 festival. The exhibition that opened with it drew artists from
              around the world on the UN development goals — environmental preservation and
              gender among them.
            </dd>
          </div>
          <div>
            <dt>5th and 6th · 2020 and 2022 · themes missing</dt>
            <dd>
              On the same rhythm, through the two years the world shut its doors. Their themes
              are the rest of the gap.
            </dd>
          </div>
          <div>
            <dt>7th · 2024</dt>
            <dd>
              An exhibition and a cartoon animation training workshop at the National Museum,
              Benin City — the same room this one is held in.
            </dd>
          </div>
          <div>
            <dt>2019 · not an edition</dt>
            <dd>
              The travelling SDG cartoon campaign took the drawings to the UN SDG Global
              Festival of Action in Bonn, 2–4 May 2019, and then out into Bonn’s communities as
              “The Future of Africa” — the work leaving the room for people who never saw the
              festival.
            </dd>
          </div>
          <div>
            <dt>8th · 28–30 November 2026</dt>
            <dd>
              National Museum, Benin City. Theme: “SDG, African Youths and Democracy through
              Humour Lenses.” The climate workshop is in it, and this room is what the record
              does with it.
            </dd>
          </div>
        </dl>
        <p className="comic-session-attrib record-meta">
          Sources: AllAfrica’s report of the 2012 festival; the Nigerian Observer on the 2014
          edition and on the programme’s own history; the festival’s 2014 entry in an
          international cartoon-contest register; CAIB’s own pages for the fourth and the
          seventh. Three themes are still missing and stay missing until Francis Odupute sends
          them — a filled row would look better and would be a lie.
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