import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51EmailSettings() {
    const [copied, setCopied] = useState(false);
    const webhookAddress = 'ai51@cb51.io';

    const handleCopy = () => {
        navigator.clipboard.writeText(webhookAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-3 pt-2"
        >
            <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                <p className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-wide">📧 Webhook Address</p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/60 border border-cyan-500/10 rounded px-2.5 py-2 text-cyan-300 font-mono text-xs break-all">
                        {webhookAddress}
                    </code>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="flex-shrink-0 bg-cyan-600/50 hover:bg-cyan-600 text-black font-bold px-2.5 py-2 rounded transition-all flex items-center gap-1"
                    >
                        {copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </motion.button>
                </div>
            </div>

            <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                <p className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-wide">How it works:</p>
                <ul className="text-gray-300 text-xs space-y-1 ml-1">
                    <li>✓ Copy address above</li>
                    <li>✓ Forward gig emails to it</li>
                    <li>✓ AI51 parses + creates offer</li>
                    <li>✓ Shows in PENDING APPROVALS</li>
                </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-300 text-xs font-mono">
                    Only manager emails processed. Webhook auto-validates sender.
                </p>
            </div>
        </motion.div>
    );
}