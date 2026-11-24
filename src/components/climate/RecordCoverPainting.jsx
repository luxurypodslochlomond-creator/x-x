import React, { useState } from 'react';
import { IMAGES, RECORD_COVER_MOBILE } from '@/components/climate/categoryImages';
import ArtworkShareButton from '@/components/climate/ArtworkShareButton';
import { RECORD_LINK } from '@/components/climate/shareRecordCard';
export default function RecordCoverPainting() {
  const [source, setSource] = useState(IMAGES.cover);
  return <figure className="m-0 mb-5 lg:mb-6">
    <div className="relative w-full overflow-hidden rounded-2xl bg-record-ink">
      <picture><source media="(max-width: 639px)" srcSet={RECORD_COVER_MOBILE} />
        <img src={IMAGES.cover} alt="The record’s cover painting, the world painted for the record" onLoad={event => setSource(event.currentTarget.currentSrc || IMAGES.cover)} className="block h-auto w-full object-contain sm:h-[clamp(190px,40vh,470px)] sm:object-cover" />
      </picture>
    </div>
    <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-record-muted"><span>Cover · painted for the record</span><ArtworkShareButton imageUrl={source} title="Together We Can Change Climate" credit="Cover · painted for the record" link={RECORD_LINK} id="cover-painting" /></figcaption>
  </figure>;
}