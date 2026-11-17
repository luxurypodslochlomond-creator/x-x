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
    <div ref={region} id="record-desktop-menu" role="region" aria-label="Explore the record" aria-hidden={!open} inert={open ? undefined : ''} className="record-explore-panel hidden font-body text-record-ink transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none lg:grid" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
      {/* ── THE DRAWER IS PRINTED ON THE PAINTING, NOT ON A BLANK SHEET ────────────
          It was a flat bone panel, which is exactly what a reader described: a filing
          cabinet that opened inside a painting. The record's own cover now sits under it —
          the same artwork the front page is printed on — held back by a warm veil so the
          words stay plainly readable and the ground still reads as ground. The plates below
          are thin, so the colour comes up between them the way it comes up between the
          record's own pages: never wallpaper, always underneath.
          The red hairline over it is the mark the whole record is ruled with, and the guide
          at its foot is the one signal-yellow band in the drawer. */}
      <div className="relative min-h-0 overflow-hidden border-t-2 border-record-mark/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${RECORD_COVER_SCREEN})`, backgroundPosition: 'center 18%' }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-record-bone/60" />
        <div className="relative mx-auto max-h-[min(65vh,620px)] max-w-[1100px] overflow-y-auto overscroll-contain px-10 pb-4 pt-4">
          <div className="record-explore-heading mb-4 flex items-center justify-between gap-4">
            <p className="border-l-4 border-record-red pl-3 font-display text-2xl font-bold uppercase tracking-tight text-record-ink">Explore the record</p>
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