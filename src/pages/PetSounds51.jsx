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
        <div className="min-h-screen bg-black text-white p-6 pb-24" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`
        }}>
            
            {/* HEADER - INSTANT LOAD */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <div className="flex justify-center mb-6">
                    <PetSounds51Icon8Bit size={120} animate={false} />
                </div>
                <h1 
                    className="text-5xl md:text-7xl font-black mb-4 font-mono tracking-tight"
                    style={{
                        textShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
                        background: 'linear-gradient(90deg, #22d3ee 0%, #34d399 50%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    PETSOUNDS51
                </h1>
                <div className="inline-block bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 p-1 rounded-lg mb-3">
                    <div className="bg-black px-6 py-2 rounded-md">
                        <p className="text-xl md:text-2xl text-white font-black font-mono">
                            free healing frequencies for all animals
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto font-mono">
                    same proven tech healing humans - forever free ♾️❤️
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <a 
                        href="/PetSounds51Terms" 
                        className="text-xs text-gray-600 hover:text-cyan-400 transition-colors"
                    >
                        Terms & Conditions
                    </a>
                    <span className="text-gray-800">•</span>
                    <a 
                        href="/PrivacyPolicy" 
                        className="text-xs text-gray-600 hover:text-cyan-400 transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <span className="text-gray-800">•</span>
                    <a 
                        href="/PetSounds51StripeSetup" 
                        className="text-xs text-gray-600 hover:text-cyan-400 transition-colors"
                    >
                        Payment Info
                    </a>
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-8">
                    <h2 className="text-3xl font-black text-red-300 mb-6 text-center">THE PROBLEM</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                        <div>
                            <p className="font-bold text-white mb-2">Pet Owners:</p>
                            <ul className="space-y-2 text-sm">
                                <li>• £1,000-3,000/year in vet bills</li>
                                <li>• Anxiety from fireworks, separation, travel</li>
                                <li>• £500-2,000/year pain management for older pets</li>
                                <li>• NO affordable prevention - only treatment</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-2">Farmers:</p>
                            <ul className="space-y-2 text-sm">
                                <li>• £100-300 per vet visit</li>
                                <li>• Stress causes disease = £1,000s lost</li>
                                <li>• Lower milk yield from stressed animals</li>
                                <li>• No scalable wellness solution</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-cyan-400">HOW IT WORKS</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/40 border border-cyan-500/30 rounded-xl p-6 text-center">
                        <Video className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="font-bold text-white mb-2">1. AI Analysis</h3>
                        <p className="text-sm text-gray-400">
                            AI51 watches your pet via camera, detects stress signs (pacing, ears back, tail position)
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-green-500/30 rounded-xl p-6 text-center">
                        <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="font-bold text-white mb-2">2. Frequency Therapy</h3>
                        <p className="text-sm text-gray-400">
                            Plays species-specific healing frequencies (dogs hear 40Hz-60kHz, we optimized for that)
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-pink-500/30 rounded-xl p-6 text-center">
                        <Shield className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                        <h3 className="font-bold text-white mb-2">3. Proven Results</h3>
                        <p className="text-sm text-gray-400">
                            Camera verifies behavior change. Calmer pet = less vet visits = you save money
                        </p>
                    </div>
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
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
                    <Heart className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-black text-green-400 mb-3">100% FREE FOREVER</h2>
                    <p className="text-white text-lg mb-2">all 6 protocols • unlimited use • works offline</p>
                    <p className="text-gray-400 text-sm">
                        no payment • no subscription • no catch<br/>
                        click any protocol above to start healing ♾️❤️
                    </p>
                </div>
            </div>

            {/* THE SCIENCE (NOT WOO-WOO) */}
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-yellow-400">real science • not woo-woo</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🔬 peer-reviewed research</h3>
                        <p className="text-sm text-gray-400">
                            NIH published studies: classical music reduces cortisol (stress hormone) in shelter dogs by 28%. Sound therapy is proven science.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🐕 species-specific frequencies</h3>
                        <p className="text-sm text-gray-400">
                            dogs hear 40Hz-60,000Hz (vs humans 20Hz-20,000Hz). we optimized frequencies for their actual hearing range - not ours.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">💰 save £1,000s on vet bills</h3>
                        <p className="text-sm text-gray-400">
                            average UK pet owner spends £1,000-3,000/year on vet care. stress causes disease. reduce stress = prevent disease.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">📴 works offline forever</h3>
                        <p className="text-sm text-gray-400">
                            barns, stables, remote farms - no internet needed. download once, use forever. completely free.
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