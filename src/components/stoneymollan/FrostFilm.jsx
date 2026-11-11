import React from 'react';

/**
 * Ben's film of the muir, centred like the rest of the sheet, with the credit
 * line that travels with it. The clip keeps whatever shape it was shot in
 * rather than being cropped to fit a box.
 */
export default function FrostFilm({ src, poster }) {
  return (
    <section className="border-t border-record-ink/25 pt-5">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-record-muted">
        Film <span className="px-2 text-record-ink/25">/</span> Ben Santiago
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
        className="mx-auto mt-3 max-w-[44ch] text-center text-[15px] leading-relaxed text-record-muted"
        style={{ fontFamily: 'var(--font-record-reading)' }}
      >
        Sent up from the muir before the mist lifted.
      </p>
    </section>
  );
}