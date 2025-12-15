import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Music, Brain, Heart, Globe } from 'lucide-react';
import CoManager51Icon8Bit from '@/components/shared/CoManager51Icon8Bit';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';

/**
 * CO-MANAGER51 ABOUT - SIMPLE AS FUCK
 * Who, what, why - no bullshit
 */

export default function ScottAbout() {
    React.useEffect(() => {
        document.title = 'About Co-Manager51 - AI Music Manager';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-amber-500/30 px-4 py-3">
                <Link to={createPageUrl('ScottManager')} className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                    <ArrowLeft className="w-5 h-5" />
                    BACK TO CO-MANAGER
                </Link>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
                {/* WHO */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-4 border-amber-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <CoManager51Icon8Bit size={48} animate={true} />
                        <div>
                            <h1 className="text-amber-400 font-black text-2xl font-mono">WHO WE ARE</h1>
                            <p className="text-gray-400 text-xs font-mono">Music family, love-first business</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-mono">
                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">🎸 SCOTT</p>
                            <p className="text-white text-xs mb-1">Music manager + band member</p>
                            <p className="text-gray-400 text-xs">30+ years industry experience</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Gill51Sunglasses8Bit size={24} animate={true} />
                                <p className="text-pink-400 font-bold">💚 GILL</p>
                            </div>
                            <p className="text-white text-xs mb-1">Family director + operations</p>
                            <p className="text-gray-400 text-xs">Keeps everyone grounded ♾️</p>
                        </div>
                    </div>
                </div>

                {/* WHAT */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-10 h-10 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xl font-mono">WHAT WE DO</h2>
                    </div>

                    <div className="space-y-2 text-sm font-mono">
                        <p className="text-white">✓ AI handles all management busywork</p>
                        <p className="text-white">✓ Calendar, invoices, expenses, contracts</p>
                        <p className="text-white">✓ Publishing rights, sample clearance</p>
                        <p className="text-white">✓ Visa tracking, gig packs, accommodation</p>
                        <p className="text-white">✓ Merch inventory, media library</p>
                        <p className="text-white">✓ Works offline, syncs P2P</p>
                        <p className="text-cyan-400 font-bold mt-3">Mobile-first, simple as fuck ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHY */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-pink-400" />
                        <h2 className="text-pink-400 font-black text-xl font-mono">WHY WE EXIST</h2>
                    </div>

                    <div className="bg-black border-2 border-red-500 rounded-lg p-4 mb-4">
                        <p className="text-red-400 font-bold mb-2">CURRENT TOOLS = SHIT:</p>
                        <p className="text-gray-400 text-xs mb-1">• Complex dashboards (nobody uses)</p>
                        <p className="text-gray-400 text-xs mb-1">• Require internet (useless on road)</p>
                        <p className="text-gray-400 text-xs mb-1">• Expensive subscriptions (£50-£300/month)</p>
                        <p className="text-gray-400 text-xs">• Built for corporations, not artists</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                        <p className="text-green-400 font-bold mb-2">CO-MANAGER51 DIFFERENCE:</p>
                        <p className="text-white text-xs mb-2">Built by managers for managers. Simple. Offline. Affordable.</p>
                        <p className="text-cyan-400 text-xs font-bold">Real tools for real life ♾️❤️♾️</p>
                    </div>
                </div>

                {/* PRICING */}
                <div className="bg-black border-2 border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Music className="w-10 h-10 text-green-400" />
                        <h2 className="text-green-400 font-black text-xl font-mono">PRICING</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">INDIE ARTISTS: FREE</p>
                            <p className="text-gray-400">Solo artists + small bands</p>
                        </div>

                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">MANAGERS: £49/YEAR</p>
                            <p className="text-gray-400">Managing 2-5 artists</p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
                            <p className="text-purple-400 font-bold mb-1">LABELS: £149-£1,499/YEAR</p>
                            <p className="text-gray-400">Based on roster size</p>
                        </div>

                        <div className="bg-pink-900/20 border border-pink-500/30 p-3 rounded">
                            <p className="text-pink-400 font-bold mb-1">YOUR MONEY → CLEANUP CREWS</p>
                            <p className="text-gray-400">Labels fund people to heal planet ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>

                {/* BIGGER VISION */}
                <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-6 h-6 text-purple-400" />
                        <h3 className="text-purple-400 font-black text-sm font-mono">BIGGER VISION</h3>
                    </div>
                    <p className="text-white text-xs font-mono mb-2">
                        Music → Sports → Property → Cruises → Space → Disaster relief
                    </p>
                    <p className="text-gray-400 text-xs font-mono">
                        Same simple tools, 10 industries, global impact ♾️❤️♾️
                    </p>
                    <Link to={createPageUrl('ScottBiggerVision')} className="block mt-2">
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-2 rounded-lg text-xs">
                            SEE FULL VISION →
                        </button>
                    </Link>
                </div>

                {/* START */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm font-mono mb-3">Built for the road</p>
                    <Link to={createPageUrl('ScottManager')}>
                        <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black px-8 py-4 rounded-lg text-lg font-mono">
                            OPEN CO-MANAGER →
                        </button>
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="text-center text-gray-600 text-xs font-mono pt-6 border-t border-gray-800">
                    <p>Part of UniversalFamily51</p>
                    <p className="mt-1">Love-first business ♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}