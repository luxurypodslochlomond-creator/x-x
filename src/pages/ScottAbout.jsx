import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Music, Heart, Globe, Mic2, Users } from 'lucide-react';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';
import CB51Icon8Bit from '@/components/shared/CB51Icon8Bit';

/**
 * CB51 ABOUT - CLEAN PROFESSIONAL
 * Who, what, why - no nonsense
 */

export default function ScottAbout() {
    React.useEffect(() => {
        document.title = 'About CB51 - Citizen Band 51 • Zero Stress Manager';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-3 bg-white" style={{ boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1)' }}>
                <Link to={createPageUrl('ScottManager')} className="flex items-center gap-2 text-gray-900 font-mono text-sm font-black hover:text-cyan-600 transition-colors">
                    <div className="bg-cyan-500 p-1.5 rounded" style={{ boxShadow: '2px 2px 0 rgba(6, 182, 212, 0.3)', imageRendering: 'pixelated' }}>
                        <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                    BACK
                </Link>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
                {/* WHO */}
                <div className="bg-white border-4 border-cyan-400 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <CB51Icon8Bit size={48} animate={true} />
                        <div>
                            <h1 className="text-gray-900 font-black text-2xl font-mono">CB51 • WHO WE ARE</h1>
                            <p className="text-gray-600 text-xs font-mono">Citizen Band 51 • Zero stress</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-mono">
                        <div className="bg-cyan-50 border-2 border-cyan-400 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Mic2 className="w-6 h-6 text-cyan-600" />
                                <p className="text-cyan-700 font-bold">SCOTT</p>
                            </div>
                            <p className="text-gray-800 text-xs mb-1">Music manager + band member</p>
                            <p className="text-gray-600 text-xs">30+ years industry experience</p>
                        </div>

                        <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Gill51Sunglasses8Bit size={24} animate={true} />
                                <p className="text-pink-600 font-bold">GILL</p>
                            </div>
                            <p className="text-gray-800 text-xs mb-1">Family director + operations</p>
                            <p className="text-gray-600 text-xs">Keeps everyone grounded ♾️</p>
                        </div>
                    </div>
                </div>

                {/* WHAT CB51 DOES */}
                <div className="bg-white border-4 border-green-400 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <CB51Icon8Bit size={40} animate={true} />
                        <h2 className="text-gray-900 font-black text-xl font-mono">WHAT CB51 DOES</h2>
                    </div>

                    {/* 8-BIT FLOW */}
                    <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 mb-4">
                        <div className="space-y-4">
                            {/* Before */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-red-100 border-2 border-red-400 rounded flex items-center justify-center" style={{ imageRendering: 'pixelated' }}>
                                    <Users className="w-10 h-10 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-red-600 font-black text-sm font-mono">BEFORE</p>
                                    <p className="text-gray-600 text-xs font-mono">Spreadsheets, emails, chaos</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-cyan-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-cyan-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-cyan-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-cyan-500 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* CB51 */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded flex items-center justify-center border-2 border-cyan-500" style={{ imageRendering: 'pixelated' }}>
                                    <CB51Icon8Bit size={40} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-cyan-600 font-black text-sm font-mono">CB51</p>
                                    <p className="text-gray-600 text-xs font-mono">Citizen Band 51</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-green-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-green-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-green-500" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-green-500 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* After */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center" style={{ imageRendering: 'pixelated' }}>
                                    <Music className="w-10 h-10 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-600 font-black text-sm font-mono">AFTER</p>
                                    <p className="text-gray-600 text-xs font-mono">Focus on music ♾️</p>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="bg-gradient-to-r from-cyan-50 to-green-50 border-2 border-green-400 rounded-lg p-3">
                                <p className="text-cyan-700 font-black text-xs mb-1">✓ 10 hours/week saved</p>
                                <p className="text-green-700 font-black text-xs mb-1">✓ Zero stress</p>
                                <p className="text-pink-600 font-black text-xs">✓ More time for music ♾️❤️♾️</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                        <p className="text-gray-800">✓ AI handles management busywork</p>
                        <p className="text-gray-800">✓ Calendar, invoices, expenses, contracts</p>
                        <p className="text-gray-800">✓ Publishing rights, sample clearance</p>
                        <p className="text-gray-800">✓ Visa tracking, gig packs, accommodation</p>
                        <p className="text-gray-800">✓ Merch inventory, media library</p>
                        <p className="text-gray-800">✓ Works offline, syncs P2P</p>
                        <p className="text-cyan-700 font-bold mt-3">Mobile-first, super simple ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHY */}
                <div className="bg-white border-4 border-pink-400 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-pink-500" />
                        <h2 className="text-gray-900 font-black text-xl font-mono">WHY WE EXIST</h2>
                    </div>

                    <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 mb-4">
                        <p className="text-red-600 font-bold mb-2 text-sm">CURRENT TOOLS:</p>
                        <p className="text-gray-700 text-xs mb-1">• Complex dashboards nobody uses</p>
                        <p className="text-gray-700 text-xs mb-1">• Require internet (useless on road)</p>
                        <p className="text-gray-700 text-xs mb-1">• Expensive (£50-£300/month)</p>
                        <p className="text-gray-700 text-xs">• Built for corporations, not artists</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-2 border-green-400 rounded-lg p-4">
                        <p className="text-green-700 font-bold mb-2 text-sm">CB51 DIFFERENCE:</p>
                        <p className="text-gray-800 text-xs mb-2">Built by managers for managers. Works offline. P2P mesh when grid fails.</p>
                        <p className="text-cyan-700 text-xs font-bold">Working class solidarity ♾️📻♾️</p>
                    </div>
                </div>

                {/* PRICING */}
                <div className="bg-white border-4 border-green-400 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Music className="w-10 h-10 text-green-600" />
                        <h2 className="text-gray-900 font-black text-xl font-mono">PRICING</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-green-50 border-2 border-green-400 p-3 rounded">
                            <p className="text-green-700 font-bold mb-1">INDIE ARTISTS: FREE</p>
                            <p className="text-gray-700">Solo artists + small bands</p>
                        </div>

                        <div className="bg-cyan-50 border-2 border-cyan-400 p-3 rounded">
                            <p className="text-cyan-700 font-bold mb-1">MANAGERS: £49/YEAR</p>
                            <p className="text-gray-700">Managing 2-5 artists</p>
                        </div>

                        <div className="bg-purple-50 border-2 border-purple-400 p-3 rounded">
                            <p className="text-purple-700 font-bold mb-1">LABELS: £149-£1,499/YEAR</p>
                            <p className="text-gray-700">Based on roster size</p>
                        </div>

                        <div className="bg-pink-50 border-2 border-pink-400 p-3 rounded">
                            <p className="text-pink-700 font-bold mb-1">YOUR MONEY → CLEANUP CREWS</p>
                            <p className="text-gray-700">Labels fund people to heal planet ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>

                {/* BIGGER VISION */}
                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 border-2 border-purple-400 rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-6 h-6 text-purple-600" />
                        <h3 className="text-gray-900 font-black text-sm font-mono">BIGGER VISION</h3>
                    </div>
                    <p className="text-gray-800 text-xs font-mono mb-2">
                        Music → Sports → Property → Cruises → Space → Disaster relief
                    </p>
                    <p className="text-gray-700 text-xs font-mono">
                        Same simple tools, 10 industries, global impact ♾️❤️♾️
                    </p>
                    <Link to={createPageUrl('ScottBiggerVision')} className="block mt-2">
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-2 rounded-lg text-xs transition-colors">
                            SEE FULL VISION →
                        </button>
                    </Link>
                </div>

                {/* SK51 QUESTIONS */}
                <div className="bg-white border-4 border-amber-400 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Mic2 className="w-10 h-10 text-amber-600" />
                        <div>
                            <h2 className="text-gray-900 font-black text-xl font-mono">5 QUESTIONS FOR SCOTT</h2>
                            <p className="text-gray-600 text-sm font-mono">No rush ♾️📻</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
                            <p className="text-amber-700 font-bold mb-2">1. WHICH BITS SAVE YOU TIME?</p>
                            <p className="text-gray-800 text-xs mb-1">Calendar? Invoices? Gig stuff?</p>
                            <p className="text-gray-600 text-xs">What do you actually use?</p>
                        </div>

                        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
                            <p className="text-red-700 font-bold mb-2">2. WHAT'S STILL ANNOYING?</p>
                            <p className="text-gray-800 text-xs mb-1">What frustrates you?</p>
                            <p className="text-gray-600 text-xs">What takes too long?</p>
                        </div>

                        <div className="bg-cyan-50 border-2 border-cyan-400 rounded-lg p-4">
                            <p className="text-cyan-700 font-bold mb-2">3. WHERE DO YOU USE IT?</p>
                            <p className="text-gray-800 text-xs mb-1">Tour bus? Home? Hotel?</p>
                            <p className="text-gray-600 text-xs">Offline or online mostly?</p>
                        </div>

                        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
                            <p className="text-green-700 font-bold mb-2">4. WHAT WOULD SAVE YOU 5 HOURS?</p>
                            <p className="text-gray-800 text-xs mb-1">One thing that wastes time?</p>
                            <p className="text-gray-600 text-xs">Biggest difference?</p>
                        </div>

                        <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-4">
                            <p className="text-pink-700 font-bold mb-2">5. ONE FEATURE TO ADD?</p>
                            <p className="text-gray-800 text-xs mb-1">What would you add?</p>
                            <p className="text-gray-600 text-xs">Make it yours</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-2 border-green-400 rounded-lg p-4">
                            <p className="text-green-700 font-bold mb-2">JUST VOICE NOTE IT</p>
                            <p className="text-gray-800 text-xs mb-1">• Record on your phone</p>
                            <p className="text-gray-800 text-xs mb-2">• Or chat when you see us</p>
                            <p className="text-cyan-700 text-xs font-bold">Zero stress - we'll build it ♾️📻♾️</p>
                        </div>
                    </div>
                </div>

                {/* START */}
                <div className="text-center space-y-3">
                    <p className="text-gray-600 text-sm font-mono mb-3">Built for the road</p>
                    <Link to={createPageUrl('ScottManager')}>
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black px-8 py-4 rounded-lg text-lg font-mono w-full shadow-lg hover:shadow-xl transition-shadow">
                            OPEN CB51 →
                        </button>
                    </Link>
                    <Link to={createPageUrl('ScottZeroServerArchitecture')}>
                        <button className="bg-white hover:bg-gray-50 text-cyan-600 font-black px-6 py-3 rounded-lg text-sm font-mono w-full border-2 border-cyan-500 shadow transition-colors">
                            READ TECHNICAL WHITEPAPER
                        </button>
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="text-center pt-6 border-t-2 border-gray-300">
                    <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border-2 border-cyan-400 rounded-xl p-4 mb-3">
                        <p className="text-gray-900 font-black text-sm font-mono mb-1">CB51 = MUSIC • SPORTS • PROPERTY</p>
                        <p className="text-gray-700 text-xs font-mono">One tool, multiple products, zero stress</p>
                    </div>
                    <p className="text-gray-600 text-[10px] font-mono">Scott's tool • UniversalFamily51</p>
                    <p className="text-gray-500 text-[9px] font-mono mt-1">(Prof51 = Students, separate)</p>
                    <p className="text-pink-500 text-xs font-mono mt-2">♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}