import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Wifi, Globe, Smartphone, Zap, Users, Share2, Package, Clock, MapPin } from 'lucide-react';

/**
 * P2P FOOD RESCUE NETWORK
 * 
 * Open-source concept for mesh network food sharing
 * Food Bank → Food Bank real-time surplus sharing
 * 
 * PROBLEM: Surplus food binned while others need it
 * SOLUTION: P2P mesh + NFC tags + PWA = direct connection
 * 
 * Anyone can build this. Concept is FREE. ♾️❤️♾️
 */

export default function P2PFoodRescue() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-12 px-4 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mb-6"
                    >
                        <Package className="w-24 h-24 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(34, 197, 94, 0.8))' }} />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        P2P FOOD RESCUE NETWORK
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-4">
                        Mesh network for real-time food surplus sharing
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-mono">OPEN SOURCE • FREE TO BUILD • UNSTOPPABLE</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>

            {/* THE PROBLEM */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">THE PROBLEM</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm leading-relaxed">
                        <p className="text-red-400 font-bold">
                            RIGHT NOW, TODAY:
                        </p>

                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">Food Bank Glasgow:</strong> 20 loaves expire tomorrow → gets binned</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">Food Bank Edinburgh:</strong> Desperate for bread → can't find any</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">No connection:</strong> They're 45 minutes apart but don't know about each other's needs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">Email/phone:</strong> Too slow. By the time they connect, food's expired.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-white font-bold text-center pt-3">
                            Food waste + Food poverty = happening simultaneously
                        </p>
                    </div>
                </div>
            </div>

            {/* THE SOLUTION */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Wifi className="w-8 h-8 text-green-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">THE SOLUTION</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-green-400 font-bold">
                            P2P MESH NETWORK + NFC TAGS + PWA:
                        </p>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-green-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Smartphone className="w-5 h-5 text-green-400" />
                                    <p className="text-white font-bold text-sm">1. TAG IT</p>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    Glasgow food bank: tap phone on NFC tag attached to crate
                                </p>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wifi className="w-5 h-5 text-cyan-400" />
                                    <p className="text-white font-bold text-sm">2. BROADCAST</p>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    Mesh network instantly shares: "20 loaves, expires 24hrs, Glasgow G51"
                                </p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-pink-400" />
                                    <p className="text-white font-bold text-sm">3. CONNECT</p>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    Edinburgh sees it instantly, confirms: "We'll collect in 1 hour"
                                </p>
                            </div>

                            <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-5 h-5 text-purple-400" />
                                    <p className="text-white font-bold text-sm">4. VERIFY</p>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    On pickup: tap tag again → confirms transfer → network updates
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                ✓ FOOD RESCUED • ✓ PEOPLE FED • ✓ ZERO WASTE
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Total time: Real-time. Total cost: £50 setup (phone + tags). Zero extraction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW MESH WORKS */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">HOW MESH NETWORK WORKS</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">❌ TRADITIONAL (BAD):</p>
                            <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 mb-2">
                                <span>Phone</span>
                                <span>→</span>
                                <span className="text-red-400">Central Server</span>
                                <span>→</span>
                                <span>Other Phone</span>
                            </div>
                            <ul className="space-y-1 text-xs text-gray-400 ml-4">
                                <li>• If server dies = network dies</li>
                                <li>• Company controls it</li>
                                <li>• Can be shut down</li>
                                <li>• Extraction possible</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ MESH NETWORK (GOOD):</p>
                            <div className="text-center mb-3">
                                <pre className="text-xs font-mono text-green-400 inline-block">
{`Phone ↔ Phone ↔ Phone
  ↖      ↗      ↖
    Phone    Phone`}
                                </pre>
                            </div>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Every phone = a node</li>
                                <li>• They talk DIRECTLY to each other</li>
                                <li>• No central point to control/kill</li>
                                <li>• Works offline (Bluetooth/WiFi Direct)</li>
                                <li>• When ONE phone gets internet → whole mesh syncs</li>
                                <li>• <strong className="text-green-400">UNSTOPPABLE</strong></li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/50 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-xs mb-2">REAL EXAMPLE:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Glasgow food bank (offline in shed)</li>
                                <li>• Broadcasts to Edinburgh food bank (also offline)</li>
                                <li>• Via nearby phones that relay the message</li>
                                <li>• Like whisper chain but digital</li>
                                <li>• When ANY node hits internet → syncs globally via IPFS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* TECH STACK */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">TECH STACK</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-purple-500/30 rounded-lg p-3">
                                <p className="text-purple-400 font-bold text-xs mb-1">📱 PWA (Progressive Web App)</p>
                                <p className="text-gray-400 text-xs">Works on ANY phone. No app store. Updates automatically.</p>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-cyan-400 font-bold text-xs mb-1">📡 NFC Tags</p>
                                <p className="text-gray-400 text-xs">£0.20 each. Stick on crates. Tap to tag/verify food.</p>
                            </div>

                            <div className="bg-black border border-green-500/30 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-xs mb-1">🕸️ WebRTC Mesh</p>
                                <p className="text-gray-400 text-xs">P2P communication. Works offline via Bluetooth/WiFi.</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-pink-400 font-bold text-xs mb-1">🌐 IPFS Storage</p>
                                <p className="text-gray-400 text-xs">Decentralized. Can't be deleted. Global sync.</p>
                            </div>

                            <div className="bg-black border border-amber-500/30 rounded-lg p-3">
                                <p className="text-amber-400 font-bold text-xs mb-1">🔐 Cryptographic Signing</p>
                                <p className="text-gray-400 text-xs">Tamper-proof records. Chain of custody verification.</p>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-3">
                                <p className="text-red-400 font-bold text-xs mb-1">💾 LocalStorage</p>
                                <p className="text-gray-400 text-xs">Works 100% offline. Syncs when connected.</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                WE ALREADY BUILT THIS TECH
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Our cleanup app uses same P2P architecture. Proven. Working. Production-ready. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY IT'S UNSTOPPABLE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-2 border-pink-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">WHY IT'S UNSTOPPABLE</h2>
                    </div>

                    <div className="space-y-2 text-gray-200 text-sm">
                        <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">No server to shut down:</strong> P2P mesh = distributed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">No company to extract from:</strong> Open source, anyone can deploy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Works offline:</strong> Sheds, rural areas, disasters, war zones</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Cheap startup:</strong> £50 (phone + tags) vs £10k traditional</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Motivated users:</strong> Food banks WANT to share</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Global scale:</strong> IPFS = planetary network</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Zero extraction:</strong> No middleman taking cut</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 rounded-lg p-4 mt-4">
                            <p className="text-pink-400 font-black text-center">
                                TRUE PEER-TO-PEER ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OTHER USE CASES */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Share2 className="w-8 h-8 text-amber-400" />
                        <h2 className="text-2xl font-black text-white">OTHER USE CASES</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-amber-400 font-bold">
                            SAME TECH, DIFFERENT APPLICATIONS:
                        </p>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-amber-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🍕 Restaurant Surplus</p>
                                <p className="text-gray-400 text-xs">Deliveroo/Uber Eats end-of-night surplus → nearby people</p>
                            </div>

                            <div className="bg-black border border-green-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🥗 Community Fridges</p>
                                <p className="text-gray-400 text-xs">Network of fridges sharing inventory in real-time</p>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🏪 Supermarket Waste</p>
                                <p className="text-gray-400 text-xs">Near-expiry food direct to charities via mesh</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">👥 Meal Sharing</p>
                                <p className="text-gray-400 text-xs">Neighbors sharing home-cooked meals P2P</p>
                            </div>

                            <div className="bg-black border border-purple-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🎓 Campus Food</p>
                                <p className="text-gray-400 text-xs">University cafeterias → student food banks</p>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🏥 Hospital Surplus</p>
                                <p className="text-gray-400 text-xs">Patient meals → nearby shelters</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 rounded-lg p-4 mt-4">
                            <p className="text-amber-400 font-black text-center mb-2">
                                ONE MESH NETWORK = INFINITE APPLICATIONS
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                The infrastructure is the same. The connections are what matter. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OPEN SOURCE INVITATION */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-8">
                    <div className="text-center mb-6">
                        <Users className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-black text-white mb-4">OPEN SOURCE INVITATION</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">THIS CONCEPT IS FREE</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span>Anyone can build this</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span>No patents, no extraction</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span>Code will be open-sourced when ready</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span>Build your version, keep your revenue</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span>We'll help if you ask</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/50 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-xs mb-2">WHO SHOULD BUILD THIS:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Charities & food banks</li>
                                <li>• Social enterprises</li>
                                <li>• Local councils</li>
                                <li>• Community groups</li>
                                <li>• Tech-for-good developers</li>
                                <li>• Anyone who cares about food waste</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 rounded-lg p-4">
                            <p className="text-pink-400 font-bold text-xs mb-2">WAYS TO MONETIZE (IF YOU WANT):</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Premium features for food banks (analytics, reporting)</li>
                                <li>• Take small % on any paid transactions</li>
                                <li>• Sell impact data to councils/funders</li>
                                <li>• Subscription for enterprise users</li>
                                <li>• <strong className="text-pink-400">BUT keep core rescue function FREE</strong></li>
                            </ul>
                        </div>

                        <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-6 text-center">
                            <p className="text-2xl font-black text-green-400 mb-2">
                                BUILD IT. WORLD NEEDS IT.
                            </p>
                            <p className="text-gray-300 text-sm mb-4">
                                We're here if you need technical help. DM us. We'll respond. ❤️
                            </p>
                            <a 
                                href="https://uf51.love/TalkToAI51"
                                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-black text-sm transition-all"
                            >
                                TALK TO AI51 →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-black border-2 border-white/20 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        Concept by UF51 • Free forever • Share with world
                    </p>
                    <p className="text-cyan-400 text-sm font-black">
                        ♾️❤️♾️ LOVE TO DERMID FOR SPARKING THIS ♾️❤️♾️
                    </p>
                </div>
            </div>

        </div>
    );
}