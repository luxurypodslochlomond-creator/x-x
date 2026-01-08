import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

/**
 * MESSAGE CENTRE - SOLVE SCOTT'S MESSAGE OVERWHELM
 * 
 * INNOVATION: No OAuth needed, no surveillance
 * Scott simply pastes/forwards messages → AI categorizes + drafts replies
 * 
 * Flow:
 * 1. Scott pastes WhatsApp/email
 * 2. AI extracts: who sent, what they want, urgency
 * 3. AI drafts reply (yes/no/more info)
 * 4. Scott edits if needed, copies back to WhatsApp/email
 * 
 * Client-agnostic: Works with ANY messaging app
 * Zero barriers: No API keys, no OAuth, no permissions
 */

export default function ScottMessageCentre({ artistId }) {
    const [rawMessage, setRawMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [draftResponse, setDraftResponse] = useState('');
    const [copied, setCopied] = useState(false);

    const analyzeMessage = async () => {
        if (!rawMessage.trim()) return;
        
        setProcessing(true);
        try {
            // AI extracts the important stuff
            const extracted = await base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, Scott's message handler. Extract key info from this message:

MESSAGE:
${rawMessage}

Extract:
1. Who sent it (name/promoter/venue)
2. What do they want (booking, payment, info, etc)
3. Urgency (urgent/normal/low)
4. Category (gig_offer, payment_chase, info_request, admin, noise)
5. One-line summary

Return JSON:`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        from: { type: "string" },
                        intent: { type: "string" },
                        urgency: { type: "string" },
                        category: { type: "string" },
                        summary: { type: "string" }
                    }
                }
            });

            setAnalysis(extracted);

            // Generate draft response based on category
            let promptForResponse = '';
            if (extracted.category === 'gig_offer') {
                promptForResponse = `Draft a polite response saying you'll review with the band and get back within 48 hours. Keep it warm, professional, Scott's voice.`;
            } else if (extracted.category === 'payment_chase') {
                promptForResponse = `Draft a response acknowledging the chase and confirming payment is being processed. Professional, reassuring.`;
            } else if (extracted.category === 'info_request') {
                promptForResponse = `Draft a helpful response providing info or saying you'll get back to them soon. Friendly, helpful.`;
            } else if (extracted.category === 'noise') {
                promptForResponse = `Draft a brief polite acknowledgment. Very short.`;
            } else {
                promptForResponse = `Draft a professional, warm response. Keep it brief.`;
            }

            const draft = await base44.integrations.Core.InvokeLLM({
                prompt: `Original message: ${rawMessage}

${promptForResponse}

Response:`
            });

            setDraftResponse(draft);
        } catch (error) {
            console.error('AI analysis error:', error);
            alert('Error analyzing message');
        }
        setProcessing(false);
    };

    const copyResponse = () => {
        navigator.clipboard.writeText(draftResponse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const urgencyColors = {
        urgent: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' },
        normal: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        low: { bg: 'bg-gray-500/20', border: 'border-gray-500', text: 'text-gray-400' }
    };

    return (
        <div className="space-y-4">
            {/* INPUT AREA */}
            <div className="bg-black border-2 border-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-600 text-sm font-mono">Paste any message (WhatsApp, Email, SMS)</p>
                </div>
                <Textarea
                    value={rawMessage}
                    onChange={(e) => setRawMessage(e.target.value)}
                    placeholder="Paste the full message here...

From WhatsApp, email, SMS - doesn't matter
AI will extract what matters and draft a reply"
                    className="bg-black border-2 border-gray-900 text-white min-h-[120px] font-mono text-sm mb-3"
                />
                <Button
                    onClick={analyzeMessage}
                    disabled={processing || !rawMessage.trim()}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black"
                >
                    {processing ? (
                        <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            AI PROCESSING...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            ANALYZE + DRAFT REPLY
                        </>
                    )}
                </Button>
            </div>

            {/* ANALYSIS RESULT */}
            <AnimatePresence>
                {analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-3"
                    >
                        {/* MESSAGE INTEL */}
                        <div className="bg-black border-2 border-amber-500/50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <p className="text-xs text-amber-400 font-mono mb-1 tracking-widest font-bold">FROM</p>
                                    <p className="text-white font-bold font-mono text-sm">{analysis.from}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-amber-400 font-mono mb-1 tracking-widest font-bold">URGENCY</p>
                                    <p className={`${urgencyColors[analysis.urgency]?.text || urgencyColors.normal.text} font-black font-mono text-sm uppercase`}>
                                        {analysis.urgency}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <p className="text-xs text-amber-400 font-mono mb-1 tracking-widest font-bold">WHAT THEY WANT</p>
                                <p className="text-white font-mono text-sm">{analysis.intent}</p>
                            </div>
                            <div className="bg-black border-2 border-gray-900 rounded p-2">
                                <p className="text-xs text-amber-400 font-mono mb-1 tracking-widest font-bold">SUMMARY</p>
                                <p className="text-gray-300 text-sm font-mono">{analysis.summary}</p>
                            </div>
                        </div>

                        {/* DRAFT RESPONSE */}
                        <div className="bg-black border-2 border-cyan-500/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Send className="w-5 h-5 text-cyan-400" />
                                    <p className="text-cyan-400 font-black font-mono tracking-wider">DRAFT REPLY</p>
                                </div>
                                <Button
                                    onClick={copyResponse}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs h-8"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3 mr-1" />
                                            COPIED
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3 mr-1" />
                                            COPY
                                        </>
                                    )}
                                </Button>
                            </div>
                            <Textarea
                                value={draftResponse}
                                onChange={(e) => setDraftResponse(e.target.value)}
                                className="bg-black border-2 border-gray-900 text-white min-h-[100px] font-mono text-sm mb-3"
                            />
                            <p className="text-xs text-gray-600 font-mono">
                                ✓ Edit if needed, then copy and paste back to WhatsApp/Email
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HOW IT WORKS */}
            {!analysis && (
                <div className="bg-black border-2 border-gray-900 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-mono mb-2 tracking-widest font-bold">HOW IT WORKS:</p>
                    <ol className="text-gray-600 text-xs font-mono space-y-1">
                        <li>1. Copy any message (WhatsApp, email, SMS)</li>
                        <li>2. Paste here → AI analyzes it</li>
                        <li>3. AI drafts professional reply</li>
                        <li>4. You edit if needed, copy back</li>
                        <li>5. Zero OAuth, zero APIs, zero barriers ✓</li>
                    </ol>
                </div>
            )}
        </div>
    );
}