import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordLinkCards from '@/components/climate/RecordLinkCards';
import { TWO_THINGS, HERE, NOT_HERE, ANTHOLOGY, CORRECTION, DOORS } from '@/components/climate/cartoons/plain/caibLines';
import CaibLockup from '@/components/climate/cartoons/plain/CaibLockup';
import '@/components/climate/cartoons/plain/plain-sheet.css';

// ── TWO NAMES, TWO THINGS ─────────────────────────────────────────────────────
// The room gathered drawings for a workshop that is being held under CAIB's name, so a
// reader arriving could reasonably think this record is CAIB. It is not, and Francis had
// every right to be uneasy about it. This page draws the line in public, in the record's
// own words, and puts a correction route at the foot.
//
// It is one page on purpose. The worry was not that people would read a long document and
// misunderstand it; it was that nobody had ever said the short thing out loud.

export default function ClimateCartoonsCAIB() {
  return (
    <ClimateRecordShell
      painted
      eyebrow="The cartoon room · two names, two things"
      title="CAIB and this record"
      statement="CAIB is Francis's. This record is Janine's brief. Here is exactly where the line is."
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="Nothing here is sold, ranked or sponsored. Where this page says a thing will come off, it comes off."
    >
      <div className="plain-sheet">
        {/* The biennial's own mark, and the credit its chair asked for, before the page says
            anything in this record's voice — the programme speaks first, on its own page. */}
        <CaibLockup />

        <section className="plain-section" aria-labelledby="caib-two-head">
          <h2 className="plain-head" id="caib-two-head">Two things, not one</h2>
          <div className="plain-compare">
            <div className="plain-compare-card plain-compare-website">
              <p className="plain-compare-label">{TWO_THINGS.left.label}</p>
              <ul className="plain-compare-lines">
                {TWO_THINGS.left.lines.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="plain-compare-verdict">{TWO_THINGS.left.verdict}</p>
            </div>
            <div className="plain-compare-card plain-compare-room">
              <p className="plain-compare-label">{TWO_THINGS.right.label}</p>
              <ul className="plain-compare-lines">
                {TWO_THINGS.right.lines.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="plain-compare-verdict">{TWO_THINGS.right.verdict}</p>
            </div>
          </div>
        </section>

        <section className="plain-section">
          <h2 className="plain-head">What this record does with CAIB work</h2>
          <ul className="plain-list">
            {HERE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>

        <section className="plain-section">
          <h2 className="plain-head">What it does not do</h2>
          <ul className="plain-list">
            {NOT_HERE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>

        <section className="plain-section">
          <h2 className="plain-head">{ANTHOLOGY.head}</h2>
          {ANTHOLOGY.body.map((p) => (
            <p key={p} className="plain-source" style={{ marginTop: '.5rem' }}>{p}</p>
          ))}
        </section>

        <section className="plain-section">
          <h2 className="plain-head">If this is wrong</h2>
          <ul className="plain-list">
            {CORRECTION.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>

        <section className="plain-section">
          <h2 className="plain-head">The doors</h2>
          <RecordLinkCards links={DOORS} label="The cartoon room’s connected pages" />
        </section>
      </div>
    </ClimateRecordShell>
  );
}