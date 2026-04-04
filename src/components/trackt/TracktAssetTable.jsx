import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { MapPin, Clock, Wifi, Flag, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const STATUS_CONFIG = {
  active:  { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',  icon: CheckCircle,    label: 'Active' },
  missing: { color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',      icon: AlertTriangle,  label: 'Missing' },
  flagged: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', icon: Flag,          label: 'Flagged' },
  overdue: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: Clock,         label: 'Overdue' },
};

function timeAgo(ts) {
  if (!ts) return 'Never';
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

function AssetRow({ asset, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const cfg = STATUS_CONFIG[asset.status] || STATUS_CONFIG.active;
  const Icon = cfg.icon;

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await base44.entities.TracktAsset.update(asset.id, { status: newStatus });
      onRefresh();
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${expanded ? 'bg-white/[0.02]' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* STATUS */}
        <td className="px-4 py-4 w-10">
          <Icon className={`w-4 h-4 ${cfg.color}`} />
        </td>

        {/* NAME */}
        <td className="px-4 py-4">
          <p className="text-white font-bold text-sm">{asset.asset_name || `Asset-${asset.tag_id?.slice(-6)}`}</p>
          <p className="text-gray-600 font-mono text-xs mt-0.5">{asset.tag_id}</p>
        </td>

        {/* TYPE */}
        <td className="px-4 py-4 hidden md:table-cell">
          <span className="text-gray-400 text-sm">{asset.asset_type || '—'}</span>
        </td>

        {/* LOCATION */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-gray-600 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{asset.location || 'Unknown'}</span>
          </div>
          {asset.site && asset.site !== 'default' && (
            <p className="text-gray-600 text-xs mt-0.5 ml-4.5">{asset.site}</p>
          )}
        </td>

        {/* LAST SEEN */}
        <td className="px-4 py-4 hidden sm:table-cell">
          <span className="text-gray-500 font-mono text-xs">{timeAgo(asset.last_seen)}</span>
        </td>

        {/* STATUS BADGE */}
        <td className="px-4 py-4 hidden lg:table-cell">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-xs font-mono ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
        </td>

        {/* EXPAND */}
        <td className="px-4 py-4 w-8">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </td>
      </motion.tr>

      {/* EXPANDED DETAIL */}
      <AnimatePresence>
        {expanded && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan={7} className="px-4 pb-4 bg-black/30">
              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                <div>
                  <p className="text-gray-600 font-mono text-xs mb-1">TAG ID</p>
                  <p className="text-cyan-400 font-mono text-sm">{asset.tag_id}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-xs mb-1">READER</p>
                  <p className="text-white text-sm">{asset.reader_id || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-xs mb-1">SCAN COUNT</p>
                  <p className="text-white text-sm">{asset.scan_count || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-xs mb-1">LAST SEEN</p>
                  <p className="text-white text-sm">
                    {asset.last_seen ? new Date(asset.last_seen).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>
              {/* STATUS CONTROLS */}
              <div className="flex flex-wrap gap-2 mt-4">
                <p className="text-gray-600 font-mono text-xs w-full mb-1">SET STATUS:</p>
                {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={(e) => { e.stopPropagation(); handleStatusChange(status); }}
                    disabled={updatingStatus || asset.status === status}
                    className={`px-3 py-1 border text-xs font-mono transition-colors ${
                      asset.status === status
                        ? `${config.bg} ${config.color} border-current`
                        : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                    } disabled:opacity-50`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function TracktAssetTable({ assets, onRefresh }) {
  if (assets.length === 0) {
    return (
      <div className="border border-white/5 bg-black/20 py-12 text-center">
        <p className="text-gray-600 font-mono text-sm">No assets match your filter</p>
      </div>
    );
  }

  return (
    <div className="border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/40">
        <h3 className="text-white font-bold font-mono text-sm tracking-widest">ASSETS</h3>
        <span className="text-gray-600 font-mono text-xs">{assets.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left w-10" />
              <th className="px-4 py-3 text-left">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Asset</span>
              </th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Type</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Location</span>
              </th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Last Seen</span>
              </th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Status</span>
              </th>
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <AssetRow key={asset.id} asset={asset} onRefresh={onRefresh} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}