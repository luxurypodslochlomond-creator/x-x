import React, { useRef, useState } from 'react';
import useClimatePhotos from '@/components/climate/useClimatePhotos';
import ClimatePhotoSlide from '@/components/climate/ClimatePhotoSlide';
import ClimatePhotoControls from '@/components/climate/ClimatePhotoControls';
import ClimatePhotoViewer from '@/components/climate/ClimatePhotoViewer';

// THE TOP CRAWL — Janine's credited photographs, at the record's own full width.
// A desk swipes the rail one picture at a time. A phone gets a sheet of four at once
// (see record-depth.css), because four pictures side by side cost one short row instead
// of four screens of scrolling. Every picture keeps its credit in both layouts.
export default function ClimateImageCrawl() {
  const { photos, loading, error } = useClimatePhotos();
  const [index, setIndex] = useState(0);
  const [openAt, setOpenAt] = useState(null);
  const railRef = useRef(null);
  const go = step => {
    const rail = railRef.current;
    const next = (index + step + photos.length) % photos.length;
    rail.scrollTo({ left: next * rail.clientWidth, behavior: 'instant' });
    setIndex(next);
  };
  if (loading) return <div role="status" className="record-photo-loading climate-photo-slide-frame aspect-[3/2] max-h-[70vh] w-full bg-record-bone"><span className="sr-only">Loading photographs</span></div>;
  if (!photos.length) return error ? <p className="bg-record-bone p-4 text-sm text-record-muted">Connect to load the photographs.</p> : null;
  return (
    <section dir="ltr" aria-label="Photographs from Ocean Image Bank" className="record-photo-crawl record-media-mount relative bg-record-paper">
      <div ref={railRef} onScroll={event => setIndex(Math.max(0, Math.min(photos.length - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))))} className="climate-photo-rail flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
        {photos.map((photo, i) => <ClimatePhotoSlide key={photo.id} photo={photo} onOpen={() => setOpenAt(i)} />)}
      </div>
      <ClimatePhotoControls variant="overlay" index={index} total={photos.length} onPrevious={() => go(-1)} onNext={() => go(1)} />
      {/* On a phone the pictures stand as a sheet rather than one to a screen: four of
          them at once, so the record's own photographs no longer cost a page of scrolling
          before the entries begin. Tapping any of them, or this line, opens them all. */}
      <button
        type="button"
        onClick={() => setOpenAt(0)}
        className="record-photo-sheet-more w-full items-center justify-between gap-2 border-t-2 border-record-mark bg-record-signal px-3 py-3 text-left"
      >
        <span className="record-header-type text-xs text-record-ink">All {photos.length} photographs</span>
        <span className="record-header-type text-xs text-record-mark">Open →</span>
      </button>
      {openAt !== null && <ClimatePhotoViewer photos={photos} startIndex={openAt} onClose={() => setOpenAt(null)} />}
    </section>
  );
}