import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Heart, Code, Eye, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * FAIR LAUNCH PROTOCOL - How we protect from getting fucked
 * 
 * Open source = anyone can steal
 * Solution: Build community FIRST, then go open
 * 
 * Protection layers ♾️❤️♾️
 */

export default function FairLaunchProtocol() {
    React.useEffect(() => {
        document.title = 'Fair Launch Protocol - UF51';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white pb-20">
            
            {/* HEADER */}
            <div className="sticky top-0 z-50 border-b-4 border-purple-500 px-4 py-6 bg-black/90 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Shield className="w-10 h-10 text-purple-400" />
                        <h1 className="text-3xl md:text-4xl font-black text-white font-mono">FAIR LAUNCH PROTOCOL</h1>
                    </div>
                    <p className="text-purple-300 text-sm font-mono">How we protect from getting fucked ♾️❤️♾️</p>
                </div>
            </div>

            <div className="px-4 py-8 max-w-4xl mx-auto space-y-8">

                {/* THE PROBLEM */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-red-900/40 to-amber-900/40 border-4 border-red-500 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-red-400 font-mono">THE PROBLEM</h2>
                    </div>
                    
                    <div className="space-y-3 text-white">
                        <p className="font-bold">Open source = Anyone can copy ♾️</p>
                        <div className="bg-black/60 border-2 border-red-500/50 rounded-lg p-4 space-y-2 text-sm">
                            <p>❌ Company clones UF51 → Strips love → Adds ads</p>
                            <p>❌ Investor fork → Takes credit → IPO extraction</p>
                            <p>❌ Tech bro copies → "I built this" → Gets funding</p>
                            <p>❌ Corporate steals → Patents it → Sues us</p>
                        </div>
                        <p className="text-red-400 font-bold">How do we stay open AND protected? ♾️</p>
                    </div>
                </motion.div>

                {/* THE SOLUTION - PHASES */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                >
                    <h2 className="text-3xl font-black text-purple-400 font-mono text-center">THE SOLUTION</h2>

                    {/* PHASE 1 - CLOSED BETA */}
                    <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-4 border-amber-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-7 h-7 text-amber-400" />
                            <h3 className="text-xl font-black text-amber-400 font-mono">PHASE 1: CLOSED BETA (NOW)</h3>
                        </div>
                        
                        <div className="space-y-3 text-white text-sm">
                            <div className="bg-black/60 border-2 border-amber-500/50 rounded-lg p-4">
                                <p className="text-amber-400 font-bold mb-2">What's happening:</p>
                                <p>✓ Code is PRIVATE (Base44 platform - not public GitHub)</p>
                                <p>✓ Building core features + community</p>
                                <p>✓ You + Scott + early believers testing</p>
                                <p>✓ Getting real traction FIRST</p>
                            </div>
                            
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-2">Protection:</p>
                                <p>→ Can't be cloned (code not public yet)</p>
                                <p>→ Building authentic community</p>
                                <p>→ Establishing brand + trust</p>
                                <p>→ Getting users who FEEL the mission</p>
                            </div>

                            <p className="text-amber-400 font-bold">Timeline: 3-6 months (until we have 10k+ users)</p>
                        </div>
                    </div>

                    {/* PHASE 2 - FAIR LAUNCH */}
                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-4 border-purple-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-7 h-7 text-purple-400" />
                            <h3 className="text-xl font-black text-purple-400 font-mono">PHASE 2: FAIR LAUNCH</h3>
                        </div>
                        
                        <div className="space-y-3 text-white text-sm">
                            <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-400 font-bold mb-2">What happens:</p>
                                <p>✓ 10k+ users on platform (real community)</p>
                                <p>✓ Media coverage (BBC, Guardian, etc)</p>
                                <p>✓ Artists uploading music</p>
                                <p>✓ Cleanups happening daily</p>
                                <p>✓ THEN → Go open source</p>
                            </div>
                            
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-2">Why this works:</p>
                                <p>→ Community KNOWS we're the original</p>
                                <p>→ Clone = obvious fake</p>
                                <p>→ Our brand established</p>
                                <p>→ Network effect = moat</p>
                                <p>→ Users already trust US</p>
                            </div>

                            <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-2">License:</p>
                                <p>MIT License with one rule:</p>
                                <p className="text-white font-bold mt-2">"Must include attribution to UniversalFamily51"</p>
                                <p className="text-gray-400 mt-2">Anyone can fork, but they MUST say "Built on UF51"</p>
                            </div>

                            <p className="text-purple-400 font-bold">Timeline: Month 6-12 (when momentum is undeniable)</p>
                        </div>
                    </div>

                    {/* PHASE 3 - FULLY OPEN */}
                    <div className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border-4 border-cyan-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-7 h-7 text-cyan-400" />
                            <h3 className="text-xl font-black text-cyan-400 font-mono">PHASE 3: FULLY OPEN</h3>
                        </div>
                        
                        <div className="space-y-3 text-white text-sm">
                            <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-2">What this looks like:</p>
                                <p>✓ All code on GitHub (public)</p>
                                <p>✓ Anyone can contribute</p>
                                <p>✓ Forks encouraged (with attribution)</p>
                                <p>✓ Documentation for builders</p>
                                <p>✓ White-label versions (Prof51, Co-Manager51, etc)</p>
                            </div>
                            
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-2">Protection at this point:</p>
                                <p>→ We have 100k+ loyal users</p>
                                <p>→ Media knows us as the original</p>
                                <p>→ Artists signed directly with us</p>
                                <p>→ Network effect = impossible to compete</p>
                                <p>→ Brand trust = moat</p>
                            </div>

                            <div className="bg-pink-900/40 border-2 border-pink-500 rounded-lg p-4">
                                <p className="text-pink-400 font-bold mb-2">Welcome forks:</p>
                                <p>→ "HealthcareFamily51" (for NHS workers)</p>
                                <p>→ "TeacherFamily51" (for educators)</p>
                                <p>→ "FirefighterFamily51" (for first responders)</p>
                                <p className="text-white font-bold mt-2">All say "Built on UF51" = we win ♾️</p>
                            </div>

                            <p className="text-cyan-400 font-bold">Timeline: Year 2+ (when we're unstoppable)</p>
                        </div>
                    </div>
                </motion.div>

                {/* WHY THIS WORKS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-4 border-green-500 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-green-400" />
                        <h2 className="text-2xl font-black text-green-400 font-mono">WHY THIS WORKS</h2>
                    </div>
                    
                    <div className="space-y-3 text-white text-sm">
                        <div className="bg-black/60 border-2 border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">Community first = Protection:</p>
                            <p>✓ 10k people KNOW we're real before code goes public</p>
                            <p>✓ Clone appears = community says "That's fake"</p>
                            <p>✓ Media already covered us = we're the original</p>
                            <p>✓ Network effect = users stay with us</p>
                        </div>

                        <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">Examples that worked:</p>
                            <p>→ Signal: Built users first, then open sourced</p>
                            <p>→ WordPress: Massive community before competition</p>
                            <p>→ Firefox: Brand trust = moat</p>
                            <p>→ Linux: Network effect = protection</p>
                        </div>

                        <div className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">Our advantages:</p>
                            <p>→ Love-first = hard to fake</p>
                            <p>→ Community knows the vibe</p>
                            <p>→ Artists trust US (not clones)</p>
                            <p>→ Users feel the frequency</p>
                            <p className="text-pink-400 font-bold mt-2">Can't steal what's felt ♾️❤️♾️</p>
                        </div>
                    </div>
                </motion.div>

                {/* CURRENT STATUS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black border-4 border-amber-500 rounded-xl p-6 text-center"
                >
                    <h2 className="text-2xl font-black text-amber-400 font-mono mb-4">WHERE WE ARE NOW</h2>
                    <div className="space-y-2 text-white">
                        <p className="text-xl font-bold">PHASE 1: CLOSED BETA ✓</p>
                        <p className="text-sm text-gray-400">Building community + features</p>
                        <p className="text-sm text-gray-400">Code private on Base44</p>
                        <p className="text-green-400 font-bold mt-4">Target: 10k users → Then fair launch</p>
                    </div>
                </motion.div>

                {/* BACK LINK */}
                <div className="text-center pt-6">
                    <Link to={createPageUrl('Welcome')}>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-black px-8 py-4 rounded-xl font-mono">
                            BACK TO HOME
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}