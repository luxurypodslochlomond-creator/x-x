import React from 'react';
import { Globe, Eye, MapPin } from 'lucide-react';
import ImpactWorldMap from './ImpactWorldMap';

/* ── THE FRONTISPIECE ──────────────────────────────────────────────────────────────
   This band has been three things and the argument between them is worth keeping.

   First it was a slogan, a numeral a hundred pixels tall and three dead counters along
   the bottom that named numbers a reader had no reason to want. That was a poster
   shouting its own stats, and it was replaced by a sentence with every figure wired into
   it as a door — which was true, and busy, and read as a spreadsheet printed on a poster.
   Saying everything at once is not the same as saying it well.

   So it is a frontispiece now, the way a printed record opens: the count set as the plate
   of the page with the words that say what is being counted beneath it, the three facts a
   body actually asks for in a single hairline rule under that, and then the planet itself,
   mounted on paper and given the room the map was always owed. Nothing here is a
   dashboard. The number is the artwork, the map is the second plate, and every figure
   still opens the section that proves it.

   The count is set in the record's reading face — not the machine's mono, and not a size
   that performs — because on this page the reads are the record speaking, and the little
   mono captions are the machine keeping the books. That mix is the record's whole voice,
   and it is warmer and cooler than any amount of chrome. */
function Plate({ href, label, value, Icon }) {
  return (
    <a
      href={href}
      className="group flex flex-col justify-between px-3 py-3 lg:px-5 lg:py-4 hover:bg-[#efe7d6]/5 active:bg-[#e2602a]/10 transition-colors"
    >
      <span className="flex items-center gap-1.5 text-[7px] lg:text-[8px] font-mono uppercase tracking-[0.16em] text-[#efe7d6]/45">
        <Icon className="w-3 h-3 flex-shrink-0 group-hover:text-[#e2602a] transition-colors" />
        {label}
      </span>
      <span className="mt-2 font-black font-mono text-[#efe7d6] tabular-nums leading-none text-[20px] lg:text-[26px]">
        {value}
      </span>
    </a>
  );
}

export default function ImpactSignal({ stats }) {
  // A count that never arrived is printed as a dash, never as a zero. A zero is a fact about
  // the world — nobody has read this — and "we could not ask" is a fact about us. The two are
  // not the same thing and they are not allowed to look the same here.
  const num = (n) => (typeof n === 'number' && Number.isFinite(n) ? n.toLocaleString() : '—');
  const total = typeof stats?.total_views === 'number' ? stats.total_views : null;
  const entries = typeof stats?.published_entries === 'number' ? stats.published_entries : null;
  const countryCount = Array.isArray(stats?.countries) ? stats.countries.length : null;
  const regionCount = Array.isArray(stats?.regions) ? stats.regions.length : null;
  const places = countryCount == null || regionCount == null ? null : countryCount + regionCount;

  return (
    <div className="relative overflow-hidden bg-[#241d16] border-b-4 border-b-[#e2602a]">
      {/* The horizon: the same three rings the record uses for a signal, held very low so
          the plate has depth without one line of it competing with the number. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-24 opacity-[0.14]">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="6" fill="#efe7d6" />
          <circle cx="50" cy="50" r="22" stroke="#efe7d6" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="38" stroke="#efe7d6" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="48" stroke="#efe7d6" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 lg:px-8 pt-6 pb-7 lg:pt-9 lg:pb-9">
        {/* The plate's own head rule — a printed page says who it is before it says anything. */}
        <div className="flex items-baseline justify-between gap-4 border-b border-[#efe7d6]/20 pb-2.5">
          <p className="text-[8px] font-mono uppercase tracking-[0.26em] text-[#e2602a]">How far it has got</p>
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/40">The record of the time</p>
        </div>

        <h1
          className="mt-5 text-[#efe7d6] max-w-[20ch]"
          style={{
            fontFamily: 'var(--record-display)',
            fontSize: 'clamp(24px, 6.4vw, 38px)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          The record is being read.
        </h1>

        {/* THE NUMBER, with its caption. It opens the map, because the number and the
            world it came from are one fact and should never be read apart. */}
        <a href="#reading-map" className="mt-5 flex items-end gap-3 group w-fit">
          <span
            className="text-[#efe7d6] group-hover:text-[#e2602a] transition-colors tabular-nums"
            style={{
              fontFamily: 'var(--record-display)',
              fontSize: 'clamp(52px, 15vw, 86px)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            {num(total)}
          </span>
          <span className="pb-1 text-[8px] lg:text-[9px] font-mono uppercase tracking-[0.16em] text-[#efe7d6]/55 leading-[1.5]">
            reads
            <br />
            of these entries
          </span>
        </a>

        {/* One line, said quietly, that makes the number honest rather than impressive. */}
        <p
          className="mt-3.5 text-[11px] lg:text-[12.5px] leading-[1.6] text-[#efe7d6]/55 max-w-[44ch]"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          One opening is one read, counted once from each place — and not one reader named. A
          place is only counted when a reader's own device says where it is: the record cannot
          see you, and will not guess on your behalf.
        </p>

        {/* The three facts a body actually asks for: where, what, and who named themselves. */}
        <div className="mt-6 grid grid-cols-3 border-y border-[#efe7d6]/20 divide-x divide-[#efe7d6]/15">
          <Plate
            href={countryCount ? '#countries' : '#reading-map'}
            label="Countries"
            value={num(countryCount)}
            Icon={Globe}
          />
          <Plate
            href="#reading"
            label="Entries"
            value={num(entries)}
            Icon={Eye}
          />
          <Plate
            href={regionCount ? '#nations' : '#reading-map'}
            label="Nations"
            value={num(regionCount)}
            Icon={MapPin}
          />
        </div>

        {/* THE PLANET, mounted on paper — the second plate of the page and the one worth
            the most room on it. */}
        <div id="reading-map" className="mt-6 scroll-mt-16">
          <div className="flex items-center gap-2 mb-2.5">
            <Globe className="w-4 h-4 text-[#e2602a] flex-shrink-0" />
            <h2
              className="font-black uppercase text-[#efe7d6] leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '-0.01em' }}
            >
              Where the world is reading
            </h2>
            <div className="flex-1 h-px bg-[#efe7d6]/20" />
          </div>
          <ImpactWorldMap stats={stats} />
          <p className="mt-2.5 text-[9px] font-mono text-[#efe7d6]/45 leading-relaxed">
            Each dot is a place reads came from: a country from the connection, or a nation a reader named for
            themselves. Never a person, never anybody's location — no IP is stored.
          </p>
        </div>

        {/* Said plainly, so nobody reading a funder's page has to guess what is counted. */}
        <p className="mt-6 pt-3 border-t border-[#efe7d6]/10 text-[8px] font-mono text-[#efe7d6]/40 leading-relaxed">
          Reads, never people: one person reading thirty entries is thirty reads. Entries listed = the solutions,
          the crises and the actions; the wire, the gatherings and the music stand on the record too and are not in
          this count. A place is counted once per entry per half hour.
        </p>
      </div>
    </div>
  );
}