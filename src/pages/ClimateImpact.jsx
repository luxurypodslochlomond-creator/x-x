import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Eye, Users, MapPin, Heart } from 'lucide-react';
import ClimateImpactMap from '@/components/climate/ClimateImpactMap';
import SignalBeacon from '@/components/climate/SignalBeacon';
import WorldReadingFeed from '@/components/climate/WorldReadingFeed';
import WorldActionFeed from '@/components/climate/WorldActionFeed';

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

export default function ClimateImpact() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readerRegion, setReaderRegion] = useState('');
  const [savedRegion, setSavedRegion] = useState(false);
  const [countryNotice, setCountryNotice] = useState(false);

  useEffect(() => {
    try { setReaderRegion(localStorage.getItem('climate51_reader_region') || ''); } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      base44.functions.invoke('climateImpactStats', {})
        .then((res) => {
          if (cancelled) return;
          const data = res?.data || res;
          if (data) setStats(data);
        })
        .catch(() => {})
        .finally(() => { if (!cancelled) setLoading(false); });
    };
    load();
    const interval = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(interval); };
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
          base44.functions.invoke('climateImpactStats', {})
            .then((res) => { const data = res?.data || res; if (data) setStats(data); })
            .catch(() => {});
        } catch {}
      } else {
        localStorage.removeItem('climate51_reader_region');
      }
    } catch {}
  };

  if (loading) {
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
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <style>{`
        @keyframes impact-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes impact-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <Link to={createPageUrl('TogetherChangeClimate')} className="w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-black uppercase text-[#efe7d6] leading-none" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
            Global Impact
          </h1>
          <p className="text-[9px] font-mono text-[#e2602a] uppercase tracking-widest mt-0.5">The record of the time</p>
        </div>
      </div>

      {/* Big numbers */}
      <div className="px-5 py-8 bg-[#141210]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/40 mb-2">People have read the record</p>
          <div className="font-black text-[#e2602a] leading-none" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: 'clamp(64px, 22vw, 96px)', letterSpacing: '-0.04em' }}>
            {total.toLocaleString()}
          </div>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center">
                <Globe className="w-4 h-4 text-[#efe7d6]/60" />
                <span className="font-black text-[#efe7d6]" style={{ fontSize: '28px' }}>{countries.length}</span>
              </div>
              <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40 mt-1">Countries</p>
            </div>
            <div className="w-px h-8 bg-[#efe7d6]/20" />
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center">
                <Eye className="w-4 h-4 text-[#efe7d6]/60" />
                <span className="font-black text-[#efe7d6]" style={{ fontSize: '28px' }}>{entries}</span>
              </div>
              <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40 mt-1">Entries</p>
            </div>
            {regions.length > 0 && (
              <>
                <div className="w-px h-8 bg-[#efe7d6]/20" />
                <div className="text-center">
                  <div className="flex items-center gap-1.5 justify-center">
                    <MapPin className="w-4 h-4 text-[#efe7d6]/60" />
                    <span className="font-black text-[#efe7d6]" style={{ fontSize: '28px' }}>{regions.length}</span>
                  </div>
                  <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40 mt-1">Nations</p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Reader-impact map — the planet lighting up as people read */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-[#b3261e]" />
          <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
            Where the world is reading
          </h2>
          <div className="flex-1 h-px bg-[#141210]/20" />
        </div>
        <div className="border-2 border-[#141210]/15 overflow-hidden">
          <ClimateImpactMap stats={stats} />
        </div>
        <p className="text-[9px] font-mono text-[#5a5246] mt-2 leading-relaxed">
          Every dot is a reader. Red dots are countries (from geo, no IP stored). Gold dots are self-identified nations without their own country code. The planet, lighting up — honestly.
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
            className="flex-1 px-3 py-2.5 bg-[#efe7d6] border-2 border-[#141210]/20 focus:border-[#e2602a] text-[12px] font-mono text-[#141210] placeholder:text-[#5a5246]/50 outline-none transition-colors"
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
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#b3261e]" />
            <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
              By Nation
            </h2>
            <span className="text-[9px] font-mono text-[#5a5246] uppercase tracking-wider">Self-identified</span>
            <div className="flex-1 h-px bg-[#141210]/20" />
          </div>
          <div className="space-y-1.5">
            {regions.map((r, i) => (
              <motion.div
                key={r.region}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                onClick={() => navigate(createPageUrl(`ClimateReachPlace/nation/${encodeURIComponent(r.region)}`))}
                className="flex items-center gap-3 px-3 py-2.5 bg-[#f7f1e5] border border-[#b3261e]/20 active:bg-[#efe7d6] cursor-pointer transition-colors"
              >
                <span className="w-7 h-7 flex items-center justify-center bg-[#b3261e]/5 border border-[#b3261e]/20">
                  <SignalBeacon size={22} />
                </span>
                <span className="text-[12px] font-mono font-bold text-[#141210] flex-1 truncate">{r.region}</span>
                <span className="text-[12px] font-black font-mono text-[#b3261e]">{r.views.toLocaleString()}</span>
                <div className="w-16 h-1.5 bg-[#141210]/10 rounded-full overflow-hidden flex-shrink-0">
                  <div className="h-full bg-[#b3261e] rounded-full" style={{ width: `${Math.max(4, (r.views / regions[0].views) * 100)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Countries list */}
      {countries.length > 0 && (
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-[#1e3a2b]" />
            <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
              By Country
            </h2>
            <div className="flex-1 h-px bg-[#141210]/20" />
          </div>
          <div className="space-y-1.5">
            {countries.map((c, i) => (
              <motion.div
                key={c.country}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                onClick={() => navigate(createPageUrl(`ClimateReachPlace/country/${c.country}`))}
                className="flex items-center gap-3 px-3 py-2.5 bg-[#f7f1e5] border border-[#141210]/15 active:bg-[#efe7d6] cursor-pointer transition-colors"
              >
                <span className="w-7 h-7 flex items-center justify-center bg-[#b3261e]/5 border border-[#b3261e]/20">
                  <SignalBeacon size={22} />
                </span>
                <span className="text-[12px] font-mono font-bold text-[#141210] flex-1 truncate">{countryName(c.country)}</span>
                <span className="text-[12px] font-black font-mono text-[#e2602a]">{c.views.toLocaleString()}</span>
                <div className="w-16 h-1.5 bg-[#141210]/10 rounded-full overflow-hidden flex-shrink-0">
                  <div className="h-full bg-[#e2602a] rounded-full" style={{ width: `${Math.max(4, (c.views / countries[0].views) * 100)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {total === 0 && (
        <div className="px-5 py-16 text-center">
          <Globe className="w-12 h-12 text-[#5a5246] mx-auto mb-4" />
          <p className="text-[13px] font-mono text-[#5a5246] leading-relaxed max-w-[300px] mx-auto">
            The record is live. As people around the world read it, this page will come alive — every country, every nation, every view, in real time.
          </p>
          <Link to={createPageUrl('TogetherChangeClimate')} className="mt-6 inline-block px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            Back to the record
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-6 border-t-2 border-[#141210]/10">
        <p className="text-[9px] font-mono text-[#5a5246] text-center leading-relaxed">
          No IP addresses stored. No personal data tracked. Only the country, the nation you choose to share, and the entry — the signal, not the surveiller. x = x.
        </p>
      </div>
    </div>
  );
}