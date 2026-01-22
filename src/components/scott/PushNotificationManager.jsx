import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';

/**
 * PushNotificationManager - Web Push Notifications for CB51
 * Handles browser notification permissions + subscriptions
 */

export default function PushNotificationManager({ onSubscriptionChange }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check browser support
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      initializePushNotifications();
      startNotificationListener();
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
    try {
      // Register service worker from backend function
      const swPath = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/serveServiceWorker`
        : '/api/serveServiceWorker';
      
      const registration = await navigator.serviceWorker.register(swPath, { scope: '/' });
      console.log('✓ Service Worker registered');

      await navigator.serviceWorker.ready;

      // Check current subscription
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
      
      console.log('✓ Push notifications initialized');
    } catch (error) {
      console.error('Push notification init error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      setIsLoading(true);

      // Request permission from user
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('❌ Permission denied - need notification permission for gig alerts');
        setIsLoading(false);
        return;
      }

      // Auto-generate VAPID keys if not exists
      const { base44 } = await import('@/api/base44Client');
      let keysResponse;
      try {
        keysResponse = await base44.functions.invoke('generateVapidKeys', {});
      } catch (keyError) {
        console.error('VAPID key error:', keyError);
        alert('⚠️ Server setup needed - contact admin');
        setIsLoading(false);
        return;
      }
      
      const vapidPublicKey = keysResponse.data.publicKey;

      // Get service worker registration
      let registration;
      try {
        registration = await navigator.serviceWorker.ready;
      } catch (swError) {
        console.error('Service worker error:', swError);
        alert('⚠️ Browser compatibility issue - try Chrome/Safari');
        setIsLoading(false);
        return;
      }

      // Subscribe to push notifications
      let subscription;
      try {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      } catch (subError) {
        console.error('Subscription error:', subError);
        alert('⚠️ Could not subscribe - try again or contact support');
        setIsLoading(false);
        return;
      }

      // Save subscription to database
      const user = await base44.auth.me();
      await base44.entities.ScottPushSubscription.create({
        user_email: user.email,
        subscription_data: subscription.toJSON()
      });

      setIsSubscribed(true);
      onSubscriptionChange?.(subscription);
      
      console.log('✓ Push subscription created:', subscription);
      
      // Test notification immediately
      try {
        await registration.showNotification('CB51 Notifications Enabled ✓', {
          body: 'You\'ll get alerts for gig offers & urgent messages',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: 'cb51-welcome',
          requireInteraction: false,
        });
      } catch (e) {
        console.log('Test notification:', e);
      }
      
      alert('✓ Notifications enabled! You\'ll get alerts for gig offers & urgent messages.');
    } catch (error) {
      console.error('Permission request error:', error);
      alert(`❌ Setup failed: ${error.message || 'Unknown error'}`);
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

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={isSubscribed ? disableNotifications : requestNotificationPermission}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
        isSubscribed
          ? 'bg-green-500/20 border border-green-500/50 text-green-400 hover:border-green-500'
          : 'bg-gray-700/50 border border-gray-600 text-gray-400 hover:bg-gray-600'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isSubscribed ? (
        <>
          <Bell className="w-4 h-4" />
          Notifications On
        </>
      ) : (
        <>
          <BellOff className="w-4 h-4" />
          Enable Notifications
        </>
      )}
    </button>
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