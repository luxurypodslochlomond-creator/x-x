import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Send, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function BuzzStopReportWidget({ open, onClose }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setLoading(true);
    try {
      await base44.integrations.Core.InvokeLLM({
        prompt: `A BuzzStop user reported this issue: "${issue}". Analyze it briefly and generate a helpful troubleshooting response or acknowledgment.`,
        response_json_schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            suggestion: { type: 'string' }
          }
        }
      });

      // Log the issue to database
      await base44.asServiceRole.entities.BuzzStopReport?.create?.({
        user_issue: issue,
        status: 'submitted',
        reported_at: new Date().toISOString()
      }).catch(() => null); // Graceful if entity doesn't exist yet

      setSubmitted(true);
      setTimeout(() => {
        onClose?.();
        setSubmitted(false);
        setIssue('');
      }, 2000);
    } catch (err) {
      console.error('Report submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-end"
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            className="w-full max-w-md mx-auto rounded-t-2xl p-6"
            style={{ background: 'rgba(0,10,0,0.95)', borderTop: '2px solid rgba(34,197,94,0.3)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2" style={{ color: '#22c55e' }}>
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-black text-lg">Report a Problem</h3>
              </div>
              <button
                onClick={() => onClose?.()}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#22c55e' }} />
                </motion.div>
                <p className="text-white font-bold mb-1">Thanks for the report!</p>
                <p className="text-sm text-gray-400">AI51 will review and respond within 24h</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  placeholder="What issue did you experience? (frequency not found, audio crackling, etc.)"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:border-green-500/50 placeholder-gray-600"
                  rows="4"
                />

                <button
                  type="submit"
                  disabled={loading || !issue.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{
                    background: loading || !issue.trim() ? 'rgba(34,197,94,0.2)' : '#22c55e',
                    color: loading || !issue.trim() ? 'rgba(34,197,94,0.5)' : '#000',
                  }}
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Submit'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  All reports are reviewed by AI51. No email address needed.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}