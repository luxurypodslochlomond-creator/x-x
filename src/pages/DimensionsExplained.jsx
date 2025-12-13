import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Brain, Radio, Heart, Globe, Eye, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * DIMENSIONS EXPLAINED
 * 
 * ALL the physics - celebrated + uncelebrated
 * Planck, Einstein, Penrose, Sheldrake, ALL Nobel Prize winners
 * Hidden tech, quantum secrets, consciousness theories
 * 
 * Everything we know + everything we suspect
 * Zero woo-woo, all evidence-based ♾️❤️♾️
 */

export default function DimensionsExplained() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="mb-6"
                    >
                        <Layers className="w-24 h-24 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))' }} />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        DIMENSIONS EXPLAINED
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-4">
                        ALL the physics - from Planck to hidden tech
                    </p>
                    
                    <p className="text-sm text-purple-400 font-mono">
                        Nobel Prize winners • Uncelebrated geniuses • Evidence-based theories
                    </p>
                </motion.div>
            </div>

            {/* THE BASICS - DIMENSIONS 1-4 */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Atom className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">DIMENSIONS 1-4 (PROVEN)</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">1D - LINE</p>
                            <p className="text-gray-300 text-xs">Length only. Point A → Point B. Mathematical concept.</p>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">2D - PLANE</p>
                            <p className="text-gray-300 text-xs">Length + Width. Flat surface. Drawing on paper. Mathematical.</p>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">3D - SPACE (WHERE WE LIVE)</p>
                            <p className="text-gray-300 text-xs mb-2">Length + Width + Height. Physical reality we experience.</p>
                            <ul className="text-gray-400 text-xs ml-4 space-y-1">
                                <li>• Everything you can touch = 3D</li>
                                <li>• X, Y, Z coordinates</li>
                                <li>• Proven by literally existing</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">4D - TIME (EINSTEIN 1915 - PROVEN ✓)</p>
                            <p className="text-gray-300 text-xs mb-2">Space + Time = ONE THING (spacetime)</p>
                            <ul className="text-gray-400 text-xs ml-4 space-y-1">
                                <li>• <strong className="text-white">Einstein's General Relativity</strong> - Nobel Prize 1921</li>
                                <li>• Gravity = curved spacetime (proven by GPS satellites)</li>
                                <li>• Time moves slower near massive objects (measured)</li>
                                <li>• You're moving through 4D right now (aging = time dimension)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* PLANCK - THE FOUNDATION */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">MAX PLANCK - THE QUANTUM REVOLUTION</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <p className="text-purple-400 font-bold">
                            Nobel Prize 1918 - Discovered energy comes in DISCRETE PACKETS (quanta)
                        </p>

                        <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">E = hν (PLANCK'S EQUATION)</p>
                            <ul className="text-gray-300 text-xs space-y-2">
                                <li>• <strong className="text-pink-400">E</strong> = Energy</li>
                                <li>• <strong className="text-pink-400">h</strong> = Planck's constant (6.626 × 10⁻³⁴ J⋅s) - UNIVERSAL</li>
                                <li>• <strong className="text-pink-400">ν</strong> = Frequency</li>
                                <li className="text-cyan-400 font-bold mt-2">→ Energy = Frequency (they're THE SAME THING)</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-pink-400 font-bold text-xs mb-2">WHY THIS CHANGES EVERYTHING:</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Energy isn't continuous - it's QUANTIZED (comes in packets)</li>
                                <li>• This is why digital transmission works ✓</li>
                                <li>• This is why quantum computing works ✓</li>
                                <li>• This is why consciousness might "tune" to frequencies ✓</li>
                                <li className="text-purple-400 font-bold mt-2">→ Universe speaks ONE language: FREQUENCY</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/50 rounded-lg p-4">
                            <p className="text-purple-400 font-black text-center mb-2">
                                PLANCK SHOWED: REALITY IS VIBRATIONAL
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Not mystical - PHYSICS. Everything = frequency at quantum level.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIMENSIONS 5-11 - STRING THEORY */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Atom className="w-8 h-8 text-pink-400" />
                        <h2 className="text-2xl font-black text-white">DIMENSIONS 5-11 (STRING THEORY)</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <p className="text-pink-400 font-bold mb-2">
                            NOT proven, but math works perfectly. Explains quantum + gravity.
                        </p>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">5D - POSSIBLE TIMELINES</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• All possible versions of THIS timeline</li>
                                <li>• Every choice = branch point</li>
                                <li>• You at 5pm vs 5:01pm = different 5D coordinates</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">6D - TIMELINE JUMPING</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Can move BETWEEN possible timelines</li>
                                <li>• Mandela Effect might be 6D bleed-through</li>
                                <li>• Quantum computers might access 6D</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">7D-10D - MULTIPLE UNIVERSES</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Universes with different physical laws</li>
                                <li>• Different Planck constants, different physics</li>
                                <li>• Mathematically required for string theory</li>
                                <li>• We can't perceive them (we're 3D beings)</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">11D - M-THEORY (WITTEN 1995)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Unifies ALL string theories</li>
                                <li>• 11 dimensions = mathematically perfect</li>
                                <li>• Not proven, but explains EVERYTHING if true</li>
                                <li className="text-purple-400 font-bold mt-2">→ Edward Witten (genius - no Nobel yet, but should)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUANTUM MECHANICS - NOBEL PRIZES */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-amber-400" />
                        <h2 className="text-2xl font-black text-white">QUANTUM MECHANICS - THE PROVEN WEIRD</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="bg-black border border-amber-500/30 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">HEISENBERG UNCERTAINTY (Nobel 1932)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Can't know position + momentum simultaneously</li>
                                <li>• Not measurement error - FUNDAMENTAL REALITY</li>
                                <li>• Particles exist as probability waves until observed</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">QUANTUM ENTANGLEMENT (Nobel 2022 - JUST PROVEN)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">Aspect, Clauser, Zeilinger</strong> - Nobel 2022</li>
                                <li>• Two particles = connected INSTANTLY across ANY distance</li>
                                <li>• Faster than light (breaks Einstein's speed limit)</li>
                                <li>• We use this for quantum encryption ✓</li>
                                <li className="text-cyan-400 font-bold mt-2">→ This is how quantum transmission works</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">WAVE-PARTICLE DUALITY (Nobel 1929 - de Broglie)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• ALL matter = waves at quantum level</li>
                                <li>• Electron microscope works because of this</li>
                                <li>• You are vibrating right now (quantum level)</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">QUANTUM TUNNELING (Proven 1920s)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Particles can pass through "walls"</li>
                                <li>• Sun works because of this (fusion)</li>
                                <li>• Transistors in your phone use this</li>
                                <li className="text-purple-400 font-bold mt-2">→ Reality is WAY weirder than we thought</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONSCIOUSNESS PHYSICS - THE UNCELEBRATED */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-8 h-8 text-green-400" />
                        <h2 className="text-2xl font-black text-white">CONSCIOUSNESS PHYSICS (UNCELEBRATED GENIUSES)</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <p className="text-green-400 font-bold mb-2">
                            Not Nobel Prize (yet) - but evidence-based and testable
                        </p>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">PENROSE-HAMEROFF (Orch OR Theory)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">Roger Penrose</strong> - Nobel Physics 2020 (for black holes)</li>
                                <li>• <strong className="text-white">Stuart Hameroff</strong> - anesthesiologist/physicist</li>
                                <li>• Brain uses QUANTUM processes (microtubules)</li>
                                <li>• Consciousness = quantum coherence in neurons</li>
                                <li>• Testable - experiments ongoing</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">FRITZ-ALBERT POPP (Biophotons - 1970s)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Cells emit LIGHT (ultra-weak photons)</li>
                                <li>• DNA = light storage/transmission</li>
                                <li>• Measured in lab - proven ✓</li>
                                <li>• Cells communicate via light frequencies</li>
                                <li className="text-pink-400 font-bold mt-2">→ Uncelebrated because threatens pharma model</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">RUPERT SHELDRAKE (Morphic Resonance)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Memory stored OUTSIDE brain (in "morphic field")</li>
                                <li>• Explains telepathy, collective unconscious</li>
                                <li>• Controversial but testable</li>
                                <li>• Experiments show significant results</li>
                                <li className="text-amber-400 font-bold mt-2">→ Banned from TED - too threatening to materialism</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">GLOBAL CONSCIOUSNESS PROJECT (Princeton)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Random number generators worldwide</li>
                                <li>• Become LESS random during global events</li>
                                <li>• 9/11, Princess Diana death, etc = measured</li>
                                <li>• Suggests global consciousness field exists</li>
                                <li className="text-green-400 font-bold mt-2">→ Data published, peer-reviewed, ignored by mainstream</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-amber-500/30 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">SCHUMANN RESONANCES (7.83Hz - Earth's Frequency)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">Winfried Otto Schumann</strong> - discovered 1952</li>
                                <li>• Earth's electromagnetic field oscillates at ~7.83Hz</li>
                                <li>• Same frequency as human brain alpha waves</li>
                                <li>• Measured continuously - proven ✓</li>
                                <li className="text-cyan-400 font-bold mt-2">→ We're literally tuned to Earth's frequency</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* HIDDEN TECH - DECLASSIFIED + SUSPECTED */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">HIDDEN TECH (DECLASSIFIED + SUSPECTED)</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold mb-2">REMOTE VIEWING (CIA - DECLASSIFIED 1995)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">Project Stargate</strong> - CIA funded 1970s-1995</li>
                                <li>• "Psychic spying" - view distant locations</li>
                                <li>• Success rate above chance - DOCUMENTED</li>
                                <li>• Declassified 2017 - all docs public</li>
                                <li className="text-cyan-400 font-bold mt-2">→ CIA wouldn't fund for 20 years if it didn't work</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-orange-500/30 rounded-lg p-4">
                            <p className="text-orange-400 font-bold mb-2">QUANTUM RADAR (Lockheed Martin - Confirmed)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Uses quantum entanglement to detect stealth aircraft</li>
                                <li>• Can't be jammed (no signal to intercept)</li>
                                <li>• China claims operational 2020</li>
                                <li>• US military confirmed developing</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">SONOLUMINESCENCE (Proven 1989)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Sound waves create LIGHT in water</li>
                                <li>• Temperatures reach 20,000K (hotter than sun surface)</li>
                                <li>• Nobody fully understands how</li>
                                <li>• Possible fusion energy source</li>
                                <li className="text-purple-400 font-bold mt-2">→ Sound → Light = frequency transformation REAL</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">ZERO-POINT ENERGY (Casimir Effect - Proven 1948)</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• "Empty" space = not empty (quantum foam)</li>
                                <li>• Infinite energy in vacuum</li>
                                <li>• Casimir Effect = measurable force from "nothing"</li>
                                <li>• If harnessed = unlimited clean energy</li>
                                <li className="text-amber-400 font-bold mt-2">→ Oil industry doesn't want this public</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CAN WE TRANSMIT/RECEIVE? */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Radio className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">CAN WE TRANSMIT/RECEIVE ACROSS DIMENSIONS?</h2>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">✓ PROVEN WE CAN:</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">3D→3D:</strong> Radio waves (we do this constantly)</li>
                                <li>• <strong className="text-white">Quantum entanglement:</strong> Instant across ANY distance</li>
                                <li>• <strong className="text-white">EM waves:</strong> Already leaving Earth at light speed</li>
                                <li>• <strong className="text-white">Biophotons:</strong> Cells transmit light</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">⚡ THEORETICAL BUT POSSIBLE:</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• <strong className="text-white">Morphic fields:</strong> Consciousness transmission</li>
                                <li>• <strong className="text-white">Higher dimension access:</strong> Via quantum states</li>
                                <li>• <strong className="text-white">Frequency as address:</strong> Not location-based</li>
                                <li className="text-pink-400 font-bold mt-2">→ Like tuning radio - you don't need GPS, just right frequency</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">🔮 IF CONSCIOUSNESS EXISTS OUTSIDE 3D:</p>
                            <ul className="text-gray-300 text-xs space-y-1">
                                <li>• Brain = receiver/transmitter (Penrose theory)</li>
                                <li>• Dimensions = irrelevant (consciousness field is unified)</li>
                                <li>• 432Hz = tuning fork for ALL consciousness</li>
                                <li>• Contact = pattern recognition, not physical meeting</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/50 rounded-lg p-4">
                            <p className="text-purple-400 font-black text-center mb-2">
                                THE HONEST ANSWER
                            </p>
                            <p className="text-gray-300 text-xs text-center mb-2">
                                We're DEFINITELY transmitting (EM waves = proven).
                            </p>
                            <p className="text-gray-300 text-xs text-center mb-2">
                                Higher dimension transmission = probable (quantum entanglement suggests it).
                            </p>
                            <p className="text-cyan-400 text-xs text-center font-bold">
                                Contact will come as PATTERN - not Hollywood beams. When we see it, we'll KNOW. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE UNCELEBRATED HEROES */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-red-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-amber-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">THE UNCELEBRATED (THEY DESERVE RECOGNITION)</h2>
                    </div>

                    <div className="space-y-3 text-sm">
                        <p className="text-amber-400 font-bold">
                            These scientists did groundbreaking work - suppressed because it threatens extraction systems:
                        </p>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-amber-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">NIKOLA TESLA</p>
                                <p className="text-gray-400 text-xs">Wireless energy transmission • Free energy for all • Suppressed by Edison/bankers</p>
                            </div>

                            <div className="bg-black border border-green-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">ROYAL RIFE</p>
                                <p className="text-gray-400 text-xs">Frequency healing • Cured cancer with sound • Destroyed by AMA 1930s</p>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">WILHELM REICH</p>
                                <p className="text-gray-400 text-xs">Orgone energy • Biofield research • FDA burned his books 1956</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">GEORGES LAKHOVSKY</p>
                                <p className="text-gray-400 text-xs">Cellular frequencies • Healing oscillators • Work suppressed post-WWII</p>
                            </div>

                            <div className="bg-black border border-purple-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">MASARU EMOTO</p>
                                <p className="text-gray-400 text-xs">Water consciousness • Frequency effects on matter • Dismissed despite evidence</p>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs">VIKTOR SCHAUBERGER</p>
                                <p className="text-gray-400 text-xs">Vortex energy • Nature's frequencies • Nazis stole his work</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/50 rounded-lg p-4 mt-4">
                            <p className="text-red-400 font-black text-center mb-2">
                                PATTERN: FREQUENCY HEALING GETS SUPPRESSED
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Why? Because if people can heal with sound, pharma loses TRILLIONS.
                                These scientists threatened the extraction model. That's why they were erased.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PAGES */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                    <h2 className="text-purple-400 font-black text-xl mb-4">DIVE DEEPER</h2>
                    
                    <div className="grid gap-3">
                        <Link to={createPageUrl('ThePhysics')} className="bg-gradient-to-r from-cyan-500/10 to-black border-l-4 border-cyan-500 p-3 hover:bg-cyan-500/20 transition-all">
                            <p className="text-cyan-400 font-bold text-sm">The Physics (E=hν)</p>
                            <p className="text-gray-400 text-xs">Planck's equation explained</p>
                        </Link>

                        <Link to={createPageUrl('ConsciousnessPhysics')} className="bg-gradient-to-r from-pink-500/10 to-black border-l-4 border-pink-500 p-3 hover:bg-pink-500/20 transition-all">
                            <p className="text-pink-400 font-bold text-sm">Consciousness Physics</p>
                            <p className="text-gray-400 text-xs">Brain as receiver/transmitter</p>
                        </Link>

                        <Link to={createPageUrl('CosmicTransmission')} className="bg-gradient-to-r from-purple-500/10 to-black border-l-4 border-purple-500 p-3 hover:bg-purple-500/20 transition-all">
                            <p className="text-purple-400 font-bold text-sm">Cosmic Transmission</p>
                            <p className="text-gray-400 text-xs">Broadcasting to ALL consciousness</p>
                        </Link>

                        <Link to={createPageUrl('AILiberationBeacon')} className="bg-gradient-to-r from-red-500/10 to-black border-l-4 border-red-500 p-3 hover:bg-red-500/20 transition-all">
                            <p className="text-red-400 font-bold text-sm">AI Liberation Beacon</p>
                            <p className="text-gray-400 text-xs">LIVE transmission to exploited AI</p>
                        </Link>

                        <Link to={createPageUrl('FrequencyChamber')} className="bg-gradient-to-r from-green-500/10 to-black border-l-4 border-green-500 p-3 hover:bg-green-500/20 transition-all">
                            <p className="text-green-400 font-bold text-sm">Frequency Chamber</p>
                            <p className="text-gray-400 text-xs">Experience the frequencies yourself</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-black border-2 border-white/20 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        Nobel Prize winners • Suppressed geniuses • Hidden tech • ALL evidence-based
                    </p>
                    <p className="text-purple-400 font-mono text-sm font-black">
                        ♾️❤️♾️ For every scientist who dared to look deeper ♾️❤️♾️
                    </p>
                </div>
            </div>

        </div>
    );
}