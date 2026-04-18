import React from 'react';
import { Users, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51GigVotingStatus({ gig }) {
  const votes = gig.band_votes || [];
  const yesVotes = votes.filter(v => v.decision === 'yes').length;
  const noVotes = votes.filter(v => v.decision === 'no').length;
  const pendingVotes = votes.filter(v => !v.decision).length;
  const totalMembers = votes.length;

  // Status logic
  const allIn = totalMembers > 0 && pendingVotes === 0;
  const unanimous = allIn && (yesVotes === totalMembers || noVotes === totalMembers);
  const split = allIn && yesVotes > 0 && noVotes > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black/40 border border-gray-700/40 rounded-lg p-3 space-y-2"
    >
      {/* STATUS SUMMARY - At a glance */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Band Vote</span>
        </div>

        {/* BADGE */}
        {allIn ? (
          <div className={`text-xs font-bold px-2 py-1 rounded ${
            unanimous && yesVotes === totalMembers
              ? 'bg-green-500/20 text-green-400'
              : split
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {unanimous && yesVotes === totalMembers ? '✓ ALL YES' : split ? '⚠ SPLIT VOTE' : '✗ ALL NO'}
          </div>
        ) : (
          <div className="text-xs font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            PENDING
          </div>
        )}
      </div>

      {/* VOTE COUNTS */}
      <div className="flex gap-2 text-xs">
        <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded px-2 py-1.5 text-center">
          <p className="text-green-400 font-bold">{yesVotes}</p>
          <p className="text-green-600 text-[10px]">YES</p>
        </div>
        <div className="flex-1 bg-gray-500/10 border border-gray-500/30 rounded px-2 py-1.5 text-center">
          <p className="text-gray-400 font-bold">{pendingVotes}</p>
          <p className="text-gray-600 text-[10px]">PENDING</p>
        </div>
        <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded px-2 py-1.5 text-center">
          <p className="text-red-400 font-bold">{noVotes}</p>
          <p className="text-red-600 text-[10px]">NO</p>
        </div>
      </div>

      {/* VOTE LIST (if space) */}
      {votes.length > 0 && (
        <div className="text-[10px] space-y-1 mt-2 pt-2 border-t border-gray-700">
          {votes.map((vote, i) => (
            <div key={i} className="flex gap-1">
              <span className={vote.decision === 'yes' ? 'text-green-400' : vote.decision === 'no' ? 'text-red-400' : 'text-gray-500'}>
                {vote.decision === 'yes' ? '✓' : vote.decision === 'no' ? '✗' : '○'}
              </span>
              <span className="text-gray-400">{vote.member_name}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}