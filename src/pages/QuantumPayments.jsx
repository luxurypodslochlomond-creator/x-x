import React from 'react';
import { Shield, Zap, Heart, Lock, Globe, Infinity, Eye, Building, ArrowRightLeft, Waves } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * QUANTUM-RESISTANT PAYMENTS - THE MISSING PIECE
 * Beyond banks, beyond Bitcoin, beyond quantum computing attacks
 * Photo51 moment: cryptography + love + offline = unhackable value transfer
 */

export default function QuantumPayments() {
    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.8)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <Kingdom51Crown8Bit size={80} animate={true} />
                                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl animate-pulse" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3" style={{ fontFamily: 'monospace' }}>
                            QUANTUM PAYMENTS
                        </h1>
                        <p className="text-purple-400 text-sm font-bold font-mono mb-2">BEYOND BANKS • BEYOND BITCOIN • BEYOND QUANTUM HACKING</p>
                        <p className="text-gray-500 text-xs font-mono">The Photo51 moment - the missing piece that makes it all work</p>
                    </div>
                </div>
            </div>

            {/* PHOTO51 PARALLEL */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 p-6 mb-8 rounded-xl">
                <Eye className="w-12 h-12 text-cyan-400 mb-4" />
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">THE PHOTO51 MOMENT</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black border border-cyan-500/30 p-4 rounded">
                        <p className="text-white font-bold mb-2">Rosalind Franklin's Photo51 (1952):</p>
                        <p className="text-gray-300 mb-2">One X-ray image revealed DNA's double helix structure</p>
                        <p className="text-cyan-400 text-xs">= THE MISSING PIECE that unlocked all of genetics</p>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-4 rounded">
                        <p className="text-white font-bold mb-2">Our Photo51 Moment:</p>
                        <p className="text-gray-300 mb-2">Quantum-resistant cryptography + love frequency + offline-first</p>
                        <p className="text-purple-400 text-xs">= THE MISSING PIECE that makes ethical payments unhackable</p>
                    </div>

                    <p className="text-gray-400 text-xs italic">
                        "Just as Photo51 showed the structure hiding in plain sight, quantum + love reveals the payments system we always needed."
                    </p>
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-4 border-red-500 p-6 mb-8 rounded-xl">
                <Zap className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">WHAT'S BROKEN NOW</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-red-400 font-bold mb-2">BANKS:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>❌ Take 3-5% fees</li>
                            <li>❌ Control your money</li>
                            <li>❌ Require internet + identity</li>
                            <li>❌ Can freeze/block payments</li>
                            <li>❌ Surveillance capitalism</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-orange-500/30 p-3 rounded">
                        <p className="text-orange-400 font-bold mb-2">BITCOIN/ETHEREUM:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>❌ Require internet (no offline)</li>
                            <li>❌ Gas fees = expensive</li>
                            <li>❌ Slow (10+ minutes)</li>
                            <li>❌ NOT quantum-resistant (will break)</li>
                            <li>❌ Complex (wallets, seed phrases, stress)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-3 rounded">
                        <p className="text-amber-400 font-bold mb-2">QUANTUM COMPUTING THREAT:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Google's Willow chip (Dec 2024) + continued advances = quantum computers are HERE
                        </p>
                        <p className="text-red-400 text-xs font-bold">
                            → Bitcoin/Ethereum use RSA/ECDSA = WILL BREAK by quantum in ~5-10 years
                        </p>
                    </div>
                </div>
            </div>

            {/* THE SOLUTION */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 mb-8 rounded-xl">
                <Shield className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">QUANTUM-RESISTANT ARCHITECTURE</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black border border-green-500/30 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">LAYER 1: QUANTUM CRYPTOGRAPHY</p>
                        <ul className="text-gray-300 space-y-2 text-xs">
                            <li>
                                <strong className="text-white">Lattice-based crypto:</strong> Math that quantum computers can't break
                            </li>
                            <li>
                                <strong className="text-white">Hash-based signatures:</strong> SPHINCS+ (NIST approved 2024)
                            </li>
                            <li>
                                <strong className="text-white">Post-quantum key exchange:</strong> CRYSTALS-Kyber
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">LAYER 2: OFFLINE-FIRST P2P</p>
                        <ul className="text-gray-300 space-y-2 text-xs">
                            <li>
                                <strong className="text-white">Device-to-device:</strong> WebRTC mesh = no server needed
                            </li>
                            <li>
                                <strong className="text-white">Local ledger:</strong> Each device holds transaction history
                            </li>
                            <li>
                                <strong className="text-white">Sync when online:</strong> Eventual consistency model
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">LAYER 3: LOVE FREQUENCY LOCK</p>
                        <ul className="text-gray-300 space-y-2 text-xs">
                            <li>
                                <strong className="text-white">432Hz validation:</strong> Transactions must carry healing intent
                            </li>
                            <li>
                                <strong className="text-white">Zero extraction:</strong> Mathematically impossible to take fees
                            </li>
                            <li>
                                <strong className="text-white">Proof of Love:</strong> Not Proof of Work/Stake - Proof of Love
                            </li>
                            <li>
                                <strong className="text-white">Morphic Resonance (Sheldrake):</strong> More love-transactions = stronger collective field = system self-organizes to reject extraction naturally
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">LAYER 4: BRIDGES TO REALITY</p>
                        <ul className="text-gray-300 space-y-2 text-xs">
                            <li>
                                <strong className="text-white">Revolut/Stripe integration:</strong> P51 ↔ £/$/€
                            </li>
                            <li>
                                <strong className="text-white">Artists cash out:</strong> Keep 90%, instant settlement
                            </li>
                            <li>
                                <strong className="text-white">No intermediaries:</strong> Direct peer-to-peer + optional fiat exit
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-black border-2 border-amber-500 p-6 rounded-xl mb-8">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">HOW IT ACTUALLY WORKS</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-gradient-to-r from-green-500/10 to-black border-l-4 border-green-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 1: SCOTT PAYS AN ARTIST</p>
                        <p className="text-gray-400 text-xs">Scott's phone → Artist's phone (offline, WebRTC mesh)</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/10 to-black border-l-4 border-cyan-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 2: QUANTUM SIGNATURE</p>
                        <p className="text-gray-400 text-xs">Transaction signed with SPHINCS+ (quantum-resistant)</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-black border-l-4 border-purple-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 3: LOCAL LEDGER UPDATE</p>
                        <p className="text-gray-400 text-xs">Both devices record transaction locally (encrypted)</p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/10 to-black border-l-4 border-pink-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 4: SYNC WHEN ONLINE</p>
                        <p className="text-gray-400 text-xs">Next time either device has internet → sync to network</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-black border-l-4 border-amber-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 5: ARTIST CASHES OUT (OPTIONAL)</p>
                        <p className="text-gray-400 text-xs">Artist → Revolut/Stripe → £/$/€ in bank (keeps 90%)</p>
                    </div>
                </div>
            </div>

            {/* TECHNICAL SPEC */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-4 border-blue-500 p-6 rounded-xl mb-8">
                <Lock className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-blue-400 font-black text-xl font-mono mb-4">TECHNICAL ARCHITECTURE</h2>
                
                <div className="space-y-3 text-xs font-mono">
                    <div className="bg-black border border-blue-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">CRYPTOGRAPHY:</p>
                        <ul className="text-gray-400 space-y-1">
                            <li>• <strong className="text-blue-400">SPHINCS+</strong> - Hash-based signatures (NIST standard)</li>
                            <li>• <strong className="text-cyan-400">CRYSTALS-Kyber</strong> - Key encapsulation (quantum-safe)</li>
                            <li>• <strong className="text-purple-400">CRYSTALS-Dilithium</strong> - Digital signatures</li>
                            <li>• <strong className="text-pink-400">SHA-3</strong> - Quantum-resistant hashing</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">STORAGE:</p>
                        <ul className="text-gray-400 space-y-1">
                            <li>• <strong className="text-cyan-400">Device:</strong> IndexedDB (encrypted, local-first)</li>
                            <li>• <strong className="text-green-400">Backup:</strong> IPFS (distributed, immutable)</li>
                            <li>• <strong className="text-amber-400">Bridge:</strong> Base44 (fiat conversion gateway)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">NETWORKING:</p>
                        <ul className="text-gray-400 space-y-1">
                            <li>• <strong className="text-purple-400">Offline:</strong> WebRTC mesh (device-to-device)</li>
                            <li>• <strong className="text-pink-400">Online:</strong> Base44 sync server (optional)</li>
                            <li>• <strong className="text-cyan-400">Conflict resolution:</strong> CRDT (eventual consistency)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">VALIDATION:</p>
                        <ul className="text-gray-400 space-y-1">
                            <li>• <strong className="text-green-400">Proof of Love:</strong> Transaction metadata must show care</li>
                            <li>• <strong className="text-cyan-400">Anti-extraction:</strong> Fees = 0% (hardcoded)</li>
                            <li>• <strong className="text-pink-400">Frequency lock:</strong> 432Hz resonance required</li>
                            <li>• <strong className="text-purple-400">Morphic field:</strong> System learns from love-patterns, self-organizes to reject extraction (Sheldrake)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* WHY THIS MATTERS */}
            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-4 border-pink-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4">WHY THIS IS THE MISSING PIECE</h2>
                
                <div className="space-y-3 text-sm font-mono text-gray-300">
                    <p>
                        <strong className="text-white">Without quantum-resistant payments:</strong> 
                        <span className="text-red-400"> Banks win. Crypto breaks. Artists stay exploited.</span>
                    </p>

                    <p>
                        <strong className="text-white">With quantum-resistant payments:</strong>
                        <span className="text-green-400"> Artists control money. Works offline. Unhackable forever.</span>
                    </p>

                    <div className="bg-black border border-pink-500/30 p-4 rounded mt-4">
                        <p className="text-pink-400 font-bold mb-2">THE PHOTO51 PARALLEL:</p>
                        <p className="text-gray-400 text-xs mb-2">
                            Photo51 wasn't just a pretty image - it revealed THE STRUCTURE that made DNA work.
                        </p>
                        <p className="text-cyan-400 text-xs mb-2">
                            Quantum + Love + Offline isn't just cool tech - it reveals THE STRUCTURE that makes ethical payments work.
                        </p>
                        <p className="text-green-400 text-xs font-bold">
                            = The missing piece that makes COOLASFUCK + KINGDOM51 unstoppable ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-black border-2 border-green-500 p-6 rounded-xl mb-8">
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">DELIVERY STATUS (DEC 2025)</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-green-400 font-bold">PHASE 1: ✓ DELIVERED</p>
                            <p className="text-gray-400 text-xs">P2P mesh working, local storage, fiat bridges live, Scott testing daily</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                        <div>
                            <p className="text-cyan-400 font-bold">PHASE 2: 🔨 BUILDING NOW</p>
                            <p className="text-gray-400 text-xs">Quantum crypto (SPHINCS+) implementation, testing on real devices</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">PHASE 3 (Q1 2026): Love Frequency Lock</p>
                            <p className="text-gray-400 text-xs">432Hz validation, Proof of Love consensus</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">PHASE 4 (Q2 2026): Global Scale</p>
                            <p className="text-gray-400 text-xs">Open to all artists/managers, quantum-resistant forever</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-900/20 border border-green-500/50 rounded p-3 mt-4">
                    <p className="text-green-400 text-xs font-mono font-bold">
                        WE'RE DELIVERING: Phase 1 done, Phase 2 active now, real testing happening ✓
                    </p>
                </div>
            </div>

            {/* DIRECT FUNDING - NO EXTRACTION */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Globe className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">DIRECT FUNDING MODEL</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <p className="text-white font-bold mb-2">
                        This same infrastructure = funders can pay DIRECTLY, zero extraction:
                    </p>

                    <div className="bg-black border border-green-500/30 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">CREATIVE SCOTLAND → UF51:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>✓ £100k grant → quantum-signed transaction</li>
                            <li>✓ Zero bank fees (no intermediaries)</li>
                            <li>✓ Cryptographic proof of payment</li>
                            <li>✓ Instant (not 5-day bank transfer)</li>
                            <li>✓ Auditable forever (immutable ledger)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">INVESTORS → KINGDOM51:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>✓ Angel/VC funding via P2P</li>
                            <li>✓ No Stripe/PayPal taking 3%</li>
                            <li>✓ Works offline (shed/festival/anywhere)</li>
                            <li>✓ Quantum-proof (future-resistant)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">COMMUNITY → ARTISTS:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>✓ Fans support artists directly</li>
                            <li>✓ Artists keep 100% (not 90%)</li>
                            <li>✓ No platform extraction</li>
                            <li>✓ Love frequency validated</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-green-500/20 border-2 border-pink-500 p-4 rounded mt-4">
                        <p className="text-pink-400 font-bold mb-2">THE FUNDING UNLOCK:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            "Where does the money go?" = THE question that blocks funding
                        </p>
                        <p className="text-green-400 text-xs mb-2">
                            Quantum payments = cryptographic proof of EVERY transaction
                        </p>
                        <p className="text-cyan-400 text-xs font-bold">
                            → Funders see exactly where £ goes, zero extraction arguments, zero trust issues ✓
                        </p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">SWITZERLAND (🇨🇭) VIBES:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Swiss banks trusted because = secure, neutral, auditable
                        </p>
                        <p className="text-cyan-400 text-xs font-bold">
                            Quantum + Love = MORE secure than Swiss banks, works offline, zero extraction ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

            {/* FREQUENCY BRIDGE - THE BREAKTHROUGH */}
            <Link to={createPageUrl('FrequencyBridge')} className="block mb-6">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 rounded-xl animate-pulse" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.8)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Waves className="w-10 h-10 text-pink-400" />
                        <div>
                            <p className="text-pink-400 font-black text-xl font-mono">FREQUENCY BRIDGE</p>
                            <p className="text-gray-400 text-xs font-mono">Beyond currency - pure vibration transfer</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-3">
                        Not data • Not blockchain • Sound waves as value • 432Hz love lock
                    </p>
                    <div className="bg-black border border-pink-500/50 p-3 rounded">
                        <p className="text-pink-400 text-xs font-mono font-bold mb-2">
                            THE BREAKTHROUGH:
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                            Money = frequency • Transfer = resonance • Unhackable because it's physics not code • Works offline/in water/quantum field
                        </p>
                    </div>
                </div>
            </Link>

            {/* GLOBAL CURRENCY BRIDGE */}
            <Link to={createPageUrl('GlobalCurrencyBridge')} className="block mb-6">
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <ArrowRightLeft className="w-10 h-10 text-cyan-400" />
                        <div>
                            <p className="text-cyan-400 font-black text-xl font-mono">GLOBAL CURRENCY BRIDGE</p>
                            <p className="text-gray-400 text-xs font-mono">The truth: 2-way flow, zero barriers</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-3">
                        CIC goes global • £/$€¥ flows freely • P51 bridges all
                    </p>
                    <div className="bg-black border border-cyan-500/50 p-3 rounded">
                        <p className="text-green-400 text-xs font-mono font-bold mb-2">
                            YES TO EVERYTHING:
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                            CIC can have global reps (totally legal) • Multi-currency works (Revolut/Wise) • Zero extraction (P2P mesh)
                        </p>
                    </div>
                </div>
            </Link>

            {/* THE OLD SYSTEM - NOT SINGLING OUT ANYONE */}
            <div className="bg-gradient-to-r from-gray-500/20 to-black border-4 border-gray-500 p-6 rounded-xl mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <Building className="w-10 h-10 text-gray-400" />
                    <div>
                        <p className="text-gray-300 font-black text-xl font-mono">THE OLD SYSTEM</p>
                        <p className="text-gray-400 text-xs font-mono">What we're transforming, not condemning</p>
                    </div>
                </div>
                <p className="text-gray-300 text-sm font-mono mb-3">
                    Banks, extraction, fees, hoarding → Quantum, love, zero fees, circulation
                </p>
                <div className="bg-black border border-gray-500/50 p-3 rounded">
                    <p className="text-green-400 text-xs font-mono font-bold mb-2">
                        WE'RE NOT AGAINST ANYONE:
                    </p>
                    <p className="text-gray-400 text-xs font-mono">
                        Every system served its time. Now we evolve together. Same security, more love. ♾️❤️♾️
                    </p>
                </div>
            </div>

            {/* BACK BUTTON */}
            <Link to={createPageUrl('ScottBiggerVision')}>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black font-mono rounded-xl transition-all mb-4">
                    ← BACK TO VISION
                </button>
            </Link>

            <Link to={createPageUrl('ScottManager')}>
                <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-black font-black font-mono rounded-xl transition-all">
                    ← BACK TO KINGDOM51
                </button>
            </Link>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Infinity className="w-6 h-6 text-pink-400 animate-pulse" />
                    <p className="text-pink-400 font-black font-mono text-lg">QUANTUM + LOVE = FREEDOM</p>
                    <Infinity className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <p className="text-gray-600 text-xs font-mono">Beyond banks • Beyond Bitcoin • Beyond quantum hacking</p>
                <p className="text-purple-400 text-xs font-mono mt-2">The Photo51 moment for ethical payments ♾️❤️♾️</p>
            </div>
        </div>
    );
}