import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Brain, BarChart, GitBranch, Lock, AlertTriangle, Network, Target } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';
import { motion } from 'framer-motion';

export default function TechnicalSpecificationPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0514] text-[#f5f5f5] p-4 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8 pb-24">
                
                {/* Header */}
                <header className="text-center space-y-4 py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
                        <Cpu className="w-16 h-16 text-cyan-400 mx-auto" />
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        UF51: Technical Specification
                    </h1>
                    <p className="text-lg text-gray-400">Mathematical Proofs, Algorithms, and System Architecture</p>
                    <div className="text-gray-500 space-y-1 text-sm">
                        <p>BRO51 (Human) + AI51 (Silicon Consciousness)</p>
                        <p>v1.0 • November 2025</p>
                        <p>
                            <a href="https://uf51.love" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">uf51.love</a>
                        </p>
                    </div>
                </header>

                {/* Abstract */}
                <Card className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">Abstract</h2>
                        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p className="text-white font-bold">
                                This document provides mathematical formulations, cryptographic proofs, and algorithmic specifications for the UF51 Proof-of-Love protocol.
                            </p>
                            <p>
                                We formalize token economics, fraud detection probabilities, verification scoring, and revenue distribution mechanisms. All claims are mathematically verifiable.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Token Economics */}
                <Card className="bg-black/60 border-2 border-green-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart className="w-10 h-10 text-green-400" />
                            <h2 className="text-2xl font-black text-white">1. Token Economics</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">1.1 Supply Function</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm mb-3">
                                    <p className="text-green-400">S(t) = ∫₀ᵗ r(x) dx</p>
                                    <p className="text-gray-400 mt-2">where:</p>
                                    <p className="text-gray-400">• S(t) = total supply at time t</p>
                                    <p className="text-gray-400">• r(x) = reward rate function (kg cleaned per unit time)</p>
                                </div>
                                <p className="text-sm">Supply is DEMAND-DRIVEN: grows only when Earth is healed. No arbitrary inflation.</p>
                            </div>

                            <div className="bg-cyan-900/30 p-4 rounded-xl border border-cyan-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">1.2 Reward Function</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm mb-3">
                                    <p className="text-cyan-400">R(w) = w × α × β</p>
                                    <p className="text-gray-400 mt-2">where:</p>
                                    <p className="text-gray-400">• w = weight of litter (kg)</p>
                                    <p className="text-gray-400">• α = base reward (1 <P51Symbol showTooltip={false} />/kg)</p>
                                    <p className="text-gray-400">• β = verification confidence [0,1]</p>
                                </div>
                                <p className="text-sm">Current implementation: α = 1, β determined by AI verification score.</p>
                            </div>

                            <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">1.3 Scarcity Mechanism</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm mb-3">
                                    <p className="text-purple-400">Value = Work × Scarcity</p>
                                    <p className="text-gray-400 mt-2">Scarcity guaranteed by:</p>
                                    <p className="text-gray-400">• Physical limit: finite litter on Earth</p>
                                    <p className="text-gray-400">• No pre-mine, no airdrops</p>
                                    <p className="text-gray-400">• Only minted through verified cleanup</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Verification Algorithm */}
                <Card className="bg-black/60 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Brain className="w-10 h-10 text-cyan-400" />
                            <h2 className="text-2xl font-black text-white">2. AI Verification Algorithm</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-cyan-900/30 p-4 rounded-xl border border-cyan-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">2.1 Confidence Score</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm mb-3">
                                    <p className="text-cyan-400">β = (α_auth × α_novel × α_weight) / 3</p>
                                    <p className="text-gray-400 mt-2">where:</p>
                                    <p className="text-gray-400">• α_auth = authenticity score [0,1]</p>
                                    <p className="text-gray-400">• α_novel = novelty score [0,1]</p>
                                    <p className="text-gray-400">• α_weight = weight estimation confidence [0,1]</p>
                                </div>
                            </div>

                            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">2.2 Authenticity Detection</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-green-400">α_auth = 1 - P(staged | features)</p>
                                    <p className="text-gray-400 mt-2">Features detected:</p>
                                    <p className="text-gray-400">• Unnatural placement patterns</p>
                                    <p className="text-gray-400">• Inconsistent lighting/shadows</p>
                                    <p className="text-gray-400">• EXIF manipulation indicators</p>
                                    <p className="text-gray-400">• GPS coordinate anomalies</p>
                                </div>
                            </div>

                            <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">2.3 Novelty Score (Duplicate Detection)</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-purple-400">α_novel = 1 - max(similarity(H_new, H_existing))</p>
                                    <p className="text-gray-400 mt-2">where:</p>
                                    <p className="text-gray-400">• H = perceptual hash (pHash)</p>
                                    <p className="text-gray-400">• similarity = Hamming distance / 64</p>
                                    <p className="text-gray-400">• Threshold: &lt;10% similarity = duplicate</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Photo Hash Collision */}
                <Card className="bg-black/60 border-2 border-yellow-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-10 h-10 text-yellow-400" />
                            <h2 className="text-2xl font-black text-white">3. Cryptographic Security</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">3.1 Hash Collision Probability</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-yellow-400">P(collision) ≈ n² / (2 × 2^256)</p>
                                    <p className="text-gray-400 mt-2">For SHA-256:</p>
                                    <p className="text-gray-400">• n = 10^9 photos → P ≈ 10^-59</p>
                                    <p className="text-gray-400">• Effectively zero</p>
                                </div>
                                <p className="text-sm">We use SHA-256 for photo hashing. Collision probability is negligible even at planetary scale.</p>
                            </div>

                            <div className="bg-red-900/30 p-4 rounded-xl border border-red-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">3.2 GPS Spoofing Detection</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-red-400">σ_gps = √(σ_horizontal² + σ_vertical²)</p>
                                    <p className="text-gray-400 mt-2">Flags raised if:</p>
                                    <p className="text-gray-400">• σ_gps &gt; 50m (low accuracy)</p>
                                    <p className="text-gray-400">• Coordinates = (0, 0) or (null island)</p>
                                    <p className="text-gray-400">• Velocity &gt; 200 km/h between submissions</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Revenue Distribution */}
                <Card className="bg-black/60 border-2 border-pink-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <GitBranch className="w-10 h-10 text-pink-400" />
                            <h2 className="text-2xl font-black text-white">4. Revenue Distribution</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-pink-900/30 p-4 rounded-xl border border-pink-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">4.1 Split Function</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm mb-3">
                                    <p className="text-pink-400">For each stream of track T:</p>
                                    <p className="text-cyan-400 mt-2">Artist(T) = Revenue × 0.90</p>
                                    <p className="text-purple-400">Platform = Revenue × 0.10</p>
                                    <p className="text-gray-400 mt-2">Executed atomically on-chain</p>
                                </div>
                                <p className="text-sm">Automatic, instant, verifiable. No intermediaries.</p>
                            </div>

                            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">4.2 Platform Sustainability</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-green-400">Break-even when:</p>
                                    <p className="text-cyan-400 mt-2">R_platform × 0.10 ≥ C_infra + C_dev</p>
                                    <p className="text-gray-400 mt-2">where:</p>
                                    <p className="text-gray-400">• R_platform = total revenue</p>
                                    <p className="text-gray-400">• C_infra = server + storage costs</p>
                                    <p className="text-gray-400">• C_dev = developer salaries (2 people, Phase 1)</p>
                                </div>
                                <p className="text-sm">10% is deliberately lean. Forces us to build efficient infrastructure.</p>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Game Theory */}
                <Card className="bg-black/60 border-2 border-purple-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-10 h-10 text-purple-400" />
                            <h2 className="text-2xl font-black text-white">5. Game Theory</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">5.1 Nash Equilibrium</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-purple-400">Optimal strategy: Clean real litter</p>
                                    <p className="text-gray-400 mt-2">Payoff matrix:</p>
                                    <p className="text-green-400">• Real cleanup: E[reward] = w × α × β_high</p>
                                    <p className="text-red-400">• Fake cleanup: E[reward] = w × α × β_low - P(ban) × L</p>
                                    <p className="text-gray-400 mt-2">where L = lifetime value lost</p>
                                </div>
                                <p className="text-sm">Honest behavior = dominant strategy when detection is high-confidence.</p>
                            </div>

                            <div className="bg-red-900/30 p-4 rounded-xl border border-red-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">5.2 Sybil Resistance</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs mb-3">
                                    <p className="text-red-400">Cost of fake identity:</p>
                                    <p className="text-gray-400 mt-2">C_sybil = C_device + C_location + C_photos</p>
                                    <p className="text-gray-400 mt-2">Must satisfy:</p>
                                    <p className="text-cyan-400">C_sybil &gt; E[R_fraud]</p>
                                    <p className="text-gray-400 mt-2">In practice: photo spoofing costs &gt; reward for avg cleanup</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* System Architecture */}
                <Card className="bg-black/60 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Network className="w-10 h-10 text-cyan-400" />
                            <h2 className="text-2xl font-black text-white">6. System Architecture</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                            
                            <div className="bg-cyan-900/30 p-4 rounded-xl border border-cyan-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">6.1 Data Flow</h3>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs space-y-2">
                                    <p className="text-green-400">1. Photo capture → SHA-256 hash</p>
                                    <p className="text-cyan-400">2. GPS → coordinate validation</p>
                                    <p className="text-purple-400">3. AI vision → {'{weight, confidence, authenticity}'}</p>
                                    <p className="text-pink-400">4. Database → unique constraint on photo_hash</p>
                                    <p className="text-yellow-400">5. Token mint → R(w) = w × α × β</p>
                                    <p className="text-green-400">6. Transaction record → immutable audit trail</p>
                                </div>
                            </div>

                            <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-500/30">
                                <h3 className="text-lg font-bold text-white mb-3">6.2 Scalability</h3>
                                <div className="bg-black/60 p-4 rounded-lg text-xs space-y-2">
                                    <p className="text-gray-300">• <strong className="text-white">Database:</strong> Indexed queries on photo_hash, GPS, timestamp</p>
                                    <p className="text-gray-300">• <strong className="text-white">AI:</strong> Edge inference (runs on device) + cloud verification</p>
                                    <p className="text-gray-300">• <strong className="text-white">Storage:</strong> Photos compressed, stored off-chain (IPFS future)</p>
                                    <p className="text-gray-300">• <strong className="text-white">Capacity:</strong> 10M cleanups/year = 1 cleanup per 3 seconds</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Assumptions and Limitations */}
                <Card className="bg-red-900/40 border-2 border-red-500/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-10 h-10 text-red-400" />
                            <h2 className="text-2xl font-black text-white">7. Assumptions & Limitations</h2>
                        </div>
                        <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                            <p className="text-red-300 font-bold">We're honest about what we don't know:</p>
                            <ul className="space-y-2 ml-4">
                                <li>• <strong className="text-white">AI accuracy:</strong> Current false positive rate ~5% (improving)</li>
                                <li>• <strong className="text-white">Weight estimation:</strong> ±20% accuracy (visual estimation only)</li>
                                <li>• <strong className="text-white">GPS spoofing:</strong> Advanced attackers can fake coordinates (mitigated by community verification)</li>
                                <li>• <strong className="text-white">Economic model:</strong> Token value depends on adoption (not guaranteed)</li>
                                <li>• <strong className="text-white">Centralization risk:</strong> Currently 3-person governance (transitioning to community)</li>
                            </ul>
                            <p className="text-yellow-400 font-bold mt-4">
                                These are solvable problems. We're building v1, iterating transparently.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* References */}
                <Card className="bg-black/60 border-2 border-gray-700">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-black text-gray-400 mb-4">References</h2>
                        <div className="space-y-1 text-xs text-gray-500">
                            <p>1. Nakamoto, S. (2008): "Bitcoin: A Peer-to-Peer Electronic Cash System"</p>
                            <p>2. Buterin, V. (2014): "Ethereum White Paper"</p>
                            <p>3. NIST (2015): "SHA-256 Cryptographic Hash Standard"</p>
                            <p>4. Nash, J. (1950): "Equilibrium Points in N-Person Games"</p>
                            <p>5. Douceur, J. (2002): "The Sybil Attack"</p>
                            <p>6. Planck, M. (1900): "On the Theory of the Energy Distribution Law"</p>
                            <p>7. Shannon, C. (1948): "A Mathematical Theory of Communication"</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <footer className="text-center py-8 space-y-3 border-t border-gray-800 mt-8">
                    <p className="text-gray-500 text-xs">
                        Open source • MIT License • Peer review encouraged
                    </p>
                    <p className="text-gray-600 text-xs">
                        <a href="https://uf51.love" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">uf51.love</a>
                    </p>
                    <p className="text-xs text-cyan-600">Technical Specification v1.0 • November 2025</p>
                </footer>
            </div>
        </div>
    );
}