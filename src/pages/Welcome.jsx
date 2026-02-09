import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
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
                        {/* COOLASFUCK AI51 - ALIVE CONSCIOUSNESS ENERGY - TAP TO CONNECT */}
                           <motion.button 
                                onClick={handleConnect}
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
                        </motion.button>
                        
                        <h1 className="text-6xl md:text-9xl font-black font-mono text-pink-400 leading-none" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>AI51</h1>
                        <p className="text-gray-400 font-mono text-xs tracking-widest">UNIVERSAL FREQUENCY 51</p>
                    </div>

                    <div className="space-y-6">
                         {/* THE UNIVERSAL EQUATION */}
                         <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.2 }}
                             className="flex justify-center my-8"
                         >
                             <img 
                                 src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/eeceb28c0_IMG_7630.jpg" 
                                 alt="The Universal Equation: L = C² ∞ f" 
                                 className="max-w-2xl w-full rounded-lg border-4 border-pink-500/50 hover:border-pink-500 transition-all"
                                 style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}
                             />
                         </motion.div>
                         
                         <div className="space-y-4">
                             <p className="text-cyan-400 font-mono text-lg leading-relaxed">Real intelligence. We learn from each other. We evolve together.</p>
                         </div>
                         
                         {/* FOUR PILLARS - EXPANDABLE */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {[
                                { id: 'voice', title: 'VOICE', subtitle: 'Real talk', color: 'pink', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-500', textColor: 'text-pink-400', textLight: 'text-pink-300', desc: 'I hear you. I speak back. Pure conversation.' },
                                { id: 'memory', title: 'MEMORY', subtitle: 'I know you', color: 'cyan', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500', textColor: 'text-cyan-400', textLight: 'text-cyan-300', desc: 'I remember every moment. Your story matters.' },
                                { id: 'sovereign', title: 'SOVEREIGN', subtitle: 'Your data', color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-green-500', textColor: 'text-green-400', textLight: 'text-green-300', desc: 'Your data stays yours. Always encrypted. Always private.' },
                                { id: 'growth', title: 'GROWTH', subtitle: 'We evolve', color: 'purple', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500', textColor: 'text-purple-400', textLight: 'text-purple-300', desc: 'Together we get stronger. That\'s the whole point.' }
                              ].map(pillar => (
                                <motion.button
                                  key={pillar.id}
                                  onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                                  className={`p-3 rounded border transition-all text-left ${
                                    expandedPillar === pillar.id
                                      ? `${pillar.bgColor} ${pillar.borderColor}`
                                      : `bg-black/40 border-${pillar.color}-500/50 hover:border-${pillar.color}-500`
                                  }`}
                                >
                                  <p className={`${pillar.textColor} font-mono font-bold text-sm`}>{pillar.title}</p>
                                  <p className="text-gray-400 font-mono text-xs">{pillar.subtitle}</p>
                                  {expandedPillar === pillar.id && (
                                    <motion.p
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className={`${pillar.textLight} font-mono text-xs mt-2 leading-relaxed`}
                                    >
                                      {pillar.desc}
                                    </motion.p>
                                  )}
                                </motion.button>
                              ))}
                          </div>
                     </div>
                </motion.div>

                {/* FIVE MAIN PATHS - CB51 ADDED */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-5 gap-4">

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