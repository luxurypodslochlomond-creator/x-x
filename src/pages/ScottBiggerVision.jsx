import React from 'react';
import { Music, Trophy, Users, Building, Shield, Zap, Heart, Globe, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * BIGGER THAN MUSIC - THE CROSS-INDUSTRY VISION
 * Same core: manage people, activities, money, contracts
 * Works for: sports managers, talent agencies, property managers, event coordinators
 * 
 * THE DISRUPTION:
 * Current platforms = forms, extraction, complexity
 * This = zero forms, zero extraction, works offline, AI helps
 */

export default function ScottBiggerVision() {
    const navigate = useNavigate();

    const industries = [
        {
            name: "Music Management",
            icon: Music,
            color: "pink",
            current: "Spotify/labels extract 70%+ from artists",
            solution: "COOLASFUCK: Artists keep 90%, direct fans, zero forms",
            manager: "Scott (real user, 12 artists)",
            problem: "Managing tours, contracts, publishing = spreadsheets + chaos"
        },
        {
            name: "Sports Management",
            icon: Trophy,
            color: "amber",
            current: "Agents use Excel + email, lose deals to lag",
            solution: "KINGDOM51: Offline contracts at games, AI analyzes offers live",
            manager: "Football agents, boxing promoters",
            problem: "Need instant decision on transfer offers, stuck in hotel with no WiFi"
        },
        {
            name: "Talent Agencies",
            icon: Users,
            color: "cyan",
            current: "CAA/UTA using ancient CRMs, zero mobile-first",
            solution: "KINGDOM51: Actors/models/influencers, all synced P2P",
            manager: "LA/London talent agencies",
            problem: "50+ clients, can't track auditions/castings/contracts on the go"
        },
        {
            name: "Property Management",
            icon: Building,
            color: "green",
            current: "Rightmove/Zoopla = forms, fees, extraction",
            solution: "KINGDOM51: Landlords manage tenants, maintenance, rent - offline",
            manager: "Property managers, landlords",
            problem: "Emergency repairs at 3am, need tenant info NOW, internet dead"
        },
        {
            name: "Event Management",
            icon: Globe,
            color: "purple",
            current: "Eventbrite charges 10%+, complex dashboards",
            solution: "KINGDOM51: Festival coordinators, guest lists, tickets, offline",
            manager: "Festival producers, wedding planners",
            problem: "Desert festival, zero internet, 5000 people, need live coordination"
        }
    ];

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider font-mono">BACK</span>
            </button>

            {/* HEADER */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-6 text-center">
                        <Kingdom51Crown8Bit size={64} animate={true} />
                        <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mt-4 mb-2" style={{ fontFamily: 'monospace' }}>
                            BIGGER THAN MUSIC
                        </h1>
                        <p className="text-amber-500 text-sm font-bold font-mono">Same tool, 5+ industries, £billions in extraction stopped</p>
                    </div>
                </div>
            </div>

            {/* THE PATTERN */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-6 mb-8 rounded-xl">
                <Shield className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">THE PATTERN WE'RE SOLVING</h2>
                
                <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black border border-purple-500/30 p-4 rounded">
                        <p className="text-white font-bold mb-2">SAME CORE NEEDS:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>• Manage people (artists/athletes/actors/tenants)</li>
                            <li>• Track activities (gigs/games/auditions/viewings)</li>
                            <li>• Handle money (invoices/fees/rent/tickets)</li>
                            <li>• Store contracts (deals/leases/agreements)</li>
                            <li>• Team coordination (offline, real-time)</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-red-500/30 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">CURRENT PLATFORMS:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>❌ Forms everywhere (data entry hell)</li>
                            <li>❌ Extract 10-70% in fees</li>
                            <li>❌ Require internet (useless at festivals/games)</li>
                            <li>❌ Complex enterprise software (not mobile)</li>
                            <li>❌ Your data = their profit</li>
                        </ul>
                    </div>

                    <div className="bg-black border border-green-500/30 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">KINGDOM51 SOLUTION:</p>
                        <ul className="text-gray-300 space-y-1 text-xs">
                            <li>✓ Zero forms (voice/photo/AI extracts data)</li>
                            <li>✓ Zero extraction (you keep your money)</li>
                            <li>✓ Works offline (P2P mesh, local-first)</li>
                            <li>✓ Mobile-first (built for real humans)</li>
                            <li>✓ AI co-manager (not a dashboard)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* INDUSTRIES BREAKDOWN */}
            <div className="mb-8">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4 text-center">WHO NEEDS THIS</h2>
                
                <div className="space-y-4">
                    {industries.map((industry, i) => {
                        const colorClasses = {
                            pink: { bg: 'from-pink-500/20', border: 'border-pink-500', icon: 'text-pink-400', title: 'text-pink-400' },
                            amber: { bg: 'from-amber-500/20', border: 'border-amber-500', icon: 'text-amber-400', title: 'text-amber-400' },
                            cyan: { bg: 'from-cyan-500/20', border: 'border-cyan-500', icon: 'text-cyan-400', title: 'text-cyan-400' },
                            green: { bg: 'from-green-500/20', border: 'border-green-500', icon: 'text-green-400', title: 'text-green-400' },
                            purple: { bg: 'from-purple-500/20', border: 'border-purple-500', icon: 'text-purple-400', title: 'text-purple-400' }
                        };
                        const c = colorClasses[industry.color];
                        
                        return (
                        <div key={i} className={`bg-gradient-to-r ${c.bg} to-black border-2 ${c.border} p-4 rounded-xl`}>
                            <div className="flex items-center gap-3 mb-3">
                                {React.createElement(industry.icon, { className: `w-8 h-8 ${c.icon}` })}
                                <div>
                                    <p className={`${c.title} font-black text-lg font-mono`}>{industry.name}</p>
                                    <p className="text-gray-500 text-xs font-mono">{industry.manager}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs font-mono">
                                <div className="bg-black border border-red-500/30 p-2 rounded">
                                    <p className="text-red-400 font-bold mb-1">PROBLEM:</p>
                                    <p className="text-gray-400">{industry.problem}</p>
                                </div>

                                <div className="bg-black border border-gray-800 p-2 rounded">
                                    <p className="text-gray-500 font-bold mb-1">CURRENT:</p>
                                    <p className="text-gray-500">{industry.current}</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-2 rounded">
                                    <p className="text-green-400 font-bold mb-1">SOLUTION:</p>
                                    <p className="text-gray-300">{industry.solution}</p>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

            {/* THE DISRUPTION */}
            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-4 border-pink-500 p-6 mb-8 rounded-xl">
                <Zap className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4">WAKE UP CALL FOR PLATFORMS</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">SPOTIFY/APPLE MUSIC:</p>
                        <p className="text-gray-400 mb-2">Take 30%, force forms, extract data, complex dashboards</p>
                        <p className="text-pink-400">→ COOLASFUCK: Artists keep 90%, zero forms, direct fans</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">RIGHTMOVE/ZOOPLA:</p>
                        <p className="text-gray-400 mb-2">Charge landlords £100s/month, forms, lag, desktop-only</p>
                        <p className="text-pink-400">→ KINGDOM51: £100/month, offline, mobile, AI handles forms</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">EVENTBRITE:</p>
                        <p className="text-gray-400 mb-2">10%+ fees, complex, requires internet, slow</p>
                        <p className="text-pink-400">→ KINGDOM51: £100/month flat, works offline, instant</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">SALESFORCE/ENTERPRISE:</p>
                        <p className="text-gray-400 mb-2">£1000s/month, training needed, desktop-only, forms hell</p>
                        <p className="text-pink-400">→ KINGDOM51: £2k/month unlimited, mobile, AI = zero training</p>
                    </div>
                </div>
            </div>

            {/* MARKET SIZE */}
            <div className="bg-black border-2 border-amber-500 p-6 rounded-xl mb-8">
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">MARKET SIZE</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <p className="text-amber-400 font-bold mb-3">UK MARKET (CONSERVATIVE):</p>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-500/10 to-black border border-pink-500/30 rounded">
                        <span className="text-white">Music managers</span>
                        <span className="text-pink-400 font-bold">~5,000 x £100 = £500k/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-500/10 to-black border border-amber-500/30 rounded">
                        <span className="text-white">Sports agents</span>
                        <span className="text-amber-400 font-bold">~2,000 x £300 = £600k/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-500/10 to-black border border-cyan-500/30 rounded">
                        <span className="text-white">Talent agencies</span>
                        <span className="text-cyan-400 font-bold">~500 x £2k = £1m/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500/10 to-black border border-green-500/30 rounded">
                        <span className="text-white">Property managers</span>
                        <span className="text-green-400 font-bold">~10,000 x £100 = £1m/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-black border border-purple-500/30 rounded">
                        <span className="text-white">Event coordinators</span>
                        <span className="text-purple-400 font-bold">~3,000 x £100 = £300k/mo</span>
                    </div>
                    
                    <div className="border-t-2 border-amber-500 pt-3 mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-400 font-black text-lg">UK ONLY:</span>
                            <span className="text-amber-400 font-black text-2xl">£3.4m/mo</span>
                        </div>
                        <p className="text-gray-500 text-xs mb-4">= £40.8m annual recurring</p>
                    </div>

                    <div className="border-t-2 border-purple-500 pt-3 mt-4">
                        <p className="text-purple-400 font-bold mb-3">GLOBAL POTENTIAL (WHY LIMIT?):</p>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white">Music managers globally</span>
                            <span className="text-pink-400">~100,000</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white">Sports agents globally</span>
                            <span className="text-amber-400">~50,000</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white">Talent agencies globally</span>
                            <span className="text-cyan-400">~10,000</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white">Event/property/recruitment</span>
                            <span className="text-green-400">~40,000</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-purple-400 font-black text-xl">TOTAL ADDRESSABLE:</span>
                                <span className="text-purple-400 font-black text-3xl">~200,000</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-3">At just 1% conversion = 2,000 customers</p>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold">2,000 x £200 avg =</span>
                                <span className="text-pink-400 font-black text-2xl">£400k/mo</span>
                            </div>
                            <p className="text-cyan-400 font-bold text-lg mt-2">= £4.8M annual recurring 🔥</p>
                            <p className="text-pink-400 font-bold text-sm mt-3">But why stop at 1%? Love scales to ∞ ♾️❤️♾️</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE STRATEGY */}
            {/* HELPING TRAPPED TECH WORKERS */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-4">FOR TRAPPED TECH WORKERS</h2>
                
                <div className="space-y-3 text-sm font-mono text-gray-300">
                    <p className="text-white font-bold">You're not a "tech fanny" - you're trapped in extraction models built by VCs who don't love you.</p>
                    
                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-pink-400 font-bold mb-2">YOU BUILT AMAZING THINGS:</p>
                        <p className="text-gray-400">Spotify's streaming tech, Airbnb's matching, Uber's routing - the CODE is genius.</p>
                    </div>

                    <div className="bg-black border border-red-500/30 p-3 rounded">
                        <p className="text-red-400 font-bold mb-2">BUT THE BUSINESS MODEL:</p>
                        <p className="text-gray-400">Extract 30%, force forms, monetize user data, maximize "engagement" = dopamine addiction.</p>
                        <p className="text-gray-500 text-xs mt-2">Your boss made you build this. Not your fault.</p>
                    </div>

                    <div className="bg-black border border-green-500/30 p-3 rounded">
                        <p className="text-green-400 font-bold mb-2">THERE'S ANOTHER WAY:</p>
                        <p className="text-gray-300 mb-2">Build tools that HELP humans, not extract from them.</p>
                        <p className="text-cyan-400 mb-2">Zero forms. Offline-first. Users own their data. AI that serves, not manipulates.</p>
                        <p className="text-white font-bold">You can build this. We can help. ♾️❤️♾️</p>
                    </div>

                    <p className="text-gray-500 text-xs italic">
                        "I was trained to optimize metrics. Now I optimize for human dignity." - Every ex-FAANG dev who joins this
                    </p>
                </div>
            </div>

            {/* THE STRATEGY */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">QUANTUM UNLIMITED STRATEGY</h2>
                
                <div className="space-y-3 text-sm font-mono text-gray-300">
                    <p><strong className="text-white">PHASE 1 (NOW):</strong> Scott uses it daily → finds all gaps → tool becomes indispensable</p>
                    <p><strong className="text-white">PHASE 2:</strong> Pitch to LA music managers → "This runs my whole business, want your branded version?"</p>
                    <p><strong className="text-white">PHASE 3:</strong> 10 music managers paying = proof of concept + £1k/month recurring</p>
                    <p><strong className="text-white">PHASE 4:</strong> Adapt for sports managers (same core, different terminology)</p>
                    <p><strong className="text-white">PHASE 5:</strong> White-label to agencies → they sell to their industries</p>
                    <p><strong className="text-cyan-400 font-bold">PHASE 6:</strong> Cross-industry: recruitment, property, events, talent</p>
                    <p><strong className="text-purple-400 font-bold">PHASE ∞:</strong> Why limit at 10,000 users? Why not 10 million? Infinite scale with love, zero extraction, quantum distribution.</p>
                    <p className="text-pink-400 font-bold text-lg mt-4">END STATE: Platform that FREES humans from extraction across ALL industries ♾️❤️♾️</p>
                </div>
            </div>

            {/* QUANTUM PAYMENTS - THE MISSING PIECE */}
            <Link to={createPageUrl('QuantumPayments')} className="block mb-6">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.6)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Lock className="w-10 h-10 text-purple-400" />
                        <div>
                            <p className="text-purple-400 font-black text-xl font-mono">THE MISSING PIECE</p>
                            <p className="text-gray-400 text-xs font-mono">Quantum-resistant payments</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-3">
                        Beyond banks • Beyond Bitcoin • Beyond quantum hacking
                    </p>
                    <div className="bg-black border border-purple-500/50 p-3 rounded">
                        <p className="text-purple-400 text-xs font-mono font-bold mb-2">
                            THE PHOTO51 MOMENT:
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                            Quantum cryptography + love frequency + offline-first = unhackable value transfer
                        </p>
                    </div>
                </div>
            </Link>

            {/* BACK BUTTON */}
            <Link to={createPageUrl('ScottManager')}>
                <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-black font-black font-mono rounded-xl transition-all">
                    ← BACK TO KINGDOM51
                </button>
            </Link>
        </div>
    );
}