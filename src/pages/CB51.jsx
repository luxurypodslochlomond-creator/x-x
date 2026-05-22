import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Radio, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51Dashboard from '@/components/cb51/CB51Dashboard';
import CB51IOSInstallPrompt from '@/components/cb51/CB51IOSInstallPrompt';
import { useCB51NavBadges } from '@/components/cb51/CB51NavBadge';
const CB51TestPush = React.lazy(() => import('@/components/cb51/CB51TestPush'));

const CB51BadgeManager = React.lazy(() => import('@/components/cb51/CB51BadgeManager'));
const CB51BackgroundSync = React.lazy(() => import('@/components/cb51/CB51BackgroundSync'));
const CB51PushSubscriptionManager = React.lazy(() => import('@/components/cb51/CB51PushSubscriptionManager'));
// CB51TestNotification is accessible via Settings only — never shown on the main screen

export default function CB51Page() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeArtistId, setActiveArtistId] = useState(null);
  const [showTestPush, setShowTestPush] = useState(false);

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

  // NOT LOGGED IN — landing
  if (!user && !pinVerified) {
    return (
      <div className="min-h-screen bg-black flex flex-col" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-6 pt-10 pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-black tracking-[0.25em] font-mono text-sm">CB51</span>
          </div>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
            className="text-cyan-400 font-bold text-sm active:opacity-50"
          >
            Sign in
          </button>
        </div>

        {/* ── HERO — the message ── */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-8 pb-6">

          {/* The one line that matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 text-xs font-mono tracking-[0.2em] uppercase mb-5">citizenband51</p>
            <h1 className="text-white font-black leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(42px, 11vw, 72px)', letterSpacing: '-0.02em' }}>
              Avoid<br />the<br />
              <span style={{ color: '#06b6d4' }}>Noise.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm"
          >
            Gig offers land in your inbox. You deal with them here instead.
            That's basically it.
          </motion.p>

          {/* ── WHAT IT ACTUALLY DOES ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4 mb-10"
          >
            {[
              'Reads your gig emails and pulls out the details',
              'Lets the band vote without a WhatsApp thread',
              'Tracks what you\'re owed and what\'s outstanding',
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: '#06b6d4' }} />
                <p className="text-gray-400 text-sm leading-snug">{line}</p>
              </div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
              className="w-full active:scale-95 text-black font-black py-4 text-base tracking-wider font-mono transition-all rounded-2xl"
              style={{ background: '#06b6d4', boxShadow: '0 0 40px rgba(6,182,212,0.2)' }}
            >
              GET STARTED — FREE
            </button>
            <p className="text-center text-gray-700 text-xs mt-3">It's free. Just try it.</p>
          </motion.div>
        </div>

        {/* ── BOTTOM — quiet credibility ── */}
        <div className="px-6 pb-10 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-gray-800 text-xs font-mono text-center">CB51 · CitizenBand51 · Avoid the Noise</p>
        </div>
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
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400" />
                <span className="text-lg font-black text-white tracking-widest font-mono">CB51</span>
              </div>
              <button
                onClick={() => setShowTestPush(v => !v)}
                className="p-2 rounded-xl text-gray-700 hover:text-gray-400 transition-colors"
                title="Test push notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            </div>
            {showTestPush && (
              <Suspense fallback={null}>
                <div className="mt-3">
                  <CB51TestPush artistId={currentArtistId} />
                </div>
              </Suspense>
            )}
          </div>

          {/* ── ARTIST SELECTOR ── */}
          {artists.length > 0 && (
            <div className="px-5 pb-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {artists.map((artist) => {
                  const isActive = artist.id === currentArtistId;
                  return (
                    <button
                      key={artist.id}
                      onClick={() => setActiveArtistId(artist.id)}
                      className="flex items-center gap-2.5 flex-shrink-0 px-3 py-2 rounded-full transition-all"
                      style={isActive ? {
                        background: 'rgba(6,182,212,0.12)',
                        border: '1px solid rgba(6,182,212,0.4)',
                        boxShadow: '0 0 12px rgba(6,182,212,0.1)'
                      } : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      {artist.profile_pic_url ? (
                        <img src={artist.profile_pic_url} alt={artist.name} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                          isActive ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-500'
                        }`}>
                          {artist.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className={`text-sm font-semibold truncate max-w-[100px] ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {artist.name}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                  className="flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-full transition-all text-gray-600 hover:text-gray-400"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Add</span>
                </button>
              </div>
            </div>
          )}



          {/* ── CONTENT ── */}
          <div className="flex-1 overflow-hidden">
            {currentArtistId ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <CB51Dashboard artistId={currentArtistId} />
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
          </div>

          {/* iOS install prompt — bottom */}
          <CB51IOSInstallPrompt />
        </div>
      </CB51ErrorBoundary>
    </CB51PINGuard>
  );
}