import { useEffect } from 'react';
import { isPreviewSandbox } from '@/lib/previewWorkers';

/**
 * SERVICE WORKER MANAGER
 * Registers service worker for true offline-first PWA
 * Handles updates gracefully
 */

export default function ServiceWorkerManager() {
    useEffect(() => {
        if (isPreviewSandbox()) return;
        if ('serviceWorker' in navigator) {
            // Register service worker
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration.scope);

                    // Check for updates every hour
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000);

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                if (confirm('🎉 New version available! Update now?')) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });

            // Handle controller change
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        }
    }, []);

    return null;
}