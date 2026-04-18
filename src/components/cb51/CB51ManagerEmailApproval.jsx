import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Mail, Send, ChevronDown, AlertCircle, CheckCircle, Loader } from 'lucide-react';

/**
 * MANAGER EMAIL APPROVAL
 * Inline expandable section — no modal, stays on page
 * Scott taps → draft appears → taps SEND → email goes instantly
 * Works great on mobile ♾️❤️
 */

export default function CB51ManagerEmailApproval({ gig, onEmailSent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const promoterName = gig.promoter_name || 'Promoter';
  const venue = gig.venue || gig.title || 'Venue';
  const date = gig.date_start || 'TBD';
  const fee = gig.fee || 'TBD';
  const artistName = gig.artist_name || 'Artist';

  const emailDraft = `Hi ${promoterName},

Great news! ${artistName} can confirm for your event.

📅 ${date}
📍 ${venue}
💰 £${fee}

We'll send load-in details shortly. Anything you need from us, just shout.

Cheers,
${artistName} Management`;

  const handleSendEmail = async () => {
    if (!gig?.promoter_email) {
      setError('No promoter email found');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const res = await base44.functions.invoke('sendGigConfirmationEmail', {
        gigId: gig.id,
        artistId: gig.artist_id,
        gigData: gig,
        decision: 'approved'
      });

      if (res.success || res.data?.success) {
        setSent(true);
        setTimeout(() => {
          if (onEmailSent) onEmailSent();
          setIsExpanded(false);
        }, 2000);
      } else {
        setError(res.error || 'Failed to send email');
      }
    } catch (err) {
      setError(err.message || 'Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  if (!gig) return null;

  return (
    <>
      {/* EXPAND BUTTON */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-bold transition-colors"
      >
        <Mail className="w-4 h-4" />
        Send confirmation email
        <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* INLINE EXPANSION */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-cyan-950/20 border border-cyan-500/20 border-t-0 rounded-b-lg p-3 space-y-3">
              {/* EMAIL DRAFT */}
              <div className="space-y-2">
                <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">Draft to {gig.promoter_email}:</p>
                <div className="bg-black/40 border border-white/10 rounded-lg p-2 text-white text-xs whitespace-pre-wrap font-mono max-h-32 overflow-y-auto">
                  {emailDraft}
                </div>
              </div>

              {/* ERROR / SUCCESS */}
              {error && (
                <div className="flex items-start gap-2 text-red-400 text-xs bg-red-950/30 p-2 rounded">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {sent && (
                <div className="flex items-start gap-2 text-green-400 text-xs bg-green-950/30 p-2 rounded">
                  <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>Email sent!</span>
                </div>
              )}

              {/* SEND BUTTON */}
              <button
                onClick={handleSendEmail}
                disabled={isSending || sent}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Now
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}