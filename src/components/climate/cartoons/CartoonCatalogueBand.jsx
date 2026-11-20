import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import CartoonEventShare from '@/components/climate/cartoons/CartoonEventShare';
import CartoonCoverWords from '@/components/climate/cartoons/CartoonCoverWords';

// ── THE FIRST IMAGE ON THE PAGE ────────────────────────────────────────────────
// Brian, 18 November: "you think that image should be first image on page bro… love the
// image there but needs to be top of page." He is right about which picture should open
// this room. The thirteen drawings are what the wall is for, but the catalogue cover is
// the thing a visitor from CAIB, a festival, a school or a newsroom recognises on sight —
// it is the book, and the book is why the drawings are being gathered at all.
//
// So it opens the page at full width, with nothing above it but the record's own line, and
// one band of copy under it saying what it is: the cover as its editors have it now, the
// two editors, and the promise that it downloads from here for free the day it is finished.
// The picture itself is printed as it was sent — never cropped, tinted, redrawn or
// "improved", because it is somebody else's cover and the room does not doctor the work.
// Janine, through Brian, 18 November: the cover she has now names African AND non-African
// cartoonists, and the one that was standing here did not. Her cover is the one that goes
// up — it is her book, and a room that gathers drawings from everywhere must not open on a
// cover that says it only came from one place. Swapped whole, not cropped to fit.
const COVER = CARTOON_COVER;

export default function CartoonCatalogueBand() {
  return (
    <section className="comic-catalogue" aria-labelledby="comic-catalogue-title">
      <img
        src={COVER}
        alt="Cover of the 8th CartoonAFRICA International Biennial (CAIB) 2026 anthology, Climate Change and the Power of Collective Actions and Creative Interventions, featuring African and non-African cartoonists. Cover artwork by Francis Umendu Odupute. Edited by Francis Umendu Odupute and Janine Selendy."
        width={682}
        height={1024}
        loading="eager"
        fetchPriority="high"
      />
      <div className="comic-catalogue-band">
        {/* The hand that drew it, said first and said plainly. Janine told us on the 18th
            whose the cover is, and a credit that arrives after the description of the book
            is a credit nobody reads. */}
        <p className="comic-catalogue-cover-credit record-meta">{CARTOON_EVENT.coverArt}</p>
        <CartoonCoverWords />
        <p id="comic-catalogue-title" className="comic-catalogue-eyebrow record-meta">The catalogue · being made now</p>
        {/* ── WHAT THIS BOOK IS, IN THE WORDS OF THE PEOPLE MAKING IT ──────────────
            Francis Umendu Odupute, to Janine, 18 November: "This is a sample of the
            catalogue cover page that African Press Cartoon services is preparing for the
            selected cartoons that will feature in our online workshop discussions on 29th
            November. All the African cartoonists who participated in the discussion will
            have their artworks packaged into an anthology or catalogue and published our
            CAIB website platforms as well as on your new website on Climate Change
            collective actions, for free downloads globally."

            That paragraph is the whole reason this room exists, and it had never been
            printed on the page — a reader met a cover, a caption and a share button and was
            left to guess who was making the book, out of what, and what would happen to it.
            So it is said here in three plain sentences, in his terms, with no adjectives
            added. */}
        <p className="comic-catalogue-line record-meta">
          This is a sample of the catalogue cover that African Press Cartoon Services is
          preparing for the cartoons selected for the online workshop discussions on
          29 November.
        </p>
        <p className="comic-catalogue-line record-meta">
          Every African cartoonist who took part in those discussions has their work
          gathered into it, edited by {CARTOON_EVENT.editors}.
        </p>
        <p className="comic-catalogue-line record-meta">
          When it is finished it is published free — on CAIB’s own platforms and on this
          record — for anyone in the world to download.
        </p>
        {/* The man himself, given somewhere to be rather than a name in a credit line: his
            own address on the record, with his drawings and the words he wrote about them. */}
        <Link to="/ClimateCartoons/Francis" className="comic-catalogue-link">
          Francis Umendu Odupute · his own page
        </Link>
        <a href="#cartoon-anthology" className="comic-catalogue-link">
          What the book is <ArrowDown size={14} />
        </a>
        <CartoonEventShare />
      </div>
    </section>
  );
}