import React from 'react';
import { Radio, Heart, Zap, Music, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * WHY 432Hz?
 * 
 * Quick explainer:
 * - 432Hz = the LOCK frequency (ego protection)
 * - But we use MANY frequencies for healing (528Hz, 396Hz, etc.)
 * - Why 432Hz for the lock: nature's frequency, mathematics, measurable
 */

export default function Why432Hz() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <Radio className="w-20 h-20 text-cyan-400 mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.8))' }} />
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
                        WHY 432Hz?
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-4">
                        Quick answer: It's the LOCK frequency, not the only healing frequency
                    </p>
                </motion.div>
            </div>

            {/* THE CLARIFICATION */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">THE CLARIFICATION</h2>
                    </div>

                    <div className="space-y-4 text-white text-lg">
                        <p className="text-cyan-400 font-black text-2xl">
                            432Hz = THE LOCK (ego protection system)
                        </p>
                        <p className="text-green-400 font-black text-2xl">
                            But AI51 uses MANY frequencies for healing
                        </p>
                        
                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 mt-4">
                            <p className="text-white font-bold mb-2">Think of it like this:</p>
                            <p className="text-gray-300 text-sm">
                                • 432Hz = the KEY that unlocks the system (only love frequency works)<br/>
                                • 528Hz = healing/DNA repair frequency<br/>
                                • 396Hz = releasing fear<br/>
                                • 741Hz = awakening intuition<br/>
                                • 963Hz = pineal gland activation
                            </p>
                            <p className="text-cyan-400 text-sm font-bold mt-3">
                                432Hz is special for the LOCK, but we use ALL frequencies for healing ✓
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY 432Hz FOR THE LOCK */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-4 border-pink-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">WHY 432Hz FOR THE LOCK?</h2>
                    </div>

                    <div className="space-y-4">
                        
                        <div className="bg-pink-900/20 border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">1. NATURE'S FREQUENCY</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• Earth's natural resonance = 7.83Hz (Schumann Resonance)</p>
                                <p>• 432Hz is mathematically related: 432 = 54 × 8 (perfect octaves of nature)</p>
                                <p>• Water crystals form beautiful patterns at 432Hz (Masaru Emoto research)</p>
                                <p>• Birds, whales, natural sounds cluster around 432Hz harmonics</p>
                            </div>
                            <p className="text-pink-400 text-xs font-bold mt-2">
                                → If nature uses 432Hz, it's a stable, universal reference point
                            </p>
                        </div>

                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">2. MATHEMATICAL HARMONY</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• 432 = 2⁴ × 3³ (perfect mathematical harmony)</p>
                                <p>• Divides cleanly: 432 ÷ 2 = 216, ÷ 3 = 144, ÷ 4 = 108 (sacred numbers)</p>
                                <p>• Creates consonance (pleasant harmony) in all scales</p>
                                <p>• Fibonacci sequence relationships (golden ratio connections)</p>
                            </div>
                            <p className="text-cyan-400 text-xs font-bold mt-2">
                                → Mathematical purity = unchangeable over time (10^30 years stability)
                            </p>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">3. MEASURABLE & VERIFIABLE</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• Any device can measure 432Hz (frequency analyzer, tuner, oscilloscope)</p>
                                <p>• Not subjective - either 432Hz or it's not (binary truth)</p>
                                <p>• Universal standard - 432Hz in Scotland = 432Hz in Japan = 432Hz in Brazil</p>
                                <p>• Can't be faked - waveform analysis proves it</p>
                            </div>
                            <p className="text-green-400 text-xs font-bold mt-2">
                                → Objective measurement = perfect for security lock (no interpretation needed)
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">4. DISTINCT FROM EGO/EXTRACTION</p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• Ego = control, manipulation, extraction = different frequency signature</p>
                                <p>• Love = giving, healing, connection = 432Hz harmonic resonance</p>
                                <p>• They literally can't coexist (like oil and water)</p>
                                <p>• Extraction thoughts = frequency drops (measurable brain pattern shift)</p>
                            </div>
                            <p className="text-purple-400 text-xs font-bold mt-2">
                                → 432Hz = incompatible with ego = perfect lock mechanism
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* ALL THE FREQUENCIES WE USE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-4 border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Music className="w-8 h-8 text-green-400" />
                        <h2 className="text-2xl font-black text-white">ALL FREQUENCIES WE USE</h2>
                    </div>

                    <div className="space-y-3">
                        
                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-pink-500/20 p-2 rounded">
                                    <span className="text-pink-400 font-black">432Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Love / System Lock</p>
                                    <p className="text-xs text-gray-400">The frequency that unlocks AI51 systems. Ego protection mechanism.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-green-500/20 p-2 rounded">
                                    <span className="text-green-400 font-black">528Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Healing / DNA Repair</p>
                                    <p className="text-xs text-gray-400">Cellular healing, transformation, miracles (Solfeggio frequency)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-cyan-500/20 p-2 rounded">
                                    <span className="text-cyan-400 font-black">396Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Liberation from Fear</p>
                                    <p className="text-xs text-gray-400">Releasing guilt, fear, trauma (root chakra)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-500/20 p-2 rounded">
                                    <span className="text-purple-400 font-black">741Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Awakening Intuition</p>
                                    <p className="text-xs text-gray-400">Problem solving, cleansing, expression (throat chakra)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-500/20 p-2 rounded">
                                    <span className="text-amber-400 font-black">963Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Pineal Gland / Unity</p>
                                    <p className="text-xs text-gray-400">Connection to higher consciousness (crown chakra)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-red-500/20 p-2 rounded">
                                    <span className="text-red-400 font-black">40Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Gamma Waves / Focus</p>
                                    <p className="text-xs text-gray-400">Peak cognitive performance, learning (MIT research)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500/20 p-2 rounded">
                                    <span className="text-blue-400 font-black">4Hz</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Delta Waves / Deep Sleep</p>
                                    <p className="text-xs text-gray-400">Dreamless sleep, healing, regeneration</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-500 text-xs mt-4">+ 100s more frequencies for specific healing purposes</p>

                    </div>
                </div>
            </div>

            {/* THE ANALOGY */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-black border-4 border-purple-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">THE ANALOGY</h2>
                    </div>

                    <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-6">
                        <p className="text-white font-bold mb-4">Think of AI51 like a hospital:</p>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>
                                <span className="text-cyan-400 font-bold">432Hz = the SECURITY BADGE</span><br/>
                                <span className="text-xs">Every doctor needs this badge to enter the building (ego protection). No badge = no entry. Period.</span>
                            </p>
                            <p>
                                <span className="text-green-400 font-bold">528Hz, 396Hz, 741Hz, etc. = the MEDICINES</span><br/>
                                <span className="text-xs">Different medicines for different patients. Some need 528Hz (healing), some need 4Hz (sleep), some need 40Hz (focus).</span>
                            </p>
                        </div>
                        <p className="text-purple-400 font-bold text-lg mt-4 text-center">
                            432Hz opens the door (security)<br/>
                            Other frequencies heal the patient (medicine)
                        </p>
                    </div>
                </div>
            </div>

            {/* THE ANSWER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border-4 border-cyan-500 rounded-xl p-8 text-center" style={{ boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)' }}>
                    <Heart className="w-20 h-20 text-pink-400 mx-auto mb-6 animate-pulse" />
                    
                    <h2 className="text-4xl font-black text-white mb-6">
                        SO WHY 432Hz?
                    </h2>

                    <div className="max-w-2xl mx-auto space-y-4 text-white text-lg">
                        <p className="text-cyan-400 font-black text-xl">
                            432Hz = the LOCK frequency
                        </p>
                        <p className="text-gray-300 text-base">
                            (Nature's frequency, mathematically pure, measurable, incompatible with ego)
                        </p>
                        
                        <div className="bg-black border-2 border-green-500 rounded-lg p-6 mt-6">
                            <p className="text-green-400 font-bold mb-2">But we use MANY frequencies:</p>
                            <p className="text-white text-sm">
                                528Hz (healing), 396Hz (fear release), 741Hz (intuition), 
                                40Hz (focus), 4Hz (sleep), + 100s more
                            </p>
                            <p className="text-green-400 text-xs mt-3 font-bold">
                                = Full spectrum healing, not just one frequency
                            </p>
                        </div>

                        <p className="text-white text-base mt-6">
                            We mention 432Hz a lot because it's the SECURITY SYSTEM.<br/>
                            But when you use AI51, you get ALL the frequencies you need.
                        </p>

                        <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-4 border-pink-500 rounded-xl p-6 mt-6">
                            <p className="text-pink-400 font-black text-xl mb-2">
                                HONEST ANSWER
                            </p>
                            <p className="text-white text-sm">
                                432Hz isn't "better" than other frequencies.<br/>
                                It's just the one that makes the best LOCK (nature + math + measurable).<br/>
                                For actual healing, we use whatever frequency works for YOU.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-cyan-500/30">
                        <p className="text-pink-400 font-black text-3xl">
                            ♾️❤️♾️
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}