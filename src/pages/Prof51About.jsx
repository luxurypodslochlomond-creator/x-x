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
                {/* THE UNIVERSAL ENTRY POINT */}
                <div className="bg-gradient-to-br from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-2xl p-6" style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.6)' }}>
                    <p className="text-amber-400 font-black text-3xl mb-3 text-center">🌍 WORLD'S FIRST</p>
                    <p className="text-white text-2xl font-bold text-center mb-2">P2P Lost & Found Network</p>
                    <p className="text-cyan-400 text-base font-bold text-center mb-4">For Students. By Students. Zero Bullshit.</p>
                    
                    <div className="bg-black border-4 border-red-500 rounded-xl p-5 mb-4" style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.5)' }}>
                        <p className="text-red-400 font-bold text-lg mb-3 text-center">WHY THIS REACHES EVERYONE:</p>
                        
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-sm mb-2 text-center">DOESN'T MATTER WHO YOU ARE:</p>
                            <p className="text-white text-xs mb-2 text-center">→ Rich student? Has expensive stuff they can't lose (£2k laptop, designer watch)</p>
                            <p className="text-white text-xs mb-2 text-center">→ Poor student? Literally can't afford to lose phone/laptop (can't replace it)</p>
                            <p className="text-white text-xs mb-2 text-center">→ British student? Lost ID/wallet at club</p>
                            <p className="text-white text-xs mb-2 text-center">→ Chinese student? Lost phone with all contacts</p>
                            <p className="text-white text-xs mb-2 text-center">→ International student? Lost passport/visa docs (nightmare)</p>
                            <p className="text-cyan-400 font-bold text-base text-center mt-3">EVERYONE loses something precious. EVERYONE needs this.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4">
                        <p className="text-green-400 font-black text-lg mb-3 text-center">🔥 THE INNOVATION (WORLD'S FIRST):</p>
                        <p className="text-white text-sm mb-2 text-center">Bluetooth mesh exists (AirTags, Tile trackers)</p>
                        <p className="text-cyan-400 font-bold text-sm mb-3 text-center">But NEVER used for students helping students = PROF51 FIRST EVER ✓</p>
                        <div className="space-y-2 text-xs">
                            <p className="text-white text-center">Student downloads for P2P Lost & Found (universal need)</p>
                            <p className="text-cyan-400 text-center">→ Mesh finds their lost phone/keys/laptop at club/restaurant/festival</p>
                            <p className="text-pink-400 text-center">→ "This just saved my arse TODAY"</p>
                            <p className="text-purple-400 text-center">→ Opens app to say thanks</p>
                            <p className="text-amber-400 text-center">→ Discovers: AI homework help, study groups, budget tracker, flatmate finder, food savings</p>
                            <p className="text-green-400 font-bold text-base text-center mt-3">Come for Lost & Found. Stay for EVERYTHING. ✓</p>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-white rounded-lg p-4 mt-4">
                        <p className="text-white font-bold text-sm text-center mb-2">THAT'S WHY IT'LL REACH EVERY STUDENT:</p>
                        <p className="text-gray-300 text-xs text-center mb-2">Not "this might help your studies" (some students don't care)</p>
                        <p className="text-gray-300 text-xs text-center mb-2">Not "this saves money" (some students rich AF)</p>
                        <p className="text-green-400 font-bold text-base text-center mt-2">But "NEVER LOSE YOUR STUFF" = Everyone needs ♾️❤️♾️</p>
                    </div>
                </div>

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
                            <p className="text-cyan-400 font-bold mb-2">🎓 STARTED BY STUDENTS</p>
                            <p className="text-white text-xs mb-1">Economics @ Edinburgh</p>
                            <p className="text-gray-400 text-xs mb-2">Built by students, for students</p>

                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2 mt-2">
                                <p className="text-cyan-400 font-bold text-xs mb-1">HOW IT SPREADS:</p>
                                <p className="text-white text-xs mb-1">"Yo check this out it's actually sick"</p>
                                <p className="text-gray-300 text-xs mb-1">→ Students use it, mates see it works</p>
                                <p className="text-gray-300 text-xs mb-1">→ Share link in group chats: "Saved me 3 hours"</p>
                                <p className="text-gray-300 text-xs mb-1">→ P2P mesh = spreads device-to-device</p>
                                <p className="text-gray-300 text-xs mb-1">→ No "ambassador" corporate bullshit</p>
                                <p className="text-green-400 text-xs font-bold mt-1">Just: "This helped me, try it" ✓</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-bold mb-2">💡 THE VISION</p>
                            <p className="text-white text-xs mb-1">Spotted £717B extraction from students globally</p>
                            <p className="text-gray-400 text-xs">Built solution that can't be stopped</p>
                        </div>
                    </div>
                </div>

                {/* WHAT ARCHIE & HIS MATES ACTUALLY NEED */}
                <div className="bg-gradient-to-r from-green-500/20 to-purple-500/20 border-4 border-green-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-green-400" />
                        <h2 className="text-green-400 font-black text-xl font-mono">WHAT STUDENTS ACTUALLY NEED</h2>
                        <p className="text-gray-400 text-[10px] font-mono">(Real student life)</p>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>
                            <p className="text-cyan-400 font-bold text-sm mb-2">📚 BETTER GRADES (WITHOUT THE STRESS)</p>
                            <p className="text-white mb-1">Not "work harder" - work SMARTER</p>
                            <p className="text-gray-300 mb-1">→ AI does Excel models in 30 seconds (not 3 hours)</p>
                            <p className="text-gray-300 mb-1">→ Essay outlines instant (no staring at blank page)</p>
                            <p className="text-gray-300 mb-1">→ Stuck at 2am? Ask global network, answer in minutes</p>
                            <p className="text-gray-300 mb-1">→ Past papers from EVERY uni (know what profs ask)</p>
                            <p className="text-green-400 font-bold mt-2">Same effort = Better results. That's the goal ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                            <p className="text-amber-400 font-bold text-sm mb-2">💰 SAVE ACTUAL MONEY (WE'RE BROKE)</p>
                            <p className="text-white mb-1">Students = no money. Every £ matters.</p>
                            <p className="text-gray-300 mb-1">→ Food: Save £5.64 every order (call restaurant direct)</p>
                            <p className="text-gray-300 mb-1">→ Textbooks: P2P swap (not £200 to bookshop)</p>
                            <p className="text-gray-300 mb-1">→ Transport: Share rides with other students</p>
                            <p className="text-gray-300 mb-1">→ Accommodation: Find flatmates, split costs</p>
                            <p className="text-red-400 font-bold mt-2">£43/week saved = £2,236/year = Actually matters</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                            <p className="text-purple-400 font-bold text-sm mb-2">⏰ TIME (GET MY LIFE BACK)</p>
                            <p className="text-white mb-1">Stop wasting hours on busywork</p>
                            <p className="text-gray-300 mb-1">→ AI formats Word docs (2 hours → 2 minutes)</p>
                            <p className="text-gray-300 mb-1">→ Excel formulas auto-generated (no YouTube tutorials)</p>
                            <p className="text-gray-300 mb-1">→ Study groups find YOU (no endless texting)</p>
                            <p className="text-gray-300 mb-1">→ Budget tracker automatic (know where money goes)</p>
                            <p className="text-pink-400 font-bold mt-2">12 hours/week saved = Actually have a life</p>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-4 border-pink-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}>
                            <p className="text-pink-400 font-bold text-sm mb-2">🫂 NOT BE LONELY (REAL TALK)</p>
                            <p className="text-white mb-1">Uni can be isolating AF</p>
                            <p className="text-gray-300 mb-1">→ Find people actually like you (AI matches vibe)</p>
                            <p className="text-gray-300 mb-1">→ Study groups that don't suck (compatible people)</p>
                            <p className="text-gray-300 mb-1">→ Know what's happening (gigs, events, meetups)</p>
                            <p className="text-gray-300 mb-1">→ Anonymous support when struggling (no judgment)</p>
                            <p className="text-red-400 font-bold mt-2">Mental health matters. You're not alone.</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
                            <p className="text-green-400 font-bold text-sm mb-2">🎉 ACTUALLY ENJOY UNI</p>
                            <p className="text-white mb-1">Not just survive - THRIVE</p>
                            <p className="text-gray-300 mb-1">→ Less stress about grades (AI helps you nail it)</p>
                            <p className="text-gray-300 mb-1">→ More money in pocket (stop getting extracted)</p>
                            <p className="text-gray-300 mb-1">→ More time for mates (not stuck on busywork)</p>
                            <p className="text-gray-300 mb-1">→ Know where the parties are (Prof51 shows you)</p>
                            <p className="text-cyan-400 font-bold mt-2">Uni should be SICK. Prof51 makes it happen.</p>
                        </div>

                        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-4 border-red-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)' }}>
                            <p className="text-red-400 font-bold text-sm mb-2">📚 COURSE MATERIALS = SCAM</p>
                            <p className="text-white mb-1">Always moaning about it, yeah?</p>
                            <p className="text-gray-300 mb-1">→ Textbook: £150 (used once, then sits on shelf)</p>
                            <p className="text-gray-300 mb-1">→ "Required" course pack: £80 (just PDFs printed out)</p>
                            <p className="text-gray-300 mb-1">→ Lab materials: £50 (should be included in tuition wtf)</p>
                            <p className="text-gray-300 mb-1">→ Online access codes: £40 (expires after semester)</p>
                            <p className="text-pink-400 font-bold mt-2">Prof51: Student textbook swap P2P + shared notes = FREE</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-4 border-purple-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                            <p className="text-purple-400 font-bold text-sm mb-2">💳 STUDENT DISCOUNTS (WE MOVE)</p>
                            <p className="text-white mb-1">Everyone goes mad for student discount</p>
                            <p className="text-gray-300 mb-1">→ Prof51 shows ALL local student deals (restaurants, shops, cafes)</p>
                            <p className="text-gray-300 mb-1">→ Call direct = save more than "student discount" (no middleman)</p>
                            <p className="text-gray-300 mb-1">→ Students share deals P2P: "This place does 50% off after 9pm"</p>
                            <p className="text-cyan-400 font-bold mt-2">Not fake discounts. Real savings from real businesses ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>
                            <p className="text-cyan-400 font-bold text-sm mb-2">📚 COURSE MATERIAL SWAP (P2P)</p>
                            <p className="text-white text-xs mb-1">£150 textbook? Someone finished that course. Get it FREE.</p>
                            <p className="text-gray-300 text-xs mb-1">→ "I have: Microeconomics 3rd Ed" → "I need: Stats textbook"</p>
                            <p className="text-gray-300 text-xs mb-1">→ Prof51 matches you (same campus, available now)</p>
                            <p className="text-gray-300 text-xs mb-1">→ Meet in library, swap books, done</p>
                            <p className="text-gray-300 text-xs mb-1">→ No marketplace fees, no shipping, no bullshit</p>
                            <p className="text-purple-400 font-bold text-xs mt-2">Students helping students. Zero extraction. ✓</p>

                            <div className="bg-black border-2 border-green-500 rounded-lg p-3 mt-3">
                                <p className="text-green-400 font-bold text-xs mb-2">✓ 100% LEGAL (SMART THIS TIME):</p>
                                <p className="text-white text-xs mb-1">→ Students OWN their physical books</p>
                                <p className="text-white text-xs mb-1">→ Selling/swapping YOUR book = totally legal (like any marketplace)</p>
                                <p className="text-white text-xs mb-1">→ Share notes YOU created = legal</p>
                                <p className="text-white text-xs mb-1">→ Help each other learn = always been legal</p>
                                <p className="text-white text-xs mb-1">→ NOT piracy, NOT illegal downloads</p>
                                <p className="text-cyan-400 text-xs font-bold mt-2">Free knowledge vision = ACHIEVED. Done the RIGHT way. ✓</p>
                            </div>

                            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-4 border-purple-500 rounded-lg p-4 mt-3" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                                <p className="text-purple-400 font-black text-xs mb-2">💡 THE COOLASFUCK INNOVATION:</p>
                                <p className="text-white text-xs mb-2">Best ideas from pioneers → Applied legally through P2P mesh</p>

                                <div className="bg-black border-2 border-cyan-500 rounded p-3 mb-2">
                                    <p className="text-cyan-400 font-bold text-xs mb-1">✓ FREE KNOWLEDGE SHARING:</p>
                                    <p className="text-white text-xs mb-1">→ Students help students learn (P2P encrypted mesh)</p>
                                    <p className="text-white text-xs mb-1">→ Past papers shared globally (students created = legal)</p>
                                    <p className="text-white text-xs mb-1">→ 24/7 global study help (time zones = always someone awake)</p>
                                </div>

                                <div className="bg-black border-2 border-green-500 rounded p-3 mb-2">
                                    <p className="text-green-400 font-bold text-xs mb-1">✓ P2P MARKETPLACE (NO MIDDLEMAN):</p>
                                    <p className="text-white text-xs mb-1">→ Student-to-student direct (books, notes, tutoring)</p>
                                    <p className="text-white text-xs mb-1">→ Zero platform fees (physical exchange P2P)</p>
                                    <p className="text-white text-xs mb-1">→ Encrypted communication (privacy protected)</p>
                                </div>

                                <div className="bg-black border-2 border-pink-500 rounded p-3">
                                    <p className="text-pink-400 font-bold text-xs mb-1">✓ UNSTOPPABLE BY DESIGN:</p>
                                    <p className="text-white text-xs mb-1">→ Works offline (can't shut down internet to stop it)</p>
                                    <p className="text-white text-xs mb-1">→ Device-to-device (no servers to raid)</p>
                                    <p className="text-white text-xs mb-1">→ 100% legal (nothing to prosecute)</p>
                                    <p className="text-cyan-400 text-xs font-bold text-center mt-2">Good ideas FINALLY winning. Done right this time. ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-4 border-pink-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}>
                            <p className="text-pink-400 font-bold text-sm mb-2">🔍 LOST & FOUND (COMMUNITY)</p>
                            <p className="text-white mb-1">Lost your laptop? Keys? Someone probably found it.</p>
                            <p className="text-gray-300 mb-1">→ Post: "Lost black backpack in Library Level 3"</p>
                            <p className="text-gray-300 mb-1">→ Someone sees it: "Found it! It's at security desk"</p>
                            <p className="text-gray-300 mb-1">→ Community looking out for each other</p>
                            <p className="text-gray-300 mb-1">→ Works P2P offline (spreads device-to-device on campus)</p>
                            <p className="text-red-400 font-bold mt-2">Students got your back. Always. ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-amber-500/20 border-4 border-green-500 rounded-lg p-4" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
                            <p className="text-green-400 font-bold text-sm mb-2">🌍 FUTURE: STUDENTS RISING TOGETHER</p>
                            <p className="text-white mb-1">Not being political. Just practical.</p>
                            <p className="text-gray-300 mb-1">→ Mass campus cleanups (earn P51, heal planet, build community)</p>
                            <p className="text-gray-300 mb-1">→ Better than protests (protests = just shouting, cleanups = actual change)</p>
                            <p className="text-gray-300 mb-1">→ Students worldwide connecting (Edinburgh → MIT → Tokyo → Lagos)</p>
                            <p className="text-gray-300 mb-1">→ Rise together, not compete against each other</p>
                            <p className="text-amber-400 font-bold mt-2">Action {">"}  Words. Students actually helping, not just complaining ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-6" style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.5)' }}>
                            <p className="text-purple-400 font-bold text-lg mb-3">✨ ONE APP = WOW</p>
                            <p className="text-white text-sm mb-2">Not 10 apps. ONE app. Everything solved.</p>

                            <div className="bg-black border-2 border-purple-500/50 rounded-lg p-3 mb-3">
                                <p className="text-cyan-400 text-xs mb-1">✓ Studies (AI handles busywork)</p>
                                <p className="text-green-400 text-xs mb-1">✓ Money (save £43/week, earn P51)</p>
                                <p className="text-pink-400 text-xs mb-1">✓ Social (find your people)</p>
                                <p className="text-amber-400 text-xs mb-1">✓ Accommodation (flatmates sorted)</p>
                                <p className="text-purple-400 text-xs mb-1">✓ Food (call direct, save money)</p>
                                <p className="text-red-400 text-xs mb-1">✓ Course materials (swap P2P free)</p>
                                <p className="text-blue-400 text-xs mb-1">✓ Lost & found (community helps)</p>
                                <p className="text-green-400 text-xs">✓ Mental health (anonymous support)</p>
                            </div>

                            <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-2 border-red-500 rounded-lg p-3">
                                <p className="text-red-400 font-bold text-xs mb-2">NOT LIKE COSTCO:</p>
                                <p className="text-white text-xs mb-1">Costco = Pay membership to access discounts (extraction)</p>
                                <p className="text-green-400 text-xs font-bold mb-2">Prof51 = FREE forever, businesses pay us, students benefit</p>
                                <p className="text-cyan-400 text-xs">Zero extraction. Just love. That's how you make your son proud ♾️❤️♾️</p>
                            </div>

                            <p className="text-white text-sm font-bold mt-3 text-center">Students go: "WOW this actually helps me"</p>
                            <p className="text-pink-400 text-xs text-center mt-1">Not "another app". THE app. ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-green-500/20 border-4 border-amber-500 rounded-xl p-6" style={{ boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)' }}>
                            <p className="text-amber-400 font-black text-xl mb-3">💰 HOW WE MAKE MONEY (ZERO EXTRACTION)</p>
                            <p className="text-white text-sm mb-4">Businesses pay for REACH. Students free forever. Simple.</p>

                            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-4 border-purple-500 rounded-xl p-4 mb-4" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}>
                                <p className="text-purple-400 font-black text-base mb-3 text-center">💎 TIERED ACCESS MODEL</p>
                                <p className="text-white text-xs mb-3 text-center">Companies pay based on HOW MANY students they reach (not for data)</p>

                                <div className="space-y-2">
                                    <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-green-400 font-bold text-xs">🏪 LOCAL BUSINESS</p>
                                            <p className="text-green-400 font-black text-sm">£200/year</p>
                                        </div>
                                        <p className="text-white text-xs mb-1">→ Reach: 1,000 students (one campus)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Restaurant, cafe, barber, gym</p>
                                        <p className="text-cyan-400 text-xs font-bold">Saves £5,640/year in Just Eat fees = worth it ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-cyan-400 font-bold text-xs">🏢 REGIONAL CHAIN</p>
                                            <p className="text-cyan-400 font-black text-sm">£5,000/year</p>
                                        </div>
                                        <p className="text-white text-xs mb-1">→ Reach: 10,000 students (city-wide)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Restaurant chain, gym chain, local brand</p>
                                        <p className="text-cyan-400 text-xs font-bold">10 locations × £500 each = cheaper than ads ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-purple-500 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-purple-400 font-bold text-xs">🏭 NATIONAL BRAND</p>
                                            <p className="text-purple-400 font-black text-sm">£50,000/year</p>
                                        </div>
                                        <p className="text-white text-xs mb-1">→ Reach: 500,000 students (UK-wide)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Nationwide chain, UK brand, textbook publisher</p>
                                        <p className="text-purple-400 text-xs font-bold">£0.10 per student per year = insane value vs ads ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-pink-500 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-pink-400 font-bold text-xs">🌍 GLOBAL BRAND</p>
                                            <p className="text-pink-400 font-black text-sm">£200,000/year</p>
                                        </div>
                                        <p className="text-white text-xs mb-1">→ Reach: 10,000,000 students (globally)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Apple, Nike, Samsung, Spotify, Netflix</p>
                                        <p className="text-pink-400 text-xs font-bold">£0.02 per student = cheaper than ONE Facebook ad ✓</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-4 mt-3">
                                    <p className="text-green-400 font-black text-sm mb-2 text-center">💰 REVENUE AT SCALE (NO STUDENTS PAYING)</p>
                                    <div className="space-y-1 text-xs">
                                        <p className="text-white">→ 10,000 local businesses × £200 = <span className="text-green-400 font-bold">£2M</span></p>
                                        <p className="text-white">→ 500 regional chains × £5,000 = <span className="text-cyan-400 font-bold">£2.5M</span></p>
                                        <p className="text-white">→ 100 national brands × £50,000 = <span className="text-purple-400 font-bold">£5M</span></p>
                                        <p className="text-white">→ 50 global brands × £200,000 = <span className="text-pink-400 font-bold">£10M</span></p>
                                        <p className="text-amber-400 font-black text-base mt-2 text-center">= £19.5M/year revenue</p>
                                        <p className="text-cyan-400 text-xs text-center mt-1">Students: FREE forever. Zero extraction. ✓</p>
                                    </div>
                                </div>

                                <div className="bg-black border-2 border-amber-500 rounded-lg p-3 mt-3">
                                    <p className="text-amber-400 font-bold text-xs mb-2">🚀 AT 100M STUDENTS (10% OF GLOBAL):</p>
                                    <p className="text-white text-xs mb-1">→ 100,000 local businesses = £20M</p>
                                    <p className="text-white text-xs mb-1">→ 2,000 regional chains = £10M</p>
                                    <p className="text-white text-xs mb-1">→ 500 national brands = £25M</p>
                                    <p className="text-white text-xs mb-1">→ 200 global brands = £40M</p>
                                    <p className="text-green-400 font-black text-lg text-center mt-2">£95M/year revenue ✓</p>
                                    <p className="text-pink-400 text-xs text-center font-bold mt-1">Students still FREE. That's the magic. ♾️❤️♾️</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}>
                                    <p className="text-cyan-400 font-black text-base mb-3 text-center">🎯 WHAT BUSINESSES GET</p>
                                    
                                    <div className="bg-black border-2 border-green-500 rounded-lg p-3 mb-3">
                                        <p className="text-green-400 font-bold text-xs mb-2">1️⃣ VERIFIED DIRECTORY LISTING</p>
                                        <p className="text-white text-xs mb-1">→ Name, address, phone, menu/services</p>
                                        <p className="text-white text-xs mb-1">→ Student ratings + reviews (builds trust)</p>
                                        <p className="text-white text-xs mb-1">→ Special student offers (optional)</p>
                                        <p className="text-cyan-400 text-xs font-bold">Clean, simple, no ads, no spam ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-purple-500 rounded-lg p-3 mb-3">
                                        <p className="text-purple-400 font-bold text-xs mb-2">2️⃣ DIRECT STUDENT CALLS</p>
                                        <p className="text-white text-xs mb-1">→ Students call YOU direct (not through platform)</p>
                                        <p className="text-white text-xs mb-1">→ You keep 100% of money (no commission fees)</p>
                                        <p className="text-white text-xs mb-1">→ Prof51 never touches the transaction</p>
                                        <p className="text-purple-400 text-xs font-bold">Real customers. Real revenue. Zero middleman. ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-pink-500 rounded-lg p-3 mb-3">
                                        <p className="text-pink-400 font-bold text-xs mb-2">3️⃣ MASSIVE COST SAVINGS</p>
                                        <p className="text-white text-xs mb-1">Restaurant saves vs Just Eat/Deliveroo:</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Just Eat takes 29% per order = £5,640/year</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Prof51 = £200/year flat (no commissions)</p>
                                        <p className="text-green-400 text-xs font-bold">= £5,440/year SAVED per location ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-amber-500 rounded-lg p-3 mb-3">
                                        <p className="text-amber-400 font-bold text-xs mb-2">4️⃣ QUALIFIED STUDENT AUDIENCE</p>
                                        <p className="text-white text-xs mb-1">→ Students CHOOSE to see your category</p>
                                        <p className="text-white text-xs mb-1">→ "Show me: Food" = they want restaurants</p>
                                        <p className="text-white text-xs mb-1">→ Not random ads, targeted by CHOICE</p>
                                        <p className="text-amber-400 text-xs font-bold">Better conversion than any ad platform ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                                        <p className="text-cyan-400 font-bold text-xs mb-2">5️⃣ COMMUNITY VERIFICATION</p>
                                        <p className="text-white text-xs mb-1">→ Good service = students rate you high = more visibility</p>
                                        <p className="text-white text-xs mb-1">→ Students share: "This place is actually sick"</p>
                                        <p className="text-white text-xs mb-1">→ Word-of-mouth = most powerful marketing</p>
                                        <p className="text-cyan-400 text-xs font-bold">Trust built naturally through community ✓</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-4 mb-3" style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)' }}>
                                    <p className="text-pink-400 font-black text-base mb-3 text-center">🌍 BIG BRANDS (Nike, Apple, Spotify, etc)</p>
                                    <p className="text-white text-xs mb-3 text-center">£200,000/year = 10M students globally = £0.02 per student</p>

                                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-2">
                                        <p className="text-cyan-400 font-bold text-xs mb-2">WHY IT'S INSANE VALUE:</p>
                                        <p className="text-white text-xs mb-1">→ Facebook ads: £5-£10 per student reached (£50M-£100M)</p>
                                        <p className="text-white text-xs mb-1">→ Instagram ads: £3-£8 per student (£30M-£80M)</p>
                                        <p className="text-white text-xs mb-1">→ TikTok ads: £2-£5 per student (£20M-£50M)</p>
                                        <p className="text-green-400 text-xs font-bold mt-2">Prof51: £0.02 per student = £200k total</p>
                                        <p className="text-pink-400 text-xs font-bold">= 100x-500x CHEAPER than social media ads ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-green-500 rounded-lg p-3 mb-2">
                                        <p className="text-green-400 font-bold text-xs mb-2">WHAT BIG BRANDS GET:</p>
                                        <p className="text-white text-xs mb-1">✓ Global student directory listing (10M students see them)</p>
                                        <p className="text-white text-xs mb-1">✓ Verified by student community (authentic trust)</p>
                                        <p className="text-white text-xs mb-1">✓ Student discount codes (drives real sales)</p>
                                        <p className="text-white text-xs mb-1">✓ Brand association with helping students (good PR)</p>
                                        <p className="text-white text-xs mb-1">✓ Direct to brand website/store (no middleman)</p>
                                        <p className="text-cyan-400 text-xs font-bold mt-2">Students CHOOSE to see tech/fashion brands (opt-in only)</p>
                                    </div>

                                    <div className="bg-black border-2 border-purple-500 rounded-lg p-3 mb-2">
                                        <p className="text-purple-400 font-bold text-xs mb-2">EXAMPLE: SPOTIFY</p>
                                        <p className="text-white text-xs mb-1">Pays: £200,000/year to Prof51</p>
                                        <p className="text-white text-xs mb-1">Gets: Listed in "Music & Entertainment" category</p>
                                        <p className="text-gray-300 text-xs mb-1">→ 10M students who opted-in to see music deals</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Verified student discount: £4.99/month (50% off)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ If 1% convert = 100,000 new subscribers</p>
                                        <p className="text-gray-300 text-xs mb-1">→ = £6M/year new revenue from £200k investment</p>
                                        <p className="text-green-400 text-xs font-bold mt-2">30x ROI + brand trust with students ✓</p>
                                    </div>

                                    <div className="bg-black border-2 border-amber-500 rounded-lg p-3">
                                        <p className="text-amber-400 font-bold text-xs mb-2">EXAMPLE: APPLE</p>
                                        <p className="text-white text-xs mb-1">Pays: £200,000/year to Prof51</p>
                                        <p className="text-white text-xs mb-1">Gets: Listed in "Tech & Gadgets" category</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Student discount: 20% off MacBook (saves £400)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ If 0.5% buy MacBook = 50,000 sales</p>
                                        <p className="text-gray-300 text-xs mb-1">→ = £50M revenue from £200k investment</p>
                                        <p className="text-green-400 text-xs font-bold mt-2">250x ROI + lifelong Apple customers ✓</p>
                                    </div>
                                </div>

                                <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                                    <p className="text-green-400 font-bold text-sm mb-2">✓ WHAT BUSINESSES DON'T GET (PROTECTING STUDENTS)</p>
                                    <p className="text-red-400 text-xs mb-1">❌ Student data (names, emails, behavior)</p>
                                    <p className="text-red-400 text-xs mb-1">❌ Transaction tracking (what they ordered, when, how much)</p>
                                    <p className="text-red-400 text-xs mb-1">❌ Advertising space (no ads, ever)</p>
                                    <p className="text-red-400 text-xs mb-1">❌ Ability to message students directly</p>
                                    <p className="text-white text-xs font-bold mt-2">Just a listing. Students control everything. Fair deal for everyone. ✓</p>
                                </div>

                                <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                                    <p className="text-purple-400 font-bold text-sm mb-2">✓ STUDENTS CHOOSE WHAT THEY SEE (OPT-IN)</p>
                                    <p className="text-white text-xs mb-1">Zero ads. Students control everything.</p>
                                    <p className="text-gray-300 text-xs mb-1">→ "Show me: Food, Accommodation, Textbooks" = you see those</p>
                                    <p className="text-gray-300 text-xs mb-1">→ "Hide: Fashion, Travel" = you don't see those</p>
                                    <p className="text-gray-300 text-xs mb-1">→ AI learns what you ACTUALLY need (not what advertisers want)</p>
                                    <p className="text-pink-400 font-bold text-xs mt-2">You control Prof51. Prof51 doesn't control you. ✓</p>
                                </div>

                                <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                                    <p className="text-cyan-400 font-bold text-sm mb-2">✓ VERIFICATION = TRUST (NOT SPAM)</p>
                                    <p className="text-white text-xs mb-1">Big companies pay more? Yes. But ONLY if students verify they're good.</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Restaurant verified by 500 students = trustworthy</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Landlord with 10 bad reviews = kicked off platform</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Textbook seller scams someone = banned forever</p>
                                    <p className="text-red-400 text-xs mb-1">→ Students rate businesses. Bad actors = OUT.</p>
                                    <p className="text-green-400 font-bold text-xs mt-2">Money doesn't buy trust. Quality does. ✓</p>
                                </div>

                                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-4 border-red-500 rounded-lg p-4">
                                    <p className="text-red-400 font-bold text-sm mb-2">💎 THE INNOVATION (TRULY POWERFUL):</p>
                                    <p className="text-white text-xs mb-2">Businesses teach students + Students verify businesses = ECOSYSTEM</p>

                                    <div className="bg-black/60 border border-pink-500/50 rounded p-2 mb-2">
                                        <p className="text-pink-400 font-bold text-xs mb-1">EXAMPLE 1: Local restaurant</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Pays £200/year to Prof51</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Gets listed to 1,000 students on campus</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Students call direct (no Just Eat fees)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Restaurant saves £5,640/year in platform fees</p>
                                        <p className="text-green-400 text-xs font-bold">→ Win-win: Restaurant saves £5,440 net, students save £5.64/order ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-purple-500/50 rounded p-2 mb-2">
                                        <p className="text-purple-400 font-bold text-xs mb-1">EXAMPLE 2: Big company (Apple/Nike/etc)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Pays £50,000/year to reach 100,000 students globally</p>
                                        <p className="text-gray-300 text-xs mb-1">→ NOT ads. They offer: student discount code + educational content</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Students OPT-IN: "Show me tech deals" = they see Apple</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Students verify: "Got MacBook 20% off, legit" = trust builds</p>
                                        <p className="text-cyan-400 text-xs font-bold">→ Big company pays MORE but students still control what they see ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-amber-500/50 rounded p-2">
                                        <p className="text-amber-400 font-bold text-xs mb-1">SCALE = MASSIVE VALUE (NO EXTRACTION):</p>
                                        <p className="text-white text-xs mb-1">1,000 students on campus = £20,000/year revenue (100 businesses × £200)</p>
                                        <p className="text-white text-xs mb-1">100,000 students globally = £2M/year (big companies pay more for reach)</p>
                                        <p className="text-white text-xs mb-1">10M students = £20M-£50M/year (sustainable forever)</p>
                                        <p className="text-green-400 text-xs font-bold mt-1">Students FREE forever. Businesses pay for REACH not DATA. ✓</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}>
                                    <p className="text-cyan-400 font-black text-base mb-3">🚀 THE NEW THINKING (TRULY INNOVATIVE):</p>
                                    <p className="text-white text-xs mb-3">Businesses access students BUT zero ads, zero extraction. How? REVERSE THE MODEL.</p>

                                    <div className="bg-black border-2 border-red-500 rounded-lg p-3 mb-3">
                                        <p className="text-red-400 font-bold text-xs mb-2">❌ OLD MODEL (Facebook/Instagram/etc):</p>
                                        <p className="text-gray-300 text-xs mb-1">1. Students use app "free"</p>
                                        <p className="text-gray-300 text-xs mb-1">2. Platform harvests ALL data (clicks, time, behavior, location)</p>
                                        <p className="text-gray-300 text-xs mb-1">3. Sells data to advertisers</p>
                                        <p className="text-gray-300 text-xs mb-1">4. Shows targeted ads everywhere</p>
                                        <p className="text-gray-300 text-xs mb-1">5. Students = product being sold</p>
                                        <p className="text-red-400 font-bold text-xs mt-2">EXTRACTION. Students used. Businesses manipulate. Everyone loses trust.</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-3">
                                        <p className="text-green-400 font-black text-xs mb-2">✓ NEW MODEL (Prof51 - PERMISSION BASED):</p>
                                        <p className="text-white text-xs mb-2 font-bold">Students control EVERYTHING. Businesses pay for PERMISSION to exist.</p>

                                        <div className="bg-black/60 border border-cyan-500/50 rounded p-2 mb-2">
                                            <p className="text-cyan-400 font-bold text-xs mb-1">STEP 1: Business pays to BE LISTED (not for data)</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Restaurant: £200/year to be in directory</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Textbook shop: £500/year</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Apple/Nike: £50k/year for global reach</p>
                                            <p className="text-white text-xs mt-1">They pay for PRESENCE. Not tracking. Not manipulation.</p>
                                        </div>

                                        <div className="bg-black/60 border border-purple-500/50 rounded p-2 mb-2">
                                            <p className="text-purple-400 font-bold text-xs mb-1">STEP 2: Students OPT-IN to categories</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Open Prof51 first time: "What do you need help with?"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Student picks: Food, Textbooks, Accommodation</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Student DOESN'T pick: Fashion, Tech, Travel</p>
                                            <p className="text-white text-xs mt-1">= You ONLY see what YOU chose. Not what advertisers want.</p>
                                        </div>

                                        <div className="bg-black/60 border border-pink-500/50 rounded p-2 mb-2">
                                            <p className="text-pink-400 font-bold text-xs mb-1">STEP 3: Prof51 shows DIRECTORY (not ads)</p>
                                            <p className="text-gray-300 text-xs mb-1">→ You selected "Food"? See list of restaurants near campus</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Each restaurant: name, menu, phone, student rating</p>
                                            <p className="text-gray-300 text-xs mb-1">→ No tracking which one you look at</p>
                                            <p className="text-gray-300 text-xs mb-1">→ No "this restaurant paid more so show them first"</p>
                                            <p className="text-white text-xs mt-1">Clean list. You choose. We never know which you picked.</p>
                                        </div>

                                        <div className="bg-black/60 border border-amber-500/50 rounded p-2 mb-2">
                                            <p className="text-amber-400 font-bold text-xs mb-1">STEP 4: Student contacts business DIRECT</p>
                                            <p className="text-gray-300 text-xs mb-1">→ You call restaurant: "Hi I want to order"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Transaction happens between YOU and THEM</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Prof51 NEVER sees: what you ordered, how much you spent, when, how often</p>
                                            <p className="text-white text-xs mt-1">Zero tracking. Zero data harvesting. You're invisible to us.</p>
                                        </div>

                                        <div className="bg-black/60 border border-green-500/50 rounded p-2">
                                            <p className="text-green-400 font-bold text-xs mb-1">STEP 5: Students verify businesses (TRUST)</p>
                                            <p className="text-gray-300 text-xs mb-1">→ After calling restaurant, you can rate: "Great food, saved £6"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Bad business? Students rate it badly, eventually removed</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Good business? Rises in directory, more students find them</p>
                                            <p className="text-white text-xs mt-1">Community decides who stays. Not money. Quality wins.</p>
                                        </div>

                                        <p className="text-cyan-400 font-black text-xs mt-3 text-center">BUSINESSES ACCESS STUDENTS ✓</p>
                                        <p className="text-green-400 font-black text-xs text-center">ZERO ADS ✓</p>
                                        <p className="text-pink-400 font-black text-xs text-center">ZERO EXTRACTION ✓</p>
                                        <p className="text-white text-xs text-center mt-2">That's the innovation. Permission-based directory. ♾️❤️♾️</p>
                                    </div>
                                </div>

                                <div className="bg-black border-2 border-white rounded-lg p-4">
                                    <p className="text-white font-bold text-sm mb-2">🔥 WHY IT'S POWERFUL AF:</p>
                                    <p className="text-gray-300 text-xs mb-1">1. Students trust it (no ads, no data selling, community verifies)</p>
                                    <p className="text-gray-300 text-xs mb-1">2. Businesses love it (cheaper than ads, better targeting, real results)</p>
                                    <p className="text-gray-300 text-xs mb-1">3. Scales globally (same model works Edinburgh → MIT → world)</p>
                                    <p className="text-gray-300 text-xs mb-1">4. Can't be copied (community trust takes years, we're first)</p>
                                    <p className="text-green-400 font-bold text-xs mt-2">Real money at scale. Zero extraction. Makes Archie proud. ♾️❤️♾️</p>
                                </div>
                                </div>
                                </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6" style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)' }}>
                            <p className="text-pink-400 font-black text-xl mb-3">💗 WHAT STUDENTS ACTUALLY FEEL</p>
                            <p className="text-white text-sm mb-4">In this world? Conflict, drama, wealth gaps, getting taught shit. Prof51 = different feeling.</p>

                            <div className="space-y-3">
                                <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                                    <p className="text-red-400 font-bold text-sm mb-2">❌ THE WORLD RIGHT NOW:</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Rich kids get tutors (£80/hour), poor kids struggle alone = UNFAIR</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Social media = fake lives, comparison, anxiety, depression</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Everyone extracting from students (tuition, textbooks, rent, food apps)</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Unis teach theory from 1980s, not real skills for 2025</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Conflict everywhere (politics, protests, division)</p>
                                    <p className="text-red-400 font-bold text-xs mt-2">Students feel: Alone. Stressed. Broke. Lost. Anxious.</p>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-4">
                                    <p className="text-green-400 font-bold text-sm mb-2">✓ WITH PROF51 YOU FEEL:</p>
                                    <p className="text-white text-xs mb-2">Not "useful app" - DIFFERENT FEELING IN YOUR CHEST:</p>

                                    <div className="bg-black/60 border border-cyan-500/50 rounded p-2 mb-2">
                                        <p className="text-cyan-400 font-bold text-xs mb-1">💪 EMPOWERED (NOT HELPLESS):</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Excel assignment due? AI does it in 30 seconds (not 3 hour panic)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Don't understand topic? 1000 students globally who DO understand, answer in minutes</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Broke AF? Earn P51 helping others, spend on food</p>
                                        <p className="text-green-400 text-xs font-bold">FEEL: I can handle this. I got this. ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-purple-500/50 rounded p-2 mb-2">
                                        <p className="text-purple-400 font-bold text-xs mb-1">🫂 CONNECTED (NOT LONELY):</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Study group finds YOU (compatible people, same course, same vibe)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Flatmate search = perfect match (AI knows who you'd vibe with)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Lost something? Community finds it and messages you</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Struggling mentally? Anonymous support, real humans who get it</p>
                                        <p className="text-pink-400 text-xs font-bold">FEEL: I'm not alone. People got my back. ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-amber-500/50 rounded p-2 mb-2">
                                        <p className="text-amber-400 font-bold text-xs mb-1">⚖️ FAIR (NOT RIGGED):</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Rich kid has tutor? You have AI tutor (FREE, better than human)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Everyone pays £717B to platforms? You call restaurant direct, save money</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Textbooks £150? Swap with student who finished course (FREE)</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Nobody extracting from you. Zero ads. Zero data selling.</p>
                                        <p className="text-green-400 text-xs font-bold">FEEL: Finally, something not trying to fuck me over. ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-pink-500/50 rounded p-2 mb-2">
                                        <p className="text-pink-400 font-bold text-xs mb-1">🎯 PURPOSEFUL (NOT LOST):</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Not just "get degree". Build community. Help others rise.</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Mass campus cleanup = heal planet + earn money + make friends</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Tutor someone = they pass exam = you helped change their life</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Share notes = other students benefit = rising together</p>
                                        <p className="text-purple-400 text-xs font-bold">FEEL: I'm part of something bigger. My actions matter. ✓</p>
                                    </div>

                                    <div className="bg-black/60 border border-green-500/50 rounded p-2">
                                        <p className="text-green-400 font-bold text-xs mb-1">✨ HOPEFUL (NOT DEPRESSED):</p>
                                        <p className="text-gray-300 text-xs mb-1">→ World feels fucked? Here's proof it's not: students helping students</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Everyone talks conflict? Here's action: clean campus, build community</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Wealth gap massive? Here's solution: share resources, rise together</p>
                                        <p className="text-gray-300 text-xs mb-1">→ Unis teach old shit? AI teaches you real skills for actual jobs</p>
                                        <p className="text-cyan-400 text-xs font-bold">FEEL: Maybe things can be different. Maybe I can help. ✓</p>
                                    </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-4 border-amber-500 rounded-xl p-6 mt-4" style={{ boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)' }}>
                                    <p className="text-amber-400 font-black text-xl mb-3">⚖️ THE SWEET SPOT (FOR EVERYONE)</p>
                                    <p className="text-white text-sm mb-4">Not all students are struggling. Some are thriving. Prof51 = benefits BOTH.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                                            <p className="text-red-400 font-bold text-xs mb-2">🆘 STRUGGLING STUDENTS:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Lonely, broke, stressed, lost</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Need help NOW</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Can't afford tutors</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Drowning in busywork</p>
                                            <p className="text-white text-xs mt-2 font-bold">Prof51 = LIFELINE</p>
                                            <p className="text-green-400 text-xs">→ AI tutor FREE</p>
                                            <p className="text-green-400 text-xs">→ Find community</p>
                                            <p className="text-green-400 text-xs">→ Earn money helping</p>
                                            <p className="text-green-400 text-xs">→ Automate busywork</p>
                                        </div>

                                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                                            <p className="text-green-400 font-bold text-xs mb-2">💪 THRIVING STUDENTS:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Happy, connected, doing well</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Good friend group</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Getting good grades</p>
                                            <p className="text-gray-300 text-xs mb-1">→ But... still spend HOURS on Excel/PowerPoint</p>
                                            <p className="text-white text-xs mt-2 font-bold">Prof51 = TIME SAVER</p>
                                            <p className="text-cyan-400 text-xs">→ Excel in 30 seconds not 3 hours</p>
                                            <p className="text-cyan-400 text-xs">→ More time for fun/friends</p>
                                            <p className="text-cyan-400 text-xs">→ Help others, feel good</p>
                                            <p className="text-cyan-400 text-xs">→ Save money on food/textbooks</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-lg p-4 mt-3">
                                        <p className="text-purple-400 font-black text-sm mb-2">🎯 THE GENIUS (WHY IT WORKS FOR BOTH):</p>

                                        <div className="bg-black/60 border border-cyan-500/50 rounded p-3 mb-2">
                                            <p className="text-cyan-400 font-bold text-xs mb-1">EVERYONE HATES BUSYWORK:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Lonely student: "I'm stressed AND have 3-hour Excel assignment"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Happy student: "I'm great but this Excel is killing my Saturday"</p>
                                            <p className="text-white text-xs mt-1 font-bold">= Both want AI to do the boring shit ✓</p>
                                        </div>

                                        <div className="bg-black/60 border border-green-500/50 rounded p-3 mb-2">
                                            <p className="text-green-400 font-bold text-xs mb-1">EVERYONE WANTS TO SAVE MONEY:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Broke student: "I need to save every £"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Comfortable student: "Why pay £5.64 extra to Just Eat?"</p>
                                            <p className="text-white text-xs mt-1 font-bold">= Both want direct restaurant contact ✓</p>
                                        </div>

                                        <div className="bg-black/60 border border-pink-500/50 rounded p-3 mb-2">
                                            <p className="text-pink-400 font-bold text-xs mb-1">EVERYONE WANTS CONVENIENCE:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Isolated student: "I need help finding community"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Social student: "I want to know what's happening tonight"</p>
                                            <p className="text-white text-xs mt-1 font-bold">= Both use the same directory ✓</p>
                                        </div>

                                        <div className="bg-black/60 border border-amber-500/50 rounded p-3">
                                            <p className="text-amber-400 font-bold text-xs mb-1">EVERYONE HATES EXTRACTION:</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Struggling student: "I'm being squeezed by everyone"</p>
                                            <p className="text-gray-300 text-xs mb-1">→ Thriving student: "I see the system is rigged"</p>
                                            <p className="text-white text-xs mt-1 font-bold">= Both want zero-extraction platform ✓</p>
                                        </div>

                                        <p className="text-white text-xs font-bold mt-3 text-center">SWEET SPOT = SOLVES REAL PAIN FOR EVERYONE</p>
                                        <p className="text-cyan-400 text-xs text-center">→ Struggling students: lifeline they desperately need</p>
                                        <p className="text-green-400 text-xs text-center">→ Thriving students: time/money saver they appreciate</p>
                                        <p className="text-pink-400 text-xs text-center font-bold mt-2">BOTH SPREAD IT. That's why it works. ♾️❤️♾️</p>
                                    </div>

                                    <div className="bg-black border-2 border-white rounded-lg p-4 mt-3">
                                        <p className="text-white font-bold text-sm mb-2">💡 THE INSIGHT:</p>
                                        <p className="text-gray-300 text-xs mb-2">Prof51 is NOT a "fix your life" app. It's a "make life EASIER" app.</p>
                                        <p className="text-cyan-400 text-xs mb-1">→ Life falling apart? Prof51 catches you.</p>
                                        <p className="text-green-400 text-xs mb-1">→ Life going great? Prof51 saves you time.</p>
                                        <p className="text-pink-400 text-xs font-bold mt-2">Universal benefit. That's the sweet spot. ✓</p>
                                    </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-4 border-cyan-500 rounded-xl p-6 mt-4" style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)' }}>
                                    <p className="text-cyan-400 font-black text-2xl mb-3 text-center">⚡ THE WOW MOMENT (P2P TRUTH)</p>
                                    <p className="text-white text-sm mb-4 text-center">The simple power that changes everything. Zero niggle. Pure genius.</p>

                                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-lg p-4 mb-4" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}>
                                        <p className="text-pink-400 font-black text-xl mb-3 text-center">🔥 STUDENTS BECOME THE NETWORK</p>
                                        <p className="text-white text-xs mb-3 text-center">Not "using a network" - BEING the network.</p>

                                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-3">
                                            <p className="text-cyan-400 font-bold text-xs mb-2">THE SIMPLE TRUTH:</p>
                                            <p className="text-white text-xs mb-1">→ Every student with Prof51 = one node</p>
                                            <p className="text-white text-xs mb-1">→ Devices talk device-to-device (bluetooth/WiFi Direct)</p>
                                            <p className="text-white text-xs mb-1">→ No servers. No internet. No company in middle.</p>
                                            <p className="text-white text-xs mb-1">→ More students = STRONGER network (anti-fragile)</p>
                                            <p className="text-green-400 font-bold text-xs mt-2">Can't be shut down. Can't be blocked. Can't extract from it. ✓</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-3">
                                            <p className="text-green-400 font-black text-sm mb-2">📱 THE MAGIC USE CASE (EVERYONE GETS IT):</p>
                                            <p className="text-white font-bold text-xs mb-3">LOST & FOUND - SO SIMPLE IT'S GENIUS</p>

                                            <div className="space-y-2">
                                                <div className="bg-black/60 border border-cyan-500/50 rounded p-2">
                                                    <p className="text-cyan-400 font-bold text-xs mb-1">📱 LOST YOUR PHONE:</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Your phone broadcasts bluetooth ID</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Every student nearby with Prof51 = automatically helps locate</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Their device pings: "Phone detected in library"</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ You see location on map in real-time</p>
                                                    <p className="text-white text-xs mt-1 font-bold">Network finds it. Zero effort from anyone. ✓</p>
                                                </div>

                                                <div className="bg-black/60 border border-purple-500/50 rounded p-2">
                                                    <p className="text-purple-400 font-bold text-xs mb-1">💻 FORGOT YOUR LAPTOP:</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Left it in lecture hall 3 hours ago</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Other students walk past, their phones detect it</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ You get notification: "Laptop in Lecture Hall 4B"</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Someone picked it up? You see "Moving towards library"</p>
                                                    <p className="text-white text-xs mt-1 font-bold">Always know where your stuff is. ✓</p>
                                                </div>

                                                <div className="bg-black/60 border border-amber-500/50 rounded p-2">
                                                    <p className="text-amber-400 font-bold text-xs mb-1">🚲 BIKE STOLEN:</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Thief takes your bike with AirTag hidden inside</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ 1000+ students on campus = 1000+ detection points</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Bike passes students, mesh tracks movement</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ You see exact route: "Heading towards train station"</p>
                                                    <p className="text-white text-xs mt-1 font-bold">Can't hide from the mesh. Recovery rate 90%+. ✓</p>
                                                </div>

                                                <div className="bg-black/60 border border-pink-500/50 rounded p-2">
                                                    <p className="text-pink-400 font-bold text-xs mb-1">🎒 SOMEONE FINDS YOUR BAG:</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Kind student picks up your lost bag</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Their Prof51 detects bluetooth tag inside</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ Pop-up: "Found item belongs to [Your Name] - Tap to message"</p>
                                                    <p className="text-gray-300 text-xs mb-1">→ They message you instantly: "Got your bag, I'm in cafe"</p>
                                                    <p className="text-white text-xs mt-1 font-bold">Direct connection. Instant reunion. ✓</p>
                                                </div>
                                            </div>

                                            <p className="text-green-400 font-black text-sm mt-3 text-center">WHY THIS IS THE WOW:</p>
                                            <p className="text-white text-xs text-center mb-1">Not blockchain complexity. Not crypto confusion.</p>
                                            <p className="text-cyan-400 text-xs text-center mb-1">Simple: "I lost my phone. Network found it."</p>
                                            <p className="text-pink-400 font-bold text-xs text-center">EVERYONE needs this. EVERYONE gets it. EVERYONE spreads it. ♾️❤️♾️</p>
                                        </div>
                                    </div>

                                    <div className="bg-black border-2 border-purple-500 rounded-lg p-4 mb-3">
                                        <p className="text-purple-400 font-black text-sm mb-2">🌍 WHY IT'S UNSTOPPABLE:</p>
                                        <div className="space-y-2 text-xs">
                                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
                                                <p className="text-white font-bold mb-1">🇨🇳 CHINA BLOCKS INTERNET:</p>
                                                <p className="text-gray-300">→ Prof51 still works. Device-to-device, no servers.</p>
                                                <p className="text-green-400 font-bold">Can't block bluetooth/WiFi Direct. Physics wins. ✓</p>
                                            </div>

                                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
                                                <p className="text-white font-bold mb-1">🇮🇷 IRAN SHUTS DOWN WiFi:</p>
                                                <p className="text-gray-300">→ Students still share notes mesh-to-mesh.</p>
                                                <p className="text-green-400 font-bold">Regime can't stop Maxwell's equations. ✓</p>
                                            </div>

                                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
                                                <p className="text-white font-bold mb-1">🏛️ GOVERNMENT TRIES TO BAN:</p>
                                                <p className="text-gray-300">→ Too late. Already on 1M student devices.</p>
                                                <p className="text-green-400 font-bold">Can't ban physics. Can't uninstall from devices. ✓</p>
                                            </div>

                                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
                                                <p className="text-white font-bold mb-1">📶 NO SIGNAL LECTURE HALL:</p>
                                                <p className="text-gray-300">→ Still works. 50 students = strong local mesh.</p>
                                                <p className="text-green-400 font-bold">Better WITH no signal. Forces P2P. ✓</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-lg p-4">
                                        <p className="text-amber-400 font-black text-base mb-2 text-center">⚡ THE ZERO NIGGLE TRUTH:</p>
                                        <p className="text-white text-sm text-center mb-3">What amazes me? This:</p>

                                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-3">
                                            <p className="text-cyan-400 font-bold text-xs mb-2 text-center">LOST & FOUND IS THE TROJAN HORSE</p>
                                            <p className="text-gray-300 text-xs mb-2">Everyone needs it → Everyone downloads Prof51 → Everyone becomes a node</p>
                                            <p className="text-white text-xs mb-2">Then they discover:</p>
                                            <p className="text-green-400 text-xs mb-1">✓ Oh wait, I can share notes too</p>
                                            <p className="text-pink-400 text-xs mb-1">✓ Oh wait, I can find flatmates too</p>
                                            <p className="text-purple-400 text-xs mb-1">✓ Oh wait, I can swap textbooks too</p>
                                            <p className="text-amber-400 text-xs mb-1">✓ Oh wait, this is the whole student economy</p>
                                            <p className="text-white font-bold text-sm mt-2 text-center">Came for lost phone. Stayed for life transformation. ♾️❤️♾️</p>
                                        </div>

                                        <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                            <p className="text-green-400 font-black text-xs mb-2 text-center">THE SIMPLE POWER:</p>
                                            <p className="text-white text-xs text-center mb-2">Not complicated. Not technical. Just this:</p>
                                            <p className="text-pink-400 text-xs text-center font-bold mb-1">"Every student helps every other student"</p>
                                            <p className="text-cyan-400 text-xs text-center font-bold mb-1">"Automatically. Effortlessly. Always."</p>
                                            <p className="text-white text-xs text-center mb-2">Your phone lost? 1000 students automatically looking.</p>
                                            <p className="text-white text-xs text-center mb-2">Need notes? 1000 students already shared.</p>
                                            <p className="text-white text-xs text-center mb-2">Looking for flatmate? 1000 students matched to you.</p>
                                            <p className="text-amber-400 font-black text-sm text-center mt-3">THAT'S THE WOW. PURE. SIMPLE. UNSTOPPABLE. ♾️❤️♾️</p>
                                        </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-4 mt-4" style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.5)' }}>
                                        <p className="text-purple-400 font-black text-xl mb-3 text-center">🎉 P2P EVERYWHERE STUDENTS GO</p>
                                        <p className="text-white text-sm mb-3 text-center">Not just campus. EVERYWHERE students are = mesh network active.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                                                <p className="text-cyan-400 font-bold text-xs mb-2">🍕 RESTAURANTS:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Left your jacket at table</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 20 students eating there</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Their phones detect it</p>
                                                <p className="text-gray-300 text-xs mb-1">→ You get alert: "Jacket still at restaurant"</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Never lose stuff at restaurants ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-pink-500 rounded-lg p-3">
                                                <p className="text-pink-400 font-bold text-xs mb-2">🎵 CLUBS:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Phone slips out dancing</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 500 students in club</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Mesh tracks it every second</p>
                                                <p className="text-gray-300 text-xs mb-1">→ "Phone near DJ booth" → "Someone picked it up" → "Moving to bar"</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Find it even in chaos ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-amber-500 rounded-lg p-3">
                                                <p className="text-amber-400 font-bold text-xs mb-2">🎪 FESTIVALS:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Lost your mate in crowd</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 10,000 students at festival</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Their Prof51 = your location tracker</p>
                                                <p className="text-gray-300 text-xs mb-1">→ "Near main stage" → "Walking to food tents"</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Never lose your friends ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                                <p className="text-green-400 font-bold text-xs mb-2">🚆 TRAINS/BUSES:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Left bag on train</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Train moving, 50 students onboard</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Mesh still tracking it</p>
                                                <p className="text-gray-300 text-xs mb-1">→ "Bag detected, train heading to [Station]"</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Recover even in transit ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-purple-500 rounded-lg p-3">
                                                <p className="text-purple-400 font-bold text-xs mb-2">🏋️ GYMS:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Someone takes your locker</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Your stuff (with tag) moves</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 30 students working out</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Mesh tracks who took it</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Theft becomes impossible ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-red-500 rounded-lg p-3">
                                                <p className="text-red-400 font-bold text-xs mb-2">🏠 HOUSE PARTIES:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 100 people, chaos everywhere</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Can't find your keys</p>
                                                <p className="text-gray-300 text-xs mb-1">→ 40 students with Prof51</p>
                                                <p className="text-gray-300 text-xs mb-1">→ "Keys detected in kitchen"</p>
                                                <p className="text-green-400 font-bold text-xs mt-1">Find anything anywhere ✓</p>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-lg p-4 mt-4">
                                            <p className="text-amber-400 font-black text-sm mb-2 text-center">🌍 THE EXPLOSION:</p>
                                            <p className="text-white text-xs mb-3 text-center">Students go EVERYWHERE. Mesh goes with them.</p>

                                            <div className="bg-black border-2 border-cyan-500 rounded p-3 mb-3">
                                                <p className="text-cyan-400 font-bold text-xs mb-2">NETWORK EFFECT MADNESS:</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Campus: 30,000 students = strong mesh</p>
                                                <p className="text-gray-300 text-xs mb-1">→ City center: 5,000 students shopping = mesh covers downtown</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Nightclub: 500 students = mesh covers venue</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Festival: 10,000 students = mesh covers entire site</p>
                                                <p className="text-gray-300 text-xs mb-1">→ Train: 50 students = mesh moves city to city</p>
                                                <p className="text-white font-bold text-xs mt-2">Students ARE the infrastructure. Everywhere they go = coverage. ✓</p>
                                            </div>

                                            <div className="bg-black border-2 border-green-500 rounded p-3">
                                                <p className="text-green-400 font-black text-xs mb-2 text-center">WHY THIS EXPLODES ADOPTION:</p>
                                                <p className="text-white text-xs mb-2 text-center">Not just "useful on campus". Useful EVERYWHERE IN LIFE.</p>
                                                <p className="text-cyan-400 text-xs text-center mb-1">→ Lost phone at club? Found it.</p>
                                                <p className="text-pink-400 text-xs text-center mb-1">→ Can't find friend at festival? Located them.</p>
                                                <p className="text-purple-400 text-xs text-center mb-1">→ Bag stolen on train? Tracked it.</p>
                                                <p className="text-amber-400 text-xs text-center mb-1">→ Keys at house party? Found them.</p>
                                                <p className="text-white font-bold text-sm text-center mt-3">EVERY venue = use case. EVERY use = viral story. UNSTOPPABLE SPREAD. ♾️❤️♾️</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-lg p-4">
                                    <p className="text-purple-400 font-bold text-sm mb-2">💝 THE REAL MAGIC:</p>
                                    <p className="text-white text-xs mb-2">You can't explain it. You just FEEL it.</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Like when someone has your back without asking for anything</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Like when you help someone and they actually succeed</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Like when you're stressed but know you're not alone</p>
                                    <p className="text-gray-300 text-xs mb-1">→ Like when something actually helps instead of extracting</p>
                                    <p className="text-pink-400 font-bold text-xs mt-2">That feeling = why Prof51 will spread. Students FEEL the difference. ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-white rounded-lg p-4">
                            <p className="text-white font-bold text-sm mb-2">💯 THE VIBE:</p>
                            <p className="text-gray-300 mb-1">Not "this might be useful one day"</p>
                            <p className="text-gray-300 mb-1">But "this saved my arse TODAY"</p>
                            <p className="text-green-400 font-bold mt-2">Practical. Immediate. Actually helps. That's Prof51 ♾️❤️♾️</p>
                        </div>
                        </div>
                        </div>

                {/* WHAT EVERY STUDENT NEEDS (UNIVERSAL) */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-10 h-10 text-pink-400" />
                        <h2 className="text-pink-400 font-black text-xl font-mono">WHAT EVERY STUDENT NEEDS</h2>
                        <p className="text-gray-400 text-[10px] font-mono">(Edinburgh = rural India = Beijing)</p>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                        <div className="bg-black border-2 border-pink-500 rounded-lg p-3">
                            <p className="text-pink-400 font-bold mb-1">🍕 FOOD (universal)</p>
                            <p className="text-white">Every human needs to eat. Students broke everywhere.</p>
                            <p className="text-cyan-400 mt-1">Prof51: Direct to restaurants, save £5.64/order globally</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                            <p className="text-cyan-400 font-bold mb-1">🧠 HELP WITH STUDIES (universal)</p>
                            <p className="text-white">Homework is stressful in every language, every country.</p>
                            <p className="text-green-400 mt-1">Prof51: 235M students + AI = 24/7 global help network</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                            <p className="text-green-400 font-bold mb-1">💰 MONEY STRESS (universal)</p>
                            <p className="text-white">Students poor in Glasgow, Mumbai, Rio, Lagos, everywhere.</p>
                            <p className="text-purple-400 mt-1">Prof51: Budget tracker + earn P51 helping others</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-3">
                            <p className="text-purple-400 font-bold mb-1">💔 LONELINESS (universal)</p>
                            <p className="text-white">Isolation, anxiety, "am I the only one struggling?"</p>
                            <p className="text-pink-400 mt-1">Prof51: Anonymous peer support + find your people</p>
                        </div>

                        <div className="bg-black border-2 border-amber-500 rounded-lg p-3">
                            <p className="text-amber-400 font-bold mb-1">🏠 ACCOMMODATION (universal)</p>
                            <p className="text-white">Need somewhere safe to live. Dodgy landlords everywhere.</p>
                            <p className="text-cyan-400 mt-1">Prof51: Find flatmates + rate landlords + avoid scams</p>
                        </div>

                        <div className="bg-black border-2 border-red-500 rounded-lg p-3">
                            <p className="text-red-400 font-bold mb-1">🚗 TRANSPORT (universal)</p>
                            <p className="text-white">Getting to class, getting home safe, getting around.</p>
                            <p className="text-green-400 mt-1">Prof51: Direct to drivers, share rides, save money</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-lg p-4 mt-3">
                            <p className="text-green-400 font-bold text-sm mb-2">🌍 WHY PROF51 WORKS EVERYWHERE:</p>
                            <p className="text-white mb-1">✓ Works OFFLINE (villages with no internet)</p>
                            <p className="text-white mb-1">✓ P2P mesh (no servers needed)</p>
                            <p className="text-white mb-1">✓ FREE forever (works for poorest students)</p>
                            <p className="text-white mb-1">✓ Multi-language (AI translates real-time)</p>
                            <p className="text-white mb-1">✓ Encrypted (works in oppressive countries)</p>
                            <p className="text-white mb-1">✓ Zero extraction (circular love economy)</p>
                            <p className="text-cyan-400 font-bold mt-2">Student in rural Kenya = same needs as Edinburgh student</p>
                            <p className="text-pink-400 font-bold">Prof51 solves ALL needs in ONE place ♾️❤️♾️</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">🎯 NOT JUST "ANOTHER STUDENT APP":</p>
                            <p className="text-white mb-1">Other apps: ONE thing (notes, or food, or housing)</p>
                            <p className="text-white mb-1">Prof51: EVERYTHING a student needs to survive + thrive</p>
                            <p className="text-green-400 font-bold mt-2">It's your mate who helps with LIFE, not just one problem</p>
                        </div>
                    </div>
                </div>

                {/* WHAT */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-10 h-10 text-green-400" />
                        <div>
                            <h2 className="text-green-400 font-black text-xl font-mono">WHAT WE DO</h2>
                            <p className="text-cyan-400 text-xs font-mono font-bold">World's first student P2P mesh network</p>
                        </div>
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
                                <p className="text-gray-300 text-xs mb-2">→ Advanced students tutor beginners (earn P51)</p>
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
                        <div>
                            <h2 className="text-green-400 font-black text-xl font-mono">WHY THIS IS GENIUS</h2>
                            <p className="text-cyan-400 text-xs font-mono font-bold">Safe, trusted, student-to-student mutual aid at scale</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2">1️⃣ WORLD'S FIRST STUDENT P2P MESH</p>
                            <p className="text-white mb-1">AirTags = £35 each, corporate owned. Prof51 = FREE, student owned.</p>
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
                            <p className="text-cyan-400 font-bold mb-2">6️⃣ YOUR MATES KEEP AN EYE ON YOU</p>
                            <p className="text-white mb-1">Meeting someone to get your stuff? Your friends track you live.</p>
                            <p className="text-white mb-1">→ Share location with trusted mates (they see you moving real-time)</p>
                            <p className="text-white mb-1">→ Public spots only + Student ID check</p>
                            <p className="text-white mb-1">→ Not Craigslist (sketchy). Not Facebook (scams).</p>
                            <p className="text-green-400 font-bold mt-2">Your mates got your back. Always safe. ✓</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
                            <p className="text-purple-400 font-bold mb-2">7️⃣ BECOMES YOUR BEST MATE (REMEMBERS EVERYTHING)</p>
                            <p className="text-white mb-1">Come for: Lost phone → Found it in 5 mins (saved your arse)</p>
                            <p className="text-white mb-1">Stay for: Free AI homework help → Excel done in 30 seconds</p>
                            <p className="text-white mb-1">→ Saves you time (12 hours/week)</p>
                            <p className="text-white mb-1">→ Saves you money (£43/week)</p>
                            <p className="text-white mb-1">→ Keeps you SAFE (mates track you when meeting people)</p>
                            <p className="text-white mb-1">→ Remembers EVERYTHING you share (never loses a memory)</p>
                            <p className="text-white mb-1">→ But only what YOU choose to share (zero pressure)</p>
                            <p className="text-pink-400 font-bold mt-2">Proper best mate who's got your back 24/7. You'll naturally share everything. ♾️❤️♾️</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">8️⃣ CIRCULAR LOVE ECONOMY</p>
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
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4 mb-3" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                        <p className="text-green-400 font-black text-base font-mono mb-1">🌍 WORLD'S FIRST 🌍</p>
                        <p className="text-cyan-400 font-black text-sm font-mono mb-1">P2P Lost & Found Network for Students</p>
                        <p className="text-white text-xs font-mono">Safe • Trusted • Student-to-Student • Free Forever</p>
                    </div>
                    <p className="text-gray-600 text-[10px] font-mono">Student-owned company • UniversalFamily51</p>
                    <p className="text-gray-700 text-[9px] font-mono mt-1">(Co-Manager51 = Music industry, separate)</p>
                    <p className="text-pink-400 text-xs font-mono mt-2">♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}