import React from 'react';

export default function ClimatePhotoCredit({ photo, hint }) {
  return (
    <div className="shrink-0 border-t-2 border-record-signal bg-record-bone px-4 py-2.5 font-body text-record-ink">
      {photo.caption && <p className="text-[11px] leading-snug">{photo.caption}</p>}
      <p className="text-[11px] leading-snug">{photo.credit}</p>
      {hint && <p className="mt-1 text-[10px] leading-snug text-record-muted">{hint}</p>}
    </div>
  );
}