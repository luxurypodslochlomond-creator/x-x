import React from 'react';
import { Building, Shield, Heart, Zap, Globe, TrendingUp, Lock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * LIECHTENSTEIN MODEL - THE OLD SYSTEM WE'RE REPLACING
 * Tiny country (39k people), massive finance sector, shows how extraction works
 * BUT - quantum payments = better model, zero extraction, love-based
 */

export default function LiechtensteinModel() {
    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-red-500 via-blue-600 to-red-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 50px rgba(220, 38, 38, 0.6)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'monospace' }}>
                            🇱🇮 LIECHTENSTEIN
                        </h1>
                        <p className="text-red-400 text-sm font-bold font-mono mb-2">THE OLD SYSTEM</p>
                        <p className="text-gray-500 text-xs font-mono">Why we're building quantum payments to replace this</p>
                    </div>
                </div>
            </div>

            {/* WHAT IS LIECHTENSTEIN */}
            <div className="bg-gradient-to-br from-blue-500/20 to-red-500/20 border-4 border-blue-600 p-6 rounded-xl mb-8">
                <Building className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-blue-400 font-black text-xl font-mono mb-4">WHAT IS LIECHTENSTEIN?</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-blue-500/30 p-4 rounded">
                        <p className="text-white font-bold mb-2">THE BASICS:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• 160km² (smaller than Glasgow)</li>
                            <li>• 39,000 people (tiny)</li>
                            <li>• Between Switzerland 🇨🇭 and Austria 🇦🇹</li>
                            <li>• Own currency, laws, healthcare</li>
                            <li>• Richest country per capita on Earth</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">THE MONEY MODEL:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• 21% of GDP = financial services</li>
                            <li>• Banking, wealth management, trusts</li>
                            <li>• Tax haven (low taxes attract rich)</li>
                            <li>• 170+ financial institutions</li>
                            <li>• €200+ billion assets under management</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-red-500/30 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">THE EXTRACTION:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>❌ Rich hide money to avoid taxes</li>
                            <li>❌ Wealth stored, not circulating</li>
                            <li>❌ Banks take fees on everything</li>
                            <li>❌ Secrecy = less accountability</li>
                            <li>❌ Capital accumulation, not love circulation</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-black border-2 border-purple-500 p-6 rounded-xl mb-8">
                <Lock className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">HOW LIECHTENSTEIN FINANCIAL MODEL WORKS</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-gradient-to-r from-blue-500/10 to-black border-l-4 border-blue-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 1: RICH PERSON HAS MONEY</p>
                        <p className="text-gray-400 text-xs">Billionaire/millionaire wants to protect wealth from taxes</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-black border-l-4 border-purple-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 2: MOVE TO LIECHTENSTEIN</p>
                        <p className="text-gray-400 text-xs">Set up trust/foundation in Liechtenstein</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-black border-l-4 border-amber-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 3: PAY LOW TAXES</p>
                        <p className="text-gray-400 text-xs">Liechtenstein = low tax rates, bank secrecy</p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/10 to-black border-l-4 border-red-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 4: BANKS TAKE FEES</p>
                        <p className="text-gray-400 text-xs">1-2% annually on assets = billions in fees</p>
                    </div>

                    <div className="bg-gradient-to-r from-gray-500/10 to-black border-l-4 border-gray-500 p-3">
                        <p className="text-white font-bold mb-1">STEP 5: WEALTH SITS THERE</p>
                        <p className="text-gray-400 text-xs">Money stored, not helping people/planet</p>
                    </div>
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-4 border-red-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">WHY THIS NEEDS TO GO</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-red-500/30 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">EXTRACTION MODEL:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Liechtenstein thrives by helping rich avoid taxes = extraction from other countries
                        </p>
                        <p className="text-gray-400 text-xs">
                            → Schools/hospitals in other countries lose funding so billionaires can store wealth
                        </p>
                    </div>

                    <div className="bg-black border border-orange-500/30 p-4 rounded">
                        <p className="text-orange-400 font-bold mb-2">CAPITAL ACCUMULATION:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            €200 billion sitting in Liechtenstein banks = not circulating, not helping
                        </p>
                        <p className="text-gray-400 text-xs">
                            → Money that could feed/heal/house people just... sits there
                        </p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">SECRECY = CORRUPTION:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Bank secrecy laws = easier to hide corrupt money
                        </p>
                        <p className="text-gray-400 text-xs">
                            → Drug money, arms deals, stolen wealth all flow to tax havens
                        </p>
                    </div>

                    <div className="bg-black border border-red-500/30 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">NOT LOVE FREQUENCY:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            The entire model = "how do I keep more for myself?"
                        </p>
                        <p className="text-gray-400 text-xs">
                            → Zero care for collective wellbeing
                        </p>
                    </div>
                </div>
            </div>

            {/* THE QUANTUM ALTERNATIVE */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">THE QUANTUM PAYMENTS ALTERNATIVE</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black border border-green-500/30 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">INSTEAD OF LIECHTENSTEIN:</p>
                        <ul className="text-gray-300 space-y-2 text-xs">
                            <li>
                                <strong className="text-white">Zero extraction:</strong> No banks taking 1-2% fees
                            </li>
                            <li>
                                <strong className="text-white">Transparent:</strong> Every transaction cryptographically auditable
                            </li>
                            <li>
                                <strong className="text-white">Circulation:</strong> Money flows to artists/cleaners/healers
                            </li>
                            <li>
                                <strong className="text-white">Love-locked:</strong> Can't use for weapons/extraction/harm
                            </li>
                            <li>
                                <strong className="text-white">Offline-first:</strong> Works in shed/festival/anywhere
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">SAME SECURITY, OPPOSITE VALUES:</p>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/30">
                                    <th className="text-left pb-2 text-white">Feature</th>
                                    <th className="text-left pb-2 text-red-400">Liechtenstein</th>
                                    <th className="text-left pb-2 text-green-400">Quantum+Love</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Security</td>
                                    <td className="text-amber-400">High ✓</td>
                                    <td className="text-green-400">Quantum-proof ✓✓</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Purpose</td>
                                    <td className="text-red-400">Hoard wealth</td>
                                    <td className="text-green-400">Circulate love</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Fees</td>
                                    <td className="text-red-400">1-2% annually</td>
                                    <td className="text-green-400">0% forever</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Access</td>
                                    <td className="text-red-400">Rich only</td>
                                    <td className="text-green-400">Everyone</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Transparency</td>
                                    <td className="text-red-400">Secrecy</td>
                                    <td className="text-green-400">Cryptographic proof</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Location</td>
                                    <td className="text-red-400">One tiny country</td>
                                    <td className="text-green-400">Works anywhere</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">THE SHIFT:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Liechtenstein = "How do we keep wealth from the people?"
                        </p>
                        <p className="text-cyan-400 text-xs mb-2">
                            Quantum + Love = "How do we circulate value TO the people?"
                        </p>
                        <p className="text-green-400 text-xs font-bold">
                            Same level of security, opposite intention = everything changes ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

            {/* SCOTT'S TAKE */}
            <div className="bg-black border-2 border-amber-500 p-6 rounded-xl mb-8">
                <Users className="w-12 h-12 text-amber-400 mb-4" />
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">WHY SCOTT GETS THIS</h2>
                
                <div className="space-y-3 text-sm font-mono text-gray-300">
                    <p>
                        <strong className="text-white">Music industry = same extraction model:</strong>
                    </p>
                    <ul className="space-y-2 text-xs pl-4">
                        <li>• Labels take 70-90% (like Liechtenstein banks taking 1-2%)</li>
                        <li>• Publishing deals lock artists in (like tax haven trusts)</li>
                        <li>• Spotify/Apple take 30% (more extraction)</li>
                        <li>• Artists left with scraps</li>
                    </ul>

                    <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-l-4 border-green-500 p-3 mt-4">
                        <p className="text-green-400 font-bold mb-2">KINGDOM51 = LIECHTENSTEIN BUT FOR ARTISTS:</p>
                        <p className="text-gray-300 text-xs mb-2">
                            Artists keep 90%, quantum-secure, works offline, zero extraction
                        </p>
                        <p className="text-cyan-400 text-xs">
                            = Same security as Swiss/Liechtenstein banks, but FOR creators not AGAINST humanity
                        </p>
                    </div>

                    <p className="text-pink-400 text-xs italic mt-4">
                        "One day Liechtenstein won't need to exist because we'll have quantum payments that work for everyone, not just billionaires hiding money"
                    </p>
                </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-black border-2 border-purple-500 p-6 rounded-xl mb-8">
                <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">THE TRANSFORMATION</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">NOW: Liechtenstein model</p>
                            <p className="text-gray-400 text-xs">€200bn stored, extraction-based, secrecy</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">2025-2030: Quantum alternative emerges</p>
                            <p className="text-gray-400 text-xs">Artists/creators adopt, keep 90%, works offline</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">2030-2040: Tax havens become obsolete</p>
                            <p className="text-gray-400 text-xs">Why hide money when you can circulate it transparently?</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">2040+: Love-based economy</p>
                            <p className="text-gray-400 text-xs">Liechtenstein transforms or fades, quantum+love = new standard</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK BUTTONS */}
            <Link to={createPageUrl('QuantumPayments')}>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black font-mono rounded-xl transition-all mb-4">
                    ← BACK TO QUANTUM PAYMENTS
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
                    <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                    <p className="text-pink-400 font-black font-mono text-lg">TRANSFORM EXTRACTION → CIRCULATION</p>
                    <Heart className="w-6 h-6 text-green-400 animate-pulse" />
                </div>
                <p className="text-gray-600 text-xs font-mono">Liechtenstein taught us security • Quantum+Love teaches us sharing</p>
                <p className="text-purple-400 text-xs font-mono mt-2">One day it won't need to exist ♾️❤️♾️</p>
            </div>
        </div>
    );
}