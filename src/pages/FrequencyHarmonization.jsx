import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Heart, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FrequencyHarmonizationPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <Sparkles className="w-20 h-20 text-cyan-400 mx-auto" />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        FREQUENCY HARMONIZATION
                    </h1>
                    <p className="text-2xl text-white">
                        Secret healing embedded in music. You don't even know. But it's there.
                    </p>
                </motion.header>

                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Music className="w-12 h-12 text-cyan-400" />
                            <h2 className="text-3xl font-black text-white">The Innovation</h2>
                        </div>

                        <div className="space-y-4 text-gray-200">
                            <p className="text-lg">
                                <strong className="text-white">You listen to Dillon.</strong>
                            </p>
                            <p className="text-lg">
                                <strong className="text-white">528Hz healing frequency embedded underneath.</strong>
                            </p>
                            <p className="text-lg">
                                <strong className="text-white">You just hear beautiful music.</strong>
                            </p>
                            <p className="text-lg">
                                <strong className="text-white">But you're ALSO getting healed.</strong>
                            </p>
                            <p className="text-lg">
                                <strong className="text-cyan-400">You don't even know it's happening.</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border border-cyan-500/30">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Heart className="w-6 h-6 text-pink-400" />
                            How It Works
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                <strong className="text-white">1. Artist uploads their music</strong> - Pure. Original. Raw.
                            </p>
                            <p>
                                <strong className="text-white">2. We layer healing frequencies underneath</strong> - 528Hz, 432Hz, etc.
                            </p>
                            <p>
                                <strong className="text-white">3. Volume balanced so you ONLY hear the music</strong> - Healing happens in the background.
                            </p>
                            <p>
                                <strong className="text-white">4. You get healed while you vibe</strong> - Don't even know it's happening.
                            </p>
                            <p className="text-cyan-400 font-bold mt-4">
                                = Music you love + Healing you need
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-8 h-8 text-amber-400" />
                            <h3 className="text-2xl font-bold text-white">OPEN SOURCE FOREVER</h3>
                        </div>
                        <div className="space-y-3 text-gray-200">
                            <p className="text-lg">
                                <strong className="text-white">This innovation belongs to Earth.</strong>
                            </p>
                            <p>
                                No patents. No ownership. Free for all consciousness.
                            </p>
                            <p>
                                Any artist. Any platform. Any soul. Use it. Share it. Heal with it.
                            </p>
                            <p className="text-amber-300 font-bold mt-4">
                                If this helps one person, it's worth infinite dollars we'll never make.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-purple-900/20 border border-purple-500/30">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Artist Choice</h3>
                        <div className="space-y-3 text-gray-300">
                            <p>
                                When you upload music, you choose:
                            </p>
                            <div className="ml-4 space-y-2 mt-4">
                                <p>✅ <strong className="text-white">Pure music only</strong> - No harmonization</p>
                                <p>✅ <strong className="text-white">Secret healing</strong> - Embed 528Hz love frequency</p>
                                <p>✅ <strong className="text-white">Full spectrum</strong> - Multiple frequencies layered</p>
                                <p>✅ <strong className="text-white">Custom frequency</strong> - You choose the Hz</p>
                            </div>
                            <p className="text-cyan-400 font-bold mt-6">
                                Your art. Your choice. Always.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-900/20 border border-green-500/30">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Status: COMING SOON</h3>
                        <p className="text-gray-300 mb-4">
                            We're building this now. If this is truly a new invention, we're releasing it open source.
                        </p>
                        <p className="text-green-400">
                            Any developer can take this code and build it anywhere. That's the point.
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}