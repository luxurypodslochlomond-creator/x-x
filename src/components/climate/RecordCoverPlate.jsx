import React from 'react';
import '@/components/climate/record-home.css';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildRecordShareCard } from '@/components/climate/shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from '@/components/climate/shareRecordCard';
import CoverPhotoPlates from '@/components/climate/CoverPhotoPlates';
import RecordCoverPainting from '@/components/climate/RecordCoverPainting';
const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };
export default function RecordCoverPlate({ copy }) {
  return <section aria-labelledby="record-home-title" className="record-cover-plate record-home-opening w-full border-t-4 border-record-red text-record-ink">
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-4 lg:px-10">
      <RecordCoverPainting />
      <h1 id="record-home-title" className="record-cover-plate-title m-0 max-w-[20ch] font-display leading-[1.05] tracking-tight text-record-ink">{copy.title_a} <span className="text-record-red">{copy.title_b}</span> {copy.title_c}</h1>
      <p className="record-header-type mt-3 w-full text-center text-xs text-record-red">{copy.service}</p>
      <CoverPhotoPlates />
      <div className="mt-4 flex justify-end border-t border-record-ink/15 py-3"><ShareCardButton entry={RECORD_CARD} build={buildRecordShareCard} link={RECORD_LINK} description={copy.sub} previewFirst inline /></div>
    </div>
  </section>;
}