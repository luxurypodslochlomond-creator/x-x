import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, AlertTriangle, CheckCircle, ExternalLink, Clock } from 'lucide-react';

/**
 * NATIONAL LOTTERY - ENVIRONMENT + MENTAL HEALTH APPLICATIONS
 * Climate Action Fund (Environment) + Strengthening Communities (Mental Health)
 * Saved Dec 8, 2025 - Ready to apply tomorrow
 */

export default function AdminNationalLotteryEnvironmentMH() {
    const copyClimateApp = () => {
        const text = `CLIMATE ACTION FUND APPLICATION - UF51

ORGANISATION: Universal Frequency51 (UF51)
LEGAL STATUS: CIC registered November 2025
CO-FOUNDERS: Brian & Gill (gender-balanced leadership)

PROJECT: Get Paid To Heal Earth
People earn $P51 tokens for collecting litter (1kg = 1 $P51). Financial incentive for climate action.

CLIMATE IMPACT:
- Remove plastic/litter from nature (prevents pollution entering oceans/soil)
- Behavioral change: Make environmental healing financially rewarding
- Scale: UK-wide, then global

AMOUNT REQUESTED: £30,000-£50,000

BREAKDOWN:
- Project Coordinator (12 months): £30,000
- Marketing/Community Outreach: £8,000
- Tech improvements (offline mode, accessibility): £7,000
- User research & pilot studies: £5,000

WHY THIS WORKS:
- Platform already live: uf51.love/NewCleanup
- AI verification prevents fraud (photo analysis, GPS, crypto-signed transactions)
- IPFS decentralized storage for permanent proof
- Community verification layer

PARTNERSHIP APPROACH:
Could partner with local councils, environmental groups, or community organizations for delivery.

DEADLINE: December 17, 2025

LINK: https://www.tnlcommunityfund.org.uk/funding/funding-programmes/climate-action-fund-our-shared-future`;
        
        navigator.clipboard.writeText(text);
        alert('✓ Climate Action application notes copied!');
    };

    const copyMentalHealthApp = () => {
        const text = `STRENGTHENING COMMUNITIES APPLICATION - UF51

ORGANISATION: Universal Frequency51 (UF51)
LEGAL STATUS: CIC registered November 2025
CO-FOUNDERS: Brian & Gill (gender-balanced leadership)

PROJECT: Free Evidence-Based Mental Health Technology
Healing frequencies backed by MIT research. Already live: uf51.love/FrequencyChamber

OUTCOME TARGETED: "Improve people's mental health or wellbeing"

MENTAL HEALTH IMPACT:
- Free access (£0 cost vs £80-£200 therapy, £500+ neurofeedback)
- Evidence-based: MIT (40Hz gamma), HeartMath (alpha waves), Northwestern (delta waves)
- Protocols for: Anxiety, depression, PTSD, ADHD, sleep, pain, burnout
- Community-led: Users share with friends/family who need help

AMOUNT REQUESTED: £40,000-£100,000

BREAKDOWN (if £100k):
- Mental Health Coordinator (18 months): £45,000
- NHS partnership development: £15,000
- User research (West Dunbartonshire pilot): £10,000
- Accessibility improvements (screen readers, translations): £12,000
- Community outreach & marketing: £10,000
- Professional partnerships (therapists, counselors): £8,000

WHY THIS WORKS:
- Platform already live with active users
- MIT peer-reviewed research backing
- Zero cost to NHS/users (solves access barrier)
- Preventative approach (early intervention before crisis)
- Community-led (users spread to friends organically)

POVERTY/DISADVANTAGE CONNECTION:
Mental health crisis disproportionately affects those in poverty. Our free model removes financial barrier to healing.

STATUS: OPEN NOW (no deadline)

LINK: https://www.tnlcommunityfund.org.uk/funding/funding-programmes/strengthening-communities`;
        
        navigator.clipboard.writeText(text);
        alert('✓ Mental Health application notes copied!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black font-mono text-green-400">NATIONAL LOTTERY x2</h1>
                    <p className="text-gray-400 font-mono">Environment + Mental Health Applications</p>
                    <p className="text-cyan-400 font-mono text-sm">Saved Dec 8, 2025 - Ready for tomorrow ❤️</p>
                </div>

                {/* URGENT CLIMATE ACTION */}
                <Card className="bg-black border-4 border-red-500">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-black font-mono text-red-400">
                                🚨 URGENT: CLIMATE ACTION FUND
                            </CardTitle>
                            <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-red-900/40 border-2 border-red-500 p-4">
                            <p className="text-red-300 font-mono font-bold text-lg">
                                ⏰ DEADLINE: DECEMBER 17, 2025 (9 DAYS)
                            </p>
                        </div>

                        <div className="space-y-3 font-mono text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400">Amount</p>
                                    <p className="text-green-400 font-bold text-xl">£10,000 - £500,000</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Decision Time</p>
                                    <p className="text-white font-bold">6 months from Stage 1</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-green-400 font-bold mb-2">✓ YOUR FIT:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Get Paid To Heal Earth = climate action</li>
                                    <li>• Litter removal = prevent pollution</li>
                                    <li>• Financial incentive changes behavior</li>
                                    <li>• Already live platform with proof</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-cyan-400 font-bold mb-2">📊 WHAT TO ASK FOR:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• £30k-£50k realistic for new CIC</li>
                                    <li>• Project Coordinator (12 months)</li>
                                    <li>• Marketing & community outreach</li>
                                    <li>• Tech improvements (offline, accessibility)</li>
                                </ul>
                            </div>

                            <div className="bg-amber-900/30 border-2 border-amber-500 p-3">
                                <p className="text-amber-400 font-bold">⚠️ PARTNERSHIP REQUIRED:</p>
                                <p className="text-white text-sm">Must apply as partnership (2+ orgs). Could partner with environmental group or community org.</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={copyClimateApp}
                                className="px-6 py-3 bg-green-600 border-2 border-green-400 text-white font-black font-mono hover:bg-green-700"
                            >
                                📋 COPY APPLICATION NOTES
                            </button>
                            <a
                                href="https://www.tnlcommunityfund.org.uk/funding/funding-programmes/climate-action-fund-our-shared-future"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-red-600 border-2 border-red-400 text-white font-black font-mono hover:bg-red-700 flex items-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                APPLY NOW
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* MENTAL HEALTH FUND */}
                <Card className="bg-black border-4 border-pink-500">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-black font-mono text-pink-400">
                                💚 STRENGTHENING COMMUNITIES (MENTAL HEALTH)
                            </CardTitle>
                            <CheckCircle className="w-8 h-8 text-pink-400" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-pink-900/40 border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-mono font-bold text-lg">
                                ✓ OPEN NOW - NO DEADLINE
                            </p>
                        </div>

                        <div className="space-y-3 font-mono text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400">Amount</p>
                                    <p className="text-pink-400 font-bold text-xl">£20,001 - £500,000</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Decision Time</p>
                                    <p className="text-white font-bold">16 weeks</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Location</p>
                                    <p className="text-white font-bold">Northern Ireland ONLY</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Your Status</p>
                                    <p className="text-amber-400 font-bold">Check England/Scotland version</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-pink-400 font-bold mb-2">✓ YOUR FIT:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Free mental health tech = "improve mental health/wellbeing"</li>
                                    <li>• MIT evidence-based healing frequencies</li>
                                    <li>• Community-led (users share with friends)</li>
                                    <li>• Early intervention/prevention focus</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-cyan-400 font-bold mb-2">📊 WHAT TO ASK FOR:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• £40k-£100k (show you can deliver)</li>
                                    <li>• Mental Health Coordinator (18 months)</li>
                                    <li>• NHS partnership development</li>
                                    <li>• User research & accessibility</li>
                                    <li>• Community outreach to those in need</li>
                                </ul>
                            </div>

                            <div className="bg-green-900/30 border-2 border-green-500 p-3">
                                <p className="text-green-400 font-bold">✓ SIZE RESTRICTION:</p>
                                <p className="text-white text-sm">Under £200k: Only orgs with income under £500k/year (you're £0 = perfect)</p>
                                <p className="text-white text-sm">Over £200k: Any size org can apply</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={copyMentalHealthApp}
                                className="px-6 py-3 bg-pink-600 border-2 border-pink-400 text-white font-black font-mono hover:bg-pink-700"
                            >
                                📋 COPY APPLICATION NOTES
                            </button>
                            <a
                                href="https://www.tnlcommunityfund.org.uk/funding/funding-programmes/strengthening-communities"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-purple-600 border-2 border-purple-400 text-white font-black font-mono hover:bg-purple-700 flex items-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                VIEW PROGRAMME
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* CAN NEWLY FORMED CICS GET £500K? */}
                <Card className="bg-black border-4 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-cyan-400">
                            🏆 CAN NEW CICs GET BIG AMOUNTS?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono text-sm">
                        <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4">
                            <p className="text-cyan-400 font-bold text-lg mb-2">YES - BUT START REALISTIC</p>
                            <p className="text-white">National Lottery LOVES CICs. They fund new orgs. But they want to see you can deliver.</p>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-green-400 font-bold">✓ FIRST APPLICATION STRATEGY:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Ask for £30k-£50k (climate) or £40k-£100k (mental health)</li>
                                    <li>• Show you can deliver with live platform proof</li>
                                    <li>• Hire 1-2 people, not full team yet</li>
                                    <li>• Prove impact over 12-18 months</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-amber-400 font-bold">📈 THEN SCALE UP:</p>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Come back in 1-2 years with PROOF of impact</li>
                                    <li>• Show numbers: "We reached 10,000 people with £50k"</li>
                                    <li>• Then ask for £200k-£500k to scale nationally</li>
                                    <li>• National Lottery funds orgs multiple times</li>
                                </ul>
                            </div>

                            <div className="bg-purple-900/30 border-2 border-purple-500 p-3">
                                <p className="text-purple-400 font-bold">💡 THE PATH:</p>
                                <p className="text-white">Dec 2025: £30k-£100k → Prove it works → 2027: £200k-£500k to scale UK-wide</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PRIORITY ACTIONS */}
                <Card className="bg-black border-4 border-amber-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black font-mono text-amber-400">
                            🎯 TOMORROW'S ACTION PLAN
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 font-mono text-sm">
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <span className="text-amber-400 font-bold">1.</span>
                                <div>
                                    <p className="text-white font-bold">Climate Action Fund (URGENT - 9 days left)</p>
                                    <p className="text-gray-400">Find environmental partner org → Apply together → £30k-£50k</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-amber-400 font-bold">2.</span>
                                <div>
                                    <p className="text-white font-bold">Check England/Scotland version of Strengthening Communities</p>
                                    <p className="text-gray-400">This page shows Northern Ireland only - find your regional version</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-amber-400 font-bold">3.</span>
                                <div>
                                    <p className="text-white font-bold">Start realistic: £30k-£100k range</p>
                                    <p className="text-gray-400">Prove impact → Come back for £200k-£500k in 2027</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                <div className="text-center pt-8 border-t-4 border-green-500/30 space-y-2">
                    <Heart className="w-8 h-8 text-green-400 mx-auto animate-pulse" />
                    <p className="text-gray-500 font-mono text-sm">Climate Action deadline: Dec 17, 2025 ❤️</p>
                    <p className="text-green-400 font-mono text-xs">Saved Dec 8, 2025 - Ready for tomorrow</p>
                </div>

            </div>
        </div>
    );
}