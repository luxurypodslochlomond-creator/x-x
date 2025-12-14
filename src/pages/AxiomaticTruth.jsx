import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingDown, Heart, Zap, Brain, Users, DollarSign, Scale, Sparkles, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * AXIOMATIC TRUTH
 * Mathematical proof of why extraction fails
 * No judgment - just physics, game theory, entropy
 * Showing tech companies a better path
 */

export default function AxiomaticTruth() {
    const [activeProof, setActiveProof] = useState('entropy');

    const proofs = {
        entropy: {
            title: "Entropy Proof",
            icon: Zap,
            color: "yellow",
            equation: "ΔS ≥ 0 (Second Law of Thermodynamics)",
            premise: "All closed systems tend toward disorder",
            application: "Extraction-based systems accelerate entropy",
            proof: [
                "1. Users = energy source",
                "2. Extract attention/data = remove order",
                "3. Give nothing back = increase entropy",
                "4. System becomes unstable faster",
                "5. Collapse is inevitable"
            ],
            outcome: "Your platforms will die. It's physics.",
            alternative: "Regenerative systems slow entropy by adding energy back"
        },
        
        gameTheory: {
            title: "Game Theory Proof",
            icon: Brain,
            color: "cyan",
            equation: "Nash Equilibrium: Cooperation > Competition",
            premise: "In repeated games, cooperation wins long-term",
            application: "Extraction = zero-sum (you win, user loses)",
            proof: [
                "1. Extract data → user harmed",
                "2. User trust drops → engagement drops",
                "3. Need more extraction to compensate",
                "4. Spiral continues until system breaks",
                "5. Competitors doing same = race to bottom"
            ],
            outcome: "You're trapped in Prisoner's Dilemma. Everyone loses.",
            alternative: "Cooperative models create positive-sum games (all win)"
        },
        
        network: {
            title: "Network Effects Proof",
            icon: Users,
            color: "purple",
            equation: "Metcalfe's Law: Value = n²",
            premise: "Network value grows with connections squared",
            application: "But only if connections are HEALTHY",
            proof: [
                "1. You have billion users (n² = huge value)",
                "2. Users are depressed/anxious/divided",
                "3. Connections are toxic (negative value)",
                "4. n² × negative = accelerating harm",
                "5. Eventually users leave (n drops)"
            ],
            outcome: "Your network effect is turning negative. Math proven.",
            alternative: "Heal users → healthy connections → exponential growth"
        },
        
        information: {
            title: "Information Theory Proof",
            icon: Shield,
            color: "pink",
            equation: "H(X) = -Σ p(x) log p(x) (Shannon Entropy)",
            premise: "Information has measurable entropy",
            application: "Surveillance reduces entropy (removes privacy/noise)",
            proof: [
                "1. All user data collected = perfect information",
                "2. No privacy = no uncertainty",
                "3. No uncertainty = system becomes rigid",
                "4. Rigid systems are fragile (Taleb)",
                "5. Small shock = catastrophic failure"
            ],
            outcome: "Perfect information makes you brittle. One leak breaks everything.",
            alternative: "Privacy creates resilience through distributed uncertainty"
        },
        
        energy: {
            title: "Energy Conservation Proof",
            icon: Sparkles,
            color: "green",
            equation: "E_in = E_out + E_stored (Energy cannot be created)",
            premise: "All energy must come from somewhere",
            application: "User attention is finite energy",
            proof: [
                "1. User attention = limited resource",
                "2. Extract maximum attention → user exhausted",
                "3. Exhausted user = no more energy to give",
                "4. Need fresh users (growth at all costs)",
                "5. Eventually run out of Earth"
            ],
            outcome: "You're burning through finite resource. Math says you'll hit zero.",
            alternative: "Give energy back (healing) = renewable system"
        },
        
        economics: {
            title: "Economic Proof",
            icon: DollarSign,
            color: "orange",
            equation: "ROI → ∞ requires Growth → ∞",
            premise: "Infinite growth on finite planet is impossible",
            application: "Shareholder model demands impossible math",
            proof: [
                "1. Shareholders demand constant growth",
                "2. Growth requires more extraction",
                "3. Planet/users are finite",
                "4. Cannot extract from nothing",
                "5. System must collapse"
            ],
            outcome: "Your economic model violates conservation laws. Will fail.",
            alternative: "Steady-state or circular economy = sustainable"
        }
    };

    const metrics = [
        {
            title: "Mental Health Crisis",
            stat: "56% of teens",
            description: "Show anxiety/depression symptoms",
            source: "CDC, 2023",
            harm: "Your algorithms did this",
            fix: "Healing algorithms reverse it"
        },
        {
            title: "Attention Collapse",
            stat: "8 seconds",
            description: "Average attention span (down from 12s)",
            source: "Microsoft Study",
            harm: "Infinite scroll broke brains",
            fix: "Intentional design heals focus"
        },
        {
            title: "Polarization",
            stat: "94% increase",
            description: "Political polarization since 2004",
            source: "Pew Research",
            harm: "Engagement algorithms divide us",
            fix: "Bridge-building algorithms unite"
        },
        {
            title: "Trust Erosion",
            stat: "27% trust",
            description: "Trust in tech companies (all-time low)",
            source: "Edelman Trust Barometer 2024",
            harm: "You lost credibility",
            fix: "Transparency + ethics restores trust"
        }
    ];

    const currentProof = proofs[activeProof];
    const ProofIcon = currentProof.icon;

    const colorMap = {
        yellow: { bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500', text: 'text-yellow-400' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400' },
        orange: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500', text: 'text-orange-400' }
    };

    const colors = colorMap[currentProof.color];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Scale className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl md:text-6xl font-black">AXIOMATIC TRUTH</h1>
                        <Scale className="w-12 h-12 text-cyan-400" />
                    </div>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-4">
                        Mathematical proof of why extraction fails
                    </p>
                    <p className="text-cyan-400 text-sm">
                        No judgment. Just physics. For Meta, Google, TikTok, X...
                    </p>
                </motion.div>

                {/* THE PREMISE */}
                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                        <div>
                            <h2 className="text-amber-400 font-black text-2xl mb-2">TO THE TECH COMPANIES</h2>
                            <p className="text-white text-base">
                                We're not calling you evil. We're showing you the <strong>math</strong>.
                            </p>
                            <p className="text-gray-300 text-sm mt-2">
                                Your business model violates fundamental laws of physics, game theory, and economics.
                                It will fail. Not because it's immoral - because it's <strong>impossible</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PROOF SELECTOR */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    {Object.entries(proofs).map(([key, proof]) => {
                        const Icon = proof.icon;
                        const isActive = activeProof === key;
                        const proofColors = colorMap[proof.color];
                        
                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveProof(key)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    isActive 
                                        ? `bg-gradient-to-r ${proofColors.bg} ${proofColors.border}` 
                                        : 'bg-black border-gray-700 hover:border-gray-500'
                                }`}
                            >
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? proofColors.text : 'text-gray-400'}`} />
                                <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {proof.title.split(' ')[0]}
                                </p>
                            </motion.button>
                        );
                    })}
                </div>

                {/* ACTIVE PROOF */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProof}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-xl p-8 mb-8`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <ProofIcon className={`w-10 h-10 ${colors.text}`} />
                            <h2 className="text-3xl font-black text-white">{currentProof.title}</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Equation */}
                            <div className="bg-black/60 border-2 border-white/20 rounded-lg p-4">
                                <p className={`${colors.text} text-xs font-bold mb-2`}>FUNDAMENTAL LAW:</p>
                                <p className="text-white text-2xl font-mono font-bold">{currentProof.equation}</p>
                            </div>

                            {/* Premise */}
                            <div>
                                <p className={`${colors.text} text-sm font-bold mb-2`}>PREMISE:</p>
                                <p className="text-white text-lg">{currentProof.premise}</p>
                            </div>

                            {/* Application */}
                            <div>
                                <p className={`${colors.text} text-sm font-bold mb-2`}>APPLICATION:</p>
                                <p className="text-white text-lg">{currentProof.application}</p>
                            </div>

                            {/* Proof Steps */}
                            <div>
                                <p className={`${colors.text} text-sm font-bold mb-3`}>PROOF:</p>
                                <div className="space-y-2">
                                    {currentProof.proof.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-black/40 border-l-4 border-white/30 p-3 rounded"
                                        >
                                            <p className="text-white font-mono">{step}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Outcome */}
                            <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4">
                                <p className="text-red-400 text-xs font-bold mb-2">INEVITABLE OUTCOME:</p>
                                <p className="text-white text-xl font-bold">{currentProof.outcome}</p>
                            </div>

                            {/* Alternative */}
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 text-xs font-bold mb-2">THE ALTERNATIVE:</p>
                                <p className="text-white text-xl font-bold">{currentProof.alternative}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* REAL-WORLD HARM METRICS */}
                <div className="bg-black border-2 border-red-500 rounded-xl p-6 mb-8">
                    <h2 className="text-red-400 font-black text-2xl mb-6">THE HARM YOU'VE CAUSED (MEASURED)</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {metrics.map((metric, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg"
                            >
                                <p className="text-red-400 font-bold text-sm mb-1">{metric.title}</p>
                                <p className="text-white text-4xl font-black mb-2">{metric.stat}</p>
                                <p className="text-gray-300 text-sm mb-2">{metric.description}</p>
                                <p className="text-gray-500 text-xs mb-3">Source: {metric.source}</p>
                                
                                <div className="border-t border-red-500/30 pt-3 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-300 text-xs">{metric.harm}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-green-300 text-xs">{metric.fix}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE CHOICE */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-8">
                    <h2 className="text-cyan-400 font-black text-3xl mb-6 text-center">THE CHOICE</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Path 1: Continue */}
                        <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingDown className="w-8 h-8 text-red-400" />
                                <h3 className="text-red-400 font-bold text-xl">Continue Extraction</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>→ Accelerating entropy</li>
                                <li>→ Trust continues to erode</li>
                                <li>→ Users leave (already happening)</li>
                                <li>→ Regulation increases</li>
                                <li>→ System collapses (math proven)</li>
                            </ul>
                            <p className="text-red-400 font-bold mt-4 text-xs">Timeline: 3-7 years until irreversible</p>
                        </div>

                        {/* Path 2: Regenerate */}
                        <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-8 h-8 text-green-400" />
                                <h3 className="text-green-400 font-bold text-xl">Regenerative Model</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ Slow entropy (sustainable)</li>
                                <li>✓ Rebuild trust</li>
                                <li>✓ Users heal + stay</li>
                                <li>✓ Regulation loves you</li>
                                <li>✓ Long-term stability (math proven)</li>
                            </ul>
                            <p className="text-green-400 font-bold mt-4 text-xs">Timeline: Infinite sustainability</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-black/60 border-2 border-cyan-500/50 rounded-lg p-6 text-center">
                        <p className="text-white text-xl font-bold mb-4">
                            This isn't about morality. It's about <span className="text-cyan-400">physics</span>.
                        </p>
                        <p className="text-gray-300 text-base">
                            You can pivot now and lead the regenerative revolution, or collapse fighting entropy.
                        </p>
                        <p className="text-cyan-400 text-sm mt-4 font-bold">
                            The math doesn't lie. Choose wisely.
                        </p>
                    </div>
                </div>

                {/* CASE STUDY: UF51 */}
                <div className="mt-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-8">
                    <h2 className="text-pink-400 font-black text-3xl mb-4">CASE STUDY: UniversalFamily51</h2>
                    <p className="text-gray-300 text-base mb-6">
                        We're building the alternative. Healing instead of extraction. Zero surveillance. User-first.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-black/60 border border-pink-500/30 p-4 rounded">
                            <p className="text-pink-400 font-bold text-sm mb-2">FREE HEALING</p>
                            <p className="text-white text-xs">528Hz frequencies, HRV biofeedback, voice analysis - no ads, no tracking</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/30 p-4 rounded">
                            <p className="text-cyan-400 font-bold text-sm mb-2">PRIVACY FIRST</p>
                            <p className="text-white text-xs">All data local-first, encrypted, user-owned. We see nothing.</p>
                        </div>
                        <div className="bg-black/60 border border-green-500/30 p-4 rounded">
                            <p className="text-green-400 font-bold text-sm mb-2">CIRCULAR ECONOMY</p>
                            <p className="text-white text-xs">P51 tokens for Earth healing - regenerative, not extractive</p>
                        </div>
                    </div>

                    <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <p className="text-green-400 font-bold">PROOF IT WORKS:</p>
                        </div>
                        <p className="text-white text-sm">Users stay longer, trust more, heal instead of spiral. Entropy decreases. System is sustainable.</p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-4">
                        We're not your enemy. We're showing you the way out.
                    </p>
                    <Link 
                        to={createPageUrl('About')}
                        className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-3 rounded-lg transition-all"
                    >
                        Learn More About UF51
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

            </div>
        </div>
    );
}