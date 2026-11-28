import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PlainSection from '@/components/climate/cartoons/plain/PlainSection';
import { ASKED, SHORT, COMPARE, AFTER, MORE, SOURCES } from '@/components/climate/cartoons/plain/whatThisIs';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import '@/components/climate/cartoons/plain/plain-sheet.css';

// ── THE ANSWER, ON THE RECORD, SO IT OUTLIVES THE CHAT ─────────────────────────
// The temptation is a pitch. A pitch is what a cartoonist whose website has been dark for
// two years has already been given by everybody, so this page does the opposite.
//
// It opens with the answer, three lines, in the order that makes them true. Then the plate
// that is the whole argument: a website on one side, this room on the other. Brian, 20
// November: "maybe he wants his own platform or website bri but that's mad when we can all
// help each other for right reasons." The plate is how that is said without over-connecting:
// both are needed, neither replaces the other, and a cartoonist can see which is which in
// five seconds instead of eleven paragraphs.
//
// Everything that used to be a wall of text is now folded away under "The long answer" —
// still there, still checkable, no longer the first thing a person meets.
//
// Nothing on this page is about the person who built it, and nothing quotes a private message.
const ink = { color: 'rgb(var(--record-red))', textDecoration: 'underline' };

export default function ClimateCartoonsWhatThisIs() {
  return (
    <ClimateRecordShell
      painted
      eyebrow="The cartoon room · in plain words"
      title="What this is"
      statement="Three lines, then the difference between a website and a wall."
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
          <span className="plain-asked-label">The question</span>
          {ASKED.map((question) => (
            <p key={question} dir="auto">{question}</p>
          ))}
        </div>

        <section className="plain-section">
          <h2 className="plain-head">The short answer</h2>
          <ol className="plain-short">
            {SHORT.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>

        {/* ── THE TWO PLATES ────────────────────────────────────────────────────
            Side by side on a desk, stacked on a phone, and the two are deliberately not
            styled alike: one is a bill, one is a wall. */}
        <section className="plain-section" aria-labelledby="plain-compare-head">
          <h2 className="plain-head" id="plain-compare-head">Two things, not one</h2>
          <div className="plain-compare">
            <div className="plain-compare-card plain-compare-website">
              <p className="plain-compare-label">{COMPARE.left.label}</p>
              <ul className="plain-compare-lines">
                {COMPARE.left.lines.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="plain-compare-verdict">{COMPARE.left.verdict}</p>
            </div>
            <div className="plain-compare-card plain-compare-room">
              <p className="plain-compare-label">{COMPARE.right.label}</p>
              <ul className="plain-compare-lines">
                {COMPARE.right.lines.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="plain-compare-verdict">{COMPARE.right.verdict}</p>
            </div>
          </div>
        </section>

        <section className="plain-section">
          <h2 className="plain-head">{AFTER.head}</h2>
          <ul className="plain-list">
            {AFTER.list.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>

        {/* ── THE LONG ANSWER, FOLDED ───────────────────────────────────────────
            Nothing has been thrown away. It is simply not standing between a cartoonist
            and the three lines that answer his question. */}
        <details className="plain-more">
          <summary>The long answer</summary>
          <div className="plain-more-body">
            {MORE.map((section) => (
              <PlainSection key={section.head} {...section} />
            ))}
          </div>
        </details>

        <section className="plain-section">
          <h2 className="plain-head">The doors</h2>
          <ul className="plain-list">
            <li><Link to="/ClimateCartoons#cartoon-drawing-desk" style={ink}>Send a drawing in</Link> — a photograph of a paper drawing, or one drawn on the page.</li>
            <li><Link to="/ClimateCartoons" style={ink}>The wall</Link> — every drawing on the record, in the order it arrived.</li>
            <li><Link to="/ClimateCartoons/Francis" style={ink}>Francis’s own page</Link> — the cover he drew, and everything he has given the room.</li>
            <li><Link to="/ClimateCartoons/Paid" style={ink}>What a drawing is worth</Link> — what you keep, how payment is meant to work, and where to say your own price.</li>
          </ul>
        </section>

        <p className="plain-source">
          Where this comes from: {' '}
          {SOURCES.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
          ))}
          {' '}— and the biennial’s own record of its editions. The cover is his drawing. One source is one source: where the record knows a thing from a single origin, it says so.
        </p>
      </div>
    </ClimateRecordShell>
  );
}