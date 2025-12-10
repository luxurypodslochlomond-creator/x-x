import React, { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * PUSH NOTIFICATIONS - TEAM SYNC
 * "Dave confirmed Friday" → Push to Rosie, band members
 * "New gig offer - vote now" → Everyone gets notified
 * Works on phone/laptop/tablet
 */

export default function ScottPushNotifications({ teamMemberId }) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsSubscribed(!!subscription);
        } catch (error) {
            console.error('Check subscription error:', error);
        }
    };

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

    const subscribeToPush = async () => {
        setIsLoading(true);
        try {
            // Request notification permission
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Notification permission denied');
                return;
            }

            // Get service worker registration
            const registration = await navigator.serviceWorker.ready;

            // Subscribe to push
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    'BEl62iUYgUivxIkv69yViEuiBIa-Ib37gp2ENXrAHGr3Hh-qSNmgH_HpcyB6kK7Y3_3u0Zo0NKjKbNXnLc0-h7Q'
                )
            });

            // Save subscription to database
            await base44.entities.ScottPushSubscription.create({
                team_member_id: teamMemberId,
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.toJSON().keys.p256dh,
                    auth: subscription.toJSON().keys.auth
                },
                device: navigator.userAgent,
                active: true
            });

            setIsSubscribed(true);
        } catch (error) {
            console.error('Subscribe error:', error);
            alert(`Failed to subscribe: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const unsubscribeFromPush = async () => {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await subscription.unsubscribe();
            }

            // TODO: Remove from database
            setIsSubscribed(false);
        } catch (error) {
            console.error('Unsubscribe error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return (
            <div className="bg-gray-900/40 border border-gray-700 p-3 mb-4">
                <p className="text-gray-500 text-xs font-mono">
                    Push notifications not supported on this browser
                </p>
            </div>
        );
    }

    return (
        <div className="bg-black border-2 border-cyan-500 p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <div>
                        <p className="text-cyan-400 font-mono font-bold text-sm">PUSH NOTIFICATIONS</p>
                        <p className="text-gray-500 text-xs font-mono">Get updates on this device</p>
                    </div>
                </div>

                {isSubscribed ? (
                    <button
                        onClick={unsubscribeFromPush}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-mono text-xs flex items-center gap-2"
                    >
                        <BellOff className="w-4 h-4" />
                        TURN OFF
                    </button>
                ) : (
                    <button
                        onClick={subscribeToPush}
                        disabled={isLoading}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white font-mono text-xs flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" />
                        TURN ON
                    </button>
                )}
            </div>

            {isSubscribed && (
                <div className="mt-3 bg-green-900/40 border border-green-500 p-2">
                    <p className="text-green-400 text-xs font-mono">
                        ✓ You'll get notified about:
                    </p>
                    <ul className="text-green-300 text-xs font-mono mt-1 space-y-1">
                        <li>• New gig offers</li>
                        <li>• Team votes needed</li>
                        <li>• Schedule changes</li>
                        <li>• Urgent tasks</li>
                    </ul>
                </div>
            )}
        </div>
    );
}