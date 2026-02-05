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
    return (
      <div className="space-y-3">
        {pendingOffers.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            No pending offers awaiting your decision
          </div>
        ) : (
          <AnimatePresence>
            {pendingOffers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black border-2 border-cyan-500/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold text-sm">{offer.venue}</h3>
                    <p className="text-cyan-400 text-xs font-mono mt-1">
                      {offer.date} • {offer.currency || 'GBP'}{offer.fee}
                    </p>
                    {offer.city && <p className="text-gray-500 text-xs mt-1">📍 {offer.city}</p>}
                  </div>
                </div>

                {!selectedOffer || selectedOffer.id !== offer.id ? (
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-bold font-mono"
                  >
                    SHOW OPTIONS →
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => managerApproveMutation.mutate(offer)}
                      disabled={managerApproveMutation.isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded disabled:opacity-60"
                    >
                      {managerApproveMutation.isPending ? '...' : '✓ YES SEND TO BAND'}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => managerRejectMutation.mutate(offer)}
                      disabled={managerRejectMutation.isPending}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded disabled:opacity-60"
                    >
                      {managerRejectMutation.isPending ? '...' : '✕ NO REJECT'}
                    </motion.button>
                    <button
                      onClick={() => setSelectedOffer(null)}
                      className="px-3 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    );
  }

  // Band member view
  if (userRole === 'band_member') {
    return (
      <div className="space-y-3">
        {awaitingVotes.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            No pending votes - you're all caught up
          </div>
        ) : (
          <AnimatePresence>
            {awaitingVotes.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black border-2 border-green-500/50 rounded-lg p-4"
              >
                <div className="mb-3">
                  <h3 className="text-white font-bold text-sm">{offer.venue}</h3>
                  <p className="text-green-400 text-xs font-mono mt-1">
                    {offer.date} • {offer.currency || 'GBP'}{offer.fee}
                  </p>
                  {offer.city && <p className="text-gray-500 text-xs mt-1">📍 {offer.city}</p>}
                </div>

                {!selectedOffer || selectedOffer.id !== offer.id ? (
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="text-green-400 hover:text-green-300 text-xs font-bold font-mono"
                  >
                    YOUR VOTE? →
                  </button>
                ) : !showReasonPrompt ? (
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => bandVoteYesMutation.mutate(offer)}
                      disabled={bandVoteYesMutation.isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded disabled:opacity-60"
                    >
                      {bandVoteYesMutation.isPending ? '...' : '✓ YES'}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReasonPrompt(true)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded"
                    >
                      ✕ NO
                    </motion.button>
                    <button
                      onClick={() => setSelectedOffer(null)}
                      className="px-3 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      placeholder="Why not? (one sentence)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full bg-black border border-red-500/50 rounded px-3 py-2 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-red-500"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => bandVoteNoMutation.mutate(offer)}
                        disabled={bandVoteNoMutation.isPending || !reason.trim()}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded disabled:opacity-60"
                      >
                        {bandVoteNoMutation.isPending ? '...' : 'SEND'}
                      </motion.button>
                      <button
                        onClick={() => {
                          setShowReasonPrompt(false);
                          setReason('');
                        }}
                        className="px-3 bg-gray-700 hover:bg-gray-600 text-white rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    );
  }

  return null;
}