import { useEffect } from 'react';

/**
 * CB51 BACKGROUND SYNC
 * Queues votes/uploads when offline, auto-sends when online
 */

export default function CB51BackgroundSync() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('sync' in ServiceWorkerRegistration.prototype)) {
      console.log('Background Sync not supported');
      return;
    }

    // Register sync handler in service worker
    navigator.serviceWorker.ready.then(registration => {
      console.log('Background Sync ready');
    });

    // Listen for failed requests to queue them
    window.addEventListener('online', () => {
      console.log('Back online - processing queued actions');
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('sync-queued-actions').catch(err => {
          console.log('Sync registration failed:', err);
        });
      });
    });
  }, []);

  return null;
}

// Helper to queue action when offline
export const queueOfflineAction = async (action) => {
  if (!navigator.onLine) {
    const queue = JSON.parse(localStorage.getItem('cb51_offline_queue') || '[]');
    queue.push({
      ...action,
      timestamp: Date.now()
    });
    localStorage.setItem('cb51_offline_queue', JSON.stringify(queue));
    console.log('Action queued for when online:', action.type);
    return { queued: true };
  }
  return { queued: false };
};

// Helper to process queued actions
export const processQueuedActions = async (handler) => {
  const queue = JSON.parse(localStorage.getItem('cb51_offline_queue') || '[]');
  
  if (queue.length === 0) return;
  
  console.log(`Processing ${queue.length} queued actions...`);
  
  const results = [];
  for (const action of queue) {
    try {
      await handler(action);
      results.push({ success: true, action });
    } catch (err) {
      console.error('Failed to process queued action:', err);
      results.push({ success: false, action, error: err.message });
    }
  }
  
  // Clear successfully processed actions
  const failedActions = results.filter(r => !r.success).map(r => r.action);
  localStorage.setItem('cb51_offline_queue', JSON.stringify(failedActions));
  
  console.log(`Processed ${results.filter(r => r.success).length}/${queue.length} actions`);
  
  return results;
};