import React from 'react';
import { X, Shield, Camera, MapPin, Brain, Zap, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function TechExplainerModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-2xl w-full bg-black rounded-xl border-4 border-cyan-500 p-8 space-y-6 relative shadow-2xl"
                    style={{
                        boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)'
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Zap className="w-8 h-8 text-cyan-400" />
                            <h2 className="text-4xl font-black text-white">HOW IT WORKS</h2>
                            <Zap className="w-8 h-8 text-cyan-400" />
                        </div>
                        <p className="text-gray-300 text-sm font-mono">Zero bullshit tech explanation</p>
                    </div>

                    {/* The Tech */}
                    <div className="space-y-4">
                        
                        {/* Photo Hash */}
                        <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Camera className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Photo Fingerprint</h3>
                                    <p className="text-gray-300 text-sm">
                                        Every photo gets a unique fingerprint (SHA-256 hash). Same photo twice = detected instantly. No reusing photos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* GPS Lock */}
                        <div className="bg-black/60 border-2 border-green-500/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">GPS Lock</h3>
                                    <p className="text-gray-300 text-sm">
                                        We check: photo location = your actual location. Can't upload cleanup from your couch. Real world = real proof.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Verification */}
                        <div className="bg-black/60 border-2 border-pink-500/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Brain className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">AI51 Vision</h3>
                                    <p className="text-gray-300 text-sm">
                                        Scans every pixel. Detects: real litter vs staged, brands, weight accuracy, stock images, AI-generated fakes. Catches 99% of scams.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Crypto Signatures */}
                        <div className="bg-black/60 border-2 border-amber-500/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Lock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Shannon Protocol</h3>
                                    <p className="text-gray-300 text-sm">
                                        Every transaction gets a cryptographic signature. Your email + amount + timestamp = impossible to fake. Named after Claude Shannon (information theory genius).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust by Default */}
                        <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Shield className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Trust by Default</h3>
                                    <p className="text-gray-300 text-sm">
                                        You get paid instantly (100%). Only obvious scams get flagged. We trust souls first, catch fraud later. No holding your money.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-6 text-center">
                        <p className="text-white font-bold text-lg mb-2">
                            Stronger than blockchain. Faster than banks.
                        </p>
                        <p className="text-cyan-300 text-sm font-mono">
                            Real-world proof + AI + cryptography = unbreakable
                        </p>
                    </div>

                    <Button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 py-4 text-lg font-bold"
                    >
                        Got It
                    </Button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}