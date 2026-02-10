import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51BandVoteNotification
 * What band members see on their phone when Scott sends a gig for voting
 */
export default function CB51BandVoteNotification({ gig, bandMemberId, onVoteSubmitted }) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const voteMutation = useMutation({
    mutationFn: async (voteType) => {
      const voteData = {
        gig_id: gig.id,
        voted_by_role: 'band_member',
        vote_type: voteType,
        reason: voteType === 'no' ? rejectionReason : null,
        voted_at: new Date().toISOString()
      };

      const vote = await base44.entities.GigVote.create(voteData);
      
      // Notify manager a band member voted
      try {
        await base44.functions.invoke('notifyManagerOnBandVote', {
          gigId: gig.id,
          bandMemberId,
          voteType,
          reason: rejectionReason
        });
      } catch (e) {
        console.log('Manager notify (non-critical):', e);
      }

      return vote;
    },
    onSuccess: () => {
      onVoteSubmitted?.();
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-pink-900/30 to-black border-2 border-pink-500 rounded-lg p-4 space-y-3"
    >
      {/* GIG INFO */}
      <div>
        <p className="text-pink-400 font-black text-xs mb-1">GIG VOTE NEEDED</p>
        <h3 className="text-white font-black text-lg">{gig.venue || gig.title}</h3>
        <p className="text-gray-400 text-xs mt-1">
          {gig.date_start} • {gig.promoter_name}
          {gig.fee && ` • £${gig.fee}`}
        </p>
      </div>

      {/* SIMPLE YES/NO BUTTONS */}
      {!showRejectReason ? (
        <div className="space-y-2 pt-2">
          <p className="text-white font-bold text-sm text-center">Can you do this?</p>
          <div className="flex gap-2">
            <button
              onClick={() => voteMutation.mutate('yes')}
              disabled={voteMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black py-3 rounded flex items-center justify-center gap-2 transition-colors"
            >
              {voteMutation.isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  YES
                </>
              )}
            </button>
            <button
              onClick={() => setShowRejectReason(true)}
              disabled={voteMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-3 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              NO
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 bg-red-900/20 border border-red-500/30 rounded p-3">
          <p className="text-white font-bold text-sm">Why can't you do it?</p>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Date conflict, prior commitment, personal..."
            className="w-full bg-black border border-red-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600 h-16 resize-none"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowRejectReason(false);
                setRejectionReason('');
              }}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded text-xs"
            >
              Back
            </button>
            <button
              onClick={() => voteMutation.mutate('no')}
              disabled={voteMutation.isPending || !rejectionReason.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 rounded text-xs"
            >
              {voteMutation.isPending ? 'Sending...' : 'Send NO'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}