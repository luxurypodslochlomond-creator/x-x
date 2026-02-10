import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Check, X, Loader } from 'lucide-react';

/**
 * GIG OFFER NOTIFICATION - GREEN YES / RED NO
 * Shows inline in notification + dashboard
 * Manager + Band members see same interface
 * Simple, stress-free, no clutter
 */

export default function CB51GigVoteNotification({ 
  gigId, 
  venue,
  date,
  fee,
  artistName,
  userRole = 'manager', // 'manager' or 'band_member'
  onVoteComplete
}) {
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);
  const [showReasonPrompt, setShowReasonPrompt] = useState(false);
  const [reason, setReason] = useState('');

  const handleVote = async (type) => {
    if (type === 'no') {
      setShowReasonPrompt(true);
      return;
    }

    setIsVoting(true);
    setVoteType(type);

    try {
      await base44.entities.GigVote.create({
        gig_id: gigId,
        voted_by_role: userRole,
        vote_type: type, // 'yes' or 'no'
        reason: reason || null,
        voted_at: new Date().toISOString()
      });

      setVoted(true);
      setTimeout(() => {
        if (onVoteComplete) onVoteComplete(type);
      }, 1500);
    } catch (error) {
      console.error('Vote failed:', error);
      alert('Vote failed - try again');
    } finally {
      setIsVoting(false);
    }
  };

  if (voted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`p-4 rounded-lg text-center font-bold ${
          voteType === 'yes'
            ? 'bg-green-900/30 border-2 border-green-500 text-green-400'
            : 'bg-red-900/30 border-2 border-red-500 text-red-400'
        }`}
      >
        <p className="text-sm">✓ {voteType === 'yes' ? 'YES' : 'NO'} recorded</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black border-2 border-cyan-500 rounded-lg p-5 space-y-4"
      style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
    >
      {/* GIG DETAILS */}
      <div className="space-y-2 text-sm">
        <p className="text-cyan-400 font-black text-xs uppercase tracking-wider">🎸 GIG OFFER</p>
        <p className="text-white font-bold text-lg">{venue}</p>
        <div className="flex gap-4 text-gray-300 text-xs font-mono">
          <span>{date}</span>
          <span>£{fee}</span>
        </div>
        {userRole === 'band_member' && (
          <p className="text-gray-400 text-xs italic pt-2">Artist: {artistName}</p>
        )}
      </div>

      {/* NO REASON PROMPT */}
      {showReasonPrompt ? (
        <div className="space-y-2">
          <p className="text-white font-bold text-xs">Why can't you do this?</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Simple reason (1-2 sentences)"
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-xs font-mono resize-none h-16"
          />
          <button
            onClick={() => handleVote('no')}
            disabled={!reason.trim() || isVoting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-xs disabled:opacity-50 transition-all"
          >
            {isVoting ? <Loader className="inline w-3 h-3 animate-spin mr-1" /> : null}
            SUBMIT NO
          </button>
          <button
            onClick={() => {
              setShowReasonPrompt(false);
              setReason('');
            }}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 rounded text-xs transition-all"
          >
            CANCEL
          </button>
        </div>
      ) : (
        /* YES/NO BUTTONS */
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleVote('yes')}
            disabled={isVoting}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {isVoting && voteType === 'yes' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            YES
          </button>
          <button
            onClick={() => handleVote('no')}
            disabled={isVoting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {isVoting && voteType === 'no' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
            NO
          </button>
        </div>
      )}
    </motion.div>
  );
}