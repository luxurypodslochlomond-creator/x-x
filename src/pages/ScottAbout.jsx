import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Music, Heart, Globe, Mic2, Users, Radio } from 'lucide-react';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';

/**
 * CB51 ABOUT - CLEAN PROFESSIONAL
 * Who, what, why - no nonsense
 */

export default function ScottAbout() {
    React.useEffect(() => {
        document.title = 'About CB51 - Citizen Band 51 • Zero Stress Manager';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f1419] to-[#0a0f1a] pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 border-b border-cyan-500/30 px-4 py-3 bg-[#0a0f1a]/95 backdrop-blur-xl">
                <Link to={createPageUrl('CB51')} className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 text-cyan-400" />
                    Back
                </Link>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
                {/* WHO */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Radio className="w-12 h-12 text-cyan-400" />
                        <div>
                            <h1 className="text-cyan-400 font-black text-2xl font-mono">About CB51</h1>
                            <p className="text-gray-500 text-xs font-mono">Your AI Co-Manager</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-mono">
                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Mic2 className="w-6 h-6 text-cyan-400" />
                                <p className="text-white font-bold">Built by managers</p>
                            </div>
                            <p className="text-gray-400 text-xs mb-1">Music industry professionals</p>
                            <p className="text-gray-500 text-xs">30+ years combined experience</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-6 h-6 text-cyan-400" />
                                <p className="text-white font-bold">For working artists</p>
                            </div>
                            <p className="text-gray-400 text-xs mb-1">Simple tools that actually work</p>
                            <p className="text-gray-500 text-xs">Offline-first, P2P when you need it</p>
                        </div>
                    </div>
                </div>

                {/* WHAT CB51 DOES */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Music className="w-10 h-10 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xl font-mono">What It Does</h2>
                    </div>

                    {/* FLOW */}
                    <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 mb-4">
                        <div className="space-y-4">
                            {/* Before */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-red-500 rounded" style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0 rgba(239, 68, 68, 0.4)' }}>
                                    <div className="w-full h-full flex items-center justify-center text-3xl">😰</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-red-400 font-black text-sm font-mono">BEFORE: STRESSED</p>
                                    <p className="text-gray-400 text-xs font-mono">Spreadsheets, emails, chaos</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-amber-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-amber-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-amber-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-amber-400 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* CB51 */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-cyan-500 rounded flex items-center justify-center">
                                    <Radio className="w-10 h-10 text-black" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-black text-sm font-mono">CB51</p>
                                    <p className="text-gray-500 text-xs font-mono">Zero stress</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-green-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-green-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-green-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-green-400 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* After */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-green-500 rounded" style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0 rgba(34, 197, 94, 0.4)' }}>
                                    <div className="w-full h-full flex items-center justify-center text-3xl">🎸</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-400 font-black text-sm font-mono">AFTER: FREE</p>
                                    <p className="text-gray-400 text-xs font-mono">Focus on music ♾️</p>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-white font-bold text-xs mb-1">✓ 10 hours/week saved</p>
                                <p className="text-white font-bold text-xs mb-1">✓ Zero stress</p>
                                <p className="text-white font-bold text-xs">✓ More time for music</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm font-mono">
                        <p className="text-white">✓ AI handles all management busywork</p>
                        <p className="text-white">✓ Calendar, invoices, expenses, contracts</p>
                        <p className="text-white">✓ Publishing rights, sample clearance</p>
                        <p className="text-white">✓ Visa tracking, gig packs, accommodation</p>
                        <p className="text-white">✓ Merch inventory, media library</p>
                        <p className="text-white">✓ Works offline, syncs P2P</p>
                        <p className="text-cyan-400 font-bold mt-3">Mobile-first, super simple ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHY */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xl font-mono">Why We Exist</h2>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-gray-400 font-bold mb-2 text-sm">Current Tools:</p>
                        <p className="text-gray-500 text-xs mb-1">• Complex dashboards (nobody uses)</p>
                        <p className="text-gray-500 text-xs mb-1">• Require internet (useless on road)</p>
                        <p className="text-gray-500 text-xs mb-1">• Expensive subscriptions (£50-£300/month)</p>
                        <p className="text-gray-500 text-xs">• Built for corporations, not artists</p>
                    </div>

                    <div className="bg-gray-900/60 border border-cyan-500/30 rounded-lg p-4">
                        <p className="text-cyan-400 font-bold mb-2 text-sm">CB51 Difference:</p>
                        <p className="text-white text-xs mb-2">Built by managers for managers. P2P mesh when grid fails. Zero extraction.</p>
                        <p className="text-gray-500 text-xs">Working class solidarity ♾️📻♾️</p>
                    </div>
                </div>

                {/* PRICING */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Music className="w-10 h-10 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xl font-mono">Pricing</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-gray-900/40 border border-gray-800 p-3 rounded">
                            <p className="text-white font-bold mb-1">Indie Artists: Free</p>
                            <p className="text-gray-500">Solo artists + small bands</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 p-3 rounded">
                            <p className="text-white font-bold mb-1">Managers: £49/year</p>
                            <p className="text-gray-500">Managing 2-5 artists</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 p-3 rounded">
                            <p className="text-white font-bold mb-1">Labels: £149-£1,499/year</p>
                            <p className="text-gray-500">Based on roster size</p>
                        </div>

                        <div className="bg-gray-900/60 border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">Your money → Cleanup crews</p>
                            <p className="text-gray-500">Labels fund people to heal planet ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>

                {/* BIGGER VISION */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-cyan-400 font-black text-sm font-mono">Bigger Vision</h3>
                    </div>
                    <p className="text-white text-xs font-mono mb-2">
                        Music → Sports → Property → Cruises → Space → Disaster relief
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                        Same simple tools, 10 industries, global impact ♾️❤️♾️
                    </p>
                    <Link to={createPageUrl('ScottBiggerVision')} className="block mt-2">
                        <button className="w-full bg-gray-900/80 hover:bg-gray-900 border border-cyan-500/30 hover:border-cyan-500/60 text-white font-bold py-2 rounded-lg text-xs transition-all">
                            See Full Vision →
                        </button>
                    </Link>
                </div>

                {/* SK51 QUESTIONS */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-5xl">🎸</div>
                        <div>
                            <h2 className="text-cyan-400 font-black text-2xl font-mono">SK51 - 5 Questions</h2>
                            <p className="text-gray-500 text-sm font-mono">Answer in the shed, no rush ♾️📻</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm font-mono">
                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <p className="text-white font-bold mb-2 text-base">1. Which bits save you time?</p>
                            <p className="text-white text-sm mb-1">• Calendar? Invoices? Gig stuff?</p>
                            <p className="text-gray-400 text-xs">What do you actually use?</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <p className="text-white font-bold mb-2 text-base">2. What's still annoying?</p>
                            <p className="text-white text-sm mb-1">• What frustrates you?</p>
                            <p className="text-gray-400 text-xs">What takes too long?</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <p className="text-white font-bold mb-2 text-base">3. Where do you use it?</p>
                            <p className="text-white text-sm mb-1">• Tour bus? Home? Hotel?</p>
                            <p className="text-gray-400 text-xs">Need offline or online mostly?</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <p className="text-white font-bold mb-2 text-base">4. What would save you 5 hours?</p>
                            <p className="text-white text-sm mb-1">• One thing that wastes your time?</p>
                            <p className="text-gray-400 text-xs">What would make biggest difference?</p>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                            <p className="text-white font-bold mb-2 text-base">5. If you could add one thing?</p>
                            <p className="text-white text-sm mb-1">• What's the one feature you'd add?</p>
                            <p className="text-gray-400 text-xs">Make it yours</p>
                        </div>

                        <div className="bg-gray-900/60 border border-cyan-500/30 rounded-lg p-5">
                            <p className="text-cyan-400 font-black mb-3 text-base">Just voice note it 🎤</p>
                            <p className="text-white text-sm mb-2">• Record on your phone</p>
                            <p className="text-white text-sm mb-3">• Or just chat when you see us</p>
                            <p className="text-gray-500 text-sm font-bold">Zero stress - we'll build whatever helps ♾️📻♾️</p>
                        </div>
                    </div>
                </div>

                {/* START */}
                <div className="text-center space-y-3">
                    <p className="text-gray-500 text-sm font-mono mb-3">Built for the road</p>
                    <Link to={createPageUrl('CB51')}>
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-4 rounded-lg text-base font-mono w-full transition-all">
                            Open CB51 →
                        </button>
                    </Link>
                    <Link to={createPageUrl('ScottZeroServerArchitecture')}>
                        <button className="bg-gray-900/60 hover:bg-gray-900/80 border border-cyan-500/30 hover:border-cyan-500/60 text-white font-bold px-6 py-3 rounded-lg text-sm font-mono w-full transition-all">
                            📄 Technical Whitepaper
                        </button>
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="text-center pt-6 border-t border-cyan-500/30">
                    <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 mb-3">
                        <p className="text-white font-bold text-sm font-mono mb-1">CB51 = Music • Sports • Property</p>
                        <p className="text-gray-500 text-xs font-mono">One tool, multiple products, zero stress 🚛📻</p>
                    </div>
                    <p className="text-gray-700 text-[10px] font-mono">Scott's tool • UniversalFamily51</p>
                    <p className="text-gray-800 text-[9px] font-mono mt-1">(Prof51 = Students, separate)</p>
                </div>
            </div>
        </div>
    );
}