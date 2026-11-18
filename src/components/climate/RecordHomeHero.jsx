import React from 'react';
import ShareCardButton from './ShareCardButton';
import { buildRecordShareCard } from './shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from './shareRecordCard';
import '@/components/climate/record-home.css';

// ── THE SHARE, IN THE MASTHEAD ────────────────────────────────────────────────
// One button, and the card behind it. The cartoon room shares the cover itself rather
// than a sentence about it, and that is the shape that reads right here too: press, see
// the card, keep it or send it. No wrapper box and nothing explaining the button — the
// picture is the point.
const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

export default function RecordHomeHero({ copy }) {
  return (
    <section aria-labelledby="record-home-title" className="record-home-hero relative text-record-bone">
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-record-bone/20 bg-record-ink/50 px-4 py-2 lg:px-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-record-bone">{copy.service}</span>
        <ShareCardButton
          entry={RECORD_CARD}
          build={buildRecordShareCard}
          link={RECORD_LINK}
          compact
          previewFirst
        />
      </div>
      <div className="record-home-title-band relative z-10 px-4 pb-6 pt-8 lg:px-10">
        <h1 id="record-home-title" className="record-home-title font-display uppercase text-record-bone">
          <span className="record-home-title-line">{copy.title_a}</span>{' '}
          <span className="record-home-title-line"><span className="text-cartoon-sun">{copy.title_b}</span> {copy.title_c}</span>
        </h1>
      </div>
      <div className="relative z-10 px-4 pb-5 lg:px-10 lg:pb-6">
        <div className="record-home-summary w-full bg-cartoon-sun px-3.5 py-3 lg:px-5 lg:py-4">
          <p className="record-home-summary-copy record-header-type text-xs text-record-ink">{copy.sub}</p>
          <p className="record-home-summary-motto record-header-type mt-3 text-xs text-record-mark">
            Every symbol · every number · every tongue · nobody left behind · the noise is loud · the record is louder
          </p>
        </div>
        <p className="record-home-cover-credit mt-2.5 font-mono text-xs uppercase tracking-[0.08em] text-record-bone/55">Cover · painted for the record</p>
      </div>
    </section>
  );
}