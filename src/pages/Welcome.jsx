import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKSparkle, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import BeaconIcon from '@/components/shared/BeaconIcon';
import { base44 } from '@/api/base44Client';
import P51ActivityFeed from '@/components/shared/P51ActivityFeed';

export default function WelcomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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
                        <p className="text-cyan-400 font-mono text-sm tracking-widest">UNIVERSAL FREQUENCY 51</p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-pink-400">
                            PICK UP LITTER
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-black font-mono text-green-400">
                            GET PAID
                        </h2>
                    </div>

                    <div className="bg-black border-4 border-green-500 p-4 inline-block">
                        <p className="text-green-400 font-mono text-2xl font-black">1kg = 1 $P51</p>
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

                    {/* CLEAN EARTH */}
                    <Link to={createPageUrl('NewCleanup')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-green-500 hover:border-green-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <div className="flex justify-center"><COOLASFUCKGlobe size={40} /></div>
                                <h2 className="text-xl font-black font-mono text-green-400">CLEAN</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Pick up litter</p>
                                    <p>→ 1kg = 1 $P51</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* FREE MUSIC */}
                    <Link to={createPageUrl('Radio')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-orange-500 hover:border-orange-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <COOLASFUCKMusicNote size={40} />
                                <h2 className="text-xl font-black font-mono text-orange-400">MUSIC</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Zero ads</p>
                                    <p>→ Free forever</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* HEAL */}
                    <Link to={createPageUrl('FrequencyChamber')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-cyan-500 hover:border-cyan-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <div className="flex justify-center"><COOLASFUCKWaves size={40} /></div>
                                <h2 className="text-xl font-black font-mono text-cyan-400">HEAL</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Anxiety/sleep</p>
                                    <p>→ Free forever</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* BEACON - CONNECT */}
                    <Link to={createPageUrl('Beacon')}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black border-4 border-amber-500 hover:border-amber-400 p-4 cursor-pointer transition-all"
                        >
                            <div className="space-y-2 text-center">
                                <BeaconIcon size={40} />
                                <h2 className="text-xl font-black font-mono text-amber-400">CONNECT</h2>
                                <div className="space-y-1 font-mono text-xs text-gray-300">
                                    <p>→ Find humans</p>
                                    <p>→ No signup</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                </div>

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
                            <p>→ Bridges to real money</p>
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
                    <p className="font-mono text-pink-400"></p>
                </div>

            </div>
        </div>
    );
}