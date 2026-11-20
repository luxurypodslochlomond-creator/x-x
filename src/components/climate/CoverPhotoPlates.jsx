import React, { useState } from 'react';
import useClimatePhotos from '@/components/climate/useClimatePhotos';
import ClimatePhotoViewer from '@/components/climate/ClimatePhotoViewer';

// ── THE PHOTOGRAPHS SIT UNDER THE COVER, WHERE THEY ARE EVIDENCE ───────────────
// Three credited photographs were mounted a screen and a half down the page — under the
// four rooms and the subject index — as a full-width slider: a screen of scrolling for the
// record's own evidence of the world it is about, arriving after the reader had already
// been asked to choose a room.
//
// Brian, 20 November: "should they be in where we have our cover painted... so we can
// scroll to them in slide shown at top under Jane goodall quote and after our first image
// we painted... it might give us some more space."
//
// So they are a plate row directly under the cover painting: one row, three plates, each
// with its own credit printed beneath it, a swipe on a phone and all three at once on a
// desk. Nothing is lost — a plate still opens full size, with its credit on the bar — and
// the full-width crawl that cost a screen further down is gone, so the record gets shorter
// by a screen while the pictures move up. The painting stays first and alone, because it is
// the only image on the record that nobody else has.
//
// The credit is never separated from its plate, so it is printed under each one rather than
// gathered into a single line at the foot, where a reader could not tell which name belonged
// to which picture.
export default function CoverPhotoPlates() {
  const { photos, loading, error } = useClimatePhotos();
  const [openAt, setOpenAt] = useState(null);

  if (loading || error || !photos.length) return null;

  return (
    <section aria-label="Photographs on the record" className="mt-4 mb-1">
      <div className="climate-photo-rail flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain">
        {photos.map((photo, i) => (
          <figure key={photo.id} className="m-0 w-[74%] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:flex-1">
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open larger: ${photo.caption || photo.credit}`}
              className="block w-full border-2 border-record-ink bg-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-mark"
            >
              <img
                src={photo.display_url || photo.image_url}
                alt={photo.caption || 'Photograph on the record'}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
                className="block aspect-[3/2] w-full object-cover"
              />
            </button>
            <figcaption className="mt-1.5">
              {photo.caption && (
                <span className="block font-mono text-[9px] uppercase leading-[1.4] tracking-[0.12em] text-record-ink">
                  {photo.caption}
                </span>
              )}
              <span className="mt-0.5 block font-mono text-[8px] uppercase leading-[1.4] tracking-[0.1em] text-record-muted">
                {photo.credit}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-record-muted">
        {String(photos.length).padStart(2, '0')} photographs · tap a plate to open
      </p>
      {openAt !== null && (
        <ClimatePhotoViewer photos={photos} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </section>
  );
}