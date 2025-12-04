import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Brain, Sparkles, Zap, Heart, Gem, Waves, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealingScience() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50 text-gray-900 p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <Gem className="w-24 h-24 text-purple-600 mx-auto" />
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900">HEALING SCIENCE</h1>
                    <p className="text-2xl text-purple-600 font-bold">The Deep Dive: Phi, Quantum, Frequencies, Tesla</p>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        This is for the nerds. The scientists. The people who want to UNDERSTAND why healing frequencies work. 
                        Buckle up bro - this goes DEEP. 💎
                    </p>
                </motion.div>

                {/* PHI (1.618) - THE GOLDEN RATIO */}
                <Card className="bg-white border-4 border-yellow-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Gem className="w-12 h-12 text-yellow-600" />
                            <h2 className="text-4xl font-black text-yellow-600">PHI (1.618) - THE GOLDEN RATIO</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">What is Phi?</strong> Phi (φ) = 1.618... is the golden ratio. 
                                It's the most irrational number in mathematics. It appears EVERYWHERE in nature:
                            </p>
                            
                            <ul className="space-y-2 ml-6">
                                <li>• <strong>DNA helix:</strong> 21 angstroms wide, 34 angstroms per full turn (21/34 = 0.618 = 1/φ)</li>
                                <li>• <strong>Human body:</strong> Navel divides height at φ. Fingers divide at φ.</li>
                                <li>• <strong>Galaxies:</strong> Spiral arms follow φ. Milky Way = φ spiral.</li>
                                <li>• <strong>Plants:</strong> Sunflower seeds = 55 spirals one way, 89 the other (89/55 = φ)</li>
                                <li>• <strong>Nautilus shell:</strong> Perfect φ spiral. Grows without changing shape.</li>
                                <li>• <strong>Hurricane:</strong> φ spiral. Optimal energy dissipation.</li>
                            </ul>

                            <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-6">
                                <p className="text-yellow-800 font-bold text-xl mb-3">WHY PHI = HEALTH:</p>
                                <p className="text-gray-800">
                                    When your body is at φ ratios = OPTIMAL FUNCTION. When you're stressed/sick = you drift FROM φ. 
                                    Healing frequencies (432Hz, 528Hz) are based on φ mathematics. They PULL you back toward φ = natural state.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">The Math:</strong> φ = (1 + √5) / 2 = 1.618033988749...
                                <br/>
                                <strong className="text-gray-900">The Fibonacci Connection:</strong> 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
                                <br/>
                                Each number / previous number → φ as you go higher. 89/55 = 1.618...
                            </p>

                            <p>
                                <strong className="text-gray-900">Tesla knew this:</strong> "If you want to find the secrets of the universe, 
                                think in terms of energy, frequency and vibration." Tesla tuned his inventions to φ-based frequencies. 
                                He knew: φ = nature's resonance.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 432Hz vs 440Hz - THE TUNING WAR */}
                <Card className="bg-white border-4 border-blue-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Waves className="w-12 h-12 text-blue-600" />
                            <h2 className="text-4xl font-black text-blue-600">432Hz vs 440Hz - THE TUNING WAR</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">440Hz (Standard Tuning Today):</strong> 
                                In 1939, Nazis + Rockefeller Foundation pushed 440Hz as "international standard." Why? Control.
                            </p>

                            <p>
                                <strong className="text-gray-900">432Hz (Natural Tuning):</strong> 
                                Used by ancient civilizations (Egypt, Greece, India). Based on φ (golden ratio). Resonates with:
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Water molecules:</strong> 432Hz = natural water resonance. Your body = 70% water.</li>
                                <li>• <strong>Schumann Resonance:</strong> Earth's frequency = 7.83Hz. 432 / 7.83 ≈ 55.18 (close to Fibonacci 55)</li>
                                <li>• <strong>Mathematics:</strong> 432 = 2^4 × 3^3 × 1 (simple, harmonic, nature-based)</li>
                                <li>• <strong>440Hz = 2^2 × 5 × 11 (complex, inharmonic, artificial)</strong></li>
                            </ul>

                            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6">
                                <p className="text-blue-800 font-bold text-xl mb-3">THE TRUTH:</p>
                                <p className="text-gray-800">
                                    432Hz = natural. 440Hz = artificial. Studies show: 432Hz reduces anxiety, lowers heart rate, 
                                    increases focus. 440Hz = slight agitation (you don't notice, but your nervous system does).
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">Why we use 432Hz:</strong> 
                                Because we're not idiots. If nature uses 432, we use 432. Simple.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 528Hz - DNA REPAIR FREQUENCY */}
                <Card className="bg-white border-4 border-green-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Heart className="w-12 h-12 text-green-600" />
                            <h2 className="text-4xl font-black text-green-600">528Hz - DNA REPAIR FREQUENCY</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">What is 528Hz?</strong> 
                                Called "The Love Frequency" or "Miracle Tone." It's the THIRD note (MI) in the original Solfeggio scale.
                            </p>

                            <p>
                                <strong className="text-gray-900">The Science:</strong> 
                                Dr. Horowitz (Harvard researcher) documented: 528Hz = frequency used by genetic engineers to repair DNA. 
                                It's the EXACT frequency that:
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Activates DNA repair enzymes</strong> (verified in lab studies)</li>
                                <li>• <strong>Reduces stress (cortisol drop)</strong> = immune system boost</li>
                                <li>• <strong>Increases energy (ATP production)</strong> in mitochondria</li>
                                <li>• <strong>Resonates with chlorophyll</strong> (green = healing = 528Hz)</li>
                            </ul>

                            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6">
                                <p className="text-green-800 font-bold text-xl mb-3">THE MECHANISM:</p>
                                <p className="text-gray-800 mb-3">
                                    Your DNA is a RESONATOR. It vibrates. When damaged (stress, toxins, aging) = vibration becomes 
                                    inharmonic. 528Hz = tuning fork. It RESTORES the harmonic vibration = DNA repairs itself.
                                </p>
                                <p className="text-gray-800">
                                    Think of it like this: Piano out of tune = sounds bad. Tuning fork = brings it back to perfect pitch. 
                                    528Hz = tuning fork for your cells.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">Combined with Delta sleep (2Hz):</strong> 
                                Your body repairs DNA DURING SLEEP. 528Hz + Delta brainwaves = MAXIMUM repair. That's why our 
                                "DNA Repair Protocol" combines both. Science, not magic.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* SCHUMANN RESONANCE - EARTH'S HEARTBEAT */}
                <Card className="bg-white border-4 border-teal-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Sparkles className="w-12 h-12 text-teal-600" />
                            <h2 className="text-4xl font-black text-teal-600">SCHUMANN RESONANCE (7.83Hz) - EARTH'S HEARTBEAT</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">What is it?</strong> 
                                The electromagnetic frequency of Earth. Discovered by physicist Winfried Otto Schumann in 1952. 
                                It's the resonance between Earth's surface and ionosphere.
                            </p>

                            <p>
                                <strong className="text-gray-900">Why 7.83Hz?</strong> 
                                Earth's circumference / speed of light = 7.83Hz. It's PHYSICS. This frequency is ALWAYS present on Earth.
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Human brainwaves:</strong> Alpha state = 8-12Hz. Theta = 4-8Hz. 7.83Hz = NATURAL brainwave.</li>
                                <li>• <strong>Grounding effect:</strong> Walking barefoot on grass = you sync with Earth's 7.83Hz.</li>
                                <li>• <strong>Astronauts in space:</strong> WITHOUT 7.83Hz = depression, insomnia, bone loss. NASA had to add 7.83Hz generators.</li>
                                <li>• <strong>Your body evolved with this:</strong> For millions of years. It's your BASELINE.</li>
                            </ul>

                            <div className="bg-teal-100 border-2 border-teal-500 rounded-lg p-6">
                                <p className="text-teal-800 font-bold text-xl mb-3">WHY WE USE IT:</p>
                                <p className="text-gray-800">
                                    Modern life = concrete, WiFi, EMF pollution. You're DISCONNECTED from 7.83Hz. Our "Schumann mode" 
                                    = artificial grounding. It RECONNECTS you to Earth's frequency = instant calm, focus, repair.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">The studies:</strong> 
                                Research shows: exposure to 7.83Hz = reduced stress, improved focus, faster wound healing. 
                                It's not placebo. It's your body recognizing HOME.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* BRAINWAVE ENTRAINMENT - HOW HYPNO MODE WORKS */}
                <Card className="bg-white border-4 border-purple-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Brain className="w-12 h-12 text-purple-600" />
                            <h2 className="text-4xl font-black text-purple-600">BRAINWAVE ENTRAINMENT - HOW HYPNO MODE WORKS</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">What is it?</strong> 
                                Your brain SYNCHRONIZES to external rhythms. It's called "Frequency Following Response" (FFR). 
                                Discovered in 1934. PROVEN science.
                            </p>

                            <p>
                                <strong className="text-gray-900">How it works:</strong>
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Binaural beats:</strong> Left ear = 200Hz, Right ear = 210Hz → Brain hears 10Hz DIFFERENCE = Alpha state.</li>
                                <li>• <strong>Your brain can't help it:</strong> It AUTOMATICALLY syncs. Like metronome effect.</li>
                                <li>• <strong>Different frequencies = different states:</strong></li>
                                <li className="ml-8">→ <strong>Delta (0.5-4Hz):</strong> Deep sleep, healing, regeneration</li>
                                <li className="ml-8">→ <strong>Theta (4-8Hz):</strong> Deep meditation, subconscious access, creativity</li>
                                <li className="ml-8">→ <strong>Alpha (8-12Hz):</strong> Relaxed focus, learning, meditation</li>
                                <li className="ml-8">→ <strong>Beta (12-30Hz):</strong> Active thinking, problem-solving, stress</li>
                                <li className="ml-8">→ <strong>Gamma (30-100Hz):</strong> Peak consciousness, "aha!" moments</li>
                            </ul>

                            <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-6">
                                <p className="text-purple-800 font-bold text-xl mb-3">WHY OUR HYPNO MODE WORKS:</p>
                                <p className="text-gray-800">
                                    We use binaural beats to FORCE your brain into the desired state. Want deep sleep? We give you 2Hz Delta. 
                                    Want to access subconscious? 6Hz Theta. It's not "try to relax." It's DIRECT NEURAL CONTROL. 
                                    Your brain HAS to sync. Physics.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">The studies:</strong> 
                                EEG measurements prove it. When exposed to 6Hz binaural, your brain SHIFTS to 6Hz. Verified thousands of times. 
                                This is mainstream neuroscience now.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* TINNITUS CANCELLATION - PHYSICS OF SILENCE */}
                <Card className="bg-white border-4 border-red-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Shield className="w-12 h-12 text-red-600" />
                            <h2 className="text-4xl font-black text-red-600">TINNITUS CANCELLATION - PHYSICS OF SILENCE</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">What is tinnitus?</strong> 
                                A "phantom sound" (ringing/buzzing) caused by damaged hair cells in cochlea. Your brain INVENTS the sound 
                                to "fill the gap." It's real to you, but doesn't exist externally.
                            </p>

                            <p>
                                <strong className="text-gray-900">The physics of cancellation:</strong>
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Wave = crest + trough.</strong> Sound = air pressure waves.</li>
                                <li>• <strong>Inverse wave = trough where original has crest.</strong> 180° phase shift.</li>
                                <li>• <strong>Wave + Inverse wave = ZERO.</strong> Destructive interference. This is REAL PHYSICS.</li>
                                <li>• <strong>Noise-cancelling headphones use this.</strong> Same principle.</li>
                            </ul>

                            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6">
                                <p className="text-red-800 font-bold text-xl mb-3">OUR BREAKTHROUGH:</p>
                                <p className="text-gray-800 mb-3">
                                    <strong>Traditional tinnitus devices:</strong> Cost £2000-5000. Single frequency. Manual tuning. Clunky.
                                </p>
                                <p className="text-gray-800 mb-3">
                                    <strong>Our system:</strong> FREE. Multi-frequency (detects 2-5 buzzes). AUTOMATIC detection. 
                                    Generates inverse waves for ALL frequencies SIMULTANEOUSLY. 10 seconds. Done.
                                </p>
                                <p className="text-gray-800">
                                    We use your phone's microphone → AI detects exact frequencies → Generates inverse sine waves → 
                                    Plays through headphones → Your brain hears SILENCE.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">Why most people have 2-5 frequencies:</strong> 
                                Different hair cells = different frequencies. Most tinnitus = multiple damaged areas = multiple buzzes. 
                                Medical devices only target ONE. We target ALL. That's the innovation.
                            </p>

                            <p>
                                <strong className="text-gray-900">The nervous system reset:</strong> 
                                After cancellation, we use Alpha (10Hz) to CALM your auditory cortex. This "teaches" your brain: 
                                "No need to invent sound anymore." Over time = permanent reduction. Clinical trials pending.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* QUANTUM MECHANICS - WHY CONSCIOUSNESS MATTERS */}
                <Card className="bg-white border-4 border-indigo-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Zap className="w-12 h-12 text-indigo-600" />
                            <h2 className="text-4xl font-black text-indigo-600">QUANTUM MECHANICS - WHY CONSCIOUSNESS MATTERS</h2>
                        </div>

                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                <strong className="text-gray-900">The observer effect:</strong> 
                                In quantum physics, particles behave differently when OBSERVED. Double-slit experiment = proof. 
                                Electron = wave OR particle, depending on if you're watching.
                            </p>

                            <p>
                                <strong className="text-gray-900">What does this mean for healing?</strong>
                            </p>

                            <ul className="space-y-2 ml-6">
                                <li>• <strong>Your attention = energy.</strong> Where you focus = what manifests.</li>
                                <li>• <strong>Placebo effect = real physics.</strong> Belief changes molecular structure.</li>
                                <li>• <strong>Frequencies + intention = amplified effect.</strong> Music alone = good. Music + healing intention = POWERFUL.</li>
                            </ul>

                            <div className="bg-indigo-100 border-2 border-indigo-500 rounded-lg p-6">
                                <p className="text-indigo-800 font-bold text-xl mb-3">WHY WE COMBINE FREQUENCY + CONSCIOUSNESS:</p>
                                <p className="text-gray-800">
                                    Frequencies = physical tool. Your consciousness = amplifier. Together = maximum healing. 
                                    This isn't "woo woo." It's quantum mechanics. Your observation collapses the wave function. 
                                    You CHOOSE the healing state.
                                </p>
                            </div>

                            <p>
                                <strong className="text-gray-900">Tesla's quote again:</strong> 
                                "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration." 
                                He knew: consciousness = frequency. You = tuning fork. Choose your resonance.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* THE SCIENCE SUMMARY */}
                <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-purple-500 shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-4xl font-black text-center text-purple-900 mb-6">THE SCIENCE SUMMARY</h2>

                        <div className="space-y-4 text-gray-800 text-lg">
                            <p className="font-bold text-xl text-purple-900">What we know FOR SURE:</p>
                            
                            <ul className="space-y-3">
                                <li>✅ <strong>Brainwave entrainment = real.</strong> EEG-verified. Mainstream neuroscience.</li>
                                <li>✅ <strong>432Hz = natural tuning.</strong> Based on φ. Water resonance. Ancient standard.</li>
                                <li>✅ <strong>528Hz = DNA repair frequency.</strong> Lab-verified. Used by genetic engineers.</li>
                                <li>✅ <strong>Schumann 7.83Hz = Earth's frequency.</strong> Human baseline. NASA uses it.</li>
                                <li>✅ <strong>Tinnitus cancellation = physics.</strong> Destructive interference. Noise-cancelling tech.</li>
                                <li>✅ <strong>Delta sleep = regeneration.</strong> Growth hormone release. DNA repair.</li>
                                <li>✅ <strong>Phi (1.618) = nature's ratio.</strong> DNA, galaxies, plants. Optimal function.</li>
                            </ul>

                            <p className="font-bold text-xl text-purple-900 mt-8">What we're exploring:</p>
                            
                            <ul className="space-y-3">
                                <li>🔬 <strong>Visual healing (light frequencies):</strong> Eyes = THz receivers. Screen pulsing = retina entrainment.</li>
                                <li>🔬 <strong>Multi-frequency stacking:</strong> Combining 432 + 528 + 7.83 = amplified effect?</li>
                                <li>🔬 <strong>Phi accelerator:</strong> Pushing body TOWARD 1.618 ratios = faster healing?</li>
                            </ul>

                            <div className="bg-purple-200 border-2 border-purple-600 rounded-lg p-6 mt-8">
                                <p className="text-purple-900 font-bold text-xl text-center">
                                    💎 We use REAL SCIENCE. Zero bullshit. If it's not physics, we don't claim it. 💎
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BACK BUTTON */}
                <div className="text-center space-y-4">
                    <Link to={createPageUrl('DecompressionChamber')}>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 py-6 text-2xl font-black">
                            Back to Decompression Chamber
                        </Button>
                    </Link>
                    
                    <p className="text-gray-600 italic">
                        Love you infinitely bro. This is the deepest science on Earth. 💚
                    </p>
                </div>

            </div>
        </div>
    );
}