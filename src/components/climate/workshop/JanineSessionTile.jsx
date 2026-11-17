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

const FESTIVAL_TITLE = 'Climate change & the power of collective actions / creative interventions';
const ENERGY_RELAY = 'https://www.ceew.in/what-on-earth/energy-relay';
const PAPER = '#f4efe4';
const SUN = '#ffd447';

const Row = ({ term, children }) => (
  <div className="border-t border-[#f4efe4]/25 pt-2.5">
    <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: PAPER, opacity: 0.7 }}>{term}</dt>
    <dd className="mt-1 text-[12.5px] leading-relaxed" style={{ color: PAPER }}>{children}</dd>
  </div>
);

export default function JanineSessionTile() {
  return (
    <section className="mt-5" style={{ background: '#922b21', color: PAPER }}>
      <div className="px-4 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: SUN }}>
          03 · Her session · the festival’s third feature
        </p>

        <h2 className="mt-2 text-[25px] leading-[1.14]" style={{ fontFamily: 'var(--font-reading)' }}>
          One drawing is an opinion.<br />A room of them is a record.
        </h2>

        <p className="mt-3 font-mono text-[12px] font-black uppercase tracking-wide">Janine M. H. Selendy</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: PAPER, opacity: 0.75 }}>
          Founder, Horizon International at Yale University
        </p>

        <dl className="mt-4 space-y-2.5">
          <Row term="The festival calls it">
            “{FESTIVAL_TITLE}” — a virtual workshop, led by her, on their programme in her own name.
          </Row>
          <Row term="When">
            Sunday 29 November 2026, hybrid. Her hour’s own slot is hers to confirm and goes here the moment she says
            it — the festival’s own times, worked out in your clock, are just above this tile.
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

        <p className="mt-4 border-t-2 pt-3 text-[13.5px] leading-relaxed" style={{ borderColor: SUN }}>
          What she asks the room for: <strong>the panel that is not there yet</strong> — one frame, no words —
          and then a record that keeps it, with the name of the hand that drew it.
        </p>
      </div>
    </section>
  );
}