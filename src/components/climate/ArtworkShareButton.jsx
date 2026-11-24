import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import buildArtworkShare from '@/components/climate/buildArtworkShare';
export default function ArtworkShareButton({ imageUrl, title, credit, link, id = 'artwork' }) {
  return <ShareCardButton entry={{ id, title, image_url: imageUrl, image_credit: credit }} build={buildArtworkShare} link={link} label="Share image" previewFirst compact />;
}