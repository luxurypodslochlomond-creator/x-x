import React, { useEffect, useRef, useState, useCallback } from 'react';
import useRecordScroll from '@/components/climate/useRecordScroll';
import { IMAGES } from '@/components/climate/categoryImages';
import '@/components/climate/record-reading.css';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import RecordImprint from '@/components/climate/RecordImprint';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import RecordRule from '@/components/climate/RecordRule';
import RecordFooter from '@/components/climate/RecordFooter';
import RecordCover from '@/components/climate/RecordCover';
import RecordGrain from '@/components/climate/RecordGrain';
import RecordPagesPanel from '@/components/climate/RecordPagesPanel';

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

// ── THE ONE ROOM THAT IS WORKED, NOT READ ─────────────────────────────────────
// Every other page of the record is read, so it carries the record's rule and the imprint
// of doors beneath its name: that is the book. The keeper's room is worked — and on a phone
// that rail of six doors was eating the top of the glass and pushing the first entry below
// the fold, so a keeper scrolled before she could decide anything.
//
// Nothing is taken away from the record. This one screen simply stops drawing the rule and
// the doors it is not walking through; the name stays, pinned, and the name is the way back.
// The six doors are still on the front page she lands on, the tongue door still stands beside
// her, and the room's own "Back to the record" line still sits under the strip. One page, not
// all of them: the public record keeps the masthead it was drawn around.
// The checker's queue is worked too, and it was the last working screen still wearing the
// reading book's chrome: a volunteer who signed in to answer three questions about three
// sources was handed the record's whole foot — the founder, the host page, the covenants,
// the doors — and could scroll past a bookshelf before reaching the first entry. That is
// the same fault the keeper's room had, and it takes the same answer. The name stays, the
// name is the way home, and the work is the only thing on the glass.
const ROOM_PAGES = ['ClimateKeeperRoom', 'ClimateChecking'];

export default function ClimateLayout({ children, currentPage }) {
  const location = useLocation();
  const readingRef = useRef(null);
  const [contentsOpen, setContentsOpen] = useState(false);
  const openContents = useCallback(() => setContentsOpen(true), []);
  const closeContents = useCallback(() => setContentsOpen(false), []);
  // Worked, not read. See ROOM_PAGES.
  const isRoom = ROOM_PAGES.includes(currentPage);
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

      {/* ── ONE WAY THROUGH, AND IT IS AT THE TOP ──────────────────────────────────
          The strip at the foot of this block used to hold open a hundred and four pixels
          plus the home indicator, for a dock of drawn doors pinned over the book. The dock
          is gone: the same marks stand in the masthead, on every screen size, and a phone
          no longer gives a quarter of a page away to a second copy of its own index. So the
          foot of the book keeps its own margin again, and nothing is held open under a bar
          that is not there. The masthead still pins, so the way through is one thumb away
          from the top of any page. */}
      <div className="relative record-book" style={{ zIndex: 1 }}>
      <header className="sticky top-0 z-50 bg-record-paper text-record-ink">
        <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
        <div className={`mx-auto max-w-[1100px] px-4 lg:px-10${isRoom ? ' pb-2.5' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-0 pt-3.5">
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

            {/* ── THE READER'S OWN TONGUE, ON THE IMPRINT LINE ───────────────────────
                Not a seventh door in the rail below: it goes nowhere, it changes the voice
                of the page you are already standing on. It is set opposite the record's own
                name, the record signing on the left and the reader answering on the right,
                and it names the tongue in that tongue's own words so it explains itself
                without a label. Always on the glass, never a cell stolen from a door, and it
                cannot push one aside whatever a tongue is called. */}
            <RecordTongueDoor size={18} inline />
          </div>

          {!isRoom && <RecordRule />}

          {!isRoom && <RecordImprint onOpenContents={openContents} contentsOpen={contentsOpen} />}
        </div>
      </header>

      <main ref={readingRef} className="record-pages">{children}</main>

      <div className={isRoom ? 'hidden lg:block' : 'contents'}>
        <RecordFooter key={location.pathname} showKeeper={!WORKING_PAGES.includes(currentPage)} onOpenContents={openContents} contentsOpen={contentsOpen} />
      </div>

      <RecordPagesPanel open={contentsOpen} onClose={closeContents} />
      </div>
    </div>
    </SiteLanguageProvider>
  );
}