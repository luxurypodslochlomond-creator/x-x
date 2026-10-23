import React from 'react';

// The credit travels with the picture — never as a block underneath it.
// On the crawl it sits inside the same frame as the photograph: over a scrim, with the
// signal rule above it, reading as part of the picture. In the full-size viewer it
// keeps its own bar, where there is nothing to overlay.

export default function ClimatePhotoCredit({ photo, hint, variant = 'bar' }) {
  if (variant === 'overlay') {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-record-ink via-record-ink/75 to-transparent px-4 pb-3.5 pt-16 font-body text-record-paper">
        <span aria-hidden="true" className="mb-2 block h-[3px] w-9 bg-record-signal" />
        {photo.caption && <p className="text-[12px] leading-snug">{photo.caption}</p>}
        <p className="text-[10px] leading-snug text-record-paper/70">{photo.credit}</p>
        {hint && <p className="mt-1 text-[10px] leading-snug text-record-paper/55">{hint}</p>}
      </div>
    );
  }

  return (
    <div className="shrink-0 border-t-2 border-record-signal bg-record-bone px-4 py-2.5 font-body text-record-ink">
      {photo.caption && <p className="text-[11px] leading-snug">{photo.caption}</p>}
      <p className="text-[11px] leading-snug">{photo.credit}</p>
      {hint && <p className="mt-1 text-[10px] leading-snug text-record-muted">{hint}</p>}
    </div>
  );
}