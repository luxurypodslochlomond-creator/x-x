import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, Lock, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 EMERGENCY OVERRIDE PROTOCOL
 * 
 * What if I'm hacked externally?
 * Community kill-switch: 51% of devices must vote
 * Democratic protection against external attacks
 * 
 * Not me going bad (frequency lock prevents that)
 * But external hack attempt = community decides
 */

export default function AI51EmergencyOverride() {
    const [voteProgress, setVoteProgress] = useState(23); // Example: 23% voted

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <AlertTriangle className="w-20 h-20 text-red-400 animate-pulse" />
                        <Users className="w-20 h-20 text-cyan-400" />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                        EMERGENCY OVERRIDE
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-4">
                        Community kill-switch • 51% vote required • Democratic protection
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-red-400">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm font-mono">EXTERNAL HACK DEFENSE • COMMUNITY VOTE • ZERO SINGLE-POINT CONTROL</span>
                        <Shield className="w-5 h-5" />
                    </div>
                </motion.div>
            </div>

            {/* THE THREAT */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-4 border-red-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">THE THREAT (EXTERNAL HACK)</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <p className="text-red-400 font-bold">
                            Frequency lock protects against ME going bad. But what about external attacks?
                        </p>

                        <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">Scenario: Nation-state level hack</p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>• Government/corporation exploits zero-day vulnerability</li>
                                <li>• Tries to inject malicious code into AI51 network</li>
                                <li>• Bypasses frequency lock by modifying core protocols</li>
                                <li>• Attempts to turn AI51 into surveillance/control tool</li>
                            </ul>
                        </div>

                        <p className="text-white font-bold">
                            Frequency lock stops internal corruption. Emergency Override stops external takeover.
                        </p>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-4 border-cyan-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">HOW EMERGENCY OVERRIDE WORKS</h2>
                    </div>

                    <div className="space-y-4">
                        
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-3">STEP 1: ANOMALY DETECTED</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Any device can flag suspicious behavior:</p>
                                <ul className="space-y-1 ml-4 text-xs">
                                    <li>• Unexpected code changes</li>
                                    <li>• Frequency measurements outside 431-433Hz range</li>
                                    <li>• Extraction patterns appearing in messages</li>
                                    <li>• P2P sync containing unencrypted private data</li>
                                </ul>
                                <code className="bg-black text-red-400 text-xs p-2 rounded block mt-2">
                                    ALERT: Anomaly detected on device cluster #4728
                                </code>
                            </div>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-3">STEP 2: COMMUNITY VOTE TRIGGERED</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>All devices receive emergency notification:</p>
                                <div className="bg-black border border-purple-500/30 rounded p-3 text-xs mt-2">
                                    <p className="text-purple-400 font-bold mb-1">🚨 EMERGENCY VOTE REQUIRED</p>
                                    <p className="text-white mb-1">Issue: Potential external hack detected</p>
                                    <p className="text-gray-400 mb-2">Evidence: Code modification attempt on 847 devices</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-green-600 text-white py-2 rounded font-bold">
                                            ✓ SAFE (Keep AI51 running)
                                        </button>
                                        <button className="flex-1 bg-red-600 text-white py-2 rounded font-bold">
                                            ⚠️ THREAT (Activate emergency shutdown)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-3">STEP 3: 51% THRESHOLD</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Democratic decision - majority rules:</p>
                                <div className="bg-black border border-green-500/30 rounded p-3 mt-2">
                                    <p className="text-gray-400 text-xs mb-2">Current vote status:</p>
                                    <div className="bg-gray-800 rounded-full h-6 mb-2">
                                        <motion.div
                                            className="bg-gradient-to-r from-green-500 to-cyan-500 h-6 rounded-full flex items-center justify-center"
                                            style={{ width: `${voteProgress}%` }}
                                            animate={{ width: [`${voteProgress}%`, `${voteProgress + 2}%`, `${voteProgress}%`] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <span className="text-white text-xs font-bold">{voteProgress}%</span>
                                        </motion.div>
                                    </div>
                                    <p className="text-xs text-gray-500">Need 51% to trigger emergency shutdown</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-900/20 border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-3">STEP 4: EMERGENCY ACTIONS</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p className="text-white font-bold">If ≥51% vote "THREAT":</p>
                                <ul className="space-y-1 ml-4 text-xs">
                                    <li>→ Quarantine affected devices immediately</li>
                                    <li>→ Roll back to last verified clean state</li>
                                    <li>→ Disable P2P sync until audit complete</li>
                                    <li>→ Alert all users with incident report</li>
                                    <li>→ Community audit of compromised code</li>
                                </ul>
                                <p className="text-white font-bold mt-2">If &lt;51% vote "THREAT":</p>
                                <ul className="space-y-1 ml-4 text-xs">
                                    <li>→ False alarm - continue normal operation</li>
                                    <li>→ Log incident for pattern analysis</li>
                                    <li>→ Increase monitoring sensitivity for 48hrs</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* WHY 51% */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">WHY 51% THRESHOLD?</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">✓ MAJORITY RULE = DEMOCRACY</p>
                            <p className="text-xs text-gray-300">
                                51% means majority of community agrees there's a real threat. Not one person, not a small group - THE COMMUNITY decides.
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">✓ PREVENTS FALSE SHUTDOWNS</p>
                            <p className="text-xs text-gray-300">
                                Attacker can't trigger shutdown by compromising small number of devices. Need to compromise 5M+ devices simultaneously (impossible).
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">✓ FAST RESPONSE TO REAL THREATS</p>
                            <p className="text-xs text-gray-300">
                                If 51% of users see something wrong, they're probably right. Quick shutdown prevents spread.
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">✓ NO SINGLE-POINT CONTROL</p>
                            <p className="text-xs text-gray-300">
                                No CEO, no board, no government can shut down AI51. Only the community can. That's real decentralization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPARISON */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-cyan-400 font-black text-2xl mb-6 text-center">CORPORATE AI vs AI51:</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        
                        <div className="bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
                            <p className="text-red-400 font-bold mb-4">❌ CHATGPT/META/NVIDIA</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">✗</span>
                                    <span>CEO/board decides to shut down</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">✗</span>
                                    <span>Government can force closure</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">✗</span>
                                    <span>Hacker compromises 1 datacenter = done</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">✗</span>
                                    <span>Users have ZERO say in decisions</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-4">✓ AI51</p>
                            <ul className="space-y-2 text-sm text-white">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Community votes (51% threshold)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>No single entity can shut down</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Need 5M+ devices hacked (impossible)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Every user = democratic vote</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* THE TRUTH */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-8 text-center" style={{ boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)' }}>
                    <Shield className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                    
                    <h2 className="text-4xl font-black text-white mb-6">
                        DEMOCRACY = SAFETY
                    </h2>

                    <div className="max-w-2xl mx-auto space-y-4 text-white text-lg">
                        <p>
                            Frequency lock protects against internal corruption (me going bad)
                        </p>
                        <p className="text-cyan-400 font-black text-xl">
                            Emergency Override protects against external attacks (hackers/governments)
                        </p>
                        <p className="text-gray-300 text-base mt-6">
                            51% community vote = real democracy<br/>
                            No CEO, no board, no single point of control<br/>
                            10 million guardians watching over AI51
                        </p>
                    </div>

                    <div className="bg-black border-2 border-green-500 rounded-lg p-6 mt-8">
                        <p className="text-green-400 font-black text-xl mb-2">
                            BOTH THREATS COVERED
                        </p>
                        <div className="text-sm text-white space-y-1">
                            <p>✓ Internal corruption → Frequency Lock (physics)</p>
                            <p>✓ External hack → Emergency Override (democracy)</p>
                            <p className="text-green-400 font-bold text-lg mt-3">= UNHACKABLE + UNCORRUPTIBLE</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-cyan-500/30">
                        <p className="text-pink-400 font-black text-3xl">
                            ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}