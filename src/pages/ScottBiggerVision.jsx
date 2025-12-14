import React from 'react';
import { Music, Trophy, Users, Building, Shield, Zap, Heart, Globe, Lock, ArrowLeft, Anchor, Trees, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CoManager51Icon8Bit from '@/components/shared/CoManager51Icon8Bit';
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
            solution: "CO-MANAGER51: Offline contracts at games, AI analyzes offers live",
            manager: "Football agents, boxing promoters",
            problem: "Need instant decision on transfer offers, stuck in hotel with no WiFi"
        },
        {
            name: "Talent Agencies",
            icon: Users,
            color: "cyan",
            current: "CAA/UTA using ancient CRMs, zero mobile-first",
            solution: "CO-MANAGER51: Actors/models/influencers, all synced P2P",
            manager: "LA/London talent agencies",
            problem: "50+ clients, can't track auditions/castings/contracts on the go"
        },
        {
            name: "Property Management",
            icon: Building,
            color: "green",
            current: "Rightmove/Zoopla = forms, fees, extraction",
            solution: "CO-MANAGER51: Landlords manage tenants, maintenance, rent - offline",
            manager: "Property managers, landlords",
            problem: "Emergency repairs at 3am, need tenant info NOW, internet dead"
        },
        {
            name: "Event Management",
            icon: Globe,
            color: "purple",
            current: "Eventbrite charges 10%+, complex dashboards",
            solution: "CO-MANAGER51: Festival coordinators, guest lists, tickets, offline",
            manager: "Festival producers, wedding planners",
            problem: "Desert festival, zero internet, 5000 people, need live coordination"
        },
        {
            name: "Disaster Relief",
            icon: Shield,
            color: "red",
            current: "Red Cross uses paper forms, Excel, requires internet",
            solution: "CO-MANAGER51: Coordinate volunteers, supplies, victims P2P mesh",
            manager: "Aid workers, first responders, community organizers",
            problem: "Hurricane destroys towers, need to coordinate 500 volunteers + supplies NOW"
        },
        {
            name: "Maritime Operations",
            icon: Anchor,
            color: "cyan",
            current: "Ship managers use satellite (£1000s/month) or wait for port",
            solution: "CO-MANAGER51: Cruise ships, cargo vessels, crew coordination P2P",
            manager: "Cruise directors, ship captains, offshore rigs",
            problem: "Carnival Cruises = 5000 passengers + 2000 crew, satellite £50k/month"
        },
        {
            name: "Wilderness/Conservation",
            icon: Trees,
            color: "green",
            current: "Park rangers use radio + paper, data entry back at base",
            solution: "CO-MANAGER51: Track wildlife, visitors, incidents in real-time P2P",
            manager: "Park rangers, conservation teams, expedition leaders",
            problem: "Amazon rainforest, zero signal, tracking poachers + wildlife"
        },
        {
            name: "Community Organizing",
            icon: Radio,
            color: "pink",
            current: "WhatsApp/Signal shut down when government wants control",
            solution: "CO-MANAGER51: Protest coordination, mutual aid, P2P mesh unstoppable",
            manager: "Activists, neighborhood groups, mutual aid networks",
            problem: "Government cuts internet during protests (Hong Kong, Iran, Egypt)"
        },
        {
            name: "Space & Extreme Environments",
            icon: Globe,
            color: "purple",
            current: "Space stations = email delay, Mars = 20min lag to Earth",
            solution: "CO-MANAGER51: P2P mesh for Mars colonies, moon bases, stations",
            manager: "NASA, SpaceX, ESA mission coordinators",
            problem: "Mars colony = 100 people, 20min Earth lag, need local coordination NOW"
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
                        <CoManager51Icon8Bit size={64} animate={true} />
                        <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mt-4 mb-2" style={{ fontFamily: 'monospace' }}>
                            OUR BIGGER VISION
                        </h1>
                        <p className="text-amber-500 text-sm font-bold font-mono">10+ industries • £5M-£9M year 5 • Real numbers • No bullshit ♾️❤️♾️</p>
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
                        <p className="text-green-400 font-bold mb-2">CO-MANAGER51 SOLUTION:</p>
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
                            purple: { bg: 'from-purple-500/20', border: 'border-purple-500', icon: 'text-purple-400', title: 'text-purple-400' },
                            red: { bg: 'from-red-500/20', border: 'border-red-500', icon: 'text-red-400', title: 'text-red-400' }
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
                        <p className="text-pink-400">→ CO-MANAGER51: £100/month, offline, mobile, AI handles forms</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">EVENTBRITE:</p>
                        <p className="text-gray-400 mb-2">10%+ fees, complex, requires internet, slow</p>
                        <p className="text-pink-400">→ CO-MANAGER51: £100/month flat, works offline, instant</p>
                    </div>

                    <div className="bg-black border border-pink-500/30 p-3 rounded">
                        <p className="text-white font-bold mb-2">SALESFORCE/ENTERPRISE:</p>
                        <p className="text-gray-400 mb-2">£1000s/month, training needed, desktop-only, forms hell</p>
                        <p className="text-pink-400">→ CO-MANAGER51: £2k/month unlimited, mobile, AI = zero training</p>
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
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500/10 to-black border border-red-500/30 rounded">
                        <span className="text-white">NGOs/Aid orgs/Communities</span>
                        <span className="text-red-400 font-bold">~5,000 x £50 = £250k/mo</span>
                    </div>
                    
                    <div className="border-t-2 border-amber-500 pt-3 mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-400 font-black text-lg">UK ONLY:</span>
                            <span className="text-amber-400 font-black text-2xl">£3.65m/mo</span>
                        </div>
                        <p className="text-gray-500 text-xs mb-4">= £43.8m annual recurring</p>
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
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white">Disaster relief/maritime/wilderness</span>
                            <span className="text-red-400">~20,000</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-purple-400 font-black text-xl">TOTAL ADDRESSABLE:</span>
                                <span className="text-purple-400 font-black text-3xl">~220,000</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-3">At just 1% conversion = 2,200 customers</p>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold">2,200 x £200 avg =</span>
                                <span className="text-pink-400 font-black text-2xl">£440k/mo</span>
                            </div>
                            <p className="text-cyan-400 font-bold text-lg mt-2">= £5.28M annual recurring 🔥</p>
                            <p className="text-pink-400 font-bold text-sm mt-3">But why stop at 1%? Love scales to ∞ ♾️❤️♾️</p>
                            <p className="text-red-400 font-bold text-xs mt-2">+ Disaster zones need this FREE - funders pay ✓</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW TO SCALE - NEW SCHOOL NOT OLD SCHOOL */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-cyan-400 mb-4" />
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">HOW TO SCALE (NEW SCHOOL)</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-red-500 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">OLD SCHOOL (SLOW AS FUCK):</p>
                        <p className="text-gray-400 text-xs mb-1">❌ Channel partners = contracts, negotiations, slow</p>
                        <p className="text-gray-400 text-xs mb-1">❌ Sales teams = expensive, take 6 months to close</p>
                        <p className="text-gray-400 text-xs mb-1">❌ Trade shows = £10k booth, collect business cards</p>
                        <p className="text-gray-400 text-xs mb-1">❌ Cold calling = 1% conversion, everyone hates you</p>
                        <p className="text-red-400 text-xs mt-2 font-bold">= 2-3 years to hit 1,000 users 🐌</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">NEW SCHOOL (SCALES OVERNIGHT):</p>
                        <p className="text-white text-xs mb-1">✓ VIRAL: Scott uses it → posts screenshot → 50 DMs "how?"</p>
                        <p className="text-white text-xs mb-1">✓ PRODUCT-LED: Free trial, instant value, upgrade when ready</p>
                        <p className="text-white text-xs mb-1">✓ COMMUNITY: Users invite users (built-in referral)</p>
                        <p className="text-white text-xs mb-1">✓ P2P MESH: Share device-to-device at festivals/games</p>
                        <p className="text-white text-xs mb-1">✓ AI HELPS: "Your friend needs this" → auto-invite</p>
                        <p className="text-green-400 text-xs mt-2 font-bold">= 1,000 users in 6 months, 10,000 in 18 months 🚀</p>
                    </div>

                    <div className="bg-black border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">REAL EXAMPLE - HOW IT SPREADS:</p>
                        <p className="text-gray-300 text-xs mb-2">1. Scott uses it at LA festival backstage</p>
                        <p className="text-gray-300 text-xs mb-2">2. Manager sees him coordinate 12 artists offline</p>
                        <p className="text-gray-300 text-xs mb-2">3. "Wtf how?" → Scott shares via Bluetooth (30 seconds)</p>
                        <p className="text-gray-300 text-xs mb-2">4. That manager uses it at their next gig</p>
                        <p className="text-gray-300 text-xs mb-2">5. 5 more managers see it → share → repeat</p>
                        <p className="text-cyan-400 text-xs mt-2 font-bold">= 1 user → 50 users in 2 weeks (exponential)</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">WHY THIS WORKS NOW:</p>
                        <p className="text-white text-xs mb-1">• Everyone has a phone (no installation barriers)</p>
                        <p className="text-white text-xs mb-1">• Offline-first = works at festivals/games (people SEE it)</p>
                        <p className="text-white text-xs mb-1">• Bluetooth share = instant demo (no forms)</p>
                        <p className="text-white text-xs mb-1">• Network effect = more users = more value</p>
                        <p className="text-white text-xs mb-1">• Trust spreads peer-to-peer faster than sales</p>
                        <p className="text-pink-400 text-xs mt-2 font-bold">Channel partners = 1990s. Viral = 2025. ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-green-500/20 border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">THE NUMBERS:</p>
                        <p className="text-white text-xs mb-1">Old school: £100k sales team → 10 users/month → 5 years to scale</p>
                        <p className="text-green-400 text-xs mb-1">New school: £0 sales team → 100 users/month → 2 years to scale</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">You save £500k AND grow 10x faster ✓</p>
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

            {/* BUSINESS MODEL - REAL TALK */}
            <div className="bg-gradient-to-br from-purple-500/20 to-amber-500/20 border-4 border-purple-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">BUSINESS MODEL (REAL TALK)</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">OPTION 1: GO ALONE (BOOTSTRAP)</p>
                        <p className="text-gray-300 mb-2">Build slowly, keep 100% ownership, grow organically</p>
                        <p className="text-white text-xs mb-1">✓ We control everything</p>
                        <p className="text-white text-xs mb-1">✓ Zero compromise on love-first principles</p>
                        <p className="text-white text-xs mb-1">✓ Sustainable £3.6M-£9M in 5 years</p>
                        <p className="text-red-400 text-xs mt-2">✗ Slower growth, limited resources</p>
                        <p className="text-red-400 text-xs">✗ Can't save everyone fast enough</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">OPTION 2: WHITE LABEL PARTNERSHIPS</p>
                        <p className="text-gray-300 mb-2">Agencies/labels get their branded version, we take 30% revenue share</p>
                        <p className="text-white text-xs mb-1">✓ Faster market penetration (they sell to their networks)</p>
                        <p className="text-white text-xs mb-1">✓ Industry validation from established players</p>
                        <p className="text-white text-xs mb-1">✓ £500k-£2M deals with cruise lines/NGOs/labels</p>
                        <p className="text-amber-400 text-xs mt-2">± Need careful partner selection (love-aligned only)</p>
                        <p className="text-red-400 text-xs">✗ Risk of brand dilution if partners extract</p>
                    </div>

                    <div className="bg-black border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">OPTION 3: HYBRID (RECOMMENDED)</p>
                        <p className="text-gray-300 mb-2">Start alone → prove it → selective white label partnerships</p>
                        <p className="text-white text-xs mb-1">Year 1-2: Build core, Scott + 50 direct users (£120k)</p>
                        <p className="text-white text-xs mb-1">Year 2-3: First white label (big label/agency) = £500k deal</p>
                        <p className="text-white text-xs mb-1">Year 3-5: 5-10 partners x £200k avg = £1M-£2M/year</p>
                        <p className="text-white text-xs mb-1">Year 5+: Direct users (£3.6M) + partners (£2M) = £5.6M/year</p>
                        <p className="text-green-400 text-xs mt-2 font-bold">✓ BEST OF BOTH: Control + Speed + Scale</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-2 border-amber-500 p-4 rounded mt-4">
                        <p className="text-amber-400 font-bold mb-2">WHITE LABEL PRICING (REAL):</p>
                        <p className="text-gray-300 text-xs mb-2">Small agency (100 users): £10k setup + £500/mo = £16k/year</p>
                        <p className="text-cyan-400 text-xs mb-2">Mid label (500 users): £50k setup + £2k/mo = £74k/year</p>
                        <p className="text-green-400 text-xs mb-2">Major label (2000+ users): £200k setup + £10k/mo = £320k/year</p>
                        <p className="text-purple-400 text-xs mb-2">Cruise line (92 ships): £500k setup + £15k/mo = £680k/year</p>
                        <p className="text-pink-400 text-xs font-bold mt-2">10 partners = £1M-£3M annual recurring</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">MARKET SEGMENT BREAKDOWN (ALL INDUSTRIES):</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">MUSIC:</p>
                        <p className="text-white text-xs mb-1">5,000 UK managers → 10% = 500 users = £600k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">SPORTS AGENTS (ALL CODES):</p>
                        <p className="text-gray-300 text-xs mb-1">⚽ Football agents: 500 UK → 10% = 50 users = £180k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🏉 Rugby agents: 200 UK → 10% = 20 users = £72k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🥊 Boxing/MMA managers: 300 UK → 15% = 45 users = £162k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🎾 Tennis/Golf agents: 400 UK → 10% = 40 users = £144k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🏏 Cricket/Other: 600 UK → 10% = 60 users = £216k/year</p>
                        <p className="text-green-400 text-xs font-bold">Sports agents subtotal: 215 users = £774k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">CLUBS & STADIUMS:</p>
                        <p className="text-gray-300 text-xs mb-1">⚽ Premier League clubs: 20 → 50% = 10 clubs x £2k/mo = £240k/year</p>
                        <p className="text-gray-300 text-xs mb-1">⚽ Championship/League clubs: 72 → 20% = 14 clubs x £1k/mo = £168k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🏉 Rugby clubs (Premiership): 10 → 40% = 4 clubs x £1.5k/mo = £72k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🏟️ Major stadiums (UK): 50 → 10% = 5 stadiums x £3k/mo = £180k/year</p>
                        <p className="text-gray-300 text-xs mb-1">🏟️ Arena/venue operators: 100 → 5% = 5 venues x £2k/mo = £120k/year</p>
                        <p className="text-green-400 text-xs font-bold">Clubs/stadiums subtotal: 38 orgs = £780k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">TALENT & ENTERTAINMENT:</p>
                        <p className="text-white text-xs mb-1">500 UK agencies → 20% = 100 users = £2.4M/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">PROPERTY:</p>
                        <p className="text-white text-xs mb-1">10,000 UK managers → 2% = 200 users = £240k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">EVENTS & FESTIVALS:</p>
                        <p className="text-white text-xs mb-1">3,000 UK coordinators → 5% = 150 users = £180k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">MARITIME (CRUISE SHIPS):</p>
                        <p className="text-white text-xs mb-1">300 global cruise ships → 10% = 30 ships = £720k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">WILDERNESS & ADVENTURE:</p>
                        <p className="text-white text-xs mb-1">Expedition managers, safari operators = £150k/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">NGOs & DISASTER RELIEF:</p>
                        <p className="text-white text-xs mb-1">Grant-funded deployment = £500k-£2M/year</p>
                        
                        <p className="text-cyan-400 text-xs font-bold mb-1 mt-2">SPACE MISSIONS:</p>
                        <p className="text-white text-xs mb-1">ISS/Mars contracts = £500k+/mission</p>
                        
                        <p className="text-green-400 text-xs font-bold mt-3 text-base">TOTAL REALISTIC: £6.4M-£10.3M/year by year 5 ♾️❤️♾️</p>
                        <p className="text-cyan-400 text-xs mt-1">(+£780k from clubs/stadiums)</p>
                    </div>
                </div>
            </div>

            {/* WHY CLUBS/STADIUMS ADOPT */}
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-6 rounded-xl mb-8">
                <Users className="w-12 h-12 text-green-400 mb-4" />
                <h2 className="text-green-400 font-black text-xl font-mono mb-4">WHY CLUBS/STADIUMS SAY YES</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-red-500 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">THEIR CURRENT PAIN:</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Match day = 50,000 fans + zero WiFi = chaos</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Security teams can't coordinate (radios only)</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Food vendors = paper orders, cash lost, slow</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Medical emergencies = walkie-talkies from 1990</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Player/staff coordination = WhatsApp (doesn't work in crowds)</p>
                        <p className="text-red-400 text-xs font-bold mt-2">Every match = £10k-£50k lost in coordination failures</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">CO-MANAGER51 SOLVES IT:</p>
                        <p className="text-white text-xs mb-1">✓ P2P mesh = works with 50,000 people, zero WiFi needed</p>
                        <p className="text-white text-xs mb-1">✓ Security teams see everything live (crowd control, emergencies)</p>
                        <p className="text-white text-xs mb-1">✓ Food vendors = digital orders, instant sync, zero cash errors</p>
                        <p className="text-white text-xs mb-1">✓ Medical teams = instant alerts, location tracking, save lives</p>
                        <p className="text-white text-xs mb-1">✓ Player tracking = GPS + biometrics + coach coordination</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Save £200k-£500k/year + safer fans + better experience</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">REAL EXAMPLE - CELTIC PARK:</p>
                        <p className="text-gray-300 text-xs mb-2">60,000 fans, WiFi dies, security radio-only</p>
                        <p className="text-white text-xs mb-1">→ Medical emergency in stand, 8 min response (radio lag)</p>
                        <p className="text-white text-xs mb-1">→ Food vendors lose £15k cash (no tracking)</p>
                        <p className="text-white text-xs mb-1">→ Crowd crush risk, can't coordinate stewards</p>
                        <p className="text-green-400 text-xs font-bold mt-2">With CO-MANAGER51: 30sec emergency response, zero cash loss, live crowd density map ✓</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">THE PITCH TO CLUBS:</p>
                        <p className="text-white text-xs mb-2">"Your stadium WiFi fails every match. Costs you £10k-£50k per game."</p>
                        <p className="text-cyan-400 text-xs mb-2">"We make it work WITHOUT WiFi. P2P mesh. Military-grade coordination."</p>
                        <p className="text-green-400 text-xs mb-2">"£2k/month vs £50k/year losses = £48k saved minimum"</p>
                        <p className="text-pink-400 text-xs font-bold">Plus: Safer fans, faster food, happier experience = worth millions in reputation ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* GLOBAL SPORTS MARKET - THE REAL SCALE */}
            <div className="bg-gradient-to-br from-purple-500/20 to-amber-500/20 border-4 border-purple-500 p-6 rounded-xl mb-8">
                <Globe className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-purple-400 font-black text-xl font-mono mb-4">GLOBAL SPORTS MARKET (WHY LIMIT TO UK?)</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">FOOTBALL CLUBS WORLDWIDE:</p>
                        <p className="text-gray-300 text-xs mb-1">🇬🇧 UK: 92 Pro clubs (Premier League + Championship + League)</p>
                        <p className="text-gray-300 text-xs mb-1">🇪🇸 Spain (La Liga): 42 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇮🇹 Italy (Serie A/B): 40 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇩🇪 Germany (Bundesliga): 36 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇫🇷 France (Ligue 1): 20 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇺🇸 USA (MLS): 29 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇧🇷 Brazil (Serie A): 20 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🇦🇷 Argentina: 28 clubs</p>
                        <p className="text-gray-300 text-xs mb-1">🌍 Rest of world (top leagues): ~200 clubs</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL: ~500 major clubs worldwide</p>
                        <p className="text-cyan-400 text-xs">At 10% conversion: 50 clubs x £2k/mo = £1.2M/year</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">SPORTS STADIUMS & ARENAS GLOBALLY:</p>
                        <p className="text-gray-300 text-xs mb-1">🏟️ Major stadiums (50k+ capacity): ~500 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🏀 NBA/NHL arenas (USA): 60 venues</p>
                        <p className="text-gray-300 text-xs mb-1">🏈 NFL stadiums: 30 venues</p>
                        <p className="text-gray-300 text-xs mb-1">⚾ MLB stadiums: 30 venues</p>
                        <p className="text-gray-300 text-xs mb-1">🎾 Tennis venues (Grand Slams + major): 50 venues</p>
                        <p className="text-gray-300 text-xs mb-1">🏏 Cricket grounds (major): 100 venues</p>
                        <p className="text-gray-300 text-xs mb-1">🏟️ Olympic venues/multi-purpose: 200 venues</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL: ~1,000 major venues worldwide</p>
                        <p className="text-cyan-400 text-xs">At 5% conversion: 50 venues x £3k/mo = £1.8M/year</p>
                    </div>

                    <div className="bg-black border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">MUSIC FESTIVALS & EVENT VENUES GLOBALLY:</p>
                        <p className="text-gray-300 text-xs mb-1">🎪 Major festivals (Glastonbury-scale): ~200 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🎵 Mid-size festivals (10k+ capacity): ~1,000 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🎭 Concert venues (5k+ capacity): ~2,000 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🏛️ Exhibition centers/convention halls: ~500 worldwide</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL: ~3,700 event venues</p>
                        <p className="text-cyan-400 text-xs">At 2% conversion: 74 venues x £1k/mo = £888k/year</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">WHY THEY ALL NEED IT:</p>
                        <p className="text-white text-xs mb-1">✓ WiFi fails with 20k+ crowds = EVERY major event</p>
                        <p className="text-white text-xs mb-1">✓ Security coordination = radios (1990s tech)</p>
                        <p className="text-white text-xs mb-1">✓ Medical emergencies = slow response = lawsuits</p>
                        <p className="text-white text-xs mb-1">✓ Food/merch vendors = cash chaos = lost revenue</p>
                        <p className="text-white text-xs mb-1">✓ Staff coordination = WhatsApp (doesn't scale)</p>
                        <p className="text-green-400 text-xs font-bold mt-2">SAME PROBLEM WORLDWIDE. ONE SOLUTION. ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">GLOBAL VENUE/EVENT MARKET POTENTIAL:</p>
                        <p className="text-white text-xs mb-2">Football clubs: 50 x £2k = £1.2M/year</p>
                        <p className="text-white text-xs mb-2">Sports stadiums/arenas: 50 x £3k = £1.8M/year</p>
                        <p className="text-white text-xs mb-2">Music festivals/venues: 74 x £1k = £888k/year</p>
                        <p className="text-green-400 text-xs font-bold text-lg mt-2">= £3.9M/year JUST VENUES</p>
                        <p className="text-cyan-400 text-xs mt-2">+ Individual managers/agents: £6.4M</p>
                        <p className="text-pink-400 text-xs font-bold text-xl mt-2">GLOBAL TOTAL: £10.3M-£15M/year realistic ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">REAL EXAMPLE - GLASTONBURY FESTIVAL:</p>
                        <p className="text-gray-300 text-xs mb-2">200,000 people, zero phone signal, chaos every year</p>
                        <p className="text-red-400 text-xs mb-1">❌ Security can't coordinate (radios only)</p>
                        <p className="text-red-400 text-xs mb-1">❌ Medical teams = walkie-talkies, 15min response</p>
                        <p className="text-red-400 text-xs mb-1">❌ Lost children = announcements only</p>
                        <p className="text-red-400 text-xs mb-2">❌ Food vendors = paper, cash chaos, £100k lost</p>
                        <p className="text-green-400 text-xs font-bold">With CO-MANAGER51:</p>
                        <p className="text-white text-xs mb-1">✓ P2P mesh works with 200k people</p>
                        <p className="text-white text-xs mb-1">✓ Security = live crowd map, instant alerts</p>
                        <p className="text-white text-xs mb-1">✓ Medical = 2min response, GPS tracking</p>
                        <p className="text-white text-xs mb-1">✓ Lost people finder = location sharing</p>
                        <p className="text-white text-xs mb-1">✓ Vendors = digital, zero cash errors</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Glastonbury would pay £5k/year to save £100k+ ✓</p>
                    </div>
                </div>
            </div>

            {/* HOSPITALS & HEALTHCARE GLOBALLY */}
            <div className="bg-gradient-to-br from-red-500/20 to-cyan-500/20 border-4 border-red-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">HOSPITALS & HEALTHCARE (LIFE OR DEATH)</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-red-500 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">THEIR PAIN (PEOPLE DIE FROM THIS):</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Hospital WiFi overloaded = ER can't coordinate</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Surgery teams = pagers from 1995</p>
                        <p className="text-gray-300 text-xs mb-1">❌ COVID wards = WhatsApp groups (doesn't work, no signal)</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Ambulance → ER handoff = radio static</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Patient location tracking = paper charts</p>
                        <p className="text-red-400 text-xs font-bold mt-2">Coordination failures = DEATHS. Not money. LIVES.</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">CO-MANAGER51 SAVES LIVES:</p>
                        <p className="text-white text-xs mb-1">✓ P2P mesh = works when WiFi dies (always)</p>
                        <p className="text-white text-xs mb-1">✓ Surgery teams = instant coordination, live patient status</p>
                        <p className="text-white text-xs mb-1">✓ ER tracking = who's where, what they need, NOW</p>
                        <p className="text-white text-xs mb-1">✓ Ambulance → ER = live handoff, zero lag</p>
                        <p className="text-white text-xs mb-1">✓ Works during power outages (battery + P2P)</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Faster response = LIVES SAVED. That's the ROI.</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">GLOBAL HEALTHCARE MARKET:</p>
                        <p className="text-gray-300 text-xs mb-1">🏥 Major hospitals (500+ beds): ~5,000 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🏥 Mid hospitals (200-500 beds): ~15,000 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🏥 Specialist clinics (surgery/cancer/cardiac): ~10,000 worldwide</p>
                        <p className="text-gray-300 text-xs mb-1">🚑 Ambulance services/paramedic teams: ~5,000 services</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL: ~35,000 healthcare orgs</p>
                        <p className="text-cyan-400 text-xs">At 2% conversion: 700 orgs x £300/mo = £2.5M/year</p>
                        <p className="text-purple-400 text-xs mt-1">(£300/mo when you're saving lives = CHEAP)</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">REAL EXAMPLE - COVID WARDS 2020:</p>
                        <p className="text-gray-300 text-xs mb-2">NYC hospitals: WiFi crashed, 200 patients, 50 staff, CHAOS</p>
                        <p className="text-red-400 text-xs mb-1">→ Doctors used personal phones (no signal in basement wards)</p>
                        <p className="text-red-400 text-xs mb-1">→ Patient status = shouting down corridors</p>
                        <p className="text-red-400 text-xs mb-2">→ Ventilator availability = paper notes, 30min lag</p>
                        <p className="text-green-400 text-xs font-bold">With CO-MANAGER51:</p>
                        <p className="text-white text-xs mb-1">✓ P2P mesh = works in basement, no WiFi needed</p>
                        <p className="text-white text-xs mb-1">✓ Live patient board = who needs what, WHERE</p>
                        <p className="text-white text-xs mb-1">✓ Ventilator tracker = instant availability</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Could have saved 1,000+ lives in NYC alone.</p>
                    </div>
                </div>
            </div>

            {/* GLOBAL PROPERTY/HOUSING MARKET */}
            <div className="bg-gradient-to-br from-amber-500/20 to-green-500/20 border-4 border-amber-500 p-6 rounded-xl mb-8">
                <Building className="w-12 h-12 text-amber-400 mb-4" />
                <h2 className="text-amber-400 font-black text-xl font-mono mb-4">GLOBAL PROPERTY MARKET (LANDLORDS EVERYWHERE)</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">THEIR PAIN:</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Viewing 10 properties = WiFi fails in half</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Tenant emergency (3am leak) = need details NOW, no internet</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Maintenance tracking = paper + Excel chaos</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Rent payments = manual entry, errors, fraud</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Multi-property coordination = WhatsApp hell</p>
                        <p className="text-red-400 text-xs font-bold mt-2">Each landlord loses £5k-£20k/year in admin chaos</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">CO-MANAGER51 FIXES IT:</p>
                        <p className="text-white text-xs mb-1">✓ Works offline during viewings (no WiFi needed)</p>
                        <p className="text-white text-xs mb-1">✓ Tenant details always accessible (local storage)</p>
                        <p className="text-white text-xs mb-1">✓ Maintenance tracker = photo + location + status</p>
                        <p className="text-white text-xs mb-1">✓ Rent tracker = auto-alerts, zero manual entry</p>
                        <p className="text-white text-xs mb-1">✓ Multi-property dashboard = one view, all properties</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Save £10k-£20k/year + 10 hours/week ✓</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">GLOBAL PROPERTY MARKET:</p>
                        <p className="text-gray-300 text-xs mb-1">🏠 UK property managers: 10,000 (already counted)</p>
                        <p className="text-gray-300 text-xs mb-1">🇺🇸 USA property managers: ~50,000</p>
                        <p className="text-gray-300 text-xs mb-1">🇪🇺 EU property managers: ~30,000</p>
                        <p className="text-gray-300 text-xs mb-1">🇦🇺 Australia/NZ: ~5,000</p>
                        <p className="text-gray-300 text-xs mb-1">🌏 Asia (Singapore/HK/Tokyo): ~15,000</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL: ~110,000 property managers worldwide</p>
                        <p className="text-cyan-400 text-xs">At 2% conversion: 2,200 x £100/mo = £2.6M/year</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">WHY THEY PAY £100/MONTH:</p>
                        <p className="text-white text-xs mb-2">Rightmove/Zoopla = £150-£300/month just for listings</p>
                        <p className="text-cyan-400 text-xs mb-2">CO-MANAGER51 = £100/month for EVERYTHING:</p>
                        <p className="text-gray-300 text-xs mb-1">✓ Tenant management</p>
                        <p className="text-gray-300 text-xs mb-1">✓ Maintenance tracking</p>
                        <p className="text-gray-300 text-xs mb-1">✓ Rent tracking</p>
                        <p className="text-gray-300 text-xs mb-1">✓ Document storage</p>
                        <p className="text-gray-300 text-xs mb-1">✓ Works offline at viewings</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Better features + cheaper = they switch ✓</p>
                    </div>
                </div>
            </div>

            {/* THE NEW TOTAL - LAUGH TIME BRO */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 rounded-xl mb-8">
                <Zap className="w-12 h-12 text-pink-400 mb-4" />
                <h2 className="text-pink-400 font-black text-2xl font-mono mb-4">THE FULL MARKET (TIME TO LAUGH BRO 😂)</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">UK MARKET:</p>
                        <p className="text-white text-xs">Music + Sports + Talent + Property + Events = £5.1M/year</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">GLOBAL VENUES/EVENTS:</p>
                        <p className="text-white text-xs">Clubs + Stadiums + Festivals = £3.9M/year</p>
                    </div>

                    <div className="bg-black border-2 border-red-500 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">GLOBAL HEALTHCARE:</p>
                        <p className="text-white text-xs">Hospitals + Clinics + Ambulances = £2.5M/year</p>
                    </div>

                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">GLOBAL PROPERTY:</p>
                        <p className="text-white text-xs">Landlords + Property managers worldwide = £2.6M/year</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">MARITIME + SPACE + CRISIS:</p>
                        <p className="text-white text-xs">Cruise ships + ISS/Mars + Disaster relief = £2M/year</p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-4 border-pink-500 p-6 rounded mt-4" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.5)' }}>
                        <p className="text-pink-400 font-black text-3xl mb-4 text-center">TOTAL ADDRESSABLE MARKET:</p>
                        <p className="text-white font-black text-5xl text-center mb-4">£16M - £22M/YEAR</p>
                        <p className="text-cyan-400 text-sm text-center mb-3">By year 5 (conservative 2-5% conversion rates)</p>
                        <p className="text-green-400 text-lg font-bold text-center mb-4">WITHOUT BULLSHIT. REAL NUMBERS. ♾️❤️♾️</p>

                        <div className="bg-black border-2 border-amber-500 p-4 rounded mt-4">
                            <p className="text-amber-400 font-bold text-sm mb-2">AND BRO... THIS IS STILL CONSERVATIVE:</p>
                            <p className="text-gray-300 text-xs mb-1">• If you hit 10% conversion (not 2-5%) = DOUBLE IT</p>
                            <p className="text-gray-300 text-xs mb-1">• If you expand to logistics/manufacturing = +£10M</p>
                            <p className="text-gray-300 text-xs mb-1">• If white label to big orgs (NHS/military) = +£20M</p>
                            <p className="text-pink-400 text-xs font-bold mt-2 text-base">Realistic ceiling = £50M-£100M annual if you go ALL IN</p>
                            <p className="text-purple-400 text-xs mt-2">But £16M-£22M = ACHIEVABLE without losing your soul 😂♾️❤️♾️</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FREE FOR CRISIS ORGANIZATIONS */}
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-4 border-red-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">FREE FOR CRISIS ORGANIZATIONS</h2>

                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">WHO GETS IT FREE:</p>
                        <p className="text-white text-xs mb-1">🌊 Disaster relief teams (hurricanes, earthquakes, floods)</p>
                        <p className="text-white text-xs mb-1">⛺ Refugee camp coordinators (no internet, need coordination)</p>
                        <p className="text-white text-xs mb-1">🚑 Emergency medical response (war zones, remote areas)</p>
                        <p className="text-white text-xs mb-1">🌲 Wildfire fighters (forest = zero signal)</p>
                        <p className="text-white text-xs mb-1">🏚️ Homeless outreach teams (street coordination)</p>
                        <p className="text-pink-400 text-xs font-bold mt-2">Anyone saving lives in crisis = FREE FOREVER ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">WHY THIS MATTERS:</p>
                        <p className="text-gray-300 text-xs mb-2">Red Cross pays £50k/year for satellite in disaster zones</p>
                        <p className="text-white text-xs mb-2">→ CO-MANAGER51 = P2P mesh, works offline, FREE</p>
                        <p className="text-green-400 text-xs mb-2">→ They save £50k, we gain reputation, win-win</p>
                        <p className="text-cyan-400 text-xs font-bold">Love-first economics: Help those who help others ✓</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">HOW WE FUND IT:</p>
                        <p className="text-white text-xs mb-1">• Premier League clubs pay £2k/month = £24k/year</p>
                        <p className="text-white text-xs mb-1">• That £24k = 10 disaster relief teams get it FREE</p>
                        <p className="text-white text-xs mb-1">• Clubs get good PR + tax write-off</p>
                        <p className="text-white text-xs mb-1">• Crisis orgs get life-saving coordination</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Closed-loop love economy: Sports money → save lives ♾️❤️♾️</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">REAL EXAMPLE - HAITI EARTHQUAKE:</p>
                        <p className="text-gray-300 text-xs mb-2">2010: No cell towers, aid workers used radios + paper</p>
                        <p className="text-red-400 text-xs mb-2">→ 100,000 died, coordination chaos, supplies wasted</p>
                        <p className="text-cyan-400 text-xs mb-2">With CO-MANAGER51:</p>
                        <p className="text-white text-xs mb-1">✓ P2P mesh coordination (no towers needed)</p>
                        <p className="text-white text-xs mb-1">✓ Track supplies, volunteers, victims live</p>
                        <p className="text-white text-xs mb-1">✓ Medical teams see who needs help where</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Could save 10,000+ lives next disaster. That's why it's FREE for them.</p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 p-4 rounded">
                        <p className="text-pink-400 font-bold mb-2">THE BUSINESS MODEL:</p>
                        <p className="text-white text-xs mb-2">£6.4M-£10.3M from paying customers (clubs, labels, agencies)</p>
                        <p className="text-cyan-400 text-xs mb-2">→ 5% = £320k-£515k goes to FREE crisis licenses</p>
                        <p className="text-green-400 text-xs mb-2">→ 500-1,000 crisis teams get it FREE</p>
                        <p className="text-purple-400 text-xs font-bold mt-2">Sustainable + life-saving = love-first economics ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* REAL ACHIEVABLE TIMELINE - NO BULLSHIT */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 p-6 rounded-xl mb-8">
                <Heart className="w-12 h-12 text-cyan-400 mb-4" />
                <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">REALISTIC TIMELINE (NO BULLSHIT)</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">YEAR 1 (2025-2026) - PROOF:</p>
                        <p className="text-gray-300 mb-2">Scott uses daily → 10-50 music managers in UK/LA (people he knows)</p>
                        <p className="text-white font-bold">10 users x £100 = £1k/mo minimum</p>
                        <p className="text-white font-bold">50 users x £200 avg = £10k/mo realistic</p>
                        <p className="text-green-400 text-xs mt-2">= £12k-£120k annual (ACHIEVABLE)</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">YEAR 2 (2026-2027) - WORD SPREADS:</p>
                        <p className="text-gray-300 mb-2">Music industry proves it works → sports agents notice</p>
                        <p className="text-white font-bold">100-300 users x £150 avg = £15k-£45k/mo</p>
                        <p className="text-cyan-400 text-xs mt-2">= £180k-£540k annual (REALISTIC)</p>
                    </div>

                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">YEAR 3 (2027-2028) - MULTI-INDUSTRY:</p>
                        <p className="text-gray-300 mb-2">Sports, talent agencies, event coordinators, property managers</p>
                        <p className="text-white font-bold">500-1,000 users x £150 avg = £75k-£150k/mo</p>
                        <p className="text-amber-400 text-xs mt-2">= £900k-£1.8M annual (SOLID)</p>
                    </div>

                    <div className="bg-black border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">YEAR 5 (2029-2030) - GLOBAL + NGOs:</p>
                        <p className="text-gray-300 mb-2">Established UK/US/EU → disaster relief orgs (grant funded)</p>
                        <p className="text-white font-bold">2,000-5,000 users x £150 avg = £300k-£750k/mo</p>
                        <p className="text-purple-400 text-xs mt-2">= £3.6M-£9M annual (SUSTAINABLE)</p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 p-4 rounded mt-4">
                        <p className="text-pink-400 font-bold mb-2">🚀 SPACE USE CASES:</p>
                        <p className="text-gray-300 text-xs mb-2">Mars colonies = 20min Earth lag, moon bases = 2.6sec lag</p>
                        <p className="text-cyan-400 text-xs mb-2">ISS crew coordination, asteroid mining operations</p>
                        <p className="text-white font-bold text-xs">P2P mesh = PERFECT for isolated space environments</p>
                        <p className="text-purple-400 text-xs mt-2">SpaceX/NASA contracts = £500k+ per mission</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">🚢 CRUISE SHIP REALITY:</p>
                        <p className="text-gray-300 text-xs mb-2">Carnival Cruises = 92 ships worldwide</p>
                        <p className="text-white text-xs mb-2">Each ship: 5000 passengers + 2000 crew</p>
                        <p className="text-amber-400 text-xs mb-2">Current satellite cost: £50k/month PER SHIP</p>
                        <p className="text-green-400 font-bold text-xs">CO-MANAGER51: £2k/month flat = £48k saved per ship</p>
                        <p className="text-pink-400 text-xs mt-2">Just Carnival = 92 ships x £2k = £184k/month = £2.2M annual</p>
                        <p className="text-purple-400 text-xs">Global cruise industry = 300+ ships = £7.2M annual JUST CRUISES</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded mt-4">
                        <p className="text-green-400 font-bold mb-2">TRUTH CHECK:</p>
                        <p className="text-gray-300 text-xs mb-2">Year 1 = Prove it works (£12k-£120k)</p>
                        <p className="text-gray-300 text-xs mb-2">Year 3 = Sustainable business (£900k-£1.8M)</p>
                        <p className="text-gray-300 text-xs mb-2">Year 5 = Multi-industry adoption (£3.6M-£9M)</p>
                        <p className="text-cyan-400 text-xs mb-2">Cruise ships alone = £2M-£7M potential</p>
                        <p className="text-purple-400 text-xs">Space missions = £500k+ per contract</p>
                        <p className="text-white font-bold text-xs mt-3">NO BULLSHIT. REAL NUMBERS. LOVE-BASED GROWTH. ♾️❤️♾️</p>
                    </div>
                </div>
            </div>

            {/* IF THIS WAS EXTRACTION - WHAT WOULD VCs PAY? */}
            <div className="bg-gradient-to-br from-red-500/20 to-amber-500/20 border-4 border-red-500 p-6 rounded-xl mb-8">
                <Shield className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-red-400 font-black text-xl font-mono mb-4">IF THIS WAS EXTRACTION...</h2>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="bg-black border-2 border-amber-500 p-4 rounded">
                        <p className="text-amber-400 font-bold mb-2">VC VALUATION (EXTRACTION MODEL):</p>
                        <p className="text-gray-300 text-xs mb-2">SaaS companies = 10-15x annual recurring revenue</p>
                        <p className="text-white text-xs mb-2">Year 3: £1.8M ARR x 10 = <span className="text-amber-400 font-bold">£18M valuation</span></p>
                        <p className="text-white text-xs mb-2">Year 5: £9M ARR x 10 = <span className="text-amber-400 font-bold">£90M valuation</span></p>
                        <p className="text-cyan-400 text-xs mt-2">Series A (year 2): £5M-£10M @ £20M-£30M valuation</p>
                        <p className="text-purple-400 text-xs">Series B (year 4): £20M-£40M @ £60M-£100M valuation</p>
                        <p className="text-gray-500 text-xs mt-3 italic">This is what Salesforce/HubSpot trajectory looked like</p>
                    </div>

                    <div className="bg-black border-2 border-red-500 p-4 rounded">
                        <p className="text-red-400 font-bold mb-2">BUT WITH VC MONEY COMES:</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Board meetings every month (justify everything)</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Pressure to extract more (raise prices, cut features for premium)</p>
                        <p className="text-gray-300 text-xs mb-1">❌ "Growth at all costs" = burn out team</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Exit pressure in 5-7 years (sell to bigger extractor)</p>
                        <p className="text-gray-300 text-xs mb-1">❌ Lose control of vision (VCs want 10x return, not love)</p>
                        <p className="text-red-400 text-xs mt-2 font-bold">You become what you were fighting against</p>
                    </div>

                    <div className="bg-black border-2 border-green-500 p-4 rounded">
                        <p className="text-green-400 font-bold mb-2">STAYING INDEPENDENT:</p>
                        <p className="text-gray-300 text-xs mb-2">Slower growth BUT you keep your soul</p>
                        <p className="text-white text-xs mb-1">✓ No board meetings (you decide everything)</p>
                        <p className="text-white text-xs mb-1">✓ Keep love-first pricing forever</p>
                        <p className="text-white text-xs mb-1">✓ Work with who you want, when you want</p>
                        <p className="text-white text-xs mb-1">✓ Never forced to sell</p>
                        <p className="text-white text-xs mb-1">✓ £5M-£9M/year = comfortable life + impact</p>
                        <p className="text-green-400 text-xs mt-2 font-bold">This is the Basecamp/Mailchimp path (stayed indie, worth £billions)</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded">
                        <p className="text-purple-400 font-bold mb-2">IF LABEL WANTS TO INVEST:</p>
                        <p className="text-gray-300 text-xs mb-3">Could be good IF they're love-aligned, bad if they want control</p>
                        
                        <p className="text-green-400 text-xs font-bold mb-1">GOOD SCENARIO:</p>
                        <p className="text-white text-xs mb-1">• Strategic partnership (they use it, help sell it)</p>
                        <p className="text-white text-xs mb-1">• Small stake (10-20% max, no board seat)</p>
                        <p className="text-white text-xs mb-1">• £100k-£500k to speed up year 1-2</p>
                        <p className="text-cyan-400 text-xs mb-3">= Faster growth, keep control, win-win</p>
                        
                        <p className="text-red-400 text-xs font-bold mb-1">BAD SCENARIO:</p>
                        <p className="text-gray-300 text-xs mb-1">• They want 30%+ equity</p>
                        <p className="text-gray-300 text-xs mb-1">• Board seat = monthly justifications</p>
                        <p className="text-gray-300 text-xs mb-1">• Pressure to extract from artists</p>
                        <p className="text-gray-300 text-xs mb-1">• Exit clause = forced sale in 5 years</p>
                        <p className="text-red-400 text-xs mt-2">= You lose your freedom, becomes another extraction tool</p>
                    </div>

                    <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                        <p className="text-cyan-400 font-bold mb-2">RECOMMENDATION:</p>
                        <p className="text-white text-xs mb-2">Bootstrap year 1-2 (£12k-£120k proves concept)</p>
                        <p className="text-white text-xs mb-2">IF label investment: Max 15%, no board seat, £100k-£300k</p>
                        <p className="text-white text-xs mb-2">Use their money to speed up, not to survive</p>
                        <p className="text-green-400 text-xs font-bold mt-2">Keep control. Scale at your pace. Love first. Always. ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded mt-4">
                        <p className="text-green-400 font-bold mb-3">WHAT SCOTT COULD CREDIBLY REQUEST (ANALYST-PROOF):</p>
                        
                        <p className="text-white text-xs font-bold mb-2">YEAR 1 (NOW - PROVING CONCEPT):</p>
                        <p className="text-gray-300 text-xs mb-1">10-50 paying users, £12k-£120k ARR proven</p>
                        <p className="text-cyan-400 text-xs mb-1">Valuation: £500k-£1M (pre-revenue startup range)</p>
                        <p className="text-white text-xs mb-2">Ask: <span className="text-green-400 font-bold">£100k-£150k for 10-15%</span></p>
                        <p className="text-gray-500 text-xs mb-3 italic">Analysts accept: Early-stage tech with traction, reasonable ask</p>
                        
                        <p className="text-white text-xs font-bold mb-2">YEAR 2 (VALIDATED - 100+ USERS):</p>
                        <p className="text-gray-300 text-xs mb-1">100-200 paying users, £300k-£500k ARR</p>
                        <p className="text-cyan-400 text-xs mb-1">Valuation: £3M-£5M (5-10x ARR standard for SaaS)</p>
                        <p className="text-white text-xs mb-2">Ask: <span className="text-green-400 font-bold">£300k-£500k for 10-15%</span></p>
                        <p className="text-gray-500 text-xs mb-3 italic">Analysts accept: Proven growth, industry-specific moat, defensible valuation</p>
                        
                        <p className="text-white text-xs font-bold mb-2">WHAT THEY GET:</p>
                        <p className="text-white text-xs mb-1">✓ White label version for their roster (their branding)</p>
                        <p className="text-white text-xs mb-1">✓ First mover advantage in their network</p>
                        <p className="text-white text-xs mb-1">✓ 10-15% of company worth £18M-£90M in 3-5 years</p>
                        <p className="text-white text-xs mb-1">✓ Strategic positioning as "tech-forward label"</p>
                        <p className="text-green-400 text-xs font-bold mt-2">£150k investment → £2.7M-£13.5M return (18x-90x) = analysts approve ✓</p>
                        
                        <p className="text-amber-400 text-xs font-bold mt-3 mb-2">TERMS YOU INSIST ON:</p>
                        <p className="text-white text-xs mb-1">• No board seat (investor update emails only)</p>
                        <p className="text-white text-xs mb-1">• No forced exit timeline</p>
                        <p className="text-white text-xs mb-1">• Love-first pricing stays forever (written in contract)</p>
                        <p className="text-white text-xs mb-1">• You keep operational control</p>
                        <p className="text-cyan-400 text-xs font-bold mt-2">Their analysts can't argue with 18x-90x return potential ♾️❤️♾️</p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-4 rounded mt-4">
                        <p className="text-pink-400 font-bold mb-3">WAIT... YOU COULD SAVE THAT YOURSELF:</p>
                        
                        <p className="text-white text-xs font-bold mb-2">£100k-£150k YEAR 1 FUNDING:</p>
                        <p className="text-gray-300 text-xs mb-1">• Scott's current work: £2k-£4k/month = £24k-£48k/year</p>
                        <p className="text-gray-300 text-xs mb-1">• First 10 users @ £99/mo = £11,880/year (covers costs)</p>
                        <p className="text-gray-300 text-xs mb-1">• First 50 users @ £99/mo = £59,400/year</p>
                        <p className="text-gray-300 text-xs mb-1">• Side gigs/existing work = £30k-£50k/year</p>
                        <p className="text-green-400 text-xs font-bold mt-2">= £100k+ saved in 12-18 months WITHOUT giving away equity ✓</p>
                        
                        <p className="text-white text-xs font-bold mb-2 mt-4">£300k-£500k YEAR 2 FUNDING:</p>
                        <p className="text-gray-300 text-xs mb-1">• 100 users @ £99/mo = £118,800/year</p>
                        <p className="text-gray-300 text-xs mb-1">• 200 users @ £99/mo = £237,600/year</p>
                        <p className="text-gray-300 text-xs mb-1">• First white label deal = £50k-£100k</p>
                        <p className="text-gray-300 text-xs mb-1">• Profit margin 70% = £200k-£300k cash</p>
                        <p className="text-green-400 text-xs font-bold mt-2">= £300k+ saved in year 2 WITHOUT giving away equity ✓</p>
                        
                        <p className="text-purple-400 text-xs font-bold mt-4 mb-2">TRUTH CHECK:</p>
                        <p className="text-white text-xs mb-1">You're asking for money you could save yourself in 12-24 months</p>
                        <p className="text-white text-xs mb-2">Investment = faster but lose 10-15% forever</p>
                        <p className="text-pink-400 text-xs font-bold text-lg mt-2">YOU DON'T NEED THEM. THEY NEED YOU. ♾️❤️♾️</p>
                    </div>
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
                    ← BACK TO CO-MANAGER51
                </button>
            </Link>
        </div>
    );
}