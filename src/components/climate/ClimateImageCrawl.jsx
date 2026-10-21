import React from 'react';

// ── THE TOP CRAWL ──
// Janine's photographs, moving slowly past the record. She calls it the top scroll,
// or the top crawl — both mean this: pictures drifting across the top of the page.
// Credit is part of the picture and never leaves it.
//
// To add another picture: drop a new entry here. Nothing else needs changing.
const PHOTOGRAPHS = [
  {
    src: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/9c64d6bd4_IMG_2779.png',
    caption: 'Mangroves above · coral below',
    credit: 'Ocean Image Bank · Photographer Alex Mustard',
  },
  {
    src: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d3ff655be_IMG_2784.jpeg',
    caption: 'Sea lions · seagrass bed',
    credit: 'Ocean Image Bank',
  },
];

export default function ClimateImageCrawl() {
  // The set repeats once, so the crawl loops with no visible seam.
  const strip = [...PHOTOGRAPHS, ...PHOTOGRAPHS];

  return (
    <div className="relative bg-[#141210] border-b-2 border-[#141210] overflow-hidden">
      <style>{`
        @keyframes twcc-crawl { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .twcc-crawl-track { animation: twcc-crawl 72s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .twcc-crawl-track { animation: none; }
          .twcc-crawl-scroll { overflow-x: auto; }
        }
      `}</style>

      <div className="twcc-crawl-scroll overflow-hidden">
        <div className="twcc-crawl-track flex gap-2.5 py-2.5 px-2.5 w-max">
          {strip.map((photo, i) => (
            <figure key={`${photo.src}-${i}`} className="relative flex-shrink-0">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                decoding="async"
                className="h-[200px] sm:h-[264px] w-auto object-cover border border-[#efe7d6]/20"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-[#141210]/80 px-2 py-1">
                <span className="block text-[9px] font-mono uppercase tracking-wider text-[#efe7d6] leading-tight">
                  {photo.caption}
                </span>
                <span className="block text-[8px] font-mono text-[#e2602a] leading-tight">{photo.credit}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}