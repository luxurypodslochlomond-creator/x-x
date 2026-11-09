import React, { useEffect, useRef } from 'react';
import useRecordScroll from '@/components/climate/useRecordScroll';
import { IMAGES } from '@/components/climate/categoryImages';
import '@/components/climate/record-reading.css';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import RecordNavigator from '@/components/climate/RecordNavigator';
import RecordImprint from '@/components/climate/RecordImprint';
import RecordRule from '@/components/climate/RecordRule';
import RecordFooter from '@/components/climate/RecordFooter';
import RecordCover from '@/components/climate/RecordCover';
import RecordGrain from '@/components/climate/RecordGrain';

import { recordAddress, recordOrigin } from '@/components/climate/recordAddress';

// ── TOGETHER WE CAN CHANGE CLIMATE — her own front door ──
// Janine's record stands alone: her masthead, her icon, her share card, her install name.
// No shop chrome beside it. Nothing of UF51's in the room.
// x = x.

const TITLE = 'Together we can change the course of climate change — Record of the Time';
const DESCRIPTION = 'A public record of climate emergencies and the positive actions that work — shared openly, internationally — in any tongue a reader names, living or long dead.';

// Public navigation stays the same for every reader. Reviewer access belongs in the footer.
// The full directory lives on the existing guide page, not in a second menu on every page.

// Pages that are already spending the phone's connection on something heavier than a page,
// so warming ten more in the background would only take the wire away from them.
//   the record's working screens — someone is waiting on an answer, not reading;
//   the two maps — a mapping library and a hundred tiles are the most expensive thing on
//   the record, and prefetching page chunks underneath them is what made them stutter.
const WORKING_PAGES = [
  'AdminClimateDesk',
  'AdminClimateCheckers',
  'AdminClimateReview',
  'AdminClimateLog',
  'ClimateChecking',
  'ClimateMap',
  'ClimateImpact',
];

export default function ClimateLayout({ children, currentPage }) {
  const location = useLocation();
  const readingRef = useRef(null);
  useRecordScroll(readingRef);

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

    // A real PNG at the shape a link card wants. The SVG that stood here before was refused
    // by every platform that draws one, so a shared record arrived as a bare link.
    const card = `${recordOrigin()}/api/functions/serveClimateIcon?w=1200&h=630`;
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

    // iPhone ignores the manifest's icons and takes this one, so "Add to Home Screen" puts the
    // record's own mark on the phone instead of a screenshot of whatever page was open.
    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIcon) {
      appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = '/api/functions/serveClimateIcon?size=180';

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
    // The record's working screens are the one place a keeper is waiting on an answer rather
    // than reading. Warming ten page chunks behind them spends the phone's connection on pages
    // nobody asked for, while the desk is still counting. Nothing is lost: the reader arriving
    // on those pages later still gets them warm from the pages that do warm them.
    if (WORKING_PAGES.includes(currentPage)) return;
    const timer = setTimeout(() => {
      ['TogetherChangeClimate', 'ClimateSearch', 'ClimateWire', 'ClimateMethod', 'ClimateImpact', 'ClimateFounder', 'ClimateSupport', 'ClimateHost', 'ClimateTerms', 'ClimatePrivacy']
        .forEach(prefetchPath);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SiteLanguageProvider>
    <SiteTranslator />
    {/* The record's body is read, not compiled. Every page used to set monospace across the
        whole frame, so a paragraph of plain English arrived in the same lettering as a date or
        a field name — which is what made the record feel like a terminal to a reader who had
        never seen it before. The machine keeps its voice for the facts (every label, count,
        source and button still carries it); the sentences people wrote, and the sentences
        people read, are set in a face meant for reading. */}
    <div className="climate-record record-field min-h-screen bg-record-paper" style={{ fontFamily: 'var(--font-body)', '--record-cover': `url("${IMAGES.cover}")` }}>
      {/* THE FIELD ─────────────────────────────────────────────────────────────────────
          The cover, laid under the whole record and pinned there — the same canvas, at the
          same scale, on every page, in every tongue. Not a decorative splash behind one
          headline: the ground the book is printed on. Held back by a warm veil so not one
          sentence ever has to fight for its life, and fixed rather than scrolling, so the
          painting stays put while the record moves over it — the way a wall stays still
          while you walk along it.

          Every sheet of the record is a hair translucent on top of this (see the field rule
          in index.css), so the colour comes up through the page instead of being pasted
          behind a paragraph. That is the difference between a record that has a picture in
          it and a record that is a picture. Cheap to run, too: one composited layer, no
          repaint per scroll, nothing downloaded that a phone was not already sent. */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Held further back than it was. The cover is the room, not the wallpaper: at
            twenty-three per cent it was still reading as texture behind the page and
            nothing looked clean. */}
        <RecordCover position="center 42%" strength={0.14} priority className="record-ground" />
        {/* The sheet has a surface, not just a colour: tooth and foxing over the painting,
            under every word. See RecordGrain — it is drawn, not downloaded. */}
        <RecordGrain />
      </div>

      <div className="relative record-book" style={{ zIndex: 1 }}>
      {/* Deep earth, not near-black: the masthead and the plate under it now read as one warm
          top to the record instead of a dark screen with a page beneath it. */}
      {/* ── THE MASTHEAD ───────────────────────────────────────────────────────────────
          It used to be three stacked bands: a name, five equal text links, then a heavy
          language bar with its own background and its own border. Three strips of chrome
          on a phone before a single word of the record — which is precisely why the top of
          the page read as an afterthought bolted onto a document.

          It is one piece of printed matter now. The mark is cut into the top edge. The
          record says its name, the five doors sit beside it — one drawn mark and one word
          each, no numbering — and a hairline drawn by hand closes the line. Under it, as a
          printer's imprint, the record states its own terms in four words and offers the
          tongue it is being read in. Nothing is a box; nothing announces itself; nobody has
          to work out which part is navigation.

          On a phone it stops being sticky on purpose: a printed page does not pin ninety
          pixels of itself to the top of the glass. The way through the record is one tap
          up, and the colophon at the foot carries the mark and every door back. */}
      <header className="relative z-50 bg-record-paper text-record-ink sm:sticky sm:top-0">
        <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
        <div className="mx-auto max-w-[1100px] px-4 lg:px-10">
          <div className="flex items-baseline justify-between gap-6 pt-3.5">
            <Link
              to={createPageUrl('TogetherChangeClimate')}
              className="group flex min-w-0 items-baseline gap-2"
              aria-label="Record of the Time — the record's front page"
            >
              <span aria-hidden="true" className="block h-[7px] w-[7px] shrink-0 -translate-y-[3px] bg-record-mark" />
              <span
                className="text-[21px] leading-[1.05] text-record-ink transition-colors group-hover:text-record-red sm:text-[26px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Record of the Time
              </span>
            </Link>

          </div>

          {/* The six doors used to sit here as one line of type, and a line of type at the top
              of a phone is a line you have to remember. The way through the record is the dock
              at the foot of the glass now — drawn marks, in reach of the thumb, following the
              reader down the page (see RecordNavigator). The top of the record is left to do
              what a masthead does: say whose record this is, then get out of the way. */}
          <RecordRule />

          {/* The imprint line: how the record is kept, and the tongue this page is being
              read in. One line of printed matter, not a second menu. */}
          <RecordImprint />
        </div>
      </header>

      <main ref={readingRef} className="record-pages">{children}</main>

      <RecordFooter key={location.pathname} showKeeper={!WORKING_PAGES.includes(currentPage)} />

      {/* The dock stands over the last inch of any page, so the colophon is given the same
          inch back at its foot — otherwise the one thing nobody can reach is the last line
          of the record, which would be a ridiculous way to end a book. */}
      <div aria-hidden="true" className="h-[calc(62px+env(safe-area-inset-bottom))]" />

      <RecordNavigator currentPage={currentPage} />
      </div>
    </div>
    </SiteLanguageProvider>
  );
}