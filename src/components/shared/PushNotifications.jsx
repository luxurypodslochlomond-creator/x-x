import React, { useEffect, useState } from 'react';
import { Bell, BellOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerWorker } from '@/lib/previewWorkers';

export default function PushNotifications() {
    const [permission, setPermission] = useState(Notification.permission);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    }, []);

    const requestPermission = async () => {
        if (!isSupported) return;

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                // Register service worker for push
                if ('serviceWorker' in navigator) {
                    const registration = await registerWorker('/sw.js');
                    console.log('Service Worker registered:', registration);
                }
            }
        } catch (error) {
            console.error('Notification permission error:', error);
        }
    };

    if (!isSupported) return null;

    if (permission === 'granted') {
        return (
            <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Notifications ON</span>
            </div>
        );
    }

    if (permission === 'denied') {
        return (
            <div className="flex items-center gap-2 text-gray-500 text-sm font-mono">
                <BellOff className="w-4 h-4" />
                <span>Notifications blocked</span>
            </div>
        );
    }

    return (
        <Button
            onClick={requestPermission}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
            <Bell className="w-4 h-4 mr-2" />
            Enable Notifications
        </Button>
    );
}

// Utility to send notification
export async function sendTransferNotification(recipient, amount, sender) {
    if (Notification.permission !== 'granted') return;

    try {
        new Notification('P51 Received!', {
            body: `+${amount} P51 from ${sender}`,
            icon: '/icon-192x192.png',
            badge: '/icon-96x96.png',
            tag: 'p51-transfer',
            requireInteraction: false,
            silent: false
        });

        // Vibrate if supported (mobile)
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
    } catch (error) {
        console.error('Notification error:', error);
    }
}