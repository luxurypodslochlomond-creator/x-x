import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import buildArtworkShare from '@/components/climate/buildArtworkShare';

// One picture, passed on unchanged. `instant` is only for a page showing a single drawing:
// it fetches the picture once, quietly, so the tap opens the share sheet with the artwork
// already in hand. A wall of entries must not set it — every card would fetch its picture
// a second time just in case somebody pressed it.
export default function ArtworkShareButton({ imageUrl, title, credit, link, id = 'artwork', instant = false }) {
  return <ShareCardButton entry={{ id, title, image_url: imageUrl, image_credit: credit }} build={buildArtworkShare} link={link} label="Share image" previewFirst={!instant} instant={instant} compact />;
}