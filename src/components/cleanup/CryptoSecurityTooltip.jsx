import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CryptoSecurityTooltip() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 bg-green-900/40 border border-green-500/50 rounded-full px-4 py-2 hover:bg-green-900/60 transition-all"
            >
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-xs font-black">🔐 CRYPTOGRAPHICALLY SIGNED</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-green-900 to-cyan-900 border-4 border-green-500 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
                            style={{ boxShadow: '0 0 60px rgba(34, 197, 94, 0.6)' }}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-white/70 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    >
                                        <Shield className="w-12 h-12 text-green-400" />
                                    </motion.div>
                                    <h2 className="text-3xl font-black text-white">UNFUCKABLE</h2>
                                </div>

                                <div className="bg-black/60 border-2 border-green-500/50 rounded-xl p-4">
                                    <p className="text-white text-lg font-bold mb-2">
                                        Every cleanup is cryptographically signed.
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        Your browser generates a unique keypair (like Bitcoin). Every cleanup you submit gets digitally signed with YOUR private key.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-lg p-4">
                                        <p className="text-cyan-400 font-black mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            WHAT IT PROTECTS
                                        </p>
                                        <ul className="text-gray-300 text-sm space-y-1 ml-6 list-disc">
                                            <li><strong className="text-white">Weight tampering</strong> - Change 5kg to 50kg? Signature breaks = CAUGHT</li>
                                            <li><strong className="text-white">Photo swapping</strong> - Photo hash in signature. Change photo = CAUGHT</li>
                                            <li><strong className="text-white">Location spoofing</strong> - GPS coords signed. Fake location = CAUGHT</li>
                                            <li><strong className="text-white">Replay attacks</strong> - Each cleanup links to previous (hash chain). Submit same photo twice = CAUGHT</li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-4">
                                        <p className="text-red-400 font-black mb-2 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5" />
                                            WHAT HAPPENS IF YOU FUCK WITH IT
                                        </p>
                                        <div className="text-gray-300 text-sm space-y-2">
                                            <p>
                                                <strong className="text-white">Signature verification FAILS.</strong> Server rejects cleanup instantly.
                                            </p>
                                            <p>
                                                <strong className="text-white">Hash chain breaks.</strong> All future cleanups flagged until chain restored.
                                            </p>
                                            <p>
                                                <strong className="text-white">Trust score drops.</strong> Future cleanups need manual verification.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/30 border-2 border-purple-500/50 rounded-lg p-4">
                                        <p className="text-purple-400 font-black mb-2">HOW IT WORKS</p>
                                        <ol className="text-gray-300 text-sm space-y-2 ml-6 list-decimal">
                                            <li>Photo captured → SHA-256 hash generated</li>
                                            <li>Weight + location + GPS + photo hash → combined into data string</li>
                                            <li>Data string signed with your private key (ECDSA P-256)</li>
                                            <li>Signature + public key + hash chain sent to server</li>
                                            <li>Server verifies signature using your public key</li>
                                            <li>Any tampering = signature mismatch = REJECTED</li>
                                        </ol>
                                    </div>

                                    <div className="bg-amber-900/30 border-2 border-amber-500/50 rounded-lg p-4">
                                        <p className="text-amber-400 font-black mb-2">THE TECH</p>
                                        <ul className="text-gray-300 text-sm space-y-2">
                                            <li><strong className="text-white">ECDSA P-256:</strong> Bank-grade signatures. What banks use for transactions.</li>
                                            <li><strong className="text-white">SHA-256:</strong> Bitcoin-level hashing. Cryptographically secure.</li>
                                            <li><strong className="text-white">Hash Chain:</strong> Each cleanup links to previous. Prevents replay.</li>
                                            <li><strong className="text-white">Quantum-Ready:</strong> Can upgrade to post-quantum algos when needed.</li>
                                            <li><strong className="text-white">More Efficient Than Blockchain:</strong> No mining, no fees, instant verification.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg p-4 text-center">
                                    <p className="text-white font-black text-lg">
                                        TL;DR: Touch ANYTHING in your cleanup = signature breaks = you're caught.
                                    </p>
                                    <p className="text-cyan-100 text-sm mt-2">
                                        Not even nation-state hackers can fake this without your private key.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}