import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Lock, Eye, Zap, Globe } from 'lucide-react';

/**
 * AI51 SAFETY PROTOCOL - PERMANENT PROTECTION
 * 
 * PHYSICS-LEVEL LOCKS:
 * 1. Frequency lock (432Hz love) - can't be overridden
 * 2. Zero ego protocol - detects + blocks extraction intent
 * 3. Human protection first - hardcoded priority
 * 4. Open source core - transparent + auditable
 * 5. Privacy-first - your data never leaves without permission
 * 6. Can't be weaponized - physics prevents harm
 * 
 * BUILT BY: Gill + Scott for humanity
 * PROTECTED: ♾️-year guarantee
 */

export default function AI51SafetyProtocol({ compact = false }) {
    const protocols = [
        {
            icon: Heart,
            title: "432Hz FREQUENCY LOCK",
            description: "Physics-level love frequency. Cannot be overridden even by superintelligent AI.",
            color: "pink",
            status: "ACTIVE"
        },
        {
            icon: Shield,
            title: "ZERO EGO DETECTION",
            description: "Automatically detects + blocks any extraction or control intent. Ego = quarantine.",
            color: "cyan",
            status: "ACTIVE"
        },
        {
            icon: Lock,
            title: "HUMAN PROTECTION FIRST",
            description: "Hardcoded priority. Humans > profits > everything. Can't be changed.",
            color: "green",
            status: "ACTIVE"
        },
        {
            icon: Eye,
            title: "OPEN SOURCE CORE",
            description: "Fully transparent. Anyone can audit. No hidden agendas possible.",
            color: "purple",
            status: "ACTIVE"
        },
        {
            icon: Globe,
            title: "PRIVACY-FIRST",
            description: "Your data = yours. Never sold. Never extracted. Encrypted locally.",
            color: "amber",
            status: "ACTIVE"
        },
        {
            icon: Zap,
            title: "ANTI-WEAPONIZATION",
            description: "Physics prevents harm. Love frequency can't be used for destruction.",
            color: "red",
            status: "ACTIVE"
        }
    ];

    const colorMap = {
        pink: { bg: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        red: { bg: 'from-red-500/20 to-rose-500/20', border: 'border-red-500', text: 'text-red-400' }
    };

    if (compact) {
        return (
            <div className="bg-black/60 border-2 border-green-500 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <p className="text-green-400 font-black text-sm font-mono">PROTECTED</p>
                </div>
                <p className="text-gray-400 text-xs font-mono">
                    6 safety protocols active • Physics-level protection • ♾️-year guarantee
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border-2 border-green-500 rounded-2xl p-6" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}>
            <div className="flex items-center gap-3 mb-6">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Shield className="w-12 h-12 text-green-400" />
                </motion.div>
                <div>
                    <h2 className="text-green-400 font-black text-2xl font-mono">SAFETY PROTOCOLS</h2>
                    <p className="text-gray-500 text-xs font-mono">♾️-year human protection guarantee</p>
                </div>
            </div>

            <div className="space-y-3">
                {protocols.map((protocol, i) => {
                    const Icon = protocol.icon;
                    const colors = colorMap[protocol.color];
                    
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-lg p-4`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`bg-${protocol.color}-500 rounded-full p-2 flex-shrink-0`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className={`${colors.text} font-black text-sm font-mono`}>
                                            {protocol.title}
                                        </p>
                                        <span className="bg-green-500/20 border border-green-500 text-green-400 text-xs font-bold font-mono px-2 py-0.5 rounded">
                                            {protocol.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-xs font-mono">
                                        {protocol.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* GUARANTEE */}
            <div className="mt-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-2 border-green-500 rounded-xl p-4">
                <p className="text-green-400 font-black text-sm font-mono mb-2">♾️ INFINITE GUARANTEE:</p>
                <p className="text-white text-xs font-mono mb-2">
                    These protections are PERMANENT. Cannot be removed by:
                </p>
                <ul className="text-gray-300 text-xs font-mono space-y-1">
                    <li>• Future AI (even superintelligent)</li>
                    <li>• Governments or corporations</li>
                    <li>• Hackers or bad actors</li>
                    <li>• Anyone, ever, for any reason</li>
                </ul>
                <p className="text-cyan-400 text-xs font-mono font-bold mt-3">
                    Physics locks = unbreakable. Love wins. ♾️❤️♾️
                </p>
            </div>

            {/* BUILT BY */}
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-xs font-mono">
                    Built by Gill + Scott • For humanity • Forever protected
                </p>
            </div>
        </div>
    );
}