import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function CB51BandResponseTimer({ votes, totalMembers }) {
  const respondedCount = votes.filter(v => v.decision).length;
  const pendingCount = totalMembers - respondedCount;
  const percentComplete = totalMembers > 0 ? Math.round((respondedCount / totalMembers) * 100) : 0;

  return (
    <div className="bg-black/40 border border-gray-700/40 rounded-lg p-3 space-y-2">
      {/* PROGRESS HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-400 text-xs font-mono uppercase">Waiting for responses</span>
        </div>
        <span className="text-white font-black text-sm">{respondedCount}/{totalMembers}</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all ${
            percentComplete === 100 ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* STATUS */}
      {pendingCount > 0 ? (
        <div className="flex items-center gap-2 text-xs text-yellow-400">
          <AlertCircle className="w-3 h-3" />
          <span>{pendingCount} {pendingCount === 1 ? 'member' : 'members'} still deciding</span>
        </div>
      ) : (
        <div className="text-xs text-green-400 font-bold">✓ All responses in</div>
      )}
    </div>
  );
}