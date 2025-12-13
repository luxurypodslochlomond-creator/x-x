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
            
            {/* HEADER - COOLASFUCK */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[3px] rounded-xl animate-pulse" style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.6)' }}>
                    <div className="bg-black rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <Kingdom51Crown8Bit size={56} animate={true} />
                                <COOLASFUCKHeart className="absolute -top-2 -right-2 w-8 h-8 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: 'monospace' }}>
                                    WHITE-LABEL
                                </h1>
                                <p className="text-pink-500 text-sm font-mono font-black">COOLASFUCK • WORKS NOW • LA READY</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 p-4 rounded-lg mb-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-pink-400" />
                                <p className="text-pink-400 font-black text-sm">IT ACTUALLY WORKS - SCOTT USES IT DAILY</p>
                            </div>
                            <p className="text-gray-300 text-xs font-mono mb-2">
                                12 artists • Tours • Contracts • Publishing • All offline • Zero bullshit ✓
                            </p>
                            <p className="text-cyan-400 text-xs font-mono font-bold">
                                Not a concept. Not coming soon. LIVE NOW. ♾️❤️♾️
                            </p>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-500/50 p-4 rounded-lg">
                            <p className="text-amber-400 font-bold text-sm mb-2">💰 PRICING TIERS:</p>
                            <ul className="text-gray-400 text-xs space-y-1 font-mono">
                                <li>• £100/month - Solo managers (1-5 artists)</li>
                                <li>• £300/month - Agencies (10-30 artists)</li>
                                <li>• £2,000/month - Labels (unlimited + white-label)</li>
                                <li className="text-pink-400 font-bold">• COOLASFUCK music distribution: Artists keep 90%</li>
                                <li>• Crypto-secure, works offline, PDF exports</li>
                            </ul>
                        </div>
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

                    <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-500 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Music className="w-5 h-5 text-cyan-400" />
                            <p className="text-cyan-400 font-bold text-xs">THE DEMO (WORKS ON YOUR DEVICE):</p>
                        </div>
                        <ul className="text-gray-300 text-xs font-mono space-y-1">
                            <li>1. Show them demo mode (tap above) ✓</li>
                            <li>2. Navigate through 3 demo artists ✓</li>
                            <li>3. Show calendar, tasks, invoices ✓</li>
                            <li>4. Export PDF report LIVE ✓</li>
                            <li>5. Turn on airplane mode - STILL WORKS ✓</li>
                            <li className="text-pink-400 font-bold">6. Show COOLASFUCK - artists keep 90% ✓</li>
                        </ul>
                        <p className="text-cyan-400 text-xs font-mono font-bold mt-2">
                            Zero WiFi needed. Device-to-device. P2P mesh. COOLASFUCK. ♾️❤️♾️
                        </p>
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
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <COOLASFUCKWaves className="w-6 h-6 text-green-400" animate={true} />
                            <p className="text-green-400 font-black text-sm">✓ LIVE RIGHT NOW - WORKING</p>
                        </div>
                        <ul className="text-gray-300 text-xs font-mono space-y-1">
                            <li>• Offline storage (works in shed/van/plane) ✓</li>
                            <li>• 12 real artists managed daily ✓</li>
                            <li>• AI assistant (contracts, publishing help) ✓</li>
                            <li>• PDF exports for accountants ✓</li>
                            <li>• Demo mode (test with sample data) ✓</li>
                            <li>• White-label branding (logo/colors) ✓</li>
                            <li>• P2P mesh sync (team coordination offline) ✓</li>
                            <li>• Voice commands + photo capture ✓</li>
                            <li className="text-pink-400 font-bold">• COOLASFUCK integration (artists keep 90%) ✓</li>
                        </ul>
                        <p className="text-green-400 text-xs font-mono font-bold mt-3">
                            Not a pitch deck. REAL TOOL. REAL USERS. REAL REVENUE POTENTIAL. ♾️❤️♾️
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

            {/* COOLASFUCK LINK */}
            <Link to={createPageUrl('ForMusicians')} className="block mb-4">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <COOLASFUCKHeart className="w-10 h-10 text-pink-400 animate-pulse" />
                        <div>
                            <p className="text-pink-400 font-black text-xl font-mono">COOLASFUCK</p>
                            <p className="text-gray-400 text-xs font-mono">Artists keep 90% • Zero extraction</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-2">
                        White-label this too → Your artists upload directly, keep 90%, you take your cut ✓
                    </p>
                    <p className="text-pink-400 text-xs font-mono font-bold">
                        KINGDOM51 + COOLASFUCK = Complete artist management + distribution ♾️❤️♾️
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