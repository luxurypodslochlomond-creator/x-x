import React, { useState } from 'react';
import { Lightbulb, X, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT FEATURE REQUEST - Quick ideas
 * Voice or type, saves to AI51 backlog
 */

export default function ScottFeatureRequest() {
    const [isOpen, setIsOpen] = useState(false);
    const [idea, setIdea] = useState('');
    const [isSending, setIsSending] = useState(false);

    const sendIdea = async () => {
        if (!idea.trim()) return;

        setIsSending(true);
        try {
            await base44.entities.ScottFeatureRequest.create({
                requested_by: 'Scott',
                title: idea.substring(0, 100),
                description: idea,
                priority: 'nice_to_have',
                status: 'idea'
            });

            setIdea('');
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 left-4 z-30 w-12 h-12 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center border-2 border-amber-400"
                style={{ boxShadow: '0 4px 20px rgba(217, 119, 6, 0.6)' }}
            >
                <Lightbulb className="w-6 h-6 text-white" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-4 left-4 right-4 z-40 bg-black border-2 border-amber-500 rounded-xl p-4"
                        style={{ boxShadow: '0 8px 40px rgba(217, 119, 6, 0.6)' }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-400" />
                                <h3 className="text-sm font-black text-white font-mono">FEATURE IDEA</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-600 font-mono mb-3">What should we add?</p>

                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="Your idea..."
                            className="w-full bg-black border border-amber-500/30 rounded p-2 text-white text-sm font-mono h-20 resize-none focus:border-amber-500 focus:outline-none mb-3"
                        />

                        <button
                            onClick={sendIdea}
                            disabled={!idea.trim() || isSending}
                            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-600 text-black py-2 rounded font-mono text-sm font-bold"
                        >
                            <Send className="w-4 h-4" />
                            {isSending ? 'SENDING' : 'SEND TO AI51'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}