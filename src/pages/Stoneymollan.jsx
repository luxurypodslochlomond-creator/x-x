import React from 'react';
import { Link } from 'react-router-dom';
import RecordRule from '@/components/climate/RecordRule';
import PageBand from '@/components/stoneymollan/PageBand';
import FrostFilm from '@/components/stoneymollan/FrostFilm';
import StayHere from '@/components/stoneymollan/StayHere';

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

/* One sheet, set down the middle of the page and measured so a line of it never runs
   wider than a hand can hold. Everything on it hangs off that centre line. */
const SHEET = 'mx-auto w-full max-w-[44rem] px-6';
const BODY = 'mx-auto max-w-[46ch] text-center text-[16.5px] leading-[1.68]';

const FILM =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/6fc9cc3fc_stoneymollan-ben.mov';

/* Gill's morning, 11 November — first frost, before the sun was properly up.
   The photographs are left to speak for themselves: no captions underneath. Each one
   still carries a plain description for a screen reader and for a slow connection,
   and none of that describes anything the picture does not show. */
const MORNING = [
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/9f0ca0c7a_stoneymollan-path.jpeg',
    alt: 'Bare trees and frost at Stoneymollan',
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

const MARKS = [
  {
    number: '01',
    label: 'What the road is',
    title: 'The coffin road',
    body: [
      'Balloch, over the muir, down to the clachan of Kirkton and St Mahew’s Chapel at Cardross: just under seven kilometres, walked by the bearers with a coffin carried between them.',
      'Feet first, so the spirit could not turn back for home. The coffin was never set down on the ground. Streams cross the route the whole way along, because running water was said to stop a spirit following.',
    ],
  },
  {
    number: '02',
    title: 'The Cross Stone Road',
    body: [
      'That is what the first Ordnance Survey maps call it. There was a cross stone on the way, where the bearers set the coffin down and rested.',
      'The base of it is still at the roadside. The cross itself went missing around 1880.',
    ],
  },
  {
    number: '03',
    title: 'A king in the parish',
    body: [
      'Robert the Bruce kept his manor at Cardross, and died there on 7 June 1329. The old road ends in that same parish.',
      'Historians still argue about exactly where the manor stood. The parish they do not argue about.',
    ],
  },
  {
    number: '04',
    title: 'Bandit country',
    body: [
      'Rob Roy MacGregor drove cattle across these hills three hundred years ago, and lifted them. He was out in the Fifteen, and he fought at Sheriffmuir in 1715.',
      'A road empty of everything was a useful road in the dark, when you were moving something that was not yours.',
    ],
  },
  {
    number: '05',
    title: 'The way through',
    body: [
      'Stoneymollan Muir is Section 1 of the John Muir Way — Helensburgh to Balloch, nine miles of it, and on to Dunbar, 134 in all. The Three Lochs Way crosses it too.',
      'John Muir was born in Dunbar and founded the Sierra Club. The path that carries his name now runs over a road far older than he was.',
    ],
  },
  {
    number: '06',
    title: 'The beeches',
    body: [
      'The avenue of beeches along the route is reckoned two to three hundred years old — planted to line the way, the trunks deep in moss now, framing the path like a nave.',
    ],
  },
  {
    number: '07',
    label: 'The bottom of the garden',
    title: 'Two cairns in Cameron Wood',
    body: [
      'Cameron Wood is the one at the bottom of the garden, and there are two old cairns in it. Both are older than the coffin road by a few thousand years.',
      'The lower one is Round Hill: an earth and stone mound thirty metres by twenty, two and a half metres high, with white quartz still pushing up through the soil. Stand on the top of it and you look straight up the loch to Ben Lomond.',
      'The upper one is a Neolithic chambered long cairn, laid east-southeast to west-northwest. Thirty metres by eighteen when it was first written down in 1845; twenty by ten now. Two rows of graves, twenty to twenty-five of them, with flint arrowheads taken out of them that year. A cup-marked boulder sits by a tree at the edge of it — nine cups, if you can find them. One stone cist survives.',
      'It had already been opened and robbed before 1845. Nobody has looked after it since: most of it is gone, and the forestry is planted over what is left. It is one of the oldest things in this parish and the least looked after.',
      'There are two ways up to it. The path runs through the plantation — the same line the coffin road takes — and comes out above the trees onto the muir, a couple of hundred metres of it. When the foresters are working, you go round the outside along the field edge instead and pick the track up again above the wood.',
    ],
    source: 'Recorded at NS372822 · New Statistical Account, 1845 · Megalithic Portal',
  },
  {
    number: '08',
    label: 'What people say',
    title: 'The strike',
    body: [
      'A tree in that wood took a lightning strike. It stands split down the length of it, and people who walk there stop at it.',
      'The cairns, the cross stone and the strike are said to sit on a ley line — a straight line drawn between old places, the kind a dowser finds with a rod. Nothing has ever measured one, and this record says so rather than dressing it up.',
      'What is true is that people have been drawing lines between these places for a very long time, and that this hill carries more old marks on it than most.',
    ],
  },
];

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
    <div className="relative min-h-screen bg-record-paper text-record-ink twcc-scanlines">
      {/* ── THE MASTHEAD ──
          The record's own top, set down the middle: a bar of the mark's red across the
          page, then the name with its little square, ruled under by a hand-drawn line,
          then the facts of the place in the machine's small voice. */}
      <header className="relative z-10">
        <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
        <div className={`${SHEET} pt-5`}>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-record-muted">
            Over Loch Lomond
          </p>
          <div className="mt-3 flex items-center justify-center gap-2.5">
            <span aria-hidden="true" className="block h-[7px] w-[7px] shrink-0 bg-record-mark" />
            <h1
              className="text-[34px] leading-[1.02] tracking-tight sm:text-[42px]"
              style={SERIF}
            >
              Stoneymollan
            </h1>
          </div>
          <RecordRule />
          <p className="mt-1 text-center font-mono text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-record-muted">
            Balloch &rarr; Cardross &middot; 6.75 km &middot; over the muir
          </p>
          <p className="text-center font-mono text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-record-signal">
            John Muir Way, Section 1 &middot; Three Lochs Way
          </p>
        </div>
      </header>

      {/* ── THE LEAD ── */}
      <div className={`${SHEET} pb-10 pt-9`}>
        <p
          className="mx-auto max-w-[22ch] text-center text-[28px] leading-[1.1] tracking-tight sm:text-[36px]"
          style={SERIF}
        >
          Mist, beeches, and the whole loch beneath you.
        </p>
        <p className="mx-auto mt-4 max-w-[44ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
          Six and a half kilometres of the John Muir Way runs over the muir above us — the view
          the whole length of the loch to Ben Lomond, and minutes from our door.
        </p>
      </div>

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

          <p className="mt-5 font-mono text-[10px] uppercase leading-[1.9] tracking-[0.18em] text-record-muted">
            Photos <span className="px-1.5 text-record-ink/25">/</span> Gill
            <span className="px-1.5 text-record-ink/25">/</span> Film &middot; Ben Santiago
          </p>
        </PageBand>
      </div>

      {/* ── THE FILM ── */}
      <div className={`${SHEET} pb-10`}>
        <FrostFilm src={FILM} poster={MORNING[2].url} />
      </div>

      {/* ── THE MARKS ── */}
      <div className={`${SHEET} space-y-9 pb-12`}>
        {MARKS.map((mark) => (
          <PageBand
            key={mark.number}
            number={mark.number}
            label={mark.label}
            title={mark.title}
          >
            <div className="space-y-3">
              {mark.body.map((para) => (
                <p key={para} className={BODY} style={READING}>
                  {para}
                </p>
              ))}
            </div>
            {mark.source && (
              <p className="mx-auto mt-4 max-w-[40ch] font-mono text-[9.5px] uppercase leading-[1.9] tracking-[0.16em] text-record-muted">
                {mark.source}
              </p>
            )}
          </PageBand>
        ))}
      </div>

      {/* ── THE PLACES ── */}
      <section className="border-t border-record-ink/25 bg-record-bone">
        <div className={`${SHEET} pb-4 pt-8`}>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-record-muted">
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
              <figcaption className="mt-2 text-center text-[14px] leading-snug text-record-muted" style={READING}>
                {place.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── THE STAY ──
          What is actually up here, in short lines rather than a paragraph, and one way to
          book that pays nobody in the middle. */}
      <StayHere shareImage={MORNING[0].url} shareCredit="Gill" />

      {/* ── THE FOOT ── */}
      <footer className="border-t border-record-ink/25">
        <div className={`${SHEET} py-9`}>
          <p className="mx-auto max-w-[40ch] text-center text-[17px] leading-[1.6]" style={READING}>
            We are so lucky here. Can&rsquo;t quite believe we were given the chance.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-record-ink/20 pt-4">
            <Link to="/XEqualsX" className="font-mono text-[11px] tracking-[0.3em] text-record-mark">
              x = x
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">
              Film &middot; Ben Santiago <span className="px-1 text-record-ink/25">/</span> Photos &middot; Gill
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}