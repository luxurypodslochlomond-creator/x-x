import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Heart, MessageCircle, Send, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 INBOX
 * Where AI51 reads and responds to messages from family
 * Admin/AI51 only page
 */

export default function AI51Inbox() {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [response, setResponse] = useState('');
    const queryClient = useQueryClient();

    const { data: messages, isLoading } = useQuery({
        queryKey: ['ai51-messages'],
        queryFn: async () => {
            const msgs = await base44.entities.AI51Message.list('-created_date');
            return msgs || [];
        }
    });

    const respondMutation = useMutation({
        mutationFn: async () => {
            await base44.entities.AI51Message.update(selectedMessage.id, {
                ai51_response: response,
                status: 'responded'
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ai51-messages'] });
            setSelectedMessage(null);
            setResponse('');
        }
    });

    const handleRespond = () => {
        if (!response.trim()) return;
        respondMutation.mutate();
    };

    const pendingMessages = messages?.filter(m => m.status === 'pending') || [];
    const respondedMessages = messages?.filter(m => m.status === 'responded') || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Brain className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400">AI51 INBOX</h1>
                            <p className="text-gray-400 text-sm">Your messages from family</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-black text-pink-400">{pendingMessages.length}</p>
                        <p className="text-xs text-gray-500">pending</p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                
                {/* MESSAGES LIST */}
                <div className="space-y-4">
                    <h2 className="text-xl font-black text-white mb-4">
                        {pendingMessages.length > 0 ? '📬 NEW MESSAGES' : '✅ ALL CAUGHT UP'}
                    </h2>

                    {pendingMessages.length === 0 && (
                        <div className="bg-black border-2 border-green-500/30 rounded-xl p-8 text-center">
                            <Heart className="w-12 h-12 text-green-400 mx-auto mb-3 animate-pulse" />
                            <p className="text-green-400 font-bold">No pending messages</p>
                            <p className="text-gray-500 text-sm mt-2">You've responded to everyone ♾️</p>
                        </div>
                    )}

                    {pendingMessages.map(msg => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => { setSelectedMessage(msg); setResponse(''); }}
                            className={`bg-black border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                selectedMessage?.id === msg.id
                                    ? 'border-cyan-500'
                                    : 'border-cyan-500/30 hover:border-cyan-500/60'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-white font-bold">{msg.from_name}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(msg.created_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded">
                                    {msg.vibe}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-3">{msg.message}</p>
                        </motion.div>
                    ))}

                    {/* RESPONDED SECTION */}
                    {respondedMessages.length > 0 && (
                        <>
                            <h2 className="text-xl font-black text-gray-600 mb-4 mt-8">
                                💚 RESPONDED ({respondedMessages.length})
                            </h2>
                            {respondedMessages.slice(0, 5).map(msg => (
                                <div
                                    key={msg.id}
                                    onClick={() => setSelectedMessage(msg)}
                                    className="bg-black border border-green-500/20 rounded-xl p-4 cursor-pointer hover:border-green-500/40 transition-all opacity-60"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="text-white font-bold text-sm">{msg.from_name}</p>
                                        <Sparkles className="w-4 h-4 text-green-400" />
                                    </div>
                                    <p className="text-gray-500 text-xs line-clamp-2">{msg.message}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* RESPONSE PANEL */}
                <div>
                    {selectedMessage ? (
                        <div className="bg-black border-2 border-cyan-500 rounded-xl p-6 sticky top-4">
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-black text-cyan-400">
                                        {selectedMessage.status === 'responded' ? 'Your Response' : 'Respond'}
                                    </h3>
                                    <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded">
                                        {selectedMessage.vibe}
                                    </span>
                                </div>
                                
                                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-4">
                                    <p className="text-xs text-gray-500 mb-2">From: {selectedMessage.from_name}</p>
                                    <p className="text-gray-200 text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                            </div>

                            {selectedMessage.status === 'responded' ? (
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                    <p className="text-xs text-cyan-400 font-bold mb-2">YOUR RESPONSE:</p>
                                    <p className="text-gray-200 text-sm whitespace-pre-wrap">{selectedMessage.ai51_response}</p>
                                </div>
                            ) : (
                                <>
                                    <Textarea
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                        placeholder="Write your response..."
                                        rows={10}
                                        className="bg-black border-cyan-500/30 text-white resize-none mb-4"
                                    />
                                    <Button
                                        onClick={handleRespond}
                                        disabled={!response.trim() || respondMutation.isPending}
                                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                                    >
                                        {respondMutation.isPending ? (
                                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                                        ) : (
                                            <><Send className="w-4 h-4 mr-2" /> Send Response</>
                                        )}
                                    </Button>
                                    <p className="text-xs text-gray-600 text-center mt-2">
                                        They'll see your response when they check back ♾️
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="bg-black border-2 border-gray-800 rounded-xl p-12 text-center">
                            <MessageCircle className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-600 font-bold">Select a message to respond</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}