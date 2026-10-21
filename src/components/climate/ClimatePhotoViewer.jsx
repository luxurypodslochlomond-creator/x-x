import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// One picture, whole. The credit is part of the picture and stays on it —
// a photograph on this record is never shown without the name of who made it.
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
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#141210]">
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-[#efe7d6]/15">
        <p className="text-[10px] font-mono text-[#e2602a] leading-snug pt-1">{photo.credit}</p>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-2"
        onTouchStart={(e) => setTouchFrom(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img src={photo.image_url} alt={photo.caption || ''} className="max-h-full max-w-full object-contain" />
      </div>

      {photo.caption && (
        <p className="px-4 pb-2 text-[11px] font-mono uppercase tracking-wider text-[#efe7d6] text-center">
          {photo.caption}
        </p>
      )}

      {photos.length > 1 && (
        <div className="flex items-center justify-between gap-3 px-4 pb-5">
          <button
            onClick={() => go(-1)}
            aria-label="Previous picture"
            className="w-14 h-12 flex items-center justify-center border-2 border-[#efe7d6]/30 text-[#efe7d6] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[9px] font-mono text-[#6b6258]">swipe</span>
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