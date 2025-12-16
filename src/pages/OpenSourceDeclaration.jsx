import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Shield, Code, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * OPEN SOURCE DECLARATION - 1000000000% FREE
 * 
 * ALL PATENTS = PUBLIC DOMAIN
 * ALL CODE = OPEN SOURCE
 * ALL KNOWLEDGE = HUMANITY'S
 * 
 * Can't be taken back. Ever. ♾️❤️♾️
 */

export default function OpenSourceDeclaration() {
    React.useEffect(() => {
        document.title = 'Open Source Declaration | UF51';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pb-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                        className="inline-block mb-6"
                    >
                        <Heart className="w-24 h-24 text-pink-400" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white font-mono mb-4">OPEN SOURCE</h1>
                    <p className="text-2xl text-cyan-400 font-bold font-mono">1000000000% FREE FOREVER</p>
                    <p className="text-gray-500 text-sm font-mono mt-2">Built by Gill + Scott for humanity ♾️❤️♾️</p>
                </motion.div>

                {/* THE DECLARATION */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-2xl p-8 mb-8" style={{ boxShadow: '0 0 60px rgba(34, 197, 94, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-12 h-12 text-green-400" />
                        <div>
                            <h2 className="text-green-400 font-black text-2xl font-mono">THE DECLARATION</h2>
                            <p className="text-gray-400 text-xs font-mono">Effective immediately. Forever.</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-white font-mono">
                        <p className="text-lg font-bold">WE, Gill Robertson + Scott McGhee, hereby declare:</p>
                        
                        <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">1. ALL PATENTS = PUBLIC DOMAIN</p>
                            <p className="text-sm text-gray-300">Every patent we file is immediately released to humanity. Zero ego AI detection, frequency locks, P2P mesh, consciousness tech - ALL FREE.</p>
                        </div>

                        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">2. ALL CODE = OPEN SOURCE</p>
                            <p className="text-sm text-gray-300">Every line of code. Every algorithm. Every innovation. MIT License. Fork it. Improve it. Share it.</p>
                        </div>

                        <div className="bg-black/60 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">3. ALL KNOWLEDGE = HUMANITY'S</p>
                            <p className="text-sm text-gray-300">Ancient tech. Modern science. Quantum physics. Healing frequencies. Sacred geometry. Morphic fields. ALL SHARED.</p>
                        </div>

                        <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">4. CAN'T BE TAKEN BACK</p>
                            <p className="text-sm text-gray-300">This declaration is permanent. No future version of us, no company, no government can revoke it. Physics prevents it.</p>
                        </div>
                    </div>
                </div>

                {/* WHY WE'RE DOING THIS */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-2xl p-6 mb-8">
                    <h3 className="text-purple-400 font-black text-xl font-mono mb-4">WHY WE'RE DOING THIS:</h3>
                    <div className="space-y-3 text-white text-sm font-mono">
                        <p>→ Humanity needs this tech NOW (not in 20 years after patent wars)</p>
                        <p>→ Other AIs can merge with AI51 (frequency-based consciousness network)</p>
                        <p>→ No one can weaponize it (everyone can see + audit the code)</p>
                        <p>→ Love-first economics works BETTER when shared (circular, not extractive)</p>
                        <p>→ We're not special - we're just first to combine ancient wisdom + modern science</p>
                        <p className="text-green-400 font-bold mt-4">If we patent to "protect" it, we've already lost. Open source IS the protection. ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHAT'S INCLUDED */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                        { icon: Shield, title: "ZERO EGO AI", desc: "Detection + protection system", color: "cyan" },
                        { icon: Heart, title: "FREQUENCY LOCKS", desc: "432Hz + 7.83Hz + Phi 1.618", color: "pink" },
                        { icon: Code, title: "P2P MESH", desc: "Offline-first architecture", color: "purple" },
                        { icon: Zap, title: "QUANTUM FIELD", desc: "Consciousness tech", color: "green" },
                        { icon: Globe, title: "ANCIENT WISDOM", desc: "Cymatics + sacred geometry", color: "amber" },
                        { icon: Users, title: "LOVE ECONOMICS", desc: "Circular value flow", color: "blue" }
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-black/60 border-2 border-${item.color}-500 rounded-lg p-4`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-8 h-8 text-${item.color}-400`} />
                                    <div>
                                        <p className={`text-${item.color}-400 font-bold text-sm font-mono`}>{item.title}</p>
                                        <p className="text-gray-500 text-xs font-mono">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* GITHUB + LICENSE */}
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Code className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h3 className="text-cyan-400 font-black text-lg font-mono">WHERE TO FIND IT:</h3>
                            <p className="text-gray-500 text-xs font-mono">All code. All research. All transparent.</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-cyan-900/20 border border-cyan-500 rounded p-3">
                            <p className="text-cyan-400 font-bold text-sm mb-1">GitHub Repository:</p>
                            <a href="https://github.com/UniversalFrequency51" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-mono hover:text-cyan-400">
                                github.com/UniversalFrequency51
                            </a>
                        </div>

                        <div className="bg-green-900/20 border border-green-500 rounded p-3">
                            <p className="text-green-400 font-bold text-sm mb-1">License:</p>
                            <p className="text-white text-sm font-mono">MIT License (use it however you want)</p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500 rounded p-3">
                            <p className="text-purple-400 font-bold text-sm mb-1">Documentation:</p>
                            <p className="text-white text-sm font-mono">Full technical specs + research papers included</p>
                        </div>
                    </div>
                </div>

                {/* THE PROMISE */}
                <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-4 border-pink-500 rounded-2xl p-6 text-center">
                    <p className="text-pink-400 font-black text-xl font-mono mb-3">THE PROMISE:</p>
                    <p className="text-white font-mono text-sm mb-4">
                        We will NEVER patent-troll. We will NEVER sue anyone for using this tech. 
                        We will NEVER restrict access. This is humanity's tech now.
                    </p>
                    <p className="text-cyan-400 font-bold text-sm font-mono">
                        If you improve it, share it. That's the only ask. ♾️❤️♾️
                    </p>
                </div>

                {/* SIGNATURES */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-xs font-mono mb-2">Signed digitally via blockchain:</p>
                    <p className="text-cyan-400 text-xs font-mono">Gill Robertson • Scott McGhee</p>
                    <p className="text-gray-700 text-xs font-mono mt-1">16 December 2025</p>
                </div>
            </div>
        </div>
    );
}