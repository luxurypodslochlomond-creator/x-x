import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock, Zap, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51NotificationFeed({ artistId }) {
  const [expandedId, setExpandedId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const queryClient = useQueryClient();

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId,
      status: 'manager_reviewing'
    }),
    enabled: !!artistId
  });

  const approveMutation = useMutation({
    mutationFn: async (gig) => {
      await base44.functions.invoke('approveGigOffer', {
        gigId: gig.id,
        artistId: artistId
      });
      
      // Notify promoter gig was approved
      try {
        await base44.asServiceRole.functions.invoke('notifyPromoterOnBandDecision', {
          gigOfferId: gig.id,
          promoterEmail: gig.promoter_email,
          artistName: gig.artist_name,
          decision: 'approved'
        });
      } catch (e) {
        console.log('Promoter notify (non-critical):', e);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExpandedId(null);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ gigId, reason }) => {
      await base44.functions.invoke('rejectGigOffer', {
        gigId: gigId,
        reason: reason
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExpandedId(null);
      setRejectingId(null);
      setRejectionReason('');
    }
  });

  if (pendingGigs.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p className="text-xs">No pending gigs</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {pendingGigs.map((gig) => (
        <button
          key={gig.id}
          onClick={() => setExpandedId(expandedId === gig.id ? null : gig.id)}
          className="w-full bg-black border border-cyan-500/30 hover:border-cyan-400 rounded-lg p-3 text-left text-xs transition-colors group"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold truncate group-hover:text-cyan-300">{gig.venue || gig.title}</h4>
              <p className="text-gray-500 text-[11px] mt-1">{gig.date_start} {gig.fee && `• £${gig.fee}`}</p>
            </div>
            <Zap className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-1" />
          </div>

          {/* EXPANDED */}
          <AnimatePresence>
            {expandedId === gig.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-cyan-500/10 space-y-2"
              >
                {gig.promoter_name && (
                  <div className="text-[11px] text-gray-400">
                    <p className="text-gray-500">Promoter: {gig.promoter_name}</p>
                    {gig.promoter_email && <p className="text-gray-600">{gig.promoter_email}</p>}
                  </div>
                )}
                {gig.offer_details && <p className="text-[11px] text-gray-500 line-clamp-2">{gig.offer_details}</p>}
                
                {rejectingId === gig.id ? (
                  <div className="space-y-2 mt-2 bg-red-900/20 border border-red-500/30 rounded p-2">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Why reject? (e.g., date conflict, fee too low...)"
                      className="w-full bg-black border border-red-500/30 rounded px-2 py-1.5 text-white text-[11px] placeholder-gray-600 h-12 resize-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex gap-1.5">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setRejectingId(null); setRejectionReason(''); }}
                        className="flex-1 px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (rejectionReason.trim()) {
                            rejectMutation.mutate({ gigId: gig.id, reason: rejectionReason });
                          }
                        }}
                        disabled={!rejectionReason.trim() || rejectMutation.isPending}
                        className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1"
                      >
                        {rejectMutation.isPending ? <Loader className="w-3 h-3 animate-spin" /> : 'Confirm'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-1.5 mt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setRejectingId(gig.id); }}
                      className="flex-1 px-2 py-1.5 bg-black border border-red-500/40 hover:border-red-400 text-red-400 text-[10px] font-bold rounded transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); approveMutation.mutate(gig); }}
                      disabled={approveMutation.isPending}
                      className="flex-1 px-2 py-1.5 bg-black border border-green-500/40 hover:border-green-400 text-green-400 text-[10px] font-bold rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {approveMutation.isPending ? <Loader className="w-3 h-3 animate-spin" /> : '✅ Approve'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}