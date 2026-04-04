import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Brain, ChevronDown, ChevronUp, Loader } from 'lucide-react';

export default function TracktAIInsights({ assets, scanEvents }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [lastAnalyzed, setLastAnalyzed] = useState(null);

  useEffect(() => {
    if (assets.length === 0) return;
    // Only re-analyze if assets changed meaningfully
    const key = `${assets.length}-${assets.filter(a => a.status !== 'active').length}`;
    if (key === lastAnalyzed) return;
    analyzeAssets();
    setLastAnalyzed(key);
  }, [assets.length]);

  const analyzeAssets = async () => {
    if (assets.length === 0) return;
    setLoading(true);
    try {
      const summary = {
        total: assets.length,
        active: assets.filter(a => a.status === 'active').length,
        missing: assets.filter(a => a.status === 'missing').length,
        flagged: assets.filter(a => a.status === 'flagged').length,
        overdue: assets.filter(a => a.status === 'overdue').length,
        locations: [...new Set(assets.map(a => a.location).filter(Boolean))].slice(0, 10),
        asset_types: [...new Set(assets.map(a => a.asset_type).filter(Boolean))].slice(0, 10),
        recent_scans: scanEvents.slice(0, 10).map(s => ({
          tag: s.tag_id,
          location: s.location,
          time: s.scan_timestamp,
        })),
        missing_assets: assets.filter(a => a.status === 'missing').map(a => a.asset_name || a.tag_id).slice(0, 5),
        flagged_assets: assets.filter(a => a.status === 'flagged').map(a => a.asset_name || a.tag_id).slice(0, 5),
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are TRACKT AI, an intelligent asset management system for hospitals, warehouses, and facilities.

Analyze this asset data and provide concise, actionable operational intelligence:

${JSON.stringify(summary, null, 2)}

Return a JSON object with:
- headline: One sharp sentence summarizing the operational picture (max 15 words)
- status: "healthy" | "warning" | "critical" 
- insights: Array of 2-4 specific, actionable insights (each max 20 words, be direct and specific)
- priority_action: The single most important thing to do right now (max 20 words, or null if all good)

Be direct. No fluff. Like a smart operations manager.`,
        response_json_schema: {
          type: 'object',
          properties: {
            headline: { type: 'string' },
            status: { type: 'string' },
            insights: { type: 'array', items: { type: 'string' } },
            priority_action: { type: 'string' },
          },
        },
      });

      setInsights(result);
    } catch (err) {
      console.error('[TRACKT AI] Insights error:', err);
      // Fallback: generate basic insights without AI
      const missing = assets.filter(a => a.status === 'missing').length;
      const flagged = assets.filter(a => a.status === 'flagged').length;
      setInsights({
        headline: missing > 0 || flagged > 0 
          ? `${missing + flagged} assets require immediate attention.`
          : `All ${assets.length} assets tracked and accounted for.`,
        status: missing > 0 ? 'critical' : flagged > 0 ? 'warning' : 'healthy',
        insights: [
          `${assets.filter(a => a.status === 'active').length} of ${assets.length} assets are currently active.`,
          ...(missing > 0 ? [`${missing} asset${missing > 1 ? 's' : ''} marked as missing — locate immediately.`] : []),
          ...(flagged > 0 ? [`${flagged} asset${flagged > 1 ? 's' : ''} flagged for review.`] : []),
        ],
        priority_action: missing > 0 ? `Locate ${assets.filter(a => a.status === 'missing')[0]?.asset_name || 'missing asset'} immediately.` : null,
      });
    } finally {
      setLoading(false);
    }
  };

  if (assets.length === 0) return null;

  const statusLabel = { healthy: 'ALL GOOD', warning: 'WARNING', critical: 'CRITICAL' };

  return (
    <div className="border border-white/8 bg-white/[0.02]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-mono text-xs tracking-widest">AI INTELLIGENCE</span>
          {loading && <Loader className="w-3 h-3 text-gray-600 animate-spin" />}
          {insights && !loading && (
            <span className="font-mono text-xs text-gray-500 uppercase">{statusLabel[insights.status] || insights.status}</span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-700" /> : <ChevronDown className="w-4 h-4 text-gray-700" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/5">
              {loading ? (
                <p className="text-gray-600 font-mono text-xs py-4">Analyzing {assets.length} assets...</p>
              ) : insights ? (
                <div className="pt-4 space-y-3">
                  <p className="text-white text-sm font-semibold leading-snug">{insights.headline}</p>

                  {insights.priority_action && (
                    <div className="border-l-2 border-cyan-500/40 pl-3">
                      <p className="text-gray-400 text-xs leading-relaxed">{insights.priority_action}</p>
                    </div>
                  )}

                  <ul className="space-y-1.5">
                    {insights.insights?.map((insight, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-gray-700 mt-0.5 flex-shrink-0">—</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => { e.stopPropagation(); analyzeAssets(); }}
                    className="text-gray-700 hover:text-gray-400 font-mono text-xs transition-colors"
                  >
                    Re-analyze
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 font-mono text-xs py-4">No analysis yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}