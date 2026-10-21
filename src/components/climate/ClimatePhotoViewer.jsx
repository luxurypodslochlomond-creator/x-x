import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// One picture, whole, as big as the screen allows. The credit is part of the
// picture and stays with it — a photograph on this record is never shown without
// the name of who made it, and never in type too small to read.
// No counts, no shares, no "next up": you look, you close, you carry on.
export default function ClimatePhotoViewer({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [touchFrom, setTouchFrom] = useState(null);
  const photo = photos[index];

  const go = (step) => setIndex((i) => (i + step + photos.length) % photos.length);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const onTouchEnd = (e) => {
    if (touchFrom === null) return;
    const moved = e.changedTouches[0].clientX - touchFrom;
    if (Math.abs(moved) > 40) go(moved < 0 ? 1 : -1);
    setTouchFrom(null);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#0d0c0a]">
      <div className="flex justify-end px-3 py-3">
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-11 h-11 flex items-center justify-center border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-2 min-h-0"
        onTouchStart={(e) => setTouchFrom(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={photo.image_url}
          alt={photo.caption || 'Photograph on the record'}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* The name of the person who made the picture — on its own, at the foot. */}
      <div className="bg-[#efe7d6] border-t-4 border-[#e2602a] px-4 py-3.5">
        {photo.caption && (
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5a5246] leading-snug">
            {photo.caption}
          </p>
        )}
        <p className="text-[13px] font-mono text-[#141210] leading-snug mt-1">{photo.credit}</p>
      </div>

      {photos.length > 1 && (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous picture"
            className="w-14 h-12 flex items-center justify-center border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#6b6258]">swipe</span>
          <button
            onClick={() => go(1)}
            aria-label="Next picture"
            className="w-14 h-12 flex items-center justify-center border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}