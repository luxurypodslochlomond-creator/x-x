import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';

// ── TOGETHER WE CHANGE CLIMATE — her own front door ──
// Janine's record stands alone: her masthead, her icon, her share card, her install name.
// No shop chrome beside it. Nothing of UF51's in the room.
// x = x.

const TITLE = 'Together we can change the course of climate change — Record of the Time';
const DESCRIPTION = 'A public record of climate emergencies and the positive actions that work — shared openly, internationally. Every language on Earth.';

const NAV = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { label: 'Founder', page: 'ClimateFounder' },
  { label: 'Terms', page: 'ClimateTerms' },
  { label: 'Privacy', page: 'ClimatePrivacy' },
];

export default function ClimateLayout({ children, currentPage }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Her identity, not UF51's. Runs once per climate page.
  useEffect(() => {
    document.title = TITLE;

    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const card = `${window.location.origin}/api/functions/serveClimateOGImage`;
    setMeta('name', 'description', DESCRIPTION);
    setMeta('property', 'og:title', TITLE);
    setMeta('property', 'og:description', DESCRIPTION);
    setMeta('property', 'og:image', card);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', TITLE);
    setMeta('name', 'twitter:description', DESCRIPTION);
    setMeta('name', 'twitter:image', card);

    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/svg+xml';
      document.head.appendChild(icon);
    }
    icon.href = '/api/functions/serveFavicon?type=climate';

    let manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.rel = 'manifest';
      document.head.appendChild(manifest);
    }
    manifest.href = `/api/functions/serveManifest?brand=climate&v=${Date.now()}`;
  }, [location.pathname]);

  // Warm the nav once the page has settled. On a phone a tap gives a prefetch
  // almost no head start (hover only helps a mouse), so the next pages are
  // fetched before the finger arrives. The map is left out: it pulls a mapping
  // library, and should only load when a reader actually asks for it.
  useEffect(() => {
    if (navigator.connection?.saveData) return;
    const timer = setTimeout(() => {
      ['TogetherChangeClimate', 'ClimateImpact', 'ClimateFounder', 'ClimateTerms', 'ClimatePrivacy']
        .forEach(prefetchPath);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (page) => currentPage === page;

  return (
    <div className="min-h-screen bg-[#f4efe4]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <header className="sticky top-0 z-50 bg-[#141210] border-b-2 border-[#e2602a]">
        <div className="max-w-[1100px] mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <Link to={createPageUrl('TogetherChangeClimate')} className="flex items-center gap-2 min-w-0 active:opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
            <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.16em] text-[#efe7d6] leading-none">
              Record of the Time
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-3.5 flex-shrink-0" aria-label="Platform">
            {NAV.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-[11px] font-black uppercase tracking-wider transition-colors ${isActive(item.page) ? 'text-[#e2602a]' : 'text-[#efe7d6]/60 hover:text-[#efe7d6]'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile — same links, thumb-scrollable */}
        <nav
          className="sm:hidden flex gap-4 px-4 pb-2 overflow-x-auto overscroll-x-contain"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Platform"
        >
          {NAV.map(item => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`flex-shrink-0 py-1.5 text-[11px] font-black uppercase tracking-wider transition-colors ${isActive(item.page) ? 'text-[#e2602a]' : 'text-[#efe7d6]/60'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}
    </div>
  );
}