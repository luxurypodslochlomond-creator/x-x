import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// ── HER TILE ────────────────────────────────────────────────────────────────────
// On the festival's own flyer, Janine's session is the third of five boxes: a maroon
// panel with a long academic title on it, and easy to scroll past. This is that box with
// room to breathe — and the same maroon, so anyone holding the flyer knows which one it is.
//
// The festival's wording stays on the tile, quoted and attributed, because the title is
// theirs and she is on their programme. What leads instead is the thing the hour does.
//
// THE DRAWING IS POINTED AT, NOT TAKEN. The Energy Relay is CEEW's, made by Riddhima
// Sethi, and the record's whole argument is that other people's work is not ours to spend
// on our own page. It is linked to the address CEEW published it at. If they ever give it
// to the record, it goes on the wall properly, with the same credit it has here.
//
// Read across a room, this tile opens into two columns, because a maroon band a thousand
// pixels wide with one column of text in it is a slide, and this page is not a slide.

const FESTIVAL_TITLE = 'Climate change & the power of collective actions / creative interventions';
const ENERGY_RELAY = 'https://www.ceew.in/what-on-earth/energy-relay';
const PAPER = '#f4efe4';
const SUN = '#ffd447';

const Row = ({ term, children }) => (
  <div className="border-t border-[#f4efe4]/25 pt-2.5">
    <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: PAPER, opacity: 0.7 }}>{term}</dt>
    <dd className="mt-1 text-[12.5px] leading-relaxed lg:text-[13.5px]" style={{ color: PAPER }}>{children}</dd>
  </div>
);

export default function JanineSessionTile() {
  return (
    <section className="mt-5" style={{ background: '#922b21', color: PAPER }}>
      <div className="px-4 py-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-7">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: SUN }}>
            03 · Janine Selendy’s session · the festival’s third feature
          </p>

          <h2 className="mt-2 text-[25px] leading-[1.14] lg:text-[36px]" style={{ fontFamily: 'var(--font-reading)' }}>
            Draw the panel that isn’t there yet.
          </h2>

          <p className="mt-3 font-mono text-[12px] font-black uppercase tracking-wide">Janine M. H. Selendy</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: PAPER, opacity: 0.75 }}>
            Founder, Horizon International at Yale University
          </p>

          <p className="mt-4 border-t-2 pt-3 text-[13.5px] leading-relaxed lg:text-[15px]" style={{ borderColor: SUN }}>
            One frame, no words. Then a record that keeps it, with the name of the hand that drew it and nothing else
            about them.
          </p>
        </div>

        <dl className="mt-4 space-y-2.5 lg:mt-0">
          <Row term="The festival calls it">
            “{FESTIVAL_TITLE}” — a virtual workshop, led by Janine, on their programme in her own name.
          </Row>
          <Row term="When">
            Sunday 29 November 2026, online. She has now given the hour herself: <strong>9am EST · 2pm UK · 3pm West
            Africa</strong>. She forwarded the Trebuchet Academy’s invitation to the fellows on 26 November, and her
            9am EST is the same moment the festival’s printed programme gives as 3pm West Africa — so the two sources
            agree, and neither is standing in for the other. The same hour in your own clock is above this tile.
          </Row>
          <Row term="Already going round, with her invitation">
            <em>The Energy Relay</em> — a runner with a smokestack for a head passing the baton to a solar panel,
            both in India jerseys. Riddhima Sethi, © Council on Energy, Environment and Water, 2026.{' '}
            <a
              href={ENERGY_RELAY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4"
              style={{ color: SUN }}
            >
              See it at CEEW <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="mt-1 block text-[11.5px] opacity-75">
              Linked, not copied. Their drawing stays theirs.
            </span>
          </Row>
        </dl>
      </div>
    </section>
  );
}