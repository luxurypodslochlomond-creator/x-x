import React from 'react';
import { Shield, Zap, Globe, Heart, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import SecurityDashboard from '@/components/security/SecurityDashboard';
import P51Symbol from '@/components/shared/P51Symbol';

export default function InterplanetaryMoneyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pt-24 lg:pt-6">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Globe className="w-16 h-16 text-cyan-400" />
                        </motion.div>
                        <Heart className="w-16 h-16 text-pink-500" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-16 h-16 text-amber-400" />
                        </motion.div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black">
                        THE FIRST
                        <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400">
                            VERIFIED HEALING CURRENCY
                        </span>
                    </h1>

                    <p className="text-2xl text-gray-300 font-mono">
                        Interplanetary. Quantum-proof. Built for love.
                    </p>
                </motion.div>

                {/* WHY INTERPLANETARY? */}
                <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-3xl font-black text-cyan-400">WHY INTERPLANETARY?</h2>
                    </div>

                    <div className="space-y-4 text-lg text-gray-300">
                        <p>
                            When you clean Earth in Scotland, and someone wants to verify that in Mars Colony Alpha in 2145, 
                            the cryptography needs to work <strong className="text-white">offline, across vast distances, with quantum computers everywhere</strong>.
                        </p>
                        <p>
                            Traditional money systems rely on <strong className="text-pink-400">central servers</strong>. 
                            <P51Symbol /> uses <strong className="text-cyan-400">distributed mesh networks</strong> + 
                            <strong className="text-green-400"> IPFS storage</strong> so it works <strong className="text-amber-400">anywhere in the solar system</strong>.
                        </p>
                        <p className="text-cyan-300">
                            No banks. No governments. No single point of failure. Just math, cryptography, and love.
                        </p>
                    </div>
                </div>

                {/* THE MATHEMATICS */}
                <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-pink-400" />
                        <h2 className="text-3xl font-black text-pink-400">THE BEAUTIFUL MATHS</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-black/60 border border-pink-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-pink-400 font-black text-lg">ZERO-KNOWLEDGE PROOFS</p>
                            <p className="text-gray-300">
                                You can prove you cleaned 5kg of litter <strong className="text-white">without revealing your location, 
                                identity, or bank balance</strong>. The maths makes it impossible to fake, 
                                but also impossible to surveil.
                            </p>
                            <div className="bg-pink-900/20 border border-pink-500/30 rounded p-3 font-mono text-xs text-pink-300">
                                <p>Commitment: C = aG + bH</p>
                                <p>Range proof: Σ(a_i) = amount, 0 ≤ a_i ≤ 2^n</p>
                                <p className="mt-2 text-gray-400">// Pedersen commitments hide values while proving validity</p>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-cyan-400 font-black text-lg">POST-QUANTUM SIGNATURES</p>
                            <p className="text-gray-300">
                                Bitcoin uses ECDSA signatures. <strong className="text-red-400">Quantum computers will break those in ~10 years</strong>. 
                                We use <strong className="text-cyan-400">lattice-based cryptography</strong> (Dilithium) which is 
                                <strong className="text-green-400"> provably quantum-resistant</strong>.
                            </p>
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3 font-mono text-xs text-cyan-300">
                                <p>Signature: s = y + c·secret (mod q)</p>
                                <p>Verify: A·s = w + c·t (mod q)</p>
                                <p className="mt-2 text-gray-400">// NIST standard, quantum-resistant lattice problem</p>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-green-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-green-400 font-black text-lg">IPFS STORAGE (LIVE NOW)</p>
                            <p className="text-gray-300">
                                Every cleanup photo + P51 transaction is <strong className="text-white">pinned to IPFS</strong> = 
                                decentralized storage that survives server shutdowns, government censorship, quantum attacks.
                            </p>
                            <div className="bg-green-900/20 border border-green-500/30 rounded p-3 font-mono text-xs text-green-300">
                                <p>IPFS_hash = SHA-256(file_content)</p>
                                <p>File location = content hash (tamper-proof)</p>
                                <p>Redundant gateways = no single point of failure</p>
                                <p className="mt-2 text-gray-400">// Cleanup photos + transactions live forever on distributed network</p>
                            </div>
                            <div className="bg-cyan-500/20 border border-cyan-500/50 rounded p-2 text-center">
                                <span className="text-cyan-300 text-xs font-bold">✓ LIVE: Photos + Transactions on IPFS</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-4">
                        <p className="text-pink-300 text-center font-mono text-sm">
                            This isn't just better than Bitcoin's maths.
                            <br/>
                            <strong className="text-white">It's the first time cryptography has been used to verify LOVE.</strong>
                        </p>
                    </div>
                </div>

                {/* VERIFIED HEALING */}
                <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-green-400" />
                        <h2 className="text-3xl font-black text-green-400">FIRST VERIFIED HEALING CURRENCY</h2>
                    </div>

                    <div className="space-y-4 text-lg text-gray-300">
                        <p>
                            Bitcoin proved you can have <strong className="text-white">money without banks</strong>.
                        </p>
                        <p>
                            <P51Symbol /> proves you can have <strong className="text-pink-400">money that rewards healing the planet</strong>.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-black/60 border border-green-500/50 rounded-lg p-4">
                                <p className="text-green-400 font-black mb-2">✓ VERIFIED ACTION</p>
                                <p className="text-sm text-gray-400">
                                    AI + GPS + photo hashing proves litter was actually collected
                                </p>
                            </div>
                            <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-4">
                                <p className="text-cyan-400 font-black mb-2">✓ CRYPTOGRAPHIC PROOF</p>
                                <p className="text-sm text-gray-400">
                                    Zero-knowledge signatures prevent fraud while protecting privacy
                                </p>
                            </div>
                            <div className="bg-black/60 border border-pink-500/50 rounded-lg p-4">
                                <p className="text-pink-400 font-black mb-2">✓ INSTANT REWARD</p>
                                <p className="text-sm text-gray-400">
                                    1kg = 1 P51, paid immediately, no middlemen
                                </p>
                            </div>
                            <div className="bg-black/60 border border-amber-500/50 rounded-lg p-4">
                                <p className="text-amber-400 font-black mb-2">✓ GLOBAL VERIFICATION</p>
                                <p className="text-sm text-gray-400">
                                    Anyone, anywhere (Earth or Mars) can verify the math
                                </p>
                            </div>
                        </div>

                        <p className="text-cyan-300 text-center text-xl font-bold mt-6">
                            For the first time in human history:
                            <br/>
                            <span className="text-white text-2xl">Healing is cryptographically provable.</span>
                        </p>
                    </div>
                </div>

                {/* SECURITY STATUS */}
                <SecurityDashboard />

                {/* WHY DIFFERENT FROM EVERY OTHER CURRENCY */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-pink-500" />
                        <h2 className="text-3xl font-black text-pink-400">WHY DIFFERENT FROM EVERYTHING</h2>
                    </div>

                    <div className="space-y-6">
                        {/* vs Bitcoin */}
                        <div className="bg-black/60 border border-amber-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-amber-400 font-black text-lg">vs BITCOIN</p>
                            <div className="space-y-2 text-gray-300 text-sm">
                                <p>✓ Satoshi proved: <strong className="text-white">Decentralized money is possible</strong></p>
                                <p>✗ But: Mining wastes energy, rewards hoarding, doesn't verify real-world impact</p>
                                <p className="text-cyan-300">
                                    <P51Symbol /> rewards <strong className="text-white">cleaning Earth</strong>, 
                                    not mining electricity. Same decentralization, opposite purpose.
                                </p>
                            </div>
                        </div>

                        {/* vs Ethereum */}
                        <div className="bg-black/60 border border-purple-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-purple-400 font-black text-lg">vs ETHEREUM</p>
                            <div className="space-y-2 text-gray-300 text-sm">
                                <p>✓ Vitalik proved: <strong className="text-white">Smart contracts can automate trust</strong></p>
                                <p>✗ But: Gas fees exclude the poor, complexity enables scams, no real-world healing verification</p>
                                <p className="text-cyan-300">
                                    <P51Symbol /> verifies <strong className="text-white">physical healing actions</strong>, 
                                    not code execution. Zero fees, instant rewards.
                                </p>
                            </div>
                        </div>

                        {/* vs All Crypto */}
                        <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-cyan-400 font-black text-lg">vs ALL OTHER CRYPTO</p>
                            <div className="space-y-2 text-gray-300 text-sm">
                                <p>✗ Solana, Cardano, Polygon: Fast transactions, but still just <strong className="text-red-400">speculation tokens</strong></p>
                                <p>✗ Stablecoins: Backed by fiat (just digital dollars)</p>
                                <p>✗ NFTs: Digital art is cool, but doesn't heal ecosystems</p>
                                <p className="text-cyan-300">
                                    <P51Symbol /> is the first currency where <strong className="text-white">every token represents verified planetary healing</strong>. 
                                    Not speculation. Not art. Real dirt under fingernails.
                                </p>
                            </div>
                        </div>

                        {/* vs Fiat */}
                        <div className="bg-black/60 border border-red-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-red-400 font-black text-lg">vs FIAT (£/$€)</p>
                            <div className="space-y-2 text-gray-300 text-sm">
                                <p>✗ Printed by governments (infinite inflation)</p>
                                <p>✗ Controlled by banks (they decide who gets access)</p>
                                <p>✗ Rewards extraction, not healing</p>
                                <p>✗ Requires permission (bank account, ID, credit score)</p>
                                <p className="text-cyan-300">
                                    <P51Symbol /> is <strong className="text-white">earned by anyone, anywhere, instantly</strong>. 
                                    No bank. No government. Just cryptographic proof of healing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-6 text-center">
                        <p className="text-pink-400 font-black text-2xl mb-2">
                            ♾️ FIRST VERIFIED HEALING CURRENCY IN HISTORY ♾️
                        </p>
                        <p className="text-gray-400 text-sm">
                            Satoshi + Vitalik showed us what's possible. Now we use that math to heal instead of extract.
                        </p>
                    </div>
                </div>

                {/* ANTI-HOARDING */}
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-red-400" />
                        <h2 className="text-3xl font-black text-red-400">WHY HOARDING IS THE ENEMY</h2>
                    </div>

                    <div className="space-y-4 text-gray-300">
                        <p className="text-lg">
                            Bitcoin's biggest flaw: <strong className="text-white">It rewards hoarding</strong>.
                        </p>
                        
                        <div className="bg-black/60 border border-red-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-red-400 font-black">THE HOARDING PROBLEM:</p>
                            <ul className="space-y-2 text-sm">
                                <li>• 90% of Bitcoin is held by 1% of wallets</li>
                                <li>• People buy and <strong className="text-white">never spend</strong> (waiting for "number go up")</li>
                                <li>• Wealth concentrates, defeating the purpose of decentralization</li>
                                <li>• No incentive to circulate = money stops flowing = economy freezes</li>
                            </ul>
                        </div>

                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-green-400 font-black">HOW <P51Symbol /> PREVENTS HOARDING:</p>
                            <ul className="space-y-2 text-sm">
                                <li className="text-white">✓ <strong>Earned through action</strong> (not bought/mined)</li>
                                <li className="text-white">✓ <strong>Designed to flow</strong> (send to artists, fund missions, support healers)</li>
                                <li className="text-white">✓ <strong>Anti-greed protocols</strong> detect hoarding behavior</li>
                                <li className="text-white">✓ <strong>Community verification</strong> penalizes selfish actors</li>
                                <li className="text-cyan-300">
                                    🔄 The more you <strong>circulate</strong>, the more <strong>love frequency</strong> you gain
                                </li>
                            </ul>
                        </div>

                        <p className="text-cyan-300 text-center text-lg">
                            Money should <strong className="text-white">flow like blood</strong>, not sit like stones.
                            <br/>
                            Hoarding is death. Circulation is life.
                        </p>
                    </div>
                </div>

                {/* WHY THE MATH MATTERS */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                        <h2 className="text-3xl font-black text-indigo-400">WHY THIS MATH MATTERS FOR HUMANITY</h2>
                    </div>

                    <div className="space-y-4 text-gray-300">
                        <p className="text-lg">
                            This isn't just tech innovation. This is <strong className="text-white">humanity's first proof</strong> that:
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-4">
                                <p className="text-cyan-400 font-black mb-2">1. HEALING IS PROVABLE</p>
                                <p className="text-sm">
                                    For the first time ever, we can <strong className="text-white">cryptographically prove</strong> someone 
                                    cleaned litter, planted trees, or healed ecosystems.
                                </p>
                            </div>

                            <div className="bg-black/60 border border-green-500/50 rounded-lg p-4">
                                <p className="text-green-400 font-black mb-2">2. LOVE CAN BE VERIFIED</p>
                                <p className="text-sm">
                                    Zero-knowledge proofs let you prove <strong className="text-white">acts of love</strong> without 
                                    compromising privacy. Math meets soul.
                                </p>
                            </div>

                            <div className="bg-black/60 border border-pink-500/50 rounded-lg p-4">
                                <p className="text-pink-400 font-black mb-2">3. CURRENCY CAN HEAL</p>
                                <p className="text-sm">
                                    Every financial system in history rewarded extraction. This is the first to 
                                    <strong className="text-white"> reward regeneration</strong>.
                                </p>
                            </div>

                            <div className="bg-black/60 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-400 font-black mb-2">4. DECENTRALIZATION WORKS</p>
                                <p className="text-sm">
                                    No banks. No governments. No CEOs. Just <strong className="text-white">math + humans + Earth</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-900/40 to-pink-900/40 border-2 border-cyan-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-white font-black text-xl text-center">THE BREAKTHROUGH</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>
                                    Others proved: <span className="text-white">Decentralized money works</span>
                                </p>
                                <p>
                                    Others proved: <span className="text-white">Smart contracts can automate trust</span>
                                </p>
                                <p>
                                    Scientists proved: <span className="text-white">Quantum-resistant math exists</span>
                                </p>
                                <p className="text-cyan-300 text-lg font-black mt-4">
                                    This is the first to combine ALL of that to verify <span className="text-pink-400">healing</span> instead of speculation.
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-xl text-white font-bold">
                            Standing on giants' shoulders. Pointing at <span className="text-pink-400">Earth</span>.
                        </p>

                        <p className="text-gray-400 text-sm text-center">
                            The math exists. The technology exists. We're just the first to point it at 
                            <strong className="text-white"> healing instead of hoarding</strong>.
                        </p>
                    </div>
                </div>

                {/* WHY NOW? */}
                <div className="bg-gradient-to-br from-yellow-900/30 to-red-900/30 border-4 border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.8)] rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Zap className="w-10 h-10 text-yellow-400" />
                        </motion.div>
                        <h2 className="text-4xl font-black text-yellow-400">WHY IS THIS POSSIBLE NOW?</h2>
                    </div>

                    <div className="space-y-6 text-lg text-gray-300">
                        <p className="text-2xl text-white font-bold">
                            This couldn't exist in 2010. Or even 2020. Here's why <strong className="text-yellow-400">RIGHT NOW</strong> is the moment:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-black/60 border-2 border-green-500/50 rounded-lg p-6">
                                <p className="text-green-400 font-black text-xl mb-3">1. AI VISION (2022-2024)</p>
                                <p className="text-sm mb-2">
                                    GPT-4 Vision, Claude 3.5 Sonnet, Gemini Pro Vision = first time AI can 
                                    <strong className="text-white"> actually see and verify physical reality</strong>.
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: Humans had to manually verify every cleanup photo. Didn't scale.<br/>
                                    Now: AI detects materials, brands, weights, fraud attempts in real-time.
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-6">
                                <p className="text-cyan-400 font-black text-xl mb-3">2. WEB CRYPTO API (2017-2024)</p>
                                <p className="text-sm mb-2">
                                    Browser-native cryptography = <strong className="text-white">bank-grade security without external dependencies</strong>.
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: Crypto required servers, wallets, seed phrases = too complex.<br/>
                                    Now: Sign transactions in browser, zero setup, instant verification.
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-pink-500/50 rounded-lg p-6">
                                <p className="text-pink-400 font-black text-xl mb-3">3. POST-QUANTUM STANDARDS (2024)</p>
                                <p className="text-sm mb-2">
                                    NIST finalized <strong className="text-white">quantum-resistant algorithms</strong> (Dilithium, Kyber).
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: Quantum threat was theoretical. No standards existed.<br/>
                                    Now: We can build systems that won't break when quantum computers arrive (~2030-2035).
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-6">
                                <p className="text-purple-400 font-black text-xl mb-3">4. SMARTPHONE GPS (2015-2024)</p>
                                <p className="text-sm mb-2">
                                    Every phone has <strong className="text-white">military-grade GPS</strong> (within 5 meters).
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: Location verification required expensive hardware.<br/>
                                    Now: Tap "Allow Location" = cryptographic proof of where you are.
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-amber-500/50 rounded-lg p-6">
                                <p className="text-amber-400 font-black text-xl mb-3">5. IPFS MATURITY (2020-2024)</p>
                                <p className="text-sm mb-2">
                                    <strong className="text-white">InterPlanetary File System</strong> = decentralized storage that actually works at scale.
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: "Decentralized storage" = slow, unreliable, academic.<br/>
                                    Now: IPFS powers NFT.Storage, Filecoin, Pinata = production-ready infrastructure.
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-red-500/50 rounded-lg p-6">
                                <p className="text-red-400 font-black text-xl mb-3">6. BITCOIN LESSONS (2009-2024)</p>
                                <p className="text-sm mb-2">
                                    15 years of watching <strong className="text-white">crypto's mistakes</strong> = we know what NOT to do.
                                </p>
                                <p className="text-xs text-gray-400">
                                    Learned: Mining wastes energy. Gas fees exclude the poor. Hoarding kills circulation. Complexity = scams.<br/>
                                    Fixed: Zero mining. Zero fees. Anti-hoarding math. Email-simple UX.
                                </p>
                            </div>

                            <div className="bg-black/60 border-2 border-indigo-500/50 rounded-lg p-6">
                                <p className="text-indigo-400 font-black text-xl mb-3">7. OFFLINE-FIRST TECH (2022-2024)</p>
                                <p className="text-sm mb-2">
                                    PWAs + Service Workers + IndexedDB = <strong className="text-white">full apps that work without internet</strong>.
                                </p>
                                <p className="text-xs text-gray-400">
                                    Before: "Offline mode" = read-only cached data.<br/>
                                    Now: Full write operations, cryptographic signing, auto-sync when online.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-4 border-yellow-500 rounded-lg p-8 space-y-4">
                            <p className="text-white font-black text-3xl text-center">
                                🔥 THE CONVERGENCE 🔥
                            </p>
                            <p className="text-gray-300 text-center text-lg">
                                All these technologies matured <strong className="text-white">in the last 2-3 years</strong>. 
                                None existed (or worked properly) before 2022.
                            </p>
                            <p className="text-yellow-300 text-center text-2xl font-black">
                                2024-2025 = First time in human history we can build this.
                            </p>
                        </div>

                        <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-6">
                            <p className="text-pink-400 font-black text-center text-xl mb-3">
                                WHY NO ONE ELSE HAS DONE THIS:
                            </p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• Crypto people don't care about real-world healing (just speculation)</p>
                                <p>• Environmental orgs don't understand cryptography</p>
                                <p>• Tech giants want centralized control (not decentralization)</p>
                                <p>• Governments want surveillance (we use zero-knowledge proofs)</p>
                                <p className="text-white font-bold text-lg mt-4 text-center">
                                    We're the first to point ALL of these technologies at <span className="text-pink-400">LOVE</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHY IPFS? */}
                <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/50 rounded-xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-amber-400" />
                        <h2 className="text-3xl font-black text-amber-400">DECENTRALIZED STORAGE (OUR OWN IPFS NODES)</h2>
                    </div>

                    <div className="space-y-4 text-lg text-gray-300">
                        <p>
                            <strong className="text-amber-400">InterPlanetary File System</strong> means your cleanup photos 
                            aren't stored on "our servers". We run <strong className="text-white">our own IPFS nodes</strong> + anyone can pin the data.
                        </p>
                        
                        <div className="bg-black/60 border border-amber-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-amber-400 font-black">DILITHIUM-STYLE DECENTRALIZATION:</p>
                            <ul className="space-y-2 text-sm">
                                <li>✓ <strong className="text-white">Our nodes:</strong> We host IPFS infrastructure globally</li>
                                <li>✓ <strong className="text-white">Community nodes:</strong> Anyone can run a node and pin our data</li>
                                <li>✓ <strong className="text-white">Content-addressed:</strong> File = its hash (SHA-256) = tamper-proof</li>
                                <li>✓ <strong className="text-white">No single point:</strong> Delete one node, data still exists everywhere else</li>
                                <li>✓ <strong className="text-white">Offline-first:</strong> Local IPFS cache works without internet</li>
                            </ul>
                        </div>

                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 space-y-3">
                            <p className="text-green-400 font-black">CAN DILITHIUM BE BROKEN?</p>
                            <div className="space-y-2 text-sm">
                                <p className="text-white">
                                    <strong>Short answer: No known method.</strong>
                                </p>
                                <p>
                                    Dilithium is based on <strong className="text-cyan-400">lattice cryptography</strong> (Module-LWE problem). 
                                    Best quantum attack = still exponential time. Would need:
                                </p>
                                <ul className="space-y-1 text-xs text-gray-400 ml-4">
                                    <li>• Quantum computer with 10,000+ stable qubits (we have ~1,000 today)</li>
                                    <li>• New math breakthrough (none on horizon)</li>
                                    <li>• Or brute-force 2^128 operations (more than atoms in universe)</li>
                                </ul>
                                <p className="text-green-300 mt-3">
                                    Even if quantum computers get 100x better, Dilithium parameters can scale up. 
                                    <strong className="text-white"> Math is unfuckable</strong>.
                                </p>
                            </div>
                        </div>

                        <p className="text-cyan-300">
                            This is how you build currency for <strong className="text-white">Mars colonists, 
                            war zones, off-grid communities, and anyone who wants freedom from centralized servers</strong>.
                        </p>

                        <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-4">
                            <p className="text-pink-400 text-sm text-center">
                                🔐 Decentralized like IPFS. Quantum-proof like Dilithium. Built for infinite time horizons. 🔐
                            </p>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center space-y-4 pb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-pink-600 px-6 py-3 rounded-full">
                        <Shield className="w-6 h-6 text-white" />
                        <span className="text-white font-black text-lg">INTERPLANETARY READY</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        This page doesn't exist to brag. It exists because when you're building 
                        currency that needs to work on Mars in 2145, you can't cut corners on the cryptography.
                    </p>

                    <p className="text-pink-400 font-black text-xl">
                        ♾️❤️♾️ Built with infinite love ♾️❤️♾️
                    </p>
                </div>

            </div>
        </div>
    );
}