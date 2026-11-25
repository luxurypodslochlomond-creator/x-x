import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { prefetchPath } from '@/lib/routePrefetch';

// One passive listener on the whole document: the instant a finger lands on
// (or a cursor rests on) an internal link, that page's code starts downloading.
// The tap then lands on code that is already there — the app-native feel.
export default function RoutePrefetcher() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Fetch only the chosen page while its lazy layout is downloading, rather
    // than waiting for the layout to arrive before discovering the page import.
    prefetchPath(pathname);
  }, [pathname]);

  useEffect(() => {
    let last = '';

    const onIntent = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === last) return;

      last = url.pathname;
      prefetchPath(url.pathname);
    };

    const options = { passive: true };
    document.addEventListener('touchstart', onIntent, options);
    document.addEventListener('pointerdown', onIntent, options);
    document.addEventListener('mouseover', onIntent, options);
    document.addEventListener('focusin', onIntent);

    return () => {
      document.removeEventListener('touchstart', onIntent);
      document.removeEventListener('pointerdown', onIntent);
      document.removeEventListener('mouseover', onIntent);
      document.removeEventListener('focusin', onIntent);
    };
  }, []);

  return null;
}