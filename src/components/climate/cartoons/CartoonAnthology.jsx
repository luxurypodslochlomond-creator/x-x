import React from 'react';
import '@/components/climate/cartoons/cartoon-anthology.css';

// ── THE BOOK THAT COMES OUT OF THE 29TH ────────────────────────────────────────
// Janine, 17 November 2026: every African cartoonist who takes part in the workshop has
// their work gathered into an anthology, published on CartoonAFRICA's own platforms and on
// this record, free to download anywhere in the world. That is the largest thing this room
// will ever hold, so it is printed here in the anthology's own words rather than described.
//
// The title, the two editors and the subtitle are quoted exactly. The record does not
// re-title somebody else's book, does not shorten a credit, and does not put a name on it
// that the editors did not put there.
//
// ── WHAT IS DELIBERATELY NOT HERE: THE COVER ──────────────────────────────────
// A sample of the cover page was sent to the record on 17 November, and it is a sample —
// the anthology is still being prepared. Printing a draft cover as though it were the
// finished book would be the one way to do this badly: the record would be showing
// something that is about to change, and a reader would take the draft for the final
// article. The cover and the book go up together, on the day they are the real thing.
//
// And no link, because there is nothing behind it yet. A dead download button on a page
// about honesty is worse than no button: this plate says plainly when the book appears
// here, and then it will.

const TITLE = 'Climate Change and the Power of Collective Actions and Creative Interventions';

export default function CartoonAnthology() {
  return (
    <section className="comic-anthology" aria-labelledby="cartoon-anthology-title">
      <p className="comic-anthology-eyebrow">The anthology · in preparation</p>
      <h2 id="cartoon-anthology-title" className="comic-anthology-title">{TITLE}</h2>
      <p className="comic-anthology-sub">
        “…an anthology of editorial cartoons and comics journalism works by selected African
        cartoonists.”
      </p>

      <dl className="comic-anthology-facts">
        <div>
          <dt>Edited by</dt>
          <dd>Francis Umendu Odupute and Janine Selendy</dd>
        </div>
        <div>
          <dt>From</dt>
          <dd>The 8th CartoonAFRICA International Biennial (CAIB) 2026</dd>
        </div>
        <div>
          <dt>Prepared by</dt>
          <dd>African Press Cartoon services</dd>
        </div>
      </dl>

      <p className="comic-anthology-note">
        Every African cartoonist who takes part in the 29 November discussion has their work
        gathered into this book. It is published on CartoonAFRICA’s own platforms and on this
        record, for free download, anywhere in the world.
      </p>

      <p className="comic-anthology-free">
        Free · no sign-in · one download for everyone, everywhere
      </p>

      <p className="comic-anthology-status">
        A sample of the cover page reached the record on 17 November 2026. The book is still
        being made, so the cover is not printed here as though it were finished, and the
        download appears on this page the day the anthology does.
      </p>

      <p className="comic-anthology-credit">
        The cartoons stay the artists’ own. The anthology and its cover are CartoonAFRICA’s,
        prepared by African Press Cartoon services, 2026.
      </p>
    </section>
  );
}