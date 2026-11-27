import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import SignalBeacon from '@/components/climate/SignalBeacon';
import XEqualsXOpening from '@/components/climate/XEqualsXOpening';
import XEqualsXMorseLine from '@/components/climate/XEqualsXMorseLine';
import CovenantLicence from '@/components/climate/CovenantLicence';
import XEqualsXPhoneBar from '@/components/climate/XEqualsXPhoneBar';
import XEqualsXMarkSignal from '@/components/climate/XEqualsXMarkSignal';
import XEqualsXPromises from '@/components/climate/XEqualsXPromises';
import XEqualsXWhatItAsks from '@/components/climate/XEqualsXWhatItAsks';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXLimits from '@/components/climate/XEqualsXLimits';
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
        {/* The mark is the door now: press it and it answers in Morse, then comes back. */}
        <XEqualsXMarkSignal className="covenant-epigraph-mark" />
      </div>

      <XEqualsXOpening />

      {/* ── THE YELLOW BAND THAT SAID THE HERO AGAIN ─────────────────────────────────
          It read "Equal standard · no ranking · no paid priority", four hundred pixels
          under a hero that already says, in bold, "No algorithm ranks them. No money
          amplifies them … every entry held to the same standard". That is the same three
          facts twice in the first screen — the page saying it again because it did not
          trust the first time. It is gone; the three rules still appear where they do
          work, in the promise list and in the record's own commitments. Brian, 26
          November: "chunky ... think got duplications". */}

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
        {/* ── THE SECOND LIST IS GONE ──────────────────────────────────────────────
            "Recorded commitments" read six promises out of the record here, directly under
            a band that had just promised five of its own. Brian, 26 November: "needs truth
            and simplicity". The record's own lines are now printed under the promise each
            one keeps, in the promise band itself, so this card has nothing left to say. */}
      </div>

      {/* ── THE CODE, WHERE IT WAS ALWAYS MEANT TO BE ──────────────────────────
          It was mounted at the head of the page: a pale sliver of dots and dashes wedged
          between two dark blocks, arriving before the reader had met the mark it encodes.
          Its own note says it is "printed at the foot of its most abstract claim" — and it
          was at the top. A code at the door of a page is a puzzle; the same code after the
          argument is a proof. Nothing about it changed except its place: the last thing the
          page says is the smallest signal that still means something, and then two ways out. */}
      <XEqualsXMorseLine />

      <div className="covenant-close">
        <div className="covenant-actions">
          <Link to="/ExtractionProofCovenant" className="covenant-btn">
            The full covenant <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="covenant-share">
            <ShareCardButton
              instant
              entry={{ id: 'x-equals-x', title: 'x = x' }}
              build={buildCovenantCard}
              label="Share"
              link={recordAddress('/XEqualsX')}
              description={COVENANT_SHARE}
              includeMessage
              windowTitle="Share x = x"
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

      {/* ── THE WORDS ARE GIVEN, NOT SOLD ────────────────────────────────────────
          Brian, 26 November: "should make x=x page open source so people can keep and pass
          on… don't want anyone stealing our x=x… it's for all of us".

          A licence does not stop copying — that is the thing worth being clear about. What
          it does is stop the one move that would actually take the principle away: copying
          it, closing it, and selling it back. CC BY-SA means anyone may take these words,
          change them, print them and pass them on, so long as the name stays on them and
          whoever takes them next is under the same terms. Attribution, and share-alike: the
          anti-extraction licence, in the only place it can be enforced — in public.

          The software underneath is the covenant's own business, and that page states the
          GNU AGPL-3.0 and says plainly that no public repository exists yet. This line is
          about the words on this page, which need no repository to be taken. */}
      <CovenantLicence />

      {/* ── AND, ON A PHONE, THE TWO DOORS WHERE THE HAND IS ─────────────────────
          Brian, 26 November: "why can't be next level bro of PWA layout on mobile".
          The bar exists only under 1024 pixels and adds no claim to the page. */}
      <XEqualsXPhoneBar />
    </div>
  );
}