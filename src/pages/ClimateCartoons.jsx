import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';

// ── DRAWN51 ───────────────────────────────────────────────────────────────────
// Janine, 13 November: "November 29 I host a workshop re cartoons for climate. Would
// you like to prepare space for cartoons?" This is that space, built before the day so
// the day has somewhere to put what it makes.
//
// Three decisions were made in the building of it, and all three are said out loud on the
// page rather than left to look like accidents:
//
//   1. The room is not called What On Earth. That is CEEW's registered series name with a
//      registered mark beside it, and a record that borrowed it for its own front page
//      would be doing the exact thing it spends its whole method forbidding: taking
//      somebody else's work and putting its own name on the top. The series is named,
//      quoted and pointed at; the room has its own name.
//   2. Nothing goes on the wall on a machine's word. The machine writes one line about
//      what it can see, that line is offered to whoever holds the drawing to rewrite, and
//      a keeper has the last word.
//   3. CEEW's drawings are not copied. Each one is named, dated, quoted and linked to the
//      page CEEW published it on, which is how a drawing gets shown without being taken.

const reading = { fontFamily: 'var(--font-reading)' };

// CEEW's own series, as they published it. Titles, dates and the quoted words are theirs,
// taken from their pages; each row points at the page it came from, so a reader who wants
// the drawing itself gets it from the people who drew it.
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
    said: 'On World EV Day, India’s EV-olution on the streets — autos, buses and two-wheelers plugging into a cleaner commute.',
    to: 'https://www.ceew.in/what-on-earth/revolution-ev-olution',
  },
  {
    name: 'Rain Check!',
    when: '26 August 2026',
    said: 'Unpredictable rainfall overwhelming city drains — and City Climate Action Plans keeping people safe on the daily odyssey.',
    to: 'https://www.ceew.in/what-on-earth/rain-check',
  },
  {
    name: 'Heat’s Got Nowhere to Hide!',
    when: '12 August 2026',
    said: '“heat resilience is finally HAP-pening!” — cooling shelters, humid-heat alerts and urban greening.',
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
    when: 'the newest of them',
    said: 'The most recent drawing in the series.',
    to: 'https://www.ceew.in/what-on-earth/stacking-resilience',
  },
];

const CARRIES = [
  [
    'Who drew it',
    'A name on every drawing — the hand that made it, never the name of whoever happened to send it in.',
  ],
  [
    'Where it came from',
    'The workshop, the school, the group, the page it was first printed on. A drawing without its origin is a picture.',
  ],
  [
    'What it is for',
    'One line, in the drawer’s own words. The record does not write it for them, and does not correct it afterwards.',
  ],
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
      eyebrow="The record · drawings"
      title="DRAWN51 — cartoons for the climate"
      statement="A report gets filed and put down. A drawing gets carried home and pinned up, and somebody asks what it is about. This is the record’s room for the second kind."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="A drawing here carries who made it, where it came from, and one line on what it is for. Nothing on this page is copied from anyone: a drawing the record was not given is named, quoted and pointed at, never taken."
    >
      {/* ── THE DAY ─────────────────────────────────────────────────────────── */}
      <section className="border border-record-ink/20 bg-record-bone/60 p-4 lg:p-6">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-red">Sunday 29 November 2026</p>
        <p className="mt-2 text-[15px] leading-[1.65] text-record-ink" style={reading}>
          Janine Selendy hosts a workshop on cartoons for climate. Three in the afternoon in West Central Africa; two
          here in Scotland.
        </p>
        <p className="mt-2 text-[14px] leading-[1.65] text-record-muted" style={reading}>
          A group in India joins her on the call, carrying a drawing from their series. This page is the space she asked
          for — prepared before the day, so the day has somewhere to put what it makes.
        </p>
        <p className="mt-3 font-mono text-[10.5px] leading-[1.7] text-record-muted">
          Joining details come from Janine and are not printed here. A room with its link on the open internet is a room
          with the door propped.
        </p>
      </section>

      {/* ── WHY A DRAWING, AND WHY CHILDREN ─────────────────────────────────── */}
      <section className="mt-9">
        <h2 className="text-[21px] leading-[1.2] lg:text-[25px]" style={{ fontFamily: 'var(--font-display)' }}>
          Why a drawing reaches further than a report
        </h2>
        <p className="mt-2 text-[14px] leading-[1.7] text-record-ink" style={reading}>
          A report has to be read by the person who already agrees. A drawing goes round a classroom, gets stuck on a
          fridge, gets copied in a margin, and is understood by a nine-year-old in a glance and by an adult two days
          later. It is the only climate communication a child can make herself — and the only one that arrives at home
          without an adult having to decide to open it.
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-record-muted" style={reading}>
          That is this room’s argument, not anybody else’s. What follows is what the record can add to a drawing that
          already works.
        </p>
      </section>

      {/* ── THE SERIES, NAMED AND POINTED AT ────────────────────────────────── */}
      <section className="mt-9">
        <h2 className="text-[21px] leading-[1.2] lg:text-[25px]" style={{ fontFamily: 'var(--font-display)' }}>
          The series that is coming to the call
        </h2>
        <p className="mt-2 text-[14px] leading-[1.7] text-record-ink" style={reading}>
          <span className="font-semibold">What On Earth!®</span> is the cartoon series of the Council on Energy,
          Environment and Water — CEEW — in New Delhi. In their words, it is{' '}
          <em>“a cartoon series on sustainability, on how we are treating the planet and how the planet is treating us
          back”</em>, appearing fortnightly and on special days <em>“with a point or a counterpoint to ponder and
          share.”</em>
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-record-muted" style={reading}>
          They have been drawing it for six years, and the reason is not mysterious: a policy institute that publishes
          papers about power grids and cooling gets read by people who already work on power grids and cooling. A
          fortnightly cartoon is how the same institute gets read by everybody else. Their titles are below, exactly as
          they published them, and each one opens at CEEW — because the drawings are theirs, and this record points at
          work rather than lifting it.
        </p>

        <div className="mt-3 divide-y divide-record-ink/12 border-y border-record-ink/15">
          {SERIES.map((item) => (
            <a
              key={item.name}
              href={item.to}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-3 py-3"
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-tight text-record-ink" style={reading}>
                  {item.name}
                </p>
                <p className="mt-1 text-[13px] leading-[1.55] text-record-muted" style={reading}>{item.said}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-record-muted">{item.when}</p>
              </div>
              <ArrowUpRight
                className="mt-1 h-4 w-4 flex-shrink-0 text-record-muted group-hover:text-record-red"
                strokeWidth={1.8}
              />
            </a>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-record-muted">
          © Council on Energy, Environment and Water, 2026 · quoted from ceew.in
        </p>
      </section>

      {/* ── WHAT THE RECORD ADDS ────────────────────────────────────────────── */}
      <section className="mt-9">
        <h2 className="text-[21px] leading-[1.2] lg:text-[25px]" style={{ fontFamily: 'var(--font-display)' }}>
          What a drawing carries here
        </h2>
        <div className="mt-3 divide-y divide-record-ink/12 border-y border-record-ink/15">
          {CARRIES.map(([label, line], i) => (
            <div key={label} className="flex gap-3 py-3">
              <span className="mt-[3px] font-mono text-[10.5px] text-record-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-[14px] font-semibold leading-tight text-record-ink" style={reading}>{label}</p>
                <p className="mt-1 text-[13.5px] leading-[1.6] text-record-muted" style={reading}>{line}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[14px] leading-[1.7] text-record-ink" style={reading}>
          Then the record adds the one thing a drawing usually loses: it keeps its maker’s name attached for good, it
          reads in whatever tongue a reader names, and it stays here when the workshop is over — still credited, still
          pointing at its origin, still able to say where it came from a year later.
        </p>
      </section>

      {/* ── THE MACHINE, SAID HONESTLY ──────────────────────────────────────── */}
      <section className="mt-9">
        <h2 className="text-[21px] leading-[1.2] lg:text-[25px]" style={{ fontFamily: 'var(--font-display)' }}>
          The record reads the drawing
        </h2>
        <p className="mt-2 text-[14px] leading-[1.7] text-record-ink" style={reading}>
          Hold a drawing up to the call and the record will say, in one line, what it can see in it — then hand the
          sentence to whoever is holding the drawing to rewrite. It does not say whether a drawing is good, or right, or
          finished. Only what is visibly there: the figures, the objects, the words written in the corner.
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-record-muted" style={reading}>
          A machine’s reading is kept in the record apart from the drawer’s own words, and is never shown as though it
          were theirs. Every drawing waits for a person before it goes on the wall, because a picture cannot be sourced
          by a machine.
        </p>

        <div className="mt-4">
          <CartoonSendIn />
        </div>
      </section>

      {/* ── THE WALL ────────────────────────────────────────────────────────── */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-3 border-b border-record-ink/20 pb-2">
          <h2 className="text-[21px] leading-[1.2] lg:text-[25px]" style={{ fontFamily: 'var(--font-display)' }}>
            The wall
          </h2>
          {wall.length > 0 && (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-record-muted">
              {wall.length} {wall.length === 1 ? 'drawing' : 'drawings'}
            </span>
          )}
        </div>

        {loading && (
          <p className="mt-3 text-[13px] text-record-muted" style={reading}>Looking at the wall…</p>
        )}

        {!loading && !wall.length && (
          <div className="mt-3 border border-dashed border-record-ink/30 p-4">
            <p className="text-[14px] leading-[1.65] text-record-ink" style={reading}>
              The plates are empty. The first drawings arrive on the twenty-ninth, and each one goes up when a keeper has
              seen it.
            </p>
            <p className="mt-2 text-[13px] leading-[1.6] text-record-muted" style={reading}>
              Every line here is read in whatever tongue a reader names — the record’s own bar changes the voice of the
              whole room, not just the headings.
            </p>
          </div>
        )}

        {wall.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {wall.map((cartoon) => (
              <CartoonPlate key={cartoon.id} cartoon={cartoon} />
            ))}
          </div>
        )}

        <CartoonsWaiting />
      </section>
    </ClimateRecordShell>
  );
}