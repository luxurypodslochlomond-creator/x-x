import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, MapPin, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51PendingGigs({ artistId }) {
  const queryClient = useQueryClient();
  const [expandedGigId, setExpandedGigId] = useState(null);

  // Fetch pending gigs for this artist
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId,
      status: 'manager_reviewing'
    }),
    enabled: !!artistId
  });

  // Mutation to approve gig (send to band)
  const approveMutation = useMutation({
    mutationFn: async (gigId) => {
      const gig = await base44.entities.GigOffer.update(gigId, {
        status: 'sent_to_band',
        manager_decision: 'approved'
      });
      // Trigger notification to band
      await base44.functions.invoke('notifyBandGigApproval', { gigOfferId: gigId });
      return gig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
    }
  });

  // Mutation to reject gig
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
    }
  });

  if (pendingGigs.length === 0) {
    return (
      <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-6 text-center">
        <p className="text-cyan-400 font-black text-sm font-mono">NO PENDING GIGS</p>
        <p className="text-gray-600 text-xs mt-2">Waiting for offers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-cyan-400 font-black text-sm font-mono mb-3">PENDING GIGS ({pendingGigs.length})</h2>
      
      {pendingGigs.map(gig => (
        <motion.div
          key={gig.id}
          onClick={() => setExpandedGigId(expandedGigId === gig.id ? null : gig.id)}
          className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 cursor-pointer hover:border-cyan-500 transition-all"
        >
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-black text-base">{gig.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {gig.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {gig.date_start}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  £{gig.fee || '0'}
                </div>
              </div>
            </div>
            <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          </div>

          {/* EXPANDED */}
          {expandedGigId === gig.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-cyan-500/20 space-y-3"
            >
              <div className="bg-cyan-900/20 p-3 rounded text-sm text-white">
                <p className="font-bold mb-1">Promoter:</p>
                <p>{gig.promoter_name}</p>
                {gig.promoter_email && <p className="text-xs text-gray-400">{gig.promoter_email}</p>}
                {gig.promoter_phone && <p className="text-xs text-gray-400">{gig.promoter_phone}</p>}
              </div>

              {gig.offer_details && (
                <div className="bg-black/60 p-3 rounded text-sm text-gray-300">
                  <p className="font-bold mb-1 text-white">Details:</p>
                  {gig.offer_details}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    approveMutation.mutate(gig.id);
                  }}
                  disabled={approveMutation.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 rounded text-sm"
                >
                  {approveMutation.isPending ? 'APPROVING...' : 'APPROVE & SEND TO BAND'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rejectMutation.mutate(gig.id);
                  }}
                  disabled={rejectMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 rounded text-sm"
                >
                  {rejectMutation.isPending ? 'REJECTING...' : 'REJECT'}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}