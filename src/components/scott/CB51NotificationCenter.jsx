import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

/**
 * CB51NotificationCenter
 * Handles the complete notification workflow per the PDF spec:
 * 1. Manager gets offer → decides YES/NO
 * 2. If YES → Band members get notification
 * 3. Band votes YES/NO (with reason if NO)
 * 4. Manager gets final result
 * 5. Everything documented
 */

export default function CB51NotificationCenter({ userEmail, userRole = 'manager' }) {
  const queryClient = useQueryClient();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showReasonPrompt, setShowReasonPrompt] = useState(false);
  const [reason, setReason] = useState('');

  // For managers: fetch pending offers (manager review)
  const { data: pendingOffers = [] } = useQuery({
    queryKey: ['cb51PendingOffers', userEmail],
    queryFn: () => base44.entities.ScottGigOffer.filter({ 
      status: 'pending_manager_review'
    }),
    enabled: userRole === 'manager' && !!userEmail,
  });

  // For band members: fetch offers awaiting their vote
  const { data: awaitingVotes = [] } = useQuery({
    queryKey: ['cb51AwaitingVotes', userEmail],
    queryFn: async () => {
      try {
        const allOffers = await base44.entities.ScottGigOffer.filter({ 
          status: 'sent_to_band'
        });
        const responses = await base44.entities.ScottBandResponse.filter({
          band_member_email: userEmail
        });
        const votedOfferIds = new Set(responses.map(r => r.gig_offer_id));
        return allOffers.filter(o => !votedOfferIds.has(o.id));
      } catch (e) {
        console.log('Vote query error:', e);
        return [];
      }
    },
    enabled: userRole === 'band_member' && !!userEmail,
  });

  // Manager approves offer → send to band
  const managerApproveMutation = useMutation({
    mutationFn: async (offer) => {
      await base44.entities.ScottGigOffer.update(offer.id, {
        status: 'sent_to_band',
        manager_approved: true,
        sent_to_band_date: new Date().toISOString(),
      });
      
      // Send push notifications to band members
      try {
        await base44.functions.invoke('notifyBandGigApproval', {
          gig_offer_id: offer.id,
          venue: offer.venue,
          date: offer.date,
          fee: offer.fee,
          currency: offer.currency || 'GBP'
        });
      } catch (e) {
        console.log('Push notification failed (non-critical):', e);
      }
      
      return offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cb51PendingOffers'] });
      setSelectedOffer(null);
    },
  });

  // Manager rejects offer
  const managerRejectMutation = useMutation({
    mutationFn: async (offer) => {
      await base44.entities.ScottGigOffer.update(offer.id, {
        status: 'rejected_by_manager',
      });
      return offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cb51PendingOffers'] });
      setSelectedOffer(null);
    },
  });

  // Band member votes YES
  const bandVoteYesMutation = useMutation({
    mutationFn: async (offer) => {
      const user = await base44.auth.me();
      await base44.entities.ScottBandResponse.create({
        gig_offer_id: offer.id,
        band_member_email: user.email,
        band_member_name: user.full_name,
        artist_id: offer.artist_id,
        vote: 'yes',
        responded_at: new Date().toISOString(),
      });
      
      // Notify manager of vote
      try {
        await base44.functions.invoke('notifyManagerOnBandVote', {
          gig_offer_id: offer.id,
          band_member_name: user.full_name,
          vote: 'yes'
        });
      } catch (e) {
        console.log('Manager notification failed (non-critical):', e);
      }
      
      return offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cb51AwaitingVotes'] });
      setSelectedOffer(null);
    },
  });

  // Band member votes NO
  const bandVoteNoMutation = useMutation({
    mutationFn: async (offer) => {
      const user = await base44.auth.me();
      if (!reason.trim()) {
        throw new Error('Please provide a reason');
      }
      await base44.entities.ScottBandResponse.create({
        gig_offer_id: offer.id,
        band_member_email: user.email,
        band_member_name: user.full_name,
        artist_id: offer.artist_id,
        vote: 'no',
        reason: reason,
        responded_at: new Date().toISOString(),
      });
      
      // Notify manager of NO vote with reason
      try {
        await base44.functions.invoke('notifyManagerOnBandVote', {
          gig_offer_id: offer.id,
          band_member_name: user.full_name,
          vote: 'no',
          reason: reason
        });
      } catch (e) {
        console.log('Manager notification failed (non-critical):', e);
      }
      
      return offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cb51AwaitingVotes'] });
      setSelectedOffer(null);
      setReason('');
      setShowReasonPrompt(false);
    },
  });

  if (userRole === 'manager') {
    return pendingOffers.length === 0 ? null : (
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {pendingOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-2 border-cyan-500/50"
            >
              <div className="mb-4">
                <h3 className="text-white font-black text-lg mb-1">{offer.venue}</h3>
                <p className="text-cyan-300 text-sm font-semibold">
                  {offer.date} • {offer.currency || 'GBP'}{offer.fee}
                </p>
                {offer.city && <p className="text-white/60 text-xs mt-1">📍 {offer.city}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => managerApproveMutation.mutate(offer)}
                  disabled={managerApproveMutation.isPending}
                  className="h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-base disabled:opacity-50"
                >
                  {managerApproveMutation.isPending ? '...' : '✓ YES'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => managerRejectMutation.mutate(offer)}
                  disabled={managerRejectMutation.isPending}
                  className="h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-black text-base disabled:opacity-50"
                >
                  {managerRejectMutation.isPending ? '...' : '✕ NO'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Band member view
  if (userRole === 'band_member') {
    return awaitingVotes.length === 0 ? null : (
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {awaitingVotes.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50"
            >
              <div className="mb-4">
                <h3 className="text-white font-black text-lg mb-1">{offer.venue}</h3>
                <p className="text-green-300 text-sm font-semibold">
                  {offer.date} • {offer.currency || 'GBP'}{offer.fee}
                </p>
                {offer.city && <p className="text-white/60 text-xs mt-1">📍 {offer.city}</p>}
              </div>

              {!showReasonPrompt ? (
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => bandVoteYesMutation.mutate(offer)}
                    disabled={bandVoteYesMutation.isPending}
                    className="h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-base disabled:opacity-50"
                  >
                    {bandVoteYesMutation.isPending ? '...' : '✓ YES'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReasonPrompt(true)}
                    className="h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-black text-base"
                  >
                    ✕ NO
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    placeholder="Why not? (one sentence)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-black/40 border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => bandVoteNoMutation.mutate(offer)}
                      disabled={bandVoteNoMutation.isPending || !reason.trim()}
                      className="h-12 bg-red-600 text-white font-bold rounded-2xl disabled:opacity-50"
                    >
                      {bandVoteNoMutation.isPending ? '...' : 'SEND'}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowReasonPrompt(false);
                        setReason('');
                      }}
                      className="h-12 bg-white/10 text-white font-bold rounded-2xl"
                    >
                      CANCEL
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}