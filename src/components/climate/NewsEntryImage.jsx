import React from 'react';
import ArtworkShareButton from '@/components/climate/ArtworkShareButton';
import { recordAddress } from '@/components/climate/recordAddress';
import { wireAddress } from '@/components/climate/recordSlug';

export default function NewsEntryImage({ entry, preview = false }) {
  if (!entry.image_url) return entry.image_credit ? <p className="news-picture-note">Picture credited, not held here · {entry.image_credit}</p> : null;
  return (
    <figure className={`news-entry-image${preview ? ' news-entry-image-preview' : ''}`}>
      <img src={entry.image_url} alt={entry.headline} loading="lazy" decoding="async" />
      {entry.image_credit && <figcaption>{entry.image_credit}</figcaption>}
      <ArtworkShareButton id={entry.id} imageUrl={entry.image_url} title={entry.headline} credit={entry.image_credit} link={recordAddress(wireAddress(entry))} />
    </figure>
  );
}