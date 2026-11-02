import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import CB51NotificationStatus from './CB51NotificationStatus';
import { isPreviewSandbox, registerWorker } from '@/lib/previewWorkers';

/**
 * PushNotificationManager - Web Push Notifications for CB51
 * Handles browser notification permissions + subscriptions
 */

export default function PushNotificationManager({ onSubscriptionChange }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsPWA, setNeedsPWA] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if running as PWA (added to home screen)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    
    // Check browser support
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    // iOS Safari needs PWA mode for push notifications
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && !isStandalone) {
      setNeedsPWA(true);
      setIsLoading(false);
      return;
    }

    // Just check support, DON'T init yet - wait for user click
    if (supported) {
      startNotificationListener();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Real-time notification listener
  const startNotificationListener = async () => {
    try {
      const { base44 } = await import('@/api/base44Client');
      const user = await base44.auth.me();
      
      // Subscribe to new notifications for this user
      const unsubscribe = base44.entities.ScottNotification.subscribe(async (event) => {
        if (event.type === 'create' && event.data?.recipient_email === user.email) {
          const notification = event.data;
          
          // Show browser notification immediately
          if (Notification.permission === 'granted') {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(notification.title, {
              body: notification.message,
              icon: '/api/functions/serveCB51PNGIcon?size=192',
              badge: '/api/functions/serveCB51PNGMaskableIcon?size=192',
              tag: `cb51-${notification.gig_offer_id || notification.id}`,
              data: { url: notification.action_url || '/CB51' },
              requireInteraction: true,
              vibrate: [200, 100, 200],
            });
          }
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log('Notification listener:', e);
    }
  };

  const initializePushNotifications = async () => {
        if (isPreviewSandbox()) { setIsLoading(false); return; }
        let timeoutId = null;
        try {
            setIsLoading(true);
            const swPath = '/api/functions/serveServiceWorker';

            // Timeout after 2 seconds - aggressive for mobile
            const timeoutPromise = new Promise((_, reject) => {
              timeoutId = setTimeout(() => reject(new Error('timeout')), 2000);
            });

            const registration = await Promise.race([
              registerWorker(`${swPath}?v=${Date.now()}`, { scope: '/' }),
              timeoutPromise
            ]);

            clearTimeout(timeoutId);
            console.log('✓ Service Worker registered');

            // Don't wait indefinitely for ready
            await Promise.race([
              navigator.serviceWorker.ready,
              new Promise((_, reject) => setTimeout(() => reject(new Error('ready timeout')), 1000))
            ]);

            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
            console.log('✓ Push notifications initialized');
          } catch (error) {
            clearTimeout(timeoutId);
            console.error('Push init:', error.message);
          } finally {
            setIsLoading(false);
          }
        };

  const requestNotificationPermission = async () => {
    if (isPreviewSandbox()) return;
    try {
      setIsLoading(true);
      const { base44 } = await import('@/api/base44Client');

      // Step 1: Browser permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setIsLoading(false);
        return;
      }

      // Step 2: Register service worker if not already
      if (!navigator.serviceWorker.controller) {
        await registerWorker(`/api/functions/serveServiceWorker?v=${Date.now()}`, { scope: '/' });
      }

      // Step 3: Get VAPID key
      const vapidRes = await fetch('/api/functions/getVapidPublicKey');
      const vapidData = await vapidRes.json();
      const vapidPublicKey = vapidData.vapidPublicKey;

      // Step 4: Service worker ready + subscribe
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Step 5: Save to database — single source of truth: UserPushSubscription
      const user = await base44.auth.me();
      const existing = await base44.entities.UserPushSubscription.filter({ user_email: user.email });
      if (existing.length > 0) {
        await base44.entities.UserPushSubscription.update(existing[0].id, {
          subscription_data: JSON.stringify(subscription.toJSON()),
          is_active: true,
          last_active: new Date().toISOString()
        });
      } else {
        await base44.entities.UserPushSubscription.create({
          user_email: user.email,
          subscription_data: JSON.stringify(subscription.toJSON()),
          is_active: true,
          last_active: new Date().toISOString()
        });
      }

      setIsSubscribed(true);
      onSubscriptionChange?.(subscription);
      
      // Success notification
      await registration.showNotification('✓ CB51 alerts ready', {
        body: 'You\'ll be notified instantly when gig offers arrive',
        icon: '/api/functions/serveCB51PNGIcon?size=192',
        badge: '/api/functions/serveCB51PNGMaskableIcon?size=192',
        tag: 'cb51-welcome',
      });
    } catch (error) {
      console.error('Setup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disableNotifications = async () => {
    try {
      setIsLoading(true);
      const { base44 } = await import('@/api/base44Client');
      const user = await base44.auth.me();
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
      // Remove from database
      const subs = await base44.entities.UserPushSubscription.filter({ user_email: user.email });
      for (const sub of subs) {
        await base44.entities.UserPushSubscription.update(sub.id, { is_active: false });
      }
        
        await subscription.unsubscribe();
        setIsSubscribed(false);
        onSubscriptionChange?.(null);
        alert('Notifications disabled');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show status even if not supported - be transparent
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
        <BellOff className="w-4 h-4 text-gray-500" />
        <span className="text-xs font-mono text-gray-500">Browser doesn't support push</span>
      </div>
    );
  }

  if (needsPWA) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/50">
        <Bell className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono text-cyan-400">Add to home screen for alerts</span>
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/50">
        <Bell className="w-4 h-4 text-green-400" />
        <span className="text-xs font-mono font-bold text-green-400">Notifications enabled ✓</span>
        <button
          onClick={disableNotifications}
          className="ml-auto text-green-400 hover:text-green-300 text-xs font-mono underline"
        >
          Off
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <CB51NotificationStatus />
      
      <button
        onClick={requestNotificationPermission}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
          isLoading 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
            : 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Enabling...</span>
          </>
        ) : (
          <>
            <Bell className="w-4 h-4" />
            <span>Enable alerts for your team</span>
          </>
        )}
      </button>
    </div>
  );
}

// Helper function for VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}