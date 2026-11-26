import React from 'react';
import { Link } from 'react-router-dom';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

// ── THE ROOM OPENS ON A DRAWING, NOT ON A CONTENTS PAGE ────────────────────────
// Brian, 25 November: "fuck bro it feels corporate now… what would make Francis etc all go
// this is truly coolasfuck?"
//
// He was right, and the fault was in this file. The doorway carried an eyebrow, a standfirst,
// a count, two paragraphs of provenance and a twelve-item numbered set list — every one of
// them true, and every one of them asking to be read before a single drawing was. That is the
// shape of a funding report, and it was shaped that way because each element here has to
// justify itself to be trusted. The honesty is the record's spine; the ORDER was the fault.
// A wall does not brief you at the door.
//
// So the doorway is now the name of the room, one line, the count, and the cover — Francis's
// cover, at size, with his name on it. Nothing was softened. The provenance sits at the foot
// of the room in CartoonSources and the book's editors and credits in CartoonAnthology, which
// is where they always were; the twelve doors are the room's own navigation. (A ledger holding
// all of it was tried here on 25 November and removed within the hour: it repeated both
// sections, and a room a reader is already complaining is too long does not need another
// paragraph. It needed fewer.)
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <header className="press-opening-masthead">
          <h1 id="press-room-title" className="press-title">The Wall</h1>
          <p className="press-standfirst">Drawn by hand. Hung on the wall.</p>
          {/* ── WHEN AND WHERE, IN ONE LINE, AT THE TOP ─────────────────────────────
              Brian, 26 November: "should the event details etc be more at top… not sure
              layout and sequence right."

              He was right, and the fault was one of audience. The full band — the dates,
              the museum, the format, the theme, the hour — sat below the wall, the
              invitation and the book, so a cartoonist Francis had told about this room, or
              somebody from CEEW, arrived at a wall and a paragraph about Benin earthworks
              and had to scroll past all of it to learn when the hour is.

              But the whole band does not belong at the top: on 25 November this doorway was
              stripped back precisely because a briefing before a single drawing read as a
              funding report. So one line goes here — the facts a visitor needs to place the
              room, and the door to the hour — and the band stays where it is, for the reader
              who has seen the wall and wants the three days. */}
          <p
            style={{
              marginTop: '10px',
              fontSize: '11px',
              lineHeight: 1.6,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#6b6258',
            }}
          >
            8th CartoonAFRICA Biennial · National Museum, Benin City · 28–30 November 2026 ·{' '}
            <Link to="/ClimateWorkshop" style={{ textDecoration: 'underline', color: '#b3261e' }}>
              the climate hour, Sunday 3pm
            </Link>
          </p>
          {/* ── THE RULE THIS FILE STATES, AND THEN BROKE ───────────────────────────
              Brian, 26 November: "still doesn't flow coolasfuck for me bro."

              He was right, and looking at the room it was obvious: the first screen was a
              solid block of type. The comment below states this room's own rule — "name, one
              line, count, cover" — and then the paragraph under it ran to eighty-five words
              about Benin earthworks. A wall that opens on an essay is not a wall, however
              good the essay is.

              The history is not cut. It is moved into the long read at the foot, where the
              record's argument lives, and what stays at the door is the two sentences that
              are doing the work: the name is older than the room, and a wall is what a small
              gesture becomes when enough people make it. */}
          {/* ── THE NAME IS OLDER THAN THE ROOM ─────────────────────────────────────
              Brian, 26 November: "we called it the wall bro". We did, and so did Benin, eight
              centuries earlier. Iya — the Walls of Benin — is recorded by Guinness as the
              longest earthworks of the pre-mechanical era: around 16,000 km on Patrick
              Darling's 1977 estimate, ramparts to some twenty metres, built between roughly
              the seventh and fourteenth centuries. Nobody built that in one act.

              This is the one line in the doorway that earns its place, and it is here rather
              than further down because a reader meets the word "wall" in the title and should
              learn at that instant that it is not a metaphor the record invented. One
              sentence, no sourcing apparatus, no new section — the figures and their sources
              sit together on the record's home page under the smallest gestures, and the
              room's rule stands: name, one line, count, cover. */}
          <p
            style={{
              marginTop: '12px',
              maxWidth: '46ch',
              fontSize: '13.5px',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: '#2b251e',
            }}
          >
            The name is older than this room: <strong>Iya</strong>, the Walls of Benin, raised one
            basket of earth at a time by hands nobody wrote down. A wall is what a small gesture
            becomes when enough people make it and nobody is in a hurry.
          </p>
          <CartoonSignal />
        </header>
      </div>
      <div className="press-opening-cover">
        <CartoonCatalogueBand />
      </div>
    </section>
  );
}