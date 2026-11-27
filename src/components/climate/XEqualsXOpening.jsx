import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT, COVENANT_ENTRY, COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

// ── THE HEAD, BUILT THE WAY THE RECORD'S HEAD IS BUILT ──────────────────────────
// Brian, 27 November: "our writing is very dull… not as vivid as the record page… the Dr Jane
// quote and the yellow box on red is coolasfuck… why is the record page infinitely better?"
//
// Because the record's opening is not a page of text on a dark wash. It is four things in a
// fixed order, and each one is doing a different job:
//   1. a small caps line, faint, saying what kind of thing this is;
//   2. the name, at the size a name is set, in the record's own display face;
//   3. a voice — somebody else's sentence, in the record's yellow, in caps, because it is a
//      quotation and not a paragraph;
//   4. a solid yellow plate with the record's red type on it, naming whose sentence it is.
// The yellow plate is the only block of solid colour in the opening, which is exactly why it
// lands. This page now has the same four, with Janine's own sentence and her own name, and
// the last word of the record's name printed in the same yellow.
export default function XEqualsXOpening() {
  return (
    <section className="covenant-hero" aria-labelledby="why-this-record">
      <div className="covenant-hero-inner">
        <p className="covenant-kicker">{COVENANT.kicker}</p>
        <h1 id="why-this-record" className="covenant-title" translate="no" aria-label="x equals x">x=x</h1>
        <p className="covenant-front-line">
          {COVENANT.titleLead} <span className="covenant-front-line-mark">{COVENANT.titleMark}</span>
        </p>
        <p className="covenant-purpose-line">{COVENANT.distinction}</p>
        <blockquote className="covenant-voice">“Together we can change the course of climate change.”</blockquote>
        <div className="covenant-voice-plate">
          <p className="covenant-voice-name">Janine M. H. Selendy</p>
          <Link to="/ClimateFounder" className="covenant-voice-link">Horizon International</Link>
        </div>
        <p className="covenant-purpose">{COVENANT.meaning}</p>
      </div>
      <div className="covenant-hero-actions">
        <Link to="/TogetherChangeClimate" className="covenant-btn">Open the record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        <div className="covenant-share">
          <ShareCardButton instant entry={COVENANT_ENTRY} build={buildCovenantCard} label="Share" link={recordAddress('/x=x')} description={COVENANT_SHARE} includeMessage windowTitle="Share x=x" />
        </div>
        <p className="covenant-access">Free to read. No account needed.</p>
        <p className="covenant-cover-credit">The painting behind this page was made for the record with BASE 1 (AI).</p>
      </div>
    </section>
  );
}