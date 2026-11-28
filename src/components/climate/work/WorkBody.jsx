import React from 'react';
import { Link } from 'react-router-dom';
import WorkNumbers from '@/components/climate/work/WorkNumbers';
import WorkDoors from '@/components/climate/work/WorkDoors';
import '@/components/climate/work/work-page.css';

// ── ONE PAGE, FOR JANINE ───────────────────────────────────────────────────────
// She asked on 28 November what the last couple of years of work had been, and asked
// after the bank as well. This is the answer: not a deck, not a pitch, not a roadmap.
// What is built, who it is for, what it costs nobody, where the money honestly stands,
// and what the thing refuses to become.
//
// Two rules held while writing it. Nothing is claimed that cannot be opened from this
// page — every tool, paper and promise is a link to the thing itself. And nothing that
// was said in a private conversation is repeated here: a page that quotes somebody back
// at herself is not a record, it is a manoeuvre.
export default function WorkBody() {
  return (
    <div className="work-body">
      <section className="work-band">
        <p className="work-band-head"><span>01</span>The question it all comes from</p>
        <p>
          It started with one question and it has not changed: what would a public record of the climate look
          like if nobody could buy a line of it?
        </p>
        <p>
          Everything on this page is one answer to that. Some of it is a tool for a person in trouble tonight.
          Some of it is a place for a drawing to outlive the wall it was hung on. Some of it is a page of
          mathematics written for someone who will not take our word for it. None of it is an advertisement,
          none of it ranks a person above another, and none of it keeps a child’s data.
        </p>
        <p>
          It is built by one family in Scotland and a machine that is named on the record and argues back.
          There is no office, no investor and no marketing budget.
        </p>
      </section>

      <section className="work-band">
        <p className="work-band-head"><span>02</span>The record, counted as this page opens</p>
        <p className="work-band-note">
          Read from the record itself a moment ago, not typed in. Add a drawing tonight and this is a
          different number tomorrow.
        </p>
        <WorkNumbers />
      </section>

      <WorkDoors />

      <section className="work-band">
        <p className="work-band-head"><span>08</span>Where the money honestly stands</p>
        <p>
          The company that would hold all of this is a community interest company, and it is <strong>not
          registered yet</strong>. The application was returned once because the articles were missing clauses
          the regulator requires, and it is being put right. There is no investor and no grant behind any of
          this. Nothing has been paid out to anybody yet, and the ledger that will print every payment as it
          moves is already built and standing empty, in public, where it can be read.
        </p>
        <p>
          That is the position, and it is on the page because anybody thinking of putting money or a room
          behind this would find it out in the first conversation anyway. A record that hides its own balance
          is not a record. The <Link to="/ClimateLedger">ledger is here</Link>.
        </p>
      </section>

      <section className="work-band">
        <p className="work-band-head"><span>09</span>What it refuses, in writing</p>
        <ul className="work-refusals">
          <li><b>Nothing is sold on the record.</b> No advertising, no sponsored entries, no paywall on a solution or a crisis.</li>
          <li><b>Nobody is ranked.</b> No likes, no followers, no score for a person, an artist or an organisation.</li>
          <li><b>No reader is tracked and sold.</b> What is counted is a reading by country, never a person, and the arithmetic of that is published.</li>
          <li><b>No child is asked for an account.</b> The learning tools and the studio work without one, and keep nothing about a child.</li>
          <li><b>The method is open.</b> Code, sources and the way an entry is checked are published, so the record can be rebuilt somewhere else by somebody who does not trust us.</li>
        </ul>
      </section>

      <section className="work-band">
        <p className="work-band-head"><span>10</span>What is not finished, said plainly</p>
        <p>
          Two of the tools on this page are still being built and say so on their own doors. The wall of drawings
          is open and waiting for the room on the twenty-ninth. The record itself is in its first weeks of being
          read by people who are not us, which is the only test that matters and the one we cannot run ourselves.
        </p>
        <p>
          There is also a hill above Loch Lomond with an old coffin road running over it, and a page for it, because
          a record of a place belongs in a record of a planet.
        </p>
      </section>

      <section className="work-band work-band--close">
        <p className="work-band-head"><span>11</span>If any of it is useful to you</p>
        <p>
          It is yours to use, and you do not have to ask. Open a door above, send one to somebody who needs it
          tonight, or read the record the way you would read anything else and tell us where it is wrong. That
          last one is the part that makes it worth building.
        </p>
        <p className="work-close-line">
          <Link to="/TogetherChangeClimate">Open the record</Link>
        </p>
      </section>
    </div>
  );
}