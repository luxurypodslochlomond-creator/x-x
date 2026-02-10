import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader } from 'lucide-react';

/**
 * 2026 PREMIUM NOTIFICATION - Beautiful, breathing, alive
 * Warm gradients. Smooth animations. Clean typography.
 * Manager + Band see same gorgeous interface.
 */

export default function CB51GigVoteNotification({ 
  gigId, 
  venue,
  date,
  fee,
  artistName,
  userRole = 'manager',
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
        vote_type: type,
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`p-6 rounded-2xl text-center backdrop-blur-xl ${
          voteType === 'yes'
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-400/50'
            : 'bg-gradient-to-br from-red-500/20 to-rose-600/10 border border-red-400/50'
        }`}
        style={{
          boxShadow: voteType === 'yes' 
            ? '0 8px 32px rgba(16, 185, 129, 0.2)' 
            : '0 8px 32px rgba(239, 68, 68, 0.2)'
        }}
      >
        <p className={`text-lg font-bold tracking-wide ${voteType === 'yes' ? 'text-green-300' : 'text-red-300'}`}>
          ✓ {voteType === 'yes' ? 'YES' : 'NO'} recorded
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gradient-to-br from-rose-950/40 via-black to-amber-950/20 rounded-2xl p-8 space-y-6 backdrop-blur-sm border border-rose-500/20"
      style={{
        boxShadow: '0 20px 60px rgba(236, 72, 153, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* GIG DETAILS - Clean, breathing */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎸</span>
          <span className="text-xs font-mono text-rose-300/70 uppercase tracking-widest">Gig Offer</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-white mb-3 leading-tight">{venue}</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-mono text-amber-200/80">{date}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="font-mono text-amber-200/80">£{fee}</span>
          </div>
        </div>

        {userRole === 'band_member' && (
          <p className="text-xs text-gray-400 mt-2">For: {artistName}</p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showReasonPrompt ? (
          <motion.div
            key="reason"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 pt-2"
          >
            <p className="text-sm text-white font-medium">Why can't you do this?</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="A sentence is enough"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm resize-none h-20 placeholder-gray-500 focus:outline-none focus:border-rose-400/50 transition-colors"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleVote('no')}
                disabled={!reason.trim() || isVoting}
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isVoting ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                Submit
              </button>
              <button
                onClick={() => {
                  setShowReasonPrompt(false);
                  setReason('');
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVote('yes')}
              disabled={isVoting}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
              style={{
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}
            >
              {isVoting && voteType === 'yes' ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Check className="w-5 h-5" />
              )}
              YES
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVote('no')}
              disabled={isVoting}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
              style={{
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)'
              }}
            >
              {isVoting && voteType === 'no' ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <X className="w-5 h-5" />
              )}
              NO
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}