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
      if (!('serviceWorker' in navigator)) {
        console.log('Service Workers not supported');
        setIsLoading(false);
        return;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/api/functions/serveServiceWorker', {
        scope: '/'
      });

      // Get current subscription
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        setIsSubscribed(true);
        // Update last seen in database
        try {
          await base44.asServiceRole.entities.ScottPushSubscription.filter({
            user_email: userEmail,
            subscription_data: JSON.stringify(subscription)
          });
        } catch (e) {
          console.log('Update subscription timestamp (non-critical):', e);
        }
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
      const existingSub = await base44.entities.ScottPushSubscription.filter({
        user_email: userEmail
      });

      if (existingSub.length > 0) {
        await base44.entities.ScottPushSubscription.update(existingSub[0].id, {
          subscription_data: JSON.stringify(subscription),
          last_active: new Date().toISOString()
        });
      } else {
        await base44.entities.ScottPushSubscription.create({
          user_email: userEmail,
          subscription_data: JSON.stringify(subscription),
          is_active: true,
          last_active: new Date().toISOString()
        });
      }

      setIsSubscribed(true);
      console.log('✓ Subscribed to push notifications');
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
        const subs = await base44.entities.ScottPushSubscription.filter({
          user_email: userEmail
        });

        if (subs.length > 0) {
          await base44.entities.ScottPushSubscription.update(subs[0].id, {
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

  // Only show UI if notifications are available
  if (isLoading || !('Notification' in window)) {
    return null;
  }

  if (showUI) {
    return (
      <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSubscribed ? (
              <>
                <Bell className="w-4 h-4 text-green-400" />
                <p className="text-xs text-green-400 font-bold">Notifications ON</p>
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-400 font-bold">Notifications OFF</p>
              </>
            )}
          </div>

          <button
            onClick={isSubscribed ? unsubscribeToPush : requestNotificationPermission}
            disabled={isLoading}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold rounded transition-colors flex items-center gap-1"
          >
            {isLoading ? <Loader className="w-3 h-3 animate-spin" /> : null}
            {isSubscribed ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>
    );
  }

  // Minimized version - always show full UI in CB51
  return (
    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <>
              <Bell className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-green-400 font-bold">Notifications ON</p>
                <p className="text-[10px] text-gray-500">You'll get gig alerts</p>
              </div>
            </>
          ) : (
            <>
              <BellOff className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-xs text-yellow-400 font-bold">Notifications OFF</p>
                <p className="text-[10px] text-gray-500">Tap Enable to get alerts</p>
              </div>
            </>
          )}
        </div>

        {!isSubscribed && (
          <button
            onClick={requestNotificationPermission}
            disabled={isLoading}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold rounded transition-colors flex items-center gap-1"
          >
            {isLoading ? <Loader className="w-3 h-3 animate-spin" /> : 'Enable'}
          </button>
        )}
      </div>
    </div>
  );
}