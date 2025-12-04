import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle, Scale, Droplets, MapPin, Landmark, Clock, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const StatusCard = ({ icon: Icon, title, text, color }) => (
    <div className={`bg-gray-800/50 p-4 rounded-lg border-l-4 ${color}`}>
        <div className="flex items-start gap-3">
            <Icon className="w-5 h-5 mt-1" />
            <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-300">{text}</p>
            </div>
        </div>
    </div>
);

const WeaponCard = ({ number, title, source, details, problem, risk, color, icon: Icon }) => (
    <Card className={`bg-black/40 border-l-4 ${color} rounded-xl`}>
        <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3"><Icon className="w-6 h-6"/>{number}. {title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
            {source && <p><strong className="text-gray-400">Source:</strong> {source}</p>}
            <div className="text-gray-300 space-y-1">{details}</div>
            {problem && <p className="p-2 bg-red-900/50 border-l-2 border-red-500 rounded-md"><strong className="text-red-400">PROBLEM:</strong> {problem}</p>}
            {risk && <p className="p-2 bg-yellow-900/50 border-l-2 border-yellow-500 rounded-md"><strong className="text-yellow-400">RISK:</strong> {risk}</p>}
        </CardContent>
    </Card>
);

const DocumentCard = ({ title, children }) => (
  <Card className="bg-gray-900/50 border-gray-700 p-4">
    <h4 className="font-bold text-white mb-2">{title}</h4>
    <div className="text-sm text-gray-400 space-y-1">{children}</div>
  </Card>
);

const TimelineEvent = ({ date, title, description, isLast = false }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mt-1.5"></div>
            {!isLast && <div className="w-px h-full bg-gray-700"></div>}
        </div>
        <div>
            <p className="font-mono text-xs text-gray-500">{date}</p>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    </div>
);

export default function StoneymollanDefensePage() {
    const [strategyNotes, setStrategyNotes] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = currentTime.toLocaleString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const timelineEvents = [
        { date: "Sep 2024", title: "Application Submitted", description: "Scottish Woodlands applies for felling consent - WE WERE NOT CONSULTED" },
        { date: "30 Sep 2025", title: "Barry Harper Hill Meeting", description: "Brief encounter on hill after Brian chased him for responses - NOT formal consultation" },
        { date: "2 Oct 2025", title: "Brian's Urgent Email to Historic Scotland", description: "Raising concerns about Neolithic site, water access, business impact" },
        { date: "Dec 2024", title: "Consent Granted", description: "Historic Scotland approves felling - WE STILL NOT CONSULTED" },
        { date: "29 Apr 2025", title: "Scottish Woodlands 'Consultation' Letter", description: "4 months AFTER consent granted - meaningless consultation" },
        { date: "8 Oct 2025", title: "Eddie Henderson LETTER SENT", description: "Professional response establishing our legal position" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950/50 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="text-center space-y-4 mb-12">
                    <Shield className="w-20 h-20 text-red-500 mx-auto" />
                    <h1 className="text-5xl font-black tracking-tighter text-white">FORGING THE STONEYMOLLAN SHIELD WALL</h1>
                    <p className="text-lg text-gray-400">Our Unified Defense</p>
                    <Badge className="bg-red-600 text-white">ACTIVE THREAT - CAMERON HOME FARM FELLING</Badge>
                </header>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">Current Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatusCard icon={AlertTriangle} title="CONSENT GRANTED" text="December 2024 - Felling approved by Historic Scotland" color="border-yellow-500" />
                        <StatusCard icon={XCircle} title="NO PROPER CONSULTATION" text="We were consulted AFTER consent granted" color="border-red-500" />
                        <StatusCard icon={CheckCircle} title="WE HAVE LEVERAGE" text="Water rights + Road access = Our power" color="border-green-500" />
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">Our Legal Weapons</h2>
                    <div className="space-y-6">
                        <WeaponCard 
                            number={1}
                            title="WATER RIGHTS (NUCLEAR WEAPON)"
                            icon={Droplets}
                            source="Title Deeds Entry No. 2 (Burdens Section D2)"
                            details={<>
                                <p><strong className="text-gray-400">Details from John Gilbert:</strong> Original supply: Burn from Cameron Estate, flows through felling area. Pipeline: 50mm running under our property, through felling zone. Fish pond: Fed directly from this burn.</p>
                                <p><strong className="text-gray-400">Legal protection:</strong> Registered servitude right in title deeds. Disconnected from house in handover (now leads to fanpark).</p>
                                <p><strong className="text-gray-400">Marine supply (Backup):</strong> From Loch Finlas via SW main, 6km away, through MDPE branches.</p>
                            </>}
                            risk="Diesel contamination, silt, debris, pipeline damage"
                            color="border-cyan-500"
                        />
                         <WeaponCard 
                            number={2}
                            title="ROAD ACCESS (CRITICAL LEVERAGE)"
                            icon={MapPin}
                            details={<>
                                <p><strong className="text-gray-400">Upper Stoneymollan Road Status:</strong> Adopted by Council (confirmed by Property Enquiry Certificate). BUT: We have full access rights in title deeds. Private, single-track, 0.5 miles, steep, NO passing places. Our business + school runs = Priority use.</p>
                            </>}
                            problem="Their Plan: Turning circle behind our cabins, lorries down our road. They MUST use our road - NO alternative route."
                            color="border-orange-500"
                        />
                         <WeaponCard 
                            number={3}
                            title="JOHN MUIR WAY VIOLATION"
                            icon={Landmark}
                            details={<>
                                <p><strong className="text-gray-400">Zone 1 Protection:</strong> Lorries will access John Muir Way Zone 1.</p>
                                <p><strong className="text-gray-400">Significance:</strong> Protected national long-distance walking route.</p>
                                <p><strong className="text-gray-400">Legal Issue:</strong> HGV traffic through protected recreational area.</p>
                            </>}
                            color="border-purple-500"
                        />
                         <WeaponCard 
                            number={4}
                            title="COST RECOVERY"
                            icon={Scale}
                            details={<>
                                <p><strong className="text-gray-400">Eddie Henderson's Advice:</strong> We can recover legal costs.</p>
                                <p><strong className="text-gray-400">Basis:</strong> Not our fault - they failed to consult properly.</p>
                                <p><strong className="text-gray-400">Coverage:</strong> Eddie's fees + any future legal costs + expert reports.</p>
                            </>}
                            color="border-green-500"
                        />
                    </div>
                </section>
                
                <section className="mb-12 p-8 bg-green-900/30 rounded-2xl border border-green-500/30">
                    <h2 className="text-3xl font-black text-center text-white mb-6">OUR POSITION: UNBREAKABLE</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-xl font-bold text-green-300 mb-3"><CheckCircle /> WHAT WE HAVE:</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                <li>Legal water rights (title deeds)</li>
                                <li>Road access control</li>
                                <li>Eddie Henderson (professional advocate)</li>
                                <li>Evidence of consultation failure</li>
                                <li>Business damage quantification</li>
                                <li>Community support (Friends of Loch Lomond)</li>
                                <li>Cost recovery rights</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-xl font-bold text-red-400 mb-3"><XCircle /> WHAT THEY DON'T HAVE:</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                <li>Alternative road access</li>
                                <li>Right to contaminate our water</li>
                                <li>Proper consultation history</li>
                                <li>Our cooperation</li>
                                <li>Public support</li>
                                <li>Clean conscience</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-center mt-8 text-xl font-bold text-cyan-300 tracking-wider">THEY NEED US. WE DON'T NEED THEM.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">Key Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DocumentCard title="Title Deeds - DM827637">
                            <p>• Property Section: Property details</p>
                            <p>• Burdens Section D1: Road access rights</p>
                            <p>• Burdens Section D2: Water servitude rights</p>
                        </DocumentCard>
                         <DocumentCard title="John Gilbert Water Details">
                            <p>Former owner, expert knowledge of water system, supporting our case.</p>
                        </DocumentCard>
                         <DocumentCard title="Barry Harper Email (29 April 2025)">
                            <p>Scottish Woodlands consultation AFTER consent granted.</p>
                        </DocumentCard>
                         <DocumentCard title="Historic Scotland Response">
                            <p>Consent granted Dec 2024 with conditions for monuments.</p>
                        </DocumentCard>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4 flex items-center gap-2"><Clock /> Timeline of Events</h2>
                    <div className="border-l-2 border-gray-700 pl-6 space-y-6">
                        {timelineEvents.map((event, index) => (
                            <TimelineEvent 
                                key={index}
                                {...event}
                                isLast={index === timelineEvents.length - 1}
                            />
                        ))}
                    </div>
                </section>

                {/* BIODIVERSITY EVIDENCE LOG */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <Heart className="text-green-400" /> Biodiversity Evidence Log
                    </h2>
                    <p className="text-gray-400 mb-6">Documented proof that Stoneymollan is a thriving, biodiverse habitat worth protecting.</p>
                    
                    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                🐿️ Red Squirrel Sighting - ENDANGERED SPECIES
                            </CardTitle>
                            <p className="text-sm text-gray-400">Date: Wednesday, 22 October 2025</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/470fe2369_IMG_2476.jpg" 
                                    alt="Red squirrel at Stoneymollan - Photo 1"
                                    className="w-full rounded-lg border border-green-500/30"
                                />
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/54415ed77_IMG_2475.jpg" 
                                    alt="Red squirrel at Stoneymollan - Photo 2"
                                    className="w-full rounded-lg border border-green-500/30"
                                />
                            </div>
                            
                            <div className="bg-black/40 p-4 rounded-lg space-y-2 text-sm">
                                <p><strong className="text-green-400">Species:</strong> Red Squirrel (<em>Sciurus vulgaris</em>)</p>
                                <p><strong className="text-green-400">Conservation Status:</strong> Endangered in Scotland</p>
                                <p><strong className="text-green-400">Population:</strong> Only ~120,000 remaining in Scotland (vs 2.5 million grey squirrels)</p>
                                <p><strong className="text-green-400">Location:</strong> Ancient trees on Stoneymollan property</p>
                                <p><strong className="text-green-400">Significance:</strong> Red squirrel presence indicates a healthy, thriving forest ecosystem. Their survival depends on mature woodland habitats like Stoneymollan.</p>
                            </div>

                            <div className="p-4 bg-yellow-900/50 border-l-4 border-yellow-500 rounded-md">
                                <p className="font-bold text-yellow-400">LEGAL RELEVANCE:</p>
                                <p className="text-sm text-gray-300 mt-2">
                                    Red squirrels are a protected species under the Wildlife and Countryside Act 1981. 
                                    Their presence on site may require additional environmental impact assessments before any felling operations.
                                    Documented evidence: Wednesday, 22 October 2025.
                                </p>
                            </div>
                            </CardContent>
                            </Card>
                            </section>

                            {/* TITLE DEEDS - LEGAL EVIDENCE */}
                            <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                            <Landmark className="text-amber-400" /> Title Deeds - DMB27637
                            </h2>

                            <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/50">
                            <CardHeader>
                            <CardTitle className="text-xl text-white">WATER SERVITUDE - THE NUCLEAR WEAPON</CardTitle>
                            <p className="text-sm text-gray-400">Registered 10 November 1988 - IRREDEEMABLE</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                            <div className="bg-black/40 p-4 rounded-lg space-y-3 text-sm">
                                <p><strong className="text-amber-400">Entry D2 (Burdens Section):</strong></p>
                                <p className="text-gray-300 italic">"Deed of Servitude containing disposition by <strong className="text-red-400">Patrick Tobias Telfer Smollett</strong> as Trustee under Deed of Trust by Alexander Patrick Drummond Telfer Smollett and others to John Morgan McClosky and Jean McGregor or Britton or McClosky and their successors, registered 10 Nov. 1988, of a <strong className="text-green-400">SERVITUDE RIGHT OF WATER SUPPLY</strong> from the stream running to the north of the subjects in this Title together with the right in favour of the said successors to access to the said water supply and relative pipe along the broken blue line on the Title Plan for repair, maintenance and renewal of the said pipe."</p>
                            </div>

                            <div className="bg-black/40 p-4 rounded-lg space-y-2 text-sm">
                                <p><strong className="text-amber-400">Legal Condition:</strong></p>
                                <p className="text-gray-300 italic">"The said right of water supply shall at all times be exercised reasonably and so as to occasion as little inconvenience as may be to us and our successors..."</p>
                            </div>

                            <div className="p-4 bg-red-900/50 border-l-4 border-red-500 rounded-md">
                                <p className="font-bold text-red-400">THE SMOLLET CONNECTION:</p>
                                <p className="text-sm text-gray-300 mt-2">
                                    <strong>Patrick Smollet</strong> (father of David Smollet, now deceased) granted these water rights in 1988. 
                                    David Smollet inherited the estate but is <strong>LEGALLY BOUND</strong> by his father's registered servitude obligations.
                                    These rights are REGISTERED and IRREDEEMABLE. Any interference = breach of registered property rights.
                                </p>
                            </div>

                            <div className="bg-black/40 p-4 rounded-lg space-y-2 text-sm">
                                <p><strong className="text-amber-400">Proprietors:</strong> Brian Hughes and Gillian Barbara Brown</p>
                                <p><strong className="text-amber-400">Purchase Date:</strong> 01 February 2022</p>
                                <p><strong className="text-amber-400">Consideration:</strong> £625,000</p>
                                <p><strong className="text-amber-400">First Registration:</strong> 12 August 1988</p>
                            </div>
                            </CardContent>
                            </Card>

                            {/* SMOLLET FAMILY INTEL */}
                            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 mt-4">
                            <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                👁️ Estate Intelligence (Confidential)
                            </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                            <div className="bg-black/40 p-4 rounded-lg">
                                <p><strong className="text-purple-400">Current Owner:</strong> David Smollet</p>
                                <p><strong className="text-purple-400">Inheritance:</strong> ~£50 million (split with sister)</p>
                                <p><strong className="text-purple-400">Father:</strong> Patrick Smollet (deceased) - named in title deeds</p>
                                <p><strong className="text-purple-400">Mother:</strong> Lady Gina Smollet (95, living with dementia)</p>
                                <p><strong className="text-purple-400">Properties:</strong> Cameron House Estate, London area estate, Miami, New York</p>
                            </div>
                            <div className="p-3 bg-yellow-900/50 border-l-4 border-yellow-500 rounded-md">
                                <p className="text-yellow-400 text-xs"><strong>INTERNAL CONFLICT:</strong> Sibling land war - David and sister won't allow access through each other's portions of the estate. This may explain why they want to use Stoneymollan road instead of internal estate routes.</p>
                            </div>
                            <div className="p-3 bg-cyan-900/50 border-l-4 border-cyan-500 rounded-md">
                                <p className="text-cyan-400 text-xs"><strong>KEY INTEL:</strong> Estate management discussed bringing timber out past Stoneymollan, acknowledging it would cause disruption. They KNOW this is problematic.</p>
                            </div>
                            </CardContent>
                            </Card>
                            </section>

                <section>
                     <h2 className="text-2xl font-bold text-gray-300 mb-4 flex items-center gap-2"><TrendingUp /> Strategy Notes</h2>
                     <Card className="bg-black/50 border-purple-500/50">
                        <CardContent className="p-4">
                             <Textarea
                                value={strategyNotes}
                                onChange={(e) => setStrategyNotes(e.target.value)}
                                placeholder="Add strategy notes, next steps, ideas..."
                                className="bg-transparent border-0 text-white text-base min-h-[150px] focus-visible:ring-0"
                            />
                        </CardContent>
                        <div className="p-4 pt-0 flex justify-end">
                            <Button className="bg-purple-600 hover:bg-purple-700">Save Notes</Button>
                        </div>
                     </Card>
                </section>

                <footer className="mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
                    <p>Current Local Time: {formattedTime}</p>
                    <p className="mt-2">&copy; 2025 Stoneymollan Defense. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}