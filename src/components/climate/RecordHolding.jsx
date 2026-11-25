import React from 'react';
import RecordHoldingLead from '@/components/climate/RecordHoldingLead';
import RecordHoldingItem from '@/components/climate/RecordHoldingItem';

// ── A WALL OF PICTURES, NOT THREE MATCHING BOXES ──────────────────────────────────
// Brian, 25 November: "images could be some big and some small different shapes make
// interesting as fuck… desktop images have lot of space between some of them."
//
// He was describing two faults that came from one rule. Every plate was the same 16/10
// block, so the band read as three boxes rather than as a wall, and the column beside the
// lead was shorter than it, which left a hole of empty paper under it on a desk — space
// doing the talking where a picture should be.
//
// So the shapes differ now and the gaps are tight, because a wall is held together by its
// joints. One drawing big on the left; two small ones stacked to its height on the right;
// one wide plate across the foot. Nothing is cropped to a lie — each picture keeps its
// own frame, only the frame's proportions change — and every plate still opens the entry it
// belongs to, because a picture that goes nowhere is decoration.
//
// The ratios are chosen so the right column adds up to the lead's height at a desk rather
// than leaving paper under it: 4/3 beside two 21/9s, which is what stops the hole.
export default function RecordHolding({ items = [], loading = false }) {
  if (loading) {
    return (
      <div role="status" className="grid gap-3">
        <span className="sr-only">Loading entries</span>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="animate-pulse bg-record-ink/10" style={{ aspectRatio: '4/3' }} />
          <div className="flex flex-col gap-3">
            <div className="animate-pulse bg-record-ink/10" style={{ aspectRatio: '21/9' }} />
            <div className="animate-pulse bg-record-ink/10" style={{ aspectRatio: '21/9' }} />
          </div>
        </div>
        <div className="animate-pulse bg-record-ink/10" style={{ aspectRatio: '16/5' }} />
      </div>
    );
  }

  const [lead, ...rest] = items;
  if (!lead) return null;
  const [first, second, wide] = rest;

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <RecordHoldingLead item={lead} ratio="4/3" />
        {(first || second) && (
          <div className="flex flex-col gap-3">
            {first && <RecordHoldingItem item={first} ratio="21/9" plain />}
            {second && <RecordHoldingItem item={second} ratio="21/9" plain />}
          </div>
        )}
      </div>
      {wide && <RecordHoldingItem item={wide} ratio="16/5" plain />}
    </div>
  );
}