import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import ImpactWorldMap from './ImpactWorldMap';

/* ── THE SIGNAL, SAID IN ONE BREATH ────────────────────────────────────────────────
   This band used to say three separate things in three separate blocks: a slogan, a
   numeral a hundred pixels tall, and three dead counters along the bottom that named
   numbers a reader had no reason to want. That is a poster shouting its own stats.

   It is one sentence now, and the sentence IS the wiring. Every figure in it is a door:
   press the reads and the map opens, press the places and the places open, press the
   entries and the record opens. A reader does not have to be told what the page counts —
   they can walk into any part of it from the middle of a line.

   The words are set in the reading voice and every number in the machine's mark, because
   on this record the numbers are facts and the sentences are the record speaking. That
   mix is the whole voice of the place, and it is cheaper and cooler than any six blocks
   of chrome.

   And the last clause is the honest one: "by nobody this record can name." There is no
   headcount here to be flattered by. If it ever reads as impressive, it is because
   something was actually read. */
function Tally({ children, href, to }) {
  const Comp = to ? Link : 'a';
  const where = to ? { to } : { href };
  return (
    <Comp
      {...where}
      className="font-mono font-black text-[#e2602a] underline decoration-[#e2602a]/40 decoration-2 underline-offset-[5px] hover:decoration-[#e2602a] active:decoration-[#efe7d6] transition-colors tabular-nums"
    >
      {children}
    </Comp>
  );
}

// One step of the chain. A label, the fact beneath it, and a wire to the next.
function Step({ to, href, label, value, line }) {
  const Comp = to ? Link : 'a';
  const where = to ? { to } : { href };
  return (
    <Comp
      {...where}
      className="group flex items-start gap-2.5 px-4 lg:px-5 py-4 hover:bg-[#efe7d6]/5 active:bg-[#e2602a]/10 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-[#efe7d6]/40">{label}</p>
        <p className="mt-1 font-black font-mono text-[#efe7d6] leading-none text-[15px] tabular-nums">{value}</p>
        <p className="mt-1.5 text-[10px] leading-snug text-[#efe7d6]/55" style={{ fontFamily: 'var(--font-reading)' }}>
          {line}
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 mt-1 text-[#efe7d6]/25 group-hover:text-[#e2602a] transition-colors flex-shrink-0" />
    </Comp>
  );
}

export default function ImpactSignal({ stats }) {
  const total = stats?.total_views || 0;
  const entries = stats?.published_entries || 0;
  const countryCount = (stats?.countries || []).length;
  const regionCount = (stats?.regions || []).length;
  const places = countryCount + regionCount;
  const storyCount = (stats?.top_stories || []).length;
  const actionCount = (stats?.upcoming_actions || []).length;

  return (
    <div className="relative overflow-hidden bg-[#241d16] border-b-4 border-b-[#e2602a]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-20 opacity-[0.12]">
        <svg width="380" height="380" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="6" fill="#efe7d6" />
          <circle cx="50" cy="50" r="22" stroke="#efe7d6" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="38" stroke="#efe7d6" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="48" stroke="#efe7d6" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 lg:px-8 pt-7 pb-6 lg:py-10 lg:grid lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12 lg:items-center">
        <div className="min-w-0">
          <p className="text-[8px] font-mono uppercase tracking-[0.24em] text-[#e2602a] mb-3">
            The signal · who read what
          </p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[#efe7d6] max-w-[26ch]"
            style={{
              fontFamily: 'var(--font-reading)',
              fontSize: 'clamp(21px, 5.2vw, 32px)',
              lineHeight: 1.34,
              letterSpacing: '-0.01em',
            }}
          >
            <Tally href="#reading-map">{total.toLocaleString()}</Tally> reads of{' '}
            <Tally to={createPageUrl('TogetherChangeClimate')}>{entries.toLocaleString()}</Tally> entries, from{' '}
            <Tally href={countryCount ? '#countries' : '#reading-map'}>{places.toLocaleString()}</Tally>{' '}
            {places === 1 ? 'place' : 'places'} — by nobody this record can name.
          </motion.p>

          {/* What the page is FOR, in the reader's terms rather than the record's. */}
          <p
            className="mt-4 text-[12px] lg:text-[13px] leading-[1.65] text-[#efe7d6]/60 max-w-[38ch]"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            Not a scoreboard. Which story reached which country, which readers put their own name to
            their nation, and what is happening on the ground next — all of it counted once, none of it
            bought, and not one reader named.
          </p>
        </div>

        {/* The planet. On a phone it stands under the sentence; on a desktop beside it,
            because the count of reads and the world those reads came from are one fact. */}
        <div id="reading-map" className="mt-6 lg:mt-0 min-w-0 scroll-mt-16">
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
            Each dot is a place reads came from: a country from the connection, or a nation a reader named
            for themselves. Never a person, never anybody's location — no IP is stored.
          </p>
        </div>
      </div>

      {/* ── THE CHAIN ──
          The three things this page knows, in the order a curious reader wants them, each
          one a door into the section that proves it. This is what replaced three dead
          counters: the same three numbers, wired to what they mean. */}
      <div className="relative mx-auto max-w-[1100px] grid grid-cols-1 sm:grid-cols-3 border-t border-[#efe7d6]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#efe7d6]/15">
        <Step
          href={countryCount || regionCount ? '#countries' : '#reading-map'}
          label="Who is reading"
          value={`${places.toLocaleString()} ${places === 1 ? 'place' : 'places'}`}
          line={regionCount ? `${countryCount} by connection · ${regionCount} named by the reader` : 'Where the connection came from'}
        />
        <Step
          href="#reading"
          label="What reached them"
          value={`${storyCount.toLocaleString()} ${storyCount === 1 ? 'story' : 'stories'}`}
          line="The entries the world reached for, and how far each one travelled"
        />
        <Step
          href="#acting"
          label="What is being done"
          value={`${actionCount.toLocaleString()} ${actionCount === 1 ? 'action' : 'actions'}`}
          line="Cleanups, plantings and meetings already on the record, soonest first"
        />
      </div>

      {/* Said plainly, so nobody reading a funder's page has to guess what is counted. */}
      <p className="relative mx-auto max-w-[1100px] px-5 lg:px-8 py-3 text-[8px] font-mono text-[#efe7d6]/40 leading-relaxed border-t border-[#efe7d6]/10">
        Reads, never people: one person reading thirty entries is thirty reads. Entries listed = the
        solutions, the crises and the actions; the wire, the gatherings and the music stand on the record
        too and are not in this count. A place is counted once per entry per half hour.
      </p>
    </div>
  );
}