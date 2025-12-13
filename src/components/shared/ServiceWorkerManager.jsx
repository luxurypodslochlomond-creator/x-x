import { useEffect, useState } from 'react';

/**
 * SERVICE WORKER MANAGER
 * True offline capability, background sync, push notifications
 * Works like native app
 */

export const ServiceWorkerManager = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            registerServiceWorker();
        }
    }, []);

    const registerServiceWorker = async () => {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js');
            setRegistration(reg);

            // Check for updates
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        setUpdateAvailable(true);
                    }
                });
            });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'SYNC_COMPLETE') {
                    console.log('Background sync completed');
                }
            });
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    };

    const updateServiceWorker = () => {
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    };

    return updateAvailable ? (
        <div className="fixed bottom-4 right-4 bg-cyan-500 text-white p-4 rounded-lg shadow-lg z-50">
            <p className="font-bold mb-2">Update Available</p>
            <button
                onClick={updateServiceWorker}
                className="bg-white text-cyan-500 px-4 py-2 rounded font-bold"
            >
                Update Now
            </button>
        </div>
    ) : null;
};

// Service Worker helper functions
export const registerBackgroundSync = async (tag) => {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(tag);
    }
};

export const requestNotificationPermission = async () => {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
};

export default ServiceWorkerManager;