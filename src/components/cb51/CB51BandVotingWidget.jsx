import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

export default function CB51BandVotingWidget({ gigId, memberId }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(null);
  const [error, setError] = useState(null);
  const [showReasonPrompt, setShowReasonPrompt] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const checkVote = async () => {
      try {
        const votes = await base44.entities.GigVote.filter({
          gig_id: gigId,
          member_id: memberId
        });
        if (votes.length > 0) {
          setVoted(votes[0].decision);
        }
      } catch (err) {
        console.error('Error checking vote:', err);
      }
    };
    checkVote();
  }, [gigId, memberId]);

  const handleVote = async (decision) => {
    // If NO and no reason yet, show reason prompt
    if (decision === 'rejected' && !showReasonPrompt) {
      setShowReasonPrompt(true);
      return;
    }

    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const existing = await base44.entities.GigVote.filter({
        gig_id: gigId,
        member_id: memberId
      });

      const voteData = {
        decision,
        voted_at: new Date().toISOString()
      };

      // Add reason if it's a NO vote
      if (decision === 'rejected' && reason) {
        voteData.reason = reason;
      }

      if (existing.length > 0) {
        await base44.entities.GigVote.update(existing[0].id, voteData);
      } else {
        await base44.entities.GigVote.create({
          gig_id: gigId,
          member_id: memberId,
          ...voteData
        });
      }

      setVoted(decision);
      setShowReasonPrompt(false);
      setReason('');
      queryClient.invalidateQueries({ queryKey: ['cb51-gig-votes', gigId] });
      queryClient.invalidateQueries({ queryKey: ['cb51-pending-gigs'] });

      // Notify manager
      await base44.functions.invoke('notifyManagerOnBandVote', {
        gigId,
        memberName: memberId,
        decision,
        reason: decision === 'rejected' ? reason : undefined
      }).catch(e => console.log('Notification sent'));

    } catch (err) {
      console.error('Vote error:', err);
      setError('Failed to vote. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 font-mono uppercase">Your vote</p>

      {/* SHOW REASON PROMPT FOR NO */}
      {showReasonPrompt && (
        <div className="bg-black border-2 border-red-500/40 rounded p-3 space-y-2">
          <p className="text-xs text-red-400 font-mono">Why can't you do this gig?</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, 120))}
            placeholder="Simple sentence..."
            className="w-full bg-black border border-red-500/30 rounded p-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500 resize-none"
            rows="2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setShowReasonPrompt(false); setReason(''); }}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs border border-gray-500/40 text-gray-400 hover:border-gray-500 transition-all"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
            <button
              onClick={() => handleVote('rejected')}
              disabled={loading || !reason.trim()}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-bold bg-red-900/40 border border-red-500/50 text-red-400 hover:bg-red-900/60 disabled:opacity-50 transition-all"
            >
              <ThumbsDown className="w-3 h-3" />
              {loading ? 'Saving...' : 'Send'}
            </button>
          </div>
        </div>
      )}

      {/* NORMAL VOTE BUTTONS */}
      {!showReasonPrompt && (
        <div className="flex gap-2">
          <button
            onClick={() => handleVote('rejected')}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded font-bold transition-all disabled:opacity-50 ${
              voted === 'rejected'
                ? 'bg-red-600 text-white border-2 border-red-400'
                : 'bg-black border-2 border-red-500/40 text-red-400 hover:border-red-500'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            {loading && voted !== 'rejected' ? 'Voting...' : voted === 'rejected' ? '✓ No' : 'No'}
          </button>
          <button
            onClick={() => handleVote('approved')}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded font-bold transition-all disabled:opacity-50 ${
              voted === 'approved'
                ? 'bg-green-600 text-white border-2 border-green-400'
                : 'bg-black border-2 border-green-500/40 text-green-400 hover:border-green-500'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            {loading && voted !== 'approved' ? 'Voting...' : voted === 'approved' ? '✓ Yes' : 'Yes'}
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}