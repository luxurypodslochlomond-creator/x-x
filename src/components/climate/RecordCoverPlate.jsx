import React from 'react';
import '@/components/climate/record-home.css';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildRecordShareCard } from '@/components/climate/shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from '@/components/climate/shareRecordCard';

const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

export default function RecordCoverPlate({ copy }) {
  return (
    <section aria-labelledby="record-home-title" className="record-cover-plate record-home-opening w-full border-t-4 border-record-red text-record-ink">
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-4 lg:px-10">
        <h1 id="record-home-title" className="record-cover-plate-title m-0 max-w-[20ch] font-display uppercase leading-[0.96] tracking-[-0.015em] text-record-ink">
          {copy.title_a} <span className="text-record-red">{copy.title_b}</span> {copy.title_c}
        </h1>
        <p className="record-header-type mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-record-red">
          {copy.service}
        </p>
        <p className="record-meta mt-4 max-w-[58ch] text-base leading-relaxed text-record-ink/80">
          {copy.sub}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-record-ink/20 py-3">
          <span className="text-xs text-record-muted">{copy.noads} · {copy.nofund}</span>
          <div className="flex flex-wrap items-center gap-4 text-xs text-record-muted">
            <ShareCardButton entry={RECORD_CARD} build={buildRecordShareCard} link={RECORD_LINK} description={copy.sub} previewFirst inline />
          </div>
        </div>
      </div>
    </section>
  );
}