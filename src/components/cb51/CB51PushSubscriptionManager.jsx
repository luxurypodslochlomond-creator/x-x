import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, BellOff, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';

/**
 * CB51 PUSH SUBSCRIPTION MANAGER
 * Makes notification setup VISIBLE so users know their status
 * and can take action if not enabled
 */

export default function CB51PushSubscriptionManager({ userEmail }) {
  const [status, setStatus] = useState('checking'); // checking | unsupported | denied | needs_permission | subscribed | error
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, [userEmail]);

  const checkStatus = async () => {
    // Not supported
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported');
      return;
    }

    // Already denied by user
    if (Notification.permission === 'denied') {
      setStatus('denied');
      return;
    }

    // Check if already subscribed
    try {
      const reg = await navigator.serviceWorker.getRegistration('/');
      if (reg) {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          setStatus('subscribed');
          return;
        }
      }
    } catch (e) {
      // ignore
    }

    // Permission granted but no subscription yet — auto-subscribe
    if (Notification.permission === 'granted') {
      await subscribe();
      return;
    }

    // Default: needs permission
    setStatus('needs_permission');
  };

  const getOrCreateRegistration = async () => {
    const swUrl = '/api/functions/serveServiceWorker';
    
    // Always re-register to pick up SW updates
    const existing = await navigator.serviceWorker.getRegistration('/');
    if (existing) {
      existing.update().catch(() => {}); // non-blocking update check
      return existing;
    }

    return await navigator.serviceWorker.register(swUrl, { scope: '/' });
  };

  const subscribe = async () => {
    setIsLoading(true);
    try {
      const registration = await getOrCreateRegistration();
      // Wait for SW to be active
      await navigator.serviceWorker.ready;

      // Get VAPID key
      let vapidPublicKey = localStorage.getItem('VAPID_PUBLIC_KEY');
      if (!vapidPublicKey) {
        const res = await fetch('/api/functions/getVapidPublicKey');
        const data = await res.json();
        vapidPublicKey = data.vapidPublicKey;
        if (vapidPublicKey) localStorage.setItem('VAPID_PUBLIC_KEY', vapidPublicKey);
      }

      if (!vapidPublicKey) {
        setStatus('error');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      // Save to DB
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
      if ('vibrate' in navigator) navigator.vibrate(200);
    } catch (error) {
      console.error('Subscribe failed:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await subscribe();
    } else {
      setStatus('denied');
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  };

  // Detect iOS
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isAndroid = /Android/.test(navigator.userAgent);

  // Subscribed — show nothing (all good)
  if (status === 'subscribed' || status === 'checking') return null;

  // iOS in browser (not installed) — silent, don't clutter the UI
  if (isIOS && !isInStandaloneMode) {
    return null;
  }

  // Desktop browsers — push notifications are unreliable, hide silently
  if (!isIOS && !isAndroid) return null;

  // Needs permission — show a clear prompt
  if (status === 'needs_permission') {
    return (
      <div className="mx-6 mt-4 bg-cyan-950/60 border border-cyan-500/50 rounded-lg p-4 flex items-center gap-3">
        <Bell className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-cyan-300 font-bold text-sm">Enable Gig Notifications</p>
          <p className="text-gray-400 text-xs mt-0.5">Get alerts when new offers arrive</p>
        </div>
        <button
          onClick={requestPermission}
          disabled={isLoading}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs px-3 py-2 rounded transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {isLoading ? '...' : 'Enable'}
        </button>
      </div>
    );
  }

  // Denied — tell them how to fix it
  if (status === 'denied') {
    return (
      <div className="mx-6 mt-4 bg-red-950/40 border border-red-500/40 rounded-lg p-4 flex items-start gap-3">
        <BellOff className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-300 font-bold text-sm">Notifications Blocked</p>
          <p className="text-gray-400 text-xs mt-1">
            {isIOS 
              ? 'Go to Settings → CB51 → Notifications → Allow Notifications'
              : 'Go to your browser settings and allow notifications for this site, then refresh'
            }
          </p>
        </div>
      </div>
    );
  }

  // Unsupported
  if (status === 'unsupported') {
    return (
      <div className="mx-6 mt-4 bg-amber-950/40 border border-amber-500/40 rounded-lg p-4 flex items-start gap-3">
        <Smartphone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-bold text-sm">Notifications not supported</p>
          <p className="text-gray-400 text-xs mt-1">
            {isIOS 
              ? 'Add CB51 to your Home Screen first (Share → Add to Home Screen), then reopen the app'
              : 'Try Chrome or Firefox on Android for full notification support'
            }
          </p>
        </div>
      </div>
    );
  }

  // Error state — only show on mobile
  if (status === 'error') {
    if (!isIOS && !isAndroid) return null;
    return (
      <div className="mx-6 mt-4 bg-gray-900/60 border border-gray-700 rounded-lg p-3 flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <p className="text-gray-500 text-xs">Notification setup failed — email alerts will be used as backup</p>
      </div>
    );
  }

  return null;
}