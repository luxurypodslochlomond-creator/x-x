import React from 'react';

// Only a picture saved with the entry is shown. An illustrative image says so;
// a missing or failed image leaves a text entry, never an enlarged navigation mark.
// The frame's shape is a prop because the record holds its pictures in a mosaic now: one big,
// two small, one wide. A single fixed ratio made every plate the same block and left the gaps
// between them doing the talking. 16/10 stays the default, so every other caller is unchanged.
export default function RecordEntryPicture({ image, className = '', priority = false, ratio = '16/10' }) {
  if (!image?.src) return null;
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="relative overflow-hidden bg-record-bone" style={{ aspectRatio: ratio }}>
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