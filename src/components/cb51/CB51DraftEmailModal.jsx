import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Copy, CheckCircle } from 'lucide-react';

export default function CB51DraftEmailModal({ draft, onClose, onSend }) {
  const [editing, setEditing] = useState(draft?.body || '');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(editing);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    setSending(true);
    await onSend?.(editing);
    setSending(false);
  };

  if (!draft) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black lg:bg-black/80 flex items-end lg:items-center justify-center"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-black border-t-2 border-cyan-500/40 lg:border-2 lg:rounded-lg w-full lg:max-w-2xl h-[92vh] lg:h-auto lg:max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="bg-cyan-900/20 border-b border-cyan-500/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-400 font-mono font-bold text-sm">DRAFT EMAIL</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMAIL DETAILS */}
        <div className="bg-black/60 border-b border-cyan-500/10 px-4 py-3 space-y-2">
          <div className="flex gap-2 text-xs">
            <span className="text-gray-500 font-mono">To:</span>
            <span className="text-white font-mono">{draft.to || 'Promoter email'}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-gray-500 font-mono">Subject:</span>
            <span className="text-white font-mono">{draft.subject}</span>
          </div>
        </div>

        {/* BODY - EDITABLE */}
        <div className="flex-1 overflow-y-auto p-4">
          <textarea
            value={editing}
            onChange={(e) => setEditing(e.target.value)}
            className="w-full h-full bg-black border border-cyan-500/30 rounded-lg px-3 py-3 text-white text-sm font-mono resize-none focus:outline-none focus:border-cyan-400"
            placeholder="Email body..."
          />
        </div>

        {/* ACTIONS */}
        <div className="bg-black/60 border-t border-cyan-500/30 px-4 py-3 flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 px-3 py-2 rounded font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-2 rounded font-mono text-xs font-bold transition-colors"
          >
            {sending ? 'SENDING...' : 'SEND EMAIL'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}