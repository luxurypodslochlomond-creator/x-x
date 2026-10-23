import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';

// ── TOGETHER WE CHANGE CLIMATE — her own front door ──
// Janine's record stands alone: her masthead, her icon, her share card, her install name.
// No shop chrome beside it. Nothing of UF51's in the room.
// x = x.

const TITLE = 'Together we can change the course of climate change — Record of the Time';
const DESCRIPTION = 'A public record of climate emergencies and the positive actions that work — shared openly, internationally. Every language on Earth.';

const NAV = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Search', page: 'ClimateSearch' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { label: 'Founder', page: 'ClimateFounder' },
  { label: 'Support', page: 'ClimateSupport' },
  { label: 'Method', page: 'ClimateMethod' },
];

// Terms and Privacy are kept off the reading nav — they are legal ground, not the record.
// They sit in one quiet place, in the footer of every page of the record.
const FOOTER_LINKS = [
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
      ['TogetherChangeClimate', 'ClimateSearch', 'ClimateWire', 'ClimateMethod', 'ClimateImpact', 'ClimateFounder', 'ClimateSupport', 'ClimateTerms', 'ClimatePrivacy']
        .forEach(prefetchPath);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (page) => currentPage === page;

  return (
    <SiteLanguageProvider>
    <SiteTranslator />
    <div className="climate-record min-h-screen bg-[#f4efe4]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <header className="sticky top-0 z-50 bg-[#141210] border-b-2 border-[#e2602a]">
        {/* Desktop — the record's masthead on the left, the way through the record on the
            right. The item you are reading is marked with a rule, not only a colour, so it
            still reads on a bad screen or a projector in a panel room. */}
        <div className="hidden sm:flex max-w-[1100px] mx-auto px-4 lg:px-10 py-3 items-center justify-between gap-8">
          <Link
            to={createPageUrl('TogetherChangeClimate')}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Record of the Time — the record's front page"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
            <span className="text-[#efe7d6] font-black font-mono text-[11px] uppercase tracking-[0.2em] leading-none group-hover:text-[#e2602a] transition-colors">
              Record of the Time
            </span>
          </Link>

          <nav className="flex items-center gap-5 lg:gap-6" aria-label="The record">
            {NAV.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                aria-current={isActive(item.page) ? 'page' : undefined}
                className={`pb-1 text-[11px] font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  isActive(item.page)
                    ? 'text-[#e2602a] border-[#e2602a]'
                    : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile — same links, thumb-scrollable, sitting centred under the masthead.
            w-max inside the scroller keeps them centred while they fit, and still
            scrolls from the left edge the moment a longer language pushes them wider. */}
        <nav
          className="sm:hidden px-4 py-2.5 overflow-x-auto overscroll-x-contain"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Platform"
        >
          <div className="mx-auto flex w-max gap-3">
            {NAV.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex-shrink-0 py-1.5 text-[10px] font-black uppercase tracking-wide transition-colors ${isActive(item.page) ? 'text-[#e2602a]' : 'text-[#efe7d6]/60'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Every tongue on Earth — in the header, on every page of the record. */}
        <div className="max-w-[1100px] mx-auto">
          <ClimateLanguageBar />
        </div>
      </header>

      {children}

      <footer className="border-t-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-3">
          {FOOTER_LINKS.map((item, i) => (
            <React.Fragment key={item.page}>
              {i > 0 && <span className="text-[#6b6258]/40 text-[10px] font-mono">·</span>}
              <Link
                to={createPageUrl(item.page)}
                className="text-[10px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors"
              >
                {item.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </footer>
    </div>
    </SiteLanguageProvider>
  );
}