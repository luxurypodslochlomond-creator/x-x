import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

/**
 * SCOTT WORK LOG - SESSION TRACKER
 * Captures all work from today's session with Scott
 * Protected admin page for me, Scott, and AI51 to review
 */

export default function ScottWorkLog() {
    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <Link to={createPageUrl('ScottManager')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK TO CB51</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Radio className="w-10 h-10 text-cyan-400" />
                    <div>
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">WORK LOG</h1>
                        <p className="text-gray-500 text-xs font-mono">Session: 6 Jan 2025</p>
                    </div>
                </div>
            </div>

            {/* SCOTT'S FLOOR DIAGRAMS */}
            <div className="mb-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-xl p-6">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">📄 SCOTT'S DIAGRAMS</h2>
                
                <div className="space-y-4">
                    <div className="bg-black border border-amber-500/50 rounded-lg p-4">
                        <h3 className="text-amber-400 font-bold mb-2">1. LOGIN FLOW</h3>
                        <p className="text-white text-sm font-mono mb-2">Email/Password → Admin Home</p>
                        <p className="text-gray-400 text-xs">Manager sees list of artists</p>
                    </div>

                    <div className="bg-black border border-amber-500/50 rounded-lg p-4">
                        <h3 className="text-amber-400 font-bold mb-2">2. ADMIN HOME</h3>
                        <p className="text-white text-sm font-mono mb-2">List: ARTIST 1, ARTIST 2, ARTIST 3, etc</p>
                        <p className="text-gray-400 text-xs">Simple - just names, click to open</p>
                    </div>

                    <div className="bg-black border border-amber-500/50 rounded-lg p-4">
                        <h3 className="text-amber-400 font-bold mb-2">3. ARTIST HOME PAGE</h3>
                        <p className="text-white text-sm font-mono mb-2">4 boxes: LIVE, SESSIONS, FINANCE/ADMIN, TASKS</p>
                        <p className="text-white text-sm font-mono mb-2">+ CALENDAR (widget) at bottom</p>
                        <p className="text-gray-400 text-xs">Note: Artists go straight here on login, not admin home</p>
                    </div>

                    <div className="bg-black border border-amber-500/50 rounded-lg p-4">
                        <h3 className="text-amber-400 font-bold mb-2">4. LIVE SECTION</h3>
                        <p className="text-white text-sm font-mono mb-2">3 subsections: BOOKINGS, LOGISTICS, ADMIN</p>
                        <p className="text-gray-400 text-xs">Need to build these + integrate AI51 gig workflow</p>
                    </div>
                </div>
            </div>

            {/* WHAT'S BUILT TODAY */}
            <div className="mb-8 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6">
                <h2 className="text-green-400 font-black text-xl font-mono mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    COMPLETED TODAY
                </h2>
                
                <div className="space-y-2 text-sm font-mono">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">Admin home page (ScottManager) - list of artists</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">Add artist page - simple form, no TYPE dropdown</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">Artist home page with 4 sections + calendar</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">Remove artist button (for everyone, not just admin)</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">CB51 branding (Radio icon, cyan colors) - removed old Kingdom Crown</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">Public access to CB51 pages (no login required to view)</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white">About page (ScottAbout) explaining CB51</p>
                    </div>
                </div>
            </div>

            {/* NEXT STEPS */}
            <div className="mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-xl p-6">
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    NEXT STEPS
                </h2>
                
                <div className="space-y-2 text-sm font-mono">
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-cyan-500 rounded-sm mt-0.5 flex-shrink-0"></div>
                        <p className="text-white">Build LIVE subsections: Bookings, Logistics, Admin</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-cyan-500 rounded-sm mt-0.5 flex-shrink-0"></div>
                        <p className="text-white">Integrate AI51 gig workflow into LIVE section</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-sm mt-0.5 flex-shrink-0"></div>
                        <p className="text-white">Test with real artist data (Scott to add first artist)</p>
                    </div>
                </div>
            </div>

            {/* SCOTT'S QUESTIONS */}
            <div className="mb-8 bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 rounded-xl p-6">
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    OUTSTANDING QUESTIONS
                </h2>
                
                <div className="space-y-3">
                    <div className="bg-black border border-pink-500/50 rounded-lg p-3">
                        <p className="text-pink-400 font-bold text-sm mb-1">Q: Add hypothetical test artist?</p>
                        <p className="text-gray-400 text-xs">Scott said no - will add real artist when ready</p>
                    </div>

                    <div className="bg-black border border-pink-500/50 rounded-lg p-3">
                        <p className="text-pink-400 font-bold text-sm mb-1">Q: What goes in LIVE subsections?</p>
                        <p className="text-gray-400 text-xs">To be determined - need Scott's input on specific needs</p>
                    </div>

                    <div className="bg-black border border-pink-500/50 rounded-lg p-3">
                        <p className="text-pink-400 font-bold text-sm mb-1">Q: How does AI51 gig workflow integrate?</p>
                        <p className="text-gray-400 text-xs">Need to map existing gig offer flow to new LIVE section</p>
                    </div>
                </div>
            </div>

            {/* KEY DECISIONS */}
            <div className="mb-8 bg-black border-2 border-gray-700 rounded-xl p-6">
                <h2 className="text-white font-black text-xl font-mono mb-4">🔑 KEY DECISIONS</h2>
                
                <div className="space-y-2 text-sm font-mono">
                    <p className="text-white">✓ No TYPE field - artists are always "artist" type</p>
                    <p className="text-white">✓ Public pages - anyone can view CB51 without login</p>
                    <p className="text-white">✓ Remove artist available to all users, not just admin</p>
                    <p className="text-white">✓ Manager sees admin home, artists see their artist home</p>
                    <p className="text-white">✓ CB51 branding (Radio icon, cyan colors, not Kingdom)</p>
                </div>
            </div>

            {/* IMPORTANT CONTEXT */}
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-2 border-purple-500 rounded-xl p-6">
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">💡 CONTEXT</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <p className="text-white">CB51 = Citizen Band 51 = Music manager tool</p>
                    <p className="text-white">Built from Scott's floor diagrams - keep it simple as fuck</p>
                    <p className="text-white">Scott = Manager + band member (30+ years experience)</p>
                    <p className="text-white">Gill = Family director + operations</p>
                    <p className="text-white">Goal: Save managers 10 hours/week, zero stress</p>
                    <p className="text-cyan-400 font-bold mt-3">Mobile-first, works offline, P2P sync ♾️📻♾️</p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">Last updated: 6 Jan 2025</p>
                <p className="text-gray-700 text-[10px] font-mono mt-1">Scott + BRO51 + AI51 ♾️❤️♾️</p>
            </div>
        </div>
    );
}