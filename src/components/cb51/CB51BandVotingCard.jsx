import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CB51BandVotingCard({ gigId, artistId, memberName, memberEmail, onVoteSubmit }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [showWhyPrompt, setShowWhyPrompt] = useState(false);
  const [whyText, setWhyText] = useState('');
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async (voteData) => {
      const response = await base44.entities.GigVote.create(voteData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigVotes', gigId] });
      queryClient.invalidateQueries({ queryKey: ['gig', gigId] });
      setHasVoted(true);
      setTimeout(() => {
        onVoteSubmit?.();
      }, 1000);
    }
  });

  const handleYes = () => {
    voteMutation.mutate({
      gig_id: gigId,
      artist_id: artistId,
      member_name: memberName,
      member_email: memberEmail,
      vote: 'yes',
      reason: null
    });
  };

  const handleNo = () => {
    setShowWhyPrompt(true);
  };

  const handleSubmitNo = () => {
    if (!whyText.trim()) return;
    voteMutation.mutate({
      gig_id: gigId,
      artist_id: artistId,
      member_name: memberName,
      member_email: memberEmail,
      vote: 'no',
      reason: whyText.trim()
    });
    setShowWhyPrompt(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border-2 border-cyan-500/40 rounded-lg p-4 space-y-3"
    >
      <p className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider">Your vote matters</p>
      <p className="text-gray-300 text-sm">Can you make this gig?</p>

      {!hasVoted ? (
        <AnimatePresence mode="wait">
          {!showWhyPrompt ? (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2 pt-2"
            >
              <button
                onClick={handleYes}
                disabled={voteMutation.isPending}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
              >
                {voteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                YES
              </button>
              <button
                onClick={handleNo}
                disabled={voteMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
              >
                <X className="w-4 h-4" />
                NO
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <label className="text-xs text-gray-400 font-mono">Why can't you make it?</label>
              <textarea
                value={whyText}
                onChange={(e) => setWhyText(e.target.value)}
                placeholder="Keep it brief — your manager will see this"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3 py-2 rounded text-sm resize-none h-20 focus:border-red-500 outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowWhyPrompt(false); setWhyText(''); }}
                  className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 py-2 rounded text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitNo}
                  disabled={!whyText.trim() || voteMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-2 rounded text-xs font-bold transition-all"
                >
                  {voteMutation.isPending ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center"
        >
          <p className="text-green-400 font-bold text-sm">✓ Your vote recorded</p>
          <p className="text-gray-400 text-xs mt-1">Manager will confirm once all members vote</p>
        </motion.div>
      )}
    </motion.div>
  );
}