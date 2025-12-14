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
                        <p className="text-purple-400 font-bold mb-2">MARKET SEGMENT BREAKDOWN:</p>
                        <p className="text-white text-xs mb-1">🎵 Music: 5,000 UK managers → 10% = 500 users = £600k/year</p>
                        <p className="text-white text-xs mb-1">⚽ Sports: 2,000 UK agents → 5% = 100 users = £360k/year</p>
                        <p className="text-white text-xs mb-1">🎬 Talent: 500 UK agencies → 20% = 100 users = £2.4M/year</p>
                        <p className="text-white text-xs mb-1">🏠 Property: 10,000 UK managers → 2% = 200 users = £240k/year</p>
                        <p className="text-white text-xs mb-1">🎪 Events: 3,000 UK coordinators → 5% = 150 users = £180k/year</p>
                        <p className="text-white text-xs mb-1">🚢 Maritime: 300 cruise ships → 10% = 30 ships = £720k/year</p>
                        <p className="text-white text-xs mb-1">🌍 NGOs: Grant-funded = £500k-£2M/year</p>
                        <p className="text-green-400 text-xs font-bold mt-2">TOTAL REALISTIC: £5M-£9M/year by year 5</p>
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