import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Radio, ArrowLeft, Bell, AlertCircle, Calendar, Mail, DollarSign, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import PushNotificationManager from '@/components/scott/PushNotificationManager';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'CB51 • Artist Management';
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        navigate(createPageUrl('CB51Login'));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: artists = [] } = useQuery({
    queryKey: ['cb51Artists'],
    queryFn: () => base44.entities.ScottArtist.filter({}),
    enabled: !!user,
  });

  const { data: offers = [] } = useQuery({
    queryKey: ['cb51Offers'],
    queryFn: () => base44.entities.ScottGigOffer.filter({}),
    enabled: !!user,
  });

  const pendingCount = offers.filter(o => o.status === 'pending_manager_review').length;
  const awaitingCount = offers.filter(o => o.status === 'sent_to_band').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
          <p className="text-cyan-400 font-black text-xl font-mono">CB51</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-cyan-950/40 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <span className="text-lg font-black text-cyan-400 font-mono">CB51</span>
          </div>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-cyan-500/10 rounded transition-colors">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
      </div>

      <div className="p-4 pb-20">
        <h1 className="text-4xl font-black text-white font-mono mb-6">CB51</h1>

        {pendingCount > 0 && (
          <motion.button
            onClick={() => navigate(createPageUrl('CB51NotificationInbox'))}
            className="w-full mb-6 px-6 py-4 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-500 text-red-400 rounded-lg font-black text-sm font-mono flex items-center justify-center gap-2 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <Bell className="w-5 h-5" />
            {pendingCount} PENDING APPROVALS
          </motion.button>
        )}

        {awaitingCount > 0 && (
          <motion.button
            onClick={() => navigate(createPageUrl('ScottArtistHome'))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mb-6 px-6 py-4 bg-green-900/30 hover:bg-green-900/40 border-2 border-green-500 text-green-400 rounded-lg font-black text-sm font-mono flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-xl">👤</span>
            {awaitingCount} gigs awaiting band votes
          </motion.button>
        )}

        <PushNotificationManager />

        <div className="grid gap-4 max-w-2xl mt-8">
        {artists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-mono mb-4">No artists yet</p>
            <Link
              to={createPageUrl('ScottAddArtist')}
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-black font-bold px-6 py-3 rounded-lg transition-all"
            >
              + ADD ARTIST
            </Link>
          </div>
        ) : (
          artists.map(artist => {
            const artistOffers = offers.filter(o => o.artist_id === artist.id);
            const pending = artistOffers.filter(o => o.status === 'pending_manager_review').length;

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                className="bg-black border border-cyan-500/30 hover:border-cyan-500 rounded-lg p-6 cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-black text-white">{artist.name}</h2>
                    <p className="text-cyan-400 text-sm font-mono mt-1">{artistOffers.length} gigs</p>
                  </div>
                  {pending > 0 && (
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">
                      {pending} TO REVIEW
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{artist.genres?.join(', ') || 'No genres'}</p>
              </motion.div>
            );
          })
        )}
        </div>

        {artists.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to={createPageUrl('ScottAddArtist')}
              className="text-cyan-400 hover:text-cyan-300 font-mono text-sm font-bold"
            >
              + ADD ANOTHER
            </Link>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 font-mono text-xs">CB51 • AI Co-Manager ♾️❤️</p>
        </div>
      </div>
    </div>
  );
}