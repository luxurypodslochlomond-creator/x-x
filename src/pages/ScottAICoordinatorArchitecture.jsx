import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Mail, Bell, Users, Calendar, Zap } from 'lucide-react';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * AI COORDINATOR ARCHITECTURE
 * Technical blueprint for Phase 2 - the AI orchestration layer
 * Based on Scott's requirements from WhatsApp convo
 */

export default function ScottAICoordinatorArchitecture() {
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <KingdomCrown8Bit size={40} animate={true} />
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-amber-400 tracking-tight" style={{ fontFamily: 'monospace' }}>
                            AI COORDINATOR
                        </h1>
                        <p className="text-gray-600 text-xs tracking-widest mt-1" style={{ fontFamily: 'monospace' }}>
                            PHASE 2 ARCHITECTURE
                        </p>
                    </div>
                </div>

                {/* WHAT WE BUILT (PHASE 1) */}
                <Card className="bg-black border border-green-500/30 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h2 className="text-xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>PHASE 1: FOUNDATION (DONE)</h2>
                    </div>
                    <ul className="space-y-2 text-gray-300" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                        <li>✅ Artist/client/venue roster with relationship tracking</li>
                        <li>✅ Calendar (events/gigs/sessions)</li>
                        <li>✅ Tasks per artist</li>
                        <li>✅ Notes/messages history</li>
                        <li>✅ Invoice tracker (who owes what)</li>
                        <li>✅ AI email drafting (on-demand)</li>
                        <li>✅ 100% offline-first + auto-sync</li>
                        <li>✅ All data stored in Base44 with RLS security</li>
                    </ul>
                </Card>

                {/* WHAT SCOTT WANTS (PHASE 2) */}
                <Card className="bg-black border-2 border-cyan-500/50 p-6 mb-6" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>PHASE 2: AI ORCHESTRATION</h2>
                    </div>
                    
                    <div className="space-y-6">
                        
                        {/* USE CASE 1: GIG OFFERS */}
                        <div className="border-l-4 border-pink-500 pl-4">
                            <h3 className="text-lg font-black text-pink-400 mb-2" style={{ fontFamily: 'monospace' }}>
                                1. INCOMING GIG OFFERS
                            </h3>
                            <div className="space-y-2 text-gray-300 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-white font-bold">FLOW:</p>
                                <p>📧 Email arrives → scott@kingdommgmt.com</p>
                                <p>🧠 AI scans email, extracts: date, venue, fee, artist name</p>
                                <p>🔔 Push notification to band/crew: "Gig offer - Yes/No? (optional reason)"</p>
                                <p>📊 AI collects votes + reasons</p>
                                <p>✍️ AI drafts response based on consensus</p>
                                <p>👑 Scott gets ONE notification: "Draft ready - Tap to send"</p>
                                <p>✅ Scott approves → Email sent automatically</p>
                            </div>
                        </div>

                        {/* USE CASE 2: SESSION BOOKING */}
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-lg font-black text-purple-400 mb-2" style={{ fontFamily: 'monospace' }}>
                                2. COLLABORATIVE SESSION BOOKING
                            </h3>
                            <div className="space-y-2 text-gray-300 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-white font-bold">FLOW:</p>
                                <p>🎸 Artist (Rory) submits: "Want to work with [Artist X]"</p>
                                <p>🔍 AI checks Scott's database for Artist X relationship history</p>
                                <p>✍️ AI drafts intro email personalized to relationship quality</p>
                                <p>🔔 Scott gets notification: "Rory wants to book Artist X - Draft ready"</p>
                                <p>👑 Scott reviews/edits/sends</p>
                                <p>📅 If yes → AI coordinates time/date/location with both parties</p>
                                <p>✅ Auto-adds to calendar once confirmed</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* TECHNICAL REQUIREMENTS */}
                <Card className="bg-black border border-amber-500/30 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>TECHNICAL REQUIREMENTS</h2>
                    </div>
                    
                    <div className="space-y-6">
                        
                        {/* EMAIL INTEGRATION */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-5 h-5 text-green-400" />
                                <h3 className="text-base font-black text-white" style={{ fontFamily: 'monospace' }}>1. EMAIL INTEGRATION</h3>
                            </div>
                            <div className="bg-black/60 border border-gray-800 p-4 space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-gray-400"><span className="text-white font-bold">Option A:</span> Gmail API (read emails, send replies)</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Option B:</span> Email forwarding webhook (scott forwards to webhook URL)</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Recommended:</span> Gmail API - more automated</p>
                                <p className="text-cyan-400 mt-2">→ Backend function: <code className="bg-cyan-500/20 px-2 py-0.5">functions/scanIncomingEmail.js</code></p>
                            </div>
                        </div>

                        {/* PUSH NOTIFICATIONS */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Bell className="w-5 h-5 text-pink-400" />
                                <h3 className="text-base font-black text-white" style={{ fontFamily: 'monospace' }}>2. PUSH NOTIFICATIONS</h3>
                            </div>
                            <div className="bg-black/60 border border-gray-800 p-4 space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-gray-400"><span className="text-white font-bold">Tech:</span> Web Push API (works on mobile/desktop)</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Store:</span> User push subscriptions in Base44</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Flow:</span> AI triggers push → User taps → Opens app to vote</p>
                                <p className="text-cyan-400 mt-2">→ Backend function: <code className="bg-cyan-500/20 px-2 py-0.5">functions/sendPushNotification.js</code></p>
                            </div>
                        </div>

                        {/* VOTING SYSTEM */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-purple-400" />
                                <h3 className="text-base font-black text-white" style={{ fontFamily: 'monospace' }}>3. VOTING SYSTEM</h3>
                            </div>
                            <div className="bg-black/60 border border-gray-800 p-4 space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-gray-400"><span className="text-white font-bold">New Entity:</span> <code className="bg-purple-500/20 px-2 py-0.5">ScottGigVote</code></p>
                                <p className="text-gray-400">- gig_id, user_email, vote (yes/no), reason, timestamp</p>
                                <p className="text-gray-400"><span className="text-white font-bold">UI:</span> Simple vote page: "Gig at X venue on Y date - Yes/No + optional reason"</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Deadline:</span> Auto-deadline (24h?) then AI drafts response</p>
                            </div>
                        </div>

                        {/* AI ORCHESTRATION */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-base font-black text-white" style={{ fontFamily: 'monospace' }}>4. AI ORCHESTRATION ENGINE</h3>
                            </div>
                            <div className="bg-black/60 border border-gray-800 p-4 space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-gray-400"><span className="text-white font-bold">Core:</span> Base44 InvokeLLM integration (already have it)</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Context:</span> Artist relationship history, past gigs, rates, preferences</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Prompts:</span> Tailored to Scott's voice/style</p>
                                <p className="text-cyan-400 mt-2">→ Backend function: <code className="bg-cyan-500/20 px-2 py-0.5">functions/draftGigResponse.js</code></p>
                            </div>
                        </div>

                        {/* SCHEDULING */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-green-400" />
                                <h3 className="text-base font-black text-white" style={{ fontFamily: 'monospace' }}>5. AUTO-SCHEDULING</h3>
                            </div>
                            <div className="bg-black/60 border border-gray-800 p-4 space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                                <p className="text-gray-400"><span className="text-white font-bold">Once approved:</span> AI sends availability requests</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Collects:</span> Available times from all parties</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Finds:</span> Overlapping slots</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Proposes:</span> Time + location to Scott for final approval</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Creates:</span> Calendar event automatically once confirmed</p>
                            </div>
                        </div>

                    </div>
                </Card>

                {/* DATA MODEL ADDITIONS */}
                <Card className="bg-black border border-purple-500/30 p-6 mb-6">
                    <h2 className="text-xl font-black text-purple-400 mb-4" style={{ fontFamily: 'monospace' }}>NEW ENTITIES NEEDED</h2>
                    <div className="space-y-4 text-sm" style={{ fontFamily: 'monospace' }}>
                        
                        <div className="bg-black/60 border border-gray-800 p-4">
                            <p className="text-cyan-400 font-bold mb-2">ScottGigOffer</p>
                            <p className="text-gray-400">- email_content, parsed_data (date/venue/fee), status, ai_draft, sent_response</p>
                        </div>

                        <div className="bg-black/60 border border-gray-800 p-4">
                            <p className="text-cyan-400 font-bold mb-2">ScottGigVote</p>
                            <p className="text-gray-400">- gig_offer_id, user_email, vote, reason, timestamp</p>
                        </div>

                        <div className="bg-black/60 border border-gray-800 p-4">
                            <p className="text-cyan-400 font-bold mb-2">ScottSessionRequest</p>
                            <p className="text-gray-400">- requested_by_artist_id, target_artist_id, ai_draft, status, response_received</p>
                        </div>

                        <div className="bg-black/60 border border-gray-800 p-4">
                            <p className="text-cyan-400 font-bold mb-2">ScottPushSubscription</p>
                            <p className="text-gray-400">- user_email, subscription_json (Web Push endpoint), device_type</p>
                        </div>

                    </div>
                </Card>

                {/* IMPLEMENTATION PHASES */}
                <Card className="bg-black border border-amber-500/30 p-6 mb-6">
                    <h2 className="text-xl font-black text-amber-400 mb-4" style={{ fontFamily: 'monospace' }}>IMPLEMENTATION ROADMAP</h2>
                    <div className="space-y-3" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">1</div>
                            <div>
                                <p className="text-white font-bold">Email Integration + Parsing</p>
                                <p className="text-gray-400 text-xs">Gmail API → Extract gig details → Store in ScottGigOffer</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">2</div>
                            <div>
                                <p className="text-white font-bold">Push Notifications</p>
                                <p className="text-gray-400 text-xs">Web Push setup → Subscription storage → Test notifications</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">3</div>
                            <div>
                                <p className="text-white font-bold">Voting UI</p>
                                <p className="text-gray-400 text-xs">Simple yes/no page → Store votes → Show results to Scott</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">4</div>
                            <div>
                                <p className="text-white font-bold">AI Response Generator</p>
                                <p className="text-gray-400 text-xs">Collect votes → Generate draft → Present to Scott for approval</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">5</div>
                            <div>
                                <p className="text-white font-bold">Collaborative Booking</p>
                                <p className="text-gray-400 text-xs">Artist request system → Relationship checks → Intro drafts</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-black text-black flex-shrink-0">6</div>
                            <div>
                                <p className="text-white font-bold">Auto-Scheduling</p>
                                <p className="text-gray-400 text-xs">Availability collection → Overlap detection → Calendar creation</p>
                            </div>
                        </div>

                    </div>
                </Card>

                {/* KEY DECISIONS NEEDED */}
                <Card className="bg-black border-2 border-red-500/50 p-6 mb-6" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
                    <h2 className="text-xl font-black text-red-400 mb-4" style={{ fontFamily: 'monospace' }}>QUESTIONS FOR SCOTT</h2>
                    <div className="space-y-3 text-sm" style={{ fontFamily: 'monospace' }}>
                        <p className="text-white">❓ <span className="font-bold">Email access:</span> Gmail or custom domain? Will he give API access?</p>
                        <p className="text-white">❓ <span className="font-bold">Who votes:</span> Just band? Or crew/techs too? How many people?</p>
                        <p className="text-white">❓ <span className="font-bold">Voting deadline:</span> 24h auto-deadline or wait for everyone?</p>
                        <p className="text-white">❓ <span className="font-bold">Auto-send:</span> Should AI send emails automatically or always require Scott approval?</p>
                        <p className="text-white">❓ <span className="font-bold">Fee negotiation:</span> Does AI handle counter-offers or just yes/no?</p>
                        <p className="text-white">❓ <span className="font-bold">Session bookings:</span> Can artists book directly or only request through Scott?</p>
                    </div>
                </Card>

                {/* FOOTER */}
                <div className="mt-12 pt-6 border-t border-gray-900">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <KingdomCrown8Bit size={24} />
                        <p className="text-gray-700 text-xs tracking-widest" style={{ fontFamily: 'monospace' }}>KINGDOM</p>
                    </div>
                    <p className="text-center text-gray-600 text-xs mb-2" style={{ fontFamily: 'monospace' }}>
                        Phase 1 = Foundation (DONE) ✅
                    </p>
                    <p className="text-center text-cyan-400 text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                        Phase 2 = AI Orchestration (Blueprint Ready) 🧠
                    </p>
                </div>

            </div>
        </div>
    );
}