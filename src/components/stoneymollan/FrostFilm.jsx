import React from 'react';

/**
 * Ben's film of the muir, centred like the rest of the sheet, with the credit
 * line that travels with it. The clip keeps whatever shape it was shot in
 * rather than being cropped to fit a box.
 */
export default function FrostFilm({ src, poster }) {
  return (
    <section className="border-t border-record-ink/25 pt-5">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-record-ink">
        Up the hill &middot; John Muir Way <span className="px-2 text-record-ink/25">/</span> Film
        &middot; Ben Santiago
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
        className="mx-auto mt-3 max-w-[44ch] text-center text-[15.5px] leading-relaxed text-record-ink/85"
        style={{ fontFamily: 'var(--font-record-reading)' }}
      >
        Up on the John Muir Way — the hill path that climbs straight off the top of our own
        drive.
      </p>
    </section>
  );
}