import React, { useRef, useState } from 'react';
import useClimatePhotos from '@/components/climate/useClimatePhotos';
import ClimatePhotoSlide from '@/components/climate/ClimatePhotoSlide';
import ClimatePhotoControls from '@/components/climate/ClimatePhotoControls';
import ClimatePhotoViewer from '@/components/climate/ClimatePhotoViewer';

// THE TOP CRAWL — Janine's credited photographs, at the record's own full width.
// Each picture fills its whole frame, its credit sits on the picture, and the controls
// rest on the corner. Swipe or scroll sideways for the next one; the arrows do the same
// job with a mouse. One layout, on every screen.
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
    <section dir="ltr" aria-label="Photographs from Ocean Image Bank" className="record-photo-crawl relative border-b-2 border-record-ink bg-record-bone">
      <div ref={railRef} onScroll={event => setIndex(Math.max(0, Math.min(photos.length - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))))} className="climate-photo-rail flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
        {photos.map((photo, i) => <ClimatePhotoSlide key={photo.id} photo={photo} onOpen={() => setOpenAt(i)} />)}
      </div>
      <ClimatePhotoControls variant="overlay" index={index} total={photos.length} onPrevious={() => go(-1)} onNext={() => go(1)} />
      {openAt !== null && <ClimatePhotoViewer photos={photos} startIndex={openAt} onClose={() => setOpenAt(null)} />}
    </section>
  );
}