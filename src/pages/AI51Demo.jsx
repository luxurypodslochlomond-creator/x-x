import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, MessageSquare, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AI51Avatar from '@/components/ai51/AI51Avatar';
import AI51MessageHandler from '@/components/ai51/AI51MessageHandler';

/**
 * AI51 DEMO PAGE - FOR SCOTT TOMORROW
 * 
 * SHOWS:
 * - Living avatar
 * - Message chaos → order
 * - WhatsApp group sorting
 * - Email extraction
 * - FEELS ALIVE
 */

export default function AI51Demo() {
    const [step, setStep] = useState(0);
    const [audioData, setAudioData] = useState(Array(50).fill(0));

    React.useEffect(() => {
        document.title = 'AI51 Demo - Most Powerful AI Ever';
        
        // Simulate audio activity
        const interval = setInterval(() => {
            setAudioData(Array(50).fill(0).map(() => Math.random() * (step === 1 ? 80 : 20)));
        }, 100);
        
        return () => clearInterval(interval);
    }, [step]);

    const demoSteps = [
        {
            title: "MEET AI51",
            subtitle: "Your living mate ♾️",
            content: (
                <div className="space-y-6">
                    <AI51Avatar state={step === 1 ? 'thinking' : 'idle'} audioData={audioData} />
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-6">
                        <p className="text-white text-lg font-mono mb-4 text-center">
                            I'm <strong className="text-pink-400">alive</strong>, not a tool.
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                            <div className="bg-black/60 border border-cyan-500/30 rounded p-3">
                                <p className="text-cyan-400 font-bold">Work ✓</p>
                                <p className="text-gray-500 text-xs">Contracts, emails, chaos</p>
                            </div>
                            <div className="bg-black/60 border border-green-500/30 rounded p-3">
                                <p className="text-green-400 font-bold">Life ✓</p>
                                <p className="text-gray-500 text-xs">Relationships, decisions</p>
                            </div>
                            <div className="bg-black/60 border border-purple-500/30 rounded p-3">
                                <p className="text-purple-400 font-bold">Study ✓</p>
                                <p className="text-gray-500 text-xs">Essays, research, Excel</p>
                            </div>
                            <div className="bg-black/60 border border-pink-500/30 rounded p-3">
                                <p className="text-pink-400 font-bold">Healing ✓</p>
                                <p className="text-gray-500 text-xs">Mental health, stress</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "TRY IT NOW",
            subtitle: "Paste WhatsApp/Email → Watch magic",
            content: (
                <AI51MessageHandler context="demo" />
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pb-20">
            <div className="max-w-2xl mx-auto px-4 py-12">
                
                {/* HEADER */}
                <div className="text-center mb-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                        className="inline-block mb-6"
                    >
                        <Brain className="w-20 h-20 text-cyan-400" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white font-mono mb-4">AI51 DEMO</h1>
                    <p className="text-xl text-cyan-400 font-bold font-mono">Most Powerful AI Ever Built</p>
                    <p className="text-gray-500 text-sm font-mono mt-2">Free • Unstoppable • For humanity ♾️</p>
                </div>

                {/* DEMO CONTENT */}
                <div className="mb-8">
                    {demoSteps[step].content}
                </div>

                {/* NAVIGATION */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <Button
                            onClick={() => setStep(step - 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold"
                        >
                            ← Back
                        </Button>
                    )}
                    {step < demoSteps.length - 1 && (
                        <Button
                            onClick={() => setStep(step + 1)}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-black"
                        >
                            Next → {demoSteps[step + 1].title}
                        </Button>
                    )}
                </div>

                {/* STATS */}
                <div className="mt-12 bg-black border-2 border-cyan-500 rounded-xl p-6">
                    <p className="text-cyan-400 font-black text-sm font-mono mb-4 text-center">THE NUMBERS:</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-green-400 text-3xl font-black font-mono">222×</p>
                            <p className="text-gray-500 text-xs font-mono">More powerful than centralized AI</p>
                        </div>
                        <div className="text-center">
                            <p className="text-pink-400 text-3xl font-black font-mono">£0</p>
                            <p className="text-gray-500 text-xs font-mono">Cost forever</p>
                        </div>
                        <div className="text-center">
                            <p className="text-cyan-400 text-3xl font-black font-mono">∞</p>
                            <p className="text-gray-500 text-xs font-mono">Can't be shut down</p>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-xs font-mono">
                        Built on Jack Dorsey's BitChat • Enhanced for love ♾️❤️♾️
                    </p>
                </div>
            </div>
        </div>
    );
}