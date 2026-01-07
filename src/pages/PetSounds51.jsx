import React, { useState, lazy, Suspense } from 'react';
import { Check, Heart, Video, Wifi, Shield, Zap, ChevronDown, ChevronUp, Play } from 'lucide-react';
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
    const [activeView, setActiveView] = useState('home'); // home, free, premium, ai, payment
    const [selectedTier, setSelectedTier] = useState(null);
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
                            healing frequencies for all animals
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto font-mono">
                    same tech healing humans - now for all animals
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
                <h2 className="text-3xl font-black text-center mb-8 text-green-400">HEALING PROTOCOLS</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: "Fireworks Anxiety", desc: "Calm your pet during loud noises", icon: "🎆" },
                        { name: "Separation Anxiety", desc: "Help them feel safe when you're away", icon: "🏠" },
                        { name: "Arthritis Pain Relief", desc: "Ease joint pain for older pets", icon: "🦴" },
                        { name: "Post-Surgery Recovery", desc: "Speed healing after operations", icon: "⚕️" },
                        { name: "Travel Stress", desc: "Car, plane, vet visits - stay calm", icon: "✈️" },
                        { name: "Farm Herd Health", desc: "Reduce stress for 50+ animals", icon: "🐄" },
                    ].map((protocol, i) => (
                        <div 
                            key={i}
                            className="bg-gray-900/60 border border-white/10 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{protocol.icon}</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white">{protocol.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{protocol.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PRICING */}
            <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-pink-400">PRICING</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    
                    {/* FREE */}
                    <div className="bg-gray-900/60 border-2 border-gray-700 rounded-xl p-6">
                        <h3 className="text-xl font-black text-gray-400 mb-2">FREE</h3>
                        <p className="text-4xl font-black text-white mb-4">£0</p>
                        <p className="text-sm text-gray-500 mb-6">test it works</p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">432Hz calming frequency</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">unlimited use</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">works offline</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => { setActiveView('free'); setSelectedProtocol('fireworks'); }}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-bold transition-all"
                        >
                            try free
                        </button>
                    </div>

                    {/* BASIC */}
                    <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-cyan-400 mb-2">BASIC</h3>
                        <p className="text-4xl font-black text-white mb-1">£9.99</p>
                        <p className="text-sm text-cyan-300 mb-6">one protocol, forever</p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">pick 1 protocol</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">use forever</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">share with friends</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">works offline</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('basic'); }}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-3 rounded-lg font-bold transition-all"
                        >
                            get basic
                        </button>
                    </div>

                    {/* PREMIUM */}
                    <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-6 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-xs font-black">
                            most popular
                        </div>
                        <h3 className="text-xl font-black text-green-400 mb-2">PREMIUM</h3>
                        <p className="text-4xl font-black text-white mb-1">£49.99</p>
                        <p className="text-sm text-green-300 mb-6">one payment, forever</p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white font-bold">all 6 protocols</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">AI video analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">priority support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">new protocols = free</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('premium'); }}
                            className="w-full bg-green-500 hover:bg-green-600 text-black px-4 py-3 rounded-lg font-bold transition-all"
                        >
                            get premium
                        </button>
                    </div>

                    {/* CONCIERGE */}
                    <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-pink-400 mb-2">CONCIERGE</h3>
                        <p className="text-4xl font-black text-white mb-1">£249</p>
                        <p className="text-sm text-pink-300 mb-6">one payment, forever</p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white font-bold">everything in premium</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">video consultations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">custom protocols</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white">works with your vet</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('concierge'); }}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-black px-4 py-3 rounded-lg font-bold transition-all"
                        >
                            get concierge
                        </button>
                    </div>
                </div>

                {/* SUBSCRIPTION OPTION */}
                <div className="mt-8 bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 text-center">
                    <p className="text-gray-400 mb-2">prefer monthly instead?</p>
                    <div className="space-y-2">
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('premium-monthly'); }}
                            className="w-full max-w-md mx-auto block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                        >
                            premium £9.99/month
                        </button>
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('concierge-monthly'); }}
                            className="w-full max-w-md mx-auto block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                        >
                            concierge £24.99/month
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        (one-time is better value - £49.99 = 5 months then free forever)
                    </p>
                </div>
            </div>

            {/* WHY IT WORKS */}
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-center mb-8 text-yellow-400">WHY IT WORKS</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🔬 Proven Science</h3>
                        <p className="text-sm text-gray-400">
                            Music therapy for animals is peer-reviewed. Classical music reduces stress in kenneled dogs (NIH studies). We use optimized frequencies for animal hearing ranges.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">💰 Cheaper Than 1 Vet Visit</h3>
                        <p className="text-sm text-gray-400">
                            Vet visits cost £50-200. Premium pack is £99 ONE TIME - works forever. Prevention vs. treatment after problems.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">🐕 Species-Specific</h3>
                        <p className="text-sm text-gray-400">
                            Dogs hear 40Hz-60,000Hz. Humans only 20Hz-20,000Hz. We optimized frequencies for their actual hearing range.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-yellow-500/30 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-3">📴 Works Offline</h3>
                        <p className="text-sm text-gray-400">
                            Barns, stables, remote farms - no internet needed. Download protocols once, use forever.
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
            {activeView === 'home' && (
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 p-1 rounded-xl mb-4">
                        <div className="bg-[#0a0514] rounded-lg p-8">
                            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                            <h2 className="text-3xl font-black text-white mb-4">
                                Help Your Pet Feel Better
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Try the free tier. See it work. Then choose what's right for your family.
                            </p>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => { setActiveView('free'); setSelectedProtocol('fireworks'); }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-black px-12 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Try Free Now (432Hz Calm)
                                </button>
                                <button 
                                    onClick={() => { setActiveView('payment'); setSelectedTier('premium'); }}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-black px-12 py-4 rounded-xl text-lg transition-all"
                                >
                                    Get Premium - £99 One-Time
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600">
                        Built with love by UniversalFamily51 • Same tech that's healing humans ♾️❤️
                    </p>
                    <div className="mt-6 bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6 text-center">
                        <p className="text-white font-bold mb-2">Questions?</p>
                        <a href="mailto:family@uf51.love" className="text-cyan-400 hover:text-cyan-300 font-bold">
                            family@uf51.love
                        </a>
                        <p className="text-xs text-gray-500 mt-2">We reply within 24 hours</p>
                    </div>
                </div>
            )}

            {activeView === 'free' && (
                <div className="max-w-3xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                        ← back
                    </button>
                    <h2 className="text-3xl font-black text-cyan-400 mb-6 text-center">free - test it works</h2>
                    <Suspense fallback={<div className="text-center text-cyan-400 py-12">loading frequency engine...</div>}>
                        <AnimalFrequencyEngine 
                            protocol={selectedProtocol || 'fireworks'} 
                            species="dog"
                            onComplete={() => {
                                alert('✅ session complete - upgrade for all protocols?');
                            }}
                        />
                    </Suspense>
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 mb-4">working? upgrade for all protocols:</p>
                        <button 
                            onClick={() => { setActiveView('payment'); setSelectedTier('premium'); }}
                            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-black px-8 py-3 rounded-lg transition-all"
                        >
                            get premium - £49.99
                        </button>
                    </div>
                </div>
            )}

            {activeView === 'ai' && (
                <div className="max-w-3xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                        ← Back
                    </button>
                    <h2 className="text-3xl font-black text-pink-400 mb-6 text-center">AI51 Pet Analysis - Premium Feature</h2>
                    <AI51PetAnalysis 
                        species="dog"
                        onRecommendation={(rec) => {
                            console.log('AI51 recommendation:', rec);
                        }}
                    />
                </div>
            )}

            {activeView === 'payment' && (
                <div className="max-w-2xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                        ← back
                    </button>
                    <h2 className="text-3xl font-black text-green-400 mb-6 text-center">
                        {selectedTier === 'basic' && 'basic tier'}
                        {selectedTier === 'premium' && 'premium - most popular'}
                        {selectedTier === 'concierge' && 'concierge - custom protocols'}
                    </h2>
                    <Suspense fallback={<div className="text-center text-cyan-400 py-12">loading payment...</div>}>
                        <UniversalPayment 
                            tier={selectedTier}
                            onSuccess={(purchase) => {
                                alert(`✅ welcome to petsounds51 ${selectedTier}`);
                                if (selectedTier === 'concierge') {
                                    setActiveView('custom');
                                } else {
                                    setActiveView('free');
                                }
                            }}
                        />
                    </Suspense>
                </div>
            )}

            {activeView === 'custom' && (
                <div className="max-w-3xl mx-auto">
                    <button 
                        onClick={() => setActiveView('home')}
                        className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                        ← Back
                    </button>
                    <AI51CustomProtocol 
                        species="dog"
                        userEmail="user@example.com"
                    />
                </div>
            )}

        </div>
    );
}