import React from 'react';
import { Link } from 'react-router-dom';
import RecordRule from '@/components/climate/RecordRule';
import PageBand from '@/components/stoneymollan/PageBand';
import FrostFilm from '@/components/stoneymollan/FrostFilm';

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

/* One sheet, hanging off the page's left edge — not floating in the middle of it.
   On a phone that is the full glass; on a desk it stays where the margin puts it. */
const SHEET = 'w-full max-w-[900px] px-5 lg:px-8';

const FILM =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/6fc9cc3fc_stoneymollan-ben.mov';

/* Gill's morning, 11 November — first frost, before the sun was properly up. */
const MORNING = [
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/9f0ca0c7a_stoneymollan-path.jpeg',
    caption: 'The path, first frost',
    line: 'Frost on the stone. The bearers walked this way on mornings like this one.',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/e5be7e8c5_stoneymollan-bench.png',
    caption: 'The bench',
    line: 'Mist so low you could hear the hill before you saw it.',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/f84d01fa3_stoneymollan-sunrise.png',
    caption: 'First light',
    line: 'Mist on the water, frost underfoot — a morning that shows you why nobody hurried a coffin over this hill.',
  },
];

const MARKS = [
  {
    number: '01',
    title: 'The road of the dead',
    body: [
      'They carried them from Balloch, over the muir, down to the clachan of Kirkton and St Mahew’s Chapel at Cardross. Just under seven kilometres, on foot, with a coffin.',
      'Feet first, so the spirit could not turn back for home. The coffin was never allowed to touch the ground. Streams cross the route the whole way along, because running water was said to stop a spirit following.',
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
    title: 'The King died in the parish',
    body: [
      'Robert the Bruce died at his manor of Cardross on 7 June 1329. The road of the dead ends in that same parish.',
      'Historians still argue about exactly where the manor stood. The parish they do not argue about.',
    ],
  },
  {
    number: '04',
    title: 'Bandit country',
    body: [
      'Rob Roy MacGregor drove cattle across these hills three hundred years ago, and lifted them. He was out in the Fifteen, and he fought at Sheriffmuir in 1715.',
      'A road empty of everything except the dead is a useful road in the dark, when you are moving something that is not yours.',
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
];

const PLACES = [
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bbf887cc6_IMG_8405.png', caption: 'Home, standing in the muir' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b78d8da95_image.jpg', caption: 'The resting stone' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bf4016447_image.jpg', caption: 'Gill and Bunny on the muir' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/91e4d7d1e_image.jpg', caption: 'The wild moorland' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/040ae5497_image.jpg', caption: 'Walking the old way' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/6cf600d78_image.jpg', caption: 'The coffin road' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d2ad7a1a0_image.jpg', caption: 'Ancient beech' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/7e35c473e_image.jpg', caption: 'Forest spirit' },
  { url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/47dc2b93d_image.jpg', caption: 'Cathedral of trees' },
];

export default function Stoneymollan() {
  return (
    <div className="relative min-h-screen bg-record-paper text-record-ink twcc-scanlines">
      {/* ── THE MASTHEAD ──
          The record's own top: a bar of the mark's red, then the name on the left
          with its little square, ruled under by a hand-drawn line, then the fact
          line. Nothing centred, nothing floating — the page hangs off this edge. */}
      <header className="relative z-10">
        <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
        <div className={`${SHEET} pt-4`}>
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex min-w-0 items-baseline gap-2">
              <span
                aria-hidden="true"
                className="block h-[7px] w-[7px] shrink-0 -translate-y-[3px] bg-record-mark"
              />
              <h1
                className="text-[26px] leading-[1.02] tracking-tight sm:text-[34px]"
                style={SERIF}
              >
                Stoneymollan
              </h1>
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-record-muted sm:text-[10px]">
              Over Loch Lomond
            </p>
          </div>
          <RecordRule />
          <p className="mt-2 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-record-muted">
            Balloch &rarr; Cardross &middot; 6.75 km &middot; coffin road
          </p>
          <p className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-record-signal">
            John Muir Way, Section 1 &middot; Three Lochs Way
          </p>
        </div>
      </header>

      {/* ── THE LEAD ── */}
      <div className={`${SHEET} pb-9 pt-8`}>
        <p
          className="max-w-[30ch] text-[27px] leading-[1.1] tracking-tight sm:text-[34px]"
          style={SERIF}
        >
          A road people have carried their dead along for centuries.
        </p>
        <p className="mt-4 max-w-[54ch] text-[16.5px] leading-[1.65]" style={READING}>
          Six and a half kilometres of it runs over the muir above us. It is minutes from our
          door.
        </p>
      </div>

      {/* ── THE MORNING ── */}
      <div className={`${SHEET} pb-10`}>
        <PageBand label="The morning · 11 November · first frost">
          <figure>
            <img
              src={MORNING[0].url}
              alt={MORNING[0].caption}
              className="w-full border border-record-ink/20 object-cover"
              style={{ aspectRatio: '4 / 3' }}
            />
            <figcaption className="mt-3">
              <p className="text-[17px] leading-snug" style={SERIF}>
                {MORNING[0].caption}
              </p>
              <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-record-muted" style={READING}>
                {MORNING[0].line}
              </p>
            </figcaption>
          </figure>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {MORNING.slice(1).map((shot) => (
              <figure key={shot.url}>
                <img
                  src={shot.url}
                  alt={shot.caption}
                  className="w-full border border-record-ink/20 object-cover"
                  style={{ aspectRatio: '3 / 4' }}
                />
                <figcaption className="mt-2">
                  <p className="text-[15px] leading-snug" style={SERIF}>
                    {shot.caption}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-record-muted" style={READING}>
                    {shot.line}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
            Photos &middot; Gill &nbsp;·&nbsp; Film &middot; Ben Santiago
          </p>
        </PageBand>
      </div>

      {/* ── THE FILM ── */}
      <div className={`${SHEET} pb-10`}>
        <FrostFilm src={FILM} poster={MORNING[2].url} />
      </div>

      {/* ── THE MARKS ── */}
      <div className={`${SHEET} space-y-8 pb-12`}>
        {MARKS.map((mark, index) => (
          <PageBand
            key={mark.number}
            number={mark.number}
            label={index === 0 ? 'What the road is' : undefined}
            title={mark.title}
            first={index === 0}
          >
            <div className="space-y-3">
              {mark.body.map((para) => (
                <p key={para} className="max-w-[54ch] text-[16.5px] leading-[1.65]" style={READING}>
                  {para}
                </p>
              ))}
            </div>
          </PageBand>
        ))}
      </div>

      {/* ── THE PLACES ── */}
      <section className="border-t border-record-ink/25 bg-record-bone">
        <div className={`${SHEET} pb-4 pt-8`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-muted">
            The places
          </p>
        </div>
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pl-5 pr-5 pb-8"
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
              <figcaption className="mt-2 text-[14px] leading-snug text-record-muted" style={READING}>
                {place.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── US ──
          Not a booking panel and not a plug: the same left edge, the same rule, and
          the two honest ways to reach us. The address is literal — we answer it
          between ten and five, which is where the name comes from. */}
      <section className="border-t border-record-ink/25 bg-record-paper">
        <div className={`${SHEET} py-10`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-muted">
            Over Loch Lomond
          </p>
          <h2 className="mt-2 max-w-[26ch] text-[24px] leading-[1.14] tracking-tight" style={SERIF}>
            We keep the cabins at the foot of the hill this road runs over.
          </h2>
          <p className="mt-3 max-w-[54ch] text-[16.5px] leading-[1.65]" style={READING}>
            Come and walk it. We will tell you where to start, where the cross stone base lies,
            and which bit of the muir to be off before dark.
          </p>

          <div className="mt-6 flex flex-col items-start gap-2 border-t border-record-ink/20 pt-4">
            <a
              href="https://www.overlochlomond.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-record-signal underline decoration-record-signal/30 underline-offset-4 hover:decoration-record-signal"
            >
              overlochlomond.com
            </a>
            <a
              href="mailto:10-5@overlochlomond.com"
              className="font-mono text-[12px] tracking-[0.06em] text-record-ink underline decoration-record-ink/25 underline-offset-4 hover:decoration-record-ink"
            >
              10-5@overlochlomond.com
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">
              We answer between 10 and 5
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FOOT ── */}
      <footer className="border-t border-record-ink/25">
        <div className={`${SHEET} py-9`}>
          <p className="max-w-[54ch] text-[17px] leading-[1.6]" style={READING}>
            We are so lucky here. Can&rsquo;t quite believe we were given the chance.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-record-ink/20 pt-4">
            <Link to="/XEqualsX" className="font-mono text-[11px] tracking-[0.3em] text-record-mark">
              x = x
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">
              Film &middot; Ben Santiago &nbsp;·&nbsp; Photos &middot; Gill
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}