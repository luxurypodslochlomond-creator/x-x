import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { AlertCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51ArtistHealth - Status badges for each artist
 * Shows: active/idle, pending gigs, unread votes, next gig date
 */
export default function CB51ArtistHealth({ artists = [], offers = [], votes = [], onAddArtist }) {
  const artistHealth = useMemo(() => {
    return artists.map(artist => {
      const artistOffers = offers.filter(o => o.artist_id === artist.id);
      const artistVotes = votes.filter(v => v.artist_id === artist.id && v.status === 'pending');
      
      const pendingOffers = artistOffers.filter(o => o.status === 'pending_manager_review').length;
      const sentToband = artistOffers.filter(o => o.status === 'sent_to_band').length;
      const confirmedGigs = artistOffers.filter(o => o.status === 'confirmed' && new Date(o.date) > new Date());
      const nextGig = confirmedGigs.length > 0 
        ? new Date(confirmedGigs[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : null;

      return {
        artist,
        pendingOffers,
        sentToband,
        pendingVotes: artistVotes.length,
        nextGig,
        unreadCount: pendingOffers + sentToband + artistVotes.length
      };
    });
  }, [artists, offers, votes]);

  return (
    <div className="space-y-3">
      <h3 className="text-cyan-400 font-black font-mono text-sm mb-3">ARTIST HEALTH</h3>

      {artistHealth.length === 0 ? (
        <button
          onClick={onAddArtist}
          className="w-full border-2 border-dashed border-cyan-500/30 hover:border-cyan-500 rounded-lg p-4 text-center transition-colors"
        >
          <Plus className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <p className="text-cyan-400 font-mono text-xs font-bold">ADD FIRST ARTIST</p>
        </button>
      ) : (
        artistHealth.map((health, idx) => (
          <motion.div
            key={health.artist.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link to={createPageUrl(`ScottArtistHome?id=${health.artist.id}`)}>
              <div className="bg-black border border-cyan-500/30 hover:border-cyan-500 rounded-lg p-3 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center font-bold text-black text-sm group-hover:scale-110 transition-transform">
                      {health.artist.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold text-xs">{health.artist.name}</p>
                      {health.nextGig && (
                        <p className="text-gray-500 text-[9px] font-mono">Next: {health.nextGig}</p>
                      )}
                    </div>
                  </div>
                  
                  {health.unreadCount > 0 && (
                    <div className="flex items-center gap-1">
                      {health.pendingOffers > 0 && (
                        <div className="bg-cyan-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded">
                          {health.pendingOffers} OFFER
                        </div>
                      )}
                      {health.sentToband > 0 && (
                        <div className="bg-amber-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded">
                          {health.sentToband} VOTE
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {health.unreadCount === 0 && (
                  <p className="text-gray-600 text-[9px] font-mono">All caught up ✓</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  );
}