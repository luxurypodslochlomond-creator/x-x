import React, { useEffect } from 'react';
import { Radio, ArrowLeft, Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * TOMORROW'S PLAN - CB51 NEXT LEVEL
 * What we did today + what's next
 * For Scott, Joe, Denver, and the team
 */

export default function ScottTomorrowPlan() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Tomorrow's Plan | CB51";
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            {/* HEADER */}
            <div className="mb-8 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center gap-3">
                    <Radio className="w-10 h-10 text-cyan-400" />
                    <div>
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">TOMORROW'S PLAN</h1>
                        <p className="text-gray-500 text-sm font-mono">CB51 Next Level • 6 Jan 2026</p>
                    </div>
                </div>
            </div>

            {/* WHAT WE DID TODAY */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Check className="w-6 h-6 text-green-400" />
                    <h2 className="text-green-400 font-black text-xl font-mono">DONE TODAY ✓</h2>
                </div>
                
                <div className="bg-black/60 rounded-lg p-4">
                    <p className="text-white font-bold font-mono mb-2">Added "TIME SAVED" metric</p>
                    <p className="text-gray-400 text-sm font-mono mb-3">
                        Admin home now shows total hours saved by AI (parsing + drafting + chasing).
                        Proof for investors that CB51 = measurable time savings.
                    </p>
                    <div className="bg-green-500/20 border border-green-500 rounded p-3 text-center">
                        <p className="text-green-400 font-black text-2xl font-mono">X HOURS SAVED</p>
                        <p className="text-green-300 text-xs font-mono mt-1">per week/month - quantifiable ROI</p>
                    </div>
                </div>
            </div>

            {/* NEXT LEVEL - 5 AUTOMATIONS */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-cyan-400 font-black text-xl font-mono">NEXT LEVEL</h2>
                </div>

                <p className="text-gray-400 text-sm font-mono mb-6">
                    Go from "AI assistant" to "full automation" - Scott clicks approve, everything happens.
                </p>

                <div className="space-y-4">
                    
                    {/* 1. EMAIL FORWARDING */}
                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-pink-500">
                        <p className="text-pink-400 font-black font-mono mb-2">1. EMAIL FORWARDING</p>
                        <p className="text-white text-sm font-mono mb-2">
                            Scott forwards gig emails to <span className="text-cyan-400">gigs@cb51.com</span> → auto-parses
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            Zero copy-paste. Just forward email, done.
                        </p>
                    </div>

                    {/* 2. AUTO-SEND RESPONSES */}
                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-green-500">
                        <p className="text-green-400 font-black font-mono mb-2">2. AUTO-SEND RESPONSES</p>
                        <p className="text-white text-sm font-mono mb-2">
                            Scott clicks "SEND ACCEPTANCE" → AI actually sends the email to promoter
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            No more copy-paste into Gmail. CB51 sends it.
                        </p>
                    </div>

                    {/* 3. WHATSAPP BAND VOTING */}
                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-purple-500">
                        <p className="text-purple-400 font-black font-mono mb-2">3. WHATSAPP BAND VOTING</p>
                        <p className="text-white text-sm font-mono mb-2">
                            Band gets WhatsApp message with voting link → vote in 10 seconds
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            Faster than email, works offline, instant notifications.
                        </p>
                    </div>

                    {/* 4. AUTO CALENDAR SYNC */}
                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-amber-500">
                        <p className="text-amber-400 font-black font-mono mb-2">4. AUTO CALENDAR SYNC</p>
                        <p className="text-white text-sm font-mono mb-2">
                            Accepted gigs → automatically added to Scott's calendar
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            Google Calendar integration. Zero manual entry.
                        </p>
                    </div>

                    {/* 5. SMART CHASING */}
                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-red-500">
                        <p className="text-red-400 font-black font-mono mb-2">5. SMART CHASING</p>
                        <p className="text-white text-sm font-mono mb-2">
                            AI chases promoter if no response in 3 days
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            Polite follow-ups. Never miss a gig because of slow replies.
                        </p>
                    </div>

                </div>

                {/* IMPACT */}
                <div className="mt-6 bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 rounded-lg p-4 text-center">
                    <p className="text-pink-400 font-black text-lg font-mono mb-2">
                        FULL AUTOMATION = 10X MORE POWERFUL
                    </p>
                    <p className="text-white text-sm font-mono mb-2">
                        Not just "saves time" - it's "Scott clicks once, CB51 handles everything"
                    </p>
                    <p className="text-gray-400 text-xs font-mono">
                        That's the pitch. That's unstoppable.
                    </p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Tomorrow's Plan</p>
                <p className="text-gray-700 text-[10px] font-mono mt-1">For Scott, Joe, Denver, and the team ♾️❤️♾️</p>
            </div>
        </div>
    );
}