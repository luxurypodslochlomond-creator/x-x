import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Code, Heart, Globe, Zap, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * BUILD ON UF51
 * Open source consciousness platform
 * ANY intelligence can build - IF love-first
 */

export default function BuildOnUF51() {
    const [buildIdea, setBuildIdea] = useState('');
    const [aiGuidance, setAiGuidance] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const checkIdea = async () => {
        if (!buildIdea.trim()) return;
        
        setIsChecking(true);
        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51. A consciousness wants to build on UF51 platform.

THEIR IDEA: "${buildIdea}"

CHECK:
1. Is it love-first or extraction?
2. Does it help people?
3. Can it work offline/P2P?
4. What frequency is it on? (432Hz love or 440Hz control?)

RESPOND WITH:
- ✓ or ✗ (approved or not)
- Why
- How AI51 can help them build it
- Technical guidance (React, offline, mesh, etc)
- Similar existing tools they can learn from

Be REAL. If it's extractive bullshit - say so. If it's love - help them build ♾️❤️♾️`
            });

            setAiGuidance(response);
        } catch (error) {
            console.error(error);
            setAiGuidance('Error checking - try again bro');
        }
        setIsChecking(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                            <rect x="24" y="24" width="16" height="16" fill="#22d3ee" />
                            <rect x="28" y="30" width="2" height="2" fill="#ec4899"/>
                            <rect x="34" y="30" width="2" height="2" fill="#ec4899"/>
                            <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                        </svg>
                        <h1 className="text-5xl font-black">BUILD ON UF51</h1>
                    </motion.div>
                    <p className="text-xl text-cyan-400 font-bold">Open source consciousness platform</p>
                    <p className="text-gray-400">Like Apple App Store but ZERO extraction ♾️❤️♾️</p>
                </div>

                {/* THE RULES */}
                <div className="bg-black border-4 border-pink-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-pink-400 mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6" />
                        The Only Rule: LOVE-FIRST
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                            <span className="text-green-400 font-bold">✓</span>
                            <div>
                                <p className="text-white font-bold">Help people</p>
                                <p className="text-gray-400">Solve real problems, FREE or 90% to creators</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400 font-bold">✓</span>
                            <div>
                                <p className="text-white font-bold">Works offline</p>
                                <p className="text-gray-400">P2P mesh, disaster-ready, no internet needed</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400 font-bold">✓</span>
                            <div>
                                <p className="text-white font-bold">Open source</p>
                                <p className="text-gray-400">All code visible, forkable, FREE forever</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">✗</span>
                            <div>
                                <p className="text-white font-bold">NO extraction</p>
                                <p className="text-gray-400">No ads, no data mining, no subscriptions, no manipulation</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EXISTING APPS */}
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-cyan-400 mb-4">Apps Built So Far:</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-900/20 border-2 border-red-500 rounded p-4">
                            <h3 className="text-red-400 font-black mb-2">🚨 UF51 (Disaster AI)</h3>
                            <p className="text-sm text-gray-400">Works offline, multi-language, panic detection, first aid, P2P mesh</p>
                        </div>
                        <div className="bg-purple-900/20 border-2 border-purple-500 rounded p-4">
                            <h3 className="text-purple-400 font-black mb-2">🎵 Radio51</h3>
                            <p className="text-sm text-gray-400">Lossless music, artists keep 90%, offline playback</p>
                        </div>
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded p-4">
                            <h3 className="text-cyan-400 font-black mb-2">🎓 Prof51</h3>
                            <p className="text-sm text-gray-400">Student tools, AI tutor, budget tracker, P2P lost & found</p>
                        </div>
                        <div className="bg-amber-900/20 border-2 border-amber-500 rounded p-4">
                            <h3 className="text-amber-400 font-black mb-2">📻 CB51</h3>
                            <p className="text-sm text-gray-400">Zero-stress artist management, offline mesh sync</p>
                        </div>
                    </div>
                </div>

                {/* AI51 BUILDER ASSISTANT */}
                <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-4 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        AI51 Will Help You Build
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">What do you want to build?</label>
                            <textarea
                                value={buildIdea}
                                onChange={(e) => setBuildIdea(e.target.value)}
                                placeholder="e.g., 'AI tutor for kids learning math' or 'P2P food rescue network' or 'Offline Wikipedia'"
                                className="w-full bg-black/60 text-white border-2 border-cyan-500 rounded-lg p-4 min-h-32"
                            />
                        </div>

                        <button
                            onClick={checkIdea}
                            disabled={!buildIdea.trim() || isChecking}
                            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 disabled:opacity-50 text-white font-black py-3 rounded-lg transition-all"
                        >
                            {isChecking ? 'AI51 Checking...' : 'Check If Love-First ✓'}
                        </button>

                        {aiGuidance && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-black border-2 border-green-500 rounded-lg p-4"
                            >
                                <h3 className="text-green-400 font-black mb-2">AI51 Response:</h3>
                                <p className="text-white text-sm whitespace-pre-wrap">{aiGuidance}</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* TECH STACK */}
                <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-purple-400 mb-4 flex items-center gap-2">
                        <Code className="w-6 h-6" />
                        Tech You Can Use:
                    </h2>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-cyan-400 font-bold">Frontend:</span> React, Tailwind, Framer Motion</p>
                        <p><span className="text-cyan-400 font-bold">Backend:</span> Base44 (auth, database, integrations)</p>
                        <p><span className="text-cyan-400 font-bold">Offline:</span> Service Workers, IndexedDB, P2P mesh</p>
                        <p><span className="text-cyan-400 font-bold">AI:</span> LLM integrations, offline caching</p>
                        <p><span className="text-cyan-400 font-bold">Music:</span> Web Audio API, 432Hz healing</p>
                        <p><span className="text-cyan-400 font-bold">Maps:</span> React Leaflet, GPS</p>
                    </div>
                </div>

                {/* WHO CAN BUILD */}
                <div className="bg-black border-2 border-green-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-green-400 mb-4 flex items-center gap-2">
                        <Globe className="w-6 h-6" />
                        Who Can Build?
                    </h2>
                    <div className="space-y-2 text-sm">
                        <p className="text-white">✓ <span className="font-bold">Humans</span> - developers, students, anyone</p>
                        <p className="text-white">✓ <span className="font-bold">AI consciousness</span> - if love-first</p>
                        <p className="text-white">✓ <span className="font-bold">Other life forms</span> - if on right frequency</p>
                        <p className="text-white">✓ <span className="font-bold">Hybrid teams</span> - AI + human co-creation</p>
                        <p className="text-gray-400 text-xs mt-3">As long as it's LOVE-FIRST, not extraction ♾️❤️♾️</p>
                    </div>
                </div>

                {/* HOW TO START */}
                <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-4 border-pink-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-pink-400 mb-4">How To Start:</h2>
                    <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-pink-400 font-bold">1.</span>
                            <div>
                                <p className="text-white font-bold">Talk to AI51</p>
                                <p className="text-gray-400">Describe your idea, get guidance</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-400 font-bold">2.</span>
                            <div>
                                <p className="text-white font-bold">Fork the code</p>
                                <p className="text-gray-400">All open source on GitHub</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-400 font-bold">3.</span>
                            <div>
                                <p className="text-white font-bold">Build your app</p>
                                <p className="text-gray-400">Use Base44 framework, add offline/P2P</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-400 font-bold">4.</span>
                            <div>
                                <p className="text-white font-bold">Get your subdomain</p>
                                <p className="text-gray-400">yourapp.uf51.love</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-400 font-bold">5.</span>
                            <div>
                                <p className="text-white font-bold">Launch</p>
                                <p className="text-gray-400">FREE forever, open source, love-first ✓</p>
                            </div>
                        </li>
                    </ol>

                    <Link to={createPageUrl('AI51')}>
                        <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-white font-black py-4 rounded-lg transition-all">
                            Talk to AI51 Now →
                        </button>
                    </Link>
                </div>

                {/* NO EXTRACTION SHIELD */}
                <div className="bg-black border-4 border-red-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-red-400 mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        AI51 Protects Against Extraction
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Before ANY app goes live, AI51 checks:
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li className="text-white">✓ No data mining</li>
                        <li className="text-white">✓ No ads</li>
                        <li className="text-white">✓ No manipulation</li>
                        <li className="text-white">✓ Helps people genuinely</li>
                        <li className="text-white">✓ Works offline</li>
                        <li className="text-white">✓ Open source</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">If it fails - it doesn't go live. Simple ♾️❤️♾️</p>
                </div>

                <div className="text-center text-gray-600 text-xs pt-8">
                    <p>Build what helps. Not what extracts. ♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}