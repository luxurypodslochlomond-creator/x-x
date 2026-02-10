import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * VOTE TRACKER - Manager dashboard only
 * Shows live vote count from band members
 * NO notifications, just realtime panel update
 */

export default function CB51GigVoteTracker({ gigId, bandMemberCount }) {
  const [votes, setVotes] = useState({ yes: 0, no: 0, pending: bandMemberCount });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const allVotes = await base44.entities.GigVote.filter({ gig_id: gigId });
        const yesCount = allVotes.filter(v => v.vote_type === 'yes').length;
        const noCount = allVotes.filter(v => v.vote_type === 'no').length;
        
        setVotes({
          yes: yesCount,
          no: noCount,
          pending: bandMemberCount - (yesCount + noCount)
        });
      } catch (e) {
        console.log('Vote fetch:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();

    // Subscribe to vote changes
    const unsubscribe = base44.entities.GigVote.subscribe((event) => {
      if (event.data?.gig_id === gigId) {
        fetchVotes();
      }
    });

    return unsubscribe;
  }, [gigId, bandMemberCount]);

  if (isLoading) {
    return <div className="text-gray-500 text-xs font-mono">Loading votes...</div>;
  }

  const allVotedYes = votes.yes === bandMemberCount;
  const anyVotedNo = votes.no > 0;

  return (
    <div className="flex items-center gap-3 text-xs font-mono p-3 bg-gray-900/50 rounded-lg border border-gray-700">
      {allVotedYes ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-bold">ALL CONFIRMED ✓</span>
        </>
      ) : anyVotedNo ? (
        <>
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 font-bold">
            {votes.no} said NO • {votes.pending} pending
          </span>
        </>
      ) : (
        <span className="text-gray-400">
          {votes.yes}/{bandMemberCount} YES • {votes.pending} waiting
        </span>
      )}
    </div>
  );
}