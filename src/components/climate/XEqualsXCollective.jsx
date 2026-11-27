import React from 'react';
import { Link } from 'react-router-dom';

// ── WHAT THE RECORD IS, SAID ONCE ──────────────────────────────────────────────
// The three rooms are a band of their own now, directly under the head, so this section
// stopped carrying a second set of the same three doors. What is left is the part a reader
// cannot get from a door: what a room actually holds, and what it does not claim.
export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">The record</p>
        <h2 id="collective-heading">What the record holds.</h2>
        <p>Reported harm, responses and organised work, with links to the people and sources behind them. Filing a response under “Solutions” is not proof that it works.</p>
        <p>Entries and groups can be found by subject. Custodians can link a drawing to the entry it addresses. Researchers, communities, artists and organisers keep the credit for their work.</p>
        <div className="covenant-inline-links">
          <Link to="/TogetherChangeClimate#record-room-groups">Find people working on the same thing →</Link>
          <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
        </div>
      </div>
    </section>
  );
}