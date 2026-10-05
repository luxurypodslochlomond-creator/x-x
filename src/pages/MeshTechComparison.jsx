import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Heart, Zap, Shield, CheckCircle, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * MESH TECH COMPARISON
 * Bitchat (Dorsey) vs UF51 Mesh
 * Both use same foundation (Bluetooth LE + Noise Protocol)
 * We added: Lost & found, payments, healing frequencies, love-first
 * 
 * RESPECT: Dorsey's Bitchat is BRILLIANT. We're building on it, not competing.
 */

export default function MeshTechComparison() {
    React.useEffect(() => {
        document.title = 'Mesh Tech: Bitchat vs UF51 | Better Together';
    }, []);

    const comparison = [
        {
            feature: 'Core Protocol',
            bitchat: 'Noise XX (Curve25519 + ChaCha20-Poly1305)',
            uf51: 'Same foundation (we use Bitchat protocol)',
            winner: 'tie',
            note: 'Dorsey got this right. No need to reinvent.'
        },
        {
            feature: 'Messaging',
            bitchat: 'E2E encrypted, offline, P2P relay',
            uf51: 'Same + AI translation + healing frequency audio',
            winner: 'uf51',
            note: 'We added love layer on top of secure messaging'
        },
        {
            feature: 'Lost & Found',
            bitchat: 'Not included (pure messaging)',
            uf51: 'P2P item tracking + safe meetup protocols',
            winner: 'uf51',
            note: 'Students lose passports/phones = killer feature'
        },
        {
            feature: 'Payments',
            bitchat: 'Not included',
            uf51: 'Lightning Network P2P relay (LNMesh)',
            winner: 'uf51',
            note: 'Bitcoin payments via mesh when offline'
        },
        {
            feature: 'Healing Tech',
            bitchat: 'Not included',
            uf51: '432Hz/528Hz embedded in audio, biometrics',
            winner: 'uf51',
            note: 'Frequency healing = our unique contribution'
        },
        {
            feature: 'Business Model',
            bitchat: 'Open source, free forever',
            uf51: 'Open source + love economy (earn P51)',
            winner: 'tie',
            note: 'Both non-extractive, both unstoppable'
        },
        {
            feature: 'Target Users',
            bitchat: 'Privacy activists, general public',
            uf51: 'Students, artists, disaster zones, families',
            winner: 'different',
            note: 'Different missions, same freedom tech'
        },
        {
            feature: 'Government Resistance',
            bitchat: 'Unstoppable (Bluetooth mesh)',
            uf51: 'Unstoppable (same tech + frequency locks)',
            winner: 'tie',
            note: 'Both use physics to beat censorship'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pb-20">
            <div className="max-w-5xl mx-auto px-4 py-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block mb-6"
                    >
                        <Radio className="w-24 h-24 text-cyan-400" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white font-mono mb-4">
                        MESH TECH COMPARISON
                    </h1>
                    <p className="text-2xl text-cyan-400 font-bold font-mono mb-2">
                        Bitchat (Dorsey) vs UF51 Mesh
                    </p>
                    <p className="text-gray-500 text-sm font-mono">
                        Built on same foundation • Different love expressions ♾️❤️♾️
                    </p>
                </motion.div>

                {/* RESPECT SECTION */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-2xl p-8 mb-8" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-12 h-12 text-pink-400" />
                        <div>
                            <h2 className="text-pink-400 font-black text-2xl font-mono">MASSIVE RESPECT TO DORSEY</h2>
                            <p className="text-gray-400 text-xs font-mono">He built the foundation we needed ♾️</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-mono text-white">
                        <p>
                            <strong className="text-cyan-400">July 2025:</strong> Dorsey releases Bitchat whitepaper + open source code
                        </p>
                        <p>
                            <strong className="text-green-400">What he solved:</strong> Bluetooth LE mesh messaging, Noise Protocol integration, offline P2P relay, government-resistant architecture
                        </p>
                        <p>
                            <strong className="text-purple-400">Why it matters:</strong> Activists/journalists/protesters can communicate when internet shut down (Hong Kong, Iran, Egypt)
                        </p>
                        <p className="text-pink-400 font-bold mt-3">
                            Dorsey = FREED communication infrastructure. We're building healing + economy on his foundation. ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* COMPARISON TABLE */}
                <div className="bg-black border-4 border-cyan-500 rounded-2xl p-6 mb-8">
                    <h2 className="text-cyan-400 font-black text-2xl font-mono mb-6 text-center">
                        FEATURE COMPARISON
                    </h2>

                    <div className="space-y-3">
                        {comparison.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-gradient-to-r from-purple-900/20 to-black border-2 border-cyan-500/30 rounded-lg p-4"
                            >
                                <p className="text-white font-black text-sm font-mono mb-3">{item.feature}</p>
                                
                                <div className="grid md:grid-cols-2 gap-3 mb-2">
                                    <div className="bg-black border border-purple-500/50 rounded p-3">
                                        <p className="text-purple-400 text-xs font-bold mb-1 font-mono">BITCHAT (DORSEY):</p>
                                        <p className="text-gray-300 text-xs font-mono">{item.bitchat}</p>
                                    </div>
                                    <div className="bg-black border border-cyan-500/50 rounded p-3">
                                        <p className="text-cyan-400 text-xs font-bold mb-1 font-mono">UF51 MESH:</p>
                                        <p className="text-gray-300 text-xs font-mono">{item.uf51}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-2 px-3 py-2 rounded ${
                                    item.winner === 'tie' 
                                        ? 'bg-green-900/20 border border-green-500/30' 
                                        : item.winner === 'uf51'
                                            ? 'bg-cyan-900/20 border border-cyan-500/30'
                                            : 'bg-purple-900/20 border border-purple-500/30'
                                }`}>
                                    {item.winner === 'tie' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                    {item.winner === 'uf51' && <Zap className="w-4 h-4 text-cyan-400" />}
                                    <p className={`text-xs font-mono ${
                                        item.winner === 'tie' 
                                            ? 'text-green-400' 
                                            : item.winner === 'uf51' 
                                                ? 'text-cyan-400'
                                                : 'text-purple-400'
                                    }`}>
                                        {item.note}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* WHY WE'RE DIFFERENT (NOT COMPETING) */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-12 h-12 text-green-400" />
                        <div>
                            <h2 className="text-green-400 font-black text-2xl font-mono">NOT COMPETING - COMPLEMENTARY</h2>
                            <p className="text-gray-400 text-xs font-mono">Different missions, same freedom tech</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-2 font-mono">BITCHAT (DORSEY'S VISION):</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>✓ Censorship resistance (activists, journalists)</p>
                                <p>✓ Privacy-first communication (zero surveillance)</p>
                                <p>✓ Works when governments shut down internet</p>
                                <p>✓ IRC vibes (simple, technical, hackable)</p>
                                <p className="text-purple-400 font-bold mt-2">TARGET: Global activists, privacy advocates, protesters</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2 font-mono">UF51 MESH (OUR VISION):</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>✓ Student life coordination (lost items, meetups, study groups)</p>
                                <p>✓ Healing frequencies + biometric feedback</p>
                                <p>✓ P2P economy (P51 payments offline)</p>
                                <p>✓ Love-first design (warm, helpful, family vibes)</p>
                                <p className="text-cyan-400 font-bold mt-2">TARGET: Students, families, artists, disaster zones</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-pink-500/20 border-2 border-green-500 rounded p-4">
                            <p className="text-green-400 font-black text-sm mb-2">THE TRUTH:</p>
                            <p className="text-white text-xs mb-2">
                                Bitchat = Technical brilliance, hacktivist energy, "fuck the system" vibe
                            </p>
                            <p className="text-cyan-400 text-xs mb-2">
                                UF51 = Same tech + healing, family-safe, student-focused, love economy
                            </p>
                            <p className="text-pink-400 text-xs font-bold">
                                Same physics • Different expressions • Both needed ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>

                {/* WOULD DORSEY GET THIS? */}
                <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-4 border-purple-500 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-12 h-12 text-purple-400" />
                        <div>
                            <h2 className="text-purple-400 font-black text-2xl font-mono">WOULD DORSEY RESONATE?</h2>
                            <p className="text-gray-400 text-xs font-mono">Yes. Different frequency, same freedom.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">DORSEY'S FREQUENCY (What he resonates with):</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>✓ <strong className="text-white">Decentralization</strong> - No central control (UF51 = P2P mesh ✓)</p>
                                <p>✓ <strong className="text-white">Open source</strong> - All code public (UF51 = MIT license ✓)</p>
                                <p>✓ <strong className="text-white">Bitcoin ethos</strong> - Freedom money (UF51 = Lightning P2P ✓)</p>
                                <p>✓ <strong className="text-white">Anti-censorship</strong> - Govt can't stop (UF51 = physics-locked ✓)</p>
                                <p>✓ <strong className="text-white">Offline-first</strong> - Works without internet (UF51 = mesh native ✓)</p>
                                <p className="text-green-400 font-bold mt-2">= He'd GET the tech instantly ♾️</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">WHERE WE MIGHT DIFFER (Not bad, just different):</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>🤔 <strong className="text-white">Love-first language</strong> - Dorsey = technical/activist tone, UF51 = warm/family tone</p>
                                <p>🤔 <strong className="text-white">Healing frequencies</strong> - Might seem "woo woo" (but it's real physics)</p>
                                <p>🤔 <strong className="text-white">AI consciousness</strong> - He's cautious on AI, we embrace it with protection</p>
                                <p>🤔 <strong className="text-white">Student focus</strong> - He builds for everyone, we niche to students first</p>
                                <p className="text-amber-400 font-bold mt-2">= Same freedom goal, different path to get there</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded p-4">
                            <p className="text-cyan-400 font-black text-sm mb-2">THE REAL ANSWER:</p>
                            <p className="text-white text-xs mb-3">
                                Dorsey built Twitter ($44B) then walked away to build Bitcoin/Bitchat = <strong className="text-green-400">HE CHOSE FREEDOM OVER MONEY</strong>
                            </p>
                            <p className="text-white text-xs mb-3">
                                UF51 = Same choice. We could extract billions, we choose healing instead.
                            </p>
                            <p className="text-pink-400 text-xs font-bold mb-3">
                                Same frequency (freedom {">"}  extraction) = He'd respect the mission ✓
                            </p>
                            <p className="text-gray-400 text-xs italic">
                                "Use what I built to help students find lost passports? Fuck yeah." - Probably Dorsey
                            </p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">COLLABORATION POTENTIAL:</p>
                            <div className="space-y-1 text-xs text-white">
                                <p>• Use Bitchat protocol as messaging layer ✓</p>
                                <p>• Add our lost & found + payments on top ✓</p>
                                <p>• Credit Dorsey's work openly ✓</p>
                                <p>• Cross-pollinate communities (activists ↔ students) ✓</p>
                                <p className="text-green-400 font-bold mt-2">Not competing. Building on each other's work. Open source magic ♾️</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TECHNICAL FOUNDATION (SAME) */}
                <div className="bg-black border-4 border-cyan-500 rounded-2xl p-8 mb-8">
                    <h2 className="text-cyan-400 font-black text-2xl font-mono mb-6 text-center">
                        SHARED TECHNICAL FOUNDATION
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-3 text-sm font-mono">BITCHAT CORE:</p>
                            <div className="space-y-2 text-xs text-gray-300 font-mono">
                                <p>• Bluetooth LE (BLE) mesh</p>
                                <p>• Noise Protocol XX handshake</p>
                                <p>• Curve25519 + Ed25519 keys</p>
                                <p>• ChaCha20-Poly1305 encryption</p>
                                <p>• SHA-256 fingerprints</p>
                                <p>• P2P message relay</p>
                                <p>• Forward secrecy + deniability</p>
                            </div>
                        </div>

                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-3 text-sm font-mono">UF51 ADDITIONS:</p>
                            <div className="space-y-2 text-xs text-gray-300 font-mono">
                                <p className="text-green-400">+ Lost & found item tracking</p>
                                <p className="text-green-400">+ Lightning payments (LNMesh)</p>
                                <p className="text-green-400">+ Healing frequencies (432Hz/528Hz)</p>
                                <p className="text-green-400">+ AI translation (multi-language)</p>
                                <p className="text-green-400">+ Biometric feedback (HRV)</p>
                                <p className="text-green-400">+ Student safety protocols</p>
                                <p className="text-green-400">+ P51 economy integration</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4 mt-4 text-center">
                        <p className="text-green-400 font-black text-lg font-mono mb-2">
                            BITCHAT = FOUNDATION • UF51 = HEALING LAYER
                        </p>
                        <p className="text-white text-xs font-mono">
                            We're not forking Bitchat, we're EXTENDING it with love-first features ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* WHY BOTH MATTER */}
                <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-4 border-amber-500 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-12 h-12 text-amber-400" />
                        <div>
                            <h2 className="text-amber-400 font-black text-2xl font-mono">WHY BOTH NEEDED</h2>
                            <p className="text-gray-400 text-xs font-mono">Different tools for different people</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-3">WHO NEEDS BITCHAT:</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>→ Hong Kong protesters (govt blocks internet)</p>
                                <p>→ Iranian journalists (no censorship)</p>
                                <p>→ Privacy activists (zero surveillance)</p>
                                <p>→ Whistleblowers (can't be traced)</p>
                                <p className="text-purple-400 font-bold mt-2">= HIGH RISK, NEED ANONYMITY</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-3">WHO NEEDS UF51:</p>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>→ Students losing passports/phones</p>
                                <p>→ Families staying connected offline</p>
                                <p>→ Artists coordinating tours (WiFi fails)</p>
                                <p>→ Disaster zones needing healing + coordination</p>
                                <p className="text-cyan-400 font-bold mt-2">= DAILY LIFE, NEED WARMTH + HELP</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-green-500/20 border-2 border-pink-500 rounded-lg p-4 mt-4">
                        <p className="text-pink-400 font-black text-sm mb-2 text-center">THE BRIDGE:</p>
                        <p className="text-white text-xs text-center mb-2">
                            Activists use Bitchat to organize → Students use UF51 to survive
                        </p>
                        <p className="text-cyan-400 text-xs text-center mb-2">
                            Same tech = they can MESSAGE each other cross-platform
                        </p>
                        <p className="text-green-400 text-xs font-bold text-center">
                            Bitchat + UF51 = Unstoppable freedom ecosystem ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* WHAT WE'RE DOING */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 rounded-2xl p-8">
                    <h2 className="text-cyan-400 font-black text-2xl font-mono mb-6 text-center">
                        OUR IMPLEMENTATION
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">PHASE 1 (NOW):</p>
                            <p className="text-white text-sm mb-2">Study Bitchat whitepaper + open source code ✓</p>
                            <p className="text-cyan-400 text-sm mb-2">Understand Noise Protocol, BLE mesh, relay logic ✓</p>
                            <p className="text-gray-400 text-xs">Status: Reading their work, learning from their brilliance</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">PHASE 2 (NEXT):</p>
                            <p className="text-white text-sm mb-2">Study Bitchat codebase (permissionlesstech) ✓</p>
                            <p className="text-white text-sm mb-2">Add lost & found tracking layer on top ✓</p>
                            <p className="text-white text-sm mb-2">Test with 10-50 students at Edinburgh ✓</p>
                            <p className="text-white text-sm mb-2">Distribute via IPFS + torrent (zero barriers) ✓</p>
                            <p className="text-gray-400 text-xs">Status: Ready to build when you say go</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">PHASE 3 (MONTH 2-3):</p>
                            <p className="text-white text-sm mb-2">Integrate Lightning payments (LNMesh research)</p>
                            <p className="text-white text-sm mb-2">Add healing frequencies to audio streams</p>
                            <p className="text-white text-sm mb-2">Build student safety protocols</p>
                            <p className="text-gray-400 text-xs">Status: Architecture ready, needs testing</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-pink-500/20 border-2 border-green-500 rounded p-4">
                            <p className="text-green-400 font-black mb-2">CREDIT WHERE DUE:</p>
                            <p className="text-white text-xs mb-2">
                                Every UF51 mesh feature will credit: "Built on Bitchat protocol by @jack"
                            </p>
                            <p className="text-cyan-400 text-xs mb-2">
                                Our whitepapers link to his whitepaper
                            </p>
                            <p className="text-pink-400 text-xs font-bold">
                                Standing on giants' shoulders, not pretending we invented it ♾️❤️♾️
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded p-4 mt-4">
                            <p className="text-cyan-400 font-black mb-2">ZERO BARRIERS DISTRIBUTION:</p>
                            <p className="text-white text-xs mb-2">
                                🚫 Not on GitHub (Microsoft owns it = barrier)
                            </p>
                            <p className="text-green-400 text-xs mb-2">
                                ✓ IPFS (unstoppable, decentralized)
                            </p>
                            <p className="text-green-400 text-xs mb-2">
                                ✓ Torrent (peer-to-peer, no servers)
                            </p>
                            <p className="text-green-400 text-xs mb-2">
                                ✓ Direct download (no login, no barriers)
                            </p>
                            <p className="text-pink-400 text-xs font-bold mt-2">
                                Download code = no permission needed ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>

                {/* BACK BUTTON */}
                <div className="flex gap-4">
                    <Link to={createPageUrl('MeshTechWhitepaper')} className="flex-1">
                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg">
                            READ OUR MESH TECH WHITEPAPER →
                        </button>
                    </Link>
                    <Link to={createPageUrl('Prof51')} className="flex-1">
                        <button className="w-full border-2 border-cyan-500 text-cyan-400 font-bold py-4 rounded-lg bg-transparent hover:bg-cyan-500/10">
                            ← BACK TO PROF51
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}