import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe, Users, MapPin, Heart } from 'lucide-react';
import ImpactSignal from '@/components/climate/ImpactSignal';
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

// ── THE BREAKDOWN, AS A LEDGER RATHER THAN A LIST ──
// Rows of name, number and bar read as a table, and a table is a column you scroll
// forever. These are plates instead: the leading place given the full width and the
// biggest numeral, so the shape of the readership is legible before a word of it is read.
// `lead` decides whether the first row is given the whole width and the biggest numeral.
// A country list earns that: it is a shape, and the shape should be legible before a word of
// it is read. A nation list does not. A nation is a name one reader typed for themselves, so
// the plate that made "Sudan · 34" the loudest thing on this page was taking one person's
// reading and printing it at the size of a finding — which is exactly the vanity figure this
// record exists to refuse. Nations are now set at the size they are: a list.
function Ledger({ rows, tone, href, label, lead = true }) {
  const accent = tone === 'red' ? 'text-[#b3261e]' : 'text-[#e2602a]';
  const bar = tone === 'red' ? 'bg-[#b3261e]' : 'bg-[#e2602a]';
  const top = rows[0]?.views || 1;

  return (
    <div className="grid grid-cols-2 gap-px bg-[#141210]/15 border border-[#141210]/15">
      {rows.map((row, i) => {
        const isLead = lead && i === 0;
        return (
          <Link
            key={href(row)}
            to={href(row)}
            aria-label={`${label(row)}, ${row.views.toLocaleString()} reads, open the stories`}
            className={`relative flex flex-col justify-between bg-[#f7f1e5] hover:bg-[#efe7d6] active:bg-[#efe7d6] transition-colors p-3 ${isLead ? 'col-span-2' : ''}`}
          >
            {isLead && (
              <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 opacity-[0.12]">
                <SignalBeacon size={80} />
              </span>
            )}
            <span className="text-[8px] font-mono tracking-[0.2em] text-[#5a5246]/70">{String(i + 1).padStart(2, '0')}</span>
            <span className="relative mt-2 flex items-end justify-between gap-1.5">
              <span className={`font-mono font-bold text-[#141210] leading-[1.15] break-words ${isLead ? 'text-[15px]' : 'text-[11px]'}`}>{label(row)}</span>
              <span className={`font-black font-mono flex-shrink-0 ${accent} ${isLead ? 'text-[21px]' : 'text-[13px]'}`}>{row.views.toLocaleString()}</span>
            </span>
            <span className={`relative mt-2.5 block bg-[#141210]/10 ${isLead ? 'h-1.5' : 'h-1'}`}>
              <span className={`block h-full ${bar}`} style={{ width: `${Math.max(4, (row.views / top) * 100)}%` }} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ── THE PAGE IS A POSTER, NOT A PHONE STRETCHED WIDE ──────────────────────────────
   On a desktop this page was one column of mobile blocks pulled across the whole screen:
   a 128-pixel number with a 1,400-pixel paragraph under it, the planet at the width of a
   phone column, the two ledgers stacked below each other for no reason. It read as an old
   website because it was laid out like one.

   It is two things now, and both of them are the point: the number and the planet, side by
   side, as one block — the count of reads and the world those reads came from cannot be
   read separately — and beneath it, the receipts: who is reading, what they are reading,
   and what is being done about it, in two columns that stay a readable width instead of
   running the length of the monitor. On a phone it is still one calm column. */
export default function ClimateImpact() {
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

  // A count that could not be made is not a zero. `counted` is what lets this page tell the
  // difference between "nobody has read it yet" and "the server could not answer", which are
  // two completely different things to say to a funder holding this page.
  const counted = typeof stats?.total_views === 'number';
  const total = counted ? stats.total_views : 0;
  const countries = Array.isArray(stats?.countries) ? stats.countries : [];
  const regions = Array.isArray(stats?.regions) ? stats.regions : [];

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* The same bar, the same way back, as every other page of the record. */}
      <RecordBackBar eyebrow="The record · Reach" />

      {/* ── THE SIGNAL: ONE SENTENCE, EVERY FIGURE A DOOR ── */}
      <ImpactSignal stats={stats} />

      {/* ── THE RECEIPTS — two columns on a desktop, one calm column on a phone ── */}
      {regions.length > 0 && (
        <div id="nations" className="px-4 lg:px-8 py-6 bg-[#efe7d6]">
          <div className="mx-auto max-w-[1100px]">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#b3261e]" />
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
                Named by the reader
              </h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
            </div>
            {/* The two headings on this page used to be "By Nation" and "By Country", and a
                reader had to stop and work out the difference — which means the page had not
                said it. It says it in the headings now. A nation here is a name the reader
                typed about themselves, because some nations have no country code of their
                own; a country below is where the connection came from. */}
            <p className="text-[10px] text-[#5a5246] leading-relaxed mb-4 max-w-[62ch]" style={{ fontFamily: 'var(--font-reading)' }}>
              A name a reader gave for themselves — Scotland, Catalonia, Kurdistan — because some
              nations have no country code of their own. One reader naming one nation is counted on
              every entry they open, so this figure is usually one person reading, not a crowd.
            </p>
            <Ledger
              rows={regions}
              tone="red"
              lead={false}
              href={(r) => `/ClimateReachPlace/nation/${encodeURIComponent(r.region)}`}
              label={(r) => r.region}
            />
          </div>
        </div>
      )}

      {countries.length > 0 && (
        <div id="countries" className={`px-4 lg:px-8 py-6 bg-[#efe7d6] ${regions.length ? 'border-t border-[#141210]/10' : ''}`}>
          <div className="mx-auto max-w-[1100px]">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-[#1e3a2b]" />
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
                Where the connection came from
              </h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
            </div>
            {/* The honest caveat, before the numbers rather than under them: a country of
                connection is not a country of people, and on this record that distinction is
                the difference between evidence and a vanity figure. */}
            <p className="text-[10px] text-[#5a5246] leading-relaxed mb-4 max-w-[62ch]" style={{ fontFamily: 'var(--font-reading)' }}>
              Not where the reader is. An office, a server or a VPN stands anywhere, and one network
              can serve a whole country — reach, never a headcount.
              {countries.length === 1 && ' Every read so far has come from one place, so read that as a start rather than as reach.'}
            </p>
            <Ledger
              rows={countries}
              tone="orange"
              href={(c) => `/ClimateReachPlace/country/${c.country}`}
              label={(c) => countryName(c.country)}
            />
          </div>
        </div>
      )}

      {/* Reading and acting, side by side on a desktop: the two halves of the same signal. */}
      <div className="mx-auto max-w-[1100px] lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <WorldReadingFeed stories={stats?.top_stories || []} />
        <WorldActionFeed actions={stats?.upcoming_actions || []} />
      </div>

      {/* Self-identification — "Where are you reading from?" */}
      <div className="bg-[#f7f1e5] border-y border-[#141210]/10">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="flex items-start gap-2.5 mb-3">
            <Heart className="w-4 h-4 text-[#b3261e] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-bold text-[#141210] leading-snug">
                Where are you reading from?
              </p>
              <p className="text-[10px] text-[#5a5246] leading-snug mt-0.5">
                Some nations — Scotland, Catalonia, Kurdistan — don't have their own country code.
                If yours doesn't show above, add it here. Voluntary, and kept in your browser: from then on
                it is counted with the entries you read, never with you.
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
      </div>

      {!counted && (
        <div className="px-4 py-16 text-center">
          <Globe className="w-12 h-12 text-[#5a5246] mx-auto mb-4" />
          <p className="text-[13px] font-mono text-[#5a5246] leading-relaxed max-w-[320px] mx-auto">
            The counts could not be reached from here just now. Nothing is being hidden and nothing
            is being guessed: the figures will appear when the record can be asked again.
          </p>
        </div>
      )}

      {counted && total === 0 && (
        <div className="px-4 py-16 text-center">
          <Globe className="w-12 h-12 text-[#5a5246] mx-auto mb-4" />
          <p className="text-[13px] font-mono text-[#5a5246] leading-relaxed max-w-[300px] mx-auto">
            The record is live. As it is read, this page fills: every read counted, every nation a reader names, and a place only when a reader's own device says where it is.
          </p>
          <Link to={createPageUrl('TogetherChangeClimate')} className="mt-6 inline-block px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            Back to the record
          </Link>
        </div>
      )}

      {/* ── ONE PROMISE, AND THEN THE BOOK'S OWN FOOT ────────────────────────────────
          This page used to end with a foot of its own: a paragraph of caveats set at nine
          pixels, three arrow links, and x = x — and then the record's colophon printed x = x
          again directly underneath it. Two feet on one sheet, the same mark twice, and the
          record's own mark doing the work of a page's decoration. A page does not get its own
          foot inside a book. What was worth keeping is one sentence, and it is the promise
          rather than the decoration: nothing about a reader is stored. The colophon closes
          the sheet, as it does on every other page. */}
      <div className="mx-auto max-w-2xl px-4 pb-1 pt-4">
        <p className="text-center text-[10.5px] leading-relaxed text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
          No address is stored and nobody is named. One entry opened is one read, counted once
          from each place in half an hour — so every figure here is reads, never people. A place
          is counted only when a reader's own device states it: the record never guesses a reader's
          country from the network, because on this record it once guessed wrong for every single
          reader, and openings made by us while the record is being worked on are no longer counted.
        </p>
      </div>
    </div>
  );
}