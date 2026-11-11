import React from 'react';
import { Link } from 'react-router-dom';
import RecordRule from '@/components/climate/RecordRule';
import PageBand from '@/components/stoneymollan/PageBand';
import { BAND_MARKS } from '@/components/stoneymollan/BandMarks';
import FrostFilm from '@/components/stoneymollan/FrostFilm';
import StayHere from '@/components/stoneymollan/StayHere';
import WhoCameThrough from '@/components/stoneymollan/WhoCameThrough';
import { MARKS } from '@/components/stoneymollan/history';
import MastheadDoors from '@/components/stoneymollan/MastheadDoors';
import ThisMonth from '@/components/stoneymollan/ThisMonth';
import TheYear from '@/components/stoneymollan/TheYear';
import MastheadTongue from '@/components/stoneymollan/MastheadTongue';
import Wildlife from '@/components/stoneymollan/Wildlife';
import GettingHere from '@/components/stoneymollan/GettingHere';
import TheCairnsNote from '@/components/stoneymollan/TheCairnsNote';
import TheStrikeNote from '@/components/stoneymollan/TheStrikeNote';
import TheBeechesNote from '@/components/stoneymollan/TheBeechesNote';
import TheOldRoadNote from '@/components/stoneymollan/TheOldRoadNote';
import StayBar from '@/components/stoneymollan/StayBar';
import EmberBed from '@/components/stoneymollan/EmberBed';
import StoneymollanLogotype from '@/components/stoneymollan/StoneymollanLogotype';
import { WEBSITE } from '@/components/stoneymollan/links';

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

/* One sheet, set down the middle of the page and measured so a line of it never runs
   wider than a hand can hold. Everything on it hangs off that centre line. */
const SHEET = 'mx-auto w-full max-w-[44rem] px-6';
const BODY = 'mx-auto max-w-[46ch] text-center text-[17px] leading-[1.72]';

const FILM =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/6fc9cc3fc_stoneymollan-ben.mov';

/* Gill's morning, 11 November — first frost, before the sun was properly up.
   The photographs are left to speak for themselves: no captions underneath. Each one
   still carries a plain description for a screen reader and for a slow connection,
   and none of that describes anything the picture does not show. */
const MORNING = [
  {
    /* Gill’s, the same morning the mist was down: the coffin road running into it.
       This is the picture the page opens on and the picture the share card carries,
       because it is the road itself rather than a view of a view. */
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/3c964a099_stoneymollan-mist.jpg',
    alt: 'The coffin road running into mist at Stoneymollan, bare trees on both sides',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/e5be7e8c5_stoneymollan-bench.png',
    alt: 'The bench and the path at Stoneymollan, frost on the ground',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/f84d01fa3_stoneymollan-sunrise.png',
    alt: 'Sunrise and mist over the field at Stoneymollan',
  },
];

/* The history lives in its own file — every date in it was checked against a record
   rather than remembered, and the order is deliberate: John Muir first, because that is
   why a stranger comes; the coffin road further down, because that is what they find
   once they are here. */

/* The place itself, with a short label under each picture — what you are looking at,
   named plainly, so the rail reads like a walk rather than a gallery. */
const PLACES = [
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bbf887cc6_IMG_8405.png', caption: 'A red roof in the field below' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b78d8da95_image.jpg', caption: 'Sitting above the water' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bf4016447_image.jpg', caption: 'The gate on the way up' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/91e4d7d1e_image.jpg', caption: 'The muir, and the loch beneath it' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/040ae5497_image.jpg', caption: 'The dog, out in the field' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/6cf600d78_image.jpg', caption: 'The track through the trees' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d2ad7a1a0_image.jpg', caption: 'The beeches, deep in moss' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/7e35c473e_image.jpg', caption: 'Out of the wood' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/47dc2b93d_image.jpg', caption: 'The old trunk' },
];

export default function Stoneymollan() {
  return (
    <div className="stoneymollan-page relative min-h-screen bg-record-paper pb-20 text-record-ink twcc-scanlines md:pb-0">
      <MastheadDoors mobile />
      {/* ── THE MASTHEAD ──
          The record's own top, set down the middle: a bar of the mark's red across the
          page, then the name with its little square, ruled under by a hand-drawn line,
          then the facts of the place in the machine's small voice. */}
      <header className="relative z-10">
        <div aria-hidden="true" className="hidden h-[3px] w-full bg-record-mark md:block" />
        <div className={`${SHEET} pt-5`}>
          {/* The tongue sits where a record puts it — in the corner, above the name, so
              somebody who cannot read the English knows at once that the whole sheet
              can be had in theirs. It is the same choice the rest of the platform
              keeps, so a reader who picks Gaelic here keeps it on the next page. */}
          {/* The address of the place, set down the middle as the one line above the name,
              and a link that opens their own site in a new window so nobody loses the hill
              they were reading about. The wordmark beside it used to say "Over Loch Lomond"
              on the left, which read as a label rather than the way to the actual website —
              the address says both, plainly, in the same breath. The tongue stays in the
              corner where a record keeps it, clear of the centred line. */}
          <div className="relative flex items-center justify-center">
            <a
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-record-ink underline decoration-record-ink/25 underline-offset-4 hover:decoration-record-ink"
            >
              www.overlochlomond.com
            </a>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <MastheadTongue />
            </div>
          </div>
          {/* ── THE WHOLE LOCKUP, HIS ──
              The symbol and the name were two objects: his mark, and a typeface underneath
              standing in for his lettering. That is what "not sure about the font" was
              actually about — the name of the place was in a font that belongs to nobody
              here, sitting under a drawing that belongs to Andrew. It is now the drawing
              all the way down: symbol, letters, one artwork, one hand.

              His file is untouched and uncropped. It is set on the paper with multiply, so
              the white it was made on disappears and only the ink is left, and the line
              beneath says whose hand it is — which is the reason it has any right to be at
              the top of the page at all. */}
          <h1 className="mt-5 flex justify-center">
            <StoneymollanLogotype className="w-full max-w-[17rem] sm:max-w-[21rem]" />
          </h1>
          {/* Bro's word for it, and the right one: a mark. It says what the thing is —
              a drawn hand, a maker's sign — and it names him, which is the reason it has
              any right to sit at the top of the page. */}
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-record-ink">
            Mark by Andrew Shandy
          </p>
          {/* The etymology line has come off — Bro's call, and he is right: the credit
              belongs to the hand that drew it, and a name's history is what the history
              bands below are for, not a footnote under the title. */}
          <RecordRule />
          <p className="mt-1 text-center font-mono text-[11.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-ink">
            Balloch &rarr; Cardross &middot; 6.75 km &middot; over the muir
          </p>
          <p className="text-center font-mono text-[11.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-red">
            John Muir Way, Section 1 &middot; Three Lochs Way
          </p>
          {/* Said in their own words — the same three that head their Instagram — because it is
              the truest short answer to "what is it", and it lets the wrong guest go quietly. */}
          <p className="text-center font-mono text-[11.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-ink">
            Hillside cabins &middot; hot tub &middot; sauna &middot; cold water barrel &middot; fire pit
          </p>
          <MastheadDoors />
          <ThisMonth />
        </div>
      </header>

      {/* ── THE MORNING ── */}
      <div className={`${SHEET} pb-10`}>
        <PageBand label="The morning · 11 November · first frost">
          <figure>
            <img
              src={MORNING[0].url}
              alt={MORNING[0].alt}
              className="w-full border border-record-ink/20 object-cover"
              style={{ aspectRatio: '4 / 3' }}
            />
          </figure>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {MORNING.slice(1).map((shot) => (
              <figure key={shot.url}>
                <img
                  src={shot.url}
                  alt={shot.alt}
                  className="w-full border border-record-ink/20 object-cover"
                  style={{ aspectRatio: '3 / 4' }}
                />
              </figure>
            ))}
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase leading-[1.9] tracking-[0.13em] text-record-ink">
            Photos <span className="px-1.5 text-record-ink/40">/</span> Gill
            <span className="px-1.5 text-record-ink/40">/</span> Film &middot; Ben Santiago
          </p>
        </PageBand>
      </div>

      {/* ── THE LEAD ──
          Moved below the photographs: the top of the page was words, words, words before
          anything had been shown. Now the hill is in front of you first and the line lands
          after it, which is also how you would show somebody a place. Shorter than it was —
          three facts and a sting, no adjectives doing the work pictures can do. */}
      <div className={`${SHEET} pb-10`}>
        <p
          className="mx-auto max-w-[22ch] text-center text-[28px] leading-[1.1] tracking-tight sm:text-[36px]"
          style={SERIF}
        >
          Mist, beeches, and the whole loch beneath you.
        </p>
        <p className="mx-auto mt-4 max-w-[42ch] text-center text-[17px] leading-[1.72]" style={READING}>
          The John Muir Way crosses the muir above the cabins — six and a half kilometres of
          it, the loch the whole way to Ben Lomond, a minute from the door.
        </p>
        <p className="mx-auto mt-3 max-w-[42ch] text-center text-[17px] leading-[1.72]" style={READING}>
          A king died in the parish below. A queen of five sailed for France six miles down
          the vale. The island in front of you was raided for its cattle. None of it is
          scenery.
        </p>
      </div>

      {/* ── THE FILM ── */}
      <div className={`${SHEET} pb-10`}>
        <FrostFilm src={FILM} poster={MORNING[2].url} />
      </div>

      {/* ── THE MARKS ── */}
      <div id="history" className={`${SHEET} scroll-mt-[116px] space-y-9 pb-12 md:scroll-mt-20`}>
        {MARKS.map((mark) => (
          <PageBand
            key={mark.number}
            number={mark.number}
            label={mark.label}
            title={mark.title}
            mark={BAND_MARKS[mark.number]}
          >
            <div className="space-y-3">
              {mark.body.map((para) => (
                <p key={para} className={BODY} style={READING}>
                  {para}
                </p>
              ))}
            </div>
            {mark.people && <WhoCameThrough people={mark.people} />}
            {mark.source && (
              <p className="mx-auto mt-4 max-w-[40ch] font-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-record-ink/85">
                {mark.source}
              </p>
            )}
            {/* ── THE TWO BANDS THAT ASK TO BE CHECKED ──
                Every band here names its origin. These two make the biggest claims on
                the sheet — twenty-odd graves and a hill that answers to nobody — so
                their names become doors: the national inventory, the parish survey,
                and, on the strike, the difference between what is old in the world and
                what is new on the internet. */}
            {mark.number === '06' && <TheOldRoadNote />}
            {mark.number === '10' && <TheBeechesNote />}
            {mark.number === '11' && <TheCairnsNote />}
            {mark.number === '12' && <TheStrikeNote />}
          </PageBand>
        ))}
      </div>

      {/* ── WHAT LIVES HERE ──
          The wood is a plantation with old trees in it, and it is full of animals.
          Red squirrels are back in the park below after fifty years away, which is
          the single best fact about this hill and was nowhere on this page. */}
      <Wildlife />

      {/* ── THE YEAR, MONTH BY MONTH ──
          The masthead shows the month you are in; this is the whole year, and you can
          walk it. Somebody planning a week in October can look at October. */}
      <TheYear />

      {/* ── THE PLACES ── */}
      <section className="border-t border-record-ink/25 bg-record-bone">
        <div className={`${SHEET} pb-4 pt-8`}>
          <p className="text-center font-mono text-[11.5px] uppercase tracking-[0.16em] text-record-ink">
            The places
          </p>
        </div>
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {PLACES.map((place) => (
            <figure key={place.url} className="w-52 flex-shrink-0 snap-start">
              <img
                src={place.url}
                alt={place.caption}
                loading="lazy"
                className="w-full border border-record-ink/20 object-cover"
                style={{ aspectRatio: '4 / 5' }}
              />
              <figcaption className="mt-2 text-center text-[15px] leading-snug text-record-ink/85" style={READING}>
                {place.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── HOW TO GET HERE ──
          Two ways and both true: the road up from Balloch, and the old coffin road over
          the muir that the long-distance paths now share. It sits right before the stay,
          because the first question anyone asks after the photographs is how you get to
          the top of it. */}
      <GettingHere />

      {/* ── THE STAY ──
          What is actually up here, in short lines rather than a paragraph, and one way to
          book that pays nobody in the middle. */}
      <StayHere shareImage={MORNING[0].url} shareCredit="Gill" />

      {/* ── THE FOOT ── */}
      <footer className="relative overflow-hidden border-t border-record-ink/25">
        <EmberBed />
        <div className={`${SHEET} relative py-9`}>
          <p className="mx-auto max-w-[40ch] text-center text-[17px] leading-[1.6]" style={READING}>
            We are so lucky here. Can&rsquo;t quite believe we were given the chance.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-record-ink/20 pt-4">
            <Link to="/XEqualsX" className="font-mono text-[11px] tracking-[0.3em] text-record-mark">
              x = x
            </Link>
            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-record-ink underline decoration-record-ink/30 underline-offset-4"
            >
              Universal Frequency 51
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-record-ink">
              Film &middot; Ben Santiago <span className="px-1 text-record-ink/40">/</span> Photos &middot; Gill
              <span className="px-1 text-record-ink/40">/</span> Mark &middot; Andrew Shandy
            </p>
          </div>
        </div>
      </footer>

      <StayBar shareImage={MORNING[0].url} shareCredit="Gill" />
    </div>
  );
}