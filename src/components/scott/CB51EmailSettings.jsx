import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

export default function CB51EmailSettings() {
    const [copied, setCopied] = useState(false);
    const webhookAddress = 'ai51@cb51.io';

    const handleCopy = () => {
        navigator.clipboard.writeText(webhookAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-2">
            <div>
                <p className="text-gray-400 text-[9px] font-mono mb-2 uppercase tracking-wide">📧 Webhook Address</p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/40 border border-cyan-500/20 rounded px-2 py-1.5 text-white font-mono text-[10px] break-all">
                        {webhookAddress}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 bg-cyan-600/40 hover:bg-cyan-600 text-white font-bold px-2 py-1.5 rounded transition-all flex items-center gap-1 text-[10px]"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3" />
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="border-t border-cyan-500/20 pt-2">
                <p className="text-gray-500 text-[9px] font-mono mb-1.5 uppercase tracking-wide">How it works:</p>
                <ul className="text-gray-400 text-[9px] space-y-0.5 ml-2">
                    <li>✓ Copy address</li>
                    <li>✓ Forward gig emails to this address</li>
                    <li>✓ AI51 parses + creates offer automatically</li>
                    <li>✓ Shows in PENDING APPROVALS</li>
                </ul>
            </div>

            <div className="border-t border-cyan-500/20 pt-2 flex items-start gap-2">
                <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-300 text-[9px] font-mono">
                    Only manager emails processed. Auto-validated.
                </p>
            </div>
        </div>
    );
}