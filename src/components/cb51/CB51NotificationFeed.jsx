import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51NotificationFeed({ artistId }) {
  const [expandedId, setExpandedId] = useState(null);

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId,
      status: 'manager_reviewing'
    }),
    enabled: !!artistId
  });

  if (pendingGigs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-8 pb-16"
      >
        <div className="text-center">
          <Clock className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-mono">No pending approvals</p>
          <p className="text-gray-700 text-xs mt-1">Waiting for offers...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2 pt-2"
    >
      {pendingGigs.map((gig, idx) => (
        <motion.button
          key={gig.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => setExpandedId(expandedId === gig.id ? null : gig.id)}
          className="w-full text-left"
        >
          {/* NOTIFICATION CARD */}
          <div className="bg-gradient-to-r from-cyan-950/20 to-black border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl p-4 transition-all duration-300 group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm truncate group-hover:text-cyan-300 transition-colors">
                  {gig.venue || gig.title || 'New Gig'}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  {gig.date_start && (
                    <span className="px-2 py-1 bg-black/40 rounded text-gray-300">
                      {gig.date_start}
                    </span>
                  )}
                  {gig.fee && (
                    <span className="px-2 py-1 bg-green-950/30 rounded text-green-400 font-mono">
                      £{gig.fee}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* EXPANDED */}
            <AnimatePresence>
              {expandedId === gig.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-cyan-500/10 space-y-2"
                >
                  {gig.promoter_name && (
                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Promoter:</span> {gig.promoter_name}
                      {gig.promoter_email && <span className="text-gray-600 block text-[11px] mt-1">{gig.promoter_email}</span>}
                    </div>
                  )}
                  
                  {gig.offer_details && (
                    <p className="text-xs text-gray-400 line-clamp-2">{gig.offer_details}</p>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-2 bg-red-950/30 border border-red-500/30 hover:border-red-500 text-red-400 text-xs font-bold rounded-lg transition-colors">
                      Reject
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-950/30 border border-green-500/30 hover:border-green-500 text-green-400 text-xs font-bold rounded-lg transition-colors">
                      Approve
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}