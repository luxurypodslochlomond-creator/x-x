import React from 'react';

const Stat = ({ label, value, active, onClick, alert }) => (
  <button
    onClick={onClick}
    className={`flex-1 min-w-0 py-4 px-3 border-b-2 transition-all text-center ${
      active
        ? 'border-cyan-400 text-white'
        : 'border-transparent text-gray-500 hover:text-gray-300'
    }`}
  >
    <p className={`text-2xl font-black tabular-nums ${alert && value > 0 ? 'text-white' : ''}`}>{value}</p>
    <p className="text-xs font-mono uppercase tracking-widest mt-1 opacity-60">{label}</p>
  </button>
);

export default function TracktStatBar({ stats, filterStatus, setFilterStatus }) {
  const toggle = (status) => setFilterStatus(filterStatus === status ? 'all' : status);

  return (
    <div className="flex border border-white/8 bg-white/[0.02]">
      <Stat label="Total"   value={stats.total}   active={filterStatus === 'all'}     onClick={() => setFilterStatus('all')} />
      <Stat label="Active"  value={stats.active}  active={filterStatus === 'active'}  onClick={() => toggle('active')} />
      <Stat label="Missing" value={stats.missing} active={filterStatus === 'missing'} onClick={() => toggle('missing')} alert />
      <Stat label="Flagged" value={stats.flagged} active={filterStatus === 'flagged'} onClick={() => toggle('flagged')} alert />
      <Stat label="Overdue" value={stats.overdue} active={filterStatus === 'overdue'} onClick={() => toggle('overdue')} alert />
    </div>
  );
}