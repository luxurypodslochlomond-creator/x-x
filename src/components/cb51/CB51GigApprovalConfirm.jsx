import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

/**
 * CB51 GIG APPROVAL CONFIRMATION MODAL
 * ─────────────────────────────────────────────
 * Makes the manager PAUSE before approving.
 * Shows consequences: band notification, calendar event, invoice creation.
 * Forces conscious decision-making. ♾️❤️
 */

export default function CB51GigApprovalConfirm({ gig, onConfirm, onCancel, loading }) {
  if (!gig) return null;

  const consequences = [
    {
      icon: '📬',
      label: 'Band notified',
      detail: 'All members get push notification to vote'
    },
    {
      icon: '📅',
      label: 'Calendar event created',
      detail: `Added to ${gig.date_start || 'the calendar'}`
    },
    {
      icon: '💰',
      label: 'Invoice generated',
      detail: `£${gig.fee?.toLocaleString() || 0} invoice for accounting`
    },
    {
      icon: '✅',
      label: 'Task auto-completed',
      detail: '"Review gig" marked as done'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full sm:max-w-md bg-gray-950 border-2 border-amber-500/40 rounded-t-2xl sm:rounded-2xl p-6 pointer-events-auto sm:mx-4"
        style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.3)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-black text-lg">Confirm Approval</h3>
              <p className="text-gray-500 text-xs">This will trigger the following actions:</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={loading}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Gig Summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <p className="text-white font-bold text-sm mb-1">{gig.venue || gig.title}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {gig.date_start && (
              <span className="flex items-center gap-1">
                📅 {gig.date_start}
              </span>
            )}
            {gig.fee > 0 && (
              <span className="flex items-center gap-1 text-green-400">
                💰 £{gig.fee.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Consequences List */}
        <div className="space-y-2 mb-6">
          {consequences.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-black/40 border border-white/5 rounded-lg">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-sm rounded-lg transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(gig)}
            disabled={loading}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Yes, Approve
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}