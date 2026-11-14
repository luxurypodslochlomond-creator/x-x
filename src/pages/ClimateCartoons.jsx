import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import CartoonMaker from '@/components/climate/cartoons/CartoonMaker';

// ── THE BIG PICTURE ───────────────────────────────────────────────────────────
// Janine, 13 November: "November 29 I host a workshop re cartoons for climate. Would you
// like to prepare space for cartoons?"
//
// This page was first built as a record page — headings, paragraphs, a quote block, an
// index of somebody else's series — and it read like a noticeboard about cartoons rather
// than a place to make one. It is a workshop now. The cartoon machine is the first thing
// on it and the only thing that needs explaining; everything else on the page is a wall,
// a thank-you, and one honest line.
//
// The name is The Big Picture because it means three things at once and none of them is
// borrowed: a cartoon is a big picture, the climate is the big picture, and a child
// drawing a whole world on one sheet is making one. It is deliberately not called What On
// Earth — that is CEEW's registered series and their registered mark, and a record whose
// whole method is "point at other people's work, never take it" cannot start by putting
// their name over its own door. Their series is named and linked below, and credited.

const reading = { fontFamily: 'var(--font-reading)' };

// CEEW's cartoon series: name, date, and the page they published it on. No words of theirs
// are reprinted here any more — a wall of quotes was the thing making this page feel like
// a report. Their series has its own door; this is the signpost to it.
const SERIES = [
  { name: 'Stacking Up Resilience', when: '2026', to: 'https://www.ceew.in/what-on-earth' },
  { name: 'The Energy Relay', when: '7 Oct 2026', to: 'https://www.ceew.in/what-on-earth/energy-relay' },
  { name: 'Love At First Light', when: '23 Sep 2026', to: 'https://www.ceew.in/what-on-earth/love-first-light' },
  { name: 'Revolution EV-olution!', when: '9 Sep 2026', to: 'https://www.ceew.in/what-on-earth/revolution-ev-olution' },
  { name: 'Rain Check!', when: '26 Aug 2026', to: 'https://www.ceew.in/what-on-earth/rain-check' },
  { name: 'Heat’s Got Nowhere to Hide!', when: '12 Aug 2026', to: 'https://www.ceew.in/what-on-earth/heats-got-nowhere-hide' },
  { name: 'Hidden in Plain Sight', when: '29 Jul 2026', to: 'https://www.ceew.in/what-on-earth/hidden-plain-sight' },
  { name: 'Making a World of Difference!', when: '6 May 2026', to: 'https://www.ceew.in/what-on-earth/making-world-difference' },
  { name: 'The Way to Live Longer!', when: '25 Mar 2026', to: 'https://www.ceew.in/what-on-earth/way-live-longer' },
  { name: 'A Tale of Two Cities', when: '11 Feb 2026', to: 'https://www.ceew.in/what-on-earth/tale-two-cities' },
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
      eyebrow="The record · the cartoon room"
      title="The Big Picture"
      statement="Three panels, a pen, and whatever you can see out of the window. Sign it and it goes on the wall."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Every cartoon carries the hand that made it, the place it came from and one line in the drawer’s own words. A person looks at each one before it goes up."
    >
      {/* ── THE MACHINE ────────────────────────────────────────────────────────── */}
      <CartoonMaker />

      {/* ── THE WALL ───────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-3 border-b-2 border-record-ink pb-1.5">
          <h2 className="text-[26px] leading-none lg:text-[32px]" style={{ fontFamily: 'var(--font-display)' }}>
            The wall
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">
            {loading ? 'looking' : `${wall.length} ${wall.length === 1 ? 'cartoon' : 'cartoons'}`}
          </span>
        </div>

        {!loading && !wall.length && (
          <div className="mt-4 border-2 border-dashed border-record-ink/30 p-6 text-center">
            <p className="text-[18px] leading-snug text-record-ink" style={reading}>
              Empty wall. Every cartoon on it started with one person and a pen.
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">
              Yours could be the first
            </p>
          </div>
        )}

        {wall.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {wall.map((cartoon, index) => (
              <div key={cartoon.id} className="shadow-[5px_5px_0_rgb(26_22_18)]" style={{ transform: `rotate(${index % 2 ? 0.5 : -0.5}deg)` }}>
                <CartoonPlate cartoon={cartoon} />
              </div>
            ))}
          </div>
        )}

        <CartoonsWaiting />
      </section>

      {/* ── THEIR WALL ─────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="border-b-2 border-record-ink pb-1.5">
          <h2 className="text-[26px] leading-none lg:text-[32px]" style={{ fontFamily: 'var(--font-display)' }}>
            What On Earth!®
          </h2>
        </div>
        <p className="mt-2 text-[14px] leading-[1.65] text-record-ink" style={reading}>
          Six years of climate cartoons from CEEW in New Delhi, drawn every fortnight. They put them on walls in cities,
          in exhibitions and murals — which is where this room got the idea. Go and see the real ones:
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {SERIES.map((item) => (
            <a
              key={item.name}
              href={item.to}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[74px] flex-col justify-between gap-2 border-2 border-record-ink/20 bg-record-bone p-2.5 transition-colors hover:border-record-ink active:translate-y-[1px]"
            >
              <span className="text-[13.5px] font-semibold leading-[1.25] text-record-ink group-hover:text-record-red" style={reading}>
                {item.name}
              </span>
              <span className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-record-muted">{item.when}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-record-muted group-hover:text-record-red" strokeWidth={2.2} />
              </span>
            </a>
          ))}
        </div>
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.09em] text-record-muted">
          © Council on Energy, Environment and Water, 2026 · their drawings stay theirs
        </p>
      </section>

      {/* ── PAPER ──────────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="border-b-2 border-record-ink pb-1.5">
          <h2 className="text-[22px] leading-none lg:text-[26px]" style={{ fontFamily: 'var(--font-display)' }}>
            Already drawn it on paper?
          </h2>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-[1.6] text-record-muted" style={reading}>
          Photograph it and bring it in.
        </p>
        <div className="mt-3">
          <CartoonSendIn />
        </div>
      </section>
    </ClimateRecordShell>
  );
}