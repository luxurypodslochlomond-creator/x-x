import React, { useState } from 'react';
import { Music, Shield, Heart, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CASUAL DEMO FOR SHOWING MATES
 * Scott can tap through in pub/studio - shows how YOUR label would look
 * Numbers prove it works, not surveillance vibes
 * Security = protection, frequencies = validation
 */

export default function ScottCasualDemo() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [labelName, setLabelName] = useState('');

    const demoSteps = [
        {
            title: "Your Label Name?",
            subtitle: "Just type it mate",
            input: true
        },
        {
            title: `${labelName || 'Your Label'} Dashboard`,
            subtitle: "What you'd see daily",
            stats: [
                { label: "Artists", value: "23", icon: Users, color: "cyan" },
                { label: "Active Tours", value: "4", icon: Music, color: "pink" },
                { label: "Artists Keep", value: "90%", icon: DollarSign, color: "green" },
                { label: "You Extract", value: "0%", icon: Heart, color: "amber" }
            ]
        },
        {
            title: "Artist Success Metrics",
            subtitle: "Not surveillance - just proof it works",
            metrics: [
                { label: "Average artist earnings up", value: "+47%", trend: "up" },
                { label: "Tour coordination time", value: "-65%", trend: "down" },
                { label: "Contract disputes", value: "0", trend: "stable" },
                { label: "Artist retention", value: "96%", trend: "up" }
            ]
        },
        {
            title: "Security = Protection",
            subtitle: "We protect your artists from quantum hackers",
            features: [
                { icon: Shield, label: "Quantum-resistant crypto", status: "Building now" },
                { icon: Zap, label: "Works offline (van/shed/festival)", status: "Live" },
                { icon: Heart, label: "Love frequency validation", status: "Q1 2026" }
            ]
        },
        {
            title: "Ready to Go",
            subtitle: "Your branded version in 48 hours",
            cta: true
        }
    ];

    const currentStep = demoSteps[step];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg py-4 rounded-xl transition-all mb-4"
                style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
            >
                TAP TO SEE YOUR VERSION
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black border-4 border-purple-500 rounded-xl p-6 max-w-md w-full"
                            style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)' }}
                        >
                            {/* Progress dots */}
                            <div className="flex justify-center gap-2 mb-6">
                                {demoSteps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            i === step ? 'bg-purple-400 w-6' : i < step ? 'bg-purple-600' : 'bg-gray-800'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Step content */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-black text-purple-400 mb-2 font-mono">
                                    {currentStep.title}
                                </h2>
                                <p className="text-gray-400 text-sm font-mono">{currentStep.subtitle}</p>
                            </div>

                            {/* Input step */}
                            {currentStep.input && (
                                <input
                                    type="text"
                                    placeholder="e.g. Big Label Records"
                                    value={labelName}
                                    onChange={(e) => setLabelName(e.target.value)}
                                    className="w-full bg-black border-2 border-purple-500 text-white p-4 rounded-lg mb-4 font-mono text-lg focus:border-pink-500 transition-colors"
                                    autoFocus
                                />
                            )}

                            {/* Stats grid */}
                            {currentStep.stats && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {currentStep.stats.map((stat, i) => (
                                        <div key={i} className={`bg-black border-2 border-${stat.color}-500 p-4 rounded-lg text-center`}>
                                            <stat.icon className={`w-6 h-6 text-${stat.color}-400 mx-auto mb-2`} />
                                            <p className={`text-3xl font-black text-${stat.color}-400 mb-1`}>{stat.value}</p>
                                            <p className="text-xs text-gray-500 font-mono">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Metrics */}
                            {currentStep.metrics && (
                                <div className="space-y-3 mb-4">
                                    {currentStep.metrics.map((metric, i) => (
                                        <div key={i} className="bg-black border border-gray-800 p-3 rounded-lg flex items-center justify-between">
                                            <p className="text-white text-sm font-mono">{metric.label}</p>
                                            <div className="flex items-center gap-2">
                                                <p className={`text-xl font-black ${
                                                    metric.trend === 'up' ? 'text-green-400' :
                                                    metric.trend === 'down' ? 'text-cyan-400' :
                                                    'text-gray-400'
                                                } font-mono`}>
                                                    {metric.value}
                                                </p>
                                                {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Features */}
                            {currentStep.features && (
                                <div className="space-y-3 mb-4">
                                    {currentStep.features.map((feature, i) => (
                                        <div key={i} className="bg-black border border-purple-500/30 p-3 rounded-lg flex items-center gap-3">
                                            <feature.icon className="w-6 h-6 text-purple-400" />
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-bold font-mono">{feature.label}</p>
                                                <p className="text-gray-500 text-xs font-mono">{feature.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA */}
                            {currentStep.cta && (
                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded-lg mb-4">
                                    <p className="text-green-400 font-bold text-sm mb-2 font-mono">
                                        {labelName || 'Your Label'} → READY IN 48 HOURS
                                    </p>
                                    <p className="text-white text-xs font-mono mb-3">
                                        Your domain • Your branding • Your artists • Zero extraction
                                    </p>
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="text-gray-400">Cost:</span>
                                        <span className="text-cyan-400 font-bold">£2,000/month</span>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex gap-3">
                                {step > 0 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all font-mono"
                                    >
                                        BACK
                                    </button>
                                )}
                                {step < demoSteps.length - 1 ? (
                                    <button
                                        onClick={() => {
                                            if (step === 0 && !labelName) return;
                                            setStep(step + 1);
                                        }}
                                        disabled={step === 0 && !labelName}
                                        className={`flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all font-mono ${
                                            step === 0 && !labelName ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        NEXT
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setStep(0);
                                            setLabelName('');
                                        }}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all font-mono"
                                    >
                                        SOUND MATE
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}