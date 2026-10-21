import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── THE TOP CRAWL ──
// Janine's photographs, drifting slowly across the top of the record. She calls it
// the top scroll, or the top crawl — both mean this: pictures moving past, credited.
// Each picture is stored at a web size (see the Top crawl page), so it opens on a
// phone as quickly as on a desktop. Credit is part of the picture.
export default function ClimateImageCrawl() {
  const [photos, setPhotos] = useState([]);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    let alive = true;
    base44.entities.ClimatePhoto
      .list({ sort: 'created_date', limit: 40 })
      .then((page) => { if (alive) setPhotos(page.items ?? page); });
    return () => { alive = false; };
  }, []);

  if (photos.length === 0) return null;

  // Repeat the pictures until the band is wider than any screen, and keep the
  // repeat count even so it can loop at exactly half its length with no seam.
  let repeats = Math.max(2, Math.ceil(8 / photos.length));
  if (repeats % 2 !== 0) repeats += 1;
  const strip = Array.from({ length: repeats }, () => photos).flat();
  const duration = Math.max(36, strip.length * 6);

  return (
    <div className="relative bg-[#141210] border-b-2 border-[#141210] overflow-hidden">
      <style>{`
        @keyframes twcc-crawl { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .twcc-crawl-track { animation: twcc-crawl ${duration}s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .twcc-crawl-track { animation: none; }
          .twcc-crawl-scroll { overflow-x: auto; }
        }
      `}</style>

      <div className="twcc-crawl-scroll overflow-hidden">
        <div
          className="twcc-crawl-track flex gap-2.5 py-2.5 px-2.5 w-max"
          style={{ animationPlayState: held ? 'paused' : 'running' }}
          onPointerDown={() => setHeld(true)}
          onPointerUp={() => setHeld(false)}
          onPointerLeave={() => setHeld(false)}
        >
          {strip.map((photo, i) => (
            <figure
              key={`${photo.id}-${i}`}
              className="relative flex-shrink-0 w-[78vw] sm:w-[520px] h-[210px] sm:h-[268px]"
            >
              <img
                src={photo.image_url}
                alt={photo.caption || ''}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover border border-[#efe7d6]/20"
              />
              <figcaption
                className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
                style={{ background: 'linear-gradient(0deg, rgba(20,18,16,.92), rgba(20,18,16,0))' }}
              >
                {photo.caption && (
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#efe7d6] leading-tight">
                    {photo.caption}
                  </span>
                )}
                <span className="block text-[8px] font-mono text-[#e2602a] leading-tight">{photo.credit}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}