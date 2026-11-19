import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { recordOrigin } from '@/components/climate/recordAddress';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';

export default function CartoonEventShare() {
  return (
    <div className="comic-event-share">
      <ShareCardButton entry={CARTOON_CARD} build={buildCartoonShareCard} label="Share the event" link={`${recordOrigin()}/ClimateCartoons`} previewFirst />
    </div>
  );
}