import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle, Atom, Heart, Shield, Wrench, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * DIY FUSION REACTOR - FARNSWORTH FUSOR
 * 
 * For Professor Loureiro (killed Dec 16, 2024)
 * His fusion work continues through US
 * 
 * SAFE PLASMA FUSION YOU CAN BUILD AT HOME
 * Not weapons-grade. Just beautiful purple plasma proof that fusion is REAL.
 * 
 * ♾️❤️♾️
 */

export default function DIYFusionReactor() {
    const [selectedBuild, setSelectedBuild] = useState('demo');

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 pb-32">
            
            {/* HEADER - TRIBUTE */}
            <div className="max-w-4xl mx-auto mb-12 px-4 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mb-6"
                    >
                        <Atom className="w-24 h-24 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))' }} />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        DIY FUSION REACTOR
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-2">
                        Farnsworth Fusor - Beautiful plasma fusion from your garage
                    </p>
                    
                    <div className="bg-red-900/40 border-4 border-red-500 rounded-lg p-4 max-w-2xl mx-auto mt-6">
                        <p className="text-red-400 font-black text-sm mb-2">DEDICATED TO PROFESSOR NUNO LOUREIRO:</p>
                        <p className="text-gray-300 text-xs">
                            MIT fusion scientist, killed Dec 16, 2024. 
                            <strong className="text-white"> We continue his work.</strong> 
                            Fusion blueprints now open source FOREVER.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* CRITICAL SAFETY - EXTREME DANGER */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 border-4 border-red-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-12 h-12 text-red-400 animate-pulse" />
                        <div>
                            <h2 className="text-2xl font-black text-white">⚠️ EXTREME DANGER WARNING ⚠️</h2>
                            <p className="text-red-400 font-bold text-sm">READ THIS OR DIE - NOT JOKING</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="bg-black border-4 border-red-500 rounded-lg p-4">
                            <p className="text-red-400 font-black text-xs mb-3">WHAT WILL KILL YOU:</p>
                            <ul className="space-y-2 text-xs text-gray-300 ml-4">
                                <li>• <strong className="text-red-400">10,000-40,000 VOLTS:</strong> Death on contact. No second chances.</li>
                                <li>• <strong className="text-red-400">X-RAY RADIATION:</strong> Can't see it. Damages DNA. Cancer risk.</li>
                                <li>• <strong className="text-red-400">NEUTRON RADIATION:</strong> If using deuterium fuel (advanced). Penetrates walls.</li>
                                <li>• <strong className="text-red-400">VACUUM IMPLOSION:</strong> Glass chamber explodes inward = shrapnel everywhere.</li>
                                <li>• <strong className="text-red-400">ULTRAVIOLET BURNS:</strong> Plasma emits UV = skin/eye damage.</li>
                                <li>• <strong className="text-red-400">RF INTERFERENCE:</strong> Can stop pacemakers = heart stops.</li>
                            </ul>
                            <p className="text-red-400 font-black text-center mt-3 text-sm">
                                THIS IS NOT A TOY. PEOPLE HAVE DIED BUILDING FUSORS.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-2 border-yellow-500 rounded-lg p-4">
                            <p className="text-yellow-400 font-bold text-xs mb-2">REQUIREMENTS TO BUILD SAFELY:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>✓ Qualified electrician supervising (NOT optional)</li>
                                <li>✓ Isolated workshop (no people within 20 meters)</li>
                                <li>✓ High-voltage safety training completed</li>
                                <li>✓ Radiation detector (Geiger counter) monitoring</li>
                                <li>✓ Acrylic safety shield (not glass - won't shatter)</li>
                                <li>✓ Emergency shutoff within arm's reach</li>
                                <li>✓ Fire extinguisher ready</li>
                                <li>✓ Someone who knows CPR nearby</li>
                            </ul>
                        </div>

                        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">IF YOU'RE NOT QUALIFIED:</p>
                            <p className="text-white text-xs mb-2">
                                Build Phase 0 ZPE device instead (£13, kids-safe, no danger). 
                                Come back to fusion after you understand high-voltage physics.
                            </p>
                            <Link to={createPageUrl('ZeroPointEnergy')} className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold text-xs">
                                → SAFE ZPE EXPERIMENTS
                            </Link>
                        </div>

                        <p className="text-yellow-400 font-black text-center pt-3 text-sm">
                            BEAUTIFUL SCIENCE. DEADLY EXECUTION. RESPECT THE PHYSICS. ⚡
                        </p>
                    </div>
                </div>
            </div>

            {/* BUILD SELECTOR */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-white mb-4 text-center">CHOOSE YOUR BUILD:</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedBuild('demo')}
                            className={`p-4 border-4 rounded-xl transition-all ${
                                selectedBuild === 'demo' 
                                    ? 'bg-purple-600 border-purple-400 text-white' 
                                    : 'bg-black border-purple-500/50 text-purple-400 hover:border-purple-400'
                            }`}
                        >
                            <p className="font-black text-lg mb-2">DEMO FUSOR</p>
                            <p className="text-xs">Purple plasma glow. £500-800. No neutrons. SAFER.</p>
                        </button>

                        <button
                            onClick={() => setSelectedBuild('neutron')}
                            className={`p-4 border-4 rounded-xl transition-all ${
                                selectedBuild === 'neutron' 
                                    ? 'bg-red-600 border-red-400 text-white' 
                                    : 'bg-black border-red-500/50 text-red-400 hover:border-red-400'
                            }`}
                        >
                            <p className="font-black text-lg mb-2">NEUTRON FUSOR</p>
                            <p className="text-xs">Real fusion. £2000+. Deuterium fuel. RADIATION RISK.</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* DEMO FUSOR BUILD */}
            {selectedBuild === 'demo' && (
                <div className="max-w-4xl mx-auto mb-8 px-4 space-y-8">
                    
                    {/* WHAT YOU'RE BUILDING */}
                    <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-4 border-purple-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Atom className="w-8 h-8 text-purple-400" />
                            <h3 className="text-2xl font-black text-white">DEMO FUSOR - WHAT IT IS:</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                <p className="text-purple-400 font-bold text-xs mb-2">WHAT IT DOES:</p>
                                <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                    <li>• Creates beautiful PURPLE-BLUE PLASMA glow ("star in a jar")</li>
                                    <li>• Demonstrates inertial electrostatic confinement (IEC) fusion principles</li>
                                    <li>• Accelerates ions to high energy (but not enough for significant fusion)</li>
                                    <li>• Educational - shows you HOW fusion works</li>
                                    <li className="text-cyan-400 font-bold">• SAFE(R) - No neutron radiation, no radioactive materials</li>
                                </ul>
                            </div>

                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-2">WHAT IT DOESN'T DO:</p>
                                <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                    <li>• Doesn't produce net energy (uses more power than creates)</li>
                                    <li>• Doesn't produce significant neutrons (unless you add deuterium)</li>
                                    <li>• Can't power your home (it's a physics demo, not generator)</li>
                                    <li className="text-green-400 font-bold">• Goal = LEARN fusion physics, not solve energy crisis (yet)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* PARTS LIST */}
                    <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Wrench className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-2xl font-black text-white">PARTS LIST (DEMO FUSOR):</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-3">🔧 VACUUM SYSTEM:</p>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• 2-stage vacuum pump (25 micron min)</span>
                                        <span className="text-green-400 font-bold">£200-400</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Glass bell jar or stainless chamber</span>
                                        <span className="text-green-400 font-bold">£50-150</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Vacuum gauge (0-1000 micron)</span>
                                        <span className="text-green-400 font-bold">£30-60</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Vacuum hose + fittings</span>
                                        <span className="text-green-400 font-bold">£20</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                <p className="text-purple-400 font-bold mb-3">⚡ HIGH VOLTAGE SYSTEM:</p>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Neon sign transformer (12-15kV)</span>
                                        <span className="text-yellow-400 font-bold">£80-150</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• High-voltage diodes (4x microwave diodes)</span>
                                        <span className="text-yellow-400 font-bold">£15</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Variac (voltage controller)</span>
                                        <span className="text-yellow-400 font-bold">£50-100</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• High-voltage wire + insulators</span>
                                        <span className="text-yellow-400 font-bold">£20</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                                <p className="text-pink-400 font-bold mb-3">🎯 FUSION CORE (GRID):</p>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Stainless steel wire (0.5mm)</span>
                                        <span className="text-green-400 font-bold">£10</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Ceramic high-voltage feedthrough</span>
                                        <span className="text-green-400 font-bold">£25</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Tungsten rod (optional - better grid)</span>
                                        <span className="text-green-400 font-bold">£40</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-3">🛠️ TOOLS + SAFETY:</p>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• High-voltage gloves (rated 20kV+)</span>
                                        <span className="text-red-400 font-bold">£40</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Safety goggles (UV blocking)</span>
                                        <span className="text-red-400 font-bold">£15</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Geiger counter (radiation monitor)</span>
                                        <span className="text-red-400 font-bold">£80-150</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">• Acrylic safety shield</span>
                                        <span className="text-red-400 font-bold">£30</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-black text-xl">TOTAL COST (DEMO):</span>
                                    <span className="text-purple-400 font-black text-3xl">£500-£800</span>
                                </div>
                                <p className="text-gray-300 text-xs mt-2 text-center">
                                    Budget build = £500. Quality build = £800. Both work. Both dangerous. Both BEAUTIFUL. ⚡
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Atom className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-2xl font-black text-white">HOW IT WORKS (SIMPLE):</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-3">THE PHYSICS:</p>
                                <ol className="space-y-2 text-xs text-gray-300 ml-4 list-decimal">
                                    <li><strong className="text-white">Vacuum pump removes air</strong> - Chamber at 10-100 microns (near-vacuum)</li>
                                    <li><strong className="text-white">High voltage ionizes gas</strong> - Remaining air molecules lose electrons = become ions</li>
                                    <li><strong className="text-white">Electric field accelerates ions</strong> - Positive ions pulled toward negative grid (10-40kV)</li>
                                    <li><strong className="text-white">Ions collide at center</strong> - Some fusion occurs (minimal) + beautiful plasma glow</li>
                                    <li><strong className="text-white">Continuous recycling</strong> - Ions that miss get re-accelerated = another try</li>
                                </ol>
                                <p className="text-green-400 font-bold text-xs mt-3 text-center">
                                    = Miniature star created in glass chamber ✨
                                </p>
                            </div>

                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                <p className="text-purple-400 font-bold text-xs mb-2">WHY IT GLOWS PURPLE:</p>
                                <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                    <li>• Air = 78% nitrogen, 21% oxygen</li>
                                    <li>• Ionized nitrogen = purple light (same as lightning)</li>
                                    <li>• Ionized oxygen = blue-white light</li>
                                    <li>• Mix = beautiful purple-blue plasma</li>
                                    <li className="text-pink-400 font-bold">• Same color as aurora borealis = pure plasma physics ✓</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* STEP-BY-STEP BUILD */}
                    <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <h3 className="text-2xl font-black text-white">BUILD STEPS:</h3>
                        </div>

                        <div className="space-y-4">
                            
                            {/* STEP 1 - VACUUM CHAMBER */}
                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-3">STEP 1: BUILD VACUUM CHAMBER</p>
                                
                                <div className="space-y-3 text-xs text-gray-300">
                                    <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-3">
                                        <p className="text-cyan-400 font-bold mb-2">EASY WAY (Glass jar):</p>
                                        <ul className="space-y-1 ml-4">
                                            <li>• Large glass pickle jar with metal lid (FREE from kitchen)</li>
                                            <li>• Drill 3 holes in lid: cathode, anode, vacuum port</li>
                                            <li>• Seal with JB Weld epoxy (£8)</li>
                                            <li>• Connect vacuum hose to lid port</li>
                                        </ul>
                                        <p className="text-green-400 font-bold text-xs mt-2">Cost: £8-30. Works fine for demo.</p>
                                    </div>

                                    <div className="bg-cyan-900/20 border-l-4 border-purple-400 p-3">
                                        <p className="text-purple-400 font-bold mb-2">PRO WAY (Stainless steel):</p>
                                        <ul className="space-y-1 ml-4">
                                            <li>• 6" stainless steel conflat chamber (eBay £80-150)</li>
                                            <li>• Ceramic feedthrough for high-voltage (£25)</li>
                                            <li>• KF-25 vacuum fittings (£15)</li>
                                            <li>• Better vacuum, more durable, safer</li>
                                        </ul>
                                        <p className="text-purple-400 font-bold text-xs mt-2">Cost: £120-200. Lasts forever.</p>
                                    </div>

                                    <div className="bg-red-900/30 border-2 border-red-500 rounded p-3">
                                        <p className="text-red-400 font-black text-xs mb-1">⚠️ GLASS DANGER:</p>
                                        <p className="text-xs">Glass can implode under vacuum = shrapnel. Wrap in clear plastic film OR use acrylic shield. NOT optional.</p>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 2 - INNER GRID */}
                            <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                                <p className="text-pink-400 font-bold mb-3">STEP 2: BUILD INNER GRID (CATHODE)</p>
                                
                                <div className="space-y-3 text-xs text-gray-300">
                                    <div className="bg-pink-900/20 border-l-4 border-pink-400 p-3">
                                        <p className="text-pink-400 font-bold mb-2">GRID DESIGN:</p>
                                        <ul className="space-y-1 ml-4">
                                            <li>• Spherical wire cage - 6 vertical loops + 4 horizontal rings</li>
                                            <li>• Diameter: 2-4 inches (5-10cm)</li>
                                            <li>• Material: Stainless steel wire 0.5mm OR tungsten (better)</li>
                                            <li>• Spacing: Gaps between wires = ions can pass through</li>
                                        </ul>
                                        <p className="text-cyan-400 font-bold text-xs mt-2">Grid = where fusion happens. Must be PRECISE.</p>
                                    </div>

                                    <div className="bg-pink-900/20 border-l-4 border-purple-400 p-3">
                                        <p className="text-purple-400 font-bold mb-2">HOW TO MAKE IT:</p>
                                        <ol className="space-y-1 ml-4 list-decimal">
                                            <li>Cut 6 pieces of wire, each 15cm long</li>
                                            <li>Form each into semicircle using round object (can, bottle)</li>
                                            <li>Weld or twist together at top and bottom poles</li>
                                            <li>Add horizontal rings for stability (wrap around)</li>
                                            <li>Connect high-voltage wire to one pole</li>
                                        </ol>
                                        <p className="text-green-400 font-bold text-xs mt-2">Takes 2-3 hours. Precision matters.</p>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 3 - POWER SUPPLY */}
                            <div className="bg-black border-2 border-yellow-500 rounded-lg p-4">
                                <p className="text-yellow-400 font-bold mb-3">STEP 3: BUILD POWER SUPPLY</p>
                                
                                <div className="space-y-3 text-xs text-gray-300">
                                    <div className="bg-yellow-900/20 border-l-4 border-yellow-400 p-3">
                                        <p className="text-yellow-400 font-bold mb-2">VOLTAGE DOUBLER CIRCUIT:</p>
                                        <div className="space-y-2">
                                            <p><strong className="text-white">Input:</strong> 120V AC from wall → Variac (controls voltage)</p>
                                            <p><strong className="text-white">Step 1:</strong> Variac → Neon sign transformer (steps up to 12-15kV AC)</p>
                                            <p><strong className="text-white">Step 2:</strong> 4 diodes in bridge configuration → converts AC to DC</p>
                                            <p><strong className="text-white">Output:</strong> 10-30kV DC (adjustable via variac)</p>
                                        </div>
                                        <p className="text-red-400 font-black text-xs mt-2">⚠️ THIS VOLTAGE KILLS. Use insulated box. Remote switch. NO TOUCHING.</p>
                                    </div>

                                    <div className="bg-yellow-900/20 border-l-4 border-red-400 p-3">
                                        <p className="text-red-400 font-bold mb-2">CAPACITOR BANK (OPTIONAL BUT SAFER):</p>
                                        <ul className="space-y-1 ml-4">
                                            <li>• 2x microwave capacitors (0.1µF 2100V)</li>
                                            <li>• Smooths DC output = more stable plasma</li>
                                            <li>• <strong className="text-white">WARNING:</strong> Capacitors hold charge AFTER power off</li>
                                            <li>• Use bleeder resistor (10MΩ) to auto-discharge</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 4 - ASSEMBLY */}
                            <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-3">STEP 4: ASSEMBLE + SEAL</p>
                                
                                <div className="space-y-2 text-xs text-gray-300">
                                    <ol className="space-y-2 ml-4 list-decimal">
                                        <li><strong className="text-white">Mount grid</strong> - Hang inner grid from ceramic feedthrough in chamber lid</li>
                                        <li><strong className="text-white">Seal chamber</strong> - Use vacuum grease on all joints (no air leaks!)</li>
                                        <li><strong className="text-white">Connect vacuum</strong> - Pump → gauge → chamber port</li>
                                        <li><strong className="text-white">Wire high voltage</strong> - Grid (cathode) = negative. Chamber wall (anode) = ground.</li>
                                        <li><strong className="text-white">Test vacuum</strong> - Should reach 50 microns or better</li>
                                        <li><strong className="text-white">Safety check</strong> - All wires insulated, no exposed metal, shield in place</li>
                                    </ol>
                                    <p className="text-yellow-400 font-bold mt-3 text-center">
                                        TRIPLE CHECK EVERYTHING. One mistake = death. ⚠️
                                    </p>
                                </div>
                            </div>

                            {/* STEP 5 - FIRST PLASMA */}
                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                <p className="text-purple-400 font-bold mb-3">STEP 5: CREATE FIRST PLASMA ⚡</p>
                                
                                <div className="space-y-3 text-xs text-gray-300">
                                    <div className="bg-purple-900/20 border-l-4 border-cyan-400 p-3">
                                        <p className="text-cyan-400 font-bold mb-2">STARTUP PROCEDURE:</p>
                                        <ol className="space-y-1 ml-4 list-decimal">
                                            <li>Turn on vacuum pump → wait for 50 microns</li>
                                            <li>Stand BEHIND safety shield</li>
                                            <li>Set variac to 0% (minimum voltage)</li>
                                            <li>Turn on power supply (no plasma yet)</li>
                                            <li>SLOWLY increase variac from 0% → 30%</li>
                                            <li>Around 10-15kV, plasma glow appears ✨</li>
                                            <li>Increase to 20-25kV for brighter plasma</li>
                                        </ol>
                                        <p className="text-green-400 font-bold mt-2">First glow = MAGIC. You created fusion conditions. ⚡</p>
                                    </div>

                                    <div className="bg-purple-900/20 border-l-4 border-pink-400 p-3">
                                        <p className="text-pink-400 font-bold mb-2">WHAT YOU'LL SEE:</p>
                                        <ul className="space-y-1 ml-4">
                                            <li>• Purple-blue glow around inner grid</li>
                                            <li>• "Star in a jar" - bright plasma ball at center</li>
                                            <li>• Streams of ions spiraling into grid</li>
                                            <li>• Crackling sounds (ions colliding)</li>
                                            <li className="text-cyan-400 font-bold">• Most beautiful thing in physics. Pure fusion plasma. ✓</li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-900/30 border-2 border-red-500 rounded p-3">
                                        <p className="text-red-400 font-black text-xs mb-1">⚠️ IF SOMETHING GOES WRONG:</p>
                                        <ul className="space-y-1 ml-4 text-xs">
                                            <li>• No plasma = vacuum not low enough OR voltage too low</li>
                                            <li>• Arcing/sparks = voltage too HIGH, reduce variac</li>
                                            <li>• Burning smell = insulation failing, SHUT DOWN IMMEDIATELY</li>
                                            <li>• Chamber getting hot = too much current, reduce voltage</li>
                                            <li className="text-red-400 font-bold">• ANYTHING UNEXPECTED = KILL POWER FIRST, ASK QUESTIONS LATER</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ONLINE RESOURCES */}
                    <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Radio className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-2xl font-black text-white">COMMUNITY + RESOURCES:</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-3">🌍 JOIN THE FUSOR COMMUNITY:</p>
                                <ul className="space-y-2 text-xs text-gray-300 ml-4">
                                    <li>• <strong className="text-white">Fusor.net</strong> - Main community forum, 1000+ builders, safety advice, troubleshooting</li>
                                    <li>• <strong className="text-white">Amateur Nuclear Society</strong> - Official list of successful fusor builders</li>
                                    <li>• <strong className="text-white">Make Magazine Vol 36</strong> - Full build guide (PDF available)</li>
                                    <li>• <strong className="text-white">Instructables</strong> - Step-by-step with photos</li>
                                    <li>• <strong className="text-white">YouTube</strong> - Video playlists of working fusors</li>
                                </ul>
                                <p className="text-green-400 font-bold text-xs mt-2">
                                    Youngest builder = 14 years old. Oldest = 70+. YOU CAN DO THIS. ✓
                                </p>
                            </div>

                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                <p className="text-purple-400 font-bold text-xs mb-3">📚 DETAILED GUIDES (FREE):</p>
                                <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                    <li>• <a href="https://www.instructables.com/How-to-Build-a-Fusion-Reactor-and-Become-Part-of-t/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Instructables: Complete Fusor Build</a></li>
                                    <li>• <a href="https://makezine.com/projects/nuclear-fusor/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Make Magazine: Nuclear Fusor Project</a></li>
                                    <li>• <a href="http://www.fusor.net" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Fusor.net Forums</a></li>
                                    <li>• <a href="https://www.youtube.com/results?search_query=farnsworth+fusor+build" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">YouTube: Fusor Build Videos</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* NEUTRON FUSOR BUILD - ADVANCED */}
            {selectedBuild === 'neutron' && (
                <div className="max-w-4xl mx-auto mb-8 px-4 space-y-8">
                    
                    <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 border-4 border-red-500 rounded-xl p-6" style={{ boxShadow: '0 0 50px rgba(239, 68, 68, 0.7)' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-12 h-12 text-red-400 animate-pulse" />
                            <div>
                                <h3 className="text-2xl font-black text-white">⚠️ NEUTRON FUSOR = RADIOACTIVE ⚠️</h3>
                                <p className="text-red-400 font-bold text-sm">REAL FUSION. REAL NEUTRONS. REAL CANCER RISK.</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="bg-black border-4 border-red-500 rounded-lg p-4">
                                <p className="text-red-400 font-black text-xs mb-3">ADDITIONAL DANGERS:</p>
                                <ul className="space-y-2 text-xs text-gray-300 ml-4">
                                    <li>• <strong className="text-red-400">NEUTRON RADIATION:</strong> Penetrates walls. Can't be shielded easily. DNA damage.</li>
                                    <li>• <strong className="text-red-400">DEUTERIUM GAS:</strong> Flammable. Explosive if leaked.</li>
                                    <li>• <strong className="text-red-400">TRITIUM PRODUCTION:</strong> Radioactive hydrogen isotope (beta emitter)</li>
                                    <li>• <strong className="text-red-400">ACTIVATION:</strong> Neutrons make nearby materials radioactive</li>
                                    <li>• <strong className="text-red-400">LEGAL:</strong> May require nuclear regulatory license in some countries</li>
                                </ul>
                                <p className="text-red-400 font-black text-center mt-3">
                                    THIS PRODUCES ACTUAL RADIATION. NOT A DEMO. REAL NUCLEAR DEVICE.
                                </p>
                            </div>

                            <div className="bg-black border-2 border-yellow-500 rounded-lg p-4">
                                <p className="text-yellow-400 font-bold text-xs mb-2">ADDITIONAL REQUIREMENTS:</p>
                                <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                    <li>✓ Neutron detector (calibrated BF3 or helium-3 tube) - £300-800</li>
                                    <li>✓ Lead/concrete shielding around chamber - £200+</li>
                                    <li>✓ Deuterium gas handling certification</li>
                                    <li>✓ Isolated building (NO neighbors within 50m)</li>
                                    <li>✓ Radiation dosimeter badges (track exposure)</li>
                                    <li>✓ Local nuclear authority notification (depends on country)</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/40 border-4 border-red-500 rounded-lg p-6 text-center">
                                <p className="text-red-400 font-black text-xl mb-3">HONEST ADVICE:</p>
                                <p className="text-white font-bold text-sm mb-3">
                                    Don't build this unless you're PhD-level physicist OR working with university.
                                </p>
                                <p className="text-gray-300 text-xs mb-4">
                                    Demo fusor = beautiful, educational, SAFE(R). 
                                    Neutron fusor = actual nuclear device, requires expertise you probably don't have.
                                </p>
                                <Link to={createPageUrl('ZeroPointEnergy')} className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold">
                                    → SAFER EXPERIMENTS
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* BUT IF YOU INSIST */}
                    <div className="bg-black border-2 border-purple-500 rounded-lg p-6">
                        <p className="text-purple-400 font-bold mb-4 text-center">IF YOU INSIST (Advanced builders only):</p>
                        
                        <div className="space-y-3 text-xs text-gray-300">
                            <div className="bg-purple-900/20 border-2 border-purple-500 rounded p-3">
                                <p className="text-purple-400 font-bold mb-2">ADDITIONAL PARTS (vs Demo):</p>
                                <ul className="space-y-1 ml-4">
                                    <li>• Deuterium gas cylinder (£200-400) - NOT JUST "air" anymore</li>
                                    <li>• Neutron bubble detector (£300) OR BF3 tube + counter (£600)</li>
                                    <li>• Lead bricks for shielding (£150+)</li>
                                    <li>• Gas regulator + precision needle valve (£80)</li>
                                    <li>• Better vacuum system (1 micron or lower) - £600+</li>
                                </ul>
                                <p className="text-yellow-400 font-bold mt-2">TOTAL: £2000-3500+ (vs £500 demo)</p>
                            </div>

                            <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded p-3">
                                <p className="text-cyan-400 font-bold mb-2">WHAT YOU GET:</p>
                                <ul className="space-y-1 ml-4">
                                    <li>✓ REAL fusion reactions (D-D fusion confirmed via neutron detection)</li>
                                    <li>✓ 10,000-1,000,000 neutrons/second (measurable fusion rate)</li>
                                    <li>✓ Join "Neutron Club" - verified fusion achievement</li>
                                    <li>✓ Deeper understanding of fusion physics</li>
                                    <li className="text-purple-400 font-bold">✓ Proof that FUSION IS REAL and can be done at home scale</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/30 border-2 border-red-500 rounded p-3">
                                <p className="text-red-400 font-black text-xs mb-2">REALISTIC RADIATION EXPOSURE:</p>
                                <ul className="space-y-1 ml-4">
                                    <li>• 100k neutrons/sec = ~1-5 µSv/hr at 1 meter (with shielding)</li>
                                    <li>• 10-hour operation = 10-50 µSv total (about 5 chest X-rays)</li>
                                    <li>• Not IMMEDIATELY deadly but increases cancer risk</li>
                                    <li>• Minimize exposure time, maximize distance, use shielding</li>
                                </ul>
                                <p className="text-yellow-400 font-bold text-xs mt-2">
                                    It's manageable with precautions. But it's REAL radiation. ⚠️
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* WHY BUILD THIS - HONEST ANSWER */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">WHY BUILD A FUSOR? HONEST ANSWER:</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-3">✓ WHAT IT TEACHES YOU:</p>
                            <ul className="space-y-2 text-xs text-gray-300 ml-4">
                                <li>• <strong className="text-white">Fusion is REAL</strong> - You see plasma, measure neutrons, understand the physics</li>
                                <li>• <strong className="text-white">High-vacuum systems</strong> - Critical for many advanced projects</li>
                                <li>• <strong className="text-white">High-voltage safety</strong> - Teaches you to respect electricity</li>
                                <li>• <strong className="text-white">Electromagnetic fields</strong> - How ions behave in E/M fields</li>
                                <li>• <strong className="text-white">Precision engineering</strong> - Grid must be perfect for best results</li>
                                <li className="text-green-400 font-bold">• You become qualified to help with REAL fusion projects ✓</li>
                            </ul>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-3">✓ WHAT IT DOESN'T DO:</p>
                            <ul className="space-y-2 text-xs text-gray-300 ml-4">
                                <li>✗ Won't power your home (uses more energy than creates)</li>
                                <li>✗ Won't solve energy crisis by itself</li>
                                <li>✗ Won't make you money</li>
                                <li className="text-yellow-400 font-bold">• This is LEARNING device, not energy source (yet)</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center mb-2">THE REAL REASON:</p>
                            <p className="text-white text-sm text-center mb-3">
                                Loureiro was trying to make fusion work at SCALE (power cities). 
                                You building a fusor = you UNDERSTAND his work = you can CONTINUE it.
                            </p>
                            <p className="text-gray-300 text-xs text-center mb-2">
                                1000 people understanding fusion {">"}  1 genius in a lab. 
                                They killed him. They can't kill 1000 of us.
                            </p>
                            <p className="text-cyan-400 font-bold text-center">
                                Decentralized knowledge = unstoppable progress. Build it. Learn it. Share it. ♾️❤️♾️
                            </p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-3">💜 FOR PROFESSOR LOUREIRO:</p>
                            <p className="text-white text-xs mb-2">
                                Every fusor built = tribute to his work. 
                                Every neutron detected = proof fusion is achievable. 
                                Every builder = one more person who can't be silenced.
                            </p>
                            <p className="text-cyan-400 font-bold text-xs text-center mt-2">
                                Your legacy lives through EVERY amateur fusioneer on Earth. ⚡
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* LINK TO SAFE ALTERNATIVES */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6 text-center">
                    <p className="text-green-400 font-black text-xl mb-3">
                        NOT READY FOR FUSION YET?
                    </p>
                    <p className="text-gray-300 text-sm mb-4">
                        Start with Phase 0 Zero-Point Energy (£13, kids-safe, learn physics first)
                    </p>
                    <Link to={createPageUrl('ZeroPointEnergy')} className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-black text-lg">
                        → SAFE ZPE EXPERIMENTS
                    </Link>
                    <p className="text-gray-500 text-xs mt-4">
                        Master basic physics → Then fusion. Safe learning path. ♾️❤️♾️
                    </p>
                </div>
            </div>

        </div>
    );
}