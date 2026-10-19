import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

// The "doing" signal — what's happening next on the ground.
// Calm, non-ranked, soonest-first. No popularity, no counters.
// Pairs with WorldReadingFeed: the world is reading → the world is acting.
const ACTION_LABELS = {
  cleanup: 'CLEANUP',
  planting: 'PLANTING',
  meeting: 'MEETING',
  policy_submission: 'POLICY',
  workshop: 'WORKSHOP',
  monitoring: 'MONITORING',
  other: 'ACTION',
};

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function WorldActionFeed({ actions }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="px-5 py-6 bg-[#f7f1e5] border-y border-[#141210]/10">
      <style>{`
        @keyframes action-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
      `}</style>

      <div className="flex items-center gap-2 mb-1">
        <Sprout className="w-4 h-4 text-[#1e3a2b]" style={{ animation: 'action-pulse 3s ease-in-out infinite' }} />
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
          The world is acting
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
      </div>

      <p className="text-[9px] font-mono text-[#5a5246] mb-4 leading-relaxed">
        Reading is signal. Acting is the signal landing. What's happening next, where — cleanups, plantings, meetings, policy. Not a feed. Not a scroll. Just what the record grew.
      </p>

      <div className="border-t border-[#141210]/15">
        {actions.map((a, i) => {
          const label = ACTION_LABELS[a.action_type] || 'ACTION';
          const place = [a.region_rough, a.country].filter(Boolean).join(', ');
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link
                to={createPageUrl(`ClimateDetail/action/${a.id}`)}
                className="block py-3.5 border-b border-[#141210]/15 active:bg-[#efe7d6] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[7px] font-black font-mono uppercase tracking-[0.15em] px-1.5 py-0.5"
                    style={{ color: '#1e3a2b', border: '1px solid #1e3a2b' }}
                  >
                    {label}
                  </span>
                  {a.category && (
                    <span className="text-[8px] font-mono text-[#5a5246] uppercase tracking-wider truncate">
                      {a.category}
                    </span>
                  )}
                </div>
                <p className="text-[13px] font-bold text-[#141210] leading-snug mb-1.5" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  {a.title}
                </p>
                <p className="text-[10px] font-mono text-[#5a5246]">
                  {a.date && <span className="font-black text-[#1e3a2b]">{formatDate(a.date)}</span>}
                  {a.date && place && <span className="text-[#141210]/30 mx-1.5">·</span>}
                  {place && <span>{place}</span>}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}