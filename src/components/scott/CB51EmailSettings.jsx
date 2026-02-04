import React, { useState } from 'react';
import { Mail, Copy, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51EmailSettings({ onClose }) {
    const [copied, setCopied] = useState(false);
    const webhookAddress = 'ai51@cb51.io';

    const handleCopy = () => {
        navigator.clipboard.writeText(webhookAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 mb-4"
        >
            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className="text-cyan-400 font-black font-mono text-sm">EMAIL INTEGRATION</h3>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4 mb-4 space-y-3">
                <div>
                    <p className="text-gray-400 text-xs font-mono mb-2">📧 WEBHOOK ADDRESS</p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black/40 border border-cyan-500/20 rounded px-3 py-2 text-white font-mono text-sm break-all">
                            {webhookAddress}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-black font-bold px-3 py-2 rounded transition-all flex items-center gap-1"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span className="text-xs">COPIED</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span className="text-xs">COPY</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="border-t border-cyan-500/20 pt-3">
                    <p className="text-gray-400 text-xs font-mono mb-2">HOW IT WORKS:</p>
                    <ol className="text-gray-300 text-xs space-y-1 ml-3">
                        <li>✓ Copy address above</li>
                        <li>✓ Forward gig emails to this address</li>
                        <li>✓ AI51 automatically parses + creates offer</li>
                        <li>✓ Shows in PENDING APPROVALS</li>
                        <li>✓ Or use manual PASTE above for PDFs</li>
                    </ol>
                </div>

                <div className="border-t border-cyan-500/20 pt-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-300 text-xs font-mono">
                        Only manager emails are processed. Webhook validates sender automatically.
                    </p>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded text-xs font-mono transition-all"
            >
                CLOSE
            </button>
        </motion.div>
    );
}