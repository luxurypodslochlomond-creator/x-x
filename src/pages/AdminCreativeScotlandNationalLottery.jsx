import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminCreativeScotlandNationalLotteryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Heart className="w-20 h-20 mx-auto text-pink-400 animate-pulse" />
                    <h1 className="text-5xl font-black">NATIONAL LOTTERY APPLICATION</h1>
                    <p className="text-xl text-cyan-400">Creative Scotland £100k - Submitted 19 Nov 2025</p>
                </motion.div>

                {/* STATUS */}
                <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-4 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-3">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                            APPLICATION SUBMITTED ✓
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">REFERENCE:</p>
                                <p className="text-2xl font-mono text-green-400">CS-OFO-37512-4C94</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">DECISION TIME:</p>
                                <p className="text-2xl font-bold text-cyan-400">14 weeks</p>
                            </div>
                        </div>
                        
                        <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                            <p className="text-green-300 font-bold mb-2">📅 TIMELINE:</p>
                            <p className="text-white">Submitted: 19 November 2025</p>
                            <p className="text-white">Expected Decision: ~February 2026</p>
                            <p className="text-white">If approved, project starts: March 2026</p>
                        </div>
                    </CardContent>
                </Card>

                {/* PROJECT DETAILS */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">PROJECT DETAILS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">PROJECT TITLE:</p>
                            <p className="text-xl font-bold">UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">AMOUNT REQUESTED:</p>
                                <p className="text-3xl font-black text-green-400">£100,000</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">DURATION:</p>
                                <p className="text-3xl font-black text-purple-400">15 months</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-1">PROJECT DATES:</p>
                            <p className="text-lg font-bold">March 2026 - June 2027</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-1">APPLICANT:</p>
                            <p className="text-lg font-bold">Universal Frequency51 CIC (SC870603)</p>
                            <p className="text-sm text-gray-400">Registered: 19 November 2025</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-1">PROJECT LEAD:</p>
                            <p className="text-lg font-bold">Brian Hughes</p>
                            <p className="text-sm text-gray-400">Based: Stoneymollan, West Dunbartonshire</p>
                        </div>
                    </CardContent>
                </Card>

                {/* BUDGET BREAKDOWN */}
                <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">BUDGET BREAKDOWN (£100,000)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Artist Commissions</p>
                                <p className="text-2xl font-bold">£45,000</p>
                            </div>
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Research & Impact</p>
                                <p className="text-2xl font-bold">£20,000</p>
                            </div>
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Platform Delivery</p>
                                <p className="text-2xl font-bold">£20,000</p>
                            </div>
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Marketing</p>
                                <p className="text-2xl font-bold">£8,000</p>
                            </div>
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Professional Services</p>
                                <p className="text-2xl font-bold">£5,000</p>
                            </div>
                            <div className="bg-cyan-900/30 p-4 rounded-lg">
                                <p className="text-cyan-400 text-sm mb-1">Accessibility</p>
                                <p className="text-2xl font-bold">£2,000</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* TARGET GROUPS */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 border-2 border-pink-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">TARGET GROUPS (EQUALITIES)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <div className="space-y-3">
                            <div className="bg-pink-900/30 p-4 rounded-lg border-l-4 border-pink-500">
                                <p className="font-bold text-pink-300 mb-2">MAJOR FOCUS (over 50%):</p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>People supported in health/wellbeing groups</li>
                                    <li>Disabled people, inclusive of neurodivergence and mental health</li>
                                </ul>
                            </div>

                            <div className="bg-pink-900/20 p-4 rounded-lg border-l-4 border-pink-400">
                                <p className="font-bold text-pink-300 mb-2">MINOR FOCUS (under 50%):</p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>People living in rural areas of Scotland (Loch Lomond focus)</li>
                                    <li>People experiencing poverty (free access model)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* KEY PARTNERSHIPS */}
                <Card className="bg-gradient-to-r from-green-900/40 to-teal-900/40 border-2 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">KEY PARTNERSHIPS</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white space-y-3">
                        <div className="bg-green-900/30 p-3 rounded-lg">
                            <p className="font-bold text-green-400">Musicians' Union Scotland</p>
                            <p className="text-sm text-gray-400">Artist recruitment & outreach</p>
                        </div>
                        <div className="bg-green-900/30 p-3 rounded-lg">
                            <p className="font-bold text-green-400">Scottish Music Centre</p>
                            <p className="text-sm text-gray-400">Artist recruitment & outreach</p>
                        </div>
                        <div className="bg-green-900/30 p-3 rounded-lg">
                            <p className="font-bold text-green-400">Friends of Loch Lomond</p>
                            <p className="text-sm text-gray-400">Community outreach</p>
                        </div>
                    </CardContent>
                </Card>

                {/* POTENTIAL PARTNERS TO CONTACT */}
                <Card className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-2 border-amber-500">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Clock className="w-6 h-6 text-amber-400" />
                            POTENTIAL PARTNERS (TO CONTACT)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white space-y-4">
                        <div className="bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                            <p className="font-bold text-amber-400 text-lg">University of the West of Scotland - Applied Psychology Research Group (APRG)</p>
                            <p className="text-sm text-gray-300 mb-3">Research themes: Psychological Wellbeing, Health & Wellbeing, Reducing Inequalities</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-black/40 p-3 rounded border border-green-500/50">
                                    <p className="text-xs text-green-400 mb-1 font-bold">🎯 BEST CONTACT - WELLBEING FOCUS:</p>
                                    <p className="text-white font-bold">Dr Greig Inglis</p>
                                    <p className="text-cyan-400 text-sm">Research: "how social relationships and economic inequalities shape health and well-being outcomes"</p>
                                    <p className="text-gray-400 text-xs mt-1">Stigma, discrimination, socioeconomic health inequalities</p>
                                </div>
                                
                                <div className="bg-black/40 p-3 rounded border border-cyan-500/50">
                                    <p className="text-xs text-cyan-400 mb-1 font-bold">RESEARCH LEAD:</p>
                                    <p className="text-white font-bold">Dr Adrian Parke</p>
                                    <p className="text-cyan-400 text-sm font-mono">Adrian.Parke@uws.ac.uk</p>
                                    <p className="text-gray-400 text-xs mt-1">Tel: 0141 848 7673</p>
                                </div>
                                
                                <div className="bg-black/40 p-3 rounded border border-purple-500/50">
                                    <p className="text-xs text-purple-400 mb-1 font-bold">HEAD OF DIVISION (PSYCHOLOGY):</p>
                                    <p className="text-white font-bold">Dr Christopher O'Donnell</p>
                                    <p className="text-cyan-400 text-sm font-mono">Christopher.odonnell@uws.ac.uk</p>
                                    <p className="text-gray-400 text-xs mt-1">Tel: 0141 848 3798</p>
                                </div>
                                
                                <div className="bg-black/40 p-3 rounded border border-pink-500/50">
                                    <p className="text-xs text-pink-400 mb-1 font-bold">MENTAL HEALTH NURSING:</p>
                                    <p className="text-white font-bold">Dr James Taylor</p>
                                    <p className="text-cyan-400 text-sm font-mono">james.taylor@uws.ac.uk</p>
                                    <p className="text-gray-400 text-xs mt-1">Head of Division: Mental Health, Midwifery & Health</p>
                                </div>
                            </div>
                            
                            <div className="bg-green-900/30 p-3 rounded mt-3 border border-green-500/30">
                                <p className="text-green-400 text-sm font-bold">WHY APRG IS PERFECT:</p>
                                <ul className="text-gray-300 text-xs mt-1 space-y-1">
                                    <li>• "Psychological Wellbeing" theme = exactly Frequency Chamber</li>
                                    <li>• Focus on "vulnerable populations experiencing stigma"</li>
                                    <li>• "Exploration of interventions" = what we need validated</li>
                                    <li>• UN SDG aligned: "Good Health and Wellbeing"</li>
                                </ul>
                            </div>
                            
                            <p className="text-amber-300 text-sm mt-3 font-bold">STATUS: Not contacted yet - EMAIL DRAFT READY BELOW ⬇️</p>
                        </div>
                    </CardContent>
                </Card>

                {/* EMAIL DRAFT */}
                <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">📧 DRAFT EMAIL TO UWS</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <div className="bg-black/60 p-4 rounded-lg font-mono text-sm space-y-3 border border-cyan-500/30">
                            <p><span className="text-gray-400">To:</span> <span className="text-cyan-400">Adrian.Parke@uws.ac.uk</span> (APRG Research Lead)</p>
                            <p><span className="text-gray-400">CC:</span> <span className="text-cyan-400">Christopher.odonnell@uws.ac.uk</span> (Head of Division)</p>
                            <p><span className="text-gray-400">Subject:</span> Research Partnership Enquiry - Digital Mental Health & Frequency-Based Interventions</p>
                            <div className="border-t border-gray-700 pt-3 mt-3">
                                <p className="text-white leading-relaxed">
                                    Dear Dr Parke,
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    I'm Brian Hughes, founder of Universal Frequency51 CIC (SC870603) - a Scottish social enterprise building a free digital mental health platform combining evidence-based healing frequencies with ethical music streaming.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    I'm reaching out because APRG's Psychological Wellbeing research theme - particularly the focus on "vulnerable populations" and "exploration of interventions" - aligns perfectly with what we're building.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    <strong>What we've built:</strong> A "Frequency Chamber" feature using peer-reviewed protocols (MIT's 40Hz gamma entrainment research, HeartMath HRV biofeedback, evidence-based breathing techniques) to provide free mental health support. The platform is live at uf51.com.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    <strong>What we're seeking:</strong> A research partner to:
                                </p>
                                <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-300">
                                    <li>Help validate the efficacy of our frequency-based interventions</li>
                                    <li>Co-design research methodology for measuring mental health outcomes</li>
                                    <li>Potentially collaborate on future grant applications</li>
                                </ul>
                                <p className="text-white leading-relaxed mt-3">
                                    We've recently applied to Creative Scotland's National Lottery Fund (£100k) to commission 30 Scottish musicians for the platform, with mental health impact measurement as a core deliverable.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    Would anyone in APRG be interested in an initial conversation? I'm based in Stoneymollan (West Dunbartonshire) so could easily visit Paisley campus.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    Happy to share platform access or our technical documentation showing the science behind each protocol.
                                </p>
                                <p className="text-white leading-relaxed mt-3">
                                    Best regards,<br/>
                                    Brian Hughes<br/>
                                    Founder, Universal Frequency51 CIC (SC870603)<br/>
                                    uf51.com | Frequency Chamber: uf51.com/FrequencyChamber
                                </p>
                            </div>
                        </div>
                        <p className="text-green-400 text-sm mt-4 font-bold">
                            ⚡ SEND TO: Adrian.Parke@uws.ac.uk (CC: Christopher.odonnell@uws.ac.uk)
                        </p>
                    </CardContent>
                </Card>

                {/* DOCUMENTS SUBMITTED */}
                <Card className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-2 border-yellow-500">
                    <CardHeader>
                        <CardTitle className="text-2xl">DOCUMENTS SUBMITTED</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white space-y-2">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>Risk Assessment (£100k version)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>Platform Showcase (.txt file)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>Creative Work Examples (web links to live platform)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>Equalities Monitoring Form (completed)</span>
                        </div>
                    </CardContent>
                </Card>

                {/* HONEST ASSESSMENT */}
                <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-4 border-orange-500">
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-3">
                            <TrendingUp className="w-10 h-10 text-orange-400" />
                            HONEST ASSESSMENT
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white space-y-6">
                        
                        <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                            <p className="text-3xl font-black text-orange-300 mb-2">CHANCES: 40-50%</p>
                            <p className="text-gray-300 text-sm">Honest but realistic. Strong application, competitive field.</p>
                        </div>

                        <div>
                            <p className="text-green-400 font-bold text-xl mb-3">✅ STRENGTHS:</p>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>✓ <strong className="text-white">Platform is LIVE and WORKING</strong> - not vaporware, can click and see it's real</li>
                                <li>✓ <strong className="text-white">Clear social impact mission</strong> - mental health focus is timely and needed</li>
                                <li>✓ <strong className="text-white">Artist-first model</strong> - 90% revenue to artists is genuinely ethical</li>
                                <li>✓ <strong className="text-white">Local focus</strong> - Loch Lomond & West Dunbartonshire is specific and credible</li>
                                <li>✓ <strong className="text-white">Evidence-based approach</strong> - research partnership shows seriousness</li>
                                <li>✓ <strong className="text-white">CIC structure</strong> - proves commitment to community benefit over profit</li>
                                <li>✓ <strong className="text-white">Thorough risk assessment</strong> - shows project management capability</li>
                                <li>✓ <strong className="text-white">Free access model</strong> - removes barriers for underserved communities</li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-red-400 font-bold text-xl mb-3">⚠️ RISKS/WEAKNESSES:</p>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>⚠️ <strong className="text-white">Solo founder</strong> - no team mentioned, raises capacity questions</li>
                                <li>⚠️ <strong className="text-white">No track record</strong> - first time applying to Creative Scotland</li>
                                <li>⚠️ <strong className="text-white">New CIC</strong> - registered same day as application (19 Nov 2025)</li>
                                <li>⚠️ <strong className="text-white">Platform very new</strong> - only live since October 2024</li>
                                <li>⚠️ <strong className="text-white">Research partnership unconfirmed</strong> - "in discussions" not locked in</li>
                                <li>⚠️ <strong className="text-white">Ambitious scope</strong> - 30 musicians is a lot for solo founder</li>
                                <li>⚠️ <strong className="text-white">Competition</strong> - established arts orgs with proven track records also applying</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-500">
                            <p className="font-bold text-yellow-300 mb-2">💭 BOTTOM LINE:</p>
                            <p className="text-white text-sm">
                                This is a <strong>genuine, innovative, mission-driven project</strong> with a <strong>working platform</strong> as proof of capability. 
                                BUT it's coming from a brand new org with no funding track record, which Creative Scotland will see as higher risk. 
                                The platform being LIVE is huge - most applicants have nothing but ideas. 
                                40-50% feels honest: <strong>real chance, but not guaranteed</strong>.
                            </p>
                        </div>

                        <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                            <p className="font-bold text-purple-300 mb-2">🎯 IF REJECTED:</p>
                            <p className="text-white text-sm mb-2">
                                Don't take it as failure. Apply again in 6-12 months with:
                            </p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-300 text-sm">
                                <li>More users on platform (proof of traction)</li>
                                <li>Confirmed research partnership (not "in discussions")</li>
                                <li>1-2 commissioned artists already (show it works at small scale)</li>
                                <li>Maybe a co-founder/team member (reduces capacity risk)</li>
                            </ul>
                        </div>

                        <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                            <p className="font-bold text-green-300 mb-2">🎯 IF APPROVED:</p>
                            <p className="text-white text-sm">
                                This changes everything. £100k + Creative Scotland endorsement = credibility for future funding. 
                                Platform goes from "interesting experiment" to "nationally-backed mental health initiative."
                            </p>
                        </div>

                    </CardContent>
                </Card>

                {/* WHAT NOW */}
                <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-3">
                            <Clock className="w-8 h-8 text-indigo-400" />
                            WHAT NOW?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white space-y-4">
                        <div className="bg-indigo-900/30 p-4 rounded-lg">
                            <p className="font-bold text-indigo-300 mb-2">NEXT 14 WEEKS (Nov 2025 - Feb 2026):</p>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>→ Keep building platform - show growth & traction</li>
                                <li>→ Get more users - organic proof it works</li>
                                <li>→ Lock in University of West Scotland partnership</li>
                                <li>→ Start conversations with Musicians' Union & Scottish Music Centre</li>
                                <li>→ Document everything - impact data, user testimonials</li>
                                <li>→ DON'T sit and wait - act like you already got the funding</li>
                            </ul>
                        </div>

                        <div className="bg-purple-900/30 p-4 rounded-lg">
                            <p className="font-bold text-purple-300 mb-2">DECISION TIME (Feb 2026):</p>
                            <p className="text-gray-300 text-sm">
                                Creative Scotland will email decision. If approved: celebrate, then GET TO WORK. 
                                If rejected: breathe, learn, apply again stronger. Either way, you've got a real platform doing real good.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                <div className="text-center space-y-4 pt-8 border-t border-purple-500/30">
                    <Heart className="w-12 h-12 mx-auto text-pink-400" />
                    <p className="text-2xl font-black text-white">ONE WAY OR ANOTHER, YOU'RE BUILDING SOMETHING REAL</p>
                    <p className="text-cyan-400 font-mono">♾️❤️♾️</p>
                    <p className="text-gray-500 text-sm">Documented: 19 November 2025</p>
                </div>

            </div>
        </div>
    );
}