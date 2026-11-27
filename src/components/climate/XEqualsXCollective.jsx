import React from 'react';
import { Link } from 'react-router-dom';

// ── WHAT THIS IS, AND WHAT IT REFUSES ──────────────────────────────────────────
// Brian, 27 November: it "needs to be more about the platform… not tech fanny boy".
//
// So this section stops describing the furniture and states the position. Every platform
// around this one is an auction of attention; the honest activist answer is not a slogan,
// it is a different machine with the auction taken out of it. Three refusals and one offer,
// in the plainest words available: no feed, nothing for sale, nothing ranked to hold you,
// and everything checkable by somebody who does not trust us.
export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">The platform</p>
        <h2 id="collective-heading">What this is, and what it refuses.</h2>
        <p>A record, not a feed. Entries are filed by subject and opened by the door you came for. Nothing here is ordered by what holds you longest, because nothing here is being sold to anybody.</p>
        <p>No advertising. No paid placement. No sponsored entry, no boost, no ranking for money. Every claim carries the source it came from, every correction stays visible where it was made, and the whole record can be exported, mirrored and checked by someone who does not trust us.</p>
        <p>It is not a campaign and it is not a charity asking to be liked. It is infrastructure — somewhere a community, a researcher, a cartoonist or a school can put the evidence where the next person will find it, and keep the credit for it.</p>
        <div className="covenant-inline-links">
          <Link to="/TogetherChangeClimate">Open the record →</Link>
          <Link to="/ClimateMethod">How it is kept and corrected →</Link>
          <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
        </div>
      </div>
    </section>
  );
}