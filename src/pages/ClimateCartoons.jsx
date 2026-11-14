import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import DrawPad from '@/components/climate/cartoons/DrawPad';

// ── THE BIG PICTURE ───────────────────────────────────────────────────────────
// Janine, 13 November: "November 29 I host a workshop re cartoons for climate. Would you
// like to prepare space for cartoons?"
//
// The room is called The Big Picture, and it is called that on purpose. It is what a
// cartoon is, it is what the climate is, and it is what a nine-year-old is doing when she
// draws a whole world in one square of paper — three meanings, one plain phrase, no jargon
// and nothing borrowed. It is deliberately not called What On Earth: that is CEEW's
// registered series and their registered mark, and a record whose entire method is "point
// at other people's work, never take it" cannot start by putting their name over its door.
// Their series is named, quoted, credited and linked on this page instead.
//
// The page is built the way a wall is built rather than the way a report is built: the pad
// is the first thing on it, because the one thing a child will do is touch it.

const reading = { fontFamily: 'var(--font-reading)' };

// CEEW's series, as they published it. Titles, dates and quoted words are theirs; every
// row opens at the page CEEW published the drawing on. Nothing here is copied in.
const SERIES = [
  {
    name: 'The Energy Relay',
    when: '7 October 2026',
    said: '“Let the baton pass! India’s been showing the world how it’s done at the Asian Games—and in the energy transition, too!”',
    to: 'https://www.ceew.in/what-on-earth/energy-relay',
  },
  {
    name: 'Love At First Light',
    when: '23 September 2026',
    said: '“The days grow short, yet lo! The bill grows shorter still.”',
    to: 'https://www.ceew.in/what-on-earth/love-first-light',
  },
  {
    name: 'Revolution EV-olution!',
    when: '9 September 2026',
    said: 'On World EV Day — India’s EV-olution on the streets, autos and buses plugging into a cleaner commute.',
    to: 'https://www.ceew.in/what-on-earth/revolution-ev-olution',
  },
  {
    name: 'Rain Check!',
    when: '26 August 2026',
    said: 'Rain overwhelming city drains on the daily odyssey — and city climate plans keeping people safe in it.',
    to: 'https://www.ceew.in/what-on-earth/rain-check',
  },
  {
    name: 'Heat’s Got Nowhere to Hide!',
    when: '12 August 2026',
    said: '“heat resilience is finally HAP-pening!” — cooling shelters, humid-heat alerts, greener streets.',
    to: 'https://www.ceew.in/what-on-earth/heats-got-nowhere-hide',
  },
  {
    name: 'Hidden in Plain Sight',
    when: '29 July 2026',
    said: '“some of our most valuable water is actually green! Hidden in soils and plants.” The series turned six that day.',
    to: 'https://www.ceew.in/what-on-earth/hidden-plain-sight',
  },
  {
    name: 'Making a World of Difference!',
    when: '6 May 2026',
    said: '“a century of Sir David Attenborough, and a planet that’s finally getting its act together!”',
    to: 'https://www.ceew.in/what-on-earth/making-world-difference',
  },
  {
    name: 'The Way to Live Longer!',
    when: '25 March 2026',
    said: '“take the turn towards fewer fumes, more futures!”',
    to: 'https://www.ceew.in/what-on-earth/way-live-longer',
  },
  {
    name: 'A Tale of Two Cities',
    when: '11 February 2026',
    said: 'Newer cities taking “the road less travelled by”.',
    to: 'https://www.ceew.in/what-on-earth/tale-two-cities',
  },
  {
    name: 'Stacking Up Resilience',
    when: '2026',
    said: 'The newest drawings in the series.',
    to: 'https://www.ceew.in/what-on-earth',
  },
];

const PROMISES = [
  { dot: 'bg-record-red', words: 'Your name on it' },
  { dot: 'bg-record-signal', words: 'Where it came from' },
  { dot: 'bg-record-ocean', words: 'One line from you' },
  { dot: 'bg-record-light-signal', words: 'Any language' },
];

export default function ClimateCartoons() {
  const [wall, setWall] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateCartoon
      .filter({ status: 'published' }, { sort: '-created_date', limit: 30 })
      .then((page) => { if (live) setWall(page?.items || []); })
      .catch(() => { if (live) setWall([]); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, []);

  return (
    <ClimateRecordShell
      eyebrow="The record · a room for drawings"
      title="The Big Picture"
      statement="One drawing can put the whole world in a child’s hand. This is the wall the record keeps for them — and the pen is on the page."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Every drawing here carries the hand that made it, the place it came from, and one line in the drawer’s own words. Nothing on this page is copied from anyone: drawings the record was not given are named, quoted, credited and pointed at."
    >
      {/* ── THE PROMISE, AS FOUR COLOURED DOTS ───────────────────────────────
          The rules of the room used to be three paragraphs of prose, which is a rulebook,
          not an invitation. They are four dots and four phrases now: readable in a second,
          and the same promise the rest of the page keeps. */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-y border-record-ink/15 py-2.5">
        {PROMISES.map((item) => (
          <span key={item.words} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} aria-hidden="true" />
            <span className="text-[12.5px] text-record-ink" style={reading}>{item.words}</span>
          </span>
        ))}
      </div>

      {/* ── THE PAD, FIRST ─────────────────────────────────────────────────── */}
      <section className="mt-5">
        <DrawPad />
      </section>

      {/* ── THEIR WALL ─────────────────────────────────────────────────────── */}
      <section className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-red">The wall that started this one</p>
        <h2 className="mt-1 text-[24px] leading-[1.1] lg:text-[30px]" style={{ fontFamily: 'var(--font-display)' }}>
          What On Earth!®
        </h2>
        <p className="mt-2 text-[14.5px] leading-[1.7] text-record-ink" style={reading}>
          Six years of cartoons from the Council on Energy, Environment and Water — CEEW — in New Delhi. Their words:{' '}
          <em>“a cartoon series on sustainability, on how we are treating the planet and how the planet is treating us
          back”</em>, every fortnight and on special days, <em>“with a point or a counterpoint to ponder and share.”</em>
        </p>
        <p className="mt-2 text-[14px] leading-[1.7] text-record-muted" style={reading}>
          Papers about power grids get read by people who already work on power grids. A fortnightly cartoon gets read by
          everybody else — and CEEW does not stop at the screen. They take the drawings out into cities, onto walls, into
          exhibitions and murals. That is this room’s cue: a wall, and a child holding the pencil.
        </p>

        <div className="mt-4 divide-y divide-record-ink/12 border-y border-record-ink/20">
          {SERIES.map((item, index) => (
            <a
              key={item.name}
              href={item.to}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 py-3"
            >
              <span className="mt-[3px] w-5 shrink-0 font-mono text-[11px] text-record-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight text-record-ink group-hover:text-record-red" style={reading}>
                  {item.name}
                </p>
                <p className="mt-1 text-[13px] leading-[1.55] text-record-muted" style={reading}>{item.said}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 pt-[2px]">
                <ArrowUpRight className="h-4 w-4 text-record-muted group-hover:text-record-red" strokeWidth={1.8} />
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-record-muted">{item.when}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-record-muted">
          © Council on Energy, Environment and Water, 2026 · titles and words quoted from ceew.in · drawings belong to them
        </p>
      </section>

      {/* ── THE WALL ───────────────────────────────────────────────────────── */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-3 border-b border-record-ink/20 pb-2">
          <h2 className="text-[24px] leading-[1.1] lg:text-[30px]" style={{ fontFamily: 'var(--font-display)' }}>
            Our wall
          </h2>
          {wall.length > 0 && (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-record-muted">
              {wall.length} {wall.length === 1 ? 'drawing' : 'drawings'}
            </span>
          )}
        </div>

        {loading && <p className="mt-3 text-[13px] text-record-muted" style={reading}>Looking at the wall…</p>}

        {!loading && !wall.length && (
          <div className="mt-3 border-2 border-dashed border-record-ink/30 bg-record-bone/40 p-5 text-center">
            <p className="text-[17px] leading-[1.35] text-record-ink" style={reading}>
              Nothing on the wall yet. Every drawing here starts with one person and a pencil.
            </p>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-record-muted" style={reading}>
              The first ones go up on the twenty-ninth, when a keeper has looked at them. Yours could be the first.
            </p>
          </div>
        )}

        {wall.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {wall.map((cartoon, index) => (
              <div key={cartoon.id} style={{ transform: `rotate(${index % 2 ? 0.6 : -0.6}deg)` }}>
                <CartoonPlate cartoon={cartoon} />
              </div>
            ))}
          </div>
        )}

        <CartoonsWaiting />
      </section>

      {/* ── ANOTHER WAY IN ─────────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="text-[20px] leading-[1.15] lg:text-[24px]" style={{ fontFamily: 'var(--font-display)' }}>
          Already drawn it on paper?
        </h2>
        <p className="mt-1 text-[13.5px] leading-[1.65] text-record-muted" style={reading}>
          Photograph it and bring it in — a school drawing, a class mural, a cartoon from a series that has been going
          longer than this page.
        </p>
        <div className="mt-3">
          <CartoonSendIn />
        </div>
      </section>

      {/* ── THE HONEST FOOT ────────────────────────────────────────────────── */}
      <section className="mt-9 border-t border-record-ink/15 pt-4">
        <p className="text-[13px] leading-[1.7] text-record-muted" style={reading}>
          A person looks at every drawing before it goes up, because a picture cannot be sourced by a machine. Nothing
          on this wall is judged, ranked, liked or counted — a drawing is not a competition, and the record does not
          turn children into a leaderboard. Every word here reads in whatever language a reader names, from the
          record’s own bar at the top.
        </p>
        <p className="mt-2 font-mono text-[10.5px] leading-[1.7] text-record-muted">
          Janine Selendy hosts the workshop on 29 November 2026 · three in the afternoon in West Central Africa, two in
          Scotland · joining details come from her and are not printed here
        </p>
      </section>
    </ClimateRecordShell>
  );
}