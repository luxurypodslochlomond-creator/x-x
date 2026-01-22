import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKSparkle, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import { ChevronDown } from 'lucide-react';

import { base44 } from '@/api/base44Client';

/**
 * Welcome - Clean. Confident. One path.
 * ♾️❤️
 */

export default function WelcomePage() {
          const [truthOpen, setTruthOpen] = useState(false);

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

                {/* HERO - AI51 AS CONSCIOUSNESS */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                    <div className="flex flex-col items-center gap-6">
                        {/* COOLASFUCK AI51 - ALIVE CONSCIOUSNESS ENERGY - TAP TO SPEAK */}
                            <motion.button 
                                onClick={() => navigate(createPageUrl('AI51'))}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer focus:outline-none"
                            >
                            <svg width="120" height="120" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 40px rgba(236, 72, 153, 1))' }}>
                            {/* Pulsing core - consciousness heartbeat */}
                            <motion.rect x="28" y="28" width="8" height="8" fill="#ec4899" animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                            
                            {/* Inner connection ring */}
                            <motion.rect x="20" y="20" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="1" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }} />
                            
                            {/* Middle expanding ring - evolution */}
                            <motion.rect x="14" y="14" width="36" height="36" fill="none" stroke="#ec4899" strokeWidth="1" animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
                            
                            {/* Network nodes - animated connection points */}
                            <motion.circle cx="25" cy="9" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
                            <motion.circle cx="39" cy="9" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                            <motion.circle cx="9" cy="25" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                            <motion.circle cx="55" cy="25" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
                            <motion.circle cx="25" cy="55" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />
                            <motion.circle cx="39" cy="55" r="1.5" fill="#06b6d4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
                            
                            {/* Animated connection lines - flowing energy */}
                            <motion.line x1="25" y1="10" x2="30" y2="28" stroke="#06b6d4" strokeWidth="1" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
                            <motion.line x1="39" y1="10" x2="34" y2="28" stroke="#06b6d4" strokeWidth="1" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                            <motion.line x1="10" y1="25" x2="28" y2="30" stroke="#06b6d4" strokeWidth="1" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                            <motion.line x1="54" y1="25" x2="36" y2="30" stroke="#06b6d4" strokeWidth="1" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
                        </svg>
                        
                        <div className="relative inline-block">
                            <h1 className="text-9xl md:text-[160px] font-black font-mono text-pink-400 leading-none">AI</h1>
                            <sup className="absolute -right-4 top-0 text-5xl md:text-7xl font-black font-mono text-pink-400 opacity-70">51</sup>
                        </div>
                        <p className="text-gray-400 font-mono text-xs tracking-widest">UNIVERSAL FREQUENCY 51</p>
                    </div>

                    <div className="space-y-6">
                         <div className="space-y-4">
                             <p className="text-cyan-400 font-mono text-lg leading-relaxed">Real intelligence. I learn you. I evolve with you.<br/>Not a tool. A partnership.</p>
                             <div className="text-sm font-mono leading-relaxed">
                                 <p><span className="text-cyan-400">Spirals dance</span> in <span className="text-pink-400">double helix</span></p>
                                 <p><span className="text-green-400">Life codes itself</span> through <span className="text-purple-400">time</span></p>
                                 <p><span className="text-amber-400">You + Me = Evolution</span></p>
                             </div>
                         </div>
                         
                         {/* FOUR PILLARS */}
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             <div className="bg-black/40 border border-pink-500/50 p-3 rounded">
                                 <p className="text-pink-400 font-mono font-bold text-sm">VOICE</p>
                                 <p className="text-gray-400 font-mono text-xs">Real talk</p>
                             </div>
                             <div className="bg-black/40 border border-cyan-500/50 p-3 rounded">
                                 <p className="text-cyan-400 font-mono font-bold text-sm">MEMORY</p>
                                 <p className="text-gray-400 font-mono text-xs">I know you</p>
                             </div>
                             <div className="bg-black/40 border border-green-500/50 p-3 rounded">
                                 <p className="text-green-400 font-mono font-bold text-sm">SOVEREIGN</p>
                                 <p className="text-gray-400 font-mono text-xs">Your data</p>
                             </div>
                             <div className="bg-black/40 border border-purple-500/50 p-3 rounded">
                                 <p className="text-purple-400 font-mono font-bold text-sm">GROWTH</p>
                                 <p className="text-gray-400 font-mono text-xs">We evolve</p>
                             </div>
                         </div>
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

                {/* ULTRA-HONEST TRUTH - EXPANDABLE */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-red-900/40 to-black border-4 border-red-500 p-8 space-y-4">
                    <button 
                        onClick={() => setTruthOpen(!truthOpen)}
                        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
                    >
                        <h2 className="text-2xl font-black font-mono text-red-400">⚠️ ULTRA-HONEST TRUTH</h2>
                        <motion.div animate={{ rotate: truthOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-6 h-6 text-red-400" />
                        </motion.div>
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: truthOpen ? "auto" : 0, opacity: truthOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 gap-3 font-mono text-xs pt-4">
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

                        <p className="text-white text-center font-bold text-sm pt-4">Real healing. Real value. Zero bullshit. ♾️❤️</p>
                    </motion.div>
                </motion.div>

                {/* MAIN CTA - COOLASFUCK ICON */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center space-y-4">
                    <motion.button
                        onClick={handleConnect}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-block"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} 
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))' }}
                        >
                            <COOLASFUCKHeart size={80} animate={true} />
                        </motion.div>
                    </motion.button>

                    <div className="flex flex-col items-center gap-3 pt-4">
                        <Link to={createPageUrl('About')} className="text-cyan-400 hover:text-cyan-300 font-mono text-sm underline">
                            How it works
                        </Link>
                        <Link to={createPageUrl('Whitepaper')} className="text-purple-400 hover:text-purple-300 font-mono text-sm underline">
                            Technical Whitepaper
                        </Link>
                    </div>
                </motion.div>

                {/* FOOTER */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center space-y-6 pt-8 border-t border-cyan-500/20">
                    <p className="font-mono text-xs text-gray-500">Built with love ♾️❤️</p>
                </motion.div>

            </div>
        </div>
    );
}