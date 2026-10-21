import React from 'react';
import { Maximize2 } from 'lucide-react';
import ClimatePhotoCredit from '@/components/climate/ClimatePhotoCredit';

export default function ClimatePhotoSlide({ photo, onOpen }) {
  return (
    <figure className="w-full min-w-0 shrink-0 snap-start snap-always">
      <button type="button" onClick={onOpen} aria-label={`View full size: ${photo.caption || photo.credit}`} className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal focus-visible:-outline-offset-2">
        <span className="relative block aspect-[3/2] w-full bg-record-ink">
          <img src={photo.display_url || photo.image_url} alt={photo.caption || 'Photograph on the record'} width="1800" height="1200" decoding="async" draggable="false" className="absolute inset-0 h-full w-full object-contain" />
        </span>
        <span className="flex min-h-11 items-center justify-end gap-2 bg-record-bone px-4 text-xs font-body text-record-ink"><Maximize2 className="h-4 w-4" />View full size</span>
      </button>
      <figcaption><ClimatePhotoCredit photo={photo} /></figcaption>
    </figure>
  );
}