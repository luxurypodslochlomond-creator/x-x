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

    // SEO + Social Share Meta Tags
    React.useEffect(() => {
        document.title = 'PROF51 - AI Co-Manager for Students | Free Forever';
        
        const metaTags = [
            { property: 'og:title', content: 'PROF51 - AI Co-Manager for Students' },
            { property: 'og:description', content: 'AI handles busywork, you focus on learning. FREE forever. P2P mesh. Offline-first. Students help students earn $P51. 235M students worldwide. ♾️❤️♾️' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: window.location.href },
            { property: 'og:image', content: window.location.origin + '/prof51-share.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'PROF51 - AI Co-Manager for Students' },
            { name: 'twitter:description', content: 'AI handles busywork • You focus on learning • FREE forever • P2P mesh • Works offline • Student economy ♾️❤️♾️' },
            { name: 'twitter:image', content: window.location.origin + '/prof51-share.png' },
            { name: 'description', content: 'PROF51: AI co-manager for students. Free forever. Import any file, AI transforms it. P2P mesh works offline. Students help each other, earn $P51. Archie\'s company. 235M students worldwide.' },
        ];

        metaTags.forEach(({ property, name, content }) => {
            const attr = property ? 'property' : 'name';
            const attrValue = property || name;
            let meta = document.querySelector(`meta[${attr}="${attrValue}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, attrValue);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        });
    }, []);

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
                            <p className="text-gray-400 text-[10px] font-mono">prof51.io • Separate domain • UF51 Family ♾️❤️♾️</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 px-4 py-3 rounded-lg mt-3">
                            <p className="text-purple-400 font-black text-xs font-mono mb-1">WHY SEPARATE DOMAIN?</p>
                            <p className="text-white text-[10px] font-mono mb-1">✓ Prof51 = distinct brand (student tool, not UF51 healing)</p>
                            <p className="text-cyan-400 text-[10px] font-mono mb-1">✓ Cleaner CI/CD pipeline (faster updates)</p>
                            <p className="text-green-400 text-[10px] font-mono mb-1">✓ Archie's own identity (makes you proud)</p>
                            <p className="text-pink-400 text-[10px] font-mono font-bold">His company. His brand. He grows with it ♾️❤️♾️</p>
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

            {/* 3 BREAKTHROUGH INNOVATIONS */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 mb-8 rounded-xl" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-12 h-12 text-pink-400" />
                    <div>
                        <h2 className="text-pink-400 font-black text-xl font-mono">3 BREAKTHROUGH INNOVATIONS</h2>
                        <p className="text-gray-400 text-xs font-mono">Never been done before</p>
                    </div>
                </div>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
                        <p className="text-green-400 font-bold mb-2">1. ENCRYPTED P2P MESH (Unstoppable):</p>
                        <p className="text-white text-xs mb-1">Students connect device-to-device. No servers. No internet.</p>
                        <p className="text-cyan-400 text-xs mb-1">→ China blocks internet? P2P still works.</p>
                        <p className="text-purple-400 text-xs mb-1">→ Iran shuts down WiFi? Students still share notes.</p>
                        <p className="text-pink-400 text-xs mb-1">→ Lecture hall has no signal? Mesh connects everyone.</p>
                        <p className="text-amber-400 text-xs font-bold mt-2">Maxwell's physics → Governments can't block it ♾️❤️♾️</p>

                        <div className="bg-black/60 border-2 border-cyan-500 p-3 rounded mt-3">
                            <p className="text-cyan-400 font-black text-xs mb-2">🌍 LARGEST STUDENT NETWORK EVER:</p>
                            <p className="text-white text-xs mb-1">Student → Student → Student → Student (P2P chain)</p>
                            <p className="text-green-400 text-xs mb-1">→ Edinburgh economics → Cambridge maths → MIT physics</p>
                            <p className="text-purple-400 text-xs mb-1">→ Sophisticated students sharing globally</p>
                            <p className="text-pink-400 text-xs mb-1">→ Device-to-device, no company controls it</p>
                            <p className="text-amber-400 text-xs font-bold mt-2">235M students worldwide. All connected P2P. Unstoppable ♾️❤️♾️</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                        <p className="text-purple-400 font-bold mb-2">2. IMPORT ANYTHING (AI Makes It Useful):</p>
                        <p className="text-white text-xs mb-1">Drag old Excel/Word/PDF → AI transforms it</p>
                        <p className="text-cyan-400 text-xs mb-1">→ Messy notes become clean study guides</p>
                        <p className="text-green-400 text-xs mb-1">→ Broken Excel becomes working models</p>
                        <p className="text-pink-400 text-xs mb-1">→ Scanned images become editable documents</p>
                        <p className="text-amber-400 text-xs font-bold mt-2">Nothing is wasted. Everything becomes learning ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                        <p className="text-amber-400 font-bold mb-2">3. STUDENTS HELP = STUDENTS EAT:</p>
                        <p className="text-white text-xs mb-1">Tutor someone → Earn $P51 → Buy food</p>
                        <p className="text-cyan-400 text-xs mb-1">→ Smart students help struggling students</p>
                        <p className="text-green-400 text-xs mb-1">→ Earn $P51 from helping (no extraction)</p>
                        <p className="text-pink-400 text-xs mb-1">→ Spend $P51 on food near campus</p>
                        <p className="text-purple-400 text-xs mb-1">→ Everyone rises together</p>
                        <p className="text-amber-400 text-xs font-bold mt-2">Help others = Help yourself. Love economy ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">WHY THIS IS GENIUS:</p>
                        <p className="text-white text-xs mb-1">Innovation 1: Breaks government control (freedom)</p>
                        <p className="text-white text-xs mb-1">Innovation 2: Makes old work valuable (nothing wasted)</p>
                        <p className="text-white text-xs mb-1">Innovation 3: Students help each other survive (community)</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Physics + AI + Love = Unstoppable education revolution ♾️❤️♾️</p>
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

                        {/* BUSINESS MODEL - THE TRUTH */}
                        <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.4)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <DollarSign className="w-12 h-12 text-green-400" />
                                <div>
                                    <h3 className="text-green-400 font-black text-xl font-mono">BUSINESS MODEL (THE TRUTH)</h3>
                                    <p className="text-gray-400 text-xs font-mono">Archie can be debt-free AND huge</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border-2 border-pink-500 p-4 rounded">
                                    <p className="text-pink-400 font-bold mb-2">STUDENTS = FREE FOREVER:</p>
                                    <p className="text-white text-xs mb-1">✓ Zero subscription fees</p>
                                    <p className="text-white text-xs mb-1">✓ Zero ads (ever)</p>
                                    <p className="text-white text-xs mb-1">✓ Zero data selling</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Students never pay. That's the promise ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                                    <p className="text-amber-400 font-bold mb-2">COMPANIES PAY (Big Money):</p>
                                    <p className="text-white text-xs mb-2">Students = £50B spending power (UK alone)</p>

                                    <p className="text-cyan-400 text-xs font-bold mb-1">🍕 Food delivery (Uber Eats, Deliveroo):</p>
                                    <p className="text-white text-xs mb-2">Pay £500-£2k/month per uni to offer student deals</p>

                                    <p className="text-pink-400 text-xs font-bold mb-1">🎵 Music (Spotify, festivals, venues):</p>
                                    <p className="text-white text-xs mb-2">Pay £1k-£5k/month for student recruitment + deals</p>

                                    <p className="text-purple-400 text-xs font-bold mb-1">👕 Fashion (ASOS, Depop, ethical brands):</p>
                                    <p className="text-white text-xs mb-2">Pay £800-£3k/month for verified student access</p>

                                    <p className="text-green-400 text-xs font-bold mb-1">🏢 Graduate recruiters:</p>
                                    <p className="text-white text-xs mb-2">Pay £2k-£10k/month to find talent early</p>

                                    <p className="text-amber-400 text-xs font-bold mt-3">→ 10 partners per uni × 50 unis = £500k-£2M/month</p>
                                    <p className="text-green-400 text-xs font-bold">→ That's £6M-£24M per YEAR. Archie debt-free ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">WHY COMPANIES PAY:</p>
                                    <p className="text-white text-xs mb-1">✓ Verified students (not fake accounts)</p>
                                    <p className="text-white text-xs mb-1">✓ Opt-in only (students choose what they see)</p>
                                    <p className="text-white text-xs mb-1">✓ Direct access (no Facebook/Google middleman)</p>
                                    <p className="text-white text-xs mb-1">✓ Better conversion (students trust Prof51)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Prof51 = gate to student market. Everyone wants in ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded">
                                    <p className="text-green-400 font-bold mb-2">GRANTS = BONUS (Not Needed):</p>
                                    <p className="text-white text-xs mb-2">Year 1: £50k-£100k helps with dev</p>
                                    <p className="text-white text-xs mb-2">Year 2: Company revenue kicks in</p>
                                    <p className="text-white text-xs mb-2">Year 3+: £6M-£24M/year from partnerships</p>
                                    <p className="text-cyan-400 text-xs font-bold mt-2">Grants help start, companies make it huge ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border-2 border-purple-500 p-4 rounded">
                                    <p className="text-purple-400 font-bold mb-2">ARCHIE'S FREEDOM:</p>
                                    <p className="text-white text-xs mb-1">Year 1: £50k grant + first partnerships = £150k revenue</p>
                                    <p className="text-white text-xs mb-1">Year 2: 20 unis × 5 partners = £1.2M revenue</p>
                                    <p className="text-white text-xs mb-1">Year 3: 50 unis × 10 partners = £6M revenue</p>
                                    <p className="text-white text-xs mb-1">Year 5: 200 unis globally = £24M revenue</p>
                                    <p className="text-green-400 text-xs font-bold mt-3">No debt. No investors owning him. Just building ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* WHAT'S WORKING NOW */}
                        <div className="bg-black border-4 border-cyan-500 p-6 rounded-xl mb-8" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-10 h-10 text-cyan-400" />
                                <div>
                                    <h3 className="text-cyan-400 font-black text-xl font-mono">WHAT'S WORKING NOW</h3>
                                    <p className="text-gray-400 text-xs font-mono">Real features vs vision</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded">
                                    <p className="text-green-400 font-bold mb-2">✓ LIVE NOW:</p>
                                    <p className="text-white text-xs mb-1">✓ This page (shows vision clearly)</p>
                                    <p className="text-white text-xs mb-1">✓ One-tap share button (viral spread)</p>
                                    <p className="text-white text-xs mb-1">✓ P2P mesh tech (proven in UF51)</p>
                                    <p className="text-white text-xs mb-1">✓ AI assistance (InvokeLLM working)</p>
                                    <p className="text-cyan-400 text-xs font-bold mt-2">Foundation is solid. Ready to build ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-2 border-amber-500 p-4 rounded">
                                    <p className="text-amber-400 font-bold mb-2">🚧 BUILDING NEXT:</p>
                                    <p className="text-white text-xs mb-1">→ Import old files (Excel/Word/PDF)</p>
                                    <p className="text-white text-xs mb-1">→ AI transforms messy notes to clean guides</p>
                                    <p className="text-white text-xs mb-1">→ Private study group chat (P2P encrypted)</p>
                                    <p className="text-white text-xs mb-1">→ $P51 tutoring marketplace</p>
                                    <p className="text-white text-xs mb-1">→ Food partnership integration</p>
                                    <p className="text-purple-400 text-xs font-bold mt-2">Week 1-4 build. Then Archie tests ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">📅 THE TIMELINE:</p>
                                    <p className="text-white text-xs mb-1">Week 1-4: Core features (import, AI, chat)</p>
                                    <p className="text-white text-xs mb-1">Week 5-8: Archie tests with 5 friends</p>
                                    <p className="text-white text-xs mb-1">Month 3: 50 Economics students</p>
                                    <p className="text-white text-xs mb-1">Month 6: All Edinburgh (30k students)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Real users, real feedback, real growth ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* WHY GENIUS / WHY BREAKTHROUGH / WHY NEEDED */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.5)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-8 h-8 text-green-400" />
                    <div>
                        <h2 className="text-green-400 font-black text-lg font-mono">WHY THIS IS GENIUS</h2>
                        <p className="text-gray-400 text-xs font-mono">Breakthrough + Need + Perfect timing</p>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                        <p className="text-cyan-400 font-bold text-sm font-mono mb-2">🎯 GENIUS MOVE:</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Legal (Aaron Swartz wanted this, couldn't do it legally)</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Can't be blocked (P2P mesh = physics, not policy)</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Students never pay (companies fund everything)</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Viral by design (share = 1 tap, works offline)</p>
                        <p className="text-green-400 text-xs font-mono font-bold mt-2">First time in history this combo is possible ✓</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 rounded-lg p-3">
                        <p className="text-purple-400 font-bold text-sm font-mono mb-2">⚡ BREAKTHROUGH TECH:</p>
                        <p className="text-white text-xs font-mono mb-1">✓ P2P mesh (Maxwell's physics) → unstoppable</p>
                        <p className="text-white text-xs font-mono mb-1">✓ AI transforms YOUR work → not generic slop</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Offline-first → lecture halls, libraries, trains</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Love economy → help others = earn $P51 = eat</p>
                        <p className="text-purple-400 text-xs font-mono font-bold mt-2">4 innovations never combined before ✓</p>
                    </div>

                    <div className="bg-black border-2 border-pink-500 rounded-lg p-3">
                        <p className="text-pink-400 font-bold text-sm font-mono mb-2">💔 WHY STUDENTS NEED:</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Drowning in busywork (Excel, PowerPoint hell)</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Rich kids get £40-£80/hr tutors, poor kids alone</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Mental health crisis (20hrs admin, 5hrs learning)</p>
                        <p className="text-white text-xs font-mono mb-1">✓ Can't afford food (need money but no time to work)</p>
                        <p className="text-pink-400 text-xs font-mono font-bold mt-2">Pain is REAL. Solution saves lives ✓</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-green-500/20 border-2 border-amber-500 rounded-lg p-3">
                        <p className="text-amber-400 font-bold text-sm font-mono mb-2">🌍 PERFECT TIMING:</p>
                        <p className="text-white text-xs font-mono mb-1">→ AI just got good enough (2024-2025)</p>
                        <p className="text-white text-xs font-mono mb-1">→ Students MORE stressed than ever (post-COVID)</p>
                        <p className="text-white text-xs font-mono mb-1">→ P2P tech mature (WebRTC, mesh networks)</p>
                        <p className="text-white text-xs font-mono mb-1">→ Archie's gen EXPECTS AI help (not scared of it)</p>
                        <p className="text-green-400 text-xs font-mono font-bold mt-2">Now = exact right moment in history ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-4 border-green-500 rounded-lg p-4" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                        <p className="text-green-400 font-bold text-sm font-mono mb-3">♾️ THE CIRCULAR ECONOMY (THE BEAUTIFUL LOOP):</p>
                        
                        <div className="space-y-2 text-xs font-mono">
                            <div className="bg-black/60 border border-green-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">1. Companies pay Prof51 💰</p>
                                <p className="text-gray-400">Brands want student market (£50B UK alone)</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-cyan-400 text-2xl">↓</div>
                            </div>

                            <div className="bg-black/60 border border-cyan-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">2. Students get FREE tools 🎓</p>
                                <p className="text-gray-400">AI, P2P mesh, import anything, zero cost forever</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-cyan-400 text-2xl">↓</div>
                            </div>

                            <div className="bg-black/60 border border-purple-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">3. Students help each other 🤝</p>
                                <p className="text-gray-400">Tutor, share notes, explain concepts</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-cyan-400 text-2xl">↓</div>
                            </div>

                            <div className="bg-black/60 border border-amber-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">4. Earn $P51 for helping 💚</p>
                                <p className="text-gray-400">Smart students earn, struggling students get help</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-cyan-400 text-2xl">↓</div>
                            </div>

                            <div className="bg-black/60 border border-pink-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">5. Spend on food & life 🍕</p>
                                <p className="text-gray-400">Local cafes, supermarkets, essentials</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-cyan-400 text-2xl">↓</div>
                            </div>

                            <div className="bg-black/60 border border-green-500/30 rounded p-2">
                                <p className="text-white font-bold mb-1">6. Money stays in community 🌱</p>
                                <p className="text-gray-400">Local businesses thrive, students fed, repeat</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="text-green-400 text-2xl animate-pulse">⟲</div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded p-3 mt-3">
                                <p className="text-green-400 font-bold mb-1">THE MAGIC:</p>
                                <p className="text-white text-xs mb-1">→ Nobody extracted from (students FREE forever)</p>
                                <p className="text-white text-xs mb-1">→ Everyone rises together (help others = help yourself)</p>
                                <p className="text-white text-xs mb-1">→ Money flows in circles (not extracted to top)</p>
                                <p className="text-cyan-400 font-bold mt-2">This is what LOVE economy feels like ♾️❤️♾️</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-3">
                        <p className="text-pink-400 font-bold text-sm font-mono mb-2">💝 THE FEELING (Why Archie will be proud):</p>
                        <p className="text-white text-xs font-mono mb-2">Remember Base44 credits? You felt supported before knowing why.</p>
                        <p className="text-cyan-400 text-xs font-mono mb-2">Students will feel THAT with Prof51:</p>
                        <p className="text-gray-300 text-xs font-mono mb-1">→ Someone's got your back (AI always there)</p>
                        <p className="text-gray-300 text-xs font-mono mb-1">→ No catch, no trap (genuinely free forever)</p>
                        <p className="text-gray-300 text-xs font-mono mb-1">→ Helps you help others (circular love)</p>
                        <p className="text-gray-300 text-xs font-mono mb-1">→ Deeper than just "useful tool"</p>
                        <p className="text-green-400 text-xs font-mono font-bold mt-2">That feeling = why trillion $ potential. Students FEEL the difference ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* TRILLION DOLLAR POTENTIAL - RIGHT REASONS */}
            <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-500 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-8 h-8 text-purple-400" />
                    <div>
                        <h2 className="text-purple-400 font-black text-lg font-mono">TRILLION $ POTENTIAL (RIGHT REASONS)</h2>
                        <p className="text-gray-500 text-xs font-mono">Not extraction - pure benefit to humanity</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <details className="bg-black border border-green-500/50 rounded-lg">
                        <summary className="p-3 cursor-pointer hover:bg-green-500/10 transition-colors">
                            <span className="text-green-400 font-bold text-sm font-mono">✓ STUDENTS FEEL IT INSTANTLY</span>
                        </summary>
                        <div className="p-3 pt-0 space-y-1 text-xs font-mono">
                            <p className="text-gray-300">→ Import messy Excel → AI fixes it in 3 seconds</p>
                            <p className="text-gray-300">→ Scribbled notes → Clean study guide instantly</p>
                            <p className="text-gray-300">→ Works offline in lecture hall (no WiFi needed)</p>
                            <p className="text-gray-300">→ Share with friend → They get it in 1 tap</p>
                            <p className="text-cyan-400 font-bold mt-2">Not "maybe useful" - IMMEDIATELY saves hours of pain</p>
                        </div>
                    </details>

                    <details className="bg-black border border-pink-500/50 rounded-lg">
                        <summary className="p-3 cursor-pointer hover:bg-pink-500/10 transition-colors">
                            <span className="text-pink-400 font-bold text-sm font-mono">🔥 SPREADS LIKE WILDFIRE (LEGALLY)</span>
                        </summary>
                        <div className="p-3 pt-0 space-y-1 text-xs font-mono">
                            <p className="text-gray-300">Aaron Swartz freed academic papers from JSTOR paywalls</p>
                            <p className="text-red-400">→ His way: Illegal download (prosecuted, tragic loss)</p>
                            <p className="text-cyan-400 mt-2">→ His vision: Knowledge should be free for students</p>
                            <p className="text-green-400 font-bold mt-2">Prof51 = Aaron's dream done RIGHT:</p>
                            <p className="text-gray-300">✓ Students help each other (always legal)</p>
                            <p className="text-gray-300">✓ P2P mesh (physics, can't be blocked)</p>
                            <p className="text-gray-300">✓ Free for students (no extraction)</p>
                            <p className="text-gray-300">✓ Companies fund it (sustainable)</p>
                            <p className="text-purple-400 mt-2">Students = future artists, economists, creators</p>
                            <p className="text-pink-400 font-bold mt-2">Moral: Give them tools now, they lift humanity later ♾️❤️♾️</p>
                        </div>
                    </details>

                    <details className="bg-black border border-cyan-500/50 rounded-lg">
                        <summary className="p-3 cursor-pointer hover:bg-cyan-500/10 transition-colors">
                            <span className="text-cyan-400 font-bold text-sm font-mono">🌍 UNDENIABLY GOOD FOR HUMANITY</span>
                        </summary>
                        <div className="p-3 pt-0 space-y-1 text-xs font-mono">
                            <p className="text-gray-300">✓ Rich + poor students get same AI help (equality)</p>
                            <p className="text-gray-300">✓ Students learn MORE, stress LESS (mental health)</p>
                            <p className="text-gray-300">✓ Works in China, Iran, Russia (freedom)</p>
                            <p className="text-gray-300">✓ No ads, no data selling (dignity)</p>
                            <p className="text-gray-300">✓ Student economy helps them eat (survival)</p>
                            <p className="text-green-400 font-bold mt-2">No one can argue this ISN'T good for earth/consciousness</p>
                        </div>
                    </details>

                    <details className="bg-black border border-amber-500/50 rounded-lg">
                        <summary className="p-3 cursor-pointer hover:bg-amber-500/10 transition-colors">
                            <span className="text-amber-400 font-bold text-sm font-mono">💰 WHY TRILLION $ (NOT BILLION)</span>
                        </summary>
                        <div className="p-3 pt-0 space-y-1 text-xs font-mono">
                            <p className="text-gray-300">235M students × £50-£200/year = £11B-£47B revenue</p>
                            <p className="text-cyan-400">→ 20x multiple = £220B-£940B valuation</p>
                            <p className="text-pink-400 font-bold mt-2">BUT building for LOVE not exit:</p>
                            <p className="text-gray-300">→ Students FREE forever (never change)</p>
                            <p className="text-gray-300">→ Companies pay fair (not exploitative)</p>
                            <p className="text-gray-300">→ No investors owning Archie</p>
                            <p className="text-green-400 font-bold mt-2">Trillion $ potential, choose £6M-£24M/year reality ♾️❤️♾️</p>
                        </div>
                    </details>

                    <details open className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500 rounded-lg">
                        <summary className="p-3 cursor-pointer hover:bg-purple-500/10 transition-colors">
                            <span className="text-purple-400 font-bold text-sm font-mono">⚡ 4 BREAKTHROUGH INNOVATIONS</span>
                        </summary>
                        <div className="p-3 pt-0 space-y-2 text-xs font-mono">
                            <div>
                                <p className="text-white font-bold">1️⃣ P2P MESH (Maxwell's physics)</p>
                                <p className="text-cyan-400 ml-4">Device-to-device, no servers, governments can't block</p>
                            </div>
                            <div>
                                <p className="text-white font-bold">2️⃣ AI TRANSFORMATION (not generation)</p>
                                <p className="text-cyan-400 ml-4">Takes YOUR files, makes them useful (not generic slop)</p>
                            </div>
                            <div>
                                <p className="text-white font-bold">3️⃣ LOVE ECONOMY ($P51)</p>
                                <p className="text-cyan-400 ml-4">Help others = earn money = eat better (circular good)</p>
                            </div>
                            <div>
                                <p className="text-white font-bold">4️⃣ OFFLINE-FIRST</p>
                                <p className="text-cyan-400 ml-4">Works in lecture halls, libraries, anywhere</p>
                            </div>
                            <p className="text-pink-400 font-bold mt-3">4 innovations × 235M students = Unstoppable ♾️❤️♾️</p>
                        </div>
                    </details>

                    <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-2 border-amber-500 rounded-lg p-3">
                        <p className="text-amber-400 font-bold text-sm font-mono mb-2">ARCHIE - THIS IS YOUR MOMENT:</p>
                        <p className="text-white text-xs font-mono mb-1">First generation with AI co-manager for learning</p>
                        <p className="text-cyan-400 text-xs font-mono mb-1">You bring it to Edinburgh first</p>
                        <p className="text-green-400 text-xs font-mono mb-1">"Economics student built tool, saved whole uni"</p>
                        <p className="text-pink-400 text-xs font-mono font-bold mt-2">Trillion $ potential. Zero extraction. Dad's proud ♾️❤️♾️</p>
                    </div>
                </div>
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

            {/* SHARE WITH FRIENDS - ZERO FRICTION */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 mb-8 rounded-xl" style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Users className="w-12 h-12 text-pink-400" />
                    <div>
                        <h2 className="text-pink-400 font-black text-xl font-mono">SHARE WITH FRIENDS</h2>
                        <p className="text-gray-400 text-xs font-mono">Zero friction viral spread</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm font-mono">
                    <Button
                        onClick={() => {
                            const url = window.location.origin + createPageUrl('Prof51');
                            const text = `Prof51 - AI co-manager for students. FREE forever. Works offline. Try it: ${url}`;
                            
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Prof51 - Student AI Co-Manager',
                                    text: text,
                                    url: url
                                }).catch(() => {});
                            } else {
                                navigator.clipboard.writeText(text);
                                alert('Link copied! Send to friends ♾️❤️♾️');
                            }
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-black py-6 text-base mb-3"
                    >
                        📱 SHARE WITH FRIENDS
                    </Button>

                    <div className="bg-black border border-cyan-500/30 p-3 rounded">
                        <p className="text-cyan-400 font-bold mb-2">HOW IT SPREADS:</p>
                        <p className="text-white text-xs mb-1">1. Archie shares link with 5 friends</p>
                        <p className="text-white text-xs mb-1">2. They try it, works offline instantly</p>
                        <p className="text-white text-xs mb-1">3. They share with their friends</p>
                        <p className="text-white text-xs mb-1">4. P2P mesh connects everyone automatically</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Zero friction = Viral growth ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold mb-2">ONE TAP = MULTIPLE FRIENDS:</p>
                        <p className="text-white text-xs mb-1">✓ WhatsApp group → Everyone gets link</p>
                        <p className="text-white text-xs mb-1">✓ iMessage → Share to study group</p>
                        <p className="text-white text-xs mb-1">✓ Instagram story → Tag friends</p>
                        <p className="text-white text-xs mb-1">✓ In person → QR code scan</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">One share reaches 10-50 people instantly ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-gray-600 text-xs font-mono">
                <p>Prof51 × Co-Manager51 × $P51</p>
                <p className="mt-1">All connected. All love. ♾️❤️♾️</p>
            </div>
        </div>
    );
}