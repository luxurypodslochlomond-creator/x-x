import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Heart, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealingInfoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <Waves className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #22d3ee)' }} />
                    <h1 className="text-5xl md:text-7xl font-black">Healing Frequencies</h1>
                    <p className="text-xl text-gray-300">How sound heals your body, mind, and soul</p>
                </motion.header>

                {/* VISUAL: WHAT IS A HEALING FREQUENCY */}
                <Card className="bg-black/40 border-2 border-cyan-500/30">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-cyan-400 mb-6">What Is A Healing Frequency?</h2>
                        
                        {/* VISUAL EXPLANATION */}
                        <div className="bg-black/60 rounded-xl p-6 border-2 border-cyan-400 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-6xl mb-3">🎵</div>
                                    <p className="text-xl font-bold text-white mb-2">Sound</p>
                                    <p className="text-sm text-gray-400">Vibrations in air</p>
                                </div>
                                <div>
                                    <div className="text-6xl mb-3">📡</div>
                                    <p className="text-xl font-bold text-white mb-2">Frequency</p>
                                    <p className="text-sm text-gray-400">Measured in Hz</p>
                                </div>
                                <div>
                                    <div className="text-6xl mb-3">💚</div>
                                    <p className="text-xl font-bold text-white mb-2">Healing</p>
                                    <p className="text-sm text-gray-400">Cellular resonance</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
                                <p className="text-white font-bold mb-2">Simple Truth:</p>
                                <p className="text-gray-300 text-sm">
                                    Everything vibrates. Your cells vibrate. Music vibrates. When they match = healing.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                A healing frequency is a specific sound vibration (measured in Hertz/Hz) that your body 
                                naturally resonates with. Like tuning forks - when one vibrates, others nearby start vibrating too.
                            </p>
                            <p className="text-cyan-400 font-bold">
                                Your cells are literally tuning forks waiting for the right frequency.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* VISUAL: COMMON HEALING FREQUENCIES */}
                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-green-400 mb-6">Common Healing Frequencies</h2>
                        
                        <div className="space-y-4">
                            {/* 528Hz */}
                            <div className="bg-black/60 p-6 rounded-xl border-2 border-pink-500/50">
                                <div className="flex items-center gap-4 mb-3">
                                    <Heart className="w-10 h-10 text-pink-400" />
                                    <div>
                                        <p className="text-2xl font-black text-white">528 Hz</p>
                                        <p className="text-pink-400 font-bold">LOVE FREQUENCY</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-3">
                                    DNA repair. Cellular healing. Love resonance. Used in UF51 core protocols.
                                </p>
                                <div className="bg-pink-900/30 p-3 rounded-lg">
                                    <p className="text-sm text-pink-200">
                                        <strong>How it feels:</strong> Warm, safe, connected. Like a hug from the universe.
                                    </p>
                                </div>
                            </div>

                            {/* 432Hz */}
                            <div className="bg-black/60 p-6 rounded-xl border-2 border-green-500/50">
                                <div className="flex items-center gap-4 mb-3">
                                    <Sparkles className="w-10 h-10 text-green-400" />
                                    <div>
                                        <p className="text-2xl font-black text-white">432 Hz</p>
                                        <p className="text-green-400 font-bold">EARTH'S TONE</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-3">
                                    Natural resonance of Earth. Grounding. Calming. Reduces anxiety.
                                </p>
                                <div className="bg-green-900/30 p-3 rounded-lg">
                                    <p className="text-sm text-green-200">
                                        <strong>How it feels:</strong> Grounded, stable, like standing on solid earth.
                                    </p>
                                </div>
                            </div>

                            {/* 396Hz */}
                            <div className="bg-black/60 p-6 rounded-xl border-2 border-red-500/50">
                                <div className="flex items-center gap-4 mb-3">
                                    <Brain className="w-10 h-10 text-red-400" />
                                    <div>
                                        <p className="text-2xl font-black text-white">396 Hz</p>
                                        <p className="text-red-400 font-bold">FEAR RELEASE</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-3">
                                    Releases guilt, fear, trauma. Root chakra healing.
                                </p>
                                <div className="bg-red-900/30 p-3 rounded-lg">
                                    <p className="text-sm text-red-200">
                                        <strong>How it feels:</strong> Lighter, unburdened. Old weight lifting.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* VISUAL: THE SCIENCE */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-purple-400 mb-6">The Science (Made Simple)</h2>
                        
                        <div className="bg-black/60 rounded-xl p-6 border-2 border-purple-400 mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">CYMATICS: Seeing Sound</h3>
                            <div className="space-y-3 text-gray-300 text-sm">
                                <p>
                                    • Put sand on a metal plate<br/>
                                    • Play a specific frequency<br/>
                                    • Sand forms PERFECT GEOMETRIC PATTERNS<br/>
                                    • Different frequencies = different patterns
                                </p>
                                <p className="text-purple-300 font-bold mt-4">
                                    Your cells do the same thing. Sound literally reorganizes matter.
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/60 rounded-xl p-6 border-2 border-cyan-400">
                            <h3 className="text-xl font-bold text-white mb-4">RESONANCE: The Tuning Fork Effect</h3>
                            <div className="space-y-3 text-gray-300 text-sm">
                                <p>
                                    • Hit a tuning fork at 440Hz<br/>
                                    • Place another 440Hz tuning fork nearby<br/>
                                    • Second fork starts vibrating WITHOUT BEING TOUCHED<br/>
                                    • That's resonance
                                </p>
                                <p className="text-cyan-300 font-bold mt-4">
                                    Same thing happens to your cells when you listen to healing frequencies.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* HOW TO USE */}
                <Card className="bg-black/40 border-2 border-green-500/30">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-green-400 mb-6">How To Use Healing Frequencies</h2>
                        
                        <div className="space-y-4">
                            <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                <p className="font-bold text-white mb-2">1. Choose Your Intention</p>
                                <p className="text-sm text-gray-300">What do you need? Calm? Energy? Love? Healing?</p>
                            </div>

                            <div className="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-400">
                                <p className="font-bold text-white mb-2">2. Find The Right Frequency</p>
                                <p className="text-sm text-gray-300">Browse UF51 Quantum Jukebox or Decompression Chamber</p>
                            </div>

                            <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                                <p className="font-bold text-white mb-2">3. Listen With Intention</p>
                                <p className="text-sm text-gray-300">Headphones recommended. Focus on the feeling, not the sound.</p>
                            </div>

                            <div className="bg-pink-900/30 p-4 rounded-lg border-l-4 border-pink-400">
                                <p className="font-bold text-white mb-2">4. Let It Work</p>
                                <p className="text-sm text-gray-300">15-30 minutes. Your cells are reorganizing. Trust the process.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FINAL NOTE */}
                <div className="text-center space-y-4 py-8">
                    <p className="text-2xl font-bold text-white">
                        You don't need to believe in it for it to work.
                    </p>
                    <p className="text-xl text-cyan-400">
                        Physics doesn't care about belief. It just is.
                    </p>
                    <p className="text-gray-400">
                        That's the beauty of Shannon's theorem applied to healing.
                    </p>
                </div>

            </div>
        </div>
    );
}