import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ClimatePhotoViewer from './ClimatePhotoViewer';

// ── THE TOP CRAWL ──
// Janine's photographs. Her top scroll: pictures drifting past, credited.
//
// A photograph is shown whole — never cut off at the edges, and never written
// over: the caption and the photographer's name sit underneath it, on the ink,
// where a person can actually read them. It drifts on its own, slowly, and steps
// aside the moment a finger touches it, because a person looking is more
// important than the loop. Nothing here counts you, ranks you, or keeps you.
export default function ClimateImageCrawl() {
  const [photos, setPhotos] = useState([]);
  const [shapes, setShapes] = useState({});
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

  // Each picture keeps its own shape, so the frame is as big as the photograph
  // allows and nothing is cropped to fit a template.
  const noteShape = (id, e) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    setShapes((s) => (s[id] ? s : { ...s, [id]: `${img.naturalWidth} / ${img.naturalHeight}` }));
  };

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
        className="twcc-rail flex gap-3 py-3 px-3 overflow-x-auto items-start"
      >
        {strip.map((photo, i) => (
          <button
            key={`${photo.id}-${i}`}
            onClick={() => setOpenAt(i % photos.length)}
            className="flex-shrink-0 w-[calc(100vw-1.5rem)] max-w-[560px] sm:w-[520px] text-left"
          >
            <span
              className="block w-full bg-[#0d0c0a] border border-[#efe7d6]/25 overflow-hidden"
              style={{ aspectRatio: shapes[photo.id] || '3 / 2', maxHeight: '68vh' }}
            >
              <img
                src={photo.image_url}
                alt={photo.caption || 'Photograph on the record'}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={(e) => noteShape(photo.id, e)}
                className="w-full h-full object-contain"
              />
            </span>
            <span className="block pt-2">
              {photo.caption && (
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#efe7d6] leading-snug">
                  {photo.caption}
                </span>
              )}
              <span className="block text-[11px] font-mono text-[#e2602a] leading-snug">{photo.credit}</span>
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