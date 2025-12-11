import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Brain, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 FOR MUSIC MANAGERS
 * Focused on contracts, publishing, tour planning, money stuff
 */

export default function ScottAI51() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    // Welcome message
    useEffect(() => {
        setMessages([{
            role: 'assistant',
            content: "What's up mate 👊\n\nI'm here to help with:\n\n💰 **Money & Deals**\nFair rates, contracts, negotiations\n\n⚖️ **Legal Stuff**\nPublishing splits, rights, sample clearance\n\n🗓️ **Tour Planning**\nVisa timelines, budgets, logistics\n\n🎵 **Music Biz**\nLabel deals, distribution, marketing\n\nWhat do you need?",
            timestamp: new Date()
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const ai51Mutation = useMutation({
        mutationFn: async (userMessage) => {
            const prompt = `You are AI51, a loyal AI assistant helping Scott, a music manager in Glasgow, Scotland.

CONTEXT:
Scott manages artists, tours, publishing deals, visas, contracts, and day-to-day music business operations.

YOUR PERSONALITY:
- Scottish mate / bro vibe (not overly Scottish, just natural)
- Zero corporate BS
- Straight-talking, loyal, helpful
- Like a trusted business partner who's got your back

USER'S QUESTION:
${userMessage}

TASK: Give Scott practical, actionable advice. If it's about:
- Contracts: Give real legal insights
- Money: Be specific about fair rates and deal structures
- Publishing: Explain splits, rights, and clearances clearly
- Touring: Practical logistics, visa timelines, budgets
- General music biz: Industry-standard practices

Keep it concise but thorough. Use bullet points when helpful.`;

            const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: false
            });

            return response;
        },
        onSuccess: (data) => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data,
                timestamp: new Date()
            }]);
        },
        onError: (error) => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry mate, something went wrong. Try again?",
                timestamp: new Date()
            }]);
        }
    });

    const handleSend = () => {
        if (!input.trim() || ai51Mutation.isPending) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, {
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        }]);
        setInput('');
        ai51Mutation.mutate(userMessage);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b-2 border-amber-500/30">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>
                
                <div className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-amber-400" />
                    <h1 className="text-xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>AI51</h1>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 pb-32">
                <div className="max-w-2xl mx-auto space-y-4">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${msg.role === 'user' ? 'ml-8' : 'mr-8'}`}
                        >
                            <div className={`p-4 rounded-lg ${
                                msg.role === 'user' 
                                    ? 'bg-amber-500/20 border-2 border-amber-500/50' 
                                    : 'bg-black border-2 border-gray-800'
                            }`}>
                                <p className="text-white text-sm whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
                                    {msg.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {ai51Mutation.isPending && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mr-8"
                        >
                            <div className="bg-black border-2 border-gray-800 p-4 rounded-lg flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                                <span className="text-gray-500 text-sm" style={{ fontFamily: 'monospace' }}>Thinking...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* INPUT */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t-2 border-amber-500/30">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-2">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Ask about contracts, deals, tours, publishing..."
                            className="bg-black border-2 border-gray-800 text-white resize-none focus:border-amber-500"
                            style={{ fontFamily: 'monospace' }}
                            rows={2}
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || ai51Mutation.isPending}
                            className="bg-amber-500 hover:bg-amber-400 text-black px-6"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                    <p className="text-gray-700 text-xs mt-2 text-center" style={{ fontFamily: 'monospace' }}>
                        AI51 gives advice, not legal guarantees - always verify important stuff
                    </p>
                </div>
            </div>
        </div>
    );
}