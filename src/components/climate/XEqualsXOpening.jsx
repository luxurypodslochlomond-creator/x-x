import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordCover from '@/components/climate/RecordCover';
import SignalBeacon from '@/components/climate/SignalBeacon';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

// ── THE PLATE ───────────────────────────────────────────────────────────────────
// The principle is set the way her page sets her sentence: the record's painting held
// behind the words, cooled and veiled, and the type lit in front of it. The mark is set
// in the machine's lettering at the size a mark is owed, with the equals sign left in
// paper so the line reads red, paper, red — the same rhythm the share card uses, so the
// page and the picture are one object rather than two designs of the same promise.
//
// Both actions sit under the principle, centred, in the first screen. A covenant nobody
// can pass on is a poster.
export default function XEqualsXOpening() {
  return (
    <div className="covenant-hero">
      {/* ── THE REAL PAINTING, AT ITS OWN STRENGTH ────────────────────────────────
          Brian, 18 November: "x = x page look like fake image bro". It did, and it was our
          fault rather than the painting's: the plate was held at 55% under a veil, then a
          second layer of drawn stars and four drawn meteors was laid over it, and a scan
          texture on top of that. Three illustrations stacked on one photograph is exactly
          what makes a real image read as a fake one.
          So the sky is the painting now — whole, unblended, at full strength — and the veil
          is the only thing between the words and it, which is all the words ever needed. */}
      <RecordCover position="center 30%" strength={1} />
      <div className="covenant-hero-veil" aria-hidden="true" />

      <div className="covenant-hero-inner">
        <SignalBeacon size={48} color="rgb(var(--record-light-signal))" />

        <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
          <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
        </h1>

        <p className="covenant-purpose">
          A solution is a solution. An action is an action. A person is a person.
        </p>
        <p className="covenant-hero-detail">
          <strong>No algorithm ranks them. No money amplifies them.</strong>{' '}
          The record is the record — every entry held to the same standard, never ranked by how loud it is.
        </p>

        <div className="covenant-hero-actions">
          <Link to="/TogetherChangeClimate" className="covenant-btn">
            Read the record <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="covenant-share">
            {/* The card travels with a sentence and lands on this page, not on the front
                door of the record: somebody who is passed a principle should be able to
                read the whole of it without hunting for it. */}
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
    </div>
  );
}