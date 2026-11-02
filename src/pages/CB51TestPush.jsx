import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, Send, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { registerWorker } from '@/lib/previewWorkers';

/**
 * CB51 PUSH NOTIFICATION TESTER
 * Tests the full notification flow:
 * 1. Permission request
 * 2. Subscription save
 * 3. Test send
 * 4. Receive notification
 */

export default function CB51TestPush() {
  const [status, setStatus] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [sending, setSending] = useState(false);

  const requestPermission = async () => {
    setStatus('Requesting permission...');
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        setStatus('❌ Permission denied. Enable in browser settings.');
        return;
      }
      
      setStatus('✅ Permission granted! Registering service worker...');
      
      // Register service worker
      const registration = await registerWorker('/api/functions/serveServiceWorker');
      if (!registration) {
        setStatus('Service workers are off in the editor preview.');
        return;
      }
      await navigator.serviceWorker.ready;
      
      setStatus('✅ Service worker ready! Subscribing to push...');
      
      // Subscribe to push
      const publicKey = 'BNWgD_w9rFCXxKNLUJJEm0-GbTgP9CqM0xN8LQrSBwPx7E0OqKy5-vQMYdV-9QFJG2BwQz8YKN3jQ2Vy5RzN1Qo'; // VAPID public key
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
      });
      
      setSubscription(sub);
      
      // Save subscription
      const user = await base44.auth.me();
      await base44.entities.ScottPushSubscription.create({
        endpoint: sub.endpoint,
        keys: JSON.stringify(sub.toJSON().keys),
        user_email: user.email
      });
      
      setStatus('✅ READY! Push notifications enabled. Try "Send Test".');
      
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Push setup error:', error);
    }
  };

  const sendTestNotification = async () => {
    setSending(true);
    setStatus('Sending test notification...');
    
    try {
      const user = await base44.auth.me();
      
      await base44.functions.invoke('sendCB51Notification', {
        user_email: user.email,
        title: '🎸 TEST GIG OFFER',
        body: 'The Garage, Glasgow • 15 Feb • £500',
        data: {
          type: 'gig_offer',
          offer_id: 'test_123'
        }
      });
      
      setStatus('✅ Test notification sent! Check your notifications.');
    } catch (error) {
      setStatus(`❌ Send failed: ${error.message}`);
      console.error('Send error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-black text-cyan-400">CB51 PUSH TEST</h1>
            <p className="text-gray-500 text-xs">Test notification flow</p>
          </div>
        </div>

        {/* STATUS */}
        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-cyan-400 font-bold text-sm">STATUS</h2>
          </div>
          <p className="text-white text-sm font-mono whitespace-pre-wrap">
            {status || 'Click "Enable Push" to start'}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={requestPermission}
            disabled={!!subscription}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-lg"
          >
            {subscription ? '✅ PUSH ENABLED' : '🔔 ENABLE PUSH'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={sendTestNotification}
            disabled={!subscription || sending}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {sending ? 'SENDING...' : '📬 SEND TEST'}
          </motion.button>
        </div>

        {/* SUBSCRIPTION INFO */}
        {subscription && (
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
            <h3 className="text-green-400 font-bold text-sm mb-2">SUBSCRIPTION ACTIVE</h3>
            <p className="text-gray-400 text-xs font-mono break-all">
              {subscription.endpoint.substring(0, 80)}...
            </p>
          </div>
        )}

        {/* INSTRUCTIONS */}
        <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4">
          <h3 className="text-cyan-300 font-bold text-sm mb-3">HOW TO TEST:</h3>
          <ol className="text-gray-300 text-xs space-y-2 font-mono">
            <li>1. Click "ENABLE PUSH" (grants permission)</li>
            <li>2. Click "SEND TEST" (sends notification)</li>
            <li>3. Check your notifications (should see gig offer)</li>
            <li>4. If works → ready for Robbie Williams demo!</li>
          </ol>
        </div>

        {/* TROUBLESHOOTING */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3 className="text-red-400 font-bold text-sm mb-3">TROUBLESHOOTING:</h3>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• iOS: Add to home screen first (PWA required)</li>
            <li>• Android: Works in browser + PWA</li>
            <li>• Check browser console for errors</li>
            <li>• Make sure VAPID keys match</li>
          </ul>
        </div>

      </div>
    </div>
  );
}