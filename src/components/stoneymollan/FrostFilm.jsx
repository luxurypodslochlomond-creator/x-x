import React from 'react';

/**
 * Ben's film of the muir, and the credit line that travels with it.
 * Left-anchored like everything else on the page: the label sits on the
 * page's own left edge, and the clip keeps whatever shape it was shot in
 * rather than being cropped to fit a box.
 */
export default function FrostFilm({ src, poster }) {
  return (
    <section className="border-t border-record-ink/25 pt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-muted">
        Film &middot; Ben Santiago
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
      <p
        className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-record-muted"
        style={{ fontFamily: 'var(--font-record-reading)' }}
      >
        Sent up from the muir before the mist lifted.
      </p>
    </section>
  );
}