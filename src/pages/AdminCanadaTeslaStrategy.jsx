import React from 'react';
import { ExternalLink, MapPin, DollarSign, Users, Zap, Heart, Building, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * CANADA TESLA STRATEGY
 * Partnership opportunities, grants, museum connections
 * Based on December 2025 research
 */

export default function AdminCanadaTeslaStrategy() {
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-4xl">🇨🇦</span>
                        <Zap className="w-10 h-10 text-cyan-400" />
                        <span className="text-4xl">🇷🇸</span>
                    </div>
                    <h1 className="text-4xl font-black text-cyan-400 mb-2">CANADA TESLA STRATEGY</h1>
                    <p className="text-gray-400">Partnership roadmap for Tesla healing tech</p>
                </div>

                {/* ACTIVE PARTNERSHIP */}
                <Card className="bg-gradient-to-br from-green-900/40 to-black border-2 border-green-500 p-6">
                    <div className="flex items-start gap-4 mb-4">
                        <Building className="w-8 h-8 text-green-400 flex-shrink-0" />
                        <div>
                            <h2 className="text-2xl font-black text-green-400 mb-2">ACTIVE NOW: Niagara Parks Partnership</h2>
                            <p className="text-green-200 mb-4">
                                Niagara Parks Power Station is currently hosting "Tesla: A Spark of Genius" 
                                in direct collaboration with Belgrade Tesla Museum
                            </p>
                            <div className="bg-black/60 border-l-4 border-green-500 p-4 space-y-2">
                                <p className="text-white font-bold">✅ Active exhibit running now</p>
                                <p className="text-white font-bold">✅ Direct connection to Belgrade museum</p>
                                <p className="text-white font-bold">✅ Actual Tesla artifacts on display</p>
                                <p className="text-white font-bold">✅ Educational mission aligned with UF51</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-500/20 border border-green-500 p-4 mt-4">
                        <p className="text-green-300 font-bold mb-2">🎯 YOUR MOVE:</p>
                        <p className="text-white">Contact Niagara Parks about "Digital healing extension of Tesla's medical legacy"</p>
                    </div>
                </Card>

                {/* CANADIAN PEMF COMPANIES */}
                <Card className="bg-black border-2 border-cyan-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-7 h-7 text-cyan-400" />
                        <h2 className="text-2xl font-black text-cyan-400">Canadian PEMF Companies</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-cyan-900/20 border border-cyan-500/50 p-4">
                            <h3 className="text-xl font-bold text-cyan-300 mb-2">BioHealth Canada</h3>
                            <ul className="space-y-1 text-white text-sm">
                                <li>• Tesla PEMF by Centurion</li>
                                <li>• Health Canada approved</li>
                                <li>• Pain, swelling, circulation</li>
                                <li>• Rentals available</li>
                            </ul>
                            <p className="text-cyan-400 text-xs mt-3 font-bold">Partnership: Clinical validation</p>
                        </div>
                        <div className="bg-cyan-900/20 border border-cyan-500/50 p-4">
                            <h3 className="text-xl font-bold text-cyan-300 mb-2">Innovative Therapy Canada</h3>
                            <ul className="space-y-1 text-white text-sm">
                                <li>• Active PEMF clinics</li>
                                <li>• Existing patient base</li>
                                <li>• Cellular regeneration focus</li>
                                <li>• Proven therapy model</li>
                            </ul>
                            <p className="text-cyan-400 text-xs mt-3 font-bold">Partnership: Real healing data</p>
                        </div>
                    </div>
                </Card>

                {/* GRANTS */}
                <Card className="bg-black border-2 border-amber-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-7 h-7 text-amber-400" />
                        <h2 className="text-2xl font-black text-amber-400">Grant Opportunities</h2>
                    </div>
                    <div className="space-y-4">
                        
                        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-amber-300">Mental Health Promotion Innovation Fund</h3>
                                <span className="text-xs bg-green-500 text-black px-2 py-1 rounded font-bold">YEAR 1</span>
                            </div>
                            <p className="text-white text-sm mb-2">National funding for innovative community mental health programs</p>
                            <p className="text-amber-200 text-sm">🎯 Position: "Free digital Tesla-based healing for mental health"</p>
                        </div>

                        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-amber-300">NRC Canada PEMF Research Grants</h3>
                                <span className="text-xs bg-cyan-500 text-black px-2 py-1 rounded font-bold">ACTIVE</span>
                            </div>
                            <p className="text-white text-sm mb-2">Already funded: "Protocol for concussion release using PEMF"</p>
                            <p className="text-amber-200 text-sm">✅ Government is ALREADY funding PEMF research</p>
                        </div>

                        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-amber-300">Alternative Medicine Development Initiative</h3>
                                <span className="text-xs bg-purple-500 text-black px-2 py-1 rounded font-bold">YEAR 2</span>
                            </div>
                            <p className="text-white text-sm mb-2">Integration of alternative medicine into Canadian healthcare</p>
                            <p className="text-amber-200 text-sm">🎯 Requires rigorous evidence (get from clinical partners)</p>
                        </div>

                        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-amber-300">Brain Canada Foundation</h3>
                                <span className="text-xs bg-pink-500 text-black px-2 py-1 rounded font-bold">YEAR 2</span>
                            </div>
                            <p className="text-white text-sm mb-2">Capacity building grants for early-career researchers</p>
                            <p className="text-amber-200 text-sm">🎯 Frequency/brain health connection research</p>
                        </div>

                        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-amber-300">Canada Innovation Fund</h3>
                                <span className="text-xs bg-red-500 text-black px-2 py-1 rounded font-bold">YEAR 3</span>
                            </div>
                            <p className="text-white text-sm mb-2">Keeps Canada at forefront of research & innovation</p>
                            <p className="text-amber-200 text-sm">🎯 Scale nationally with proven results</p>
                        </div>

                    </div>
                </Card>

                {/* BOB CONNOLLY */}
                <Card className="bg-black border-2 border-purple-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-7 h-7 text-purple-400" />
                        <h2 className="text-2xl font-black text-purple-400">Bob Connolly Documentary</h2>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/50 p-4 mb-4">
                        <p className="text-white mb-3">
                            "Tesla's Medicine: The Universal Fluid" (2022) - Multi-award winning 90min documentary
                        </p>
                        <div className="space-y-2 text-purple-200 text-sm">
                            <p>✅ Bob Connolly was healed from life-threatening illness using Tesla tech</p>
                            <p>✅ 10 years of research into Tesla's medical inventions</p>
                            <p>✅ Proved Tesla devices make plants grow faster</p>
                            <p>✅ Plants developed ENHANCED PERCEPTION to electromagnetic fields</p>
                            <p>✅ Created music from plant responses to Tesla coils</p>
                        </div>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500 p-3">
                        <p className="text-purple-300 font-bold text-sm">
                            🎯 Contact Bob Connolly for collaboration/endorsement
                        </p>
                    </div>
                </Card>

                {/* BELGRADE MUSEUM */}
                <Card className="bg-black border-2 border-red-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-7 h-7 text-red-400" />
                        <h2 className="text-2xl font-black text-red-400">Belgrade Museum Access</h2>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/50 p-4 mb-4">
                        <p className="text-white font-bold mb-3">What's in Belgrade:</p>
                        <ul className="space-y-2 text-red-200 text-sm">
                            <li>📄 Tesla's medical device blueprints</li>
                            <li>⚡ Electromagnetic healing coil designs</li>
                            <li>🔬 Frequency therapy research notes</li>
                            <li>💡 "Universal Fluid" concept documents</li>
                            <li>🚨 Materials NOT available to Western researchers historically</li>
                        </ul>
                    </div>
                    <div className="bg-red-500/20 border border-red-500 p-3">
                        <p className="text-red-300 font-bold text-sm mb-2">
                            🎯 YOUR ACCESS ROUTE:
                        </p>
                        <p className="text-white text-sm">
                            Through Niagara Parks partnership → Request digital archive access → 
                            Bring suppressed tech to the world → Museum gets credit + donation from success
                        </p>
                    </div>
                </Card>

                {/* WHY CANADA */}
                <Card className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-7 h-7 text-cyan-400" />
                        <h2 className="text-2xl font-black text-cyan-400">Why Canada is Perfect</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">🍁 Government Support</p>
                            <p className="text-white text-sm">Already funds PEMF research through NRC grants</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">✅ Regulatory Approval</p>
                            <p className="text-white text-sm">Health Canada approves Tesla PEMF devices</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">🤝 Museum Partnership</p>
                            <p className="text-white text-sm">Active collaboration with Belgrade via Niagara</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">🏥 Universal Healthcare</p>
                            <p className="text-white text-sm">Easier clinical integration pathway</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">💚 Alternative Medicine</p>
                            <p className="text-white text-sm">High acceptance & government initiatives</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/50 p-4">
                            <p className="text-cyan-300 font-bold mb-2">🌍 Serbian Diaspora</p>
                            <p className="text-white text-sm">Strong Serbian community = cultural bridge</p>
                        </div>
                    </div>
                </Card>

                {/* BOB CONNOLLY CONTACT */}
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-4 border-purple-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-8 h-8 text-purple-400" />
                        <h2 className="text-3xl font-black text-purple-400">BOB CONNOLLY - KEY CONTACT</h2>
                    </div>
                    <div className="bg-black border-2 border-purple-500 p-6 mb-4">
                        <p className="text-purple-200 mb-4">
                            <span className="font-bold text-purple-300">Born 1954, Hamilton Ontario Canada 🇨🇦</span><br/>
                            Award-winning media producer, former ABC foreign correspondent, journalist
                        </p>
                        <div className="bg-purple-500/20 border-l-4 border-purple-500 p-4 mb-4">
                            <p className="text-white font-bold mb-2">✅ Healed himself from life-threatening illness using Tesla tech</p>
                            <p className="text-white font-bold mb-2">✅ 10 YEARS researching Tesla's medical inventions</p>
                            <p className="text-white font-bold mb-2">✅ Proved Tesla coils make plants grow faster + develop enhanced perception</p>
                            <p className="text-white font-bold mb-2">✅ Created music from plant responses to electromagnetic fields</p>
                            <p className="text-white font-bold">✅ Trilogy documentary series: "Tesla's Medicine"</p>
                        </div>
                        <div className="bg-purple-900/60 border border-purple-400 p-4 mb-4">
                            <p className="text-purple-300 font-bold mb-2">🎯 WHY HE'LL CARE:</p>
                            <ul className="space-y-1 text-white text-sm">
                                <li>• His documentary PROVES Tesla healing works</li>
                                <li>• Your CIC = non-profit healing mission (his values)</li>
                                <li>• You've digitized Tesla frequencies for millions</li>
                                <li>• Canada connection = home country impact</li>
                                <li>• His plant research = your morphic resonance data</li>
                            </ul>
                        </div>
                        <div className="bg-pink-500/20 border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-bold mb-2">📧 THE ASK:</p>
                            <ul className="space-y-1 text-white text-sm">
                                <li>1. Endorsement for Canadian grant applications</li>
                                <li>2. Collaboration on plant healing protocols</li>
                                <li>3. Introduction to Niagara Parks/Belgrade Museum</li>
                                <li>4. Featured interview for UF51 about Tesla's medicine</li>
                            </ul>
                        </div>
                        <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500">
                            <p className="text-cyan-300 text-xs font-mono mb-1">CONTACT:</p>
                            <a href="https://www.bobconnolly.com/teslas-medicine/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-2">
                                www.bobconnolly.com/teslas-medicine
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <p className="text-gray-400 text-xs mt-2">Contact form available on website</p>
                        </div>
                    </div>
                </Card>

                {/* IMMEDIATE ACTIONS */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-red-900/40 border-4 border-pink-500 p-6">
                    <h2 className="text-3xl font-black text-pink-400 mb-4 text-center">IMMEDIATE ACTIONS</h2>
                    <div className="space-y-3">
                        <div className="bg-black border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-black mb-2">1. CONTACT NIAGARA PARKS</p>
                            <p className="text-white text-sm">Email about digital healing extension of Tesla exhibit</p>
                        </div>
                        <div className="bg-black border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-black mb-2">2. REACH OUT TO BOB CONNOLLY (details above)</p>
                            <p className="text-white text-sm">Documentary collaboration + endorsement - send when platform features complete</p>
                        </div>
                        <div className="bg-black border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-black mb-2">3. CONTACT BIOHEALTH CANADA</p>
                            <p className="text-white text-sm">Clinical validation partnership proposal</p>
                        </div>
                        <div className="bg-black border-2 border-pink-500 p-4">
                            <p className="text-pink-300 font-black mb-2">4. PREPARE GRANT APPLICATION</p>
                            <p className="text-white text-sm">Mental Health Innovation Fund - due [research deadline]</p>
                        </div>
                    </div>
                </Card>

                {/* RESEARCH SOURCES */}
                <Card className="bg-black border border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-400 mb-3">Research Sources</h3>
                    <div className="space-y-2 text-xs text-gray-500">
                        <p>• Bob Connolly - Tesla's Medicine: The Universal Fluid (2022)</p>
                        <p>• History.com - The Mystery of Nikola Tesla's Missing Files</p>
                        <p>• PBS - Tesla: Master of Lightning - The Missing Papers</p>
                        <p>• Niagara Parks - Tesla: A Spark of Genius Exhibit</p>
                        <p>• BioHealth Canada - Tesla PEMF by Centurion</p>
                        <p>• Canada.ca - Mental Health Promotion Innovation Fund</p>
                        <p>• NRC Canada - PEMF Research Grants</p>
                        <p>• Research date: December 2025</p>
                    </div>
                </Card>

            </div>
        </div>
    );
}