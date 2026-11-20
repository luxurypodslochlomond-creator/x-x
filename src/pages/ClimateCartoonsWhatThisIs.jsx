import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PlainSection from '@/components/climate/cartoons/plain/PlainSection';
import { ASKED, SECTIONS, SOURCES } from '@/components/climate/cartoons/plain/whatThisIs';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import '@/components/climate/cartoons/plain/plain-sheet.css';

// ── THE ANSWER, ON THE RECORD, SO IT OUTLIVES THE CHAT ─────────────────────────
// Brian, 20 November: "I'm worried Francis not getting it bro… what would you do and say…
// mind zero bullshit and for right reasons." Then: "why would he need a site as well as this
// bro", and "easy to get to from the wire?"
//
// The temptation is a pitch. A pitch is what a cartoonist whose website has been dark for two
// years has already been given by everybody, so this page does the opposite: it answers his two
// questions with "no" twice, says what he has already built so he is not being talked down to,
// says plainly what the record is not, and then answers the question underneath them all — what
// happens to the drawings after the 29th — in terms he can check rather than believe.
//
// The plate is his, not decoration: the cover of the book he edits, credited, at the top of the
// page that asks him to trust the place. The record's rule is that a picture never travels
// without the hand that made it, and the first thing this page does is keep it.
const ink = { color: 'rgb(var(--record-red))', textDecoration: 'underline' };

export default function ClimateCartoonsWhatThisIs() {
  return (
    <ClimateRecordShell
      eyebrow="The cartoon room · in plain words"
      title="What this is"
      statement="Written because a cartoonist asked, and because the answer should not live in one private message."
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="Nothing here is sold, ranked, sponsored or signed up to. Where the record says something is missing, it is missing."
    >
      <div className="plain-sheet">
        <figure className="plain-plate">
          <img
            src={CARTOON_COVER}
            alt={`Cover of ${CARTOON_EVENT.biennial}. Cover artwork by Francis Umendu Odupute.`}
            loading="eager"
            decoding="async"
          />
          <figcaption>{CARTOON_EVENT.coverArt} — the cover of the book he edits.</figcaption>
        </figure>

        <div className="plain-asked">
          <span className="plain-asked-label">The two questions</span>
          {ASKED.map((question) => (
            <p key={question} dir="auto">“{question}”</p>
          ))}
        </div>

        {SECTIONS.map((section) => (
          <PlainSection key={section.head} {...section} />
        ))}

        <section className="plain-section">
          <h2 className="plain-head">The doors</h2>
          <ul className="plain-list">
            <li><Link to="/ClimateCartoons#cartoon-drawing-desk" style={ink}>Send a drawing in</Link> — a photograph of a paper drawing, or one drawn on the page.</li>
            <li><Link to="/ClimateCartoons" style={ink}>The wall</Link> — every drawing on the record, in the order it arrived.</li>
            <li><Link to="/ClimateCartoons/Francis" style={ink}>Francis’s own page</Link> — the cover he drew, and everything he has given the room.</li>
          </ul>
          <p className="plain-p">The drawings do not come down on the 30th.</p>
        </section>

        <p className="plain-source">
          Where this comes from: {' '}
          {SOURCES.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
          ))}
          {' '}— and the biennial’s own record of its editions. The cover is his drawing.
        </p>
      </div>
    </ClimateRecordShell>
  );
}