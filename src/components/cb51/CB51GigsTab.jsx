import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CB51GigUploadParser from './CB51GigUploadParser';
import CB51GigDecisionEngine from './CB51GigDecisionEngine';
import CB51ConfirmedGigDraftEmail from './CB51ConfirmedGigDraftEmail';
import { ChevronRight } from 'lucide-react';

export default function CB51GigsTab({ artistId }) {
  const [reviewingGig, setReviewingGig] = useState(null);
  const [confirmingGig, setConfirmingGig] = useState(false);
  // v2 — cleaned
  const queryClient = useQueryClient();

  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []);
      const seen = new Set();
      return gigs.filter(g => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });
    },
    enabled: !!artistId,
    staleTime: 30000,
    gcTime: 180000
  });

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 20000,
    gcTime: 120000
  });

  const handleConfirmGig = async (gig) => {
    setConfirmingGig(true);
    try {
      await base44.entities.GigOffer.update(gig.id, { status: 'confirmed', manager_approved: true });
      await base44.functions.invoke('sendGigConfirmationPush', {
        artistId: artistId,
        gigId: gig.id,
        gigVenue: gig.venue,
        gigDate: gig.date_start,
        gigFee: gig.fee
      });
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['confirmedGigs', artistId] });
      setReviewingGig(null);
    } catch (error) {
      console.error('Error confirming gig:', error);
    } finally {
      setConfirmingGig(false);
    }
  };

  return (
    <motion.div
      key="gigs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-6 space-y-8"
    >
      {/* UPLOAD NEW OFFER */}
      <div>
        <div className="space-y-2 mb-4">
          <h2 className="text-white font-black text-lg">Add Gig Offer</h2>
          <p className="text-gray-500 text-sm">Paste email, upload screenshot, or drag file</p>
        </div>
        <CB51GigUploadParser artistId={artistId} onSuccess={() => queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] })} />
      </div>

      {/* PENDING OFFERS FOR REVIEW */}
      {pendingGigs.length > 0 && (
        <div className="border-t border-cyan-500/10 pt-8">
          <div className="space-y-2 mb-6">
            <h2 className="text-cyan-400 font-black text-xl">Awaiting Your Approval</h2>
            <p className="text-gray-500 text-sm">Review and confirm to notify artist</p>
          </div>
          <div className="space-y-2">
            {pendingGigs.slice(0, 5).map(gig => (
              <motion.div key={gig.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <button
                  onClick={() => setReviewingGig(reviewingGig?.id === gig.id ? null : gig)}
                  className="w-full text-left bg-gray-900 border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold">{gig.venue}</p>
                      <p className="text-gray-400 text-sm">{gig.date_start}</p>
                      <p className="text-cyan-400 font-bold text-sm mt-1">£{gig.fee?.toLocaleString()}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: reviewingGig?.id === gig.id ? 180 : 0 }}
                      className="text-cyan-400 flex-shrink-0"
                    >
                      ▼
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {reviewingGig?.id === gig.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-800/50 border border-t-0 border-cyan-500/20 rounded-b-lg p-4 space-y-3">
                        {gig.location && (
                          <div>
                            <p className="text-gray-500 text-xs mb-1">LOCATION</p>
                            <p className="text-gray-300 text-sm">{gig.location}</p>
                          </div>
                        )}
                        {gig.promoter_name && (
                          <div>
                            <p className="text-gray-500 text-xs mb-1">PROMOTER</p>
                            <p className="text-gray-300 font-bold text-sm">{gig.promoter_name}</p>
                            {gig.promoter_contact && (
                              <p className="text-gray-400 text-xs mt-1">{gig.promoter_contact}</p>
                            )}
                          </div>
                        )}
                        <div className="flex gap-2 pt-2 border-t border-gray-700">
                          <button
                            onClick={() => setReviewingGig(null)}
                            disabled={confirmingGig}
                            className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold text-sm transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleConfirmGig(gig)}
                            disabled={confirmingGig}
                            className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-bold text-sm transition-colors disabled:opacity-50"
                          >
                            {confirmingGig ? 'Confirming...' : 'Confirm'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* DECISION ENGINE */}
      <div className="border-t border-cyan-500/10 pt-8">
        <div className="space-y-2 mb-6">
          <h2 className="text-cyan-400 font-black text-xl">Pending Offers</h2>
          <p className="text-gray-500 text-sm">YES/NO to decide · AI reads offers instantly</p>
        </div>
        <CB51GigDecisionEngine artistId={artistId} />
      </div>

      {/* CONFIRMED GIGS */}
      <div className="border-t border-cyan-500/10 pt-8">
        <div className="space-y-2 mb-6">
          <h2 className="text-cyan-400 font-black text-xl">Confirmed Gigs</h2>
          <p className="text-gray-500 text-sm">Draft email ready · tap to send to promoter</p>
        </div>
        <CB51ConfirmedGigDraftEmail artistId={artistId} />
      </div>
    </motion.div>
  );
}