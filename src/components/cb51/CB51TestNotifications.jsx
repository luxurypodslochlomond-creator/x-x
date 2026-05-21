import { useState } from 'react';
import { Bell, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * CB51 TEST NOTIFICATIONS
 * ─────────────────────────────────────────────
 * For solo artists (no band members) — lets them test push notifications.
 * Ensures they'll receive gig confirmations and updates. ♾️❤️
 */

export default function CB51TestNotifications({ artistId }) {
  const [testing, setTesting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleTestNotification = async () => {
    setTesting(true);
    try {
      await base44.functions.invoke('sendBrowserPush', {
        title: '🎵 CB51 Test Notification',
        body: 'Your push notifications are working! You\'ll receive gig updates here.',
        badge: '/icon-192x192.png',
        icon: '/icon-192x192.png',
        tag: 'cb51-test-notification',
        requireInteraction: false
      });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error('Test notification failed:', err);
      alert('Could not send test notification. Make sure you\'ve allowed notifications.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Bell className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-cyan-300 font-bold text-sm mb-1">Test Notifications</h4>
          <p className="text-gray-500 text-xs mb-3">
            You're a solo artist — test your push notifications so you don't miss gig updates.
          </p>
          
          {sent ? (
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Notification sent! Check your device.</span>
            </div>
          ) : (
            <button
              onClick={handleTestNotification}
              disabled={testing}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  Send Test Notification
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}