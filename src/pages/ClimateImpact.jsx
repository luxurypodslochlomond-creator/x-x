import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Eye, Users } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// Converts an ISO 2-letter country code to a display name.
function countryName(code) {
  if (!code) return 'Unknown';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

export default function ClimateImpact() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // Refresh every 30 seconds — the world is always reading
    const interval = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

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
          </div>
        </motion.div>
      </div>

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
                className="flex items-center gap-3 px-3 py-2.5 bg-[#f7f1e5] border border-[#141210]/15"
              >
                <SignalCode code={c.country} size="md" />
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
            The record is live. As people around the world read it, this page will come alive — every country, every view, in real time.
          </p>
          <Link to={createPageUrl('TogetherChangeClimate')} className="mt-6 inline-block px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            Back to the record
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-6 border-t-2 border-[#141210]/10">
        <p className="text-[9px] font-mono text-[#5a5246] text-center leading-relaxed">
          No IP addresses stored. No personal data tracked. Only the country and the entry — the signal, not the surveiller. x = x.
        </p>
      </div>
    </div>
  );
}