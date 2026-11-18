import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RecordDesktopSections from '@/components/climate/RecordDesktopSections';
import { RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';

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
      {/* ── THE PAINTING RUNS BEHIND THE MENU, THE MENU SITS ON PAPER ──────────────
          Brian, 18 November: "when it drops down you think we should see coolasfuck image
          background behind it or am I talking wee bit nonsense bro?" Not nonsense, and the
          answer is the record's own cover — the same plate that hangs at the door — running
          the width of the glass behind the sheet, with the menu itself printed on solid bone
          so every word stays sharp. The painting is in the gutters either side, where nothing
          is read; no sentence ever stands on it. */}
      <div className="relative min-h-0 overflow-hidden border-t-2 border-record-mark/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover" style={{ backgroundImage: `url(${RECORD_COVER_SCREEN})`, backgroundPosition: 'center 20%' }} />
        <div className="relative mx-auto max-h-[min(65vh,620px)] w-full max-w-[880px] overflow-y-auto overscroll-contain bg-record-bone px-6 pb-3 pt-2 shadow-[0_0_60px_-10px_rgba(20,18,16,0.55)] lg:px-8">
          <div className="mb-1 flex items-center justify-between gap-4">
            <p className="record-header-type text-lg text-record-mark">Explore the record</p>
            <button type="button" onClick={onClose} className="record-header-type min-h-11 px-2 text-xs text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">Close <span aria-hidden="true">×</span></button>
          </div>
          <RecordDesktopSections onNavigate={onClose} />
          <Link to="/ClimateGuide" onClick={onClose} className="record-header-type mt-2 flex min-h-11 items-center justify-between bg-record-signal px-3 text-xs text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">Every control, written out <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}