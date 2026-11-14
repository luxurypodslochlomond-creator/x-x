import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ComicPanel from '@/components/climate/cartoons/ComicPanel';
import { comicStories } from '@/components/climate/cartoons/comicStories';

export default function ComicReader() {
  const rail = useRef(null);
  const [active, setActive] = useState(0);
  const turn = (step) => {
    const next = (active + step + comicStories.length) % comicStories.length;
    rail.current?.scrollTo({ left: next * rail.current.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <section className="comic-reader" aria-label="The Big Picture cartoons">
      <header className="comic-masthead">
        <p className="comic-eyebrow record-meta">A little mischief. A bigger picture.</p>
        <h1 className="comic-title">The Big<br /><span>Picture</span><span className="comic-title-stop" aria-hidden="true">!</span></h1>
        <p className="comic-tagline record-meta">Cartoons for a changing world</p>
      </header>
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
      <p className="comic-art-credit record-meta">New stories for this room · AI-generated illustrations.<br />Fiction, not workshop submissions or checked evidence.</p>
    </section>
  );
}