import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ComicPanel from '@/components/climate/cartoons/ComicPanel';
import { comicStories } from '@/components/climate/cartoons/comicStories';

export default function ComicReader() {
  const rail = useRef(null);
  const [active, setActive] = useState(0);

  // A chip on the record's homepage names its cartoon in the address, so tapping
  // "Walking" opens the walking strip rather than the top of the room.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('strip');
    if (!wanted) return;
    const index = comicStories.findIndex(story => story.id === wanted);
    if (index < 0) return;
    setActive(index);
    const settle = requestAnimationFrame(() => {
      const width = rail.current?.clientWidth || 0;
      rail.current?.scrollTo({ left: index * width, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(settle);
  }, []);
  const turn = (step) => {
    const next = (active + step + comicStories.length) % comicStories.length;
    rail.current?.scrollTo({ left: next * rail.current.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <section className="comic-reader" aria-label="The record's own cartoons">
      {/* The room's title used to be here. It lives in ComicMasthead now, at the top of the
          page, so the drawings can come before the strip instead of after it. */}
      <div ref={rail} className="comic-rail" tabIndex={0} role="region" aria-label="Swipe for the next cartoon, or use the arrow buttons" onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); turn(e.key === 'ArrowRight' ? 1 : -1); }
      }} onScroll={(e) => setActive(Math.max(0, Math.min(comicStories.length - 1, Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))))}>
        {comicStories.map((story, index) => <ComicPanel key={story.id} story={story} index={index} />)}
      </div>
      <div className="comic-turner">
        <button type="button" onClick={() => turn(-1)} className="comic-previous" aria-label="Previous cartoon"><ArrowLeft size={20} /></button>
        <span className="comic-position" aria-live="polite" aria-atomic="true">0{active + 1} / 0{comicStories.length}</span>
        <button type="button" onClick={() => turn(1)} className="comic-next">{active === comicStories.length - 1 ? 'From the top' : 'Next cartoon'}<ArrowRight size={20} /></button>
      </div>
      <p className="comic-art-credit record-meta">Written to be read by a child as easily as a grown-up. AI-generated illustrations.<br />Fiction, not workshop submissions or checked evidence.</p>
    </section>
  );
}