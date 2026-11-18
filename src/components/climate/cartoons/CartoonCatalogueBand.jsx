import React from 'react';
import { ArrowDown } from 'lucide-react';

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
const COVER = 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/762236277_caib-2026-catalogue-cover.png';

export default function CartoonCatalogueBand() {
  return (
    <section className="comic-catalogue" aria-labelledby="comic-catalogue-title">
      <img
        src={COVER}
        alt="The cover of the 8th CartoonAFRICA International Biennial 2026 catalogue: five African cartoonists at work between a living landscape and a dead one."
        loading="eager"
      />
      <div className="comic-catalogue-band">
        <p id="comic-catalogue-title" className="comic-catalogue-eyebrow">The catalogue · in preparation</p>
        <p className="comic-catalogue-line">
          The 8th CartoonAFRICA International Biennial 2026 — edited by Francis Umendu Odupute
          and Janine Selendy. Free to download from this page the day it is finished.
        </p>
        <a href="#cartoon-anthology" className="comic-catalogue-link">
          What the book is <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}