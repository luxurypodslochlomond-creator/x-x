import React from 'react';

export default function NewsEntryImage({ entry, preview = false }) {
  if (!entry.image_url) return entry.image_credit ? <p className="news-picture-note">Picture credited, not held here · {entry.image_credit}</p> : null;
  return (
    <figure className={`news-entry-image${preview ? ' news-entry-image-preview' : ''}`}>
      <img src={entry.image_url} alt={entry.headline} loading="lazy" decoding="async" />
      {entry.image_credit && <figcaption>{entry.image_credit}</figcaption>}
    </figure>
  );
}