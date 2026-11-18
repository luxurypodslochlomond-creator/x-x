import React from 'react';
import ComicMasthead from '@/components/climate/cartoons/ComicMasthead';

// ── THE COVER, NOT A HEADER ─────────────────────────────────────────────────────
// Brian, 18 November: "still feels old, not like a coolasfuck cartoons site". He is
// pointing at the top of the page, and he is right. A title on blank paper, then a wall,
// is how a blog opens. A cartoon site opens on a drawing, and the name is printed under
// it on a band of colour the way a cover is printed — the picture is the cover, the name
// is the caption on the cover.
//
// So the newest drawing is the room's front page: full width on a handset, no frame, the
// drawing running to both edges of the glass, and the room's name slapped underneath on
// the sun band with the hand that drew it and the line that says who holds it. Nothing
// new is stored and no drawing is cropped to fit: the picture sits whole, in its own
// shape, and the page is built around it.
//
// With nothing on the wall yet it falls back to the name alone, so the room never opens
// on a hole.
export default function CartoonCover({ cartoon }) {
  if (!cartoon) return <ComicMasthead />;

  const { image_url, title, artist_name, origin, credit } = cartoon;

  return (
    <header className="comic-cover">
      <div className="comic-cover-art">
        <img
          src={image_url}
          alt={title || `A drawing by ${artist_name}`}
          loading="eager"
        />
      </div>
      <div className="comic-cover-plate">
        <p className="comic-eyebrow record-meta">A little mischief. A bigger picture.</p>
        <h1 className="comic-title">
          The Big<br /><span>Picture</span>
          <span className="comic-title-stop" aria-hidden="true">!</span>
        </h1>
        <p className="comic-cover-by">
          Drawn by <strong>{artist_name}</strong>{origin ? ` · ${origin}` : ''}
        </p>
        {credit && <p className="comic-cover-credit">{credit}</p>}
      </div>
    </header>
  );
}