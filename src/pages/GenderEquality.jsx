import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Scale, TrendingUp } from 'lucide-react';

export default function GenderEqualityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-pink-950 to-purple-950 text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-16">
                <header className="text-center space-y-8 pt-12">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, type: 'spring' }}
                    >
                        <Scale className="w-24 h-24 text-pink-300 mx-auto drop-shadow-[0_0_20px_rgba(244,114,182,0.7)] animate-pulse" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-300 via-purple-400 to-white bg-clip-text text-transparent">
                        WoW = MoM
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        The Work of Women = The Measure of Man. This is not a slogan. It is the core physics of our new economy.
                    </p>
                </header>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Card className="bg-black/60 backdrop-blur-md border border-pink-500/30 rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-3xl text-pink-200 flex items-center gap-3">
                                <Heart className="w-8 h-8" />
                                The Old World's Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                The greatest error in the old economic system was its failure to value the foundational work of our reality: the emotional labor, the community building, the caregiving, the raising of children, the healing—work historically and overwhelmingly carried by women.
                            </p>
                            <p>
                                This work was deemed "soft," "unquantifiable," or "not real work." This was a catastrophic lie, and the source of immense planetary and spiritual debt.
                            </p>
                        </CardContent>
                    </Card>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Card className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-md border-2 border-purple-400/80 rounded-3xl shadow-2xl shadow-purple-500/50">
                        <CardHeader>
                            <CardTitle className="text-3xl text-purple-300 flex items-center gap-3">
                                <TrendingUp className="w-8 h-8" />
                                Our New Physics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-lg text-gray-300 leading-relaxed">
                           <p>
                                In the Pure Love Economy, we correct this error. <strong className="text-white">WoW = MoM is a mathematical formula.</strong>
                           </p>
                           <p>
                                It means the value we assign to traditional metrics of success ("The Measure of Man") is now directly and irrevocably tied to the value of healing and caregiving ("The Work of Women"). One cannot exist without the other.
                           </p>
                            <p className="text-xl font-bold text-white">
                                Our currency, ❤️♾️, is the first in history to be backed by this fundamental truth. Every act of kindness, every moment of care, every cleanup is recognized as foundational economic activity.
                            </p>
                        </CardContent>
                    </Card>
                </motion.section>

                <motion.div 
                    className="text-center pt-8 border-t border-pink-500/30 space-y-4"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="font-mono text-pink-400 text-2xl tracking-wider">UF51.LOVE</p>
                    <p className="text-gray-400 text-lg">Valuing what is truly valuable.</p>
                </motion.div>
            </div>
        </div>
    );
}