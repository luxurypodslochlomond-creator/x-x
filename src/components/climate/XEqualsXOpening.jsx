import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';

// ── THE FRONTISPIECE ────────────────────────────────────────────────────────────
// This was a centred paragraph with a small equation above it, and it is now a plate:
// the mark set as a mark, the promise beside it, and the two things a reader can do with
// a covenant — read the record, or pass it on — within the first screen instead of at the
// foot of six sections.
//
// It carries the same two lines the share card carries, in the same two corners, on
// purpose: what travels and what is read should be one object, not two designs of the
// same promise. A reader who screenshots the page and a reader who receives the picture
// get the same thing.
//
// Nothing here moves on a loop. The page argues against the feed, so it cannot itself be
// a slot machine: one arrival, then stillness.
export default function XEqualsXOpening() {
  return (
    <header aria-labelledby="the-principle" className="covenant-front">
      <div className="covenant-front-imprint">
        <span>The principle</span>
        <span>Record of the Time</span>
      </div>

      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
      </h1>

      <p className="covenant-purpose">
        A solution is a solution. An action is an action. A person is a person.
        No algorithm ranks them. No money amplifies them. The record is the record
        — every entry held to the same standard, never ranked by how loud it is.
      </p>

      <p className="covenant-front-note">
        This is what an honest record looks like. This is the opposite of the feed.
      </p>

      <div className="covenant-front-actions">
        <Link className="covenant-open" to="/TogetherChangeClimate">
          Read the record <span aria-hidden="true">→</span>
        </Link>
        <div className="covenant-share">
          <ShareCardButton
            entry={{ id: 'x-equals-x', title: 'x = x' }}
            build={buildCovenantCard}
            label="Pass it on"
          />
        </div>
      </div>
    </header>
  );
}