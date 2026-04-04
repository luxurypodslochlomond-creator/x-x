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

  const statusColors = {
    healthy:  { border: 'border-green-500/30',  bg: 'bg-green-500/5',  dot: 'bg-green-400',  text: 'text-green-400' },
    warning:  { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', dot: 'bg-yellow-400', text: 'text-yellow-400' },
    critical: { border: 'border-red-500/30',    bg: 'bg-red-500/5',    dot: 'bg-red-400',    text: 'text-red-400' },
  };
  const c = statusColors[insights?.status] || statusColors.healthy;

  if (assets.length === 0) return null;

  return (
    <div className={`border ${insights ? c.border : 'border-cyan-500/20'} ${insights ? c.bg : 'bg-cyan-500/5'} transition-all`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <Brain className={`w-5 h-5 ${insights ? c.text : 'text-cyan-400'}`} />
          <span className="text-white font-bold font-mono text-sm tracking-wider">AI INTELLIGENCE</span>
          {loading && <Loader className="w-4 h-4 text-cyan-400 animate-spin" />}
          {insights && !loading && (
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
              <span className={`font-mono text-xs uppercase ${c.text}`}>{insights.status}</span>
            </div>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5">
              {loading ? (
                <div className="py-6 text-center">
                  <p className="text-gray-500 font-mono text-xs">Analyzing {assets.length} assets...</p>
                </div>
              ) : insights ? (
                <div className="pt-4 space-y-4">
                  {/* HEADLINE */}
                  <p className={`text-lg font-bold ${c.text}`}>{insights.headline}</p>

                  {/* PRIORITY ACTION */}
                  {insights.priority_action && (
                    <div className="flex items-start gap-2 bg-white/5 border border-white/10 px-4 py-3">
                      <span className="text-white font-mono text-xs font-bold mt-0.5">ACTION:</span>
                      <p className="text-white text-sm">{insights.priority_action}</p>
                    </div>
                  )}

                  {/* INSIGHTS */}
                  <ul className="space-y-2">
                    {insights.insights?.map((insight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-cyan-500 mt-1 flex-shrink-0">›</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => { e.stopPropagation(); analyzeAssets(); }}
                    className="text-gray-600 hover:text-cyan-400 font-mono text-xs transition-colors"
                  >
                    Re-analyze →
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-gray-600 font-mono text-xs">Click to analyze</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}