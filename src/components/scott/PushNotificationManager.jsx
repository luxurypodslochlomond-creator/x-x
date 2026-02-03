import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import CB51NotificationStatus from './CB51NotificationStatus';

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
              icon: '/icon-192x192.png',
              badge: '/icon-192x192.png',
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
        let timeoutId = null;
        try {
            setIsLoading(true);
            const swPath = import.meta.env.VITE_API_URL 
              ? `${import.meta.env.VITE_API_URL}/serveServiceWorker`
              : '/api/serveServiceWorker';

            // Timeout after 2 seconds - aggressive for mobile
            const timeoutPromise = new Promise((_, reject) => {
              timeoutId = setTimeout(() => reject(new Error('timeout')), 2000);
            });

            const registration = await Promise.race([
              navigator.serviceWorker.register(swPath, { scope: '/' }),
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
        const swPath = import.meta.env.VITE_API_URL 
          ? `${import.meta.env.VITE_API_URL}/serveServiceWorker`
          : '/api/serveServiceWorker';
        await navigator.serviceWorker.register(swPath, { scope: '/' });
      }

      // Step 3: Get VAPID keys
      const keysResponse = await base44.functions.invoke('generateVapidKeys', {});
      const vapidPublicKey = keysResponse.data.publicKey;

      // Step 4: Service worker ready + subscribe
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Step 5: Save to database
      const user = await base44.auth.me();
      await base44.entities.ScottPushSubscription.create({
        user_email: user.email,
        subscription_data: JSON.stringify(subscription.toJSON())
      });

      setIsSubscribed(true);
      onSubscriptionChange?.(subscription);
      
      // Success notification
      await registration.showNotification('✓ Ready for gig alerts', {
        body: 'You\'ll get notified when team decisions are needed',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
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
        const subs = await base44.entities.ScottPushSubscription.filter({ user_email: user.email });
        for (const sub of subs) {
          await base44.entities.ScottPushSubscription.delete(sub.id);
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

  // If notifications aren't supported, just hide the feature - no scary warnings
  if (!isSupported || needsPWA) {
    return null;
  }

  return (
    <div className="space-y-4">
      <CB51NotificationStatus />
      
      <button
        onClick={isSubscribed ? disableNotifications : requestNotificationPermission}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-mono font-bold transition-all ${
          isSubscribed
            ? 'bg-green-500/20 border-2 border-green-500 text-green-400 hover:bg-green-500/30'
            : 'bg-cyan-500 hover:bg-cyan-600 text-black border-2 border-cyan-500'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            SETTING UP...
          </>
        ) : isSubscribed ? (
          <>
            <Bell className="w-5 h-5" />
            NOTIFICATIONS ON
          </>
        ) : (
          <>
            <Bell className="w-5 h-5" />
            ENABLE NOTIFICATIONS
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