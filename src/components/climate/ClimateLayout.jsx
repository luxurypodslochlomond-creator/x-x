import React, { useEffect, useRef, useState, useCallback } from 'react';
import useRecordScroll from '@/components/climate/useRecordScroll';
import { IMAGES, RECORD_COVER_MOBILE } from '@/components/climate/categoryImages';
import '@/components/climate/record-reading.css';
import '@/components/climate/record-layout.css';
import '@/components/climate/record-mobile.css';
import '@/components/climate/record-surfaces.css';
import '@/components/climate/record-depth.css';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { prefetchPath } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import RecordImprint from '@/components/climate/RecordImprint';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import RecordRule from '@/components/climate/RecordRule';
import RecordTimeBar from '@/components/climate/RecordTimeBar';
import RecordFooter from '@/components/climate/RecordFooter';
import RecordReachEarth from '@/components/climate/RecordReachEarth';
import RecordCover from '@/components/climate/RecordCover';
import RecordSky from '@/components/climate/RecordSky';
import RecordPagesPanel from '@/components/climate/RecordPagesPanel';
import RecordDesktopMenu from '@/components/climate/RecordDesktopMenu';

import { recordAddress, recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';

// ── TOGETHER WE CAN CHANGE CLIMATE — her own front door ──
// Janine's record stands alone: her masthead, her icon, her share card, her install name.
// No shop chrome beside it. Nothing of UF51's in the room.
// x = x.

const TITLE = 'Together we can change the course of climate change — Record of the Time';
const DESCRIPTION = 'A public record of climate emergencies and the positive actions that work — shared openly, internationally — in any language a reader names.';

// ── THE CARTOON ROOM IS AN EVENT, AND IT TRAVELS AS ONE ───────────────────────
// Every page of the record was sharing the record's own mark, so a link to the cartoon room
// arrived in a chat as the same abstract card as everything else — which is why Brian kept
// seeing "old style x = x image" where the cartoons should have been. A link to this room
// now arrives as this room: the real CAIB cover, the dates, and the one ask. The cover is a
// stored public picture rather than a drawing made at request time, so it opens the same way
// in Lagos, London or Los Angeles, on a slow phone, with no waiting on a server.
const CARTOON_TITLE = 'The Big Picture — the record’s cartoon room';
const CARTOON_DESCRIPTION = 'Drawings gathered for the 8th CartoonAFRICA International Biennial, and Janine Selendy’s workshop on Sunday 29 November. The wall is open: send a drawing and it goes up with your name on it.';

// Public navigation stays the same for every reader. Reviewer access belongs in the footer.
// The full directory lives on the existing guide page, not in a second menu on every page.

// Pages that are already spending the phone's connection on something heavier than a page,
// so warming ten more in the background would only take the wire away from them.
//   the record's working screens — someone is waiting on an answer, not reading;
//   the two maps — a mapping library and a hundred tiles are the most expensive thing on
//   the record, and prefetching page chunks underneath them is what made them stutter.
const WORKING_PAGES = [
  'ClimateKeeperRoom',
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
  const openContents = useCallback(() => setContentsOpen((wasOpen) => !wasOpen), []);
  const closeContents = useCallback(() => setContentsOpen(false), []);
  useEffect(closeContents, [location.pathname, closeContents]);
  // Worked, not read. See ROOM_PAGES.
  const isRoom = ROOM_PAGES.includes(currentPage);
  useRecordScroll(readingRef);

  // Her identity, not UF51's. Runs once per climate page.
  useEffect(() => {
    // Earlier product visits left this unscoped graphics sheet in the document.
    // Remove the legacy copy in already-open tabs as well as fixing future visits.
    document.head.querySelectorAll('style').forEach((sheet) => {
      if (sheet.textContent.includes('/* HARDWARE ACCELERATION EVERYTHING */')) sheet.remove();
    });
    const isCartoonRoom = currentPage === 'ClimateCartoons';
    const pageTitle = isCartoonRoom ? CARTOON_TITLE : TITLE;
    const pageDescription = isCartoonRoom ? CARTOON_DESCRIPTION : DESCRIPTION;
    document.title = pageTitle;

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
    const card = isCartoonRoom
      ? CARTOON_COVER
      : `${recordOrigin()}/api/functions/serveClimateIcon?w=1200&h=630`;
    setMeta('name', 'description', pageDescription);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:image', card);
    setMeta('property', 'og:image:width', isCartoonRoom ? '682' : '1200');
    setMeta('property', 'og:image:height', isCartoonRoom ? '1024' : '630');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', recordAddress());
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);
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
  }, [location.pathname, currentPage]);

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
      ['TogetherChangeClimate', 'ClimateSearch', 'ClimateWire', 'ClimateMethod', 'ClimateFounder', 'ClimateSupport', 'ClimateHost', 'ClimateTerms', 'ClimatePrivacy']
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
    {/* No paper on the root any more. It was painted here as well as on the book, so the
        painting had nowhere to be seen on a phone — the sheet filled the glass and the
        ground underneath it was covered twice over. The paper belongs to the book; the
        root is the room the book stands in. */}
    <div className={`climate-record record-field min-h-screen${currentPage === 'TogetherChangeClimate' ? ' record-home-field' : ''}`} style={{ fontFamily: 'var(--font-body)', '--record-cover-desktop': `url("${IMAGES.cover}")`, '--record-cover-mobile': `url("${RECORD_COVER_MOBILE}")` }}>
      {/* The painting and the rare shooting stars stay in their own viewport-sized
          surface. No noise filter or blended grain lies over the master artwork. */}
      <div aria-hidden="true" className="record-environment">
        <RecordCover position="center 42%" strength={1} priority className="record-ground" />
        <RecordSky />
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
      {/* The masthead pins on every glass. It used to let go at desk width, on the argument
          that the marks were already in the reader's eye — but a way through that scrolls
          off the top is a way through you have to go looking for, and deep in a long page
          there is nothing at all above you saying which record you are standing in. It pins
          the same everywhere, and every jump down to the record allows for its height. */}
      <header className="sticky top-0 z-50 bg-record-paper text-record-ink">
        {/* ── THE YELLOW SITS ON THE RED, EDGE TO EDGE ─────────────────────────────
            The band was drawn inside the book's column, eight pixels below the red hairline,
            so at desk width there was a strip of paper above it and the painting showing
            either side of it — a floating yellow ribbon with a gap over its head. The paper
            was also only as wide as the column, which is why the ground came up between the
            masthead and the page.
            The band is now the full width of the glass and flush against the red: one
            uninterrupted signal from the top edge down, on every screen, and the header
            itself holds paper so nothing shows through behind it. */}
        <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
        {!isRoom && <RecordTimeBar />}
        <div className={`mx-auto max-w-[1100px] px-4 lg:px-10${isRoom ? ' pb-2.5' : ''}`}>
          {/* ── THE NAME OPENS A WORKED ROOM, AND ONLY A WORKED ROOM ────────────────
              On a page that is read, the record's name at the top said what the yellow
              line beneath it already said, in a second voice, and took forty pixels of a
              phone's glass to say it. It has come off the reading pages: the red square and
              "Record" in the row below is the way home, and the tongue has moved into the
              yellow line where the name used to sit opposite it. The keeper's room and the
              checker's queue keep the name, because there the name IS the way back. */}
          {isRoom && (
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

              <RecordTongueDoor size={18} inline />
            </div>
          )}

          {/* ── THE YELLOW LINE IS THE TOP OF THE RECORD NOW ─────────────────────────
              The sentence, and the tongue. Worked rooms still go without it, for the same
              reason they go without the rule and the imprint: in a room the work is the only
              thing on the glass. */}
          {!isRoom && <RecordRule />}

          {!isRoom && <RecordImprint onOpenContents={openContents} contentsOpen={contentsOpen} />}
        </div>
        <RecordDesktopMenu open={contentsOpen} onClose={closeContents} />
      </header>

      <main ref={readingRef} className="record-pages">{children}</main>

      {/* ── THE WORLD, LIT WHERE IT HAS BEEN READ ─────────────────────────────────
          The foot of EVERY page of the record, in the same place every time: the plate of
          the world with a light on every country and self-identified nation the record has
          actually been read in, from the same counts the Reach page shows.
          It used to sit inside the foot's wrapper, which is hidden on a phone in the two
          worked rooms — so the one thing the record says about itself was missing from
          exactly the screens a keeper and a checker live on. It stands outside that wrapper
          now: the foot's bookshelf is still spared in a room, but the world is not, because
          the world is what the work is for. It is below the work, never above it, so
          nothing is pushed off the glass.
          See RecordReachEarth for why the cover painting is not the surface it is drawn on. */}
      {/* Except on the Map page, where the plate above already carries the reach: a reader
          standing on the page that IS the world should not be shown the world a second time
          four screens further down. One map, once, at the size it deserves. */}
      {currentPage !== 'ClimateMap' && <RecordReachEarth />}

      <div className={isRoom ? 'hidden lg:block' : 'contents'}>
        <RecordFooter key={location.pathname} showKeeper={!WORKING_PAGES.includes(currentPage)} onOpenContents={openContents} contentsOpen={contentsOpen} />
      </div>

      <RecordPagesPanel open={contentsOpen} onClose={closeContents} />
      </div>
    </div>
    </SiteLanguageProvider>
  );
}