import React, { useEffect, useRef } from 'react';
import useRecordScroll from '@/components/climate/useRecordScroll';
import { IMAGES } from '@/components/climate/categoryImages';
import '@/components/climate/record-reading.css';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';
import ClimateNav from '@/components/climate/ClimateNav';
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

// The way through the record lives in ClimateNav: places to read, and one action —
// Search — drawn as a control so it can never be lost in a list of words.

// The footer groups the supporting pages by purpose instead of presenting one flat menu.

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
      <header className="sticky top-0 z-50 bg-[#241d16] border-b-2 border-[#e2602a] relative overflow-hidden">
        {/* THE SPINE ─────────────────────────────────────────────────────────────────────
            The cover runs along the top of every page of the record, held far back. Not so you
            can look at it here — you look at it at the door — but so the room is the same room
            when you turn a page. A record whose masthead is flat ink on fourteen pages and a
            painting on one of them is fourteen documents stapled together; this is one book.
            The gradient under it is the whole trick: the picture gives the header its warmth,
            the gradient guarantees not one word of navigation ever has to fight for its life. */}
        <RecordCover position="center 20%" strength={0.38} blend="screen" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(36,29,22,.62) 0%, rgba(36,29,22,.8) 60%, rgba(36,29,22,.9) 100%)' }} />

        {/* Desktop — the record's masthead on the left, the way through the record on the
            right. The item you are reading is marked with a rule, not only a colour, so it
            still reads on a bad screen or a projector in a panel room. */}
        <div className="relative z-10 hidden sm:flex max-w-[1100px] mx-auto px-4 lg:px-10 py-3 items-center justify-between gap-8">
          <Link
            to={createPageUrl('TogetherChangeClimate')}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Record of the Time — the record's front page"
          >
            {/* The record says its own name in its own voice. It was a monospaced label in
                capitals, spaced out like a field name — the same lettering as a date or a
                count, which meant the one line that names the whole thing sounded like
                metadata. One pulse was enough too: the dot is a mark, not a heartbeat. */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] flex-shrink-0" />
            <span
              className="text-[#efe7d6] text-[18px] leading-none group-hover:text-[#e2602a] transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Record of the Time
            </span>
          </Link>

          <ClimateNav currentPage={currentPage} />
        </div>

        {/* Mobile — the rail, on one line: centred while the words fit, thumb-scrollable
            the moment they do not. The rail owns its own scroller. */}
        <div className="relative z-10 sm:hidden">
          <ClimateNav currentPage={currentPage} variant="mobile" />
        </div>

        {/* Every tongue on Earth — in the header, on every page of the record. */}
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <ClimateLanguageBar />
        </div>
      </header>

      <main ref={readingRef} className="record-pages">{children}</main>

      <RecordFooter key={location.pathname} showKeeper={!WORKING_PAGES.includes(currentPage)} />
      </div>
    </div>
    </SiteLanguageProvider>
  );
}