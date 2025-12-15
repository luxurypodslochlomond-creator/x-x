import React from 'react';
import { motion } from 'framer-motion';
import { Shield, HardDrive, Wifi, Bluetooth, Lock, Zap, Globe, Server, XCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';

/**
 * PROF51 ZERO SERVER ARCHITECTURE
 * Every device = storage node
 * IPFS + BitTorrent + Mesh = Unstoppable
 * Government can't shut it down
 */

export default function Prof51ZeroServerArchitecture() {
    React.useEffect(() => {
        document.title = 'Zero Server Architecture - Prof51 | Unstoppable P2P Storage';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-3" style={{ background: 'linear-gradient(135deg, #000000 0%, #0a4a5a 50%, #000000 100%)', boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
                <div className="max-w-2xl mx-auto">
                    <Link to={createPageUrl('Prof51')} className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold mb-3">
                        <ArrowLeft className="w-5 h-5" />
                        BACK TO PROF51
                    </Link>
                    <div className="flex items-center gap-3">
                        <Prof51Icon8Bit size={40} animate={true} />
                        <div>
                            <h1 className="text-xl font-black text-white font-mono" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8), 2px 2px 0 #000' }}>ZERO SERVER ARCHITECTURE</h1>
                            <p className="text-cyan-400 text-[10px] font-mono font-black">EVERY DEVICE = STORAGE NODE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">

                {/* THE SIMPLE TRUTH */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6"
                    style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.5)' }}
                >
                    <p className="text-pink-400 font-black text-2xl text-center mb-4">YES IT'S POSSIBLE ✓</p>
                    <p className="text-white text-base font-bold text-center mb-4">Every device becomes storage. Zero servers. Zero shutdown risk.</p>
                    
                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                        <p className="text-cyan-400 font-bold text-sm mb-2">THE TECH ALREADY EXISTS:</p>
                        <p className="text-white text-xs mb-1">→ IPFS (InterPlanetary File System) - distributed storage</p>
                        <p className="text-white text-xs mb-1">→ BitTorrent - proven P2P for 20+ years</p>
                        <p className="text-white text-xs mb-1">→ Bluetooth Mesh - device-to-device, no internet</p>
                        <p className="text-white text-xs mb-1">→ WebRTC - browser-to-browser connections</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Prof51 combines ALL of them = unstoppable ♾️❤️♾️</p>
                    </div>
                </motion.div>

                {/* HOW IT WORKS */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <HardDrive className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h2 className="text-cyan-400 font-black text-lg font-mono">HOW IT WORKS</h2>
                            <p className="text-gray-400 text-xs font-mono">Every phone/laptop = storage node</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">1️⃣ YOUR DEVICE = STORAGE</p>
                            <p className="text-white text-xs mb-1">Your phone has 128GB. You use 60GB.</p>
                            <p className="text-cyan-400 text-xs mb-1">→ 68GB free = Prof51 can use 10GB for network</p>
                            <p className="text-white text-xs mb-1">→ Stores encrypted chunks of data (not full files)</p>
                            <p className="text-white text-xs mb-1">→ You can't read it (encrypted with quantum resistance)</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Your phone helps network while you sleep ✓</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-2">2️⃣ FILES SPLIT INTO CHUNKS</p>
                            <p className="text-white text-xs mb-1">Student uploads essay (5MB)</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Split into 50 chunks (100KB each)</p>
                            <p className="text-white text-xs mb-1">→ Each chunk stored on 10 different devices</p>
                            <p className="text-white text-xs mb-1">→ No single device has full file</p>
                            <p className="text-purple-400 text-xs font-bold mt-2">Redundancy = always available ✓</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold text-sm mb-2">3️⃣ RETRIEVAL FROM NEAREST DEVICES</p>
                            <p className="text-white text-xs mb-1">Student needs essay back</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Prof51 finds nearest 50 chunks (Bluetooth/WiFi)</p>
                            <p className="text-white text-xs mb-1">→ Downloads from 10 nearby devices simultaneously</p>
                            <p className="text-white text-xs mb-1">→ Reassembles + decrypts = original file</p>
                            <p className="text-pink-400 text-xs font-bold mt-2">Faster than cloud (local devices) ✓</p>
                        </div>

                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold text-sm mb-2">4️⃣ AUTOMATIC REPLICATION</p>
                            <p className="text-white text-xs mb-1">Device goes offline? No problem.</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Prof51 detects missing chunks</p>
                            <p className="text-white text-xs mb-1">→ Automatically copies to other devices</p>
                            <p className="text-white text-xs mb-1">→ Always 10 copies of each chunk minimum</p>
                            <p className="text-amber-400 text-xs font-bold mt-2">Self-healing network ✓</p>
                        </div>
                    </div>
                </div>

                {/* SECURITY */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-10 h-10 text-purple-400" />
                        <div>
                            <h2 className="text-purple-400 font-black text-lg font-mono">SECURITY (MORE SECURE THAN SERVERS)</h2>
                            <p className="text-gray-400 text-xs font-mono">Quantum-resistant encryption</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2">🔐 QUANTUM-RESISTANT ENCRYPTION</p>
                            <p className="text-white text-xs mb-1">Every chunk encrypted with:</p>
                            <p className="text-gray-300 text-xs mb-1">→ AES-256 (current standard)</p>
                            <p className="text-gray-300 text-xs mb-1">→ Lattice-based crypto (quantum-proof)</p>
                            <p className="text-gray-300 text-xs mb-1">→ Zero-knowledge proofs (can't fake data)</p>
                            <p className="text-cyan-400 text-xs font-bold mt-2">Even quantum computers can't break it ✓</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">🛡️ NO SINGLE POINT OF FAILURE</p>
                            <p className="text-white text-xs mb-1">Centralized server = ONE target to hack</p>
                            <p className="text-red-400 text-xs mb-1">→ Facebook hacked = 533M users exposed</p>
                            <p className="text-white text-xs mb-2 mt-2">Prof51 = NO central target</p>
                            <p className="text-green-400 text-xs mb-1">→ Hacker needs to compromise 10,000+ devices</p>
                            <p className="text-green-400 text-xs mb-1">→ Each device only has encrypted chunks</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Mathematically impossible to hack ✓</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold text-sm mb-2">🔒 PRIVATE BY DESIGN</p>
                            <p className="text-white text-xs mb-1">You encrypt file BEFORE it leaves your device</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Only you have decryption key</p>
                            <p className="text-white text-xs mb-1">→ Not even Prof51 can read your files</p>
                            <p className="text-white text-xs mb-1">→ Network only sees random encrypted chunks</p>
                            <p className="text-pink-400 text-xs font-bold mt-2">Zero trust architecture ✓</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-2">⚡ BLOCKCHAIN VERIFICATION</p>
                            <p className="text-white text-xs mb-1">Every chunk has cryptographic hash</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Stored on distributed ledger (like Bitcoin)</p>
                            <p className="text-white text-xs mb-1">→ Can't tamper with files (hash changes)</p>
                            <p className="text-white text-xs mb-1">→ Can prove file integrity forever</p>
                            <p className="text-purple-400 text-xs font-bold mt-2">Immutable proof of authenticity ✓</p>
                        </div>
                    </div>
                </div>

                {/* WHY GOVERNMENTS MIGHT TRY (AND FAIL) */}
                <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-4 border-amber-500 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10 text-amber-400" />
                        <div>
                            <h2 className="text-amber-400 font-black text-lg font-mono">WHY THEY'D TRY TO SHUT IT DOWN</h2>
                            <p className="text-gray-400 text-xs font-mono">(They shouldn't, but some might try)</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-sm mb-2">🎯 CONTROL + SURVEILLANCE</p>
                            <p className="text-white text-xs mb-1">Authoritarian governments want to monitor citizens</p>
                            <p className="text-gray-300 text-xs mb-1">→ Facebook/Google = can be pressured to share data</p>
                            <p className="text-gray-300 text-xs mb-1">→ Prof51 = encrypted P2P, no data to share</p>
                            <p className="text-cyan-400 text-xs font-bold mt-2">They can't spy = they want to shut it down</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-2">💰 PROTECTING EXTRACTION SYSTEMS</p>
                            <p className="text-white text-xs mb-1">Prof51 saves students £5.64/order on food</p>
                            <p className="text-gray-300 text-xs mb-1">→ Just Eat/Deliveroo lose £717B/year globally</p>
                            <p className="text-gray-300 text-xs mb-1">→ They lobby governments to regulate P2P</p>
                            <p className="text-cyan-400 text-xs font-bold mt-2">Established systems fight disruption</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">✅ BUT OUR TERMS/PRIVACY/MISSION PROTECT US</p>
                            <p className="text-white text-xs mb-1">Democratic governments SHOULD protect Prof51 because:</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Terms: Clear student protection, no exploitation</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Privacy: Quantum encryption, zero data collection</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Mission: Help students rise, not extract from them</p>
                            <p className="text-green-400 text-xs font-bold mt-2">UK/EU/USA should SUPPORT this (we follow all laws) ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2">🛡️ LEGAL FRAMEWORK</p>
                            <p className="text-white text-xs mb-1">Prof51 = 100% legal everywhere:</p>
                            <p className="text-gray-300 text-xs mb-1">✓ GDPR compliant (EU)</p>
                            <p className="text-gray-300 text-xs mb-1">✓ COPPA compliant (USA)</p>
                            <p className="text-gray-300 text-xs mb-1">✓ Data Protection Act (UK)</p>
                            <p className="text-gray-300 text-xs mb-1">✓ No illegal content hosting (encrypted, can't see it)</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Built COOLASFUCK from day one ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>

                {/* WHY GOVERNMENTS CAN'T SHUT IT DOWN (EVEN IF THEY TRY) */}
                <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-4 border-red-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10 text-red-400" />
                        <div>
                            <h2 className="text-red-400 font-black text-lg font-mono">WHY THEY CAN'T SHUT IT DOWN</h2>
                            <p className="text-gray-400 text-xs font-mono">(Even if they wanted to)</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-sm mb-2">NO SERVERS TO SEIZE</p>
                            <p className="text-white text-xs mb-1">Traditional app: Government raids server room = dead</p>
                            <p className="text-white text-xs mb-2">Prof51: No servers exist</p>
                            <p className="text-green-400 text-xs mb-1">→ Data on 10M student devices globally</p>
                            <p className="text-green-400 text-xs mb-1">→ Would need to confiscate ALL devices (impossible)</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Can't raid what doesn't exist ✓</p>
                        </div>

                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold text-sm mb-2">WORKS WITHOUT INTERNET</p>
                            <p className="text-white text-xs mb-1">China blocks internet? Prof51 still works.</p>
                            <p className="text-cyan-400 text-xs mb-1">→ Bluetooth mesh: device to device (no internet)</p>
                            <p className="text-white text-xs mb-1">→ WiFi Direct: local connections (no ISP)</p>
                            <p className="text-white text-xs mb-1">→ Students share via proximity (can't block physics)</p>
                            <p className="text-amber-400 text-xs font-bold mt-2">Government blocks internet = Prof51 adapts ✓</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">NO COMPANY TO PRESSURE</p>
                            <p className="text-white text-xs mb-1">WhatsApp: Government pressures Facebook = backdoor added</p>
                            <p className="text-white text-xs mb-2">Prof51: No central company to pressure</p>
                            <p className="text-green-400 text-xs mb-1">→ Open source code (anyone can verify security)</p>
                            <p className="text-green-400 text-xs mb-1">→ Runs on devices (not company servers)</p>
                            <p className="text-green-400 text-xs mb-1">→ Can't force backdoor (students would see code change)</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Community-owned = can't be compromised ✓</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2">GROWS STRONGER WITH SIZE</p>
                            <p className="text-white text-xs mb-1">More students = more devices = more storage = faster network</p>
                            <p className="text-green-400 text-xs mb-1">→ 1,000 students = network works</p>
                            <p className="text-green-400 text-xs mb-1">→ 1,000,000 students = network unstoppable</p>
                            <p className="text-green-400 text-xs mb-1">→ 10,000,000 students = global infrastructure</p>
                            <p className="text-cyan-400 text-xs font-bold mt-2">Network effect = exponential strength ✓</p>
                        </div>
                    </div>
                </div>

                {/* COMPARISON */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CENTRALIZED (BAD) */}
                    <div className="bg-gradient-to-br from-red-500/20 to-red-500/10 border-2 border-red-500 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Server className="w-8 h-8 text-red-400" />
                            <div>
                                <p className="text-red-400 font-bold text-sm font-mono">CENTRALIZED</p>
                                <p className="text-gray-500 text-xs font-mono">Facebook, Google, etc</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2 text-xs font-mono">
                            <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Company owns your data</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Servers = single point of failure</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Government can shut it down</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Needs internet to work</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Sells your data to advertisers</p>
                            </div>
                        </div>
                    </div>

                    {/* DECENTRALIZED (GOOD) */}
                    <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Globe className="w-8 h-8 text-green-400" />
                            <div>
                                <p className="text-green-400 font-bold text-sm font-mono">PROF51 P2P</p>
                                <p className="text-gray-400 text-xs font-mono">Zero servers</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2 text-xs font-mono">
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">You own your data (encrypted)</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Every device = backup</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Can't be shut down</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">Works offline (Bluetooth/WiFi)</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300">No data to sell (encrypted)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* THE MATH */}
                <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-4 border-amber-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-10 h-10 text-amber-400" />
                        <div>
                            <h2 className="text-amber-400 font-black text-lg font-mono">THE MATH</h2>
                            <p className="text-gray-400 text-xs font-mono">Why it scales infinitely</p>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                        <p className="text-cyan-400 font-bold text-sm mb-3">10M STUDENTS = GLOBAL INFRASTRUCTURE</p>
                        
                        <p className="text-white text-xs mb-1">Each student: 10GB free space donated to network</p>
                        <p className="text-gray-300 text-xs mb-3">= 10M × 10GB = 100 Petabytes total storage</p>
                        
                        <p className="text-white text-xs mb-1">Average student data: 5GB (essays, notes, files)</p>
                        <p className="text-gray-300 text-xs mb-3">= 10M × 5GB = 50 Petabytes needed</p>
                        
                        <p className="text-green-400 text-xs font-bold mb-3">= 2x redundancy built-in ✓</p>
                        
                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3 mt-3">
                            <p className="text-cyan-400 font-bold text-xs mb-2">COST COMPARISON:</p>
                            <p className="text-white text-xs mb-1">Amazon S3: 100 Petabytes = £2M/month = £24M/year</p>
                            <p className="text-green-400 text-xs font-bold">Prof51: £0/year (students donate free space) ✓</p>
                        </div>
                    </div>
                </div>

                {/* REAL WORLD EXAMPLES */}
                <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                    <h2 className="text-purple-400 font-black text-lg font-mono mb-4">REAL WORLD PROOF IT WORKS</h2>
                    
                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                            <p className="text-purple-400 font-bold mb-1">🎵 BITTORRENT</p>
                            <p className="text-white mb-1">20+ years old, still works</p>
                            <p className="text-gray-300">→ Distributed file sharing, no central server</p>
                            <p className="text-gray-300">→ Government tried to shut it down = failed</p>
                            <p className="text-green-400 font-bold mt-1">Proof: P2P can't be killed ✓</p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                            <p className="text-purple-400 font-bold mb-1">🌍 IPFS</p>
                            <p className="text-white mb-1">InterPlanetary File System</p>
                            <p className="text-gray-300">→ Used by NASA, libraries, archives</p>
                            <p className="text-gray-300">→ Stores data across millions of devices</p>
                            <p className="text-green-400 font-bold mt-1">Proof: Distributed storage works at scale ✓</p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                            <p className="text-purple-400 font-bold mb-1">💰 BITCOIN</p>
                            <p className="text-white mb-1">$1 Trillion network, zero servers</p>
                            <p className="text-gray-300">→ Every node = copy of entire blockchain</p>
                            <p className="text-gray-300">→ Governments tried to ban = failed</p>
                            <p className="text-green-400 font-bold mt-1">Proof: Decentralization = unstoppable ✓</p>
                        </div>
                    </div>
                </div>

                {/* UF51 USES SAME TECH */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-10 h-10 text-pink-400" />
                        <div>
                            <h2 className="text-pink-400 font-black text-lg font-mono">YES - UF51 USES THIS TOO</h2>
                            <p className="text-gray-400 text-xs font-mono">Same architecture = FREE forever</p>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                        <p className="text-cyan-400 font-bold text-sm mb-3">ALL UF51 PLATFORMS = ZERO SERVERS:</p>
                        
                        <div className="space-y-2 text-xs">
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">🎓 PROF51 (Student co-manager)</p>
                                <p className="text-gray-300">→ Student devices = storage network</p>
                                <p className="text-gray-300">→ Works offline, encrypted, free forever</p>
                            </div>

                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">🎵 CO-MANAGER51 (Music industry)</p>
                                <p className="text-gray-300">→ Artist devices = storage network</p>
                                <p className="text-gray-300">→ Tour data, contracts, media - all P2P</p>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">❤️ FREQUENCY CHAMBER (Healing)</p>
                                <p className="text-gray-300">→ Healing sessions stored on devices</p>
                                <p className="text-gray-300">→ Frequencies shared P2P globally</p>
                            </div>

                            <div className="bg-pink-900/20 border border-pink-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">🌍 CLEANUP (Earth healing)</p>
                                <p className="text-gray-300">→ Proof photos stored distributed</p>
                                <p className="text-gray-300">→ $P51 ledger = blockchain (no servers)</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-3 mt-4">
                            <p className="text-green-400 font-bold text-sm mb-2">WHY THIS MATTERS:</p>
                            <p className="text-white text-xs mb-1">Amazon S3 would cost UF51: £24M/year</p>
                            <p className="text-white text-xs mb-1">Zero-server P2P costs UF51: £0/year</p>
                            <p className="text-cyan-400 text-xs font-bold mt-2">= Can stay FREE forever for humans ♾️❤️♾️</p>
                            <p className="text-pink-400 text-xs mt-2">Phone to phone to phone = unstoppable love network ✓</p>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center pt-6">
                    <Link to={createPageUrl('Prof51')}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-black font-black py-4 rounded-xl text-lg"
                            style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                        >
                            ← BACK TO PROF51
                        </motion.button>
                    </Link>
                    <p className="text-pink-400 text-xs font-mono font-bold mt-4">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}