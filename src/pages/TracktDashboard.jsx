import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import TracktAIInsights from '@/components/trackt/TracktAIInsights';
import TracktAssetTable from '@/components/trackt/TracktAssetTable';
import TracktStatBar from '@/components/trackt/TracktStatBar';
import TracktSearch from '@/components/trackt/TracktSearch';
import { RefreshCw, AlertTriangle, Wifi } from 'lucide-react';

export default function TracktDashboard() {
  const [assets, setAssets] = useState([]);
  const [scanEvents, setScanEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadData = useCallback(async () => {
    try {
      const [assetData, scanData] = await Promise.all([
        base44.entities.TracktAsset.list('-last_seen', 200),
        base44.entities.TracktScanEvent.list('-scan_timestamp', 50),
      ]);
      setAssets(assetData || []);
      setScanEvents(scanData || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('[TRACKT Dashboard] Load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Real-time subscription
    const unsub = base44.entities.TracktAsset.subscribe((event) => {
      if (event.type === 'create') {
        setAssets(prev => [event.data, ...prev]);
      } else if (event.type === 'update') {
        setAssets(prev => prev.map(a => a.id === event.id ? event.data : a));
      } else if (event.type === 'delete') {
        setAssets(prev => prev.filter(a => a.id !== event.id));
      }
    });
    // Auto-refresh every 30s
    const interval = setInterval(loadData, 30000);
    return () => { unsub(); clearInterval(interval); };
  }, [loadData]);

  // Filter logic
  const filtered = assets.filter(asset => {
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      asset.asset_name?.toLowerCase().includes(q) ||
      asset.tag_id?.toLowerCase().includes(q) ||
      asset.location?.toLowerCase().includes(q) ||
      asset.site?.toLowerCase().includes(q) ||
      asset.asset_type?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: assets.length,
    active: assets.filter(a => a.status === 'active').length,
    missing: assets.filter(a => a.status === 'missing').length,
    flagged: assets.filter(a => a.status === 'flagged').length,
    overdue: assets.filter(a => a.status === 'overdue').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyan-400 font-mono text-sm tracking-widest">LOADING TRACKT...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050810] text-white">

        {/* HEADER */}
        <div className="border-b border-white/5 bg-black/40 backdrop-blur sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-black font-mono text-lg tracking-tight">TRACKT</span>
                <span className="text-gray-600 font-mono text-xs">/ dashboard</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono text-xs">LIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-mono text-xs hidden md:block">
                Updated {lastRefresh.toLocaleTimeString()}
              </span>
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors font-mono text-xs"
              >
                <RefreshCw className="w-3 h-3" />
                REFRESH
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">

          {/* STAT BAR */}
          <TracktStatBar stats={stats} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

          {/* MISSING/FLAGGED ALERT — subtle */}
          {(stats.missing > 0 || stats.flagged > 0) && (
            <div className="flex items-center gap-2 px-3 py-2 border border-white/8 bg-white/[0.02]">
              <AlertTriangle className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
              <p className="text-gray-400 text-xs font-mono">
                {stats.missing + stats.flagged} asset{stats.missing + stats.flagged !== 1 ? 's' : ''} need attention
                {stats.missing > 0 && ` · ${stats.missing} missing`}
                {stats.flagged > 0 && ` · ${stats.flagged} flagged`}
              </p>
            </div>
          )}

          {/* AI INSIGHTS */}
          <TracktAIInsights assets={assets} scanEvents={scanEvents} />

          {/* SEARCH */}
          <TracktSearch
            query={searchQuery}
            setQuery={setSearchQuery}
            resultCount={filtered.length}
            totalCount={assets.length}
          />

          {/* ASSET TABLE */}
          <TracktAssetTable
            assets={filtered}
            onRefresh={loadData}
          />

          {/* RECENT SCANS */}
          {scanEvents.length > 0 && (
            <div>
              <h3 className="text-white font-bold font-mono text-sm tracking-widest mb-4">RECENT SCAN EVENTS</h3>
              <div className="border border-white/5 bg-black/20 divide-y divide-white/5">
                {scanEvents.slice(0, 10).map((scan, i) => (
                  <div key={scan.id || i} className="flex items-center justify-between px-4 py-3 text-xs font-mono">
                    <span className="text-cyan-400">{scan.tag_id}</span>
                    <span className="text-gray-500">{scan.location || 'unknown'}</span>
                    <span className="text-gray-600">
                      {scan.scan_timestamp ? new Date(scan.scan_timestamp).toLocaleTimeString() : '—'}
                    </span>
                    {scan.rssi && <span className="text-gray-700">RSSI {scan.rssi}dBm</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {assets.length === 0 && (
            <div className="text-center py-24 border border-white/5 bg-black/20">
              <div className="w-12 h-12 border border-cyan-500/20 rounded-sm flex items-center justify-center mx-auto mb-6">
                <Wifi className="w-6 h-6 text-cyan-500/40" />
              </div>
              <h3 className="text-white font-bold mb-2">No assets yet</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                Point your RFID reader at the ingest API and assets will appear here in real time.
              </p>
              <div className="inline-block border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-gray-500">
                POST /api/functions/tracktIngest
              </div>
            </div>
          )}

        </div>
    </div>
  );
}