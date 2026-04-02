import React, { useState } from 'react';
import { tracktQuery } from '@/functions/tracktQuery';
import { Send, Loader2, AlertTriangle, Zap } from 'lucide-react';

const EXAMPLE_QUERIES = [
  'Where is every asset right now?',
  'Which assets are missing or overdue?',
  'Show me the most recently scanned assets',
  'Are there any anomalies I should know about?',
];

export default function TracktLiveQuery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async (q) => {
    const text = q || query;
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setQuery(text);

    const res = await tracktQuery({ query: text });
    setLoading(false);

    if (res.data?.answer) {
      setResult(res.data);
    } else {
      setError(res.data?.error || 'Query failed');
    }
  };

  return (
    <div className="border border-white/10 bg-black rounded-sm overflow-hidden">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-amber-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-gray-600 font-mono text-xs">trackt — live ai query</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-mono text-xs">LIVE</span>
        </div>
      </div>

      {/* Result area */}
      <div className="p-5 min-h-[160px]">
        {!result && !loading && !error && (
          <div>
            <p className="text-gray-600 font-mono text-xs mb-4">Try a query →</p>
            <div className="space-y-2">
              {EXAMPLE_QUERIES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuery(q)}
                  className="block w-full text-left text-gray-500 hover:text-cyan-400 font-mono text-sm transition-colors py-1 border-b border-white/5 last:border-0"
                >
                  <span className="text-gray-700 mr-2">›</span>{q}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 h-full min-h-[100px] justify-center">
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-cyan-400 font-mono text-sm">querying asset data...</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-mono text-sm">{error}</p>
              <button onClick={() => setError(null)} className="text-gray-600 font-mono text-xs mt-2 hover:text-white">
                try again
              </button>
            </div>
          </div>
        )}

        {result && (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-cyan-400 font-mono text-xs mt-0.5 flex-shrink-0">YOU</span>
              <p className="text-gray-400 font-mono text-sm">{query}</p>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-green-400 font-mono text-xs mt-0.5 flex-shrink-0">TRACKT</span>
              <p className="text-white font-mono text-sm leading-relaxed">{result.answer}</p>
            </div>
            {result.anomalies?.length > 0 && (
              <div className="mt-3 border border-amber-500/20 bg-amber-500/5 p-3 rounded-sm">
                <p className="text-amber-400 font-mono text-xs font-bold mb-1">ANOMALIES DETECTED</p>
                {result.anomalies.map((a, i) => (
                  <p key={i} className="text-amber-300 font-mono text-xs">• {a}</p>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 mt-4">
              <span className={`font-mono text-xs px-2 py-0.5 border rounded-sm ${
                result.confidence === 'high' ? 'border-green-500/30 text-green-400' :
                result.confidence === 'medium' ? 'border-amber-500/30 text-amber-400' :
                'border-red-500/30 text-red-400'
              }`}>
                {result.confidence?.toUpperCase()} CONFIDENCE
              </span>
              <span className="text-gray-700 font-mono text-xs">{result.asset_count} assets in scope</span>
              <button
                onClick={() => { setResult(null); setQuery(''); }}
                className="ml-auto text-gray-700 hover:text-gray-400 font-mono text-xs"
              >
                clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/5 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuery()}
            placeholder="Ask anything about your assets..."
            className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-cyan-500/50 placeholder-gray-700"
          />
          <button
            onClick={() => handleQuery()}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-sm hover:bg-cyan-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}