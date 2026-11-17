import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RecordDesktopSections from '@/components/climate/RecordDesktopSections';

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
    <div ref={region} id="record-desktop-menu" role="region" aria-label="Explore the record" aria-hidden={!open} inert={open ? undefined : ''} className="record-explore-panel hidden font-body text-record-ink transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none lg:grid" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
      {/* The drawer is bone, not the header's paper: a shade deeper than the page above
          it, so opening it reads as pulling a sheet out of the book rather than as the page
          going pale — and it runs the full width of the glass, so it is a drawer and not a
          block floating in the middle of one. The red hairline over it is the same mark the
          whole record is ruled with. */}
      <div className="min-h-0 overflow-hidden border-t-2 border-record-mark/70 bg-record-bone">
        <div className="mx-auto max-h-[min(65vh,620px)] max-w-[1100px] overflow-y-auto overscroll-contain px-10 pb-4 pt-4">
          <div className="record-explore-heading mb-4 flex items-center justify-between gap-4">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-record-ink">Explore the record</p>
            <button type="button" onClick={onClose} className="min-h-11 px-2 text-sm font-bold hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">Close <span aria-hidden="true">×</span></button>
          </div>
          <RecordDesktopSections onNavigate={onClose} />
          {/* The guide is the drawer's own foot: a signal band rather than a line of grey
              text, because it is the one door here that leads to every other door. */}
          <Link to="/ClimateGuide" onClick={onClose} className="record-explore-guide mt-4 flex min-h-11 items-center justify-between bg-record-signal px-3 font-display text-sm font-bold uppercase tracking-tight text-record-ink hover:bg-record-mark hover:text-record-paper">Every control, written out <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}