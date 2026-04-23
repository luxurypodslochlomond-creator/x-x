import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function CB51GigVoteTally({ gigId, artistId, gigDetails }) {
  const [expandedMember, setExpandedMember] = useState(null);

  const { data: votes = [], isLoading, refetch } = useQuery({
    queryKey: ['gigVotes', gigId],
    queryFn: () => base44.entities.GigVote.filter({ gig_id: gigId }),
    enabled: !!gigId,
    refetchInterval: 3000 // Poll every 3s for live updates
  });

  // Subscribe to real-time vote changes
  useEffect(() => {
    if (!gigId) return;
    const unsub = base44.entities.GigVote.subscribe((event) => {
      if (event.data?.gig_id === gigId) {
        refetch();
      }
    });
    return unsub;
  }, [gigId, refetch]);

  const { data: bandMembers = [] } = useQuery({
    queryKey: ['bandMembers', artistId],
    queryFn: () => base44.entities.TeamMember.filter({ artist_id: artistId, status: 'active' }),
    enabled: !!artistId
  });

  if (isLoading) return <div className="text-gray-600 text-sm">Loading votes…</div>;

  const yesVotes = votes.filter(v => v.vote === 'yes');
  const noVotes = votes.filter(v => v.vote === 'no');
  const pendingMembers = bandMembers.filter(m => !votes.find(v => v.member_email === m.email));
  const allVotesIn = pendingMembers.length === 0 && votes.length > 0;
  const allYes = yesVotes.length === votes.length && votes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black border-2 border-cyan-500/30 rounded-lg p-4 space-y-4"
    >
      {/* HEADER */}
      <div>
        <h3 className="text-cyan-400 font-bold font-mono text-sm mb-1">Band Votes</h3>
        <p className="text-gray-500 text-xs font-mono">
          {allVotesIn ? (allYes ? '✓ All confirmed' : '⚠ Some declined') : `${votes.length}/${bandMembers.length} voted`}
        </p>
      </div>

      {/* VOTE SUMMARY BARS */}
      <div className="space-y-2">
        {/* YES VOTES */}
        {yesVotes.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400 font-mono font-bold">YES</span>
              <span className="text-xs text-gray-500">{yesVotes.length}</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(yesVotes.length / bandMembers.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-green-600"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {yesVotes.map((vote, i) => (
                <span key={i} className="text-xs text-green-400 bg-green-950/40 border border-green-500/30 rounded px-2 py-0.5">
                  {vote.member_name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* NO VOTES */}
        {noVotes.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-400 font-mono font-bold">NO</span>
              <span className="text-xs text-gray-500">{noVotes.length}</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(noVotes.length / bandMembers.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-red-600"
              />
            </div>
            <div className="space-y-1">
              {noVotes.map((vote, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedMember(expandedMember === vote.member_email ? null : vote.member_email)}
                  className="w-full flex items-center justify-between p-2 rounded bg-red-950/30 border border-red-500/20 hover:border-red-500/40 transition-all text-left"
                >
                  <span className="text-xs text-red-400 font-mono">{vote.member_name}</span>
                  <ChevronDown className={`w-3 h-3 text-red-500 transition-transform ${expandedMember === vote.member_email ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>

            {/* EXPANDED NO REASON */}
            <AnimatePresence>
              {noVotes.map(vote =>
                expandedMember === vote.member_email ? (
                  <motion.div
                    key={`reason-${vote.member_email}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/50 border border-red-500/20 rounded p-2 mt-1"
                  >
                    <p className="text-xs text-gray-300">{vote.reason}</p>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PENDING */}
        {pendingMembers.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 font-mono font-bold">PENDING</span>
              <span className="text-xs text-gray-500">{pendingMembers.length}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {pendingMembers.map((member, i) => (
                <span key={i} className="text-xs text-amber-600 bg-amber-950/40 border border-amber-500/30 rounded px-2 py-0.5">
                  {member.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACTION */}
      {allVotesIn && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-t border-gray-800 pt-3 ${allYes ? 'bg-green-950/20 border-green-500/20 p-3 rounded' : 'bg-red-950/20 border-red-500/20 p-3 rounded'}`}
        >
          {allYes ? (
            <div className="space-y-2">
              <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> All confirmed ✓
              </p>
              <button className="w-full text-xs bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold">
                → Generate & Send Confirmation Email
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-red-400 font-bold flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Some members declined
              </p>
              <p className="text-xs text-gray-400">Discuss with them before confirming with agent</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}