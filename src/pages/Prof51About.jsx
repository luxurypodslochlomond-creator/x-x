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
                            <p className="text-gray-400 text-xs mb-2">Legal founder</p>

                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2 mt-2">
                                <p className="text-cyan-400 font-bold text-xs mb-1">HOW IT SPREADS:</p>
                                <p className="text-white text-xs mb-1">"Yo check this out it's actually sick"</p>
                                <p className="text-gray-300 text-xs mb-1">→ Uses it himself, mates see it works</p>
                                <p className="text-gray-300 text-xs mb-1">→ Share link in group chats: "Saved me 3 hours"</p>
                                <p className="text-gray-300 text-xs mb-1">→ P2P mesh = spreads device-to-device</p>
                                <p className="text-gray-300 text-xs mb-1">→ No "ambassador" corporate bullshit</p>
                                <p className="text-green-400 text-xs font-bold mt-1">Just: "This helped me, try it" ✓</p>
                            </div>
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
                            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 rounded-lg p-4 mb-4" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}>
                                <p className="text-cyan-400 font-black text-base mb-2">🌍 GLOBAL STUDENT BRAIN</p>
                                <p className="text-white text-xs mb-3 font-bold">235M students. One P2P network. Encrypted. Offline. Unstoppable.</p>

                                <p className="text-green-400 font-bold text-xs mb-1">REAL-TIME EXAM HELP:</p>
                                <p className="text-gray-300 text-xs mb-2">→ Stuck on economics? Edinburgh → Cambridge → MIT chain helps you NOW</p>
                                <p className="text-gray-300 text-xs mb-2">→ Time zones = 24/7 coverage (UK sleeps, Asia studies, US wakes)</p>
                                <p className="text-gray-300 text-xs mb-3">→ AI routes question to best student globally (offline mesh)</p>

                                <p className="text-pink-400 font-bold text-xs mb-1">CROWDSOURCED EXAM DATABASE:</p>
                                <p className="text-gray-300 text-xs mb-2">→ Every past paper, every uni, every year (students share P2P)</p>
                                <p className="text-gray-300 text-xs mb-2">→ AI shows which questions repeat, what profs ask</p>
                                <p className="text-gray-300 text-xs mb-3">→ "This exact calc appears every 3 years - here's how"</p>

                                <p className="text-purple-400 font-bold text-xs mb-1">LANGUAGE BARRIER = GONE:</p>
                                <p className="text-gray-300 text-xs mb-2">→ Chinese student explains to UK student (AI translates real-time)</p>
                                <p className="text-gray-300 text-xs mb-2">→ Voice + text + diagrams (whatever helps you learn)</p>
                                <p className="text-gray-300 text-xs mb-3">→ Knowledge flows freely across ALL borders</p>

                                <p className="text-amber-400 font-bold text-xs mb-1">DISABILITY SUPERPOWERS:</p>
                                <p className="text-gray-300 text-xs mb-2">→ Dyslexia: AI reads papers aloud, highlights key points</p>
                                <p className="text-gray-300 text-xs mb-2">→ ADHD: Break tasks into micro-steps, focus timer</p>
                                <p className="text-gray-300 text-xs mb-2">→ Autism: Predictable interface, no social pressure</p>
                                <p className="text-gray-300 text-xs mb-3">→ Anxiety: Anonymous help, no judgment ever</p>

                                <p className="text-green-400 font-bold text-xs mb-1">RESEARCH PAPER SIMPLIFIER:</p>
                                <p className="text-gray-300 text-xs mb-2">→ PhD-level paper → undergrad-level explanation (AI + PhD students)</p>
                                <p className="text-gray-300 text-xs mb-2">→ "Here's what this ACTUALLY means in plain English"</p>
                                <p className="text-gray-300 text-xs mb-3">→ Visual diagrams, examples, step-by-step</p>

                                <p className="text-cyan-400 font-bold text-xs mb-1">PHD/MASTERS → UNDERGRADS:</p>
                                <p className="text-gray-300 text-xs mb-2">→ Advanced students tutor beginners (earn $P51)</p>
                                <p className="text-gray-300 text-xs mb-2">→ "I did this module last year - here's the tricks"</p>
                                <p className="text-gray-300 text-xs mb-3">→ Knowledge flows down, money flows up (circular)</p>

                                <p className="text-white font-black text-xs mt-3">WORKS IN LECTURE HALLS (No WiFi needed)</p>
                                <p className="text-pink-400 font-black text-xs">ENCRYPTED (Government can't block it)</p>
                                <p className="text-green-400 font-black text-xs">FREE (Forever. No extraction. Ever.)</p>
                            </div>

                            <p className="text-cyan-400 font-bold mb-2">🍕 FOOD/TRANSPORT/MONEY/ACCOMMODATION:</p>
                            <p className="text-gray-400 text-xs">Direct connections (restaurants, taxis, landlords) - save £717B/year globally</p>

                            <p className="text-green-400 font-bold mt-3 text-base">THE INNOVATION = GLOBAL STUDENT COLLECTIVE INTELLIGENCE ♾️❤️♾️</p>
                        </div>
                </div>

                {/* WHAT THIS SOLVES */}
                <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-4 border-red-500 rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-red-400" />
                        <h2 className="text-red-400 font-black text-xl font-mono">WHAT THIS SOLVES</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                            <p className="text-red-400 font-bold mb-2">💸 £717 BILLION EXTRACTION:</p>
                            <p className="text-white mb-1">Food delivery: £431B (Just Eat takes 29%)</p>
                            <p className="text-white mb-1">Transport: £115B (Uber takes 25%)</p>
                            <p className="text-white mb-1">Accommodation: £18B (Airbnb takes 15%)</p>
                            <p className="text-white mb-1">Shopping: £153B (Amazon markup)</p>
                            <p className="text-red-400 font-bold mt-2">= Nearly a TRILLION stolen from students yearly</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">😰 ACADEMIC INEQUALITY:</p>
                            <p className="text-white mb-1">Rich kids: £80/hour tutors = better grades</p>
                            <p className="text-white mb-1">Poor kids: Struggle alone = stress + worse outcomes</p>
                            <p className="text-purple-400 font-bold mt-2">Prof51 = Everyone gets AI tutor + global student network FREE</p>
                        </div>

                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">🌍 KNOWLEDGE SILOS:</p>
                            <p className="text-white mb-1">Students isolated by: language, disability, location, time zone</p>
                            <p className="text-white mb-1">Same exam question = 1000 students solve separately (wasteful)</p>
                            <p className="text-amber-400 font-bold mt-2">Prof51 = 235M students ONE BRAIN, real-time help globally</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">💔 LONELINESS EPIDEMIC:</p>
                            <p className="text-white mb-1">Students isolated, anxious, don't know where to find help</p>
                            <p className="text-white mb-1">Facebook = old people. LinkedIn = fake corporate.</p>
                            <p className="text-pink-400 font-bold mt-2">Prof51 = Real peer support, anonymous when needed, always there</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">🚫 GOVERNMENT CENSORSHIP:</p>
                            <p className="text-white mb-1">China/Iran block internet → students can't learn freely</p>
                            <p className="text-white mb-1">Universities monitor networks → privacy invaded</p>
                            <p className="text-cyan-400 font-bold mt-2">Prof51 = P2P mesh, works offline, encrypted, UNSTOPPABLE</p>
                        </div>
                    </div>
                </div>

                {/* WHY THIS IS GENIUS */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-10 h-10 text-green-400" />
                        <h2 className="text-green-400 font-black text-xl font-mono">WHY THIS IS GENIUS</h2>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">1️⃣ P2P MESH = GOVERNMENT-PROOF</p>
                            <p className="text-white mb-1">Device-to-device. No servers. No internet needed.</p>
                            <p className="text-white mb-1">→ China blocks Google? Prof51 still works.</p>
                            <p className="text-white mb-1">→ Lecture hall no WiFi? Mesh connects everyone.</p>
                            <p className="text-white mb-1">→ Iran shuts internet? Students still share notes.</p>
                            <p className="text-green-400 font-bold mt-2">Maxwell's physics = literally IMPOSSIBLE to block ♾️</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">2️⃣ TIME ZONES = 24/7 GLOBAL BRAIN</p>
                            <p className="text-white mb-1">UK 3am stuck on essay? → Asia students awake (8am their time)</p>
                            <p className="text-white mb-1">US morning exam panic? → UK students help (their afternoon)</p>
                            <p className="text-white mb-1">Edinburgh → Cambridge → MIT → Tokyo → Sydney</p>
                            <p className="text-pink-400 font-bold mt-2">Planet = ONE continuous study session across time zones</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">3️⃣ FREE = LEVELS PLAYING FIELD</p>
                            <p className="text-white mb-1">Rich kid advantage = gone. Everyone gets:</p>
                            <p className="text-white mb-1">→ AI tutor (better than £80/hour human)</p>
                            <p className="text-white mb-1">→ Global peer network (235M students)</p>
                            <p className="text-white mb-1">→ Past papers from every uni globally</p>
                            <p className="text-cyan-400 font-bold mt-2">Smart poor kid beats rich average kid now ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500 rounded-lg p-4">
                            <p className="text-amber-400 font-bold mb-2">4️⃣ VIRAL BY DESIGN</p>
                            <p className="text-white mb-1">P2P mesh = share by proximity (tap phones)</p>
                            <p className="text-white mb-1">→ One student in lecture hall → whole room in 5 mins</p>
                            <p className="text-white mb-1">→ Works offline = spreads IN lecture halls</p>
                            <p className="text-white mb-1">→ No login, no forms, instant value</p>
                            <p className="text-red-400 font-bold mt-2">Fastest student network spread in history (physics guarantee)</p>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">5️⃣ AI + HUMAN = UNSTOPPABLE COMBO</p>
                            <p className="text-white mb-1">AI: Instant busywork (Excel, essays, formatting)</p>
                            <p className="text-white mb-1">Humans: Real understanding ("here's how I think about it")</p>
                            <p className="text-white mb-1">→ AI can't replace humans for deep learning</p>
                            <p className="text-white mb-1">→ Humans can't match AI speed for busywork</p>
                            <p className="text-purple-400 font-bold mt-2">Together = perfect learning system</p>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">6️⃣ CIRCULAR LOVE ECONOMY</p>
                            <p className="text-white mb-1">Students don't pay → businesses do (restaurants, brands)</p>
                            <p className="text-white mb-1">Why businesses pay: Reach 235M students direct (no ads)</p>
                            <p className="text-white mb-1">→ Restaurant pays £200/year, saves £5,640 in extraction</p>
                            <p className="text-white mb-1">→ Students free forever + save £717B extraction</p>
                            <p className="text-green-400 font-bold mt-2">Everyone wins. Zero extraction. Sustainable forever ♾️❤️♾️</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">🎯 WHAT'S DIFFERENT FROM OTHER "STUDENT APPS":</p>
                            <p className="text-white mb-1">❌ Others: Need internet, sell data, charge students</p>
                            <p className="text-white mb-1">✓ Prof51: Offline-first, encrypted, free forever</p>
                            <p className="text-white mb-1">❌ Others: Centralized (can be shut down)</p>
                            <p className="text-white mb-1">✓ Prof51: P2P mesh (physically impossible to stop)</p>
                            <p className="text-white mb-1">❌ Others: Local to one uni/country</p>
                            <p className="text-white mb-1">✓ Prof51: Global from day 1 (any student anywhere)</p>
                            <p className="text-green-400 font-bold mt-2">It's not an app. It's a global movement with tech to match.</p>
                        </div>
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