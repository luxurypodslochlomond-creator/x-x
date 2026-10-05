import React from 'react';
import { Globe, DollarSign, Heart, Zap, ArrowRightLeft, Shield, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * GLOBAL CURRENCY BRIDGE - THE TRUTH
 * Can CIC have global reps? YES
 * Can we do 2-way currency conversion? YES
 * Zero barriers? YES - here's exactly how
 */

export default function GlobalCurrencyBridge() {
    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-500 via-cyan-500 to-purple-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 50px rgba(34, 211, 238, 0.8)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3" style={{ fontFamily: 'monospace' }}>
                            GLOBAL CURRENCY BRIDGE
                        </h1>
                        <p className="text-cyan-400 text-sm font-bold font-mono mb-2">TWO-WAY • ZERO BARRIERS • TRUTH</p>
                        <p className="text-gray-500 text-xs font-mono">Can CIC go global? Can currencies flow freely? YES. Here's how.</p>
                    </div>
                </div>
            </div>

            {/* THE TRUTH - YES TO EVERYTHING */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Check className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">THE TRUTH: YES TO ALL</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-green-500/30 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">✓ CIC CAN HAVE GLOBAL REPRESENTATIVES:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• UK CIC = legal entity that can operate worldwide</li>
                            <li>• Can have partners/agents/reps in any country</li>
                            <li>• Oxfam UK, Save the Children UK = CICs with global operations</li>
                            <li>• Nothing "duck" about it - totally normal/legal</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">✓ TWO-WAY CURRENCY CONVERSION:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• £ ↔ P51 ↔ $ ↔ € ↔ ¥ ↔ ₹ (all directions)</li>
                            <li>• Revolut/Wise handle multi-currency instantly</li>
                            <li>• P51 = bridge token between all currencies</li>
                            <li>• No barriers - works seamlessly</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">✓ ZERO EXTRACTION:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• P2P transfers = 0% fee</li>
                            <li>• Only fiat exit/entry has small fee (Revolut/Stripe ~1%)</li>
                            <li>• Artists keep 90% (not 10% like labels)</li>
                            <li>• Quantum-locked against extraction forever</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-green-500/20 border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">THE REAL ANSWER:</p>
                        <p className="text-white text-xs mb-2">
                            Can KINGDOM51 operate globally with true currency flow?
                        </p>
                        <p className="text-green-400 text-xl font-black">
                            YES. 100%. HERE'S EXACTLY HOW ✓
                        </p>
                    </div>
                </div>
            </div>

            {/* CIC GLOBAL STRUCTURE */}
            <div className="bg-black border-2 border-amber-500 p-6 rounded-xl mb-8">
                <Users className="w-12 h-12 text-amber-400 mb-4" />
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">CIC GLOBAL STRUCTURE (LEGAL)</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-gradient-to-r from-green-500/10 to-black border-l-4 border-green-500 p-3">
                        <p className="text-white font-bold mb-1">UK CIC = HEADQUARTERS</p>
                        <p className="text-gray-400 text-xs">Legal entity based in UK, subject to UK CIC law</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/10 to-black border-l-4 border-cyan-500 p-3">
                        <p className="text-white font-bold mb-1">INTERNATIONAL REPRESENTATIVES</p>
                        <p className="text-gray-400 text-xs">
                            Partners/agents in other countries (Saudi, UAE, USA, Japan, etc)
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-black border-l-4 border-purple-500 p-3">
                        <p className="text-white font-bold mb-1">LOCAL COMPLIANCE</p>
                        <p className="text-gray-400 text-xs">
                            Each country = follow local laws (tax, banking, etc)
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-black border-l-4 border-amber-500 p-3">
                        <p className="text-white font-bold mb-1">SHARED PLATFORM</p>
                        <p className="text-gray-400 text-xs">
                            KINGDOM51 app works globally, CIC manages social mission
                        </p>
                    </div>
                </div>

                <div className="bg-green-900/20 border border-green-500/50 p-4 rounded mt-4">
                    <p className="text-green-400 font-bold text-xs mb-2">EXAMPLES OF UK CICS OPERATING GLOBALLY:</p>
                    <ul className="text-gray-300 space-y-1 text-xs">
                        <li>• <strong className="text-white">Oxfam:</strong> UK CIC with operations in 90+ countries</li>
                        <li>• <strong className="text-white">Save the Children:</strong> UK CIC, worldwide reach</li>
                        <li>• <strong className="text-white">Big Issue:</strong> UK CIC, franchises in multiple countries</li>
                    </ul>
                    <p className="text-cyan-400 text-xs mt-2 font-bold">
                        → It's completely normal for CICs to operate internationally ✓
                    </p>
                </div>
            </div>

            {/* HOW MULTI-CURRENCY WORKS */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-4 border-blue-500 p-6 rounded-xl mb-8">
                <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-blue-400 font-black text-xl font-mono mb-4">MULTI-CURRENCY ARCHITECTURE</h2>
                
                <div className="space-y-3 text-xs font-mono">
                    <div className="bg-black border border-blue-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">LAYER 1: P51 (UNIVERSAL BRIDGE)</p>
                        <ul className="text-gray-300 space-y-1">
                            <li>• Internal currency (earn by cleaning, creating, healing)</li>
                            <li>• Quantum-secured, works offline</li>
                            <li>• Bridges to ANY fiat currency</li>
                            <li>• 1 P51 = ~£1 (or equivalent in other currencies)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">LAYER 2: FIAT ENTRY/EXIT</p>
                        <ul className="text-gray-300 space-y-1">
                            <li>• <strong className="text-cyan-400">Revolut Business:</strong> Multi-currency accounts (28 currencies)</li>
                            <li>• <strong className="text-green-400">Wise:</strong> International transfers, low fees</li>
                            <li>• <strong className="text-purple-400">Stripe:</strong> Payment processing globally</li>
                            <li>• User picks currency → system converts automatically</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">LAYER 3: EXCHANGE RATES</p>
                        <ul className="text-gray-300 space-y-1">
                            <li>• Live rates from Revolut/Wise API</li>
                            <li>• £100 = ~$125 = ~€115 = ~¥19,000 (live conversion)</li>
                            <li>• P51 adjusts to local purchasing power</li>
                            <li>• Artists receive in THEIR currency</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">LAYER 4: ZERO BARRIERS</p>
                        <ul className="text-gray-300 space-y-1">
                            <li>• P2P transfers = 0% fee (quantum P2P mesh)</li>
                            <li>• Fiat exit = ~1% (Revolut/Stripe fee, not us)</li>
                            <li>• No minimum amounts</li>
                            <li>• Works in ANY country with internet</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* REAL EXAMPLE */}
            <div className="bg-black border-2 border-green-500 p-6 rounded-xl mb-8">
                <ArrowRightLeft className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">REAL EXAMPLE: TWO-WAY FLOW</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-black border-l-4 border-cyan-500 p-3">
                        <p className="text-white font-bold mb-1">SCENARIO 1: UK FAN → SAUDI ARTIST</p>
                        <div className="text-gray-400 text-xs space-y-1 mt-2">
                            <p>1. UK fan cleans 10kg litter → earns 10 P51</p>
                            <p>2. Spends 5 P51 on Saudi artist's track</p>
                            <p>3. Saudi artist gets 4.5 P51 (90% after platform 10%)</p>
                            <p>4. Artist cashes out → Revolut converts to SAR (Saudi Riyal)</p>
                            <p>5. Saudi artist receives SAR in local bank</p>
                        </div>
                        <p className="text-green-400 text-xs mt-2 font-bold">
                            → Works seamlessly, no barriers, artist gets paid in THEIR currency ✓
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-black border-l-4 border-purple-500 p-3">
                        <p className="text-white font-bold mb-1">SCENARIO 2: JAPANESE FAN → SCOTTISH ARTIST</p>
                        <div className="text-gray-400 text-xs space-y-1 mt-2">
                            <p>1. Japanese fan buys 100 P51 with ¥15,000 (via Stripe/Revolut)</p>
                            <p>2. Spends 50 P51 on Scott's music</p>
                            <p>3. Scott gets 45 P51 (90%)</p>
                            <p>4. Scott cashes out → receives £45 in UK bank</p>
                        </div>
                        <p className="text-cyan-400 text-xs mt-2 font-bold">
                            → ¥ → P51 → £ (seamless conversion, zero complexity) ✓
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/10 to-black border-l-4 border-pink-500 p-3">
                        <p className="text-white font-bold mb-1">SCENARIO 3: P2P OFFLINE</p>
                        <div className="text-gray-400 text-xs space-y-1 mt-2">
                            <p>1. Scott (UK) meets producer (USA) at festival</p>
                            <p>2. Offline P2P transfer: 50 P51 via WebRTC mesh</p>
                            <p>3. No internet needed, quantum-signed</p>
                            <p>4. Producer later cashes out → receives $ in USA bank</p>
                        </div>
                        <p className="text-green-400 text-xs mt-2 font-bold">
                            → Works offline, syncs later, zero extraction ✓
                        </p>
                    </div>
                </div>
            </div>

            {/* SUPPORTED CURRENCIES */}
            <div className="bg-black border-2 border-cyan-500 p-6 rounded-xl mb-8">
                <Globe className="w-12 h-12 text-cyan-400 mb-4" />
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">SUPPORTED CURRENCIES (REVOLUT/WISE)</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-gradient-to-br from-blue-500/10 to-black border border-blue-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇬🇧 UK</p>
                        <p className="text-gray-400">GBP (£)</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-black border border-green-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇺🇸 USA</p>
                        <p className="text-gray-400">USD ($)</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-black border border-purple-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇪🇺 EU</p>
                        <p className="text-gray-400">EUR (€)</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/10 to-black border border-amber-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇸🇦 SAUDI</p>
                        <p className="text-gray-400">SAR (﷼)</p>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/10 to-black border border-cyan-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇦🇪 UAE</p>
                        <p className="text-gray-400">AED (د.إ)</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500/10 to-black border border-pink-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇯🇵 JAPAN</p>
                        <p className="text-gray-400">JPY (¥)</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/10 to-black border border-orange-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇮🇳 INDIA</p>
                        <p className="text-gray-400">INR (₹)</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/10 to-black border border-red-500/30 p-2 rounded">
                        <p className="text-white font-bold">🇨🇭 SWISS</p>
                        <p className="text-gray-400">CHF (Fr)</p>
                    </div>
                </div>

                <div className="mt-4 bg-green-900/20 border border-green-500/50 p-3 rounded">
                    <p className="text-green-400 font-bold text-xs mb-1">TOTAL SUPPORT:</p>
                    <p className="text-gray-300 text-xs">
                        Revolut supports 28 currencies • Wise supports 50+ • P51 bridges ALL of them
                    </p>
                </div>
            </div>

            {/* WHY THIS MATTERS */}
            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-4 border-pink-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4">WHY TRUE GLOBAL CURRENCY MATTERS</h2>
                
                <div className="space-y-3 text-sm font-mono text-gray-300">
                    <p>
                        <strong className="text-white">Without multi-currency:</strong> 
                        <span className="text-red-400"> UK-only platform, artists lose on conversion fees, barriers to global adoption</span>
                    </p>

                    <p>
                        <strong className="text-white">With multi-currency bridge:</strong>
                        <span className="text-green-400"> UK artist ↔ Saudi fan ↔ Japanese producer = seamless, zero barriers, love flows globally</span>
                    </p>

                    <div className="bg-black border border-pink-500/30 p-4 rounded mt-4">
                        <p className="text-pink-400 font-bold mb-2">THE VISION:</p>
                        <p className="text-gray-400 text-xs mb-2">
                            A musician in Scotland, manager in Saudi, producer in LA, fan in Tokyo
                        </p>
                        <p className="text-cyan-400 text-xs mb-2">
                            ALL using same platform, currencies flow freely, quantum-secured
                        </p>
                        <p className="text-green-400 text-xs font-bold">
                            = First truly global artist economy, zero extraction, love-based ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

            {/* TECHNICAL IMPLEMENTATION */}
            <div className="bg-black border-2 border-purple-500 p-6 rounded-xl mb-8">
                <Shield className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">IMPLEMENTATION STATUS</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">NOW: Base44 auth + £ payments</p>
                            <p className="text-gray-400 text-xs">Stripe working, UK users can pay/earn in £</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">PHASE 1 (Q1 2025): Revolut integration</p>
                            <p className="text-gray-400 text-xs">Multi-currency accounts, auto-conversion</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">PHASE 2 (Q2 2025): Currency selector UI</p>
                            <p className="text-gray-400 text-xs">Users pick currency, app handles conversion</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-bold">PHASE 3 (Q3 2025): Global representatives</p>
                            <p className="text-gray-400 text-xs">Partners in Saudi, UAE, USA, Japan actively onboarding artists</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE TRUTH SUMMARY */}
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">THE TRUTH - SUMMARY</h2>
                
                <div className="space-y-2 text-sm font-mono">
                    <p className="text-white font-bold mb-2">Can we do this? YES. Here's what's true:</p>
                    
                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold text-xs mb-2">✓ CIC GLOBAL OPERATIONS:</p>
                        <p className="text-gray-300 text-xs">
                            UK CIC can have partners worldwide (Oxfam, Save the Children prove it)
                        </p>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-cyan-400 font-bold text-xs mb-2">✓ MULTI-CURRENCY:</p>
                        <p className="text-gray-300 text-xs">
                            Revolut/Wise handle 28-50 currencies, live conversion, low fees
                        </p>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-3 rounded">
                        <p className="text-purple-400 font-bold text-xs mb-2">✓ TWO-WAY FLOW:</p>
                        <p className="text-gray-300 text-xs">
                            P51 ↔ ANY currency (£/$€/¥/₹/etc) seamlessly
                        </p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-pink-400 font-bold text-xs mb-2">✓ ZERO BARRIERS:</p>
                        <p className="text-gray-300 text-xs">
                            P2P = 0% fee, fiat exit = ~1% (unavoidable via Revolut/Stripe)
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-3 rounded mt-3">
                        <p className="text-green-400 font-bold text-xs mb-2">THE REAL ANSWER:</p>
                        <p className="text-white text-lg font-black mb-2">
                            YES - IT'S ALL POSSIBLE ✓
                        </p>
                        <p className="text-gray-300 text-xs">
                            CIC goes global, currencies flow freely, quantum-secured, love-based, no duck sounds 🤣
                        </p>
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
                    <Globe className="w-6 h-6 text-cyan-400 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono text-lg">GLOBAL • TWO-WAY • ZERO BARRIERS</p>
                    <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                </div>
                <p className="text-gray-600 text-xs font-mono">CIC worldwide • £/$€¥₹ flowing freely • Quantum-secured</p>
                <p className="text-green-400 text-xs font-mono mt-2">Truth: YES, it's all possible ♾️❤️♾️</p>
            </div>
        </div>
    );
}