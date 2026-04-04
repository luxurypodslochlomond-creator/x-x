import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, AlertTriangle, Flag, Clock } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, color, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex-1 min-w-0 p-4 border transition-all text-left ${
      active
        ? 'border-cyan-500/60 bg-cyan-500/10'
        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">{label}</span>
    </div>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </motion.button>
);

export default function TracktStatBar({ stats, filterStatus, setFilterStatus }) {
  const toggle = (status) => setFilterStatus(filterStatus === status ? 'all' : status);

  return (
    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
      <Stat
        icon={Package}
        label="Total"
        value={stats.total}
        color="text-white"
        active={filterStatus === 'all'}
        onClick={() => setFilterStatus('all')}
      />
      <Stat
        icon={CheckCircle}
        label="Active"
        value={stats.active}
        color="text-green-400"
        active={filterStatus === 'active'}
        onClick={() => toggle('active')}
      />
      <Stat
        icon={AlertTriangle}
        label="Missing"
        value={stats.missing}
        color="text-red-400"
        active={filterStatus === 'missing'}
        onClick={() => toggle('missing')}
      />
      <Stat
        icon={Flag}
        label="Flagged"
        value={stats.flagged}
        color="text-orange-400"
        active={filterStatus === 'flagged'}
        onClick={() => toggle('flagged')}
      />
      <Stat
        icon={Clock}
        label="Overdue"
        value={stats.overdue}
        color="text-yellow-400"
        active={filterStatus === 'overdue'}
        onClick={() => toggle('overdue')}
      />
    </div>
  );
}