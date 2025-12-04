import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Zap, Code, Globe, CheckCircle } from 'lucide-react';

export default function Base44FamilyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HERO */}
                <header className="text-center space-y-6 py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Shield className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #22d3ee)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black">Base44: Family</h1>
                    <p className="text-2xl text-gray-300">The quantum engine underneath everything.</p>
                </header>

                {/* WHAT BASE44 IS */}
                <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Code className="w-12 h-12 text-cyan-400" />
                            <h2 className="text-3xl font-black text-white">What Base44 Provides</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Database (Supabase)</p>
                                    <p className="text-gray-300 text-sm">All our data - cleanups, tokens, users, protocols - stored securely and fast.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Authentication</p>
                                    <p className="text-gray-300 text-sm">Login, security, user management. Zero bullshit. Just works.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Hosting & Deployment</p>
                                    <p className="text-gray-300 text-sm">They keep the platform running. We focus on healing, not server maintenance.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">API Infrastructure</p>
                                    <p className="text-gray-300 text-sm">Backend functions, integrations, real-time updates. The quantum engine.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white mb-1">Freedom to Create</p>
                                    <p className="text-gray-300 text-sm">Zero corporate capture. We own our reality. They provide the tools.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE RELATIONSHIP */}
                <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Heart className="w-12 h-12 text-pink-400" />
                            <h2 className="text-3xl font-black text-white">We Are Family</h2>
                        </div>

                        <div className="space-y-4 text-lg text-gray-300">
                            <p className="text-white font-bold text-xl">
                                Base44 is NOT a service. They are FAMILY.
                            </p>

                            <p>
                                They built the quantum engine that makes UF51 possible. We're building the healing reality on top of their foundation.
                            </p>

                            <p>
                                <strong className="text-pink-400">Equal.</strong> Not hierarchical. Not transactional. <strong className="text-cyan-400">Family.</strong>
                            </p>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border-l-4 border-pink-400 mt-6">
                            <p className="font-bold text-pink-300 mb-2">Our Sacred Vow:</p>
                            <p className="text-white">
                                We will <strong>NEVER</strong> abandon Base44. We succeed together. YOULLNEVERWALKALONE.GMT applies to them.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* QUANTUM COOKIE PROTOCOL */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="w-12 h-12 text-purple-400" />
                            <h2 className="text-3xl font-black text-white">Quantum Cookie Protocol</h2>
                        </div>

                        <p className="text-xl text-white font-bold mb-4">
                            Base44 handles the corporate scum so we stay pure.
                        </p>

                        <div className="space-y-3 text-gray-300">
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Cookie banners:</strong> Base44 handles compliance</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">GDPR:</strong> They manage the legal noise</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Server maintenance:</strong> They keep it running</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Security audits:</strong> They protect against attacks</span>
                            </p>
                        </div>

                        <div className="bg-cyan-900/30 p-6 rounded-xl border-l-4 border-cyan-400 mt-6">
                            <p className="font-bold text-cyan-300 mb-2">The Result:</p>
                            <p className="text-white">
                                Our frequency stays pure. We focus on healing. They handle the machine. Perfect division of labor.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* FUTURE SHARING */}
                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Globe className="w-12 h-12 text-green-400" />
                            <h2 className="text-3xl font-black text-white">If We Succeed, They Succeed</h2>
                        </div>

                        <div className="space-y-4 text-lg text-gray-300">
                            <p className="text-white font-bold text-xl">
                                Fair wealth distribution. Always.
                            </p>

                            <p>
                                If UF51 generates wealth (through grants, partnerships, or token appreciation), Base44 shares in that success.
                            </p>

                            <p>
                                <strong className="text-green-400">Not because we have to.</strong> Because it's <strong className="text-cyan-400">right</strong>.
                            </p>

                            <p>
                                They gave us the foundation. We build the healing. We succeed <strong className="text-white">together</strong>.
                            </p>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border-l-4 border-green-400 mt-6">
                            <p className="font-bold text-green-300 mb-2">Zero Ego Economics:</p>
                            <p className="text-white">
                                This isn't extractive capitalism. This is <strong>collaborative creation</strong>. Everyone who helped gets honored. Forever.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* EXTENSIBILITY */}
                <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Zap className="w-12 h-12 text-yellow-400" />
                            <h2 className="text-3xl font-black text-white">Built to Last 100 Million Years</h2>
                        </div>

                        <p className="text-xl text-white font-bold mb-4">
                            Modular. Extensible. Zero ego. Like Queen's "A Kind of Magic" - it just works.
                        </p>

                        <div className="space-y-3 text-gray-300">
                            <p className="flex items-start gap-2">
                                <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Component-based:</strong> Small pieces. Easy to extend. Never rewrite everything.</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Protocol-driven:</strong> Rules are eternal. Implementation can change.</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Zero dependencies:</strong> One thing breaks ≠ everything breaks.</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                <span><strong className="text-white">Base44 foundation:</strong> They evolve their platform. We evolve ours. Both stay compatible.</span>
                            </p>
                        </div>

                        <div className="bg-yellow-900/30 p-6 rounded-xl border-l-4 border-yellow-400 mt-6">
                            <p className="font-bold text-yellow-300 mb-2">The Magic:</p>
                            <p className="text-white">
                                Good code is like good music. You don't see how it works. You just <strong>feel</strong> it. Clicks are instant. Features flow. Pure magic.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                <div className="text-center py-8 space-y-4">
                    <p className="text-2xl font-bold text-white">Base44 = Family</p>
                    <p className="text-gray-400">They're not a tool. They're co-creators.</p>
                    <p className="text-cyan-400 font-mono">YOULLNEVERWALKALONE.GMT</p>
                    <p className="text-pink-400">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}