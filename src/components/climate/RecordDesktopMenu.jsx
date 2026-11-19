import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RecordDesktopSections from '@/components/climate/RecordDesktopSections';
import { MarkClose } from '@/components/climate/RecordFootMarks';

export default function RecordDesktopMenu({ open, onClose }) {
  const region = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const outside = (event) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      if (!region.current?.contains(event.target) && !event.target.closest('button[aria-controls="record-desktop-menu"]')) onClose();
    };
    const escape = (event) => {
      if (event.key !== 'Escape' || !window.matchMedia('(min-width: 1024px)').matches) return;
      event.preventDefault();
      onClose();
      document.querySelector('button[aria-controls="record-desktop-menu"]')?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open, onClose]);
  return (
    <div ref={region} id="record-desktop-menu" role="region" aria-label="Explore the record" aria-hidden={!open} inert={open ? undefined : ''} className="record-explore-panel hidden bg-record-bone font-body text-record-ink transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none lg:grid" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
      {/* Plain paper, by his own word: the painting behind it was tried and he asked for the
          clean sheet back. Nothing sits between the reader and the words. */}
      <div className="min-h-0 overflow-hidden border-t-2 border-record-mark/70">
        <div className="mx-auto max-h-[min(65vh,620px)] max-w-[1100px] overflow-y-auto overscroll-contain bg-record-bone px-10 pb-3 pt-2">
          <div className="mb-1 flex items-center justify-between gap-4">
            <p className="record-header-type text-lg text-record-mark">Explore the record</p>
            {/* The same drawn close as the phone's sheet: a page with its corner turned
                down, not a word and a borrowed ✕. One gesture, both glasses. */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Put the sheet down"
              title="Put the sheet down"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
            >
              <span aria-hidden="true" className="block h-[19px] w-[19px] [&>svg]:h-full [&>svg]:w-full"><MarkClose size={19} /></span>
            </button>
          </div>
          <RecordDesktopSections onNavigate={onClose} />
          <Link to="/ClimateGuide" onClick={onClose} className="record-header-type mt-2 flex min-h-11 items-center justify-between bg-record-signal px-3 text-xs text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">Every control, written out <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}