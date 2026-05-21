import { useState } from 'react';
import { Bell, CheckCircle, Loader, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * CB51 TEST PUSH NOTIFICATION
 * ─────────────────────────────────────────────
 * Lets managers test the CB51 branded push notification system.
 * Ensures they'll receive gig updates, band votes, and confirmations. ♾️❤️
 */

export default function CB51TestPush({ artistId }) {
  const [testing, setTesting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleTestPush = async () => {
    setTesting(true);
    try {
      // Use sendBrowserPush directly for testing - no artist lookup needed
      await base44.functions.invoke('sendBrowserPush', {
        title: '🎵 CB51 Test Notification',
        message: 'Your CB51 push notifications are working! You\'ll receive gig updates here.',
        notification_type: 'test',
        icon: '/api/functions/serveCB51PNGIcon?size=192',
        badge: '/api/functions/serveCB51PNGMaskableIcon?size=192',
        brand: 'cb51'
      });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error('Test push failed:', err);
      alert('Could not send test notification. Make sure you\'ve allowed notifications and have the PWA installed.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyan-950/30 border-2 border-cyan-500/30 rounded-xl p-4 mb-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Radio className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-cyan-300 font-black text-xs font-mono tracking-widest mb-1">TEST CB51 PUSH</h4>
          <p className="text-gray-500 text-xs mb-3">
            Send a test push notification to verify you'll receive gig updates.
          </p>
          
          {sent ? (
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Test notification sent! Check your device.</span>
            </div>
          ) : (
            <button
              onClick={handleTestPush}
              disabled={testing}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-black font-black text-xs rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  SEND TEST PUSH
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}