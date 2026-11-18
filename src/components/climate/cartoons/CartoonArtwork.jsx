import React, { useState } from 'react';

export default function CartoonArtwork({ cartoon, lead = false }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="comic-artwork-unavailable">
      <p>The drawing could not be opened here.</p>
      {cartoon.source_url && <a href={cartoon.source_url} target="_blank" rel="noopener noreferrer">See “{cartoon.title || cartoon.artist_name}” at its source ↗</a>}
    </div>
  );
  return <img src={cartoon.display_image_url || cartoon.image_url} alt={cartoon.title || `A drawing by ${cartoon.artist_name}`}
    className="comic-wall-artwork" loading={lead ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}