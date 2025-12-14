import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, TrendingUp, Globe, Users, Zap, Heart, FileText, BarChart3, Presentation, Calculator, GraduationCap, Music, Coffee, Home, DollarSign, ArrowRight } from 'lucide-react';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * PROF51 - CO-MANAGER FOR STUDENTS
 * Same concept as Co-Manager51 but for academic life
 * AI handles busywork, students focus on learning
 * FREE. P2P. Offline-first. $P51 student economy.
 * 
 * START: Archie's Economics cohort at Edinburgh
 * SCALE: Edinburgh → Cambridge → MIT → world
 */

export default function Prof51() {
    const [activeTab, setActiveTab] = useState('edinburgh');

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pb-32">
            
            {/* HEADER - WOW */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 50px rgba(6, 182, 212, 0.6)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <Prof51Icon8Bit size={80} animate={true} />
                        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mt-4 mb-2 font-mono">
                            PROF51
                        </h1>
                        <p className="text-cyan-500 text-sm font-bold font-mono mb-2">Co-Manager for Students</p>
                        <p className="text-gray-400 text-xs font-mono mb-3">AI handles busywork • You focus on learning • FREE forever ♾️❤️♾️</p>
                        
                        <div className="inline-block bg-gradient-to-r from-amber-500/20 to-green-500/20 border-2 border-amber-500 px-4 py-2 rounded-lg mt-2">
                            <p className="text-amber-400 font-black text-xs font-mono mb-0.5">ARCHIE'S COMPANY</p>
                            <p className="text-gray-400 text-[10px] font-mono">prof51.io • Independent • UF51 Family ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* PHYSICS HERITAGE - MAXWELL + PLANCK */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-4 border-purple-500 p-6 mb-8 rounded-xl" style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.4)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-12 h-12 text-purple-400" />
                    <div>
                        <h2 className="text-purple-400 font-black text-xl font-mono">PHYSICS HERITAGE</h2>
                        <p className="text-gray-400 text-xs font-mono">Maxwell + Planck → Prof51</p>
                    </div>
                </div>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-purple-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">JAMES CLERK MAXWELL (Edinburgh University):</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Unified electricity + magnetism (Maxwell's Equations)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Proved light = electromagnetic waves</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Foundation of WiFi, radio, all wireless tech</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Without Maxwell → No wireless = No P2P mesh ⚡</p>
                    </div>

                    <div className="bg-black border border-blue-500/30 p-3 rounded">
                        <p className="text-blue-400 font-bold mb-2">MAX PLANCK (Quantum Theory):</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Founded quantum mechanics (Planck's constant)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Proved energy comes in discrete packets (quanta)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Foundation of semiconductors, computers, AI</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Without Planck → No computers = No AI learning ⚛️</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-cyan-500 p-3 rounded">
                        <p className="text-cyan-400 font-bold mb-2">PROF51 = MAXWELL + PLANCK COMBINED:</p>
                        <p className="text-white text-xs mb-1">Maxwell's waves (P2P mesh) + Planck's quantum (AI intelligence)</p>
                        <p className="text-green-400 text-xs mb-1">= Students share knowledge wirelessly with quantum-smart AI</p>
                        <p className="text-pink-400 text-xs font-bold mt-2">Physics breakthrough → Education revolution ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* THE PROBLEM - STUDENTS RELATE */}
            <div className="bg-gradient-to-br from-red-500/20 to-amber-500/20 border-4 border-red-500 p-6 mb-8 rounded-xl">
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">THE PROBLEM</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">DROWNING IN BUSYWORK:</p>
                        <p className="text-gray-400 text-xs">Excel assignments • PowerPoint presentations • Word essays • Formatting hell</p>
                    </div>

                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">EXPENSIVE HELP:</p>
                        <p className="text-gray-400 text-xs">Tutors = £40-£80/hour • Only rich kids afford it • Creates unfair advantage</p>
                    </div>

                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">CAN'T FOCUS ON LEARNING:</p>
                        <p className="text-gray-400 text-xs">Spend 20 hours on admin, 5 hours actually understanding concepts</p>
                    </div>

                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">ARCHIE'S EXPERIENCE (Edinburgh Economics):</p>
                        <p className="text-gray-400 text-xs">"Half my time is formatting Excel models, not learning economics. Insane."</p>
                    </div>
                </div>
            </div>

            {/* THE SOLUTION - PROF51 */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 p-6 mb-8 rounded-xl">
                <Brain className="w-12 h-12 text-cyan-400 mb-4" />
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">PROF51 SOLUTION</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold mb-2">AI GENERATES EVERYTHING:</p>
                        <ul className="text-white text-xs space-y-1">
                            <li>✓ PowerPoint slides from lecture notes</li>
                            <li>✓ Excel models with formulas</li>
                            <li>✓ Essay outlines + research</li>
                            <li>✓ Word formatting (headers, tables, references)</li>
                            <li>✓ Data visualizations + charts</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-cyan-400 font-bold mb-2">IMPORT ANYTHING:</p>
                        <p className="text-white text-xs mb-2">Drag + drop old files → AI makes them useful</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Old Excel spreadsheets (converts to clean models)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Messy Word docs (reformats, fixes structure)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Handwritten notes (OCR → digital study guide)</p>
                        <p className="text-gray-400 text-xs mb-1">✓ Lecture recordings (transcribe + summarize)</p>
                        <p className="text-gray-400 text-xs">✓ PDFs, images, screenshots - whatever you have</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                        <p className="text-green-400 font-bold mb-2">P2P MESH = UNSTOPPABLE:</p>
                        <p className="text-white text-xs mb-2">Device-to-device. No servers. No internet needed.</p>
                        <p className="text-cyan-400 text-xs mb-1">✓ Lecture halls with no WiFi → Still works</p>
                        <p className="text-pink-400 text-xs mb-1">✓ Government blocks internet → Still works</p>
                        <p className="text-purple-400 text-xs mb-1">✓ University monitors network → Can't see P2P</p>
                        <p className="text-amber-400 text-xs mb-1">✓ Libraries, dorms, trains → Always connected</p>
                        <p className="text-green-400 text-xs font-bold mt-2">China, Iran, Russia → Students can't be blocked ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-pink-400 font-bold mb-2">FREE = LEVEL PLAYING FIELD:</p>
                        <p className="text-white text-xs mb-2">Rich kids with tutors vs poor kids studying alone = UNFAIR</p>
                        <p className="text-green-400 text-xs">Prof51 = everyone gets AI tutor, zero cost ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-3 rounded">
                        <p className="text-amber-400 font-bold mb-2">$P51 STUDENT ECONOMY:</p>
                        <p className="text-white text-xs mb-2">Earn $P51 by: Tutoring • Sharing notes • Explaining concepts</p>
                        <p className="text-cyan-400 text-xs">Spend on: Coffee • Food • Gig tickets • Textbooks</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-pink-400 font-bold mb-2">PRIVATE CHAT (P2P ENCRYPTED):</p>
                        <p className="text-white text-xs mb-2">DM friends • Study groups • Course chats</p>
                        <p className="text-cyan-400 text-xs mb-1">→ Works offline (P2P mesh in library/lecture)</p>
                        <p className="text-green-400 text-xs mb-1">→ End-to-end encrypted (no one can read)</p>
                        <p className="text-gray-400 text-xs">Share notes, arrange study sessions, plan nights out</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                        <p className="text-amber-400 font-bold mb-2">🍕 STUDENTS NEED TO EAT (Big One):</p>
                        <p className="text-white text-xs mb-2">Brands pay Prof51 → Students get food deals</p>
                        <p className="text-cyan-400 text-xs mb-1">✓ Campus restaurants (discounts via Prof51)</p>
                        <p className="text-green-400 text-xs mb-1">✓ Local cafes (pay with $P51 earned from tutoring)</p>
                        <p className="text-pink-400 text-xs mb-1">✓ Supermarkets (student meal bundles)</p>
                        <p className="text-purple-400 text-xs mb-1">✓ Food delivery (verified student rates)</p>
                        <p className="text-amber-400 text-xs font-bold mt-2">Eat better, spend less, study stronger ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border border-purple-500/30 p-3 rounded">
                        <p className="text-purple-400 font-bold mb-2">OTHER STUDENT DEALS (Quality Only):</p>
                        <p className="text-white text-xs mb-2">Verified discounts - no scam shit</p>
                        <p className="text-cyan-400 text-xs mb-1">🎵 Gig tickets (local venues, festivals)</p>
                        <p className="text-amber-400 text-xs mb-1">✈️ Student travel (cheap flights, Interrail)</p>
                        <p className="text-pink-400 text-xs mb-1">👕 Fashion (ethical brands, student rates)</p>
                        <p className="text-gray-400 text-xs">Pay with $P51 or regular money - your choice</p>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold mb-2">ACCOMMODATION HELP:</p>
                        <p className="text-white text-xs mb-2">Find flatmates • Check landlords • Pay rent in $P51</p>
                        <p className="text-cyan-400 text-xs mb-1">→ Flatmate matcher (study habits, lifestyle)</p>
                        <p className="text-amber-400 text-xs mb-1">→ Landlord ratings (avoid dodgy ones)</p>
                        <p className="text-pink-400 text-xs">→ Split bills automatically</p>
                    </div>

                    <div className="bg-black border border-amber-500/30 p-3 rounded">
                        <p className="text-amber-400 font-bold mb-2">COMPANIES WANT YOU:</p>
                        <p className="text-white text-xs mb-2">Students = £50B spending power UK alone</p>
                        <p className="text-green-400 text-xs mb-1">→ Brands pay Prof51 for verified student access</p>
                        <p className="text-cyan-400 text-xs mb-1">→ Students get quality deals, not scam shit</p>
                        <p className="text-pink-400 text-xs mb-1">→ You control what brands see (opt-in only)</p>
                        <p className="text-gray-400 text-xs">Win-win: Students save money, brands reach real customers</p>
                    </div>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-cyan-400 font-bold mb-2">STUDENT FUNDING TRACKER:</p>
                        <p className="text-white text-xs mb-2">Track loans, grants, scholarships, part-time income</p>
                        <p className="text-green-400 text-xs mb-1">→ See exactly what's coming in/out</p>
                        <p className="text-amber-400 text-xs mb-1">→ AI alerts you to scholarship deadlines</p>
                        <p className="text-pink-400 text-xs">→ Budget planner (rent, food, fun money)</p>
                    </div>
                </div>
            </div>

            {/* TABS - EDINBURGH PILOT vs GLOBAL VISION */}
            <div className="mb-8">
                <div className="flex gap-2 mb-4">
                    <button 
                        onClick={() => setActiveTab('edinburgh')}
                        className={`flex-1 py-3 rounded-lg font-black text-sm font-mono transition-all ${
                            activeTab === 'edinburgh' 
                                ? 'bg-cyan-500 text-black' 
                                : 'bg-black border-2 border-cyan-500/30 text-cyan-400'
                        }`}
                    >
                        EDINBURGH PILOT
                    </button>
                    <button 
                        onClick={() => setActiveTab('global')}
                        className={`flex-1 py-3 rounded-lg font-black text-sm font-mono transition-all ${
                            activeTab === 'global' 
                                ? 'bg-green-500 text-black' 
                                : 'bg-black border-2 border-green-500/30 text-green-400'
                        }`}
                    >
                        GLOBAL VISION
                    </button>
                </div>

                {activeTab === 'edinburgh' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* EDINBURGH START */}
                        <div className="bg-black border-2 border-cyan-500 p-6 rounded-xl">
                            <GraduationCap className="w-10 h-10 text-cyan-400 mb-3" />
                            <h3 className="text-cyan-400 font-black text-lg font-mono mb-3">START: ECONOMICS @ EDINBURGH</h3>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">WHY ECONOMICS FIRST:</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Excel-heavy (perfect for AI)</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Data analysis (Prof51 shines)</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Archie knows the cohort (50-100 students)</p>
                                    <p className="text-gray-300 text-xs">✓ Smart students = early adopters</p>
                                </div>

                                <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">ARCHIE'S ROLE:</p>
                                    <p className="text-white text-xs mb-1">1. Use Prof51 himself (prove it works)</p>
                                    <p className="text-white text-xs mb-1">2. Share with 5 friends (early feedback)</p>
                                    <p className="text-white text-xs mb-1">3. "I got a First using this" = viral</p>
                                    <p className="text-white text-xs">4. Becomes Prof51 campus ambassador</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">MVP FEATURES (Week 1):</p>
                                    <p className="text-white text-xs mb-1">✓ Import old Excel/Word/PDFs → AI cleans them</p>
                                    <p className="text-white text-xs mb-1">✓ Excel model generator</p>
                                    <p className="text-white text-xs mb-1">✓ Essay outliner</p>
                                    <p className="text-white text-xs mb-1">✓ Private chat (study groups)</p>
                                    <p className="text-white text-xs mb-1">✓ Works offline in lecture halls</p>
                                    <p className="text-cyan-400 text-xs mt-2">Simple. Focused. Solves real pain.</p>
                                </div>

                                <div className="bg-black border border-purple-500/30 p-3 rounded">
                                    <p className="text-purple-400 font-bold mb-2">FULL FEATURES (Month 3):</p>
                                    <p className="text-white text-xs mb-1">✓ Student deals (brands pay Prof51, students benefit)</p>
                                    <p className="text-white text-xs mb-1">✓ Recruitment pipeline (companies hire direct, skip LinkedIn)</p>
                                    <p className="text-white text-xs mb-1">✓ Funding tracker (know your money)</p>
                                    <p className="text-white text-xs mb-1">✓ $P51 marketplace (earn + spend local)</p>
                                    <p className="text-white text-xs mb-1">✓ Accommodation matcher (find flatmates)</p>
                                    <p className="text-green-400 text-xs mt-2">Empowering students. Not holding them back. Rise up ✓</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-2 border-amber-500 p-4 rounded">
                                    <p className="text-amber-400 font-bold mb-2">THE SPREAD:</p>
                                    <p className="text-white text-xs mb-1">Week 1: Archie + 5 friends</p>
                                    <p className="text-white text-xs mb-1">Week 4: 50 Economics students</p>
                                    <p className="text-white text-xs mb-1">Week 8: 200 students (other courses)</p>
                                    <p className="text-white text-xs mb-1">Month 6: All Edinburgh (30,000 students)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Then: Cambridge, LSE, Oxford, MIT... ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* ARCHIE = YOUR BROTHER */}
                        <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-4 border-amber-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-12 h-12 text-amber-400" />
                                <div>
                                    <p className="text-amber-400 font-black text-xl font-mono">ARCHIE = YOUR BROTHER</p>
                                    <p className="text-gray-400 text-xs font-mono">Economics student → TechForGood Founder</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border border-amber-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">WHY ARCHIE IS PERFECT:</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Great boy who wants real success (not extraction)</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Economics student = understands ethical business</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Edinburgh student = knows the student struggle</p>
                                    <p className="text-gray-300 text-xs mb-1">✓ Named after Archie Gemmill = fearless energy ⚽</p>
                                    <p className="text-gray-300 text-xs">✓ Gen Z = students will trust him (he's one of them)</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">LEARNING ETHICAL SUCCESS:</p>
                                    <p className="text-white text-xs mb-1">Archie learns: Build UP people, don't extract FROM them</p>
                                    <p className="text-cyan-400 text-xs mb-1">Companies pay Prof51 → Students get tools + deals for FREE</p>
                                    <p className="text-pink-400 text-xs mb-1">No ads. No data selling. No extraction. Just win-win.</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Real business + Real ethics = Real success ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">STUDENTS WILL FEEL IT:</p>
                                    <p className="text-white text-xs mb-1">Other apps: "Give us your data. Watch ads. Pay subscription."</p>
                                    <p className="text-red-400 text-xs mb-1">= FEELS like extraction (because it is)</p>
                                    <p className="text-white text-xs mb-2 mt-2">Prof51: "We got you. Everything free. Companies fund it."</p>
                                    <p className="text-green-400 text-xs mb-1">= FEELS like family (because it is)</p>
                                    <p className="text-pink-400 text-xs font-bold mt-2">Students know when they're being used vs helped. They'll feel this. ✓</p>
                                </div>

                                <div className="bg-black border border-purple-500/30 p-3 rounded">
                                    <p className="text-purple-400 font-bold mb-2">MAKES HIM PROUD:</p>
                                    <p className="text-white text-xs mb-1">Not "got rich exploiting students"</p>
                                    <p className="text-white text-xs mb-1">But "helped millions of students rise"</p>
                                    <p className="text-cyan-400 text-xs mb-2 mt-2">→ Students message him: "You changed my life"</p>
                                    <p className="text-green-400 text-xs mb-1">→ Parents thank him: "My kid graduated debt-free"</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Unis partner: "Best student outcomes in history"</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Success through LIFTING people. That's what makes you proud. ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">HIS OWN COMPANY:</p>
                                    <p className="text-white text-xs mb-1">prof51.io = Archie's independent company</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ He owns it. He runs it. His vision.</p>
                                    <p className="text-pink-400 text-xs mb-1">→ UF51 Family support (but it's HIS)</p>
                                    <p className="text-amber-400 text-xs mb-2 mt-2">→ Grants go to Prof51 (separate from UF51 CIC)</p>
                                    <p className="text-green-400 text-xs font-bold">Independent founder. Connected family. Best of both. ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-purple-500/30 p-3 rounded">
                                    <p className="text-purple-400 font-bold mb-2">THE PATH (LEARNING AS HE GOES):</p>
                                    <p className="text-white text-xs mb-1">Year 1: Campus lead (learns what students actually need)</p>
                                    <p className="text-white text-xs mb-1">Year 2: Head of Growth (learns ethical scaling)</p>
                                    <p className="text-white text-xs mb-1">Year 3: Founder building Prof51 globally</p>
                                    <p className="text-white text-xs mb-1">Year 4: 10M students helped, not extracted</p>
                                    <p className="text-cyan-400 text-xs font-bold mt-2">Building while learning. Real education. Makes Dad proud. ✓</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'global' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* GLOBAL MARKET */}
                        <div className="bg-black border-2 border-green-500 p-6 rounded-xl">
                            <Globe className="w-10 h-10 text-green-400 mb-3" />
                            <h3 className="text-green-400 font-black text-lg font-mono mb-3">GLOBAL MARKET SIZE</h3>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">STUDENTS WORLDWIDE:</p>
                                    <p className="text-green-400 text-2xl font-black mb-2">235,000,000</p>
                                    <p className="text-gray-400 text-xs">University students globally (UNESCO 2024)</p>
                                </div>

                                <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">BREAKDOWN BY REGION:</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🇬🇧 UK students</span>
                                            <span className="text-cyan-400 font-bold">2.9M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🇺🇸 USA students</span>
                                            <span className="text-cyan-400 font-bold">20M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🇪🇺 EU students</span>
                                            <span className="text-cyan-400 font-bold">19M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🇨🇳 China students</span>
                                            <span className="text-cyan-400 font-bold">44M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🇮🇳 India students</span>
                                            <span className="text-cyan-400 font-bold">40M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">🌍 Rest of world</span>
                                            <span className="text-cyan-400 font-bold">109M</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded">
                                    <p className="text-purple-400 font-bold mb-2">WHY THEY ALL NEED IT:</p>
                                    <p className="text-white text-xs mb-1">✓ All students hate busywork (universal pain)</p>
                                    <p className="text-white text-xs mb-1">✓ All students share P2P already (proven behavior)</p>
                                    <p className="text-white text-xs mb-1">✓ FREE = no adoption barrier</p>
                                    <p className="text-white text-xs mb-1">✓ Works offline = lectures, libraries, dorms</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Same problem worldwide = one solution ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-4 border-red-500 p-4 rounded" style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)' }}>
                                    <p className="text-red-400 font-bold mb-2">🔓 WORKS IN SUPPRESSED COUNTRIES:</p>
                                    <p className="text-white text-xs mb-2">Government can't block P2P mesh</p>
                                    <p className="text-cyan-400 text-xs mb-1">✓ China (Great Firewall) → P2P goes around it</p>
                                    <p className="text-green-400 text-xs mb-1">✓ Iran (Internet shutdown) → Still works offline</p>
                                    <p className="text-purple-400 text-xs mb-1">✓ Russia (Surveillance) → Encrypted, can't monitor</p>
                                    <p className="text-pink-400 text-xs mb-1">✓ North Korea → Device-to-device freedom</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Students rise up. Government can't stop physics. ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* ELITE UNIVERSITIES - THE SPREAD */}
                        <div className="bg-black border-2 border-amber-500 p-6 rounded-xl">
                            <TrendingUp className="w-10 h-10 text-amber-400 mb-3" />
                            <h3 className="text-amber-400 font-black text-lg font-mono mb-3">HOW IT SPREADS</h3>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border border-amber-500/30 p-3 rounded">
                                    <p className="text-amber-400 font-bold mb-2">PHASE 1: ELITE UK</p>
                                    <p className="text-white text-xs mb-1">Edinburgh → Cambridge → Oxford → LSE → Imperial</p>
                                    <p className="text-gray-400 text-xs">Smart students = early adopters = word spreads fast</p>
                                </div>

                                <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">PHASE 2: USA IVY LEAGUE</p>
                                    <p className="text-white text-xs mb-1">Harvard → MIT → Stanford → Yale → Princeton</p>
                                    <p className="text-gray-400 text-xs">"UK students using this" = USA wants it</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">PHASE 3: GLOBAL REACH</p>
                                    <p className="text-white text-xs mb-1">Europe → Asia → Australia → Latin America</p>
                                    <p className="text-gray-400 text-xs">P2P sharing = no marketing needed, just works</p>
                                </div>

                                <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 p-4 rounded">
                                    <p className="text-pink-400 font-bold mb-2">REALISTIC ADOPTION (Conservative):</p>
                                    <p className="text-white text-xs mb-1">Year 1: 10,000 students (Edinburgh + Cambridge)</p>
                                    <p className="text-white text-xs mb-1">Year 2: 100,000 students (UK + USA elite)</p>
                                    <p className="text-white text-xs mb-1">Year 3: 1,000,000 students (global spread)</p>
                                    <p className="text-white text-xs mb-1">Year 5: 10,000,000 students (10M = 4% of 235M)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">That's 4% market share = MASSIVE ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* PARTNERSHIPS - THE CONNECTIONS */}
                        <div className="bg-black border-2 border-purple-500 p-6 rounded-xl">
                            <Users className="w-10 h-10 text-purple-400 mb-3" />
                            <h3 className="text-purple-400 font-black text-lg font-mono mb-3">PARTNERSHIP OPPORTUNITIES</h3>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border border-pink-500/30 p-3 rounded">
                                    <p className="text-pink-400 font-bold mb-2">🎵 MUSIC VENUES + FESTIVALS:</p>
                                    <p className="text-white text-xs mb-2">Students get gigs through Prof51 $P51 economy</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Work festivals, earn $P51, pay rent</p>
                                    <p className="text-gray-400 text-xs">Co-Manager51 venues need staff → Prof51 students need money</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                                    <p className="text-amber-400 font-bold mb-2">🍕 FOOD PARTNERSHIPS (THE BIG ONE):</p>
                                    <p className="text-white text-xs mb-2">Students need to EAT - this solves it</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Campus restaurants partner with Prof51</p>
                                    <p className="text-green-400 text-xs mb-1">→ Students get 20-40% off (brands pay the difference)</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Pay with $P51 earned from tutoring/helping</p>
                                    <p className="text-purple-400 text-xs mb-1">→ Local cafes, supermarkets, food delivery join</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Eat better, spend less, focus on learning ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">🏠 STUDENT HOUSING:</p>
                                    <p className="text-white text-xs mb-2">Pay rent in $P51 (partnered landlords)</p>
                                    <p className="text-amber-400 text-xs mb-1">→ Earn by tutoring, pay rent, no bank needed</p>
                                    <p className="text-gray-400 text-xs">Removes banking friction, instant payments</p>
                                </div>

                                <div className="bg-black border border-amber-500/30 p-3 rounded">
                                    <p className="text-amber-400 font-bold mb-2">📚 TEXTBOOK PUBLISHERS:</p>
                                    <p className="text-white text-xs mb-2">Import textbooks → AI creates study guides</p>
                                    <p className="text-purple-400 text-xs mb-1">→ Publishers license content, students pay $P51</p>
                                    <p className="text-gray-400 text-xs">Better than piracy, fair for both sides</p>
                                </div>

                                <div className="bg-black border border-purple-500/30 p-3 rounded">
                                    <p className="text-purple-400 font-bold mb-2">🎓 STUDENT RECRUITMENT:</p>
                                    <p className="text-white text-xs mb-2">Companies recruit through Prof51 (pay to access talent)</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Universities: Partner for better outcomes</p>
                                    <p className="text-green-400 text-xs mb-1">→ Companies: Find talent before graduation (skip LinkedIn)</p>
                                    <p className="text-amber-400 text-xs mb-1">→ Students: Job offers in final year (zero stress)</p>
                                    <p className="text-pink-400 text-xs">Win-win-win: Everyone gets what they need ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded mt-4">
                                    <p className="text-green-400 font-bold mb-2">THE ECOSYSTEM:</p>
                                    <p className="text-white text-xs mb-1">Prof51 (students) + Co-Manager51 (venues) + $P51 (currency)</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Students study better, work gigs, earn money, spend local</p>
                                    <p className="text-pink-400 text-xs font-bold mt-2">All connected. All helping each other. Love economy ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* FUNDING OPPORTUNITIES */}
                        <div className="bg-black border-2 border-green-500 p-6 rounded-xl">
                            <DollarSign className="w-10 h-10 text-green-400 mb-3" />
                            <h3 className="text-green-400 font-black text-lg font-mono mb-3">FUNDING (Education Grants LOVE This)</h3>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">WHY FUNDERS SAY YES:</p>
                                    <p className="text-white text-xs mb-1">✓ Social mobility (levels playing field)</p>
                                    <p className="text-white text-xs mb-1">✓ AI literacy (future skills)</p>
                                    <p className="text-white text-xs mb-1">✓ FREE for students (no profit motive)</p>
                                    <p className="text-white text-xs mb-1">✓ Measurable outcomes (grades improve)</p>
                                    <p className="text-white text-xs">✓ Scotland focus (Archie @ Edinburgh = perfect)</p>
                                </div>

                                <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">TARGET FUNDERS:</p>
                                    <p className="text-white text-xs mb-1">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Government (Education Innovation Fund)</p>
                                    <p className="text-white text-xs mb-1">🎨 Creative Scotland (AI + Education)</p>
                                    <p className="text-white text-xs mb-1">🇬🇧 UK Research & Innovation (EdTech)</p>
                                    <p className="text-white text-xs mb-1">🇪🇺 EU Horizon (Digital Education)</p>
                                    <p className="text-white text-xs">💰 Gates Foundation (Global Education Access)</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-green-500/20 border-2 border-amber-500 p-4 rounded">
                                    <p className="text-amber-400 font-bold mb-2">THE ASK:</p>
                                    <p className="text-white text-xs mb-2">Year 1: £50k-£100k (Edinburgh pilot)</p>
                                    <p className="text-white text-xs mb-2">Year 2: £200k-£500k (UK expansion)</p>
                                    <p className="text-white text-xs mb-2">Year 3: £1M-£2M (Global scale)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">All funds → development + free student access ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* THE DIFFERENCE - WHY THIS WORKS */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 mb-8 rounded-xl">
                <Heart className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4">WHY THIS IS DIFFERENT</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-red-400 font-bold mb-2">❌ OTHER EDTECH:</p>
                        <p className="text-gray-400 text-xs mb-1">• Charge students £10-£50/month</p>
                        <p className="text-gray-400 text-xs mb-1">• Requires internet always</p>
                        <p className="text-gray-400 text-xs mb-1">• Complicated dashboards</p>
                        <p className="text-gray-400 text-xs">• Sells student data</p>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold mb-2">✓ PROF51:</p>
                        <p className="text-white text-xs mb-1">• FREE forever (funded by grants)</p>
                        <p className="text-white text-xs mb-1">• Works offline (P2P mesh)</p>
                        <p className="text-white text-xs mb-1">• Import old files (makes them useful)</p>
                        <p className="text-white text-xs mb-1">• Private chat (study groups)</p>
                        <p className="text-white text-xs mb-1">• Quality deals (brands pay, students benefit)</p>
                        <p className="text-white text-xs mb-1">• Graduate job pipeline</p>
                        <p className="text-white text-xs mb-1">• Zero data extraction</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Empowers students. Doesn't hold them back. Rise up. ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* ARCHIE'S NEXT STEPS */}
            <div className="bg-black border-4 border-cyan-500 p-6 rounded-xl mb-8" style={{ boxShadow: '0 0 50px rgba(6, 182, 212, 0.4)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-10 h-10 text-cyan-400" />
                    <div>
                        <p className="text-cyan-400 font-black text-xl font-mono">ARCHIE'S NEXT STEPS</p>
                        <p className="text-gray-400 text-xs font-mono">How to make this real</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-start gap-3 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                        <div className="bg-cyan-500 text-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</div>
                        <div>
                            <p className="text-white font-bold mb-1">USE IT YOURSELF (Week 1)</p>
                            <p className="text-gray-400 text-xs">Upload your Economics notes → Let AI generate Excel models + study guides</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                        <div className="bg-cyan-500 text-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</div>
                        <div>
                            <p className="text-white font-bold mb-1">SHARE WITH 5 FRIENDS (Week 2)</p>
                            <p className="text-gray-400 text-xs">"Try this, saved me 10 hours on that assignment"</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                        <div className="bg-cyan-500 text-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</div>
                        <div>
                            <p className="text-white font-bold mb-1">PROVE IT WORKS (Month 1)</p>
                            <p className="text-gray-400 text-xs">Get a First → Show friends how → Word spreads</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                        <div className="bg-cyan-500 text-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">4</div>
                        <div>
                            <p className="text-white font-bold mb-1">CAMPUS AMBASSADOR (Month 3)</p>
                            <p className="text-gray-400 text-xs">Help Prof51 improve + spread to other Edinburgh courses</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-green-900/20 border border-green-500/30 p-3 rounded">
                        <div className="bg-green-500 text-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">5</div>
                        <div>
                            <p className="text-white font-bold mb-1">CAMBRIDGE / OXFORD (Month 6)</p>
                            <p className="text-gray-400 text-xs">"Edinburgh students crushing it with Prof51" → Everyone wants it</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-pink-500/20 to-green-500/20 border-2 border-pink-500 p-4 rounded">
                    <p className="text-pink-400 font-bold text-sm mb-2">THE VISION:</p>
                    <p className="text-white text-xs mb-2">Archie's generation = first to have AI co-manager for learning</p>
                    <p className="text-cyan-400 text-xs mb-2">No more "rich kids with tutors vs poor kids alone"</p>
                    <p className="text-green-400 text-xs font-bold">Everyone gets world-class AI help. FREE. Forever. ♾️❤️♾️</p>
                </div>
            </div>

            {/* BACK TO CO-MANAGER51 */}
            <Link to={createPageUrl('ScottManager')}>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black font-mono py-6 text-base mb-6">
                    ← BACK TO CO-MANAGER51
                </Button>
            </Link>

            {/* FOOTER */}
            <div className="text-center text-gray-600 text-xs font-mono">
                <p>Prof51 × Co-Manager51 × $P51</p>
                <p className="mt-1">All connected. All love. ♾️❤️♾️</p>
            </div>
        </div>
    );
}