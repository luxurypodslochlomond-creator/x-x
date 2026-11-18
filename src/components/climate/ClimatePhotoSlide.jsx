import React from 'react';
import ClimatePhotoCredit from '@/components/climate/ClimatePhotoCredit';

// The photograph and its credited paper caption are one mounted plate.
// Swiping and opening the full-screen original work exactly as before.

export default function ClimatePhotoSlide({ photo, onOpen }) {
  return (
    <figure className="climate-photo-slide relative w-full min-w-0 shrink-0 snap-start snap-always">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open larger: ${photo.caption || photo.credit}`}
        className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-record-signal"
      >
        <span className="climate-photo-slide-frame relative block aspect-[3/2] max-h-[70vh] w-full overflow-hidden bg-record-ink">
          <img
            src={photo.display_url || photo.image_url}
            alt={photo.caption || 'Photograph on the record'}
            width="1800"
            height="1200"
            loading="lazy"
            decoding="async"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </span>
      </button>
      <figcaption className="record-media-caption">
        <ClimatePhotoCredit photo={photo} variant="bar" />
      </figcaption>
    </figure>
  );
}