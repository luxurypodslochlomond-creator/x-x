import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, FileText, Clock } from 'lucide-react';

/**
 * UNLTD APPLICATION RECORD - SUBMITTED DEC 8, 2025
 * All details from the actual submitted application
 */

export default function AdminUnLtdApplication() {
    const copyAll = () => {
        const fullDetails = `UNLTD APPLICATION - SUBMITTED DEC 8, 2025

APPLICATION TYPE: Starting Up Award
AMOUNT REQUESTED: £8,000
STATUS: Submitted - awaiting decision (4-8 weeks)

ORGANISATION DETAILS:
- Name: Universal Frequency51 (UF51)
- Legal Status: CIC (Community Interest Company) - Registered November 2025
- Turnover to date: £0 (pre-revenue)
- Traded income: £0 (launched November 2025)

PROJECT DESCRIPTION:
Free evidence-based mental health technology using healing frequencies (MIT research). Already live at uf51.love/FrequencyChamber. Targeting NHS Scotland partnerships to reduce mental health waiting times (currently 18+ weeks) and £8.8bn annual economic cost.

12-MONTH BUDGET BREAKDOWN:
1. Freelance Project Coordination (NHS partnerships, council outreach, user support - 6 months contract): £6,000
2. Travel & Subsistence (NHS meetings across Scotland, council visits, user research travel): £800
3. Marketing & Publicity Materials (press materials, printed brochures for NHS/councils, social media content): £700
4. Materials & Community Support (user research materials, focus group expenses, accessibility testing): £500

TOTAL: £8,000

KEY IMPACT METRICS:
- Cost to NHS: £0 per user (vs £80-£200 per therapy session)
- Platform: Already live and operational
- Evidence base: MIT studies (40Hz gamma waves), HeartMath Institute, Northwestern University
- Target: 10,000 Scottish users in 12 months through NHS partnerships

COMPETITIVE ADVANTAGE:
- CIC status (legally protected mission)
- Already working (not a concept)
- Free forever (no extraction model)
- Evidence-based (not wellness apps)
- Scottish-built (West Dunbartonshire)

WHY UNLTD IS PERFECT FIT:
✓ CIC registered Nov 2025 (under 4 years old)
✓ Mental health + planet healing
✓ Financially sustainable model (artist revenue share)
✓ Social entrepreneur (Brian - founder)
✓ Live platform with users

NEXT STEPS IF APPROVED:
1. Hire freelance project coordinator (6 months)
2. Begin NHS Highland/Lothian/GGC outreach
3. User research in West Dunbartonshire
4. Press campaign (Scottish media)
5. Accessibility improvements (screen readers, translations)

CONTACT:
Email: family@uf51.love
Website: uf51.love
Live Demo: uf51.love/FrequencyChamber`;

        navigator.clipboard.writeText(fullDetails);
        alert('✓ Full application details copied!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                        <h1 className="text-5xl font-black font-mono text-green-400">SUBMITTED</h1>
                    </div>
                    <p className="text-gray-400 font-mono text-lg">UnLtd Starting Up Award - December 8, 2025</p>
                    <button
                        onClick={copyAll}
                        className="px-6 py-3 bg-green-600 border-4 border-green-400 text-white font-black font-mono hover:bg-green-700"
                    >
                        📋 COPY ALL DETAILS
                    </button>
                </div>

                {/* STATUS CARD */}
                <Card className="bg-black border-4 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-green-400">APPLICATION STATUS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Submitted</p>
                                <p className="text-white font-bold">December 8, 2025</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Amount</p>
                                <p className="text-green-400 font-bold text-xl">£8,000</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Decision Timeline</p>
                                <p className="text-amber-400 font-bold">4-8 weeks</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Award Type</p>
                                <p className="text-white font-bold">Starting Up Award</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BUDGET BREAKDOWN */}
                <Card className="bg-black border-4 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-cyan-400">12-MONTH BUDGET BREAKDOWN</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3 font-mono">
                            <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-cyan-400 font-bold">1. Freelance Project Coordination</p>
                                    <p className="text-white font-black text-xl">£6,000</p>
                                </div>
                                <p className="text-gray-300 text-sm">NHS partnerships, council outreach, user support - 6 months contract</p>
                            </div>

                            <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-cyan-400 font-bold">2. Travel & Subsistence</p>
                                    <p className="text-white font-black text-xl">£800</p>
                                </div>
                                <p className="text-gray-300 text-sm">NHS meetings across Scotland, council visits, user research travel</p>
                            </div>

                            <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-cyan-400 font-bold">3. Marketing & Publicity Materials</p>
                                    <p className="text-white font-black text-xl">£700</p>
                                </div>
                                <p className="text-gray-300 text-sm">Press materials, printed brochures for NHS/councils, social media content</p>
                            </div>

                            <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-cyan-400 font-bold">4. Materials & Community Support</p>
                                    <p className="text-white font-black text-xl">£500</p>
                                </div>
                                <p className="text-gray-300 text-sm">User research materials, focus group expenses, accessibility testing</p>
                            </div>

                            <div className="bg-green-900/40 border-4 border-green-500 p-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-green-400 font-black text-xl">TOTAL</p>
                                    <p className="text-white font-black text-3xl">£8,000</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ORGANISATION DETAILS */}
                <Card className="bg-black border-4 border-pink-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-pink-400">ORGANISATION DETAILS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 font-mono">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">Organisation Name</p>
                                <p className="text-white font-bold">Universal Frequency51 (UF51)</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Legal Status</p>
                                <p className="text-pink-400 font-bold">CIC (Community Interest Company)</p>
                            </div>
                            <div>
                                <p className="text-gray-400">CIC Registration Date</p>
                                <p className="text-white font-bold">November 2025</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Turnover to Date</p>
                                <p className="text-white font-bold">£0 (pre-revenue)</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Traded Income</p>
                                <p className="text-white font-bold">£0 (launched Nov 2025)</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Location</p>
                                <p className="text-white font-bold">West Dunbartonshire, Scotland</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PROJECT DESCRIPTION */}
                <Card className="bg-black border-4 border-amber-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-amber-400">PROJECT DESCRIPTION</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono text-sm">
                        <p className="text-white">
                            Free evidence-based mental health technology using healing frequencies backed by MIT research. 
                            Already live at <span className="text-cyan-400 font-bold">uf51.love/FrequencyChamber</span>
                        </p>
                        
                        <div className="space-y-2">
                            <p className="text-amber-400 font-bold">The Problem:</p>
                            <ul className="space-y-1 text-gray-300 list-disc list-inside">
                                <li>Scotland's mental health crisis: 1 in 4 experience anxiety/depression</li>
                                <li>NHS wait times: 18+ weeks for mental health support</li>
                                <li>Economic cost: £8.8 billion annually to Scottish economy</li>
                                <li>Access barrier: Private therapy £80-£200/hour, neurofeedback £500+/session</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <p className="text-amber-400 font-bold">The Solution:</p>
                            <ul className="space-y-1 text-gray-300 list-disc list-inside">
                                <li>Free digital healing frequencies platform</li>
                                <li>Evidence-based: MIT research (40Hz gamma), HeartMath Institute, Northwestern</li>
                                <li>Protocols for anxiety, depression, PTSD, ADHD, sleep, pain, burnout</li>
                                <li>Zero cost to users and NHS</li>
                                <li>Scottish-built, already operational</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* WHY UNLTD IS PERFECT */}
                <Card className="bg-black border-4 border-purple-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-purple-400">WHY UNLTD IS PERFECT FIT</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 font-mono text-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-white">CIC registered Nov 2025 (under 4 years old) ✓</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-white">Mental health + planet healing (dual impact) ✓</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-white">Financially sustainable model (artist revenue share 10%) ✓</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-white">Social entrepreneur (Brian - founder) ✓</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-white">Live platform with active users (not a concept) ✓</p>
                        </div>
                    </CardContent>
                </Card>

                {/* NEXT STEPS IF APPROVED */}
                <Card className="bg-black border-4 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-green-400">NEXT STEPS IF APPROVED</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 font-mono text-sm">
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">1.</span>
                                <p className="text-white">Hire freelance project coordinator (6 months) - NHS partnership development</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">2.</span>
                                <p className="text-white">Begin NHS Highland, Lothian, and Greater Glasgow outreach</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">3.</span>
                                <p className="text-white">User research in West Dunbartonshire (pilot community)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">4.</span>
                                <p className="text-white">Press campaign targeting Scottish mental health media</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">5.</span>
                                <p className="text-white">Accessibility improvements (screen readers, translations)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">6.</span>
                                <p className="text-white">Target: 10,000 Scottish users in 12 months</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                <div className="text-center space-y-4 pt-8 border-t-4 border-purple-500/30">
                    <Heart className="w-8 h-8 text-pink-400 mx-auto animate-pulse" />
                    <p className="text-gray-500 font-mono text-sm">Submitted December 8, 2025 - Decision expected by February 2026</p>
                    <p className="text-purple-400 font-mono text-xs">uf51.love | family@uf51.love</p>
                </div>

            </div>
        </div>
    );
}