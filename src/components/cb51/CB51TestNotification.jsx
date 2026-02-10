import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Zap, Loader } from 'lucide-react';

/**
 * TEST NOTIFICATION BUTTON
 * Send yourself a test push notification
 * Helps verify notifications are working before real gigs
 */

export default function CB51TestNotification() {
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendTest = async () => {
    setIsSending(true);
    setSuccess(false);
    
    try {
      await base44.functions.invoke('sendCB51Notification', {
        title: '🎸 TEST GIG OFFER',
        body: 'This is a test notification - notifications are working!',
        tag: 'test-notification',
        url: '/api/functions/CB51'
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      console.log('✓ Test notification sent');
    } catch (error) {
      console.error('Test notification failed:', error);
      alert('Failed to send test notification');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={sendTest}
      disabled={isSending}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all ${
        success
          ? 'bg-green-600 text-white'
          : 'bg-black border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 disabled:opacity-50'
      }`}
    >
      {isSending ? (
        <Loader className="w-3 h-3 animate-spin" />
      ) : success ? (
        '✓ Sent!'
      ) : (
        <>
          <Zap className="w-3 h-3" />
          Test Notification
        </>
      )}
    </button>
  );
}