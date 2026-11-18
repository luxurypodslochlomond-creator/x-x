import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// A bookmark in this tab's memory, not an analytics event or a stored browsing history.
const bookmarks = new Map();
export default function useRecordScroll(rootRef) {
  const location = useLocation();
  const navigation = useNavigationType();
  const previousPath = useRef(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const saved = bookmarks.get(location.key);
    const samePage = previousPath.current === location.pathname;
    previousPath.current = location.pathname;
    let restoring = navigation === 'POP' && Boolean(saved);
    let active = true, returned = null, frame = 0, observer;
    const oldMode = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const remember = () => { if (!restoring) bookmarks.set(location.key, { y: window.scrollY }); };
    const stop = () => {
      restoring = false;
      observer?.disconnect();
      returned?.removeAttribute('data-record-returned');
    };
    const capture = (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link || !root.contains(link) || link.origin !== window.location.origin) return;
      const href = link.getAttribute('href');
      const siblings = [...root.querySelectorAll('a[href]')].filter(a => a.getAttribute('href') === href);
      bookmarks.set(location.key, { y: window.scrollY, href, index: siblings.indexOf(link), top: link.getBoundingClientRect().top });
    };
    const restore = () => {
      if (!active || !restoring) return;
      const links = saved.href ? [...root.querySelectorAll('a[href]')].filter(a => a.getAttribute('href') === saved.href) : [];
      const link = links[saved.index || 0];
      if (saved.href && !link) return; // The entry's list is still loading.
      const y = link ? window.scrollY + link.getBoundingClientRect().top - saved.top : saved.y;
      if (document.documentElement.scrollHeight - window.innerHeight < y - 1) return;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      if (link) { returned = link; link.setAttribute('data-record-returned', ''); }
    };
    if (restoring) {
      observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(restore); });
      observer.observe(root);
      restore();
      document.fonts?.ready.then(restore);
    } else if (location.hash) {
      // Keep old bookmarks on their section while the live evidence above it arrives.
      // The first reader interaction disconnects this observer through stop().
      const jump = () => {
        if (active) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start', behavior: 'instant' });
      };
      observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(jump); });
      observer.observe(root);
      frame = requestAnimationFrame(jump);
    } else if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' });
    window.addEventListener('scroll', remember, { passive: true });
    root.addEventListener('click', capture, true);
    ['pointerdown', 'wheel', 'keydown'].forEach(event => window.addEventListener(event, stop, { passive: true }));
    return () => {
      active = false; observer?.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', remember); root.removeEventListener('click', capture, true);
      ['pointerdown', 'wheel', 'keydown'].forEach(event => window.removeEventListener(event, stop));
      window.history.scrollRestoration = oldMode;
    };
  }, [location.key, location.pathname, location.hash, navigation, rootRef]);
}