import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Send, Copy, Loader } from 'lucide-react';

/**
 * Auto-draft email to promoter/agent
 * Shown when all band members say YES
 */
export default function CB51DraftConfirmationEmail({ gig, onSent }) {
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const draftEmail = `Hi ${gig.promoter_name || 'there'},

Great news — the band can confirm for ${gig.venue} on ${gig.date_start}.

We'll see you at ${gig.time_start || '(time TBC)'}. 

Looking forward to it!

Best,
CB51`;

  const handleSendEmail = async () => {
    if (!gig.promoter_email) {
      alert('No promoter email on file');
      return;
    }

    setSending(true);
    try {
      await base44.functions.invoke('sendGigConfirmationEmail', {
        gigId: gig.id,
        artistId: gig.artist_id,
        promoterEmail: gig.promoter_email,
        message: draftEmail
      });

      // Log decision
      await base44.functions.invoke('recordGigDecision', {
        gigId: gig.id,
        artistId: gig.artist_id,
        decision: 'confirmed',
        reason: 'All band members confirmed'
      });

      onSent?.();
    } catch (error) {
      console.error('Send failed:', error);
      alert('Failed to send confirmation');
    } finally {
      setSending(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-950/30 border border-green-500/40 rounded-xl overflow-hidden"
    >
      <div className="bg-green-500/10 px-4 py-2 flex items-center justify-between">
        <span className="text-green-400 font-black text-xs">READY TO CONFIRM</span>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-gray-300 leading-relaxed whitespace-pre-line border border-white/5 max-h-32 overflow-y-auto">
          {draftEmail}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleSendEmail}
            disabled={sending}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-black py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            {sending ? <Loader className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}