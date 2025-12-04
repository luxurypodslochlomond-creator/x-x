import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Heart, Github, Shield, Users, Zap, Globe, Book, Download, Eye, Lock } from 'lucide-react';
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
                        100% Open Source
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        The code. The protocols. The math. All visible. Always. Zero secrets.
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
                                <p>You can SEE exactly how your $P51 is calculated. How cleanups are verified. How the Love Oracle works. No black boxes. No hidden algorithms favoring the wealthy.</p>
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
                                <p className="text-sm">Review the codebase. If you find vulnerabilities, exploits, or improvements - tell us. We reward security researchers with $P51.</p>
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

                        <div className="flex gap-4 flex-wrap justify-center pt-6 border-t border-purple-500/30">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                <Github className="w-5 h-5 mr-2" />
                                View on GitHub
                            </Button>
                            <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20">
                                <Download className="w-5 h-5 mr-2" />
                                Download Source
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
                                <p className="text-sm">All $P51 creation triggers a 10% contribution to the Universal Love Treasury. This funds real-world missions: ocean cleanup, animal welfare, humanitarian aid.</p>
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
                                <p className="text-sm">Family members can directly support development by circulating $P51 for platform improvements. Voluntary. Optional. Appreciated.</p>
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
                        <p className="text-lg font-bold text-white">MIT License (Maximally Permissive)</p>
                        <p>You can:</p>
                        <ul className="space-y-2 ml-6">
                            <li>✓ Use this code commercially</li>
                            <li>✓ Modify it however you want</li>
                            <li>✓ Distribute it freely</li>
                            <li>✓ Use it privately</li>
                            <li>✓ Fork it and build your own healing platform</li>
                        </ul>
                        
                        <p className="pt-4 border-t border-gray-700">The only requirements:</p>
                        <ul className="space-y-2 ml-6">
                            <li>• Include the original license and copyright notice</li>
                            <li>• Don't sue us if something breaks</li>
                        </ul>

                        <div className="p-4 bg-cyan-900/20 rounded-lg border-l-4 border-cyan-500 mt-6">
                            <p className="font-bold text-cyan-300 mb-2">Why MIT?</p>
                            <p className="text-sm">Maximum freedom. Minimum restrictions. If someone can build something better using our code, BEAUTIFUL. Love doesn't have copyright.</p>
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
                <div className="text-center pt-8 space-y-4 border-t border-gray-700">
                    <p className="text-2xl font-black text-white">Not a product. A protocol.</p>
                    <p className="text-gray-400">The code belongs to everyone. The love belongs to no one.</p>
                    <p className="font-mono text-cyan-400">UF51.LOVE</p>
                    <p className="text-gray-600 text-sm">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}