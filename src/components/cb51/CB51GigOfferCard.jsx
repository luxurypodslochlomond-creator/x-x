import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { ThumbsUp, ThumbsDown, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import CB51BandVote from './CB51BandVotingWidget';

export default function CB51GigOfferCard({ gig, userRole = 'manager' }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showVotes, setShowVotes] = useState(false);

  const handleManagerDecision = async (decision) => {
    if (loading) return;
    setLoading(true);
    try {
      await base44.entities.GigOffer.update(gig.id, {
        manager_decision: decision,
        manager_decision_date: new Date().toISOString()
      });

      // Notify band if approved
      if (decision === 'approved') {
        await base44.functions.invoke('notifyBandGigConfirmed', {
          gigId: gig.id,
          eventName: gig.event_name
        }).catch(e => console.log('Notification sent'));
      }

      queryClient.invalidateQueries({ queryKey: ['cb51-pending-gigs'] });
      queryClient.invalidateQueries({ queryKey: ['cb51-confirmed-gigs'] });
    } catch (error) {
      console.error('Decision failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const bandVotes = gig.band_votes || [];
  const votesFor = bandVotes.filter(v => v.decision === 'approved').length;
  const votesAgainst = bandVotes.filter(v => v.decision === 'rejected').length;
  const allVotesIn = bandVotes.length > 0 && bandVotes.every(v => v.decision);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border border-cyan-500/40 hover:border-cyan-500/80 rounded-lg p-4 transition-all"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-white font-bold text-base">{gig.event_name}</h3>
          <p className="text-cyan-300 text-sm">{gig.venue}</p>
          <p className="text-gray-500 text-xs mt-1">{new Date(gig.event_date).toLocaleDateString()}</p>
        </div>
        {gig.fee && <p className="text-green-400 font-bold">${gig.fee}</p>}
      </div>

      {/* BAND VOTE SUMMARY */}
      {bandVotes.length > 0 && (
        <button
          onClick={() => setShowVotes(!showVotes)}
          className="w-full mb-3 flex items-center justify-between bg-black/40 border border-gray-500/30 rounded p-2 hover:border-gray-400/50 transition-all"
        >
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Users className="w-4 h-4" />
            <span>{votesFor}✓ {votesAgainst}✗ ({bandVotes.length} votes)</span>
          </div>
          <span className={`text-xs font-bold ${allVotesIn ? 'text-green-400' : 'text-yellow-400'}`}>
            {allVotesIn ? '✓ All in' : '⏳ Pending'}
          </span>
        </button>
      )}

      {/* SHOW BAND VOTES */}
      {showVotes && (
        <div className="bg-black/60 border-l-2 border-cyan-500/30 pl-3 mb-3 space-y-1">
          {bandVotes.map((vote, i) => (
            <p key={i} className="text-xs text-gray-400">
              <span className={vote.decision === 'approved' ? 'text-green-400' : 'text-red-400'}>
                {vote.decision === 'approved' ? '✓' : '✗'}
              </span>
              {' '}{vote.member_name}
            </p>
          ))}
        </div>
      )}

      {/* MANAGER DECISION BUTTONS */}
      {userRole === 'manager' && !gig.manager_decision && (
        <div className="flex gap-2">
          <button
            onClick={() => handleManagerDecision('rejected')}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-900/40 hover:bg-red-900/60 border border-red-500/50 text-red-400 py-2 rounded font-bold transition-all disabled:opacity-50"
          >
            <ThumbsDown className="w-4 h-4" />
            {loading ? 'Saving...' : 'Reject'}
          </button>
          <button
            onClick={() => handleManagerDecision('approved')}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-green-900/40 hover:bg-green-900/60 border border-green-500/50 text-green-400 py-2 rounded font-bold transition-all disabled:opacity-50"
          >
            <ThumbsUp className="w-4 h-4" />
            {loading ? 'Saving...' : 'Approve'}
          </button>
        </div>
      )}

      {/* DECISION MADE */}
      {gig.manager_decision && (
        <div className={`py-2 text-center font-bold text-sm rounded ${
          gig.manager_decision === 'approved'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {gig.manager_decision === 'approved' ? '✓ Approved' : '✗ Rejected'}
        </div>
      )}
    </motion.div>
  );
}