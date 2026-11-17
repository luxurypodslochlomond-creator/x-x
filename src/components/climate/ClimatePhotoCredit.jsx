import React from 'react';

// The credit travels with the picture — never as a block underneath it.
// On the crawl it sits inside the same frame as the photograph: over a scrim, with the
// signal rule above it, reading as part of the picture. In the full-size viewer it
// keeps its own bar, where there is nothing to overlay.

export default function ClimatePhotoCredit({ photo, hint, variant = 'bar' }) {
  if (variant === 'overlay') {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-record-ink via-record-ink/75 to-transparent px-4 pb-3.5 pt-16 font-body text-record-paper">
        <span aria-hidden="true" className="mb-3 block h-1 w-12 bg-record-signal" />
        {photo.caption && <span className="record-header-type block max-w-[26ch] text-xl uppercase leading-[1.4] text-record-paper lg:text-[34px]">{photo.caption}</span>}
        <span className="mt-2 block record-header-type text-xs uppercase leading-relaxed tracking-wide text-record-paper/80">{photo.credit}</span>
        {hint && <span className="mt-1 block font-body text-xs leading-snug text-record-paper/70">{hint}</span>}
      </div>
    );
  }

  return (
    <div className="shrink-0 border-t-2 border-record-signal bg-record-bone px-4 py-2.5 font-body text-record-ink">
      {photo.caption && <span className="record-header-type block text-base uppercase leading-relaxed">{photo.caption}</span>}
      <span className="mt-1 block record-header-type text-xs uppercase leading-relaxed">{photo.credit}</span>
      {hint && <span className="mt-1 block font-body text-xs leading-snug text-record-muted">{hint}</span>}
    </div>
  );
}