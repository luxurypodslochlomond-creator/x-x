import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Send, CheckCircle, Loader2, Mail } from 'lucide-react';

/**
 * CB51 SESSION WORKFLOW - Scott's second main use case
 * 1. Artist wants to work with producer
 * 2. AI drafts email to producer
 * 3. YES/NO from team
 * 4. AI arranges details if YES
 */

export default function ScottSessionWorkflow() {
    const [artistName, setArtistName] = useState('');
    const [producerName, setProducerName] = useState('');
    const [notes, setNotes] = useState('');
    const [draftEmail, setDraftEmail] = useState(null);
    const [sent, setSent] = useState(false);

    // Get producers from database
    const { data: producers = [] } = useQuery({
        queryKey: ['scottProducers'],
        queryFn: () => base44.entities.ScottProducer.list('-created_date', 50)
    });

    // Draft email with AI
    const draftMutation = useMutation({
        mutationFn: async ({ artist, producer, context }) => {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Draft a professional but friendly email to music producer ${producer} from artist ${artist}.

Context: ${context}

Make it:
- Short and respectful
- Mention availability for session work
- Ask about rates and availability
- Professional but not corporate

Return subject and body.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        subject: { type: "string" },
                        body: { type: "string" }
                    }
                }
            });
            return result;
        },
        onSuccess: (data) => {
            setDraftEmail(data);
        }
    });

    // Send email
    const sendMutation = useMutation({
        mutationFn: async () => {
            // Find producer email
            const producer = producers.find(p => p.name.toLowerCase().includes(producerName.toLowerCase()));
            if (producer?.contact_email) {
                await base44.integrations.Core.SendEmail({
                    to: producer.contact_email,
                    subject: draftEmail.subject,
                    body: draftEmail.body
                });
            }
        },
        onSuccess: () => {
            setSent(true);
        }
    });

    const handleReset = () => {
        setArtistName('');
        setProducerName('');
        setNotes('');
        setDraftEmail(null);
        setSent(false);
    };

    return (
        <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Music className="w-8 h-8 text-cyan-400" />
                <div>
                    <h2 className="text-cyan-400 font-black text-xl font-mono">SESSION WORKFLOW</h2>
                    <p className="text-gray-500 text-xs font-mono">Artist → Producer → AI drafts email</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!draftEmail ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-1 block">ARTIST NAME:</label>
                            <Input
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                placeholder="e.g., Rory"
                                className="bg-black/60 border-2 border-gray-700 text-white font-mono focus:border-cyan-500"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-1 block">PRODUCER NAME:</label>
                            <Input
                                value={producerName}
                                onChange={(e) => setProducerName(e.target.value)}
                                placeholder="e.g., John Smith"
                                className="bg-black/60 border-2 border-gray-700 text-white font-mono focus:border-cyan-500"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-1 block">CONTEXT (optional):</label>
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="e.g., Looking for trap beats, budget £500"
                                rows={3}
                                className="bg-black/60 border-2 border-gray-700 text-white font-mono text-sm focus:border-cyan-500"
                            />
                        </div>

                        <Button
                            onClick={() => draftMutation.mutate({ artist: artistName, producer: producerName, context: notes })}
                            disabled={!artistName.trim() || !producerName.trim() || draftMutation.isPending}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                        >
                            {draftMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    AI DRAFTING...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    DRAFT EMAIL
                                </>
                            )}
                        </Button>
                    </motion.div>
                ) : !sent ? (
                    <motion.div
                        key="review"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2 text-sm">SUBJECT:</p>
                            <p className="text-white text-sm font-mono mb-4">{draftEmail.subject}</p>
                            <p className="text-cyan-400 font-bold mb-2 text-sm">BODY:</p>
                            <p className="text-white text-sm font-mono whitespace-pre-wrap">{draftEmail.body}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={handleReset}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 font-bold"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={() => sendMutation.mutate()}
                                disabled={sendMutation.isPending}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-black"
                            >
                                {sendMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        SENDING...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-4 h-4 mr-2" />
                                        SEND IT
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-green-900/40 border-4 border-green-500 rounded-lg p-6 text-center">
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                            <p className="text-green-400 font-black text-xl font-mono">SENT ✓</p>
                            <p className="text-gray-400 text-xs font-mono mt-2">
                                Email sent to {producerName}
                            </p>
                        </div>

                        <Button
                            onClick={handleReset}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                        >
                            NEW SESSION
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}