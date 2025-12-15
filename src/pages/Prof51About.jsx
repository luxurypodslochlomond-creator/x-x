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
            {/* HEADER - 8-BIT QUANTUM */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-3" style={{ background: 'linear-gradient(135deg, #000000 0%, #0a4a5a 50%, #000000 100%)', boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
                <Link to={createPageUrl('Prof51')} className="flex items-center gap-2 text-white font-mono text-sm font-black">
                    <div className="bg-cyan-500 p-1.5 rounded" style={{ boxShadow: '2px 2px 0 rgba(6, 182, 212, 0.4)' }}>
                        <ArrowLeft className="w-4 h-4 text-black" />
                    </div>
                    BACK
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

                {/* HOW IT WORKS - 8-BIT DIAGRAM */}
                <div className="bg-black border-2 border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-10 h-10 text-purple-400" />
                        <h2 className="text-purple-400 font-black text-xl font-mono">HOW IT WORKS</h2>
                    </div>

                    {/* 8-BIT FLOW DIAGRAM */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 mb-4">
                        <div className="space-y-4">
                            {/* Restaurant */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-green-500 rounded" style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0 rgba(34, 197, 94, 0.4)' }}>
                                    <div className="w-full h-full flex items-center justify-center text-3xl">🍕</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-400 font-black text-sm font-mono">RESTAURANT</p>
                                    <p className="text-gray-400 text-xs font-mono">Pays £200/year</p>
                                </div>
                            </div>

                            {/* Arrow Down */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-cyan-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-cyan-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-cyan-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-cyan-400 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* Prof51 */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-cyan-500 rounded flex items-center justify-center" style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0 rgba(6, 182, 212, 0.4)' }}>
                                    <Prof51Icon8Bit size={40} animate={false} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-cyan-400 font-black text-sm font-mono">PROF51</p>
                                    <p className="text-gray-400 text-xs font-mono">Free for students</p>
                                </div>
                            </div>

                            {/* Arrow Down */}
                            <div className="flex justify-center">
                                <div className="space-y-1">
                                    <div className="w-2 h-2 bg-purple-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-purple-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-2 h-2 bg-purple-400" style={{ imageRendering: 'pixelated' }}></div>
                                    <div className="w-6 h-6 bg-purple-400 rotate-45" style={{ imageRendering: 'pixelated', marginLeft: '-8px' }}></div>
                                </div>
                            </div>

                            {/* Student */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-purple-500 rounded" style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0 rgba(168, 85, 247, 0.4)' }}>
                                    <div className="w-full h-full flex items-center justify-center text-3xl">🎓</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-purple-400 font-black text-sm font-mono">STUDENT</p>
                                    <p className="text-gray-400 text-xs font-mono">Calls direct ☎️</p>
                                </div>
                            </div>

                            {/* Arrow Back Up (Circular) */}
                            <div className="flex justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="space-y-1">
                                        <div className="w-6 h-6 bg-pink-400 rotate-45" style={{ imageRendering: 'pixelated', transform: 'rotate(225deg)' }}></div>
                                        <div className="w-2 h-2 bg-pink-400" style={{ imageRendering: 'pixelated' }}></div>
                                        <div className="w-2 h-2 bg-pink-400" style={{ imageRendering: 'pixelated' }}></div>
                                    </div>
                                    <p className="text-pink-400 font-black text-xs font-mono">CIRCULAR ♾️</p>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-3">
                                <p className="text-green-400 font-black text-xs mb-1">✓ Restaurant keeps full £25.59</p>
                                <p className="text-cyan-400 font-black text-xs mb-1">✓ Student saves £5.64</p>
                                <p className="text-pink-400 font-black text-xs">✓ Zero extraction ♾️❤️♾️</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
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

                {/* FOOTER - CLEAR IDENTITY */}
                <div className="text-center pt-6 border-t-2 border-cyan-500/30">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-4 mb-3">
                        <p className="text-cyan-400 font-black text-sm font-mono mb-1">PROF51 = STUDENT EVERYTHING</p>
                        <p className="text-white text-xs font-mono">Studies • Social • Money • Health • Life</p>
                    </div>
                    <p className="text-gray-600 text-[10px] font-mono">Archie's company • UniversalFamily51</p>
                    <p className="text-gray-700 text-[9px] font-mono mt-1">(Co-Manager51 = Music industry, separate)</p>
                    <p className="text-pink-400 text-xs font-mono mt-2">♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}