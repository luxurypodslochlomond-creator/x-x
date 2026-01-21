import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ScottManagerVotingDashboard from './ScottManagerVotingDashboard';

/**
 * GIG OFFER WORKFLOW - Manager actions at each stage
 * Simple flow: Manager YES/NO → Send to Band → Band Votes → Confirm/Reject
 */

export default function ScottGigWorkflow({ gigOffer }) {
  const [showVotes, setShowVotes] = useState(false);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus) =>
      base44.entities.ScottGigOffer.update(gigOffer.id, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigOffers'] });
    }
  });

  const handleSendToBand = async () => {
    // Update status to sent_to_band
    // This will trigger the notifyBandGigOffer automation
    await updateStatusMutation.mutateAsync('sent_to_band');
  };

  const handleConfirm = async () => {
    // Send confirmation email to promoter
    updateStatusMutation.mutate('confirmed');
  };

  const handleReject = async () => {
    updateStatusMutation.mutate('rejected');
  };

  // Status indicator
  const statusConfig = {
    pending_manager_review: {
      label: 'WAITING FOR YOU',
      color: 'amber',
      icon: Clock
    },
    sent_to_band: {
      label: 'BAND VOTING',
      color: 'cyan',
      icon: Clock
    },
    confirmed: {
      label: 'CONFIRMED',
      color: 'green',
      icon: CheckCircle2
    },
    rejected: {
      label: 'REJECTED',
      color: 'red',
      icon: XCircle
    }
  };

  const config = statusConfig[gigOffer.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4"
    >
      {/* Status */}
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 text-${config.color}-400`} />
        <p className={`text-${config.color}-400 font-black font-mono text-sm`}>
          {config.label}
        </p>
      </div>

      {/* Actions based on status */}
      {gigOffer.status === 'pending_manager_review' && (
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendToBand}
            disabled={updateStatusMutation.isPending}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black py-2 rounded-lg transition-all font-mono flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            SEND TO BAND
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReject}
            disabled={updateStatusMutation.isPending}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-black py-2 rounded-lg transition-all font-mono border border-red-500/50"
          >
            REJECT
          </motion.button>
        </div>
      )}

      {gigOffer.status === 'sent_to_band' && (
        <>
          <button
            onClick={() => setShowVotes(!showVotes)}
            className="w-full text-cyan-400 font-mono text-xs hover:text-cyan-300"
          >
            {showVotes ? '▼' : '▶'} SHOW BAND VOTES
          </button>
          {showVotes && <ScottManagerVotingDashboard gigOfferId={gigOffer.id} />}
        </>
      )}

      {gigOffer.status === 'confirmed' && (
        <div className="bg-green-500/10 border border-green-500/50 rounded p-3">
          <p className="text-green-400 font-mono text-xs">✓ Confirmed & synced to calendars</p>
        </div>
      )}

      {gigOffer.status === 'rejected' && (
        <div className="bg-red-500/10 border border-red-500/50 rounded p-3">
          <p className="text-red-400 font-mono text-xs">✗ Rejected</p>
        </div>
      )}
    </motion.div>
  );
}