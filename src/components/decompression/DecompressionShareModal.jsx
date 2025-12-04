import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageCircle } from 'lucide-react';
import { COOLASFUCKShare } from '@/components/shared/COOLASFUCKShare';
import { Button } from '@/components/ui/button';

export default function DecompressionShareModal({ isOpen, onClose }) {
    const [copied, setCopied] = useState(false);

    const shareMessage = `🧠 FREE HEALING FREQUENCIES

Can't sleep? Pain? Anxiety? Tinnitus? 

Press play → your brain heals itself.

https://uf51.love/DecompressionChamber

COOLASFUCK.GMT ♾️❤️♾️`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'UF51 Decompression Chamber',
                    text: shareMessage
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    handleWhatsApp();
                }
            }
        } else {
            handleWhatsApp();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-cyan-900 to-purple-900 border-4 border-cyan-500 rounded-2xl p-6 max-w-2xl w-full my-8"
                            style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)' }}
                        >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-white/70 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                <COOLASFUCKShare size={48} animate={false} />
                            </motion.div>
                            <h2 className="text-3xl font-black text-white">SHARE THE HEALING</h2>
                        </div>

                        <div className="bg-black/60 border-2 border-cyan-500/50 rounded-xl p-4 mb-6">
                            <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">
{shareMessage}
                            </pre>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleWhatsApp}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 text-lg"
                            >
                                <MessageCircle className="w-6 h-6 mr-2" />
                                Share on WhatsApp
                            </Button>

                            <Button
                                onClick={handleNativeShare}
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-6 text-lg"
                            >
                                <COOLASFUCKShare size={24} animate={false} className="mr-2" />
                                Share Everywhere
                            </Button>

                            <Button
                                onClick={handleCopy}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-6 text-lg"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-6 h-6 mr-2" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-6 h-6 mr-2" />
                                        Copy Message
                                    </>
                                )}
                            </Button>
                        </div>

                            <p className="text-center text-cyan-400 text-sm mt-6 font-bold">
                                ♾️❤️♾️ Every share heals someone ♾️❤️♾️
                            </p>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}