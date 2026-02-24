import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function CB51BandVotingWidget({ gigId, memberId }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(null);
  const [error, setError] = useState(null);

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
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      // Check if vote exists
      const existing = await base44.entities.GigVote.filter({
        gig_id: gigId,
        member_id: memberId
      });

      if (existing.length > 0) {
        // Update existing vote
        await base44.entities.GigVote.update(existing[0].id, { decision });
      } else {
        // Create new vote
        await base44.entities.GigVote.create({
          gig_id: gigId,
          member_id: memberId,
          decision,
          voted_at: new Date().toISOString()
        });
      }

      setVoted(decision);
      queryClient.invalidateQueries({ queryKey: ['cb51-gig-votes', gigId] });
      queryClient.invalidateQueries({ queryKey: ['cb51-pending-gigs'] });

      // Notify manager
      await base44.functions.invoke('notifyManagerOnBandVote', {
        gigId,
        memberName: memberId,
        decision
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
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}