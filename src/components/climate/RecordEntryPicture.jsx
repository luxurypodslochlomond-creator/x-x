import React from 'react';

// Only a picture saved with the entry is shown. An illustrative image says so;
// a missing or failed image leaves a text entry, never an enlarged navigation mark.
export default function RecordEntryPicture({ image, className = '', priority = false }) {
  if (!image?.src) return null;
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-record-bone">
        <img
          src={image.src}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={image.onError}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <figcaption className="record-picture-credit mt-1.5 text-[11px] leading-relaxed text-record-muted">
        {image.borrowed && <span>{image.label} · </span>}
        {image.credit || 'Image credit not supplied'}
      </figcaption>
    </figure>
  );
}