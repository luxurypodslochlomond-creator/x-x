import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ClimatePhotoViewer from './ClimatePhotoViewer';

// ── THE TOP CRAWL ──
// Janine's photographs. Her top scroll: pictures drifting past, credited.
// It drifts on its own, slowly, the way she asked — and steps aside the moment
// a finger touches it, because a person looking is more important than the loop.
// Nothing here counts you, ranks you, or keeps you: you can move it yourself and
// open any picture whole.
export default function ClimateImageCrawl() {
  const [photos, setPhotos] = useState([]);
  const [openAt, setOpenAt] = useState(null);
  const railRef = useRef(null);
  const holdUntil = useRef(0);

  useEffect(() => {
    let alive = true;
    base44.entities.ClimatePhoto
      .list({ sort: 'created_date', limit: 40 })
      .then((page) => { if (alive) setPhotos(page.items ?? page); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (photos.length === 0 || openAt !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const step = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail || Date.now() < holdUntil.current) return;
      const second = rail.children[photos.length]; // the repeat, so the drift never runs out
      if (!second) return;
      const oneLength = second.offsetLeft;
      if (rail.scrollLeft >= oneLength) rail.scrollLeft -= oneLength;
      else rail.scrollLeft += 1;
    }, 40);
    return () => window.clearInterval(step);
  }, [photos.length, openAt]);

  if (photos.length === 0) return null;

  const strip = [...photos, ...photos];
  const hold = () => { holdUntil.current = Date.now() + 4000; };

  return (
    <div className="relative bg-[#141210] border-b-2 border-[#141210]">
      <style>{`
        .twcc-rail { -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .twcc-rail::-webkit-scrollbar { display: none; }
      `}</style>

      <div
        ref={railRef}
        onPointerDown={hold}
        onTouchMove={hold}
        onWheel={hold}
        className="twcc-rail flex gap-2.5 py-2.5 px-2.5 overflow-x-auto"
      >
        {strip.map((photo, i) => (
          <button
            key={`${photo.id}-${i}`}
            onClick={() => setOpenAt(i % photos.length)}
            className="relative flex-shrink-0 w-[78vw] sm:w-[520px] h-[210px] sm:h-[268px] text-left"
          >
            <img
              src={photo.image_url}
              alt={photo.caption || ''}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover border border-[#efe7d6]/20"
            />
            <span
              className="absolute bottom-0 left-0 right-0 px-2 py-1.5 block"
              style={{ background: 'linear-gradient(0deg, rgba(20,18,16,.92), rgba(20,18,16,0))' }}
            >
              {photo.caption && (
                <span className="block text-[9px] font-mono uppercase tracking-wider text-[#efe7d6] leading-tight">
                  {photo.caption}
                </span>
              )}
              <span className="block text-[8px] font-mono text-[#e2602a] leading-tight">{photo.credit}</span>
            </span>
          </button>
        ))}
      </div>

      {openAt !== null && (
        <ClimatePhotoViewer photos={photos} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </div>
  );
}