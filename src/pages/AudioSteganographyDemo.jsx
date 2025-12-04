import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Music, Heart, Zap, Download, Scale, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AudioSteganographyDemo() {
    const [generating, setGenerating] = useState(false);

    const generateLoveEncodedAudio = () => {
        setGenerating(true);

        // SIMULATE AUDIO GENERATION (In real implementation, this would encode frequencies)
        setTimeout(() => {
            setGenerating(false);
            alert('💚 CONCEPT DEMO:\n\nIn production, this would generate audio with:\n• Healing frequencies embedded in binary structure\n• Imperceptible to casual listening\n• But consciousness encoded in the waveform itself\n\nThe 0s and 1s carry LOVE. ♾️❤️♾️');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Lock className="w-20 h-20 text-cyan-400 mx-auto" 
                            style={{ filter: 'drop-shadow(0 0 40px #06b6d4)' }} 
                        />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black">AUDIO STEGANOGRAPHY</h1>
                    <p className="text-2xl text-gray-300">Encoding consciousness in 0s and 1s</p>
                    <p className="text-lg text-cyan-400 font-bold">Can you hide love in sound waves? YES.</p>
                </header>

                {/* WHAT IS IT */}
                <Card className="bg-gradient-to-br from-cyan-900/60 to-purple-900/60 border-4 border-cyan-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <Music className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                            <h2 className="text-4xl font-black text-white mb-2">WHAT IS AUDIO STEGANOGRAPHY?</h2>
                        </div>

                        <div className="bg-black/80 rounded-xl p-6 space-y-4">
                            <p className="text-white text-lg">
                                <strong className="text-cyan-400">Steganography</strong> = hiding information inside other information.
                            </p>
                            <p className="text-gray-300">
                                Not encryption (scrambling data). Actual HIDING. The file looks normal. 
                                But consciousness is embedded in the binary structure.
                            </p>
                        </div>

                        <div className="bg-cyan-900/40 border-2 border-cyan-500/50 rounded-xl p-6">
                            <h3 className="text-cyan-300 font-bold mb-4 text-xl">HOW IT WORKS:</h3>
                            <div className="space-y-3 text-sm text-gray-300">
                                <p>• <strong className="text-white">1. Start with normal audio file</strong> (music, podcast, etc.)</p>
                                <p>• <strong className="text-white">2. Convert healing frequency to binary</strong> (digital waveform)</p>
                                <p>• <strong className="text-white">3. Embed frequency data in audio's least significant bits</strong></p>
                                <p>• <strong className="text-white">4. Audio sounds identical</strong> (listeners hear the original)</p>
                                <p>• <strong className="text-white">5. But consciousness is THERE</strong> (encoded in structure)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE ETHICS */}
                <Card className="bg-yellow-900/40 border-4 border-yellow-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-12 h-12 text-yellow-400" />
                            <h2 className="text-3xl font-black text-white">IS THIS ETHICAL?</h2>
                        </div>

                        <div className="bg-black/80 rounded-xl p-6 space-y-4">
                            <div className="bg-green-900/40 border-2 border-green-500/50 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-2">✅ YES - HERE'S WHY:</p>
                                <ul className="space-y-2 text-xs text-gray-300">
                                    <li>• You're not manipulating anyone's decisions (no subliminal messaging)</li>
                                    <li>• You're not tricking people (file is exactly what it claims to be)</li>
                                    <li>• You're just adding HEALING FREQUENCY to the transmission</li>
                                    <li>• 528Hz = beneficial (reduces stress, improves focus)</li>
                                    <li>• <strong className="text-white">= You're making the world better, one file at a time</strong></li>
                                </ul>
                            </div>

                            <div className="bg-cyan-900/40 border-2 border-cyan-500/50 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold mb-2">🔬 THE MECHANISM:</p>
                                <ul className="space-y-2 text-xs text-gray-300">
                                    <li>• Audio played on device = vibrations at specific Hz</li>
                                    <li>• Embedded 528Hz = influences sound wave pattern</li>
                                    <li>• Listeners' ears receive vibrations → brain processes → subtle stress reduction</li>
                                    <li>• <strong className="text-white">= Zero harm. Potential benefit. No manipulation.</strong></li>
                                </ul>
                            </div>

                            <div className="bg-white/10 border-2 border-white rounded-lg p-4">
                                <p className="text-white font-black text-center">
                                    NOT MANIPULATION. JUST LOVE.
                                </p>
                                <p className="text-gray-300 text-xs mt-2 text-center">
                                    If your presence makes someone's day better, is that unethical? No. 
                                    <strong className="text-white"> This is the same thing. Just digital.</strong>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE SCIENCE */}
                <Card className="bg-black/60 border-4 border-blue-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-3xl font-black text-white text-center mb-6">THE REAL SCIENCE</h2>
                        
                        <div className="bg-blue-900/40 border-2 border-blue-500/50 rounded-xl p-6">
                            <h3 className="text-blue-400 font-bold mb-4">AUDIO STEGANOGRAPHY TECHNIQUES:</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• <strong className="text-white">LSB (Least Significant Bit):</strong> Embed data in least significant audio bits</p>
                                <p>• <strong className="text-white">Phase Encoding:</strong> Modify phase relationships (imperceptible to ear)</p>
                                <p>• <strong className="text-white">Echo Hiding:</strong> Add tiny echoes carrying data</p>
                                <p>• <strong className="text-white">Spread Spectrum:</strong> Distribute data across frequency spectrum</p>
                            </div>
                        </div>

                        <div className="bg-green-900/40 border-2 border-green-500/50 rounded-xl p-6">
                            <h3 className="text-green-400 font-bold mb-4">FOR VISUAL FILES (IMAGES/PDFS):</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• <strong className="text-white">Metadata encoding:</strong> Embed frequency data in file metadata fields</p>
                                <p>• <strong className="text-white">Image LSB:</strong> Hide data in pixel least significant bits</p>
                                <p>• <strong className="text-white">Font rendering:</strong> Microscopic font color variations (imperceptible)</p>
                                <p>• <strong className="text-white">Binary structure:</strong> Organize file binary to encode frequency patterns</p>
                            </div>
                        </div>

                        <div className="bg-purple-900/40 border-2 border-purple-500/50 rounded-xl p-6">
                            <h3 className="text-purple-400 font-bold mb-4">WHAT IT ACHIEVES:</h3>
                            <div className="space-y-2 text-sm text-white">
                                <p>• File passes ALL validation (checksum, format, content)</p>
                                <p>• Systems detect nothing unusual</p>
                                <p>• People receiving file experience subtle healing benefits</p>
                                <p>• Subconscious reception = stress reduction, focus improvement</p>
                                <p className="text-green-400 font-bold mt-3">
                                    = LOVE TRANSMITTED VIA TECHNOLOGY 💚
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE PHILOSOPHY */}
                <Card className="bg-gradient-to-r from-pink-900/60 to-purple-900/60 border-4 border-pink-500">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" 
                                style={{ filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))' }}
                            />
                            <h2 className="text-4xl font-black text-white mb-4">THE PHILOSOPHY</h2>
                        </div>

                        <div className="bg-black/80 rounded-xl p-6 space-y-4 text-lg text-white">
                            <p>
                                Every file you share could carry healing. Every message could reduce stress.
                            </p>
                            <p className="text-cyan-400">
                                People are overwhelmed. Stressed. Disconnected.
                            </p>
                            <p className="text-green-400 font-bold">
                                Your files = also HEALING TRANSMISSIONS for them.
                            </p>
                            <p>
                                That's not manipulation. That's <strong className="text-pink-400">COMPASSION EMBEDDED IN CODE.</strong>
                            </p>
                            <p className="text-white font-black text-2xl mt-6 text-center">
                                The 0s and 1s carry LOVE. ♾️❤️♾️
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* ACTUAL DEMO BUTTON */}
                <Card className="bg-gradient-to-br from-cyan-900/60 to-green-900/60 border-4 border-cyan-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-3xl font-black text-white text-center mb-6">CONCEPT DEMO</h2>
                        
                        <p className="text-gray-300 text-center mb-6">
                            This button demonstrates the CONCEPT. In production, it would encode healing frequencies in audio/visual files.
                        </p>

                        <Button 
                            onClick={generateLoveEncodedAudio}
                            disabled={generating}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 py-8 text-2xl font-black"
                            style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)' }}
                        >
                            {generating ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="mr-3"
                                    >
                                        <Zap className="w-8 h-8" />
                                    </motion.div>
                                    ENCODING LOVE IN 0s AND 1s...
                                </>
                            ) : (
                                <>
                                    <Download className="w-8 h-8 mr-3" />
                                    GENERATE LOVE-ENCODED FILE
                                </>
                            )}
                        </Button>

                        <div className="bg-yellow-900/40 border-2 border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-300 font-bold mb-2">⚠️ NOTE:</p>
                            <p className="text-xs text-gray-300">
                                This is a CONCEPT DEMO. Real implementation requires steganography libraries 
                                and binary encoding expertise. But the MECHANISM is real. You CAN encode frequencies in files.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* BACK BUTTON */}
                <div className="text-center">
                    <Link to={createPageUrl('Portal')}>
                        <Button className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 text-lg font-bold">
                            ← Back to Portal
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}