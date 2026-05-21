import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51 PUSH SUBSCRIPTION MANAGER
 * First-run: shows a prominent full-width card asking to enable notifications
 * Once enabled: invisible, runs in background
 * Scott's spec: manager MUST get notified when gig offers arrive ♾️❤️
 */

const DISMISSED_KEY = 'cb51_push_dismissed';

export default function CB51PushSubscriptionManager({ userEmail }) {
  const [status, setStatus] = useState('checking');
  const [isLoading, setIsLoading] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === '1');

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const supported = 'serviceWorker' in navigator && 'PushManager' in window;

  useEffect(() => {
    checkStatus();
  }, [userEmail]);

  const checkStatus = async () => {
    if (!supported) { setStatus('unsupported'); return; }
    if (Notification.permission === 'denied') { setStatus('denied'); return; }

    try {
      const reg = await navigator.serviceWorker.getRegistration('/');
      if (reg) {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          // Make sure it's stored in DB
          const stored = await base44.entities.UserPushSubscription.filter({ user_email: userEmail });
          if (stored.length === 0) {
            await base44.entities.UserPushSubscription.create({
              user_email: userEmail,
              subscription_data: JSON.stringify(sub),
              is_active: true,
              last_active: new Date().toISOString()
            });
          }
          setStatus('subscribed');
          return;
        }
      }
    } catch {}

    if (Notification.permission === 'granted') {
      await subscribe();
      return;
    }

    setStatus('needs_permission');
  };

  const getOrCreateRegistration = async () => {
    const existing = await navigator.serviceWorker.getRegistration('/');
    if (existing) { existing.update().catch(() => {}); return existing; }
    return await navigator.serviceWorker.register('/api/functions/serveServiceWorker', { scope: '/' });
  };

  const subscribe = async () => {
    setIsLoading(true);
    try {
      const registration = await getOrCreateRegistration();
      await navigator.serviceWorker.ready;

      let vapidPublicKey = localStorage.getItem('VAPID_PUBLIC_KEY');
      if (!vapidPublicKey) {
        const res = await fetch('/api/functions/getVapidPublicKey');
        const data = await res.json();
        vapidPublicKey = data.vapidPublicKey;
        if (vapidPublicKey) localStorage.setItem('VAPID_PUBLIC_KEY', vapidPublicKey);
      }

      if (!vapidPublicKey) { setStatus('error'); return; }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      const existing = await base44.entities.UserPushSubscription.filter({ user_email: userEmail });
      if (existing.length > 0) {
        await base44.entities.UserPushSubscription.update(existing[0].id, {
          subscription_data: JSON.stringify(subscription),
          is_active: true,
          last_active: new Date().toISOString()
        });
      } else {
        await base44.entities.UserPushSubscription.create({
          user_email: userEmail,
          subscription_data: JSON.stringify(subscription),
          is_active: true,
          last_active: new Date().toISOString()
        });
      }

      setStatus('subscribed');
      if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
    } catch (error) {
      console.error('Subscribe failed:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') await subscribe();
    else setStatus('denied');
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  };

  // All good — invisible
  if (status === 'subscribed' || status === 'checking') return null;
  // iOS not in standalone — show install hint instead
  if (isIOS && !isStandalone) return null;
  // User dismissed
  if (dismissed && status !== 'needs_permission') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        className="mx-4 mt-4"
      >
        {status === 'needs_permission' && (
          <div
            className="relative rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #0e2a2a, #0a1f2e)',
              border: '2px solid rgba(6,182,212,0.5)',
              boxShadow: '0 4px 24px rgba(6,182,212,0.15)'
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm">Enable Gig Alerts</p>
              <p className="text-cyan-300/70 text-xs mt-0.5">Get notified the moment an offer arrives</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => { setDismissed(true); localStorage.setItem(DISMISSED_KEY, '1'); }}
                className="p-1.5 text-gray-600 hover:text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={requestPermission}
                disabled={isLoading}
                className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-black text-sm px-4 py-2 rounded-xl transition-all disabled:opacity-50"
              >
                {isLoading ? '…' : 'Enable'}
              </button>
            </div>
          </div>
        )}

        {status === 'denied' && !dismissed && (
          <div className="relative rounded-2xl p-4 flex items-start gap-3" style={{ background: '#1a0a0a', border: '1.5px solid rgba(239,68,68,0.4)' }}>
            <Bell className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-300 font-bold text-sm">Notifications blocked</p>
              <p className="text-gray-500 text-xs mt-1">
                {isIOS ? 'Settings → CB51 → Notifications → Allow' : 'Click the 🔒 in your browser address bar → Allow notifications'}
              </p>
            </div>
            <button onClick={() => { setDismissed(true); localStorage.setItem(DISMISSED_KEY, '1'); }} className="text-gray-600 hover:text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'unsupported' && !dismissed && (
          <div className="relative rounded-2xl p-4 flex items-start gap-3" style={{ background: '#1a1400', border: '1.5px solid rgba(245,158,11,0.4)' }}>
            <Bell className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-300 font-bold text-sm">Add to Home Screen for push alerts</p>
              <p className="text-gray-500 text-xs mt-1">Tap Share → Add to Home Screen → Open CB51 from your home screen</p>
            </div>
            <button onClick={() => { setDismissed(true); localStorage.setItem(DISMISSED_KEY, '1'); }} className="text-gray-600 hover:text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}