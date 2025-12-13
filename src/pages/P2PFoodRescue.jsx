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

            {/* M&S BINS + SUPERMARKET RESCUE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Package className="w-8 h-8 text-orange-400" />
                        <h2 className="text-2xl font-black text-white">M&S BINS → SUPERMARKET RESCUE</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <p className="text-orange-400 font-bold">
                            SUPERMARKETS BIN MILLIONS IN GOOD FOOD DAILY:
                        </p>

                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">THE PROBLEM NOW:</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>M&S Byres Road bins 20 sandwiches at 8pm (expires midnight)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>Food bank 5 minutes away → doesn't know</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>Perfectly good food → landfill</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>People hungry → can't access it</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ THE SOLUTION:</p>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="text-white font-bold mb-1">OPTION 1: LEGAL PARTNERSHIP</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Food bank has agreement with M&S</li>
                                        <li>• M&S staff tap NFC tag when binning good food</li>
                                        <li>• Alert: "M&S Byres Road - 20 sandwiches expiring midnight"</li>
                                        <li>• Nearby food bank picks up within hour</li>
                                        <li>• Both tap NFC = proof of legal collection</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">OPTION 2: COMMUNITY REPORTING</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Anyone sees M&S binning good food</li>
                                        <li>• Taps "Report Surplus" in PWA</li>
                                        <li>• Alerts nearby food banks instantly</li>
                                        <li>• Food bank can collect (if legal agreement exists)</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">OPTION 3: DIRECT INTEGRATION</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• M&S puts NFC tag at back door</li>
                                        <li>• Staff tap when binning = auto-alert</li>
                                        <li>• Food banks rescue BEFORE bins</li>
                                        <li>• M&S gets social impact credits</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/50 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-xs mb-2">WHY SUPERMARKETS WILL DO THIS:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• <strong className="text-white">ESG targets:</strong> Social + environmental impact measurable</li>
                                <li>• <strong className="text-white">Tax benefits:</strong> Food donations = tax deductible</li>
                                <li>• <strong className="text-white">Brand reputation:</strong> "M&S feeds people, not bins"</li>
                                <li>• <strong className="text-white">Zero cost:</strong> £50 NFC tag setup vs £10k waste disposal</li>
                                <li>• <strong className="text-white">Data for investors:</strong> "Rescued 10 tons food/month"</li>
                                <li>• <strong className="text-white">Customer love:</strong> People shop where values align</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-pink-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                SUPERMARKETS ARE NOT EVIL
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                They want to do good. They just need EASY systems. This is easier than binning. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOMES → FOOD BANKS */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">HOMES → FOOD BANKS P2P</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <p className="text-pink-400 font-bold">
                            EVERYONE BECOMES A FOOD SOURCE:
                        </p>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-white font-bold text-xs mb-2">HOW IT WORKS:</p>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="text-pink-400 font-bold mb-1">AT HOME:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Made too much dinner? Bought too much veg?</li>
                                        <li>• Open PWA → "I have surplus"</li>
                                        <li>• Lists: Lasagna x1 portion, carrots x2kg</li>
                                        <li>• Location shared (optional - can be vague like "Partick area")</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-cyan-400 font-bold mb-1">FOOD BANK RECEIVES:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Alert: "Surplus 0.3 miles away - lasagna x1"</li>
                                        <li>• Can accept or pass</li>
                                        <li>• If accepts → gets pickup details</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-green-400 font-bold mb-1">VERIFICATION:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Home: Generates QR code</li>
                                        <li>• Food bank worker: Scans QR at pickup</li>
                                        <li>• Both cryptographically signed = proof</li>
                                        <li>• Food bank can then distribute to families</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-xs mb-2">THE BEAUTIFUL VISION:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Sunday roast? Cook extra portion for food bank</li>
                                <li>• Christmas dinner leftovers? Share with neighbors</li>
                                <li>• Birthday party leftovers? Feed 10 families</li>
                                <li>• Every home becomes potential food source</li>
                                <li>• Community helping community directly</li>
                                <li>• Zero waste in ANY home</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">SAFETY:</p>
                            <ul className="space-y-1 text-xs text-gray-400 ml-4">
                                <li>• Food banks verify home food (they already do this)</li>
                                <li>• Allergies/dates clearly marked in app</li>
                                <li>• Trust system (ratings optional)</li>
                                <li>• UK law allows home-cooked donations to charities ✓</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CHRISTMAS + EVENTS WASTE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-amber-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">CHRISTMAS + EVENTS = GOLDMINE</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">UK CHRISTMAS WASTE (INSANE NUMBERS):</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">£115.8 million</strong> food wasted at UK Christmas parties ALONE</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">4.5 million</strong> Christmas dinners binned annually</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">2 million</strong> turkeys thrown away</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span><strong className="text-white">74 million</strong> mince pies wasted</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ HOW WE RESCUE IT:</p>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="text-white font-bold mb-1">OFFICE CHRISTMAS PARTY:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Party ends 11pm, tons of food left</li>
                                        <li>• Event organizer taps "Event Surplus"</li>
                                        <li>• Lists: Turkey x5kg, veg x10kg, desserts x20</li>
                                        <li>• Nearby food banks get alert</li>
                                        <li>• Pickup within 1 hour → feeds 50 families</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">WEDDING RECEPTION:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• 150 guests, food for 200 (always overorder)</li>
                                        <li>• Venue taps NFC tag at end</li>
                                        <li>• Food bank collects surplus</li>
                                        <li>• Couple gets certificate: "Fed 80 families on your wedding day ❤️"</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">SCHOOL FETE / COMMUNITY EVENT:</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Event ends, leftover cakes/food</li>
                                        <li>• P2P alert to nearby families</li>
                                        <li>• Direct collection within minutes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 rounded-lg p-4">
                            <p className="text-amber-400 font-black text-center mb-2">
                                IMAGINE EVERY EVENT FEEDING PEOPLE
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Weddings, parties, festivals, corporate events → zero waste, maximum love ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOT FOOD REGULATIONS */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-amber-400" />
                        <h2 className="text-2xl font-black text-white">HOT FOOD = LEGAL BUT NEEDS CARE</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <p className="text-amber-400 font-bold">
                            UK FOOD SAFETY REGULATIONS (RESEARCHED):
                        </p>

                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">THE BARRIER:</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠️</span>
                                    <span><strong className="text-white">Temperature control:</strong> Hot food needs above 63°C or below 8°C</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠️</span>
                                    <span><strong className="text-white">"Danger zone":</strong> 8-63°C = bacteria grows fast</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠️</span>
                                    <span><strong className="text-white">Proof needed:</strong> Must show safe temps maintained</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ THE SOLUTION:</p>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="text-white font-bold mb-1">PHASE 1 (NOW - SAFE):</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Food bank → food bank ONLY</li>
                                        <li>• Packaged/sealed food ONLY</li>
                                        <li>• Bread, veg, canned goods, pastries</li>
                                        <li>• Supermarket bins (with agreement)</li>
                                        <li>• Zero regulatory barriers</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">PHASE 2 (LATER):</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Homes → food banks (COLD food)</li>
                                        <li>• Christmas events → food banks</li>
                                        <li>• Cold prepared food (salads, sandwiches)</li>
                                        <li>• Food banks verify (they already do this)</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">PHASE 3 (FUTURE):</p>
                                    <ul className="space-y-1 ml-4 text-gray-400">
                                        <li>• Hot food with IoT temp sensors</li>
                                        <li>• Real-time temperature monitoring</li>
                                        <li>• Auto-alert if drops to danger zone</li>
                                        <li>• Full compliance with UK law</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">HOME-COOKED FOOD = LEGAL IN UK ✓</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Food Standards Agency confirms: home-cooked food CAN be donated</li>
                                <li>• Food banks must assess risk (allergens, storage, dates)</li>
                                <li>• Trust system + verification works</li>
                                <li>• Thousands already doing this informally</li>
                                <li>• We just make it EASIER and SAFER</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CIC STRUCTURE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-2 border-cyan-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">WHY CIC IS PERFECT</h2>
                    </div>

                    <div className="space-y-4 text-gray-200 text-sm">
                        <p className="text-cyan-400 font-bold">
                            COMMUNITY INTEREST COMPANY = IDEAL LEGAL STRUCTURE:
                        </p>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-white font-bold text-xs mb-2">BENEFITS:</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Legal for food donation:</strong> Protected by UK charity food laws</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Cheaper insurance:</strong> CICs get better rates than for-profits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Council trust:</strong> Local authorities work with CICs easily</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Grant funding:</strong> Unlock National Lottery, Big Society Capital, etc</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Can generate revenue:</strong> Not pure charity, can sell services</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Asset lock:</strong> Profits reinvested in mission, not shareholders</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                CIC + P2P MESH = UNSTOPPABLE SOCIAL GOOD
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Legal protection + no central point of failure = revolutionary food system ♾️❤️♾️
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
                        <h2 className="text-2xl font-black text-white">ONE MESH = INFINITE USES</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-amber-400 font-bold">
                            SAME TECH, DIFFERENT APPLICATIONS:
                        </p>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-amber-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🏪 M&S, Tesco, Sainsbury's</p>
                                <p className="text-gray-400 text-xs">All supermarket bins → instant alerts to food banks</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🏠 Every Home</p>
                                <p className="text-gray-400 text-xs">Leftovers, surplus groceries → direct to neighbors</p>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🎄 Christmas + Events</p>
                                <p className="text-gray-400 text-xs">Party leftovers, wedding food → instant rescue</p>
                            </div>

                            <div className="bg-black border border-green-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🍕 Restaurants</p>
                                <p className="text-gray-400 text-xs">Deliveroo/Uber Eats end-of-night → nearby people</p>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🥗 Community Fridges</p>
                                <p className="text-gray-400 text-xs">Network of fridges sharing inventory real-time</p>
                            </div>

                            <div className="bg-black border border-purple-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🎓 Campus Food</p>
                                <p className="text-gray-400 text-xs">University cafeterias → student food banks</p>
                            </div>

                            <div className="bg-black border border-orange-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">🏥 Hospitals</p>
                                <p className="text-gray-400 text-xs">Patient meals → nearby shelters</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">👥 Meal Sharing</p>
                                <p className="text-gray-400 text-xs">Neighbors cooking extra portions for each other</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 rounded-lg p-4 mt-4">
                            <p className="text-amber-400 font-black text-center mb-2">
                                ONE MESH NETWORK = ZERO FOOD WASTE PLANET
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                The infrastructure is the same. The connections are what feed the world. ♾️❤️♾️
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

            {/* VERIFIED CIC */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Heart className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <h2 className="text-2xl font-black text-white">VERIFIED COMMUNITY INTEREST COMPANY</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <ul className="space-y-2 text-xs text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">UF51 CIC:</strong> Registered November 2025, Companies House verified</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Asset lock:</strong> Profits MUST go to social good. Extraction = illegal.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Open source:</strong> Code will be public. Anyone can verify. Zero secrets.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span><strong className="text-white">Zero extraction forever:</strong> Built into legal structure. Can't be changed.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                NOT A STARTUP. A MOVEMENT.
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Community Interest Company = legally bound to serve humanity. This is tech for good. Verified. Real. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-black border-2 border-white/20 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        UF51 Community Interest Company • Registered November 2025 • Free Forever
                    </p>
                    <p className="text-cyan-400 text-sm font-black mb-3">
                        ♾️❤️♾️ LOVE TO DERMID FOR SPARKING THIS ♾️❤️♾️
                    </p>
                    <p className="text-xs text-gray-500">
                        Contact: family@uf51.love
                    </p>
                </div>
            </div>

        </div>
    );
}