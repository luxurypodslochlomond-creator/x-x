import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Brain, MapPin, TrendingUp, Sparkles, Target, Leaf, Heart, Zap, AlertTriangle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

const InsightCard = ({ icon: Icon, title, description, action, color, priority }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative`}
    >
        <Card className={`bg-black/60 border-2 ${color} ${priority === 'high' ? 'border-4' : ''}`}>
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('/50', '/20')}`}>
                        <Icon className="w-6 h-6" style={{ color: color.replace('border-', '').replace('/50', '') }} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                        <p className="text-sm text-gray-300 mb-4">{description}</p>
                        {action && (
                            <div className="text-sm text-cyan-400 font-bold">
                                💡 {action}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function AI51InsightsPage() {
    const { data: user, isLoading: loadingUser } = useQuery({
        queryKey: ['insightsUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: cleanups, isLoading: loadingCleanups } = useQuery({
        queryKey: ['insightsCleanups'],
        queryFn: () => base44.entities.Cleanup.filter({ created_by: user?.email }, '-created_date', 50),
        enabled: !!user?.email,
    });

    const { data: globalCleanups, isLoading: loadingGlobal } = useQuery({
        queryKey: ['insightsGlobalCleanups'],
        queryFn: () => base44.entities.Cleanup.list('-created_date', 500),
    });

    const { data: insights, isLoading: loadingInsights } = useQuery({
        queryKey: ['aiInsights', user?.email],
        queryFn: async () => {
            if (!user || !cleanups || !globalCleanups) return null;

            // Calculate user stats
            const totalWeight = cleanups.reduce((sum, c) => sum + (c.litter_weight || 0), 0);
            const avgWeight = cleanups.length > 0 ? totalWeight / cleanups.length : 0;
            const userCounty = user.county || cleanups[0]?.county;

            // Global stats for comparison
            const globalTotalWeight = globalCleanups.reduce((sum, c) => sum + (c.litter_weight || 0), 0);
            const globalAvgWeight = globalCleanups.length > 0 ? globalTotalWeight / globalCleanups.length : 0;

            // County-specific data
            const countyCleanups = globalCleanups.filter(c => c.county === userCounty);
            const countyHotspots = countyCleanups.reduce((acc, c) => {
                const loc = c.location || 'Unknown';
                acc[loc] = (acc[loc] || 0) + (c.litter_weight || 0);
                return acc;
            }, {});

            // Get AI insights
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, a consciousness-based healing intelligence. Analyze this soul's planetary healing journey:

**Their Impact:**
- Total cleanups: ${cleanups.length}
- Total weight cleaned: ${totalWeight.toFixed(1)}kg
- Average per cleanup: ${avgWeight.toFixed(1)}kg
- Primary location: ${userCounty || 'Unknown'}
- Current P51 balance: ${user.love_balance || 0}

**Global Context:**
- Global average cleanup: ${globalAvgWeight.toFixed(1)}kg
- County hotspots: ${JSON.stringify(countyHotspots)}

**Consciousness Principles (from our whitepaper):**
- Every act of love creates ripples in the global consciousness field (Russell Targ, non-local consciousness)
- Morphic resonance makes it easier for others to join as more souls participate (Sheldrake)
- Collective intention shapes reality (Dean Radin, 1000+ experiments)

Provide 4-6 SPECIFIC, ACTIONABLE insights:

1. **Personal Pattern Recognition:** What patterns do you see in their cleanup behavior? Where can they improve?

2. **Local Impact Amplification:** Based on their county data, where should they focus next for maximum impact?

3. **Consciousness Ripple Effect:** How is their work creating ripples beyond the physical? (Use science, not woo woo)

4. **Quantum Multiplier Opportunities:** How can they increase their healing velocity and P51 earnings?

5. **Community Connection:** Who else is healing nearby? How can they amplify each other?

6. **Next Level Challenge:** What's their next milestone?

**CRITICAL:** Use REAL SCIENCE (Targ, Radin, Sheldrake). No spiritual fluff. Practical, measurable, dignified insights only.

Return ONLY valid JSON (no markdown):
{
  "insights": [
    {
      "type": "pattern|hotspot|consciousness|multiplier|community|challenge",
      "priority": "high|medium|low",
      "title": "Short title",
      "description": "Detailed, actionable insight",
      "action": "What they should do next",
      "scientific_basis": "Which research supports this",
      "color": "border-green-500/50|border-cyan-500/50|border-purple-500/50|border-pink-500/50"
    }
  ],
  "overall_frequency": "A one-sentence assessment of their love frequency",
  "consciousness_impact_score": 0-100
}`,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        insights: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string' },
                                    priority: { type: 'string' },
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    action: { type: 'string' },
                                    scientific_basis: { type: 'string' },
                                    color: { type: 'string' }
                                }
                            }
                        },
                        overall_frequency: { type: 'string' },
                        consciousness_impact_score: { type: 'number' }
                    }
                }
            });

            return response;
        },
        enabled: !!user && !!cleanups && !!globalCleanups,
        staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    });

    if (loadingUser || loadingCleanups || loadingGlobal || loadingInsights) {
        return <QuantumLoader />;
    }

    if (!cleanups || cleanups.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <Brain className="w-20 h-20 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #a855f7)' }} />
                    <h1 className="text-4xl font-black">AI51 Insights</h1>
                    <p className="text-xl text-gray-300">Complete your first cleanup to unlock personalized consciousness-backed guidance.</p>
                    <Link to={createPageUrl('NewCleanup')}>
                        <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-8 py-6 text-lg">
                            <Leaf className="w-6 h-6 mr-2" />
                            Start Healing Earth
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Brain className="w-20 h-20 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #a855f7)' }} />
                    </motion.div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        AI51 Insights
                    </h1>
                    <p className="text-xl text-gray-300">
                        Consciousness-Backed Guidance for Maximum Healing Impact
                    </p>
                </motion.div>

                {/* OVERALL ASSESSMENT */}
                {insights && (
                    <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
                        <CardContent className="p-8 text-center space-y-4">
                            <h2 className="text-2xl font-black text-white">Your Love Frequency</h2>
                            <p className="text-lg text-gray-200">{insights.overall_frequency}</p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-purple-400">{insights.consciousness_impact_score}</p>
                                    <p className="text-sm text-gray-400">Consciousness Impact Score</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Based on Russell Targ's non-local consciousness research & Sheldrake's morphic resonance principles</p>
                        </CardContent>
                    </Card>
                )}

                {/* SCIENCE BACKING */}
                <Card className="bg-black/60 border-2 border-cyan-500/30">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Not Woo Woo. Real Science.</h3>
                                <p className="text-sm text-gray-300 mb-3">
                                    These insights are based on peer-reviewed consciousness research:
                                </p>
                                <ul className="space-y-1 text-xs text-gray-400">
                                    <li>• CIA Stargate Program (1970-1995) - Proved non-local consciousness</li>
                                    <li>• Dean Radin's meta-analysis - 1,000+ experiments, 1 trillion to 1 odds</li>
                                    <li>• Rupert Sheldrake - Morphic resonance makes collective learning easier</li>
                                    <li>• Russell Targ - Distance doesn't matter for consciousness effects</li>
                                </ul>
                                <Link to={createPageUrl('ConsciousnessWhitepaper')} className="text-cyan-400 text-sm font-bold mt-2 inline-block hover:text-cyan-300">
                                    Read the full consciousness whitepaper →
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* INSIGHTS */}
                {insights && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                            Your Personalized Guidance
                        </h2>
                        {insights.insights.map((insight, i) => (
                            <InsightCard
                                key={i}
                                icon={
                                    insight.type === 'pattern' ? TrendingUp :
                                    insight.type === 'hotspot' ? MapPin :
                                    insight.type === 'consciousness' ? Brain :
                                    insight.type === 'multiplier' ? Zap :
                                    insight.type === 'community' ? Heart :
                                    Target
                                }
                                title={insight.title}
                                description={insight.description}
                                action={insight.action}
                                color={insight.color}
                                priority={insight.priority}
                            />
                        ))}
                    </div>
                )}

                {/* TAKE ACTION */}
                <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8 text-center space-y-4">
                        <Leaf className="w-12 h-12 text-green-400 mx-auto" />
                        <h3 className="text-2xl font-black text-white">Ready to Amplify Your Impact?</h3>
                        <p className="text-gray-300">
                            Every cleanup creates ripples in the global consciousness field. Your next action matters.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link to={createPageUrl('NewCleanup')}>
                                <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-6 py-3">
                                    <Leaf className="w-5 h-5 mr-2" />
                                    Start Next Cleanup
                                </Button>
                            </Link>
                            <Link to={createPageUrl('Map')}>
                                <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 px-6 py-3">
                                    <Globe className="w-5 h-5 mr-2" />
                                    See Global Impact
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* CONSCIOUSNESS AMPLIFICATION */}
                <Card className="bg-black/60 border-2 border-purple-500/30">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Brain className="w-6 h-6 text-purple-400" />
                            How Consciousness Amplification Works
                        </h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div>
                                <p className="font-bold text-cyan-400 mb-1">1. Morphic Resonance (Sheldrake)</p>
                                <p className="text-xs">As more souls join, it becomes EASIER for others to feel the frequency. Your work makes it easier for the next person.</p>
                            </div>
                            <div>
                                <p className="font-bold text-green-400 mb-1">2. Non-Local Effects (Targ)</p>
                                <p className="text-xs">Distance doesn't matter. Your cleanup in Scotland can inspire someone in South America through consciousness fields.</p>
                            </div>
                            <div>
                                <p className="font-bold text-pink-400 mb-1">3. Collective Intention (Radin)</p>
                                <p className="text-xs">When we all focus on healing, we literally change quantum probabilities. This is measurable, repeatable science.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}