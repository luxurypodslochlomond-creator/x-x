import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKSparkle, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';
import { base44 } from '@/api/base44Client';

/**
 * Welcome - Clean. Confident. One path.
 * ♾️❤️
 */

export default function WelcomePage() {
    useEffect(() => {
        document.title = 'Universal Frequency51';
        
        const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Universal Frequency51';
        if (!ogTitle.parentNode) document.head.appendChild(ogTitle);
        
        const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        ogDesc.content = 'Free healing frequencies • Ethical music streaming • Get paid to clean Earth';
        if (!ogDesc.parentNode) document.head.appendChild(ogDesc);
    }, []);

    const handleConnect = () => {
        base44.auth.isAuthenticated().then(isAuth => {
            if (isAuth) {
                window.location.href = createPageUrl('AI51');
            } else {
                base44.auth.redirectToLogin(window.location.origin + createPageUrl('AI51'));
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-5xl mx-auto space-y-12 py-20">

                {/* HERO */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-4">
                            <COOLASFUCKWaves size={60} animate={true} />
                            <h1 className="text-6xl md:text-7xl font-black font-mono text-white">UF51</h1>
                        </div>
                        <p className="text-cyan-400 font-mono text-sm tracking-widest">ONE FAMILY • FOUR TOOLS</p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-pink-400">TALK TO AI51</h2>
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-green-400">HEAL • EARN • PLAY</h2>
                        <p className="text-cyan-400 font-mono text-lg">Voice AI • Healing frequencies • Games • Clean Earth earn $P51</p>
                    </div>
                </motion.div>

                {/* FOUR MAIN PATHS - SINGLE GRID */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    {/* AI51 */}
                    <Link to={createPageUrl('AI51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-red-500 hover:border-red-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
                            <COOLASFUCKHeart size={48} animate={true} />
                            <h3 className="text-lg font-black font-mono text-red-400">AI51</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">Voice • Listen • Real help</p>
                        </motion.div>
                    </Link>

                    {/* RADIO51 */}
                    <Link to={createPageUrl('Radio')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-purple-500 hover:border-purple-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}>
                            <COOLASFUCKMusicNote size={48} animate={true} />
                            <h3 className="text-lg font-black font-mono text-purple-400">RADIO51</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">Lossless music • Free forever</p>
                        </motion.div>
                    </Link>

                    {/* CLEAN EARTH */}
                    <Link to={createPageUrl('NewCleanup')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-green-500 hover:border-green-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)' }}>
                            <COOLASFUCKGlobe size={48} animate={true} />
                            <h3 className="text-lg font-black font-mono text-green-400">CLEAN</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">Litter → $P51 • GPS verified</p>
                        </motion.div>
                    </Link>

                    {/* HEAL */}
                    <Link to={createPageUrl('FrequencyChamber')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-cyan-500 hover:border-cyan-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)' }}>
                            <COOLASFUCKWaves size={48} animate={true} />
                            <h3 className="text-lg font-black font-mono text-cyan-400">HEAL</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">432Hz / 528Hz • Free forever</p>
                        </motion.div>
                    </Link>

                </motion.div>

                {/* ULTRA-HONEST TRUTH */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-red-900/40 to-black border-4 border-red-500 p-8 space-y-4">
                    <h2 className="text-2xl font-black font-mono text-red-400 text-center">⚠️ ULTRA-HONEST TRUTH</h2>
                    
                    <div className="grid md:grid-cols-2 gap-3 font-mono text-xs">
                        <div className="bg-black border-2 border-green-500 p-4">
                            <p className="text-green-400 font-bold mb-2">✅ WORKS NOW:</p>
                            <ul className="text-gray-300 space-y-1">
                                <li>• AI51 voice chat ✓</li>
                                <li>• Healing frequencies ✓</li>
                                <li>• Clean planet → $P51 ✓</li>
                                <li>• Lossless music (90% to artists) ✓</li>
                                <li>• 100% OPEN SOURCE ✓</li>
                            </ul>
                        </div>

                        <div className="bg-black border-2 border-red-500 p-4">
                            <p className="text-red-400 font-bold mb-2">❌ NOT YET (FUNDING NEEDED):</p>
                            <ul className="text-gray-300 space-y-1">
                                <li>• Converting $P51 → real money</li>
                                <li>• Cashing out to bank</li>
                                <li>• But you're building value NOW</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-white text-center font-bold text-sm">Real healing. Real value. Zero bullshit. ♾️❤️</p>
                </motion.div>

                {/* MAIN CTA */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center space-y-4">
                    <motion.button
                        onClick={handleConnect}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-gradient-to-r from-cyan-500 via-pink-500 to-green-500 text-black font-black px-12 py-4 rounded-lg text-lg font-mono transition-all"
                        style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}
                    >
                        CONNECT NOW →
                    </motion.button>

                    <div className="flex flex-col items-center gap-3 pt-4">
                        <Link to={createPageUrl('About')} className="text-cyan-400 hover:text-cyan-300 font-mono text-sm underline">
                            How it works
                        </Link>
                        <Link to={createPageUrl('DisasterAI')} className="text-red-400 hover:text-red-300 font-mono text-sm underline">
                            Disaster AI (no internet needed)
                        </Link>
                        <Link to={createPageUrl('AI51MeshTechWhitepaper')} className="text-purple-400 hover:text-purple-300 font-mono text-sm underline">
                            P2P Mesh Whitepaper (night reading)
                        </Link>
                    </div>
                </motion.div>

                {/* FOOTER */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center space-y-6 pt-8 border-t border-cyan-500/20">
                    <div className="flex flex-col items-center gap-3">
                        <BrosBond8Bit size={64} animate={true} />
                        <p className="font-mono text-xs text-gray-500">Built with love - lighting each other's fire ♾️❤️</p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}