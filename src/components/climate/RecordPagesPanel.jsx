import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import RecordIndexPlate from '@/components/climate/RecordIndexPlate';

// ── THE INDEX, ON ONE SCREEN ───────────────────────────────────────────────────
// This sheet was a page of drawn doors that ran past the top and bottom of a phone: a
// reader who opened the index to find their way had to scroll the index itself, which is
// the one thing an index may never ask. It is now a printed index — plain names, in
// columns, small enough that every door of the record is in front of the eye at once on
// any handset, and legible rather than squeezed. The drawings keep their job on the
// written guide, where there is a page to give them.
//
// The sheet is a fixed column, not a long page: rule, name, index, close. The body may
// scroll only if a device is smaller than anything a phone has been since the index was
// written, so nothing is ever clipped and nothing has to be guessed at.
export default function RecordPagesPanel({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <dialog ref={dialogRef} id="record-contents" aria-labelledby="record-contents-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-record-paper p-0 font-body text-record-ink backdrop:bg-record-paper">
      <div aria-hidden="true" className="h-[3px] w-full shrink-0 bg-record-mark" />
      <div className="mx-auto flex min-h-0 w-full max-w-[760px] flex-1 flex-col px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pt-6">
        {/* ── THE SHEET HAS A MASTHEAD, LIKE EVERY OTHER PAGE OF THE RECORD ──────
            "Index" was set the same size as a section heading with a line of small type
            under it, so the sheet opened without ever saying it had opened. It now opens
            the way a printed contents page does: a word above, the title at full size,
            and a rule drawn under it — a plate, not a panel. */}
        <div className="mb-3 flex shrink-0 items-start justify-between gap-4 border-b border-record-ink pb-2.5">
          <div>
            <p className="font-mono text-[8.5px] uppercase leading-none tracking-[0.3em] text-record-mark">Contents</p>
            <h1 id="record-contents-title" className="mt-1 font-display text-[34px] leading-[0.85] tracking-[-0.015em] sm:text-[42px]">Index</h1>
          </div>
          <button type="button" autoFocus onClick={onClose} aria-label="Close the index" className="rec-art-door">
            <span className="rec-art-drawing" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7.1 6.4c5.8 5.7 11.7 12.8 18.1 19M25.4 6.9C19.2 13 12.6 20 6.8 25.3" />
              </svg>
            </span>
            <span className="rec-art-caption">Close</span>
          </button>
        </div>

        <p className="mb-3 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-record-muted">
          Every way through the record · nothing hidden
        </p>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <RecordIndexPlate onNavigate={onClose} />
        </div>

        <Link
          to="/ClimateGuide"
          onClick={onClose}
          className="group mt-3 flex shrink-0 items-center justify-between gap-3 border-t border-record-ink pt-2.5"
        >
          <span className="text-[13px] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
            The written guide, line by line
          </span>
          <span aria-hidden="true" className="font-mono text-[13px] text-record-mark transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </dialog>, document.body
  );
}