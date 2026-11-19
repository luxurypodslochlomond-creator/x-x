import React from 'react';
import '@/components/climate/record-home.css';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildRecordShareCard } from '@/components/climate/shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from '@/components/climate/shareRecordCard';
import { IMAGES, RECORD_COVER_MOBILE } from '@/components/climate/categoryImages';

const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

// ── THE COVER IS A PAINTING AGAIN ───────────────────────────────────────────────
// Brian, 19 November: "on cover coolasfuck painting please bro". The cover had become a
// sheet of type — the title, a line and a summary on warm paper — while the record's one
// painting stood at the door, behind the masthead, and at the foot of every page. So the
// cover of a record about the world opened with no picture of the world on it.
//
// It is a plate, not wallpaper. The painting is set in a frame of the record's ink at the
// top of the sheet, at its own proportion, with the title beneath it in the record's own
// cut. Nothing is written over it: the last time a painting was laid behind the words the
// navigation and the entries disappeared into it, and a cover you cannot read is a poster.
// One work, one place, the same file the rest of the record already uses — so the cover
// and the room it opens into are the same room.
function CoverPainting() {
  return (
    <figure className="m-0 mb-5 lg:mb-6">
      <div className="relative w-full overflow-hidden border-2 border-record-ink bg-record-ink">
        <picture>
          {/* The portrait cut on a phone: a landscape plate on a handset is a letterbox
              with the middle of the painting thrown away. */}
          <source media="(max-width: 639px)" srcSet={RECORD_COVER_MOBILE} />
          <img
            src={IMAGES.cover}
            alt="The record's cover painting — the world, painted for the record"
            className="block h-[clamp(190px,40vh,470px)] w-full object-cover"
          />
        </picture>
      </div>
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
        Cover · painted for the record
      </figcaption>
    </figure>
  );
}

export default function RecordCoverPlate({ copy }) {
  return (
    <section aria-labelledby="record-home-title" className="record-cover-plate record-home-opening w-full border-t-4 border-record-red text-record-ink">
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-4 lg:px-10">
        <CoverPainting />
        <h1 id="record-home-title" className="record-cover-plate-title m-0 max-w-[20ch] font-display uppercase leading-[0.96] tracking-[-0.015em] text-record-ink">
          {copy.title_a} <span className="text-record-red">{copy.title_b}</span> {copy.title_c}
        </h1>
        {/* The one line that says what this is for, set in the middle of the sheet under
            the title rather than ragged off the left edge where it read as a stray label. */}
        <p className="record-header-type mt-3 w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-record-red">
          {copy.service}
        </p>
        <p className="record-meta mt-4 max-w-[58ch] text-base leading-relaxed text-record-ink/80">
          {copy.sub}
        </p>
        {/* The no-advertising / no-sponsorship line is off the sheet at Brian's ask,
            19 November. What the record promises about money is said in the governance
            band in full sentences, which is where it belongs. */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 border-t border-record-ink/20 py-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-record-muted">
            <ShareCardButton entry={RECORD_CARD} build={buildRecordShareCard} link={RECORD_LINK} description={copy.sub} previewFirst inline />
          </div>
        </div>
      </div>
    </section>
  );
}