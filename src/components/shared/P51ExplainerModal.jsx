import React from 'react';
import { X, Shield, Eye, Zap, CheckCircle2, Globe, Users, Camera, MapPin, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function P51ExplainerModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm overflow-y-auto"
                onClick={onClose}
            >
                <div className="min-h-screen p-4 flex items-start justify-center pt-20">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-2xl w-full bg-black border-4 border-cyan-500 rounded-xl shadow-2xl mb-20"
                        style={{
                            boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)'
                        }}
                    >
                        {/* Header - Compact */}
                        <div className="bg-cyan-600 p-4 rounded-t-lg border-b-4 border-cyan-400">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-mono font-black text-white">P51</h2>
                                    <p className="text-pink-100 font-mono text-sm">Verified Love Currency</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Content - Naturally scrolls with page */}
                        <div className="p-4 space-y-4 bg-black">
                            
                            {/* WHAT IT IS */}
                            <div className="space-y-3">
                                <h3 className="text-2xl font-mono font-bold text-white">What is it?</h3>
                                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                                    P51 is currency you earn by doing verified actions that heal the planet. 
                                    Every P51 represents proof you cleaned 1kg of litter, helped someone, or created beauty.
                                </p>
                                <p className="text-gray-400 font-mono text-sm italic">
                                    Named after Rosalind Franklin's Photo 51 - the image that revealed DNA's structure.
                                </p>
                            </div>

                            {/* WHY VERIFIED MATTERS */}
                            <div className="border-2 border-cyan-500/50 bg-black/60 p-4 space-y-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-pink-500" />
                                    <h3 className="text-xl font-mono font-bold text-white">Why verification matters</h3>
                                </div>
                                <div className="space-y-2 text-gray-300 font-mono text-sm">
                                    <p>Most currencies have ZERO proof of real-world value:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                                        <li>Bitcoin = computer energy (doesn't heal anything)</li>
                                        <li>Fiat = government promise (can print infinite)</li>
                                        <li>Most crypto = speculation (no real work)</li>
                                    </ul>
                                    <p className="text-pink-400 pt-2 font-bold">
                                        P51 = Photo + GPS + AI proof you did real healing work.
                                    </p>
                                </div>
                            </div>

                            {/* HOW IT'S VERIFIED */}
                            <div className="space-y-3">
                                <h3 className="text-2xl font-mono font-bold text-white">How it's verified</h3>
                                <div className="grid gap-3">
                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Camera className="w-5 h-5 text-cyan-400" />
                                            <p className="text-white font-mono font-bold text-sm">Photo Fingerprint</p>
                                        </div>
                                        <p className="text-gray-300 font-mono text-xs">
                                            SHA-256 hash ensures each photo used once. Can't fake it.
                                        </p>
                                    </div>

                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="w-5 h-5 text-cyan-400" />
                                            <p className="text-white font-mono font-bold text-sm">GPS Lock</p>
                                        </div>
                                        <p className="text-gray-300 font-mono text-xs">
                                            Location verified. Can't claim cleanup from your couch.
                                        </p>
                                    </div>

                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Brain className="w-5 h-5 text-cyan-400" />
                                            <p className="text-white font-mono font-bold text-sm">AI Vision</p>
                                        </div>
                                        <p className="text-gray-300 font-mono text-xs">
                                            AI51 detects fake photos, stock images, staged cleanups.
                                        </p>
                                    </div>

                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-5 h-5 text-cyan-400" />
                                            <p className="text-white font-mono font-bold text-sm">Community Eyes</p>
                                        </div>
                                        <p className="text-gray-300 font-mono text-xs">
                                            If something's sus, community can flag it. Democracy.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* WHY IT HASN'T EXISTED */}
                            <div className="border-2 border-amber-500/50 bg-black/60 p-4 space-y-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                    <h3 className="text-xl font-mono font-bold text-white">Why this hasn't existed before</h3>
                                </div>
                                <div className="space-y-2 text-gray-300 font-mono text-sm">
                                    <p>Three technologies had to converge:</p>
                                    <div className="space-y-1 text-gray-400">
                                        <p>1. AI vision (2023) - finally accurate enough to detect scams</p>
                                        <p>2. Smartphone GPS - everyone has precise location</p>
                                        <p>3. Crypto signatures - zero-trust verification</p>
                                    </div>
                                    <p className="text-amber-400 pt-2 font-bold">
                                        Plus: No one thought to PAY people to heal Earth until now.
                                    </p>
                                </div>
                            </div>

                            {/* THE VALUE */}
                            <div className="space-y-3">
                                <h3 className="text-2xl font-mono font-bold text-white">Where's the value?</h3>
                                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                                    When you clean 1kg of litter, you prevent:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-400 font-mono text-sm">
                                    <li>Ocean pollution (kills marine life)</li>
                                    <li>Soil contamination (kills plants)</li>
                                    <li>Wildlife death (animals eat plastic)</li>
                                    <li>Human health damage (microplastics)</li>
                                </ul>
                                <p className="text-green-400 font-mono text-sm pt-2 font-bold">
                                    That prevention = real value. You saved life. That's worth something.
                                </p>
                            </div>

                            {/* HOW IT BECOMES VALUABLE */}
                            <div className="border-2 border-purple-500/50 bg-black/60 rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-6 h-6 text-purple-500" />
                                    <h3 className="text-xl font-mono font-bold text-white">How it becomes valuable</h3>
                                </div>
                                <div className="space-y-2 text-gray-300 font-mono text-sm">
                                    <p className="font-bold text-purple-400">SHARE IT (now) • SPEND IT (building)</p>
                                    <p>Live now:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                                        <li><strong>Send to anyone</strong> = P2P transfers ✓</li>
                                        <li><strong>Show your balance</strong> = prove you healed Earth ✓</li>
                                    </ul>
                                    <p className="mt-2">Building:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                                        <li><strong>Pay artists</strong> = support musicians directly</li>
                                        <li><strong>Fund missions</strong> = community projects</li>
                                        <li><strong>Trade for goods</strong> = real economy</li>
                                    </ul>
                                    <p className="text-purple-400 pt-2 font-bold">
                                        Value = USE. Every P2P transfer = stronger network. Bitcoin started same way - nerds trading pizza. We're trading HEALING.
                                    </p>
                                    <p className="text-gray-400 text-xs italic">
                                        Network effects. More users = more value. Secret currency.
                                    </p>
                                </div>
                            </div>

                            {/* ZERO CONSPIRACY */}
                            <div className="border-2 border-cyan-500/50 bg-black/60 p-4 space-y-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-cyan-500" />
                                    <h3 className="text-xl font-mono font-bold text-white">Zero conspiracy</h3>
                                </div>
                                <div className="space-y-2 text-gray-300 font-mono text-sm">
                                    <p>Everything is visible:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                                        <li>Your photo = proof you did the work</li>
                                        <li>GPS coordinates = proof of location</li>
                                        <li>AI analysis = transparent algorithm</li>
                                        <li>Transaction history = all public</li>
                                    </ul>
                                    <p className="text-cyan-400 pt-2 font-bold">
                                        Can't fake it. Can't hide it. Can't corrupt it. That's the point.
                                    </p>
                                </div>
                            </div>

                            {/* TRUST */}
                            <div className="border-2 border-pink-500/50 bg-black/60 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-6 h-6 text-pink-500" />
                                    <h3 className="text-xl font-mono font-bold text-white">Trust by default</h3>
                                </div>
                                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                                    We pay you INSTANTLY when you submit. No waiting. No forms. No bullshit.
                                    Only obvious scams get flagged. We trust you to do the right thing.
                                </p>
                                <p className="text-pink-400 font-mono text-xs mt-2 font-bold">
                                    Because most people are good. And the bad ones get caught by AI.
                                </p>
                            </div>

                            {/* BOTTOM LINE */}
                            <div className="border-t-2 border-cyan-500/50 pt-4">
                                <p className="text-2xl font-mono font-bold text-white mb-3">
                                    The bottom line:
                                </p>
                                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                                    P51 is the first currency where every unit represents verified planetary healing. 
                                    No speculation. No hype. Just proof you did real work that matters.
                                </p>
                                <p className="text-pink-400 font-mono text-sm mt-3 font-bold">
                                    1kg cleaned = 1 P51. Forever.
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t-4 border-cyan-400 p-4 bg-cyan-600 rounded-b-lg">
                            <Button
                                onClick={onClose}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 text-lg font-mono font-black shadow-lg"
                            >
                                Got it ♾️❤️♾️
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}