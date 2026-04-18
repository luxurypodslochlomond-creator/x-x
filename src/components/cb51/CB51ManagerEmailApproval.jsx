import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Mail, Send, ChevronDown, AlertCircle, CheckCircle, Loader } from 'lucide-react';

/**
 * MANAGER EMAIL APPROVAL MODAL
 * Show manager the draft email
 * Manager taps SEND → email goes to promoter instantly
 */

export default function CB51ManagerEmailApproval({ gig, onEmailSent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [emailDraft, setEmailDraft] = useState('');

  // Generate draft on mount
  React.useEffect(() => {
    if (!isOpen || !gig) return;
    
    const promoterName = gig.promoter_name || 'Promoter';
    const venue = gig.venue || gig.title || 'Venue';
    const date = gig.date_start || 'TBD';
    const fee = gig.fee || 'TBD';
    const artistName = gig.artist_name || 'Artist';

    const draft = `Hi ${promoterName},

Great news! ${artistName} can confirm for your event.

📅 **${date}**
📍 **${venue}**
💰 **£${fee}**

We'll send load-in details shortly. Anything you need from us, just shout.

Cheers,
${artistName} Management`;

    setEmailDraft(draft);
    setSent(false);
    setError(null);
  }, [isOpen, gig]);

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
          setIsOpen(false);
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
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-bold transition-colors"
      >
        <Mail className="w-4 h-4" />
        Send confirmation email
        <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-950 border-2 border-cyan-500/30 rounded-2xl max-w-md w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="bg-cyan-950/30 border-b border-cyan-500/20 px-5 py-4">
                <h3 className="text-white font-black flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Confirm to Promoter
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  Email will be sent to {gig.promoter_email}
                </p>
              </div>

              {/* DRAFT PREVIEW */}
              <div className="px-5 py-4 space-y-3 border-b border-white/5">
                <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">Draft:</p>
                <div className="bg-black/40 border border-white/10 rounded-lg p-3 max-h-48 overflow-y-auto">
                  <p className="text-white text-sm whitespace-pre-wrap font-mono">{emailDraft}</p>
                </div>
              </div>

              {/* ERROR / SUCCESS */}
              {error && (
                <div className="px-5 pt-3 flex items-start gap-2 text-red-400 text-xs bg-red-950/20 p-3 m-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {sent && (
                <div className="px-5 pt-3 flex items-start gap-2 text-green-400 text-xs bg-green-950/20 p-3 m-3 rounded-lg">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Email sent! Closing…</span>
                </div>
              )}

              {/* ACTIONS */}
              <div className="px-5 py-4 bg-black/40 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isSending}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-sm rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={isSending || sent}
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}