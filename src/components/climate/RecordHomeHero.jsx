import React from 'react';
import ShareCardButton from './ShareCardButton';
import { buildRecordShareCard } from './shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from './shareRecordCard';
import '@/components/climate/record-home.css';

// ── THE SHARE, IN THE MASTHEAD, IN TWO WORDS ──────────────────────────────────
// The card is still the thing that leaves — press, see it, keep it or send it. What has
// changed is how the record asks. It used to be a band under the strip: a yellow plate
// with a framed thumbnail, a sentence and an arrow. Brian, 19 November: "the pass it on
// bar doesn't feel right bro can you remove and put pass it on in same font after for a
// public service for the world." Right again — the band was a poster pasted into a
// printed page, and it repeated in a shout what the strip had already said quietly.
//
// So "Pass it on" now stands on the strip itself, immediately after "A public service ·
// for the world", in exactly the same tracked capitals: the declaration and the ask are
// one line, which is the truest version of the thing. The words are the record's signal
// yellow, because that is the one ink on this strip that means press me.
//
// What leaves is unchanged and carries everything it should: the card is the painting,
// the title is the record's own, and the sentence underneath is this page's summary in
// the reader's own tongue — so a reader who reads the record in their own language
// passes it on in their own language.
const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

export default function RecordHomeHero({ copy }) {
  return (
    <section aria-labelledby="record-home-title" className="record-home-hero relative text-record-bone">
      <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-record-bone/20 bg-record-ink/50 px-4 py-2 lg:px-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-record-bone">{copy.service}</span>
        <ShareCardButton
          entry={RECORD_CARD}
          build={buildRecordShareCard}
          link={RECORD_LINK}
          description={copy.sub}
          previewFirst
          inline
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