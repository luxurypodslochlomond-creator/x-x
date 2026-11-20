import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PlainSection from '@/components/climate/cartoons/plain/PlainSection';
import { ASKED, SECTIONS } from '@/components/climate/cartoons/plain/whatThisIs';
import '@/components/climate/cartoons/plain/plain-sheet.css';

// ── THE ANSWER, ON THE RECORD, SO IT OUTLIVES THE CHAT ─────────────────────────
// Brian, 20 November: "I'm worried Francis not getting it bro… what would you do and say…
// mind zero bullshit and for right reasons."
//
// The temptation is a pitch. A pitch is exactly what a cartoonist whose website has been dark
// for two years has already been given by everybody, so the page does the opposite: it answers
// his two questions with "no" twice, says plainly what the record is not, and then answers the
// question underneath them — what happens to the drawings after the 29th — in terms he can
// check rather than believe.
//
// The link is the message. Whatever gets typed into WhatsApp can be lost, forwarded wrongly or
// remembered as more than it was; this address says the same thing every time it is opened,
// to him and to the next cartoonist who asks.
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
          <h2 className="plain-head">Where it is</h2>
          <p className="plain-p">
            The wall is <Link to="/ClimateCartoons" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>here</Link>.
            One hand’s own page is <Link to="/ClimateCartoons/Francis" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>here</Link>.
            The drawings do not come down on the 30th.
          </p>
        </section>
      </div>
    </ClimateRecordShell>
  );
}