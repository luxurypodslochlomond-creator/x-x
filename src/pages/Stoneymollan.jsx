import React from 'react';
import { Link } from 'react-router-dom';
import FrostFilm from '@/components/stoneymollan/FrostFilm';

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

const FILM =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/6fc9cc3fc_stoneymollan-ben.mov';

/* Gill's morning, 11 November — frost on the muir before the sun was up. */
const MORNING = [
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/9f0ca0c7a_stoneymollan-path.jpeg',
    caption: 'The path, first frost',
    line: 'A worn way through the whin. The bearers walked this way on mornings like this one.',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/e5be7e8c5_stoneymollan-bench.png',
    caption: 'The bench',
    line: 'Mist so low you could hear the hill before you saw it.',
  },
  {
    url: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/f84d01fa3_stoneymollan-sunrise.png',
    caption: 'Sunrise over the Clyde',
    line: 'East to west is the way the dead were carried. The light does it the other way round.',
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
      {/* ── THE MASTHEAD ── */}
      <header className="relative z-10 border-b border-record-ink/15">
        <div className="mx-auto max-w-3xl px-5 pb-9 pt-11 md:pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-record-muted">
            Balloch &rarr; Cardross &middot; 6.75 km &middot; coffin road
          </p>
          <h1
            className="mt-4 text-[clamp(2.7rem,13vw,5.2rem)] font-black leading-[0.9] tracking-tight"
            style={SERIF}
          >
            Stoneymollan
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed" style={READING}>
            A road people have been carrying their dead along for centuries. Six and a half
            kilometres of it runs over the muir above us &mdash; minutes from our door.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-record-signal">
            John Muir Way &middot; Section 1 &nbsp;·&nbsp; Three Lochs Way
          </p>
        </div>
      </header>

      {/* ── THE MORNING ── */}
      <section className="relative z-10 border-b border-record-ink/15 bg-record-bone">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.34em] text-record-muted">
              The morning
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-muted">
              11 November
            </p>
          </div>

          <figure className="mt-4">
            <img
              src={MORNING[0].url}
              alt={MORNING[0].caption}
              className="w-full border border-record-ink/15 object-cover"
              style={{ aspectRatio: '4 / 3' }}
            />
            <figcaption className="mt-3">
              <p className="text-[16px] leading-snug" style={SERIF}>
                {MORNING[0].caption}
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-record-muted" style={READING}>
                {MORNING[0].line}
              </p>
            </figcaption>
          </figure>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {MORNING.slice(1).map((shot) => (
              <figure key={shot.url}>
                <img
                  src={shot.url}
                  alt={shot.caption}
                  className="w-full border border-record-ink/15 object-cover"
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

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-record-muted">
            Photos &middot; Gill
          </p>
        </div>
      </section>

      {/* ── THE FILM ── */}
      <div className="relative z-10">
        <FrostFilm src={FILM} poster={MORNING[2].url} />
      </div>

      {/* ── THE MARKS ── */}
      <section className="relative z-10 border-t border-record-ink/15">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.34em] text-record-muted">
            What the road is
          </h2>

          <div className="mt-6 space-y-8">
            {MARKS.map((mark) => (
              <article key={mark.number} className="border-t border-record-ink/15 pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-record-signal">
                    {mark.number}
                  </span>
                  <h3 className="text-[22px] font-black leading-tight tracking-tight" style={SERIF}>
                    {mark.title}
                  </h3>
                </div>
                <div className="mt-3 space-y-3">
                  {mark.body.map((para) => (
                    <p key={para} className="text-[16px] leading-[1.65]" style={READING}>
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PLACES ── */}
      <section className="relative z-10 border-t border-record-ink/15 bg-record-bone">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.34em] text-record-muted">
            The places
          </h2>
        </div>
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {PLACES.map((place) => (
            <figure key={place.url} className="w-56 flex-shrink-0 snap-start">
              <img
                src={place.url}
                alt={place.caption}
                loading="lazy"
                className="w-full border border-record-ink/15 object-cover"
                style={{ aspectRatio: '4 / 5' }}
              />
              <figcaption
                className="mt-2 text-[14px] leading-snug text-record-muted"
                style={READING}
              >
                {place.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── THE FOOT ── */}
      <footer className="relative z-10 border-t border-record-ink/15">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <p className="text-[17px] leading-relaxed" style={READING}>
            We are so lucky here. Can&rsquo;t quite believe we were given the chance.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-record-muted">
            Film &middot; Ben Santiago &nbsp;·&nbsp; Photos &middot; Gill
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://www.overlochlomond.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-record-signal underline decoration-record-signal/30 underline-offset-4 hover:decoration-record-signal"
            >
              overlochlomond.com
            </a>
            <Link
              to="/XEqualsX"
              className="font-mono text-[11px] tracking-[0.3em] text-record-mark"
            >
              x = x
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}