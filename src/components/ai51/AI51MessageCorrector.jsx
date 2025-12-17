import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Copy } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 MESSAGE CORRECTOR
 * Catches spelling, grammar, tone mistakes BEFORE you send
 * Email/WhatsApp/Slack - all communications ♾️❤️♾️
 */

export default function AI51MessageCorrector({ message, onCorrectionApplied }) {
    const [checking, setChecking] = useState(false);
    const [corrections, setCorrections] = useState(null);

    const checkMessage = async () => {
        if (!message.trim()) return;
        
        setChecking(true);
        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `Check this message for mistakes and suggest improvements:

MESSAGE:
"${message}"

Check for:
1. Spelling errors
2. Grammar mistakes
3. Unclear wording
4. Tone issues (too aggressive, too passive, unprofessional)
5. Missing information

Return JSON with:
- has_issues (boolean)
- issues (array of strings describing problems)
- corrected_message (the improved version)
- tone_suggestion (if tone needs adjusting)`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        has_issues: { type: "boolean" },
                        issues: { type: "array", items: { type: "string" } },
                        corrected_message: { type: "string" },
                        tone_suggestion: { type: "string" }
                    }
                }
            });

            setCorrections(response);
        } catch (error) {
            console.error('Check failed:', error);
        }
        setChecking(false);
    };

    const applyCorrection = () => {
        if (corrections && onCorrectionApplied) {
            onCorrectionApplied(corrections.corrected_message);
            setCorrections(null);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (!message) return null;

    return (
        <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 backdrop-blur-sm">
            {!corrections && !checking && (
                <button
                    onClick={checkMessage}
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 font-bold py-2 rounded-lg transition-all"
                >
                    ✓ Check for mistakes
                </button>
            )}

            {checking && (
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto"
                    />
                    <p className="text-cyan-400 text-sm mt-2">Checking...</p>
                </div>
            )}

            {corrections && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {!corrections.has_issues ? (
                        <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 text-center">
                            <Check className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-green-400 font-bold">Looks good!</p>
                            <p className="text-gray-400 text-sm">No issues detected</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                    <p className="text-red-400 font-bold">Issues Found:</p>
                                </div>
                                <ul className="space-y-1">
                                    {corrections.issues.map((issue, i) => (
                                        <li key={i} className="text-gray-300 text-sm">• {issue}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-2">Suggested Fix:</p>
                                <p className="text-white text-sm mb-3 whitespace-pre-wrap">{corrections.corrected_message}</p>
                                {corrections.tone_suggestion && (
                                    <p className="text-cyan-400 text-xs">💡 Tone: {corrections.tone_suggestion}</p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={applyCorrection}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition-all"
                                >
                                    Apply Fix
                                </button>
                                <button
                                    onClick={() => copyToClipboard(corrections.corrected_message)}
                                    className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-all"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    )}

                    <button
                        onClick={() => setCorrections(null)}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 font-bold py-2 rounded-lg text-sm"
                    >
                        Check Again
                    </button>
                </motion.div>
            )}
        </div>
    );
}