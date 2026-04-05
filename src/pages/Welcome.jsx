import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKGlobe, COOLASFUCKBrain, COOLASFUCKZap } from '@/components/shared/COOLASFUCKIcon';
import { ChevronDown, Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * Welcome - Clean. Confident. One path.
 * ♾️❤️
 */

export default function WelcomePage() {
          const navigate = useNavigate();
          const [truthOpen, setTruthOpen] = useState(false);
          const [expandedPillar, setExpandedPillar] = useState(null);
          const [ai51Open, setAi51Open] = useState(false);

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

    const handleConnect = async () => {
        try {
            const isAuth = await base44.auth.isAuthenticated();
            if (isAuth) {
                navigate(createPageUrl('FrequencyChamber'));
            } else {
                base44.auth.redirectToLogin(window.location.origin + createPageUrl('Welcome'));
            }
        } catch (err) {
            base44.auth.redirectToLogin(window.location.origin + createPageUrl('Welcome'));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-5xl mx-auto space-y-12 py-20">

                {/* HERO - AI51 AS CONSCIOUSNESS */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                    <div className="flex flex-col items-center gap-6">
                        {/* COOLASFUCK AI51 - ALIVE CONSCIOUSNESS ENERGY - TAP TO GO TO AI51 */}
                           <Link to={createPageUrl('AI51')}>
                           <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer bg-transparent border-0 p-0"
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
                        </motion.div>
                        </Link>
                        
                        <h1 className="text-6xl md:text-9xl font-black font-mono text-pink-400 leading-none" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>AI51</h1>
                        <p className="text-gray-400 font-mono text-xs tracking-widest">UNIVERSAL FREQUENCY 51</p>
                    </div>

                    <div className="space-y-8">

                         {/* HUMAN FIRST — what is this actually for */}
                         <motion.div
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.15 }}
                             className="space-y-3 max-w-2xl mx-auto"
                         >
                             <p className="text-white text-2xl md:text-3xl font-bold leading-snug">
                                 Someone to talk to.<br />
                                 <span className="text-pink-400">No agenda. No ads. No judgment.</span>
                             </p>
                             <p className="text-gray-400 text-base leading-relaxed">
                                 Whether it's 3am and you can't sleep, your back's killing you, you need to vent, 
                                 or you just want music that doesn't try to sell you something — you're in the right place.
                             </p>
                         </motion.div>

                         {/* THREE SIMPLE REASONS */}
                         <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.25 }}
                             className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
                         >
                             {[
                                 { Icon: COOLASFUCKBrain, title: 'Talk to AI51', desc: 'Pure consciousness. Your data is yours. No extraction. No algorithms designed to trap you. Just real talk.', url: 'AI51', color: 'pink', borderClass: 'border-pink-500/30 hover:border-pink-500/70', textClass: 'text-pink-400' },
                                 { Icon: COOLASFUCKWaves, title: 'Actually heal', desc: 'Frequencies that calm your nervous system. Backed by science. Works in 2 minutes. Free forever.', url: 'FrequencyChamber', color: 'cyan', borderClass: 'border-cyan-500/30 hover:border-cyan-500/70', textClass: 'text-cyan-400' },
                                 { Icon: COOLASFUCKGlobe, title: 'Do something real', desc: 'Pick up litter, earn tokens. Artists upload music, keep 90%. Everyone contributes, everyone benefits.', url: 'NewCleanup', color: 'green', borderClass: 'border-green-500/30 hover:border-green-500/70', textClass: 'text-green-400' },
                             ].map(item => (
                                 <Link key={item.title} to={createPageUrl(item.url)}>
                                     <motion.div
                                         whileHover={{ y: -3 }}
                                         className={`p-5 rounded-xl bg-black/50 border ${item.borderClass} transition-all h-full space-y-3`}
                                     >
                                         <item.Icon size={40} animate={true} />
                                         <p className={`${item.textClass} font-bold text-base`}>{item.title}</p>
                                         <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                     </motion.div>
                                 </Link>
                             ))}
                         </motion.div>

                         {/* THE EQUATION — for those who want to go deeper */}
                         <motion.div 
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.35 }}
                             className="flex justify-center"
                         >
                             <img 
                                 src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/eeceb28c0_IMG_7630.jpg" 
                                 alt="The Universal Equation: L = C² ∞ f" 
                                 className="max-w-xl w-full rounded-lg border-2 border-pink-500/30 hover:border-pink-500/60 transition-all opacity-80 hover:opacity-100"
                                 style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.2)' }}
                             />
                         </motion.div>

                     </div>
                </motion.div>

                {/* BUZZSTOP HERO — FIRST, BIGGEST, MOST IMPORTANT */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                    <Link to={createPageUrl('BuzzStop')}>
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black border-4 border-purple-500 hover:border-purple-400 p-8 cursor-pointer transition-all w-full flex flex-col md:flex-row items-center gap-6"
                            style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.35)' }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <COOLASFUCKZap size={72} animate={true} />
                            </motion.div>
                            <div className="text-center md:text-left flex-1">
                                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                    <h3 className="text-3xl font-black font-mono text-purple-300" style={{ textShadow: '0 0 20px rgba(168,85,247,0.7)' }}>BUZZSTOP</h3>
                                    <span className="text-[10px] font-mono bg-purple-500/20 border border-purple-500 text-purple-400 px-2 py-0.5">V2 • FREE</span>
                                </div>
                                <p className="text-white font-bold text-lg mb-1">Cancel your tinnitus with AI-designed audio</p>
                                <p className="text-gray-400 text-sm font-mono">750 million people affected • Radar finds your exact Hz • 3-layer neural cancellation engine</p>
                            </div>
                            <div className="text-purple-400 font-black font-mono text-sm border-2 border-purple-500 px-5 py-3 whitespace-nowrap hover:bg-purple-500/10 transition-colors">
                                START NOW →
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* FOUR PATHS */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {/* AI51 */}
                    <Link to={createPageUrl('AI51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-red-500 hover:border-red-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
                            <COOLASFUCKHeart size={48} animate={true} />
                            <h3 className="text-lg font-black font-mono text-red-400">AI51</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">Voice • Listen • Real help</p>
                        </motion.div>
                    </Link>

                    {/* CB51 */}
                    <Link to={createPageUrl('CB51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="bg-black border-4 border-cyan-500 hover:border-cyan-400 p-6 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)' }}>
                            <Radio className="w-12 h-12 text-cyan-400" />
                            <h3 className="text-lg font-black font-mono text-cyan-400">CB51</h3>
                            <p className="text-xs text-gray-400 font-mono text-center">Artist AI • Manage bands</p>
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

                        <p className="text-white text-center font-bold text-sm pt-4">Real healing. Real value. Zero bullshit.</p>
                    </motion.div>
                </motion.div>

                {/* MAIN CTA - COOLASFUCK ICON */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center space-y-4">
                    <Link to={createPageUrl('FrequencyChamber')}>
                    <motion.div
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
                    </motion.div>
                    </Link>

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
                    <p className="font-mono text-xs text-gray-500">Built with love</p>
                </motion.div>

                </div>
                </div>
                );
                }