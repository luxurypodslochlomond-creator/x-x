import React from 'react';

/**
 * Ben's film of the muir, and the credit line that travels with it.
 * The clip is a phone recording, so it is never cropped to fit a box —
 * whatever shape it was shot in is the shape it plays in.
 */
export default function FrostFilm({ src, poster }) {
  return (
    <figure className="border-t border-record-ink/15 bg-record-bone">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-record-muted">
          Film · Ben Santiago
        </p>
        <div className="mt-3 bg-record-ink/90">
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="mx-auto block h-auto w-full object-contain"
            style={{ maxHeight: '72vh' }}
          >
            Your browser cannot play this film.
          </video>
        </div>
        <figcaption
          className="mt-3 text-[15px] leading-relaxed text-record-muted"
          style={{ fontFamily: 'var(--font-record-reading)' }}
        >
          Sent from Zone 1, minutes from the cabins, before the mist lifted.
        </figcaption>
      </div>
    </figure>
  );
}