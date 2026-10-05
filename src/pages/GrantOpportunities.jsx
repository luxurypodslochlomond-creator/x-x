import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
    Award, 
    TrendingUp, 
    Clock, 
    Target, 
    Users, 
    Globe, 
    Sparkles,
    ExternalLink,
    Heart,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

export default function GrantOpportunitiesPage() {
    const [filter, setFilter] = useState('all'); // 'all', 'quick', 'scottish', 'private'

    // QUICK WINS - Easy application, fast decision
    const quickWins = [
        {
            name: "Creative Scotland - Open Project Fund",
            amount: "£1,000 - £100,000",
            deadline: "Rolling (decision within 12 weeks)",
            difficulty: "Medium",
            scottish: true,
            type: "Arts & Innovation",
            why: "UF51 combines music, art, technology, and social impact. Perfect fit.",
            url: "https://www.creativescotland.com/funding/open-project-funding",
            nextSteps: [
                "Register on Creative Scotland portal",
                "Draft project description (we have most content ready)",
                "Get 2 letters of support (Jane Goodall Institute, local council)",
                "Submit by end of month"
            ],
            successRate: "35%",
            notes: "They LOVE innovative projects. Our tech + social impact angle is strong."
        },
        {
            name: "National Lottery Community Fund",
            amount: "£300 - £10,000",
            deadline: "Rolling applications",
            difficulty: "Easy",
            scottish: true,
            type: "Community Impact",
            why: "Directly funds community environmental projects. We qualify 100%.",
            url: "https://www.tnlcommunityfund.org.uk/funding/programmes",
            nextSteps: [
                "Create account on their portal",
                "Describe Loch Lomond pilot project",
                "Show community impact (cleanups, education)",
                "Apply for £5k pilot"
            ],
            successRate: "45%",
            notes: "Best for pilot/proof of concept. Quick turnaround."
        },
        {
            name: "NatureScot Biodiversity Challenge Fund",
            amount: "£5,000 - £50,000",
            deadline: "Annual (usually March)",
            difficulty: "Medium",
            scottish: true,
            type: "Environmental",
            why: "Direct biodiversity + community engagement. Loch Lomond location = bonus.",
            url: "https://www.nature.scot/funding-and-projects/biodiversity-challenge-fund",
            nextSteps: [
                "Contact NatureScot project officer (they help with application)",
                "Map out Loch Lomond restoration plan",
                "Partner with local nature group",
                "Submit before March deadline"
            ],
            successRate: "30%",
            notes: "Scottish location + proven community = strong advantage."
        }
    ];

    // PRIVATE INDIVIDUALS & IMPACT INVESTORS
    const privateInvestors = [
        {
            name: "Scottish Angel Network",
            amount: "£50,000 - £500,000",
            deadline: "Pitch sessions quarterly",
            difficulty: "High",
            scottish: true,
            type: "Impact Investment",
            why: "They invest in scalable social enterprises. CIC structure + tech = attractive.",
            url: "https://www.linscotland.co.uk/our-funds/scottish-investment-bank/scottish-angel-network/",
            nextSteps: [
                "Perfect 3-min pitch deck",
                "Show traction (users, cleanups, P51 circulation)",
                "Attend pitch event",
                "Emphasize scalability"
            ],
            successRate: "10-15%",
            notes: "Competitive but LOVE Scottish tech with global potential."
        },
        {
            name: "Ashoka Fellowship",
            amount: "Living stipend + network access",
            deadline: "Rolling nominations",
            difficulty: "High",
            scottish: false,
            type: "Social Entrepreneur Support",
            why: "World's largest network of social entrepreneurs. UF51 = perfect fit.",
            url: "https://www.ashoka.org/en-gb",
            nextSteps: [
                "Get nominated by existing Ashoka Fellow",
                "Complete application (story of BRO51 + GILL51)",
                "Show systemic change model",
                "Emphasize scalability"
            ],
            successRate: "5%",
            notes: "Prestigious. Opens doors to ALL impact investment networks globally."
        },
        {
            name: "Skoll Foundation",
            amount: "Funding + mentorship",
            deadline: "Annual",
            difficulty: "Very High",
            scottish: false,
            type: "Global Impact",
            why: "Fund social entrepreneurs solving global problems. Environmental + economic justice.",
            url: "https://skoll.org/",
            nextSteps: [
                "Build case study of first 100 verified cleanups",
                "Show economic model working",
                "Get intro through existing Skoll entrepreneur",
                "Submit before deadline"
            ],
            successRate: "2%",
            notes: "Long shot but HUGE payoff. Worth trying once system proven."
        },
        {
            name: "Unltd (Scotland)",
            amount: "£5,000 - £15,000 + mentoring",
            deadline: "Rolling",
            difficulty: "Medium",
            scottish: true,
            type: "Social Enterprise",
            why: "Support early-stage social entrepreneurs in UK. CIC structure = perfect.",
            url: "https://unltd.org.uk/",
            nextSteps: [
                "Register interest on website",
                "Phone interview (tell UF51 story)",
                "Submit full application",
                "Get matched with mentor"
            ],
            successRate: "25%",
            notes: "Great for £5k-£15k seed + mentorship. Very founder-friendly."
        }
    ];

    // FOUNDATION GRANTS
    const foundations = [
        {
            name: "Esmée Fairbairn Foundation",
            amount: "£30,000 - £150,000",
            deadline: "Quarterly",
            difficulty: "Medium",
            scottish: false,
            type: "Social Change",
            why: "Fund innovation in social/environmental change. UF51 ticks all boxes.",
            url: "https://esmeefairbairn.org.uk/",
            nextSteps: [
                "Review their priorities (environment + social justice)",
                "Draft application showing systemic change",
                "Emphasize tech innovation",
                "Submit before quarterly deadline"
            ],
            successRate: "20%",
            notes: "One of UK's most flexible funders. Love innovative approaches."
        },
        {
            name: "Patagonia Environmental Grants",
            amount: "$5,000 - $20,000",
            deadline: "Twice yearly",
            difficulty: "Medium",
            scottish: false,
            type: "Environmental Activism",
            why: "Fund grassroots environmental groups. UF51 = grassroots + tech.",
            url: "https://www.patagonia.com/actionworks/grants/",
            nextSteps: [
                "Register as environmental org",
                "Show direct action (cleanups)",
                "Emphasize community-led model",
                "Apply during funding window"
            ],
            successRate: "30%",
            notes: "LOVE action-oriented projects. Cleanups + economic justice = strong."
        }
    ];

    const allOpportunities = [
        ...quickWins.map(g => ({...g, category: 'quick'})),
        ...privateInvestors.map(g => ({...g, category: 'private'})),
        ...foundations.map(g => ({...g, category: 'foundation'}))
    ];

    const filteredOpps = filter === 'all' 
        ? allOpportunities 
        : filter === 'scottish'
        ? allOpportunities.filter(g => g.scottish)
        : allOpportunities.filter(g => g.category === filter);

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Easy': return 'bg-green-900/40 text-green-300 border-green-500/30';
            case 'Medium': return 'bg-yellow-900/40 text-yellow-300 border-yellow-500/30';
            case 'High': return 'bg-orange-900/40 text-orange-300 border-orange-500/30';
            case 'Very High': return 'bg-red-900/40 text-red-300 border-red-500/30';
            default: return 'bg-gray-900/40 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* HEADER */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Award className="w-16 h-16 text-purple-400 mx-auto mb-4" 
                            style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} 
                        />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Grant Opportunities
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Funding paths for UF51. Scottish advantage first, then global expansion.
                    </p>
                </header>

                {/* STRATEGY SUMMARY */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4">The Strategy</h2>
                        <div className="space-y-3 text-gray-300">
                            <p><strong className="text-white">1. Start Scottish</strong> - Home advantage. Easier access. Faster decisions.</p>
                            <p><strong className="text-white">2. Build Proof</strong> - Use first £5k-£15k to prove model works.</p>
                            <p><strong className="text-white">3. Scale Up</strong> - Show traction → unlock larger grants + investors.</p>
                            <p><strong className="text-white">4. Go Global</strong> - Once proven in Scotland → international funding opens.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                        onClick={() => setFilter('all')}
                        variant={filter === 'all' ? 'default' : 'outline'}
                        className={filter === 'all' ? 'bg-purple-600' : ''}
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        All Opportunities
                    </Button>
                    <Button
                        onClick={() => setFilter('quick')}
                        variant={filter === 'quick' ? 'default' : 'outline'}
                        className={filter === 'quick' ? 'bg-green-600' : ''}
                    >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Quick Wins
                    </Button>
                    <Button
                        onClick={() => setFilter('scottish')}
                        variant={filter === 'scottish' ? 'default' : 'outline'}
                        className={filter === 'scottish' ? 'bg-cyan-600' : ''}
                    >
                        <Heart className="w-4 h-4 mr-2" />
                        Scottish Advantage
                    </Button>
                    <Button
                        onClick={() => setFilter('private')}
                        variant={filter === 'private' ? 'default' : 'outline'}
                        className={filter === 'private' ? 'bg-pink-600' : ''}
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Private Investors
                    </Button>
                </div>

                {/* OPPORTUNITIES GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredOpps.map((opp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-black/60 border-2 border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-3">
                                        <CardTitle className="text-xl text-white">{opp.name}</CardTitle>
                                        {opp.scottish && (
                                            <Badge className="bg-cyan-900/40 text-cyan-300 border border-cyan-500/30">
                                                🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish
                                            </Badge>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge className={getDifficultyColor(opp.difficulty)}>
                                            {opp.difficulty}
                                        </Badge>
                                        <Badge className="bg-gray-900/40 text-gray-300">
                                            {opp.type}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-green-400">
                                            <Target className="w-4 h-4" />
                                            <span className="font-bold">{opp.amount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{opp.deadline}</span>
                                        </div>
                                        {opp.successRate && (
                                            <div className="flex items-center gap-2 text-purple-400">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>Success Rate: {opp.successRate}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-grow space-y-4">
                                    <div>
                                        <p className="text-sm font-bold text-purple-300 mb-2">Why This Fits:</p>
                                        <p className="text-sm text-gray-300">{opp.why}</p>
                                    </div>

                                    {opp.nextSteps && (
                                        <div>
                                            <p className="text-sm font-bold text-cyan-300 mb-2">Next Steps:</p>
                                            <ul className="space-y-1">
                                                {opp.nextSteps.map((step, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {opp.notes && (
                                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                                            <p className="text-xs text-purple-200">
                                                <AlertCircle className="w-3 h-3 inline mr-1" />
                                                {opp.notes}
                                            </p>
                                        </div>
                                    )}

                                    <a 
                                        href={opp.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-4"
                                    >
                                        Visit Website <ExternalLink className="w-4 h-4" />
                                    </a>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* BOTTOM ADVICE */}
                <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <Sparkles className="w-6 h-6" />
                            What You Need For Applications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                            <div>
                                <p className="font-bold text-white mb-2">Already Have:</p>
                                <ul className="space-y-1">
                                    <li>✅ Working platform (uf51.love)</li>
                                    <li>✅ Clear mission (heal planet + economic justice)</li>
                                    <li>✅ CIC structure (credibility)</li>
                                    <li>✅ Scottish base (advantage)</li>
                                    <li>✅ Tech innovation (AI verification)</li>
                                    <li>✅ Community starting to form</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-bold text-white mb-2">Need To Build:</p>
                                <ul className="space-y-1">
                                    <li>📊 First 50-100 verified cleanups</li>
                                    <li>📝 Letters of support (2-3)</li>
                                    <li>📸 Case studies with photos</li>
                                    <li>💰 Budget breakdown (simple)</li>
                                    <li>🎯 Impact metrics (kg cleaned, users, etc.)</li>
                                    <li>🤝 Partner testimonials (optional but strong)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center text-gray-500 text-sm">
                    <p>Updated: November 2024</p>
                    <p className="mt-2">Track applications in Business Vault. Let's get this funded. ♾️💚♾️</p>
                </div>
            </div>
        </div>
    );
}