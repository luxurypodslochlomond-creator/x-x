import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51 BAND VOTE PAGE
 * Band member lands here from notification to vote YES/NO on gig
 * Simple, stress-free, GREEN YES / RED NO
 */

export default function CB51BandVote() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gigId = searchParams.get('gigId');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const queryClient = useQueryClient();

  const { data: gig, isLoading } = useQuery({
    queryKey: ['gig', gigId],
    queryFn: () => base44.entities.GigOffer.get(gigId),
    enabled: !!gigId
  });

  const { data: myVote } = useQuery({
    queryKey: ['myVote', gigId],
    queryFn: async () => {
      const votes = await base44.entities.GigVote.filter({
        gig_id: gigId
      });
      const user = await base44.auth.me();
      return votes.find(v => v.created_by === user.email);
    },
    enabled: !!gigId
  });

  const voteMutation = useMutation({
    mutationFn: async ({ vote, reason }) => {
      return await base44.functions.invoke('handleBandVoteAction', {
        gigOfferId: gigId,
        vote: vote,
        reason: reason
      });
    },
    onSuccess: (data) => {
      setHasVoted(true);
      queryClient.invalidateQueries({ queryKey: ['myVote', gigId] });
      
      // Auto-close after 2s
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-500">Loading gig...</div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-500">Gig not found</p>
          <button onClick={() => navigate(createPageUrl('CB51'))} className="text-cyan-400 text-sm mt-4">
            Back to CB51
          </button>
        </div>
      </div>
    );
  }

  if (myVote || hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            myVote?.vote_type === 'yes' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {myVote?.vote_type === 'yes' ? (
              <CheckCircle className="w-12 h-12 text-green-400" />
            ) : (
              <XCircle className="w-12 h-12 text-red-400" />
            )}
          </div>
          <h2 className="text-2xl font-black mb-2">Vote Recorded</h2>
          <p className="text-gray-400">Manager has been notified</p>
          <button
            onClick={() => window.close()}
            className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-mono"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-2xl mx-auto p-6">
        
        {/* GIG DETAILS */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 border border-cyan-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <span className="text-2xl">🎸</span>
            </div>
            <div>
              <h1 className="text-2xl font-black">{gig.venue || gig.title}</h1>
              <p className="text-gray-400 text-sm font-mono">Gig Offer</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {gig.date_start && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📅</span>
                <span className="text-white font-mono">{gig.date_start}</span>
              </div>
            )}
            {gig.fee && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">💰</span>
                <span className="text-green-400 font-bold">£{gig.fee}</span>
              </div>
            )}
            {gig.promoter_name && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🎤</span>
                <span className="text-white">{gig.promoter_name}</span>
              </div>
            )}
            {gig.offer_details && (
              <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-white/10">
                {gig.offer_details}
              </p>
            )}
          </div>
        </motion.div>

        {/* YES / NO BUTTONS */}
        <AnimatePresence mode="wait">
          {!showRejectReason ? (
            <motion.div
              key="buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="space-y-4"
            >
              <button
                onClick={() => voteMutation.mutate({ vote: 'yes', reason: null })}
                disabled={voteMutation.isPending}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black text-xl py-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)' }}
              >
                <CheckCircle className="w-8 h-8" />
                YES - I CAN DO IT
              </button>

              <button
                onClick={() => setShowRejectReason(true)}
                disabled={voteMutation.isPending}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xl py-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)' }}
              >
                <XCircle className="w-8 h-8" />
                NO - CAN'T DO IT
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reason"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-gray-900 border border-red-500/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-red-400" />
                <h3 className="text-red-400 font-bold">Why can't you do it?</h3>
              </div>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., date clash, family commitment..."
                className="w-full bg-black border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 font-mono text-sm h-24 resize-none focus:outline-none focus:border-red-400"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectReason(false);
                    setRejectReason('');
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => voteMutation.mutate({ vote: 'no', reason: rejectReason })}
                  disabled={!rejectReason.trim() || voteMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {voteMutation.isPending ? 'Sending...' : 'Send to Manager'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}