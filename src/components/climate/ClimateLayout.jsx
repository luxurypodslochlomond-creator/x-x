import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import useRecordScroll from '@/components/climate/useRecordScroll';
import { IMAGES, RECORD_COVER_MOBILE, RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';
import '@/components/climate/record-reading.css';
import '@/components/climate/record-layout.css';
import '@/components/climate/record-mobile.css';
import '@/components/climate/record-surfaces.css';
import '@/components/climate/record-depth.css';
import '@/components/climate/record-connected.css';
import '@/components/climate/record-kind.css';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { warmRecordDoors } from '@/lib/routePrefetch';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import SiteTranslator from '@/components/shared/SiteTranslator';
import RecordImprint from '@/components/climate/RecordImprint';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import RecordRule from '@/components/climate/RecordRule';
import RecordTimeBar from '@/components/climate/RecordTimeBar';
import RecordFooter from '@/components/climate/RecordFooter';
import RecordReachDeferred from '@/components/climate/RecordReachDeferred';
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
// One description for the whole record, and it is the record's own promise — the same sentence
// the share sends and the preview tags carry, so a link opened from a chat lands on a page that
// says exactly what the chat said. See shareRecordCard.js for why it asks nothing of anybody.
const DESCRIPTION = 'A public record of the climate. Solutions, Crises and Actions: each one dated, sourced and signed. Nothing sold, nothing ranked.';

// ── THE CARTOON ROOM IS AN EVENT, AND IT TRAVELS AS ONE ───────────────────────
// Every page of the record was sharing the record's own mark, so a link to the cartoon room
// arrived in a chat as the same abstract card as everything else — which is why Brian kept
// seeing "old style x = x image" where the cartoons should have been. A link to this room
// now arrives as this room: the real CAIB cover, the dates, and the one ask. The cover is a
// stored public picture rather than a drawing made at request time, so it opens the same way
// in Lagos, London or Los Angeles, on a slow phone, with no waiting on a server.
const CARTOON_TITLE = 'The Wall — the record’s cartoon room';
const CARTOON_DESCRIPTION = 'Drawings gathered for the 8th CartoonAFRICA International Biennial, and Janine Selendy’s workshop on Sunday 29 November. The wall is open: send a drawing and it goes up with your name on it.';

// ── EACH ROOM SAYS WHAT IT IS ─────────────────────────────────────────────────
// One sentence for every page meant a link to the wire, the music or the map arrived in a
// chat as the record introducing itself rather than the room the sender was actually sending.
// Somebody passing on a track wants the track named, not the building described.
//
// So each room carries its own line, and every line says what a reader will find there rather
// than what the record thinks of itself. No adjective does any work that a fact could do: no
// "groundbreaking", no "vital", no "join us". The record's own sentence stays the fallback,
// because a room with nothing particular to say should not invent something to say.
const ROOM_DESCRIPTIONS = {
  ClimateWire: 'The wire: what changed, what was published, and what is being said about the climate — every line with its source and its date.',
  ClimateMusic: 'Music given to the record by the people who made it, heard here whole with the artist’s name on it. Nothing sold, nothing counted.',
  ClimateMethod: 'How this record is made: what gets on it, what waits for a person, what comes off, and every correction written in the open.',
  ClimateSearch: 'Search the whole record — crises, solutions, actions and drawings — in any tongue a reader names.',
  ClimateGuide: 'What is on the record, room by room, and the way into any of it.',
  ClimateSeals: 'Every entry fingerprinted, and the check run in your own browser. Verify the record without trusting anyone who built it.',
  ClimateRoll: 'The people who check this record, in their own words.',
  ClimateFounder: 'Why this record exists, in the founder’s own words — and in whose honour it is kept.',
  ClimateSupport: 'How the record is paid for, said in the open. Money never buys a place on it.',
  XEqualsX: 'x=x. A record of the time. A platform to change it: crises, solutions, actions and drawings, kept in the open with sources named. Not an engagement-ranked feed.',
};

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
  const isCartoonRoom = currentPage === 'ClimateCartoons';
  useRecordScroll(readingRef);
  // Desktop-only warming; phones load the chosen door on touch instead of downloading
  // the whole record, including the map, while the current page is still opening.
  useEffect(() => warmRecordDoors(), []);

  // Her identity, not UF51's. Runs once per climate page.
  useEffect(() => {
    // Earlier product visits left this unscoped graphics sheet in the document.
    // Remove the legacy copy in already-open tabs as well as fixing future visits.
    document.head.querySelectorAll('style').forEach((sheet) => {
      if (sheet.textContent.includes('/* HARDWARE ACCELERATION EVERYTHING */')) sheet.remove();
    });
    const isCartoonRoom = currentPage === 'ClimateCartoons';
    const pageTitle = isCartoonRoom ? CARTOON_TITLE : currentPage === 'XEqualsX' ? 'x=x — A record of the time. A tool to change it.' : TITLE;
    const pageDescription = isCartoonRoom ? CARTOON_DESCRIPTION : (ROOM_DESCRIPTIONS[currentPage] || DESCRIPTION);
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
      : RECORD_COVER_SCREEN;
    setMeta('name', 'description', pageDescription);
    // ── THE PHONE'S OWN STATUS BAR IS PART OF THE RECORD ────────────────────────
    // The manifest already says the record is printed in its red, but a manifest's
    // theme_color only colours the app once it has been added to a Home Screen. Every
    // browser that is not yet an installed app takes the colour of the bar above the page
    // from this tag — and it was left at whatever the last product on the platform had set,
    // so a reader on a phone met a green or a cyan strip sitting directly on the record's
    // red hairline. It is the record's own red now, on every page of it.
    setMeta('name', 'theme-color', '#b3261e');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:image', card);
    setMeta('property', 'og:image:width', isCartoonRoom ? '682' : '1600');
    setMeta('property', 'og:image:height', isCartoonRoom ? '1024' : '901');
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
    // The tab carries the claim rather than the letters: at sixteen pixels "x = x" is a
    // smudge, and two bars are the whole argument — equal standard, no ranking.
    icon.href = '/api/functions/serveFavicon?type=xeqx';

    // iPhone ignores the manifest's icons and takes this one, so "Add to Home Screen" puts the
    // record's own mark on the phone instead of a screenshot of whatever page was open.
    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIcon) {
      appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = '/api/functions/serveClimateIcon?size=180&mark=full';

    let manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.rel = 'manifest';
      document.head.appendChild(manifest);
    }
    // A new timestamp forced a fresh manifest request on every page turn.
    // Keep the address stable; the browser still checks the manifest for updates.
    const manifestPath = '/api/functions/serveManifest?brand=climate';
    if (manifest.getAttribute('href') !== manifestPath) manifest.href = manifestPath;
  }, [location.pathname, currentPage]);



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
    <div data-record-page={currentPage} className={`climate-record record-field min-h-screen${currentPage === 'TogetherChangeClimate' ? ' record-home-field' : ''}${isCartoonRoom ? ' record-cartoon-field' : ''}`} style={{ fontFamily: 'var(--font-body)', '--record-cover-desktop': `url("${IMAGES.cover}")`, '--record-cover-mobile': `url("${RECORD_COVER_MOBILE}")` }}>
      {/* The painting and the rare shooting stars stay in their own viewport-sized
          surface. No noise filter or blended grain lies over the master artwork. */}
      <div aria-hidden="true" className="record-environment">
        {/* One real painting, fixed behind the entire room, including its foot.
            The cartoon's digital light is transparent, never a replacement globe. */}
        <RecordCover position="center 42%" strength={1} priority className="record-ground" />
        {/* The cartoon room carries no overlay of its own. The orbiting traces and nodes
            that used to sit over the painting here were the last piece of costume on the
            page — a light show behind a room whose whole argument is that the drawing is
            the event. The painting stays; the decoration does not. */}
        {!isCartoonRoom && <RecordSky />}
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
        {!isRoom && <RecordTimeBar onOpenContents={openContents} contentsOpen={contentsOpen} />}
        {/* The masthead was held to the reading column's 1100px, so on a desk it floated in
            the middle of the glass with a hand's width of nothing either side of it while the
            doors inside it were squeezed. Brian, 18 November: "why we not using full width on
            desktop bro feel like wasted… top nav could be have more". The nav now takes the
            desk; the pages under it keep their reading measure, which is the one thing on this
            record that must not be stretched. */}
        <div className={`mx-auto w-full max-w-[1100px] px-4 lg:max-w-[1440px] lg:px-10${isRoom ? ' pb-2.5' : ''}`}>
          {/* ── THE NAME OPENS A WORKED ROOM, AND ONLY A WORKED ROOM ────────────────
              On a page that is read, the record's name at the top said what the yellow
              line beneath it already said, in a second voice, and took forty pixels of a
              phone's glass to say it. It has come off the reading pages: the red square and
              "Record" in the row below is the way home, and the tongue has moved into the
              yellow line where the name used to sit opposite it. The keeper's room and the
              checker's queue keep the name, because there the name IS the way back. */}
          {/* ── THE COVENANT CAME OFF THE ROOM AND WENT INTO THE DOORS ───────────────
              Brian, 19 November: "on the wall cartoon page we have x = x and at top of nav
              and wasted space — can we remove this so nav moves up underneath the yellow
              band… and why in nav should be x = x."

              Both halves of that are one decision. x = x had a row of its own here, above
              the doors: a 44-pixel tap target and its padding spent on a mark that is not
              a door, pushing the whole masthead down on the one page of the record that is
              a poster and should open on the drawing. Meanwhile the door that actually
              leads to the covenant was called "Why".

              So the row is gone, the doors come up to the ruled line under the yellow band,
              and x = x is where a reader can act on it: the door's own name, in the row
              below. Nothing was lost and a whole band of paper came back to the wall. */}
          {isRoom ? (
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
          ) : null}

          {/* ── THE YELLOW LINE IS THE TOP OF THE RECORD NOW ─────────────────────────
              The sentence, and the tongue. Worked rooms still go without it, for the same
              reason they go without the rule and the imprint: in a room the work is the only
              thing on the glass. */}
          {!isRoom && <RecordRule />}

          {!isRoom && <RecordImprint onOpenContents={openContents} contentsOpen={contentsOpen} />}
        </div>
        <RecordDesktopMenu open={contentsOpen} onClose={closeContents} />
      </header>

      {/* Only the page waits for its content. The shared masthead remains mounted;
          its mobile width is owned by the shared frame, not by individual pages. */}
      <main ref={readingRef} className="record-pages">
        <Suspense
          fallback={
            <div
              className="flex min-h-[60vh] items-center justify-center"
              style={{ background: 'rgb(var(--record-paper) / .97)' }}
            >
              <p role="status" className="font-mono text-[11px] uppercase tracking-[0.3em] text-record-muted">LOADING · x = x</p>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

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
      {currentPage !== 'ClimateMap' && <RecordReachDeferred />}

      <div className={isRoom ? 'hidden lg:block' : 'contents'}>
        <RecordFooter key={location.pathname} showKeeper={!WORKING_PAGES.includes(currentPage)} onOpenContents={openContents} contentsOpen={contentsOpen} />
      </div>

      <RecordPagesPanel open={contentsOpen} onClose={closeContents} />
      </div>
    </div>
    </SiteLanguageProvider>
  );
}