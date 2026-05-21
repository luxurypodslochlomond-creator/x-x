import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Radio, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51UnifiedDashboard from '@/components/cb51/CB51UnifiedDashboard';
import CB51IOSInstallPrompt from '@/components/cb51/CB51IOSInstallPrompt';
import { useCB51NavBadges } from '@/components/cb51/CB51NavBadge';

const CB51BrainTab = React.lazy(() => import('@/components/cb51/CB51BrainTab'));
const CB51BadgeManager = React.lazy(() => import('@/components/cb51/CB51BadgeManager'));
const CB51BackgroundSync = React.lazy(() => import('@/components/cb51/CB51BackgroundSync'));
const CB51PushSubscriptionManager = React.lazy(() => import('@/components/cb51/CB51PushSubscriptionManager'));
// CB51TestNotification is accessible via Settings only — never shown on the main screen

export default function CB51Page() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeArtistId, setActiveArtistId] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'CB51 • AI Co-Manager for Artists';
  }, []);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const pinVerified = typeof window !== 'undefined' &&
    localStorage.getItem('cb51_pin_verified') === 'true';

  const { data: artists = [] } = useQuery({
    queryKey: ['cb51Artists'],
    queryFn: () => base44.entities.Artist.filter({ archived: false }),
    enabled: !!user || pinVerified,
    staleTime: 60000,
    gcTime: 300000,
  });

  const currentArtistId = activeArtistId || (artists.length > 0 ? artists[0].id : null);
  const badges = useCB51NavBadges(currentArtistId);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-500"
        />
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user && !pinVerified) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-between px-8 py-16">
        {/* TOP — branding */}
        <div />

        {/* MIDDLE — identity */}
        <div className="flex flex-col items-center text-center">
          {/* Signal rings — hand-drawn feel */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-500/80 flex items-center justify-center">
              <div className="w-13 h-13 rounded-full border border-cyan-500/40 flex items-center justify-center" style={{width:52,height:52}}>
                <Radio className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-500/20"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>

          <h1 className="text-white font-black text-4xl tracking-widest font-mono mb-1">CB51</h1>
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest uppercase mb-6">CitizenBand51</p>

          <p className="text-gray-300 text-lg font-bold mb-2 leading-snug">
            Your AI co-manager.<br />Built for real musicians.
          </p>
          <p className="text-gray-600 text-sm mb-10">
            Gig offers. Band votes. Finance. All in one place.
          </p>

          <button
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
            className="w-full max-w-xs bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-black py-4 rounded-xl text-base tracking-wider font-mono transition-all"
            style={{ boxShadow: '0 0 30px rgba(6,182,212,0.25)' }}
          >
            GET STARTED — FREE
          </button>
          <p className="text-gray-700 text-xs mt-4 font-mono">No label required. No bullshit.</p>
        </div>

        {/* BOTTOM — legal small */}
        <p className="text-center text-gray-800 text-xs font-mono">CB51 · Avoid the Noise</p>
      </div>
    );
  }

  return (
    <CB51PINGuard>
      <CB51ErrorBoundary>
        {/* BACKGROUND SERVICES - invisible */}
        <Suspense fallback={null}>
          {user && <CB51PushSubscriptionManager userEmail={user.email} />}
          {currentArtistId && <CB51BadgeManager artistId={currentArtistId} />}
          <CB51BackgroundSync />
        </Suspense>

        <div className="min-h-screen bg-black text-white flex flex-col">
          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <div className="flex items-center gap-2.5">
              <Radio className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-black text-cyan-400 tracking-widest font-mono">CB51</span>
            </div>
            <button
              onClick={() => setActiveTab(activeTab === 'brain' ? 'home' : 'brain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black font-mono tracking-wider transition-all ${
                activeTab === 'brain'
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                  : 'text-gray-600 border-white/10 hover:text-gray-400'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              BRAIN
            </button>
          </div>

          {/* ── ARTIST SELECTOR ── */}
          {artists.length > 0 && (
            <div className="px-5 pb-3">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {artists.map((artist) => {
                  const isActive = artist.id === currentArtistId;
                  return (
                    <button
                      key={artist.id}
                      onClick={() => setActiveArtistId(artist.id)}
                      className={`flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      {artist.profile_pic_url ? (
                        <img src={artist.profile_pic_url} alt={artist.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-sm ${
                          isActive ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {artist.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className={`text-sm font-black truncate max-w-[100px] ${isActive ? 'text-cyan-400' : 'text-gray-500'}`}>
                        {artist.name}
                      </span>
                    </button>
                  );
                })}
                {/* Add artist */}
                <button
                  onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                  className="flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-lg border-2 border-dashed border-gray-800 text-gray-600 hover:text-gray-400 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-black">Add</span>
                </button>
              </div>
            </div>
          )}

          {/* ── DIVIDER ── */}
          <div className="h-px bg-white/5 mx-5 mb-0" />

          {/* ── CONTENT ── */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'brain' && currentArtistId ? (
                <motion.div
                  key="brain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-5 pt-5 pb-32 overflow-y-auto h-full"
                >
                  <Suspense fallback={<div className="py-20 text-center text-gray-600 text-sm">Loading…</div>}>
                    <CB51BrainTab artistId={currentArtistId} />
                  </Suspense>
                </motion.div>
              ) : currentArtistId ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <CB51UnifiedDashboard artistId={currentArtistId} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center min-h-[400px] px-8 text-center"
                >
                  <Radio className="w-10 h-10 text-cyan-400/40 mb-4" />
                  <p className="text-gray-500 text-sm mb-6">Add your first artist to get started</p>
                  <button
                    onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                    className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-black py-3 px-8 rounded-2xl text-sm transition-all"
                  >
                    Add Artist
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* iOS install prompt — bottom */}
          <CB51IOSInstallPrompt />
        </div>
      </CB51ErrorBoundary>
    </CB51PINGuard>
  );
}