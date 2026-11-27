import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import buildArtworkShare from '@/components/climate/buildArtworkShare';

// One picture, passed on unchanged. `instant` is only for a page showing a single drawing:
// it fetches the picture once, quietly, so the tap opens the share sheet with the artwork
// already in hand. A wall of entries must not set it — every card would fetch its picture
// a second time just in case somebody pressed it.
export default function ArtworkShareButton({ imageUrl, title, credit, link, id = 'artwork', instant = false }) {
  // The picture alone, but never the picture alone as a bare link: the credit and the
  // address travel with it, because a photograph sent on with its credit stripped off is
  // the one thing this record must never do.
  return <ShareCardButton entry={{ id, title, image_url: imageUrl, image_credit: credit }} build={buildArtworkShare} link={link} label="Share image" previewFirst={!instant} instant={instant} compact includeMessage windowTitle="Share this picture" />;
}