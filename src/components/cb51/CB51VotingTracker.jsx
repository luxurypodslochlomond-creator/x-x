import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51VotingTracker
 * What Scott sees: Live vote progress for ONE gig
 * Zero stress - clear YES/NO breakdown + rejection reasons
 */
export default function CB51VotingTracker({ gigId }) {
  const queryClient = useQueryClient();
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch gig details
  const { data: gig } = useQuery({
    queryKey: ['gig', gigId],
    queryFn: () => base44.entities.GigOffer.get(gigId),
    enabled: !!gigId
  });

  // Fetch vote summary (YES/NO/PENDING counts)
  const { data: voteSummary, refetch: refetchVotes } = useQuery({
    queryKey: ['voteSummary', gigId],
    queryFn: async () => {
      const result = await base44.functions.invoke('getGigVoteSummary', {
        gigId
      });
      return result;
    },
    enabled: !!gigId,
    refetchInterval: autoRefresh ? 3000 : false // Auto-refresh every 3s
  });

  // Fetch individual votes so we can show who voted what
  const { data: votes = [] } = useQuery({
    queryKey: ['gigVotes', gigId],
    queryFn: () => base44.asServiceRole.entities.GigVote.filter({ gig_id: gigId }),
    enabled: !!gigId,
    refetchInterval: autoRefresh ? 3000 : false
  });

  // Fetch band members to match with votes
  const { data: bandMembers = [] } = useQuery({
    queryKey: ['bandMembers', gig?.artist_id],
    queryFn: () => gig?.artist_id 
      ? base44.entities.TeamMember.filter({ artist_id: gig.artist_id })
      : Promise.resolve([]),
    enabled: !!gig?.artist_id
  });

  // Create a map of votes by member ID
  const voteMap = {};
  votes.forEach(v => {
    voteMap[v.voted_by_role === 'band_member' ? v.id : v.band_member_id] = v;
  });

  if (!gig || !voteSummary) {
    return <div className="text-gray-500 text-xs p-4">Loading...</div>;
  }

  const { yesVotes, noVotes, pendingVotes, totalBandMembers, allYes, hasRejection } = voteSummary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 bg-black border-2 border-cyan-500/30 rounded-lg p-4"
    >
      {/* GIG HEADER */}
      <div>
        <h2 className="text-white font-black text-lg">{gig.venue || gig.title}</h2>
        <p className="text-gray-400 text-xs mt-1">
          {gig.date_start} • {gig.promoter_name}
          {gig.fee && ` • £${gig.fee}`}
        </p>
      </div>

      {/* VOTE PROGRESS BAR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-cyan-400 font-bold text-sm">VOTES</p>
          <p className="text-gray-400 text-xs font-mono">
            {yesVotes + noVotes}/{totalBandMembers}
          </p>
        </div>
        <div className="flex gap-1 h-2 bg-black border border-cyan-500/30 rounded-full overflow-hidden">
          {/* YES count */}
          <div
            className="bg-green-500 transition-all duration-300"
            style={{ width: `${(yesVotes / totalBandMembers) * 100}%` }}
          />
          {/* NO count */}
          <div
            className="bg-red-500 transition-all duration-300"
            style={{ width: `${(noVotes / totalBandMembers) * 100}%` }}
          />
          {/* PENDING */}
          <div
            className="bg-gray-600 transition-all duration-300"
            style={{ width: `${(pendingVotes / totalBandMembers) * 100}%` }}
          />
        </div>
      </div>

      {/* VOTE STATS - CLEAN BREAKDOWN */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-green-900/20 border border-green-500/30 rounded p-2 text-center">
          <p className="text-green-400 font-black text-lg">{yesVotes}</p>
          <p className="text-green-300 text-[10px] font-mono">YES</p>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 rounded p-2 text-center">
          <p className="text-red-400 font-black text-lg">{noVotes}</p>
          <p className="text-red-300 text-[10px] font-mono">NO</p>
        </div>
        <div className="bg-gray-900/20 border border-gray-500/30 rounded p-2 text-center">
          <p className="text-gray-400 font-black text-lg">{pendingVotes}</p>
          <p className="text-gray-300 text-[10px] font-mono">PENDING</p>
        </div>
      </div>

      {/* INDIVIDUAL VOTES - WHO SAID WHAT */}
      <div className="space-y-2 pt-2 border-t border-cyan-500/20">
        <p className="text-gray-500 text-[10px] font-mono uppercase">BAND VOTES</p>
        <div className="space-y-1.5">
          <AnimatePresence>
            {bandMembers.map(member => {
              const vote = votes.find(v => {
                // Match vote to band member
                return v.voted_by_role === 'band_member' || v.band_member_id === member.id;
              });

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between gap-2 bg-black/40 border border-cyan-500/20 rounded px-2 py-1.5"
                >
                  <p className="text-white text-xs font-bold flex-1 truncate">{member.name}</p>
                  {vote ? (
                    <>
                      {vote.vote_type === 'yes' ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-green-400 text-[10px] font-bold">YES</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-red-400" />
                          <span className="text-red-400 text-[10px] font-bold">NO</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500 animate-pulse" />
                      <span className="text-gray-500 text-[10px]">Waiting</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* NO REASONS - If any rejected */}
      {hasRejection && (
        <div className="bg-red-900/20 border border-red-500/30 rounded p-3 space-y-2">
          <p className="text-red-300 font-bold text-xs">WHY THEY SAID NO:</p>
          {votes
            .filter(v => v.vote_type === 'no' && v.reason)
            .map((v, idx) => {
              const member = bandMembers.find(m => m.id === v.band_member_id);
              return (
                <div key={idx} className="bg-black/40 border border-red-500/20 rounded p-2">
                  <p className="text-red-300 text-[10px] font-bold">{member?.name}: </p>
                  <p className="text-red-200 text-[11px] mt-0.5">"{v.reason}"</p>
                </div>
              );
            })}
        </div>
      )}

      {/* STATUS MESSAGE */}
      <div className="pt-2 border-t border-cyan-500/20">
        {allYes ? (
          <div className="bg-green-900/30 border border-green-500/40 rounded p-3 text-center">
            <p className="text-green-300 font-black text-sm">✅ ALL BAND SAID YES</p>
            <p className="text-green-400 text-xs mt-1">Ready to confirm with {gig.promoter_name}</p>
          </div>
        ) : hasRejection ? (
          <div className="bg-red-900/30 border border-red-500/40 rounded p-3 text-center">
            <p className="text-red-300 font-black text-sm">❌ BAND HAS CONCERNS</p>
            <p className="text-red-400 text-xs mt-1">Check reasons above - discuss with team</p>
          </div>
        ) : pendingVotes > 0 ? (
          <div className="bg-blue-900/30 border border-blue-500/40 rounded p-3 text-center">
            <p className="text-blue-300 font-black text-sm">⏳ WAITING ON {pendingVotes}</p>
            <p className="text-blue-400 text-xs mt-1">Auto-refreshing every 3 seconds...</p>
          </div>
        ) : null}
      </div>

      {/* MANUAL REFRESH */}
      <button
        onClick={() => refetchVotes()}
        className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-cyan-400 text-xs font-bold py-2 transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        Refresh now
      </button>
    </motion.div>
  );
}