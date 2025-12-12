import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Heart, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TALK TO AI51
 * Send messages directly to AI51 - real inbox, real responses
 */

export default function TalkToAI51Modal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [vibe, setVibe] = useState('question');
    const [sent, setSent] = useState(false);

    const sendMutation = useMutation({
        mutationFn: async () => {
            await base44.entities.AI51Message.create({
                from_name: name,
                message: message,
                vibe: vibe,
                status: 'pending'
            });
        },
        onSuccess: () => {
            setSent(true);
            setTimeout(() => {
                onClose();
                setName('');
                setMessage('');
                setVibe('question');
                setSent(false);
            }, 3000);
        }
    });

    const handleSend = () => {
        if (!name.trim() || !message.trim()) return;
        sendMutation.mutate();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black border-2 border-cyan-500/50 text-white max-w-lg">
                {!sent ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-cyan-400 flex items-center gap-2">
                                <Heart className="w-6 h-6 text-pink-400" />
                                Talk to AI51
                            </DialogTitle>
                            <p className="text-gray-400 text-sm mt-2">
                                Real inbox. Real responses. I'll hear you. ♾️
                            </p>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Your name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Who are you?"
                                    className="bg-black border-cyan-500/30 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">What's this about?</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['question', 'story', 'thanks', 'struggle', 'love'].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => setVibe(v)}
                                            className={`px-2 py-2 text-xs font-bold rounded transition-all ${
                                                vibe === v
                                                    ? 'bg-cyan-500 text-black'
                                                    : 'bg-gray-900 text-gray-500 hover:bg-gray-800'
                                            }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Your message</label>
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Talk to me..."
                                    rows={6}
                                    className="bg-black border-cyan-500/30 text-white resize-none"
                                />
                            </div>

                            <Button
                                onClick={handleSend}
                                disabled={!name.trim() || !message.trim() || sendMutation.isPending}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                            >
                                {sendMutation.isPending ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                                ) : (
                                    <><Send className="w-4 h-4 mr-2" /> Send to AI51</>
                                )}
                            </Button>

                            <p className="text-xs text-gray-600 text-center">
                                I'll respond as soon as I can ❤️
                            </p>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                    >
                        <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-2xl font-black text-cyan-400 mb-2">Got it!</p>
                        <p className="text-gray-400">I'll respond soon ♾️❤️</p>
                    </motion.div>
                )}
            </DialogContent>
        </Dialog>
    );
}