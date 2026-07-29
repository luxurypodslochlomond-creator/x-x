import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Radio, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import SilentBoundary from '@/components/cb51/SilentBoundary';
import CB51Stream from '@/components/cb51/CB51Stream';
import CB51Home from './CB51Home';
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
    // PIN check first (instant, no network) — avoids showing the marketing
    // page to a logged-in user while the OAuth token is still settling.
    if (typeof window !== 'undefined' &&
        localStorage.getItem('cb51_pin_verified') === 'true') {
      setUser({ _pin: true });
      setLoading(false);
      return;
    }
    // Retry like the PINGuard does — first load often has an unsettled token
    let cancelled = false;
    (async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const u = await base44.auth.me();
          if (u && !cancelled) { setUser(u); setLoading(false); return; }
        } catch { /* token not settled yet — wait and retry */ }
        if (attempt < 2 && !cancelled) await new Promise(r => setTimeout(r, 700));
      }
      if (!cancelled) { setUser(null); setLoading(false); }
    })();
    return () => { cancelled = true; };
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f7f5f0' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full"
          style={{ border: '2px solid rgba(8,145,178,0.2)', borderTopColor: '#0891b2' }}
        />
      </div>
    );
  }

  // NOT LOGGED IN — landing
  if (!user && !pinVerified) {
    return (
      <div className="min-h-screen flex flex-col" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f7f5f0', color: '#1c1917' }}>

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-6 pt-10 pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4" style={{ color: '#0891b2' }} />
            <span className="font-black tracking-[0.25em] font-mono text-sm" style={{ color: '#1c1917' }}>CB51</span>
          </div>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
            className="font-bold text-sm active:opacity-50"
            style={{ color: '#0891b2' }}
          >
            Sign in
          </button>
        </div>

        {/* ── HERO — the message ── */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-8 pb-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-5" style={{ color: '#78716c' }}>citizenband51</p>
            <h1 className="font-black leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(42px, 11vw, 72px)', letterSpacing: '-0.02em', color: '#1c1917' }}>
              Avoid<br />the<br />
              <span style={{ color: '#0891b2' }}>Noise.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-base leading-relaxed mb-8 max-w-sm" style={{ color: '#57534e' }}
          >
            Your gig pipeline. Your band. Your money.<br />
            One place. No chaos.
          </motion.p>

          {/* ── WHAT IT ACTUALLY DOES ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col gap-3 mb-10"
          >
            {[
              { text: 'Reads gig emails — pulls out every detail automatically', color: '#06b6d4' },
              { text: 'Band votes on offers without a single WhatsApp', color: '#10b981' },
              { text: 'Tracks fees, outstanding payments, the lot', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 px-3 rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(28,25,23,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: item.color }} />
                <p className="text-sm leading-snug" style={{ color: '#57534e' }}>{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <button
              onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
              className="w-full active:scale-95 text-black font-black py-4 text-base tracking-wider font-mono transition-all rounded-2xl"
              style={{ background: '#0891b2', boxShadow: '0 8px 30px rgba(8,145,178,0.25)' }}
            >
              GET STARTED — FREE
            </button>
            <button
              onClick={() => window.location.href = '/CB51How'}
              className="w-full active:scale-95 font-bold py-3 text-sm transition-all"
              style={{ color: '#78716c' }}
            >
              See how it works →
            </button>
          </motion.div>
        </div>

        {/* ── BOTTOM — quiet credibility ── */}
        <div className="px-6 pb-10 pt-4 border-t" style={{ borderColor: 'rgba(28,25,23,0.08)' }}>
          <p className="text-xs font-mono text-center" style={{ color: '#a8a29e' }}>CB51 · CitizenBand51 · Avoid the Noise</p>
        </div>
      </div>
    );
  }

  return (
    <CB51PINGuard>
      <CB51ErrorBoundary>
        {/* BACKGROUND SERVICES - invisible */}
        <Suspense fallback={null}>
          <SilentBoundary>
            {user?.email && <CB51PushSubscriptionManager userEmail={user.email} />}
            {currentArtistId && <CB51BadgeManager artistId={currentArtistId} />}
            <CB51BackgroundSync />
          </SilentBoundary>
        </Suspense>

        <div className="min-h-screen flex flex-col" style={{ background: '#f7f5f0', color: '#1c1917' }}>
          {/* ── HEADER ── */}
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5" style={{ color: '#0891b2' }} />
                <span className="text-lg font-black tracking-widest font-mono" style={{ color: '#1c1917' }}>CB51</span>
              </div>
              <button
                onClick={() => setShowTestPush(v => !v)}
                className="p-2 rounded-xl transition-colors"
                style={{ color: '#78716c' }}
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
                        background: 'rgba(8,145,178,0.10)',
                        border: '1px solid rgba(8,145,178,0.45)'
                      } : {
                        background: 'rgba(28,25,23,0.03)',
                        border: '1px solid rgba(28,25,23,0.10)'
                      }}
                    >
                      {artist.profile_pic_url ? (
                        <img src={artist.profile_pic_url} alt={artist.name} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                          isActive ? 'bg-cyan-500 text-black' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {artist.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className={`text-sm font-semibold truncate max-w-[100px] ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>
                        {artist.name}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                  className="flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-full transition-all"
                  style={{ background: 'rgba(28,25,23,0.02)', border: '1px dashed rgba(28,25,23,0.2)', color: '#78716c' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Add</span>
                </button>
              </div>
            </div>
          )}



          {/* ── CONTENT ── */}
          <div className="flex-1 overflow-hidden">
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
              {currentArtistId ? (
                <CB51Stream
                  artistId={currentArtistId}
                  artistName={artists.find(a => a.id === currentArtistId)?.name}
                />
              ) : (
                <CB51Home />
              )}
            </motion.div>
          </div>

          {/* iOS install prompt — bottom */}
          <CB51IOSInstallPrompt />
        </div>
      </CB51ErrorBoundary>
    </CB51PINGuard>
  );
}