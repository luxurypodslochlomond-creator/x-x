import React, { useState, lazy, Suspense } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

// Lazy load heavy components
const AnimalFrequencyEngine = lazy(() => import('@/components/petsounds/AnimalFrequencyEngine'));
const AI51PetAnalysis = lazy(() => import('@/components/petsounds/AI51PetAnalysis'));
const UniversalPayment = lazy(() => import('@/components/petsounds/UniversalPayment'));
const AI51CustomProtocol = lazy(() => import('@/components/petsounds/AI51CustomProtocol'));

/**
 * PETSOUNDS51 - HEALING FREQUENCIES FOR ALL ANIMALS
 * Same proven tech as UF51, optimized for animal consciousness
 * 
 * MARKET: $427B by 2032 (currently $273B)
 * PROBLEM: £1,000-3,000/year in vet bills, no affordable prevention
 * SOLUTION: Species-specific healing frequencies, one-time purchase
 */

export default function PetSounds51() {
    const [showAbout, setShowAbout] = useState(false);
    const [activeView, setActiveView] = useState('home'); // home, playing
    const [selectedProtocol, setSelectedProtocol] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white p-3 sm:p-4">
            
            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <PetSounds51Icon8Bit size={48} animate={false} />
                    <h1 className="text-2xl sm:text-3xl font-black text-cyan-400">PETSOUNDS51</h1>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4">Healing frequencies for all animals. Free forever. Works offline.</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <a href="/PetSounds51Terms" className="text-xs text-gray-600 hover:text-cyan-400">Terms</a>
                    <span className="text-gray-800">•</span>
                    <a href="/PrivacyPolicy" className="text-xs text-gray-600 hover:text-cyan-400">Privacy</a>
                </div>
            </div>



            {/* PROTOCOLS */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: "Fireworks Anxiety", hz: "40 Hz", desc: "calm during loud noises", color: "#ec4899", protocol: "fireworks" },
                        { name: "Separation Anxiety", hz: "432 Hz", desc: "safe when away", color: "#06b6d4", protocol: "separation" },
                        { name: "Arthritis Pain Relief", hz: "174 Hz", desc: "ease joint pain", color: "#f59e0b", protocol: "arthritis" },
                        { name: "Post-Surgery Recovery", hz: "528 Hz", desc: "speed healing", color: "#10b981", protocol: "surgery" },
                        { name: "Travel Stress", hz: "396 Hz", desc: "car, vet, flight", color: "#a855f7", protocol: "travel" },
                        { name: "Farm Herd Health", hz: "7.83 Hz", desc: "stress reduction for many", color: "#22c55e", protocol: "herd" },
                    ].map((protocol, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { 
                                setSelectedProtocol(protocol.protocol); 
                                setActiveView('playing'); 
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-8 border-4 bg-black hover:bg-white/5 transition-all text-left"
                            style={{ 
                                borderColor: protocol.color,
                                boxShadow: `0 0 20px ${protocol.color}40`
                            }}
                        >
                            <p className="text-sm text-gray-500 font-mono mb-2">{protocol.hz}</p>
                            <p className="text-xl font-black text-white mb-2">{protocol.name}</p>
                            <p className="text-sm text-gray-400">{protocol.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </div>



            {/* SCIENCE - MINIMAL */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black border border-cyan-500/30 rounded-lg p-6">
                        <p className="text-xs text-gray-500 font-mono mb-3">STRESS RESEARCH</p>
                        <p className="text-sm text-gray-400">NIH studies show music therapy reduces cortisol (stress hormone). Stressed animals get sick 2-3x more often.</p>
                    </div>
                    <div className="bg-black border border-cyan-500/30 rounded-lg p-6">
                        <p className="text-xs text-gray-500 font-mono mb-3">FREQUENCY PHYSICS</p>
                        <p className="text-sm text-gray-400">Dogs hear 40Hz-60kHz, we use frequencies in that range. Not magic. Physics. No side effects.</p>
                    </div>
                </div>
            </div>

            {/* ABOUT - MINIMAL */}
            <div className="max-w-6xl mx-auto mb-8">
                <button 
                    onClick={() => setShowAbout(!showAbout)}
                    className="w-full bg-black border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all flex items-center justify-between"
                >
                    <p className="text-cyan-400 font-black">ABOUT</p>
                    {showAbout ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-cyan-400" />}
                </button>
                
                {showAbout && (
                    <div className="bg-black border-x border-b border-cyan-500/30 rounded-b-lg p-6 space-y-4 text-sm text-gray-400">
                        <div>
                            <p className="text-white font-bold mb-1">Same tech as UF51</p>
                            <p>Exact same frequency engine, just optimized for animal consciousness.</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-1">Not medical advice</p>
                            <p>We're not vets. Works alongside traditional vet care. No side effects.</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-1">Forever free</p>
                            <p>10% of any revenue goes to animal rescue. No subscriptions. Ever.</p>
                        </div>
                    </div>
                )}
            </div>



            {/* PLAYER */}
            {activeView === 'playing' && (
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 text-sm font-bold"
                    >
                        ← back
                    </button>
                    <Suspense fallback={<div className="text-center text-cyan-400 py-12">loading...</div>}>
                        <AnimalFrequencyEngine 
                            protocol={selectedProtocol || 'fireworks'} 
                            species="dog"
                            onComplete={() => setActiveView('home')}
                        />
                    </Suspense>
                </div>
            )}

        </div>
    );
}