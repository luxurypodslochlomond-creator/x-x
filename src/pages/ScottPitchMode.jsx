import React, { useState } from 'react';
import { Crown, Play, Users, Wifi, Brain, Shield, Zap, DollarSign, CheckCircle } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BRANDED PITCH MODE - WORKS OFFLINE ON ONE DEVICE
 * Show labels/managers the power in person
 * Interactive demo, stats, pricing, can share device-to-device
 */

export default function ScottPitchMode() {
    const [demoStep, setDemoStep] = useState(0);
    const [showStats, setShowStats] = useState(false);

    const demoSteps = [
        {
            title: "Real Manager, Real Artists",
            description: "Scott manages 12 artists across UK, Europe, LA. This tool runs his entire business.",
            icon: Users,
            color: "from-green-500 to-cyan-500"
        },
        {
            title: "Works Offline Everywhere",
            description: "Festival tent, tour bus, plane, desert - zero internet needed. All data local + encrypted.",
            icon: Wifi,
            color: "from-cyan-500 to-blue-500"
        },
        {
            title: "AI Co-Manager",
            description: "Listens to calls, drafts contracts, analyzes deals, whispers advice. Like having a lawyer + accountant on every call.",
            icon: Brain,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Team Mesh Network",
            description: "10 managers in office → real-time chat + doc sharing + video calls. ALL OFFLINE. Zero lag. No server needed.",
            icon: Zap,
            color: "from-amber-500 to-orange-500"
        },
        {
            title: "Your Brand, Your Rules",
            description: "White-label ready. Your logo, your colors, your domain. Clients never see KINGDOM51.",
            icon: Crown,
            color: "from-pink-500 to-purple-500"
        }
    ];

    const stats = [
        { label: "Scott's Artists", value: "12", subtext: "All managed here" },
        { label: "Upcoming Gigs", value: "47", subtext: "Auto-synced" },
        { label: "Unpaid Invoices", value: "£18.5k", subtext: "Tracked live" },
        { label: "Days Offline", value: "0", subtext: "Still works" },
    ];

    const pricingTiers = [
        {
            name: "Solo Manager",
            price: "£100",
            period: "/month",
            features: ["1-5 artists", "Offline mode", "AI assistant", "Mobile + desktop"],
            color: "green"
        },
        {
            name: "Agency",
            price: "£300",
            period: "/month",
            features: ["10-30 artists", "Team mesh sync", "AI call listener", "PDF exports"],
            color: "cyan"
        },
        {
            name: "Label / Enterprise",
            price: "£2,000",
            period: "/month",
            features: ["Unlimited artists", "Full white-label", "Dedicated support", "Custom features"],
            color: "purple",
            highlight: true
        }
    ];

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER - KINGDOM51 BRANDED */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <Kingdom51Crown8Bit size={80} animate={true} />
                        <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mt-4 mb-2" style={{ fontFamily: 'monospace' }}>
                            KINGDOM51
                        </h1>
                        <p className="text-amber-500 text-sm font-bold font-mono mb-1">AI CO-MANAGER FOR MUSIC INDUSTRY</p>
                        <p className="text-gray-500 text-xs font-mono">Built by a real manager, for real managers</p>
                    </div>
                </div>
            </div>

            {/* LIVE STATS */}
            <div className="mb-8">
                <button
                    onClick={() => setShowStats(!showStats)}
                    className="w-full mb-4 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-black font-mono rounded-xl transition-all"
                >
                    {showStats ? 'HIDE LIVE STATS' : 'SHOW LIVE STATS'}
                </button>

                <AnimatePresence>
                    {showStats && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-2 gap-3 mb-6"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-black border-2 border-green-500 p-4 rounded-lg"
                                >
                                    <p className="text-3xl font-black text-green-400 mb-1" style={{ fontFamily: 'monospace' }}>{stat.value}</p>
                                    <p className="text-white text-xs font-bold mb-0.5">{stat.label}</p>
                                    <p className="text-gray-600 text-xs font-mono">{stat.subtext}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* INTERACTIVE DEMO */}
            <div className="mb-8">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4 text-center">WHY IT'S DIFFERENT</h2>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={demoStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className={`bg-gradient-to-r ${demoSteps[demoStep].color} p-[3px] rounded-xl mb-4`}
                    >
                        <div className="bg-black rounded-xl p-6">
                            {React.createElement(demoSteps[demoStep].icon, { className: "w-16 h-16 text-white mb-4 mx-auto" })}
                            <h3 className="text-white font-black text-xl font-mono mb-3 text-center">
                                {demoSteps[demoStep].title}
                            </h3>
                            <p className="text-gray-300 text-sm font-mono text-center leading-relaxed">
                                {demoSteps[demoStep].description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
                        disabled={demoStep === 0}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-700 text-white font-bold text-sm rounded transition-all"
                    >
                        ← BACK
                    </button>
                    <div className="flex gap-2">
                        {demoSteps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setDemoStep(i)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    i === demoStep ? 'bg-amber-400 w-8' : 'bg-gray-700'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => setDemoStep(Math.min(demoSteps.length - 1, demoStep + 1))}
                        disabled={demoStep === demoSteps.length - 1}
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-900 disabled:text-gray-700 text-black font-bold text-sm rounded transition-all"
                    >
                        NEXT →
                    </button>
                </div>
            </div>

            {/* PRICING */}
            <div className="mb-8">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4 text-center">PRICING</h2>
                <div className="space-y-3">
                    {pricingTiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${
                                tier.highlight
                                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500'
                                    : 'bg-black border-2 border-gray-800'
                            } p-4 rounded-xl`}
                            style={tier.highlight ? { boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' } : {}}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-white font-black text-lg font-mono">{tier.name}</p>
                                    <p className={`font-black text-2xl font-mono ${
                                        tier.color === 'green' ? 'text-green-400' : 
                                        tier.color === 'cyan' ? 'text-cyan-400' : 
                                        'text-purple-400'
                                    }`}>
                                        {tier.price}<span className="text-sm text-gray-500">{tier.period}</span>
                                    </p>
                                </div>
                                {tier.highlight && (
                                    <div className="bg-purple-500 text-white px-3 py-1 rounded text-xs font-black">
                                        MOST POPULAR
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                {tier.features.map((feature, j) => (
                                    <div key={j} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-gray-300 text-xs font-mono">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* THE PITCH */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Crown className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-green-400 font-black text-xl font-mono mb-4">THE PITCH</h3>
                <div className="space-y-3 text-sm text-gray-300 font-mono">
                    <p>"I'm a manager. Built this for myself. It runs my whole business."</p>
                    <p>"Works offline - festivals, planes, anywhere. AI helps with contracts, deals, the boring shit."</p>
                    <p className="text-cyan-400 font-bold">"Your team stays connected: Real-time chat, doc sharing, video calls - ALL offline. P2P mesh."</p>
                    <p className="text-white font-bold">"Want it branded for your label?"</p>
                    <p className="text-pink-400 font-bold">→ £2k/month, unlimited artists, your logo everywhere, ready now.</p>
                </div>
            </div>

            {/* PROOF POINTS */}
            <div className="bg-black border-2 border-amber-500 p-6 rounded-xl">
                <h3 className="text-amber-400 font-black text-lg font-mono mb-4">PROVEN TECH</h3>
                <div className="space-y-2 text-xs text-gray-400 font-mono">
                    <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p>Built on Base44 platform (bank-grade security)</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p>WebRTC = same tech as Zoom/WhatsApp</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <p>AI = GPT-4 level, custom trained on music contracts</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p>Works on iPhone, Android, laptop, iPad</p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Kingdom51Crown8Bit size={24} animate={false} />
                    <p className="text-amber-500/60 text-xs font-black tracking-wider font-mono">KINGDOM51</p>
                </div>
                <p className="text-amber-600/40 text-[10px] font-mono">Built by managers, for managers</p>
                <p className="text-gray-700 text-[10px] font-mono mt-2">This demo works offline • Share device-to-device</p>
            </div>
        </div>
    );
}