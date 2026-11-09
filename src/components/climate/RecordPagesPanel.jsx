import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import RecordPageIndex from '@/components/climate/RecordPageIndex';
import RecordNavDoor from '@/components/climate/RecordNavDoor';

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
      className="climate-record fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto border-0 bg-record-paper p-0 font-body text-record-ink backdrop:bg-record-paper">
      <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
      <div className="mx-auto max-w-[720px] px-5 pb-10 pt-5 sm:px-8">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h1 id="record-contents-title" className="font-display text-[28px] leading-tight">Contents</h1>
          <button type="button" autoFocus onClick={onClose} aria-label="Close contents" className="rec-art-door">
            <span className="rec-art-drawing" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7.1 6.4c5.8 5.7 11.7 12.8 18.1 19M25.4 6.9C19.2 13 12.6 20 6.8 25.3" />
              </svg>
            </span>
            <span className="rec-art-caption">Close</span>
          </button>
        </div>
        <RecordPageIndex showHeading={false} showKeeper={false} onNavigate={onClose} />
        <RecordNavDoor to="/ClimateGuide" label="Written guide" size={38} onClick={onClose} />
      </div>
    </dialog>, document.body
  );
}