import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

// Calm, honest feed: which stories the world is reaching for.
// No dopamine. No ticking counters. No "trending" labels. No ranking bars.
// Just the signal — a transmission log of love reaching the planet.
// Each line: type · title · "Reaching N countries · M reads" — reads, never people.
export default function WorldReadingFeed({ stories }) {
  if (!stories || stories.length === 0) return null;

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

  const detailUrl = (s) =>
    createPageUrl(`ClimateDetail/${s.type}/${s.id}`);

  return (
    <div className="px-5 py-6">
      <style>{`
        @keyframes feed-signal { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>

      <div className="flex items-center gap-2 mb-1">
        <Radio className="w-4 h-4 text-[#b3261e]" style={{ animation: 'feed-signal 2.5s ease-in-out infinite' }} />
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
          The world is reading
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
      </div>

      <p className="text-[9px] font-mono text-[#5a5246] mb-4 leading-relaxed">
        Which stories are reaching the most nations right now. Not a ranking. Not a competition. Just the signal — so the person who submitted it knows their story landed, and the planet knows what matters.
      </p>

      <div className="border-t border-[#141210]/15">
        {stories.map((s, i) => (
          <motion.div
            key={`${s.type}-${s.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              to={detailUrl(s)}
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
              <p className="text-[13px] font-bold text-[#141210] leading-snug mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                {s.title}
              </p>
              <p className="record-meta text-[#5a5246]">
                Reaching <span className="font-black text-[#b3261e]">{s.countries}</span> {s.countries === 1 ? 'country' : 'countries'}
                <span className="text-[#141210]/30 mx-1.5">·</span>
                <span className="font-black text-[#141210]">{s.readers.toLocaleString()}</span> {s.readers === 1 ? 'read' : 'reads'}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}