import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, BellOff, Loader } from 'lucide-react';

/**
 * CB51 PUSH SUBSCRIPTION MANAGER
 * Auto-subscribes user to browser push notifications
 * Handles service worker registration + subscription storage
 */

export default function CB51PushSubscriptionManager({ userEmail }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    initPushSubscription();
  }, [userEmail]);

  const initPushSubscription = async () => {
    try {
      // Check if service worker is available
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push notifications not supported in this browser');
        setIsLoading(false);
        return;
      }

      // Inject inline service worker via blob URL - avoids MIME/scope issues with /api/ path
      const swCode = `
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) { data = { title: 'CB51', body: event.data?.text() || 'New notification' }; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'CB51', {
      body: data.body || 'You have a new update',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: data.tag || 'cb51-notification',
      data: { url: data.data?.url || '/CB51' },
      requireInteraction: true,
      vibrate: [200, 100, 200],
    })
  );
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/CB51';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) return client.focus().then(() => client.navigate(url));
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
`;

      // Try to use a pre-existing registration first, then fall back to blob
      let registration;
      const existing = await navigator.serviceWorker.getRegistration('/');
      if (existing) {
        registration = existing;
      } else {
        // Write SW as a blob and register from there
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        try {
          registration = await navigator.serviceWorker.register(swUrl, { scope: '/' });
        } catch {
          // Blob SW registration blocked (Firefox) - silently skip push on unsupported env
          console.log('SW blob registration not supported - push unavailable');
          setIsLoading(false);
          return;
        }
      }

      // Get current subscription
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        setIsSubscribed(true);
      } else {
        // Check if notification permission is granted
        if (Notification.permission === 'granted') {
          await subscribeToPush(registration);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log('Push subscription init:', error);
      setIsLoading(false);
    }
  };

  const subscribeToPush = async (registration) => {
    try {
      setIsLoading(true);

      // Get VAPID public key from backend
      let vapidPublicKey = localStorage.getItem('VAPID_PUBLIC_KEY');
      
      if (!vapidPublicKey) {
        try {
          const res = await fetch('/api/functions/getVapidPublicKey');
          const data = await res.json();
          vapidPublicKey = data.vapidPublicKey;
          if (vapidPublicKey) {
            localStorage.setItem('VAPID_PUBLIC_KEY', vapidPublicKey);
          }
        } catch (e) {
          console.log('Failed to fetch VAPID key:', e);
        }
      }

      if (!vapidPublicKey) {
        console.log('VAPID key not available - push notifications disabled');
        return;
      }

      // Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      // Save subscription to database
      // Always use UserPushSubscription - single source of truth
      const existingSub = await base44.entities.UserPushSubscription.filter({
        user_email: userEmail
      });

      if (existingSub.length > 0) {
        await base44.entities.UserPushSubscription.update(existingSub[0].id, {
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

      setIsSubscribed(true);
      console.log('✓ Subscribed to push notifications');
      
      // Vibrate on successful subscription
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    } catch (error) {
      console.error('Push subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeToPush = async () => {
    try {
      setIsLoading(true);

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Mark as inactive in database
        const subs = await base44.entities.UserPushSubscription.filter({
          user_email: userEmail
        });

        if (subs.length > 0) {
          await base44.entities.UserPushSubscription.update(subs[0].id, {
            is_active: false
          });
        }
      }

      setIsSubscribed(false);
      console.log('✓ Unsubscribed from push notifications');
    } catch (error) {
      console.error('Push unsubscribe failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        await subscribeToPush(registration);
      }
    } catch (error) {
      console.error('Notification permission request failed:', error);
    }
  };

  // VAPID key converter
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  // Don't render anything - let the page load freely
  return null;
}