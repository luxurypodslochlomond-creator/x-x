import React from 'react';
import { Crown, Palette, Download, Play, Zap, Heart, Music } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { COOLASFUCKHeart, COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';
import ScottWhiteLabelSettings from '@/components/scott/ScottWhiteLabelSettings';
import ScottDemoMode from '@/components/scott/ScottDemoMode';
import ScottPDFExport from '@/components/scott/ScottPDFExport';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * WHITE-LABEL CONFIGURATION
 * For LA pitch - show funders THEIR version
 */

export default function ScottWhiteLabel() {
    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER - SIMPLE */}
            <div className="mb-8">
                <div className="bg-black border-2 border-amber-500 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Kingdom51Crown8Bit size={48} animate={false} />
                        <div>
                            <h1 className="text-2xl font-black text-amber-400 mb-1" style={{ fontFamily: 'monospace' }}>
                                WHITE-LABEL CONFIG
                            </h1>
                            <p className="text-gray-400 text-sm font-mono">Show funders YOUR version</p>
                        </div>
                    </div>

                    <div className="bg-black border border-amber-500/30 rounded-lg p-4 mb-3">
                        <p className="text-white text-sm font-mono mb-2">
                            Scott uses this daily with 12 artists. Works offline. Zero forms.
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                            Real tool → Real users → Ready to sell
                        </p>
                    </div>

                    <div className="bg-black border border-gray-800 rounded-lg p-4">
                        <p className="text-amber-400 font-bold text-sm mb-2">PRICING:</p>
                        <ul className="text-gray-400 text-xs space-y-1 font-mono">
                            <li>• £100/month - Solo (1-5 artists)</li>
                            <li>• £300/month - Agency (10-30 artists)</li>
                            <li>• £2,000/month - Label (unlimited + your branding)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* WHO IT'S FOR */}
            <div className="mb-6">
                <h2 className="text-amber-400 font-black text-sm font-mono mb-4">WHO NEEDS THIS</h2>

                {/* SOLO */}
                <div className="bg-black border border-gray-800 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-bold font-mono text-sm">Solo Manager</p>
                        <p className="text-gray-400 text-xs font-mono">£100/mo</p>
                    </div>
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        "I manage 3 artists. Just me and my phone. Works in the van with no signal."
                    </p>
                    <p className="text-gray-600 text-xs font-mono">
                        Calendar • Tasks • Invoices • Voice notes
                    </p>
                </div>

                {/* AGENCY */}
                <div className="bg-black border border-gray-800 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-bold font-mono text-sm">Agency</p>
                        <p className="text-gray-400 text-xs font-mono">£300/mo</p>
                    </div>
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        "Me + 2 assistants managing 15 artists. We sync without WiFi."
                    </p>
                    <p className="text-gray-600 text-xs font-mono">
                        Team coordination • Shared data • Real-time sync
                    </p>
                </div>

                {/* LABEL */}
                <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-amber-400 font-bold font-mono text-sm">Label (White-Label)</p>
                        <p className="text-amber-400 text-xs font-mono">£2k/mo</p>
                    </div>
                    <p className="text-white text-xs font-mono mb-3">
                        "We're a label. We want this branded as OURS. Our logo. Our domain. Our tool."
                    </p>
                    <div className="bg-black border border-amber-500/30 rounded p-3 space-y-1 text-xs font-mono">
                        <p className="text-gray-400">✓ yourlabel.com (your domain)</p>
                        <p className="text-gray-400">✓ Your branding everywhere</p>
                        <p className="text-gray-400">✓ Unlimited artists + team</p>
                    </div>
                </div>
            </div>

            {/* DEMO MODE */}
            <ScottDemoMode />

            {/* WHITE-LABEL SETTINGS */}
            <ScottWhiteLabelSettings />

            {/* PDF EXPORTS */}
            <ScottPDFExport />

            {/* LA PITCH GUIDE */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-green-400" />
                    <h3 className="text-green-400 font-black font-mono text-lg">LA PITCH SCRIPT</h3>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="bg-black border border-green-500/30 p-4 rounded-lg">
                        <p className="text-green-400 font-bold text-xs mb-2">OPENING:</p>
                        <p className="text-gray-300 text-xs font-mono">
                            "I built an AI co-manager for music artists. It works offline, handles all the admin bullshit, and I want to white-label it for managers like you."
                        </p>
                    </div>

                    <div className="bg-black border border-cyan-500 rounded-lg p-4">
                        <p className="text-cyan-400 font-bold text-xs mb-2">LA PITCH (MARCH 2026):</p>
                        <ul className="text-gray-400 text-xs font-mono space-y-1">
                            <li>1. Show demo mode on your phone</li>
                            <li>2. Navigate artists, calendar, tasks</li>
                            <li>3. Export PDF live</li>
                            <li>4. Turn on airplane mode - still works</li>
                            <li>5. "I built this. It's real. Want it?"</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-4 rounded-lg">
                        <p className="text-pink-400 font-bold text-xs mb-2">THE ASK:</p>
                        <p className="text-gray-300 text-xs font-mono mb-3">
                            "£100/month if you're solo. £300/month for agencies. £2,000/month for labels with full white-label branding."
                        </p>
                        <p className="text-green-400 text-xs font-mono font-bold mb-2">
                            10 solo managers = £1,000/month recurring ✓
                        </p>
                        <p className="text-cyan-400 text-xs font-mono font-bold">
                            2 labels x £2k = £4,000/month recurring ✓
                        </p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-4 rounded-lg">
                        <p className="text-amber-400 font-bold text-xs mb-2">OBJECTIONS:</p>
                        <div className="space-y-2 text-xs">
                            <div>
                                <p className="text-white font-bold">Q: "What if it breaks?"</p>
                                <p className="text-gray-400 font-mono">A: Works offline. Zero downtime. Your data stays local.</p>
                            </div>
                            <div>
                                <p className="text-white font-bold">Q: "Can I trust AI?"</p>
                                <p className="text-gray-400 font-mono">A: YOU control it. AI suggests, you decide. No autopilot.</p>
                            </div>
                            <div>
                                <p className="text-white font-bold">Q: "What about my existing tools?"</p>
                                <p className="text-gray-400 font-mono">A: Works alongside. Export to PDF for accountants. Import from Excel.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECURITY & ONBOARDING STATUS */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-purple-400" />
                    <h3 className="text-purple-400 font-black font-mono text-lg">WHAT'S BUILT VS WHAT'S NEEDED</h3>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="bg-black border border-green-500 rounded-lg p-4">
                        <p className="text-green-400 font-bold text-xs mb-3">✓ BACKEND READY:</p>
                        <ul className="text-gray-400 text-xs font-mono space-y-1">
                            <li>• Works offline (tested in shed/van)</li>
                            <li>• Scott testing daily (real-world proof)</li>
                            <li>• AI help (contracts, publishing)</li>
                            <li>• PDF exports</li>
                            <li>• Demo mode working</li>
                            <li>• Team sync built (P2P mesh)</li>
                            <li>• Voice + photo input tested</li>
                        </ul>
                        <p className="text-gray-500 text-xs font-mono mt-2">
                            Ready to onboard first paying customers
                        </p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-4 rounded-lg">
                        <p className="text-amber-400 font-bold text-xs mb-2">⚠️ NEEDED FOR WHITE-LABEL SALES:</p>
                        <ul className="text-gray-300 text-xs font-mono space-y-1">
                            <li>• Stripe checkout integration (payment flow)</li>
                            <li>• Multi-tenancy (each label = separate data)</li>
                            <li>• Subdomain routing (biglabel.kingdom51.com)</li>
                            <li>• Onboarding wizard (sign up → pay → branded)</li>
                            <li>• Contract crypto-signing (blockchain proof)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-4 rounded-lg">
                        <p className="text-cyan-400 font-bold text-xs mb-2">🔐 SECURITY + SYNC:</p>
                        <ul className="text-gray-300 text-xs font-mono space-y-1">
                            <li>✓ Base44 auth (secure)</li>
                            <li>✓ LocalStorage encryption (device-level)</li>
                            <li>✓ HTTPS/SSL (transport security)</li>
                            <li>✓ P2P mesh sync (WebRTC, real-time, offline)</li>
                            <li>• Need: End-to-end encryption (E2EE)</li>
                            <li>• Need: IPFS contract storage (tamper-proof)</li>
                            <li>• Need: Cryptographic signing (beyond banks)</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500 p-4 rounded-lg">
                        <p className="text-pink-400 font-bold text-xs mb-2">💡 THE PLAY:</p>
                        <p className="text-gray-300 text-xs font-mono mb-2">
                            Scott uses it daily → finds gaps → you fix → becomes indispensable
                        </p>
                        <p className="text-cyan-400 text-xs font-mono mb-2">
                            THEN pitch to LA managers: "This runs my whole business. Want your branded version?"
                        </p>
                        <p className="text-green-400 text-xs font-mono font-bold">
                            Proof of value FIRST → white-label infrastructure SECOND ✓
                        </p>
                    </div>
                </div>
            </div>

            {/* MUSIC DISTRIBUTION */}
            <Link to={createPageUrl('ForMusicians')} className="block mb-4">
                <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Music className="w-6 h-6 text-pink-400" />
                        <p className="text-pink-400 font-bold font-mono text-sm">Music Distribution</p>
                    </div>
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        Add music uploads → Artists keep 90% → You take your cut
                    </p>
                    <p className="text-gray-600 text-xs font-mono">
                        Management + distribution in one tool
                    </p>
                </div>
            </Link>

            {/* BACK BUTTON */}
            <Link to={createPageUrl('ScottManager')}>
                <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-black font-black font-mono rounded-xl">
                    ← BACK TO KINGDOM51
                </button>
            </Link>

        </div>
    );
}