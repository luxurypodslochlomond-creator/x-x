import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51GigVotingFlow({ gig, userEmail, memberName }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState('');
  const [voted, setVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState(null);

  const handleVote = async (choice) => {
    if (loading) return;
    setLoading(true);
    try {
      // Update gig with band vote
      const currentVotes = gig.band_votes || [];
      const updatedVotes = currentVotes.map(v => 
        v.member_email === userEmail ? { ...v, decision: choice, reason: reason || null, voted_at: new Date().toISOString() } : v
      );
      
      // If member not in votes yet, add them
      if (!currentVotes.some(v => v.member_email === userEmail)) {
        updatedVotes.push({
          member_email: userEmail,
          member_name: memberName,
          decision: choice,
          reason: reason || null,
          voted_at: new Date().toISOString()
        });
      }

      await base44.entities.GigOffer.update(gig.id, {
        band_votes: updatedVotes,
        all_responses_in: updatedVotes.every(v => v.decision)
      });

      // Notify manager of vote
      await base44.functions.invoke('notifyManagerOnBandVote', {
        gigId: gig.id,
        memberName: memberName,
        decision: choice,
        reason: reason || null
      }).catch(e => console.log('Manager notification sent'));

      setVoted(true);
      setVoteChoice(choice);
      queryClient.invalidateQueries({ queryKey: ['cb51-pending-gigs'] });
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if already voted
  const existingVote = (gig.band_votes || []).find(v => v.member_email === userEmail);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-black via-black to-gray-900 border border-cyan-500/30 rounded-xl p-5 space-y-4"
    >
      {/* GIG DETAILS - Clean header */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-black text-lg">{gig.venue}</h3>
            <p className="text-cyan-300 text-sm">{gig.city}, {gig.country}</p>
          </div>
          {gig.fee && <span className="text-green-400 font-bold text-lg">£{gig.fee}</span>}
        </div>
        <div className="flex gap-4 text-gray-400 text-xs font-mono">
          <span>📅 {new Date(gig.date).toLocaleDateString()}</span>
          <span>🎵 {gig.promoter}</span>
          {gig.urgency === 'urgent' && <span className="text-red-400">⚡ URGENT</span>}
        </div>
      </div>

      {/* VOTE BUTTONS - Only show if not voted yet */}
      {!existingVote && !voted ? (
        <div className="space-y-3">
          {/* YES / NO */}
          <div className="flex gap-3">
            <button
              onClick={() => handleVote('yes')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-900/40 hover:bg-green-900/70 border-2 border-green-500/60 text-green-400 py-4 rounded-lg font-black text-lg transition-all disabled:opacity-50"
            >
              <ThumbsUp className="w-5 h-5" />
              YES
            </button>
            <button
              onClick={() => setShowReason(true)}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-900/40 hover:bg-red-900/70 border-2 border-red-500/60 text-red-400 py-4 rounded-lg font-black text-lg transition-all disabled:opacity-50"
            >
              <ThumbsDown className="w-5 h-5" />
              NO
            </button>
          </div>

          {/* REASON PROMPT (for NO) */}
          <AnimatePresence>
            {showReason && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2 border-t border-gray-700">
                  <p className="text-gray-400 text-xs font-mono">Why not available?</p>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value.slice(0, 100))}
                    placeholder="Busy that day, better rate elsewhere, etc."
                    className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded text-sm font-mono focus:border-red-500 focus:outline-none resize-none"
                    rows="2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReason(false)}
                      className="flex-1 text-gray-400 border border-gray-700 hover:border-gray-500 px-3 py-2 rounded text-xs font-mono uppercase transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleVote('no')}
                      disabled={loading}
                      className="flex-1 bg-red-900/60 hover:bg-red-900/80 border border-red-500 text-red-400 px-3 py-2 rounded text-xs font-mono uppercase font-bold transition-colors disabled:opacity-50"
                    >
                      {loading ? '...' : 'Send NO'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* VOTED CONFIRMATION */
        <div className={`py-3 text-center rounded-lg font-bold text-sm ${
          existingVote?.decision === 'yes' || voteChoice === 'yes'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {existingVote?.decision === 'yes' || voteChoice === 'yes' ? '✓ YOU SAID YES' : '✗ YOU SAID NO'}
          {(existingVote?.reason || reason) && <p className="text-xs mt-1 text-gray-300">{existingVote?.reason || reason}</p>}
        </div>
      )}

      {/* VOTE TALLY - Show all votes */}
      {gig.band_votes && gig.band_votes.length > 0 && (
        <div className="bg-black/60 border border-gray-700/50 rounded-lg p-3 space-y-2">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">Band Responses</p>
          {gig.band_votes.map((vote, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={vote.decision === 'yes' ? 'text-green-400' : 'text-red-400'}>
                {vote.decision === 'yes' ? '✓' : vote.decision === 'no' ? '✗' : '⏳'}
              </span>
              <div className="flex-1">
                <p className="text-gray-300">{vote.member_name}</p>
                {vote.reason && <p className="text-gray-500 text-[10px]">{vote.reason}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}