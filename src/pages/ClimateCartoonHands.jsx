import React, { useEffect, useState } from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import HandsRoll from '@/components/climate/cartoons/HandsRoll';
import handsOnTheWall from '@/components/climate/cartoons/handsOnTheWall';
import '@/components/climate/cartoons/sheet/hands.css';

// ── THE HANDS ───────────────────────────────────────────────────────────────────
// A wall of drawings can be walked past. A roll of names cannot: it says out loud that
// every picture in this room came out of somebody's hand, and it says who. It exists for
// the cartoonist who has never seen their own name standing beside other people's, and for
// the editor, curator or teacher who wants to find the person rather than the picture.
//
// Nothing here is ranked. It is alphabetical, and the counts are printed plainly because a
// number that is not shown is a number somebody will invent.
export default function ClimateCartoonHands() {
  const [hands, setHands] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    handsOnTheWall()
      .then((roll) => { if (!cancelled) setHands(roll); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  const total = (hands || []).reduce((sum, hand) => sum + hand.drawings, 0);

  return (
    <ClimateRecordShell
      compact
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="Back to the room of cartoons"
      footer="A drawing is put up by a person, and the name on the wall is the name of the hand that made it."
    >
      <div className="hands-page">
        <header className="hands-head">
          <p className="hands-kicker">Every picture here came out of somebody’s hand</p>
          <h1 className="hands-title">The hands.</h1>
          <p className="hands-line">
            {hands === null
              ? 'Reading the wall for names…'
              : hands.length === 0
                ? 'No names on the wall yet.'
                : `${hands.length === 1 ? 'One hand' : `${hands.length} hands`} · ${total === 1 ? 'one drawing' : `${total} drawings`} · in alphabetical order, never in order of how many.`}
          </p>
        </header>

        {failed && (
          <p className="hands-line" role="alert">
            The wall could not be read just now. Reload the page and the names will come back.
          </p>
        )}

        {hands !== null && hands.length === 0 && !failed && (
          <p className="hands-line">
            The first name is still to come. A drawing is given in <a href="/ClimateCartoons">the room of cartoons</a>.
          </p>
        )}

        {hands !== null && hands.length > 0 && <HandsRoll hands={hands} />}

        {/* Said plainly, because a room that is the world's cannot be one studio's, and a
            reader should be able to see that on the page rather than work it out. */}
        {hands !== null && hands.length === 1 && (
          <p className="hands-line hands-thin">
            One hand is not yet a room. When a drawing arrives from a school, a workshop or a
            newspaper anywhere in the world, the next name appears here beside this one.
          </p>
        )}

        <p className="hands-note">
          A name appears here when that hand’s first drawing goes up, and it goes when their last
          one comes down — because this roll is not kept beside the wall, it is counted off the
          wall itself.
        </p>
      </div>
    </ClimateRecordShell>
  );
}