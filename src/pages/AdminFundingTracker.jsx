import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertCircle, ExternalLink, Globe, Zap, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminFundingTracker() {
    const [view, setView] = useState('all'); // 'all', 'applied', 'todo'

    const funders = {
        // ✅ SUBMITTED - WAITING
        creativeScotlandNL: {
            name: "Creative Scotland - National Lottery £100k",
            amount: "£100,000",
            type: "Grant",
            speed: "14 weeks",
            status: "applied",
            dateApplied: "19 Nov 2025",
            nextAction: "⚠️ ELIGIBILITY QUERY RECEIVED - responded 13 Jan 2026. WAITING for Creative Scotland decision.",
            link: "https://www.creativescotland.com/funding",
            notes: `✅ SUBMITTED - Reference: CS-OFO-37512-4C94

PROJECT: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure
APPLICANT: Universal Frequency51 CIC (SC870603)

🚨 STATUS UPDATE (13 Jan 2026):
Creative Scotland queried eligibility - CIC formed Nov 19, 2025 vs. platform live August 2025.
RESPONDED with: Platform was SELF-FUNDED for months before CIC. Not a startup cost.
Provided invoices from August 2025 as proof.

HONEST CHANCES: 30-40% (eligibility question = risk)
✓ Platform is LIVE and working since August
✓ Strong mental health focus
✓ Artist-first model (90% to artists)
✓ CIC structure proves mission
✓ Pre-CIC self-funding evidence submitted
⚠️ Eligibility question raised
⚠️ New org, no track record
⚠️ Solo founder capacity risk`,
            priority: "high",
            geography: "Scotland",
            cic: "advantage"
        },

        creativeScotlandIndividual: {
            name: "Creative Scotland - Individual £4,800",
            amount: "£4,800",
            type: "Grant",
            speed: "12 weeks",
            status: "rejected",
            dateApplied: "27 Oct 2025",
            nextAction: "❌ REJECTED - cannot reapply for same project.",
            link: "https://www.creativescotland.com/funding",
            notes: `❌ DECLINED - Reference: CS-OFI-37140-2FE3

PROJECT: Fair Payment for Scottish Musicians: Loch Lomond Pilot
APPLICANT: Brian Hughes (Individual)

Declined due to misinterpretation of environment guidelines (10% requirement).
Learned valuable lessons for future applications.`,
            priority: "low",
            geography: "Scotland",
            cic: "n/a"
        },

        // 🔥 IN PROGRESS - SUPPORT MANAGER ASSIGNED
        unltd: {
            name: "UnLtd - Support + Funding",
            amount: "Support Package + Grant (TBC)",
            type: "Grant + Mentoring + Training",
            speed: "In progress - support manager assigned",
            status: "in_progress",
            dateApplied: "Dec 2025",
            nextAction: "🔥 SUPPORT MANAGER ASSIGNED! Prepare brief when they reach out. This is REAL.",
            link: "https://unltd.org.uk/",
            notes: `🔥 STATUS: PROGRESSED TO NEXT STAGE - SUPPORT MANAGER ASSIGNED

This is SERIOUS. UnLtd doesn't assign support managers to everyone.

WHAT THIS MEANS:
✓ They see potential
✓ They're investing time in you
✓ You get business support PLUS potential funding
✓ Network access to other social entrepreneurs

NEXT STEPS:
• Wait for support manager to reach out
• Be ready with: clear mission, current traction, immediate needs
• This could be the bridge funding we need

HONEST CHANCES: 60-70% (support manager assigned = strong signal)`,
            priority: "urgent",
            geography: "UK",
            cic: "major advantage"
        },

        // ✅ SUBMITTED - WAITING
        paulHamlyn: {
            name: "Paul Hamlyn Foundation - Ideas & Pioneers Fund",
            amount: "Up to £20,000",
            type: "Grant + Support Package",
            speed: "~8 weeks after deadline",
            status: "applied",
            dateApplied: "Dec 2025",
            nextAction: "WAIT. Decision expected ~Feb 2026.",
            link: "https://www.phf.org.uk/funding/ideas-and-pioneers",
            notes: `✅ SUBMITTED - Application ID: 2104041

Form: Ideas & Pioneers Fund application - 2025

Lauren Rosenblatt confirmed: NO AUDITED ACCOUNTS NEEDED for CICs!

PERFECT FIT:
• Environmental + music + healing = multi-issue ✓
• CIC structure = charitable purpose proven ✓
• Frequency Chamber = mental health innovation ✓
• Up to £20k + training/mentoring support package`,
            priority: "high",
            geography: "UK",
            cic: "advantage"
        },

        // 🚨 EMERGENCY SUPPORT - FAST
        scottishWelfareFund: {
            name: "Scottish Welfare Fund - Crisis Grant",
            amount: "£50-£500 (emergency support)",
            type: "Crisis Grant",
            speed: "2 days (FASTEST)",
            status: "available",
            dateApplied: null,
            nextAction: "📞 CALL IF EMERGENCY: 0300 123 0900",
            link: "https://www.mygov.scot/scottish-welfare-fund",
            notes: `🚨 EMERGENCY SUPPORT ONLY

For people in crisis who can't afford essentials (food, heating, shelter).

2-DAY DECISION. Apply through local council.

Phone: 0300 123 0900

This is NOT grant funding - this is emergency personal support if you can't pay bills.`,
            priority: "emergency",
            geography: "Scotland",
            cic: "n/a"
        },

        // 🔥 NEW - HEALTH/WELLNESS FUNDERS (Frequency Chamber opens these!)
        
        comicReliefEngland: {
            name: "Comic Relief Community Fund (England)",
            amount: "Up to £10,000",
            type: "Grant",
            speed: "Rolling applications",
            status: "todo",
            link: "https://www.groundwork.org.uk/comic-relief/",
            notes: `🔥 PERFECT FIT - Mental Health Matters stream!

WHAT THEY FUND:
• Projects supporting good mental health in communities
• Improving access to support
• Tackling stigma and discrimination

ELIGIBILITY:
• Grassroot community organisations
• Income less than £250k ✓
• England-based projects

Frequency Chamber = FREE mental health tool = exactly this!`,
            priority: "high",
            geography: "England",
            cic: "accepted"
        },

        pixelFund: {
            name: "Pixel Fund - Children & Young People Mental Health",
            amount: "Up to £5,000",
            type: "Grant",
            speed: "Rolling",
            status: "todo",
            link: "https://www.pixelfund.org.uk/",
            notes: `Mental health and wellbeing for children and young people.

Priority to charities with income under £10m.
Could fund youth-focused features of Frequency Chamber.`,
            priority: "medium",
            geography: "UK",
            cic: "accepted"
        },

        henrySmith: {
            name: "Henry Smith Charity",
            amount: "£20,000-£60,000/year for 1-3 years",
            type: "Grant",
            speed: "Rolling applications",
            status: "todo",
            link: "https://www.henrysmithcharity.org.uk/explore-our-grants-and-apply/",
            notes: `BIG FUNDER - £20-60k per year!

ELIGIBILITY:
• Charities and social enterprises ✓
• Income £50k-£2m
• Priority to areas of high deprivation
• Funds mental health ✓

⚠️ Need to check if CIC qualifies - may need charity status`,
            priority: "high",
            geography: "UK",
            cic: "check"
        },

        postcodeGreenTrust: {
            name: "Postcode Green Trust - Green Community Grants",
            amount: "£500-£20,000",
            type: "Grant",
            speed: "Annual rounds",
            status: "todo",
            nextDeadline: "Opens 17 Sept 2025, deadline 8 Oct 2025 (NEXT ROUND 2026)",
            link: "https://www.postcodegreentrust.org.uk/green-community-grants",
            notes: `Environmental community action.

PERFECT for litter cleanup side of UF51.
Watch for 2026 round opening.`,
            priority: "medium",
            geography: "UK",
            cic: "accepted"
        },

        peoplesPostcodeTrust: {
            name: "People's Postcode Trust (Scotland)",
            amount: "Up to £20,000",
            type: "Grant",
            speed: "Annual rounds",
            status: "todo",
            nextDeadline: "2026 rounds - watch website",
            link: "https://www.postcodetrust.org.uk/apply-for-a-grant",
            notes: `Scotland-focused. Smaller charities and good causes.

Funds range of areas including:
• Improving mental wellbeing ✓
• Community benefit ✓
• CICs accepted ✓

Next applications open 2026.`,
            priority: "medium",
            geography: "Scotland",
            cic: "accepted"
        },

        jamesTudorFoundation: {
            name: "James Tudor Foundation - Mental Health Grant",
            amount: "£5,000-£30,000",
            type: "Grant",
            speed: "Annual rounds",
            status: "todo",
            nextDeadline: "Check website - typically August deadline",
            link: "https://jamestudorfoundation.org.uk/",
            notes: `Mental health focused funder.

Funds project work for mental health initiatives.
Frequency Chamber = perfect fit.`,
            priority: "high",
            geography: "UK",
            cic: "check"
        },

        lankellychase: {
            name: "Lankelly Chase",
            amount: "Varies (significant funder)",
            type: "Grant",
            speed: "Varies",
            status: "research",
            link: "https://lankellychase.org.uk/",
            notes: `Funds severe disadvantage: homelessness, drug misuse, violence, mental health.

Systems change approach - they want to change HOW things work.
UF51 = new model for mental health access.

Worth researching their current priorities.`,
            priority: "medium",
            geography: "UK",
            cic: "advantage"
        },

        rayneFoundation: {
            name: "Rayne Foundation",
            amount: "Varies - core funding available",
            type: "Grant",
            speed: "Varies",
            status: "research",
            link: "https://www.raynefoundation.org.uk/grants/uk/apply/guidelines",
            notes: `Funds: arts, health & wellbeing, education, social issues.

SPECIAL INTEREST: Young people's mental health ✓

They like orgs that "don't enjoy widespread public support" = grassroots ✓
May award core funding for step-change work.`,
            priority: "medium",
            geography: "UK",
            cic: "check"
        },

        esmeeFairbairn: {
            name: "Esmée Fairbairn Foundation",
            amount: "Varies - major funder",
            type: "Grant",
            speed: "Ongoing",
            status: "research",
            link: "https://esmeefairbairn.org.uk/apply-for-a-grant/",
            notes: `One of UK's largest funders. Environment focus.

Need to check current open programmes.
Museums/Collections fund deadline: 21 Jan 2026

Worth exploring environmental/community grants.`,
            priority: "medium",
            geography: "UK",
            cic: "advantage"
        },

        // QUICK WINS - SMALLER BUT FASTER
        chapmanTrust: {
            name: "Chapman Charitable Trust",
            amount: "£1,000-£2,000",
            type: "Grant",
            speed: "Quarterly",
            status: "todo",
            link: "https://www.chapmancharitabletrust.org.uk/",
            notes: `Small but FAST. Funds:
• Physical and mental wellbeing ✓
• Natural environment ✓
• Arts accessibility ✓

Scotland + SE England focus.
Quick application - worth doing for cash flow.`,
            priority: "medium",
            geography: "UK (Scotland focus)",
            cic: "accepted"
        },

        dwfFoundation: {
            name: "DWF Foundation",
            amount: "Up to £5,000",
            type: "Grant",
            speed: "Rolling",
            status: "todo",
            link: "https://dwfgroup.com/en/about-us/dwf-foundation/grant-giving",
            notes: `Health and wellbeing focus.
Registered charities - check if CIC qualifies.
Quick smaller grant.`,
            priority: "low",
            geography: "UK",
            cic: "check"
        },

        percyBilton: {
            name: "Percy Bilton Charity",
            amount: "£2,000-£5,000",
            type: "Grant",
            speed: "Rolling",
            status: "todo",
            link: "https://www.percy-bilton-charity.org/",
            notes: `Funds: disadvantaged youth, disabilities, mental health problems.
Equipment and building/refurbishment projects.
Could fund equipment for UF51 work.`,
            priority: "low",
            geography: "UK",
            cic: "check"
        },

        // INTERNATIONAL - BIG ONES
        patagonia: {
            name: "Patagonia Environmental Grants",
            amount: "Varies (typically $5k-$50k)",
            type: "Grant",
            speed: "Rolling applications",
            status: "todo",
            link: "https://www.patagonia.com/actionworks/grantees/",
            notes: `🔥 PERFECT FIT - they fund grassroots environmental action.

YVON CHOUINARD (Patagonia Founder):
"After giving Patagonia away in 2022, I've been working harder than an 87-year-old should. The climate and nature crisis is worsening, and the truth is being lost in a sea of lies and misinformation... I feel an even deeper responsibility to help the company succeed and provide a counter to the prevailing extractive model of capitalism."

"When enough individuals come together, it is possible to take on a system."

"We can change capitalism for good. We might even save the planet."

OUR ALIGNMENT:
Patagonia = "Earth is our only shareholder"
UF51 = "Love is our only currency"

Same mission. Different execution. Both asset-locked. Both reject extractive capitalism.

Email: grants@patagonia.com
CICs LOVED by international funders (proves permanent asset lock).`,
            priority: "high",
            geography: "International (fund UK)",
            cic: "advantage"
        },

        europeanClimate: {
            name: "European Climate Foundation",
            amount: "€10,000-€500,000+",
            type: "Grant",
            speed: "Varies by program",
            status: "research",
            link: "https://europeanclimate.org/",
            notes: "Major EU funder. 700+ partners. Focus: clean transport, citizen engagement, nature. UK still eligible post-Brexit for some programs. Check specific programs.",
            priority: "high",
            geography: "Europe (inc UK)",
            cic: "advantage"
        },

        environmentalFunders: {
            name: "UK Environmental Funders Network",
            amount: "Connects to multiple funders",
            type: "Network/Database",
            speed: "N/A (connection service)",
            status: "todo",
            link: "https://www.greenfunders.org/",
            notes: "Not a funder - but connects you to 100+ environmental philanthropists in UK. Apply to join 'Green Fundraisers Forum'. Get introduced to private donors.",
            priority: "medium",
            geography: "UK",
            cic: "advantage"
        },

        globalGreengrants: {
            name: "Global Greengrants Fund UK",
            amount: "Typically £500-£5,000",
            type: "Grant",
            speed: "Quarterly decisions",
            status: "todo",
            link: "https://www.greengrants.org/who-we-are/global-greengrants-fund-uk/",
            notes: "International. Funds grassroots environmental action globally. Small grants but FAST. Strong on community-led projects.",
            priority: "medium",
            geography: "Global (UK based)",
            cic: "advantage"
        },

        // EU POST-BREXIT (still accessible)
        euEnvironment: {
            name: "EU Environment & Climate Action Funding",
            amount: "€50,000+",
            type: "Grant",
            speed: "Varies by call",
            status: "research",
            link: "https://environment.ec.europa.eu/funding_en",
            notes: "Some EU programs still open to UK orgs post-Brexit. Check LIFE programme, Horizon Europe. Requires research into eligibility.",
            priority: "low",
            geography: "EU (check UK eligibility)",
            cic: "neutral"
        },

        // UK - SMALL & QUICK
        fundingScotland: {
            name: "Funding Scotland Database",
            amount: "Various (search tool)",
            type: "Database",
            speed: "N/A (search engine)",
            status: "todo",
            link: "https://funding.scot/",
            notes: "CRITICAL TOOL - search 1000+ Scottish funds. Filter by: environment, quick decision, social enterprise. USE THIS to find local fast grants.",
            priority: "high",
            geography: "Scotland",
            cic: "varies"
        },

        // PRIVATE PHILANTHROPY (need connections)
        privateDonors: {
            name: "Private Philanthropists (via EFN)",
            amount: "£10,000-£100,000+",
            type: "Donation/Investment",
            speed: "Fast (if connection made)",
            status: "todo",
            nextAction: "Join Environmental Funders Network. Attend events. Get introduced.",
            link: "https://www.greenfunders.org/",
            notes: "Wealthy individuals wanting to fund climate action. Need warm introductions. EFN provides access. CIC structure = they LOVE IT (tax efficient + mission locked).",
            priority: "high",
            geography: "UK/International",
            cic: "major advantage"
        },

        // CROWDFUNDING (if desperate)
        crowdfunding: {
            name: "Crowdfunding Bridge (GoFundMe/Kickstarter)",
            amount: "£5,000-£20,000 realistic",
            type: "Crowdfunding",
            speed: "30-60 days",
            status: "backup",
            notes: "⚠️ BACKUP ONLY - last resort before Christmas if grants too slow. Show traction first (10 cleanups, 5 artists). CIC = better trust than 'startup'.",
            priority: "low",
            geography: "Global",
            cic: "trust advantage"
        }
    };

    const applied = Object.entries(funders).filter(([_, f]) => f.status === 'applied');
    const inProgress = Object.entries(funders).filter(([_, f]) => f.status === 'in_progress');
    const rejected = Object.entries(funders).filter(([_, f]) => f.status === 'rejected');
    const todo = Object.entries(funders).filter(([_, f]) => f.status === 'todo');
    const research = Object.entries(funders).filter(([_, f]) => f.status === 'research' || f.status === 'maybe' || f.status === 'backup');
    
    // Calculate total pending
    const totalPending = applied.reduce((sum, [_, f]) => {
        const amount = f.amount.replace(/[£,]/g, '').match(/\d+/);
        return sum + (amount ? parseInt(amount[0]) : 0);
    }, 0);
    
    const totalInProgress = inProgress.reduce((sum, [_, f]) => {
        const amount = f.amount.replace(/[£,]/g, '').match(/\d+/);
        return sum + (amount ? parseInt(amount[0]) : 0);
    }, 0);

    const currentFunders = view === 'applied' ? applied : view === 'todo' ? todo : Object.entries(funders);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'in_progress':
                return <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold flex items-center gap-1 animate-pulse"><Heart className="w-3 h-3" /> IN PROGRESS</span>;
            case 'applied':
                return <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> APPLIED</span>;
            case 'rejected':
                return <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold">❌ REJECTED</span>;
            case 'available':
                return <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">🚨 EMERGENCY</span>;
            case 'todo':
                return <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-xs font-bold flex items-center gap-1"><Zap className="w-3 h-3" /> TODO</span>;
            case 'research':
                return <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">RESEARCH</span>;
            case 'maybe':
                return <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">MAYBE</span>;
            case 'backup':
                return <span className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs font-bold">BACKUP</span>;
            default:
                return null;
        }
    };

    const getPriorityBadge = (priority) => {
        switch(priority) {
            case 'urgent':
                return <span className="px-2 py-1 bg-red-900/40 border border-red-500 text-red-300 rounded text-xs font-bold animate-pulse">🚨 URGENT</span>;
            case 'emergency':
                return <span className="px-2 py-1 bg-orange-900/40 border border-orange-500 text-orange-300 rounded text-xs font-bold animate-pulse">🚨 EMERGENCY</span>;
            case 'high':
                return <span className="px-2 py-1 bg-red-900/40 border border-red-500 text-red-300 rounded text-xs font-bold">🔥 HIGH</span>;
            case 'medium':
                return <span className="px-2 py-1 bg-blue-900/40 border border-blue-500 text-blue-300 rounded text-xs font-bold">MEDIUM</span>;
            case 'low':
                return <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs font-bold">LOW</span>;
            default:
                return null;
        }
    };

    const getCICBadge = (cic) => {
        switch(cic) {
            case 'required':
                return <span className="px-2 py-1 bg-green-900/40 border border-green-500 text-green-300 rounded text-xs font-bold">✅ CIC REQUIRED</span>;
            case 'advantage':
                return <span className="px-2 py-1 bg-cyan-900/40 border border-cyan-500 text-cyan-300 rounded text-xs font-bold">💎 CIC ADVANTAGE</span>;
            case 'preferred':
                return <span className="px-2 py-1 bg-purple-900/40 border border-purple-500 text-purple-300 rounded text-xs font-bold">⭐ CIC PREFERRED</span>;
            case 'neutral':
                return <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs font-bold">CIC NEUTRAL</span>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Shield className="w-20 h-20 mx-auto text-green-400" style={{ filter: 'drop-shadow(0 0 20px #22c55e)' }} />
                    <h1 className="text-5xl font-black">FUNDING TRACKER</h1>
                    <p className="text-xl text-gray-300">All funding options. Current status. Next actions.</p>
                </motion.div>

                {/* TOTAL PENDING HERO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-4 border-green-500">
                        <CardContent className="p-8 text-center">
                            <p className="text-green-400 font-mono text-sm mb-2">🔥 IN PROGRESS (ACTIVE)</p>
                            <p className="text-5xl md:text-6xl font-black font-mono text-white">
                                UnLtd
                            </p>
                            <p className="text-green-400 font-mono text-sm mt-2 animate-pulse">
                                Support Manager Assigned • Bridge Funding Potential
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-yellow-900/60 to-amber-900/60 border-4 border-yellow-500">
                        <CardContent className="p-8 text-center">
                            <p className="text-yellow-400 font-mono text-sm mb-2">WAITING (APPLIED)</p>
                            <p className="text-5xl md:text-6xl font-black font-mono text-white">
                                £120,000
                            </p>
                            <p className="text-gray-400 font-mono text-sm mt-2">
                                2 applications • Decisions Feb-March 2026
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* QUICK STATS */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="bg-green-900/30 border-2 border-green-500/50">
                        <CardContent className="p-6 text-center">
                            <Heart className="w-8 h-8 text-green-400 mx-auto mb-2 animate-pulse" />
                            <p className="text-3xl font-black text-green-400">{inProgress.length}</p>
                            <p className="text-sm text-gray-300">In Progress</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-yellow-900/30 border-2 border-yellow-500/50">
                        <CardContent className="p-6 text-center">
                            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-yellow-400">{applied.length}</p>
                            <p className="text-sm text-gray-300">Waiting</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-cyan-900/30 border-2 border-cyan-500/50">
                        <CardContent className="p-6 text-center">
                            <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-cyan-400">{todo.length}</p>
                            <p className="text-sm text-gray-300">To Do</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-900/30 border-2 border-red-500/50">
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-red-400">{rejected.length}</p>
                            <p className="text-sm text-gray-300">Rejected</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/30 border-2 border-purple-500/50">
                        <CardContent className="p-6 text-center">
                            <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-purple-400">{Object.keys(funders).length}</p>
                            <p className="text-sm text-gray-300">Total</p>
                        </CardContent>
                    </Card>
                </div>

                {/* FILTERS */}
                <div className="flex gap-3 justify-center flex-wrap">
                    <Button
                        onClick={() => setView('all')}
                        className={view === 'all' ? 'bg-white text-black' : 'bg-gray-700'}
                    >
                        All ({Object.keys(funders).length})
                    </Button>
                    <Button
                        onClick={() => setView('applied')}
                        className={view === 'applied' ? 'bg-yellow-600' : 'bg-gray-700'}
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        Applied ({applied.length})
                    </Button>
                    <Button
                        onClick={() => setView('todo')}
                        className={view === 'todo' ? 'bg-cyan-600' : 'bg-gray-700'}
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        To Do ({todo.length})
                    </Button>
                </div>

                {/* CRITICAL NEXT ACTIONS */}
                {(inProgress.length > 0 || applied.length > 0) && (
                    <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-4 border-red-500">
                        <CardContent className="p-8">
                            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                <AlertCircle className="w-10 h-10 text-red-400 animate-pulse" />
                                🚨 URGENT NEXT ACTIONS 🚨
                            </h3>
                            <div className="space-y-4">
                                {inProgress.map(([key, funder]) => (
                                    funder.nextAction && (
                                        <div key={key} className="bg-green-900/30 border-l-4 border-green-400 p-6 rounded-lg">
                                            <p className="text-green-300 font-bold text-lg mb-2">{funder.name}</p>
                                            <p className="text-white text-base mb-3">{funder.nextAction}</p>
                                            {funder.link && (
                                                <a href={funder.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open application
                                                </a>
                                            )}
                                        </div>
                                    )
                                ))}
                                {applied.map(([key, funder]) => (
                                    funder.nextAction && (
                                        <div key={key} className="bg-black/60 border-l-4 border-yellow-400 p-6 rounded-lg">
                                            <p className="text-yellow-300 font-bold text-lg mb-2">{funder.name}</p>
                                            <p className="text-white text-base mb-3">{funder.nextAction}</p>
                                            {funder.link && (
                                                <a href={funder.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open application
                                                </a>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* FUNDERS LIST */}
                <div className="space-y-4">
                    {currentFunders.map(([key, funder], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="bg-black/40 border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <Globe className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-black text-white mb-2">{funder.name}</h3>
                                                    <div className="flex gap-2 flex-wrap mb-2">
                                                        {getStatusBadge(funder.status)}
                                                        {getPriorityBadge(funder.priority)}
                                                        {getCICBadge(funder.cic)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                            <p className="text-green-400 text-xs font-bold mb-1">AMOUNT</p>
                                            <p className="text-white font-black text-lg">{funder.amount}</p>
                                        </div>
                                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
                                            <p className="text-cyan-400 text-xs font-bold mb-1">SPEED</p>
                                            <p className="text-white font-bold text-sm">{funder.speed}</p>
                                        </div>
                                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                                            <p className="text-purple-400 text-xs font-bold mb-1">GEOGRAPHY</p>
                                            <p className="text-white font-bold text-sm">{funder.geography}</p>
                                        </div>
                                    </div>

                                    {funder.nextDeadline && (
                                        <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded mb-4">
                                            <p className="text-yellow-300 text-sm">
                                                <strong>Next Deadline:</strong> {funder.nextDeadline}
                                            </p>
                                        </div>
                                    )}

                                    {funder.dateApplied && (
                                        <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded mb-4">
                                            <p className="text-blue-300 text-sm">
                                                <strong>Applied:</strong> {funder.dateApplied}
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-black/40 rounded-lg p-4 mb-4">
                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{funder.notes}</p>
                                    </div>

                                    {funder.link && (
                                        <a 
                                            href={funder.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-bold transition-all text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open Application
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* WHY CIC MATTERS */}
                <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-4 border-green-500">
                    <CardContent className="p-8">
                        <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                            <Shield className="w-10 h-10 text-green-400" />
                            💚 WHY CIC = FUNDING MAGNET 💚
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg">
                                <strong className="text-white">International funders LOVE CICs because:</strong>
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>✅ <strong className="text-green-400">Asset Lock:</strong> Money CAN'T be extracted as private profit. Ever.</li>
                                <li>✅ <strong className="text-green-400">Proven Mission:</strong> Legal structure proves you're locked to social/environmental good.</li>
                                <li>✅ <strong className="text-green-400">UK Government Verified:</strong> CIC Regulator approval = legitimate.</li>
                                <li>✅ <strong className="text-green-400">Tax Efficient:</strong> Donors/funders get better tax treatment in many countries.</li>
                                <li>✅ <strong className="text-green-400">Replicable Model:</strong> Shows sustainability, not dependency on grants.</li>
                            </ul>
                            <p className="text-cyan-400 font-bold text-lg mt-6">
                                Patagonia, European Climate Foundation, private philanthropists → They WANT to fund CICs because they KNOW the mission is protected forever.
                            </p>
                            <p className="text-green-400 font-bold text-xl mt-4">
                                That's why getting CIC status = unlocking 10x more funding options. International doors OPEN.
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}