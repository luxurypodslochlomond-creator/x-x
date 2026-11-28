import { useEffect, useState } from 'react';
import { SHOW_DRAWING } from '@/components/climate/cartoons/goToDrawing';

function sectionFor(hash) {
  if (/^#(?:cartoon-goals|goal-)/.test(hash)) return 'goals';
  if (/^#(?:cartoon-your-turn|cartoon-drawing-desk|room-new-title)/.test(hash)) return 'send';
  if (/^#(?:wall-(?:about|purpose|credits)|press-book|press-world|cartoon-why|cartoon-humour|comic-catalogue|comic-session|comic-anthology|cartoon-programme)/.test(hash)) return 'about';
  return 'drawings';
}

export default function useWallSections() {
  const [destination, setDestination] = useState(() => ({ hash: window.location.hash }));
  const navigate = (hash) => {
    if (window.location.hash === hash) setDestination({ hash });
    else window.location.hash = hash;
  };
  useEffect(() => {
    const changed = () => setDestination({ hash: window.location.hash });
    const drawing = (event) => { if (event.detail?.id) navigate(`#drawing-${event.detail.id}`); };
    window.addEventListener('hashchange', changed);
    window.addEventListener(SHOW_DRAWING, drawing);
    return () => { window.removeEventListener('hashchange', changed); window.removeEventListener(SHOW_DRAWING, drawing); };
  }, []);
  useEffect(() => {
    const header = document.querySelector('.record-cartoon-field .record-book > header');
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty('--wall-header-offset', `${header.getBoundingClientRect().height}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--wall-header-offset'); };
  }, []);
  useEffect(() => {
    if (!destination.hash) return;
    const frame = requestAnimationFrame(() => {
      const node = document.getElementById(destination.hash.slice(1));
      if (!node) return;
      for (let parent = node.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
      }
      if (node.tagName === 'DETAILS') node.open = true;
      node.scrollIntoView({ block: 'start', behavior: 'instant' });
      node.setAttribute('tabindex', '-1');
      node.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [destination]);
  return { active: sectionFor(destination.hash), navigate };
}