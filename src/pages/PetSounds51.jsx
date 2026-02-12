import React, { useState, lazy, Suspense } from 'react';
import { Check, Heart, Video, Wifi, Shield, Zap, ChevronDown, ChevronUp, Play, Sparkles, Home, Bone, Cross, Plane, Tractor } from 'lucide-react';
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
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-green-400">healing protocols</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: "Fireworks Anxiety", desc: "calm during loud noises", icon: Sparkles, color: "from-pink-500 to-purple-500", species: "🐕 🐈 🐴", protocol: "fireworks" },
                        { name: "Separation Anxiety", desc: "safe when you're away", icon: Home, color: "from-cyan-500 to-blue-500", species: "🐕 🐈", protocol: "separation" },
                        { name: "Arthritis Pain Relief", desc: "ease joint pain", icon: Bone, color: "from-orange-500 to-red-500", species: "🐕 🐈 🐴", protocol: "arthritis" },
                        { name: "Post-Surgery Recovery", desc: "speed healing", icon: Cross, color: "from-green-500 to-emerald-500", species: "🐕 🐈 🐴 🐄", protocol: "surgery" },
                        { name: "Travel Stress", desc: "car, plane, vet visits", icon: Plane, color: "from-blue-500 to-cyan-500", species: "🐕 🐈", protocol: "travel" },
                        { name: "Farm Herd Health", desc: "reduce stress for 50+ animals", icon: Tractor, color: "from-yellow-500 to-amber-500", species: "🐄 🐴 🐑 🐷", protocol: "herd" },
                    ].map((protocol, i) => {
                        const IconComponent = protocol.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => { 
                                    setSelectedProtocol(protocol.protocol); 
                                    setActiveView('playing'); 
                                }}
                                className="bg-black border-2 border-cyan-500/30 rounded-xl p-5 hover:border-cyan-500 transition-all group text-left w-full"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`bg-gradient-to-br ${protocol.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-white text-lg mb-1">{protocol.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{protocol.desc}</p>
                                        <p className="text-xs text-gray-500">{protocol.species}</p>
                                    </div>
                                    <Play className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* FREE FOR ALL */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-3 border-green-400 rounded-2xl p-10 text-center" style={{
                    boxShadow: '0 0 50px rgba(34, 211, 238, 0.4), 0 0 30px rgba(52, 211, 153, 0.3), inset 0 0 30px rgba(34, 211, 238, 0.1)'
                }}>
                    <Heart className="w-20 h-20 text-green-300 mx-auto mb-6" style={{
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        filter: 'drop-shadow(0 0 15px rgba(52, 211, 153, 0.8))'
                    }} />
                    <h2 className="text-4xl font-black text-green-300 mb-4" style={{
                        textShadow: '0 0 20px rgba(52, 211, 153, 0.8)'
                    }}>COMPLETELY FREE</h2>
                    <p className="text-white text-xl font-bold mb-3">no login • no payment • no subscription • forever</p>
                    <div className="bg-black/60 rounded-lg p-4 inline-block mb-3">
                        <p className="text-cyan-300 font-mono text-sm">✓ all 6 protocols  ✓ unlimited use  ✓ works offline  ✓ all animals</p>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Your dog. Your cat. Your horse. Farm herd. Zoo animals. All heal the same way.<br/>
                        <span className="text-green-300 font-bold">Click any protocol above now.</span>
                    </p>
                </div>
            </div>

            {/* THE SCIENCE (NOT WOO-WOO) */}
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-yellow-400">the science behind it</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🔬 stress hormones &amp; sound</h3>
                        <p className="text-sm text-gray-400">
                            NIH research (Thoma et al., 2013): music therapy reduces cortisol (stress hormone) in animals and humans. Lower cortisol = stronger immune system = fewer infections and illnesses.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🐕 animal hearing ranges</h3>
                        <p className="text-sm text-gray-400">
                            dogs hear 40Hz-60,000Hz (humans hear 20Hz-20,000Hz). frequencies work because they're in the range animals actually process. no magic, just physics.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">💰 cost prevention not cure</h3>
                        <p className="text-sm text-gray-400">
                            stressed animals get sick 2-3x more often (veterinary research). prevention via stress reduction saves money. average UK pet owner spends £1,000-3,000/year on reactive vet care.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">📴 offline technology</h3>
                        <p className="text-sm text-gray-400">
                            works without internet. barns, stables, remote farms. download once, use forever. no servers needed.
                        </p>
                    </div>
                </div>
            </div>

            {/* ABOUT - COLLAPSIBLE */}
            <div className="max-w-4xl mx-auto mb-16">
                <button 
                    onClick={() => setShowAbout(!showAbout)}
                    className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/60 transition-all flex items-center justify-between"
                >
                    <h2 className="text-2xl font-black text-cyan-400">ABOUT PETSOUNDS51</h2>
                    {showAbout ? <ChevronUp className="w-6 h-6 text-cyan-400" /> : <ChevronDown className="w-6 h-6 text-cyan-400" />}
                </button>
                
                {showAbout && (
                    <div className="bg-gray-900/40 border-x border-b border-cyan-500/30 rounded-b-xl p-8 space-y-6">
                        <div>
                            <h3 className="font-bold text-white mb-2">🎵 Why "Pet Sounds"?</h3>
                            <p className="text-gray-400 text-sm">
                                Named after Brian Wilson's masterpiece. He called it "Pet Sounds" because of his dogs. We honor that by extending healing to ALL animals.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">🌍 Same Tech As UF51</h3>
                            <p className="text-gray-400 text-sm">
                                PetSounds51 uses the exact same frequency engine, AI analysis, and proof-of-healing system as UF51. Just optimized for animal consciousness.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">❤️ Not Extraction</h3>
                            <p className="text-gray-400 text-sm">
                                10% of revenue goes to animal rescue shelters. Wealthy pet owners (£499 tier) subsidize free tier for rescue animals. Redistribution, not extraction.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">🔬 Legal & Safe</h3>
                            <p className="text-gray-400 text-sm">
                                Not medical advice - we're not vets. AI51 analyzes behavior (stress signs) and recommends frequencies. No side effects. Works alongside traditional vet care.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">🚀 First In World</h3>
                            <p className="text-gray-400 text-sm">
                                Nothing exists like this: AI video analysis + species-specific frequencies + offline mode + proof-of-healing + one-time purchase. We're first.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">🤝 Who This Helps</h3>
                            <p className="text-gray-400 text-sm mb-2">
                                • Anxious rescue dogs finding their forever home<br/>
                                • Senior pets with arthritis living better<br/>
                                • Farm animals reducing stress naturally<br/>
                                • Pet owners saving £1,000s in vet bills<br/>
                                • Wildlife rehabilitation centers<br/>
                                • Working dogs (police, service, therapy)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* MARKET VALIDATION */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="bg-green-900/20 border-2 border-green-500/30 rounded-xl p-8">
                    <h2 className="text-2xl font-black text-green-400 mb-6 text-center">THE MARKET IS READY</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-4xl font-black text-white mb-2">$427B</p>
                            <p className="text-sm text-gray-400">Global pet market by 2032</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-white mb-2">$39.8B</p>
                            <p className="text-sm text-gray-400">US vet care spending 2024</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-white mb-2">£3,000</p>
                            <p className="text-sm text-gray-400">Average UK pet vet bills/year</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTIVE VIEW RENDERING */}
            {activeView === 'playing' && (
                <div className="max-w-3xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                        ← back to protocols
                    </button>
                    <Suspense fallback={<div className="text-center text-cyan-400 py-12">loading frequency engine...</div>}>
                        <AnimalFrequencyEngine 
                            protocol={selectedProtocol || 'fireworks'} 
                            species="dog"
                            onComplete={() => {
                                alert('✅ session complete');
                                setActiveView('home');
                            }}
                        />
                    </Suspense>
                </div>
            )}

        </div>
    );
}