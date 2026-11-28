import React from 'react';
import { Link } from 'react-router-dom';

// ── THE HANDOFF ───────────────────────────────────────────────────────────────
// The page carried the largest figures on the record and pointed at none of it: a reader
// finished nine countries and had nowhere to go inside the building they were standing in.
// Four doors, in the order a person actually needs them — what can be done, what is being
// reported, what people have drawn, and where all of it lands.
export default function FounderWhereItGoes() {
  return (
    <section className="record-founder-sheet" aria-labelledby="founder-where">
      <p className="record-founder-kicker">Where this goes</p>
      <h2 id="founder-where" className="record-founder-h2">Nothing here is the end of it.</h2>
      <div className="record-founder-links">
        <Link to="/TogetherChangeClimate">
          <span>Crises, solutions and actions</span>
          <strong>The record’s doors</strong>
        </Link>
        <Link to="/ClimateWire">
          <span>What is being reported, dated and sourced</span>
          <strong>The wire</strong>
        </Link>
        <Link to="/ClimateCartoons">
          <span>Thirty-two drawings from the hands doing the work</span>
          <strong>The wall</strong>
        </Link>
        <Link to="/ClimateMap#founder-figures">
          <span>Every entry — and these figures — standing where they happen</span>
          <strong>The map</strong>
        </Link>
      </div>
      <p className="record-founder-note">These figures are not a mood. Each one is an entry waiting to be answered by an action on the same record, and the map is where the two meet.</p>
    </section>
  );
}