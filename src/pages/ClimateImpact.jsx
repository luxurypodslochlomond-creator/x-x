import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecordBack from '@/components/climate/useRecordBack';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Eye, Users, MapPin, Heart } from 'lucide-react';
import ClimateImpactMap from '@/components/climate/ClimateImpactMap';
import SignalBeacon from '@/components/climate/SignalBeacon';
import WorldReadingFeed from '@/components/climate/WorldReadingFeed';
import WorldActionFeed from '@/components/climate/WorldActionFeed';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';

// Converts an ISO 2-letter country code to a display name.
function countryName(code) {
  if (!code) return 'Unknown';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// Known ISO country names (lowercased) — so we can redirect readers who type a real country
// into the self-ID box instead of polluting the nations list.
const knownCountryNames = (() => {
  const set = new Set();
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        const code = String.fromCharCode(65 + i) + String.fromCharCode(65 + j);
        const name = names.of(code);
        if (name) set.add(name.toLowerCase());
      }
    }
  } catch {}
  return set;
})();

function isKnownCountryName(input) {
  if (!input) return false;
  return knownCountryNames.has(input.trim().toLowerCase());
}

// One of the three counts that hang off the bottom of the poster. A plate, not a row:
// the numeral is the thing, the label is a caption beneath it, and the whole plate is
// the way through to the breakdown.
function ImpactPlate({ icon: Icon, to, value, label, muted }) {
  // Two of these plates point at a section of this same page, one at another page. A router
  // Link to "#countries" is a route, not a jump: it changed the address and moved nobody, so a
  // reader pressed the number of countries and the page stood still. The ones that stay on this
  // page are real anchors now, and they scroll to what they name.
  const Comp = to.startsWith('#') ? 'a' : Link;
  const where = to.startsWith('#') ? { href: to } : { to };
  return (
    <Comp
      {...where}
      aria-label={`${value.toLocaleString()} ${label.toLowerCase()}, open the breakdown`}
      className={`flex flex-col items-center justify-center gap-1 px-1 py-4 border-r border-[#efe7d6]/15 last:border-r-0 active:bg-[#e2602a]/10 transition-colors ${muted ? 'opacity-35' : ''}`}
    >
      <Icon className="w-3.5 h-3.5 text-[#efe7d6]/50" />
      <span className="font-black font-mono text-[#efe7d6] leading-none" style={{ fontSize: '27px', letterSpacing: '-0.03em' }}>
        {value.toLocaleString()}
      </span>
      <span className="text-[7.5px] font-mono uppercase tracking-[0.12em] text-[#efe7d6]/40">{label}</span>
    </Comp>
  );
}

// ── THE BREAKDOWN, AS A LEDGER RATHER THAN A LIST ──
// Rows of name, number and bar read as a table, and a table on a phone is a column you
// scroll forever. These are plates instead: two across, the leading place given the full
// width and the biggest numeral, so the shape of the readership is legible before a word
// of it has been read.
function Ledger({ rows, tone, href, label }) {
  const accent = tone === 'red' ? 'text-[#b3261e]' : 'text-[#e2602a]';
  const bar = tone === 'red' ? 'bg-[#b3261e]' : 'bg-[#e2602a]';
  const top = rows[0]?.views || 1;

  return (
    <div className="grid grid-cols-2 gap-px bg-[#141210]/15 border border-[#141210]/15">
      {rows.map((row, i) => (
        <Link
          key={href(row)}
          to={href(row)}
          aria-label={`${label(row)}, ${row.views.toLocaleString()} reads, open the stories`}
          className={`relative flex flex-col justify-between bg-[#f7f1e5] active:bg-[#efe7d6] transition-colors p-3 ${i === 0 ? 'col-span-2' : ''}`}
        >
          {i === 0 && (
            <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 opacity-[0.12]">
              <SignalBeacon size={80} />
            </span>
          )}
          <span className="text-[8px] font-mono tracking-[0.2em] text-[#5a5246]/70">{String(i + 1).padStart(2, '0')}</span>
          <span className="relative mt-2 flex items-end justify-between gap-1.5">
            <span className={`font-mono font-bold text-[#141210] leading-[1.15] break-words ${i === 0 ? 'text-[15px]' : 'text-[11px]'}`}>{label(row)}</span>
            <span className={`font-black font-mono flex-shrink-0 ${accent} ${i === 0 ? 'text-[21px]' : 'text-[13px]'}`}>{row.views.toLocaleString()}</span>
          </span>
          <span className={`relative mt-2.5 block bg-[#141210]/10 ${i === 0 ? 'h-1.5' : 'h-1'}`}>
            <span className={`block h-full ${bar}`} style={{ width: `${Math.max(4, (row.views / top) * 100)}%` }} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ClimateImpact() {
  const back = useRecordBack();
  // Shares one read of the numbers with the record's impact strip: tapping through
  // from the record shows them at once, and the page refreshes them behind the scenes.
  const { data: stats, isPending, refetch } = useClimateImpactStats();
  const [readerRegion, setReaderRegion] = useState('');
  const [savedRegion, setSavedRegion] = useState(false);
  const [countryNotice, setCountryNotice] = useState(false);

  useEffect(() => {
    try { setReaderRegion(localStorage.getItem('climate51_reader_region') || ''); } catch {}
  }, []);

  const saveRegion = async () => {
    const trimmed = readerRegion.trim();
    try {
      if (trimmed) {
        if (isKnownCountryName(trimmed)) {
          setCountryNotice(true);
          setSavedRegion(false);
          return;
        }
        setCountryNotice(false);
        localStorage.setItem('climate51_reader_region', trimmed);
        setSavedRegion(true);
        setTimeout(() => setSavedRegion(false), 2000);
        // Register with the server immediately so the nation shows up right away
        try {
          await base44.functions.invoke('climateTrackView', {
            entry_id: 'region_self_id',
            entry_type: 'region_self_id',
            reader_region: trimmed,
          });
          // Refresh stats so the new nation appears
          refetch();
        } catch {}
      } else {
        localStorage.removeItem('climate51_reader_region');
      }
    } catch {}
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#efe7d6] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
        <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">Counting the planet…</p>
      </div>
    );
  }

  const total = stats?.total_views || 0;
  const countries = stats?.countries || [];
  const regions = stats?.regions || [];
  const entries = stats?.published_entries || 0;

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes impact-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes impact-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#241d16] border-b-2 border-[#e2602a]">
        <button onClick={back} aria-label="Back to the page I came from" className="w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-black uppercase text-[#efe7d6] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
            Global Impact
          </h1>
          <p className="text-[9px] font-mono text-[#e2602a] uppercase tracking-widest mt-0.5">The record of the time</p>
        </div>
      </div>

      {/* ── THE NUMBERS, AS A POSTER RATHER THAN A COLUMN ──
          This block was a centred stack: label, number, note, three counts, another note —
          five centred lines one under the other, and nothing on the page had a shape. A
          record of the planet's attention should look like one: the number runs off the
          right edge, the caveat runs up the side of it, the beacon sits behind it, and the
          three counts hang off the bottom as plates rather than sitting politely below. */}
      <div className="relative overflow-hidden bg-[#241d16]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 opacity-[0.14]">
          <SignalBeacon size={330} />
        </div>

        <div className="relative px-5 pt-7 pb-5 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#e2602a] leading-relaxed max-w-[200px]">
              Together we can change the course of climate change
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <a
                href="#reading-map"
                aria-label={`${total.toLocaleString()} reads, open the map of reads`}
                className="block mt-4 font-black text-[#e2602a] leading-[0.8] -ml-1"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(74px, 26vw, 128px)', letterSpacing: '-0.055em' }}
              >
                {total.toLocaleString()}
              </a>
              {/* "Reads of the record" claimed more than it counted: the number is reads of
                  the entries — solutions, crises and actions — and the wire, the gatherings
                  and the music are on the record without being in it. A number that describes
                  itself as bigger than it is does the record's honesty no favours. */}
              <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#efe7d6]/45 mt-2">
                Reads of these entries
              </p>
            </motion.div>
          </div>
          <p
            aria-hidden="true"
            className="flex-shrink-0 pt-1 text-[8px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/40 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            reads · never people
          </p>
        </div>

        <div className="relative grid grid-cols-3 border-t border-[#efe7d6]/15">
          <ImpactPlate icon={Globe} to={countries.length ? '#countries' : '#reading-map'} value={countries.length} label="Countries" />
          <ImpactPlate icon={Eye} to="/TogetherChangeClimate#record-entries" value={entries} label="Entries" />
          <ImpactPlate icon={MapPin} to={regions.length ? '#nations' : '#reading-map'} value={regions.length} label="Nations" muted={regions.length === 0} />
        </div>

        {/* The number was labelled "Entries", which read as everything on the record — it is
            not. Said plainly, so nobody reading a funder's page has to guess what it covers. */}
        <p className="relative px-5 py-3 text-[8px] font-mono text-[#efe7d6]/40 leading-relaxed border-t border-[#efe7d6]/10">
          Entries listed = the solutions, the crises and the actions. The wire, the gatherings and the music stand on the record too, and are not part of this count. A place is counted once per entry per half hour.
        </p>
      </div>

      {/* ── THE PLANET, EDGE TO EDGE ──
          It sat in the same padded column as the paragraphs, so the one whole-world thing on
          the page was the width of a column of text. It now runs the full glass and meets the
          dark block above it at a signal rule, so the page interlocks instead of stacking. */}
      <div id="reading-map" className="relative z-10 bg-[#efe7d6] border-t-4 border-t-[#e2602a]">
        <div className="flex items-center gap-2 px-5 pt-6 pb-3">
          <Globe className="w-4 h-4 text-[#b3261e] flex-shrink-0" />
          <h2 className="font-black uppercase text-[#141210] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
            Where the world is reading
          </h2>
          <div className="flex-1 h-px bg-[#141210]/20" />
        </div>
        <div className="overflow-hidden border-y-2 border-[#141210]/20">
          <ClimateImpactMap stats={stats} />
        </div>
        <p className="px-5 pt-3 pb-1 text-[9px] font-mono text-[#5a5246] leading-relaxed max-w-[720px]">
          Every dot is a place reads came from — not a person, and not anybody's location: red is a country (from geo, no IP stored), blue a self-identified nation with no country code of its own. Dot size is how many reads were counted there. The planet, lighting up — honestly.
        </p>
      </div>

      {/* The world is reading — which stories are reaching the most nations */}
      <WorldReadingFeed stories={stats?.top_stories || []} />

      {/* The world is acting — what's happening next on the ground */}
      <WorldActionFeed actions={stats?.upcoming_actions || []} />

      {/* Self-identification — "Where are you reading from?" */}
      <div className="px-5 py-6 bg-[#f7f1e5] border-b border-[#141210]/10">
        <div className="flex items-start gap-2.5 mb-3">
          <Heart className="w-4 h-4 text-[#b3261e] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-bold text-[#141210] leading-snug">
              Where are you reading from?
            </p>
            <p className="text-[10px] text-[#5a5246] leading-snug mt-0.5">
              Some nations — Scotland, Catalonia, Kurdistan — don't have their own country code.
              If yours doesn't show below, add it here. Voluntary. Stays in your browser. Nobody tracked.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={readerRegion}
            onChange={(e) => { setReaderRegion(e.target.value); setCountryNotice(false); }}
            placeholder="e.g. Scotland, Catalonia, Kurdistan…"
            maxLength={60}
            className="flex-1 min-w-0 px-3 py-2.5 bg-[#efe7d6] border-2 border-[#141210]/20 focus:border-[#e2602a] text-[12px] font-mono text-[#141210] placeholder:text-[#5a5246]/50 outline-none transition-colors"
            onKeyDown={(e) => { if (e.key === 'Enter') saveRegion(); }}
          />
          <button
            onClick={saveRegion}
            className="px-4 py-2.5 bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
          >
            {savedRegion ? 'Saved ✓' : 'Add me'}
          </button>
        </div>
        {savedRegion && (
          <p className="text-[10px] text-[#1e3a2b] font-mono mt-2">
            Thank you. Your nation will show on the impact page the next time you read an entry.
          </p>
        )}
        {countryNotice && (
          <p className="text-[10px] text-[#b3261e] font-mono mt-2 leading-relaxed">
            That's a country we already track by your location — you'll show up automatically when you read an entry. This box is for nations without their own country code (Scotland, Catalonia, Kurdistan…).
          </p>
        )}
      </div>

      {/* Self-identified nations / regions */}
      {regions.length > 0 && (
        <div id="nations" className="px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#b3261e]" />
            <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
              By Nation
            </h2>
            <span className="text-[9px] font-mono text-[#5a5246] uppercase tracking-wider">Self-identified</span>
            <div className="flex-1 h-px bg-[#141210]/20" />
          </div>
          <Ledger
            rows={regions}
            tone="red"
            href={(r) => `/ClimateReachPlace/nation/${encodeURIComponent(r.region)}`}
            label={(r) => r.region}
          />
        </div>
      )}

      {/* Countries list */}
      {countries.length > 0 && (
        <div id="countries" className="px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-[#1e3a2b]" />
            <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
              By Country
            </h2>
            <div className="flex-1 h-px bg-[#141210]/20" />
          </div>
          <Ledger
            rows={countries}
            tone="orange"
            href={(c) => `/ClimateReachPlace/country/${c.country}`}
            label={(c) => countryName(c.country)}
          />
        </div>
      )}

      {total === 0 && (
        <div className="px-5 py-16 text-center">
          <Globe className="w-12 h-12 text-[#5a5246] mx-auto mb-4" />
          <p className="text-[13px] font-mono text-[#5a5246] leading-relaxed max-w-[300px] mx-auto">
            The record is live. As people around the world read it, this page will come alive — every country, every nation, every read counted.
          </p>
          <Link to={createPageUrl('TogetherChangeClimate')} className="mt-6 inline-block px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            Back to the record
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-6 border-t-2 border-[#141210]/10">
        <p className="text-[9px] font-mono text-[#5a5246] text-center leading-relaxed">
          No IP addresses stored. No personal data tracked. Only the country, the nation you choose to share, and the entry. A place is counted once per entry per half hour, so what you see here is reads counted — never people, and never inflated. The signal, not the surveiller.
        </p>
        <p className="mt-3 text-center font-mono text-[13px] font-black tracking-[0.3em] text-record-mark">
          x = x
        </p>
      </div>
    </div>
  );
}