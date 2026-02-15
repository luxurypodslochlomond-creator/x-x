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
      // Get current user email
      const user = await base44.auth.me();
      
      // Send test push notification using sendBrowserPush
      await base44.asServiceRole.functions.invoke('sendBrowserPush', {
        recipient_email: user.email,
        title: '🎸 CB51 TEST',
        message: 'Notifications working! You will get real gig alerts like this.',
        notification_type: 'test'
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      console.log('✓ Test notification sent to:', user.email);
    } catch (error) {
      console.error('Test notification failed:', error);
      alert(`Test failed: ${error.message}\n\nCheck if notifications are enabled in your phone settings.`);
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