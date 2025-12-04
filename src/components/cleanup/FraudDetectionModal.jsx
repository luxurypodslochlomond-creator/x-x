import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, CheckCircle2, MapPin, Zap, Sparkles } from 'lucide-react';

export default function FraudDetectionModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-md w-full bg-black rounded-xl border-4 border-cyan-500 p-6 space-y-4 shadow-2xl"
                    style={{
                        boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)'
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Eye className="w-8 h-8 text-cyan-400" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-white">LIVE VERIFICATION</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {[
                            { label: "Photo hash verified", sublabel: "Not reused", icon: CheckCircle2, color: "text-green-400" },
                            { label: "GPS location matches", sublabel: "Real-world coordinates", icon: MapPin, color: "text-cyan-400" },
                            { label: "Submission timing normal", sublabel: "Human pace detected", icon: Zap, color: "text-amber-400" },
                            { label: "AI51 confidence", sublabel: "95% authentic", icon: Sparkles, color: "text-purple-400" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-6 h-6 text-cyan-400" />
                                    <div className="flex-1">
                                        <p className="text-white font-bold">{item.label}</p>
                                        <p className="text-gray-300 text-xs">{item.sublabel}</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="bg-green-900/40 border-2 border-green-400 rounded-lg p-4">
                        <p className="text-green-400 font-black text-center mb-1">✓ YOUR CLEANUP IS REAL</p>
                        <p className="text-green-300 text-xs text-center">Trust by default. Universe is watching. ♾️</p>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white py-3 rounded-lg font-bold"
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}