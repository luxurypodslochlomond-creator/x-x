import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51GigOfferCard from './CB51GigOfferCard';

export default function CB51CoreFlow({ artistId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth error:', err);
      }
    };
    fetchUser();
  }, []);

  // GIGS AWAITING MANAGER DECISION
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['cb51-pending-gigs', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      const gigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        manager_decision: null
      });
      return gigs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    },
    enabled: !!artistId,
  });

  // GIGS CONFIRMED
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['cb51-confirmed-gigs', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      const gigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        manager_decision: 'approved'
      });
      return gigs.slice(0, 5).sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    },
    enabled: !!artistId,
  });

  return (
    <div className="space-y-6">
      {/* STATS HEADER */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
          <div className="text-cyan-400 text-xs font-mono uppercase mb-1">Pending</div>
          <div className="text-3xl font-black text-white">{pendingGigs.length}</div>
        </div>
        <div className="bg-black border border-green-500/30 rounded-lg p-4">
          <div className="text-green-400 text-xs font-mono uppercase mb-1">Confirmed</div>
          <div className="text-3xl font-black text-white">{confirmedGigs.length}</div>
        </div>
        <div className="bg-black border border-gray-500/30 rounded-lg p-4">
          <div className="text-gray-400 text-xs font-mono uppercase mb-1">Total</div>
          <div className="text-3xl font-black text-white">{pendingGigs.length + confirmedGigs.length}</div>
        </div>
      </div>

      {/* PENDING GIGS - MANAGER DECISIONS */}
      <div>
        <h2 className="text-cyan-400 font-black font-mono text-sm uppercase mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Awaiting Your Decision
        </h2>
        <AnimatePresence>
          {pendingGigs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black border border-gray-500/20 rounded-lg p-6 text-center text-gray-400"
            >
              No pending gigs. All clear! 🎉
            </motion.div>
          ) : (
            <div className="space-y-3">
              {pendingGigs.map((gig) => (
                <CB51GigOfferCard key={gig.id} gig={gig} userRole="manager" />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* CONFIRMED GIGS */}
      {confirmedGigs.length > 0 && (
        <div>
          <h2 className="text-green-400 font-black font-mono text-sm uppercase mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Booked
          </h2>
          <div className="space-y-2">
            {confirmedGigs.map((gig) => (
              <div key={gig.id} className="bg-black border border-green-500/30 rounded-lg p-4">
                <p className="text-white font-bold">{gig.event_name}</p>
                <p className="text-gray-400 text-sm">{gig.venue}</p>
                <p className="text-green-400 text-xs font-mono mt-1">✓ Confirmed</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}