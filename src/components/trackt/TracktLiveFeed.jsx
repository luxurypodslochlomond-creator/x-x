import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const statusColors = {
  active: 'text-green-400 border-green-400/30 bg-green-400/5',
  missing: 'text-red-400 border-red-400/30 bg-red-400/5',
  overdue: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  flagged: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

function timeAgo(ts) {
  if (!ts) return 'never';
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Demo assets shown when no real data exists yet
const DEMO_ASSETS = [
  { tag_id: 'DEMO-001', asset_name: 'IP-2047', location: 'Ward 4B, Bay 3', status: 'active', last_seen: new Date(Date.now() - 6 * 60000).toISOString() },
  { tag_id: 'DEMO-002', asset_name: 'DEF-07', location: 'Corridor B', status: 'overdue', last_seen: new Date(Date.now() - 2 * 3600000).toISOString() },
  { tag_id: 'DEMO-003', asset_name: 'WC-112', location: 'Ward 6A', status: 'active', last_seen: new Date(Date.now() - 60000).toISOString() },
  { tag_id: 'DEMO-004', asset_name: 'BED-394', location: 'Unknown', status: 'missing', last_seen: new Date(Date.now() - 18 * 3600000).toISOString() },
  { tag_id: 'DEMO-005', asset_name: 'IV-PUMP-088', location: 'Theatre 3', status: 'active', last_seen: new Date(Date.now() - 30000).toISOString() },
];

export default function TracktLiveFeed() {
  const [assets, setAssets] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    try {
      const data = await base44.entities.TracktAsset.list('-last_seen', 8);
      if (data && data.length > 0) {
        setAssets(data);
        setIsDemo(false);
      } else {
        setAssets(DEMO_ASSETS);
        setIsDemo(true);
      }
    } catch (e) {
      console.warn('TracktAsset fetch failed, showing demo:', e.message);
      setAssets(DEMO_ASSETS);
      setIsDemo(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
    // Subscribe to real-time updates (wrapped safely)
    try {
      const unsub = base44.entities.TracktAsset.subscribe?.(() => fetchAssets());
      return () => unsub?.();
    } catch (e) {
      console.warn('TracktAsset subscription unavailable:', e);
    }
  }, []);

  const activeCount = assets.filter(a => a.status === 'active').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 font-mono text-xs tracking-widest uppercase">
          {isDemo ? 'Demo Asset Feed' : 'Live Asset Feed'}
        </p>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isDemo ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`} />
          <span className={`font-mono text-xs ${isDemo ? 'text-amber-400' : 'text-green-400'}`}>
            {isDemo ? 'demo data' : `${activeCount} active`}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="border border-white/5 bg-white/[0.01] p-4 rounded-sm animate-pulse h-16" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {assets.slice(0, 5).map((asset, i) => (
            <div key={asset.id || asset.tag_id || i} className="border border-white/10 bg-white/[0.02] p-4 rounded-sm hover:border-cyan-500/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white font-mono font-bold text-sm">{asset.asset_name || asset.tag_id}</p>
                  <p className="text-gray-500 text-xs font-mono mt-0.5">{asset.location || 'Location unknown'}</p>
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 border rounded-sm ${statusColors[asset.status] || statusColors.active}`}>
                  {(asset.status || 'active').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-gray-600 text-xs font-mono">{timeAgo(asset.last_seen)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isDemo && (
        <p className="text-gray-700 font-mono text-xs mt-4 text-center">
          Connect your RFID reader to see live data
        </p>
      )}
    </div>
  );
}