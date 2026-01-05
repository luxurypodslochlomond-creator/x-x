import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SCOTT PUSH NOTIFICATIONS
 * Manager gets notified: new gig offers
 * Artists get notified: gig votes needed
 * Deep links → tap notification = straight to page
 */

export default function ScottPushNotifications() {
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    checkPermission();
    registerServiceWorker();
  }, []);

  const checkPermission = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setEnabled(Notification.permission === 'granted');
    }
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Push notifications not supported on this browser');
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      setEnabled(true);
      await subscribeToPush();
      alert('✅ Notifications enabled!');
    } else {
      alert('Enable notifications in browser settings');
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BMDkZ8LQ_xqX9YqR5-K8Z7HpHqJ_xC7bR3mN5FzKp8wE4L2G9sT5vN1xY3pQ6rM8wV7nJ4kL2sX9fR5pT3vQ8wE'
        )
      });

      // Save subscription to database
      const user = await base44.auth.me();
      await base44.entities.ScottPushSubscription.create({
        user_email: user.email,
        subscription: JSON.stringify(subscription),
        enabled: true
      });

      console.log('✅ Push subscription saved');
    } catch (error) {
      console.error('Push subscription failed:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  if (permission === 'granted' && enabled) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500/20 border-2 border-green-500 rounded-lg px-4 py-2 flex items-center gap-2">
        <Bell className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm font-bold">Notifications ON</span>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500/20 border-2 border-red-500 rounded-lg px-4 py-2">
        <p className="text-red-400 text-sm font-bold">Enable in browser settings</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        onClick={requestPermission}
        className="bg-cyan-600 hover:bg-cyan-700 gap-2"
      >
        <Bell className="w-4 h-4" />
        Enable Notifications
      </Button>
    </div>
  );
}