/**
 * Serve CB51 Service Worker for push notifications
 * Registers at /sw.js
 */

import { serviceWorkerFetch } from '../../shared/serviceWorkerFetch.ts';

export default async function(req) {
   const swCode = `
// CB51 Service Worker - Push Notifications + Offline
const CACHE_NAME = 'cb51-v6';

self.addEventListener('install', (event) => {
  console.log('[SW] CB51 installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => /^cb51-v[0-9]+$/.test(key) && key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'CB51', body: event.data?.text() || 'New notification' };
  }

  const title = data.title || 'CB51';
   const options = {
      body: data.body || 'You have a new update',
      icon: data.icon || '/api/functions/serveCB51PNGIcon?size=192',
      badge: data.badge || '/api/functions/serveCB51PNGMaskableIcon?size=192',
     tag: data.tag || 'cb51-notification',
     data: {
       url: data.url || '/',
     },
     requireInteraction: true,
     vibrate: [200, 100, 200],
     actions: data.actions || [],
   };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

${serviceWorkerFetch}
self.addEventListener('fetch', (event) => appFetch(event, CACHE_NAME));

// Handle notification clicks + action buttons
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked', event.action);
  event.notification.close();

  // Handle action button clicks (YES/NO on gig votes)
  if (event.action === 'approve' || event.action === 'reject') {
    const gigId = event.notification.data?.gigOfferId;
    const vote = event.action === 'approve' ? 'yes' : 'no';
    
    event.waitUntil(
      fetch('/api/functions/handleBandVoteAction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigOfferId: gigId,
          vote: vote,
          reason: null // Will prompt for reason if NO
        })
      }).then(() => {
        // Show success notification
        return self.registration.showNotification(
          vote === 'yes' ? '✅ Vote recorded' : 'Please add reason',
          {
          body: vote === 'yes' ? 'Manager has been notified' : 'Opening app...',
          icon: '/api/functions/serveCB51PNGIcon?size=192',
          badge: '/api/functions/serveCB51PNGMaskableIcon?size=192',
          tag: 'vote-result'
          }
        );
      }).then(() => {
        // If NO vote, open app for reason
        if (vote === 'no') {
          return clients.openWindow('/app/CB51BandVote?gigId=' + gigId);
        }
      })
    );
    return;
  }

  // Default click - open URL
  const urlToOpen = event.notification.data?.url || '/CB51';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app already open — focus + navigate
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus().then(() => client.navigate(urlToOpen));
        }
      }
      // Open fresh
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

console.log('[SW] CB51 Service Worker loaded');
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    },
  });
}