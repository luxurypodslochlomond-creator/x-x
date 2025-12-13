import React from 'react';
import { Crown, Palette, Download, Play } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
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
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Kingdom51Crown8Bit size={56} animate={true} />
                            <div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: 'monospace' }}>
                                    WHITE-LABEL CONFIG
                                </h1>
                                <p className="text-amber-500/80 text-sm font-mono">LA pitch ready</p>
                            </div>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-500/50 p-4 rounded-lg">
                            <p className="text-amber-400 font-bold text-sm mb-2">💰 LA PITCH:</p>
                            <ul className="text-gray-400 text-xs space-y-1 font-mono">
                                <li>• Rebrand with THEIR logo + colors</li>
                                <li>• Demo mode - test with sample artists</li>
                                <li>• PDF exports for accountants</li>
                                <li>• £50/month solo or £200/month agency</li>
                                <li>• White-label ready NOW</li>
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

                    <div className="bg-black border border-cyan-500/30 p-4 rounded-lg">
                        <p className="text-cyan-400 font-bold text-xs mb-2">THE DEMO:</p>
                        <ul className="text-gray-300 text-xs font-mono space-y-1">
                            <li>1. Show them demo mode (tap above)</li>
                            <li>2. Navigate through 3 demo artists</li>
                            <li>3. Show calendar, tasks, invoices</li>
                            <li>4. Export PDF report live</li>
                            <li>5. Show offline mode (airplane mode)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-4 rounded-lg">
                        <p className="text-pink-400 font-bold text-xs mb-2">THE ASK:</p>
                        <p className="text-gray-300 text-xs font-mono mb-3">
                            "£50/month per artist you manage. I white-label it with your branding. You keep control. I handle the tech."
                        </p>
                        <p className="text-green-400 text-xs font-mono font-bold">
                            10 managers x 5 artists each = £2,500/month recurring ✓
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

            {/* BACK BUTTON */}
            <Link to={createPageUrl('ScottManager')}>
                <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-black font-black font-mono">
                    ← BACK TO KINGDOM51
                </button>
            </Link>

        </div>
    );
}