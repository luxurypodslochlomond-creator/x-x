import React, { useState } from 'react';

export default function CartoonArtwork({ cartoon, lead = false, linkSource = true }) {
  const source = cartoon.display_image_url || cartoon.image_url;
  const [failedSource, setFailedSource] = useState(null);
  if (failedSource === source) return (
    <div className="comic-artwork-unavailable">
      <p>The drawing could not be opened here.</p>
      {linkSource && cartoon.source_url && <a href={cartoon.source_url} target="_blank" rel="noopener noreferrer">See “{cartoon.title || cartoon.artist_name}” at its source ↗</a>}
    </div>
  );
  return <img src={source} alt={cartoon.title || `A drawing by ${cartoon.artist_name}`}
    className="comic-wall-artwork" loading={lead ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" onError={() => setFailedSource(source)} />;
}