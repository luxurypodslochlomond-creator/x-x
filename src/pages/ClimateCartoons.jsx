import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';

// ── A ROOM FOR CARTOONS ───────────────────────────────────────────────────────
// Janine, 13 November: "November 29 I host a workshop re cartoons for climate. Would
// you like to prepare space for cartoons?" This is that space, built before the day so
// the day has somewhere to put what it makes.
//
// Two things were decided in the building of it, and both are said out loud on the page
// rather than left to look like an oversight:
//
//   1. CEEW's drawing is named, quoted and pointed at, and not copied. It was not given
//      to the record; it was sent to Janine. A drawing belongs to the hand that made it,
//      so the room shows the ones it is given and points at the ones it is not.
//   2. Nothing goes on the wall on a machine's word. The machine writes one line about
//      what it can see, that line is offered to the person holding the drawing to
//      rewrite, and a keeper has the last word.

const reading = { fontFamily: 'var(--font-reading)' };

const CARRIES = [
  [
    'Who drew it',
    'A name on every drawing — and the name of the hand that made it, never the name of whoever happened to send it in.',
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
      title="What On Earth — a room for cartoons"
      statement="A report gets filed and put down. A drawing gets carried home and pinned up. On the twenty-ninth of November the record opens a room for the second kind."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="A drawing on this page carries who made it, where it came from, and one line on what it is for. Nothing here is copied from anyone: a drawing the record was not given is named and pointed at, never taken."
    >
      {/* ── THE DAY ─────────────────────────────────────────────────────────── */}
      <section className="border border-record-ink/20 bg-record-bone/60 p-4 lg:p-6">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-red">Sunday 29 November 2026</p>
        <p className="mt-2 text-[15px] leading-[1.65] text-record-ink" style={reading}>
          Janine Selendy hosts a workshop on cartoons for climate. Three in the afternoon in West Central Africa; two
          here in Scotland.
        </p>
        <p className="mt-2 text-[14px] leading-[1.65] text-record-muted" style={reading}>
          A group in India joins her on the call, carrying a drawing from CEEW’s series. This page is the space she asked
          for — prepared before the day, so the day has somewhere to put what it makes.
        </p>
        <p className="mt-3 font-mono text-[10.5px] leading-[1.7] text-record-muted">
          Joining details come from Janine and are not printed here. A room with its link on the open internet is a room
          with the door propped.
        </p>
      </section>

      {/* ── THE FIRST DRAWING, POINTED AT RATHER THAN COPIED ────────────────── */}
      <section className="mt-9">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">The first drawing</p>
        <h2 className="mt-1 text-[25px] leading-[1.12] lg:text-[31px]" style={{ fontFamily: 'var(--font-display)' }}>
          The Energy Relay
        </h2>

        <blockquote
          className="mt-3 border-l-2 border-record-red/60 pl-3 text-[16px] leading-[1.6] text-record-ink lg:text-[18px]"
          style={reading}
        >
          “Let the baton pass! India’s been showing the world how it’s done at the Asian Games — and in the energy
          transition, too.”
        </blockquote>

        <p className="mt-3 text-[13.5px] leading-[1.65] text-record-muted" style={reading}>
          One of <span className="text-record-ink">What On Earth!®</span>, the climate cartoon series of the Council on
          Energy, Environment and Water — CEEW — in New Delhi.
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-record-muted">
          © Council on Energy, Environment and Water, 2026
        </p>
        <a
          href="https://www.ceew.in/what-on-earth/energy-relay"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-[13.5px] text-record-ink underline decoration-dotted underline-offset-2 hover:text-record-red"
          style={reading}
        >
          See the drawing at CEEW <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>

        <p className="mt-4 text-[14px] leading-[1.7] text-record-ink" style={reading}>
          It is not reproduced here, and that is the room’s rule rather than an accident. A drawing belongs to the hand
          that made it. So the record names it, quotes it and points at it — and the wall below holds only the drawings
          their makers gave us.
        </p>
      </section>

      {/* ── WHAT A DRAWING CARRIES ──────────────────────────────────────────── */}
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
          were theirs. And every drawing waits for a person before it goes on the wall, because a picture cannot be
          sourced by a machine.
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
              Every line on this page is read in whatever tongue a reader names — the record’s own bar changes the voice
              of the whole room, not just the headings.
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