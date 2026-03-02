import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Bell, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 BAND NOTIFICATION INBOX
 * Band members see gigs they need to vote on
 * Simple, clean, actionable
 */

export default function CB51BandNotificationInbox({ alwaysShow = false }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get all gigs currently in voting
  const { data: votingGigs = [], isLoading } = useQuery({
    queryKey: ['myVotingGigs'],
    queryFn: async () => {
      // Get all gigs in band_voting status
      const allVotingGigs = await base44.entities.GigOffer.filter({
        status: 'band_voting'
      });

      // Try to filter by user votes if logged in, otherwise show all voting gigs
      try {
        const user = await base44.auth.me();
        const myVotes = await base44.entities.GigVote.filter({
          voted_by_role: 'band_member'
        });
        const myVoteGigIds = new Set(
          myVotes.filter(v => v.created_by === user.email).map(v => v.gig_id)
        );
        return allVotingGigs.filter(g => !myVoteGigIds.has(g.id));
      } catch {
        // PIN-only user (Scott/manager) — just show all band_voting gigs
        return allVotingGigs;
      }
    },
    refetchInterval: 3000 // Poll every 3s
  });

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
        <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2 animate-spin" />
        <p className="text-gray-500 text-sm">Loading votes...</p>
      </div>
    );
  }

  if (votingGigs.length === 0) {
    // If alwaysShow=false (old usage in sidebar), show empty state
    // If alwaysShow=true (new top-of-page usage), hide entirely when nothing to vote on
    if (alwaysShow) return null;
    return (
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
        <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 font-bold text-sm">All caught up!</p>
        <p className="text-gray-500 text-xs mt-1">No gigs to vote on</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-amber-400 animate-pulse" />
        <h3 className="text-amber-400 font-black text-sm">
          {votingGigs.length} GIG{votingGigs.length !== 1 ? 'S' : ''} NEED YOUR VOTE
        </h3>
      </div>

      {votingGigs.map((gig) => (
        <motion.button
          key={gig.id}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(createPageUrl(`CB51BandVote?gigId=${gig.id}`))}
          className="w-full bg-gradient-to-r from-amber-950/40 to-orange-950/20 border border-amber-500/30 rounded-lg p-4 text-left hover:border-amber-500/60 transition-all"
          style={{ boxShadow: '0 4px 16px rgba(251, 191, 36, 0.1)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="text-white font-bold mb-1">
                {gig.venue || gig.title}
              </h4>
              <div className="space-y-1 text-xs">
                {gig.date_start && (
                  <p className="text-gray-400 font-mono">📅 {gig.date_start}</p>
                )}
                {gig.fee && (
                  <p className="text-green-400 font-bold">💰 £{gig.fee}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-amber-400 font-bold">VOTE NOW</span>
              <span className="text-[10px] text-gray-600">Tap to vote</span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}