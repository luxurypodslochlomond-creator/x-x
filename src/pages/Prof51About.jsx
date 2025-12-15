import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Heart, Brain, Globe } from 'lucide-react';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';
import LennoxIcon8Bit from '@/components/shared/LennoxIcon8Bit';

/**
 * PROF51 ABOUT - SIMPLE AS FUCK
 * Who, what, why - no bullshit
 */

export default function Prof51About() {
    React.useEffect(() => {
        document.title = 'About PROF51 - Student AI Co-Manager';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3">
                <Link to={createPageUrl('Prof51')} className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                    <ArrowLeft className="w-5 h-5" />
                    BACK TO PROF51
                </Link>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
                {/* WHO */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Prof51Icon8Bit size={48} animate={true} />
                        <div>
                            <h1 className="text-cyan-400 font-black text-2xl font-mono">WHO WE ARE</h1>
                            <p className="text-gray-400 text-xs font-mono">Real students, real company</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-mono">
                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">🎓 ARCHIE (19)</p>
                            <p className="text-white text-xs mb-1">Economics @ Edinburgh</p>
                            <p className="text-gray-400 text-xs">Legal founder + campus lead</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <LennoxIcon8Bit size={24} animate={true} />
                                <p className="text-pink-400 font-bold">⚽ LENNOX (10)</p>
                            </div>
                            <p className="text-white text-xs mb-1">Spotted £717B extraction from students</p>
                            <p className="text-gray-400 text-xs">Vision lead (becomes co-founder later)</p>
                        </div>
                    </div>
                </div>

                {/* WHAT */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-10 h-10 text-green-400" />
                        <h2 className="text-green-400 font-black text-xl font-mono">WHAT WE DO</h2>
                    </div>

                    <div className="space-y-2 text-sm font-mono">
                        <p className="text-white">✓ AI handles all your busywork (Excel, essays, formatting)</p>
                        <p className="text-white">✓ Connect direct with restaurants (save £5.64/order)</p>
                        <p className="text-white">✓ P2P student network (offline, encrypted)</p>
                        <p className="text-white">✓ Budget tracker, timetable, textbook swap</p>
                        <p className="text-white">✓ Mental health support (anonymous)</p>
                        <p className="text-white">✓ Find flatmates (AI matches)</p>
                        <p className="text-green-400 font-bold mt-3">FREE FOREVER ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHY */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-pink-400" />
                        <h2 className="text-pink-400 font-black text-xl font-mono">WHY WE EXIST</h2>
                    </div>

                    <div className="bg-black border-2 border-red-500 rounded-lg p-4 mb-4">
                        <p className="text-red-400 font-bold text-lg mb-2">£717 BILLION/YEAR</p>
                        <p className="text-white text-xs mb-2">Extracted from students globally:</p>
                        <p className="text-gray-400 text-xs">• Food delivery fees</p>
                        <p className="text-gray-400 text-xs">• Accommodation platforms</p>
                        <p className="text-gray-400 text-xs">• Shopping markups</p>
                        <p className="text-gray-400 text-xs">• Transport extraction</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                        <p className="text-green-400 font-bold mb-2">PROF51 SOLUTION:</p>
                        <p className="text-white text-xs mb-2">Students connect DIRECT. Zero middlemen. Zero extraction.</p>
                        <p className="text-cyan-400 text-xs font-bold">Circular love economy ♾️❤️♾️</p>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-black border-2 border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-10 h-10 text-purple-400" />
                        <h2 className="text-purple-400 font-black text-xl font-mono">HOW IT WORKS</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">1. RESTAURANTS PAY PROF51</p>
                            <p className="text-gray-400">£200/year → Reach 1000+ students</p>
                        </div>

                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">2. STUDENTS USE FREE</p>
                            <p className="text-gray-400">All tools, forever, zero cost</p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
                            <p className="text-purple-400 font-bold mb-1">3. DIRECT CONNECTION</p>
                            <p className="text-gray-400">Student calls restaurant → Restaurant keeps full money</p>
                        </div>

                        <div className="bg-pink-900/20 border border-pink-500/30 p-3 rounded">
                            <p className="text-pink-400 font-bold mb-1">4. EVERYONE WINS</p>
                            <p className="text-gray-400">Restaurant saves £5,640/year in extraction fees</p>
                        </div>
                    </div>
                </div>

                {/* START */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm font-mono mb-3">Edinburgh Economics → Global</p>
                    <Link to={createPageUrl('Prof51Tools')}>
                        <button className="bg-gradient-to-r from-green-500 to-cyan-500 text-black font-black px-8 py-4 rounded-lg text-lg font-mono">
                            OPEN TOOLS →
                        </button>
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="text-center text-gray-600 text-xs font-mono pt-6 border-t border-gray-800">
                    <p>Archie's company • Independent from UF51</p>
                    <p className="mt-1">Connected family • Separate mission ♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}