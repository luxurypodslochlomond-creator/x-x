import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import CartoonEventShare from '@/components/climate/cartoons/CartoonEventShare';
import CartoonCoverWords from '@/components/climate/cartoons/CartoonCoverWords';
import PressRoomNote from '@/components/climate/cartoons/press/PressRoomNote';

// Francis's original cover stays first, whole and credited.
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

        <p className="comic-catalogue-cover-credit record-meta">{CARTOON_EVENT.coverArt}</p>
        <CartoonCoverWords />
        <PressRoomNote label="About the catalogue">
        <p id="comic-catalogue-title" className="comic-catalogue-eyebrow record-meta">The catalogue · being made now</p>
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
        <a href="#cartoon-anthology" className="comic-catalogue-link">
          What the book is <ArrowDown size={14} />
        </a>
        </PressRoomNote>
        <CartoonEventShare />
      </div>
    </section>
  );
}