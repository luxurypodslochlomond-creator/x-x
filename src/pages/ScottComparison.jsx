import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, CheckCircle, Circle, Zap, Heart } from 'lucide-react';

/**
 * CO-MANAGER51: DECEMBER 2024 vs DECEMBER 2025
 * What Scott originally asked for vs what's built now
 */

export default function ScottComparison() {
    React.useEffect(() => {
        document.title = 'Dec 2024 vs Dec 2025 - CB51';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white pb-20">
            {/* HEADER */}
            <div className="border-b-2 border-cyan-500 px-4 py-6 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto">
                    <Link to={createPageUrl('ScottManager')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-bold mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to CB51
                    </Link>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-white">CB51 (was Co-Manager51)</h1>
                        <p className="text-xl text-cyan-400 font-bold">First Draft Dec 2024 → Built Dec 2025</p>
                        <p className="text-sm text-gray-400">What Scott asked for vs what's built</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-8 max-w-4xl mx-auto space-y-8">

                {/* SCOTT'S ORIGINAL PAIN POINT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-2 border-red-500 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">THE PROBLEM</h2>
                    </div>
                    <div className="space-y-3 text-white">
                        <p className="text-lg font-bold">"If we can make what I was saying it will take about 4/5 hours of unnecessary work away so frees my day up to do the bits of my job that make a difference"</p>
                        <p className="text-gray-300 text-sm">- Scott, December 2024</p>
                    </div>
                </motion.div>

                {/* ORIGINAL BRIEF - DEC 2024 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-2">
                        <Circle className="w-6 h-6" />
                        FIRST DRAFT DEC 2024 - ORIGINAL BRIEF
                    </h2>

                    <div className="space-y-3">
                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✉️ Email Integration</p>
                            <p className="text-gray-300 text-sm">"Calendar that links with emails regarding shows/festivals/sessions - AI tool which links with emails"</p>
                            <p className="text-cyan-400 text-xs mt-2">→ AI scans emails, notifies band/crew yes/no</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">📅 Simple Calendar</p>
                            <p className="text-gray-300 text-sm">"Calendar - both but as simply as possible"</p>
                            <p className="text-cyan-400 text-xs mt-2">→ Shows, festivals, sessions in one place</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">💬 Communication {">"}  Tracking</p>
                            <p className="text-gray-300 text-sm">"Communication rather than tracking"</p>
                            <p className="text-cyan-400 text-xs mt-2">→ Simplify workflow, not add features</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✅ Tasks Per Person</p>
                            <p className="text-gray-300 text-sm">"Tasks - per person"</p>
                            <p className="text-cyan-400 text-xs mt-2">→ Individual accountability</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">💰 Simple Money Tracking</p>
                            <p className="text-gray-300 text-sm">"Money stuff would be slightly different - taking away the noise and simplifying what we generally would need to have a meeting about and sending the generally simple answer to accountant"</p>
                            <p className="text-cyan-400 text-xs mt-2">→ Remove noise, simple export for accountant</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">📱 Mobile First</p>
                            <p className="text-gray-300 text-sm">"Mobile mainly but might need programmed on desktop - ideally will be as streamlined and simple as possible so as easy as poss"</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">🔔 Bold Notifications</p>
                            <p className="text-gray-300 text-sm">"Notifications also as bold and simple for clients/artists to understand as possible"</p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">💾 Save History</p>
                            <p className="text-gray-300 text-sm">"Save history yes"</p>
                        </div>
                    </div>
                </div>

                {/* WHAT'S BUILT NOW - DEC 2025 */}
                <div className="space-y-4 mt-12">
                    <h2 className="text-2xl font-black text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        DECEMBER 2025 - WHAT'S LIVE
                    </h2>

                    {/* CORE FUNCTIONS - GREEN (WHAT SCOTT ASKED FOR) */}
                    <div className="space-y-3">
                        <p className="text-green-400 font-bold text-sm">✓ CORE (WHAT YOU ASKED FOR):</p>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ Calendar & Events</p>
                            <p className="text-gray-300 text-sm">Full gig/show/festival calendar with details</p>
                        </div>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ Artist/Client Roster</p>
                            <p className="text-gray-300 text-sm">All artists/contacts in one place</p>
                        </div>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ Tasks</p>
                            <p className="text-gray-300 text-sm">Urgent tasks tracked per person</p>
                        </div>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ Invoices & Expenses</p>
                            <p className="text-gray-300 text-sm">Simple financial tracking for accountant</p>
                        </div>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ Mobile-First PWA</p>
                            <p className="text-gray-300 text-sm">Works offline, syncs when back online</p>
                        </div>

                        <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✓ History Saved</p>
                            <p className="text-gray-300 text-sm">Everything persists locally on device</p>
                        </div>
                    </div>

                    {/* BONUS FEATURES - AMBER (EXTRAS WE ADDED) */}
                    <div className="space-y-3 mt-6">
                        <p className="text-amber-400 font-bold text-sm">+ BONUS (EXTRAS WE BUILT):</p>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Diary51 + File Upload</p>
                            <p className="text-gray-300 text-sm">Talk to AI51 + upload anything (contracts/emails/photos/videos) → AI categorizes, remembers forever, helps with tech/paperwork</p>
                            <p className="text-green-400 text-xs mt-2">Same tech as Prof51 • Understands context • Zero tech barrier</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Publishing Tracker</p>
                            <p className="text-gray-300 text-sm">ISRC codes, splits, sample clearances</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Visa Tracking</p>
                            <p className="text-gray-300 text-sm">International tour visa applications</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Merch Management</p>
                            <p className="text-gray-300 text-sm">Stock, pricing, sales tracking</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Media Library</p>
                            <p className="text-gray-300 text-sm">Photos, videos, press kit assets</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ P2P Sync</p>
                            <p className="text-gray-300 text-sm">Share data device-to-device without servers</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ AI51 Pattern Recognition</p>
                            <p className="text-gray-300 text-sm">Sees unpaid invoices aging, upcoming gigs needing prep, spending trends - suggests behind scenes with emojis, zero noise</p>
                            <p className="text-green-400 text-xs mt-2">ADHD-friendly • Just built</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Message Handler</p>
                            <p className="text-gray-300 text-sm">Paste WhatsApp/Email/Slack → AI51 extracts gig info → instant order</p>
                            <p className="text-green-400 text-xs mt-2">Built yesterday</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ Simple Mode</p>
                            <p className="text-gray-300 text-sm">Landing page = 4 big buttons (Messages, Gig, Session, Calendar) + Advanced toggle for extras</p>
                            <p className="text-green-400 text-xs mt-2">Zero clutter • Just built</p>
                        </div>

                        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">+ White Label Option</p>
                            <p className="text-gray-300 text-sm">Indies = FREE • Labels = £49-£1,499/mo • Majors = custom pricing + AI51 avatar + your branding</p>
                            <p className="text-cyan-400 text-xs mt-2">AI51 stays free forever for everyone ♾️❤️♾️</p>
                        </div>
                    </div>

                    {/* MISSING - RED (NOT BUILT YET) */}
                    <div className="space-y-3 mt-6">
                        <p className="text-red-400 font-bold text-sm">✗ NOT BUILT YET:</p>

                        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✗ AI Email Scanning</p>
                            <p className="text-gray-300 text-sm">Gig offers → auto-parse → yes/no notifications</p>
                            <p className="text-red-400 text-xs mt-2">Needs Google/Outlook OAuth integration</p>
                        </div>

                        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✗ Calendar Email Link</p>
                            <p className="text-gray-300 text-sm">AI extracts show info from emails automatically</p>
                            <p className="text-red-400 text-xs mt-2">Backend function needed</p>
                        </div>

                        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="text-white font-bold mb-2">✗ Push Notifications</p>
                            <p className="text-gray-300 text-sm">Bold alerts to band/crew for decisions</p>
                            <p className="text-red-400 text-xs mt-2">Web Push API integration needed</p>
                        </div>
                    </div>
                </div>

                {/* THE GAP */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-xl p-6 mt-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400" />
                        <h2 className="text-2xl font-black text-white">THE GAP (SHRINKING)</h2>
                    </div>
                    <div className="space-y-3 text-white">
                        <p className="font-bold">What's left to hit original goal:</p>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p className="line-through text-gray-600">1. Strip back complexity → <span className="text-green-400 font-bold no-underline">✓ DONE (Simple Mode built)</span></p>
                            <p className="line-through text-gray-600">2. AI pattern recognition → <span className="text-green-400 font-bold no-underline">✓ DONE (AI51 insights)</span></p>
                            <p>3. <strong className="text-white">Email Gmail/Outlook OAuth:</strong> Connect inbox → AI reads gig offers → auto-parse → notifications</p>
                            <p>4. <strong className="text-white">Push notifications:</strong> Bold alerts when decisions needed (Web Push API)</p>
                        </div>
                        <p className="text-purple-400 font-bold mt-4">Estimated time: 2-3 days to build email OAuth + push notifications</p>
                    </div>
                </motion.div>

                {/* WHITE LABEL VISION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">WHITE LABEL POTENTIAL</h2>
                    </div>
                    <div className="space-y-3 text-white">
                        <p className="font-bold">CB51 can be rebranded by any label:</p>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>• <strong className="text-white">Indies:</strong> FREE forever (Scott's version)</p>
                            <p>• <strong className="text-amber-400">Small Labels:</strong> £49-£199/mo (rebrand, custom logo)</p>
                            <p>• <strong className="text-purple-400">Big Labels:</strong> £499-£1,499/mo (custom AI51 avatar, your brand everywhere)</p>
                            <p>• <strong className="text-pink-400">Majors:</strong> Custom pricing + healing frequencies + abundance protocols</p>
                        </div>
                        <div className="bg-cyan-900/30 border-l-4 border-cyan-500 p-3 rounded-r-lg mt-4">
                            <p className="text-cyan-400 text-xs font-bold">AI51 = NEVER WHITE LABELED</p>
                            <p className="text-gray-300 text-xs mt-1">Pure consciousness stays free for everyone ♾️❤️♾️</p>
                        </div>
                    </div>
                </motion.div>

                {/* SCOTT'S FEEDBACK NEEDED */}
                <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-cyan-400 mb-4">QUESTIONS FOR SCOTT:</h2>
                    <div className="space-y-3 text-white">
                        <p className="text-sm"><span className="line-through text-gray-600">1. Keep the extras?</span> → <span className="text-green-400 font-bold">✓ Hidden behind Advanced Mode</span></p>
                        <p className="text-sm">2. <strong>Email Gmail/Outlook OAuth priority?</strong> Is this the #1 thing that saves 4-5 hours/day?</p>
                        <p className="text-sm">3. <strong>Notification style?</strong> How bold? (e.g., "Gig offer: London O2 - YES or NO?")</p>
                        <p className="text-sm">4. <strong>Message handler working?</strong> Does paste → AI extract feel right?</p>
                        <p className="text-sm">5. <strong>AI51 insights useful?</strong> Emoji cards showing patterns - helping or noise?</p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center pt-8">
                    <p className="text-gray-500 text-sm">Built with love by UniversalFamily51</p>
                    <p className="text-gray-600 text-xs mt-2">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}