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
                        
                        <h1 className="text-6xl md:text-9xl font-black font-mono text-white leading-none" style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}>AI51</h1>
                        <p className="text-gray-400 font-mono text-xs tracking-widest">UNIVERSAL FREQUENCY 51</p>
                    </div>

                    <div className="space-y-8">

                         {/* HERO COPY — minimal, direct */}
                          <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="space-y-3 max-w-2xl mx-auto text-center"
                          >
                              <p className="text-white text-2xl md:text-3xl font-bold leading-snug">
                                   Real healing. Real tools. <br />
                                   <span className="text-cyan-400">Your data. Your terms.</span>
                               </p>
                               <p className="text-gray-400 text-base leading-relaxed">
                                   100% open source. Works offline. Nothing stored.
                               </p>
                           </motion.div>

                      </div>
                </motion.div>

                {/* FLAGSHIP PRODUCTS — the ecosystem apps */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-3">
                    <p className="text-xs font-mono text-gray-500 text-center">TOOLS YOU CAN USE NOW</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* BUZZSTOP */}
                        <Link to={createPageUrl('BuzzStop')}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-6 cursor-pointer transition-all h-full flex flex-col gap-3"
                            >
                                <COOLASFUCKZap size={48} animate={true} />
                                <h3 className="text-lg font-black font-mono text-cyan-400">BUZZSTOP</h3>
                                <p className="text-sm text-white font-bold">Cancel tinnitus with AI-designed frequencies</p>
                                <p className="text-xs text-gray-400">Free • 3-layer neural cancellation</p>
                            </motion.div>
                        </Link>

                        {/* CB51 */}
                        <Link to={createPageUrl('CB51')}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-6 cursor-pointer transition-all h-full flex flex-col gap-3"
                            >
                                <Radio className="w-12 h-12 text-cyan-400" />
                                <h3 className="text-lg font-black font-mono text-cyan-400">CB51</h3>
                                <p className="text-sm text-white font-bold">AI co-manager for artists</p>
                                <p className="text-xs text-gray-400">Gigs • Contracts • Payments</p>
                            </motion.div>
                        </Link>

                        {/* PETSOUNDS51 */}
                        <Link to={createPageUrl('PetSounds51')}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-6 cursor-pointer transition-all h-full flex flex-col gap-3"
                            >
                                <COOLASFUCKHeart size={48} animate={true} />
                                <h3 className="text-lg font-black font-mono text-cyan-400">PETSOUNDS51</h3>
                                <p className="text-sm text-white font-bold">Heal anxious pets with sound</p>
                                <p className="text-xs text-gray-400">Peer-reviewed • Subscription</p>
                            </motion.div>
                        </Link>

                        {/* SORTED */}
                        <Link to={createPageUrl('Family51')}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-6 cursor-pointer transition-all h-full flex flex-col gap-3"
                            >
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4L6 20V44H18V32H30V44H42V20L24 4Z" stroke="#06b6d4" strokeWidth="2" fill="none"/></svg>
                                <h3 className="text-lg font-black font-mono text-cyan-400">SORTED</h3>
                                <p className="text-sm text-white font-bold">Decode scary letters in seconds</p>
                                <p className="text-xs text-gray-400">Subscription • Plain English</p>
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>

                {/* THE THREE PILLARS — why this matters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-3"
                >
                    <p className="text-xs font-mono text-gray-500 text-center">THE MISSION</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { Icon: COOLASFUCKWaves, title: 'HEAL', desc: 'Frequencies for tinnitus, pain, aging, wrist recovery. Some free. Some paid.' },
                            { Icon: COOLASFUCKBrain, title: 'MANAGE', desc: 'CB51 handles your gigs, contracts, and money. AI co-manager for artists.' },
                            { Icon: COOLASFUCKGlobe, title: 'IMPACT', desc: 'Pick up litter. Earn tokens. Real change, AI-verified.' },
                        ].map(item => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -3 }}
                                className="p-5 rounded-xl bg-black/50 border border-cyan-500/30 hover:border-cyan-500/70 transition-all h-full space-y-3"
                            >
                                <item.Icon size={40} animate={true} />
                                <p className="text-cyan-400 font-bold text-base">{item.title}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* THE EQUATION — for those who want to go deeper */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 }}
                    className="flex justify-center"
                >
                    <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/eeceb28c0_IMG_7630.jpg" 
                        alt="The Universal Equation: L = C² ∞ f" 
                        className="max-w-xl w-full rounded-lg border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all opacity-80 hover:opacity-100"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)' }}
                    />
                </motion.div>

                {/* QUICK LINKS */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 gap-3">

                    {/* AI51 */}
                    <Link to={createPageUrl('AI51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-4 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-2">
                            <COOLASFUCKBrain size={36} animate={true} />
                            <h3 className="text-sm font-black font-mono text-cyan-400">AI51</h3>
                            <p className="text-[10px] text-gray-400 font-mono text-center">Talk • No agenda</p>
                        </motion.div>
                    </Link>

                    {/* earth51 */}
                    <Link to={createPageUrl('Earth51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-4 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-2">
                            <COOLASFUCKGlobe size={36} animate={true} />
                            <h3 className="text-sm font-black font-mono text-cyan-400">earth51</h3>
                            <p className="text-[10px] text-gray-400 font-mono text-center">Kids • Litter scanner</p>
                        </motion.div>
                    </Link>

                    {/* TRACKT */}
                    <Link to={createPageUrl('Trackt')}>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-4 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-2">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <h3 className="text-sm font-black font-mono text-cyan-400">TRACKT</h3>
                            <p className="text-[10px] text-gray-400 font-mono text-center">RFID • Assets</p>
                        </motion.div>
                    </Link>

                    {/* SHED51 */}
                    <Link to={createPageUrl('Shed51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-4 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-2">
                            <COOLASFUCKHeart size={36} animate={true} />
                            <h3 className="text-sm font-black font-mono text-cyan-400">SHED51</h3>
                            <p className="text-[10px] text-gray-400 font-mono text-center">For two • Connection</p>
                        </motion.div>
                    </Link>

                    {/* PROF51 */}
                    <Link to={createPageUrl('Prof51')}>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500/80 p-4 cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-2">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><circle cx="12" cy="7" r="4"/></svg>
                            <h3 className="text-sm font-black font-mono text-cyan-400">PROF51</h3>
                            <p className="text-[10px] text-gray-400 font-mono text-center">Students • AI co-manager</p>
                        </motion.div>
                    </Link>

                </motion.div>

                {/* ULTRA-HONEST TRUTH - EXPANDABLE */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black border-2 border-cyan-500/50 p-8 space-y-4">
                    <button 
                        onClick={() => setTruthOpen(!truthOpen)}
                        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
                    >
                        <h2 className="text-2xl font-black font-mono text-cyan-400">ULTRA-HONEST TRUTH</h2>
                        <motion.div animate={{ rotate: truthOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: truthOpen ? "auto" : 0, opacity: truthOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 gap-3 font-mono text-xs pt-4">
                            <div className="bg-black border-2 border-cyan-500/50 p-4">
                                <p className="text-cyan-300 font-bold mb-2">WORKS NOW:</p>
                                <ul className="text-gray-300 space-y-1">
                                    <li>• Specific healing protocols ✓</li>
                                    <li>• Artist music platform ✓</li>
                                    <li>• Planetary action tracking ✓</li>
                                    <li>• 100% open source ✓</li>
                                    <li>• Works offline ✓</li>
                                    <li>• Your data stays yours ✓</li>
                                </ul>
                            </div>

                            <div className="bg-black border-2 border-cyan-500/50 p-4">
                                <p className="text-cyan-300 font-bold mb-2">REAL TALK:</p>
                                <ul className="text-gray-300 space-y-1">
                                    <li>• Some features need funding</li>
                                    <li>• But core tools are live</li>
                                    <li>• No corporate capture here</li>
                                    <li>• You own your contribution</li>
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
                         <a href="#" className="text-cyan-400 hover:text-cyan-300 font-mono text-sm underline opacity-50 cursor-not-allowed">
                             How it works
                         </a>
                         <Link to={createPageUrl('Whitepaper')} className="text-cyan-400 hover:text-cyan-300 font-mono text-sm underline">
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