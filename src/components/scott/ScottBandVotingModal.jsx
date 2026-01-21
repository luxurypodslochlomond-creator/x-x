import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * BAND VOTING SHEET - Mobile-first, expandable, touch-friendly
 * Green Yes / Red No - simple decisions
 */

export default function ScottBandVotingModal({ gigOffer, bandMember, onClose, isOpen }) {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const submitVoteMutation = useMutation({
    mutationFn: async (data) => {
      const existing = await base44.entities.ScottBandResponse.filter({
        gig_offer_id: gigOffer.id,
        band_member_email: bandMember.email
      });

      if (existing.length > 0) {
        return base44.entities.ScottBandResponse.update(existing[0].id, data);
      } else {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          
          {/* Sheet - slides up from bottom on mobile, centered on desktop */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 max-h-[90vh] lg:max-h-none lg:max-w-md w-full overflow-y-auto"
          >
            <div className="bg-black border-t-2 lg:border-2 border-cyan-500 rounded-t-2xl lg:rounded-2xl p-6 lg:p-8 min-h-screen lg:min-h-auto">
              
              {/* Drag handle - mobile only */}
              <div className="lg:hidden flex justify-center mb-4">
                <div className="w-12 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <p className="text-cyan-400 text-xs font-mono">GIG OFFER</p>
                  <p className="text-white font-black text-lg font-mono">{gigOffer.venue_name}</p>
                  <p className="text-gray-600 text-xs font-mono mt-1">{gigOffer.date}</p>
                </div>
                <button onClick={onClose} className="text-gray-600 hover:text-white p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Decision Buttons - big touch targets */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDecision('yes')}
                  className={`p-8 rounded-xl border-2 transition-all flex flex-col items-center gap-3 min-h-32 justify-center ${
                    selectedDecision === 'yes'
                      ? 'bg-green-500/30 border-green-500'
                      : 'bg-black border-gray-800 active:border-green-500/50'
                  }`}
                >
                  <ThumbsUp className={`w-10 h-10 ${selectedDecision === 'yes' ? 'text-green-400' : 'text-gray-600'}`} />
                  <span className={`font-black font-mono text-base ${selectedDecision === 'yes' ? 'text-green-400' : 'text-gray-600'}`}>
                    YES
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDecision('no')}
                  className={`p-8 rounded-xl border-2 transition-all flex flex-col items-center gap-3 min-h-32 justify-center ${
                    selectedDecision === 'no'
                      ? 'bg-red-500/30 border-red-500'
                      : 'bg-black border-gray-800 active:border-red-500/50'
                  }`}
                >
                  <ThumbsDown className={`w-10 h-10 ${selectedDecision === 'no' ? 'text-red-400' : 'text-gray-600'}`} />
                  <span className={`font-black font-mono text-base ${selectedDecision === 'no' ? 'text-red-400' : 'text-gray-600'}`}>
                    NO
                  </span>
                </motion.button>
              </div>

              {/* If NO - Show reason field */}
              <AnimatePresence>
                {selectedDecision === 'no' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <textarea
                      placeholder="Why? (managers need to know)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full bg-black border border-red-500/50 rounded-lg p-4 text-white text-base focus:outline-none focus:border-red-500 resize-none"
                      rows={4}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button - big touch target */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedDecision || (selectedDecision === 'no' && !reason)}
                className="w-full bg-cyan-500 hover:lg:bg-cyan-600 active:bg-cyan-700 disabled:bg-gray-800 disabled:text-gray-600 text-black font-black py-4 rounded-lg transition-all font-mono text-base min-h-12"
              >
                {submitVoteMutation.isPending ? 'SUBMITTING...' : 'SUBMIT'}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}