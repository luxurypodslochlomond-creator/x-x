import { useEffect } from 'react';

/**
 * BACKGROUND SYNC - QUEUE OFFLINE ACTIONS
 * Automatically syncs when connection restored
 */

export default function BackgroundSync() {
    useEffect(() => {
        // Register sync when back online
        const handleOnline = () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    if ('sync' in registration) {
                        registration.sync.register('sync-pending')
                            .then(() => console.log('✅ Background sync registered'))
                            .catch(err => console.error('Sync registration failed:', err));
                    }
                });
            }
        };

        if ('serviceWorker' in navigator) {
            window.addEventListener('online', handleOnline);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
        };

        // Listen for sync messages from service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'SYNC_PENDING') {
                    syncAllPendingData();
                }
            });
        }
    }, []);

    const syncAllPendingData = async () => {
        // Trigger sync for all pending data types
        const syncEvents = [
            'scott_pending_gig_emails',
            'pending_cleanups',
            'pending_analytics'
        ];

        for (const key of syncEvents) {
            const data = localStorage.getItem(key);
            if (data) {
                window.dispatchEvent(new CustomEvent('sync-data', { 
                    detail: { key, data: JSON.parse(data) }
                }));
            }
        }
    };

    return null;
}