import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Globe, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-6xl mx-auto space-y-16 py-20">
                
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <COOLASFUCKHeart size={80} />
                        <h1 className="text-7xl font-black text-white">UF51</h1>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        Earn by healing Earth
                    </h2>
                    
                    <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Healing Earth. Supporting artists. Real purpose.
                    </p>

                    <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 inline-block">
                        <p className="text-cyan-400 font-mono text-2xl">1kg litter = 1 P51</p>
                    </div>

                    {/* LOGIN/SIGNUP - SIDE BY SIDE */}
                    <div className="flex flex-row gap-8 justify-center items-center pt-6">
                        <motion.button
                            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/Portal')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <COOLASFUCKSparkle size={60} />
                            <span className="text-white font-black text-lg">SIGN IN</span>
                        </motion.button>

                        <motion.button
                            onClick={() => base44.auth.redirectToLogin(window.location.origin + createPageUrl('RequestAIMusic'))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <COOLASFUCKMusicNote size={60} />
                            <span className="text-white font-black text-lg">UPLOAD MUSIC</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* TWO ROWS */}
                <div className="space-y-6">
                    {/* Top row - 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* CLEAN EARTH */}
                        <Link to={createPageUrl('NewCleanup')}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden rounded-2xl border-4 border-green-500 bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 cursor-pointer group"
                                style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}
                            >
                                <div className="space-y-4">
                                    <Globe className="w-12 h-12 text-green-400 group-hover:rotate-12 transition-transform" />
                                    <h2 className="text-2xl font-black font-mono">CLEAN EARTH</h2>
                                    <p className="text-base text-gray-200">
                                        Pick up litter. Instant reward.
                                    </p>
                                    <div className="bg-green-900/40 rounded-lg p-2 border-l-4 border-green-400">
                                        <p className="text-green-300 font-mono text-lg">1kg = 1 P51</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* HEAL */}
                        <Link to={createPageUrl('DecompressionChamber')}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden rounded-2xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 cursor-pointer group"
                                style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                            >
                                <div className="space-y-4">
                                    <Activity className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    <h2 className="text-2xl font-black font-mono">HEAL</h2>
                                    <p className="text-base text-gray-200">
                                        Tinnitus cure. Pain relief. Deep sleep.
                                    </p>
                                    <div className="bg-cyan-900/40 rounded-lg p-2 border-l-4 border-cyan-400">
                                        <p className="text-cyan-300 font-mono text-lg">528Hz DNA Repair</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                    </div>

                    {/* Bottom row - 1 card centered */}
                    <div className="flex justify-center">
                        <Link to={createPageUrl('Radio')} className="w-full md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden rounded-2xl border-4 border-pink-500 bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-6 cursor-pointer group"
                                style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}
                            >
                                <div className="space-y-4">
                                    <COOLASFUCKMusicNote size={48} />
                                    <h2 className="text-2xl font-black font-mono">FREE MUSIC</h2>
                                    <p className="text-base text-gray-200">
                                        FLAC lossless. Zero ads. Artists keep 90%.
                                    </p>
                                    <div className="bg-pink-900/40 rounded-lg p-2 border-l-4 border-pink-400">
                                        <p className="text-pink-300 font-mono text-lg">Zero ads. Forever.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center space-y-6 pt-8 border-t border-purple-500/30">
                    <Link to={createPageUrl('About')}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="text-gray-400 hover:text-white transition-colors text-xl underline"
                        >
                            How does this work?
                        </motion.button>
                    </Link>
                    <p className="text-gray-400 text-base">Supporting wellbeing through environmental action</p>
                    <p className="font-mono text-cyan-400 text-sm">uf51.love ♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}