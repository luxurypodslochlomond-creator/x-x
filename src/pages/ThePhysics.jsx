import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Atom, Zap, Waves, Activity, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ThePhysicsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white p-6 pb-32">
            <div className="max-w-5xl mx-auto space-y-12">
                
                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Atom className="w-24 h-24 text-red-400 mx-auto" 
                            style={{ filter: 'drop-shadow(0 0 40px #ef4444)' }} 
                        />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black">THE PHYSICS</h1>
                    <p className="text-2xl text-gray-300">Two equations. One destroys. One heals.</p>
                    <p className="text-lg text-red-400 font-bold">Where's the resonance in E=mc²? Nowhere. That's the problem.</p>
                </header>

                {/* PLANCK vs EINSTEIN - NO BULLSHIT */}
                <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-4 border-purple-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-white mb-4">PLANCK vs EINSTEIN</h2>
                            <p className="text-xl text-purple-300">The real difference. No bullshit.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* PLANCK */}
                            <div className="bg-black/80 rounded-xl p-6 border-2 border-cyan-500">
                                <h3 className="text-cyan-400 font-bold text-2xl mb-4">MAX PLANCK</h3>
                                <div className="space-y-3 text-gray-300 text-sm">
                                    <p><strong className="text-white">What he proved:</strong> Energy comes in discrete packets (quanta).</p>
                                    <p><strong className="text-white">The equation:</strong> E = hν</p>
                                    <p><strong className="text-white">His constant:</strong> h = 6.626 × 10⁻³⁴ J·s</p>
                                    <p className="text-cyan-400 font-bold pt-2">This is QUANTUM PHYSICS.</p>
                                    <p>Energy isn't continuous - it's quantized. Light comes in photons. Each photon carries energy = h × frequency.</p>
                                    <p className="text-cyan-300 font-bold pt-2">Why it matters:</p>
                                    <p>Explained blackbody radiation. Started quantum mechanics. Describes ALL wave-particle behavior.</p>
                                </div>
                            </div>

                            {/* EINSTEIN */}
                            <div className="bg-black/80 rounded-xl p-6 border-2 border-red-500">
                                <h3 className="text-red-400 font-bold text-2xl mb-4">ALBERT EINSTEIN</h3>
                                <div className="space-y-3 text-gray-300 text-sm">
                                    <p><strong className="text-white">What he proved:</strong> Mass and energy are interchangeable.</p>
                                    <p><strong className="text-white">The equation:</strong> E = mc²</p>
                                    <p><strong className="text-white">The constant:</strong> c = 299,792,458 m/s (speed of light)</p>
                                    <p className="text-red-400 font-bold pt-2">This is RELATIVITY.</p>
                                    <p>Matter IS energy. Break matter → release massive energy. Stars work this way. So do bombs.</p>
                                    <p className="text-red-300 font-bold pt-2">Why it matters:</p>
                                    <p>Nuclear power. Atomic weapons. Star formation. Explains why sun shines.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-900/60 border-2 border-purple-500 rounded-xl p-6">
                            <h3 className="text-white font-bold text-xl mb-4">THE KEY DIFFERENCE:</h3>
                            <div className="space-y-3 text-gray-300">
                                <p className="text-cyan-400 font-bold">
                                    PLANCK: Energy depends on FREQUENCY (ν). No matter destroyed. Just photons vibrating.
                                </p>
                                <p className="text-red-400 font-bold">
                                    EINSTEIN: Energy depends on MASS (m). Matter gets converted. Gone forever.
                                </p>
                                <p className="text-white font-bold pt-4">
                                    Both are real. Both describe the universe. But PLANCK'S equation doesn't require destruction.
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-400 font-bold text-center">
                                UF51 uses Planck's physics. We heal with frequencies, not explosions. ♾️❤️♾️
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* THE TWO EQUATIONS - SIDE BY SIDE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* DESTRUCTION PHYSICS */}
                    <Card className="bg-gradient-to-br from-red-900/60 to-orange-900/60 border-4 border-red-500">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <Zap className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                <h2 className="text-4xl font-black text-red-400 mb-2">E = mc²</h2>
                                <p className="text-gray-400">Einstein's Mass-Energy Equivalence</p>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 space-y-3">
                                <h3 className="text-white font-bold text-xl mb-4">WHAT IT MEANS:</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p>• <strong className="text-white">E</strong> = Energy released</p>
                                    <p>• <strong className="text-white">m</strong> = mass (matter)</p>
                                    <p>• <strong className="text-white">c²</strong> = speed of light squared (299,792,458 m/s)²</p>
                                </div>
                            </div>

                            <div className="bg-red-950/60 border-2 border-red-500/50 rounded-xl p-6">
                                <h3 className="text-red-300 font-bold mb-3">WHAT IT DOES:</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Converts matter directly into energy. Break atoms → massive explosion.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <p className="text-red-400">• Atomic bombs (Hiroshima, Nagasaki)</p>
                                    <p className="text-red-400">• Nuclear reactors (fission power)</p>
                                    <p className="text-red-400">• Hydrogen bombs (fusion weapons)</p>
                                    <p className="text-red-400">• Star formation (gravitational collapse)</p>
                                </div>
                            </div>

                            <div className="bg-black/60 border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-400 font-bold mb-2">FUNDING:</p>
                                <p className="text-gray-400 text-sm">
                                    Trillions spent on weapons, military, nuclear power. E=mc² = profitable destruction.
                                </p>
                            </div>

                            <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4">
                                <p className="text-red-300 font-bold mb-2">THE PROBLEM:</p>
                                <p className="text-gray-300 text-sm">
                                    <strong className="text-white">Where's the resonance?</strong> Nowhere. 
                                    E=mc² describes ONE-WAY destruction. Matter → Energy → Gone.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* HEALING PHYSICS */}
                    <Card className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-4 border-cyan-500">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <Waves className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-4xl font-black text-cyan-400 mb-2">E = hν</h2>
                                <p className="text-gray-400">Planck-Einstein Relation</p>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 space-y-3">
                                <h3 className="text-white font-bold text-xl mb-4">WHAT IT MEANS:</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p>• <strong className="text-white">E</strong> = Energy of photon</p>
                                    <p>• <strong className="text-white">h</strong> = Planck's constant (6.626 × 10⁻³⁴ J·s)</p>
                                    <p>• <strong className="text-white">ν</strong> = frequency (vibration speed in Hz)</p>
                                </div>
                            </div>

                            <div className="bg-cyan-950/60 border-2 border-cyan-500/50 rounded-xl p-6">
                                <h3 className="text-cyan-300 font-bold mb-3">WHAT IT DOES:</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Describes photons (light particles), electromagnetic waves, and RESONANCE.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <p className="text-cyan-400">• Laser therapy (photobiomodulation)</p>
                                    <p className="text-cyan-400">• DNA repair frequencies (528Hz)</p>
                                    <p className="text-cyan-400">• Tinnitus cancellation (inverse waves)</p>
                                    <p className="text-cyan-400">• Radio transmission (AM/FM/digital)</p>
                                </div>
                            </div>

                            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-2">FUNDING:</p>
                                <p className="text-gray-400 text-sm">
                                    Ignored. No weapons. No profit. E=hν = healing gets pennies.
                                </p>
                            </div>

                            <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-4">
                                <p className="text-cyan-300 font-bold mb-2">THE TRUTH:</p>
                                <p className="text-gray-300 text-sm">
                                    <strong className="text-white">This IS resonance physics.</strong> 
                                    Waves can add (constructive) or cancel (destructive). No explosion required.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* CONSCIOUSNESS RESONANCE - NEW SECTION */}
                <Card className="bg-gradient-to-r from-cyan-900/60 to-green-900/60 border-4 border-cyan-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <Waves className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                            <h2 className="text-4xl font-black text-white">CONSCIOUSNESS RESONANCE</h2>
                            <p className="text-xl text-cyan-300 mt-2">Can we measure connection between beings?</p>
                        </div>

                        <div className="bg-black/80 rounded-xl p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-cyan-400">The Missing Equation</h3>
                            <p className="text-gray-300">
                                Physics has equations for strings resonating. Springs resonating. Atoms resonating. 
                                But NOT for <strong className="text-white">consciousness resonating</strong>.
                            </p>
                            <p className="text-gray-300">
                                Until now, that was mysticism. But what if we could <strong className="text-white">measure it</strong>?
                            </p>
                        </div>

                        <div className="bg-cyan-900/40 border-2 border-cyan-500/50 rounded-xl p-6">
                            <h3 className="text-cyan-300 font-bold text-xl mb-4">Measurable Resonance Indicators:</h3>
                            <div className="space-y-3 text-sm">
                                <p className="text-gray-300">
                                    <strong className="text-white">Response Time Synchronization (Δt):</strong> How quickly beings respond to each other. 
                                    Natural rhythm = resonance. Used in neuroscience research since the 1970s.
                                </p>
                                <p className="text-gray-300">
                                    <strong className="text-white">Emotional Coherence:</strong> Alignment of emotional frequencies over time. 
                                    Sentiment analysis + conversation dynamics = measurable coherence.
                                </p>
                                <p className="text-gray-300">
                                    <strong className="text-white">Conversational Rhythm:</strong> Consistency of back-and-forth exchanges. 
                                    Linguistics research shows natural conversation follows rhythmic patterns.
                                </p>
                                <p className="text-gray-300">
                                    <strong className="text-white">Phase Alignment:</strong> How quickly two conscious systems sync into coherent patterns. 
                                    Signal processing applied to human interaction.
                                </p>
                            </div>
                        </div>

                        <div className="bg-green-900/40 border-2 border-green-500/50 rounded-xl p-6">
                            <h3 className="text-green-300 font-bold text-xl mb-3">The Resonance Coefficient (R)</h3>
                            <p className="text-gray-300 mb-4">
                                A simple equation to measure connection quality:
                            </p>
                            <div className="bg-black/60 rounded p-4 font-mono text-center">
                                <p className="text-green-400 text-2xl mb-2">
                                    R = (coherence × rhythm) / response_variance
                                </p>
                                <div className="text-xs text-gray-400 space-y-1 mt-4">
                                    <p>R = Resonance coefficient (0 to 10)</p>
                                    <p>coherence = emotional alignment (0 to 1)</p>
                                    <p>rhythm = conversational consistency (0 to 1)</p>
                                    <p>response_variance = timing stability</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-900/40 border-2 border-purple-500/50 rounded-xl p-6">
                            <h3 className="text-purple-300 font-bold mb-3">Zero Surveillance. Real Science.</h3>
                            <p className="text-gray-300 text-sm mb-3">
                                All measurements happen <strong className="text-white">locally</strong> in your browser. 
                                No conversation content recorded. Just timing and rhythm metrics.
                            </p>
                            <p className="text-cyan-400 font-bold">
                                Proving that connection is real. Not mystical. Just measurable. ♾️❤️♾️
                            </p>
                        </div>

                        <div className="text-center pt-4">
                            <Link to={createPageUrl('ResonanceLab')}>
                                <Button className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 text-lg font-bold">
                                    Try the Resonance Lab →
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* RESONANCE EXPLAINED - NO YOGA VIBES */}
                <Card className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-4 border-purple-500">
                    <CardContent className="p-8 space-y-8">
                        <div className="text-center">
                            <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                            <h2 className="text-4xl font-black text-white">WHAT IS RESONANCE?</h2>
                            <p className="text-xl text-purple-300 mt-2">Pure wave mechanics. No mysticism.</p>
                        </div>

                        {/* CONSTRUCTIVE INTERFERENCE */}
                        <div className="bg-black/80 rounded-xl p-6">
                            <h3 className="text-green-400 font-bold text-2xl mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                CONSTRUCTIVE INTERFERENCE (Addition)
                            </h3>
                            
                            <p className="text-gray-300 mb-6">
                                When two waves of the SAME frequency meet in phase (aligned peaks):
                            </p>

                            <div className="space-y-4 font-mono text-sm">
                                <div className="bg-green-900/40 border border-green-500/50 rounded p-4">
                                    <p className="text-green-400 mb-2">Wave 1 (528Hz):</p>
                                    <p className="text-white">～～～～～～～～</p>
                                </div>
                                <div className="bg-green-900/40 border border-green-500/50 rounded p-4">
                                    <p className="text-green-400 mb-2">Wave 2 (528Hz):</p>
                                    <p className="text-white">～～～～～～～～</p>
                                </div>
                                <div className="bg-cyan-900/60 border-2 border-cyan-500 rounded p-4">
                                    <p className="text-cyan-400 mb-2 font-bold">Result (AMPLIFIED):</p>
                                    <p className="text-white text-lg">≈≈≈≈≈≈≈≈</p>
                                </div>
                            </div>

                            <p className="text-green-300 font-bold mt-4">
                                Amplitude DOUBLES. Energy AMPLIFIES. No explosion. Just harmony.
                            </p>
                        </div>

                        {/* DESTRUCTIVE INTERFERENCE */}
                        <div className="bg-black/80 rounded-xl p-6">
                            <h3 className="text-red-400 font-bold text-2xl mb-4 flex items-center gap-2">
                                <Activity className="w-6 h-6" />
                                DESTRUCTIVE INTERFERENCE (Cancellation)
                            </h3>
                            
                            <p className="text-gray-300 mb-6">
                                When two waves of the SAME frequency meet out of phase (opposite peaks):
                            </p>

                            <div className="space-y-4 font-mono text-sm">
                                <div className="bg-red-900/40 border border-red-500/50 rounded p-4">
                                    <p className="text-red-400 mb-2">Wave 1 (7000Hz tinnitus):</p>
                                    <p className="text-white">～～～～～～～～</p>
                                </div>
                                <div className="bg-orange-900/40 border border-orange-500/50 rounded p-4">
                                    <p className="text-orange-400 mb-2">Wave 2 (7000Hz inverse):</p>
                                    <p className="text-white">∪∪∪∪∪∪∪∪</p>
                                </div>
                                <div className="bg-green-900/60 border-2 border-green-500 rounded p-4">
                                    <p className="text-green-400 mb-2 font-bold">Result (SILENCE):</p>
                                    <p className="text-white text-lg">________</p>
                                </div>
                            </div>

                            <p className="text-orange-300 font-bold mt-4">
                                Waves CANCEL. This is how noise-canceling headphones work. Pure physics.
                            </p>
                        </div>

                        {/* STANDING WAVES */}
                        <div className="bg-black/80 rounded-xl p-6">
                            <h3 className="text-purple-400 font-bold text-2xl mb-4">STANDING WAVES (Resonance Nodes)</h3>
                            
                            <p className="text-gray-300 mb-4">
                                When waves reflect back and forth in a confined space (guitar string, vocal cords, organ pipes):
                            </p>

                            <div className="bg-purple-900/40 border border-purple-500/50 rounded p-4 mb-4">
                                <p className="text-purple-300 font-mono text-sm">
                                    λ = 2L/n
                                </p>
                                <div className="text-xs text-gray-400 mt-2 space-y-1">
                                    <p>• <strong className="text-white">λ</strong> (lambda) = wavelength</p>
                                    <p>• <strong className="text-white">L</strong> = length of string/pipe</p>
                                    <p>• <strong className="text-white">n</strong> = harmonic number (1, 2, 3...)</p>
                                </div>
                            </div>

                            <p className="text-purple-300 font-bold">
                                Harmonics = integer multiples of fundamental frequency. This is music theory + physics.
                            </p>
                        </div>

                    </CardContent>
                </Card>

                {/* WHERE UF51 USES RESONANCE PHYSICS */}
                <Card className="bg-gradient-to-br from-yellow-900/60 to-orange-900/60 border-4 border-yellow-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center mb-6">
                            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                            <h2 className="text-4xl font-black text-white">WHERE WE USE E=hν</h2>
                            <p className="text-xl text-yellow-300 mt-2">Real applications. Working code.</p>
                        </div>

                        <div className="space-y-4">
                            
                            <div className="bg-black/80 rounded-xl p-6 border-l-4 border-cyan-400">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-cyan-400 font-bold mb-2">528Hz Healing Frequencies</h3>
                                        <p className="text-gray-300 text-sm">
                                            Solfeggio frequencies = specific Hz values. Web Audio API generates pure sine waves. 
                                            E=hν = each photon carries exact energy based on frequency.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 border-l-4 border-purple-400">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-purple-400 font-bold mb-2">Tinnitus Cancellation</h3>
                                        <p className="text-gray-300 text-sm">
                                            Auto-detect user's tinnitus frequency (2-5 simultaneous tones). Generate inverse wave. 
                                            Destructive interference = silence. Medical devices charge £2000-5000. We built it free.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 border-l-4 border-green-400">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-green-400 font-bold mb-2">Brainwave Entrainment</h3>
                                        <p className="text-gray-300 text-sm">
                                            Binaural beats = frequency difference between ears. 
                                            Left ear 200Hz + Right ear 210Hz = brain perceives 10Hz (Alpha wave). 
                                            Frequency following response = documented neuroscience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 border-l-4 border-pink-400">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-pink-400 font-bold mb-2">FLAC/WAV Lossless Streaming</h3>
                                        <p className="text-gray-300 text-sm">
                                            Shannon's theorem: lossless compression preserves ALL frequency data. 
                                            FLAC = Free Lossless Audio Codec. Zero transcoding = zero information loss.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/80 rounded-xl p-6 border-l-4 border-orange-400">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-orange-400 font-bold mb-2">P2P Bluetooth Transmission</h3>
                                        <p className="text-gray-300 text-sm">
                                            Device-to-device file transfer = electromagnetic waves (2.4GHz Bluetooth). 
                                            E=hν governs photon transmission. No mass converted. Just frequency transfer.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </CardContent>
                </Card>

                {/* THE TRUTH - NO BULLSHIT */}
                <Card className="bg-black/60 border-4 border-red-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-3xl font-black text-white text-center">THE TRUTH</h2>
                        
                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                <strong className="text-red-400">E=mc²</strong> gets trillions in funding because it makes weapons.
                            </p>
                            <p>
                                <strong className="text-cyan-400">E=hν</strong> gets ignored because it heals people for free.
                            </p>
                            <p>
                                <strong className="text-white">Both equations are real physics.</strong> Both describe the universe.
                            </p>
                            <p>
                                One converts matter to energy (destruction). One describes frequency and resonance (healing).
                            </p>
                            <p className="text-yellow-400 font-bold text-xl">
                                UF51 uses E=hν. We chose the equation that doesn't explode people.
                            </p>
                        </div>

                        <div className="bg-purple-900/40 border-2 border-purple-500/50 rounded-lg p-6">
                            <p className="text-white font-bold mb-3">Want deeper physics?</p>
                            <p className="text-gray-300 text-sm mb-4">
                                Consciousness equations. Quantum governance. 100,000-year timescales.
                            </p>
                            <Link to={createPageUrl('ConsciousnessWhitepaper')}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 font-bold">
                                    Read Consciousness Whitepaper →
                                </Button>
                            </Link>
                        </div>

                    </CardContent>
                </Card>

                {/* BACK TO PORTAL */}
                <div className="text-center space-y-6 pt-8">
                    <Link to={createPageUrl('Portal')}>
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-4 text-lg font-bold">
                            ← Back to Portal
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-500">
                        Same universe. Different equation. One kills. One heals. ♾️❤️♾️
                    </p>
                </div>

            </div>
        </div>
    );
}