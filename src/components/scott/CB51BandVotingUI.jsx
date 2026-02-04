import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * CB51 Band Voting - Expandable (not modal) voting UI
 * Mobile-friendly: expands inline, no overlays
 */

export default function CB51BandVotingUI({ notification, onVoted }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showReasonPrompt, setShowReasonPrompt] = useState(false);
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const handleVote = async (vote) => {
    if (vote === 'no') {
      setShowReasonPrompt(true);
      return;
    }

    // YES vote
    submitVote(vote, null);
  };

  const submitVote = async (vote, reason) => {
    try {
      setIsVoting(true);
      const user = await base44.auth.me();

      // Store vote in database
      const existingResponse = await base44.entities.ScottBandResponse.filter({
        gig_offer_id: notification.gig_offer_id,
        band_member_email: user.email
      });

      if (existingResponse.length > 0) {
        // Update existing
        await base44.entities.ScottBandResponse.update(existingResponse[0].id, {
          vote,
          reason,
          responded_at: new Date().toISOString()
        });
      } else {
        // Create new
        await base44.entities.ScottBandResponse.create({
          gig_offer_id: notification.gig_offer_id,
          band_member_email: user.email,
          band_member_name: user.full_name,
          artist_id: notification.artist_id,
          vote,
          reason,
          responded_at: new Date().toISOString()
        });
      }

      // Refresh vote breakdown
      queryClient.invalidateQueries({ queryKey: ['gigVotes', notification.gig_offer_id] });

      // Collapse and mark as complete
      setIsExpanded(false);
      setShowReasonPrompt(false);
      setReason('');
      onVoted?.(vote);

    } catch (e) {
      console.error('Vote error:', e);
      alert('Vote failed: ' + e.message);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="border border-cyan-500/30 rounded-lg bg-black/40 overflow-hidden">
      {/* EXPANDABLE HEADER */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/60 transition-colors"
      >
        <div className="text-left flex-1">
          <p className="text-white font-bold text-sm">{notification.title}</p>
          <p className="text-cyan-400 text-xs font-mono">{notification.message}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* EXPANDABLE VOTING AREA */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-cyan-500/30 bg-black/80"
          >
            <div className="p-4 space-y-3">
              {!showReasonPrompt ? (
                <>
                  <p className="text-gray-400 text-xs font-mono">Your vote:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote('yes')}
                      disabled={isVoting}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all text-sm font-mono"
                    >
                      {isVoting ? '...' : '✓ YES'}
                    </button>
                    <button
                      onClick={() => handleVote('no')}
                      disabled={isVoting}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all text-sm font-mono"
                    >
                      {isVoting ? '...' : '✕ NO'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-xs font-mono">Why can't you do this gig?</p>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="One sentence - clutter free"
                    className="w-full bg-black/60 border border-red-500/30 text-white text-xs rounded p-2 focus:border-red-500 outline-none resize-none h-16"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowReasonPrompt(false);
                        setReason('');
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg text-xs transition-all"
                    >
                      BACK
                    </button>
                    <button
                      onClick={() => submitVote('no', reason)}
                      disabled={isVoting || !reason.trim()}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg text-xs transition-all font-mono"
                    >
                      {isVoting ? '...' : 'SEND'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}