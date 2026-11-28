import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── THE HANDOVER, IN ITS OWN BAND AND NOT UNDER HER NAME ────────────────────────
// Brian, 28 November: "should say PLATFORM BUILT FOR THE PLANET BY UNIVERSAL FREQUENCY 51…
// or we stealing Janine's thunder bri?" — and then, rightly, "you sure we need it next to
// Janine too bro? Not sure myself".
//
// He was right to hesitate, and the answer is no: a company's name set beside her name turns
// her page into a letterhead, and reads as though her forty years were the introduction to
// our platform. So the statement has its own band, after her work, framed as what we answer
// for rather than what she endorses. The credit she is owed sits above it; the mistakes are
// ours and are said out loud, because a platform that puts its own name in large letters
// should be the first thing on the page that can be held to account.
export default function FounderHandover() {
  return (
    <section className="record-founder-handover" aria-labelledby="handover">
      <div className="record-founder-handover-inner">
        <p className="record-founder-kicker record-founder-kicker-light">What she asked for · what we answer for</p>
        <h2 id="handover">A platform built<br />for the planet.</h2>
        <p className="record-founder-handover-by">By Universal Frequency 51</p>
        <div className="record-founder-handover-copy">
          <p>She spent forty years finding what works and putting it where people could reach it. Then she went looking for someone to build the thing that would hold it all — and asked a small civic company in Scotland to build it.</p>
          <p>So this is what we built, and what we refuse. No advertising. No paid placement. No ranking for money. Every claim carries its source. Every correction stays visible where it was made. The code is public, the record can be exported, and nobody’s attention is the product.</p>
          <p>Her name is not on this page because she endorses it. It is here because her work is the reason it exists. The faults on this platform are ours to answer for, and they are listed where they happen.</p>
        </div>
        <p className="record-founder-handover-mark">Built for the planet. Not for the feed.</p>
        <div className="record-founder-handover-links">
          <Link to="/XEqualsX" className="record-founder-handover-main">Read the covenant <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to="/ClimateMethod">How the record is kept</Link>
          <Link to="/TogetherChangeClimate">Open the record</Link>
        </div>
      </div>
    </section>
  );
}