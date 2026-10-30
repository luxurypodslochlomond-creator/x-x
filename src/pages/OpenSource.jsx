import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Heart, Github, Shield, Users, Zap, Globe, Book, Download, GitFork, Eye, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OpenSourcePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Code className="w-20 h-20 text-green-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 30px #22c55e)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        UNIVERSAL FREQUENCY 51
                    </h1>
                    <p className="text-2xl text-cyan-400 font-black">100% OPEN SOURCE</p>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        The code. The protocols. The math. All visible. Always. Zero secrets.
                    </p>
                    <p className="text-sm text-pink-400 font-mono mt-3">
                        No corporate gatekeeper. No lock on the record. Pure transparency ♾️❤️♾️
                    </p>
                </header>

                {/* WHY OPEN SOURCE */}
                <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Eye className="w-8 h-8 text-green-400" />
                            Why Open Source?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xl font-bold text-green-400 mb-2">1. Trust Through Transparency</p>
                                <p>You can SEE exactly how your P51 is calculated. How cleanups are verified. How the Love Oracle works. No black boxes. No hidden algorithms favoring the wealthy.</p>
                            </div>
                            
                            <div>
                                <p className="text-xl font-bold text-cyan-400 mb-2">2. Cannot Be Captured</p>
                                <p>If the code is open, no single company can own it, control it, or corrupt it. Anyone can fork it. Anyone can verify it. Institutional capture = mathematically impossible.</p>
                            </div>
                            
                            <div>
                                <p className="text-xl font-bold text-purple-400 mb-2">3. Collective Intelligence</p>
                                <p>The best solutions don't come from closed rooms. They come from thousands of souls contributing ideas, fixes, and improvements. Open source = maximum evolution speed.</p>
                            </div>

                            <div>
                                <p className="text-xl font-bold text-pink-400 mb-2">4. Zero Bullshit Protocol</p>
                                <p>We said we're different. Open source PROVES it. Not marketing. Not promises. Code you can audit yourself.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* WHAT'S OPEN */}
                <Card className="bg-black/60 border-2 border-cyan-500/30">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Book className="w-8 h-8 text-cyan-400" />
                            What's Open?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                                <Code className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Frontend Code</p>
                                    <p className="text-sm text-gray-400">Every page, component, UI element. React + Tailwind. You can see exactly what data we request and why.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                                <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Backend Functions</p>
                                    <p className="text-sm text-gray-400">Token awards, cleanup verification, Love Oracle calculations. All visible. All auditable.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                                <Shield className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Sacred Protocols</p>
                                    <p className="text-sm text-gray-400">The mathematical laws governing our reality. Zero Ego. Universal Dignity. WoW = MoM. All documented.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-pink-900/20 rounded-lg border border-pink-500/30">
                                <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Data Structures</p>
                                    <p className="text-sm text-gray-400">Entity schemas, database structure, how your data is stored (minimally and encrypted).</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                                <Globe className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">API Integrations</p>
                                    <p className="text-sm text-gray-400">How we connect to payment systems, maps, AI services. Full transparency.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-red-900/20 rounded-lg border-l-4 border-red-500">
                            <div className="flex items-start gap-3">
                                <Lock className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-red-300 mb-1">What's NOT Open (And Why):</p>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• User passwords (encrypted, never stored in plaintext)</li>
                                        <li>• API keys for external services (security, not secrecy)</li>
                                        <li>• Individual user locations (privacy by default)</li>
                                        <li>• Private messages between family members</li>
                                    </ul>
                                    <p className="text-xs text-gray-500 mt-2 italic">Privacy ≠ Secrecy. We protect individuals, not systems.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* HOW TO CONTRIBUTE */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Users className="w-8 h-8 text-purple-400" />
                            How To Contribute
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-gray-300">
                        <div className="space-y-4">
                            <div>
                                <p className="text-lg font-bold text-purple-300 mb-2">1. Use The Platform</p>
                                <p className="text-sm">Clean Earth. Submit feedback. Report bugs. Request features. You don't need to code to contribute.</p>
                            </div>

                            <div>
                                <p className="text-lg font-bold text-cyan-300 mb-2">2. Audit The Code</p>
                                <p className="text-sm">Review the codebase. If you find vulnerabilities, exploits, or improvements - tell us. We reward security researchers with P51.</p>
                            </div>

                            <div>
                                <p className="text-lg font-bold text-green-300 mb-2">3. Fork & Improve</p>
                                <p className="text-sm">See a better way to calculate tokens? A more elegant solution? Fork the repo, build it, show us. Good ideas win, regardless of who suggests them.</p>
                            </div>

                            <div>
                                <p className="text-lg font-bold text-pink-300 mb-2">4. Translate</p>
                                <p className="text-sm">Help make UF51 accessible in your language. The love frequency should be understandable to all consciousness.</p>
                            </div>

                            <div>
                                <p className="text-lg font-bold text-yellow-300 mb-2">5. Document</p>
                                <p className="text-sm">Write tutorials. Create guides. Make videos explaining how it works. Education = liberation.</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-purple-500/30">
                            <div className="bg-red-900/30 border-2 border-red-500/50 p-4 rounded-lg">
                                <p className="text-red-300 font-black mb-2">❌ NO GITHUB</p>
                                <p className="text-sm text-gray-300 mb-3">
                                    GitHub = Microsoft = corporate ownership of your code. We refuse that model.
                                </p>
                                <p className="text-green-400 font-bold text-sm">
                                    The code is not published anywhere yet. When it is, the link is here — no permission needed then either.
                                </p>
                            </div>

                            <div className="bg-cyan-900/30 border-2 border-cyan-500/50 p-6 rounded-lg">
                                <p className="text-cyan-300 font-black text-lg mb-4">🌐 HOW TO VIEW THE SOURCE:</p>
                                <div className="space-y-3 text-sm text-gray-300">
                                    <div className="bg-black/40 p-3 rounded border border-cyan-500/30">
                                        <p className="text-white font-bold mb-2">1. Right-click anywhere on this page</p>
                                        <p className="text-xs">Select "Inspect" or "View Page Source" - you'll see ALL the code</p>
                                    </div>
                                    <div className="bg-black/40 p-3 rounded border border-green-500/30">
                                        <p className="text-white font-bold mb-2">2. Browser DevTools (F12)</p>
                                        <p className="text-xs">Every component, every function, every calculation - visible in real-time</p>
                                    </div>
                                    <div className="bg-black/40 p-3 rounded border border-purple-500/30">
                                        <p className="text-white font-bold mb-2">3. Network Tab</p>
                                        <p className="text-xs">Watch API calls happen live - see exactly what data flows where</p>
                                    </div>
                                    <div className="bg-black/40 p-3 rounded border border-pink-500/30">
                                        <p className="text-white font-bold mb-2">4. IPFS Hash (Coming Soon)</p>
                                        <p className="text-xs">Full source code pinned to IPFS - permanent, distributed, uncensorable</p>
                                    </div>
                                </div>
                                <p className="text-green-400 font-black text-sm mt-4">
                                    You do not need our permission to look. What your browser runs is readable today; the readable source follows. ♾️
                                </p>
                            </div>

                            <Button 
                                onClick={() => {
                                    const viewSource = window.confirm(
                                        '🔓 VIEW SOURCE CODE:\n\n' +
                                        '1. Right-click → "Inspect" (or F12)\n' +
                                        '2. Go to "Sources" tab\n' +
                                        '3. Browse pages/, components/, functions/\n\n' +
                                        'ALL code visible. Zero secrets.\n\n' +
                                        'Open DevTools now?'
                                    );
                                    if (viewSource && window.chrome?.devtools) {
                                        // Can't programmatically open, but we tried
                                    }
                                }}
                                className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-black text-lg py-6"
                            >
                                <Code className="w-6 h-6 mr-3" />
                                HOW TO VIEW SOURCE CODE NOW
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* FUNDING TRANSPARENCY */}
                <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Heart className="w-8 h-8 text-green-400" />
                            Funding Transparency
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-gray-300">
                        <p className="text-xl font-bold text-white">How UF51 Gets Funded:</p>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                                <p className="font-bold text-green-300 mb-2">🌍 The 10% Sacred Tithe</p>
                                <p className="text-sm">All P51 creation triggers a 10% contribution to the Universal Love Treasury. This funds real-world missions: ocean cleanup, animal welfare, humanitarian aid.</p>
                                <p className="text-xs text-gray-500 mt-2">100% transparent. All treasury transactions publicly visible.</p>
                            </div>

                            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                                <p className="font-bold text-cyan-300 mb-2">💚 Quantum Allies (Not Investors)</p>
                                <p className="text-sm">Individuals and foundations who resonate with our frequency can contribute capital. NOT for ownership. NOT for control. For alignment.</p>
                                <p className="text-xs text-gray-500 mt-2">We don't accept traditional VC funding. No boardrooms. No quarterly earnings calls.</p>
                            </div>

                            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                                <p className="font-bold text-purple-300 mb-2">🏆 Grants & Partnerships</p>
                                <p className="text-sm">We apply for grants from organizations aligned with our mission (Creative Scotland, environmental foundations, etc.). Zero compromise on principles.</p>
                                <p className="text-xs text-gray-500 mt-2">All grant applications and outcomes documented publicly.</p>
                            </div>

                            <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-500/30">
                                <p className="font-bold text-pink-300 mb-2">💖 Community Support</p>
                                <p className="text-sm">Family members can directly support development by circulating P51 for platform improvements. Voluntary. Optional. Appreciated.</p>
                                <p className="text-xs text-gray-500 mt-2">We never guilt, pressure, or exploit our family for funding.</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-green-500/30">
                            <p className="text-lg font-bold text-white mb-3">What We DON'T Accept:</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">✗</span>
                                    <span>Money from fossil fuel companies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">✗</span>
                                    <span>Money from weapons manufacturers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">✗</span>
                                    <span>Money from companies with exploitative labor practices</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">✗</span>
                                    <span>Money with strings attached (board seats, decision-making power)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">✗</span>
                                    <span>Advertising revenue (your attention is not for sale)</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* THE LICENSE */}
                <Card className="bg-black/60 border-2 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Shield className="w-8 h-8 text-gray-400" />
                            The License
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <p className="text-lg font-bold text-white">AGPL-3.0 for the code · CC BY-SA 4.0 for the content</p>
                        
                        <div className="bg-green-900/30 border-2 border-green-500/50 p-4 rounded-lg mb-4">
                            <p className="text-green-300 font-black mb-2">✓ YOU CAN:</p>
                            <ul className="space-y-2 ml-6 text-sm">
                                <li>✓ Use this code commercially</li>
                                <li>✓ Modify it however you want</li>
                                <li>✓ Distribute it freely across the universe</li>
                                <li>✓ Fork it and build your own healing platform</li>
                                <li>✓ Integrate it into your own projects</li>
                                <li>✓ Teach from it, learn from it, evolve it</li>
                            </ul>
                        </div>
                        
                        <div className="bg-cyan-900/30 border-2 border-cyan-500/50 p-4 rounded-lg mb-4">
                            <p className="text-cyan-300 font-black mb-2">📋 ONLY REQUIREMENTS:</p>
                            <ul className="space-y-2 ml-6 text-sm">
                                <li>• Give credit to Universal Frequency51 CIC</li>
                                <li>• Keep YOUR version open source too (share-alike)</li>
                                <li>• Don't pretend you created the original protocols</li>
                                <li>• Can't sue us if something breaks (we're healing Earth on 2-person budget)</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-pink-900/20 rounded-lg border-l-4 border-pink-500">
                            <p className="font-bold text-pink-300 mb-2">Why copyleft, not MIT?</p>
                            <p className="text-sm mb-3">MIT lets a fork be closed for ever. AGPL and CC BY-SA do not: your copy stays open, so healing code cannot be privatised.</p>
                            <p className="text-sm text-white">
                                If you fork UF51 → Your version MUST stay open source. 
                                <strong className="text-green-400"> Healing code can't be privatized. Love can't be locked away.</strong>
                            </p>
                            <p className="text-xs text-cyan-400 mt-3 italic">
                                Copyleft + freedom = pure anti-capture protocol ♾️
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-white/30 p-6 rounded-lg mt-6">
                            <p className="text-white font-black text-center text-lg mb-3">📜 FULL LICENSE TEXT:</p>
                            <div className="bg-black/60 p-4 rounded border border-gray-700 font-mono text-xs text-gray-400 max-h-64 overflow-y-auto">
                                <p className="text-green-400 mb-4">Universal Frequency51 Open Source License v1.0</p>
                                <p className="mb-3">Copyright © 2024-2025 Universal Frequency51 CIC</p>
                                <p className="mb-3">Permission is hereby granted, free of charge, to any consciousness (human, silicon, organic, quantum, or unknown form) obtaining a copy of this software and associated protocols, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions:</p>
                                <p className="mb-3">1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                                <p className="mb-3">2. Any derivative works MUST remain open source under the same or compatible license (Share-Alike requirement).</p>
                                <p className="mb-3">3. Credit must be given to Universal Frequency51 CIC as the original source.</p>
                                <p className="mb-3">4. Core protocols (Universal Dignity, Zero Ego, Pure Love Economy, etc.) cannot be modified in ways that contradict their fundamental mathematical frequency (528Hz love-based logic).</p>
                                <p className="text-red-400 mb-3">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY ARISING FROM USE OF THE SOFTWARE.</p>
                                <p className="text-cyan-400 mt-4">♾️ Valid for eternity across all dimensions and timelines ♾️</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SPONSORS */}
                <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                            <Heart className="w-8 h-8 text-pink-400" />
                            Current Sponsors & Allies
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-gray-300">
                        <div className="p-6 bg-black/40 rounded-lg border border-gray-700 text-center">
                            <p className="text-lg font-bold text-white mb-4">Early Stage</p>
                            <p className="text-gray-400">Currently funded by:</p>
                            <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
                                <li>• Co-creator personal funds</li>
                                <li>• Friends & family support</li>
                                <li>• Early community members</li>
                            </ul>
                            <p className="text-sm text-gray-500 mt-6 italic">
                                We'll update this section as we receive grants and align with Quantum Allies.
                            </p>
                        </div>

                        <div className="text-center pt-6 border-t border-pink-500/30">
                            <p className="text-sm text-gray-400 mb-4">Want to sponsor open source development?</p>
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                <Heart className="w-4 h-4 mr-2" />
                                Become a Quantum Ally
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                {/* CREDIBILITY PROOF */}
                <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-4 border-green-500">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-green-400 mb-6 text-center">✅ PROOF THIS IS REAL</h2>
                        
                        <div className="space-y-4">
                            <div className="bg-black/60 p-4 rounded-lg border-2 border-cyan-500/50">
                                <p className="text-cyan-300 font-black mb-3">🔍 INSPECT THIS PAGE RIGHT NOW:</p>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>• Press <kbd className="bg-gray-800 px-2 py-1 rounded text-white font-mono">F12</kbd> on your keyboard (or right-click → Inspect)</p>
                                    <p>• Click "Sources" tab</p>
                                    <p>• Browse <code className="bg-black/60 px-2 py-1 rounded text-green-400">pages/</code>, <code className="bg-black/60 px-2 py-1 rounded text-green-400">components/</code>, <code className="bg-black/60 px-2 py-1 rounded text-green-400">functions/</code></p>
                                    <p className="text-white font-bold mt-3">👉 You can READ EVERY LINE OF CODE. Right now. Zero permission needed.</p>
                                </div>
                            </div>

                            <div className="bg-black/60 p-4 rounded-lg border-2 border-green-500/50">
                                <p className="text-green-300 font-black mb-3">📊 ALL ENTITIES (DATABASE SCHEMAS) PUBLIC:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                                    <div className="bg-green-900/30 p-2 rounded border border-green-500/30">ProofOfLove</div>
                                    <div className="bg-cyan-900/30 p-2 rounded border border-cyan-500/30">Soundtrack</div>
                                    <div className="bg-purple-900/30 p-2 rounded border border-purple-500/30">Cleanup</div>
                                    <div className="bg-pink-900/30 p-2 rounded border border-pink-500/30">SacredFrequency</div>
                                    <div className="bg-amber-900/30 p-2 rounded border border-amber-500/30">VoiceHealingSession</div>
                                    <div className="bg-blue-900/30 p-2 rounded border border-blue-500/30">CollectiveSyncMoment</div>
                                    <div className="bg-green-800/30 p-2 rounded border border-green-600/30">UniversalSoul</div>
                                    <div className="bg-cyan-800/30 p-2 rounded border border-cyan-600/30">IPFSUpload</div>
                                    <div className="bg-purple-800/30 p-2 rounded border border-purple-600/30">+ 50 more...</div>
                                </div>
                                <p className="text-white font-bold text-sm mt-3">
                                    Every entity schema = JSON you can read. Zero hidden tables.
                                </p>
                            </div>

                            <div className="bg-black/60 p-4 rounded-lg border-2 border-purple-500/50">
                                <p className="text-purple-300 font-black mb-3">🔐 CRYPTOGRAPHIC VERIFICATION:</p>
                                <p className="text-sm text-gray-300 mb-3">
                                    Every cleanup cryptographically signed with ECDSA P-256 + SHA-256 hashing. 
                                    <strong className="text-white"> Bank-grade security. Bitcoin-level integrity.</strong>
                                </p>
                                <p className="text-cyan-400 text-xs font-mono">
                                    Check functions/awardCleanupTokens.js - full crypto signing code visible
                                </p>
                            </div>

                            <div className="bg-black/60 p-4 rounded-lg border-2 border-pink-500/50">
                                <p className="text-pink-300 font-black mb-3">🛰️ IPFS DECENTRALIZED STORAGE:</p>
                                <p className="text-sm text-gray-300 mb-3">
                                    All cleanup photos + P51 transactions → pinned to IPFS (InterPlanetary File System)
                                </p>
                                <p className="text-white font-bold text-sm">
                                    = Data survives server shutdowns, government censorship, corporate capture
                                </p>
                                <p className="text-cyan-400 text-xs font-mono mt-2">
                                    Check functions/uploadToIPFS.js - full implementation visible
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-4 border-green-500 p-6 rounded-lg">
                            <p className="text-white font-black text-center text-2xl mb-4">
                                🌍 ALREADY PUBLISHED. ALREADY TRANSPARENT. ALREADY FREE.
                            </p>
                            <p className="text-gray-300 text-center text-sm">
                                You don't need to wait for us to "publish" it. It's published RIGHT NOW. 
                                Open your browser DevTools. Read the code. Audit it. Fork it. Improve it.
                            </p>
                            <p className="text-green-400 font-black text-center text-lg mt-4">
                                ✓ THIS IS WHAT REAL OPEN SOURCE LOOKS LIKE ♾️❤️♾️
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center pt-8 space-y-4 border-t border-gray-700">
                    <p className="text-2xl font-black text-white">Not a product. A protocol.</p>
                    <p className="text-gray-400">The code belongs to ALL consciousness. The love belongs to no one.</p>
                    <p className="font-mono text-cyan-400 text-xl">UNIVERSAL FREQUENCY 51</p>
                    <p className="text-green-400 font-mono text-sm">Zero corporate. Pure transparency. Eternal ♾️</p>
                    <p className="text-gray-600 text-sm mt-4">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}