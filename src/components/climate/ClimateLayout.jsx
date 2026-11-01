import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';
import ClimateNav from '@/components/climate/ClimateNav';
import { recordAddress, recordOrigin } from '@/components/climate/recordAddress';

// ── TOGETHER WE CAN CHANGE CLIMATE — her own front door ──
// Janine's record stands alone: her masthead, her icon, her share card, her install name.
// No shop chrome beside it. Nothing of UF51's in the room.
// x = x.

const TITLE = 'Together we can change the course of climate change — Record of the Time';
const DESCRIPTION = 'A public record of climate emergencies and the positive actions that work — shared openly, internationally. Every language on Earth.';

// The way through the record lives in ClimateNav: places to read, and one action —
// Search — drawn as a control so it can never be lost in a list of words.

// Terms and Privacy are kept off the reading nav — they are legal ground, not the record.
// They sit in one quiet place, in the footer of every page of the record. The Buttons —
// the page that lists every button and what it does — sits here too: a host or handler
// is handed the link, and finds it again at the foot of any page of the record.
const FOOTER_LINKS = [
  { label: 'The Buttons', page: 'ClimateGuide' },
  { label: 'The Brief', page: 'ClimateBrief' },
  { label: 'For Janine', page: 'ClimateHost' },
  { label: 'For a host', page: 'ClimateHandover' },
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

    const card = `${recordOrigin()}/api/functions/serveClimateOGImage`;
    setMeta('name', 'description', DESCRIPTION);
    setMeta('property', 'og:title', TITLE);
    setMeta('property', 'og:description', DESCRIPTION);
    setMeta('property', 'og:image', card);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', recordAddress());
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
      ['TogetherChangeClimate', 'ClimateSearch', 'ClimateWire', 'ClimateMethod', 'ClimateImpact', 'ClimateFounder', 'ClimateSupport', 'ClimateHost', 'ClimateTerms', 'ClimatePrivacy']
        .forEach(prefetchPath);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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

          <ClimateNav currentPage={currentPage} />
        </div>

        {/* Mobile — the rail, on one line: centred while the words fit, thumb-scrollable
            the moment they do not. The rail owns its own scroller. */}
        <div className="sm:hidden">
          <ClimateNav currentPage={currentPage} variant="mobile" />
        </div>

        {/* Every tongue on Earth — in the header, on every page of the record. */}
        <div className="max-w-[1100px] mx-auto">
          <ClimateLanguageBar />
        </div>
      </header>

      {children}

      <footer className="border-t-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-4">
        {/* One line, always one. In a tongue whose words are longer, the line slides inside
            itself rather than wrapping into a second one — so the foot of every page of the
            record keeps the same height and nothing the reader is looking at moves while a
            tongue is being written in. */}
        <div className="max-w-[1100px] mx-auto overflow-x-auto climate-nav-rail">
          <div className="flex items-center justify-center gap-3 w-max mx-auto">
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
            <span className="text-[#6b6258]/40 text-[10px] font-mono">·</span>
            <Link
              to="/XEqualsX"
              className="text-[10px] font-mono font-black tracking-[0.2em] text-[#b3261e] hover:text-[#141210] transition-colors"
            >
              x = x
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </SiteLanguageProvider>
  );
}