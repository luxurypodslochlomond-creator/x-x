import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RateForm from '@/components/climate/cartoons/paid/RateForm';
import CopyLine from '@/components/climate/CopyLine';
import { recordAddress } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/paid/paid-page.css';

// ── THE PAGE FRANCIS CAN SEND TO HIS ARTISTS ───────────────────────────────────
// Francis wrote, on 28 November: cartoonists are asking him about compensation, he has
// secured no money, and he is asking what to do. That is not a scandal and it is not his
// fault: it is what happens when a biennial is carried for fourteen years by people who
// were promised something later.
//
// So this page answers the question in public, in his own favour, without pretending a
// fund exists. It says the three true things — the work was not paid for, the record cannot
// invent money, and what CAN be fixed today is that nobody has to guess what a drawing is
// worth — and then it gives the artist a door to say their price in their own words.
//
// Nothing here names a funder, promises a fee, or asks anybody to be grateful. A page that
// tells a cartoonist to be patient is the reason he is asking in the first place.
const SHARE_TEXT = `A page for the cartoonists of the CartoonAFRICA biennial: what a drawing is worth here, what you keep, and where to say your price. ${recordAddress('/ClimateCartoons/Paid')}`;

export default function ClimateCartoonsPaid() {
  return <ClimateRecordShell
    painted
    className="paid-page"
    eyebrow="The cartoon room · for the hands that draw"
    marker="Written for Francis’s cartoonists"
    title="What a drawing is worth."
    statement="Not a promise. The honest position, and the door that follows it."
    returnTo="/ClimateCartoons"
    returnLabel="The wall"
    footer="Every figure and every payment this page mentions is one the record already holds, in public."
  >
    <p className="paid-open">You gave your work for free, on a promise. <span>That promise has not been kept yet.</span></p>
    <p className="paid-lede">
      Francis asked the question out loud, so it gets an answer out loud. This is written for the cartoonists of the
      CartoonAFRICA biennial, and for anyone else who draws and has been asked to wait.
    </p>

    <section className="paid-section">
      <h2 className="paid-head">The position, without decoration</h2>
      <ul className="paid-lines">
        <li><strong>No fund has been secured.</strong>Nobody here can hand over money that does not exist, and pretending otherwise would make this place like every other one that asked you to wait.</li>
        <li><strong>Your work was not free to make.</strong>Paper, ink, hours and skill were spent. Being shown with your name on it is a credit, not a payment, and this record does not confuse the two.</li>
        <li><strong>What can be fixed today</strong> is that nobody has to guess what you charge, and nobody gets your drawing without your name, your words and your link on it.</li>
      </ul>
    </section>

    <section className="paid-section">
      <h2 className="paid-head">What you keep, whatever happens</h2>
      <ul className="paid-lines">
        <li>Your name on the drawing, as you sign it.</li>
        <li>Your own line about the work, in your words, never rewritten by the record.</li>
        <li>The link to where it was first published.</li>
        <li>The right to say no — and the right to ask for it to come down, which is honoured.</li>
      </ul>
    </section>

    <section className="paid-section">
      <h2 className="paid-head">How the money is meant to work</h2>
      <ul className="paid-lines">
        <li><strong>A paid brief is agreed before the work starts.</strong>Fee, deadline and reuse rights in writing, with the artist, not about them.</li>
        <li><strong>Every payment is printed in public</strong> on the <Link to="/ClimateLedger#ledger-lines" className="underline text-record-red">open ledger</Link>: who paid, what it bought, the fee the processor took, and the hand it reached.</li>
        <li><strong>The record takes no commission.</strong>An unearmarked gift is split equally between the artists who contributed in the previous twelve months.</li>
        <li><strong>A share that cannot be paid stays marked owed</strong> until it can be. It is never quietly moved to somebody else.</li>
      </ul>
    </section>

    <section className="paid-section">
      <h2 className="paid-head">Say what would make it right</h2>
      <p className="paid-lede" style={{ marginTop: 0 }}>
        Not a price list, and not a favour asked. One line in your own words: a fee for a new drawing, a paid
        workshop, materials, your name on an application for money — or the promise, kept in writing. Money is one
        honest answer. Reach, followers and being seen are not answers, and this record will not offer them as
        though they were.
      </p>
      <RateForm />
    </section>

    <section className="paid-section">
      <h2 className="paid-head">For Francis, and for anyone who can fund this</h2>
      <ul className="paid-lines">
        <li><strong>Show the wall itself.</strong>Every drawing, its hand, its source and its link — on <Link to="/ClimateCartoons" className="underline text-record-red">one page</Link> that still stands after the festival closes.</li>
        <li><strong>Show the ledger.</strong>Money that arrives is printed as it moves. A funder can check it instead of believing it.</li>
        <li><strong>Show what a paid brief buys.</strong>A named drawing, a named fee, a named date. Not a promise of exposure.</li>
        <li><strong>One thing stays true:</strong>this record carries no advertising and no sponsorship, and that is not for sale. A catalogue can carry a sponsor — that is the biennial’s own book, Francis’s to sell, and he does not need this record’s permission for it.</li>
      </ul>
      <div className="paid-doors">
        <Link to="/ClimateLedger">Stand behind the work</Link>
        <Link to="/ClimateCartoons/Francis">Francis and the biennial</Link>
        <Link to="/ClimateCartoons/Print">Print a show of it</Link>
      </div>
    </section>

    <section className="paid-share">
      <h2 className="paid-head">Send this to a group</h2>
      <p>One message, with the address on the end, so a cartoonist can read it without being asked to trust anybody.</p>
      <CopyLine text={SHARE_TEXT} label="Copy the message" />
    </section>
  </ClimateRecordShell>;
}