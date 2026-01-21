import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * BAND VOTING MODAL - Green Yes / Red No
 * Simple, clean, stress-free decision interface
 */

export default function ScottBandVotingModal({ gigOffer, bandMember, onClose }) {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const submitVoteMutation = useMutation({
    mutationFn: async (data) => {
      // Check if response already exists
      const existing = await base44.entities.ScottBandResponse.filter({
        gig_offer_id: gigOffer.id,
        band_member_email: bandMember.email
      });

      if (existing.length > 0) {
        // Update existing
        return base44.entities.ScottBandResponse.update(existing[0].id, data);
      } else {
        // Create new
        return base44.entities.ScottBandResponse.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bandResponses'] });
      onClose();
    }
  });

  const handleSubmit = () => {
    if (!selectedDecision) return;

    submitVoteMutation.mutate({
      gig_offer_id: gigOffer.id,
      band_member_email: bandMember.email,
      band_member_name: bandMember.name,
      decision: selectedDecision,
      reason_if_no: selectedDecision === 'no' ? reason : null,
      responded_at: new Date().toISOString()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-black border-2 border-cyan-500 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-cyan-400 text-xs font-mono">GIG OFFER</p>
            <p className="text-white font-black text-lg font-mono">{gigOffer.venue_name}</p>
            <p className="text-gray-600 text-xs font-mono mt-1">{gigOffer.date}</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Decision Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.button
            whileHover={{ scale: selectedDecision === 'yes' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDecision('yes')}
            className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              selectedDecision === 'yes'
                ? 'bg-green-500/30 border-green-500'
                : 'bg-black border-gray-800 hover:border-green-500/50'
            }`}
          >
            <ThumbsUp className={`w-8 h-8 ${selectedDecision === 'yes' ? 'text-green-400' : 'text-gray-600'}`} />
            <span className={`font-black font-mono text-sm ${selectedDecision === 'yes' ? 'text-green-400' : 'text-gray-600'}`}>
              YES
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: selectedDecision === 'no' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDecision('no')}
            className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              selectedDecision === 'no'
                ? 'bg-red-500/30 border-red-500'
                : 'bg-black border-gray-800 hover:border-red-500/50'
            }`}
          >
            <ThumbsDown className={`w-8 h-8 ${selectedDecision === 'no' ? 'text-red-400' : 'text-gray-600'}`} />
            <span className={`font-black font-mono text-sm ${selectedDecision === 'no' ? 'text-red-400' : 'text-gray-600'}`}>
              NO
            </span>
          </motion.button>
        </div>

        {/* If NO - Show reason field */}
        {selectedDecision === 'no' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <textarea
              placeholder="Why not? (managers need to know)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-black border border-red-500/50 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-red-500 resize-none"
              rows={3}
            />
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedDecision || (selectedDecision === 'no' && !reason)}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-800 disabled:text-gray-600 text-black font-black py-3 rounded-lg transition-all font-mono"
        >
          {submitVoteMutation.isPending ? 'SUBMITTING...' : 'SUBMIT'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}