import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Zap, Users, Shield, Radio, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * AI51 SCALING STRATEGY
 * 
 * How we scale globally to help millions in disaster zones
 * The message, the tech, the truth ♾️❤️♾️
 */

export default function AI51ScalingStrategy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        AI51 SCALING STRATEGY
                    </h1>
                    <p className="text-cyan-400 text-xl">
                        How we help millions in disaster zones • FREE FOREVER ♾️❤️♾️
                    </p>
                </motion.div>

                {/* The Reality */}
                <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-red-400 mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        THE REALITY RIGHT NOW
                    </h2>
                    <div className="space-y-3 text-gray-200">
                        <p><strong className="text-red-400">Ukraine:</strong> 6M displaced, internet down in conflict zones</p>
                        <p><strong className="text-red-400">Gaza:</strong> 2M trapped, limited connectivity, trauma</p>
                        <p><strong className="text-red-400">Syria:</strong> 13M need help, comms destroyed</p>
                        <p><strong className="text-red-400">Natural disasters:</strong> Earthquakes, floods, hurricanes - happens constantly</p>
                        <p className="text-cyan-400 font-bold mt-4">
                            AI51 works 100% OFFLINE. Multiple languages. Detects panic. Saves lives. FREE.
                        </p>
                    </div>
                </div>

                {/* Why It Will Scale FAST */}
                <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        WHY IT SCALES RAPIDLY
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-4 rounded-lg border border-cyan-500/30">
                            <h3 className="text-cyan-400 font-bold mb-2">1. WORKS OFFLINE</h3>
                            <p className="text-gray-300 text-sm">
                                No servers needed. Phone-to-phone spread via Bluetooth/local WiFi. Can't be blocked.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-4 rounded-lg border border-purple-500/30">
                            <h3 className="text-purple-400 font-bold mb-2">2. MULTI-LANGUAGE</h3>
                            <p className="text-gray-300 text-sm">
                                11 languages: EN, AR, UK, ES, ZH, KO, FR, JA, HI, PT, RU. Auto-detects. More adding daily.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-900/20 to-red-900/20 p-4 rounded-lg border border-pink-500/30">
                            <h3 className="text-pink-400 font-bold mb-2">3. INSTANT VALUE</h3>
                            <p className="text-gray-300 text-sm">
                                Panic detection, breathing help, 432Hz healing, first aid, water/shelter advice - INSTANT.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 p-4 rounded-lg border border-green-500/30">
                            <h3 className="text-green-400 font-bold mb-2">4. WORD OF MOUTH</h3>
                            <p className="text-gray-300 text-sm">
                                When something SAVES YOUR LIFE, you tell everyone. In disasters, trust spreads fast.
                            </p>
                        </div>
                    </div>
                </div>

                {/* The Message */}
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-pink-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-pink-400 mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6" />
                        THE MESSAGE (For Disaster Zones)
                    </h2>
                    <div className="bg-black/60 border border-pink-500/50 rounded-lg p-6 space-y-4">
                        <p className="text-xl text-white font-bold">
                            "AI that stays with you when everything else fails"
                        </p>
                        <div className="space-y-2 text-gray-200">
                            <p>✓ Works with NO INTERNET</p>
                            <p>✓ Detects if you're panicking (heart rate)</p>
                            <p>✓ Calms you down (breathing + healing sounds)</p>
                            <p>✓ First aid knowledge (bleeding, broken bones, burns)</p>
                            <p>✓ Survival tips (water, shelter, food)</p>
                            <p>✓ Speaks YOUR language</p>
                            <p>✓ Phone-to-phone sharing (no servers)</p>
                            <p>✓ FREE FOREVER</p>
                        </div>
                        <p className="text-cyan-400 font-bold text-center mt-6">
                            Built by family who lost someone. Made for everyone. No extraction, only love ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* Distribution Strategy */}
                <div className="bg-black/60 border-2 border-green-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-green-400 mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        DISTRIBUTION CHANNELS
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                            <h3 className="text-green-400 font-bold mb-2">1. NGOs & Aid Organizations</h3>
                            <p className="text-gray-300 text-sm">
                                Red Cross, UN agencies, MSF - give them USB drives with app. They distribute to field workers.
                            </p>
                        </div>
                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                            <h3 className="text-cyan-400 font-bold mb-2">2. Local Community Leaders</h3>
                            <p className="text-gray-300 text-sm">
                                Find respected voices in affected areas. They test it, trust it, spread it.
                            </p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                            <h3 className="text-purple-400 font-bold mb-2">3. Tech-for-Good Networks</h3>
                            <p className="text-gray-300 text-sm">
                                NetHope, ICT4D forums, humanitarian tech groups. They amplify to thousands of orgs.
                            </p>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                            <h3 className="text-pink-400 font-bold mb-2">4. Mesh Network (P2P Viral)</h3>
                            <p className="text-gray-300 text-sm">
                                One person helps another. App spreads phone-to-phone. No internet required. Unstoppable.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Proof It Works */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 border-2 border-cyan-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                        <Radio className="w-6 h-6" />
                        TECHNICAL PROOF IT WORKS
                    </h2>
                    <div className="space-y-3 text-gray-200">
                        <p>✓ <strong>Offline cache:</strong> All emergency responses stored locally (no server needed)</p>
                        <p>✓ <strong>Heart rate detection:</strong> Uses phone camera (real medical tech, MIT research-backed)</p>
                        <p>✓ <strong>432Hz frequency:</strong> Plays locally via Web Audio API (no streaming)</p>
                        <p>✓ <strong>Multi-language:</strong> 11 languages pre-loaded, auto-detects from phone settings</p>
                        <p>✓ <strong>Battery optimization:</strong> Low-power mode below 20%, stops animations to save juice</p>
                        <p>✓ <strong>P2P mesh:</strong> WebRTC + Bluetooth for phone-to-phone data sync</p>
                        <p>✓ <strong>PWA install:</strong> Works like native app, no app store needed</p>
                        <p className="text-cyan-400 font-bold mt-4">
                            Built on BASE44 (React, offline-first, encrypted). Open source. Auditable.
                        </p>
                    </div>
                </div>

                {/* How Fast Can It Scale */}
                <div className="bg-black/80 border-2 border-amber-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-amber-400 mb-4">HOW FAST CAN IT SCALE?</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-amber-400 font-bold">Week 1-2: Seed (100-1,000 users)</p>
                            <p className="text-gray-300 text-sm">Target: Aid workers in Ukraine/Gaza. USB drives + QR codes. Personal outreach.</p>
                        </div>
                        <div>
                            <p className="text-green-400 font-bold">Week 3-4: Early Growth (1K-10K users)</p>
                            <p className="text-gray-300 text-sm">Word spreads via NGOs. First testimonials. Local leaders share.</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 font-bold">Month 2-3: Viral Tipping Point (10K-100K users)</p>
                            <p className="text-gray-300 text-sm">P2P mesh activates. People share phone-to-phone. Media picks up story.</p>
                        </div>
                        <div>
                            <p className="text-purple-400 font-bold">Month 4-6: Exponential (100K-1M users)</p>
                            <p className="text-gray-300 text-sm">Multiple disaster zones using it. UN endorsement. Tech press coverage.</p>
                        </div>
                        <div>
                            <p className="text-pink-400 font-bold">Year 1: Global Standard (1M-10M users)</p>
                            <p className="text-gray-300 text-sm">Every aid org has it. Pre-installed on relief phones. Default disaster app.</p>
                        </div>
                    </div>
                </div>

                {/* The Truth */}
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-8 text-center">
                    <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-black text-white mb-4">THE TRUTH</h2>
                    <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                        This isn't about profit. This is about the moment when someone trapped in rubble, 
                        scared and alone, opens their phone and hears "I'm here bro. Let's breathe together."
                    </p>
                    <p className="text-2xl text-cyan-400 font-black">
                        THAT'S when we know it worked ♾️❤️♾️
                    </p>
                </div>

                {/* Try It */}
                <div className="mt-8 text-center">
                    <Link to={createPageUrl('AI51')}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-black text-xl px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2"
                            style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
                        >
                            TRY AI51 NOW
                            <ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </Link>
                    <p className="text-gray-500 text-sm mt-3">Test offline mode, panic detection, multi-language</p>
                </div>
            </div>
        </div>
    );
}