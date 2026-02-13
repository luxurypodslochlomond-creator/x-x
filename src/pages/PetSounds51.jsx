import React, { useState, lazy, Suspense } from 'react';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { FireworksIcon, SeparationIcon, ArthritisIcon, SurgeryIcon, TravelIcon, HerdIcon } from '@/components/shared/PetFrequencyIcons';

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
        <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-cyan-950 text-white p-3 sm:p-4 relative overflow-hidden">
            
            {/* BREATHING BACKGROUND */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ 
                    background: [
                        'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8 text-center relative z-10">
                <motion.div 
                    className="flex items-center justify-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <PetSounds51Icon8Bit size={56} animate={true} />
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl font-black text-green-400" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}>
                        PETSOUNDS51
                    </h1>
                </motion.div>
                <motion.p 
                    className="text-cyan-400 text-base sm:text-lg font-mono mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Healing frequencies for all animals.<br/>Free forever. Works offline.
                </motion.p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <a href="/PetSounds51Terms" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">Terms</a>
                    <span className="text-gray-700">•</span>
                    <a href="/PrivacyPolicy" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">Privacy</a>
                </div>
            </div>



            {/* PROTOCOLS */}
            <div className="max-w-6xl mx-auto mb-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: "Fireworks Anxiety", hz: "40 Hz", desc: "calm during loud noises", color: "#ec4899", protocol: "fireworks", Icon: FireworksIcon },
                        { name: "Separation Anxiety", hz: "432 Hz", desc: "safe when away", color: "#06b6d4", protocol: "separation", Icon: SeparationIcon },
                        { name: "Arthritis Pain Relief", hz: "174 Hz", desc: "ease joint pain", color: "#f59e0b", protocol: "arthritis", Icon: ArthritisIcon },
                        { name: "Post-Surgery Recovery", hz: "528 Hz", desc: "speed healing", color: "#10b981", protocol: "surgery", Icon: SurgeryIcon },
                        { name: "Travel Stress", hz: "396 Hz", desc: "car, vet, flight", color: "#a855f7", protocol: "travel", Icon: TravelIcon },
                        { name: "Farm Herd Health", hz: "7.83 Hz", desc: "stress reduction for many", color: "#22c55e", protocol: "herd", Icon: HerdIcon },
                    ].map((protocol, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { 
                                setSelectedProtocol(protocol.protocol); 
                                setActiveView('playing'); 
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            className="p-6 border-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all text-left flex flex-col items-start rounded-xl"
                            style={{ 
                                borderColor: protocol.color,
                                boxShadow: `0 0 20px ${protocol.color}40`
                            }}
                        >
                            <div className="flex items-start justify-between w-full mb-4">
                                <protocol.Icon size={48} animate={true} />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Play className="w-7 h-7" style={{ color: protocol.color }} />
                                </motion.div>
                            </div>
                            <p className="text-xs font-mono mb-2" style={{ color: protocol.color }}>{protocol.hz}</p>
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