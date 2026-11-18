import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Eye, Radio, Heart } from 'lucide-react';

// Converts an ISO 2-letter country code to a display name.
function countryName(code) {
  if (!code) return code;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// The place page: which stories reached a specific country or nation.
// Not who read them. Not when. Just that they landed — the signal, not the surveiller.
export default function ClimateReachPlace() {
  const { placeType, place } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    base44.functions.invoke('climateImpactStats', { place, place_type: placeType })
      .then((res) => { if (!cancelled) setData(res?.data || res); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [place, placeType]);

  const displayName = placeType === 'country'
    ? countryName(place)
    : decodeURIComponent(place || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#efe7d6] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
        <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">Listening for the signal…</p>
      </div>
    );
  }

  const stories = data?.stories || [];
  const totalReaders = data?.total_readers || 0;

  const typeLabel = (s) => {
    if (s.type === 'action') return 'ACTION';
    if (s.entry_type === 'climate_crisis') return 'CRISIS';
    return 'SOLUTION';
  };
  const typeColor = (s) => {
    if (s.type === 'action') return '#1e3a2b';
    if (s.entry_type === 'climate_crisis') return '#b3261e';
    return '#b8860b';
  };

  return (
    <div className="min-h-screen text-record-ink" style={{ fontFamily: 'var(--font-body)' }}>
      {/* The same paper bar and the same way back as every page of the record; the dark
          poster below it is the page's own voice, not a second navigation. */}
      <RecordBackBar
        eyebrow={`${displayName} · ${placeType === 'country' ? 'country' : 'nation'}`}
        fallback="/ClimateMap#reach-details"
      />

      {/* Big number */}
      <RecordPaintedBand continuous className="px-4 lg:px-10 py-8 lg:py-12">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.16em] text-[#e2602a] text-center mb-5">
          Together we can change the course of climate change
        </p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/40 mb-2">
            {placeType === 'country' ? 'Reads counted from this country' : 'Reads counted from this nation'}
          </p>
          <div className="font-black text-[#e2602a] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 18vw, 80px)', letterSpacing: '-0.04em' }}>
            {totalReaders.toLocaleString()}
          </div>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center">
                <Radio className="w-4 h-4 text-[#efe7d6]/60" />
                <span className="font-black text-[#efe7d6]" style={{ fontSize: '28px' }}>{stories.length}</span>
              </div>
              <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40 mt-1">Stories reached</p>
            </div>
          </div>
        </motion.div>
      </RecordPaintedBand>

      <div className="record-reading-panel">
      {/* Honest framing */}
      <div className="px-4 lg:px-10 py-4 lg:py-6 bg-[#f7f1e5] border-b border-[#141210]/10">
        <div className="flex items-start gap-2.5">
          <Heart className="w-4 h-4 text-[#b3261e] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#5a5246] leading-relaxed">
            These are the stories that reached {displayName}. Not who read them. Not when. Just that they landed — the signal, not the surveiller. The contributor knows their work reached this far.
          </p>
        </div>
      </div>

      {/* Stories list */}
      {stories.length > 0 ? (
        <div className="px-5 lg:px-10 py-6 lg:py-10 lg:max-w-[820px] lg:mx-auto">
          <div className="border-t border-[#141210]/15">
            {stories.map((s, i) => (
              <motion.div
                key={`${s.type}-${s.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={createPageUrl(`ClimateDetail/${s.type}/${s.id}`)}
                  className="block py-3.5 border-b border-[#141210]/15 active:bg-[#f7f1e5] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[7px] font-black font-mono uppercase tracking-[0.15em] px-1.5 py-0.5"
                      style={{ color: typeColor(s), border: `1px solid ${typeColor(s)}` }}
                    >
                      {typeLabel(s)}
                    </span>
                    {s.category && (
                      <span className="text-[8px] font-mono text-[#5a5246] uppercase tracking-wider truncate">
                        {s.category}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-bold text-[#141210] leading-snug mb-1.5">
                    {s.title}
                  </p>
                  <p className="record-meta text-[#5a5246]">
                    <span className="font-black text-[#b3261e]">{s.readers.toLocaleString()}</span> {s.readers === 1 ? 'read' : 'reads'} from {displayName}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 lg:px-10 py-16 text-center">
          <Eye className="w-12 h-12 text-[#5a5246] mx-auto mb-4" />
          <p className="text-[13px] font-mono text-[#5a5246] leading-relaxed max-w-[300px] mx-auto">
            No stories have reached {displayName} yet. When someone here reads the record, the stories they read will appear on this page.
          </p>
          <Link to={createPageUrl('TogetherChangeClimate')} className="mt-6 inline-block px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            Read the record
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 lg:px-10 py-6 lg:py-8 border-t-2 border-[#141210]/10">
        <p className="text-[9px] font-mono text-[#5a5246] text-center leading-relaxed">
          No IP addresses stored. No personal data tracked. Only the country, the nation you choose to share, and the entry — the signal, not the surveiller.
        </p>
        <p className="mt-3 text-center font-mono text-[13px] font-black tracking-[0.3em] text-record-mark">
          x = x
        </p>
      </div>
      </div>
    </div>
  );
}