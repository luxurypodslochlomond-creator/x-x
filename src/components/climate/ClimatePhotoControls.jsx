import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClimatePhotoControls({ index, total, onPrevious, onNext }) {
  if (total < 2) return null;
  const control = 'flex min-h-11 min-w-11 items-center justify-center border border-record-ink/30 px-3 text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal';
  return (
    <nav aria-label="Photograph navigation" className="flex shrink-0 items-center justify-between gap-4 bg-record-bone px-4 py-2 text-record-ink">
      <button type="button" onClick={onPrevious} aria-label="Previous photograph" className={control}><ChevronLeft className="h-5 w-5" /></button>
      <span role="status" aria-live="polite" className="text-xs font-body tabular-nums">{index + 1} of {total}</span>
      <button type="button" onClick={onNext} aria-label="Next photograph" className={control}><ChevronRight className="h-5 w-5" /></button>
    </nav>
  );
}