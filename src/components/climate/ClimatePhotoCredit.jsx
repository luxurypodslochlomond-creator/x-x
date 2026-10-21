import React from 'react';

export default function ClimatePhotoCredit({ photo }) {
  return (
    <div className="shrink-0 border-t-2 border-record-signal bg-record-bone px-4 py-3 font-body text-record-ink">
      {photo.caption && <p className="mb-1 text-sm leading-snug">{photo.caption}</p>}
      <p className="text-xs leading-relaxed">{photo.credit}</p>
    </div>
  );
}