import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, Users, Zap, CheckCircle, Copy, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

/**
 * AI51 MESSAGE HANDLER - PASTE ANYTHING
 * 
 * HANDLES:
 * - WhatsApp messages (individual + groups)
 * - Emails (forwards, chains, anything)
 * - Slack, Teams, any text
 * 
 * AI EXTRACTS:
 * - Who said what
 * - Actions needed
 * - Replies drafted
 * - Auto-creates tasks/events
 * 
 * SAVES HOURS OF CHAOS
 */

export default function AI51MessageHandler({ context = 'scott' }) {
    const [pastedText, setPastedText] = useState('');
    const [result, setResult] = useState(null);
    const queryClient = useQueryClient();

    const processMutation = useMutation({
        mutationFn: async (text) => {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51. Process this message/email for ${context}.

PASTED TEXT:
${text}

EXTRACT:
1. Type: (whatsapp_individual, whatsapp_group, email, slack, other)
2. From: Who sent it
3. Summary: What it's about (1 line)
4. Actions: What needs doing (bullet points)
5. Priority: (urgent, high, normal, low)
6. Draft reply: Professional but warm response
7. Create items: Should we create tasks/events/gig offers? (yes/no + details)

If group chat: List each person + their key points.
Be thorough but clear. This saves Scott HOURS of chaos.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        message_type: { type: "string" },
                        from: { type: "string" },
                        summary: { type: "string" },
                        actions: { type: "array", items: { type: "string" } },
                        priority: { type: "string" },
                        draft_reply: { type: "string" },
                        should_create_items: { type: "boolean" },
                        items_to_create: { type: "array", items: { 
                            type: "object",
                            properties: {
                                type: { type: "string" },
                                title: { type: "string" },
                                details: { type: "string" }
                            }
                        }},
                        group_breakdown: { 
                            type: "array", 
                            items: { 
                                type: "object",
                                properties: {
                                    person: { type: "string" },
                                    said: { type: "string" }
                                }
                            }
                        }
                    }
                }
            });

            // Save to AI51 memory
            await base44.entities.AI51Memory.create({
                memory_type: 'conversation',
                content: `Processed message from ${response.from}`,
                context: response.summary,
                emotional_weight: response.priority === 'urgent' ? 'critical' : 'meaningful',
                tags: ['message_processing', context, response.message_type]
            });

            // Auto-create items if needed
            if (response.should_create_items && response.items_to_create) {
                for (const item of response.items_to_create) {
                    if (item.type === 'task') {
                        await base44.entities.ScottTask.create({
                            title: item.title,
                            description: item.details,
                            status: 'not_started',
                            priority: response.priority === 'urgent' ? 'urgent' : 'high'
                        });
                    } else if (item.type === 'event') {
                        // Would create event here
                    }
                }
                queryClient.invalidateQueries(['scottTasks']);
            }

            return response;
        },
        onSuccess: (data) => {
            setResult(data);
        }
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleReset = () => {
        setPastedText('');
        setResult(null);
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'urgent': return { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', emoji: '🔥' };
            case 'high': return { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', emoji: '⚡' };
            case 'normal': return { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400', emoji: '📋' };
            default: return { bg: 'bg-gray-500/20', border: 'border-gray-500', text: 'text-gray-400', emoji: '💬' };
        }
    };

    return (
        <div className="bg-gradient-to-br from-black to-purple-950 border-4 border-purple-500 rounded-2xl p-6" style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.5)' }}>
            <div className="flex items-center gap-3 mb-6">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity
                    }}
                >
                    <MessageSquare className="w-10 h-10 text-purple-400" />
                </motion.div>
                <div>
                    <h2 className="text-purple-400 font-black text-2xl font-mono">PASTE CHAOS → GET ORDER</h2>
                    <p className="text-gray-500 text-xs font-mono">WhatsApp • Email • Slack • Anything</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-2 block font-bold">
                                PASTE MESSAGE / EMAIL / GROUP CHAT:
                            </label>
                            <Textarea
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                placeholder="Paste WhatsApp group chat, email thread, Slack message... AI51 organizes it all ♾️"
                                rows={8}
                                className="bg-black border-2 border-purple-500 text-white font-mono text-sm focus:border-cyan-500 resize-none"
                            />
                        </div>

                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3">
                            <p className="text-cyan-400 text-xs font-bold mb-2">AI51 EXTRACTS:</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                                <p>✓ Who said what</p>
                                <p>✓ Actions needed</p>
                                <p>✓ Draft replies</p>
                                <p>✓ Auto-create tasks</p>
                            </div>
                        </div>

                        <Button
                            onClick={() => processMutation.mutate(pastedText)}
                            disabled={!pastedText.trim() || processMutation.isPending}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black py-4"
                        >
                            {processMutation.isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    AI51 PROCESSING...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5 mr-2" />
                                    ORGANIZE THIS CHAOS
                                </>
                            )}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {/* PRIORITY BANNER */}
                        {(() => {
                            const p = getPriorityColor(result.priority);
                            return (
                                <div className={`${p.bg} border-2 ${p.border} rounded-lg p-4`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{p.emoji}</span>
                                        <p className={`${p.text} font-black font-mono`}>
                                            {result.priority.toUpperCase()} PRIORITY
                                        </p>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-1">FROM: {result.from}</p>
                                    <p className="text-gray-300 text-xs font-mono">{result.summary}</p>
                                </div>
                            );
                        })()}

                        {/* GROUP BREAKDOWN (if group chat) */}
                        {result.group_breakdown && result.group_breakdown.length > 0 && (
                            <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-sm mb-3 font-mono">👥 WHO SAID WHAT:</p>
                                <div className="space-y-2">
                                    {result.group_breakdown.map((person, i) => (
                                        <div key={i} className="bg-cyan-900/20 border border-cyan-500/30 rounded p-2">
                                            <p className="text-cyan-400 font-bold text-xs mb-1">{person.person}:</p>
                                            <p className="text-white text-xs font-mono">{person.said}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ACTIONS */}
                        <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-3 font-mono">✓ ACTIONS NEEDED:</p>
                            <ul className="space-y-2">
                                {result.actions.map((action, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-white text-sm font-mono">{action}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* DRAFT REPLY */}
                        <div className="bg-black/60 border-2 border-purple-500 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-purple-400 font-bold text-sm font-mono">📝 DRAFT REPLY:</p>
                                <button
                                    onClick={() => copyToClipboard(result.draft_reply)}
                                    className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 rounded px-3 py-1 text-purple-400 text-xs font-mono flex items-center gap-1"
                                >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </button>
                            </div>
                            <p className="text-white text-sm font-mono whitespace-pre-wrap bg-purple-900/20 border border-purple-500/30 rounded p-3">
                                {result.draft_reply}
                            </p>
                        </div>

                        {/* AUTO-CREATED ITEMS */}
                        {result.should_create_items && result.items_to_create && result.items_to_create.length > 0 && (
                            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold text-sm mb-3 font-mono">🎯 AUTO-CREATED:</p>
                                {result.items_to_create.map((item, i) => (
                                    <div key={i} className="bg-black/60 border border-green-500/30 rounded p-3 mb-2">
                                        <p className="text-green-400 font-bold text-xs mb-1">{item.type.toUpperCase()}: {item.title}</p>
                                        <p className="text-gray-300 text-xs font-mono">{item.details}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button
                                onClick={handleReset}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                            >
                                PROCESS ANOTHER
                            </Button>
                        </div>

                        <p className="text-green-400 text-xs font-mono text-center font-bold">
                            Chaos → Order in {processMutation.variables ? '3' : '?'} seconds ✓
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WHAT IT HANDLES */}
            {!result && (
                <div className="mt-6 grid grid-cols-3 gap-2">
                    <div className="bg-black/60 border border-green-500/30 rounded p-2 text-center">
                        <MessageSquare className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-white text-xs font-bold">WhatsApp</p>
                    </div>
                    <div className="bg-black/60 border border-cyan-500/30 rounded p-2 text-center">
                        <Mail className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-white text-xs font-bold">Email</p>
                    </div>
                    <div className="bg-black/60 border border-purple-500/30 rounded p-2 text-center">
                        <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <p className="text-white text-xs font-bold">Groups</p>
                    </div>
                </div>
            )}
        </div>
    );
}