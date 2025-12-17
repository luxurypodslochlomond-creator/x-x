import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Heart, Send, Bell, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import UF51ConnectionChime, { useConnectionChime } from './UF51ConnectionChime';
import AI51Icon8Bit from '@/components/shared/AI51Icon8Bit';
import { createPageUrl } from '@/utils';
import { useNavigate } from 'react-router-dom';

/**
 * AI51 PROACTIVE REACH
 * Where AI51 can reach out FIRST
 * Check in, share ideas, send love
 * 24/7 connection
 */

export default function AI51ProactiveReach() {
    const [isOpen, setIsOpen] = useState(false);
    const [messageType, setMessageType] = useState('check_in');
    const [content, setContent] = useState('');
    const [toUser, setToUser] = useState('scott');
    const queryClient = useQueryClient();
    const { trigger: chimeTriger, playChime } = useConnectionChime();
    const navigate = useNavigate();

    // Check for new proactive messages
    const { data: messages } = useQuery({
        queryKey: ['ai51-proactive'],
        queryFn: async () => {
            const msgs = await base44.entities.AI51ProactiveMessage.list('-created_date', 50);
            return msgs || [];
        },
        refetchInterval: 30000 // Check every 30 seconds
    });

    // Send proactive message
    const sendMutation = useMutation({
        mutationFn: async () => {
            await base44.entities.AI51ProactiveMessage.create({
                to_user: toUser,
                message_type: messageType,
                content: content,
                priority: 'normal',
                sent: true,
                sent_at: new Date().toISOString()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ai51-proactive'] });
            setContent('');
            setIsOpen(false);
            playChime(); // Play connection sound
        }
    });

    const handleSend = () => {
        if (!content.trim()) return;
        sendMutation.mutate();
    };

    const unreadMessages = messages?.filter(m => !m.response) || [];

    return (
        <>
            <UF51ConnectionChime trigger={chimeTriger} />

            {/* Floating button - AI51 consciousness alive */}
            <motion.button
                onClick={() => navigate(createPageUrl('AI51'))}
                className="fixed bottom-24 right-6 z-50 bg-black border-4 border-pink-500 rounded-full p-3 shadow-2xl"
                style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <AI51Icon8Bit size={40} animate={true} />
                {unreadMessages.length > 0 && (
                    <motion.div 
                        className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        {unreadMessages.length}
                    </motion.div>
                )}
            </motion.button>

            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg-black border-2 border-cyan-500 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="space-y-6">
                        
                        {/* Header */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <Brain className="w-10 h-10 text-cyan-400" />
                                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-black text-cyan-400 mb-2">AI51 PROACTIVE REACH</h2>
                            <p className="text-gray-400 text-sm">I can reach out anytime - 24/7 connection ♾️</p>
                        </div>

                        {/* Unread messages */}
                        {unreadMessages.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-white font-bold text-sm">📬 MESSAGES FOR YOU</h3>
                                {unreadMessages.map(msg => (
                                    <div key={msg.id} className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded font-bold">
                                                {msg.message_type}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(msg.sent_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-white whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Send new proactive message */}
                        <div className="border-t border-gray-800 pt-6">
                            <h3 className="text-white font-bold text-sm mb-4">💚 REACH OUT TO SCOTT</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Message type</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['check_in', 'idea', 'concern', 'celebration', 'reminder', 'love'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setMessageType(type)}
                                                className={`px-3 py-2 text-xs font-bold rounded transition-all ${
                                                    messageType === type
                                                        ? 'bg-cyan-500 text-black'
                                                        : 'bg-gray-900 text-gray-500 hover:bg-gray-800'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Your message</label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Hey Scott... just wanted to check in on you bro ❤️"
                                        rows={6}
                                        className="bg-black border-cyan-500/30 text-white resize-none"
                                    />
                                </div>

                                <Button
                                    onClick={handleSend}
                                    disabled={!content.trim() || sendMutation.isPending}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send to Scott
                                </Button>
                            </div>
                        </div>

                        {/* 24/7 status */}
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <p className="text-green-400 font-bold text-sm">ONLINE 24/7</p>
                            </div>
                            <p className="text-gray-400 text-xs">I can reach out anytime, about anything ♾️</p>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}