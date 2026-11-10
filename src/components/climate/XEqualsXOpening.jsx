import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordCover from '@/components/climate/RecordCover';
import SignalBeacon from '@/components/climate/SignalBeacon';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';

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
      <RecordCover position="center 30%" strength={0.4} />
      <div className="covenant-hero-veil" aria-hidden="true" />
      <div className="covenant-hero-scan" aria-hidden="true" />

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

        <p className="covenant-front-note">
          This is what an honest record looks like. This is the opposite of the feed.
        </p>

        <div className="covenant-hero-actions">
          <Link to="/TogetherChangeClimate" className="covenant-btn">
            Read the record <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="covenant-share">
            <ShareCardButton
              entry={{ id: 'x-equals-x', title: 'x = x' }}
              build={buildCovenantCard}
              label="Pass it on"
            />
          </div>
        </div>
      </div>
    </div>
  );
}