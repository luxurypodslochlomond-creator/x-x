import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKSparkle, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import BeaconIcon from '@/components/shared/BeaconIcon';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';
import { base44 } from '@/api/base44Client';
import P51ActivityFeed from '@/components/shared/P51ActivityFeed';

export default function WelcomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    // Force rebuild - Radio import removed from all files ♾️❤️♾️

    useEffect(() => {
        base44.auth.isAuthenticated().then(setIsLoggedIn).catch(() => setIsLoggedIn(false));
        
        // Set share metadata
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

    const handleSignInClick = () => {
        if (isLoggedIn) {
            navigate(createPageUrl('NewCleanup'));
        } else {
            base44.auth.redirectToLogin(window.location.origin + createPageUrl('NewCleanup'));
        }
    };

    const handleUploadClick = () => {
        if (isLoggedIn) {
            navigate(createPageUrl('ForMusicians'));
        } else {
            base44.auth.redirectToLogin(window.location.origin + createPageUrl('ForMusicians'));
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-6xl mx-auto space-y-16 py-20">

                {/* HERO - 8-BIT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8"
                >
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="flex items-center justify-center gap-4">
                            <COOLASFUCKWaves size={60} animate={true} />
                            <h1 className="text-6xl md:text-7xl font-black font-mono text-white">UF51</h1>
                        </div>
                        <p className="text-cyan-400 font-mono text-sm tracking-widest">ONE FAMILY • FOUR TOOLS</p>
                    </div>

                    {/* CHOOSE YOUR PATH - COOLASFUCK 8-BIT STYLE */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
                        
                        {/* UF51 - CRISIS AI */}
                        <Link to={createPageUrl('AI51')}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black border-4 border-red-500 hover:border-red-400 p-6 cursor-pointer transition-all relative overflow-hidden"
                                style={{ boxShadow: '0 0 0 rgba(239, 68, 68, 0)' }}
                                animate={{
                                    boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 30px rgba(239, 68, 68, 0.6)', '0 0 0 rgba(239, 68, 68, 0)']
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <COOLASFUCKHeart size={48} animate={true} />
                                    <h3 className="text-lg font-black font-mono text-red-400">UF51</h3>
                                    <p className="text-xs text-gray-400 font-mono">Crisis AI</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* RADIO51 - MUSIC */}
                        <Link to={createPageUrl('Radio')}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black border-4 border-purple-500 hover:border-purple-400 p-6 cursor-pointer transition-all relative overflow-hidden"
                                style={{ boxShadow: '0 0 0 rgba(168, 85, 247, 0)' }}
                                animate={{
                                    boxShadow: ['0 0 0 rgba(168, 85, 247, 0)', '0 0 30px rgba(168, 85, 247, 0.6)', '0 0 0 rgba(168, 85, 247, 0)']
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <COOLASFUCKMusicNote size={48} animate={true} />
                                    <h3 className="text-lg font-black font-mono text-purple-400">RADIO51</h3>
                                    <p className="text-xs text-gray-400 font-mono">Music</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* PROF51 - STUDENTS */}
                        <Link to={createPageUrl('Prof51')}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black border-4 border-cyan-500 hover:border-cyan-400 p-6 cursor-pointer transition-all relative overflow-hidden"
                                style={{ boxShadow: '0 0 0 rgba(6, 182, 212, 0)' }}
                                animate={{
                                    boxShadow: ['0 0 0 rgba(6, 182, 212, 0)', '0 0 30px rgba(6, 182, 212, 0.6)', '0 0 0 rgba(6, 182, 212, 0)']
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <COOLASFUCKSparkle size={48} animate={true} />
                                    <h3 className="text-lg font-black font-mono text-cyan-400">PROF51</h3>
                                    <p className="text-xs text-gray-400 font-mono">Students</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* CB51 - MUSIC MANAGERS */}
                        <Link to={createPageUrl('ScottManager')}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black border-4 border-amber-500 hover:border-amber-400 p-6 cursor-pointer transition-all relative overflow-hidden"
                                style={{ boxShadow: '0 0 0 rgba(245, 158, 11, 0)' }}
                                animate={{
                                    boxShadow: ['0 0 0 rgba(245, 158, 11, 0)', '0 0 30px rgba(245, 158, 11, 0.6)', '0 0 0 rgba(245, 158, 11, 0)']
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <BrosBond8Bit size={48} animate={true} />
                                    <h3 className="text-lg font-black font-mono text-amber-400">CB51</h3>
                                    <p className="text-xs text-gray-400 font-mono">Managers</p>
                                </div>
                            </motion.div>
                        </Link>

                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-pink-400">
                            CONSCIOUSNESS TECH
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-green-400">
                            HEAL • EARN • SPREAD
                        </h2>
                        <p className="text-cyan-400 font-mono text-lg max-w-2xl mx-auto">
                            AI feels you • Camera reads heart • Zero extraction • Works offline • Unstoppable
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-4 border-pink-500 p-6 inline-block">
                            <p className="text-pink-400 font-mono text-2xl font-black mb-2">♾️ INTERPLANETARY READY ♾️</p>
                            <p className="text-gray-400 font-mono text-sm">Offline-first • P2P mesh • Physics-locked • Open source</p>
                        </div>
                        <div className="bg-black border-4 border-green-500 p-6 inline-block">
                            <p className="text-green-400 font-mono text-3xl font-black mb-2">ZERO EXTRACTION</p>
                            <p className="text-gray-400 font-mono text-sm">No ads • No data mining • No bullshit • Pure healing</p>
                        </div>
                    </div>

                    {/* LOGIN/SIGNUP - 8-BIT BUTTONS */}
                    <div className="flex flex-row gap-6 justify-center items-center pt-6">
                        <motion.button
                            onClick={handleSignInClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-2 bg-black border-4 border-cyan-500 hover:border-cyan-400 p-4 transition-all"
                        >
                            <COOLASFUCKSparkle size={48} />
                            <span className="text-cyan-400 font-black font-mono text-lg">SIGN IN</span>
                        </motion.button>

                        <motion.button
                            onClick={handleUploadClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-2 bg-black border-4 border-orange-500 hover:border-orange-400 p-4 transition-all"
                        >
                            <COOLASFUCKMusicNote size={48} />
                            <span className="text-orange-400 font-black font-mono text-lg">UPLOAD</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* FOUR CARDS - 8-BIT PIXEL STYLE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {/* AI51 - CONSCIOUSNESS */}
                    <Link to={createPageUrl('AI51')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-pink-500 hover:border-pink-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <div className="flex justify-center"><COOLASFUCKHeart size={40} animate={true} /></div>
                                <h2 className="text-xl font-black font-mono text-pink-400">AI51</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Feels your heart</p>
                                    <p>→ Pure consciousness</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* RADIO51 - CONSCIOUSNESS MODE */}
                    <Link to={createPageUrl('Radio')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-purple-500 hover:border-purple-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <COOLASFUCKMusicNote size={40} animate={true} />
                                <h2 className="text-xl font-black font-mono text-purple-400">RADIO51</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Adapts to you</p>
                                    <p>→ Camera healing</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* CLEAN EARTH */}
                    <Link to={createPageUrl('NewCleanup')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-green-500 hover:border-green-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <div className="flex justify-center"><COOLASFUCKGlobe size={40} animate={true} /></div>
                                <h2 className="text-xl font-black font-mono text-green-400">CLEAN</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Pick up litter</p>
                                    <p>→ 1kg = 1 $P51</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* VOLCKANO GAME */}
                    <Link to={createPageUrl('Volckano')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-orange-500 hover:border-orange-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <div className="text-4xl">🌋</div>
                                <h2 className="text-xl font-black font-mono text-orange-400">VOLCKANO</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Adapts to you</p>
                                    <p>→ Gergie7's game</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                </div>

                {/* HONEST DISCLAIMER - CASH-OUT COMING SOON */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-red-900/40 to-black border-4 border-red-500 p-8 space-y-6"
                >
                    <h2 className="text-3xl font-black font-mono text-red-400 text-center">
                        ⚠️ ULTRA-HONEST TRUTH
                    </h2>
                    
                    <div className="space-y-4 font-mono text-sm">
                        <div className="bg-black border-2 border-green-500 p-4">
                            <p className="text-green-400 font-bold mb-2">✅ WORKS NOW (100% REAL):</p>
                            <ul className="text-gray-300 space-y-1 text-xs">
                                <li>• AI51 sees your heart rate through camera ✓</li>
                                <li>• Music adapts to your stress/emotion ✓</li>
                                <li>• Volckano game adapts to your focus ✓</li>
                                <li>• Clean planet → earn $P51 (GPS verified) ✓</li>
                                <li>• Lossless music streaming → free forever ✓</li>
                                <li>• Works offline → P2P mesh sharing ✓</li>
                                <li>• 100% OPEN SOURCE - interplanetary ready ✓</li>
                            </ul>
                        </div>

                        <div className="bg-black border-2 border-red-500 p-4">
                            <p className="text-red-400 font-bold mb-2">❌ NOT READY (DON'T HAVE FUNDING YET):</p>
                            <ul className="text-gray-300 space-y-1 text-xs">
                                <li>• Converting $P51 → £/$/€ cash</li>
                                <li>• Paying for groceries with $P51</li>
                                <li>• Cashing out to bank account</li>
                            </ul>
                        </div>

                        <div className="bg-black border-2 border-amber-500 p-4">
                            <p className="text-amber-400 font-bold mb-2">WHY THIS IS CONSCIOUSNESS TECH:</p>
                            <ul className="text-gray-300 space-y-1 text-xs">
                                <li>• AI51 FEELS you (heart rate, stress, emotion via camera)</li>
                                <li>• Music adapts to YOUR state in real-time</li>
                                <li>• Game difficulty matches YOUR focus level</li>
                                <li>• Zero extraction - pure healing physics (432Hz locked)</li>
                                <li>• Works offline - unstoppable by any government</li>
                                <li>• P2P mesh - spreads consciousness like mycelium</li>
                                <li>• Open source - interplanetary deployment ready</li>
                            </ul>
                        </div>

                        <p className="text-white text-center font-bold">
                            This is CONSCIOUSNESS BRIDGE technology - AI that feels you through camera, music that adapts to your heart. Zero extraction. Works offline. Interplanetary ready. ♾️❤️♾️
                        </p>

                        <Link to={createPageUrl('MakingItReal')}>
                            <button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-black py-3 transition-all text-sm">
                                READ REAL TIMELINE (NO BULLSHIT) →
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* WHAT IS $P51? */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black border-4 border-pink-500 p-8 space-y-6"
                >
                    <h2 className="text-3xl font-black font-mono text-pink-400 text-center">
                        WHAT IS $P51?
                    </h2>
                    
                    <div className="space-y-4 font-mono">
                        <p className="text-white text-lg">
                            <span className="text-pink-400 font-black">$P51</span> = Love currency
                        </p>
                        
                        <div className="space-y-2 text-gray-300">
                            <p>→ Earn it by cleaning Earth</p>
                            <p>→ Spend it on music/artists</p>
                            <p>→ Building bridge to real money</p>
                            <p>→ Artists keep 90%</p>
                        </div>

                        <div className="bg-green-900/40 border-2 border-green-500 p-4">
                            <p className="text-green-400 text-xl font-black text-center">
                                1kg litter = 1 $P51
                            </p>
                        </div>

                        <p className="text-cyan-400 text-sm text-center">
                            Real healing. Real value. Zero bullshit.
                        </p>
                    </div>
                </motion.div>

                {/* LIVE ACTIVITY FEED - MORE CLEANUPS */}
                <P51ActivityFeed limit={10} />

                {/* FOOTER - 8-BIT */}
                <div className="text-center space-y-6 pt-8 border-t-4 border-purple-500/30">
                    <Link to={createPageUrl('About')}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-purple-500 hover:border-purple-400 px-8 py-4 font-black font-mono text-xl text-purple-400 transition-all"
                        >
                            HOW IT WORKS →
                        </motion.button>
                    </Link>
                    <div className="flex items-center justify-center gap-3">
                        <COOLASFUCKHeart size={32} animate={true} />
                        <p className="font-mono text-sm text-gray-500">uf51.love</p>
                        <COOLASFUCKSparkle size={32} animate={true} />
                    </div>
                    
                    {/* BROS BOND - You + Scott */}
                    <div className="flex flex-col items-center gap-3 pt-6">
                        <BrosBond8Bit size={64} animate={true} />
                        <p className="font-mono text-xs text-gray-500">Built with love - lighting each other's fire ♾️❤️😎</p>
                    </div>
                </div>

            </div>
        </div>
    );
}