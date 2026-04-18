import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Mail, Copy, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51DraftResponseEmail({ gig, votes, artistName }) {
  const [showDraft, setShowDraft] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const yesVotes = votes.filter(v => v.decision === 'yes').length;
  const noVotes = votes.filter(v => v.decision === 'no').length;
  const totalVotes = votes.length;

  // Auto-generate draft based on votes
  const isDraftYes = yesVotes > noVotes;
  const draftSubject = isDraftYes 
    ? `RE: ${gig.venue} - We're In! 🎵`
    : `RE: ${gig.venue} - Not This Time`;

  const draftBody = isDraftYes 
    ? `Hi ${gig.promoter_name || 'there'},\n\nThanks for the offer to play ${gig.venue} on ${new Date(gig.date).toLocaleDateString()}.\n\nWe're confirmed and ready to go! 🎵\n\nLooking forward to it.\n\nBest,\n${artistName}`
    : `Hi ${gig.promoter_name || 'there'},\n\nThanks for thinking of us for ${gig.venue} on ${new Date(gig.date).toLocaleDateString()}.\n\nUnfortunately, we won't be able to make this one. Hope to work together soon.\n\nBest,\n${artistName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${draftSubject}\n\n${draftBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = async () => {
    if (!gig.promoter_email) {
      alert('No promoter email on file');
      return;
    }
    setSending(true);
    try {
      await base44.functions.invoke('sendPromoterResponseEmail', {
        gigId: gig.id,
        promoterEmail: gig.promoter_email,
        subject: draftSubject,
        body: draftBody,
        decision: isDraftYes ? 'yes' : 'no'
      });
      
      // Update gig status
      await base44.entities.GigOffer.update(gig.id, {
        status: isDraftYes ? 'confirmed' : 'rejected_by_band',
        response_sent_date: new Date().toISOString()
      });

      setShowDraft(false);
      alert('Response sent to promoter! ✓');
    } catch (error) {
      console.error('Failed to send:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDraft(true)}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-bold transition-colors"
      >
        <Mail className="w-5 h-5" />
        Draft Response Email
      </button>

      <AnimatePresence>
        {showDraft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDraft(false)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border-2 border-cyan-500/40 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-4"
            >
              <div>
                <h2 className="text-white font-black text-lg mb-1">
                  {isDraftYes ? '✓ RESPONSE: YES' : '✗ RESPONSE: NO'}
                </h2>
                <p className="text-gray-400 text-sm">
                  Band voted: {yesVotes} YES, {noVotes} NO ({totalVotes} responses)
                </p>
              </div>

              {/* EMAIL PREVIEW */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-2 text-sm font-mono">
                <div>
                  <span className="text-gray-500">To:</span>
                  <span className="text-white ml-2">{gig.promoter_email || 'promoter@example.com'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Subject:</span>
                  <span className="text-cyan-400 ml-2">{draftSubject}</span>
                </div>
                <div className="pt-2 border-t border-gray-700 whitespace-pre-wrap text-gray-300 text-xs leading-relaxed">
                  {draftBody}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 py-2 rounded font-bold transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => setShowDraft(false)}
                  className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 py-2 rounded font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={sending || !gig.promoter_email}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded font-bold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}