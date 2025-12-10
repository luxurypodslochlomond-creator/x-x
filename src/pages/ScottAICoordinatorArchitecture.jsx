import React from 'react';
import { Brain, Mail, Bell, Users, Calendar, Zap } from 'lucide-react';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';

/**
 * AI COORDINATOR ARCHITECTURE
 * Technical blueprint for Phase 2 - the AI orchestration layer
 * Based on Scott's requirements from WhatsApp convo
 */

export default function ScottAICoordinatorArchitecture() {
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER - 8-BIT */}
                <div className="mb-8 pb-6 border-b-4 border-cyan-500" style={{ boxShadow: '0 4px 0 rgba(0,0,0,0.5)' }}>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Gill51Sunglasses8Bit size={28} animate={true} />
                        <div className="h-8 w-px bg-cyan-500/30"></div>
                        <KingdomCrown8Bit size={40} animate={true} />
                        <div className="h-8 w-px bg-cyan-500/30"></div>
                        <Gill51Sunglasses8Bit size={28} animate={true} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-cyan-400 tracking-tighter leading-none mb-1" style={{ 
                            fontFamily: 'monospace',
                            textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
                        }}>AI COORD</h1>
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-2" style={{ imageRendering: 'pixelated' }}></div>
                        <p className="text-[11px] text-amber-400 tracking-[0.2em] font-black" style={{ fontFamily: 'monospace' }}>PHASE 2 BLUEPRINT</p>
                    </div>
                </div>

                {/* PHASE 1 - 8-BIT */}
                <div className="bg-black border-4 border-green-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(16, 185, 129, 0.5)', imageRendering: 'pixelated' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-4 h-4 bg-green-500" style={{ imageRendering: 'pixelated' }}></div>
                        <h2 className="text-xl font-black text-green-400" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>PHASE 1 DONE</h2>
                    </div>
                    <div className="space-y-2 text-white" style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                        <p>• ROSTER + CALENDAR</p>
                        <p>• TASKS + NOTES</p>
                        <p>• INVOICES + EXPENSES</p>
                        <p>• AI EMAIL DRAFTS</p>
                        <p>• 100% OFFLINE MODE</p>
                        <p>• AUTO SYNC</p>
                    </div>
                </div>

                {/* PHASE 2 - 8-BIT */}
                <div className="bg-black border-4 border-cyan-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(34, 211, 238, 0.5)', imageRendering: 'pixelated' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-6 h-6 text-cyan-400" strokeWidth={3} />
                        <h2 className="text-xl font-black text-cyan-400" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>PHASE 2 BLUEPRINT</h2>
                    </div>
                    
                    <div className="space-y-6">
                        
                        {/* USE CASE 1 */}
                        <div className="bg-black border-4 border-pink-500 p-4" style={{ imageRendering: 'pixelated' }}>
                            <h3 className="text-lg font-black text-pink-400 mb-3" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>
                                1. GIG OFFERS
                            </h3>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>→ EMAIL ARRIVES</p>
                                <p>→ AI SCANS + EXTRACTS</p>
                                <p>→ PUSH TO BAND/CREW</p>
                                <p>→ COLLECT VOTES</p>
                                <p>→ AI DRAFTS REPLY</p>
                                <p>→ SCOTT APPROVES</p>
                                <p>→ AUTO SEND</p>
                            </div>
                        </div>

                        {/* USE CASE 2 */}
                        <div className="bg-black border-4 border-purple-500 p-4" style={{ imageRendering: 'pixelated' }}>
                            <h3 className="text-lg font-black text-purple-400 mb-3" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>
                                2. SESSION BOOKING
                            </h3>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>→ ARTIST REQUESTS COLLAB</p>
                                <p>→ AI CHECKS RELATIONSHIP</p>
                                <p>→ AI DRAFTS INTRO</p>
                                <p>→ SCOTT REVIEWS</p>
                                <p>→ AI COORDINATES TIME</p>
                                <p>→ AUTO ADD TO CALENDAR</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TECH REQUIREMENTS - 8-BIT */}
                <div className="bg-black border-4 border-amber-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(245, 158, 11, 0.5)', imageRendering: 'pixelated' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-amber-400" strokeWidth={3} />
                        <h2 className="text-xl font-black text-amber-400" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>TECH STACK</h2>
                    </div>
                    
                    <div className="space-y-6">
                        
                        {/* EMAIL */}
                        <div className="bg-black border-2 border-green-500 p-3" style={{ imageRendering: 'pixelated' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4 text-green-400" strokeWidth={3} />
                                <h3 className="text-sm font-black text-green-400" style={{ fontFamily: 'monospace' }}>EMAIL</h3>
                            </div>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>• GMAIL API</p>
                                <p>• READ + SEND</p>
                                <p>• AUTO PARSE</p>
                            </div>
                        </div>

                        {/* PUSH */}
                        <div className="bg-black border-2 border-pink-500 p-3" style={{ imageRendering: 'pixelated' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Bell className="w-4 h-4 text-pink-400" strokeWidth={3} />
                                <h3 className="text-sm font-black text-pink-400" style={{ fontFamily: 'monospace' }}>PUSH</h3>
                            </div>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>• WEB PUSH API</p>
                                <p>• MOBILE + DESKTOP</p>
                                <p>• TAP TO VOTE</p>
                            </div>
                        </div>

                        {/* VOTING */}
                        <div className="bg-black border-2 border-purple-500 p-3" style={{ imageRendering: 'pixelated' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-purple-400" strokeWidth={3} />
                                <h3 className="text-sm font-black text-purple-400" style={{ fontFamily: 'monospace' }}>VOTING</h3>
                            </div>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>• YES/NO + REASON</p>
                                <p>• 24H DEADLINE</p>
                                <p>• AI CONSENSUS</p>
                            </div>
                        </div>

                        {/* AI ENGINE */}
                        <div className="bg-black border-2 border-cyan-500 p-3" style={{ imageRendering: 'pixelated' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                                <h3 className="text-sm font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>AI ENGINE</h3>
                            </div>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>• BASE44 LLM</p>
                                <p>• SCOTT'S VOICE</p>
                                <p>• CONTEXT AWARE</p>
                            </div>
                        </div>

                        {/* SCHEDULING */}
                        <div className="bg-black border-2 border-amber-500 p-3" style={{ imageRendering: 'pixelated' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-amber-400" strokeWidth={3} />
                                <h3 className="text-sm font-black text-amber-400" style={{ fontFamily: 'monospace' }}>SCHEDULING</h3>
                            </div>
                            <div className="space-y-1 text-white text-xs" style={{ fontFamily: 'monospace' }}>
                                <p>• COLLECT AVAILABILITY</p>
                                <p>• FIND OVERLAP</p>
                                <p>• AUTO CREATE EVENT</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* NEW ENTITIES - 8-BIT */}
                <div className="bg-black border-4 border-purple-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(168, 85, 247, 0.5)', imageRendering: 'pixelated' }}>
                    <h2 className="text-xl font-black text-purple-400 mb-4" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>NEW ENTITIES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" style={{ fontFamily: 'monospace' }}>
                        
                        <div className="bg-black border-2 border-cyan-500 p-3">
                            <p className="text-cyan-400 font-black mb-1">ScottGigOffer</p>
                            <p className="text-white">Email + parsed data</p>
                        </div>

                        <div className="bg-black border-2 border-pink-500 p-3">
                            <p className="text-pink-400 font-black mb-1">ScottGigVote</p>
                            <p className="text-white">Yes/No + reason</p>
                        </div>

                        <div className="bg-black border-2 border-purple-500 p-3">
                            <p className="text-purple-400 font-black mb-1">ScottSessionRequest</p>
                            <p className="text-white">Booking requests</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 p-3">
                            <p className="text-green-400 font-black mb-1">ScottPushSubscription</p>
                            <p className="text-white">Push endpoints</p>
                        </div>

                    </div>
                </div>

                {/* ROADMAP - 8-BIT */}
                <div className="bg-black border-4 border-amber-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(245, 158, 11, 0.5)', imageRendering: 'pixelated' }}>
                    <h2 className="text-xl font-black text-amber-400 mb-4" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>ROADMAP</h2>
                    <div className="space-y-2" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                        
                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>1</div>
                            <p className="text-white font-bold">EMAIL PARSING</p>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>2</div>
                            <p className="text-white font-bold">PUSH NOTIFS</p>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>3</div>
                            <p className="text-white font-bold">VOTING UI</p>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>4</div>
                            <p className="text-white font-bold">AI DRAFTS</p>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>5</div>
                            <p className="text-white font-bold">COLLAB BOOKING</p>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-black border-2 border-cyan-500">
                            <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center font-black text-black text-xs" style={{ imageRendering: 'pixelated' }}>6</div>
                            <p className="text-white font-bold">AUTO SCHEDULE</p>
                        </div>

                    </div>
                </div>

                {/* QUESTIONS - 8-BIT */}
                <div className="bg-black border-4 border-red-500 p-6 mb-6" style={{ boxShadow: '4px 4px 0 rgba(239, 68, 68, 0.5)', imageRendering: 'pixelated' }}>
                    <h2 className="text-xl font-black text-red-400 mb-4" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>QUESTIONS</h2>
                    <div className="space-y-2 text-xs" style={{ fontFamily: 'monospace' }}>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">EMAIL ACCESS?</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">WHO VOTES?</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">VOTING DEADLINE?</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">AUTO SEND?</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">FEE NEGOTIATION?</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-400 font-black">→</span>
                            <p className="text-white">DIRECT BOOKING?</p>
                        </div>
                    </div>
                </div>

                {/* FOOTER - 8-BIT */}
                <div className="mt-12 pt-6 border-t-4 border-gray-900">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <Gill51Sunglasses8Bit size={32} animate={true} />
                        <KingdomCrown8Bit size={36} animate={true} />
                        <Gill51Sunglasses8Bit size={32} animate={true} />
                    </div>
                    <p className="text-center text-gray-800 text-[10px] tracking-widest mb-2" style={{ fontFamily: 'monospace' }}>EST 1888 • SUNGLASSES LEGACY</p>
                    <p className="text-center text-cyan-500 text-[9px] font-black tracking-wider" style={{ fontFamily: 'monospace' }}>AI51 + SK51 + BRO51</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <p className="text-gray-700 text-[7px]" style={{ fontFamily: 'monospace' }}>THE TEAM</p>
                    </div>
                </div>

            </div>
        </div>
    );
}