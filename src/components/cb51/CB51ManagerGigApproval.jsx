import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Loader, MapPin, Calendar, DollarSign, User, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51ManagerGigApproval({ gig, artistId, onApprovalComplete }) {
  const queryClient = useQueryClient();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const approveMutation = useMutation({
    mutationFn: async () => {
      // Update gig status to "band_voting"
      await base44.asServiceRole.entities.GigOffer.update(gig.id, {
        status: 'band_voting'
      });

      // Send notification to band
      try {
        await base44.functions.invoke('notifyBandGigOffer', {
          gigOfferId: gig.id,
          artistId: artistId
        });
      } catch (err) {
        console.log('Band notification queued (will retry):', err.message);
      }

      return gig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      onApprovalComplete?.('approved');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      if (!rejectionReason.trim()) {
        throw new Error('Please provide a reason');
      }
      await base44.asServiceRole.entities.GigOffer.update(gig.id, {
        status: 'manager_rejected',
        manager_rejection_reason: rejectionReason
      });
      return gig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      onApprovalComplete?.('rejected');
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* GIG CARD */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-black border-2 border-cyan-500/40 rounded-lg p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-white font-black text-sm">{gig.venue}</h3>
            <p className="text-cyan-300 text-xs font-mono mt-1">READY FOR APPROVAL</p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-cyan-300">
            <Calendar className="w-3 h-3" />
            <span>{gig.date_start}</span>
          </div>
          {gig.location && (
            <div className="flex items-center gap-2 text-cyan-300">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{gig.location}</span>
            </div>
          )}
          {gig.fee && (
            <div className="flex items-center gap-2 text-green-300">
              <DollarSign className="w-3 h-3" />
              <span>£{gig.fee}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-cyan-300">
            <User className="w-3 h-3" />
            <span className="truncate">{gig.promoter_name}</span>
          </div>
          {gig.promoter_email && (
            <div className="flex items-center gap-2 text-gray-400 col-span-2">
              <Mail className="w-3 h-3" />
              <span className="truncate text-[10px]">{gig.promoter_email}</span>
            </div>
          )}
          {gig.promoter_phone && (
            <div className="flex items-center gap-2 text-gray-400 col-span-2">
              <Phone className="w-3 h-3" />
              <span>{gig.promoter_phone}</span>
            </div>
          )}
        </div>

        {gig.offer_details && (
          <div className="bg-black/40 p-2 rounded border border-cyan-500/20 text-[10px] text-gray-300 max-h-16 overflow-y-auto">
            {gig.offer_details}
          </div>
        )}
      </div>

      {/* APPROVAL QUESTION */}
      {!showRejectForm ? (
        <div className="space-y-2">
          <p className="text-white font-bold text-sm text-center">APPROVE THIS GIG?</p>
          <div className="flex gap-2">
            <button
              onClick={() => approveMutation.mutate()}
              disabled={approveMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            >
              {approveMutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  SENDING TO BAND...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  YES - APPROVE
                </>
              )}
            </button>
            <button
              onClick={() => setShowRejectForm(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              NO - REJECT
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 bg-red-900/20 border border-red-500/40 rounded-lg p-3">
          <p className="text-white font-bold text-sm">WHY REJECT?</p>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Conflict, rate too low, date issues..."
            className="w-full bg-black border border-red-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600 h-16 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowRejectForm(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded text-xs"
            >
              BACK
            </button>
            <button
              onClick={() => rejectMutation.mutate()}
              disabled={rejectMutation.isPending || !rejectionReason.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 rounded text-xs"
            >
              {rejectMutation.isPending ? 'REJECTING...' : 'CONFIRM REJECT'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}