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
            {/* "2pm here" was wrong for most of the room: this hour is watched from Benin,
                Delhi, New York and Glasgow at once, so "here" was whichever page happened to
                be open. The zone is named instead — the one fact a reader in another country
                actually needs. */}
            <Link to="/ClimateFounder">Janine Selendy</Link>, Sunday 29 November, 3pm West Africa (2pm UK).
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
          at all — all of it read back from the festival's own site in the Internet Archive,
          in its own words. And it found the answer to the third edition: there was no theme,
          because the contest was suspended for want of funding, which is a fact and not a
          gap. Two rows still say "missing" — 2020 and 2022 — and they say why: the festival's
          own site stops publishing after 2018. A gap that names itself is worth more than a
          guess Francis would spot across a room. */}
      <details className="comic-session-who">
        <summary>Eight editions, 2012 to 2026 · and the two themes still missing</summary>
        <dl className="comic-session-facts">
          <div>
            <dt>1st · 2012 · Lagos</dt>
            <dd>
              Theme: “United States of Africa: Matters Arising,” opened by the African Press
              Cartoon Syndication Company with NEPAD, the Millennium Development Goals and a
              UNESCO call for ideas in the frame. Six sub-themes, and they tell you what the
              room was for: African governments, citizens and fiscal development; violence
              against women; African heroes and heroines in caricature; “My View of Africa,”
              kept for non-African cartoonists; African creativity; and free style. The festival
              itself carried the exhibition, a public vote, a cartoon camp and training
              workshops for schoolchildren and young journalists.
            </dd>
          </div>
          <div>
            <dt>2nd · 2014</dt>
            <dd>
              Hosted by the Edo State Ministry of Arts, Culture and Tourism. Theme: “Africa of
              the Future,” with a sub-theme, “Our Children: Our Future,” won by Stane Jagodic
              of Slovenia, Maria Angelica Tejada of the Philippines and Homayoun Abdolrahim of
              Iran. The festival also ran a sub-theme called “My View of Africa,” kept for
              cartoonists from outside the continent.
            </dd>
          </div>
          <div>
            <dt>3rd · November 2016 · and why there is no theme</dt>
            <dd>
              Hosted by the Nigeria Union of Journalists, Edo State Council, in Benin City, with
              a travelling “Open Cartoon Campaign” on sustaining the environment and a three-day
              international visual journalism training. And no contest theme, because the
              contest was on hold: Francis Odupute said plainly that year that it would stay
              suspended until the funding and logistics to run it were met. So the missing theme
              is not a theme we lost. It is a competition that did not run, and it is on the
              record as that.
            </dd>
          </div>
          <div>
            <dt>4th · 2018</dt>
            <dd>
              “Africa of the Future: Sustainable Development through Youth Empowerment,” the
              fourth edition, at the Crowne Art Gallery inside Hexagon on Golf Course Road,
              Benin City, 23–30 November 2018 — an exhibition opening, a roundtable on
              cartooning and animation, and a stated plan to carry the training into eLearning
              for African girls.
            </dd>
          </div>
          <div>
            <dt>5th and 6th · 2020 and 2022 · themes missing</dt>
            <dd>
              On the same rhythm, through the two years the world shut its doors. Their themes
              are the last of the gap, and the reason it is still a gap is mundane: the
              festival’s own website stops publishing news after 2018, so there is no page left
              to read them from.
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
          Sources: the festival’s own site, cartoonafricabiennial.org, read from the Internet
          Archive’s copies of 2016, 2019 and 2021 — the 2012 sub-themes, the 2014 results, the
          third edition’s press release and the fourth edition’s theme all come from there, in
          its own words. Also the Nigerian Observer on the programme’s history, and CAIB’s own
          posts for the seventh. Two themes are still missing, for 2020 and 2022, and they stay
          missing until Francis Odupute sends them — a filled row would look better and would
          be a lie.
        </p>
      </details>
      {/* ── SHE WAS BEHIND A FOLDED FLAP ───────────────────────────────────────────
          Brian, 25 November: "I can't see alien [Alina] on that page either bro."

          She was there, and that was the problem: her introduction was inside a <details>
          that opens only if somebody taps a line saying "Who you'll hear". A reader scanning
          the room for the name of the person speaking for CEEW found nothing, because the
          name was one tap away. A name that has to be opened is a name that is hidden. It is
          open on arrival now, so Alina Sen and CEEW are on the page without anybody having to
          go looking. */}
      <details className="comic-session-who" open>
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