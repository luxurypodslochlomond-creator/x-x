import React, { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * PUSH NOTIFICATIONS FOR CB51
 * Web Push API - sends to band/manager phones
 */

export default function ScottPushNotifications() {
    const [permission, setPermission] = useState(Notification.permission);
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkSubscription();
    }, []);

    const checkSubscription = async () => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            return;
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setSubscribed(!!subscription);
        } catch (error) {
            console.error('Check subscription error:', error);
        }
    };

    const subscribeMutation = useMutation({
        mutationFn: async (subscription) => {
            const user = await base44.auth.me();
            return base44.entities.ScottPushSubscription.create({
                user_email: user.email,
                subscription: JSON.stringify(subscription),
                is_active: true
            });
        },
        onSuccess: () => {
            setSubscribed(true);
            alert('✓ Push notifications enabled');
        }
    });

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser doesn\'t support notifications');
            return;
        }

        setLoading(true);

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                // Subscribe to push
                const registration = await navigator.serviceWorker.ready;
                
                // Get VAPID public key from backend (you'll need to set this up)
                // For now, using a placeholder - replace with your VAPID public key
                const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY_HERE';
                
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });

                // Save subscription to database
                await subscribeMutation.mutateAsync(subscription.toJSON());
            }
        } catch (error) {
            console.error('Notification error:', error);
            alert('Error enabling notifications: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const unsubscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await subscription.unsubscribe();
                setSubscribed(false);
                alert('✓ Notifications disabled');
            }
        } catch (error) {
            console.error('Unsubscribe error:', error);
        }
    };

    // Test notification
    const sendTestNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('CB51 Test', {
                body: 'Notifications are working! 🎸',
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png'
            });
        }
    };

    if (!('Notification' in window)) {
        return (
            <div className="bg-black border-2 border-gray-900 rounded-lg p-4">
                <p className="text-gray-500 text-sm font-mono">
                    Push notifications not supported on this device
                </p>
            </div>
        );
    }

    return (
        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-black font-mono">PUSH NOTIFICATIONS</h3>
                </div>
                {subscribed && <CheckCircle className="w-5 h-5 text-green-400" />}
            </div>

            <p className="text-gray-400 text-xs font-mono mb-4">
                Get notified when new gigs come in
            </p>

            {permission === 'denied' ? (
                <p className="text-red-400 text-sm font-mono">
                    Notifications blocked. Enable in browser settings.
                </p>
            ) : subscribed ? (
                <div className="space-y-3">
                    <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                        <p className="text-green-400 text-sm font-mono">✓ Active</p>
                    </div>
                    <button
                        onClick={sendTestNotification}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 rounded font-mono text-sm"
                    >
                        TEST NOTIFICATION
                    </button>
                    <button
                        onClick={unsubscribe}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-gray-400 font-bold py-2 rounded font-mono text-sm"
                    >
                        DISABLE
                    </button>
                </div>
            ) : (
                <button
                    onClick={requestPermission}
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    {loading ? 'SETTING UP...' : (
                        <>
                            <Bell className="w-5 h-5" />
                            ENABLE NOTIFICATIONS
                        </>
                    )}
                </button>
            )}
        </div>
    );
}

// Helper function for VAPID key conversion
function urlBase64ToUint8Array(base64String) {
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
}