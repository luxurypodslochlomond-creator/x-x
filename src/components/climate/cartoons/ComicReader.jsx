import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InkArrow } from '@/components/climate/cartoons/CartoonInkIcons';
import ComicPanel from '@/components/climate/cartoons/ComicPanel';
import ComicStoryOpening from '@/components/climate/cartoons/ComicStoryOpening';
import { comicStories } from '@/components/climate/cartoons/comicStories';

export default function ComicReader() {
  const location = useLocation();
  const navigate = useNavigate();
  const touch = useRef(null);
  const wanted = new URLSearchParams(location.search).get('strip');
  const active = Math.max(0, comicStories.findIndex(story => story.id === wanted));
  useEffect(() => {
    if (wanted && !location.hash && comicStories.some(story => story.id === wanted))
      navigate({ ...location, hash: '#cartoon-strip' }, { replace: true });
  }, [wanted, location, navigate]);
  const turn = (step) => {
    const next = (active + step + comicStories.length) % comicStories.length;
    const params = new URLSearchParams(location.search);
    params.set('strip', comicStories[next].id);
    navigate({ pathname: location.pathname, search: `?${params}`, hash: '#cartoon-strip' }, { replace: true });
  };
  return (
    <section className="comic-reader" id="cartoon-strip" aria-label="The record's own cartoons">
      <ComicStoryOpening active={active} onSelect={(index) => turn(index - active)} />
      <div className="comic-single-reader" tabIndex={0} role="region" aria-label="Cartoons: swipe or use the arrow buttons"
        onKeyDown={(event) => { if (['ArrowRight', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); } }}
        onTouchStart={(event) => { const p = event.touches[0]; touch.current = { x: p.clientX, y: p.clientY }; }}
        onTouchEnd={(event) => {
          if (!touch.current) return;
          const dx = event.changedTouches[0].clientX - touch.current.x;
          const dy = event.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1);
          touch.current = null;
        }}>
        <ComicPanel key={comicStories[active].id} story={comicStories[active]} index={active} />
      </div>
      <div className="comic-turner">
        <button type="button" onClick={() => turn(-1)} className="comic-previous" aria-label="Previous cartoon"><InkArrow size={22} dir="left" /></button>
        <span className="comic-position" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(comicStories.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => turn(1)} className="comic-next">{active === comicStories.length - 1 ? 'From the top' : 'Next cartoon'}<InkArrow size={22} /></button>
      </div>
      <p className="comic-art-credit record-meta">Written to be read by a child as easily as a grown-up. AI-generated illustrations.<br />Fiction, not workshop submissions or checked evidence.</p>
    </section>
  );
}