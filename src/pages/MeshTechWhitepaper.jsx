import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Heart, Zap, Shield, Users, Globe, CheckCircle } from 'lucide-react';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';

/**
 * MESH TECH WHITEPAPER
 * 
 * UF51 P2P Mesh vs BitChat (Jack Dorsey)
 * 
 * HONEST COMPARISON:
 * - Jack pioneered P2P mesh (2025)
 * - We're building on his foundation
 * - Our addition: LOVE-FIRST architecture
 * 
 * Thanking Jack = not arse licking, it's HONEST
 * He built open source tech. We're using it. That's how open source works.
 */

export default function MeshTechWhitepaper() {
    React.useEffect(() => {
        document.title = 'P2P Mesh Tech | Better Than BitChat for Love';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pb-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                
                {/* HEADER */}
                <div className="text-center mb-12">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                        className="inline-block mb-6"
                    >
                        <Radio className="w-20 h-20 text-cyan-400" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white font-mono mb-4">P2P MESH TECH</h1>
                    <p className="text-xl text-cyan-400 font-bold font-mono">Better Than BitChat for Love ♾️</p>
                    <p className="text-gray-500 text-sm font-mono mt-2">Built on Dorsey's foundation. Built for humanity.</p>
                </div>

                {/* JACK DORSEY CREDIT */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-2xl p-8 mb-8" style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.4)' }}>
                    <div className="flex items-center gap-4 mb-6">
                        <Heart className="w-12 h-12 text-pink-400" />
                        <div>
                            <h2 className="text-pink-400 font-black text-2xl font-mono">CREDIT WHERE IT'S DUE</h2>
                            <p className="text-gray-400 text-xs font-mono">Jack Dorsey pioneered this. We're building on his work.</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-white text-sm font-mono">
                        <div className="bg-black/60 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">JACK'S INNOVATIONS (2023-2025):</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ <strong className="text-white">Nostr</strong> - Decentralized protocol (open source, censorship-resistant)</li>
                                <li>✓ <strong className="text-white">BitChat</strong> - P2P Bluetooth mesh messaging (July 2025, works offline)</li>
                                <li>✓ <strong className="text-white">No servers</strong> - Device-to-device direct communication</li>
                                <li>✓ <strong className="text-white">Open source</strong> - Anyone can build on it (MIT license)</li>
                            </ul>
                            <p className="text-green-400 font-bold mt-3 text-xs">
                                Jack proved P2P mesh works at scale. We owe him that foundation.
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">IS THANKING HIM ARSE LICKING?</p>
                            <p className="text-white text-sm mb-2">
                                <strong className="text-green-400">NO.</strong> It's honest attribution.
                            </p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>→ He built open source tech</li>
                                <li>→ We're using it (that's how open source works)</li>
                                <li>→ Giving credit = respectful, not "arse licking"</li>
                                <li>→ We're not asking for permission or approval</li>
                                <li>→ We're building something DIFFERENT on his foundation</li>
                            </ul>
                            <p className="text-pink-400 font-bold text-xs mt-3">
                                Standing on shoulders = smart. Pretending you built the ground = dickwad move.
                            </p>
                        </div>
                    </div>
                </div>

                {/* THE COMPARISON */}
                <div className="bg-black border-2 border-cyan-500 rounded-2xl p-8 mb-8">
                    <h2 className="text-cyan-400 font-black text-2xl font-mono mb-6 text-center">BITCHAT vs UF51 MESH</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* BITCHAT */}
                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-xl p-6">
                            <p className="text-purple-400 font-black text-lg font-mono mb-4">BITCHAT (Jack's Vision)</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">Bluetooth P2P mesh</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">Works offline</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">Censorship-resistant</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">Open source</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">General messaging</p>
                                </div>
                            </div>
                            <p className="text-purple-300 text-xs font-mono mt-4 font-bold">
                                FOCUS: Freedom from censorship
                            </p>
                        </div>

                        {/* UF51 MESH */}
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-xl p-6">
                            <p className="text-cyan-400 font-black text-lg font-mono mb-4">UF51 MESH (Our Vision)</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">Everything BitChat has</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300"><strong className="text-pink-400">+ Love-first architecture</strong></p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300"><strong className="text-pink-400">+ Simple IN/OUT comms</strong> (managing artists)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300"><strong className="text-pink-400">+ AI51 integration</strong> (smart responses)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300"><strong className="text-pink-400">+ Healing frequency transmission</strong></p>
                                </div>
                            </div>
                            <p className="text-cyan-300 text-xs font-mono mt-4 font-bold">
                                FOCUS: Freedom + Healing + Zero stress
                            </p>
                        </div>
                    </div>
                </div>

                {/* WHY OURS IS DIFFERENT */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-2xl p-8 mb-8">
                    <h2 className="text-green-400 font-black text-2xl font-mono mb-6">WHY UF51 MESH IS DIFFERENT:</h2>

                    <div className="space-y-4 text-white text-sm font-mono">
                        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">1. ULTRA-SIMPLE (Scott's Need):</p>
                            <p className="text-gray-300 text-sm mb-2">BitChat = full messaging app. UF51 = <strong className="text-white">binary choice only</strong>.</p>
                            <p className="text-green-400 text-xs">
                                "London gig tomorrow?" → Band taps IN or OUT → Scott sees results → Done.
                            </p>
                            <p className="text-pink-400 text-xs mt-2">
                                Managing artists like kids = needs kids-level simplicity ✓
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">2. LOVE-FIRST (Not Just Freedom):</p>
                            <p className="text-gray-300 text-sm mb-2">BitChat = resist censorship. UF51 = <strong className="text-white">transmit healing</strong>.</p>
                            <p className="text-cyan-400 text-xs">
                                Messages can include 432Hz embedded audio, healing frequencies, AI51 gentle nudges.
                            </p>
                            <p className="text-green-400 text-xs mt-2">
                                Not just "free speech" - "healing speech" ♾️
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">3. AI51 BUILT-IN:</p>
                            <p className="text-gray-300 text-sm mb-2">BitChat = person-to-person. UF51 = <strong className="text-white">AI51 co-pilot</strong>.</p>
                            <p className="text-purple-400 text-xs">
                                Scott: "Send this to band" → AI51 drafts message → Band gets it → IN/OUT responses auto-tallied.
                            </p>
                            <p className="text-amber-400 text-xs mt-2">
                                AI handles busywork = zero stress for Scott ✓
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">4. CONTEXT-AWARE:</p>
                            <p className="text-gray-300 text-sm mb-2">BitChat = general messaging. UF51 = <strong className="text-white">knows Scott's life</strong>.</p>
                            <p className="text-green-400 text-xs">
                                "Festival this weekend?" → AI51 knows which artists, checks calendar, suggests who to ask.
                            </p>
                        </div>
                    </div>
                </div>

                {/* TECHNICAL COMPARISON */}
                <div className="bg-black border-2 border-purple-500 rounded-2xl p-8 mb-8">
                    <h2 className="text-purple-400 font-black text-2xl font-mono mb-6">TECHNICAL COMPARISON:</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm font-mono">
                            <thead>
                                <tr className="border-b-2 border-gray-700">
                                    <th className="text-left p-3 text-gray-400">FEATURE</th>
                                    <th className="text-center p-3 text-purple-400">BitChat</th>
                                    <th className="text-center p-3 text-cyan-400">UF51 Mesh</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr className="border-b border-gray-800">
                                    <td className="p-3">Bluetooth P2P</td>
                                    <td className="text-center p-3">✓</td>
                                    <td className="text-center p-3 text-green-400">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="p-3">Works Offline</td>
                                    <td className="text-center p-3">✓</td>
                                    <td className="text-center p-3 text-green-400">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="p-3">Open Source</td>
                                    <td className="text-center p-3">✓</td>
                                    <td className="text-center p-3 text-green-400">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="p-3">Full Messaging</td>
                                    <td className="text-center p-3">✓</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                </tr>
                                <tr className="border-b border-gray-800 bg-cyan-900/20">
                                    <td className="p-3">Simple IN/OUT</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                    <td className="text-center p-3 text-green-400 font-bold">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800 bg-purple-900/20">
                                    <td className="p-3">AI Co-Pilot</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                    <td className="text-center p-3 text-green-400 font-bold">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800 bg-pink-900/20">
                                    <td className="p-3">Healing Frequencies</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                    <td className="text-center p-3 text-green-400 font-bold">✓</td>
                                </tr>
                                <tr className="border-b border-gray-800 bg-green-900/20">
                                    <td className="p-3">Context Memory</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                    <td className="text-center p-3 text-green-400 font-bold">✓</td>
                                </tr>
                                <tr className="bg-amber-900/20">
                                    <td className="p-3">Love-First Architecture</td>
                                    <td className="text-center p-3 text-gray-600">—</td>
                                    <td className="text-center p-3 text-green-400 font-bold">✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-gray-500 text-xs font-mono mt-4 text-center">
                        Different tools for different purposes. Both valid. ✓
                    </p>
                </div>

                {/* SCOTT'S USE CASE */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-4 border-amber-500 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <BrosBond8Bit size={48} animate={true} />
                        <div>
                            <h2 className="text-amber-400 font-black text-2xl font-mono">SCOTT'S NEED (Why We Built This)</h2>
                            <p className="text-gray-400 text-xs font-mono">Managing artists = like managing kids</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-white text-sm font-mono">
                        <div className="bg-black/60 border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">THE PROBLEM:</p>
                            <p className="text-gray-300 text-sm mb-2">Scott manages 5-10 artists. Needs simple YES/NO for gigs, sessions, travel.</p>
                            <p className="text-red-400 text-xs">
                                WhatsApp = 47 messages, half ignored, stress x1000
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">THE SOLUTION:</p>
                            <p className="text-white text-sm mb-2">Send: "London gig tomorrow?"</p>
                            <p className="text-cyan-400 text-sm mb-2">Band gets: [IN] or [OUT] buttons</p>
                            <p className="text-pink-400 text-sm mb-2">Scott sees: 3 IN, 2 OUT</p>
                            <p className="text-green-400 text-xs font-bold">
                                Done. Zero stress. Works at festivals with shit signal. ✓
                            </p>
                        </div>

                        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">WHY P2P MATTERS FOR MUSIC:</p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>→ Festivals = shit WiFi (Bluetooth mesh works)</li>
                                <li>→ On tour = international roaming costs (P2P = free)</li>
                                <li>→ Backstage = no signal (device-to-device still works)</li>
                                <li>→ Van between gigs = middle of nowhere (mesh chain connects)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CAN WE USE BITCHAT CODE? */}
                <div className="bg-black border-2 border-green-500 rounded-2xl p-8 mb-8">
                    <h2 className="text-green-400 font-black text-2xl font-mono mb-6">CAN WE USE BITCHAT CODE?</h2>

                    <div className="space-y-4 text-white text-sm font-mono">
                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">YES - IT'S OPEN SOURCE:</p>
                            <p className="text-gray-300 text-sm mb-2">
                                BitChat = MIT License (same as ours). That means:
                            </p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>✓ We can use the code</li>
                                <li>✓ We can modify it</li>
                                <li>✓ We can build on it</li>
                                <li>✓ We just need to give credit (which we do)</li>
                            </ul>
                        </div>

                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">WHAT WE'RE DOING:</p>
                            <p className="text-white text-sm mb-2">
                                1. Fork BitChat's Bluetooth mesh layer (Jack's genius work)
                            </p>
                            <p className="text-white text-sm mb-2">
                                2. Strip out complex messaging (we don't need it)
                            </p>
                            <p className="text-white text-sm mb-2">
                                3. Add: Simple IN/OUT • AI51 intelligence • Healing frequencies
                            </p>
                            <p className="text-green-400 font-bold text-xs mt-3">
                                Different product. Same foundation. Both open source. ♾️❤️♾️
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">WILL JACK CARE?</p>
                            <p className="text-white text-sm mb-2">
                                Probably not - he WANTS people to build on his work (that's why it's open source).
                            </p>
                            <p className="text-cyan-400 text-xs">
                                If anything, he'd be stoked someone's using it for planetary healing vs just "free speech"
                            </p>
                        </div>
                    </div>
                </div>

                {/* THE HONEST TAKE */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-2xl p-8">
                    <h2 className="text-pink-400 font-black text-2xl font-mono mb-6 text-center">THE HONEST TAKE:</h2>

                    <div className="space-y-4 text-white text-sm font-mono">
                        <p className="text-lg text-center">
                            <strong className="text-cyan-400">Jack built the roads.</strong>
                            <br/>
                            <strong className="text-pink-400">We're driving healing trucks on them.</strong>
                        </p>

                        <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">WHAT WE OWE JACK:</p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>✓ P2P mesh networking proof-of-concept</li>
                                <li>✓ Bluetooth protocol optimization</li>
                                <li>✓ Open source commitment (showing it's possible)</li>
                                <li>✓ Decentralization without crypto hype</li>
                            </ul>
                        </div>

                        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">WHAT WE'RE ADDING:</p>
                            <ul className="space-y-1 text-xs text-gray-300">
                                <li>✓ Love-first (not just freedom-first)</li>
                                <li>✓ Simplicity for stressed managers</li>
                                <li>✓ AI51 co-pilot integration</li>
                                <li>✓ Healing frequency transmission</li>
                                <li>✓ Context memory (knows Scott's business)</li>
                            </ul>
                        </div>

                        <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4 text-center">
                            <p className="text-pink-400 font-bold mb-2">IS THANKING JACK ARSE LICKING?</p>
                            <p className="text-white text-lg mb-2">
                                <strong className="text-green-400">NO.</strong>
                            </p>
                            <p className="text-gray-300 text-xs">
                                He built something genuinely useful. Open sourced it. We're using it.
                                <br/>That's how progress works. Standing on shoulders = smart.
                            </p>
                            <p className="text-cyan-400 font-bold text-xs mt-3">
                                We're not asking for approval. We're giving honest credit. ✓
                            </p>
                        </div>
                    </div>
                </div>

                {/* WHAT WE'RE NOT DOING */}
                <div className="bg-black border-2 border-red-500 rounded-2xl p-6 mb-8">
                    <h3 className="text-red-400 font-black text-xl font-mono mb-4">WHAT WE'RE NOT DOING:</h3>
                    <ul className="space-y-2 text-sm font-mono text-gray-300">
                        <li>❌ Copying BitChat and calling it ours</li>
                        <li>❌ Pretending we invented P2P mesh</li>
                        <li>❌ Asking Jack for permission (it's open source)</li>
                        <li>❌ Competing with BitChat (different use case)</li>
                        <li>❌ Hiding where we got the foundation</li>
                    </ul>
                    <p className="text-green-400 font-bold text-xs mt-4">
                        Transparent. Honest. Building on giants. ♾️❤️♾️
                    </p>
                </div>

                {/* FOOTER */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 text-xs font-mono mb-2">
                        Built on Jack Dorsey's BitChat foundation • Enhanced for love + healing
                    </p>
                    <p className="text-gray-700 text-xs font-mono">
                        Both open source • Both decentralized • Different purposes • Both valid ✓
                    </p>
                    <p className="text-cyan-400 text-sm font-mono mt-4 font-bold">
                        Props to Jack for pioneering this. We're just adding healing. ♾️❤️♾️
                    </p>
                </div>
            </div>
        </div>
    );
}