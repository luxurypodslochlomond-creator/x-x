import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, MapPin, Calendar, DollarSign, Users, Loader, ChevronDown } from 'lucide-react';

/**
 * CB51 GIG DECISION ENGINE
 * Scott's zero-effort YES/NO interface
 * One gig at a time. Tap YES or NO. Done.
 */

export default function CB51GigDecisionEngine({ artistId }) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const queryClient = useQueryClient();

  const { data: pendingGigs = [], isLoading } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ artist_id: artistId, status: 'manager_reviewing' }),
    enabled: !!artistId,
    refetchInterval: 4000
  });

  const { data: votingGigs = [] } = useQuery({
    queryKey: ['votingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ artist_id: artistId, status: 'band_voting' }),
    enabled: !!artistId,
    refetchInterval: 4000
  });

  const approveMutation = useMutation({
    mutationFn: async (gig) => {
      await base44.functions.invoke('approveGigOffer', { gigId: gig.id, artistId: gig.artist_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['votingGigs', artistId] });
      setShowRejectReason(false);
      setRejectReason('');
      setShowDetails(false);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ gigId, reason }) => {
      const gig = await base44.entities.GigOffer.get(gigId);
      await base44.functions.invoke('rejectGigOffer', { gigId, artistId: gig.artist_id, reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setShowRejectReason(false);
      setRejectReason('');
      setShowDetails(false);
    }
  });

  // Current gig needing decision — one at a time
  const currentGig = pendingGigs[0];
  const remainingCount = pendingGigs.length - 1;
  const isBusy = approveMutation.isPending || rejectMutation.isPending;

  if (isLoading) return null;

  // NOTHING TO DECIDE
  if (!currentGig && votingGigs.length === 0) {
    return (
      <div className="bg-green-950/30 border border-green-500/20 rounded-2xl p-5 text-center">
        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 font-bold">All clear</p>
        <p className="text-gray-600 text-xs mt-1">No gigs waiting for a decision</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {/* ── BAND VOTING IN PROGRESS ── */}
      {votingGigs.map(gig => (
        <div key={gig.id} className="bg-cyan-950/30 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-cyan-300 font-bold text-sm truncate">{gig.venue || gig.title}</p>
            <p className="text-gray-500 text-xs">Band voting in progress…</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
        </div>
      ))}

      {/* ── CURRENT GIG NEEDING DECISION ── */}
      {currentGig && (
        <motion.div
          key={currentGig.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="bg-gray-950 border-2 border-white/10 rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        >
          {/* GIG HEADER */}
          <div className="p-5 pb-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">New Gig Offer</p>
                <h2 className="text-white font-black text-xl leading-tight">{currentGig.venue || currentGig.title}</h2>
              </div>
              {remainingCount > 0 && (
                <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
                  +{remainingCount} more
                </span>
              )}
            </div>

            {/* KEY FACTS - at a glance */}
            <div className="flex flex-wrap gap-3 text-sm">
              {currentGig.date_start && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-mono">{currentGig.date_start}</span>
                </div>
              )}
              {currentGig.location && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>{currentGig.location}</span>
                </div>
              )}
              {currentGig.fee && (
                <div className="flex items-center gap-1.5 text-green-400 font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>£{currentGig.fee}</span>
                </div>
              )}
            </div>

            {/* SHOW MORE DETAILS toggle */}
            {(currentGig.offer_details || currentGig.promoter_name) && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-400 text-xs mt-3 transition-colors"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                {showDetails ? 'Less' : 'More details'}
              </button>
            )}

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-1 text-xs text-gray-500">
                    {currentGig.promoter_name && <p>Promoter: <span className="text-gray-400">{currentGig.promoter_name}</span></p>}
                    {currentGig.promoter_email && <p>Email: <span className="text-gray-400">{currentGig.promoter_email}</span></p>}
                    {currentGig.promoter_phone && <p>Phone: <span className="text-gray-400">{currentGig.promoter_phone}</span></p>}
                    {currentGig.time_start && <p>Time: <span className="text-gray-400">{currentGig.time_start}</span></p>}
                    {currentGig.offer_details && <p className="text-gray-500 leading-relaxed mt-2">{currentGig.offer_details}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* YES / NO BUTTONS */}
          <AnimatePresence mode="wait">
            {!showRejectReason ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 border-t border-white/5"
              >
                {/* NO */}
                <button
                  onClick={() => setShowRejectReason(true)}
                  disabled={isBusy}
                  className="py-5 flex flex-col items-center justify-center gap-1.5 bg-red-950/40 hover:bg-red-950/70 border-r border-white/5 transition-all disabled:opacity-40 active:scale-95"
                >
                  <XCircle className="w-7 h-7 text-red-400" />
                  <span className="text-red-400 font-black text-sm tracking-wider">NO</span>
                </button>

                {/* YES */}
                <button
                  onClick={() => approveMutation.mutate(currentGig)}
                  disabled={isBusy}
                  className="py-5 flex flex-col items-center justify-center gap-1.5 bg-green-950/40 hover:bg-green-950/70 transition-all disabled:opacity-40 active:scale-95"
                >
                  {approveMutation.isPending ? (
                    <Loader className="w-7 h-7 text-green-400 animate-spin" />
                  ) : (
                    <CheckCircle className="w-7 h-7 text-green-400" />
                  )}
                  <span className="text-green-400 font-black text-sm tracking-wider">YES</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="reason"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 border-t border-white/5 bg-red-950/20 space-y-3"
              >
                <p className="text-red-400 text-xs font-bold">Why not? (optional)</p>
                <textarea
                  autoFocus
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="e.g. date clash, fee too low..."
                  className="w-full bg-black/60 border border-red-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-700 h-16 resize-none focus:outline-none focus:border-red-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowRejectReason(false); setRejectReason(''); }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-sm rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate({ gigId: currentGig.id, reason: rejectReason || 'No reason given' })}
                    disabled={rejectMutation.isPending}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {rejectMutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : 'Confirm NO'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}