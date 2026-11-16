import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BAR_CONTROL = 'flex min-h-11 min-w-11 items-center justify-center border border-record-ink/30 px-3 text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal';
const OVERLAY_CONTROL = 'flex min-h-11 min-w-11 items-center justify-center text-record-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal active:bg-record-signal active:text-record-ink';

// Over the photograph: the same controls, drawn on ink so they stay legible on any
// picture, in the top-right corner — clear of the credit, and in exactly the same place
// on a phone, a laptop and a wall screen.
export default function ClimatePhotoControls({ index, total, onPrevious, onNext, variant = 'bar' }) {
  if (total < 2) return null;

  if (variant === 'overlay') {
    return (
      <nav aria-label="Photograph navigation" className="absolute right-3 top-3 z-20 flex items-center gap-1 border border-record-paper/25 bg-record-ink p-1">
        <button type="button" onClick={onPrevious} aria-label="Previous photograph" className={OVERLAY_CONTROL}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span role="status" aria-live="polite" className="px-1 text-[11px] font-body tabular-nums text-record-paper">{index + 1} / {total}</span>
        <button type="button" onClick={onNext} aria-label="Next photograph" className={OVERLAY_CONTROL}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    );
  }

  return (
    <nav aria-label="Photograph navigation" className="flex shrink-0 items-center justify-between gap-4 bg-record-bone px-4 py-2 text-record-ink">
      <button type="button" onClick={onPrevious} aria-label="Previous photograph" className={BAR_CONTROL}><ChevronLeft className="h-5 w-5" /></button>
      <span role="status" aria-live="polite" className="text-xs font-body tabular-nums">{index + 1} of {total}</span>
      <button type="button" onClick={onNext} aria-label="Next photograph" className={BAR_CONTROL}><ChevronRight className="h-5 w-5" /></button>
    </nav>
  );
}