import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, MapPin, DollarSign, CheckCircle, XCircle, User, Mail, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51NotificationInbox({ artistId }) {
  const queryClient = useQueryClient();
  const [expandedGigId, setExpandedGigId] = useState(null);

  // Fetch pending gigs for this artist
  const { data: pendingGigs = [], isLoading } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId,
      status: 'manager_reviewing'
    }),
    enabled: !!artistId
  });

  // Manager approves gig
  const approveMutation = useMutation({
    mutationFn: async (gigId) => {
      const gig = await base44.entities.GigOffer.update(gigId, {
        status: 'band_voting'
      });
      // Notify band members
      await base44.functions.invoke('notifyBandGigOffer', { gigOfferId: gigId });
      return gig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExpandedGigId(null);
    }
  });

  // Manager rejects gig
  const rejectMutation = useMutation({
    mutationFn: async (gigId) => {
      await base44.entities.GigOffer.update(gigId, {
        status: 'rejected',
        manager_decision: 'rejected'
      });
      return gigId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExpandedGigId(null);
    }
  });

  if (isLoading) {
    return (
      <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-4 text-center">
        <p className="text-cyan-400 font-bold text-xs font-mono">LOADING...</p>
      </div>
    );
  }

  if (pendingGigs.length === 0) {
    return (
      <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-4 text-center">
        <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
        <p className="text-cyan-400 font-bold text-sm font-mono">NO PENDING OFFERS</p>
        <p className="text-gray-600 text-xs mt-1">Waiting for gig offers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-cyan-400 font-black text-sm font-mono">GIG OFFERS ({pendingGigs.length})</h2>
        <span className="text-[10px] font-mono text-gray-500">MANAGER APPROVAL</span>
      </div>
      
      <AnimatePresence mode="popLayout">
        {pendingGigs.map((gig) => (
          <motion.div
            key={gig.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setExpandedGigId(expandedGigId === gig.id ? null : gig.id)}
            className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-3 cursor-pointer transition-all"
          >
            {/* HEADER - Quick View */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-black text-sm">{gig.title || gig.venue || 'Untitled Gig'}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-400">
                  {gig.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {gig.location}
                    </div>
                  )}
                  {gig.date_start && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {gig.date_start}
                    </div>
                  )}
                  {gig.fee && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      £{gig.fee}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 text-xs font-mono text-gray-500 ml-2">
                {expandedGigId === gig.id ? '▼' : '▶'}
              </div>
            </div>

            {/* EXPANDED - Full Details */}
            <AnimatePresence>
              {expandedGigId === gig.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-cyan-500/20 space-y-2"
                >
                  {/* Promoter Info */}
                  {gig.promoter_name && (
                    <div className="bg-cyan-900/20 p-2 rounded text-xs text-white">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <User className="w-3 h-3" />
                        {gig.promoter_name}
                      </div>
                      {gig.promoter_email && (
                        <div className="flex items-center gap-2 text-gray-400 ml-5">
                          <Mail className="w-3 h-3" />
                          {gig.promoter_email}
                        </div>
                      )}
                      {gig.promoter_phone && (
                        <div className="flex items-center gap-2 text-gray-400 ml-5">
                          <Phone className="w-3 h-3" />
                          {gig.promoter_phone}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Offer Details */}
                  {gig.offer_details && (
                    <div className="bg-black/60 p-2 rounded text-[11px] text-gray-300 max-h-24 overflow-y-auto">
                      {gig.offer_details}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-cyan-500/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rejectMutation.mutate(gig.id);
                      }}
                      disabled={rejectMutation.isPending}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 hover:border-red-500 disabled:opacity-50 text-red-400 font-bold py-2 rounded text-xs transition-all"
                    >
                      <XCircle className="w-3 h-3" />
                      {rejectMutation.isPending ? 'REJECTING...' : 'REJECT'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveMutation.mutate(gig.id);
                      }}
                      disabled={approveMutation.isPending}
                      className="flex-1 flex items-center justify-center gap-1 bg-green-900/40 hover:bg-green-900/60 border border-green-500/40 hover:border-green-500 disabled:opacity-50 text-green-400 font-bold py-2 rounded text-xs transition-all"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {approveMutation.isPending ? 'APPROVING...' : 'APPROVE'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}