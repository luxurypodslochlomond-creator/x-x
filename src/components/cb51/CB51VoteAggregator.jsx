import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Mail, Users, Loader } from 'lucide-react';

/**
 * CB51 VOTE AGGREGATOR
 * ─────────────────────────
 * When manager clicks YES on a gig:
 * 1. Band members get notification
 * 2. This component tracks all votes
 * 3. When all votes in → shows manager summary
 * 4. If all YES → shows draft email ready to send
 * 5. If any NO → shows reasons for discussion
 */

export default function CB51VoteAggregator({ gigId, artistId, bandMembers = [] }) {
  const [showSummary, setShowSummary] = useState(false);

  // Get all votes for this gig
  const { data: votes = [], isLoading } = useQuery({
    queryKey: ['gigVotes', gigId],
    queryFn: async () => {
      const allVotes = await base44.entities.GigVote.filter({ gig_id: gigId });
      return allVotes;
    },
    enabled: !!gigId,
    refetchInterval: 5000, // Poll every 5 seconds while voting
  });

  // Calculate vote status
  const yesVotes = votes.filter(v => v.vote === 'yes').length;
  const noVotes = votes.filter(v => v.vote === 'no').length;
  const allVoted = votes.length === bandMembers.length && bandMembers.length > 0;
  const allYes = allVoted && noVotes === 0;

  // Auto-show summary when voting complete
  useEffect(() => {
    if (allVoted && !isLoading) {
      setShowSummary(true);
    }
  }, [allVoted, isLoading]);

  if (!allVoted || isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3 flex items-center gap-2"
      >
        <Loader className="w-4 h-4 text-cyan-400 animate-spin" />
        <p className="text-cyan-400 text-xs font-mono">
          Waiting for {bandMembers.length - votes.length} member{bandMembers.length - votes.length > 1 ? 's' : ''}…
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {showSummary && (
        <motion.div
          key="summary"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`rounded-xl overflow-hidden border-2 ${
            allYes ? 'border-green-500 bg-green-950/30' : 'border-amber-500 bg-amber-950/30'
          }`}
        >
          {/* Header */}
          <div className={`px-4 py-2 flex items-center justify-between ${allYes ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
            <div className="flex items-center gap-2">
              {allYes ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-black text-sm">BAND CONFIRMED</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-black text-sm">DISCUSSION NEEDED</span>
                </>
              )}
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="text-gray-500 hover:text-gray-400 text-xs font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-3 space-y-3">
            {/* Vote tally */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-green-400 font-black text-sm">{yesVotes} YES</p>
                <p className="text-gray-500 text-xs">Ready to play</p>
              </div>
              {noVotes > 0 && (
                <div className="flex-1">
                  <p className="text-amber-400 font-black text-sm">{noVotes} NO</p>
                  <p className="text-gray-500 text-xs">Can't make it</p>
                </div>
              )}
            </div>

            {/* NO reasons if any */}
            {noVotes > 0 && (
              <div className="border-t border-white/10 pt-3 space-y-2">
                {votes
                  .filter(v => v.vote === 'no')
                  .map(v => (
                    <div key={v.id} className="bg-black/40 rounded-lg p-2">
                      <p className="text-gray-400 text-xs font-bold">{v.member_name}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{v.reason || '(No reason given)'}</p>
                    </div>
                  ))}
              </div>
            )}

            {/* Action */}
            {allYes && (
              <div className="border-t border-white/10 pt-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-black py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Mail className="w-3 h-3" />
                  DRAFT EMAIL READY
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}