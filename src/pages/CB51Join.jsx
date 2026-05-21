import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Music, Loader, XCircle } from 'lucide-react';

/**
 * CB51 BAND MEMBER ONBOARDING — NO LOGIN REQUIRED
 * Journey: Scott adds member → CB51 email → member taps link → this page
 * One screen. One tap. They're in. Push notifications enabled. Done.
 * 
 * URL: /CB51Join?token=base64(memberId:artistId:email)
 */

export default function CB51Join() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState('loading'); // loading | ready | subscribing | done | error
  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);
  const [pushBlocked, setPushBlocked] = useState(false);

  useEffect(() => {
    if (!token) {
      setState('error');
      setError('No invite link found. Ask your manager to resend it.');
      return;
    }
    loadInvite();
  }, [token]);

  async function loadInvite() {
    try {
      const decoded = atob(token);
      const [memberId, artistId, email] = decoded.split(':');
      if (!memberId || !artistId || !email) throw new Error('Invalid invite link');

      const res = await base44.functions.invoke('cb51JoinInvite', {}, { method: 'GET', params: { token } });
      setMemberData(res);
      setState('ready');
    } catch (e) {
      // Even if backend fails, try to parse token for display
      try {
        const decoded = atob(token);
        const [memberId, artistId, email] = decoded.split(':');
        setMemberData({ memberName: 'there', artistName: 'your band', memberId, artistId, email });
        setState('ready');
      } catch {
        setState('error');
        setError('Invalid invite link. Ask your manager to resend it.');
      }
    }
  }

  async function enableNotifications() {
    setState('subscribing');
    try {
      // Request push permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'denied') {
        setPushBlocked(true);
        setState('ready');
        return;
      }

      // Get VAPID public key
      let vapidKey;
      try {
        const keyRes = await base44.functions.invoke('getVapidPublicKey', {});
        vapidKey = keyRes.publicKey;
      } catch {
        vapidKey = null;
      }

      let subscription = null;
      if (vapidKey && 'serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.ready;
          subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKey)
          });
        } catch (e) {
          console.log('Push subscribe failed:', e);
        }
      }

      // Register with backend — mark member as active + store subscription
      await base44.functions.invoke('cb51JoinInvite', {
        token,
        subscription: subscription ? JSON.stringify(subscription) : null
      });

      setState('done');
    } catch (e) {
      console.error('Enable notifications error:', e);
      // Still mark as done — they can always get gig links via email
      setState('done');
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  // ── LOADING ──
  if (state === 'loading' || state === 'subscribing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
          <p className="text-gray-600 font-mono text-sm">
            {state === 'subscribing' ? 'Setting up your notifications…' : 'Loading your invite…'}
          </p>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <XCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-white font-black text-xl">Invite not found</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── DONE ──
  if (state === 'done') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
            style={{ boxShadow: '0 0 50px rgba(34,197,94,0.3)' }}
          >
            <CheckCircle className="w-14 h-14 text-green-400" />
          </motion.div>

          <div>
            <h2 className="text-white font-black text-3xl mb-2">You're in! 🎸</h2>
            <p className="text-gray-400">
              Welcome to <span className="text-cyan-400 font-bold">{memberData?.artistName}</span>
            </p>
            <p className="text-gray-600 text-sm mt-3">
              When your manager gets a gig offer, you'll get a notification to vote YES or NO. Dead simple.
            </p>
          </div>

          <div className="bg-gray-950 border border-cyan-500/20 rounded-xl p-4 text-left space-y-2">
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">What happens next</p>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 font-black text-sm mt-0.5">1</span>
              <p className="text-gray-300 text-sm">Manager gets a gig offer</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 font-black text-sm mt-0.5">2</span>
              <p className="text-gray-300 text-sm">They approve it and send to the band</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 font-black text-sm mt-0.5">3</span>
              <p className="text-gray-300 text-sm">You get a notification — tap YES or NO</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 font-black text-sm mt-0.5">4</span>
              <p className="text-gray-300 text-sm">Manager gets the result instantly</p>
            </div>
          </div>

          <p className="text-gray-700 text-xs pb-4">Powered by CB51 · AI Co-Manager for Artists</p>
        </motion.div>
      </div>
    );
  }

  // ── MAIN INVITE SCREEN ──
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-sm w-full space-y-8"
      >
        {/* BRAND */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-7 h-7 text-cyan-400" />
            <span className="text-cyan-400 font-black font-mono text-xl tracking-widest">CB51</span>
          </div>
          <h1 className="text-white font-black text-3xl leading-tight">
            Hey {memberData?.memberName?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-gray-400 text-lg">
            You've been added to <span className="text-cyan-400 font-bold">{memberData?.artistName || 'the band'}</span>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Enable notifications so your manager can get instant YES/NO answers on gig offers.
          </p>
        </div>

        {/* WHAT YOU'LL GET */}
        <div className="bg-gray-950 border border-cyan-500/20 rounded-2xl p-5 space-y-3">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">How it works</p>
          {[
            { emoji: '🎸', text: 'Manager gets a gig offer' },
            { emoji: '📲', text: 'You get a push notification' },
            { emoji: '✅', text: 'Tap YES or NO — done in 2 seconds' },
            { emoji: '⚡️', text: 'Manager notified instantly' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-gray-300 text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        {/* PUSH BLOCKED WARNING */}
        {pushBlocked && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-400 text-sm font-bold mb-1">Notifications blocked</p>
            <p className="text-amber-300/70 text-xs">Go to your browser settings → allow notifications for this site, then reload.</p>
          </div>
        )}

        {/* BIG CTA */}
        <button
          onClick={enableNotifications}
          className="w-full py-6 rounded-2xl font-black text-xl text-white flex items-center justify-center gap-4 transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #0891b2, #0e7490)',
            boxShadow: '0 8px 32px rgba(6,182,212,0.35)'
          }}
        >
          <Bell className="w-8 h-8" />
          Enable Notifications
        </button>

        <p className="text-center text-gray-700 text-xs">
          No account needed · No app download · Works on iPhone & Android
        </p>
      </motion.div>
    </div>
  );
}