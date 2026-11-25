import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import SignalBeacon from '@/components/climate/SignalBeacon';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXPromises from '@/components/climate/XEqualsXPromises';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';
import '@/components/climate/x-equals-x-page.css';

// ── x = x — PRINTED FROM THE SAME BOOK AS JANINE'S PAGE ─────────────────────────
// This page was wearing the record's reading shell: one narrow column of hairline bands,
// which is a quiet way to print a rulebook and a poor way to print a principle. Her page
// is the one Brian pointed at, and he was right about why it works: a bone ground, one
// ink plate with the painting held behind the words, an orange band carrying a single
// line, and then small monospace cards ruled along the top edge. It has scale, colour
// and rhythm, and it wastes nothing.
//
// So this page is now built the same way, by the same measurements: same ground, same
// ink, same orange, same card anatomy, same type sizes. A reader walking from her page
// to this one has not changed books.
//
// The shell is gone, which is why the bands can run edge to edge: the shell's job was to
// hold a column, and a column was the thing flattening the page.
export default function XEqualsX() {
  return (
    <div id="x-equals-x" className="covenant-page" data-record-technical>
      <RecordBackBar eyebrow="The principle" />

      {/* The covenant mark, as her page carries it: one small dark strip, the mark in red. */}
      <div className="covenant-epigraph">
        <p className="covenant-epigraph-line">
          <span className="covenant-epigraph-dot" aria-hidden="true" />
          A principle, not a slogan
          <span className="covenant-epigraph-dot" aria-hidden="true" />
        </p>
        <p className="covenant-epigraph-mark" translate="no">x = x</p>
      </div>

      <XEqualsXOpening />

      {/* The whole principle in one line of signal — the three things the record will not do. */}
      <div className="covenant-signal">
        <p>Equal standard · no ranking · no paid priority</p>
      </div>

      {/* The band that used to carry her name, her decades and her quotation. She has her own
          page for that, and this page is about a principle rather than about a person — so the
          band answers the question a reader actually arrives with: what does this record
          promise me, and what makes that more than a sentence on a website. */}
      <div className="covenant-band covenant-band--centre">
        <SignalBeacon size={30} color="rgb(var(--record-mark))" />
        <XEqualsXPromises />
      </div>

      {/* The work, card by card, exactly as her achievements are set. */}
      <div className="covenant-stack">
        <div className="covenant-card">
          <XEqualsXWhatItAsks />
        </div>
        <div className="covenant-card covenant-card--ocean">
          <RecordInPractice />
        </div>
        {/* ── WHAT CAN BE CHECKED, BEFORE WHAT CANNOT ──────────────────────────
            This band was written, corrected against the code, and then never mounted — so
            the page promised a reader could check it and named none of the three ways. It
            sits before the limits on purpose: what can be checked, then the edge of it. */}
        <div className="covenant-card">
          <XEqualsXCheck />
        </div>
        <div className="covenant-card">
          <XEqualsXLimits />
        </div>
        <div className="covenant-card covenant-card--ocean">
          <XEqualsXResearchPanel />
        </div>
      </div>

      <div className="covenant-close">
        <div className="covenant-actions">
          <Link to="/ExtractionProofCovenant" className="covenant-btn">
            The full covenant <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="covenant-share">
            <ShareCardButton
              entry={{ id: 'x-equals-x', title: 'x = x' }}
              build={buildCovenantCard}
              label="Pass it on"
              link={recordAddress('/XEqualsX')}
              description={COVENANT_SHARE}
            />
          </div>
        </div>
      </div>

      {/* Her page closes on the signal band and the way back. So does this one. */}
      <div className="covenant-return">
        <Link to="/TogetherChangeClimate" className="covenant-btn covenant-btn--ink">
          Return to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


    </div>
  );
}