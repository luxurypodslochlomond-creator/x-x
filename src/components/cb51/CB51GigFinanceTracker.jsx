import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function CB51GigFinanceTracker({ artistId }) {
  const [balance, setBalance] = useState(0);

  // Get all confirmed gigs for this artist
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['cb51-gigs-confirmed', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId, 
      status: 'confirmed' 
    })
  });

  // Calculate total gig earnings
  useEffect(() => {
    const total = confirmedGigs.reduce((sum, gig) => sum + (gig.fee || 0), 0);
    setBalance(total);
  }, [confirmedGigs]);

  return (
    <div className="bg-gradient-to-r from-green-900/20 to-black border border-green-500/30 rounded-xl p-4 space-y-3">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-400" />
        <h3 className="text-green-400 font-mono font-bold uppercase tracking-wider">Gig Earnings (2026)</h3>
      </div>

      {/* BIG NUMBER */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-green-400">£{balance.toFixed(2)}</span>
        <span className="text-gray-500 text-sm font-mono">{confirmedGigs.length} confirmed gigs</span>
      </div>

      {/* AVERAGE */}
      {confirmedGigs.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-green-500/20">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span>Avg: £{(balance / confirmedGigs.length).toFixed(2)} per gig</span>
        </div>
      )}
    </div>
  );
}