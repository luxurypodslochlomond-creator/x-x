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
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);

    if (supported) {
      initializePushNotifications();
    } else {
      setIsLoading(false);
    }
  }, []);

  const initializePushNotifications = async () => {
    try {
      // Register service worker
      if (!navigator.serviceWorker.controller) {
        await navigator.serviceWorker.register('/sw.js');
      }

      // Check current subscription
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
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
        alert('Notification permission denied');
        return;
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BZGJS8YZBuFP5tHaJmw2Lz5cXzw0JOkr5hEnIcBdM0mVA9WTxqU-h0oEYE0t-hg9_Y1SlLUY7N3bvBUWrYUHyLo'
        ),
      });

      setIsSubscribed(true);
      onSubscriptionChange?.(subscription);
      
      // Send subscription to backend for storage (optional - for server-side push later)
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription }),
        }).catch(() => {}); // Non-critical - don't block UI
      } catch {}
      
      alert('✓ Notifications enabled! You\'ll get alerts for gig offers & urgent messages.');
    } catch (error) {
      console.error('Permission request error:', error);
      alert('Could not enable notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const disableNotifications = async () => {
    try {
      setIsLoading(true);
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
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