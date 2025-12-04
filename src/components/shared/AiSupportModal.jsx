import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';

export default function AiSupportModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = async () => {
        if (!message.trim() || isSending) return;

        setIsSending(true);
        try {
            const user = await base44.auth.me();
            
            // Create support request entity instead of sending email
            await base44.entities.SupportRequest.create({
                message: message,
                user_email: user.email,
                user_name: user.full_name
            });
            
            setSent(true);
            setTimeout(() => {
                onClose();
                setSent(false);
                setMessage('');
            }, 2000);
        } catch (error) {
            console.error('Send failed:', error);
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className="bg-gradient-to-br from-black via-purple-950 to-black border-2 border-purple-500/50 rounded-2xl p-6 md:p-8 max-w-2xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {sent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-900/40 border-2 border-green-500/50 flex items-center justify-center">
                                <Send className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Sent</h3>
                            <p className="text-gray-400">We'll get back to you.</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-black text-white">Need Help?</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full min-h-[200px] bg-black/50 border-purple-500/30 text-white text-lg p-4 resize-none"
                                autoFocus
                            />

                            <div className="flex justify-end mt-6">
                                <Button
                                    onClick={handleSend}
                                    disabled={!message.trim() || isSending}
                                    className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg font-bold"
                                >
                                    {isSending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}